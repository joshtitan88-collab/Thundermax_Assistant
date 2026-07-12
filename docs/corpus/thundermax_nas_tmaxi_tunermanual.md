---
type: reference
title: TMaxI_TunerManual
source: throttle-logic/TMAX TUNING MANUAL/TMaxI_TunerManual.pdf
---

     ThunderMax tuning Manual
                                TMaxI Tuner Software



The first step is to; Always read the map when you connect to
 a bike. This way the data shown in your software will always
               match the bike you are connected to!



Some ThunderMax EFI controllers are not legal for use or installation on motor vehicles operated
on public highways in the State of California or other States where similar emission control laws
may apply. A 50 state ARB legal version, the ThunderMax 50, may be available for specific
applications.

The user shall determine suitability of the product for his or her use. The user shall assume all
risk and liability in violation of regulations and any incurred financial obligations due to vehicle
inspections or emissions tests.



             Email Technical Questions to: tmaxsupport@thunder-max.com


                                                                                                       1
Section 1: Introduction                     Page 4

    System Requirements                     Page   5
    User Requirements                       Page   5
    Important Notes                         Page   6

Section 2: Software Installation            Page 7

    TMax Tuner Software Install             Page   8
    TMax Tuner Software Removal             Page   9

Section 3: Learning the Basics              Page 11

    TMax Tuner Software Layout              Page 12
    Selecting a Base Map File               Page 13
    Linking to the ThunderMax ECM           Page 20
    Synchronizing TMax Tuner & ThunderMax   Page 21
    Writing a Base Map File                 Page 22
    Reading from the ThunderMax ECM         Page 23
    TMax Tuner File Management              Page 24
    Map Notes                               Page 25
    Saving an Altered Map as a New File     Page 25
    Map Editing with TMax Tuner             Page 28
    TMax Module Control Center              Page 31
    Engine Monitor Values & Gauges          Page 33
    TMax Auto Support-Module Collection     Page 40
    Tuning Maps Tree                        Page 45
    Module Configuration / Basic Settings   Page 47
    Configuring the Basic Settings          Page 49
    Module Service Data                     Page 54
    Diagnostic Trouble Codes                Page 57
    Closed Loop Module Settings             Page 60
    TMax Tuner Hot Key Combinations         Page 65
    TMax Tuner Help Section                 Page 66




                                                       2
Section 4: ThunderMax Tuning                 Page 67

    Important Note                           Page 68
    TMax Closed Loop AutoTune                Page 68
    Front Cylinder Fuel                      Page 70
    Rear Cylinder Fuel                       Page 71
    Idle Speed RPM (Offset) VS Engine Temp   Page 72
    AFR Correction VS Engine Temperature     Page 74
    AFR VS Engine Temperature                Page 76
    Ignition Timing Maps                     Page 77
    Customizing Fuel Targets                 Page 85

Section 5: Diagnostics & Troubleshooting Page 87
    Basic Diagnostics Tips                   Page 88
    General Performance Problems             Page 90
    General Installation Notes               Page 90

Section 6: Updates                           Page 91
    TMax Tuner Updates Overview              Page   92
    Updating the TMax Tuner Software         Page   93
    Updating the Base Map Definitions        Page   94
    Updating the Firmware                    Page   95

Glossary of Terms                            Page 103




                                                         3
  Section 1:
Introduction




               4
                         SYSTEM REQUIREMENTS


TMax Tuner software package is designed to run on personal computers using
Microsoft® Windows 2000™, Windows XP™, Windows Vista™ and Windows
“7”™, "8"™, "10"™ , "11"™ operating systems.

Windows "10"™ , "11"™ have a version "10S"™ and "11S"™ this operating
system is a "SAFE" mode system, it only allows programs (APPS) from the
Microsoft™ store to be downloaded and uses Microsoft Edge™ for browsing.

To download ThunderMax software you will need to switch out of "S"
safe mode.

                             How do I get out of S mode?
Go to the Settings menu and select “Update & Security”. Then go to the
“Activation” tab and choose the “Switch out of S mode” option. Click “Yes” to
confirm your decision.
This is a one way street, once you switch out of the "S" version you can NOT go
back.



The computer system must have an adequate amount of free space on the hard drive for
proper operation. TMax Tuner does not support Windows 98™ or earlier operating
systems.
 A high speed internet connection is required for updates to software, firmware,
and Base Map Library updates; as well as the automated Support Module Data
Collections.


                           USER REQUIREMENTS

The TMax Tuner software requires basic computer skills to be able to effectively use the
program and achieve your tuning goals. The operator must possess the following basic
skills before attempting to use the software.
      1.) Basic Windows™ Skills

       2.) Maneuver through a typical Windows™ environment, storing files in
folders and retrieving them when needed




                                                                                           5
                  TMax Tuner software includes the following:

         •   TMax Tuner Software
                      - Complete Base Map Library
                      - Complete Tuning Manual accessible through the Help
                         Menu (.PDF)
                      - Link to the ThunderMax website
                      - Automated Technical Support Options

         •   Driver files for USB communication are now supplied within the
             software.

      The TMax Tuner software can be downloaded from the Thunder-Max.com
      website, under the Support section.


                           IMPORTANT NOTES

•   The ThunderMax Tuning Manual contains a Glossary of Terms as well as an
    Appendix with a dialog on the menus and functions of the software. These features
    have been added to avoid any confusion over the terminology and functions used in
    TMax Tuner and in EFI tuning in general. Please refer to the end of this document
    for these valuable tools when needed.

•   In addition, the speedometer calibration should always be
    confirmed during the installation for your year/model motorcycle.
    This is critical so that your speedometer is calibrated and
    functional before road testing your new ThunderMax ECM. In
    addition, anytime a map is reloaded or a new map is loaded onto
    your ECM, the speedometer calibration needs to be set to your
    application.
