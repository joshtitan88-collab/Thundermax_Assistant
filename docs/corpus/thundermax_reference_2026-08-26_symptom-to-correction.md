---
title: What to change on a ThunderMax tune for a given symptom
date: 2026-08-26
source: src/advisor.py — every remedy filtered through guardrails.check_change()
status: reference — remedy book; provenance marked per remedy
setup: m8-131-lrst-2into1-tbw
---

# Symptom → correction

Run `tmax fix "<describe it in your own words>"`. Deterministic and offline —
it gives the same answer every time and works with Ollama down.

Every remedy below has been checked against `guardrails.check_change()`, so
none of them can propose something the house safety limits would block. A
change that draws a block is dropped whole, never rescaled to sneak under the
limit — the step limits encode a step-then-verify sequence, and shrinking a
change to make it "pass" defeats the sequencing that makes it safe.

## The remedies

| Symptom | Change | Provenance |
|---|---|---|
| Decel pop, mostly above 4000 rpm | **+2% VE** @ 0–2% TPS, 3840–4608 rpm | **validated on this bike** |
| Decel pop across a broad rpm range | **−1° spark** @ 0–2% TPS, 2048–2816 rpm | **validated on this bike** |
| Running hot / heat soak | step 1: **−0.4 AFR** (→13.8) @ 2048–3584 rpm, 10–40% TPS · step 2: **−2° spark** in the belly | inferred |
| Knock / ping under load | **−2° spark** @ 1800–3500 rpm, 20–70% TPS | inferred |
| Surge or hunting at cruise | **−0.5 AFR** (→13.8) @ 2048–3584 rpm, 5–25% TPS | inferred |
| Rich, sooty plugs, fuel smell | **+0.5 AFR** (→14.2) @ 2048–3584 rpm, 5–25% TPS | inferred |
| Stumble off idle on tip-in | **+2% VE** @ 768–1792 rpm, 0–10% TPS | inferred |
| Flat at WOT | **−0.3 AFR** (→12.6) @ 3840–5200 rpm, 80–100% TPS | inferred |
| AutoTune not learning | **no table change** — it is a temperature gating problem | **validated** |

**"Validated" means ridden and confirmed on THIS bike.** The decel-pop protocol
and the AutoTune gating rules are the only entries that earn it. Everything
else is inference from the manuals, the timing backbone and physics — sound,
but not yet ridden here. That distinction is enforced by a test, so it cannot
quietly inflate.

## Rules that apply to all of them

- **One change per validation ride.** Where a remedy lists two changes they are
  ordered steps, not a list. Stacking them means that if the bike changes you
  will not know which change did it.
- **Nothing here is a measurement.** There is no ride datalog in this project,
  so every remedy is a hypothesis. Each ships with what to log and what would
  prove it wrong — if the refutation condition is true, back the change out.
- **Log every time:** TPS, RPM, AFR target vs actual, CHT, AutoTune trims.

## Things worth knowing before you change anything

- **AutoTune only learns between 200 °F and 280 °F.** Below is cold-start
  enrichment, above is heat soak. Trims learned at 330–345 °F are garbage and
  must never be locked in.
- **Heat is this bike's recurring theme** — the tune history is full of
  `hopefullycooler`, `COOLERTUNEWITHMOREFUELANDTIMING`. With no CHT ever
  logged, nothing here can yet tell you whether any past cooling attempt
  actually worked. See
  [[thundermax_reference_2026-08-26_no-ride-data-open-loop]].
- **Leaning for economy raises heat.** On this bike that is a bad trade.
- **Do not chase WOT power with timing.** The hard ceiling is 32°, and the
  virtual dyno showed a +3° WOT change gaining no power while more than
  tripling knock risk. Check injector duty first — these are 6.3 g/s
  injectors, and over ~80% duty you are out of fuel, not out of tune.
- **Rear cylinder timing must be equal to or retarded from the front.** The
  rear runs hotter. Guardrails blocks any change that advances it past front.
- **Knock is the one symptom where doing nothing is worse than an imperfect
  fix.** Retard first, diagnose after.

Related: [[thundermax_reference_2026-08-26_flash-safety-and-tune-watcher]] ·
[[thundermax_reference_2026-08-26_autotune-learned-feedback]]
