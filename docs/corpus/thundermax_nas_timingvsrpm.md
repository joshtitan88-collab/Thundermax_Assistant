---
type: reference
title: TimingVsRpm
source: throttle-logic/TMAX TUNING MANUAL/TRACTION CONTROLL FIRMWARE/TimingVsRpm.pdf
---

                         Adjusting Timing for Ping
If you are experiencing “ping” at specific locations (TPS vs RPM), this document explains how
to make timing adjustments to remove that pinging.


The first section explains adjusting the Timing vs TPS @ rpm pages to correct for ping.
A simpler approach follows below that which is used in many cases satisfactorily.
It is up to you on what your needs (and skill) are to choose the timing modification method
which best works for you.
Legend Notes:

The YELLOW points above are where the ignition timing points were before being moved
(Historical last position).
These points are for reference only and have NO impact on timing.

The BLUE (Red if you link and read the map) points above are the ACTUAL map timing points
which will be applied.

HINT: If you make adjustments to timing, SAVE your map to your computer so that you can
later open it to view “what you have done” by examining the YELLOW vs BLUE points.
I save it to a name such as “TimingAdj-1” as an example.



Closed to Light Throttle Region (Gray Area): Creating Smooth Throttle
Transitions
This region will NEVER experience ping. This is the area which is only experienced during
closed or very light throttle conditions, such as revving the engine or applying light throttle
during transition from close throttle perhaps while coasting downhill or around a corner. The
timing in this region should have a “smooth” transition from lower to higher rpms. For
example, if idle (768,1024,128) rpms are all at 18 degrees of timing then a “smooth gradient”
transition should occur as the rpms increase.

An example would be the following values: (Your values may be different, it’s the “pattern of
transition” we like to see)

It is preferred to have all idle rpm timing at the same setting. This helps eliminate “idle hunt”
due to timing changes.
768 @ 18 degrees
1024 @ 18 degrees
1280 @ 18 degrees
Next, it is preferred that the increasing rpm pages have gradually increasing “timing”. This
provides smooth rpm transitions at “Light to NO load”, such as revving the engine on the kick
stand.
1536 @ 22 degrees
1792 @ 25 degrees
2048 @ 30 degrees
2340 @ 32 degrees
2560 @ 34 degrees
and so on…….



You can “test” these values by the following method.
While on the “kick stand” VERY CAREFULLY try to advance the engine RPM 100 rpm at a time
and hold at that rpm. For example 1200,1300,1400 etc… up to 2500 rpm.
If while doing this, you experience the RPM seeming to “hang or stop increasing” even though
you continue to increase the throttle position, then the timing at that rpm, in this REGION
perhaps needs to be advanced.
When properly set, you will be able to “fully control” the RPM as you “slowly and steadily”
advance the throttle.

Tuning this RPM will produce “smooth throttle/rpm transitions” from close throttle to higher
rpms. Such as is experienced when applying slight throttle increases to “coast around a
corner”.



Normal Steady Riding Region (Green Area): Steady Cruise, Level Road.
It would be VERY RARE to experience ping in this region. The engine is under such LIGHT load
that advanced timing simply causes “irregular/jerky” engine operation, maybe even
accompanied by exhaust “popping”.
Fuel economy may also be affected by this region but changes to timing will have little
“noticeable” affect.

This area is best left “as is” unless significant problems are experienced.

It would take lots of testing to determine a better curve in this area.

You will also notice that this is the region where the timing “falls away / reduces” sharply
(downhill slope).

The reason for this is the engine is transitioning from LIGHT load to NORMAL load so timing
needs be removed.



Throttle Roll On Region (Blue Area): This area is experienced when passing or
climbing a hill.
The Throttle Roll On area is where 95% of all PING occurs.

This area is referred to as the “Belly” of the timing curve (due to its inherent saggy shape).

Particularly at LOWER rpm (where engine LOAD is highest) the “Belly” is deeper.
As rpm increase the “Belly” normally reduces and may even “not exist”.



Full Throttle Region (Red Area):
The Full Throttle region will usually exhibit PING if Throttle Roll On is producing PING, “But
NOT always”!

The Full Throttle region of the curve many times has more “advanced” timing. This advanced
timing will occur JUST at Full Throttle and Slightly below.
The Full Throttle region begins at the end of the timing curve Belly.

Full Throttle timing is quite easy to adjust for obvious reasons.
It’s not hard to find Full Throttle!
Identify Where to Make Adjustments (Rules and Methods)
If you are experiencing PING during Throttle Roll On, and yet if you apply Full Throttle the PING
quits, then “lowering only the timing Belly” will correct that condition.

If you are experiencing PING during Throttle Roll On, and yet if you apply Full Throttle the PING
remains the same, then BOTH the Belly and the Full Throttle regions should be lowered
equally.

If you are experiencing PING during Throttle Roll On, and yet if you apply Full Throttle the PING
is worse, then BOTH the Belly and the Full Throttle regions should be lowered but the Full
Throttle region should be lowered more.

If you have NO PING except at FULL THROTTLE, then only the FULL THROTTLE area should be
lowered.



