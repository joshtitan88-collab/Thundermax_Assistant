---
type: reference
title: GROKTUNING12AUG2025V1FIRSTEVERTUNE
source: throttle-logic/TMAX TUNING MANUAL/GROKTUNING12AUG2025V1FIRSTEVERTUNE.pdf
---

 Tuning Guide for 2023 Harley-Davidson Softail Low
                     Rider ST


                                 August 12, 2025


Overview
This guide provides detailed instructions for tuning a 2023 Harley-Davidson Softail Low
Rider ST equipped with a Screamin’ Eagle 131ci Stage IV Twin-Cooled Kit (P/N 92500095),
Screamin’ Eagle Heavy Breather Extreme Air Cleaner (P/N 29400122), S&S Tappet Cuff
Lifter Guides (P/N 0929-0075), S&S Metal Fuel Rail (P/N 1022-0296), Screamin’ Ea-
gle Adjustable Pushrods, Screamin’ Eagle 10mm Spark Plug Wires, and a ThunderMax
tuner. The goal is to optimize performance, targeting 121–135 hp and 131–148 ft-lb
torque, while ensuring reliability and smooth operation.


Your Setup
  • SE 131 Stage IV Twin-Cooled Kit (P/N 92500095): Upgrades Milwaukee-
    Eight 114/117ci to 131ci with 4.31” big-bore cylinders, 10.7:1 compression pistons,
    CNC-ported Twin-Cooled heads, SE8-517 high-lift cam, 64mm throttle body, high-
    performance injectors, high-capacity oil pump, and clutch (if needed). Twin-Cooled
    system manages heat.
  • SE Heavy Breather Extreme Air Cleaner (P/N 29400122): High-flow air
    cleaner increases intake volume.
  • S&S Tappet Cuff Lifter Guides (P/N 0929-0075): Stabilizes lifters, reduces
    noise, improves valve train durability.
  • S&S Metal Fuel Rail (P/N 1022-0296): Replaces plastic fuel rail for reliable
    fuel delivery to injectors.
  • SE Adjustable Pushrods: Ensures precise lifter preload for SE8-517 cam, opti-
    mizing valve timing.
  • SE 10mm Spark Plug Wires: Improves spark delivery for better combustion.
  • ThunderMax Tuner: Closed-loop system with wideband O2 sensors for real-time
    AFR and timing adjustments.




                                          1
Tuning Guide with ThunderMax
1. Pre-Tuning Preparation
 • Verify Installation:
      – SE 131 Kit: Confirm cylinders, heads, cam, throttle body, injectors, and
        Twin-Cooled system are installed. Check coolant levels and radiator.
      – Heavy Breather: Ensure no intake leaks. Torque bolts to 20–24 ft-lb.
      – S&S Tappet Cuffs: Verify lifter preload (0.020–0.030” lash). Check for no
        valve train noise.
      – S&S Metal Fuel Rail: Confirm secure connections, no leaks, fuel pressure
        at 55–62 psi.
      – SE Adjustable Pushrods: Adjust to 2–3 turns past initial contact. Verify
        no noise or binding.
      – SE 10mm Spark Plug Wires: Confirm secure connections to plugs and
        coils. Check plug gap (0.035–0.040”).
      – ThunderMax: Verify ECM and wideband O2 sensors are installed.
 • Exhaust: Confirm exhaust type (e.g., SE Street Cannon mufflers, cat-delete, or
   aftermarket like Rinehart).
 • Fuel: Use 91+ octane to prevent detonation (10.7:1 compression).
 • Software: Download latest ThunderMax Tuner software from zippersperformance.com
   and update ECM firmware.

2. ThunderMax Initial Setup
 • Connect: Link laptop to ThunderMax ECM via USB. Open ThunderMax Tuner
   software.
 • Select Base Map:
      – Choose map for 2023 Softail Low Rider ST with Twin-Cooled 131ci, SE8-517
        cam, 64mm throttle body, Heavy Breather, high-performance injectors, and
        your exhaust.
      – If no exact map, select closest match and contact ThunderMax support (sup-
        port@thundermax.com) with part numbers (92500095, 29400122, 0929-0075,
        1022-0296, SE pushrods, SE spark plug wires).
      – Load map to ECM using ”Tune” or ”Map” function.
 • Configure Settings:
      – AFR Targets: WOT (4000–5500 RPM): 13.2:1–13.5:1; Cruising (2000–4000
        RPM): 14.0:1–14.6:1; Idle: 13.8:1–14.0:1.
      – Idle Speed: 900–1000 RPM.


                                       2
      – Ignition Timing: Use base map’s table. Adjust +1–2° in 3000–5000 RPM
        if no pinging (SE spark plug wires improve combustion; Twin-Cooled allows
        slight advance).
      – Injector Pulse Width: Verify settings match high-performance injectors
        and Heavy Breather airflow.
      – Rev Limiter: 5800–6000 RPM.
 • Enable Auto-Tune: Activate to adjust AFR and timing in real-time.

