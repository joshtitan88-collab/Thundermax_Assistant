---
type: reference
title: ThunderMax_131_Tune_Changes
source: throttle-logic/TMAX TUNING MANUAL/ThunderMax_131_Tune_Changes.pdf
---

ThunderMax 131 Tune – Recommended Changes

AFR Targets
•   Cruise/light load (≤15% TPS, 2,200–3,200 rpm): 14.2–14.4
•   Mid-load roll-on (20–60% TPS, 2,000–3,200 rpm): 13.2–13.4
•   Heavy/WOT (≥60% TPS, ≥2,800 rpm): 12.6–12.8
•   Idle cells: 13.6–13.8



Ignition Timing Adjustments
•   Retard –2° to –3° in the 2,000–3,200 rpm & 20–60% TPS band (timing belly).
•   Keep WOT rows the same unless ping is heard – then pull –1° to –2° there.
•   Set idle timing (768/1024/1280 rpm) to same value, ~18°, to stabilize idle.



Timing vs Engine Temperature
•   226–240°F: –1°
•   241–260°F: –2°
•   261–280°F: –3° to –4°



Decel / Tip-in Behavior
•   Decel Fuel Cut: OFF (leave disabled).
•   Decel Post-Fuel Enrichment: increase to 12–14% (default is 16.08%).



Starting / Driveability Settings
•   Accel Fuel (pump shot): 8.5–9.0 ms (instead of 10+ ms).
•   Cranking Fuel: ~10–11.5 ms (lean toward 10.0 if hot starts are rich).
•   Initial Fuel Pulse: 130–140% (instead of 150+%).



Idle & Throttle Settings
•   Idle RPM: 980–1,020 (target ~1,000).
•   Throttle Progressivity: 3 for smooth, 2 for snappier TBW response.



Safety / Limits
•   Rev Limit: 6,800–6,900 rpm (safe for 131 with good valve springs).
•   Engine Temp Alarm: lower to 330–340°F (instead of 400°F).
•   Rear cylinder may need –1° timing in the belly band if rear head temps run 15–20°F hotter.



Validation Test Loop
•   Warm engine to ~230°F.
•   3rd gear roll-ons 2,000→3,500 rpm at 30–60% TPS.
•   Listen for ping; watch head temps.
•   If ping remains, remove another –1° in that RPM/TPS zone.
•   Check cruise (2,500–3,000 rpm, ≤15% TPS). If surging, enrich AFR to 14.2 and smooth VE table.

