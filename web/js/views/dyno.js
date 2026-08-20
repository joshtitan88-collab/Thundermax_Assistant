// Virtual dyno — watch a simulated pull play back on live gauges before any
// change is trusted near the real bike.
//
// Three rules this view is built around:
//   1. It NEVER blocks anything. Every issue it raises is advisory ("warn").
//      Only the deterministic code guardrails (src/guardrails.py) can block a
//      change, and they run server-side on the proposal, not here. The UI says
//      so permanently, on screen, not in a tooltip.
//   2. It is DIRECTIONAL ONLY. A model of a pull, not a real dyno sheet.
//   3. No safety number is ever hardcoded in this file. Every gauge zone,
//      window and threshold is read from /api/profile -> guardrails. If that
//      payload is missing, the zones are NOT drawn and the UI says the limits
//      failed to load — it never invents a limit or falls back to a guess.
//
// Security: model/user text never touches innerHTML. Nodes are built with el()
// and textContent (canvas text is fillText, which is not markup either).
import { get, post } from '/js/api.js';
import { el, toast, badge } from '/js/ui.js';

const CSS_HREF = '/css/dyno.css';

// ---------------------------------------------------------------------------
// module state (all released by unmount)
// ---------------------------------------------------------------------------
let alive = false;         // guards async resolutions after unmount
let raf = 0;               // the single animation frame handle
let cvs = null, ctx = null;
let ro = null;             // ResizeObserver on the cluster
let G = null;              // guardrails payload (single source of limits)
let PROF = null;           // bike profile
let BASE = null;           // /api/dyno/baseline — calibration, redline, injectors
let run = null;            // {samples, issues, summary, baseline_status, ...}
let specs = [];            // gauge specs, rebuilt per run/resize
let layout = { cols: 2, cellW: 160, cellH: 170, w: 0, h: 0 };
let colors = {};
let cursor = 0;            // interpolation search cursor
let scrubbing = false;
let lastText = {};         // dedupe DOM text writes in the rAF loop
let numFields = [];        // numeric sample fields discovered at load
let changeRows = [];
const pb = { t: 0, playing: false, speed: 1, dur: 0, last: 0 };
const refs = {};

// ---------------------------------------------------------------------------
// mount / unmount
// ---------------------------------------------------------------------------
export async function mount(root, rest = []) {
  alive = true;
  ensureCss();
  resetPlayback();
  run = null; specs = []; G = null; PROF = null; BASE = null;
  lastText = {}; numFields = [];

  root.append(el('h1', { class: 'page' }, 'Virtual dyno'));

  // Permanent, non-dismissible disclaimer. Ours, always shown, regardless of
  // whether the backend sent its own banner text.
  refs.disclaimer = el('div', { class: 'dyno-disclaimer' },
    el('strong', {}, 'DIRECTIONAL ONLY — this is a simulation, not a real dyno.'),
    el('span', {}, ' Numbers are model output for spotting problems early. '),
    el('span', {}, 'The dyno never blocks a change: it annotates. Only the code guardrails can block one.'));
  root.append(refs.disclaimer);

  refs.limits = el('div', { class: 'notice dyno-limits' }, 'loading house limits…');
  root.append(refs.limits);

  root.append(buildSetup());

  refs.status = el('div', { class: 'dyno-status muted' }, 'No run yet.');
  root.append(refs.status);

  refs.stage = el('div', { class: 'dyno-stage hidden' },
    buildHeadline(), buildCluster(), buildTransport(), buildTimeline(), buildLegend());
  root.append(refs.stage);

  refs.issueDetail = el('div', { class: 'dyno-issue-detail hidden' });
  root.append(refs.issueDetail);

  refs.summary = el('div', { class: 'dyno-summary hidden' });
  root.append(refs.summary);

  // The dyno's own calibration file carries the redline and the injector flow
  // the duty model runs on. Best effort: missing it costs the redline zone, not
  // the page — and the missing zone is stated rather than guessed around.
  get('/api/dyno/baseline').then((b) => {
    if (!alive || !b) return;
    BASE = b;
    if (G) renderLimits();
    if (run) { buildSpecs(); draw(); }
  }).catch(() => { /* stated in renderLimits when redline() is null */ });

  // Limits first — the form's presets and every gauge zone come from them.
  try {
    const p = await get('/api/profile');
    if (!alive) return;
    G = p && p.guardrails ? p.guardrails : null;
    PROF = p ? p.profile : null;
    if (!G) throw new Error('response had no guardrails object');
    renderLimits();
    fillTables();
  } catch (e) {
    if (!alive) return;
    G = null;
    renderLimitsFailure(e.message);
  }

  const wantDemo = rest[0] === 'demo' || /(^|[?&])demo(=|&|$)/.test(location.search);
  if (wantDemo) doDemo();
}

export function unmount() {
  alive = false;
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  if (ro) { try { ro.disconnect(); } catch { /* noop */ } }
  ro = null;
  window.removeEventListener('resize', onResize);
  // Release the backing store so the canvas is collectable immediately.
  if (cvs) { cvs.width = 0; cvs.height = 0; }
  cvs = null; ctx = null;
  run = null; specs = []; G = null; PROF = null;
  changeRows = []; numFields = []; lastText = {};
  for (const k of Object.keys(refs)) delete refs[k];
  resetPlayback();
}

function resetPlayback() {
  pb.t = 0; pb.playing = false; pb.speed = 1; pb.dur = 0; pb.last = 0;
  cursor = 0; scrubbing = false;
}

function ensureCss() {
  // The shell wires this in too; guarded so we never double-link it.
  if (document.querySelector(`link[href="${CSS_HREF}"]`)) return;
  document.head.append(el('link', { rel: 'stylesheet', href: CSS_HREF }));
}

