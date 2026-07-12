---
type: reference
title: ThunderMax_131ST_Tune_Change_List_Clean
source: throttle-logic/ThunderMax_131ST_Tune_Change_List_Clean.pdf
---

                                 ThunderMax 131ci Low Rider ST
Recommended Tune Adjustments Summary

This document provides a refined list of tuning changes for your ThunderMax-equipped 2024–2025 Harley-Davidson
Low Rider ST 131ci. The recommendations are derived from your tuning screenshots and verified against
ThunderMax technical references (Timing vs RPM, Engine Temp, AFR logic, and Base Configuration). These
changes improve throttle response, rear cylinder heat management, and overall engine smoothness while maintaining
safe margins for power and reliability.


    Map / Parameter               Current Setting          Recommended Adjustment                      Purpose

Rear Timing vs TPS          –5° plateau mid-throttle (15–35%)
                                                          Ease to –3° to –4°; taper to 0° after 55%
                                                                                              Reduces
                                                                                                    TPS
                                                                                                      rear jug retard for improved

Timing vs Engine Temp       –6° after 320°F               No change — correct ThunderMax heat
                                                                                       Controls
                                                                                              curve
                                                                                                knock and head temp abov

AFR Correction vs Engine Temp
                           Rich bump below 100°F, taper,
                                                      Noslight
                                                         changerise past 320°F              Provides ideal start-up and heat-soa

AFR vs Engine Temp          Gradual enrichment (~–2.5 AFR
                                                       No @
                                                          change
                                                            400°F)                          Smooth enrichment at high temps; p

Idle RPM                    1040 rpm                      Lower slightly to 990–1000 rpm (optional)
                                                                                           Smooth idle tone and slightly less he

Rev Limit                   6656 rpm                      Raise to 6800 rpm (if using Feuling
                                                                                            Unlocks
                                                                                              592/Wood
                                                                                                    top-end
                                                                                                        408 cam)
                                                                                                            powerband safely.

Accel Fuel                  15.0 msec                     Reduce to 13–14 msec              Prevents over-rich throttle blips.

Decel Fuel Cut              OFF                           Keep OFF                          Eliminates lean decel pop and heat s

Cooling Fan Threshold       210°F                         Keep 210°F                        Maintains oil below 240°F in heavy tr

Knock Correction            5°                            Keep 5°                           Allows automatic spark retard under


Post-Adjustment Instructions:
1. Save a backup of your current map before editing.
2. Apply adjustments exactly as listed above in TMaxI Tuner.
3. Perform one AutoTune session once oil temperature exceeds 220°F.
4. Do not clear learned offsets — instead, perform an AutoMap Write after two rides to lock them in.
5. Save your final map under a new filename (e.g., 131ST_FinalTune_Oct2025.tmt).

Result: Lower rear jug temp, smoother roll-on, improved AFR stability, and full safe RPM range for the 131ci build.
ThunderMax Reference Verification: Firmware 7.0+ (2025.3.6) | Verified against TimingVsRPM.pdf, TimingVsEngineTemp.pdf, and official
ThunderMax technical guidance for Milwaukee-Eight engines.

