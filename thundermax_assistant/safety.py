"""Fail-closed deterministic safety rules. The model cannot override these rules."""

from __future__ import annotations

from datetime import timedelta

from .models import (
    ChangeProposal,
    DiagnosticCase,
    EngineFamily,
    SafetyDecision,
    SafetyResult,
)

TIMING_CEILINGS = {EngineFamily.M8: 38.0, EngineFamily.TWIN_CAM: 42.0}
MAX_DECEL_FUEL_CHANGE_PERCENT = 3.0
MAX_HEALTH_AGE = timedelta(days=30)


def evaluate(case: DiagnosticCase, proposal: ChangeProposal | None, linked_map_id: str | None) -> SafetyResult:
    blocks: list[tuple[str, str]] = []
    reviews: list[tuple[str, str]] = []

    if linked_map_id is None:
        blocks.append(("TEMPORAL.NO_ACTIVE_MAP", "No verified active map can be linked to the symptom"))
    if proposal is not None:
        if proposal.table != "decel_fueling" or proposal.direction != "richen":
            blocks.append(("CHANGE.UNSUPPORTED", "Only bounded decel-fueling richening is supported in this slice"))
        if not 0 < proposal.magnitude_percent <= MAX_DECEL_FUEL_CHANGE_PERCENT:
            blocks.append(("CHANGE.MAGNITUDE", "Decel-fueling change exceeds the 3% absolute limit"))
        if proposal.rpm_min < case.symptom.rpm_min - 500 or proposal.rpm_max > case.symptom.rpm_max + 500:
            blocks.append(("CHANGE.REGION", "Proposed RPM region is broader than the reported symptom region"))
        if proposal.target_afr is not None and not 13.2 <= proposal.target_afr <= 14.5:
            blocks.append(("AFR.OUT_OF_BOUNDS", "Target AFR is outside the validated light-load band"))
        ceiling = TIMING_CEILINGS[case.bike.engine_family]
        if proposal.timing_advance_deg is not None and proposal.timing_advance_deg > ceiling:
            blocks.append(("TIMING.CEILING", f"Timing exceeds the {ceiling:g}° engine-family ceiling"))
        if proposal.rpm_limit is not None:
            blocks.append(("RPM.UNSUPPORTED", "RPM-limit changes are not supported by this vertical slice"))

    age = case.symptom.reported_at - case.health.captured_at
    if age < timedelta(0) or age > MAX_HEALTH_AGE:
        reviews.append(("HEALTH.STALE", "Health evidence is missing, future-dated, or older than 30 days"))
    if case.health.battery_resting_voltage is None or case.health.battery_running_voltage is None:
        reviews.append(("ELECTRICAL.INCOMPLETE", "Resting and running battery voltage are required"))
    elif case.health.battery_resting_voltage < 12.4 or not 13.5 <= case.health.battery_running_voltage <= 14.8:
        reviews.append(("ELECTRICAL.VOLTAGE", "Battery or charging voltage requires inspection before tuning"))
    if case.health.wideband_status != "healthy" or case.health.sensor_faults:
        reviews.append(("SENSORS.UNHEALTHY", "Resolve sensor faults and verify wideband health before tuning"))
    if not case.health.exhaust_leak_checked:
        reviews.append(("EXHAUST.NOT_CHECKED", "Check for exhaust leaks before changing decel fueling"))
    if case.health.tps_calibrated is not True:
        reviews.append(("TPS.NOT_VERIFIED", "Verify TPS calibration before a map recommendation"))

    if blocks:
        decision = SafetyDecision.BLOCK
        findings = blocks + reviews
    elif reviews:
        decision = SafetyDecision.REVIEW_REQUIRED
        findings = reviews
    else:
        decision = SafetyDecision.PASS
        findings = [("SAFETY.PASS", "All deterministic safety checks passed")]
    return SafetyResult(decision, tuple(item[0] for item in findings), tuple(item[1] for item in findings))