// ---------------------------------------------------------------------------
// house limits panel
// ---------------------------------------------------------------------------
function renderLimits() {
  const b = refs.limits;
  if (!b) return;
  b.textContent = '';
  b.className = 'notice dyno-limits';
  const line = (k, v) => el('div', { class: 'row' },
    el('span', {}, k), el('span', { class: 'lim' }, v));
  b.append(el('div', { class: 'dyno-limits-head' },
    'Gauge zones come from the house guardrails (/api/profile) — the same numbers the vetting code enforces.'));
  const rows = el('div', { class: 'safety' },
    line('WOT AFR window', `${G.afr.wot[0]}–${G.afr.wot[1]} (hard ${G.afr.wot_hard[0]}–${G.afr.wot_hard[1]})`),
    line('Rear cylinder', `≈${G.afr.rear_richer} richer than front`),
    line('Spark WOT / ceiling', `${G.spark.wot[0]}–${G.spark.wot[1]}° / ${G.spark.ceiling}°`),
    line('Injector duty', `amber ${G.injector_duty.amber_pct}% · red ${G.injector_duty.red_pct}%`));
  b.append(rows);
  const rl = redline();
  if (rl == null) {
    b.append(el('div', { class: 'muted dyno-note' },
      'No redline is recorded in the dyno baseline or the bike profile, so the RPM gauge shows no '
      + 'redline zone. It is not being guessed here — record it and the zone appears.'));
  } else {
    rows.append(line('Redline', `${rl} rpm`));
    const src = baseObj('baseline').redline_source;
    if (src) b.append(el('div', { class: 'muted dyno-note' }, String(src)));
  }
  // The duty gauge is only as good as the injector flow figure behind it — say
  // so on the gauge page while that figure is still unconfirmed.
  const inj = baseObj('injectors').flow_gps != null ? BASE.injectors : (PROF && PROF.injectors);
  if (inj && (inj.needs_confirmation === true || inj.confirmed === false)) {
    const flow = inj.flow_gps != null ? inj.flow_gps : inj.flow_g_s;
    b.append(el('div', { class: 'dyno-note dyno-inj-warn' },
      badge('unconfirmed', 'warn'),
      ` Injector duty is computed from ${flow == null ? 'an unconfirmed' : flow} `
      + `${flow == null ? 'injector flow' : (inj.unit || 'g/s')} figure that has not been verified `
      + 'in TMax Tuner. If it is wrong, every duty reading on this page is wrong by the same factor — '
      + 'treat the duty gauge as directional until it is confirmed.'));
  }
}

function renderLimitsFailure(msg) {
  const b = refs.limits;
  if (!b) return;
  b.textContent = '';
  b.className = 'notice dyno-limits dyno-limits-bad';
  b.append(
    el('strong', {}, 'House limits failed to load — gauge zones are OFF.'),
    el('div', {}, `/api/profile: ${msg}`),
    el('div', { class: 'dyno-note' },
      'The AFR windows, spark windows and injector-duty thresholds live in the server guardrails and are '
      + 'never duplicated in this page, so with the profile unreachable the gauges run bare: needles and '
      + 'numbers only, no safe/amber/red shading. Nothing shown here has been checked against a limit.'),
    el('div', { style: 'margin-top:8px' },
      el('button', { onclick: () => location.reload() }, 'Retry')));
}

function baseObj(key) {
  return (BASE && BASE[key] && typeof BASE[key] === 'object') ? BASE[key] : {};
}

// Every candidate is a value recorded on the server (dyno baseline first, then
// the bike profile, then guardrails). Nothing is defaulted in this file.
function redline() {
  const c = [baseObj('baseline').redline_rpm, PROF && PROF.redline_rpm,
    PROF && PROF.rpm_limit, G && G.rpm && G.rpm.redline];
  for (const v of c) if (typeof v === 'number' && v > 0) return v;
  return null;
}

// ---------------------------------------------------------------------------
// run setup form
// ---------------------------------------------------------------------------
const UNITS = ['deg', 've_pct', 'afr'];
const CYLS = ['both', 'front', 'rear'];

function buildSetup() {
  const card = el('div', { class: 'card dyno-setup' });
  card.append(el('h2', {}, 'Run setup'));

  refs.changeList = el('div', { class: 'dyno-changes' });
  card.append(refs.changeList);
  changeRows = [];
  addChangeRow();

  refs.presets = el('div', { class: 'dyno-presets' });
  card.append(el('div', { class: 'dyno-row-actions' },
    el('button', { onclick: () => addChangeRow() }, '+ Add change'),
    refs.presets));

  refs.ambient = el('input', { type: 'number', step: '1', value: '75', inputmode: 'numeric' });
  refs.chtStart = el('input', { type: 'number', step: '1', value: '210', inputmode: 'numeric' });
  refs.gear = el('select', {});
  for (const g of [1, 2, 3, 4, 5, 6]) {
    refs.gear.append(el('option', { value: String(g), ...(g === 5 ? { selected: '' } : {}) }, String(g)));
  }
  const grid = el('div', { class: 'fgrid' },
    el('label', { class: 'f' }, el('span', {}, 'Ambient °F'), refs.ambient),
    el('label', { class: 'f' }, el('span', {}, 'Starting CHT °F'), refs.chtStart),
    el('label', { class: 'f' }, el('span', {}, 'Gear'), refs.gear));
  card.append(el('h3', { class: 'dyno-sub' }, 'Conditions'), grid);
  card.append(el('div', { class: 'muted dyno-note' },
    'Starting CHT is an input to the run, and it is echoed back on the cluster as an input — '
    + 'this dyno does not simulate heat rise.'));

  refs.runBtn = el('button', { class: 'primary dyno-run', onclick: () => doRun() }, '▶ Run virtual dyno');
  refs.demoBtn = el('button', { onclick: () => doDemo() }, 'Demo run (synthetic, no backend)');
  card.append(el('div', { class: 'dyno-run-actions' }, refs.runBtn, refs.demoBtn));
  return card;
}

function fillTables() {
  // Table list and presets are guardrail-driven; only run once limits arrive.
  const tables = (G && Array.isArray(G.tables)) ? G.tables : [];
  for (const r of changeRows) setTableOptions(r.table, tables);
  if (!refs.presets || !G || !G.decel_pop) return;
  refs.presets.textContent = '';
  const mk = (label, p, key, unit) => el('button', {
    class: 'dyno-preset', onclick: () => applyPreset(p, key, unit),
  }, label);
  const hi = G.decel_pop.high, br = G.decel_pop.broad;
  if (hi) refs.presets.append(mk(`Decel pop >4k (+${hi.ve_pct}% VE)`, hi, 've_pct', 've_pct'));
  if (br) refs.presets.append(mk(`Decel pop broad (${br.spark_deg}° spark)`, br, 'spark_deg', 'deg'));
}

function setTableOptions(sel, tables) {
  const prev = sel.value;
  sel.textContent = '';
  const list = tables.length ? tables : ['(house table list unavailable)'];
  for (const t of list) sel.append(el('option', { value: t }, t));
  if (prev && list.includes(prev)) sel.value = prev;
}

function applyPreset(p, key, unit) {
  const r = changeRows[0] || addChangeRow();
  const v = Number(p[key]);
  r.unit.value = unit;
  r.direction.value = v < 0 ? 'decrease' : 'increase';
  r.magnitude.value = String(Math.abs(v));
  if (Array.isArray(p.rpm)) { r.rpmLo.value = String(p.rpm[0]); r.rpmHi.value = String(p.rpm[1]); }
  if (Array.isArray(p.tps)) { r.tpsLo.value = String(p.tps[0]); r.tpsHi.value = String(p.tps[1]); }
  const want = unit === 'deg' ? 'spark_advance_front' : 've_front';
  if ([...r.table.options].some((o) => o.value === want)) r.table.value = want;
  toast('preset loaded from house guardrails');
}