Some ThunderMax EFI controllers may not be legal for use or installation on motor
vehicles operated on public highways, and may be restricted to closed-course
competition use only, in the State of California and other States where similar emission
control laws may apply. For other applications please review the product listings for
ThunderMax 50.

The user shall determine suitability of the product for his or her use. Installation and
use on a pollution-controlled vehicle, for highway use, constitutes tampering under the
US EPA guidelines and can lead to substantial fines and penalties.


                   See www.thunder-max.com for more information.




                                                                                           6
 Section 2:
 Software
Installation




               7
                     TMax TUNER SOFTWARE INSTALLATION
  To install the software onto the computer system, take the following steps:

1. Exit any programs that are currently running.
 2. The newest version of software can always be downloaded from the website
www.Thunder-Max.com , select the Support tab, then software download. Choose the
software you need , the top option TMAX Tuner is for most newer ECMs, that have a
metal tab/ seal covering mini usb communication port.
3. Select your software by clicking the download arrow. The software will
automatically begin the download process. Find and click on the downloaded .exe file.
Then click "Yes".




  4. When the Install Wizard screen appears click next. Next click yes to agree to the
      license agreement. Then choose next to install to the listed file location,
      Click next again to verify, Click Finish when prompted.

  5. Once TMax Tuner is installed, a desktop icon named “TMax” will appear on your
      computer’s desktop. Select this new icon to open TMax Tuner.




                                                                                         8
Errors During Installation:
Windows errors during installation are not necessarily TMax Tuner software issues.
Please uninstall TMax Tuner software and the reinstall the program.

                 TMAX TUNER SOFTWARE REMOVAL
This section describes how to fully remove the TMax Tuner software. If an error occurs
during the installation of TMax Tuner, it may be necessary to completely remove the
software prior to reinstalling TMax Tuner.

1. Save any custom maps and folders to your desktop.

2. Select Start > Settings > Control Panel, or Start > Control Panel, depending on
which Windows Start Menu you use.

3.) Select the uninstall a program option in the Control Panel. Find the “TMax Tuner”
program, select it (single click) then right click ans select uninstall / change, then
follow the prompts to remove it. Or you can choose Uninstall / Change in the gray
header box just above the list of programs. The programs are all listed in alphabetical
order, and the un-installation should be straight forward.

4.) The “InstallShield Wizard” will start to run, and a box with three options will appear
on your screen. Select “Remove” as shown below.




                                                                                             9
5.) Follow the remaining InstallShield Wizard instructions and remove all of the TMax
Tuner application.

6.) Restart your computer!



7.) Once Windows has reloaded, you need to remove a folder of information left behind
in the Program Files directory. The folder to remove is titled “Thunder Heart”. This
contains your Base Map library, please take the time to save any custom maps to your
desktop now (if you didn’t in step 1), otherwise they will be deleted.
If you have a 32-bit operating system (Windows XP or Vista), the folder to delete is
named Thunder Heart and is found at the following location:

      C:\Program Files\Thunder Heart

If you have a 64-bit operating system, the folder to remove is found at the following
location:

      C:\Program Files (x86)\Thunder Heart

8.) Lastly, a second folder needs to be deleted to fully remove the TMax Tuner software.
It is also titled “Thunder Heart”.



      If you have either version of Windows XP, 32 or 64 bit, the folder to remove is
found at the following location:

       C:\Documents and Settings\All Users\Shared Documents\Thunder Heart

      If you have either version of Windows Vista or Windows 7, 32 or 64 bit, the folder
to remove is found at the following location:

       C:\Users\Public\Public Documents\Thunder Heart

9.) You’ve now 100% removed the TMax Tuner software, and all of the files and folders
created by it. Restart your computer and you’re ready to reinstall a new version of TMax
Tuner. Follow the instructions to install a new version of TMax Tuner. The latest version
of TMax Tuner can always be found on the www.Thunder-Max.com website, under the
“Support” heading.




                                                                                            10
                     Section 3:
   Learning the
  Basics of TMax
  Tuner software
The ThunderMax Tuning Manual is meant to be a comprehensive Reference
Guide for any skill level user.

In an effort to make the large document easier to navigate, a Table of Contents,
Index, Glossary, and an Appendix with a “Visual Index” are included for quick
navigation.




                                                                                   11
                        TMAX TUNER SOFTWARE LAYOUT

   DROP DOWN                  MAP IN USE
     MENUS                   IN TMax Tuner
   These menus contain
  valuable features which       INDICATOR
include browsing the Base
 Map Library, saving your
                              When green the function                            Shortcuts
                              is active, whether linked                       To Basic settings
  tuning work, and Read /      to bike, showing all the
Write commands for ECM
                                                            BASE MAP           or to start a data
                               sensor data live, or the                       collection for tech
      communication.               Autotune status           FILE ID                support




                                                          TUNING MAP WINDOW
                                                          Displays the Tuning Maps that are
                                                            selected from the Tuning Map
                                                           Tree. From this window you will
                                                             be able to tune the AFR and
                                                                   Ignition Curves.


     TUNING
    MAPS TREE
     This is always           MONITOR VIEW/
    visible for quick           GAUGES                        MODULE BASE MAP ID
   map page selection
    & map toggling          Live Data from the ThunderMax       When Linked to the module, the
     during tuning          ECM – Customizable Display &        Base Map ID is displayed in the
       sessions.                   Gauge Features                       Status Bar.




                                                                                                  12
SELECTING A BASE MAP FILE FROM THE TMAX TUNER
                  DATABASE

