---
type: concept
title: >-
  Icloud Thundermax Ai Project Thundermax 3 Mode Switch Wiring And Tuning Guide
  Co A83464
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max tuning/Thundermax AI
  Project/ThunderMax_3_Mode_Switch_Wiring_and_Tuning_Guide copy.docx
---

19AUG2025
ThunderMax 3-Mode Switch Wiring & Tuning Guide
■ Objective
Create a physical 3-position toggle switch to control Race, Street, and Heat tuning profiles on a ThunderMax ECU, using sensor spoofing and zone-based tuning logic.
■ Hardware Required
- 3-position SPDT switch (on-on-on or center-off) - Resistors: 1.5kΩ and 4.7kΩ (1% tolerance) - Wire, terminals, solder, shrink wrap - Optional: relay or isolation diode (to prevent DTC or electrical feedback)
■ Target Sensor: Barometric Pressure Sensor
- BARO sensor outputs a 0–5V signal used by ThunderMax primarily at startup. - We can spoof this voltage using resistor dividers to send alternate values. - ThunderMax allows tuning based on baro changes (interpreted as altitude). This becomes our map switch trigger.
■ Voltage Targets
- Mode 1 (Street): 4.5V (normal sensor connection) - Mode 2 (Race): ~2.5V (1.5kΩ to ground) - Mode 3 (Heat): ~1.2V (4.7kΩ to ground)
■■ Wiring Diagram (Text Description)
1. Cut the BARO signal wire. 2. Connect ECM-side signal wire to center terminal of 3-way switch. 3. One switch leg reconnects to BARO sensor (default mode). 4. Other two switch legs go to: - 1.5kΩ resistor to ground (Race) - 4.7kΩ resistor to ground (Heat) 5. Ground both resistors to chassis or battery ground.
■ ThunderMax Tuning Setup
Inside ThunderMax AFR, Spark, and VE tables: 1. Define tuning behavior by baro value zones: 4.0–5.0V = Street - 2.0–3.0V = Race - 0.8–1.5V = Heat 2. Build unique fuel/spark/VE settings for each zone. 3. Flash map with all three behaviors programmed.
■ Expected Behavior
- Toggle switch sends fixed voltage to ECM based on position. - ThunderMax interprets voltage as barometric pressure change. - You get three entirely different tuning behaviors without reflashing the
ECU.
■■ Notes & Tips
- Use precision resistors (1% tolerance) for stable switching. - Test voltages at ECM pin before final soldering. - Optional: use a relay or isolation diode to prevent sensor backfeed or DTC. - Make sure VE/Spark/AFR maps are smooth across all zones to prevent hesitation during switching.
