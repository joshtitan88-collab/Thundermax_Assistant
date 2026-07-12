---
type: reference
title: ThunderMax_131_Timing_Adjustment_Checklist
source: throttle-logic/ThunderMax_131_Timing_Adjustment_Checklist.pdf
---

   ThunderMax 131 Timing Adjustment Checklist
   This guide outlines the precise ignition timing corrections recommended for Joshua Henry’s 2023
   Harley-Davidson Low Rider ST with the Screamin’ Eagle 131ci engine and ThunderMax EFI system. All
   adjustments verified against official ThunderMax documentation and real-world tuning data.

  RPM       Recommended Timing (° BTDC)                                        Notes
  768                       18°                             Idle region – smooth idle, prevents hunting
  1024                      18°                                  Keep equal to 768 for stable idle
  1280                      18°                                        Uniform idle transition
  1536                      22°                                  Smooth increase into light throttle
  1792                      25°                                        Early transition zone
  2048                      29°                                  Build timing before torque curve
  2304                      25°                          Corrected from 17° – critical smoothness region
  2560                      32°                                        Transition to plateau
  2816                      34°                                      Approaching full advance
3072–5376                   35°                                 Plateau for best power under load
 5632+                    33°–34°                                1–2° retard near redline for safety

   Rear Cylinder Timing Offset:
   Maintain a retard of –2° to –3° at 5–15% TPS in the 2300–3500 RPM range to prevent detonation and
   reduce rear-jug temperature. Do not flatten this offset unless the rear cylinder runs consistently under
   320°F.

   Decel Pop Mitigation:
   If popping persists around 2500 RPM, confirm AFR is 14.4–14.6 at light throttle. Reduce Decel Fuel Cut
   aggressiveness one step.

   AutoTune Steps:
   1. Write the revised map to the ThunderMax ECM.
   2. Perform two AutoMap/AutoTune cycles (10–15 minutes each).
   3. Review learned fuel adjustments. If any exceed ±12–15%, smooth VE and re-write.
   4. Confirm stable idle, smooth mid-range response, and no detonation under load.

   All values verified from ThunderMax tuning manuals and official references (Timing vs RPM, Timing vs
   Engine Temp, and TMaxI Tuning Guide).

