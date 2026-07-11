---
type: concept
title: >-
  Icloud Thunder Max Tuning Throttlelogic Thundermax Condensed18 Draft Pdf
  489054
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThrottleLogic_ThunderMax_Condensed18_Draft.pdf
---

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 1 — Base Setup & Initialization
TPS Calibration: Idle should be 0.4–0.6V (~6–7%).
Firmware: Always run the latest stable unless rollback is needed.
O■ Readiness: Must show READY before logging.
Throttle Offset: Adjust ±2–4% for stable idle.

Throttle Logic — Confidential Tuning Reference

Page 1 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 1 — Base Setup & Initialization
TPS Calibration: Idle should be 0.4–0.6V (~6–7%).
Firmware: Always run the latest stable unless rollback is needed.
O■ Readiness: Must show READY before logging.
Throttle Offset: Adjust ±2–4% for stable idle.

Throttle Logic — Confidential Tuning Reference

Page 2 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 2 — AFR Strategy
Idle AFR: 13.6–14.0 for smooth idle.
Cruise AFR: 13.2–13.6 for efficiency.
Acceleration AFR: 12.8–13.0 for cooling.
WOT AFR: 12.6–12.8 for max safe power.
Rear bias: +0.2 richer to cool the rear cylinder.

Throttle Logic — Confidential Tuning Reference

Page 3 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 2 — AFR Strategy
Idle AFR: 13.6–14.0 for smooth idle.
Cruise AFR: 13.2–13.6 for efficiency.
Acceleration AFR: 12.8–13.0 for cooling.
WOT AFR: 12.6–12.8 for max safe power.
Rear bias: +0.2 richer to cool the rear cylinder.

Throttle Logic — Confidential Tuning Reference

Page 4 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 3 — Spark Timing
Idle Timing: 10–16° BTDC.
Cruise Timing: 28–32° BTDC.
WOT Timing: 26–28° BTDC.
Rear Jug Offset: Retard –2° to –4°.
Timing vs RPM & Temp: taper spark above 5,500 RPM, reduce timing with rising temps.

Throttle Logic — Confidential Tuning Reference

Page 5 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 3 — Spark Timing
Idle Timing: 10–16° BTDC.
Cruise Timing: 28–32° BTDC.
WOT Timing: 26–28° BTDC.
Rear Jug Offset: Retard –2° to –4°.
Timing vs RPM & Temp: taper spark above 5,500 RPM, reduce timing with rising temps.

Throttle Logic — Confidential Tuning Reference

Page 6 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 4 — VE & AutoTune
VE Tables: smooth curves, avoid cliffs.
Blending: ±5–10% adjustments around lean cells.
AutoTune: Ride varied RPM/TPS ~20 minutes, then blend trims manually.
Lock stable regions before enabling AutoTune.
Disable AutoTune after blending.

Throttle Logic — Confidential Tuning Reference

Page 7 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 4 — VE & AutoTune
VE Tables: smooth curves, avoid cliffs.
Blending: ±5–10% adjustments around lean cells.
AutoTune: Ride varied RPM/TPS ~20 minutes, then blend trims manually.
Lock stable regions before enabling AutoTune.
Disable AutoTune after blending.

Throttle Logic — Confidential Tuning Reference

Page 8 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 5 — Diagnostics & Recovery
Restoring DTE: Reload base maps if corruption occurs.
O■ Faults: If AFR = 22.4 stuck, check sensor or ground.
Firmware Rollback: Safer to return to known stable version if new firmware introduces instability.
USB Drivers: Ensure TMax USB driver installed for stable connection.

Throttle Logic — Confidential Tuning Reference

Page 9 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 5 — Diagnostics & Recovery
Restoring DTE: Reload base maps if corruption occurs.
O■ Faults: If AFR = 22.4 stuck, check sensor or ground.
Firmware Rollback: Safer to return to known stable version if new firmware introduces instability.
USB Drivers: Ensure TMax USB driver installed for stable connection.

Throttle Logic — Confidential Tuning Reference

Page 10 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 6 — Race/Street/Heat Profiles
Race: Idle 13.6, Cruise 13.4, WOT 12.6, Spark 14°/30°/28°.
Street: Idle 13.8, Cruise 13.6, WOT 12.8, Spark 12°/29°/27°.
Heat: Idle 14.0, Cruise 13.8, WOT 13.0, Spark 10°/28°/26°.
Profiles can be stored and switched quickly.

Throttle Logic — Confidential Tuning Reference

Page 11 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 6 — Race/Street/Heat Profiles
Race: Idle 13.6, Cruise 13.4, WOT 12.6, Spark 14°/30°/28°.
Street: Idle 13.8, Cruise 13.6, WOT 12.8, Spark 12°/29°/27°.
Heat: Idle 14.0, Cruise 13.8, WOT 13.0, Spark 10°/28°/26°.
Profiles can be stored and switched quickly.

Throttle Logic — Confidential Tuning Reference

Page 12 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 7 — Troubleshooting
Popping on Decel: Enrich AFR 13.2–13.6.
Surging: Blend VE around affected cells.
Overheating: Richen idle/cruise, retard rear spark.
Echo Exhaust: Rear jug spark –2° to –4°, AFR richer.
Limp Mode: Reload map, verify firmware integrity.

Throttle Logic — Confidential Tuning Reference

Page 13 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Chapter 7 — Troubleshooting
Popping on Decel: Enrich AFR 13.2–13.6.
Surging: Blend VE around affected cells.
Overheating: Richen idle/cruise, retard rear spark.
Echo Exhaust: Rear jug spark –2° to –4°, AFR richer.
Limp Mode: Reload map, verify firmware integrity.

Throttle Logic — Confidential Tuning Reference

Page 14 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Appendix — Throttle Logic Confidential Tips
Tuner Plus Unlock: Access data collection & transmit functions.
Freeze AutoTune Cells: Prevent over-learning in clean areas.
Rear Jug Cure: Spark offset & richer AFR bias.
Triple Map Strategy: Race/Street/Heat in one file.
Firmware Rollback Rule: Don’t chase latest firmware blindly.

Throttle Logic — Confidential Tuning Reference

Page 15 of 18

Throttle Logic — ThunderMax Condensed Shop Manual (Draft)

Appendix — Throttle Logic Confidential Tips
Tuner Plus Unlock: Access data collection & transmit functions.
Freeze AutoTune Cells: Prevent over-learning in clean areas.
Rear Jug Cure: Spark offset & richer AFR bias.
Triple Map Strategy: Race/Street/Heat in one file.
Firmware Rollback Rule: Don’t chase latest firmware blindly.

Throttle Logic — Confidential Tuning Reference

Page 16 of 18
