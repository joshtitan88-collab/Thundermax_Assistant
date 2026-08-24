import copy
import json
import unittest
from pathlib import Path

from thundermax_assistant.models import DiagnosticCase, ValidationError

EXAMPLE = Path(__file__).resolve().parents[1] / "examples" / "decel_pop_heat_soak.json"


class ModelContractTests(unittest.TestCase):
    def case_data(self):
        return json.loads(EXAMPLE.read_text(encoding="utf-8"))

    def test_example_is_valid(self):
        case = DiagnosticCase.from_dict(self.case_data())
        self.assertEqual(case.bike.bike_profile_id, "bp_131_self_01")

    def test_unknown_fields_are_rejected(self):
        data = self.case_data()
        data["autonomous_flash"] = True
        with self.assertRaisesRegex(ValidationError, "unknown fields"):
            DiagnosticCase.from_dict(data)

    def test_naive_timestamps_are_rejected(self):
        data = self.case_data()
        data["symptom"]["reported_at"] = "2026-08-12T18:00:00"
        with self.assertRaisesRegex(ValidationError, "timezone"):
            DiagnosticCase.from_dict(data)

    def test_observation_cannot_follow_report(self):
        data = self.case_data()
        data["symptom"]["observed_at"] = "2026-08-13T18:00:00Z"
        with self.assertRaisesRegex(ValidationError, "cannot be after"):
            DiagnosticCase.from_dict(data)

    def test_duplicate_map_ids_are_rejected(self):
        data = self.case_data()
        data["map_versions"].append(copy.deepcopy(data["map_versions"][0]))
        with self.assertRaisesRegex(ValidationError, "duplicate IDs"):
            DiagnosticCase.from_dict(data)

    def test_unsupported_symptom_is_rejected(self):
        data = self.case_data()
        data["symptom"]["canonical"] = "knock"
        with self.assertRaisesRegex(ValidationError, "decel_pop"):
            DiagnosticCase.from_dict(data)