The TMax Tuner EFI Map Database will help you chose the closest Base Map for
your specific installation. To find the TMax Tuner EFI Map Database, select EFI
Maps >then choose EFI Map Listings / Definitions for your application, as
shown below.




Select the map catagory to match your bike. The following window should appear, with
the title “Base Map Definitions”.




                                     Click Update all Maps at any time,
                                   your softwares map database will be updated with any
                                        new maps added after your software install


                                                                                          13
To select the closest Base Map for your engine combination, please read the
following section on Key Elements. This will help you quickly narrow down the vast
selection of available Base Maps, to find the right one for your starting point.

Base Map “Key Elements”:
The reason for selecting a Base Map by “Key Elements” is to find the closest Base
Map available for your combination, by the most critical components. The most
critical elements for selecting a Base Map are:

   a) Engine Displacement - Bore & Stroke. A correct match to the engine’s
      stroke is far more important than an exact match of engine displacement.
      For example, stroke and cam timing influence pumping pressures. The
      correct shape of spark curves in the base map is what you are attempting to
      match. Example a high compression 103 map will work with a similar build
      with displacement of 106, 107 or 110 engine which uses the same 4.375
      stroke.

   b) Throttle Body / Injector Size & Style – Match injectors first, changes in
      Throttle Body size second. If you are using something different not listed
      please contact support for map selection advice.

   c) Cams-Exhaust System Design – There is no need for concern if an exact
      match does not appear in the Base Map library. Simply select the Base Map
      with the closest duration or posted timing of the cam with matching
      compression ratio, when possible consider the style of exhaust system.
      Even if brand is not an option, choosing the closest style will yield excellent
      results. Group your exhaust system in one of the following three categories:

                 i.    Factory Head Pipe with Crossover – Dual exhaust systems
                       with a cross over pipe that connects the front and rear
                       exhaust pipes. Typically kept with slip on mufflers.
                 ii.   Dual Exhaust – 100% separate exhaust pipes, short or long.
                iii.   2 into 1 Collector – Both head pipes converge into one
                       collector.
                iv.    Comments about use of Catalysts as mentioned in the exhaust
                       pipe map notes

The AutoTune system allows you to choose a Base Map that isn’t a perfect match
and still have excellent results. The closer that the Base Map is to your
combination, the faster the system will achieve the desired AFR Targets. This
simply means less time to establish and maintain a great tune. Even if your
combination isn’t listed, select the closest match and let the TMax AutoTune
system start creating your custom Base Map while you ride. Use the Auto Map
feature to create to further develop the base map.




                                                                                        14
Base Map File Browsing / Selection:
Now that you have the Base Map Definition window open, you may begin
narrowing down the list of maps for your application. To sort the map files by a
particular key element, click on the column heading.

Select “Engine Type”, the Base Map Definitions will be sorted by the engine
displacement, which is the first Key Element you need to match to your
combination. All of the column headings can be used for sorting purposes.


                                                                    Column Heading
                                                                      Click here to
                                                                     sort by Engine
                                                                     Displacement

                                                                     Right Click to hide
                                                                      ALL other Base
                                                                     Maps, except 107
                                                                        ci Engines

To filter the TMax Tuner EFI Maps Database, RIGHT click on the engine displacement
that matches your engine, as described in the Key Elements section. Right clicking
will hide all other options for that particular category. If you right click on “107 c.i”, all of
the other options are temporarily hidden, as shown in the following picture.




Notice that the “Show All Maps” button is now selectable. If you want to go back to
the complete library listing, select the “Clear Filters” button and you will start over with
all Base Map Files displayed.
Now that an engine displacement has been selected, and all the other maps are
hidden, move to the second Key Element, Throttle Body / Injectors. Since there



                                                                                                    15
aren’t any additional options, move on to the third Key Element, which is cams,
then exhaust systems.




                                             Slide to the right to reveal
                                               the other components,
                                             used during the Base Map
                                                       creation




All 4 Key Elements have now been satisfied, the engine displacement, throttle body /
injectors, cams and the exhaust system. As the picture above shows, there are still 3
choices for a Base Map for your engine combination. The ThunderMax with AutoTune
system has more than enough resolution to use any of these Base Maps to correctly
tune your engine. Remember, Base Maps are starting points that the AutoTune
system corrects for your specific engine and riding conditions.

Continue selecting options until you have the library narrowed down to the fewest
number of maps as possible. Several options may still remain; always select the Base
Map with the latest build date. Double left click to select this Base Map.




     If you’re still unsure of which Base Map to select, please email a request
     with your engine specifications to tmaxsupport@thunder-max.com
     Please title the email “Base Map Selection Help.




                                                                                        16
Loading the Base Map File:
Once the Base Map you’ve chosen has been double Left clicked, the following
window will appear, titled “Base Map Name Encoding.”
Now that you’ve selected the appropriate Base Map file for your engine combination,
you need to load this selected Base Map into TMax Tuner.


                                                                        Loading the
                                                                        map into the
                                                                        TMax Tuner
                                                                       software does
                                                                        not Write the
                                                                       map onto the
                                                                            ECM.




Select the “Load Base Map” button on the “Base Map Name Encoding” window,
as shown above. Once selected, TMax Tuner will only load this Base Map into the
software and return to the Air / Fuel Ratio vs. TPS page.

Now that the map is loaded into the TMax Tuner software; you must write
the map to your ThunderMax ECM. If you are installing a new Base Map
in an already used ThunderMax ECM, please remember to clear all of the offsets
from the system’s previous Base Map, and double check the Basic Settings.

           Proceed forward with the Tuning Manual, remembering that a new
           base map file will require the ECM to be initialized, the Basic
           Settings need to be checked, and all learned fuel offsets must be
           cleared from the previous map.




                                                                                        17
 Base Map Definitions Updates:
 To ensure that you have the complete, and up-to-date, Base Map Library, select
 the “Check Internet for Updates” button on the “Base Map Name Encoding”
 window, as shown below.




