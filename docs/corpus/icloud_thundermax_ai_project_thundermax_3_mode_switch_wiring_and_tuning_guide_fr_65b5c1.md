---
type: concept
title: >-
  Icloud Thundermax Ai Project Thundermax 3 Mode Switch Wiring And Tuning Guide
  Fr 65b5c1
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max tuning/Thundermax AI
  Project/ThunderMax_3_Mode_Switch_Wiring_and_Tuning_Guide_FRESH copy.docx
---

ThunderMax 3-Mode Switch Wiring & Tuning Guide
■ Objective
Create a physical 3-position toggle switch to control Race, Street, and Heat tuning profiles on a ThunderMax ECU by spoofing sensor voltages to activate distinct zones in a single map.
■ Hardware Required
- 3-position SPDT switch (on-on-on or center-off) - Resistors: 1.5kΩ and 4.7kΩ (1% tolerance) - Wire, terminals, solder, shrink wrap - Optional: relay or isolation diode to prevent electrical feedback
■ Target Sensor: Barometric Pressure Sensor
- ThunderMax reads BARO as a 0–5V input. - You can spoof this voltage using resistors to simulate different altitude conditions. - ThunderMax uses baro input to adapt fuel and spark based on air density. We use this to define three zones in one map.
■ Voltage Targets
- Mode 1 (Street): 4.5V (direct sensor connection) - Mode 2 (Race): ~2.5V (via 1.5kΩ to ground) - Mode 3 (Heat): ~1.2V (via 4.7kΩ to ground)
■■ Wiring Diagram (Description)
1. Cut the BARO signal wire going to ECM. 2. Connect the ECM-side of the signal wire to the center pole of a 3-position SPDT switch. 3. Wire: - One switch position directly to BARO sensor signal wire (Street mode). - Second position through a 1.5kΩ resistor to ground (Race mode). - Third position through a 4.7kΩ resistor to ground (Heat mode). 4. Ground both resistors securely.
■ ThunderMax Tuning Setup
1. Inside SmartLink, set AFR, Spark, and VE zones based on barometric pressure voltage range: 4.0–5.0V = STREET - 2.0–3.0V = RACE - 0.8–1.5V = HEAT 2. Define tuning strategies for each mode.
3. Save and flash the map.
■ Expected Behavior
- Switch sends spoofed signal to ThunderMax ECM. - ECM interprets the voltage as baro change and selects AFR/spark/VE zones accordingly. - You now have three ride modes in one map, switchable in real time.
■■ Final Notes
- Use quality resistors and test voltages before finalizing wiring. - Do not exceed expected 0–5V signal range. - Optionally isolate BARO sensor completely to prevent conflicts or DTC. - Keep transitions smooth across AFR and spark tables to avoid stumble.
