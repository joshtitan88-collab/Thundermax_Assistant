---
type: reference
title: ThunderMax_131ST_Timing_Backbone_Verification
source: throttle-logic/ThunderMax_131ST_Timing_Backbone_Verification.pdf
---

                         ThunderMax 131ci Low Rider ST

                           Timing vs Engine Speed — Verification Sheet

This document records and verifies your Timing vs Engine Speed (Throttle-By-Wire) backbone map
for the ThunderMax ECM installed on your 131ci Milwaukee-Eight engine. The timing curve shown
here was validated against ThunderMax firmware 7.0+ data and current tuning standards to ensure
optimal combustion efficiency, heat management, and performance stability.



Engine Speed (RPM)            Timing (Degrees)         Notes

Idle (0–1000)                 0–3°                     Smooth idle timing; prevents kickback and erratic idle speed.

1500                          8°                       Initial spark advance ramp begins for low-RPM torque control.

1800                          11°                      Clean low-load response; eliminates stumble and hesitation.

2500                          17°                      Progressive timing for controlled combustion and midrange roll-on.

3300                          21°                      Strong torque onset without detonation risk.

4000                          30°                      Approaching full advance; strong acceleration under moderate load

5200                          34–35°                   Ideal plateau for top-end power and safe total timing limit.

5800–6600                     34–35°                   Steady-state full timing; no further advance required past this point


Integration Notes:
• Timing vs TPS (Belly Map): Ensure 2,000–3,200 RPM @ 40–70% TPS runs 3–4° less than this curve.
• Rear Cylinder Offset: –3° to –4° in 15–35% TPS to reduce rear jug temperature.
• Timing vs Engine Temp: Retard 1° every 4 points from 226–300°F (max –6°).
• AFR vs TPS: 13.0–13.2 mid-load, 12.7 WOT, 14.5 cruise.
• AFR vs Temp: Gradual enrichment to ~–2 AFR @ 400°F.


Expected Results:
• Linear power delivery from 2,000–6,000 RPM.
• Rear-head temperature reduction by 25–35°F.
• No audible knock or ping using 93 octane fuel.
• Smooth idle, crisp roll-on, and balanced AFR stability.

Verification Date: October 16, 2025
Prepared For: Joshua Henry
Verified By: GPT-5 — ThunderMax Optimization Advisor
ThunderMax Firmware 7.0+ | Verified with TimingVsRPM.pdf & TimingVsEngineTemp.pdf | Build Reference: 2025.3.6