The following dialogue box will appear.
Click "YES" to start the search for updated maps.




 Base Map Updates:
  If there are any updated maps to download, you will be provided an ESTIMATE of the
 time required to perform this task. Click "YES" to proceed with the download.
 TMax Tuner now downloads all of the new base map files when you update the Base Map
 library. Previously only the Base Map library list was updated, so if you selected a map
 from an updated library list, TMax Tuner needed to download the map from the internet
 before you could proceed. Now the Base Map files are all downloaded during the update,
 which simply means that the newest Base Maps are always stored on your computer.
 The following window will appear if any new maps exist in the Internet database, but do
 NOT exist on your system:




                                                                                            18
It is simply good practice to update the definition file when searching for a new
Base Map file. Not only are new maps constantly being created, but the older Base
Maps are updated occasionally as well. Once updated, you may proceed with
selecting an appropriate Base Map for the current engine combination you are
working with. When the Base Map Library is up to date, the following window will
appear:




If you are satisfied with the operation of your current Base Map, chances are a new
Base Map will not make a significant difference to the operation of the motorcycle.
Updated maps have the latest developments learned from the engineering team to
share with our customers.




          If you have further questions about Base Map selections, please email a
          request for a map-engine specifications request to
          tmaxsupport@thunder-max.com




                                                                                      19
               LINKING TO THE THUNDERMAX ECM

1. Install the communication cable from the PC to the ThunderMax ECM.

          NOTE: Make certain that the communication cable is not resting on or
          near any part of the motorcycle that generates heat.


2. Turn the ignition on, making sure the OFF/ RUN switch is in the “Run” position,
but do not start the engine. The software will automatically       to the ECM
when power is detected. The red background will turn green when successfully
linked, indicating that the PC and ECM are now ready to begin communication (see
picture below).




        NOTE: NEVER attempt to load or reload a complete map with the
        engine running.


If you are NOT successful in linking to the system for the first time, please double
check everything on the following list to verify your setup. TMax Tuner
automatically finds the proper Com Port to use, so linking issues are generally rare
and unrelated to the software itself.

      a.) Are the cables properly installed from the ECM to the USB port on the
          computer? Remove the cables and reinstall to be certain the connection
          is solid.
      b.) Does the system have power? Is the ignition in the “ON” position
          with the OFF / RUN rocker switch in the “Run” Position?
      c.) Is the driver installed correctly for the ThunderMax system? See the
          USB Driver Repair located in the Help Tool Bar.
      d.) Try a different USB port on your computer. Remove / re-insert cable.




                                                                                       20
    SYNCHRONIZING TMAX TUNER TO THE THUNDERMAX
                      ECM
Once you have successfully linked to the ThunderMax ECM, select the Monitor
button to activate live gauge readings. A window will appear that alerts you of any
differences between the map that’s currently opened in TMax Tuner, and the map
that’s loaded in the ThunderMax ECM. Select “Yes” to synchronize (read) the map
and allow monitoring.
If 1 parameter is changed (learned offset, anything) you will get a
notice that the open Software BaseMap isnt synchronized with
the Module Basemap.




If you select “Yes” TMax Tuner will prompt you to save the map currently open
in the software.




This notice is to help prevent changes or edits from being made to an OPEN MAP
which may NOT be intentional. The notice will appear when the program is closed
or when a new map is loaded. It is highly recommended to save your map before
closing the program or loading another map by selecting File > Save as and
creating a dedicated folder for your maps. Renaming the file by changing the date
code (last 6 digits) will help you track your work.




                                                                                      21
WRITING A BASE MAP FILE TO THE THUNDERMAX ECM
Select File > WRITE Module Maps and Settings, as shown in the following
picture.




After the transfer bar completes, the map is loaded into the module. Click OK,
when the "successfully completed" dialog box appears.


          Re-initialize the system according to instructions.

                            DO NOT START THE ENGINE or move the throttle
                            during the initialization process.




                                                                                 22
           READING FROM THE THUNDERMAX ECM
To read a map that was previously installed on a ThunderMax ECM, select File >
READ Module Maps and Settings, as shown in the following picture.




This will start a Progress Bar window while the settings in the onboard ECM are
being brought to the screen. Wait until the Progress Bar is complete before
attempting to work in TMax Tuner. This may take 15-30 seconds depending on the
speed of your computer.

Once READ, the ECM’s current map and settings will be displayed in TMax Tuner.
The Air/Fuel vs. TPS window automatically opens first.

                IMPORTANT NOTE: Any time you are connected (linked and
                powered up) to the module, any changes you make are LIVE and
                affect the system settings and maps immediately. You will have
                effectively modified the original base map in the module, but not
                the base map file that is saved on your hard drive or in the Base
                Map data base.
This modified map with changes should be saved to your hard drive as a renamed
version of the original base map file. If you unlink from the system without saving
the changes to your modified maps folder, you can access/view those changes by
re-linking to the module and selecting File > READ Module Maps and Settings.




                                                                                      23
                 TMAX TUNER FILE MANAGEMENT
