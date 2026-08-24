"""End-to-end diagnostic service."""

from __future__ import annotations

from .audit import AuditStore
from .diagnosis import bounded_proposal, rank_hypotheses
from .models import DiagnosticCase, Recommendation, SafetyDecision
from .safety import evaluate
from .temporal import link_active_map


def diagnose(case: DiagnosticCase, audit_store: AuditStore) -> Recommendation:
    temporal = link_active_map(case)
    hypotheses = rank_hypotheses(case)
    preliminary = evaluate(case, None, temporal.map_version.map_version_id if temporal.map_version else None)
    proposal = bounded_proposal(case, preliminary.decision is SafetyDecision.PASS)
    safety = evaluate(case, proposal, temporal.map_version.map_version_id if temporal.map_version else None)
    required_checks = tuple(safety.messages) if safety.decision is not SafetyDecision.PASS else ()
    recommendation = Recommendation(
        schema_version="1.0",
        case_id=case.case_id,
        bike_profile_id=case.bike.bike_profile_id,
        linked_map_version_id=temporal.map_version.map_version_id if temporal.map_version else None,
        temporal_confidence=temporal.confidence,
        hypotheses=hypotheses,
        required_checks=required_checks,
        proposal=proposal if safety.decision is SafetyDecision.PASS else None,
        safety=safety,
        confidence=0.76 if safety.decision is SafetyDecision.PASS else 0.35,
        verification_steps=(
            "Save an untouched copy of the current map",
            "Repeat the same fully warmed deceleration window with logging",
            "Stop and roll back if drivability worsens or sensor data becomes abnormal",
        ) if safety.decision is SafetyDecision.PASS else ("Complete every required check and resubmit the case",),
        rollback_trigger="Any worsening pop, abnormal AFR indication, fault code, or drivability regression"
        if safety.decision is SafetyDecision.PASS else None,
    )
    audit_store.append("recommendation_created", case.case_id, recommendation.to_dict())
    return recommendation
