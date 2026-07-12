# CLAUDE.md — thundermax-assistant

Local tuning assistant for Joshua's 2023 Harley-Davidson Low Rider ST (131ci build,
2-into-1 exhaust, ThunderMax TBW throttle-by-wire ECM). It parses proprietary `.tbw`
tune binaries (integrity check, base-map ID, region diffs, decode reports, folder
indexing) and answers tuning questions via a local Ollama LLM grounded in the shop's
own tuning documentation. Rebuilt 2026-07-11 by Claude Code from artifacts left by
earlier Grok/ChatGPT ("Throttle Logic") sessions whose source code was lost.

## HARD RULES

1. **COLLABORATION.md is the primary collaboration path. Read it FIRST, every
   session.** It holds project state, TBW format knowledge, house tuning rules,
   and the open-task list. Keep it updated when state changes.
2. **NEVER write, create, or modify `.tbw` files.** Only the ThunderMax software
   may write those — a corrupted flash can strand the bike. Reading them is fine.
   (`.gitignore` also excludes `*.tbw` from the repo.)

## Structure

- `COLLABORATION.md` — primary path: state, format knowledge, house rules (read first)
- `HANDOFF_FROM_GROK.md` — reconstructed context from the original Grok/ChatGPT era
- `README.md` — quick start
- `src/thundermax_parser.py` — TBW binary parser (stdlib only): `info`, `report`,
  `compare` (now labels changed regions with named tables), `scan` subcommands
- `src/table_map.py` — names the byte regions of a tune: `bands`, `classify A B`,
  `derive <folder>`. Reads `src/tables.json`.
- `src/tables.json` — frozen table-band map (offset ranges → AFR/fuel/timing/
  autotune/metadata, with confidence tiers and `needs_ground_truth` notes)
- `src/tune_assistant.py` — Ollama-backed assistant: `ask`, `chat`, `analyze`;
  model `qwen2.5:7b-instruct`, server at `127.0.0.1:11434`
- `docs/corpus/` — local markdown corpus (45 docs) mirrored from the NAS
  brain_vault; the assistant prefers it, falling back to `/mnt/nas/ADMIN/brain_vault`
- `reports/` — generated decode reports and tune indexes
- `tests/` — currently empty (no test suite yet)

Data lives on the NAS (slow): tunes in `/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/`,
AI project docs under `.../NEWER IPAD 16SEP2025/Thundermax AI Project/`.
This repo holds code only.

## Run / verify

```bash
# Parser — no deps, works offline
python3 src/thundermax_parser.py info "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/currenttune.tbw"
python3 src/thundermax_parser.py compare old.tbw new.tbw
python3 src/thundermax_parser.py report currenttune.tbw -o reports/currenttune_decode_report.md
python3 src/thundermax_parser.py scan "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC" -o reports/tune_index.md

# Assistant — needs ollama serve running
export PATH="$HOME/.local/ollama/bin:$PATH"
ollama serve &            # if not already running
cd src
python3 tune_assistant.py ask "why do I get decel pops above 4k rpm?"
python3 tune_assistant.py chat
python3 tune_assistant.py analyze new.tbw --baseline old.tbw
```

No automated tests exist; verify by running the commands above against real tunes.
All observed `.tbw` files are exactly 214470 bytes. Table *bands* are now located
and named (`tables.json`); per-cell engineering-unit scaling is still unconfirmed
for most tables (timing ≈49 raw/deg, medium confidence) — top open task, see
COLLABORATION.md for the one-cell TMax ground-truth experiment that closes it. Any tuning change the assistant
suggests must go through the validation-ride protocol before it is trusted.
