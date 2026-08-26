# COLLABORATION.md — Thundermax Tuning Assistant (primary path)

This is the primary coordination document for the project. Any AI or human
picking up this project starts here.

## What this project is

A local tuning assistant for Joshua's **2023 Harley-Davidson Low Rider ST,
131ci, 2-into-1 exhaust, ThunderMax TBW ECM**. It:

1. **Parses `.tbw` tune files** (`src/thundermax_parser.py`) — validates
   integrity, extracts the base-map ID, diffs two tunes region-by-region,
   generates markdown decode reports, and indexes whole folders of tunes.
2. **Answers tuning questions locally** (`src/tune_assistant.py`) — an
   Ollama-backed chat/Q&A grounded in the shop's tuning documentation from
   the NAS brain_vault, plus an `analyze` mode that explains what changed
   between two tunes in rider terms.

## Provenance

- The original effort ran through Grok and ChatGPT ("Throttle Logic")
  sessions in Aug–Sep 2025. Those sessions produced the tuning docs, tune
  cards, ride packets, and one decode report — but **no source code
  survived** to the NAS. See `HANDOFF_FROM_GROK.md` for what was recovered.
- This codebase was rebuilt from those artifacts on 2026-07-11 by Claude
  (Claude Code), reverse-engineering the TBW format from real tune files.

## Where the data lives

| What | Where |
|---|---|
| Tune files (`.tbw`, ~30) | `/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/` |
| Tuning manuals & guides | `/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/TMAX TUNING MANUAL/` |
| AI project docs (ride packet, tune card, templates) | `/mnt/nas/ADMIN/LOCAL NAS/NEWER IPAD 16SEP2025/Thundermax AI Project/` |
| Searchable markdown corpus (37+ docs) | `/mnt/nas/ADMIN/brain_vault/` (files matching `*thundermax*` / `*thunder_max*`) |
| Prior decode report (format reference) | `.../TMAX TUNING MANUAL/FINALALLAROUNDGOODTUNEVatlV2_decode_report.md` |

## TBW format — what we know so far

- All observed files are exactly **214470 bytes**.
- Header: four LE u32 at 0x00 (`0x87, 0x4000, 0x1, 0x147` in every sample).
- **Base-map ID** at `0x10`: one length byte (0x10=16) + 16 ASCII chars
  (e.g. `HYSSPVCAHN051320`, `HXSSEDCAAN06161…`, `ZZSSQXETDN100720`).
  This is the only ASCII string in the file.
- `0x21`–`~0x3C0`: per-section metadata/checksums (these bytes churn
  whenever *any* table changes).
- Beyond `~0x3C0`: table data. Cells are little-endian fields on a **4- or
  8-byte stride** (a value word often paired with a flag/limit word) — *not*
  a densely packed grid, so the earlier "16-byte-stride u16 (value,flag)
  pairs" description was an oversimplification. **AutoTune correction cells
  are signed**, so small negative trims appear in a raw byte diff as
  `0x0000 → 0xFFxx` borrows.
- **Table map (NEW):** `src/tables.json` + `src/table_map.py` locate and name
  the major bands (AFR target, AFR/VE pages, fuel pages, timing map, timing
  limit array, fuel/rich correction, autotune-learned, metadata) with a
  confidence tier each, derived by differential analysis of semantically
  labeled tune pairs. See "Table map" below.
- **Timing scale:** the global −1° edit shifted every cell of the
  `0xC3C9` timing-limit array by exactly −49 raw → **~49 raw units per
  degree** (34°×49 = 1666). Medium confidence, and it is a **delta** scale:
  an absolute reading further assumes raw 0 == 0°, which rests on a single
  observation. Observed cells are not exact multiples of 49 (488 raw = 9.96
  "degrees"), so the true scale may be nearer 48.8 raw/deg, or the zero point
  is non-zero.