function addChangeRow() {
  const num = (v, step) => el('input', { type: 'number', step, value: v, inputmode: 'decimal' });
  const row = {};
  row.table = el('select', {});
  setTableOptions(row.table, (G && Array.isArray(G.tables)) ? G.tables : []);
  row.cylinder = el('select', {});
  for (const c of CYLS) row.cylinder.append(el('option', { value: c }, c));
  row.direction = el('select', {});
  for (const d of ['increase', 'decrease']) row.direction.append(el('option', { value: d }, d));
  row.unit = el('select', {});
  for (const u of UNITS) row.unit.append(el('option', { value: u }, u));
  row.magnitude = num('2', '0.1');
  row.rpmLo = num('3840', '64');
  row.rpmHi = num('4608', '64');
  row.tpsLo = num('0', '1');
  row.tpsHi = num('2', '1');

  const rm = el('button', { class: 'dyno-rm', title: 'remove this change' }, '✕');
  const head = el('span', { class: 'muted' }, `change ${changeRows.length + 1}`);
  const wrap = el('div', { class: 'dyno-change' },
    el('div', { class: 'dyno-change-head' }, head, rm),
    el('div', { class: 'fgrid' },
      el('label', { class: 'f' }, el('span', {}, 'Table'), row.table),
      el('label', { class: 'f' }, el('span', {}, 'Cylinder'), row.cylinder),
      el('label', { class: 'f' }, el('span', {}, 'Direction'), row.direction),
      el('label', { class: 'f' }, el('span', {}, 'Magnitude'), row.magnitude),
      el('label', { class: 'f' }, el('span', {}, 'Unit'), row.unit),
      el('label', { class: 'f' }, el('span', {}, 'RPM from'), row.rpmLo),
      el('label', { class: 'f' }, el('span', {}, 'RPM to'), row.rpmHi),
      el('label', { class: 'f' }, el('span', {}, 'TPS % from'), row.tpsLo),
      el('label', { class: 'f' }, el('span', {}, 'TPS % to'), row.tpsHi)));
  row.wrap = wrap;
  row.head = head;
  rm.addEventListener('click', () => {
    if (changeRows.length === 1) { toast('keep at least one change', 'bad'); return; }
    changeRows = changeRows.filter((r) => r !== row);
    wrap.remove();
    changeRows.forEach((r, i) => { r.head.textContent = `change ${i + 1}`; });
  });
  changeRows.push(row);
  refs.changeList.append(wrap);
  return row;
}

function collectBody() {
  const n = (input, d) => {
    const v = Number(input.value);
    return Number.isFinite(v) ? v : d;
  };
  const changes = changeRows.map((r) => ({
    table: r.table.value,
    cylinder: r.cylinder.value,
    rpm_band: [n(r.rpmLo, 0), n(r.rpmHi, 0)],
    tps_band: [n(r.tpsLo, 0), n(r.tpsHi, 0)],
    direction: r.direction.value,
    magnitude: Math.abs(n(r.magnitude, 0)),
    unit: r.unit.value,
  }));
  // conditions keys match virtual_dyno.merge_conditions(): ambient_f, cht_f.
  return {
    changes,
    conditions: { ambient_f: n(refs.ambient, 0), cht_f: n(refs.chtStart, 0) },
    gear: Number(refs.gear.value) || 5,
  };
}

// ---------------------------------------------------------------------------
// running
// ---------------------------------------------------------------------------
async function doRun() {
  const body = collectBody();
  setStatus('running the pull…');
  refs.runBtn.disabled = true;
  try {
    const r = await post('/api/dyno/run', body);
    if (!alive) return;
    if (!r || !Array.isArray(r.samples) || r.samples.length < 2) {
      throw new Error('response carried no sample stream');
    }
    loadRun(r, body, false);
  } catch (e) {
    if (!alive) return;
    runFailed(e.message);
  } finally {
    if (alive && refs.runBtn) refs.runBtn.disabled = false;
  }
}

function doDemo() {
  const body = collectBody();
  loadRun(synthRun(body), body, true);
}

function runFailed(msg) {
  if (!refs.status) return;
  refs.status.textContent = '';
  refs.status.className = 'dyno-status';
  refs.status.append(el('div', { class: 'notice dyno-limits-bad' },
    el('strong', {}, 'The dyno run did not come back. '),
    el('span', {}, `/api/dyno/run: ${msg}`),
    el('div', { class: 'dyno-note' },
      'Nothing is shown rather than something invented — no partial or filled-in run is displayed. '
      + 'The demo run below is browser-generated synthetic data for checking the gauges themselves; '
      + 'it says nothing about your bike or your changes.'),
    el('div', { style: 'margin-top:8px' },
      el('button', { onclick: () => doDemo() }, 'Demo run (synthetic)'))));
}

function setStatus(text) {
  if (!refs.status) return;
  refs.status.className = 'dyno-status muted';
  refs.status.textContent = text;
}

function loadRun(r, body, demo) {
  run = {
    samples: r.samples.slice().sort((a, b) => (Number(a.t) || 0) - (Number(b.t) || 0)),
    issues: Array.isArray(r.issues) ? r.issues : [],
    summary: r.summary || {},
    baseline_status: r.baseline_status || null,
    request: body,
    demo: !!demo || !!r.demo,
  };
  pb.t = 0; pb.playing = true; cursor = 0; lastText = {};
  numFields = fieldsOf(run.samples[0]);
  pb.dur = Number(run.samples[run.samples.length - 1].t) || 0;
  pb.last = performance.now();
  const hz = run.summary.sample_hz;
  const band = run.summary.rpm_range;
  setStatus(run.demo
    ? 'Synthetic demo run — generated in this browser, not by the model.'
    : `${run.samples.length} samples · ${pb.dur.toFixed(1)}s`
      + `${hz ? ` @ ${hz} Hz` : ''}`
      + `${Array.isArray(band) ? ` · ${band[0]}–${band[1]} rpm` : ''}`
      + ` · gear ${run.summary.gear != null ? run.summary.gear : body.gear}`);
  refs.stage.classList.remove('hidden');
  readColors();
  buildSpecs();
  renderTimeline();
  renderSummary();
  refs.scrub.max = String(pb.dur || 1);
  refs.scrub.value = '0';
  setPlayLabel();
  onResize();
  startLoop();
}

// ---------------------------------------------------------------------------
// headline readouts (gear + CHT + clock) — DOM, updated only on change
// ---------------------------------------------------------------------------
function buildHeadline() {
  refs.gearBig = el('div', { class: 'dyno-gear-v' }, '—');
  refs.clock = el('div', { class: 'dyno-clock mono' }, '0.00s');
  refs.cht = el('div', { class: 'dyno-cht-v mono' }, '—');
  return el('div', { class: 'dyno-headline' },
    el('div', { class: 'dyno-hcell dyno-gear' },
      el('div', { class: 'dyno-hk' }, 'GEAR'), refs.gearBig),
    el('div', { class: 'dyno-hcell dyno-chtcell' },
      el('div', { class: 'dyno-hk' }, 'CHT °F'), refs.cht,
      el('div', { class: 'dyno-cht-note' }, 'input echo · NOT simulated')),
    el('div', { class: 'dyno-hcell' },
      el('div', { class: 'dyno-hk' }, 'TIME'), refs.clock));
}

