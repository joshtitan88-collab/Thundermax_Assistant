---
type: reference
title: ThrottleLogic_SuperGPT_All-in-One
source: throttle-logic/ThrottleLogic_SuperGPT_All-in-One.pdf
---

ThrottleLogic SuperGPT — All■in■One Guide
Date: August 29, 2025
For: Joshua Henry — 2023 Low Rider ST, 131ci Stage IV, 2■into■1 exhaust, 91–93 octane.



Overview
A multi■agent workflow that analyzes ThunderMax exports, proposes cell■level AFR/VE/Spark
changes, runs pre■flash safety checks, and produces a printable Tune Report.

Roles
Coral — Data & Map Engineer: validate CSVs, compute diffs, emit patch.json.
Wrench — Tuning & Mechanics: propose conservative, thermal■aware changes.
Sentry — Safety: 50■point pre■flash checklist; block unsafe flashes.
Teacher — Docs: dated Tune Report and next■ride plan.

Workflow
1) Ingest → 2) Analyze → 3) Propose (patch + rationale) → 4) Document → 5) Iterate.

Data You Provide
• ThunderMax CSV exports for AFR/VE/Spark (front/rear) • AutoTune trims • Environment notes (temp,
humidity, octane) • Observed symptoms (ping ranges, decel pop, stutter).

Patch JSON (Cell■Level) Example
{
    "version": "2025-08-29",
    "ops": [
     {
       "table": "VE_FRONT",
       "axis": {
         "x": "RPM",
         "y": "TPS"
       },
       "deltas": [
         {
           "rpm": 1792,
           "tps": 4.0,
           "op": "add",
           "value": 0.8
         },
         {
           "rpm": 2048,
           "tps": 6.0,
           "op": "set",
           "value": 72.5
             }
          ],
          "notes": "Smooth tip\u2011in."
        },
        {
          "table": "SPARK_REAR",
          "axis": {
             "x": "RPM",
             "y": "TPS"
          },
          "deltas": [
             {
               "rpm": 2816,
               "tps": 8.0,
               "op": "sub",
               "value": 1.0
             }
          ],
          "notes": "Rear anti\u2011ping trim for hot weather."
        }
    ]
}

Timing vs Engine Temperature — Pinging Strategy
Retard timing progressively past ~226°F to suppress knock during heat soak; test, verify, then refine.

Timing vs TPS @ RPM — Belly vs WOT
If roll■on ping disappears at WOT, lower the curve belly only; if it persists or worsens at WOT, lower
both belly and WOT (WOT more if worse). Use −1–2° for light ping, −3° for moderate, −5°+ for heavy.

Smooth Tip■In and Idle Hunt
Unify idle■range spark values (e.g., 768–1280 RPM) and ensure gentle gradients through low■TPS
pages to prevent stumbles and hanging RPM.

Decel Pop Control
Use coherent decel fuel settings and avoid fuel cut patterns that cause oxygen spikes; verify exhaust
leaks first.

Pre■Flash Safety (Condensed)
                    • Battery >12.3V KOEO, >13.8V running; grounds tight.
                    • O2 sensors switching plausibly; IAT/CLT believable vs ambient.
                    • Fuel pressure holds spec; injector sizing/duty stay within headroom.
                    • Timing tables free of spikes/saw■teeth; hot■temp retard curve present.
                    • VE/AFR tables smooth; rear■cyl thermal bias accounted for.
USB/Driver & Utilities
If Windows fails to auto■detect, install the ThunderMax USB driver and always use the same USB port;
re■link after updates.
Distance■to■Empty (R■LO) restoration steps are included in the appendix of your kit.

Next■Ride Data Plan
Warm to operating temp; 15–25 minutes of mixed load; capture ping ranges (RPM/TPS), IAT/CLT
trends, and any decel events; report temps (steady vs stop■and■go).

Versioning
Name maps with date + increment (e.g., 2025■08■29_TL■Patch■r1). Store CSVs, patch.json, and
Tune Report together.
Appendix A — Quick Commands
Normalize CSVs → convert_thundermax_csv.py --vef ve_front.csv --ver ve_rear.csv --sf
spark_front.csv --sr spark_rear.csv --out normalized.json
Blend trims → autotune_merge.py --ve ve_front.csv --trims trims_front.csv --out ve_front_merged.csv
--alpha 0.3
Patch structure → tools/map_patch_example.json

Appendix B — Templates
A Tune Report .md template is included; copy, fill, and print to PDF.