- **⚠ The 49 raw/deg assumption does NOT carry over to `timing_map_main` —
  tested and REJECTED (2026-08-20).** On the same labelled global −1° pair,
  `timing_limit_array` moved −49 in all 128 records, while `timing_map_main`
  moved in only 15 cells (16-byte spacing), all *upward*, as a smooth ramp
  +15, +14, … +2. A uniform −1° cannot produce a non-uniform positive ramp in
  the same units. `tables.json` still carries the old assumption in its
  `needs_ground_truth` note; `dyno_bridge.CONTRADICTED_SCALES` records the
  evidence so it cannot be quietly re-adopted. (Related: that band also moves
  on the pure `automaprun`→`automaprun2` AutoTune pair, which argues against
  tables.json's claim that it only responds to timing edits.)
- **⚠ Parser bug, FIXED (2026-08-20): `region_deltas()` was misaligned for
  every located band.** It snapped the start back to an even FILE offset
  (`start - start % 2`), but the bands mostly begin on ODD offsets (`0x01989`,
  `0x01FC9`, `0x0C3C9`). Reading a record one byte early puts the real low
  byte in the high position, so deltas came back **×256**. Measured on the
  −1° pair: the true −49 was reported as **−12544**, and that wrong number
  reached both `tmax compare` and the web tune-diff. It now reads on the
  band's own record grid (`stride`/`width` from tables.json), anchored at the
  band start, with a fallback to the plain u16 sweep so a change sitting
  mid-record is never silently dropped.
- **Per-cell engineering-unit scaling is still unconfirmed for most tables.**
  Diff analysis locates *where* each table lives and *what category* it is,
  but exact axis order and unit scale need one TMax Tuner ground-truth
  reading per band — the top remaining open task.

## Tune watcher — the assistant speaks first (2026-08-26)

`src/tune_watcher.py` + `systemd/tmax-watch.service`. Everything else in this
project answers when asked; this is the piece that starts the conversation.
Save a tune in TMax Tuner, it lands on the NAS, and within a poll cycle a
briefing is waiting that already did the diff, the classification, the setup
safety check and the AutoTune-feedback read — before you decide whether to
flash it.

```bash
python3 src/tune_watcher.py                              # watch the NAS folder
python3 src/tune_watcher.py --once                       # single pass
python3 src/tune_watcher.py --brief latestandgreatestG2.tbw   # brief one now
systemctl --user link  ~/Projects/thundermax-assistant/systemd/tmax-watch.service
systemctl --user enable --now tmax-watch
```

**The setup check is the highest-value part**, because a wrong flash strands
the bike while a merely bad tune just rides badly. It reads the rules out of
`bike_profile.json`: a `*55inj*` filename against 6.3 g/s injectors is
CRITICAL; `...v6...` gets a note that it means version 6, not 6.3 injectors
(SE8-517 lineage, different build); a base-map ID outside `base_map_ids`
warns. `m8128basemap3v6.tbw` is a real file in `OL TUNES/` that trips the v6
note today. The watcher only ever advises — it reads, it cannot block.

### Design constraints, each one a way a naive watcher fails silently

* **Polling, not inotify.** The tunes are on a CIFS/SMB mount. inotify does
  not fire for changes made by another host on a network share, so a watcher
  built on it looks healthy and sees nothing forever.
* **`Path.glob()` does NOT raise on a missing directory — it yields nothing.**
  So an unmounted NAS reads as `{}`, indistinguishable from "folder is there
  and empty". Without the explicit `is_dir()` check in `scan_folder()`, a NAS
  blink would clear `seen` as though all 153 tunes were deleted and then brief
  every one of them when the mount returned. Caught by a test, not by luck.
* **Settle before reading.** A file mid-copy over SMB is visible at the wrong
  size; briefing it yields a confident, wrong "corrupt tune" report. A
  candidate must hold exactly 214470 bytes AND an unchanged (size, mtime)
  across two consecutive polls. New tunes therefore always take two polls.
* **First run seeds, it does not brief.** Otherwise pointing it at the NAS
  emits 153 briefings. `--brief-existing` overrides.
* **NAS down is normal.** Logs once, keeps polling, does not die — same rule
  as `tmax-web.service` coming up in the garage with the NAS off.
* **No LLM on the default path.** The briefing is pure parser + table map +
  dyno + guardrails, so it still works when Ollama is down or its GPU is busy.
* **`notify()` reads the exit code.** With `check=False` and an unread
  returncode it would report success for a notifier that failed every time —
  briefing on disk, Joshua never told, nothing in the log.

Notification goes to the agent-bridge party line by default (`--notify
command` pipes the summary to any shell command instead, `--notify none`
disables). Verified live: a real briefing line landed on the party line.

Structural safety: the unit runs `ProtectSystem=strict` + `ProtectHome=
read-only`, so the NAS mount is read-only to the process and "never write a
`.tbw`" is enforced by the kernel, not by intention. `ReadWritePaths` is just
`data/` and `reports/`. A behavioural test also asserts every `.tbw` in a
watched folder is byte-identical after a full watch cycle.

## Closing the loop: the bike's own AutoTune learning (2026-08-26)

**Finding: no measured data has ever entered this project.** A sweep of the
whole THROTTLE LOGIC tree found 153 `.tbw`, 33 PDFs, 19 zips and 4 CSVs — and
the CSVs are *recommendation* tables (`AFR_Targets__Recommended_.csv`,
`Timing_vs_Engine_Temp__Retard_deg_.csv`), not recordings. There is no ride
datalog anywhere on the NAS, and no line of the 10k-line codebase parses one.
So `virtual_dyno`, `guardrails` and `vetting` are an entirely open loop: they
reason about what a change *should* do, and `validated_by_ride` is filled in
from memory. `dyno_bridge.self_test()` is honest that it proves
self-consistency only — but nothing has ever measured its error, so it never
can.

**But the ECM has been recording all along.** AutoTune writes its learned fuel
correction back into the tune, so every `.tbw` saved after a ride carries the
bike's own verdict on where the base map is wrong. `src/learned_feedback.py`
reads it. `dyno_bridge` deliberately EXCLUDES those bands as churn, and is
right to for "what did this edit change?" — this module asks the opposite
question, because the churn IS the measurement.

It reports DIRECTION and PERSISTENCE only, never engineering units: the
learned bands are `confidence: low` and their scale is unknown. Sign is
scale-free, so a binomial sign test across saves is valid without knowing the
scale at all.

### Three statistical traps, all of which produce confident nonsense

1. **Per-cell testing has no power.** BH across ~776 moving cells needs
   p <= 6.4e-5 at the top rank; an 8-save history maxes out far above that.
   You would need ~17 consecutive same-direction saves for ONE cell to clear
   the bar. A "0 findings" from the per-cell test says nothing about the bike.
   `region_bias()` pools adjacent cells into windows — fewer tests, more
   observations each — and is the headline call. `bias()` is detail only.
2. **Pooling adjacent cells over-states significance.** AutoTune smooths
   across neighbours, so cells are correlated. Two p-values are always
   reported: `p_pooled` (optimistic) and `p_steps` (each SAVE is one
   observation — conservative, defensible, and capped by how many saves exist).
3. **A single write across many cells is not a trend.** On the
   latestandgreatest series, 48 adjacent `learned_ve_bulk` cells all moved
   down *inside one save*; the pooled test scored it p=1.6e-13 as if 48
   independent measurements agreed. `MIN_TREND_STEPS` now requires movement on
   >=3 separate saves before any p-value is allowed to speak.

### What the tunes actually say today

- `autotune_learned` over the 9-save `latestandgreatest` family: **no
  directional bias at all.** The 70 cells with enough movement to test are all
  up2/dn3 or up3/dn2 — balanced oscillation, i.e. AutoTune converged and
  hunting around its target. That is a real, useful negative.
- `learned_ve_bulk`: 42 of 45 windows move in big contiguous blocks on a
  single save each. That behaviour fits tables.json's "or a large
  checksum-covered block" hypothesis far better than a per-cell trim store —
  treat it as low-value for feedback until proven otherwise. Three windows
  (0x159A7–0x15AC7) lean down on 3 of 4 saves; held at *suggestive*.

### `tables.json` band-width correction

`learned_ve_bulk` is `stride: 4`, and the parser's `_grid_for` derives a
4-byte int from that. The bytes are a repeating 4-lane pattern of 16-bit
fields (`00 00 | 12 00 | 12 00 | 12 00`), so a stride-4 i32 read straddles two
independent fields and reports 1179648 for a pair whose real contents are 0
and 18. `learned_feedback.band_grid()` reads these bands on a 2-byte grid.
The band's true record layout is still unconfirmed.

### What would unblock this — one concrete ask

The long families are contaminated: Joshua edits the map between saves, so
AutoTune relearns from a new baseline and persistence is scrambled. The pure
AutoTune series (`automaprun` 1/2/3, `hopefullycoolerV2AUTOTUNE` 1/2/3,
`steep timingautotuned` 1/2/3) are clean but only 3 saves = 2 steps, below
`MIN_TREND_STEPS`.

**Five or more consecutive AutoTune saves on ONE map with no edits in
between** would give the first properly-powered read of where this engine
actually wants fuel. That is a riding task, not a coding task, and it is
cheap.

Usage:

```bash
python3 src/learned_feedback.py lineage "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC"
python3 src/learned_feedback.py report  "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC" --family latestandgreatest
python3 src/learned_feedback.py trend a.tbw b.tbw c.tbw -v
```

## House tuning rules (from validated shop history)

- AutoTune learning gates: **enable >200°F, disable >280°F**; cold-start and
  heat-soak trims are garbage — block them.
- Decel pop protocol: closed-throttle 4000→2000 rpm decels in 3rd/4th.
  Pops above 4k → **+2% VE @ 0–2% TPS, 3840–4608 rpm**. Broad-range pops →
  **−1° spark @ 0–2% TPS, 2048–2816 rpm**.
- Always log TPS, RPM, AFR target vs actual, CHT, trims.
- Every tune change gets a validation ride + tune report
  (template in the Thundermax AI Project folder).

## Table map

`src/tables.json` is the frozen band map; `src/table_map.py` reads it and:

- `python3 table_map.py bands` — list every named band + confidence.
- `python3 table_map.py classify A.tbw B.tbw` — label the changed regions of a
  diff and roll them up by category (TIMING / AFR / FUEL / AUTOTUNE / …).
- `python3 table_map.py derive <tune_folder>` — recompute per-band evidence
  from the labeled tune pairs so the JSON stays auditable, not magic.

`thundermax_parser.py compare` now also prints a **table** column and a
per-category byte summary, using this map when it's importable (degrades
gracefully if `tables.json` is absent). Confidence tiers: **high** = band
isolated cleanly to one intent across independent pairs; **medium** =
one-sided evidence; **low** = churns on every edit (autotune/checksum). Treat
medium/low bands as *located but not cell-accurate*.

