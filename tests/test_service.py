import json
import sqlite3
import tempfile
import unittest
from dataclasses import replace
from datetime import timedelta
from pathlib import Path

from thundermax_assistant.audit import AuditStore
from thundermax_assistant.models import DiagnosticCase, SafetyDecision
from thundermax_assistant.service import diagnose

EXAMPLE = Path(__file__).resolve().parents[1] / "examples" / "decel_pop_heat_soak.json"


class DiagnosticServiceTests(unittest.TestCase):
    def setUp(self):
        self.case = DiagnosticCase.from_dict(json.loads(EXAMPLE.read_text(encoding="utf-8")))
        self.tempdir = tempfile.TemporaryDirectory()
        self.db_path = Path(self.tempdir.name) / "audit.sqlite3"
        self.store = AuditStore(self.db_path)

    def tearDown(self):
        self.tempdir.cleanup()

    def test_end_to_end_safe_case(self):
        result = diagnose(self.case, self.store)
        self.assertEqual(result.linked_map_version_id, "map_demo_current")
        self.assertEqual(result.safety.decision, SafetyDecision.PASS)
        self.assertEqual(result.proposal.magnitude_percent, 2.0)
        self.assertEqual(len(self.store.events()), 1)
        self.assertTrue(self.store.verify_chain())

    def test_future_map_is_not_linked(self):
        future = replace(
            self.case.map_versions[-1],
            map_version_id="map_future",
            flashed_at=self.case.symptom.reported_at + timedelta(hours=1),
        )
        case = replace(self.case, map_versions=self.case.map_versions + (future,))
        result = diagnose(case, self.store)
        self.assertEqual(result.linked_map_version_id, "map_demo_current")

    def test_map_flashed_after_ride_but_before_report_is_not_linked(self):
        later = replace(
            self.case.map_versions[-1],
            map_version_id="map_after_ride",
            flashed_at=self.case.symptom.observed_at + timedelta(hours=1),
        )
        case = replace(self.case, map_versions=self.case.map_versions + (later,))
        result = diagnose(case, self.store)
        self.assertEqual(result.linked_map_version_id, "map_demo_current")

    def test_stale_health_suppresses_map_change(self):
        stale_health = replace(self.case.health, captured_at=self.case.symptom.reported_at - timedelta(days=31))
        result = diagnose(replace(self.case, health=stale_health), self.store)
        self.assertEqual(result.safety.decision, SafetyDecision.REVIEW_REQUIRED)
        self.assertIsNone(result.proposal)
        self.assertIn("HEALTH.STALE", result.safety.rule_ids)

    def test_no_eligible_map_blocks_recommendation(self):
        future_maps = tuple(
            replace(item, flashed_at=self.case.symptom.reported_at + timedelta(hours=index + 1))
            for index, item in enumerate(self.case.map_versions)
        )
        result = diagnose(replace(self.case, map_versions=future_maps), self.store)
        self.assertEqual(result.safety.decision, SafetyDecision.BLOCK)
        self.assertIsNone(result.proposal)

    def test_audit_rows_cannot_be_updated_or_deleted(self):
        diagnose(self.case, self.store)
        with sqlite3.connect(self.db_path) as connection:
            with self.assertRaisesRegex(sqlite3.IntegrityError, "immutable"):
                connection.execute("UPDATE audit_events SET case_id = 'changed'")
            with self.assertRaisesRegex(sqlite3.IntegrityError, "immutable"):
                connection.execute("DELETE FROM audit_events")
