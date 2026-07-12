---
type: reference
title: How to turn FUELMOTOFINALTUNE into
source: throttle-logic/TMAX TUNES/TMaxII_TunerM8/How to turn FUELMOTOFINALTUNE into.txt
---

How to turn FUELMOTOFINALTUNE into a true performance tune

Here’s a practical workflow you can do right now in ThunderMax using that file:

Open FUELMOTOFINALTUNE.tbw in ThunderMax

Go straight to AFR table(s).

Compare WOT, mid-load, and cruise regions to the targets above.

Adjust obvious outliers (too lean at WOT, too lean at cruise, goofy idle AFR).

Check spark tables

Look at high-load rows 80–100 kPa from 2,000–5,000+ rpm.

Pull back any crazy high values (30°+ at 2,500–3,000 WOT, for example).

Make sure temp and IAT adders reduce timing when hot, not add.

Balance AFR vs timing

If you want to run a bit leaner at WOT (say 13.1:1), be more conservative on timing.

If you like richer (12.7:1), you can afford slightly more timing—but still sane.

Refine VE with real data

Ride the bike, log data, then check learned trims.

Nudge VE base values so trims sit around ±5% in the cells you actually use.

Road-test performance

3rd or 4th gear WOT roll from ~2,500 to near redline (safely).

Pay attention to:

Knock / ping under heavy load

How hard it pulls through midrange

Heat after repeated pulls

Heat and cruise test

20–30 minutes of mixed riding: city + highway.

Watch:

How hot it feels at cruise

Any surging or bucking at steady throttle

Light-load ping on small roll-ons in top gear

Dial in cruise AFR and light-load spark accordingly.

7. If you want deep analysis from me

I can’t read the .tbw binary directly, but you can easily give me the guts of that map:

From ThunderMax, export or screenshot:

AFR (or λ) table(s)

Spark table(s) (front/rear if separate)

Engine temp / IAT timing adders

A short log (3rd/4th gear WOT pull and a few minutes of cruise) – even if it’s just “key values” typed out

Then I can tell you, very specifically:

“Change these exact cells to X AFR and Y timing.”

“This part of your map is too lean/risky.”

“This section is leaving power on the table.”

Bottom line:
Your FUELMOTOFINALTUNE.tbw is a good starting point, but a real performance tune is built by:

AFR in the right places

Timing that’s assertive but not stupid