## Current state (2026-07-13)

**TMax Command Center (web UI) — build in progress.** Plan (adversarially
vetted by a 34-agent review) lands one commit per phase. `src/webui_server.py`
on **:8090** serves the SPA from `web/` plus `/api/*`; it supersedes
`api_server.py`/`tmax-api.service` (:8181) in the final phase.

- `src/guardrails.py` — SINGLE SOURCE of every numeric safety limit (AFR/spark
  windows, ±2°/step, VE step warn ±2% / provisional block ±5%, autotune gates,
  226°F heat knee, decel-pop protocol, timing backbone curve). Only its code
  checks can hard-block a proposal — never the LLM.
- `src/webui_core.py` — unified retrieval (ES kNN + corpus keyword legs with
  short-timeout wrappers and visible degradation), resumable ChatJob SSE
  buffers (replay-from-0 for iOS resume, Last-Event-ID trim, cancel closes the
  Ollama socket), sessions in `data/sessions/` mirrored to
  `~/hermes-rag/tune-log/` in the hermes-tune format, GEN_LOCK generation slot.
- `tune_assistant.py` refactor (CLI byte-identical): `scored_passages()`
  extracted; `learn_write`/`sync_folder` take optional `profile`; `sync_folder`
  re-reads bike_profile.json before its read-modify-write.
