# Ground-truth experiment — locking the TBW cell scale and axis mapping

**Status:** ready to run. This is the top open task in COLLABORATION.md and the
single thing blocking the virtual dyno from ever reading a real tune.

## Why this is safe

**You never flash anything.** Every step is: open a tune in TMax Tuner, change
a number on screen, and **Save As** a new file. The bike is not involved and
does not need to be connected. Nothing this project runs can write a `.tbw`
either — the analyzer opens them read-only.

If at any point the software wants to write to the ECM, you have gone off
script. Stop and back out.

## What we're trying to learn

Today the project knows *where* each table lives in the file and *what
category* it is, but for almost every table it does not know:

1. **The scale** — how many raw units equal one AFR point / one degree / one
   VE percent.
2. **The zero point** — what engineering value raw `0` corresponds to. Without
   this we can read a *change* but never an *absolute* value.
3. **The axis mapping** — which byte offset is which (rpm, TPS) cell.

Right now the dyno can tell you the *direction* of a change and nothing more.
That is why `rpm_band`/`tps_band` come back `null` for every real tune diff:
a guessed band would silently mis-scope the safety checks, so none is emitted.

## The critical design rule: compare save against save

TMax Tuner rewrites metadata and per-section checksums **every time it saves**,
even with no edits. So the baseline must be *a save*, not the original file:

- ✅ `GT_A` (saved, no edits) vs `GT_B` (saved, one edit) → isolates the edit.
- ❌ `original.tbw` vs `GT_B` → mixes the edit with the save's own churn.

Also: **do not ride, connect the ECM, or let AutoTune run between saves.** Any
riding rewrites the AutoTune tables and buries the signal in learned-data noise.

## Which table first — AFR Target

Start with **AFR Target**. It is the best-conditioned target we have:

| | |
|---|---|
| band | `afr_target`, `0x01989`–`0x01BCA` |
| size | 577 bytes, 8-byte stride ≈ **72 cells** |
| confidence | **high** — isolates cleanly, does not churn on unrelated edits |
| why it's ideal | TMax displays AFR in real engineering units (e.g. `13.2`), so the value on screen IS the ground truth. It is a *commanded* map, unlike the timing-limit array, which is a clamp. |

(The main timing map is deliberately *not* first: its assumed 49 raw/deg scale
was tested against a labelled −1° tune pair and **rejected** — it moved in only
15 cells, all upward, as a ramp. It needs this same treatment afterwards.)

## The runs — 4 saves, about 10 minutes

Work in ONE TMax session, from ONE starting tune, ideally your current
`M8_131_550CAM_63inj.tbw`.

| save | what to do |
|---|---|
| **GT_A** | Open the tune. Change **nothing**. Save As `GT_A.tbw`. *(This is the baseline.)* |
| **GT_B** | Change **exactly one cell** of AFR Target — pick a mid-table cell, e.g. around **3000 rpm / 40% TPS**. Make the change **as large as TMax will accept** (e.g. drive it to the leanest allowed value). Save As `GT_B.tbw`. |
| **GT_C** | Same session. Change **that same cell** to a *different* extreme (e.g. the richest allowed value). Save As `GT_C.tbw`. |
| **GT_D** | Same session. Put that cell **back to its original value**, then change **one different cell in a far corner** — lowest rpm / lowest TPS, or highest / highest. Save As `GT_D.tbw`. |

Why each one:
- **A→B** gives the cell's byte offset and the raw-per-AFR-point scale.
- **B→C** re-measures the same cell. If the two disagree, the mapping is
  non-linear or something is misread — and we must not average that away.
- **A→D** gives a second known cell, which is what actually reveals the cell
  stride, the row stride, and whether the grid is rpm-major or TPS-major.

Use **big** changes. A large delta is unmistakable and cannot be confused with
rounding or noise.

## What to write down

For every edit, record — this is the ground truth, so precision matters:

- The table name **exactly as TMax spells it** (e.g. "AFR Target", not "afr_target")
- The cell's **rpm** and **TPS**
- The value **before**
- The value **after — as TMax displays it once entered**, not what you typed.
  If it clamps or rounds your entry, the displayed value is the truth.
- The **units** shown

A screenshot of the table with the changed cell visible is worth having for
every save.

## Then bring the files over

Save the four `.tbw` files to the USB stick as usual and drop them somewhere on
the tower, e.g. `~/tmax-exchange/ground-truth-<date>/`.

Run the fast check **before you walk away from the Windows machine**, so you
can redo a save while TMax is still open:

```bash
python3 src/ground_truth.py --example > gt.json     # template to fill in
python3 src/ground_truth.py check gt.json           # files present? edit actually saved?
python3 src/ground_truth.py analyze gt.json         # the answer
```

`check` catches the common failure modes immediately: a file that is not
214470 bytes, a different base-map ID, or a save that is **byte-identical to
the baseline** — which means the edit never actually took.

## What a good result looks like

The analyzer should be able to say:

- exactly one cell moved, in the `afr_target` band, at a specific offset
- raw delta ÷ AFR delta = **scale**, with the arithmetic shown
- absolute raw value + absolute AFR value = **zero point**
- B and C agree → the relationship is linear and the scale is trustworthy
- B and D together → the cell stride, the row stride, and the axis order

That is enough to fill in `tables.json` for AFR Target and to add the first
real entry to the axis map — at which point the dyno can, for the first time,
read an actual tune instead of an abstract list of deltas.

The analyzer proposes that patch. **It does not apply it** — you approve it.

## After AFR Target

Repeat exactly the same four-save pattern for each remaining band, in
descending value order:

1. `timing_map_main` — the rejected 49 raw/deg assumption needs replacing with a
   measured one.
2. `afr_ve_pages` / `fuel_flow_pages` — the big VE/fuel tables the dyno most
   wants to read.
3. `fuel_rich_correction`.

Each one takes the same ten minutes and permanently converts a "located but not
cell-accurate" band into a readable one.