3. Road Tuning
 • Warm Up: Run bike for 5–10 minutes. Check Twin-Cooled coolant levels.
 • Ride Strategically:
      – Cruising: 2000–4000 RPM in higher gears for part-throttle AFR.
      – WOT Pulls: Controlled runs in 2nd/3rd gear (4000–5500 RPM). Avoid pro-
        longed WOT.
      – Low-Speed/Idle: Stop-and-go riding for low-RPM tuning.
 • Component Checks:
      – S&S Tappet Cuffs & SE Pushrods: Confirm reduced valve train noise.
      – S&S Metal Fuel Rail: Monitor for consistent fuel delivery (no hesitation).
      – SE Spark Plug Wires: Check for misfires or weak acceleration.
 • Monitor Logs: After 50–100 miles, review ThunderMax logs for AFR, timing,
   temps, and injector data. Apply map updates.
 • Check Issues:
      – Detonation: Pinging indicates lean AFR or advanced timing. Retard timing
        (-1–2°) or enrich AFR.
      – Heat: Monitor coolant/oil temps. Avoid AFR >14.7:1 at high loads.
      – Rough Idle: Check for intake leaks, adjust idle speed/AFR, or recheck
        pushrod preload.
      – Fuel/Spark: Verify fuel rail and spark plug wire integrity if hesitation occurs.

4. Fine-Tuning
 • Analyze Logs: Adjust AFR (e.g., 13.2:1 at WOT for Heavy Breather) and timing
   (+1° in mid-range if no detonation). S&S and SE components ensure reliability.
 • Dyno Tuning: Visit a tuner for 125–135 hp, 135–148 ft-lb torque. Twin-Cooled
   system supports aggressive tuning.
 • Riding Style:




                                          3
      – Torque-Focused: Optimize AFR (13.0:1–13.2:1) and timing at 2000–3500
        RPM.
      – Power-Focused: Focus on 4000–5500 RPM, AFR 13.2:1–13.5:1.

5. Post-Tuning Checks
 • Performance: Confirm smooth throttle, strong acceleration, stable idle.
 • Spark Plugs: Check after 100–200 miles for tan/gray color. Adjust if black (rich)
   or white (lean). Verify gap (0.035–0.040”).
 • Engine Health: Monitor ThunderMax for errors, temps. Maintain Twin-Cooled
   system (coolant every 5,000 miles) and Harley’s maintenance schedule.
 • Components: Ensure S&S tappet cuffs, SE pushrods reduce noise; S&S fuel rail
   maintains pressure; SE spark plug wires deliver strong spark.


Expected Performance
 • Horsepower: 121–135 hp.
 • Torque: 131–148 ft-lb.
 • Rideability: Crisp throttle, excellent passing power, quiet valve train, reliable fuel
   and spark delivery, cooler operation.


Additional Tips
 • Exhaust: Confirm exhaust type for tuning accuracy. SE Street Cannon mufflers
   are optimized; cat-delete exhausts boost output (e.g., 127 hp/143 ft-lb).
 • ThunderMax Support: Contact support@thundermax.com for custom map with
   all part numbers.
 • Dyno Tuning: Maximizes performance with S&S and SE component reliability.
 • Warranty: ThunderMax, S&S, and SE aftermarket parts may void warranty.
   Check with dealer.
 • Community: Visit www.harley-davidsonforums.com for user tips (e.g., 135 hp/148
   ft-lb reported).


Resources
 • ThunderMax: zippersperformance.com
 • S&S Components: www.sscycle.com
 • Harley-Davidson: www.harley-davidson.com
 • Warranty/Pricing: Contact your dealer.


                                          4
Disclaimer
Using a ThunderMax tuner and aftermarket parts may void the factory warranty and
make your bike non-compliant with EPA regulations. Verify local laws and warranty
terms with your dealer.




                                       5

