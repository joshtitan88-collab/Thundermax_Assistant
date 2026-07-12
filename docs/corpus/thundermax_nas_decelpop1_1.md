---
type: reference
title: DecelPop1 (1)
source: throttle-logic/TMAX TUNING MANUAL/TRACTION CONTROLL FIRMWARE/DecelPop1 (1).pdf
---

                        The Deceleration Pop Problem
Decel Pop is many times a nasty issue to deal with. Any time the exhaust is “opened up” the
condition of deceleration pops is MUCH more noticeable and problematic. An open exhaust
allows additional air to be “sucked up the pipe” during closed throttle and any unburned fuels,
then ignite and “snap/crackle/pop”!

The cure is the engine either needs to turn off the fuel during deceleration or continue to run to
burn it off.

There are Pros and Cons to both methods. After tuning is established as well as it can be, it
then comes down to “rider preference”.

Some exhaust/engine combinations can totally tune out and eliminate deceleration pop and
NOT use the Decel Cut Feature. Other exhaust/engine combinations are very problematic and
the best that can be done is to minimize the deceleration popping.

There are no magical methods to “cure” ANY tuning system. Any system can only make the
best that can be made out of engine/exhaust combinations which may be totally “wild and
unruly”.

LOUD and OPEN exhausts are much worse.

Remember the last time you heard a race car decelerate into a turn, pop-crack-bang.
Straightpipes, loud and open!

In the majority of cases, nothing has to be done as most engine/exhaust combinations will, over
time, tune themselves. If after a period of time the level of “exhaust pop/talk” is unacceptable
to the rider then the Decel Cut Feature can be activated (set to 1) using the default settings.

Several factors affect what happens during deceleration. The Stock OEM module uses what is
known as a Deceleration Cut feature which, during deceleration (declining rpms with closed
throttle), from some higher rpm (above 2300) down to 1796 rpm, "Turns the fuel off". As the
rpm passed below 1796 Rpm the fuel is again "turned on".

This “feature” is only activated AFTER the rpms exceed 2300 Rpm. You can easily detect this by
accelerating to 2100 rpm then closing the throttle. You will notice that the engine appears to
burble and run during the deceleration all the way to 1280rpm or so. If you then accelerate to
2500 Rpm then close the throttle, you will notice an immediate “flat jake brake sound” like the
engine is OFF during the deceleration. In fact, it IS off. The fuel has been turned off!
As the rpm declines below about 1796 Rpm, you will hear the engine begin to softly fire and
may even “feel a slight bump forward” as the engine, once again is delivering power or
Running.

Thunder Max also has this same feature, however it is greatly enhanced. The difference
between the Thunder Max and the OEM module, in this one regard, is that the Thunder Max
additionally gives the flexibility to activate or de-activate the feature and to "set" the Rpm
levels which the Decel Cut feature engages.

Decel Cut is a Band-Aid. It is NOT a perfect solution if some other conditions are not correct
“before” it is activated. Specifically, transition fuels (IE:just as the throttle is re-opened) need to
be accurate or additional “pops” will be created.

The activation of the Decel Cut feature can also be problematic in causing “shift pops”.

Even when running STOCK exhausts, there is Decel Pop but you just don’t hear it as well.

Tuning the Deceleration conditions

To “tune” the engine (map) for deceleration conditions, a specific area of riding needs to be
performed.

NOTE: Decel Cut Feature MUST be OFF during this development.

Beginning at 2500 rpm as the “top” rpm, a series of decelerations should be performed.

In a higher gear (3rd/4th) so that the deceleration is SLOWED (rpms drop slowly), the rider
should accelerate to 2500 rpm.

Now, close the throttle totally and let the engine reduce Rpms to 1500 Rpm.

Repeat this process several (5 or more) times.

The next step is to accelerate to 2500 rpms, but this time, “feather” the throttle to be “just
open” from the closed position.

The object is to let the tuning system “see and adjust” the deceleration condition “just off
closed throttle”.

Again repeat this process several times.
Repeat the above process using slow feathering of the throttle position from closed to just
open or even a little more at times.

What we are trying to accomplish, is to give the AutoTune system exposure to and the time to
adjust in areas which are NOT quickly developed in normal riding.

Also by providing slow and consistent throttle changes, transition fuels and other conditions are
more stabilized, providing the best opportunity for the AutoTune system to accurately make
adjustments.

Before repeating the above process again, stop, turn the engine off, restart and repeat the
above.

The AutoTune module will be “signaled” that it is OK to increase if needed and do more
aggressive adjustments.

The entire above process should be repeated using the following Rpm limits as a guideline.
     2500 rpm down to 1500
     2750 rpm down to 2250
     3000 rpm down to 2500
     3250 rpm down to 2750
     3500 rpm down to 3000
     4000 rpm down to 3500
     4500 rpm down to 4000
     5000 rpm down to 4500

  These rpms can be adjusted and spend LESS time at individual areas if the Deceleration Pops
  become quieter.

  Spend more time doing this process in Rpm ranges which are problematic.

  Proper tuning of these areas not only reduces deceleration pop but also “increase” throttle
  response as throttle is re-applied.

  Turning ON the Deceleration Cut Feature:

  If after the above “tuning” process, the Deceleration Pop continues at an unacceptable level,
  then the Deceleration Cut Feature can be activated.

  Adjustable variables within the Decel Cut Feature allow customizing it to fit the needs of
  particular rider preference as well as the dynamics of different engine and exhaust
  combinations.
The Decel Fuel Cut Rpm Low/High values normally end up within two ranges.

If you just can’t live with the exhaust “talking to you” as it burns off excess fuel at ANY rpm,
then the normal settings follow:

Decel Fuel Cut Rpm LOW = 1792 Rpm
Decel Fuel Cut Rpm HIGH = 2304 Rpm

If deceleration popping is NOT a particular problem except at high rpms then the following
settings should be used.

Decel Fuel Cut Rpm LOW = 2944 Rpm
Decel Fuel Cut Rpm HIGH = 3200 Rpm

Adjusting Decel Post Fuel Enrichment

If as the engine Rpms reduce to the Decel Fuel Cut Rpm LOW, and the engine once again
receives fuel and begins to fire, if a forward bump is felt, a reduction of the Decel Post Fuel
Enrichment value will correct this.

If NO bump is felt or a crackle is heard during throttle advancement while the engine is
deceleration, then an increase of the value in Decel Post Fuel Enrichment may correct this.

The Variables:

All developed Thunder Max Basemaps have been pre-set to operate with reduced levels of
deceleration pop. Obviously, there are nearly unlimited types and brands of exhausts which are
used. Providing maps to control Deceleration Pop on “all possible combination” is not practical.
This document hopefully helps inform the customer on the dynamics and will provide insight on
“what can be done” to help correct any deceleration concerns.

Rider preference and expectations varies greatly. We try to meet every ones desires.

We have actually eliminated deceleration pop and crackle only to be told by some riders….I
want it to CACKLE! It’s a Harley!!!!

