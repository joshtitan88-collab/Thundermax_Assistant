---
title: Reading the bike's own AutoTune learning back out of .tbw saves
date: 2026-08-26
source: src/learned_feedback.py, built and validated by Claude Code 2026-08-26
status: reference — method + findings, not a ride-validated tuning claim
setup: m8-131-lrst-2into1-tbw
---

# AutoTune learning is the only measured signal available today

**Short answer to "what has AutoTune been learning on my bike?"** — as of
2026-08-26, across the 9-save `latestandgreatest` family, AutoTune learned
corrections show **no persistent directional bias**. Every cell with enough
movement to test moved up 2 and down 3, or up 3 and down 2: balanced
oscillation around the target, which is what a converged AutoTune looks like.
It is not pulling consistently rich or consistently lean anywhere that can be
demonstrated. The one candidate region (`learned_ve_bulk`, 0x159A7–0x15AC7,
trending lean) is held at *suggestive* because it only moved on 3 of 4 saves.
Magnitudes are unknown — the scale of these cells is unconfirmed — so this is a
statement about direction, not about how many percent of fuel.


Since no ride datalog exists
([[thundermax_reference_2026-08-26_no-ride-data-open-loop]]), the one place
real engine feedback survives is inside the tune files themselves: **AutoTune
writes its learned fuel correction back into the `.tbw`.** Every save made
after a ride carries the ECM's own verdict on where the base map is wrong, and
a sequence of saves is a longitudinal record of that verdict changing.

`src/learned_feedback.py` reads it. `dyno_bridge` deliberately *excludes* those
bands as churn — correct when asking "what did this edit change?" — so this
module asks the opposite question, because the churn IS the measurement.

## What it can and cannot say

The learned bands are `confidence: low` in `tables.json` and their raw →
engineering scale is unknown. So it reports **direction** and **persistence**
only, never AFR% or VE%. Sign is scale-free, which is what makes a binomial
sign test valid without knowing the scale at all.

Bands read: `autotune_learned` (0x0DDC5–0x0F1C4) and `learned_ve_bulk`
(0x157C7–0x177C4). AutoTune cells are **signed** — a −1 trim is stored as
0xFFFF, and reading it unsigned turns it into a +65535 outlier that dominates
every ranking.

## Three statistical traps that each produce confident nonsense

1. **Per-cell testing has no power.** Benjamini-Hochberg across ~776 moving
   cells needs p ≤ 6.4e-5 at the top rank, which would take about 17
   consecutive same-direction saves for a single cell. A "0 findings" result
   from a per-cell test says nothing about the bike. Pool adjacent cells into
   windows instead — fewer tests, more observations each.
2. **Pooling adjacent cells overstates significance.** AutoTune smooths
   corrections across neighbours, so cells are correlated and the true
   independent sample size is smaller than the raw count. Always report a
   conservative statistic alongside: one observation per *save*.
3. **A single write across many cells is not a trend.** On the
   `latestandgreatest` series, 48 adjacent `learned_ve_bulk` cells all moved
   down *inside one save*, and a naive pooled test scored that p = 1.6e-13 as
   though 48 independent measurements agreed. It is one write. Require movement
   across ≥3 separate saves before any p-value is allowed to speak.

## What the tunes actually say today

- **`autotune_learned` across the 9-save `latestandgreatest` family: no
  directional bias at all.** Every cell with enough movement to test is up2/dn3
  or up3/dn2 — balanced oscillation, i.e. AutoTune converged and hunting around
  its target. A real and useful negative.
- **`learned_ve_bulk` moves in whole contiguous blocks on single saves** (42 of
  45 windows). That fits `tables.json`'s "or a large checksum-covered block"
  hypothesis far better than a per-cell trim store. Treat it as low-value for
  feedback until proven otherwise.

## A `tables.json` correction

`learned_ve_bulk` is recorded as `stride: 4`, and the parser's `_grid_for`
derives a 4-byte int from that. The bytes are actually a repeating 4-lane
pattern of 16-bit fields:

```
00 00 | 12 00 | 12 00 | 12 00     = 0, 18, 18, 18, repeating
```

So a stride-4 `i32` read straddles two independent fields and reports 1179648
for a pair really holding 0 and 18. Read these bands on a 2-byte grid. The
band's true record layout is still unconfirmed.

Also note both learned bands start on **odd** file offsets. Snapping to an even
offset reads every record one byte early and inflates deltas by 256 — the bug
fixed on 2026-08-20 that had been reaching `tmax compare` and the web diff.

## The cheap experiment that would unblock this

The long tune families are contaminated: edits happen between saves, so
AutoTune relearns from a new baseline and persistence is scrambled. The clean
AutoTune-only series (`automaprun` 1/2/3, `hopefullycoolerV2AUTOTUNE` 1/2/3,
`steep timingautotuned` 1/2/3) are only 3 saves each — below the threshold.

**Five or more consecutive AutoTune saves on ONE map with no edits in
between** would give the first properly-powered read of where this engine
actually wants fuel. That is a riding task, not a coding task.

## Usage

```bash
python3 src/learned_feedback.py lineage "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC"
python3 src/learned_feedback.py report  "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC" --family latestandgreatest
python3 src/learned_feedback.py trend a.tbw b.tbw c.tbw -v
```
