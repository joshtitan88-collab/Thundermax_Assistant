"""Strict domain contracts for the assistive tuning workflow."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import UTC, datetime
from enum import Enum
from typing import Any


class ValidationError(ValueError):
    """Raised when input fails a domain contract."""


class EngineFamily(str, Enum):
    M8 = "M8"
    TWIN_CAM = "TwinCam"


class SafetyDecision(str, Enum):
    PASS = "PASS"
    REVIEW_REQUIRED = "REVIEW_REQUIRED"
    BLOCK = "BLOCK"


def parse_timestamp(value: Any, field: str) -> datetime:
    if not isinstance(value, str):
        raise ValidationError(f"{field} must be an ISO-8601 string")
    try:
        parsed = datetime.fromisoformat(value)
    except ValueError as exc:
        raise ValidationError(f"{field} must be a valid ISO-8601 timestamp") from exc
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        raise ValidationError(f"{field} must include a timezone")
    return parsed.astimezone(UTC)


def timestamp(value: datetime | None) -> str | None:
    return value.astimezone(UTC).isoformat().replace("+00:00", "Z") if value else None


def exact_object(data: Any, required: set[str], optional: set[str], name: str) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise ValidationError(f"{name} must be an object")
    missing = required - data.keys()
    unknown = data.keys() - required - optional
    if missing:
        raise ValidationError(f"{name} missing required fields: {', '.join(sorted(missing))}")
    if unknown:
        raise ValidationError(f"{name} contains unknown fields: {', '.join(sorted(unknown))}")
    return data


def nonempty(value: Any, field: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValidationError(f"{field} must be a non-empty string")
    return value.strip()


def number(value: Any, field: str, minimum: float, maximum: float) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValidationError(f"{field} must be a number")
    result = float(value)
    if not minimum <= result <= maximum:
        raise ValidationError(f"{field} must be between {minimum} and {maximum}")
    return result


@dataclass(frozen=True)
class BikeProfile:
    bike_profile_id: str
    engine_family: EngineFamily
    displacement_ci: float
    compression_ratio: float | None

    @classmethod
    def from_dict(cls, raw: Any) -> BikeProfile:
        data = exact_object(
            raw,
            {"bike_profile_id", "engine_family", "displacement_ci"},
            {"compression_ratio"},
            "bike",
        )
        try:
            engine = EngineFamily(data["engine_family"])
        except (ValueError, TypeError) as exc:
            raise ValidationError("bike.engine_family must be M8 or TwinCam") from exc
        compression = data.get("compression_ratio")
        return cls(
            nonempty(data["bike_profile_id"], "bike.bike_profile_id"),
            engine,
            number(data["displacement_ci"], "bike.displacement_ci", 50, 200),
            None if compression is None else number(compression, "bike.compression_ratio", 6, 20),
        )


@dataclass(frozen=True)
class MapVersion:
    map_version_id: str
    saved_at: datetime
    flashed_at: datetime | None

    @classmethod
    def from_dict(cls, raw: Any) -> MapVersion:
        data = exact_object(raw, {"map_version_id", "saved_at"}, {"flashed_at"}, "map_version")
        flashed = data.get("flashed_at")
        saved_at = parse_timestamp(data["saved_at"], "map_version.saved_at")
        flashed_at = None if flashed is None else parse_timestamp(flashed, "map_version.flashed_at")
        if flashed_at is not None and flashed_at < saved_at:
            raise ValidationError("map_version.flashed_at cannot be before saved_at")
        return cls(nonempty(data["map_version_id"], "map_version.map_version_id"), saved_at, flashed_at)


@dataclass(frozen=True)
class Symptom:
    original_text: str
    canonical: str
    rpm_min: int
    rpm_max: int
    after_heat_soak: bool
    observed_at: datetime
    reported_at: datetime

    @classmethod
    def from_dict(cls, raw: Any) -> Symptom:
        data = exact_object(
            raw,
            {"original_text", "canonical", "rpm_min", "rpm_max", "after_heat_soak", "observed_at", "reported_at"},
            set(),
            "symptom",
        )
        if data["canonical"] != "decel_pop":
            raise ValidationError("this vertical slice supports canonical symptom 'decel_pop' only")
        if not isinstance(data["after_heat_soak"], bool):
            raise ValidationError("symptom.after_heat_soak must be a boolean")
        rpm_min = int(number(data["rpm_min"], "symptom.rpm_min", 500, 9000))
        rpm_max = int(number(data["rpm_max"], "symptom.rpm_max", 500, 9000))
        if rpm_min > rpm_max:
            raise ValidationError("symptom.rpm_min cannot exceed rpm_max")
        observed_at = parse_timestamp(data["observed_at"], "symptom.observed_at")
        reported_at = parse_timestamp(data["reported_at"], "symptom.reported_at")
        if observed_at > reported_at:
            raise ValidationError("symptom.observed_at cannot be after reported_at")
        return cls(
            nonempty(data["original_text"], "symptom.original_text"),
            "decel_pop",
            rpm_min,
            rpm_max,
            data["after_heat_soak"],
            observed_at,
            reported_at,
        )


@dataclass(frozen=True)
class HealthEvidence:
    captured_at: datetime
    battery_resting_voltage: float | None
    battery_running_voltage: float | None
    wideband_status: str
    tps_calibrated: bool | None
    exhaust_leak_checked: bool
    sensor_faults: tuple[str, ...]

    @classmethod
    def from_dict(cls, raw: Any) -> HealthEvidence:
        data = exact_object(
            raw,
            {"captured_at", "wideband_status", "exhaust_leak_checked", "sensor_faults"},
            {"battery_resting_voltage", "battery_running_voltage", "tps_calibrated"},
            "health",
        )
        wideband = data["wideband_status"]
        if wideband not in {"healthy", "unknown", "fault"}:
            raise ValidationError("health.wideband_status must be healthy, unknown, or fault")
        leak = data["exhaust_leak_checked"]
        if not isinstance(leak, bool):
            raise ValidationError("health.exhaust_leak_checked must be a boolean")
        faults = data["sensor_faults"]
        if not isinstance(faults, list) or not all(isinstance(item, str) and item for item in faults):
            raise ValidationError("health.sensor_faults must be a list of non-empty strings")
        tps = data.get("tps_calibrated")
        if tps is not None and not isinstance(tps, bool):
            raise ValidationError("health.tps_calibrated must be a boolean or null")
        resting = data.get("battery_resting_voltage")
        running = data.get("battery_running_voltage")
        return cls(
            parse_timestamp(data["captured_at"], "health.captured_at"),
            None if resting is None else number(resting, "health.battery_resting_voltage", 0, 20),
            None if running is None else number(running, "health.battery_running_voltage", 0, 20),
            wideband,
            tps,
            leak,
            tuple(faults),
        )


@dataclass(frozen=True)
class DiagnosticCase:
    case_id: str
    bike: BikeProfile
    map_versions: tuple[MapVersion, ...]
    symptom: Symptom
    health: HealthEvidence

    @classmethod
    def from_dict(cls, raw: Any) -> DiagnosticCase:
        data = exact_object(raw, {"case_id", "bike", "map_versions", "symptom", "health"}, set(), "case")
        maps = data["map_versions"]
        if not isinstance(maps, list) or not maps:
            raise ValidationError("case.map_versions must be a non-empty list")
        parsed_maps = tuple(MapVersion.from_dict(item) for item in maps)
        ids = [item.map_version_id for item in parsed_maps]
        if len(ids) != len(set(ids)):
            raise ValidationError("case.map_versions contains duplicate IDs")
        return cls(
            nonempty(data["case_id"], "case.case_id"),
            BikeProfile.from_dict(data["bike"]),
            parsed_maps,
            Symptom.from_dict(data["symptom"]),
            HealthEvidence.from_dict(data["health"]),
        )


@dataclass(frozen=True)
class ChangeProposal:
    table: str
    direction: str
    magnitude_percent: float
    rpm_min: int
    rpm_max: int
    target_afr: float | None = None
    timing_advance_deg: float | None = None
    rpm_limit: int | None = None


@dataclass(frozen=True)
class SafetyResult:
    decision: SafetyDecision
    rule_ids: tuple[str, ...]
    messages: tuple[str, ...]


@dataclass(frozen=True)
class Recommendation:
    schema_version: str
    case_id: str
    bike_profile_id: str
    linked_map_version_id: str | None
    temporal_confidence: float
    hypotheses: tuple[dict[str, Any], ...]
    required_checks: tuple[str, ...]
    proposal: ChangeProposal | None
    safety: SafetyResult
    confidence: float
    verification_steps: tuple[str, ...]
    rollback_trigger: str | None

    def to_dict(self) -> dict[str, Any]:
        value = asdict(self)
        value["safety"]["decision"] = self.safety.decision.value
        return value
