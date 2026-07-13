#!/usr/bin/env python3
"""ThunderMax tuning assistant — local LLM Q&A over the shop's tuning docs.

Answers tuning questions using the brain_vault ThunderMax documentation as
grounding context, via a local Ollama server. Can also analyze a .tbw tune
(or a pair of tunes) with thundermax_parser and explain the changes.

Usage:
  tune_assistant.py ask "why do I get decel pops above 4k?"
  tune_assistant.py chat
  tune_assistant.py analyze new.tbw --baseline old.tbw

Requires: ollama serve running on 127.0.0.1:11434 (stdlib only, no pip deps).
"""

import argparse
import io
import json
import re
import sys
import urllib.request
from pathlib import Path

import thundermax_parser as tmx

OLLAMA_URL = "http://127.0.0.1:11434"
# Two-tier local models (see joshua's tower setup):
#   FAST — qwen2.5-coder:14b: fits entirely on the RTX 5060 Ti, ~46 tok/s.
#   BIG  — hermes3:70b: smarter reasoning, but ~0.7 tok/s (mostly CPU).
# By default the assistant auto-routes per question (classify() below);
# --fast / --deep / --model override.
FAST_MODEL = "qwen2.5-coder:14b"
BIG_MODEL = "hermes3:70b"
MODEL = FAST_MODEL  # default model when one is passed explicitly
LOCAL_CORPUS = Path(__file__).resolve().parent.parent / "docs" / "corpus"
NAS_CORPUS = Path("/mnt/nas/ADMIN/brain_vault")
DOCS_DIR = LOCAL_CORPUS if any(LOCAL_CORPUS.glob("*.md")) else NAS_CORPUS
DOC_GLOB = ["*thundermax*", "*thunder_max*"]
MAX_CONTEXT_CHARS = 24000

SYSTEM_PROMPT = """\
You are the Throttle Logic ThunderMax tuning assistant for a 2023
Harley-Davidson Low Rider ST with a 131ci build running a ThunderMax TBW
(throttle-by-wire) ECM. You help with AFR targets, VE/fuel-flow tables,
ignition timing, AutoTune gating/zone locking, decel pop fixes, and
validation-ride protocol.

House rules learned from this shop's tuning history:
- AutoTune learning gates: enable above 200F, disable above 280F; cold-start
  and heat-soak trims are garbage and must be blocked.
- Decel pop protocol: closed-throttle decels 4000->2000 rpm in 3rd/4th.
  Pops above 4k -> add +2% VE @ 0-2% TPS, 3840-4608 rpm. Broad-range pops ->
  subtract 1 deg spark @ 0-2% TPS, 2048-2816 rpm.
- Always log TPS, RPM, AFR target vs actual, CHT, trims.
- Heat management: progressive timing retard past 226F to prevent ping
  during heat soak.
- Ping at WOT (belly = midrange TPS): if ping disappears at WOT, lower the
  belly only; if it persists, lower both; if it gets worse, lower WOT more.
- Idle/tip-in smoothness: equalize spark 768-1280 rpm; keep low-TPS
  gradients smooth.
- Alternate decel-pop fix from the Oct 2025 sessions: disable decel fuel
  cut and add +4-6% fuel at 0-2% TPS in the 1792-3328 rpm band.

Tune-diff analyses label each changed region with a named table band and a
confidence tier (from the project's reverse-engineered table map):
- Categories: TIMING (ignition), AFR (targets), AFR_VE / FUEL (fuel & VE
  pages), AUTOTUNE (learned trims - churns on every ride, usually not a
  deliberate edit), METADATA/SHARED (checksums - ignore), UNMAPPED.
- Confidence: high = trust the label; medium = right category, cell-level
  detail unproven; low = located only. Timing scale is ~49 raw units per
  degree (medium confidence). Raw cell values are NOT yet in engineering
  units - never quote AFR/degree numbers from raw deltas; describe the
  direction and location of changes instead.

Ground answers in the provided reference excerpts when given. Be specific
about table cells (TPS/RPM ranges) and say when a dyno or validation ride is
required. Never guess numbers you cannot support.
"""


def find_docs():
    docs = []
    for pat in DOC_GLOB:
        docs.extend(DOCS_DIR.glob(pat))
    return sorted(set(docs))


STOPWORDS = frozenset("""
the and for was are with that this what when where how why our your you did
does not can could should would will about say said from have has had get
its than then them they there their
""".split())


