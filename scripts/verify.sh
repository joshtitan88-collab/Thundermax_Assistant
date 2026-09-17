#!/usr/bin/env bash
# Self-check for the committed Level-1 JSON diagnostic slice (local/free).
# Does not require shop LAN, Mini, Ollama, or .tbw files. Never writes .tbw.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> compileall (thundermax_assistant + tests)"
python3 -m compileall -q thundermax_assistant tests

echo "==> unit tests"
python3 -m unittest discover -s tests -v

echo "==> example case (JSON CLI; no .tbw)"
AUDIT="${TMPDIR:-/tmp}/tmax-verify-audit.sqlite3"
rm -f "$AUDIT"
python3 -m thundermax_assistant.cli examples/decel_pop_heat_soak.json --audit-db "$AUDIT" >/dev/null

echo
echo "verify: OK (Level-1 JSON slice)"
echo "note: ./tmax info|ask|bands require src/*.py modules not present in this public tree"
exit 0
