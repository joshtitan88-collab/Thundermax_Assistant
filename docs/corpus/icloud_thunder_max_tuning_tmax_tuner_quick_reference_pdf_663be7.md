---
type: concept
title: Icloud Thunder Max Tuning Tmax Tuner Quick Reference Pdf 663be7
source: >-
  icloud/LOWRIDER ST 131MANUALS/Thunder max
  tuning/TMax_Tuner_Quick_Reference.pdf
---

TMaxI Tuner Quick Reference Guide
For Harley-Davidson Milwaukee-Eight 131ci – ThunderMax EFI

Prepared for: Joshua Henry
Date: August 25, 2025

Quick Navigation
Task

Menu Path

Install / Uninstall TMax Tuner

Software Setup → Installer

Link & Sync to ECM

TMax Control Center → Link → Monitor

Read Module Map

File → READ Module Maps and Settings

Write Module Map

File → WRITE Module Maps and Settings

Base Map Selection

File → Open Base Map → Library Filter

AutoMap Cycle

TMax Control Center → Auto Tune Points Analyzer → Run AutoMap

Engine Monitor Gauges

Monitor → Customize Gauges

Basic Settings

Configure → Basic Settings

Closed-Loop Module Settings

Configure → Closed Loop Module Settings

Common Procedures

Link, Read, and Start Live Data
1) Plug in USB, key ON, run/stop to RUN.
2) Wait for LINK to go green, then click Monitor.
3) Sync maps if prompted.

Write a Base Map Cleanly
1) Pick closest base map (match displacement, injectors/TB, cam, exhaust).
2) File → WRITE Module Maps and Settings.
3) Initialize when prompted (hands off throttle).
4) Verify Idle RPM, Speedo Cal, Rev Limit.

Run AutoMap Cycle
1) Read Module Maps and Settings.
2) Open Auto Tune Points Analyzer.
3) Run AutoMap if offsets available.
4) Repeat after more riding.

Basic Settings Reference
Setting

Purpose / Notes

Initial Fuel Pulse

Cold start priming. Default ~199. Adjust in small steps.

Cranking Fuel

Fuel during crank only.

Accel Fuel

Tip-in enrichment. Raise if lean stumble, lower if soggy.

Decel Fuel Cut

Controls decel pop. Use ON + RPM Low/High + Post Enrichment.

Idle RPM

Set target idle. (e.g., 950–1000 rpm).

Speedo Cal

Correct after tire/pulley changes.

Engine Temp Alarm

Set your preferred warning threshold (e.g., 300°F).

Cooling Fan Threshold

For bikes with fans (set ON/OFF temps).

Closed-Loop & AutoTune Setup
• Enable AutoTune both sides: Configure → Closed Loop Module Settings.
• Check 'Auto Tune (Module)' and 'Auto Tune (Map)'.
• Write Map Settings to Module.
• Use Max Session CLP and Maximum CLP to cap learning (%).
• AFR Override lets you force a single AFR target across all ranges for testing.

Tuning Notes
Use this space to log your changes, test rides, and observations.
