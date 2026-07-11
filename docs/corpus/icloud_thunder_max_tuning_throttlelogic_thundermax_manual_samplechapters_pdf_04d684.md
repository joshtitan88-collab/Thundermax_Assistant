---
type: concept
title: >-
  Icloud Thunder Max Tuning Throttlelogic Thundermax Manual Samplechapters Pdf
  04d684
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/ThrottleLogic_ThunderMax_Manual_SampleChapters.pdf
---

Throttle Logic ThunderMax Master Tuning Reference
Sample Chapters – Print Edition Style Preview

Throttle Logic – ThunderMax Master Tuning Reference • Sample Chapters • Page 1

Chapter 1 – Base Setup
What It Is
Base setup is the foundation of every ThunderMax tune. This includes firmware, TPS calibration,
O■ readiness, and throttle offset alignment. If you skip this step or do it poorly, every other
adjustment will be compromised.

Safe Ranges & Rules
• Firmware: Always run the latest stable ThunderMax firmware unless a rollback is required for a
known bug.
• TPS: Idle TPS should settle between 0.4–0.6 V (approx. 6–7% on ThunderMax scale).
• O■ Sensors: Ensure they read READY before running AutoTune; replace if showing persistent
lean or rich faults.
• Throttle Offset: Never leave stock offset unverified; a 2–4% misalignment can throw AFR and VE
off across the map.

How To Adjust (Step-by-Step)
→ Connect ThunderMax to laptop via USB.
→ Open TMax software → Device → Firmware Management → Verify or Rollback.
→ Navigate to Module Configuration → TPS Calibration.
→ Follow on-screen prompts: close throttle fully, then wide-open throttle (WOT).
→ Confirm idle TPS shows 0.4–0.6 V (6–7%).
→ Go to Sensors → Verify O■ Status (must read READY).
→ Adjust Throttle Offset: Module Config → Idle Control → Offset Adjustment →
increment/decrement until idle stabilizes.

Example / Case Study
Bike: 2023 Low Rider ST, 131ci. Issue: unstable idle. TPS read 1.2 V (off scale). Correction:
recalibrated TPS, set throttle offset +3%. Idle stabilized at 900 RPM. Result: eliminated stalling and
rear jug lean surge.

Pro Tips
• Always warm the bike before final TPS/O■ checks.
• If O■ sensors won’t go READY, cycle key and check grounds before replacing sensors.
• Document every firmware version used in your log book.

Throttle Logic – ThunderMax Master Tuning Reference • Sample Chapters • Page 2

Chapter 2 – AFR Strategy
What It Is
AFR (Air-Fuel Ratio) dictates how lean or rich the motor runs. A correct AFR balance ensures
maximum power without overheating or detonation. ThunderMax allows AFR targets per RPM and
TPS zone.

Safe Ranges & Rules
Zone

Target AFR

Notes

Idle

13.6 – 14.0

Stable idle, smooth sound

Cruise

13.2 – 13.6

Fuel economy with throttle response

Accel / Heavy Cruise

12.8 – 13.0

Keeps cylinders cool

Wide Open Throttle

12.6 – 12.8

Maximum safe power

How To Adjust (Step-by-Step)
→ Open TMax software → Fuel Settings → Target AFR.
→ Identify idle, cruise, accel, and WOT zones in RPM/TPS grid.
→ Enter AFR values per safe range table above.
→ Flash ECM → Start bike → Warm to operating temp.
→ Verify actual AFR via live monitor; adjust as needed if sensors trend lean or rich.

Example / Case Study
Bike: 2019 Road Glide 114. Complaint: excessive popping on decel. AFR table showed 14.7 at
cruise and 14.2 WOT. Correction: cruise reset to 13.4, WOT reset to 12.8. Result: pop eliminated,
throttle response crisp, engine temp reduced ~10°F in city traffic.

Pro Tips
• Avoid 14.7 AFR in any zone on performance builds; factory lean values run too hot.
• Set rear cylinder 0.2 richer than front to stabilize temps.
• Use AutoTune to confirm VE, but always manually set AFR targets for safety.

Throttle Logic – ThunderMax Master Tuning Reference • Sample Chapters • Page 3