- [x] Phase 1: server skeleton, auth cookie, MIME map, health/profile,
      dashboard + safety card, responsive shell (safe-area, visualViewport)
- [x] Phase 2: streaming chat with citations — verified live: 424-token
      replay, terminal expired events, session + tune-log mirror
- [x] Phase 3: tune library + visual diff — cached NAS index (sha1 → 
      `data/tune_cache/*.bin`, never `.tbw`), diff endpoint memoized, category
      rollup + confidence badges; verified on synthetic timing-band pair.
      **CORRECTION (2026-08-20): the earlier "NAS layout changed" note was
      wrong.** `ADMIN/LOCAL NAS/THROTTLE LOGIC` is intact and fully readable —
      70 `.tbw` in the top folder (all exactly 214470 bytes), 153 across the
      tree. Nothing hangs. The July failure was `tower-nas-path` having the
      Buffalo share *staged* (an empty local dir) while the NAS was down, not
      a deleted folder. NAS host is **192.168.50.92**. `TMAX_TUNES_DIR` is no
      longer required. Two gotchas: filter macOS `._*` AppleDouble sidecars
      (4096 bytes, they will crash a naive parser), and a complete writable
      mirror exists at `~/tmax-exchange/tunes-from-nas` — pointing at it loses
      the NAS's read-only protection of the `.tbw` files.