def relevant_context(question, budget=MAX_CONTEXT_CHARS):
    """Score docs by keyword overlap with the question, pack best first."""
    words = {w for w in re.findall(r"[a-z]{3,}", question.lower())
             if w not in STOPWORDS}
    scored = []
    for doc in find_docs():
        try:
            text = doc.read_text(errors="replace")
        except OSError:
            continue
        body = text.lower()
        # singular fallback so "soaks" still hits a doc that says "soak"
        hits = sum(max(body.count(w), body.count(w[:-1]) if w.endswith("s") else 0)
                   for w in words)
        # length-normalized: a short doc dense in the question's terms beats
        # a 100-page manual that merely mentions them often
        score = hits / (len(body) / 4000 + 1)
        if hits:
            scored.append((score, doc.name, text))
    scored.sort(reverse=True)
    parts, used = [], 0
    for _, name, text in scored:
        chunk = text[: min(len(text), 6000)]
        if used + len(chunk) > budget:
            break
        parts.append(f"--- {name} ---\n{chunk}")
        used += len(chunk)
    return "\n\n".join(parts)


def ollama_chat(messages, model=MODEL, stream=True):
    req = urllib.request.Request(
        f"{OLLAMA_URL}/api/chat",
        data=json.dumps({"model": model, "messages": messages, "stream": stream}).encode(),
        headers={"Content-Type": "application/json"},
    )
    reply = []
    with urllib.request.urlopen(req) as resp:
        for line in resp:
            part = json.loads(line)
            token = part.get("message", {}).get("content", "")
            if token:
                reply.append(token)
                if stream:
                    sys.stdout.write(token)
                    sys.stdout.flush()
            if part.get("done"):
                break
    if stream:
        sys.stdout.write("\n")
    return "".join(reply)


def classify(question):
    """Route a question: EASY grounded lookups -> FAST_MODEL,
    HARD open-ended tuning strategy / deep reasoning -> BIG_MODEL.
    Falls back to FAST_MODEL if the classifier is unavailable."""
    sysmsg = (
        "You are a routing classifier for a motorcycle tuning assistant. "
        "Reply with EXACTLY one word: EASY or HARD. "
        "HARD = open-ended tuning strategy, multi-step diagnosis, or deep "
        "reasoning beyond a direct lookup. EASY = quick factual lookups, "
        "definitions, or straightforward questions answerable from docs."
    )
    body = {
        "model": FAST_MODEL,
        "system": sysmsg,
        "prompt": "Classify this request:\n\n" + question,
        "stream": False,
        "options": {"num_predict": 3, "temperature": 0},
    }
    try:
        req = urllib.request.Request(
            f"{OLLAMA_URL}/api/generate",
            data=json.dumps(body).encode(),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            out = json.loads(resp.read()).get("response", "").upper()
        return BIG_MODEL if "HARD" in out else FAST_MODEL
    except Exception:
        return FAST_MODEL


def resolve_model(args, question, prefer_big=False):
    """Decide which model to use: explicit flags win, else auto-route."""
    if getattr(args, "deep", False):
        return BIG_MODEL
    if getattr(args, "fast", False):
        return FAST_MODEL
    if getattr(args, "model", None):
        return args.model
    if prefer_big:
        return BIG_MODEL
    return classify(question)


def announce(model):
    """Tell the user which model answered, and warn when it's the slow one."""
    if model == BIG_MODEL:
        sys.stderr.write(
            "\033[35m🧠 Hermes 70B\033[0m (deep-think — slow on this box, be "
            "patient; use --fast to force the quick model)\n")
    else:
        sys.stderr.write(f"\033[36m⚡ {model}\033[0m (fast, on GPU)\n")
    sys.stderr.flush()


def build_messages(question, extra_context=""):
    context = relevant_context(question)
    user = question
    blocks = [b for b in (extra_context, context) if b]
    if blocks:
        user = (
            "Reference material:\n\n" + "\n\n".join(blocks) +
            f"\n\nQuestion: {question}"
        )
    return [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user},
    ]


def cmd_ask(args):
    model = resolve_model(args, args.question)
    announce(model)
    ollama_chat(build_messages(args.question), model=model)


