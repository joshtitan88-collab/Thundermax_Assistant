# thundermax-assistant

Local tuning assistant for a 2023 Harley-Davidson Low Rider ST (131ci,
ThunderMax TBW ECM). Parses `.tbw` tune files and answers tuning questions
with a local LLM grounded in the shop's own tuning docs.

**Start with [COLLABORATION.md](COLLABORATION.md)** — it's the primary
coordination doc (project state, format knowledge, house tuning rules).

## Quick start

Everything runs through one command — `./tmax` (starts Ollama automatically
when a command needs it):

```bash
# Parser (offline, no deps)
./tmax info "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/currenttune.tbw"
./tmax scan "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC" -o reports/tune_index.md
./tmax compare old.tbw new.tbw          # diff with named-table labels

# Table map (which bytes are which table)
./tmax bands                            # list known table bands + confidence
./tmax classify old.tbw new.tbw         # label a diff by table/category

# Assistant (local LLM)
./tmax ask "why do I get decel pops above 4k rpm?"
./tmax chat
./tmax analyze new.tbw --baseline old.tbw   # rider-terms explanation of a diff

# Self-check (files, syntax, unit tests, corpus)
./tmax verify
```

## Layout

- `tmax` — single CLI entry point for everything below
- `src/thundermax_parser.py` — TBW binary parser: `info`, `report`, `compare`, `scan`
- `src/table_map.py` + `src/tables.json` — named table-band map: `bands`, `classify`, `derive`
- `src/tune_assistant.py` — Ollama-backed Q&A / tune analysis. Auto-routes per
  question: quick lookups → `qwen2.5-coder:14b` (fast, on GPU), deep tuning
  strategy → `hermes3:70b`. Override with `--fast`, `--deep`, or `--model`.
- `tests/` — self-contained unit tests (synthetic tunes; no NAS/Ollama needed)
- `reports/` — generated decode reports and tune indexes
- `COLLABORATION.md` — primary path: project state and format knowledge
- `HANDOFF_FROM_GROK.md` — recovered context from the original Grok/ChatGPT sessions

## Safety

Read-only on `.tbw` files. Every AI-suggested change goes through the
validation-ride protocol (see the Thundermax AI Project folder on the NAS)
before it's trusted.
