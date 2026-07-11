---
type: concept
title: Icloud Thunder Max Tuning Thundermax Rear Timing Logic Pdf B96c1c
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/thundermax_rear_timing_logic.pdf
---

ThunderMax Timing Logic - Rear Cylinder (131ci)

1. Overview
This document summarizes the full ignition timing logic for your 131ci Harley-Davidson using the
ThunderMax ECU. It combines:
- Base Timing vs RPM Table
- Timing vs TPS Table
- Rear Cylinder Timing Offset (TPS-based)
- Engine Temperature Timing Trim

The result is the actual spark advance seen by the rear cylinder under different loads, RPM, and
engine temperatures.

2. Base Timing vs RPM
This table represents the base timing curve before TPS, rear offset, or temperature adjustments are
applied. Timing is in degrees BTDC.

RPM Range (approx.)
Idle (~1000)

2-4

1500

8-10

2000

14-18

2500

20-24

3000

26-28

3500-4000

Timing ( deg BTDC)

28-30

4500+

28-29

3. Timing vs TPS (Load-based Trim)
The TPS table trims timing from the base RPM curve depending on throttle position/load.
Typical high-RPM example:

TPS ( deg)

Timing Adjustment ( deg)

0-15

0 (full cruise timing)

18-45

Gradual pull to ~26 deg at higher load

50-68

Further pull to ~24-25 deg

76-88 (WOT) Flatten at ~25 deg

4. Rear Cylinder Timing Offset vs TPS
Negative values retard the rear cylinder relative to the front.
Current settings:

TPS ( deg)

Offset ( deg)

0-12

0

18-52

-1

60-68

-2

76-88

-1

This pattern protects the hotter rear jug under load, but allows full timing at light throttle and near
WOT.

5. Engine Temperature Timing Trim
This trim table pulls timing as head temperature rises to reduce knock risk.
Current settings (whole degrees):

Temp ( degF)
<=250

Trim ( deg)

0

260

-1

270

-2

280

-3

290

-4

300

-5

310

-6

320

-7

330+

-8

This is applied on top of the base and TPS timing logic.

6. Example - Real Rear Cylinder Timing

Scenario: 3500 RPM, 45 deg TPS, 315 degF head temp
- Base timing @ 3500 RPM: 29 deg
- TPS trim: -4 deg (from base)
- Rear offset: -1 deg
- Temp trim: -7 deg
= Actual rear timing: 29 - 4 - 1 - 7 = 17 deg BTDC
