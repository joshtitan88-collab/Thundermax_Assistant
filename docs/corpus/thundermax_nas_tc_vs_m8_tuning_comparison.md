---
type: reference
title: Tc Vs M8 Tuning Comparison
source: throttle-logic/Tc Vs M8 Tuning Comparison.pdf
---

Twin Cam 124" vs M8 131ci — ThunderMax Tuning
Comparison
This table highlights the key tuning differences and similarities between the Harley-Davidson Twin Cam
124" (Dyna) and M8 131ci (Low Rider ST) platforms when tuned with ThunderMax.




 Category          Twin Cam 124" (Dyna)                              M8 131ci (Low Rider ST)

 AFR — Cruise      13.9–14.2                                         13.9–14.2

 AFR — Mid-
                   ~13.0 (roll-on torque & cooling)                  ~13.0
 load

 AFR — WOT         12.6–12.8                                         12.6–12.8

                                                                     13.8–14.0 (with enrichment to kill
 AFR — Decel       13.8–14.0 (stability)
                                                                     pops)

 Idle RPM          950–1020 typical                                  768–1280 unified spark control

                                                                     18° unified 768–1280 rpm → ramp
 Idle Spark        16–20° unified 768–1280 rpm
                                                                     to ~34° by 2560 rpm

 Timing —          −2° to −3° (1500–2600 rpm @ 20–60% TPS); −1°      −3° (1536–2560 rpm, 20–60% TPS);
 Belly             to −2° (2800–3300 rpm) if knock persists          −2° (2816–3328 rpm)

 Timing —                                                            −1° safety trim at 80–100% TPS if
                   Leave strong; trim −1° only if knock under load
 WOT                                                                 ping persists

                   Mild −1° to −2° above ~240–250°F (cooler          Aggressive progressive curve 226–
 Hot Retard
                   running)                                          304°F (more knock-prone)

 Decel Fuel
                   OFF                                               OFF
 Cut

 Decel Fuel                                                          +4–6% @ 0–2% TPS (1792–3328
                   +4–6% @ 0–2% TPS (1800–3300 rpm)
 Enrich                                                              rpm)

 Rear Cylinder     Mild enrichment or timing pull in hot stop-and-
                                                                     Often required (summer heat)
 Bias              go

 CHT Limits        Knock issues appear above ~240–250°F              Knock issues appear above ~226°F

 Validation        AFR trims ±5%, injectors <85% duty, smooth VE     Same, with added focus on knock
 Checks            & spark                                           logs & thermal bias




                                                      1
✅ Quick Takeaways
     • Twin Cam 124": Runs cooler, requires milder hot-retard. Idle higher (950–1020). Timing trims less
       aggressive, but still belly-prone under load.
     • M8 131ci: More knock-sensitive, hotter heads. Needs stronger belly/WOT timing control and a robust
       hot-retard curve. Idle control broader (768–1280).
     • Both: Like smooth AFR maps, enrichment during decel, and unified idle spark. Always validate trims,
       temps, and knock before locking a tune.



Usage Tip: Print this side-by-side chart and keep it near your ThunderMax station for quick reference when
switching between TC and M8 tuning jobs.




                                                    2

