---
type: reference
title: ThrottleLogic Project Memory (Oct 2025)
source: THROTTLE LOGIC/ThrottleLogic_ProjectMemory.json
---

# ThrottleLogic project memory (recovered from the Oct 2025 AI sessions)

Project: ThrottleLogic Reverse Engineering & SuperGPT Framework  
Created: 2025-10-09T11:14:22.765708

## Key tuning strategies (validated shop history)
- **Timing vs Engine Temp**: Progressive retard past 226°F to prevent ping during heat soak.
- **Belly WOT Rule**: If ping disappears at WOT, lower belly only; if persists, lower both; if worse, lower WOT more.
- **Idle TipIn Smoothness**: Equalize spark 768–1280 RPM and ensure low-TPS gradients are smooth.
- **Decel Pop Control**: Disable fuel cut, add +4–6% fuel at 0–2% TPS in 1792–3328 rpm band.

## Framework roles the old sessions used
- Coral: Data & Map Engineer – validates ThunderMax CSVs, computes diffs, emits patch.json.
- Wrench: Tuning & Mechanics – proposes conservative AFR/VE/Spark adjustments with temperature/ping awareness.
- Sentry: Safety Officer – executes 50-point pre-flash checklist, prevents unsafe flashes.
- Teacher: Reporter – generates Tune Reports and next-ride test plans.

## Planned next steps at the time
- Add 'Teacher' module for auto-generating Tune Reports in Markdown/PDF.
- Enhance 'Sentry' with smart detection for missing hot-retard curves, idle-band unification, and injector duty validation.
- Integrate Coral/Wrench/Sentry/Teacher into unified multi-agent pipeline with state tracking.
