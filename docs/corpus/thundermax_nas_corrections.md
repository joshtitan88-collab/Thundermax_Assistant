---
type: reference
title: corrections
source: throttle-logic/corrections.pdf
---

                 ThunderMax 131ci Low Rider ST — Recommended
                               Tune Adjustments

               This document compiles verified ThunderMax tuning recommendations based on your provided
               screenshots and cross-referenced with the ThunderMax manuals, temperature and timing references,
               and real-world tuning data for the Milwaukee-Eight 131ci platform. Each change is validated against
               ThunderMax standards (firmware 7.0+) to ensure safe operation, reduced heat, and smooth power
               delivery.


       Parameter / Map                 Current Behavior               Recommended Change                          Purpose

     Rear Timing vs TPS         –5° plateau mid-throttle (15–35%)
                                                               Ease to –3° to –4°
                                                                             Reduce
                                                                                  in rear
                                                                                    15–35%jugTPS
                                                                                              retard
                                                                                                  band
                                                                                                     to restore throttle crispness while m
    Timing vs Engine Temp           Retards ~–6° after 320°F■ Keep — matches ThunderMax ideal
                                                                                       Prevents
                                                                                              curve
                                                                                                 ping above 250°F, no change ne
AFR Correction vs
                Strong enrichment below 100°F, mild taper, rich bump ■
                  Engine Temp                                        after
                                                                       Keep320°F
                                                                             — perfect shape
                                                                                        Ensures proper cold start and heat-soak enri
                                                       ■ Keep
     AFR vs Engine Temp Gradual enrichment to –2.5 AFR @ 400°F— ideal smooth AFR bias vs
                                                                                    Balances
                                                                                         tempcombustion temp and knock ma
           Idle RPM                         1040 rpm                  Optionally 990–1000 rpmLower for slightly smoother idle once tun
           Rev Limit                        6656 rpm                     Optionally 6800 rpmAllows full cam powerband if using 592/408
          Accel Fuel                        15 msec                          13–14 msec          Slightly less burst fuel to avoid rich tip-
        Decel Fuel Cut                         Off                            ■ Keep Off     Prevents lean pops, keeps exhaust temps s
    Rear Jug Temp Offset            –5° through 15–35% TPS –3° to –4° midband, taper to 0° after
                                                                                             Balances
                                                                                                 55% rear cooling with power recove
        Fan Threshold                         210°F                            ■ Keep               Maintains oil below 240°F in traffic
       Knock Correction                         5°                             ■ Keep         Safe and responsive knock suppression ra


               After applying these refinements, run a short AutoTune session (once oil is >220°F) and save the
               updated map under a new file name with the current date. Perform one additional AutoMap Write to
               bake in learned offsets. This will finalize the adjustments into a balanced, cool-running,
               high-performance 131ci calibration.

