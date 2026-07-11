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
MODEL = "qwen2.5:7b-instruct"
DOCS_DIR = Path("/mnt/nas/ADMIN/brain_vault")
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
Ground answers in the provided reference excerpts when given. Be specific
about table cells (TPS/RPM ranges) and say when a dyno or validation ride is
required. Never guess numbers you cannot support.
"""


def find_docs():
    docs = []
    for pat in DOC_GLOB:
        docs.extend(DOCS_DIR.glob(pat))
    return sorted(set(docs))


def relevant_context(question, budget=MAX_CONTEXT_CHARS):
    """Score docs by keyword overlap with the question, pack best first."""
    words = {w for w in re.findall(r"[a-z]{3,}", question.lower())}
    scored = []
    for doc in find_docs():
        try:
            text = doc.read_text(errors="replace")
        except OSError:
            continue
        body = text.lower()
        score = sum(body.count(w) for w in words)
        if score:
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
    ollama_chat(build_messages(args.question), model=args.model)


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
        print("assistant> ", end="", flush=True)
        answer = ollama_chat(messages, model=args.model)
        messages.append({"role": "assistant", "content": answer})


def cmd_analyze(args):
    tbw = tmx.TbwFile(args.file)
    buf = io.StringIO()
    buf.write(f"Tune file: {tbw.path.name}\n")
    for line in tbw.integrity_lines():
        buf.write(line + "\n")
    if args.baseline:
        base = tmx.TbwFile(args.baseline)
        tmx.compare(base, tbw, out=buf)
    facts = buf.getvalue()
    print(facts)
    print("\n--- assistant read ---\n")
    question = (
        "Explain what this tune analysis means for the rider and what to "
        "validate on the next ride."
        if not args.baseline
        else "Explain what changed between the baseline and the new tune, "
        "what the rider should feel, and what to validate on the next ride."
    )
    ollama_chat(build_messages(question, extra_context=facts), model=args.model)


def main(argv=None):
    p = argparse.ArgumentParser(description="ThunderMax tuning assistant (Ollama-backed)")
    p.add_argument("--model", default=MODEL)
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