- [x] Phase 4: journal → KB loop with vetting provenance (`src/webui_journal.py`).
      An entry linked to a proposal that reached `validated_by_ride` is written
      as `thundermax_learned_<setup>_…` (the `_learned_` marker earns the 1.6
      setup boost in `scored_passages`); everything else is written as
      `thundermax_journal_…` — still matching DOC_GLOB so it stays retrievable
      and citable, but boost 1.0, `unvetted: true` in ES, and an UNVETTED banner
      inside the retrieved TEXT. `upgrade_entry()` is the only path that flips
      it, and only the proposal state machine calls it. Verified live end to end.
- [x] Phase 5: proposals + adversarial vetting (`src/vetting.py`). State machine
      `draft → vetted → approved → applied_on_bike → validated_by_ride`, with the
      loopholes closed: `vetted` is enterable ONLY by the vet handler on a
      zero-block result; `approved` needs a report that EXISTS with zero blocks
      (absent ≠ pass) plus an explicit acknowledgment when
      `checks_unverifiable > 0`; `changes` are immutable (an edit forks a new
      draft); attaching/detaching a dyno run re-vets. Cross-proposal stacking
      guard stops three "safe" ±2° steps laddering into +6° one approval at a
      time. Only `guardrails.check_change()` can hard-block — the LLM reviewer's
      OBJECT is a loud warn, never a block, and the report records WHICH model
      refuted it (fast/smart → deep 70b, deep → 32b, never the 14b).
- [x] Phase 6: virtual dyno + animated gauges. Deterministic physics, no LLM.
      VE edits model as an AFR shift, never a torque multiplier (that draft
      over-predicted 4–5× by double-counting with the AFR curve). Canvas gauge
      cluster with true sub-sample interpolation (measured ~61 fps, 120 distinct
      playhead positions in 2 s against a 20 Hz stream). Every pull-derived
      issue is advisory.
- [x] Phase 7: `systemd/tmax-web.service` — user unit, linger already on,
      `ProtectHome=read-only` + a ReadWritePaths allowlist so "never write a
      `.tbw`" is structural, not just intended. Ollama/ES/NAS are deliberately
      NOT dependencies: it must come up in the garage when they are down.
      Retiring `:8181` is deferred per the decision below.

- [x] **Tune↔dyno bridge + dyno self-test** (`src/dyno_bridge.py`), answering
      "is the dyno thinking correctly, and is it reading my tune correctly?"
      - `self_test()` — 13 known-answer and invariant checks on the physics,
        runnable at runtime (`GET /api/dyno/selftest`, or
        `python3 src/dyno_bridge.py selftest`), not just in pytest. **13/13
        pass.** It is explicit that this proves self-consistency only: the
        model computes what it claims to compute. It cannot prove the model
        matches the real engine — nothing replaces a validation ride.
      - `read_tune(path)` — what the dyno can see per band, with confidence,
        plus an explicit `unknown[]` of what it CANNOT determine.
      - `changes_from_diff(a, b)` — derives dyno changes from a real A→B tune
        diff. Validated against ground truth: on the pair whose filename says
        "retardedtiming-1degreeglobaly" it independently recovered −49 raw in
        127/128 records = **−1.0°** from the bytes alone.

