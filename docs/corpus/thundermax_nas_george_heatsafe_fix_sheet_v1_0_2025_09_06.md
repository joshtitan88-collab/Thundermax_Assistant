---
type: reference
title: GEORGE_HeatSafe_Fix_Sheet_v1.0_2025-09-06
source: throttle-logic/OL TUNES/GEORGE_HeatSafe_Fix_Sheet_v1.0_2025-09-06.pdf
---

GEORGE.tbw — Rear Cylinder Overheat Fix Sheet (v1.0, 2025-09-06)
Bike: 2022 Road Glide 114 | High-Flow Breather | Jackpot 2-into-1 | S&S; 475C | SE 55mm Manifold | Stock
Injectors

Immediate Safety Edits — Do These First (ThunderMax)
•   Timing vs Engine Temp: Begin retard at 226°F; be −2° by ~248°F; −3° to −4° by 280–300°F.
•   Rear Timing vs TPS @ RPM: −2° in the 2,000–3,500 rpm / 50–80% TPS band (the 'belly'). If WOT ping
    persists, −1° at ≥80% TPS as well.
•   AFR vs TPS @ RPM: Cruise 10–25% TPS, 2,000–3,200 rpm → 13.8–14.2. Mid■load 30–70% TPS,
    2,000–4,000 rpm → 13.0–13.2. WOT ≥80% TPS, 2,500–redline → 12.6–12.8.
•   Rear Cylinder Fuel Trim: +3% to +5% fuel at 2,000–3,500 rpm / 30–70% TPS.
•   Idle RPM: 896–960 rpm (Module Configuration → Basic Settings → Idle RPM).

Recommended Global Settings (Set Him Up for Success)
•   Rev Limiter: 6,500 rpm (S&S; 475C on 114 typically signs off before 6,200; this keeps headroom).
•   Decel Fuel Cut: OFF (reduces decel pop and heat with 2■1 systems).
•   Closed■Loop Learning: Validate these changes with learning paused; re■enable after the validation ride.
•   Idle Decay/Hold: Modest decay to avoid flare (leave stock if unsure).
•   Speedometer Calibration: Stock 2022 RG tire/pulley if drivetrain is stock.

Where to Edit in TMax Software
•   Tuning Maps → Ignition Timing → Timing vs Engine Temp.
•   Tuning Maps → Ignition Timing → Rear Timing vs TPS @ RPM (adjust 2,000–3,500 rpm pages).
•   Tuning Maps → AFR vs TPS @ RPM (front/rear targets).
•   Tuning Maps → Rear Cylinder Fuel (regional +3–5% in the band above).
•   Module Configuration → Basic Settings → Idle RPM.

Validation Ride (10–15 minutes)
•   Warm to ≥230°F oil/head temp. Do a steady 40–50 mph cruise (10–25% TPS).
•   Perform 3–4 roll■ons from ~2,000 rpm to ~3,500 rpm at 30–70% TPS. Listen/feel for ping.
•   Do one short WOT burst from ~2,500–4,000 rpm. If ping → lower WOT timing −1° across ≥80% TPS.
•   Watch rear head temp and O■ trims. Persistently positive rear trim = add another +1–2% rear fuel in that
    band.

If It Still Runs Hot / Glows
•   Confirm Timing vs Engine Temp really retards starting ~226°F (no flat or advancing curve).
•   Ensure no positive rear advance offset left above ~60% TPS.
•   Check for exhaust leaks (head flanges/collector) and inspect O■ sensor wiring/connectors.
•   Verify fuel pressure at the rail; degrading pressure mimics lean. Use premium fuel.

Notes
Glowing headers are a classic sign of lean mixture and/or over■advanced timing at load. The S&S; 475C on a
114 favors richer mid■load fueling and a slightly softened rear■cylinder timing 'belly'. These edits keep EGT
under control without sacrificing roll■on power.

