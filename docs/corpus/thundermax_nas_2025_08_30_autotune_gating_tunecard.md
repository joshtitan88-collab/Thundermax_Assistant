---
type: reference
title: 2025-08-30_AutoTune_Gating_TuneCard
source: ai-project/2025-08-30_AutoTune_Gating_TuneCard.pdf
---

TuneCard: AutoTune Gating for Validation Rides
Bike: 2023 Low Rider ST — 131ci — ThunderMax (TBW)


■ Why:
AutoTune will try to 'correct' your richer decel fueling back lean.
Gating learning temps keeps your patch intact until you validate it.

■ Steps (ThunderMax Tuner):
1. Open TMax Tuner → Connect to module.
2. Go to: Module Configuration → AutoTune / Learning Settings (Advanced).
3. Set Learning Temperature Gates:
  • Min Engine Temp (Enable Learning Above): 200°F
  • Max Engine Temp (Disable Learning Above): 280°F
4. (Optional) Uncheck 'Enable Learning' to turn AutoTune OFF for testing.
5. Save Config → Write to Module.

■ Test Ride Protocol:
• Warm engine fully (CHT > 220°F).
• Do closed-throttle decels 4000→2000 rpm in 3rd & 4th.
• Record observations:
  ✓ Pops gone/faint burble → patch validated.
  ✗ Pops above 4k → add +2% VE @ 0–2% TPS, 3840–4608 rpm.
  ✗ Pops broad range → subtract −1° spark @ 0–2% TPS, 2048–2816 rpm.

■ After Validation:
• If patch is good → Keep 200–280°F gates or restore ~160–320°F.
• If patch needs more work → repeat flash, ride, log, adjust.

■■ Notes:
• Cold-start trims = garbage → block them.
• Heat-soak trims = garbage → block them.
• Always log TPS, RPM, AFR target vs actual, CHT, trims.