**What the dyno can honestly read out of a `.tbw` today** (and the code says so
rather than guessing): raw cell distributions per named band, which bands a
change touched, and the **direction** of every change. It can size exactly one
band in engineering units — `timing_limit_array` — and that band is a *clamp*,
not a commanded map. **So today no real tune diff yields a change the dyno can
simulate**; `BAND_TO_DYNO_TABLES` is empty and that emptiness IS the finding.
It cannot read an absolute AFR/VE/fuel value, and `rpm_band`/`tps_band` are
null for everything because tables.json has no offset→(rpm, TPS) mapping.
`BAND_AXES` is deliberately empty and a self-check FAILS if anyone fills it
with a guess — a fabricated band would silently mis-scope the safety checks.
The single-map ground-truth experiment below is what unblocks all of it.

Verified live over HTTP (real server, real guardrails): approval of an unvetted
proposal refused 409; hand-setting `vetted` refused 409 `vet_only`; the house
decel-pop change runs clean (0 issues, peak duty 64.6%, knock 0.06); the unsafe
+3° WOT change gains no power while knock risk more than triples to 0.206 and
raises `spark_over_ceiling` + `past_mbt_no_gain`.

### Two retrieval bugs found while verifying Phase 4 (both fixed)

**1. Ollama was silently truncating almost all retrieved context.** The tower
runs `OLLAMA_CONTEXT_LENGTH=4096` (see `systemctl show ollama -p Environment`),
and the chat request set no `num_ctx`. We pack up to 24 000 chars (~6 900
tokens), so most of the reference material — including citation `[1]` — never
reached the model, with no error anywhere. Symptom: correct retrieval, generic
answers; asked what AFRs a ride recorded, the 32b invented plausible values off
a blank report template. Fixed in `webui_core`: `TIER_CTX` sets `num_ctx` per
tier (fast/smart 16384, deep 8192 — the 70b is already ~0.7 tok/s), the
retrieval budget is sized from that window (`context_budget()`), and
`_fit_messages()` drops the oldest history turns rather than letting the server
truncate the question. **`~/hermes-rag/hermes_rag.py` has the same bug** — its
`ask()` sends ~10 chunks × 1500 chars with no `num_ctx`, so the hermes-rag brain
is losing context too. Not fixed here (different project).

**2. Context dilution.** With ~22 sources merged, one first-hand ride entry is
2.7% of the block, and blank ride-report templates ("Cruise AFR: ______") look
exactly like the answer to "what did I record?". The context is now split into
`=== MY OWN RECORDS ===` and `=== REFERENCE MATERIAL ===`, each source labelled
with what it IS (vetted / unvetted / reference), and `CITE_RULE` states that a
template's empty fields are a form, never data. The citation reminder is also
repeated after the excerpts — the smaller tiers ignore an instruction that only
appears thousands of tokens earlier in the system prompt. After both fixes the
14b answers "12.6 WOT, 14.1 cruise, no pops" with an inline `[1]`.

## ⚠ BRANCH DIVERGENCE — read before merging (2026-08-20)

This branch (`worktree-tmax-command-center`) forked at `19958e5` and does NOT
contain three commits that are on `main`:

- `58ef1fe` — competitor-tuner guardrail (down-ranks Power Vision / Dynojet /
  Power Commander passages ×0.15; SYSTEM_PROMPT says ThunderMax is the only
  tuner, engine is air/oil-cooled). **Real safety content this branch lacks.**
- `c6eb717` — stop tracking `.claude/worktrees`.
- `01fcfe4` — **a complete, independent "TMax Command Center shop UI"** built
  2026-08-19: its own `webui_core.py` (938 lines), `webui_server.py` (365),
  `guardrails.py` (220), all six views, live on `:8181`. Same plan, same file
  names, written in parallel — so a merge conflicts on nearly every file.