Proper file management is crucial to the identification and organization of data. In
order to access maps with unique changes and special tuning work, naming and
saving maps is critical. Although this is a relatively simple procedure, if it is not
addressed and understood before the tuning process is begun, loss of maps with
valuable tuning time is inevitable.
TMax Tuner uses “Base Map” files that save the fuel curves, ignition curves, the
basic settings for the Speedometer Calibration, idle RPM and the Rev limiter. All of
this data is stored in one file which makes management of the maps relatively
simple. All TMax Tuner map files have a file extension of either“.slk. for most
throttle cable modules and .TBW for throttle by wire style modules” Each map file
name is made up of 16 characters, the first 10 letters designate the original engine
combination that the map was made for, and the last six numbers refer to the date
on which it was created, updated, or last modified.
It is imperative that as changes are made to the map file, the file is renamed and
saved. However when custom changes are made to a map to tune the ECM to
a specific application, it is up to the user to save this edited base map file.
You can create subfolders inside the “TMax Tuner” maps folder to save each
combination that is mapped with TMax Tuner. The more TMax Tuner map files
that you save; the easier it will be to map different combinations in the future. Even
though every engine is different, if you build a library of map files in addition to the
TMax Tuner Map Database, chances are good that any combination that arrives at
your doorstep can be mapped by altering the closest match.
As more changes are implemented, do not delete the previous modified base map
file; simply create another map file with an updated date / name. This can save an
Enormous amount of time if changes are made and the tune goes in the wrong
direction. It will always be easier to reload a known good running map than try to
manipulate a modified map back to a previous condition.
If a base map is edited and not saved, TMax Tuner will prompt you to save the
map when closing the program, as shown below. If the map has been renamed,
the edits will be saved to the renamed map. If the map was opened from “Base
Map Definitions” or from the “TMaxI” folder in Basemaps, the edits will NOT be
saved to the original base map in your TMax Tuner library. Use caution when
prompted to save the base map.




                                                                                           24
                                  MAP NOTES
A “Map Notes” function is available for keeping track of tuning changes directly in
the map. Select EFI Maps > Map Notes as shown below, to reveal the “Map
Notes” window. In this window you have a virtual “notepad” to record your map
changes and test results. This is a great way of logging the changes made to the
Base Map File or values changed in the Module Configuration. Map File Notes
entries are only saved when the map is saved!




          SAVING AN ALTERED MAP AS A NEW FILE
Now that you know how to load an existing map file, it is very important to know how
to save the base map in a new folder. In this new folder all modified versions of the
base map file can be stored for future use. This will allow you to make changes to
your base map file and still have the ability to reload the original base map file if the
new base map file does not operate as well as the provided base map file.
To save the loaded map as a new file, select File > Save As… as shown in the
picture below.




                                                                                            25
The following “Save As” window will appear (screen may vary, due to different Windows™ versions, etc.):




                                                                                                          26
The folder that is opened by default is called “TMaxII_Tuner” The easiest way to store
and manage the new modified maps is by creating a new folder titled “My TMax
Basemaps” in this “TMaxII” directory. To do this, right click in the listed maps area,
choose New > then Folder. A new folder will appear, simply type
“My TMax Basemaps” and hit the Enter button on the keyboard.




Select the new folder that was created and type the base map file name that you have
loaded. For example: if “HCSSSGSAAN011110.slk” is loaded into TMax Tuner, enter
the Base map file name in the “File Name:” box and select the “Save” button.




A duplicate base map file will be created in this folder. As you make changes to the
tuning blocks and test the outcomes, save the tested base map files in this same
location. The last six digits of the file name should be changed to the date that
the map file was modified, (MM, DD, YY). This will allow you to make multiple
changes to the base map file’s tune-up, while retaining your previous tune-ups. By
maintaining the original first 10 digits of the base map file name, the map can still be
identified by the name to reveal the engine combination that the base map file was
originally intended for.



                                                                                           27
                  MAP EDITING WITH TMAX TUNER




Map Editing in TMax Tuner software is based on fuel offsets created by the
AutoTune system, and reading and writing maps in the ThunderMax ECM. After
describing the individual functions, instructions will follow in this section that explains
how to use this as an “Accelerated Auto Map Generator”.

AutoMap (Write “Learned Fuel Adjustments (CLP OFFSET)”):
Converts the fuel flow (learned) offsets to base map points- Resets the Auto Tune
range for extended learning.

Clear “Learned Fuel Adjustments (CLP OFFSET)”:
The “Clear Learned Fuel Adjustments” option ERASES ALL of the offsets learned by
the AutoTune system from the ThunderMax ECM. This option is necessary when
changing Base Map files in the ThunderMax ECM, but can be useful in the following
scenarios:
    1.) Sensor Problem – After replacing the bad sensor, clear the errant offsets
        that were created.
    2.) Air Leak - After repairing an induction side air leak, clear the offsets that
    were created.

 READ Module Maps and Settings:
Reads the Module Base Map from the ThunderMax ECM and loads it into the
TMax Tuner software on your computer.

WRITE Module Maps and Settings:
Uploads and synchronizes the selected base map calibration from the TMax Tuner
software to the ThunderMax ECM.




                                                                                              28
Undo Edits:
Returns adjusted map points back to the yellow markers (historic map points).

Reset Undo (Yellow Markers):
Resets all yellow markers (historic map points) in the map to mark the current
map points.

Copy/Paste Map Pages
For more advanced users - Use to copy pages or any part of a page from a map
to another map (pages include Front Fuel, Rear Fuel, Idle Curves, AFR Curves,
Ign Timing Maps, Ign Timing vs TPS, Air/Fuel vsTps @ rpm)

Engine Hot Start Assist Injection Timing
Toggling on may assist hot starts of engines equipped with earlier opening Intake
valve timing.

Tuning Experience Benefits
If your engine combination does not closely match the available base maps, or
your engine performance or fuel mileage is lacking, the Map Editing functions will
easily benefit you. Variances that can be easily handled by the Accelerated Auto
Map to correct the following:
       •   Different Exhaust Pipes
       •   Injector Flow Rates, Spray Angles, or Throttle Body design
       •   Fuel Pressure – 7 lbs of variance of Fuel Pressure is acceptable!
       •   Different cams
       •   Various Air Filter kits