// ---------------------------------------------------------------------------
// canvas cluster
// ---------------------------------------------------------------------------
function buildCluster() {
  cvs = el('canvas', { class: 'dyno-canvas' });
  ctx = cvs.getContext('2d');
  const wrap = el('div', { class: 'dyno-cluster' }, cvs);
  refs.cluster = wrap;
  window.addEventListener('resize', onResize);
  if (window.ResizeObserver) {
    ro = new ResizeObserver(() => onResize());
    ro.observe(wrap);
  }
  return wrap;
}

function onResize() {
  if (!alive || !cvs || !ctx || !refs.cluster) return;
  const w = Math.max(240, refs.cluster.clientWidth || 320);
  const cols = Math.max(2, Math.min(5, Math.floor(w / 168)));
  const cellW = Math.floor(w / cols);
  const cellH = Math.round(cellW * 0.94) + 8;
  const rows = Math.ceil(Math.max(specs.length, 1) / cols);
  const h = rows * cellH;
  layout = { cols, cellW, cellH, w, h };
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  cvs.style.width = `${w}px`;
  cvs.style.height = `${h}px`;
  cvs.width = Math.round(w * dpr);
  cvs.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // crisp on retina / iPad
  readColors();
  draw();
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (n, f) => (cs.getPropertyValue(n) || '').trim() || f;
  colors = {
    bg: v('--bg', '#111318'),
    panel: v('--panel', '#1a1d23'),
    panel2: v('--panel2', '#22262e'),
    line: v('--line', '#2d323c'),
    text: v('--text', '#dfe4ea'),
    mut: v('--mut', '#8b95a3'),
    accent: v('--accent', '#4f8cc9'),
    ok: v('--ok', '#4caf7d'),
    warn: v('--warn', '#e8b339'),
    bad: v('--bad', '#e05d5d'),
    afr: v('--cat-afr', '#3fbfb0'),
    timing: v('--cat-timing', '#e8b339'),
    fuel: v('--cat-fuel', '#4caf7d'),
  };
}

// --- gauge specs -----------------------------------------------------------
function niceMax(v, step) { return Math.max(step, Math.ceil(v / step) * step); }
function fx(v) { return String(Math.round(v * 100) / 100); }

function buildSpecs() {
  const s = run.samples;
  const maxOf = (k) => s.reduce((m, x) => Math.max(m, Number(x[k]) || 0), 0);
  const sm = run.summary || {};
  const out = [];

  const rl = redline();
  const rpmMax = niceMax(Math.max(maxOf('rpm'), rl || 0) * 1.05, 500);
  const rpmZones = [];
  if (rl != null) rpmZones.push({ from: rl, to: rpmMax, color: colors.bad });
  out.push({
    key: 'rpm', label: 'RPM', min: 0, max: rpmMax, dp: 0, color: colors.accent,
    zones: rpmZones, ticks: 4,
    sub: rl != null ? `redline ${rl}` : 'no redline in profile',
  });

  out.push({
    key: 'mph', label: 'MPH', min: 0, max: niceMax(maxOf('mph') * 1.15, 20), dp: 0,
    color: colors.accent, zones: [], ticks: 4,
  });

  // AFR: house WOT window shaded green inside the wider hard window in amber.
  const afrZones = (offset) => {
    if (!G) return [];
    return [
      { from: G.afr.wot_hard[0] - offset, to: G.afr.wot_hard[1] - offset, color: colors.warn, alpha: 0.3 },
      { from: G.afr.wot[0] - offset, to: G.afr.wot[1] - offset, color: colors.ok, alpha: 0.85 },
    ];
  };
  const afrSub = (offset) => (G
    ? `WOT ${fx(G.afr.wot[0] - offset)}–${fx(G.afr.wot[1] - offset)}`
    : 'limits unavailable');
  // Scale to the data plus the window it is judged against, so a 0.4-wide house
  // window is a readable arc instead of a sliver of a generic 10–16 dial.
  const afrScale = (offset) => {
    const vals = [];
    for (const x of s) {
      for (const k of ['afr_front', 'afr_rear', 'afr_target']) {
        const n = Number(x[k]);
        if (Number.isFinite(n)) vals.push(n);
      }
    }
    if (G) vals.push(G.afr.wot_hard[0] - offset, G.afr.wot_hard[1] - offset);
    if (!vals.length) return { min: 10, max: 16 };
    const lo = Math.floor((Math.min(...vals) - 0.4) * 2) / 2;
    const hi = Math.ceil((Math.max(...vals) + 0.4) * 2) / 2;
    return { min: lo, max: Math.max(hi, lo + 1.5) };
  };
  const afrF = afrScale(0);
  out.push({
    key: 'afr_front', label: 'AFR FRONT', min: afrF.min, max: afrF.max, dp: 1, color: colors.afr,
    zones: afrZones(0), ticks: 3, sub: afrSub(0),
    markFn: (v) => v.afr_target,
  });
  const rearOff = G ? (Number(G.afr.rear_richer) || 0) : 0;
  const afrR = afrScale(rearOff);
  out.push({
    key: 'afr_rear', label: 'AFR REAR', min: afrR.min, max: afrR.max, dp: 1, color: colors.afr,
    zones: afrZones(rearOff), ticks: 3,
    sub: G ? `${afrSub(rearOff)} · ≈${rearOff} richer` : 'limits unavailable',
    markFn: (v) => (Number.isFinite(Number(v.afr_target)) ? Number(v.afr_target) - rearOff : null),
  });

  const dutyZones = [];
  if (G && G.injector_duty) {
    dutyZones.push({ from: G.injector_duty.amber_pct, to: G.injector_duty.red_pct, color: colors.warn });
    dutyZones.push({ from: G.injector_duty.red_pct, to: 100, color: colors.bad });
  }
  out.push({
    key: 'injector_duty_pct', label: 'INJ DUTY %', min: 0, max: 100, dp: 0,
    color: colors.fuel, zones: dutyZones, ticks: 4,
    sub: G ? `amber ${G.injector_duty.amber_pct} · red ${G.injector_duty.red_pct}` : 'limits unavailable',
  });

  const sparkMax = niceMax(Math.max(maxOf('spark_deg'), G ? G.spark.ceiling : 0) * 1.15, 5);
  const sparkZones = [];
  if (G) {
    sparkZones.push({ from: G.spark.wot[0], to: G.spark.wot[1], color: colors.ok, alpha: 0.85 });
    sparkZones.push({ from: G.spark.ceiling, to: sparkMax, color: colors.bad });
  }
  out.push({
    key: 'spark_deg', label: 'SPARK °', min: 0, max: sparkMax, dp: 1, color: colors.timing,
    zones: sparkZones, ticks: 4,
    sub: G ? `WOT ${G.spark.wot[0]}–${G.spark.wot[1]}° · ceil ${G.spark.ceiling}°` : 'limits unavailable',
  });

  out.push({
    key: 'hp', label: 'HP', min: 0, dp: 0, color: colors.accent, zones: [], ticks: 4,
    max: niceMax(Math.max(maxOf('hp'), Number(sm.peak_hp) || 0) * 1.2, 25),
  });
  out.push({
    key: 'torque', label: 'TORQUE', min: 0, dp: 0, color: colors.accent, zones: [], ticks: 4,
    max: niceMax(Math.max(maxOf('torque'), Number(sm.peak_torque) || 0) * 1.2, 25),
    sub: 'lb-ft',
  });
  out.push({
    key: 'knock_risk', label: 'KNOCK RISK', min: 0, max: 1, dp: 2, color: colors.warn,
    zones: [], ticks: 2, sub: 'model output · no house threshold',
  });
  specs = out;
}

