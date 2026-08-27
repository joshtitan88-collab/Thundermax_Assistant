"""Tests for advisor -- symptom to corrective change.

The advisor is the only module that PROPOSES changes to a running engine, so
the tests are weighted toward what it must refuse to do. A remedy book that
quietly emits an unsafe change is worse than no remedy book, because it
carries the authority of the house rules while contradicting them.
"""
import sys
from pathlib import Path

import pytest

SRC = Path(__file__).resolve().parent.parent / "src"
sys.path.insert(0, str(SRC))

import advisor as A  # noqa: E402
import guardrails as g  # noqa: E402


# ---------------------------------------------------------------------------
# the safety filter -- the part that must never leak
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("bad,why", [
    (A._spark(+5.0, (2000, 3000), (50, 80), "x"), "spark step over 2 deg"),
    (A._spark(-5.0, (2000, 3000), (50, 80), "x"), "retard step over 2 deg"),
    (A._ve(+9.0, (2000, 3000), (10, 40), "x"), "VE over the 5% hard limit"),
    (A._chg("rear_timing_offset", "deg", 1.0, "increase", None, None, "x"),
     "rear timing advanced past front"),
    (A._chg("not_a_table", "deg", 1.0, "decrease", None, None, "x"),
     "table that is not a TMax page"),
    (A._afr(-2.0, (2048, 3584), (10, 40), "x", target=11.0),
     "AFR outside the cruise window"),
])
def test_illegal_changes_are_dropped(bad, why):
    legal, rejected = A.vet_changes([bad])
    assert legal == [], f"guardrails should have blocked: {why}"
    assert rejected and rejected[0]["blocked_by"], why


def test_legal_change_survives_vetting():
    ok = A._ve(+2.0, g.DECEL_POP_HIGH["rpm"], g.DECEL_POP_HIGH["tps"], "x")
    legal, rejected = A.vet_changes([ok])
    assert len(legal) == 1 and rejected == []


def test_blocked_change_is_not_rescaled_to_sneak_through():
    """A blocked change must be dropped whole, never shrunk to fit.

    The step limits encode a step-then-verify SEQUENCE. Halving a change so it
    passes would defeat the sequencing that makes it safe, while looking like
    the advisor complied.
    """
    huge = A._spark(-5.0, (2000, 3000), (50, 80), "x")
    legal, rejected = A.vet_changes([huge])
    assert legal == []
    assert rejected[0]["magnitude"] == 5.0, "must not be silently reduced"


def test_every_remedy_in_the_book_is_guardrail_legal():
    """No shipped remedy may contain a change the safety layer would block."""
    for key in A.REMEDIES:
        adv = A.advise(key)
        assert adv["rejected"] == [], (
            f"{key} ships a change guardrails blocks: "
            f"{[r['blocked_by'] for r in adv['rejected']]}")


def test_every_remedy_change_passes_check_change_directly():
    for key, r in A.REMEDIES.items():
        for c in r["changes"]:
            blocks = [f for f in g.check_change(c) if f["severity"] == "block"]
            assert not blocks, f"{key}: {blocks}"


# ---------------------------------------------------------------------------
# provenance honesty
# ---------------------------------------------------------------------------

def test_only_house_protocols_are_marked_validated():
    """`validated` means ridden on THIS bike. Do not inflate it."""
    validated = {k for k, r in A.REMEDIES.items()
                 if r["provenance"] == A.VALIDATED}
    assert validated == {"decel_pop_high", "decel_pop_broad",
                         "autotune_not_learning"}, (
        "a remedy was promoted to 'validated' without a ride to back it")


def test_every_remedy_declares_provenance_and_source():
    for key, r in A.REMEDIES.items():
        assert r["provenance"] in (A.VALIDATED, A.INFERRED), key
        assert r["source"], key


def test_every_remedy_says_how_to_refute_it():
    """A remedy with no falsifier is a belief, not a hypothesis."""
    for key, r in A.REMEDIES.items():
        assert r["refute"], key
        assert r["confirm"], key
        assert r["log"], key


def test_decel_pop_matches_the_house_protocol_exactly():
    """These numbers come from validated shop history; drift is a bug."""
    hi = A.advise("decel_pop_high")["changes"][0]
    assert hi["table"] in g.VE_TABLES
    assert hi["magnitude"] == abs(g.DECEL_POP_HIGH["ve_pct"])
    assert hi["direction"] == "increase"
    assert hi["rpm_band"] == g.DECEL_POP_HIGH["rpm"]
    assert hi["tps_band"] == g.DECEL_POP_HIGH["tps"]

    br = A.advise("decel_pop_broad")["changes"][0]
    assert br["table"] in g.SPARK_TABLES
    assert br["magnitude"] == abs(g.DECEL_POP_BROAD["spark_deg"])
    assert br["direction"] == "decrease"
    assert br["rpm_band"] == g.DECEL_POP_BROAD["rpm"]


