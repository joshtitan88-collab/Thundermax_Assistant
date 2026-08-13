"""Command-line entry point for local, read-only operation."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .audit import AuditStore
from .models import DiagnosticCase, ValidationError
from .service import diagnose


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Safety-gated ThunderMax diagnostic assistant")
    parser.add_argument("case", type=Path, help="Path to a diagnostic case JSON file")
    parser.add_argument("--audit-db", type=Path, default=Path("thundermax_audit.sqlite3"))
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        raw = json.loads(args.case.read_text(encoding="utf-8"))
        case = DiagnosticCase.from_dict(raw)
        recommendation = diagnose(case, AuditStore(args.audit_db))
    except (OSError, json.JSONDecodeError, ValidationError) as exc:
        print(json.dumps({"error": str(exc), "status": "INVALID_INPUT"}), file=sys.stderr)
        return 2
    print(json.dumps(recommendation.to_dict(), indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
