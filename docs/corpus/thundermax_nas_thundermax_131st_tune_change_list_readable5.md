---
type: reference
title: ThunderMax_131ST_Tune_Change_List_Readable5
source: throttle-logic/ThunderMax_131ST_Tune_Change_List_Readable5.pdf
---

                             ThunderMax 131ci Low Rider ST

                                  Final Readable Tune Adjustment Checklist

  This sheet lists precise ThunderMax tuning changes for your 2024–2025 Harley-Davidson Low Rider
  ST 131ci, verified against ThunderMax firmware 7.0+ standards and technical documentation. These
  changes improve heat control, rear-cylinder balance, throttle smoothness, and maintain maximum safe
  power.



 MAP / PARAMETER                     CURRENT                    RECOMMENDED                              WHY

Rear Timing vs TPS           –5° plateau mid-throttle (15–35%)
                                                          Ease to –3° to –4°; taper to 0° after
                                                                                            Reduces
                                                                                                55% TPS
                                                                                                     rear jug retard for crisp th

Timing vs Engine Temp        –6° after 320°F              Keep as-is                         Already matches ThunderMax idea

AFR Correction vs Engine Temp
                          Rich below 100°F, mild taper,
                                                     Keep
                                                        slight
                                                            as-is
                                                               rise after 320°F              Perfect warm-up and hot soak fuel

AFR vs Engine Temp           Gradual enrichment (~–2.5 AFR
                                                       Keep@as-is
                                                             400°F)                          Correct thermal enrichment under

Idle RPM                     1040 rpm                     Lower to 990–1000 rpm (optional)
                                                                                        Slightly smoother idle and less hea

Rev Limit                    6656 rpm                     Raise to 6800 rpm (optional)       Unlocks full cam powerband if hard

Accel Fuel                   15.0 msec                    Reduce to 13–14 msec               Prevents rich tip-in spikes.

Decel Fuel Cut               OFF                          Keep OFF                           Prevents lean pop and heat spikes

Cooling Fan Threshold        210°F                        Keep 210°F                         Maintains oil below 240°F in traffic

Knock Correction             5°                           Keep 5°                            Maintains safe automatic timing co


  After applying these:
  1. Save your current map before editing.
  2. Apply adjustments in TMaxI Tuner exactly as listed.
  3. Perform one AutoTune session once oil >220°F.
  4. After two rides, write AutoMap offsets (do not clear trims).
  5. Save final file as 131ST_FinalTune_[Date].tmt.

  Result: smoother throttle, cooler rear head, stable AFR, and safe full-RPM power.


  ThunderMax Firmware 7.0+ verified | Cross-referenced with TimingVsRPM.pdf and TimingVsEngineTemp.pdf

