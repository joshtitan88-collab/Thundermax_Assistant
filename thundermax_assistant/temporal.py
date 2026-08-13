"""Deterministically associate delayed feedback with the map actually flashed."""

from __future__ import annotations

from dataclasses import dataclass

from .models import DiagnosticCase, MapVersion


@dataclass(frozen=True)
class TemporalLink:
    map_version: MapVersion | None
    confidence: float
    reason: str


def link_active_map(case: DiagnosticCase) -> TemporalLink:
    eligible = [
        version
        for version in case.map_versions
        if version.flashed_at is not None and version.flashed_at <= case.symptom.observed_at
    ]
    if not eligible:
        return TemporalLink(None, 0.0, "No map has a flashed_at timestamp at or before symptom observation")
    eligible.sort(key=lambda item: item.flashed_at, reverse=True)
    selected = eligible[0]
    if len(eligible) == 1:
        confidence = 0.90
    else:
        latest = selected.flashed_at
        previous = eligible[1].flashed_at
        confidence = 0.98 if latest and previous and (latest - previous).total_seconds() >= 86400 else 0.80
    return TemporalLink(selected, confidence, "Latest flashed map at or before symptom observation")
