# COLLABORATION.md — Thundermax Tuning Assistant (primary path)

This is the primary coordination document for the project. Any AI or human
picking up this project starts here.

## What this project is

A local tuning assistant for Joshua's **2023 Harley-Davidson Low Rider ST,
131ci, 2-into-1 exhaust, ThunderMax TBW ECM**. It:

1. **Parses `.tbw` tune files** (`src/thundermax_parser.py`) — validates
   integrity, extracts the base-map ID, diffs two tunes region-by-region,
   generates markdown decode reports, and indexes whole folders of tunes.
2. **Answers tuning questions locally** (`src/tune_assistant.py`) — an
   Ollama-backed chat/Q&A grounded in the shop's tuning documentation from
   the NAS brain_vault, plus an `analyze` mode that explains what changed
   between two tunes in rider terms.

## Provenance

- The original effort ran through Grok and ChatGPT ("Throttle Logic")
  sessions in Aug–Sep 2025. Those sessions produced the tuning docs, tune
  cards, ride packets, and one decode report — but **no source code
  survived** to the NAS. See `HANDOFF_FROM_GROK.md` for what was recovered.
- This codebase was rebuilt from those artifacts on 2026-07-11 by Claude
  (Claude Code), reverse-engineering the TBW format from real tune files.

## Where the data lives

| What | Where |
|---|---|
| Tune files (`.tbw`, ~30) | `/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/` |
| Tuning manuals & guides | `/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/TMAX TUNING MANUAL/` |
| AI project docs (ride packet, tune card, templates) | `/mnt/nas/ADMIN/LOCAL NAS/NEWER IPAD 16SEP2025/Thundermax AI Project/` |
| Searchable markdown corpus (37+ docs) | `/mnt/nas/ADMIN/brain_vault/` (files matching `*thundermax*` / `*thunder_max*`) |
| Prior decode report (format reference) | `.../TMAX TUNING MANUAL/FINALALLAROUNDGOODTUNEVatlV2_decode_report.md` |

## TBW format — what we know so far

- All observed files are exactly **214470 bytes**.
- Header: four LE u32 at 0x00 (`0x87, 0x4000, 0x1, 0x147` in every sample).
- **Base-map ID** at `0x10`: one length byte (0x10=16) + 16 ASCII chars
  (e.g. `HYSSPVCAHN051320`, `HXSSEDCAAN06161…`, `ZZSSQXETDN100720`).
  This is the only ASCII string in the file.
- `0x21`–`~0x360`: per-section metadata/checksums (these bytes churn
  whenever *any* table changes).
- Beyond `~0x3C0`: table data. Timing regions show 16-byte-stride rows of
  LE u16 `(value, flag)` pairs; a "global −1° timing" edit changed exactly
  one u16 column per row by a uniform delta.
- **Scaling to engineering units is unconfirmed.** The compare command
  reports raw deltas plus ÷256 and ÷1024 candidate scalings. Confirming
  scale factors (open a known tune in TMax Tuner, note one cell, find its
  raw value) is the top open task.

## House tuning rules (from validated shop history)

- AutoTune learning gates: **enable >200°F, disable >280°F**; cold-start and
  heat-soak trims are garbage — block them.
- Decel pop protocol: closed-throttle 4000→2000 rpm decels in 3rd/4th.
  Pops above 4k → **+2% VE @ 0–2% TPS, 3840–4608 rpm**. Broad-range pops →
  **−1° spark @ 0–2% TPS, 2048–2816 rpm**.
- Always log TPS, RPM, AFR target vs actual, CHT, trims.
- Every tune change gets a validation ride + tune report
  (template in the Thundermax AI Project folder).

## Current state (2026-07-11)

- [x] Parser: integrity, base-map ID, header decode — tested on real tunes
- [x] Parser: region diff (`compare`) with delta stats
- [x] Parser: decode-report generation matching the shop template
- [x] Parser: batch `scan` index of a tune folder
- [x] Assistant: Ollama-backed `ask` / `chat` / `analyze`
- [x] Ollama installed user-local (`~/.local/ollama/bin`), model `qwen2.5:7b-instruct`
- [ ] Confirm raw→engineering unit scaling for timing/fuel/AFR tables
- [ ] Map table offsets to named tables (AFR grid, front/rear fuel, timing pages)
- [ ] Optional: GPU accel (RTX 5060 Ti present but NVIDIA driver not installed)

## Ground rules

- **Never write to `.tbw` files.** Read-only until the format is fully
  confirmed. A corrupted flash can strand the bike.
- Anything the assistant suggests still goes through the validation-ride
  protocol before it's trusted.
- NAS paths are the source of truth for data; this repo holds code only.