The performance of your engine, as well as the fuel mileage, should always be
excellent with the ThunderMax with AutoTune. If you are not happy with the
performance or are experiencing excessive fuel consumption, use the TMax
Control Center for advice to correct these issues. The AutoTune system creates
“offset points” dynamically as you ride. Using these Read / Write functions will
apply the offset points to the “Entire Map Point Set” as needed. This takes your
learned points, and creates a custom Base Map for your application.
This powerful feature provides cutting edge map tuning at your disposal. Virtually
any engine or exhaust pipe combination can be improved with the use of the
AutoTune system and these Map Editing functions. The following simple procedure
explains how to use these functions to bring almost any engine combination into
tune by using the Auto Map generator function.




                                                                                     29
Auto Map Procedure:


1.) Link to the module, Select Map Editing > Read Module Maps and
    Settings.

2.) Select TMax Control Center from the tool bar.

3.) Click on Auto tune Points Analyzer

4.) Review the information listed under the Auto Tune Checkup to evaluate
    the progress of the “Learned Fuel Adjustments”

5.) If advised, select Run AutoMap. The Learned Fuel Adjustments will be
    written to become the new map points.

6.) Do not disturb this process! TMax Tuner is converting the Learned Fuel
    Offsets into Base Map Fuel Points.

7.) Once the process is complete, the base map has been successfully revised
    and smoothed; now simply test the results.

8.) If an improvement was made, but the tuning is not complete, ride the
motorcycle to generate additional fuel offsets, and repeat this process. It may take
a few cycles of this Accelerated Auto Map Procedure to fully create a custom Base
Map for your application. At least 2 cycles of riding and writing the offsets is
recommended for most applications.




                                                                                       30
                TMAX MODULE CONTROL CENTER




The TMax Control Center is a one stop source for information on the most critical
system functions. A unique element of this feature is the feedback provided on the
state of your tune via the Auto Tune Checkup. After logging some time on the
ThunderMax system, this feature will list a progress report and advice on performing
any steps needed to optimize performance. If fuel adjustments are approaching the
maximum learning limit, there is now detection to quickly review the condition of the
tune of each engine. Information and advice are provided on the following critical
system functions:

   Progress of the Auto-Tune system fuel adjustments.
   Engine RPM and Temperature Logs.
   Engine Diagnostic Codes.
   Auto-Tune Settings.
   Basic Module Settings.

The AutoMap (Map Editing) function can now be executed within the TMax Control
Center by selecting the Run AutoMap button. When Using the AutoMap function, all
fuel base map points are reset and smoothed to the learned offset values. The
AutoMap feature refines the base map fuel calibration based on
“Learned Parameters” established during engine run cycles. Applying learned map
refinements allows the system to continue making further refinements as the engine
is operated in varying ambient conditions.




                                                                                        31
Fuel Adjustment Offset Summary




The Fuel Adjustment Offset Summary window appears when the Details button is
selected under the Auto-Tune Checkup section. Here you’ll find details of the number
of adjusted points, averages, increased, decreased, percentage ranges, and
descriptions of the meaning of these values. Fuel adjustments in the 15-20% range
are approaching the maximum offset which could influence fuel mileage or limit the
engines power output. AutoMap will quickly correct these conditions.
The AutoMap feature will likely improve the performance of most any ThunderMax
system in use.



The Support team stands ready to assist our customers with any questions or
concerns and we welcome comments and suggestions on how to improve your
experience. support@thunder-max.com




                                                                                       32
              ENGINE MONITOR VALUES & GAUGES
The “Engine Monitor” function is a helpful tool to use while performing live tuning,
and to keep a watchful eye on the vital engine data while amending maps. In
addition, it is very helpful to diagnose problems or to make adjustments with sensors
or components. This will allow you to view all of the important sensor values on the
same screen as the map page while the engine is running and being tuned.

            NOTE: The Engine Monitor Values will only be Live when the ECM is
            powered up, linked to the computer, and the “Monitor” button selected.

To display the monitor data from the ECM, click the                button, which is
next to the              button on the toolbar. The “Monitor” button will turn
green when active, exactly like the “Link” button does.




The engine monitor buttons and values are always to the right of the “Tuning Maps”
tree. The monitor values will always be in this location. If a map page window is
maximized, these values will be hidden behind the window. To toggle between the
“Tuning Map” and “Monitor View”, select “Window > Monitor View.”




                                                                                        33
All gauges are set to be active when in monitor view. To view the gauges click
Monitoring then Show gauges. You can make any viewing tab into a gauge by
clicking the title box and checking the Active Gauge Display box.




The following screen will appear, with viewing tabs from sensors off of the bike. This
screen shot is of END User software, there are more parameters listed in the
ADVANCED user software version. Like stated above, all of the viewing tabs
can be show in a gauge format.




                                                                                         34
Default Monitor Gauges:
The most commonly used Monitor Gauges now automatically appear when
monitoring, without having to specifically tell TMax Tuner to display these individual
gauges. The following gauges will now appear by default when “Monitoring” is
selected:

                             Engine Speed
                             Engine Head Temperature
                             Battery Voltage
                             IAC Position
                             AFR Front
                             AFR Rear
                             AFR Target




You can always activate additional gauges as needed, or remove the default gauges
if necessary. Keeping a watchful eye on these default gauges is recommended
anytime the motorcycle is running and you’re linked to the ThunderMax ECM.
The following section will explain how to activate, and de-activate monitor gauges in
general. The engine monitoring values can be customized into individual gauges to
highlight the parameters that you wish to monitor during the run session. To create
and customize the gauges, select the name of the gauge (individually) that you wish
to monitor.




