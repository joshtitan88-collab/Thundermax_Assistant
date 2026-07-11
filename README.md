# thundermax-assistant

Local tuning assistant for a 2023 Harley-Davidson Low Rider ST (131ci,
ThunderMax TBW ECM). Parses `.tbw` tune files and answers tuning questions
with a local LLM grounded in the shop's own tuning docs.

**Start with [COLLABORATION.md](COLLABORATION.md)** — it's the primary
coordination doc (project state, format knowledge, house tuning rules).

## Quick start

```bash
# Parser (stdlib only, no deps)
python3 src/thundermax_parser.py info "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC/currenttune.tbw"
python3 src/thundermax_parser.py scan "/mnt/nas/ADMIN/LOCAL NAS/THROTTLE LOGIC" -o reports/tune_index.md
python3 src/thundermax_parser.py compare old.tbw new.tbw
python3 src/thundermax_parser.py report currenttune.tbw -o reports/currenttune_decode_report.md

# Assistant (needs ollama serve running)
export PATH="$HOME/.local/ollama/bin:$PATH"
ollama serve &   # if not already running
cd src
python3 tune_assistant.py ask "why do I get decel pops above 4k rpm?"
python3 tune_assistant.py chat
python3 tune_assistant.py analyze new.tbw --baseline old.tbw
```

## Layout

- `src/thundermax_parser.py` — TBW binary parser: `info`, `report`, `compare`, `scan`
- `src/tune_assistant.py` — Ollama-backed Q&A / tune analysis (model: `qwen2.5:7b-instruct`)
- `reports/` — generated decode reports and tune indexes
- `COLLABORATION.md` — primary path: project state and format knowledge
- `HANDOFF_FROM_GROK.md` — recovered context from the original Grok/ChatGPT sessions

## Safety

Read-only on `.tbw` files. Every AI-suggested change goes through the
validation-ride protocol (see the Thundermax AI Project folder on the NAS)
before it's trusted.