// --- interpolation ---------------------------------------------------------
function fieldsOf(sample) {
  if (!sample) return [];
  return Object.keys(sample).filter((k) =>
    k !== 't' && k !== 'gear' && Number.isFinite(Number(sample[k])) && typeof sample[k] === 'number');
}

function sampleAt(t) {
  const s = run.samples;
  if (!s.length) return null;
  if (t <= Number(s[0].t)) return { ...s[0], _idx: 0 };
  const last = s[s.length - 1];
  if (t >= Number(last.t)) return { ...last, _idx: s.length - 1 };
  let i = cursor;
  if (i >= s.length - 1 || Number(s[i].t) > t) i = 0;
  while (i < s.length - 2 && Number(s[i + 1].t) <= t) i += 1;
  cursor = i;
  const a = s[i], b = s[i + 1];
  const span = (Number(b.t) - Number(a.t)) || 1;
  const f = Math.min(1, Math.max(0, (t - Number(a.t)) / span));
  // Linear interpolation of every numeric field: needles move continuously and
  // never snap to a sample boundary — even at 0.5x on a 20 Hz stream.
  const out = { t, _idx: i + f };
  for (const k of numFields) {
    const av = Number(a[k]), bv = Number(b[k]);
    if (Number.isFinite(av) && Number.isFinite(bv)) out[k] = av + (bv - av) * f;
    else if (Number.isFinite(av)) out[k] = av;
    else if (Number.isFinite(bv)) out[k] = bv;
  }
  out.gear = f < 0.5 ? a.gear : b.gear;   // discrete: never interpolated
  return out;
}