More than one gauge can be open at once; however each parameter must be
selected individually. For example, if the “Engine speed (RPM)” button is selected,
the following window will appear.




                                                                                         35
 In this dialog, select the box next to the “Activate Gauge Display” gauge option.
 Checking this option tells TMax Tuner that you want the gauge values shown for
 easy viewing during the tuning process.

This will tell the gauge to appear whenever monitoring is in effect OR whenever
gauges are toggled from the menu bar, as shown below. To toggle the visibility of the
gauges, select Monitoring > Show Gauges.




                                                                                        36
Also within the Monitor Display Setup dialog you can custom design gauges to
represent low, normal and high ranges as desired, and set each range of the
individual gauges you want to monitor. Colors will read on your computer monitor
(yellow, green and red respectively) as set by your parameters.




The “Operational Ranges” parameters are entered as values based on the
“normal” units of the selected monitor. In this case “degrees F” are the units and the
low range (yellow) is from -40 to 87.875 degrees F and the high range (red) will be
anything above 343.625 degrees F. That leaves the green range (which is listed as
white) as 87-343 degrees F. If you enter invalid entries, the software will make
corrections and let you verify the changes. This occurs when you OK the dialog box.
The following monitor gauge represents what you have just created. When the
temperature rises above the 343o limit, the gauge turns from Green to Red and
begins flashing, to immediately bring your attention to the temperature of the cylinder
head. Although TMax Tuner cannot prevent an engine from overheating, if used
properly, the Monitor Gauge function will alert you well in advance that the
temperature is too high to continue operation.




                                                                                          37
The next portion of the Monitor Display Setup is the Gauge Value Limits section.
From here you will set the minimum and maximum ranges the gauge will represent.




In this case the gauge limits are from -40 – 471.5 degrees F.

More appropriate limits and ranges may be desired. Experiment with these values
to see how they affect the gauges. All Gauge Value Limits, gauge visibility and the
gauge location are saved upon exit of the TMax Tuner program.
The final section of the Monitor Display Setup is called “Gauge Display
Dampening”. You will notice after using TMax Tuner for the first time that some of
the gauges are constantly changing or varying between a series of values. This is
in part due to the sensitivity and sampling rate of the sensors used in the
ThunderMax system. ThunderMax samples and records data much faster than the
human eye can process the changes. To slow down the data that is being
displayed, a timeframe can be imposed on the gauge to limit the refresh rate by up
to two seconds. By default the Gauges are set to ½ second dampening.
Experiment with these values to find the proper dampening for your application and
preference.




                                                                                      38
Once the option of “Activate Gauge Display” is selected and the gauge limits are
set, one of two things will now happen. The “Engine Head Temp” box will appear
on your screen as shown in the following picture, if the “Link” and “Monitor”
buttons have been activated (green background).




If the monitor gauges do not appear, select Monitoring > Show Gauges as
previously described. Drag the gauges around your screen to customize the gauge
location to your preferences. To drag a Monitor Gauge, move your mouse arrow over
the blue bar of the Monitor Gauge and then hold down the left mouse button to drag
the monitor gauge to a convenient location.




                                                                                     39
    ThunderMax Auto Support- Module Date Collection
               View the ThunderMax Auto Support Video on YouTube.
      http://www.youtube.com/watch?v=7vI3644S8wY&feature=player_detailpage

  The TMax Auto Support feature is integrated in the ThunderMax software. This
 tool simplifies the collection and transfer of all critical data stored in your module
             for the TMax support team to review for detailed analysis.
Step 1: Select TMax Auto Support
While linked to the module, select TMax-AutoSupport from the main toolbar then
select Collect TMax Support Data. An internet connection is not required for data
collection but will be needed later to transfer the data.




Step 2: Collect TMax Support Data
The window below will open. This window indicates that critical module and map
data will be automatically collected. Select “Yes” to allow collection of data. Your
data will only be collected. The data will be transmitted later via internet to
ThunderMax Support




                                                                                          40
 Step 3: TMax Auto Support Reads the Module
The windows below will appear, one at a time, as the Module Map and Learned
Fuel Offsets (Adjustments) are read from your module.




 Step 4:    ** Important** Include a Monitor Log

 The below window notifies you of the start of including a Monitor Log (MLog) with the
 data transfer. It is recommended to choose “OK” as long as conditions permit starting
 the engine and letting it idle from a cold start to at least 250 ° F. All sensor data will be
 streaming from cranking to start up which will be recorded for the transfer. This very
 important feature which allows TMax support technicians to analyze the data while
 looking for any unusual activity that may match your notes listed in the collection.
 This valuable tool is key to resolving any troubleshooting case.




                                                                                                 41
     While Monitor Logging is taking place, the progress indicator shown below will be
     active. Once the engine head temp reaches approximately 250-275°, select Stop
     Monitor Logging to end the session, unlink the software by clicking on the green
     link button and then shut down the engine.




 Once the Monitor Log (MLog) is stopped, the "Support Data Entry" window will appear.
 Please carefully take the time to provide as much information as possible about the
condition and specific parts on the engine so that TMax support technicians can accurately
determine the nature of your issue. It is critical that you take the opportunity to fill out this
information form. We rely on this information to provide the best possible support. After
completing the Support Data Entry form, select Enter Comments, Issues, Problems, More
 to open the TMax Tuning Wizard.




                                                                                                    42
NOTE: If insufficient or NO data is provided to reference the issues of concern,
response to the support request will be delayed with added emails requesting
additional information.
Note: If you did not previously select Enter Comments, Issues, Problems, More
 and enter any data, the software will automatically open this window before