It also carries hardware facts this branch was missing, now folded into
`bike_profile.json`: the bike runs **6.3 injectors** (S&S 550 / CAM2, base map
`HXSSEDCAAN061617`), never flash a `*55inj*` map onto them, `17AUG…v6` means
version 6 not 6.3 injectors, and do not lock 330–345°F AutoTune trims (well
above the 280°F disable gate). The virtual dyno had been seeded 5.5 g/s from a
superseded corpus note; duty scales inversely with flow, so every simulated
pull was reading against the wrong hardware (baseline peak duty 74% → 64.6%
once corrected). `virtual_dyno` now takes injector flow from
`bike_profile.json` so the two can never disagree again.

**DECIDED (Joshua, 2026-08-20): run side by side, then retire `:8181`.**
`main`'s shop UI keeps `:8181` and is not touched. This branch runs on
**`:8092`** (`:8090` is AI Operator — do not take it) as `tmax-web.service`,
a *user* unit. Once Joshua has ridden with it and is satisfied, retire
`tmax-api.service` and migrate its ufw LAN+tailnet rules 8181 → 8092. Until
then **no merge to main** — the two implementations both define
`webui_server.py`/`webui_core.py` and would conflict on nearly every file.

Branch is pushed: `origin/worktree-tmax-command-center`.

## Prior state (2026-07-12)

- [x] **`tmax` unified CLI** — one entry point for parser, table map, and
      assistant; auto-starts Ollama when needed; `tmax verify` self-check
- [x] Parser: integrity, base-map ID, header decode — tested on real tunes
- [x] Parser: region diff (`compare`) with delta stats **+ named-table labels**
- [x] Parser: decode-report generation matching the shop template
- [x] Parser: batch `scan` index of a tune folder
- [x] Assistant: Ollama-backed `ask` / `chat` / `analyze`
- [x] **`analyze` is grounded**: it feeds the LLM the *classified* diff
      (categories + confidence), not raw hex, and instructs it to describe
      only what actually changed — verified live against the global −1°
      timing pair (correctly identified; no invented features)
- [x] **Test suite**: 13 unit tests on synthetic tunes (`tests/`), no
      NAS/Ollama required; wired into `scripts/verify.sh`
- [x] Ollama on `127.0.0.1:11434`; assistant auto-routes per question:
      `qwen2.5-coder:14b` (fast, on the RTX 5060 Ti GPU) for lookups,
      `hermes3:70b` (deep-thinker, slow ~0.7 tok/s) for tuning strategy and
      `analyze`. Overrides: `--fast` / `--deep` / `--model`. (2026-07-13)
- [x] **Map table offsets to named bands** — AFR target, AFR/VE pages, fuel
      pages, timing map, timing-limit array, fuel/rich correction, autotune,
      metadata (`tables.json`, confidence-tiered)
- [~] Confirm raw→engineering scaling: timing ≈49 raw/deg (medium); other
      tables still need one TMax ground-truth cell each (see below)
- [ ] Split real map pages out of the `0x3C0–0x5132` shared-churn block with
      surgically-isolated single-table edits
- [ ] Optional: GPU accel (RTX 5060 Ti present but NVIDIA driver not installed)

### The one high-value experiment to unlock cell-accuracy

For each band flagged `needs_ground_truth` in `tables.json`: in TMax Tuner,
change exactly **one** map (e.g. AFR target only), save as a new `.tbw`, then
`table_map.py classify old.tbw new.tbw`. A single-table edit isolates that
band cleanly from checksum churn; reading one known cell value in TMax and
matching it to the raw bytes locks both the axis order and the unit scale.

## Ground rules

- **Never write to `.tbw` files.** Read-only until the format is fully
  confirmed. A corrupted flash can strand the bike.
- Anything the assistant suggests still goes through the validation-ride
  protocol before it's trusted.
- NAS paths are the source of truth for data; this repo holds code only.