// --- draw loop -------------------------------------------------------------
function startLoop() {
  if (raf) cancelAnimationFrame(raf);
  pb.last = performance.now();
  const step = (now) => {
    if (!alive) return;
    const dt = Math.min(0.25, (now - pb.last) / 1000);
    pb.last = now;
    if (pb.playing && pb.dur > 0) {
      pb.t += dt * pb.speed;
      if (pb.t >= pb.dur) { pb.t = pb.dur; pb.playing = false; setPlayLabel(); }
    }
    draw();
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

function draw() {
  if (!ctx || !cvs || !run) return;
  const v = sampleAt(pb.t);
  if (!v) return;
  ctx.clearRect(0, 0, layout.w, layout.h);
  for (let i = 0; i < specs.length; i += 1) {
    const col = i % layout.cols;
    const row = Math.floor(i / layout.cols);
    drawGauge(col * layout.cellW, row * layout.cellH, layout.cellW, layout.cellH, specs[i], v);
  }
  setText('gearBig', v.gear == null ? '—' : String(v.gear));
  setText('clock', `${pb.t.toFixed(2)} / ${pb.dur.toFixed(2)}s`);
  setText('cht', chtEcho());
  const pct = pb.dur ? (pb.t / pb.dur) * 100 : 0;
  if (refs.fill) refs.fill.style.width = `${pct}%`;
  if (refs.head) refs.head.style.left = `${pct}%`;
  if (refs.scrub && !scrubbing) refs.scrub.value = String(pb.t);
}

function setText(key, text) {
  const n = refs[key];
  if (!n || lastText[key] === text) return;
  lastText[key] = text;
  n.textContent = text;
}

// CHT is an input echo. The dyno does not model heat rise, so this readout is
// the starting CHT that went in — never a simulated live temperature.
function chtEcho() {
  // Prefer what the server actually used (summary.conditions), then the frame
  // echo, then what was typed in — never a value that varied over the pull.
  const srvC = (run.summary && run.summary.conditions) || {};
  const reqC = (run.request && run.request.conditions) || {};
  const cands = [srvC.cht_f, (run.samples[0] || {}).cht_f, reqC.cht_f, reqC.cht_start_f];
  for (const v of cands) {
    const n = Number(v);
    if (Number.isFinite(n)) return String(Math.round(n));
  }
  return '—';
}

const A0 = Math.PI * 0.75;      // 135°
const SWEEP = Math.PI * 1.5;    // 270° sweep

function ang(sp, val) {
  const f = Math.min(1, Math.max(0, (val - sp.min) / ((sp.max - sp.min) || 1)));
  return A0 + SWEEP * f;
}

function drawGauge(x, y, w, h, sp, v) {
  const cx = x + w / 2;
  const cy = y + h * 0.52;
  const r = Math.min(w, h) * 0.36;
  const lw = Math.max(6, r * 0.2);
  const raw = Number(v[sp.key]);
  const val = Number.isFinite(raw) ? raw : null;

  ctx.save();
  ctx.lineCap = 'butt';

  ctx.beginPath();
  ctx.strokeStyle = colors.panel2;
  ctx.lineWidth = lw;
  ctx.arc(cx, cy, r, A0, A0 + SWEEP);
  ctx.stroke();

  // zones: guardrail-derived only, so an empty list means limits are missing
  for (const z of sp.zones || []) {
    const a1 = ang(sp, Math.min(z.from, z.to));
    const a2 = ang(sp, Math.max(z.from, z.to));
    if (a2 <= a1) continue;
    ctx.beginPath();
    ctx.globalAlpha = z.alpha == null ? 0.55 : z.alpha;
    ctx.strokeStyle = z.color;
    ctx.lineWidth = lw;
    ctx.arc(cx, cy, r, a1, a2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  ctx.strokeStyle = colors.line;
  ctx.lineWidth = 1.5;
  const nt = sp.ticks || 4;
  for (let i = 0; i <= nt; i += 1) {
    const a = A0 + (SWEEP * i) / nt;
    const r1 = r + lw * 0.55;
    const r2 = r1 + Math.max(3, r * 0.1);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }

  // AFR target marker (moves with the run)
  if (sp.markFn) {
    const mv = Number(sp.markFn(v));
    if (Number.isFinite(mv)) {
      const a = ang(sp, mv);
      ctx.beginPath();
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 2.5;
      ctx.moveTo(cx + Math.cos(a) * (r - lw * 0.6), cy + Math.sin(a) * (r - lw * 0.6));
      ctx.lineTo(cx + Math.cos(a) * (r + lw * 0.6), cy + Math.sin(a) * (r + lw * 0.6));
      ctx.stroke();
    }
  }

  if (val != null) {
    const a = ang(sp, val);
    const nr = r - lw * 0.15;
    ctx.beginPath();
    ctx.strokeStyle = sp.color || colors.accent;
    ctx.lineWidth = Math.max(2, r * 0.075);
    ctx.lineCap = 'round';
    ctx.moveTo(cx - Math.cos(a) * r * 0.16, cy - Math.sin(a) * r * 0.16);
    ctx.lineTo(cx + Math.cos(a) * nr, cy + Math.sin(a) * nr);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = colors.panel;
    ctx.arc(cx, cy, Math.max(3, r * 0.11), 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = sp.color || colors.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = colors.mut;
  ctx.font = `600 ${Math.max(9, Math.round(r * 0.26))}px system-ui, -apple-system, sans-serif`;
  ctx.textBaseline = 'top';
  ctx.fillText(sp.label, cx, y + 4, w - 8);

  ctx.fillStyle = zoneColorFor(sp, val) || colors.text;
  ctx.font = `700 ${Math.max(14, Math.round(r * 0.5))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.textBaseline = 'middle';
  ctx.fillText(val == null ? '—' : val.toFixed(sp.dp), cx, cy + r * 0.52, w - 10);

  if (sp.sub) {
    ctx.fillStyle = colors.mut;
    ctx.font = `${Math.max(8, Math.round(r * 0.2))}px system-ui, -apple-system, sans-serif`;
    ctx.textBaseline = 'bottom';
    ctx.fillText(sp.sub, cx, y + h - 4, w - 6);
  }
  ctx.restore();
}

// The numeric readout is tinted by the guardrail zone the value sits in, so a
// duty spike past the red threshold is loud rather than something to squint at.
function zoneColorFor(sp, val) {
  if (val == null || !sp.zones || !sp.zones.length) return null;
  let hit = null;
  for (const z of sp.zones) {
    const lo = Math.min(z.from, z.to), hi = Math.max(z.from, z.to);
    if (val >= lo && val <= hi) hit = z.color;
  }
  if (hit) return hit === colors.ok ? colors.text : hit;
  // Off every declared band on an AFR/spark gauge means outside the window.
  if (sp.key.indexOf('afr') === 0 || sp.key === 'spark_deg') return colors.warn;
  return null;
}

// ---------------------------------------------------------------------------
// transport: play / pause / scrub / speed
// ---------------------------------------------------------------------------
function buildTransport() {
  refs.play = el('button', { class: 'primary dyno-play', onclick: togglePlay }, '▮▮ Pause');
  refs.scrub = el('input', {
    type: 'range', min: '0', max: '10', step: '0.01', value: '0',
    class: 'dyno-scrub', 'aria-label': 'scrub run',
  });
  refs.scrub.addEventListener('pointerdown', () => { scrubbing = true; });
  refs.scrub.addEventListener('pointerup', () => { scrubbing = false; });
  refs.scrub.addEventListener('touchend', () => { scrubbing = false; });
  refs.scrub.addEventListener('change', () => { scrubbing = false; });
  refs.scrub.addEventListener('input', () => {
    scrubbing = true;
    seek(Number(refs.scrub.value) || 0);
  });
  const speeds = el('div', { class: 'seg dyno-speed' });
  for (const s of [0.5, 1, 2, 4]) {
    speeds.append(el('button', {
      class: s === 1 ? 'active' : '',
      onclick: (ev) => {
        pb.speed = s;
        speeds.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === ev.currentTarget));
      },
    }, `${s}×`));
  }
  const restart = el('button', {
    onclick: () => { seek(0); pb.playing = true; pb.last = performance.now(); setPlayLabel(); },
  }, '⟲');
  return el('div', { class: 'dyno-transport' },
    el('div', { class: 'dyno-transport-row' }, refs.play, restart, speeds),
    refs.scrub);
}

function togglePlay() {
  if (pb.t >= pb.dur) pb.t = 0;
  pb.playing = !pb.playing;
  pb.last = performance.now();
  setPlayLabel();
}

function setPlayLabel() {
  if (refs.play) refs.play.textContent = pb.playing ? '▮▮ Pause' : '▶ Play';
}

function seek(t) {
  pb.t = Math.min(pb.dur, Math.max(0, t));
  cursor = 0;
  pb.last = performance.now();
  draw();
}

// ---------------------------------------------------------------------------
// timeline strip + issue markers
// ---------------------------------------------------------------------------
function buildTimeline() {
  refs.fill = el('div', { class: 'dyno-tl-fill' });
  refs.head = el('div', { class: 'dyno-tl-head' });
  refs.markers = el('div', { class: 'dyno-tl-markers' });
  refs.track = el('div', { class: 'dyno-tl-track' }, refs.fill, refs.head, refs.markers);
  return el('div', { class: 'dyno-timeline' }, refs.track,
    el('div', { class: 'dyno-tl-legend muted' },
      'Markers sit on the exact sample the issue was raised at. Tap one to jump there. ',
      'Every marker is advisory — the dyno annotates, it never blocks.'));
}

function renderTimeline() {
  if (!refs.markers) return;
  refs.markers.textContent = '';
  const dur = pb.dur || 1;
  run.issues.forEach((iss, i) => {
    // Snap to the exact sample t, not to the interpolated playhead position.
    const snapped = snapToSample(Number(iss.t) || 0);
    const left = Math.min(100, Math.max(0, (snapped / dur) * 100));
    const b = el('button', {
      class: `dyno-mark sev-${String(iss.severity || 'warn')}`,
      style: `left:${left}%`,
      title: `${snapped.toFixed(2)}s · ${iss.code || 'issue'}`,
      'aria-label': `issue at ${snapped.toFixed(2)} seconds`,
      onclick: () => {
        seek(snapped);
        pb.playing = false;
        setPlayLabel();
        showIssue(iss, snapped, i);
      },
    });
    refs.markers.append(b);
  });
}

function snapToSample(t) {
  const s = run.samples;
  let best = Number(s[0].t) || 0, bd = Infinity;
  for (const x of s) {
    const xt = Number(x.t) || 0;
    const d = Math.abs(xt - t);
    if (d < bd) { bd = d; best = xt; }
  }
  return best;
}

function showIssue(iss, t, i) {
  const box = refs.issueDetail;
  if (!box) return;
  box.textContent = '';
  box.classList.remove('hidden');
  const sev = String(iss.severity || 'warn');
  box.append(el('div', { class: 'notice warn' },
    el('div', { class: 'dyno-issue-head' },
      badge(sev === 'warn' ? 'advisory' : sev, 'warn'),
      el('span', { class: 'mono' }, `${t.toFixed(2)}s`),
      iss.rpm != null ? el('span', { class: 'mono' }, `${Math.round(Number(iss.rpm))} rpm`) : null,
      iss.code ? el('code', {}, String(iss.code)) : null),
    el('div', { class: 'dyno-issue-msg' }, String(iss.message || '')),
    iss.detail ? el('div', { class: 'dyno-note muted' }, String(iss.detail)) : null,
    el('div', { class: 'dyno-note muted' },
      'Advisory only. This does not stop anything — only the code guardrails can block a change.')));
  highlightIssue(i);
}

function highlightIssue(i) {
  if (refs.markers) {
    [...refs.markers.children].forEach((n, j) => n.classList.toggle('active', j === i));
  }
  if (refs.issueRows) {
    refs.issueRows.forEach((n, j) => n.classList.toggle('active', j === i));
  }
}

// ---------------------------------------------------------------------------
// legend + summary
// ---------------------------------------------------------------------------
function buildLegend() {
  return el('div', { class: 'dyno-legend muted' },
    el('span', { class: 'dyno-key ok' }, 'house window'),
    el('span', { class: 'dyno-key warn' }, 'hard limit / amber'),
    el('span', { class: 'dyno-key bad' }, 'over the red'),
    el('span', { class: 'dyno-key plain' }, 'white tick = AFR target'));
}

function renderSummary() {
  const box = refs.summary;
  if (!box) return;
  box.textContent = '';
  box.classList.remove('hidden');
  const s = run.summary || {};
  const card = el('div', { class: 'card' }, el('h2', {}, 'Run summary'));

  if (run.demo) {
    card.append(el('div', { class: 'notice warn' },
      el('strong', {}, 'SYNTHETIC DEMO RUN. '),
      'Generated in the browser to exercise the gauges. It is not model output and says '
      + 'nothing about your bike, your tune, or the changes in the form above.'));
  }
  if (s.banner) card.append(el('div', { class: 'notice warn dyno-run-banner' }, String(s.banner)));
  card.append(el('div', { class: 'notice' },
    'Directional only, and advisory only: this panel never approves or blocks anything. '
    + 'A change still has to pass the code guardrails and the validation-ride protocol.'));

  const tiles = el('div', { class: 'tiles' });
  const tile = (k, v, cls) => tiles.append(el('div', { class: `tile ${cls || ''}` },
    el('div', { class: 'k' }, k), el('div', { class: 'v' }, v)));
  const atRpm = (v) => (Number.isFinite(Number(v)) ? ` @ ${Math.round(Number(v))}` : '');
  const duty = peakDuty(s);
  tile('Peak HP', numText(s.peak_hp, 0) + atRpm(s.peak_hp_rpm));
  tile('Peak torque', numText(s.peak_torque, 0) + atRpm(s.peak_torque_rpm));
  tile('Peak duty %', numText(duty, 1), dutyClass(duty));
  tile('Max knock risk', numText(s.max_knock_risk, 2));
  tile('Δ HP', deltaText(s.delta_hp));
  tile('Δ torque', deltaText(s.delta_torque));
  if (s.uncertainty_pct != null) tile('Model uncertainty', `± ${numText(s.uncertainty_pct, 0)}%`);
  card.append(tiles);
  if (s.severity_note) {
    card.append(el('div', { class: 'muted dyno-note' }, String(s.severity_note)));
  }
  if (s.cht_note) card.append(el('div', { class: 'muted dyno-note' }, String(s.cht_note)));

  if (s.calibration_status) {
    card.append(el('h3', { class: 'dyno-sub' }, 'Calibration'),
      el('div', { class: 'notice' }, String(s.calibration_status)));
  }
  if (run.baseline_status) card.append(baselineBlock(run.baseline_status));

  card.append(el('h3', { class: 'dyno-sub' }, `Issues raised (${run.issues.length})`));
  refs.issueRows = [];
  if (!run.issues.length) {
    card.append(el('div', { class: 'empty' },
      'No issues raised on this run. That is not an approval — it means the model did not '
      + 'flag anything, and the model is not the thing that decides.'));
  } else {
    const list = el('div', { class: 'dyno-issues' });
    run.issues.forEach((iss, i) => {
      const t = snapToSample(Number(iss.t) || 0);
      const sev = String(iss.severity || 'warn');
      const row = el('button', {
        class: 'dyno-issue-row',
        onclick: () => { seek(t); pb.playing = false; setPlayLabel(); showIssue(iss, t, i); },
      },
      el('span', { class: 'mono dyno-issue-t' }, `${t.toFixed(2)}s`),
      badge(sev === 'warn' ? 'advisory' : sev, 'warn'),
      el('span', { class: 'dyno-issue-body' },
        el('span', { class: 'dyno-issue-msg' }, String(iss.message || '')),
        iss.code ? el('code', {}, String(iss.code)) : null,
        iss.rpm != null ? el('span', { class: 'muted mono' }, ` ${Math.round(Number(iss.rpm))} rpm`) : null));
      refs.issueRows.push(row);
      list.append(row);
    });
    card.append(list);
  }
  box.append(card);
}

// baseline_status is a nested calibration record. Rendered structurally rather
// than JSON-dumped: the provenance in it (what is confirmed, what still needs
// confirming) is the point, so it has to stay readable.
function baselineBlock(bs) {
  const wrap = el('div', { class: 'dyno-baseline' });
  wrap.append(el('h3', { class: 'dyno-sub' }, 'Baseline / calibration'));
  if (typeof bs !== 'object' || bs === null) {
    wrap.append(el('div', { class: 'notice' }, String(bs)));
    return wrap;
  }
  wrap.append(kvRows(bs, 0));
  return wrap;
}

function kvRows(obj, depth) {
  const rows = el('div', { class: `safety dyno-kv depth-${depth}` });
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('_')) continue;            // authoring notes, not data
    const label = k.replace(/_/g, ' ');
    if (v === null || v === undefined) {
      rows.append(row(label, '—'));
    } else if (Array.isArray(v)) {
      if (!v.length) rows.append(row(label, 'none'));
      else if (v.every((x) => x === null || typeof x !== 'object')) {
        rows.append(row(label, v.map((x) => String(x)).join(', ')));
      } else {
        rows.append(row(label, `${v.length} entries`));
      }
    } else if (typeof v === 'object') {
      if (depth >= 2) { rows.append(row(label, 'nested')); continue; }
      rows.append(el('div', { class: 'dyno-kv-group' },
        el('div', { class: 'dyno-kv-head' }, label), kvRows(v, depth + 1)));
    } else if (typeof v === 'boolean') {
      rows.append(row(label, v ? 'yes' : 'no'));
    } else {
      rows.append(row(label, String(v)));
    }
  }
  return rows;
}

function row(k, v) {
  return el('div', { class: 'row' },
    el('span', {}, k), el('span', { class: 'lim' }, v));
}

// virtual_dyno names it peak_injector_duty_pct; the spec called it peak_duty_pct.
function peakDuty(s) {
  return s.peak_injector_duty_pct != null ? s.peak_injector_duty_pct : s.peak_duty_pct;
}

function dutyClass(v) {
  const n = Number(v);
  if (!G || !G.injector_duty || !Number.isFinite(n)) return '';
  if (n >= G.injector_duty.red_pct) return 'bad';
  if (n >= G.injector_duty.amber_pct) return 'warn';
  return 'ok';
}

function numText(v, dp) {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(dp) : '—';
}

// Deltas are integer ranges by contract ("≈ +3 to +5 hp"). Strings pass through
// untouched; a bare number is rounded to a whole unit — this UI never shows a
// sub-integer dyno delta, because the model cannot resolve one.
function deltaText(v) {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'number') return `≈ ${v > 0 ? '+' : ''}${Math.round(v)}`;
  return String(v);
}

// ---------------------------------------------------------------------------
// synthetic demo run — browser-side, clearly labelled, backend not involved.
// Exists so the cluster can be exercised without /api/dyno/run. It is fake
// telemetry, never a source of limits: zones still come from guardrails only.
// ---------------------------------------------------------------------------
function synthRun(body) {
  const hz = 20, dur = 14;
  const n = hz * dur;
  const gear = body.gear || 5;
  const chtIn = (body.conditions && Number(body.conditions.cht_start_f)) || 210;
  const rpm0 = 2000, rpm1 = 5600;
  const backbone = (G && Array.isArray(G.timing_backbone) && G.timing_backbone.length)
    ? G.timing_backbone : null;
  const samples = [];
  for (let i = 0; i < n; i += 1) {
    const t = Math.round((i / hz) * 1000) / 1000;
    const f = i / (n - 1);
    const ease = f < 0.08 ? (f / 0.08) * 0.12 : 0.12 + ((f - 0.08) / 0.92) * 0.88;
    const rpm = rpm0 + (rpm1 - rpm0) * ease + Math.sin(t * 5) * 18;
    const mph = (rpm / 5600) * 118 * (gear / 5);
    const tq = 118 + 42 * Math.exp(-(((rpm - 3400) / 1250) ** 2))
      - (rpm > 4800 ? (rpm - 4800) * 0.012 : 0);
    const hp = (tq * rpm) / 5252;
    const target = 12.6 - (rpm > 4600 ? 0.15 : 0);
    const wob = Math.sin(t * 3.1) * 0.12 + Math.sin(t * 7.7) * 0.05;
    const lean = rpm > 5000 ? (rpm - 5000) * 0.00055 : 0;   // plants a warn
    const front = target + wob + lean;
    const rear = target - 0.2 + wob * 0.8 + lean * 1.25;
    const duty = 26 + 62 * ((rpm / 5600) ** 1.35) + (rpm > 5200 ? 7 : 0);
    const spark = backbone ? lerpCurve(backbone, rpm) : 12 + (rpm / 5600) * 22;
    const knock = Math.max(0, Math.min(1,
      (rpm > 3000 ? (rpm - 3000) / 9000 : 0) + (lean > 0 ? lean * 1.2 : 0)));
    samples.push({
      t, rpm: r2(rpm), mph: r2(mph), gear, torque: r2(tq), hp: r2(hp),
      afr_front: r2(front), afr_rear: r2(rear), afr_target: r2(target),
      injector_duty_pct: r2(Math.min(100, duty)), spark_deg: r2(spark),
      knock_risk: r2(knock), cht_f: chtIn,
    });
  }
  const peak = (k) => samples.reduce((m, s) => Math.max(m, Number(s[k]) || 0), 0);
  const issues = [];
  const amber = (G && G.injector_duty) ? G.injector_duty.amber_pct : null;
  if (amber != null) {
    const hit = samples.find((s) => s.injector_duty_pct >= amber);
    if (hit) {
      issues.push({
        t: hit.t, severity: 'warn', code: 'inj_duty_amber',
        message: `injector duty crosses the amber threshold (${amber}%) on this pull`,
        rpm: hit.rpm,
        detail: 'Demo data. On a real run this is where you would check headroom before asking for more fuel.',
      });
    }
  }
  const wotHi = G ? G.afr.wot[1] : null;
  const hardHi = G ? G.afr.wot_hard[1] : null;
  if (wotHi != null) {
    const hit = samples.find((s) => s.afr_front > wotHi);
    if (hit) {
      issues.push({
        t: hit.t, severity: 'warn', code: 'afr_lean_of_window',
        message: `front AFR drifts lean of the WOT window (>${wotHi})`,
        rpm: hit.rpm,
        detail: hardHi != null
          ? `Still inside the hard limit of ${hardHi}, but outside the window the house targets.`
          : 'Outside the house WOT window.',
      });
    }
  }
  const midx = Math.floor(n * 0.62);
  issues.push({
    t: samples[midx].t, severity: 'warn', code: 'demo_marker',
    message: 'demo marker — synthetic, placed to show marker snapping and jump-to-time',
    rpm: samples[midx].rpm,
    detail: 'Not a finding. It exists so the timeline strip can be verified without a backend.',
  });
  return {
    demo: true,
    samples,
    issues,
    summary: {
      peak_hp: r2(peak('hp')),
      peak_torque: r2(peak('torque')),
      peak_injector_duty_pct: r2(peak('injector_duty_pct')),
      max_knock_risk: r2(peak('knock_risk')),
      conditions: { ambient_f: (body.conditions || {}).ambient_f, cht_f: chtIn },
      cht_note: 'CHT is a static input echo, not a simulated gauge — the starting value is repeated in every frame.',
      delta_hp: '≈ +0 to +0 hp (demo — no model ran)',
      delta_torque: '≈ +0 to +0 lb-ft (demo — no model ran)',
      calibration_status: 'UNCALIBRATED — synthetic browser data, no correlation to the bike.',
      banner: 'DEMO DATA — synthetic run generated in the browser. Not a real dyno, and not the dyno model.',
    },
    baseline_status: { source: 'none', note: 'demo run — no baseline was loaded' },
  };
}

function lerpCurve(curve, x) {
  if (x <= curve[0][0]) return curve[0][1];
  const last = curve[curve.length - 1];
  if (x >= last[0]) return last[1];
  for (let i = 0; i < curve.length - 1; i += 1) {
    const [x0, y0] = curve[i];
    const [x1, y1] = curve[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / ((x1 - x0) || 1);
  }
  return last[1];
}

function r2(v) { return Math.round(v * 100) / 100; }
