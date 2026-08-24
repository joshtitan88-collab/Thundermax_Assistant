import json
import unittest
from dataclasses import replace
from pathlib import Path

from thundermax_assistant.models import ChangeProposal, DiagnosticCase, SafetyDecision
from thundermax_assistant.safety import evaluate

EXAMPLE = Path(__file__).resolve().parents[1] / "examples" / "decel_pop_heat_soak.json"


class SafetyGateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.case = DiagnosticCase.from_dict(json.loads(EXAMPLE.read_text(encoding="utf-8")))

    def test_safe_bounded_change_passes(self):
        proposal = ChangeProposal("decel_fueling", "richen", 2.0, 3000, 3500)
        result = evaluate(self.case, proposal, "map_demo_current")
        self.assertEqual(result.decision, SafetyDecision.PASS)

    def test_change_over_three_percent_is_absolutely_blocked(self):
        proposal = ChangeProposal("decel_fueling", "richen", 3.1, 3000, 3500)
        result = evaluate(self.case, proposal, "map_demo_current")
        self.assertEqual(result.decision, SafetyDecision.BLOCK)
        self.assertIn("CHANGE.MAGNITUDE", result.rule_ids)

    def test_engine_timing_ceiling_is_absolute(self):
        proposal = ChangeProposal("decel_fueling", "richen", 2.0, 3000, 3500, timing_advance_deg=38.1)
        result = evaluate(self.case, proposal, "map_demo_current")
        self.assertEqual(result.decision, SafetyDecision.BLOCK)
        self.assertIn("TIMING.CEILING", result.rule_ids)

    def test_missing_map_is_blocked(self):
        result = evaluate(self.case, None, None)
        self.assertEqual(result.decision, SafetyDecision.BLOCK)
        self.assertIn("TEMPORAL.NO_ACTIVE_MAP", result.rule_ids)

    def test_unchecked_exhaust_requires_review(self):
        health = replace(self.case.health, exhaust_leak_checked=False)
        result = evaluate(replace(self.case, health=health), None, "map_demo_current")
        self.assertEqual(result.decision, SafetyDecision.REVIEW_REQUIRED)
        self.assertIn("EXHAUST.NOT_CHECKED", result.rule_ids)
