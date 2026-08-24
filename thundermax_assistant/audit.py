"""Append-only, hash-chained local audit storage."""

from __future__ import annotations

import hashlib
import json
import sqlite3
from datetime import UTC, datetime
from pathlib import Path
from typing import Any
from uuid import uuid4


class AuditStore:
    def __init__(self, path: str | Path):
        self.path = str(path)
        self._initialize()

    def _connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.path)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        return connection

    def _initialize(self) -> None:
        with self._connect() as connection:
            connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS audit_events (
                    sequence INTEGER PRIMARY KEY AUTOINCREMENT,
                    event_id TEXT NOT NULL UNIQUE,
                    occurred_at TEXT NOT NULL,
                    event_type TEXT NOT NULL,
                    case_id TEXT NOT NULL,
                    payload_json TEXT NOT NULL,
                    previous_hash TEXT,
                    event_hash TEXT NOT NULL UNIQUE
                );
                CREATE TRIGGER IF NOT EXISTS audit_events_no_update
                BEFORE UPDATE ON audit_events BEGIN SELECT RAISE(ABORT, 'audit events are immutable'); END;
                CREATE TRIGGER IF NOT EXISTS audit_events_no_delete
                BEFORE DELETE ON audit_events BEGIN SELECT RAISE(ABORT, 'audit events are immutable'); END;
                """
            )

    def append(self, event_type: str, case_id: str, payload: dict[str, Any]) -> str:
        event_id = str(uuid4())
        occurred_at = datetime.now(UTC).isoformat().replace("+00:00", "Z")
        payload_json = json.dumps(payload, sort_keys=True, separators=(",", ":"))
        with self._connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            row = connection.execute(
                "SELECT event_hash FROM audit_events ORDER BY sequence DESC LIMIT 1"
            ).fetchone()
            previous_hash = row["event_hash"] if row else None
            canonical = "|".join((event_id, occurred_at, event_type, case_id, payload_json, previous_hash or ""))
            event_hash = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
            connection.execute(
                """INSERT INTO audit_events
                (event_id, occurred_at, event_type, case_id, payload_json, previous_hash, event_hash)
                VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (event_id, occurred_at, event_type, case_id, payload_json, previous_hash, event_hash),
            )
        return event_id

    def events(self) -> list[dict[str, Any]]:
        with self._connect() as connection:
            rows = connection.execute("SELECT * FROM audit_events ORDER BY sequence").fetchall()
        return [dict(row) for row in rows]

    def verify_chain(self) -> bool:
        previous_hash: str | None = None
        for event in self.events():
            canonical = "|".join(
                (
                    event["event_id"], event["occurred_at"], event["event_type"], event["case_id"],
                    event["payload_json"], previous_hash or "",
                )
            )
            expected = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
            if event["previous_hash"] != previous_hash or event["event_hash"] != expected:
                return False
            previous_hash = event["event_hash"]
        return True
