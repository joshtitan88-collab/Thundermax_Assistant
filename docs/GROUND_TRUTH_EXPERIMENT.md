# Ground-truth experiment — locking the TBW cell scale and axis mapping

**Status:** ready to run. This is the top open task in COLLABORATION.md and the
single thing blocking the virtual dyno from ever reading a real tune.

> **Revision note (2026-08-20):** an earlier draft of this protocol had four
> saves. Building the analyzer against it exposed several ways that version
> would have produced an unusable result — most importantly no control save and
> no axis labels. The plan below is the corrected one. Do not work from a
> printout of the old version.

## Why this is safe

**You never flash anything.** Every step is: open a tune in TMax Tuner, change
a number on screen, and **Save As** a new file. The bike is not involved and
does not need to be connected. Nothing this project runs can write a `.tbw`
either — the analyzer opens them read-only.

If at any point the software wants to write to the ECM, you have gone off
script. Stop and back out.

## What we're trying to learn

The project knows *where* each table lives and *what category* it is, but for
almost every table it does not know:

1. **The scale** — how many raw units equal one AFR point.
2. **The zero point** — what engineering value raw `0` is. Without this we can
   read a *change* but never an *absolute* value.
3. **The axis mapping** — which byte offset is which (rpm, TPS) cell.

## The three rules that decide whether this works

**1. Compare save against save.** TMax rewrites metadata and per-section
checksums on every save. So the baseline must be *a save*, not the original.

**2. Make a SECOND unedited save (`GT_A2`).** This is the one most easily
skipped and it matters most. `GT_A` cancels the systematic
original-vs-saved difference, but not save-to-save *non-determinism* —
timestamps, a save counter, a re-seeded checksum. Against `GT_A` alone those
are indistinguishable from your edit, and they would hide in exactly the
`shared_churn_unresolved` block where the AFR table is nested. Two unedited
saves turn that from an assumption into a measurement.

**3. One TMax session, no riding, no module read between saves.** Any AutoTune
run rewrites the learned tables and buries a single-cell signal in noise.

## Which table first — AFR Target

| | |
|---|---|
| band | `afr_target`, `0x01989`–`0x01BCA` |
| size | 577 bytes, 8-byte stride ≈ **72 cells** |
| confidence | **high** — isolates cleanly |
| why | TMax displays AFR in real units, so the screen IS the ground truth. It is a *commanded* map, unlike the timing-limit array, which is a clamp. |

## ⚠ Before you edit anything: write down the axis labels

Open the AFR Target page and record, **in order**:

- every **rpm row label** down the side
- every **TPS column label** across the top
- the exact **table name** as TMax spells it, and the **units** string

Without these, no axis mapping can be derived *at all* — you would do every
save and still not know which offset is which cell. This takes 30 seconds and a
screenshot of the page covers it.

## The runs — 7 saves, about 15 minutes

All from ONE session, ONE starting tune (your current
`M8_131_550CAM_63inj.tbw`).

| save | what to do | what it buys |
|---|---|---|
| **GT_A** | Open the tune. Change **nothing**. Save As `GT_A.tbw`. | the baseline |
| **GT_A2** | Still no edits. Save As `GT_A2.tbw`. | **measures save-to-save churn** |
| **GT_B** | Change **one** mid-table cell (≈3000 rpm / 40% TPS) — go as **lean as TMax allows**. Save As `GT_B.tbw`. | cell offset + scale |
| **GT_C** | **Same cell**, now as **rich as TMax allows** — a big change in the **opposite** direction. Save As `GT_C.tbw`. | linearity + field width |
| **GT_D** | Put B's cell back to original. Change the cell **one TPS column over, same rpm row**. Save As `GT_D.tbw`. | **measures cell stride** |
| **GT_E** | Put D's cell back. Change the cell **one rpm row down, same TPS column** as B. Save As `GT_E.tbw`. | **measures row stride** |
| **GT_F** | Put E's cell back. Change a **far-corner** cell whose displayed value is **very different** from B's. Save As `GT_F.tbw`. | pins the zero point |

Why the sizes and directions matter:

- **Use the largest changes TMax will accept.** Two small edits can both stay
  inside the low byte, which leaves the field width — and therefore the zero
  point — unresolvable. Scale error also shrinks as the change grows.
- **C must go the opposite way from B**, and **F must be a cell whose value is
  far from B's**, because that is what rules out the narrow readings and turns
  a *delta* scale into an *absolute* one.
- **D and E are what separate cell stride from row stride.** A far-corner cell
  alone cannot; with only B and a far corner, the analyzer reports low
  confidence and refuses to emit an axis.

## What to record for every edit

- table name **exactly as TMax spells it**
- the cell's **rpm** and **TPS**
- value **before** — read it off `GT_A` after reopening it, not off the
  original tune, in case TMax normalises anything on save
- value **after, as TMax displays it once entered** — not what you typed. If it
  clamps or rounds, the displayed value is the truth.
- the **units** string, verbatim

Screenshot each changed cell. If you do a whole-map operation later, record
whether it was **absolute** (+0.2 AFR) or **relative** (+2%) — the analyzer
assumes absolute, and a percentage produces non-uniform raw deltas that read as
a dirty experiment.

## Then bring the files over

Drop the seven files in `~/tmax-exchange/ground-truth-2026-08-20/` (already
created). Fill in the declaration and run the fast check **before you close
TMax**, so you can redo a save while it is still open:

```bash
cd ~/Projects/thundermax-assistant
python3 src/ground_truth.py --example > experiment.json   # template
$EDITOR experiment.json                                   # fill in your readings
python3 src/ground_truth.py check   experiment.json       # did every edit save?
python3 src/ground_truth.py analyze experiment.json        # the answer
python3 src/ground_truth.py analyze experiment.json --patch  # proposed tables.json patch
```

`check` catches the common failures immediately: a file that is not 214470
bytes, a different base-map ID, or a save **byte-identical to the baseline** —
meaning the edit never took.

## What a good result looks like

```
HEADLINE
  SCALE : SCALE LOCKED: afr_target = <n> raw per AFR point (ABSOLUTE, high confidence)
  ZERO  : ABSOLUTE READING UNLOCKED — linearity tested, zero point pinned
  AXIS  : AXIS FORCED — rpm_major, cell stride <n>, row stride <n>
  QUALITY: CLEAN
```

The analyzer **proposes** the `tables.json` patch. It does not apply it — you
approve it. If B and C disagree it says so and **blocks** the patch rather than
averaging two readings that cannot both be right.

## Two results that would be findings, not mistakes

- **The edit lands outside `afr_target`.** COLLABORATION.md already notes that
  `timing_map_main` moves on a pure AutoTune pair, which argues the current
  band ranges aren't all correct. If your one-cell edit shows up somewhere
  else, that is a **new band discovery** — the analyzer reports the offset and
  the mismatch instead of failing.
- **One "single-cell" edit moves two records.** The ECM may store front and
  rear separately. The analyzer flags it, and when the two deltas are identical
  it names the front/rear-pair hypothesis and the byte gap.

## After AFR Target

Same seven-save pattern, in descending value order:

1. `timing_map_main` — its assumed 49 raw/deg was tested against the labelled
   −1° pair and **rejected**, so it needs a measured scale, not a patched one.
2. `afr_ve_pages` / `fuel_flow_pages` — the tables the dyno most wants.
3. `fuel_rich_correction`.