transmitting data to remind you to include as much information as possible.
In the TMax Tuning Wizard window you’ll find a list of check boxes for some
problem issues that could arise. The check boxes are provided for simplicity and
a dialog box is included for details. Check off any items that apply to your
support request, provide any details that need clarification and then select OK.
(See below)




                                                                                   43
     If you currently have an internet connection, click send to
      ThunderMax Tech Support. (as shown below)




Step 5: Next time you have internet
When ready to send the data, connect your PC to the internet and select TMax-
AutoSupport and then select Transmit TMax Support Data as shown below.




Follow the prompts and fill in data. Then click "Send to Thunder-MaxSupport".
 Shortly a notice will appear once your data has been successfully sent. Click OK to
complete.




Your data will be quickly reviewed, analyzed, which you will see a reply from TMax
support once the data has been received from your transmission.

   If you fail to get an acknowledgement your collection did not
                      transmit or wasn't received.



                                                                                       44
                             TUNING MAPS TREE

                                     The Tuning Maps Tree is located on the far left of
                                     the TMax Tuner layout, and is used to access
                                     different tuning and configuration pages of the
                                     software. Clicking on each of these tree titles opens
                                     a window to allow editing of a particular function:

                                     Front Cylinder Fuel:
                                     All Fuel Flow map pages are now displayed for
                                     viewing. These map pages show the Front
                                     Fuelflow vs. TPS curves for each RPM page. All
                                     fuel offsets made by the AutoTune system can be
                                     viewed on these pages.

                                     Rear Cylinder Fuel:
                                     These map pages show the Rear Cylinder Trim
                                     vs. TPS rpm map pages. These map pages will
                                     contain the AutoTune fuel offsets, once they are
                                     read from the ECM.

                                     Idle Curves:
                                     Idle Speed Rpm (Offset) vs. Engine
                                     Temperature map page is used to control the Idle
                                     Speed at specific engine temperatures, for example
                                     note the difference between idle speed during a
                                     cold start warm-up period vs. normal engine
                                     operational temperature

Idle Stop Offset vs Engine Temp this function is now automatic with the Gen 3
throttle cable ECMs. (there is no need to adjust.)

IAC Home Offset vs Engine Temp - page allows the IAC home on Gen 3 cable
throttle ECMs to be adjusted for proper air flow at starting rpms and at varied
temperature ranges.

Air Fuel Ratio Curves:
   1.) The AFR Correction vs. Engine Temperature map page allows the adjustment
       of the fuel correction at specific operating temperatures.
   2.) The AFR vs. Engine Temperature map page is only for Closed Loop Auto-Tune
       applications. This gives the Auto-Tune system AFR targets for specific operating
       temperatures.




                                                                                             45
 3.) Fuel Correction vs Boost - page allows additional fueling adjustments based
 on boost pressure.

Ignition Timing Maps:

 1.) Timing vs. Engine Temperature- page allows for timing adjustments based on
 engine temperature, only for use with transient heat related, specific uses.
 2.) Rear Timing vs. TPS -        The “Rear Timing vs. TPS” map page allows you to
 modify the timing in the rear cylinder only, to combat issues of spark knock that
 occurs only on the rear cylinder.
 3.) Timing vs Boost -page allows timing adjustments over the range of boost
 pressure.
 4.) Timing vs. Engine Speed- This map page is a composite timing map page. This
 table allows you to make quick changes to the master spark curve maps at specific
 RPMs. This map page is very effective in dealing with spark knock problems in
 particular RPMs
 5.) Ignition Timing vs. TPS" (these are @ RPM) There are 34 unique map pages
 for complete spark curve modification at every 256 RPM and any specific throttle
 position.
 See the Ignition Timing Maps section, for a complete discussion on how to tune the
 Ignition Timing Maps (page 77)

 Air/Fuel-TPS @ RPM: (AFR Targets)
 With ThunderMax the engines actual Air/ fuel ratio is derived from settings on
 these pages. The settings (targets) are at designated throttle positions and specific
 RPMs on the pages within the software.
 When the tuner makes changes to any of the A/F targets the AutoTune system will
 honor the new targets as the engine is operated on a dyno or during actual riding
 conditions. Any ThunderMax equipped motorcycle can be tuned for specific changes
 of desired economy and maximum performance all within one base map.

 Module Configuration:
 1.) Basic Settings – The Basic Settings page is used for editing the Idle Speed,
 RPM limit, Speedometer Calibration, Accel Fuel (accelerator pump simulation),
 Initial fuel pulse, IAC Home Position and other settings.




                                                                                         46
2.) Module Service Data – The ThunderMax ECM is constantly data logging while
   you ride and tune the motorcycle. The purpose of this page is to log the time that
   you spend at certain RPM ranges, as well as head temperatures, cycle time per
   riding session, and even how many times the Rev Limiter has been hit. This
   information is extremely valuable to you. These functions will aide any technician
   in determining why a certain failure occurred. The more data that you can provide
   to Technical Support the easier (and quicker!) it will be for them to help you.

3.) Diagnostic Trouble Codes – The ThunderMax ECM can quickly tell you if any
    of the 38 sensor functions are operating properly or not. If a sensor has failed, or
    a problem with the electrical system exists you will immediately see what the
    problem is on these pages.


                         MODULE CONFIGURATION
                        BASIC SETTINGS OVERVIEW

As described in the previous section, open the Module Configuration pages in the
Tuning Maps Tree. Select the “Basic Settings” page under the “Module
Configuration” heading to open. The following window will appear.




                                                                                           47
 Notice in TMax Tuner (Basic); AutoTune Low Temp, AutoTune High Temp, EGO
 Sensor type, and Injector timing, on the right-hand portion of the “Basic Settings”
 window are grey and non-selectable. These functions except for EGO Sensor
 Type, are available in the Tuner Plus version of TMax Tuner.



