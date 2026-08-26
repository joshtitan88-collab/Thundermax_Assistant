---
title: The ThunderMax assistant is an open loop — no measured engine data has ever entered it
date: 2026-08-26
source: first-hand audit of the codebase and NAS by Claude Code, 2026-08-26
status: reference — engineering finding, not a tuning claim
setup: m8-131-lrst-2into1-tbw
---

# No measured data has ever entered this project

The single most important thing to know about the ThunderMax tuning assistant,
because it bounds what every answer it gives is worth.

## The finding

A full sweep of the codebase (~10,000 lines across 12 modules) and the whole
NAS tree on 2026-08-26 found **zero ride datalogs and zero datalog parsing**.

- NAS tree: 153 `.tbw`, 33 PDFs, 19 zips, 4 CSVs. The CSVs are *recommendation*
  tables from earlier AI sessions, not recordings.
- Codebase: not one line reads a datalog. No CSV/log ingestion of any kind.

## Why it matters

`virtual_dyno` predicts, `guardrails` bounds, `vetting` argues — and none of
them has ever been compared against what the engine actually did. Concretely:

- The proposal state machine ends at `validated_by_ride`, and that transition
  is **Joshua typing a journal entry from memory**, not a measurement.
- `dyno_bridge.self_test()` passes 13/13 and is explicit that it proves
  *self-consistency only* — the model computes what it claims to compute. It
  cannot prove the model matches the engine. Since nothing ever measures its
  error, it never will.
- The house rules say "always log TPS, RPM, AFR target vs actual, CHT, trims."
  Nothing in the system reads those logs, so the rule is aspirational.

**Practical consequence for anyone answering tuning questions from this
corpus:** any claim about what a change *did* on this bike is inference from
documentation and modelling, never measurement. Say so. Do not present a
simulated result as an observed one.

## The heat question is the one this blocks

The tune filenames say what the real problem is: `hopefullycooler`,
`hopefullycoolerV2`, `25SEPTEMBER2025COOLERTUNEWITHMOREFUELANDTIMING`. Heat is
the recurring theme across the whole tune history.

`guardrails` carries a 226°F progressive-retard knee and a 280°F AutoTune
disable gate. But **with no CHT ever recorded, the system cannot tell whether
any of those cooling attempts worked.** That is the question the entire project
exists to answer, and today it is unanswerable.

## What would close it

One exported ThunderMax datalog with TPS / RPM / AFR target vs actual / CHT.
That turns the virtual dyno from a model into a *calibrated* model and turns
`validated_by_ride` into a measurement. Until then the loop is open.

## The one measured signal that does exist

The ECM has been recording all along — AutoTune writes its learned correction
back into the tune file. See
[[thundermax_reference_2026-08-26_autotune-learned-feedback]].

Related: [[thundermax_reference_2026-08-26_nas-tune-storage-intel]]
