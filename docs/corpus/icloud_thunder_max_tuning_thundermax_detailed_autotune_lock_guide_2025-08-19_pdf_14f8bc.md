---
type: concept
title: >-
  Icloud Thunder Max Tuning Thundermax Detailed Autotune Lock Guide 2025 08 19
  Pdf 14f8bc
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThunderMax_DETAILED_AutoTune_Lock_Guide_2025-08-19.pdf
---

ThunderMax AutoTune Zone Locking — Detailed
Instructions
**Detailed Step-by-Step ThunderMax Locking Guide**

---

**1. Open TMax Tuner Software**
- Turn on your ignition switch but DO NOT start the bike.
- Connect the USB cable from your bike’s ThunderMax module to your computer.
- Open the TMax Tuner software on your PC.

---

**2. Load the Current Map**
- On the top menu bar, click “File.”
- Select “Load Map from Module” if you’re connected to the bike.
- OR click “Open Map File” to browse for your saved .tmt or .tbw file.

---

**3. Open the AFR Table**
- From the “Tuning Maps” menu, select “Target Air Fuel Ratio (AFR).”
- A graph will display RPM on the vertical axis and TPS (Throttle Position) on the horizontal axis.
- This is the table AutoTune uses to target AFRs.

---

**4. Select Zones You Want to Lock**
- Move your cursor over the map and click+drag to highlight the area (for example: 2304–3072 RPM
and 2%–10% TPS).

- These are the areas you want to lock from AutoTune changes.

---

**5. Lock the AFR Zones**
- Right-click on the highlighted section.
- Look for “Enable Closed Loop” or “Disable Closed Loop.”
- Choose **“Disable Closed Loop”** to prevent AutoTune from adjusting those zones.
- This essentially locks the AFR target from being used by the learning system.

---

**6. Repeat for VE Table (Volumetric Efficiency)**
- Go to “Tuning Maps” → “VE Front Cylinder” (repeat for “VE Rear Cylinder”).
- Highlight the same area as you did for AFR.
- Right-click and look for “Lock Cell” or similar wording. Some versions may require manual note-taking
and exclusion of those areas when applying AutoTune updates.

---

**7. Repeat for Spark Timing Maps**
- Go to “Tuning Maps” → “Spark Front Cylinder” or “Spark Rear Cylinder.”
- Again, highlight the same range.
- If your software version allows, right-click and choose “Lock” or mark as static.

---

**8. Save Your Map**
- Click “File” → “Save Map As...” and give your map a new name like `Safe_Zones_Locked.tmt`.
- This ensures you retain a backup of your working tune.

---

**9. Reflash the ECU**
- Go to “Communications” → “Write Module Map.”
- Follow the prompts to flash the newly modified map into the ThunderMax ECU.
- Wait for the flash to finish—don’t turn off the ignition during this step.

---

**10. Verify Locks Are Working**
- Ride the bike and return to the software.
- Go to “Monitor” → “AutoTune Status.”
- You should see that your locked zones are not being adjusted (no change activity in those cells).
