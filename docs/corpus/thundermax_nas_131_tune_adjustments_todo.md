---
type: reference
title: 131_Tune_Adjustments_ToDo
source: throttle-logic/AI CHANGES/131_Tune_Adjustments_ToDo.pdf
---

    ThunderMax 131ci Tune Adjustments – To-Do List

This checklist summarizes the recommended adjustments for your custom ThunderMax basemap
(131ci build with AutoTune integration). These steps are based on ThunderMax tuning manuals and
best practices. Apply carefully and re-save your map after each major change.



Rear Cylinder Timing vs TPS
•   Currently has +1° above ~70% TPS.

•   Change this to 0% or -1% above ~70% TPS to prevent detonation under load.

•   Rear offset page should only be used to reduce knock—not to advance timing.



Timing vs RPM (Composite Spark Curve)
•   Midrange (2000–3200 RPM) slope is too aggressive.

•   Adjust for smoother growth: ~18° @ idle, 22° @ 1500, 25° @ 1800, 30°+ @ 2000+.

•   Ensure curves progress smoothly without flat spots.



Timing vs Engine Temperature
•   Currently not pulling timing soon enough as temps rise.

•   Begin pulling timing around 226°F.

•   Add -3° to -4° retard by 320–340°F to manage heat and knock.



AFR Correction vs Temperature
•   Currently untouched.

•   If lean stumble during warmup, add small enrichments 80–160°F.

•   Otherwise leave as-is (AutoTune will handle most conditions).



Decel Pop Management
•   Decel Fuel Cut is disabled (correct for 2-into-1 exhaust).

•   If popping persists, increase Decel Enrichment instead of enabling Decel Fuel Cut.



Cruise AFR Targets
•   If fuel mileage is low, lean AFR slightly in cruise zones.

•   Suggested: 2048–2816 RPM / 10–20% TPS → target 14.2–14.4 AFR.
•   Balance economy vs performance as needed.



Best Practices
•   Always save modified maps as NEW files with date codes (e.g., MapName_090525).

•   Test changes one category at a time (timing, AFR, etc.) before stacking adjustments.

•   Monitor AFRs, head temps, and timing knock signs after every flash.