def test_autotune_remedy_proposes_no_table_change():
    """A gating problem is not fixed by editing the map."""
    adv = A.advise("autotune_not_learning")
    assert adv["changes"] == []
    assert "200" in adv["confirm"] and "280" in adv["confirm"]


# ---------------------------------------------------------------------------
# matching
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("text,expect", [
    ("it pops on decel", "decel_pop_high"),
    ("running really hot in traffic", "running_hot"),
    ("pinging under load", "knock_under_load"),
    ("surging at cruise", "lean_surge_cruise"),
    ("plugs are sooty", "rich_black_plugs"),
    ("stumble off idle", "stumble_off_idle"),
    ("feels flat at wot", "flat_at_wot"),
    ("autotune trims not moving", "autotune_not_learning"),
])
def test_free_text_matches_the_right_remedy(text, expect):
    assert expect in A.match(text)


def test_punctuation_does_not_break_matching():
    assert "knock_under_load" in A.match("it's pinging!")


def test_unmatched_text_returns_nothing():
    assert A.match("the paint is blue") == []


def test_match_is_deduplicated():
    hits = A.match("pop popping backfire decel")
    assert len(hits) == len(set(hits))


# ---------------------------------------------------------------------------
# rendering
# ---------------------------------------------------------------------------

def test_render_marks_inferred_remedies_clearly():
    out = A.render(A.advise("running_hot"))
    assert "INFERRED" in out
    assert "not yet ridden" in out


def test_render_marks_validated_remedies_clearly():
    out = A.render(A.advise("decel_pop_high"))
    assert "VALIDATED" in out


def test_multi_change_remedy_renders_as_ordered_steps():
    """Listing two changes under 'apply ONE change' contradicts itself."""
    adv = A.advise("running_hot")
    assert len(adv["changes"]) > 1
    out = A.render(adv)
    assert "Step 1" in out and "Step 2" in out
    assert "NOT a list to apply together" in out


def test_render_always_carries_the_validation_protocol():
    for key in A.REMEDIES:
        out = A.render(A.advise(key))
        assert "ride" in out.lower()
        assert "did NOT work if" in out


def test_advise_rejects_unknown_key():
    with pytest.raises(KeyError):
        A.advise("no_such_symptom")


# ---------------------------------------------------------------------------
# it must never touch a tune
# ---------------------------------------------------------------------------

def test_advisor_never_writes_anything():
    src = (SRC / "advisor.py").read_text()
    for bad in ("write_bytes", "write_text", '"wb"', "'wb'", "open("):
        assert bad not in src, f"advisor must not write: {bad}"


# ---------------------------------------------------------------------------
# integration: the LLM assistant must be grounded on the remedy book
# ---------------------------------------------------------------------------

def test_symptom_question_gets_the_deterministic_remedy_first():
    """Keyword retrieval cannot be trusted with a symptom question.

    Asked "how do I fix pinging" the scorer returns a generic manual chapter,
    because a chapter saying "timing" forty times outscores the one paragraph
    that says what to change. Guessing wrong here costs an engine.
    """
    import tune_assistant as ta
    ctx = ta.relevant_context("how do I fix pinging")
    assert ctx.startswith("=== HOUSE REMEDY"), \
        "a symptom question must lead with the guardrail-checked remedy"
    assert "spark_advance_front" in ctx


def test_non_symptom_question_still_uses_normal_retrieval():
    """The remedy book must not hijack every question."""
    import tune_assistant as ta
    ctx = ta.relevant_context("what is the base map id format")
    assert not ctx.startswith("=== HOUSE REMEDY")


def test_assistant_survives_a_broken_advisor(monkeypatch):
    """The assistant must still answer if the advisor cannot be used."""
    import tune_assistant as ta
    import advisor
    monkeypatch.setattr(advisor, "match",
                        lambda q: (_ for _ in ()).throw(RuntimeError("boom")))
    ctx = ta.relevant_context("it pops on decel")
    assert isinstance(ctx, str)      # degraded, not crashed


def test_autotune_remedy_checks_the_switch_before_the_temperature():
    """Diagnosing an OFF switch as a heat problem sends you chasing cooling.

    Confirmed on this bike 2026-08-27: an 'auto tune run' file differed from
    its base map by 47 bytes of 214,967 -- because AutoTune was simply off,
    not because of the 330-345F heat gate.
    """
    adv = A.advise("autotune_not_learning")
    notes = " ".join(adv["notes"]).lower()
    assert "check the switch before the temperature" in notes
    assert "off switch" in notes or "turned back on" in notes
    # the switch must be the FIRST thing logged
    assert "enabled" in adv["log"][0].lower(), \
        "the enable switch must be checked before CHT"
