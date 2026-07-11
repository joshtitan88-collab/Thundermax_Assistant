---
type: concept
title: >-
  Icloud Thunder Max Tuning Thundermax Autotune Zone Lock Complete Guide 2025 08
  1 1a0d25
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThunderMax_AutoTune_Zone_Lock_Complete_Guide_2025-08-19.pdf
---

ThunderMax AutoTune Zone Locking Guide
Produced on: August 19, 2025

This guide provides the most accurate and complete breakdown of how to prevent ThunderMax
AutoTune from adjusting specific areas of your fuel and spark tables.

1. Accessing the ThunderMax TMax Tuner Software
• Turn on your bike’s ignition switch. Do NOT start the engine.
• Connect the USB cable from the ThunderMax module to your laptop or PC.
• Open the ThunderMax TMax Tuner software (ensure it is the latest version).
• Wait for the software to recognize the ECU module. A green status indicator usually appears in the
bottom-right corner.

2. Load Your Map
• If connected to the bike, click 'File' → 'Load Map from Module' to download the current live tune.
• If working offline, click 'File' → 'Open Map File' and load a saved .tmt or .tbw file from your PC.
• Once loaded, confirm you're viewing the correct tune by checking its filename and revision level in the
top bar.

3. Locking Zones in the AFR Table
• Click 'Tuning Maps' → 'Target AFR'. The AFR graph will open showing RPM (Y-axis) vs TPS (X-axis).
• Move your mouse to highlight a range — for example: 1024–3072 RPM and 2–10% TPS (light
throttle/cruise zone).
• Right-click the selected area. A popup should appear.
• Click 'Disable Closed Loop'. This disables AutoTune corrections in those zones — it effectively 'locks'
them.
• Repeat for all RPM/TPS ranges you want to preserve.

4. Locking Zones in the VE Table (Fuel Map)
• Click 'Tuning Maps' → 'VE Front Cylinder' or 'VE Rear Cylinder'.
• Repeat the same highlighting process on the VE graph that you used in the AFR table.
• There may not be a built-in 'lock' feature here. Instead, note the values before AutoTune, then
manually verify they don’t change over time.
• Some tuners freeze these zones by turning off learning temporarily while flashing the locked values
manually.
• Repeat for both front and rear cylinder VE maps.

5. Locking Zones in Spark Timing Maps
• Click 'Tuning Maps' → 'Spark Front Cylinder' or 'Spark Rear Cylinder'.
• Just like with AFR and VE, highlight the areas you want to preserve.
• Some ThunderMax software versions allow right-click locking on these maps.
• If locking is not available, document the advance values and manually freeze them by disabling
learning or avoiding AutoTune runs in that range.

6. Save and Flash Your Updated Map
• Click 'File' → 'Save Map As...' and rename your file, e.g., 'My131_LockedZones.tmt'.
• Connect to the bike (if not already), then go to 'Communications' → 'Write Module Map'.
• Follow on-screen prompts and do NOT shut off ignition until writing is 100% complete.
• Reboot the system by cycling the ignition off and on again.

7. Monitor AutoTune to Confirm Zones Are Locked
• Click 'Monitor' → 'AutoTune Status'.
• Review AFR and VE changes. If your locked zones remain untouched, the lock was successful.
• Use live graph mode or log files to validate no adjustments are made in those RPM/TPS cells.
• For added protection, disable AutoTune entirely when riding outside test sessions by going to 'Tuning
Maps' → 'AutoTune Control'.
