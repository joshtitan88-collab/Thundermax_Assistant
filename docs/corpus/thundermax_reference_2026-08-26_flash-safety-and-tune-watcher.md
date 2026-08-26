---
title: Flash safety checks and the tune watcher
date: 2026-08-26
source: src/tune_watcher.py + src/bike_profile.json, Claude Code 2026-08-26
status: reference — hardware safety rules and tooling
setup: m8-131-lrst-2into1-tbw
---

# Flash safety: which tunes must never go on this bike

A wrong flash can strand the bike. A merely bad tune only rides badly. These
are the hardware-mismatch rules, taken from `bike_profile.json`, and they are
checked automatically by `src/tune_watcher.py` whenever a new tune appears.

## Current hardware (confirmed USB TMAX pull 2026-08-19)

- 2023 Low Rider ST (FXLRST), Milwaukee-Eight **131ci**, air/oil-cooled
- **6.3 g/s injectors**, S&S 550 / CAM2, FuelMoto lineage, 2-into-1
- Current base map **`HXSSEDCAAN061617`**
- Known-good base maps: `HXSSEDCAAN061617`, `HYSSPVCAHN051320`, `ZZSSQXETDN100720`

## The three rules

1. **Never flash a `*55inj*` map.** Those are built for 5.5 g/s injectors.
   The older corpus note "Injector Scaling: Calibrated for 5.5 g/sec" describes
   base map `ZZSSQXETDN100720` and is **superseded** for the current build.
   Injector duty scales inversely with flow, so the wrong value mis-reads every
   simulated pull — seeding the virtual dyno at 5.5 instead of 6.3 put baseline
   peak duty at 74% when the truth was 64.6%.

2. **`v6` in a filename means VERSION 6, not 6.3 injectors.**
   `17AUG2025ATLRUNNINGGREATv6TODAY.tbw` is SE8-517 history from a different
   build. Do not flash it onto the 6.3s. `m8128basemap3v6.tbw` in `OL TUNES/`
   is a real file on the NAS that trips this rule today — and it is a **128ci**
   base map, not 131.

3. **A base-map ID outside the known list is a warning, not a rejection.** It
   is either a new map deliberately being tried, or a tune built for a
   different bike. Confirm before flashing.

Also: **do not lock the 330–345°F AutoTune trims.** Those temperatures are well
above the 280°F AutoTune disable gate, so the trims learned there are
heat-soak garbage.

## The tune watcher

`src/tune_watcher.py` + `systemd/tmax-watch.service`. Watches the tune folder
and, when a new `.tbw` lands, writes a briefing that already did the diff, the
table classification, the setup safety check above, and the AutoTune-feedback
read — *before* the decision to flash.

```bash
python3 src/tune_watcher.py                             # watch
python3 src/tune_watcher.py --once                      # single pass
python3 src/tune_watcher.py --brief sometune.tbw        # brief one now
systemctl --user enable --now tmax-watch                # run as a service
```

It reads `.tbw` and never writes them. The systemd unit runs
`ProtectSystem=strict` + `ProtectHome=read-only`, so the NAS mount is read-only
to the process and "never write a `.tbw`" is enforced by the kernel rather than
by intention.

## Four ways a folder watcher fails silently

Worth knowing generally, not just here — each of these looks like success:

1. **`Path.glob()` does not raise on a missing directory, it yields nothing.**
   An unmounted NAS therefore reads as `{}`, indistinguishable from "folder is
   there and empty". Without an explicit `is_dir()` check the watcher clears
   its state as though all 153 tunes were deleted, then re-briefs every one
   when the mount returns.
2. **inotify does not fire for another host's writes to a CIFS/SMB share.** A
   watcher built on it looks healthy and sees nothing, forever. Poll instead.
3. **A file mid-copy over SMB is visible at the wrong size.** Briefing it
   produces a confident, wrong "corrupt tune" report. Require the exact
   expected size AND an unchanged (size, mtime) across two consecutive polls.
4. **`subprocess.run(check=False)` with an unread return code reports success
   for a notifier that fails every time.** The briefing sits on disk, nobody is
   told, and nothing in the log says so. Read the exit code.

Related: [[thundermax_reference_2026-08-26_nas-tune-storage-intel]] ·
[[thundermax_reference_2026-08-26_autotune-learned-feedback]]
