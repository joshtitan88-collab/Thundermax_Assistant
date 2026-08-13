# ThunderMax Assistant

Local-first, read-only diagnostic co-pilot for evidence-backed motorcycle tuning decisions.

This repository contains the first executable vertical slice: delayed feedback about **decel pop after heat soak around 3,200 RPM**. It links the report to the map that was active when the symptom was observed, checks electrical/sensor/exhaust evidence before suggesting a tuning change, passes every proposal through deterministic safety rules, and records the result in an immutable hash-chained SQLite audit log.

## Safety boundary

- The application does not read, modify, write, or flash `.tbw` files.
- The language-model layer is intentionally absent from safety enforcement.
- Unsupported symptoms and unknown fields fail validation.
- Missing active-map evidence is blocked.
- Missing or stale health evidence suppresses map changes and requires review.
- Absolute limits cannot be overridden through the application.
- Output is assistive information, not a substitute for a qualified tuner or safe dyno/logging practices.

## Run locally

Python 3.11 or newer is required. There are no runtime dependencies.

```bash
python3 -m thundermax_assistant.cli \
  examples/decel_pop_heat_soak.json \
  --audit-db thundermax_audit.sqlite3
```

The command emits a versioned JSON recommendation containing:

- the temporally linked map version;
- ranked hypotheses and evidence summaries;
- required checks;
- a tightly bounded proposal only when all checks pass;
- deterministic Safety Gate rule IDs;
- verification and rollback criteria.

## Test

```bash
python3 -m compileall -q thundermax_assistant tests
python3 -m unittest discover -s tests -v
```

CI runs the suite on Python 3.11, 3.12, and 3.13 and executes the example end to end.

## Architecture

```text
Strict case JSON
      |
Temporal map linker
      |
Electrical-first diagnosis
      |
Bounded structured proposal
      |
Deterministic Safety Gate
      |
Append-only audit store
      |
Versioned recommendation JSON
```

The diagnostic and Safety Gate layers are separate by design. A future conversational model may help normalize language and rank hypotheses, but it cannot authorize its own proposal or bypass safety rules.

## Current scope

Version 0.1 supports one deliberately narrow case. It is a trustworthy foundation, not a finished tuning product. Next milestones are a larger scenario corpus, schema migrations, additional read-only data adapters, source-backed retrieval, and a local review interface.
