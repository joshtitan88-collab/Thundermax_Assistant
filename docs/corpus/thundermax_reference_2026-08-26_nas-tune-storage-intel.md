---
title: ThunderMax NAS tune storage — where the tunes are and how to read them safely
date: 2026-08-26
source: first-hand survey of the NAS by Claude Code, 2026-08-26
status: reference — infrastructure fact, not a tuning claim
setup: m8-131-lrst-2into1-tbw
---

# ThunderMax NAS tune storage intel

Verified first-hand on 2026-08-26 by walking the whole tree. Supersedes the
July 2026 note claiming the NAS layout had changed or the folder was deleted —
**that was wrong**. The folder is intact.

## Where the tunes actually are

| What | Where |
|---|---|
| Tune files | `/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/` |
| Tuning manuals | `.../THROTTLE LOGIC/TMAX TUNING MANUAL/` |
| AI project docs | `/mnt/nas/ADMIN/LOCAL NAS/NEWER IPAD 16SEP2025/Thundermax AI Project/` |
| Writable mirror | `~/tmax-exchange/tunes-from-nas` |
| NAS host | `192.168.50.92` |

Counts as of 2026-08-26: **70 `.tbw` in the top folder, 153 across the whole
tree.** Every one is exactly **214470 bytes** — a file that is not exactly that
size is not a tune this parser understands, and should be treated as suspect
rather than parsed.

`TMAX_TUNES_DIR` is no longer required. The default path resolves correctly.

## The NAS is read-only for the `joshua` user — by mount option

Confirmed 2026-08-26. The share is mounted:

```
//192.168.50.92/ADMIN on /mnt/nas/ADMIN type cifs
    (rw,...,uid=0,forceuid,gid=0,forcegid,file_mode=0664,dir_mode=0775,...)
```

`forceuid`/`forcegid` with `uid=0,gid=0` make every file and directory appear
owned by **root:root**, and `dir_mode=0775` leaves non-root users with only
`r-x`. So although the mount itself is `rw`, the `joshua` account cannot create
or modify anything anywhere under `/mnt/nas/ADMIN` — including
`brain_vault/00-inbox/`. Writes fail with `EACCES`.

This is a mount-option effect, **not** a NAS-side permission problem, so
changing shares or folders on the Buffalo will not fix it. The fix is to
remount with `uid=1000,gid=1000` (or drop `forceuid`/`forcegid`), which needs
root.

**Useful side effect:** this is what makes "never write a `.tbw`" structurally
true rather than merely intended — the tune files are physically unwritable by
the user the tooling runs as. Do not "fix" the mount without realising that
protection goes away with it.

## Three traps when reading this folder

1. **Filter macOS `._*` AppleDouble sidecars.** They are 4096 bytes and sit
   next to the real files. A naive parser that globs `*.tbw` will pick them up
   and crash, or worse, report them as corrupt tunes.

2. **The writable mirror loses the NAS's protection.** `~/tmax-exchange/
   tunes-from-nas` is a complete copy, but it is writable. The NAS copy is
   read-only, which is a structural guarantee that nothing can corrupt a tune.
   Pointing tooling at the mirror throws that guarantee away. Prefer the NAS
   path; use the mirror only when the NAS is genuinely unavailable.

3. **`Path.glob()` does not raise when the mount is missing — it returns
   nothing.** So an unmounted NAS is indistinguishable from an empty folder
   unless you check `is_dir()` first. Any tool that treats "no files found" as
   "all tunes deleted" will do something destructive the moment the mount
   blinks. This is not hypothetical: it was caught in `tune_watcher.py`, where
   it would have cleared the watcher's state and then re-briefed all 153 tunes
   when the mount returned.

## The July "NAS is gone" false alarm — what really happened

`tower-nas-path` had the Buffalo share **staged** — an empty local directory
standing in for the mount — while the NAS was down. Tools looked at that empty
directory and concluded the tune folder had been deleted. Nothing was lost.
Before concluding data is gone, confirm the mount is actually mounted.

## What is NOT here

There are **no ride datalogs anywhere on this NAS.** The tree holds 153 `.tbw`,
33 PDFs, 19 zips and 4 CSVs. The CSVs (`AFR_Targets__Recommended_.csv`,
`Timing_vs_Engine_Temp__Retard_deg_.csv`, `timing_vs_rpm_targets.csv`) are
*recommendation* tables produced by earlier AI sessions — they are targets
somebody proposed, not measurements the bike produced. Do not cite them as
evidence of what the engine did.

See [[thundermax_reference_2026-08-26_no-ride-data-open-loop]].
