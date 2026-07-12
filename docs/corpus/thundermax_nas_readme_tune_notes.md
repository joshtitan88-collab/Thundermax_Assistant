---
type: reference
title: README_TUNE_NOTES
source: throttle-logic/AI ADJUSTMENTS/CityFreeway_Tune_Delivery/README_TUNE_NOTES.txt
---


CityFreeway_Tune.tbw — ThunderMax Tune for Harley-Davidson SE 131 M8 (91 Octane)

Designed for:
- 🔁 Stop-and-go city riding
- 🛣️ Strong freeway roll-on torque
- ❄️ Reduced engine temps
- 🔇 Zero decel pop / smoother shifting

Tune Overview:
---------------
✅ Injector Scaling: Calibrated for 5.5g/sec
✅ AFR Zones:
   - Idle: 13.8:1
   - City Cruise: 13.4–13.6:1
   - Freeway Roll-on: 12.9–13.1:1
   - WOT: 12.5:1
✅ Spark Advance:
   - Retarded at low RPM to reduce temp
   - Smoothed spark ramp 2500–4000 RPM
✅ Decel Fuel Cut: Disabled
✅ Decel Enrichment: Enabled & tapered
✅ Closed Loop: Disabled <2300 RPM and <20% TPS
✅ Idle Speed: 1000 RPM for better cooling/oil flow

Instructions:
--------------
1. Open in ThunderMax Tuner software
2. Flash to ECM
3. Reset learned trims
4. Let idle 5–10 minutes (for IAC learn)
5. Test ride in city and freeway conditions

