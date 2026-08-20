// Ride & tune journal. Every entry feeds the knowledge base, but provenance is
// visible everywhere: an entry only becomes vetted (citable authority) when the
// proposal it links to reaches validated_by_ride. Until then it carries the
// UNVETTED banner and earns no retrieval boost — the UI says so plainly rather
// than letting a written-down hand change look like verified knowledge.
import { get, post } from '/js/api.js';
import { el, toast, badge, renderMarkdown } from '/js/ui.js';

const TYPE_LABEL = {
  validation_ride: 'validation ride',
  tune_change: 'tune change',
  note: 'note',
};

export async function mount(root, rest) {
  if (rest[0] === 'new') return mountForm(root);
  if (rest[0]) return mountDetail(root, rest[0]);
  return mountList(root);
}

// --- list --------------------------------------------------------------------

async function mountList(root) {
  root.append(el('div', { style: 'display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap' },
    el('h1', { class: 'page', style: 'margin:0' }, 'Journal'),
    el('a', { class: 'btn primary', href: '#/journal/new' }, '+ New entry')));
  const card = el('div', { class: 'card' }, el('div', { class: 'muted' }, 'loading…'));
  root.append(card);

  let d;
  try { d = await get('/api/journal'); }
  catch (e) { card.textContent = `journal unavailable: ${e.message}`; return; }
  card.textContent = '';

  const entries = d.entries || [];
  const stranded = entries.filter((e) => e.doc && !e.es_indexed);
  if (stranded.length) {
    card.append(el('div', { class: 'notice warn' },
      `${stranded.length} entr${stranded.length === 1 ? 'y is' : 'ies are'} in the corpus but not in the vector index `,
      '(Elasticsearch was unreachable). Keyword retrieval still finds them. ',
      el('button', {
        onclick: async (ev) => {
          ev.target.disabled = true;
          try {
            const r = await post('/api/journal/retry-index');
            toast(`retried ${r.retried.length}, ${r.pending.length} still pending`,
              r.pending.length ? 'bad' : '');
            mountList((root.textContent = '', root));
          } catch (err) { toast(`retry: ${err.message}`, 'bad'); ev.target.disabled = false; }
        },
      }, 'Retry indexing')));
  }
  if (!entries.length) {
    return card.append(el('div', { class: 'empty' },
      'No entries yet. Log a validation ride after the next tune change — ',
      'it becomes searchable in the co-pilot immediately.'));
  }
  for (const e of entries) card.append(entryRow(e));
}

function entryRow(e) {
  return el('a', { class: 'jrow', href: `#/journal/${e.id}` },
    el('div', { class: 'jrow-main' },
      el('div', { class: 'jrow-title' }, e.title),
      el('div', { class: 'muted', style: 'font-size:12px' },
        `${TYPE_LABEL[e.type] || e.type} · ${e.ts?.replace('T', ' ') || ''}`),
      e.summary ? el('div', { class: 'muted jrow-sum' }, e.summary) : null),
    el('div', { class: 'jrow-side' }, ...provenanceBadges(e)));
}

function provenanceBadges(e) {
  const out = [];
  if (e.retracted) out.push(badge('retracted', 'bad'));
  else if (e.vetted) out.push(badge('vetted', 'ok'));
  else out.push(badge('unvetted', 'warn'));
  if (e.doc && !e.es_indexed) out.push(badge('keyword only', ''));
  return out;
}

// --- detail ------------------------------------------------------------------

async function mountDetail(root, jid) {
  root.append(el('h1', { class: 'page' }, 'Entry ',
    el('a', { href: '#/journal', class: 'muted', style: 'font-size:13px' }, '← journal')));
  const card = el('div', { class: 'card' }, el('div', { class: 'muted' }, 'loading…'));
  root.append(card);
  let e;
  try { e = await get(`/api/journal/${jid}`); }
  catch (err) { card.textContent = `not found: ${err.message}`; return; }
  card.textContent = '';

  card.append(el('div', { style: 'display:flex;gap:8px;align-items:center;flex-wrap:wrap' },
    el('h2', { style: 'margin:0' }, e.title), ...provenanceBadges(e)));
  card.append(el('div', { class: 'muted', style: 'font-size:12px;margin:4px 0 12px' },
    `${TYPE_LABEL[e.type] || e.type} · ${e.ts?.replace('T', ' ')}`));

  card.append(el('div', { class: `notice ${e.vetted ? 'ok' : 'warn'}` },
    e.vetted
      ? `Vetted knowledge — validated by ride against proposal ${e.proposal_id}. It carries the setup retrieval boost and is cited as authority.`
      : (e.proposal_id
        ? `Linked to proposal ${e.proposal_id}, which has not reached validated-by-ride yet. Until it does, this entry is retrievable as an observation only — no boost, and it is cited with an UNVETTED banner.`
        : 'Not linked to any proposal — recorded outside the vetting pipeline. It is retrievable as an observation only: no retrieval boost, and it carries an UNVETTED banner in the excerpts the model reads.')));

  for (const [head, key] of [['Tune', 'tune'], ['Conditions', 'conditions'], ['Observations', 'observations']]) {
    const obj = e[key] || {};
    const keys = Object.keys(obj).filter((k) => obj[k] !== '' && obj[k] !== null && obj[k] !== undefined);
    if (!keys.length) continue;
    const tiles = el('div', { class: 'tiles', style: 'margin:10px 0' });
    for (const k of keys) {
      tiles.append(el('div', { class: 'tile' },
        el('div', { class: 'k' }, k.replace(/_/g, ' ')),
        el('div', { class: 'v' }, String(obj[k]))));
    }
    card.append(el('h3', { style: 'margin:14px 0 0;font-size:13px' }, head), tiles);
  }
  if (e.body) {
    card.append(el('h3', { style: 'margin:14px 0 6px;font-size:13px' }, 'Notes'),
      el('div', { class: 'msg' }, el('div', { class: 'body' }, renderMarkdown(e.body))));
  }

  const es = e.es || {};
  card.append(el('div', { class: 'muted', style: 'font-size:12px;margin-top:14px' },
    `corpus doc: ${e.doc || '(none — retracted)'}`, el('br'),
    es.indexed ? `vector index: ${es.chunks} chunk${es.chunks === 1 ? '' : 's'} @ ${es.at}`
      : `vector index: not indexed${es.error ? ` — ${es.error}` : ''} (keyword retrieval unaffected)`));

  card.append(el('div', { style: 'margin-top:14px' },
    el('a', { class: 'btn', href: `#/chat?q=${encodeURIComponent(e.title)}` }, 'Ask the co-pilot about this')));
}

