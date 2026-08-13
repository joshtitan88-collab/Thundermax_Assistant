import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXAMPLE = ROOT / "examples" / "decel_pop_heat_soak.json"


class CliTests(unittest.TestCase):
    def test_cli_returns_valid_recommendation(self):
        with tempfile.TemporaryDirectory() as directory:
            result = subprocess.run(
                [sys.executable, "-m", "thundermax_assistant.cli", str(EXAMPLE), "--audit-db", str(Path(directory) / "audit.db")],
                cwd=ROOT,
                capture_output=True,
                text=True,
                check=False,
            )
        self.assertEqual(result.returncode, 0, result.stderr)
        payload = json.loads(result.stdout)
        self.assertEqual(payload["safety"]["decision"], "PASS")

    def test_cli_rejects_invalid_json(self):
        with tempfile.TemporaryDirectory() as directory:
            bad = Path(directory) / "bad.json"
            bad.write_text("not json", encoding="utf-8")
            result = subprocess.run(
                [sys.executable, "-m", "thundermax_assistant.cli", str(bad), "--audit-db", str(Path(directory) / "audit.db")],
                cwd=ROOT,
                capture_output=True,
                text=True,
                check=False,
            )
        self.assertEqual(result.returncode, 2)
        self.assertEqual(json.loads(result.stderr)["status"], "INVALID_INPUT")
