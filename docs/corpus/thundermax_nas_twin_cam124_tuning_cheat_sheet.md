---
type: reference
title: Twin Cam124 Tuning Cheat Sheet
source: throttle-logic/OL TUNES/Twin Cam124 Tuning Cheat Sheet.pdf
---

Twin Cam 124" — ThunderMax Quick Reference
Cheat Sheet
Bike Profile: Harley-Davidson Dyna, Twin Cam 124" (S&S / big-bore style)
ECU: ThunderMax EFI (TBW)
Fuel: 91–93 octane
Exhaust: 2-into-1 performance




🔧 AFR Targets
     • Cruise (light load, steady): 13.9–14.2
     • Roll-on / Mid-load: ~13.0 (torque & cooling)
     • WOT / High-load: 12.6–12.8 (safe power)
     • Decel / 0–2% TPS: 13.8–14.0 (smooth transitions)




🔥 Ignition Timing Rules
     • Belly Region (roll-on ping zone):
     • 1500–2600 rpm @ 20–60% TPS → −2° to −3° if knock
     • 2800–3300 rpm @ 20–60% TPS → −1° to −2° if knock persists
     • WOT: −1° safety trim only if knock detected (keep strong base power)
     • Heat Strategy:
     • Mild retard (−1° to −2°) above ~240–250°F CHT
     • Twin Cams don’t need aggressive M8-style 226°F retard curves
     • Idle Spark: Unify 768–1280 rpm (≈16–20°) with gentle gradient into part-throttle




⚙️ Idle & Driveability
     • Commanded Idle RPM: 950–1020 rpm (smooth for TC124)
     • Tip-in: Blend low-TPS cells to avoid step changes → clean clutch-out launches




🏍️ Decel Strategy
     • Decel Fuel Cut: OFF (prevents oxygen spikes / pop)
     • Fuel Enrichment: +4–6% at 0–2% TPS (≈1800–3300 rpm)




                                                       1
✅ Validation Checklist
     • 🔋 Battery >12.3V KOEO, >13.8V running
     • 🌡️ IAT/CLT believable vs ambient
     • 📊 AFR trims within ±5%
     • 🔧 Injector duty <85% at WOT
     • 🔥 No ping in roll-on or WOT
     • 🗺️ VE & Spark tables smooth (no spikes)




📂 Versioning
     • Save maps as: YYYY-MM-DD_TC124_<description>_vX.tbw
     • Archive with:
     • Tune Report
     • Fingerprint (SHA256)
     • Ride logs (TPS/RPM/AFR/CHT)




📌 Road Test Plan
    1. Warm up fully
    2. Mixed ride (15–25 min):
    3. Roll-on 2000–3300 rpm @ 20–60% TPS
    4. 1–2 WOT pulls (3rd gear)
    5. 70–80 mph steady cruise
    6. 3500→2000 rpm decel
    7. Export logs & review: AFR, trims, temps, spark advance



Twin Cam Tuning Principle: Keep it simple, smooth, and heat-aware. Adjust belly timing only as needed,
preserve WOT strength, and manage decel fuel for rider comfort.




                                                    2