// --- new entry form ----------------------------------------------------------

const FIELDS = {
  tune: [['base_map_id', 'Base map ID', 'text'], ['tune_file', 'Tune file', 'text']],
  conditions: [['ambient_f', 'Ambient °F', 'number'], ['cht_f_peak', 'Peak CHT °F', 'number'],
    ['gear', 'Gear', 'text'], ['road', 'Road / route', 'text']],
  observations: [['decel_pop', 'Decel pop', 'select:none,light,heavy'],
    ['afr_wot', 'AFR at WOT', 'number'], ['afr_cruise', 'AFR cruising', 'number'],
    ['knock', 'Knock / ping heard', 'select:no,yes'],
    ['surge', 'Cruise surge', 'select:no,light,heavy'],
    ['idle_quality', 'Idle quality', 'text']],
};

const SHOW = {
  validation_ride: ['tune', 'conditions', 'observations'],
  tune_change: ['tune', 'observations'],
  note: [],
};

async function mountForm(root) {
  root.append(el('h1', { class: 'page' }, 'New journal entry ',
    el('a', { href: '#/journal', class: 'muted', style: 'font-size:13px' }, '← journal')));
  const card = el('div', { class: 'card' });
  root.append(card);

  let type = 'validation_ride';
  const seg = el('div', { class: 'seg' });
  for (const t of Object.keys(SHOW)) {
    seg.append(el('button', {
      class: t === type ? 'active' : '',
      onclick: (ev) => {
        type = t;
        seg.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === ev.target));
        syncGroups();
      },
    }, TYPE_LABEL[t]));
  }
  card.append(field('Entry type', seg));

  const title = el('input', { type: 'text', placeholder: 'e.g. 40 mi validation ride after +2% VE decel fix' });
  card.append(field('Title', title));

  const groups = {};
  for (const [g, defs] of Object.entries(FIELDS)) {
    const wrap = el('div', { class: 'fgroup' },
      el('h3', {}, g === 'tune' ? 'Tune' : g === 'conditions' ? 'Conditions' : 'Observations'));
    groups[g] = { wrap, inputs: {} };
    const grid = el('div', { class: 'fgrid' });
    for (const [key, label, kind] of defs) {
      let input;
      if (kind.startsWith('select:')) {
        input = el('select', {});
        input.append(el('option', { value: '' }, '—'));
        for (const opt of kind.slice(7).split(',')) input.append(el('option', { value: opt }, opt));
      } else {
        input = el('input', { type: kind, ...(kind === 'number' ? { step: '0.1' } : {}) });
      }
      groups[g].inputs[key] = input;
      grid.append(el('label', { class: 'f' }, el('span', {}, label), input));
    }
    wrap.append(grid);
    card.append(wrap);
  }

  const body = el('textarea', { rows: 6, placeholder: 'What did you change, what did it feel like, anything unexpected? Plain language is fine — this is what the co-pilot reads back to you later.' });
  card.append(field('Notes', body));

  const proposal = el('input', { type: 'text', placeholder: 'proposal id (optional)' });
  card.append(field('Linked proposal', proposal));
  card.append(el('div', { class: 'notice warn' },
    'Saving records this as an ',
    el('strong', {}, 'unvetted'),
    ' observation: retrievable and citable as "what happened", but with no retrieval boost and an UNVETTED banner in the text the model reads. ',
    'It is promoted to vetted knowledge only when a linked proposal reaches validated-by-ride.'));

  const save = el('button', { class: 'primary' }, 'Save entry');
  card.append(el('div', { style: 'margin-top:12px;display:flex;gap:8px' }, save,
    el('a', { class: 'btn', href: '#/journal' }, 'Cancel')));

  function syncGroups() {
    for (const [g, o] of Object.entries(groups)) {
      o.wrap.classList.toggle('hidden', !SHOW[type].includes(g));
    }
  }
  syncGroups();

  save.addEventListener('click', async () => {
    if (!title.value.trim()) return toast('give it a title', 'bad');
    const payload = { type, title: title.value.trim(), body: body.value,
                      proposal_id: proposal.value.trim() || null };
    for (const g of SHOW[type]) {
      const vals = {};
      for (const [k, input] of Object.entries(groups[g].inputs)) {
        if (input.value !== '') vals[k] = input.type === 'number' ? Number(input.value) : input.value;
      }
      payload[g] = vals;
    }
    save.disabled = true;
    try {
      const e = await post('/api/journal', payload);
      if (e.error) { toast(e.error, 'bad'); save.disabled = false; return; }
      toast('saved — indexing into the knowledge base');
      location.hash = `#/journal/${e.id}`;
    } catch (err) {
      toast(`save failed: ${err.message}`, 'bad');
      save.disabled = false;
    }
  });
}

function field(label, control) {
  return el('label', { class: 'f block' }, el('span', {}, label), control);
}

export function unmount() {}
