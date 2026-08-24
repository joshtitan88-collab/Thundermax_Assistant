# Debug Report — Level 1 Vertical Slice

- **Symptom:** The canonical ThunderMax Assistant repository contained only a license; the assistant could not accept a case, enforce safety, produce a recommendation, or retain an audit record.
- **Root cause:** The related repositories stopped at architecture prose, permissive schemas, and isolated binary-analysis experiments. There was no executable application boundary connecting validated data, temporal map selection, diagnosis, safety, and audit.
- **Fix:** Implemented a dependency-free Python application for the first decel-pop/heat-soak scenario with strict domain contracts, observation-time map linking, electrical-first diagnosis, a deterministic fail-closed Safety Gate, a hash-chained immutable SQLite audit store, JSON CLI, example case, and CI.
- **Evidence:** The full regression suite, compilation, end-to-end CLI scenario, workflow linting, and patch checks pass locally. GitHub CI results are recorded on the pull request.
- **Regression tests:** `tests/test_models.py`, `tests/test_safety.py`, `tests/test_service.py`, and `tests/test_cli.py`.
- **Related:** `.tbw` parsing remains outside the trust boundary. No code writes or flashes tune files. Only `decel_pop` is accepted in version 0.1.
- **Status:** DONE_WITH_CONCERNS — the vertical slice is complete and verified; broader symptom coverage and real-world calibration remain future work.
