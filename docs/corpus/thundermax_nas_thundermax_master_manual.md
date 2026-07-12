---
type: reference
title: ThunderMax_Master_Manual
source: throttle-logic/TMAX TUNING MANUAL/ThunderMax_Master_Manual.pdf
---

     ThunderMax Tuning & Troubleshooting Master
                      Manual

Compiled from full ThunderMax technical documentation.
Installation & Software Setup
USB Driver installation for XP, Vista, 7, 10, 11 (2015 Driver update for Win10).
Windows 10S/11S 'Safe Mode' requires switching out of S mode permanently.
Software Update process: Main Menu > Configure > Update.
Changelog: VVT support, Ignition AutoMapping, M8 database split, Knock control monitors.



Tuning & Performance
AutoMap Process: Cold to hot log, smooth throttle ranges, repeat until corrections stabilize.
Decel Pop Fixes:
- Disable Decel Fuel Cut, run decel drills (2500→1500 rpm etc.), AutoMap corrections.
- Enable Fuel Cut if needed, set RPM window (1792–2304 for quiet, 2944–3200 for high-rpm only).
- Adjust Decel Post Fuel Enrichment (default 16, louder pipes ~18–22).
Idle RPM: Module Config > Basic Settings > Idle RPM slider.
Speedometer Calibration: Module Config > Basic Settings > SpeedoCal > Calibration Calculator with
GPS.
Timing Control:
- Vs Engine Temp: retard 1–4° for ping (light to severe).
- Vs RPM (TPS maps): focus on throttle roll-on 'belly'. Light ping = -1°, Heavy ping = -5°, Severe up to
-7°.



Diagnostics & Troubleshooting
Throttle Body Maintenance: Clean throttle blade/bore with TB cleaner, use Redline S-1 fuel injector
cleaner.
O2 Sensor Testing:
- AFR 19.36 (1 cyl) = bad O2 or harness.
- AFR 19.36 (both) = bad O2 module.
- AFR 22.05 = sensors unplugged/no power.
- Swap Test to isolate bad sensor vs harness.
TPS Problems: erratic idle cursor = bad TPS, wiring strain, cracked shaft.
IAC Check: confirm it 'homes' and responds in test mode.
Vacuum Leaks: inspect top of TB for missing vacuum cap; replace with cap or hose+bolt plug.
Electrical Conductivity: clean/grease ECM connectors, battery, fuse panel; check CHT sensor wiring.
VIN Errors: Enter VIN in Module Config > Service Data > Edit VIN. Default VIN =
1HD1KB4137Y603371.
Quality-of-Life Features
Restoring Distance to Empty (R Lo):
- Touring TBW: Stock ECM + trip button + fuse reset, re-init (20s on/off), normalize in 50 miles.
- Softail/Dyna Cable: Similar, but 30s on/off x3.
Re-initialization Sequences: Key on 20s/off 20s x5 for O2 reset.
Idle/Fuel Enrichment Drills: Decel feathering, repeat cycles, AutoMap updates.

