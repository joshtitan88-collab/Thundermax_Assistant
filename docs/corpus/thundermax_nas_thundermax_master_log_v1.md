---
type: reference
title: ThunderMax_Master_Log_v1
source: throttle-logic/AI ADJUSTMENTS/ThunderMax_Master_Log_v1.pdf
---

                     ThunderMax Master Log – v1
Owner: Joshua Henry
Bike: 2023 Harley-Davidson Low Rider ST
Engine: M8 131ci Stage IV
Date: 2025-08-28 16:32:45
Index
• 1. Current Configuration
• 2. Calibration Fingerprint
• 3. Strategy & Change Log
• 4. Verification Protocol
• 5. Artifacts & References
• 6. Next Steps / TODO
         1. Current Configuration
Bike                   2023 Low Rider ST (Softail)
Engine                 Milwaukee-Eight 131ci Stage IV (CNC-ported heads, SE8-517 cam, 64mm TB, high-flow injec
Exhaust                2-into-1 racing exhaust
Fuel                   91–93 octane
ECU                    ThunderMax (TBW)
Tuning Suite           TMax Tuner (2025.3.x)
2. Calibration Fingerprint
Map File: FINALALLAROUNDGOODTUNEVatlV7autotunedv2.tbw
SHA256: ae7360d8986cfa83f9271513e48549b3906b24250344010fc23d2b00153f3f6c
Size: 214,470 bytes


Notes:
This fingerprint anchors every future change. Always back up and rename after edits (e.g.,
_POLISHED_v1, v2...).
3. Strategy & Change Log
AFR: Cruise 13.9–14.2; mid-load ~13.0; WOT 12.6–12.8; 0–2% TPS set 13.8–14.0 for decel stability.
Ignition – Belly: −3° @ 1536–2560 rpm (20–60% TPS), −2° @ 2816–3328 rpm (20–60% TPS); −1° at
80–100% TPS if WOT ping persists.
Ignition – Temp: Progressive retard beginning at ~226°F, deepening toward ~304°F.
Idle/Light Throttle: 18° at 768/1024/1280 rpm; smooth ramp to 34° by 2560 rpm.
Decel: Decel Fuel Cut OFF; +4–6% fuel at 0–2% TPS (1792–3328 rpm).
Use this section to append dated entries after each flash and test ride.
4. Verification Protocol
• Roll-on: 2000–3300 rpm at 20–60% TPS → zero ping.
• WOT (3rd gear): AFR ~13.0→12.9, CHT < 300°F, no knock.
• Cruise: 70–80 mph steady → AFR ~14.3; EGO trims within ±5%.
• Decel: 3500→2000 rpm → minimal/no pop.
5. Artifacts & References
• PatchBook_HTML: /mnt/data/ThrottleLogic_TMax_PatchBook_v1.html
• PatchBook_ZIP: /mnt/data/ThrottleLogic_TMax_PatchBook_v1.zip
• Polished_Tune_Guide_PDF: /mnt/data/ThrottleLogic_131ci_Polished_Tune_Guide.pdf


ThunderMax Docs (uploaded):
• TMaxI_TunerManual.pdf – Core operations & map editing
• TimingVsRPM.pdf – Belly identification & timing rules
• TimingVsEngineTemp.pdf – Temp-based retard strategy
• SetIdleRPM.pdf – Idle setting location
• TMaxI_USBSER_Install.pdf – USB linking/driver setup
• TMaxI_WhatsNew.pdf – Feature additions, firmware notes
6. Next Steps / TODO
■ Apply PatchBook values in TMax Tuner; save as _POLISHED_v1.tbw
■ Run the structured road test; export logs
■ Send logs: TPS, RPM, AFR F/R (target & actual), EGO trims, CHT, IAT, Ign Advance, Speed
■ Iterate: refine belly timing and WOT AFR by real data

