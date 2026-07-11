---
type: concept
title: Icloud Thunder Max Tuning Thundermax Tuning Documentation Fresh Pdf 145995
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThunderMax_Tuning_Documentation_Fresh.pdf
---

ThunderMax Tuning Documentation
Restoring the Distance to Empty Feature (DTE)
For 2008-Up Touring Models (Throttle By Wire): 1. Keep RUN switch ON during entire procedure. 2.
Pull main Maxi fuse, disconnect TMax, reconnect Stock ECM. 3. Hold trip button while reinstalling main
fuse until speedo lights/locks. 4. Release trip, turn ignition OFF, then ON. 5. Verify "R LO" appears on
odometer options. 6. Reconnect TMax module and reinsert fuse. 7. Cycle ignition ON 20s, OFF 5s to
reinitialize ECM. 8. Range normalizes after ~50 miles of riding (one full tank).

TMax Software – What's New
- Version 2025.3.6: Full VVT support, ignition vs throttle maps now 32 points, firmware 7.0 supports
auto ignition offset mapping. - Version 2024.0.9: Fixed incorrect monitoring values (e.g., 150+ volts,
AFR > 50). - Version 2024.0.0: Maps reorganized. M8 maps are in a separate DB, narrow band maps
moved to XMS DB. Future Big Twin maps numbered >1000. - Version 2024.0.1: Added Knock control,
VVT mapping, and monitoring support.

How to Set Idle RPM
1. Expand 'Module Configuration' in the TMax software. 2. Select 'Basic Settings'. 3. Use the 'Idle RPM'
button and slide bar to adjust to desired idle speed.

Timing vs RPM – Adjusting for Ping
- Smooth transitions: Idle timing (768–1280 RPM) should be even, e.g. 18°. - Light throttle ramp:
Gradually increase timing as RPM rises (1536–2560 RPM). - Roll-on region: "Belly" of curve causes
most ping, adjust timing here first. - Full throttle: Adjust only if ping persists at WOT. Rules of thumb: •
Light ping: -1° to -2° retard. • Moderate ping: -3° retard. • Heavy ping: -5° retard. • Severe ping: -7° to
-8° retard.

TMaxI Installation Manual – Key Points
- Install ThunderMax ECM, replace narrow-band O2 with wide-band O2 sensors. - Add 18mm bungs for
2010+ catalyst-equipped pipes if needed. - Use dielectric grease on connectors to prevent damage. Select closest base map using Key Elements: Engine Size, Throttle/Injectors, Cam, Exhaust. - After
writing the map, clear diagnostic codes and Learned Fuel Adjustments. - Initialization: Ignition ON
(20s), OFF (5s), start engine, idle 15s.
