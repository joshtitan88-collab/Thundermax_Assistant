---
type: concept
title: Icloud Thunder Max Tuning Throttlelogic Thundermax Condensed20 Pdf Cab329
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThrottleLogic_ThunderMax_Condensed20.pdf
---

Throttle Logic
ThunderMax Condensed Shop Manual
20-Page Quick Reference Edition

Quick Setup
Step

Target / Rule

TPS Calibration

Idle TPS = 0.4–0.6 V (≈6–7%)

Firmware

Run latest stable or rollback if known issue

O■ Sensors

Must show READY before AutoTune

Throttle Offset

Verify idle, adjust ±2–4% until stable

AFR Quick Reference
Zone

AFR Target

Notes

Idle

13.6–14.0

Smooth, stable idle

Cruise

13.2–13.6

Balance economy & response

Accel

12.8–13.0

Keeps cylinders cool

WOT

12.6–12.8

Maximum safe power

Rear Bias

+0.2 richer

Keeps temps balanced

Spark Timing Quick Reference
Zone

Advance ° BTDC

Notes

Idle

10–16°

Stable combustion

Cruise

28–32°

Efficiency + response

WOT

26–28°

Safe power zone

Rear Cylinder

–2 to –4°

Thermal safety

VE Adjustment Guide
VE (Volumetric Efficiency) maps describe airflow. Bad trims show up as lean surging, uneven AFR,
or stutter at light throttle.
Fast Fix:
• Blend 5–10% around lean areas.
• Avoid sharp cliffs in VE tables.
• Reflash, ride, recheck trims.

AutoTune Cheat Sheet
• Use AFTER base map is close.
• Lock stable regions before enabling.
• Ride 20 min varied RPM/TPS.
• Blend trims manually; don’t copy raw.
• Disable AutoTune after blending.

Rear Jug Fix
Symptoms: lean surge, echo exhaust, hotter temps.
Quick Fixes:
• AFR bias rear +0.2 richer.
• Retard rear spark –2° to –4°.
• Adjust throttle offset until idle stable.

Troubleshooting Trees
Popping on Decel → Check AFR at cruise (13.2–13.6). Too lean = add fuel.
Surging Cruise → Blend VE around that cell +5–10%.
Overheating → Enrich idle/cruise AFR, rear jug bias richer.
Lean AFR 22.4 → O■ sensor fault or ground issue.
Limp Mode → Reflash base map, verify firmware.

Race / Street / Heat Profiles
Profile

Idle AFR

Cruise AFR

WOT AFR

Spark Timing

Race

13.6

13.4

12.6

Idle 14° / Cruise 30° / WOT 28°

Street

13.8

13.6

12.8

Idle 12° / Cruise 29° / WOT 27°

Heat

14.0

13.8

13.0

Idle 10° / Cruise 28° / WOT 26°

Tuning Log
Date

RPM

TPS %

Target AFR

Actual AFR

Spark °

VE ∆ %

Notes

Notes

_______________________________________________________________________________
_____

_______________________________________________________________________________
_____

_______________________________________________________________________________
_____

_______________________________________________________________________________
_____

_______________________________________________________________________________
_____
