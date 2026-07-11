---
type: concept
title: >-
  Icloud Thunder Max Tuning Thundermax Locking Autotune Zones Guide 2025 08 19
  Pdf C2f037
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThunderMax_Locking_AutoTune_Zones_Guide_2025-08-19.pdf
---

ThunderMax Tuning Guide: Locking AutoTune Zones
Date Produced: August 19, 2025
This guide explains how to lock specific areas of your ThunderMax fuel and spark tables to prevent
AutoTune from overwriting zones that are already dialed in.

**Step-by-Step Instructions:**

1. **Open TMax Software**
Launch the ThunderMax TMax Tuner software and connect to your ECU.

2. **Load the Current Map**
From the menu, go to ‘File’ → ‘Load Map from Module’ or open your saved .tmt or .tbw file.

3. **Access the Desired Table**
Open the AFR, VE, or Timing (Spark) tables—whichever you want to lock.

4. **Identify the Area to Lock**
On the graph-style map (not cell-based), use your cursor to select the RPM and TPS range you want to
prevent AutoTune from adjusting.

5. **Apply Locks (Fixed Values)**
Look for the context menu option labeled “Lock Cell” or “Mark as Fixed.” This prevents the learning
logic from modifying that section. On some software versions, this may appear under “Closed Loop
Disable” or similar wording.

6. **Repeat for Other Tables**
If you want to lock matching areas in AFR, VE, and Spark tables, repeat this process for each one.

7. **Save and Flash Map**
Once zones are locked, save your map and re-flash it to the module. This ensures the locked zones are
preserved in the live tune.

**Tips:**

- Common zones to lock: idle RPM (~768–1280), cruise RPM (~2304–3072), and full-throttle/high-RPM
zones once dialed in.
- Monitor AutoTune history to see which zones are actively being hit before deciding to lock them.
- If unsure, save a backup version before locking.

This process helps prevent overlearning, where ThunderMax continually tweaks already stable zones,
potentially degrading performance over time.