How Much to Adjust the Timing
It is hard to describe the adjustment required because of different peoples “perception” on
how severe the ping is.

Here are the “Rules” I use in determining how much timing to remove to correct for ping.

Very Light Ping: Engine Ping which is a “skipping (not a regular tap tap tap) and very irregular”
and hard to hear. Light pinging will definitely be occurring on every cylinder firing.
For Very Light Ping, a -1 to -2 degree retarding of the timing is first used. Most people will not
even bother to adjust because it is so light and infrequent.

Moderate Ping: Engine Ping which is “more regular and almost pings to the rhythm of the
rpm”. It is NOT totally constant. The rider feels he “needs to adjust it”.
For Moderate Ping a -3 degrees retarding of the timing should be first used.

Heavy Ping: Engine Ping which is “totally in rhythm with the engine cylinder firing” is
considered heavy ping.
For Heavy Ping as much as -5 degrees or more may be required. I may apply -3 degrees to
help “zero in” on the area and region needing adjustment then retest.

Severe Ping: Engine Ping which is so severe you IMMEDIATELY get out of the throttle. It is like
large marbles shaking in a jar, loudly!
In extreme cases I have removed as much as -7 and -8 degrees to remove Severe Ping. I would
start with -5 degrees to help “zero in” on the area and region needing adjustment then retest.



Testing For Ping
Make sure the engine is at normal operating temperatures. A 70 degree F day after cruising
for 15 minutes should do it.

Test by doing normal steady state cruise and THEN slowly apply throttle.
Visualize the throttle REGION you are passing through as you listen for ping.
Remember, the VERY MOMENT you begin to apply throttle from steady state you WILL be
moving into the Belly of the timing curve.
You should be able to detect “which region” the ping is coming from.
After some experience in making adjustments and the results, you will quickly learn to identify
“where adjustments are needed”.

If you do not have a tachometer, consider that at normal riding speeds from 30 – 50 mph you
are most likely in the 2000 – 2500 rpm range.
If you are cruising at 70+ mph then you are most likely in the 2800+ rpm range.
If you are cruising at 80+ mph then you are most likely in the 3200+ rpm range.
NOTE: If you are lugging the motor at uncomfortable levels or have idle to a slow 15 mph
speed and apply throttle and get ping, you need to adjust 1500 – 2000 rpm timing and
USUALLY all adjustment will be to the Belly of the ignition curve.

Use those estimates to determine the RPM range you suspect the ping is occurring in.
Apply corrections “around” those RPM values to make adjustments.
For Example: If I was cruising at 70mph and every time I apply throttle I get ping, I would
make adjustments in the 2816, 3072 and 3328 rpm pages equally.
When you find an area of ping, immediately apply Full Throttle to check the Full Throttle
timing.
After applying Full Throttle for a few seconds then “slightly just slightly” back off the throttle
and see what the ping does.
The “slight” backing off of throttle will quickly move the TPS into the “right side” of the timing
curve Belly.

This is not as complicated as it sounds.
In fact I have modified MANY maps for customers ONLY knowing the RPM which
they are experiencing ping in.
My descriptions of what is “actually” happening is just to allow those who wish
to “fine tune” their timing to have the needed information to do so.

Simplified Timing Adjustments (if you do not want to make modifications to each
Timing TPS @ Rpm page)
If generally the ping you experience is “at various rpms and throttle positions with no
identifiable pattern” and it is fairly similarly the same intensity (light, moderate, severe) then a
simple adjustment to the Timing Vs. Engine Temperature map page may be all that is required.

The following below image shows a typical Timing Vs Engine Temperature map page (yours
will most likely look different).

If you adjust this page removing timing from the “middle” of the map page to the right will
correct MANY timing ping issues.

If your timing curve on the Timing vs Engine Temperature page does not look like the below,
you may want to experiment by adjusting YOUR curve to match the below curve.

The below curve has been proven to work very well in compensating for “Engine
Temperature” when increased engine temperature is the cause of engine ping.

All engines need to begin removing timing as the engine temperature increases past 226 deg F
as in the below example.
It is a simple adjustment to remove in steps of ONE degree every FOUR points to the right to
modify your map to match the below if desired.

This will correct timing issues which are being caused due to HIGH engine temperatures.


Advance Timing Development….

FYI: Not required except to perform map development… the above procedures
work fine for minor corrections.
NOTE: In normal timing development (from scratch), the following (see below image) Timing
vs Engine Temperature curve is “immediately” implemented.


Then timing is developed on each of the Timing vs TPS @ Rpm pages (1024 – 4600rpm). FYI:
Timing pages (as well as fueling pages) are usually the same above 4600 rpm.


IMPORTANT: During Advance Timing Development of the Timing vs TPS @ Rpm pages, the
engine temperature needs to be maintained at from 220 – 230 degrees.


If the Timing vs TPS @ Rpm pages are STRICKTLY developed at 220-230 degrees then as the
engine gets hotter, the corrections below (retarding of timing) will be applied to ALL of the
timing as it is read from the Timing vs TPS @ Rpm pages.

