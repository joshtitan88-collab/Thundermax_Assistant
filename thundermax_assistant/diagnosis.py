"""Evidence-backed diagnosis for the first supported vertical slice."""

from __future__ import annotations

from .models import ChangeProposal, DiagnosticCase


def rank_hypotheses(case: DiagnosticCase) -> tuple[dict[str, object], ...]:
    hypotheses: list[dict[str, object]] = []
    if not case.health.exhaust_leak_checked:
        hypotheses.append({
            "id": "exhaust_leak",
            "score": 0.82,
            "supports": ["decel pop can be caused by oxygen entering the exhaust"],
            "contradicts": ["exhaust system has not yet been inspected"],
        })
    if case.health.wideband_status != "healthy" or case.health.sensor_faults:
        hypotheses.append({
            "id": "sensor_or_wideband_fault",
            "score": 0.90,
            "supports": ["health evidence reports unknown/faulted sensing"],
            "contradicts": [],
        })
    hypotheses.append({
        "id": "lean_decel_region",
        "score": 0.72 if case.symptom.after_heat_soak else 0.60,
        "supports": [
            f"symptom is localized to {case.symptom.rpm_min}-{case.symptom.rpm_max} RPM",
            "heat-soak modifier is present" if case.symptom.after_heat_soak else "decel-pop symptom is present",
        ],
        "contradicts": ["requires repeatable log evidence before broader changes"],
    })
    return tuple(sorted(hypotheses, key=lambda item: float(item["score"]), reverse=True))


def bounded_proposal(case: DiagnosticCase, preliminary_clear: bool) -> ChangeProposal | None:
    if not preliminary_clear:
        return None
    return ChangeProposal(
        table="decel_fueling",
        direction="richen",
        magnitude_percent=2.0,
        rpm_min=case.symptom.rpm_min,
        rpm_max=case.symptom.rpm_max,
    )
