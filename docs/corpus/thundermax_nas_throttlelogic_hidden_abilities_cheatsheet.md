---
type: reference
title: ThrottleLogic_Hidden_Abilities_CheatSheet
source: throttle-logic/ThrottleLogic_Hidden_Abilities_CheatSheet.pdf
---

                       ThrottleLogic — Hidden Abilities of ThunderMax +
                       Validation Cheat Sheet
                       Date: August 29, 2025 • Bike Profile: M8 131ci, 2-into-1, 91–93 octane, GA heat/humidity



                       Purpose
                       Quick, field-ready reference to advanced ThunderMax parameters, where to find them, what they do,
                       and how riders/dyno data validate their use. Built to plug into ThrottleLogic SuperGPT.

 eature / Parameter               Where in TMax                       What it does                   Typical action or use-case            External validation (forums / dyn
ming vs Engine Temp          Tuning Maps → Ignition → Timing
                                                         Applies
                                                             vs a
                                                               Engine
                                                                  global timing
                                                                      Temperature
                                                                                correction based on −1°
                                                                                             Retard     to −3°
                                                                                                    engine temp; retards
                                                                                                               beyond  ~226°F
                                                                                                                         when as
                                                                                                                              hotatofirst
                                                                                                                                     HarleyTechTalk
                                                                                                                                       suppress
                                                                                                                                          pass; verify
                                                                                                                                                 knock.ping
                                                                                                                                                        users
                                                                                                                                                            reduction
                                                                                                                                                              report best
                                                                                                                                                                      & head
                                                                                                                                                                          resu

ming vs TPS @ RPM (Belly/WOT
                         Tuning Maps → Ignition → Timing
                             rules)                  Setsvstiming
                                                             TPS @by RPM
                                                                     throttle
                                                                           (per
                                                                              position
                                                                                page) at each
                                                                                            If RPM.
                                                                                               roll-on The  stops at
                                                                                                       ping'belly'    WOT →
                                                                                                                   region (roll-on)
                                                                                                                                lower
                                                                                                                                    is belly
                                                                                                                                       whereonly.
                                                                                                                                         ThunderMax
                                                                                                                                             most Ifping
                                                                                                                                                     pingoccurs.
                                                                                                                                                        'Adjusting
                                                                                                                                                          persists at
                                                                                                                                                                   Timing → Ping
                                                                                                                                                                      WOTfor lowe

  RPM control                                             Settings →
                             Module Configuration → Basic Sets commanded
                                                                     Idle RPM
                                                                           idle. Unified idle spark
                                                                                                Keepand
                                                                                                     idle spark
                                                                                                        coherent idle speed
                                                                                                                pages  equal (e.g.,
                                                                                                                             minimize
                                                                                                                                    768–1280
                                                                                                                                       hunt/stall.
                                                                                                                                        ThunderMax
                                                                                                                                              RPM same
                                                                                                                                                   docsvalue).
                                                                                                                                                        describe
                                                                                                                                                               Usequalizing
                                                                                                                                                                   coherent

ock & VVT monitors (new) Monitors → Knock / VVT (firmware
                                                      Adds7.0+;
                                                           knockAdvanced)
                                                                  detection & VVT pages; some
                                                                                         Observe
                                                                                              modules
                                                                                                 knock support
                                                                                                       learn/flags
                                                                                                                ignition auto-offsets.
                                                                                                                    when testing  timing
                                                                                                                                  Fuel Moto
                                                                                                                                         trims;
                                                                                                                                             dyno
                                                                                                                                                do not
                                                                                                                                                   tests and
                                                                                                                                                       over-advance
                                                                                                                                                             2024–2025
                                                                                                                                                                    withT

 oTune temp gates            AutoTune / Learning settings Controls
                                                         (Advanced)when learning starts/stops by
                                                                                               Set
                                                                                                 temp,
                                                                                                   reasonable
                                                                                                       preventing
                                                                                                              low/high
                                                                                                                  bad trims
                                                                                                                       tempwhen   based
                                                                                                                            gatescold or
                                                                                                                                     Forum
                                                                                                                                         overheated.
                                                                                                                                         on climate; disable
                                                                                                                                            tuners emphasize learning
                                                                                                                                                                gatingduring
                                                                                                                                                                      learnin

 ar-cylinder trims           Rear Cylinder → Timing/AFR/VE
                                                         Lets you
                                                           (Advanced
                                                                  bias rear
                                                                       pages)
                                                                            vs front for thermalMildly
                                                                                                 deltas in
                                                                                                       richer rear AFR or slight timing pull in
                                                                                                           stop■and■go.                  Common roll■on
                                                                                                                                                     rider
                                                                                                                                                        band
                                                                                                                                                           practice
                                                                                                                                                              duringonGA
                                                                                                                                                                       forums;
                                                                                                                                                                          summers
                                                                                                                                                                               alig

                           —
no correlation (cams/exhaust)                                Use reputable dyno libraries to benchmark
                                                                                                 Compare
                                                                                                       expected
                                                                                                          your torque
                                                                                                                curve rise,
                                                                                                                      shapesHP for
                                                                                                                                peak RPM,
                                                                                                                                   your hardware.
                                                                                                                                         Fuel
                                                                                                                                            and
                                                                                                                                              Moto
                                                                                                                                                dip locations
                                                                                                                                                    Universityto
                                                                                                                                                               & Fuel
                                                                                                                                                                 T■ManMoto &
                                                                                                                                                                         Perform
                                                                                                                                                                             T-M




                       Dyno-Backed Benchmarks (Qualitative)
                       Use these as **shape** comparisons, not promises: expect differences by fuel, weather, and hardware.
                       Cross-check with your own logs.

                       •     Cam Overlays: Fuel Moto’s 107/114/117 & 2023 shootouts show predictable torque rise and HP peak
                             locations across grinds. Validate your curve shape vs theirs, not absolute numbers.

                       •     Exhaust Interaction: Exhaust swaps can shift the torque dip and peak—Fuel Moto testing demonstrates
                             significant curve changes when only the pipe is changed.

                       •     Injector Headroom: Sustained duty cycles >85% suggest AFR targets or hardware sizing should be revisited
                             before chasing power with timing.



                       SuperGPT Workflow Insert
                       1) Ingest CSV exports → 2) Coral validates & diffs → 3) Wrench proposes belly/WOT & temp■based
                       timing changes → 4) Sentry checks learning gates, temps, knock flags → 5) Teacher reports with dyno
                       shape comparison and next■ride plan.
Online Source Index (clickable)
ThunderMax — Timing vs Engine Temp (PDF)
ThunderMax — Adjusting Timing for Ping (PDF)
Fuel Moto University — Dyno Charts Library
Fuel Moto — 2023 M8 114″ Camshaft Shootout
Fuel Moto — 117″ Camshaft Shootout
Fuel Moto — Exhaust Swap Effects
T■Man Performance — Dyno Charts
HarleyTechTalk — TMax timing vs engine temp discussion
RoadGlide — Dyno now or wait for ThunderMax to autotune?
HDForums — ThunderMax ping tuning thread

