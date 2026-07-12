---
type: reference
title: TMAX DOCUMENTS
source: throttle-logic/TMAX TUNING MANUAL/TRACTION CONTROLL FIRMWARE/TMAX DOCUMENTS.pdf
---

                      Removing Engine Spark Knock or Pinging
                         via Timing Vs Engine Temp Map


                                                  v. 08242012


There are many aftermarket engine configurations, fuel quality and payload variations associated with proper
ignition timing. For this reason, it is impossible for the ThunderMax Base Map library to be a perfect match for
every engine combination. However, the ThunderMax library of base maps will cover most popular engine
combinations.

For those engines which require custom settings, adjusting the ThunderMax timing maps is a simple and
effective process. This will allow tuners and users to set the ignition timing for their individual engine
requirements, and remove any pinging present while operating the engine.

Note: All ThunderMax base maps have been developed for use with premium octane fuel. Use of boutique fuel
additives, stabilizers or special rare earth spark plugs, which could affect the combustion flash point, is not
recommended.




ThunderMax Ignition Timing Myths

       Myth # 1
       ThunderMax does not make automatic adjustments or timing corrections.

              False - ThunderMax automatically adjusts timing tables for the following changing conditions:
              Changes in Engine Temperature, Barometer, Intake Air Temperature plus a Separate Scale for
              Boost Applications.

       Myth #2
       ThunderMax does not allow access to adjust small moderate or large changes in specific areas of
       timing related to RPM or specific Throttle Positions.

              False - Easy access exists for making changes in timing relative to any RPM and Throttle
              Position. Additional changes can be made by Engine Temperature, Engine Speed, and a
              separate Rear Cylinder Adjustment are available.
  Getting Started

  First, establish if the spark knock is a new problem. If the answer is “yes”, a timing adjustment is not likely
  required to remedy the problem.
       1) Check Fuel Pressure: Degrading rail pressure is the # 1 problem with new or sudden spark knock
       problems.

       2) Check Fuel: To establish a good timing map, make sure premium octane fuel is present; avoid use
       of boutique fuel additives and stabilizers.

       3) Avoid Special Rare Earth Spark Plugs: These can be a source of new unwarranted spark knock
       which can alter the flash point of combustion.

       4) Check for Damaged Wiring: Faulty or damaged o/2 sensor or wiring

Second, if none of the above issues are present or the spark knock problem has been present since
installation, determine the following:

   1) Has an incorrect base map been selected? You can determine if the Base Map selected is
      correct in the ThunderMax software. Select, sort and load another base map. Use the map
      notes to aid in locating the proper map (Compression Recommendation). If you need further
      assistance selecting a map, contact ThunderMax Support with the details of the engine
      combination at support@thunder-max.com.

   2) If you have determined the best matching map has been selected, timing adjustments need to
      be made to the base map. The next step is to quickly identify the severity of the problem.
          - Is the pinging issue “Light”, “Moderate”, or “Severe”?
          - Does the pinging happen occasionally, or at certain engine temperatures?
          - What is the specific RPM range in which the ping is present?




Typical Adjustment Range
       Slight or Occasional Ping: Retard 1 to 2 degrees

       Moderate Ping: Retard Timing 2 to 3 degrees

       Severe Ping: Retard at least 3 to 4 degrees
Perform the timing adjustments globally on the new Timing Vs Engine Temperature page. This is
the go to page for making a quick adjustment based on the analyses. Once completed, perform a
road test to confirm the issue has been resolved.


                                     Unmodified Base Map (example)
Global adjustments can now be quickly made to a single map page by using the following steps:

   Step 1: Read the Map: Go to Map Editing > Read Module Maps and Settings

   Step 2: Open the Timing vs Engine Temperature Page: Go to Tuning Maps > Ignition Timing
   Maps > Timing vs Engine Temperature

   Step 3: Arrow Keys: Use the mouse to select the first key you want to adjust. Use the down
   arrow keys (lowers timing) or up arrow keys (raises timing) keys on your keyboard. Use left or
   right arrow keys to move to the next point of adjustment.

                  Modified Tuning Map - Minus 2 Degrees of Timing (example)




      Step 4: After adjustments, perform a quick road test. Determine if further adjustments are
      required to remove remaining spark knock or pinging.

