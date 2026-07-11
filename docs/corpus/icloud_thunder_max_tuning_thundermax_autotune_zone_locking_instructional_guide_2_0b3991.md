---
type: concept
title: >-
  Icloud Thunder Max Tuning Thundermax Autotune Zone Locking Instructional Guide
  2 0b3991
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThunderMax_AutoTune_Zone_Locking_Instructional_Guide_2025-08-19.pdf
---

ThunderMax AutoTune Zone Locking Instructional
Guide
Date: August 19, 2025
This guide explains how to accurately disable AutoTune in selected AFR zones, lock VE maps after
AutoMapping, and manage ignition timing settings using the TMaxI Tuner Software.

Step 1: Open the Map
• Launch TMaxI Tuner software on your PC.
• Link to the ECM by turning on the bike’s ignition and clicking 'Link'.
• Click 'Read Module Maps and Settings' to load the live tune.

Step 2: Understand AutoTune Behavior
• AutoTune makes fueling changes by referencing the AFR Target Table.
• Any cell set to 0.00 AFR is ignored by AutoTune, effectively locking it.

Step 3: Disable AutoTune in AFR Table Zones
• Go to: Tuning Maps → Air/Fuel Ratio vs TPS @ RPM.
• Navigate to the desired RPM and TPS page (e.g., 1024 RPM, 5% TPS).
• Enter 0.00 in any cell to disable AutoTune learning in that zone.
• Leave valid AFR values (e.g., 13.0, 13.8, 14.3) in other zones to keep them learning.

Step 4: Write the Map
• Go to: Communications → Write Maps and Module Settings.
• Follow prompts. Do not interrupt the flash process.

Step 5: Freeze VE Tables After AutoMapping
• After 1–3 AutoMap sessions, set all AFR values to 0.00.
• Write this map to the module to run fully open-loop with frozen VE values.

Step 6: AFR Override (Lock Whole Map)
• Navigate to: Configure → Closed Loop Module Settings.
• Check 'AFR Override Enabled'.
• Enter a single AFR value (e.g., 13.0) for all cells.
• Click 'Write (Map) Settings to Module'.

Step 7: Lock Spark Timing Zones
• Go to: Tuning Maps → Ignition Timing Maps.
• Select 'Timing vs TPS @ RPM' or 'Rear Timing vs TPS'.
• Manually set the timing value in each desired cell.

• Write the map to lock those values.

Pro Tips
• Set 'Max Session Offset' and 'Max Total Offset' to 0% in Closed Loop Settings to globally disable
AutoTune.
• Use AutoMap to refine your base map before locking any zones.
• Ride the bike through a full range of RPM and throttle before freezing AutoTune for best results.
