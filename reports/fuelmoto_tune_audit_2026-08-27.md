# Fuel Moto tune — audit report

**Tune:** `M8_131_CAM2_63inj fuelmoto origional.tbw`
**Origin:** Fuel Moto (Lucas), order #2417923, emailed 21 Jul 2026
**Analysed:** 27 Aug 2026 · SHA256 `2702c015…d24c54b3`

---

## Bottom line

This is a **clean, unmodified vendor base map** — and that is exactly the
problem. It has essentially never been adapted to your engine. The one
AutoTune session recorded against it changed **47 bytes out of 214,967**, and
the reason is written in the filename of that session: the heads were at
**330–345 °F**, which is 50–65 °F above the temperature where ThunderMax
AutoTune stops learning. **It was too hot to learn.**

Separately, and more importantly: **the tunes on your NAS are not this tune's
family.** They are a different base map *and* a different file format. More
below — this is the finding that matters most.

---

## 1. The email did not contain the tune

Both forwards of "Fw: Fuel Moto Map Support (Order #2417923)" (9 Aug and
14 Aug, from `joshairborne@yahoo.com`) say *"I have attached your tune"* but
carry **no attachment**. Each message is ~13 KB; a `.tbw` is 214,967 bytes.
The Yahoo iPhone forward stripped it.

I audited the copy pulled from your TMAX USB stick on 19 Aug instead
(`~/tmax-exchange/tunes-from-usb-2026-08-19/`), which is hash-verified in that
folder's `SHA256SUMS.txt` and is almost certainly the same file.

**If you want the original verified,** ask Lucas to resend to
`joshtitan88@gmail.com` directly rather than via the Yahoo forward.

## 2. It is a newer file format than anything else you have

| | Your 70 NAS tunes | This Fuel Moto tune |
|---|---|---|
| Size | 214,470 bytes | **214,967** (+497) |
| Header word 0 | `0x87` | **`0x8B`** |
| Header word 3 (version) | `0x147` | **`0x148`** |

All 70 tunes in `THROTTLE LOGIC` are the older format. This one is not.

I established that the 497 extra bytes are inserted **early**, before the table
region, so table offsets are displaced by a constant **+497**. That was tested
against the alternatives (+497 beat both 0 and −497 at all four probe points:
92%, 72%, 81%, 71% agreement vs 88/43/63/34) and then **independently
corroborated**: mapping the changed bytes back through the shift lands them
squarely in the AutoTune and checksum bands, which is precisely where an
AutoTune run should write. A wrong shift would scatter them randomly.

**Caveat, stated plainly:** the shift is well-evidenced but not *proven*, and
per-cell engineering scaling is unconfirmed for this format as it is for the
old one. So I can tell you *where* and *how much* changed. I cannot yet tell
you "your AFR at 3000 rpm is 13.4" out of this file, and I will not guess it.

## 3. You are not running this tune — and it is a different base map

This is the finding I would act on first.

| | Base map |
|---|---|
| `currenttune.tbw` and **all 70** NAS tunes | `HYSSPVCAHN051320` |
| This Fuel Moto tune | **`HXSSEDCAAN061617`** |

Your `bike_profile.json` records that the **current hardware — 6.3 g/s
injectors, S&S 550/CAM2 — runs base map `HXSSEDCAAN061617`**, i.e. the Fuel
Moto one. But every tune in your working folder, including `currenttune.tbw`,
is the *other* base map on the older format.

Two consequences:

1. **Your entire tuning history was developed on a different base map.** The
   decel-pop work, the timing experiments, the "hopefullycooler" series — all
   of it is `HYSSPVCAHN051320`. Those cell-level changes do **not** transfer
   one-for-one onto `HXSSEDCAAN061617`.
2. **Confirm which map is actually flashed right now**, in TMax Tuner, before
   changing anything. The file named `currenttune.tbw` and the profile
   disagree, and one of them is stale.

## 4. AutoTune learned almost nothing — because the engine was too hot

Comparing the Fuel Moto original against
`auto tune run from ch home 330 345 degrees f head temp.tbw` (same format,
same base map, so this diff is valid):

- **47 bytes changed**, 0.02 % of the file, across 18 small regions
- By band: `learned_ve_bulk` 18, `section_metadata_checksums` 8,
  `autotune_learned` 5, unmapped 12, header 4

For scale: a normal AutoTune session in your NAS history
(`automaprun → automaprun2`) moved **1,252 cells** in `autotune_learned`
alone. This one moved **5**.

The explanation is the filename: **330–345 °F head temp.** Your house rule —
and ThunderMax's own gating — is that AutoTune learns only between **200 °F
and 280 °F**. Below that it is cold-start enrichment; above it is heat soak.
At 330–345 °F, AutoTune was switched off for effectively the whole ride.

**Do not lock in those trims.** They are heat-soak artefacts, and your own
profile notes already flag this exact file.

---

## Your questions, answered directly

**Is it a perfect tune?**
No — and it is not meant to be. It is a vendor *base map* for a 131/CAM2/6.3-
injector combination. It is a sane, professional starting point, not a
finished tune for your specific bike, and it has had essentially zero
adaptation to your engine.

**Is the motor running perfect temps?**
**No.** 330–345 °F is the one hard number in this whole audit, and it is
50–65 °F above the AutoTune disable gate. That is the single most actionable
finding here. Whether that is tune, airflow, or oil, I cannot tell from a
tune file — but it is high enough to prevent the ECM from learning at all,
which means the bike cannot self-correct while it stays that hot.

**Is decel pop gone?**
**Unknowable from a tune file, and I will not guess.** A `.tbw` records what
the ECM is *commanded* to do, never what the engine *did*. There is no ride
datalog anywhere in this project or on the NAS — 153 tunes, 33 PDFs, 4 CSVs,
and the CSVs are recommendation tables, not recordings. The only way to answer
this is to ride the protocol: closed-throttle 4000→2000 rpm decels in 3rd and
4th, logging TPS, RPM, AFR target vs actual, and CHT.

**What will the bike be doing because of this tune?**
Running the Fuel Moto calibration for a 131 / CAM2 / 6.3-injector combination,
with no meaningful learned correction on top of it. It should run, and run
safely, because it is a vendor map. It will not be optimised for your exhaust,
your altitude, or your riding — that is what AutoTune was supposed to do, and
it could not.

---

## What I would do next, in order

1. **Confirm the flashed base map in TMax Tuner.** Your profile says
   `HXSSEDCAAN061617`; your whole tune folder says `HYSSPVCAHN051320`. Settle
   which is real before touching anything.
2. **Fix the heat before chasing the tune.** AutoTune cannot help while the
   heads sit at 330–345 °F. Run `tmax fix "running hot"` for the
   guardrail-checked options — but note the first check there is a cooling
   ride, not a map edit.
3. **Get one clean AutoTune session inside 200–280 °F.** That is worth more
   than any map edit I can recommend, because it is the only thing on this
   bike that actually measures anything.
4. **Export one ride datalog.** It is the single biggest unblock for this whole
   assistant — it turns every recommendation from a hypothesis into something
   measurable.
5. **Ask Lucas to resend the tune** directly, so the original is hash-verified
   rather than inferred from a USB copy.

---

*Read-only audit. No `.tbw` file was written or modified. Every number above
came from the bytes; where scaling is unconfirmed I said so rather than
estimating.*