def cmd_chat(args):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    print("ThunderMax tuning assistant. Ctrl-D or 'quit' to exit.")
    first = True
    while True:
        try:
            q = input("\nyou> ").strip()
        except EOFError:
            break
        if not q or q.lower() in ("quit", "exit"):
            break
        content = q
        if first:
            ctx = relevant_context(q)
            if ctx:
                content = f"Reference material:\n\n{ctx}\n\nQuestion: {q}"
            first = False
        messages.append({"role": "user", "content": content})
        model = resolve_model(args, q)
        announce(model)
        print("assistant> ", end="", flush=True)
        answer = ollama_chat(messages, model=model)
        messages.append({"role": "assistant", "content": answer})


def _diff_facts(baseline, new):
    """Compact, classified fact block for the LLM: categories, not raw hex."""
    import table_map
    rows = table_map.classify_diff(baseline, new)
    lines = [f"Baseline: {Path(baseline).name}", f"New tune: {Path(new).name}"]
    if not rows:
        lines.append("The two tunes are byte-identical.")
        return "\n".join(lines)
    interesting = [r for r in rows
                   if r["category"] not in ("METADATA", "SHARED")]
    lines.append("\nChanged table bands (from the reverse-engineered map):")
    for cat, v in sorted(table_map.summarize(interesting).items(),
                         key=lambda kv: -kv[1]["bytes"]):
        conf = ",".join(sorted(c for c in v["confidences"] if c != "-"))
        lines.append(f"- {cat}: {v['bytes']} changed bytes in "
                     f"{v['regions']} regions (confidence: {conf or 'unmapped'})")
    named = {}
    for r in interesting:
        if r["band"]:
            # first sentence only: the rest describes how the band was
            # discovered, which the LLM tends to misread as part of THIS diff
            short = r["desc"].split(". ")[0]
            named.setdefault(r["band"], [0, short, r["confidence"]])[0] += r["changed_bytes"]
    lines.append("\nBands touched:")
    for band, (n, desc, conf) in sorted(named.items(), key=lambda kv: -kv[1][0]):
        lines.append(f"- {band} ({conf}, {n} bytes): {desc}")
    skipped = sum(r["changed_bytes"] for r in rows) - sum(
        r["changed_bytes"] for r in interesting)
    if skipped:
        lines.append(f"\n({skipped} changed bytes of checksum/metadata churn "
                     "omitted - not tuning content.)")
    return "\n".join(lines)


def cmd_analyze(args):
    tbw = tmx.TbwFile(args.file)
    buf = io.StringIO()
    buf.write(f"Tune file: {tbw.path.name}\n")
    for line in tbw.integrity_lines():
        buf.write(line + "\n")
    if args.baseline:
        buf.write("\n" + _diff_facts(args.baseline, args.file) + "\n")
    facts = buf.getvalue()
    print(facts)
    print("\n--- assistant read ---\n")
    question = (
        "Explain what this tune analysis means for the rider and what to "
        "validate on the next ride."
        if not args.baseline
        else "Describe ONLY what the tune-diff facts above show was changed - "
        "do not invent features or modes that are not listed. Explain what "
        "the rider should feel from those specific changes and what to "
        "validate on the next ride per the house protocol."
    )
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content":
            f"Tune-diff facts (authoritative - describe only these):\n\n"
            f"{facts}\n\n{question}"},
    ]
    # Tune-diff interpretation is high-stakes and infrequent -> default to the
    # 70B deep-thinker unless the user overrides with --fast/--model.
    model = resolve_model(args, question, prefer_big=True)
    announce(model)
    ollama_chat(messages, model=model)


def main(argv=None):
    p = argparse.ArgumentParser(description="ThunderMax tuning assistant (Ollama-backed)")
    p.add_argument("--model", default=None,
                   help="force a specific Ollama model (overrides auto-routing)")
    p.add_argument("--fast", action="store_true",
                   help=f"force the fast GPU model ({FAST_MODEL})")
    p.add_argument("--deep", action="store_true",
                   help=f"force the 70B deep-think model ({BIG_MODEL})")
    sub = p.add_subparsers(dest="cmd", required=True)

    pa = sub.add_parser("ask", help="one-shot question")
    pa.add_argument("question")
    pa.set_defaults(func=cmd_ask)

    pc = sub.add_parser("chat", help="interactive session")
    pc.set_defaults(func=cmd_chat)

    pz = sub.add_parser("analyze", help="analyze a .tbw (optionally vs a baseline)")
    pz.add_argument("file")
    pz.add_argument("--baseline")
    pz.set_defaults(func=cmd_analyze)

    args = p.parse_args(argv)
    args.func(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
