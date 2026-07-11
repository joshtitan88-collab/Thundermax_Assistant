---
type: concept
title: Icloud Thunder Max Tuning 98100016 08 Pdf D573d4
source: icloud/LOWRIDER ST 131MANUALS/Thunder max tuning/98100016.08.pdf
---

©2010-2016 Dynojet Research, Inc. All Rights Reserved.
User Guide for the Power Vision and WinPV Software.
This manual is copyrighted by Dynojet Research, Inc., hereafter referred to as Dynojet,
and all rights are reserved. This manual is furnished under license and may only be used
or copied in accordance with the terms of such license. This manual is furnished for
informational use only, is subject to change without notice, and should not be construed
as a commitment by Dynojet. Dynojet assumes no responsibility or liability for any error
or inaccuracies that may appear in this manual. Except as permitted by such license, no
part of this manual may be reproduced, stored in a retrieval system, or transmitted, in any
form or by any means, electronic, mechanical, recording, or otherwise, without the prior
written permission of Dynojet.
The Dynojet logo is a trademark of Dynojet Research, Inc.
Any trademarks, trade names, service marks, or service names owned or registered by any
other company and used in this guide are the property of their respective companies.
Dynojet Research, Inc., 2191 Mendenhall Drive, North Las Vegas, Nevada 89081, USA.
Printed in USA.
Part Number: 98100016 Version 8 (01/2016)

TABLE OF CONTENTS
Chapter 1 Welcome to Dynojet WinPV Software
Notice . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1-1
Contacting Dynojet . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1-1
Conventions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1-2

Chapter 2 Getting Started
Power Vision Driver Installation . . . . . . . . . . . . . . . . . . . . . . . 2-2
Windows XP Driver Installation . . . . . . . . . . . . . . . . . . . . . . . 2-2
Windows Vista and Windows 7 Driver Installation . . . . . . . . . . 2-4
Checking the WinPV Update Client . . . . . . . . . . . . . . . . . . . . . 2-5
Installing the Power Vision on the Motorcycle . . . . . . . . . . . . . 2-9
Power Vision Tune File Management . . . . . . . . . . . . . . . . . . . 2-12
Flashing a Dynojet Pre-Configured Tune File . . . . . . . . . . . . . 2-14
Flashing a Custom Tune File . . . . . . . . . . . . . . . . . . . . . . . . 2-17
Loading a Copy of the Original Tune File or a Copy
of the Current Tune File . . . . . . . . . . . . . . . . . . . . . . . . . . . 2-19

Chapter 3 Working with WinPV
WinPV User Interface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-2
WinPV Menus . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-3
File Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-5

To Open a Power Vision Tune File (.PVT) . . . . . . . . . . . . . . . . . 3-5
To Save a Power Vision Tune File (.PVT) . . . . . . . . . . . . . . . . . 3-6
To Import a Power Commander Map File (.pvm;.djm) . . . . . . . 3-7
To Save All Values . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-9
To Save Selected Values . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-10
To Save Selected Values—Append . . . . . . . . . . . . . . . . . . . . 3-11
To Load All Values . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-12
To Load Selected Values . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-14
To Exit the WinPV Software . . . . . . . . . . . . . . . . . . . . . . . . . 3-15

WinPV User Guide

i

TA B L E O F C O N T E N T S

Edit Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-16

To Undo . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-16
To Redo . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-16
To Cut/Copy/Paste Selected Values . . . . . . . . . . . . . . . . . . . 3-16
To Smooth Selected Values . . . . . . . . . . . . . . . . . . . . . . . . . 3-16
To Interpolate Selected Values . . . . . . . . . . . . . . . . . . . . . . 3-16
To Interpolate Selected Horizontal Values . . . . . . . . . . . . . . . 3-16
To Interpolate Selected Vertical Values . . . . . . . . . . . . . . . . . 3-16
PowerVision Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-17
To View the PowerVision Information . . . . . . . . . . . . . . . . . . 3-17
To Get a Tune from the Power Vision . . . . . . . . . . . . . . . . . . 3-17
To Send a Tune to the Power Vision . . . . . . . . . . . . . . . . . . 3-18
To Get a Log from the Power Vision . . . . . . . . . . . . . . . . . . . 3-19
To Update the Tune Using the Power Vision . . . . . . . . . . . . . 3-21
To Get ECM Data from the Power Vision . . . . . . . . . . . . . . . . 3-21
To Send the Original Tune to the Power Vision . . . . . . . . . . . 3-23
To Send a Stock File to the Power Vision . . . . . . . . . . . . . . . 3-24
To Exit PC Link Mode . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-24
To Login to PowerVision Online . . . . . . . . . . . . . . . . . . . . . . 3-25
Compare Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-26
To Load a Compare File . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-26
To Close the Compare File . . . . . . . . . . . . . . . . . . . . . . . . . 3-26
To View the Active File . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-26
To View the Compare File . . . . . . . . . . . . . . . . . . . . . . . . . . 3-27
To View Delta . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-27
To Choose Cell Colors . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-27
To Show Only Differences . . . . . . . . . . . . . . . . . . . . . . . . . 3-28
To Show Delta As Percent . . . . . . . . . . . . . . . . . . . . . . . . . 3-28
To Create Difference Report . . . . . . . . . . . . . . . . . . . . . . . . 3-28
Setup Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-29
To Setup the Options . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-29
To Apply the License . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-32
View Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-33
To View the Standard Toolbar . . . . . . . . . . . . . . . . . . . . . . . 3-33
To View the Cell Math Toolbar . . . . . . . . . . . . . . . . . . . . . . . 3-33
To View the PowerVision Toolbar . . . . . . . . . . . . . . . . . . . . . 3-33
To View the Compare Toolbar . . . . . . . . . . . . . . . . . . . . . . . 3-33
To Reset the User Interface . . . . . . . . . . . . . . . . . . . . . . . . . 3-33
Help Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-34
To View the About Window . . . . . . . . . . . . . . . . . . . . . . . . . 3-34
To View the Power Vision Help Files . . . . . . . . . . . . . . . . . . . 3-34
WinPV Toolbar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-35
Standard Toolbar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-35
PowerVision Toolbar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-36
Cell Math Toolbar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-37
Compare Toolbar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-38
Customizing the Toolbars . . . . . . . . . . . . . . . . . . . . . . . . . . 3-39

ii
WinPV User Guide

TA B L E O F C O N T E N T S

Tune Items . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-40

Tune Info . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-43
Airflow . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-43
Environment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-46
Fuel . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-48
Closed Loop . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-50
Gear . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-50
Limits and Switches . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-51
Spark . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-52
Table . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-54
Status Bar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3-55

Chapter 4 Working with Power Vision
Power Vision Menus . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-2
Program Vehicle Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-4

To Load a Dynojet Pre-Configured Tune File . . . . . . . . . . . . . . 4-4
To Load a Custom Tune File . . . . . . . . . . . . . . . . . . . . . . . . . 4-8
To Load a Copy of Original Tune File . . . . . . . . . . . . . . . . . . 4-11
To Load a Copy of Current Tune File . . . . . . . . . . . . . . . . . . . 4-14
To Edit a Tune File . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-17
To Check the ECM Status . . . . . . . . . . . . . . . . . . . . . . . . . . 4-18
To View Live Idle . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-18
To Enable AutoTune . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-19
To Start an AutoTune Session . . . . . . . . . . . . . . . . . . . . . . . 4-22
To Export a Learned Tune . . . . . . . . . . . . . . . . . . . . . . . . . . 4-26
To Load a Custom Tune File—AutoTune . . . . . . . . . . . . . . . . 4-28
To Edit AutoTune Settings . . . . . . . . . . . . . . . . . . . . . . . . . . 4-30
To Configure Quick Tune . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-35
Datalog Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-40
To View Gauges . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-40
To Create Gauge Limits and Visual Warnings . . . . . . . . . . . . . 4-42
To Playback a Log . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-46
To View Signals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-47
To Select a Datalog Theme . . . . . . . . . . . . . . . . . . . . . . . . . 4-49
To Reset Trip/Economy A . . . . . . . . . . . . . . . . . . . . . . . . . . 4-50
To Reset Trip/Economy B . . . . . . . . . . . . . . . . . . . . . . . . . . 4-50
To Create a Log with Power Vision . . . . . . . . . . . . . . . . . . . . 4-50
To Return to the Power Vision Main Menu . . . . . . . . . . . . . . . 4-50
Vehicle Tools Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-51
To View Vehicle Info . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-51
To View Stored DTC’s . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-52
To Reset Trims . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-53
To Read ECM . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-54
To Restore Original Tune . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-55
To Return to the Power Vision Main Menu . . . . . . . . . . . . . . . 4-55

Version 8

WinPV User Guide

iii

TA B L E O F C O N T E N T S

Settings Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-56

To Select the Units . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-56
To Change the Brightness . . . . . . . . . . . . . . . . . . . . . . . . . . 4-56
To Enter a Code . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-57
To Calibrate the Touch Screen . . . . . . . . . . . . . . . . . . . . . . . 4-57
To Flip the Power Vision Screen . . . . . . . . . . . . . . . . . . . . . . 4-58
To Return to the Power Vision Main Menu . . . . . . . . . . . . . . . 4-58
Device Info Menu. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-59
To View Information About the Power Vision . . . . . . . . . . . . . 4-59
Dealer Info Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-60
To View Information About the Dealer . . . . . . . . . . . . . . . . . 4-60
Understanding AutoTune . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-61
AutoTune Basic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4-62
AutoTune Pro and Target Tune . . . . . . . . . . . . . . . . . . . . . . 4-62
AutoTune Wideband O2 Sensor Installation Options . . . . . . . . 4-63
Changes Made During AutoTune . . . . . . . . . . . . . . . . . . . . . 4-63
AutoTune Notes and Tips . . . . . . . . . . . . . . . . . . . . . . . . . . 4-64

Index . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Index-i

iv
WinPV User Guide

CHAPTER

1

WELCOME TO DYNOJET WINPV SOFTWARE

The Software Engineers at Dynojet understand your need to attain the maximum
performance from the Harley Davidson motorcycles you evaluate and tune. For this reason,
they have developed a user-friendly interface which will allow you to easily develop new fuel
and ignition maps, record and download log files, and increase performance with the click of
a button. Whether you are new to the benefits of dyno testing and tuning or an experienced
performance leader, the Power Vision in conjunction with the WinPV software will give you
the professional results you are looking for.
WinPV Help provides information and step-by-step guidance for common tasks, as well as
descriptions of each field on each window.

Notice
Copyright ©2010-2016 Dynojet Research, Inc. All Rights Reserved.
The Dynojet logo is a trademark of Dynojet Research, Inc.
The Power Vision is approved for racing vehicle use only.
WinPV Help 2016.01.05.08
Document Part Number 98100016.08

Contacting Dynojet
Please contact us with your questions and comments. If you need assistance with an issue,
please contact Dynojet Technical Support.

Telephone
800.992.4993
Email
pvtech@dynojet.com

WinPV User Guide

1-1

CHAPTER 1

Website
www.dynojet.com
www.flashyourharley.com
Write to us
2191 Mendenhall Drive
North Las Vegas, NV 89081

Conventions
WinPV Software documentation uses consistent conventions to help you identify items. The
following table summarizes these conventions.
example of convention

description

Bold

Highlights items you can select on in the software
interface, including buttons and menus.

>

The arrow indicates a menu choice. For example,
“select File >Open” means “select the File
menu, then select the Open choice on the File
menu.”

Blue

Words highlighted in blue indicate a link.

1-2
WinPV User Guide

CHAPTER

2

GETTING STARTED

This section will guide you through installing the Power Vision drivers, checking the WinPV
Update Client, installing the Power Vision on your motorcycle, and saving a stock calibration.
This section is divided into the following categories:
• Power Vision Driver Installation, page 2-2
• Checking the WinPV Update Client, page 2-5
• Installing the Power Vision on the Motorcycle, page 2-9
• Power Vision Tune File Management, page 2-12

WinPV User Guide

2-1

CHAPTER 2
Power Vision Driver Installation

Power Vision Driver Installation
Windows XP Driver Installation
Windows Vista and Windows 7 Driver Installation

Windows XP Driver Installation
1

Using the USB cable, connect the Dynojet Power Vision to your computer.
The Found New Hardware window will open.

2

Select Yes, this time only and click Next.

3

Select Install from a list or specific location and click Next.

2-2
WinPV User Guide

GETTING STARTED
Power Vision Driver Installation

4
5
6

Select Search for the best driver in these locations.
Verify the location points to your Power Vision folder in Program Files.
Click Next.

7

Click Finish to close the wizard.

8

Continue with Checking the WinPV Update Client.

Version 8

WinPV User Guide

2-3

CHAPTER 2
Power Vision Driver Installation

Windows Vista and Windows 7 Driver Installation
Power Vision Device Drivers will be installed during software installation.
A Windows Security warning will pop up during this process.
Click Install to continue.

Note:During the installation, a notice on the bottom of your screen will appear letting
you know the status of the device driver installation progress.

2-4
WinPV User Guide

GETTING STARTED
Checking the WinPV Update Client

Checking the WinPV Update Client
The PV Update Client automatically checks for any applicable updates. The latest versions of
the Firmware, Software, Tune Database, and any Critical Updates will be displayed in the
Latest Version column. Your currently installed versions will be displayed in the Installed
Version column.
Note:Please read the Update Messages on the top of the Update Client window for any
critical updates and follow any directions given there first.
1
2
3
4
5
6

Using the USB cable, connect the Dynojet Power Vision to your computer.
Click Start on the Windows® task bar, and click All Programs.
Select PowerVision >PV Update Client.
Click Check For Updates.
Select the desired update to install.
Click Download & Install Selected Updates.

7

As the firmware and tune database downloads are completed, click OK to complete.

8

As the software and update client downloads are completed, click OK to begin the
software download.
Note:The Update Client needs to be restarted for any further updates.
The Welcome to the Power Vision Software Setup Wizard window will appear.

Version 8

WinPV User Guide

2-5

CHAPTER 2
Checking the WinPV Update Client

9

Click Next to continue.

10 Carefully read the Power Vision software license agreement, check the accept box, and
click Next to continue.
To install the Power Vision software, you must accept this agreement. If you do not,
Setup will close.

2-6
WinPV User Guide

GETTING STARTED
Checking the WinPV Update Client

The Power Vision Software Feature window will appear.
11 Click Next to continue. Dynojet recommends you do not make any changes in this
window.

Setup is ready to install the Power Vision Software.
12 Click Install to begin installation.

Version 8

WinPV User Guide

2-7

CHAPTER 2
Checking the WinPV Update Client

Note:Windows Vista and Windows 7 users—A Windows Security warning will pop up
during the installation process; this is normal. Click Install to continue.

13 The Power Vision Software update is now complete. Click Finish to exit the Setup Wizard.

2-8
WinPV User Guide

GETTING STARTED
Installing the Power Vision on the Motorcycle

Installing the Power Vision on the Motorcycle
The following installation was performed on a 2008 Harley-Davidson Night Rod. Your bike and
set-up may vary.
Note:The Power Vision may be damaged if installed improperly. To ensure safety and
accuracy in the procedures, perform the procedures as they are described.
1

Connect the PowerVision to the ECM’s diagnostic port.
The location of the diagnostic port varies depending on the model. Please refer to the
following table or consult your service manual for the exact location. Visit
www.flashyourharley.com to view the Diagnostic Connector Location Guide.
model

diagnostic connector location

2001-2016 Softail models

Diagnostic connector is located under the seat, attached
to the frame by the rear fender. This connector is light
grey in color, with a black rubber plug installed. Note:
Requires removing the seat.
2001-2011 models are J1850 using PV-1
2011-2013 CVO models are CAN using PV-2
2012-2016 models are CAN using PV-2

2004-2016 Dyna models

Diagnostic connector is located behind the left hand side
cover. This connector is light grey in color with a black
rubber plug installed.
2001-2011 models are J1850 using PV-1
2012-2016 models are CAN using PV-2

2007-2016 Sportster models
(including XR models)

Diagnostic connector is located behind the left hand side
cover. This connector is light grey in color with a black
rubber plug installed.
2007-2013 models are J1850 using PV-1
2014-2016 models are CAN using PV-2

2002-2016 V-Rod models

Diagnostic connector is located behind the right front
frame cover. This connector is light grey in color with a
black rubber plug installed. Note: Tools required to
access.
2002-2016 models are J1850 using PV-1

2002-2007 Touring models

Diagnostic connector is located behind the right hand
side cover. This connector is light grey in color with a
black rubber plug installed. Note: Requires removing
the right side saddle bag.
2002-2007 models are J1850 using PV-1

2008-2016 Touring models

Diagnostic connector is located behind the left hand side
cover. This connector is light grey in color with a black
rubber plug installed. Note: Requires removing the left
side saddle bag.
2008-2013 models are J1850 using PV-1
2014-2016 models are CAN using PV-2

2015-2016 Street models
(500 & 700)

Diagnostic connector is located behind the right hand
side cover. This connector is light grey in color with a
black rubber plug installed.
2015-2016 models are CAN using PV-2

Version 8

WinPV User Guide

2-9

CHAPTER 2
Installing the Power Vision on the Motorcycle

Note:Many models use the same style connector for accessories. The Power Vision must
be connected to the diagnostic port.

2

Route the PowerVision cable away from any moving or hot parts.
Dynojet recommends using zip ties to secure the cable to existing non-moving
components.

2-10
WinPV User Guide

GETTING STARTED
Installing the Power Vision on the Motorcycle

3

The PowerVision module may be mounted to the bike’s handlebars using Techmount
hardware.
Note:The Power Vision does not need to remain on the bike.
In this example, the Power Vision module is mounted to a 2008 Night Rod using the
Techmount bracket.
For more information on available mounting accessories visit: www.techmounts.com.

Version 8

WinPV User Guide

2-11

CHAPTER 2
Power Vision Tune File Management

Power Vision Tune File Management
There are three types of tunes that can be flashed to your ECM with the Power Vision:
• Dynojet Pre-Configured Tunes—refer to Flashing a Dynojet Pre-Configured Tune File
• Custom Tunes—refer to Flashing a Custom Tune File
• Load Copy—refer to Loading a Copy of the Original Tune File or a Copy of the Current Tune
File
Flashing your ECM with any one of these types of tunes will automatically save a backup of
your Original Tune and will permanently lock the Power Vision to your bike’s ECM.
You can flash your ECM with tunes as many times as you like, but the Power Vision will only
be permitted to flash tunes to the ECM it’s locked to. The Power Vision’s other features, like
data logging/monitoring, diagnostics, clearing adaptive values, etc. will still be available to be
used on any bike it was designed for, as well as the bike it’s locked to.

2-12
WinPV User Guide

GETTING STARTED
Power Vision Tune File Management

Any combination of the three types of tune files can be placed in the Tune Manager. There are
six slots in the Tune Manager and you can occupy a single slot or all six if you choose.
For example, you could have a Dynojet Pre-Configured Tune in Slot 1, a Custom Tune in Slot
2, and a Copy of Original Tune in Slot 3. You can think of the Tune Manager as an area that
holds the tunes, or stages them, prior to the Power Vision flashing them to your ECM. You
can overwrite the tunes that occupy the various slots at any time, or manage your tune files
in the Tune Manager by using the WinPV software.

Version 8

WinPV User Guide

2-13

CHAPTER 2
Power Vision Tune File Management

Flashing a Dynojet Pre-Configured Tune File
The Power Vision is loaded with Pre-Configured Tunes developed by Dynojet when it leaves
our facility. Dynojet makes every effort to have a tune file available for your specific
combination when you receive your Power Vision (pre-loaded in the device), but in some
cases you’ll need to use the Update Client to ensure you have the latest tunes available from
Dynojet. Refer to Checking the WinPV Update Client.
You can also visit http://www.flashyourharley.com to search our tune database and download
a tune for your combination.
Use the following steps to flash a Dynojet Pre-Configured Tune to the ECM.
1

Touch Program Vehicle >Load Tune >Dynojet Pre-Configured Tunes.
The Power Vision will automatically search for compatible tunes.

2
3

Select a Dynojet Pre-Configured Tune File to flash.
Touch Select.

2-14
WinPV User Guide

GETTING STARTED
Power Vision Tune File Management

4

Verify the tune information. If the tune information is correct, touch Continue.

5

Select a slot to save the selected tune file.
Note:If there is any data in the selected slot, it will be overwritten.

6

Touch Select.

The tune is now ready.

Version 8

WinPV User Guide

2-15

CHAPTER 2
Power Vision Tune File Management

7

Touch Flash to flash this tune to the ECM.
Note:During the flash process, do not turn off the bike. Once complete, you will be
prompted to turn the bike off for 10 seconds.
Or
Touch Edit to edit this tune.
Or
Touch Exit to exit the screen without any changes.

Note:You can edit any tune that’s loaded in the Tune Manager prior to flashing your ECM.
The Power Vision allows you to make basic adjustments to your tunes directly on the
device without using a computer. In order to gain full access to your tune files, you’ll need
to download them from the Power Vision to WinPV, our custom tuning software.

2-16
WinPV User Guide

GETTING STARTED
Power Vision Tune File Management

Flashing a Custom Tune File
Custom Tunes may or may not be pre-loaded from a reseller that specializes in custom
tuning. Dynojet does NOT load custom tunes in the Power Vision when it leaves our facility
(we load Dynojet Pre-Configured Tunes). You may also receive Custom Tunes via email that
can be uploaded to the Power Vision using WinPV, our custom tuning software.
Use the following steps to flash a Custom Tune file to the ECM.
1

Touch Program Vehicle >Load Tune >Custom Tunes.

2
3

Select a Custom Tune File to flash.
Touch Select.

Version 8

WinPV User Guide

2-17

CHAPTER 2
Power Vision Tune File Management

4

Verify the tune information. If the tune information is correct, touch Continue.

The Tune is now ready.
5

Touch Flash to flash this tune to the ECM.
Note:During the flash process, do not turn off the bike. Once complete, you will be
prompted to turn the bike off for 10 seconds.
Or
Touch Edit to edit this tune.
Or
Touch Exit to exit the screen without any changes.

Note:You can edit any tune that’s loaded in the Tune Manager prior to flashing your ECM.
The Power Vision allows you to make basic adjustments to your tunes directly on the
device without using a computer. In order to gain full access to your tune files, you’ll need
to download them from the Power Vision to WinPV, our custom tuning software.

2-18
WinPV User Guide

GETTING STARTED
Power Vision Tune File Management

Loading a Copy of the Original Tune File or a Copy of the Current Tune File
The Power Vision will allow you to load either a Copy of Current tune or a Copy of Original
tune files.
The Copy of Original tune file is a copy of the tune that was present in your ECM when the
Power Vision first locked to your ECM. In other words, it is a copy of the backup file that was
created and stored in the Power Vision. This is a great way for those who are happy with the
way their bike runs, but want access to their existing tune in order to make a few
adjustments.
The Copy of Current tune file is a copy of the current tune that has been flashed to your ECM.
Use the following steps to load and flash either a Copy of Original tune or a Copy of Current
tune file to the ECM.
1

Touch Program Vehicle >Load Tune >Load Copy.

2

Touch Load Copy of Current or Load Copy of Original.

Version 8

WinPV User Guide

2-19

CHAPTER 2
Power Vision Tune File Management

3

Select a slot to save the tune file.
Note:If there is any data in the selected slot, it will be overwritten.

4

Touch Select to continue.

The Tune is now ready.
5

Select Flash to flash this tune to the ECM.
Note:During the flash process, do not turn off the bike. Once complete, you will be
prompted to turn the bike off for 10 seconds.
Or
Touch Edit to edit this tune.
Or
Touch Exit to exit the screen without any changes.

Note:You can edit any tune that’s loaded in the Tune Manager prior to flashing your ECM.
The Power Vision allows you to make basic adjustments to your tunes directly on the
device without using a computer. In order to gain full access to your tune files, you’ll need
to download them from the Power Vision to WinPV, our custom tuning software.

2-20
WinPV User Guide

CHAPTER

3

WORKING WITH WINPV

WinPV Software is a user-friendly interface which will allow you to easily develop new fuel
and ignition maps, record and download log files, and increase performance with the click of
a button.
This section is divided into the following categories:
• WinPV User Interface, page 3-2
• WinPV Menus, page 3-3
• WinPV Toolbar, page 3-35
• Tune Items, page 3-40
• Table, page 3-54
• Status Bar, page 3-55

WinPV User Guide

3-1

CHAPTER 3
WinPV User Interface

WinPV User Interface
WinPV is designed to be user-friendly and intuitive. Once you understand the basic layout, it
will be easy to obtain information and navigate the software efficiently.
The main elements of the WinPV User Interface are:
WinPV Menus

Tune Items

WinPV Toolbar

Table

3-2
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

WinPV Menus
The menu bar displays the seven menus available in WinPV: File, Edit, PowerVision,
Compare, Setup, View, and Help. Each menu contains groups of related commands. Many
commands are followed by keyboard shortcuts.
As you use WinPV, you will develop your own working style. Maybe you will prefer to use the
mouse and menu commands or you may find that you prefer the quick access to features
provided by keyboard commands.

Use the following menus and commands with WinPV.

File Menu
To Open a Power Vision Tune File (.PVT)
To Save a Power Vision Tune File (.PVT)
To Import a Power Commander Map File (.pvm;.djm)
To Save All Values
To Save Selected Values
To Save Selected Values—Append
To Load All Values
To Load Selected Values
To Exit the WinPV Software

Edit Menu
To Undo
To Cut/Copy/Paste Selected Values
To Smooth Selected Values
To Interpolate Selected Values
To Interpolate Selected Horizontal Values
To Interpolate Selected Vertical Values

Version 8

WinPV User Guide

3-3

CHAPTER 3
WinPV Menus

PowerVision Menu
To View the PowerVision Information
To Get a Tune from the Power Vision
To Send a Tune to the Power Vision
To Get a Log from the Power Vision
To Update the Tune Using the Power Vision
To Get ECM Data from the Power Vision
To Send the Original Tune to the Power Vision
To Send a Stock File to the Power Vision
To Exit PC Link Mode
To Login to PowerVision Online

Compare Menu
To Load a Compare File
To Close the Compare File
To View the Active File
To View the Compare File
To View Delta
To Choose Cell Colors
To Show Only Differences
To Show Delta As Percent
To Create Difference Report

Setup Menu
To Setup the Options
To Apply the License

View Menu
To View the Standard Toolbar
To View the Cell Math Toolbar
To View the PowerVision Toolbar
To View the Compare Toolbar
To Reset the User Interface

Help Menu
To View the About Window
To View the Power Vision Help Files

3-4
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

File Menu
To Open a Power Vision Tune File (.PVT)
If the Tune File directory does not exist, or if you haven’t already created the Tune File
directory, you will need to create a Tune File directory in C:\Program Files\Power Vision. Once
the Tune File directory is created, you must map this folder in Setup Options. Refer to To
Setup the Options.
To open a Power Vision tune file from the Power Vision, refer to To Get a Tune from the Power
Vision.
Use the following steps to open a Power Vision tune file from your computer.
1
2
3

Select File >Open.
Select a .pvt file to open.
Click Open.

Version 8

WinPV User Guide

3-5

CHAPTER 3
WinPV Menus

To Save a Power Vision Tune File (.PVT)
If the Tune File directory does not exist, or if you haven’t already created the Tune File
directory, you will need to create a Tune File directory in C:\Program Files\Power Vision. Once
the Tune File directory is created, you must map this folder in Setup Options. Refer to To
Setup the Options.
1
2
3

Select File >Save As.
Enter a name for your tune file.
Click Save.

3-6
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

To Import a Power Commander Map File (.pvm;.djm)
1

Make sure you have a tune loaded.
You must have a copy of the original tune loaded before importing a Power Commander
map file.

2

Select Tune Info from the Tune Items manager and click Description.
If the Strategy is 9, 44, or 218, the Power Commander map file will not import. When the
existing VE tables are RPM versus MAP (KPA), you will not be able to import Power
Commander map files. The example below shows a strategy of 9 and will not work when
importing a Power Commander map file.

3
4
5

Select File >Import Power Commander Map.
Select a file to open.
Click Open.

Version 8

WinPV User Guide

3-7

CHAPTER 3
WinPV Menus

6

Click Yes to swap the Front/Rear import order.
Or
Click No to import as shown in the window.

The Import Complete window will appear. This window will explain which tables were
imported where, how many cells were switched to 14.5, and how many imported values
exceeded the VE Table range.The maximum value in a cell is 127.5. If you see 127.5 in a
cell, you know the imported Power Commander map tried to exceed that value.
7

Click OK.

3-8
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

To Save All Values
Value Files are one or more tables that are selected in WinPV. Save All Values will save all of
the value files in the open tune file into a Value File for later use.
If the Value File directory does not exist, or if you haven’t already created the Value File
directory, you will need to create a Value File directory in C:\Program Files\Power Vision.
Once the Value File directory is created, you must map this folder in Setup Options. Refer to
To Setup the Options.
1

Make sure you have a tune loaded.
You must have a tune loaded before saving values.

2
3
4

Select File >Save All Values.
Enter a name for your value file.
Click Save.

Version 8

WinPV User Guide

3-9

CHAPTER 3
WinPV Menus

To Save Selected Values
Value Files are one or more tables that are selected in WinPV. Save Selected Values will save
only the parameters selected into a Value File for later use.
If the Value File directory does not exist, or if you haven’t already created the Value File
directory, you will need to create a Value File directory in C:\Program Files\Power Vision.
Once the Value File directory is created, you must map this folder in Setup Options. Refer to
To Setup the Options.
1

Click the box next to the table or tables you would like to save.

2
3

Select File >Save Selected Values.
Enter a file name and click Save.

3-10
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

To Save Selected Values—Append
Value Files are one or more tables that are selected in WinPV. Save Selected Values Append
creates a new value file using an existing value file as a base. The value file you select
changes the cell values in the base file to any cell values that are different in the selected file.
If the Value File directory does not exist, or if you haven’t already created the Value File
directory, you will need to create a Value File directory in C:\Program Files\Power Vision.
Once the Value File directory is created, you must map this folder in Setup Options. Refer to
To Setup the Options.
Save Selected Values—Append creates a new value file using an existing value file as a base.
The value file you select changes the cell values in the base file to any cell values that are
different in the selected file.
1

Click the box next to the table you would like to save.

2
3
4

Select File >Save Selected Values—Append.
Browse to your Value File folder and select the value file you wish to append values to.
Click Open.

Version 8

WinPV User Guide

3-11

CHAPTER 3
WinPV Menus

5

Enter a name for the new value file and click Save.

6

To load the file you created, refer to To Load Selected Values.

To Load All Values
Load All Values is used for loading in all of the changes in a Value File.
If the Value File directory does not exist, or if you haven’t already created the Value File
directory, you will need to create a Value File directory in C:\Program Files\Power Vision.
Once the Value File directory is created, you must map this folder in Setup Options. Refer to
To Setup the Options.
1
2

Select File >Load All Values.
Select the .pvv file you would like to use and click Open.

3-12
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

3

Click the box next to the tune items you would like to import.
Or
Click Mark All to select all the tune items in the list.
Or
Click Mark Selected to place a check mark next to the tune items you have selected.
Or
Click Clear Selected to clear all of the check boxes.

4

Click OK to accept the changes.
Or
Click Cancel to close the window.

5

Click OK to complete the import.

Version 8

WinPV User Guide

3-13

CHAPTER 3
WinPV Menus

To Load Selected Values
Load Selected Values loads only the values from a value file that are selected in the open
tune.
If the Value File directory does not exist, or if you haven’t already created the Value File
directory, you will need to create a Value File directory in C:\Program Files\Power Vision.
Once the Value File directory is created, you must map this folder in Setup Options. Refer to
To Setup the Options.
1

Click the box next to the table you would like to load a new value file into.

2
3
4

Select File >Load Selected Values.
Browse to your Value File folder and select the value file you wish to load.
Click Open.

3-14
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

5

Click the box next to the tune items you would like to import.
Or
Click Mark All to select all the tune items in the list.
Or
Click Mark Selected to place a check mark next to the tune items you have selected.
Or
Click Clear Selected to clear all of the check boxes.

6

Click OK to accept the changes.
Or
Click Cancel to close the window.

7

Click OK to complete the import.

To Exit the WinPV Software
Select File >Exit to exit the WinPV software.

Version 8

WinPV User Guide

3-15

CHAPTER 3
WinPV Menus

Edit Menu
To Undo
Select Edit >Undo to take a step back and undo the last changes made to the tune.

To Redo
Select Edit >Redo to reverse an action you undid.

To Cut/Copy/Paste Selected Values
1
2
3
4

Select the desired values.
Select Edit >Cut to cut the selected values.
Select Edit >Copy to copy the selected values.
Select Edit >Paste to paste the copied values.

To Smooth Selected Values
Smoothing is a process that removes the sharp peaks and troughs from a data series or
surface map. Smoothing is designed to smooth data after modifications have been made.
1
2

Select the desired values. You must select at least two cells.
Select Edit >Smooth to smooth the selected values.

To Interpolate Selected Values
Interpolate is a function that applies a linear interpolation to the values within the range of
selected cells. This function will also construct new values within the range of selected cells
when surrounded by valid values (positive or negative integers).
1
2

Select the desired values. You must select at least three cells.
Select Edit >Interpolate to interpolate the selected values.

To Interpolate Selected Horizontal Values
1
2

Select the desired values. You must select at least three cells that are horizontal.
Select Edit >Interpolate Horizontal to interpolate the selected values.

To Interpolate Selected Vertical Values
1
2

Select the desired values. You must select at least three cells that are vertical.
Select Edit >Interpolate Vertical to interpolate the selected values.

3-16
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

PowerVision Menu
To View the PowerVision Information
1
2
3

Select PowerVision >PV Info or click the Info button
Click Refresh to refresh the information displayed.
Click Exit to exit the PV Info window.

.

To Get a Tune from the Power Vision
1
2
3

Select PowerVision >Get Tune from PV or click the Get Tune button
Select a tune to load.
Click OK.

Version 8

.

WinPV User Guide

3-17

CHAPTER 3
WinPV Menus

To Send a Tune to the Power Vision
1

Select PowerVision >Send Tune to PV or click the Send Tune button

2

Using the drop-down arrow, select a Custom Tune Slot on the Power Vision to send the
tune to.
Click Lock Tune to prevent a tune from being retrieved using Get Tune.
Click Disable EUAO to disable the End User Adjustable Options. This will prevent a tune
from being edited on the Power Vision.
Click OK to send the tune to the Power Vision.

3
4
5

Or
Click Cancel to close the window without changes.

3-18
WinPV User Guide

.

WO R K I N G W I T H WI N P V
WinPV Menus

To Get a Log from the Power Vision
1

Select PowerVision >Get Log from PV or click the Get Log button

2
3

Select the log file you wish to get from the Power Vision.
Click Get to get the log file from the Power Vision.

.

Or
Click Get + Delete to get and delete the log file from the Power Vision.
Or
Click Just Delete to delete the log file from the Power Vision.

Version 8

WinPV User Guide

3-19

CHAPTER 3
WinPV Menus

4

Browse to the location you wish to save your log file and click OK.

5

Click OK.
The log file is now ready to be opened with Excel.

3-20
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

To Update the Tune Using the Power Vision
Update the Tune Using the Power Vision will upgrade the tune with any new tune items that
are possibly exposed in newer Power Vision firmware that the version that this tune was
created with.
A new tune will be created, so the original tune should be saved and left alone for backup.
Note:This may render the new tune incompatible with older firmware revisions. Be sure
to save the original backup.
1
2

Select PowerVision >Update Tune Using PV.
Click Yes to continue.

To Get ECM Data from the Power Vision
Get ECM Data is for diagnostic and development purposes only. The files may not be needed
and are not generally useful unless requested by technical support.
1

Select PowerVision >Diagnostic/Test Functions >Get ECM Data (Diagnostic)

from PV or click the Get ECM Data button
.

2

Click Yes to continue.

Version 8

WinPV User Guide

3-21

CHAPTER 3
WinPV Menus

3

Select the diagnostic ECM data to get from the Power Vision and click OK.

4

Browse to the folder you want to save the diagnostic file to and click OK.

3-22
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

5

The Get ECM Data Results have been saved. Click OK.

To Send the Original Tune to the Power Vision
1
2
3

Select PowerVision >Diagnostic/Test Functions >Send Original Tune to PV.
Browse to the location of the original tune you would like to send to the Power Vision.
Select the tune file and click Open.

4

Click OK.

Version 8

WinPV User Guide

3-23

CHAPTER 3
WinPV Menus

To Send a Stock File to the Power Vision
1
2
3

Select PowerVision >Diagnostic/Test Functions >Send .STK File to PV.
Browse to the location of the stock file you would like to send to the Power Vision.
Select the stock file and click Open.

4

Click OK.

To Exit PC Link Mode
Exit PC Link Mode allows you to edit gauge features while plugged into the PC using the
supplied USB cable.
Select PowerVision >Diagnostic/Test Functions >Exit PC Link Mode.

3-24
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

To Login to PowerVision Online
PowerVision Online Licensing allows you to access and manage your license. For more
information, visit www.flashyourharley.com and download the Power Vision Tune License
Program Instructions.
Select PowerVision >PV Online Licensing or click the Get License button

Version 8

.

WinPV User Guide

3-25

CHAPTER 3
WinPV Menus

Compare Menu
To Load a Compare File
Compare file allows the individual tune items of two different tune files to be compared. The
Active file can be edited, cell values can be copied from the Compare file, and the Delta
feature can be used to change the Active file. For more information about the Delta file, refer
to To View Delta.
1
2
3

Select Compare >Load Compare or click the Load Compare button
Select a tune file to Compare.
Click Open.

.

To Close the Compare File
Select Compare >Close Compare or click the Close Compare button
close the Compare File and return to a single active tune file.

. This will

To View the Active File
Active File allows you to view the active file when comparing two tune files.
Select Compare >Active File or click the Active File button

3-26
WinPV User Guide

.

WO R K I N G W I T H WI N P V
WinPV Menus

To View the Compare File
Compare File allows you to view the loaded compare file when comparing two tune files. The
Compare File cannot be edited.
Select Compare >Compare File or click the Compare File button

.

To View Delta
Delta shows the difference between the active file and the compare file for the tune item you
have selected.
By editing the delta file, you can change the active file. For example, if one of the cells in the
delta file is 10 and you change it to 15, the corresponding cell in the active file will change by
5.
In Delta, a positive number indicates the value in the compare file is larger than the value in
the active file.
Hover the mouse pointer over a cell to view the comparison of the numbers. Active number is
first then the compare number.

Select Compare >Delta or click the Delta button

.

To Choose Cell Colors
1

Click the Cell Colors button


.

2

Using the drop-down arrow, select the cell color option from the list.
None—uses no colors.
Table Range—uses colors from blue to red based on lowest to highest numbers in the
table.
Modified—must have a compare file loaded to use.
Compare High/Low—uses colors to represent the differences between the compare files.
White is no difference while blue is the largest difference. Compare High/Low is only
available when a compare file is loaded.

Version 8

WinPV User Guide

3-27

CHAPTER 3
WinPV Menus

To Show Only Differences
Show Only Differences allows you to view only the tune items with differences in the tune
items.
Select Compare >Show Only Differences.

To Show Delta As Percent
Show Delta as Percent allows you to view the differences as a percent.
Select Compare >Show Delta As Percent.

To Create Difference Report
Create Difference Report allows you to create a text file containing the tune items and the
differences between the Active file and the Compare file.
Select Compare >Create Difference Report.

3-28
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

Setup Menu
To Setup the Options
1
2

Select Setup >Options.
To change the Units:
2a Using the drop-down arrow, select either Metric or Imperial.
2b Click OK to accept the changes.

3

To change the User Level:
3a Using the drop-down arrow, select either Basic or Pro.
3b Click OK to accept the changes.
Pro User Level will expose additional tune items and parameters which can affect the
operating condition of the vehicle.

Version 8

WinPV User Guide

3-29

CHAPTER 3
WinPV Menus

4

To create the default location where the Power Vision stock files (.stk) are stored on your
computer:
4a Create a Stock Files directory in C:\Program Files\Power Vision.
4b Click . . . to browse to the Stock Files folder you created.
4c Click OK to save the location.

3-30
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

5

To create the default location where the Power Vision tune files (.pvt) are stored on your
computer:
5a Create a Tune Files directory in C:\Program Files\Power Vision.
5b Click . . . to browse to the Tune Files folder you created.
5c Click OK to save the location.

Version 8

WinPV User Guide

3-31

CHAPTER 3
WinPV Menus

6

To create the default location where the Power Vision value files (.pvv) are stored on your
computer:
6a Create a Value Files directory in C:\Program Files\Power Vision.
6b Click . . . to browse to the Value Files folder you created.
6c Click OK to save the location.

To Apply the License
Apply License is used to enable features in the Power Vision and WinPV software that have
been provided to you by Dynojet.
Select Setup >Apply License.

3-32
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Menus

View Menu
To View the Standard Toolbar
Select View >Standard Toolbar or right-click to turn the toolbar on and off.
For more information about the Standard Toolbar, refer to Standard Toolbar.

To View the Cell Math Toolbar
Select View >Cell Math Toolbar or right-click to turn the toolbar on and off.
For more information about the Cell Math Toolbar, refer to Cell Math Toolbar.

To View the PowerVision Toolbar
Select View >PV Toolbar or right-click to turn the toolbar on and off.
For more information about the PV Toolbar, refer to PowerVision Toolbar.

To View the Compare Toolbar
Select View >Compare Toolbar or right-click to turn the toolbar on and off.
For more information about the Compare Toolbar, refer to Compare Toolbar.

To Reset the User Interface
Select View >Reset UI.

Version 8

WinPV User Guide

3-33

CHAPTER 3
WinPV Menus

Help Menu
To View the About Window
Select Help >About.

To View the Power Vision Help Files
Select Help >Contents.

3-34
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Toolbar

WinPV Toolbar
The following toolbar is always shown contains the WinPV tools. The WinPV toolbar is
grouped into four sections and each toolbar can be customized.

Standard Toolbar
PowerVision Toolbar
Cell Math Toolbar
Compare Toolbar
Customizing the Toolbars

Standard Toolbar

A description of the standard toolbar buttons and functions follows.
press this button

to
Open previously saved or stored tunes. Refer to To
Open a Power Vision Tune File (.PVT).
Save the current tune to your computer. Refer to To
Save a Power Vision Tune File (.PVT).
Cut the highlighted cell values.

Copy the highlighted cell values.

Paste the copied values.

About allows you to view information about WinPV.

Version 8

WinPV User Guide

3-35

CHAPTER 3
WinPV Toolbar

PowerVision Toolbar

A description of the Power Vision toolbar buttons and functions follows.
press this button

to
Display the Power Vision information. Refer to To View
the PowerVision Information.
Retrieve a tune from the Power Vision. The tune
information will be shown in the Tune Items. Refer to To
Get a Tune from the Power Vision.
Sends the current tune to the Power Vision. Refer to To
Send a Tune to the Power Vision.
Get ECM Data is for diagnostic and development
purposes only. The files may not be needed and are not
generally useful unless requested by technical support.
Refer to To Get ECM Data from the Power Vision.
Retrieve the log files on the Power Vision. Refer to To
Get a Log from the Power Vision.
Access and manage your license. Refer to To Login to
PowerVision Online.

3-36
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Toolbar

Cell Math Toolbar

A description of the cell math toolbar buttons and functions follows.
press this button

to
Add the numbered entered into the Value field to the
selected cells.
Subtract the numbered entered into the Value field from
the selected cells.
Divide the selected cells by the numbered entered into
the Value field.
Multiply the selected cells by the numbered entered into
the Value field.
Set changes the selected cells to the numbered entered
into the Value field.
Use the Value field to enter the number you wish to
change the selected cells by.
Percent changes the selected cells by the numbered
entered into the Value field.

Version 8

WinPV User Guide

3-37

CHAPTER 3
WinPV Toolbar

Compare Toolbar

A description of the compare toolbar buttons and functions follows.
press this button

to
Load a tune file previously saved on your computer as
the compare file. Refer to To Load a Compare File.

Close the compare file and return to a single active tune
file.

Active File allows you to view the active file when
comparing two tune files. Refer to To View the Active
File.
Compare File allows you to view the loaded compare file
when comparing two tune files. The Compare File
cannot be edited. Refer to To View the Compare File.
Show the difference between the active file and the
compare file for the tune item you have selected. Refer
to To View Delta.
Change the colors of the cells in the table. Refer to To
Choose Cell Colors.

3-38
WinPV User Guide

WO R K I N G W I T H WI N P V
WinPV Toolbar

Customizing the Toolbars
The buttons on each toolbar can be customized to suit your individual needs.
1
2
3

Click the arrow found at the end of a toolbar.
Select which toolbar you wish to customize.
Select which buttons you wish to appear or not appear on the toolbar.

Version 8

WinPV User Guide

3-39

CHAPTER 3
Tune Items

Tune Items
Tune Items shows the available values, parameters, and tables. All of these values affect the
way the vehicle performs.
Tune Items fall into one of the three categories:
• Switch—values that are either on/off, yes/no, true/false, 0/1, etc.

• Scalar—values that are a single number.

3-40
WinPV User Guide

WO R K I N G W I T H WI N P V
Tune Items

• Tables—values that are displayed in multiple columns and/or rows.

Click the plus sign (+) to expand the items; click the minus sign (-) to compress the items.
Click on the desired tune item to view that item. Many tune items are described in this
section.

Version 8

WinPV User Guide

3-41

CHAPTER 3
Tune Items

When using the compare feature, a colored flag may be visible next to certain tune items.
These visual identifiers helps you distinguish parameters that don’t match when using the
compare feature. Visual identifiers offer a quick and easy way to identify where the tune has
changed.
You must have a compare file open to use the visual identifiers. For more information about
the compare feature, refer to To Load a Compare File.
There are three visual identifiers:
• Yellow Flag—different.
• Green Flag—does not exist in the compare file, but does exist in the active file.
• Red Flag—exists in the compare file, but does not exist in the active file.

3-42
WinPV User Guide

WO R K I N G W I T H WI N P V
Tune Items

Tune Info
tune item

description

Description

This is the vehicle and ECM description. Displays Year, Make,
Model, Vin and ECM part number.

Calibration ID

This is the stock ECM calibration ID number.

Software Level

This is the ECM software.

Lambda Based

This indicates if this is a Lambda bases calibration. Not
editable.

Airflow
tune item

description

Charge Dilution Effect
(Front Cyl)

This estimates the increase in intake pressure that is due to
Charge Dilution Effect for the front cylinder.
Expressed as 0=0% and 256=~2%.

Charge Dilution Effect
(Rear Cyl)

This estimates the increase in intake pressure that is due to
Charge Dilution Effect for the rear cylinder.
Expressed as 0=0% and 256=~2%.

Charge Dilution Effect

This estimates the increase in intake pressure that is due to
Charge Dilution Effect for both cylinders.
Expressed as 0=0% and 256=~2%.

Drive By Wire Throttle
Limit vs Gear

These values are used by Drive By Wire (DBW) engine speed
governing. In most cases, these values should be changed to
255 in order to ensure the desired rev limit is actually used.
When the rev limit is approaching, DBW bikes nudge the
throttle towards this position, specified for each gear.
0=Throttle Closed, 255=Throttle Wide Open (100% TP).
Set these to 255 to remove this limit or to a value that works
with your desired rev limit.

Engine Displacement

This value is the displacement of both cylinders. When
changing engine size it's easier to ratio this value up and down
by the difference in displacement. Input the actual engine
displacement into this field. Available in pro user level only.

IAC Warm-up Steps

The Intake Air Control Warm-up Steps table is used to
maintain a stable idle during warm-up. This table determines
the initial position of the IAC motor to maintain RPM at a given
temperature. The closer this table is to the actual IAC opening
the better the idle will be. Available in pro user level only.

Version 8

WinPV User Guide

3-43

CHAPTER 3
Tune Items

tune item

description

Idle RPM

The Idle speed is controlled by the idle RPM table as a function
of engine temp. To increase idle make these values larger. To
decrease idle make these values smaller. Available in pro user
level only.
Setting Idle RPM below 900 RPM can cause oil pressure to
drop.

MAP Load Normalization

This normalizes the MAP reading to better represent LOAD, in
a range 0-100. You do a WOT run through the RPM range and
record MAP, then you set this table so that the same test
would then read 100 across the board.

MAP Tooth IVC (Front Cyl)

This defines when the primary MAP reading is taken. This
should be set to the crank tooth number near intake valve
closing for the front cylinder.

MAP Tooth IVO (Front Cyl)

This defines when the MAP reading used for Charge Dilution
Effect is taken, which smooths out the VE table at low loads.
This should be set to be the crank tooth number just before
intake valve opening for the front cylinder.

MAP Tooth Offset
(Rear Cyl)

This is how many crank teeth to offset the MAP Tooth IVC and
MAP Tooth IVO teeth for the rear cylinder. This is not editable.

MAP Default Table

The MAP Default table gives normalized VE values in the event
the MAP sensor fails.

Number of Crank Teeth

The number of reference teeth on the flywheel including the
gap. This not editable.
32=Big Twin, 24=VROD

Throttle Blade Control
(Stage II)

This is used in drive by wire systems. This table represents
the desired throttle percent as a function of RPM. Throttle
Blade Control (Stage II) is used once the throttle transition
gear has been reached. Drive by wire Harleys use two throttle
blade control tables. To use Throttle Blade Control (Stage II)
exclusively, set Throttle Transition Gear to 0.

Throttle Blade Control
(Stage I)

This is used in drive by wire systems. This table represents
the desired throttle percent as a function of RPM. Throttle
Blade Control (Stage I) is used until the throttle transition
gear has been reached. Drive by wire Harleys use two throttle
blade control tables. To use Throttle Blade Control (Stage I)
exclusively set Throttle Transition Gear to 6.

VE (Front)

The Volumetric Efficiency (Front) table is for the front cylinder
and is the table that models engine airflow so AFR can be
accurately calculated. The values in this table are influenced
by the camshaft, exhaust system, head design, engine
displacement and air filter. This is the most critical item that
must be correct in order to make the bike run correctly. To
increase fuel make the values larger. To decrease fuel make
the values smaller.

3-44
WinPV User Guide

WO R K I N G W I T H WI N P V
Tune Items

tune item

description

VE (Rear)

The Volumetric Efficiency (Rear) table is for the rear cylinder
and is the table that models engine airflow so AFR can be
accurately calculated. The values in this table are influenced
by the camshaft, exhaust system, head design, engine
displacement and air filter. This is the most critical item that
must be correct in order to make the bike run correctly. To
increase fuel make the values larger. To decrease fuel make
the values smaller.

Idle RPM Adder

This is an idle speed RPM adder. Positive values will add RPM
to the entire IDLE RPM Function, while negative values will
reduce RPM.

Throttle Table Transition
Gear

This is the gear that Throttle Blade Control Table (Stage I) will
transition to Throttle Blade Control. To use the throttle blade
control table only, change this value to 0.

DBW Throttle Position
Limit

When the Rev Limit is approaching, Drive By Wire (DBW)
bikes nudge the throttle towards this position, specified for
each gear. Set these to 100% to remove this limit or to a
value that works with your desired rev limit.

Drive By Wire Speed Limit
vs Gear

This is the speed limit for vehicle protection based on gear.
Set this to what you want the vehicle speed limit to be in
gears one through six.

Version 8

WinPV User Guide

3-45

CHAPTER 3
Tune Items

Environment
tune item

description

EITMS On Temperature

The Engine Idle Temperature Management System (EITMS)
On Temp reduces heat buildup during prolonged idling times
and controls heat buildup in two stages:
Mode 1–AFR Enrichment is activated when the engine
temperature exceeds 142°C (Sportsters 230 °C) and the
engine RPM is less than 1200 RPM.
Mode 2–Skip Fire (Big Twins only) activates if Mode 1 is active
and the engine temperature exceeds 155°C and the vehicle
speed is less than 1-2 KPH.
Note: Sportster temperatures are much higher due to the
location of the temperature sensor and only uses EITMS Mode
1 (AFR Enrichment).
When Mode 2 Skip Fire is active, additional steps are added to
the IAC. Built motors may requiring adding steps to this.

EITMS Off Temperature

The Engine Idle Temperature Management System (EITMS)
Off Temperature reduces heat buildup during prolonged idling
times and controls heat buildup in two stages:
Mode 1–AFR Enrichment is activated when the engine
temperature exceeds 142°C (Sportsters 230 °C) and the
engine RPM is less than 1200 RPM.
Mode 2–Skip Fire (Big Twins only) activates if Mode 1 is active
and the engine temperature exceeds 155°C and the vehicle
speed is less than 1-2 KPH.
Note: Sportster temperatures are much higher due to the
location of the temperature sensor and only uses EITMS Mode
1 (AFR Enrichment).
When Mode 2 Skip Fire is active, additional steps are added to
the IAC. Built motors may requiring adding steps to this.

Knock Control Minimum
Temperature

Knock Control will be activated at temperatures greater than
this setting. Set to a high value, like 310°C, to disable knock
control all the time.

Knock Control Minimum
Temperature Hysteresis

Knock Control will be de-activated at temperatures lower than
this setting. Set this to Knock Control Minimum Temperature
minus ~2°C.

Adaptive Control Enable
Temperature

Adaptive Control will be enabled at temperatures greater than
this setting. Available in pro user level only.

Adaptive Control
Maximum Temperature

Adaptive Control will be disabled at temperatures higher than
this setting. Set to a high value, like 310°C to remove the hot
limit. Also set "Adaptive Control Maximum Temperature
Hysteresis" to be 5°C below this.

3-46
WinPV User Guide

WO R K I N G W I T H WI N P V
Tune Items

tune item

description

Adaptive Control
Minimum Temperature
Hysteresis

If the engine temperature gets too cold (drops below this
setting), adaptive learning will be disabled. This is usually set
to "Adaptive Control Minimum Temperature" minus a small
amount for hysteresis, 5°C.

Adaptive Control
Maximum Temperature
Hysteresis

Adaptive Control will be re-enabled when a hot engine cools to
below this setting. This is usually set to "Adaptive Control
Maximum Temperature" minus 5°C.

Closed Loop Minimum
Temperature

Closed loop will be enabled at temperatures greater than this
setting. To disable closed loop completely, set this value to a
high temperature, like 310°C (590°F).

Closed Loop Minimum
Temperature Hysteresis

Closed loop will be disabled when the engine drops below this
temperature. This is usually set to "Closed Loop Minimum
Temperature" minus a small amount for hysteresis, 1-5°C.

Version 8

WinPV User Guide

3-47

CHAPTER 3
Tune Items

Fuel
tune item

description

Injector Size

Fuel injector flow base value in grams per second. This value
will need to be changed for larger injectors. 1 gram per
second equals 7.94 pounds per hour. 1 pound per hour equals
0.126 grams per second. Available in pro user level only.
Example 1: injectors that are 4.35 grams per second are 34.5
pounds per hour. Multiply 4.35 x 7.94 = 34.5.
Example 2: injectors that are 42 pounds per hour are 5.29
grams per second. Multiply 42 x 0.126 = 5.29.

Air-Fuel Ratio (Lambda)

The main Lambda table directly controls fuel delivered to the
engine. Values at or near the stoichiometric ratio for gasoline
(14.64:1, which is equivalent to a lambda value of 1) will yield
the best fuel economy. Lower values will result in a richer
condition, which is required for higher load/higher RPM
ranges. The preferred values for best power and torque are
between .86 and .92 depending on the engine combination.
Normally, using values between .98 and 1.02 allows the ECM
to maintain closed loop fuel control.
Example: lambda of 1=14.64 AFR for gas. Lambda of
.89=13:1 AFR (14.64x.89=13.02).
Note: Lambda is independent of fuel type.

Acceleration Enrichment

Acceleration Enrichment mode can be triggered by a sudden
change in throttle position or an increase in MAP pressure. To
increase the fuel delivered, increase the values.

Air-Fuel Ratio (Stoich)

The main Air-Fuel table directly controls fuel delivered to the
engine. Values at or near the stoichiometric ratio for gasoline
(14.64:1) will yield the best fuel economy. Lower values will
result in a richer condition, which is required for higher
load/higher RPM ranges. The preferred values for best power
and torque are between 12.6 and 13.4 depending on the
engine combination.
Using a value of 14.6 enables the ECM’s ability to maintain
closed loop fuel control.

Cranking Fuel

Cranking Fuel is a multiplier based on engine temperature. A
larger number will supply more fuel during the cranking cycle.
A smaller number will reduce the amount of cranking fuel
during the cranking cycle. Cranking Fuel only applies to
starting the engine (when the starter is active).

Deceleration Enleanment

Deceleration Enleanment mode can be triggered by a sudden
decrease in throttle position or MAP pressure. To increase the
fuel delivered on deceleration, decrease the value. To reduce
the amount of fuel delivered increase the value.

3-48
WinPV User Guide

WO R K I N G W I T H WI N P V
Tune Items

tune item

description

PE Air Fuel Ratio
(Lambda/Stoich)

Power Enrichment mode is active at higher RPMs and when
the throttle position is greater than 95 percent. The purpose
of PE mode is to operate the engine at maximum torque AFR
and spark values for a short time, then adjust to more
conservative values to reduce engine temperature. Available
in pro user level only.

Warmup Enrichment
(Lambda)

The warm up enrichment table adds additional fuel after start
up. The fuel from this table decays out over time. The table is
activated only once per key-on. If the engine stalls and is
restarted without cycle in the ignition, enrichment continues
from its value when the stall occurred.

Warmup Enrichment
(Stoich)

The warm up enrichment table adds additional fuel after start
up. The fuel from this table decays out over time, and it is
only active for 20 to 30 seconds. The table is activated only
once per key-on. If the engine stalls and is restarted without
cycle in the ignition, enrichment continues from its value when
the stall occurred.

Acceleration Enrichment
Multiplier

This will determine the total amount of fuel to add during
rapid changes in acceleration. To "globally" increase the
amount of fuel added during acceleration enrichment increase
this vale. To reduce the amount of fuel delivered decrease this
value. Available in pro user level only.

Deceleration Enrichment
Multiplier

This will determine the total amount of fuel to add or reduce
during rapid changes in acceleration. To "globally" increase
the amount of fuel added during deceleration enrichment
decrease this vale. To reduce the amount of fuel delivered
increase this value. Available in pro user level only.

MPG Adjustment

This adjusts the MPG readout for the bike. Higher values show
a higher MPG, lower values show lower MPG.

Injector Gas Constant

This is a constant used internally for fuel injector calculations.
It is not advised to change this value.

Version 8

WinPV User Guide

3-49

CHAPTER 3
Tune Items

Closed Loop
tune item

description

Closed Loop Bias Front

The closed loop bias table is used to adjust the closed loop
AFR. Setting the value in this table to 450 mV will result in a
closed loop AFR of 14.68; increasing the value will give a
richer mixture and decreasing the value will give a leaner
mixture. Available in pro user level only.

Closed Loop Bias Rear

The closed loop bias table is used to adjust the closed loop
AFR. Setting the value in this table to 450 mV will result in a
closed loop AFR of 14.68; increasing the value will give a
richer mixture and decreasing the value will give a leaner
mixture. Available in pro user level only.

Closed Loop Bias

This is the amount that the O2 sensors will control to above or
below Stoich (14.68 A/F ration for gasoline). Setting the value
in this table to 450 mV will result in a closed loop AFR of
14.68; increasing the value will give a richer mixture and
decreasing the value will give a leaner mixture.

Closed Loop Lambda
Range

This is the Min and Max range of Lambda the ECM uses when
operating in closed loop. A value above 1.01 will allow the
ECM to learn a leaner rage for closed loop. A value lower than
.98 will allow the ECM to operate at a richer range for closed
loop.

Gear
tune item

description

Speedometer Calibration

This is the ratio the bike has in it from the factory. This must
be changed to the new ratio when changing tire size. This
value is Pulses Per 1/125th KM.

Gear Ratios

This represents the gear ratios of the transmission.

3-50
WinPV User Guide

WO R K I N G W I T H WI N P V
Tune Items

Limits and Switches
tune item

description

RPM Limit

Set these values to the RPM at which the rev limiter will
engage. 6200 RPM is common for most 96ci to 103ci
combinations; 10250 RPM for VROD.

EITMS

This tells the ECM if the vehicle has a Engine Idle Temperature
Management System. A value of zero means this vehicle does
not have this feature, or shuts off the input to the ECM.
Available in pro user level only.

Knock Control

This tells the ECM if the vehicle has Knock Control. A value of
zero means this vehicle does not have this feature, or shuts
off the knock control to the ECM. A value of one means this
vehicle does have this feature and the ECM will attempt to
control knock.

Adaptive Control

This switch enables or disables Adaptive control. When in
closed-loop the ECM will adapt to engine and environmental
changes to maintain a consistent AFR. This works by the ECM
first using the VE table to calculate how much fuel to deliver to
hit the targeted AFR value. It then uses the O2 sensors to
determine what the AFR actually is. If there is a difference,
the ECM makes an adjustment and stores the difference in the
adaptive fuel table. The Adaptive Fuel table will develop a
correction profile that is applied to the fuel calculation for each
load region. These values are saved in the ECM's memory and
will be reloaded each time the bike is started. A value of zero
(0) disables adaptive control. A value of one (1) enables
adaptive control.

PE Enable RPM

Power Enrichment Mode will be activated at RPMs greater than
this setting. To disable PE, set this value to your RPM limit or
greater than your RPM limit.

Active Exhaust

This tells the ECM if the vehicle has active exhaust control. A
value of zero means this vehicle does not have this feature, or
shuts off the input to the ECM. Available in pro user level only.

Active Intake

This tells the ECM if the vehicle has active intake. A value of
zero means this vehicle does not have this feature, or shuts
off the input to the ECM. Available in pro user level only.

Active Compression
Release

This tells the ECM if the vehicle has active compression
release. A value of zero means this vehicle does not have this
feature, or shuts off the input to the ECM. Available in pro
user level only.

Heated O2 Sensors

This tells the ECM if the vehicle has heated O2 sensors. A
value of zero means this vehicle does not have this feature, or
shuts off the input to the ECM. Available in pro user level only.

PE Enable TPS

Power Enrichment Mode will be activated if TPS is greater than
this setting. Available in pro user level only.

Version 8

WinPV User Guide

3-51

CHAPTER 3
Tune Items

tune item

description

PE Disable TPS

Power Enrichment Mode will be disabled if TPS is less than this
setting. Available in pro user level only.

PE Disable RPM

Power Enrichment Mode will be disabled at RPMs less than this
setting. Available in pro user level only.

Closed Loop

For closed-Loop capable calibration, set this to off to disable
closed-loop control.

Spark
tune item

description

PE Spark

Power Enrichment mode is active at higher RPMs and when
the throttle position is greater than 95 percent. This table is
desired spark over time. The purpose of PE mode is to operate
the engine at maximum torque AFR and spark values for a
short time, then adjust to more conservative values to reduce
engine temperature. Available in pro user level only.

Spark Advance (Front)

There are two spark tables, one for each cylinder. This is
because the rear cylinder runs hotter than the front and
therefore has different timing requirements. The X-axis is KPA
the Y-Axis is RPM. Set these values to the spark advance you
would like the bike to operate at. Available in pro user level
only.

Spark Advance (Rear)

There are two spark tables, one for each cylinder. This is
because the rear cylinder runs hotter than the front and
therefore has different timing requirements. The X-axis is KPA
the Y-Axis is RPM. Set these values to the spark advance you
would like the bike to operate at. Available in pro user level
only.

Max Knock Retard

This is the maximum amount of knock retard the ECM will
allow. Available in pro user level only.

Adaptive Knock Retard

The Delphi ECM utilizes Adaptive Spark Control based on
information received from the knock detection system. This
system learns retard values to apply when knock is detected.
At each key-on the remembered values will be reduced
towards zero. This gradually clears out the learned knock
value to adapt changes in conditions. Available in pro user
level only.

Closed Throttle Spark
(Front)

This is the spark to run when the throttle is closed. This table
can be modified to allow the engine to run at different spark
values when the throttle is closed. This table will replace the
spark advance table and any temperature corrections when
the throttle is closed.

3-52
WinPV User Guide

WO R K I N G W I T H WI N P V
Tune Items

tune item

description

Closed Throttle Spark
(Rear)

This is the spark to run when the throttle is closed. This table
can be modified to allow the engine to run at different spark
values when the throttle is closed. This table will replace the
spark advance table and any temperature corrections when
the throttle is closed.

Spark Adjust By Air Temp

Spark gets adjusted by this value to compensate for air
temperature.

Spark Adjust By Engine
Temp

Spark gets adjusted by this value to compensate for engine
temperature.

Spark Adjust By Head
Temp

Spark gets adjusted by this value to compensate for head
temperature.

Version 8

WinPV User Guide

3-53

CHAPTER 3
Table

Table
The Table displays the item chosen in Tune Items.
The table is also displayed as a 3-D representation below the table.
1
2

Click one cell to select it.
Click and hold the mouse button while dragging to select multiple cells.
Selected cells will appear with cross-hairs in the graphical display in the 3-D
representation below the table.

3

4

Select a cell or group of cells, copy those values, and paste those values in different
cell(s). For more information about changing cell values, refer to To View the Cell Math
Toolbar.
You may also select a cell or group of cells and type values into those cells. For more
information about changing cell values, refer to To View the Cell Math Toolbar.

3-54
WinPV User Guide

WO R K I N G W I T H WI N P V
Status Bar

Status Bar
The Status Bar shows the status of the connected device.

Version 8

WinPV User Guide

3-55

CHAPTER

4

WORKING WITH POWER VISION

The Power Vision incorporates a very sophisticated, yet simple touch screen display that does
not require the use of a computer to flash your bike. Simply select the tune and follow the
on-screen prompts to download the tune, and if you'd like, edit your tune without ever
touching a computer! Anyone of the three types of tunes outlined below is able to be edited
on the device, or in the WinPV Tuning Application. Power Vision downloads and stores the
stock calibration, allows you to select up to five different tunes that are stored on the device,
and can be flashed to your bike. The types of tunes include:
Dynojet Pre-configured Tunes—Tunes for YOUR bike pre-loaded on the device…….ready to go,
right out of the box! Power Vision identifies your bike's information and automatically sorts
hundreds of applicable dyno proven tunes for you to choose from.
Custom Tunes—loaded by a custom tuning shop, or received via email and loaded on the
device.
Copy of Stock—a version of the stock calibration that is editable.
Power Vision provides insightful, valuable information on how your bike is running.
• Display all J1850 H-D vehicle data, H-D CAN vehicle data, as well as wideband AFR and
various calculated channels (such as MPG instant and trip MPG).
• Customizable virtual gauges allow data to be monitored live, and/or logged while
riding.
• User defined visual alarms for any data channel (example, if knock exceeds two
degrees, or if Cylinder Head Temp exceeds 280°F, enable visual alarm).
• AutoTune Basic and Pro—calculates and stores fuel trims to optimize fuel curve.
• Check and clear diagnostic codes.
• Reset adaptive fuel trims and idle offset.
This section is divided into the following categories:
• Power Vision Menus, page 4-2
• Understanding AutoTune, page 4-61

WinPV User Guide

4-1

CHAPTER 4
Power Vision Menus

Power Vision Menus

Program Vehicle Menu
To Load a Dynojet Pre-Configured Tune File
To Load a Custom Tune File
To Load a Copy of Original Tune File
To Load a Copy of Current Tune File
To Edit a Tune File
To Check the ECM Status
To View Live Idle
To Enable AutoTune
To Start an AutoTune Session
To Export a Learned Tune
To Load a Custom Tune File—AutoTune
To Edit AutoTune Settings
To Configure Quick Tune

4-2
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

Datalog Menu
To View Gauges
To Create Gauge Limits and Visual Warnings
To Playback a Log
To View Signals
To Reset Trip/Economy A
To Reset Trip/Economy B
To Create a Log with Power Vision
To Return to the Power Vision Main Menu

Vehicle Tools Menu
To View Vehicle Info
To View Stored DTC’s
To Reset Trims
To Read ECM
To Restore Original Tune
To Return to the Power Vision Main Menu

Settings Menu
To Select the Units
To Change the Brightness
To Enter a Code
To Calibrate the Touch Screen
To Flip the Power Vision Screen
To Return to the Power Vision Main Menu

Device Info Menu
To View Information About the Power Vision

Dealer Info Menu
To View Information About the Dealer

Version 8

WinPV User Guide

4-3

CHAPTER 4
Power Vision Menus

Program Vehicle Menu
The Power Vision accepts custom tune files created in WinPV and pre-loaded Dynojet tunes
installed in the Power Vision memory from Dynojet Research. To flash or edit tune files, the
Power Vision must be married to the ECM. Marrying the Power Vision to the ECM locks the
Power Vision module to that ECM and prevents a single device from being used on multiple
ECMs. You cannot unlock a Power Vision from a married ECM. Once the marriage process is
complete, you can open the stored calibration in the WinPV software to edit all parameters or
change Dynojet specific functions on the device.

To Load a Dynojet Pre-Configured Tune File
Use the following steps to load a Dynojet pre-configured tune file to the ECM.
1
2
3

Turn the ignition key to the On position.
Verify the Run/Off switch is in the Run position.
Touch Program Vehicle >Load Tune >Dynojet Pre-Configured Tunes.

4-4
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

4
5

Touch a Dynojet tune file to load.
Touch Select to continue with the selected Dynojet tune file.
Or
Touch Cancel to abort the process and return to the load tune screen.

6

Verify the Tune information. If the Tune information is correct, touch Continue.

Version 8

WinPV User Guide

4-5

CHAPTER 4
Power Vision Menus

7

Touch a slot to save the selected tune file.
Note:If there is any data in the selected slot, it will be overwritten.

8

Touch Select to continue with the selected slot.
Or
Touch Cancel to abort the process and return to the tune manager.

9

Touch OK to continue.
A copy of the Dynojet tune will be saved.
Or
Touch Cancel to abort the process and return to the tune manager.

The tune is now ready.

4-6
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

10 Touch Flash to send the file to the ECM.
Or
Touch Edit to edit the tune file on the Power Vision.
Or
Touch Exit to exit the screen without any changes.

11 Touch OK.
12 Turn the ignition key off and wait ten seconds.

Version 8

WinPV User Guide

4-7

CHAPTER 4
Power Vision Menus

To Load a Custom Tune File
The Power Vision accepts custom tune files created in the WinPV software or by Dynojet
dealers.
Use the following steps to load a custom tune file to the ECM.
1
2
3

Turn the ignition key to the On position.
Verify the Run/Off switch is in the Run position.
Touch Program Vehicle >Load Tune >Custom Tunes.

4
5

Touch a Custom tune file to load.
Touch Select to continue with the selected Custom tune file.
Or
Touch Cancel to abort the process and return to the tune file screen.

4-8
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

6

Touch a slot to save the selected tune file.
Note:If there is any data in the selected slot, it will be overwritten.

7

Touch Select to continue with the selected slot.
Or
Touch Cancel to abort the process and return to the tune manager.

8

Touch OK to continue.
Or
Touch Cancel to abort the process and return to the tune manager.

The tune is now ready.

Version 8

WinPV User Guide

4-9

CHAPTER 4
Power Vision Menus

9

Touch Flash to send the file to the ECM.
Or
Touch Edit to edit the tune file on the Power Vision.
Or
Touch Exit to exit the screen without any changes.

10 Touch OK.
11 Turn the ignition key off and wait ten seconds.
12 Turn the ignition key back on.

4-10
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To Load a Copy of Original Tune File
Use the following steps to load a copy of the original tune file to the Power Vision. The
original tune file is the tune that was saved when the Power Vision married to the ECM.
1
2
3

Turn the ignition key to the On position.
Verify the Run/Off switch is in the Run position.
Touch Program Vehicle >Load Tune >Load Copy.

4

Touch Load Copy of Original.
This will load a copy of the original tune into the Tune Manager. Once loaded into a slot, it
will be converted into a custom tune which can be edited and/or flashed to the ECM.

Version 8

WinPV User Guide

4-11

CHAPTER 4
Power Vision Menus

5

Touch OK.
The Power Vision and the bike are now married.

6

Touch OK.

7

Touch a slot to save the selected tune file.
Note:If there is any data in the selected slot, it will be overwritten.

8

Touch Select to continue with the selected slot.
Or
Touch Cancel to abort the process and return to the tune manager.

9

Touch OK.
A copy of the stock tune will be saved.

10 Touch OK to continue.
Or
Touch Cancel to abort the process and return to the tune manager.

4-12
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

The tune is now ready.
11 Touch Flash to send the file to the ECM.
Or
Touch Edit to edit the tune file on the Power Vision.
Or
Touch Exit to exit the screen without any changes.

Version 8

WinPV User Guide

4-13

CHAPTER 4
Power Vision Menus

To Load a Copy of Current Tune File
Use the following steps to load a copy of the current tune file to the Power Vision. The current
tune file is the tune that is currently in the ECM.
1
2
3

Turn the ignition key to the On position.
Verify the Run/Off switch is in the Run position.
Touch Program Vehicle >Load Tune >Load Copy.

4

Touch Load Copy of Current.
This will load a copy of the current tune into the Tune Manager. Once loaded into a slot, it
will be converted into a custom tune which can be edited and/or flashed to the ECM.

4-14
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

5

Touch OK.
The Power Vision and the bike are now married.

6

Touch OK.

7

Touch a slot to save the selected tune file.
Note:If there is any data in the selected slot, it will be overwritten.

8

Touch Select to continue with the selected slot.
Or
Touch Cancel to abort the process and return to the tune manager.

9

Touch OK.
A copy of the current tune will be saved.

10 Touch OK to continue.
Or
Touch Cancel to abort the process and return to the tune manager.

Version 8

WinPV User Guide

4-15

CHAPTER 4
Power Vision Menus

The tune is now ready.
11 Touch Flash to send the file to the ECM.
Or
Touch Edit to edit the tune file on the Power Vision.
Or
Touch Exit to exit the screen without any changes.

4-16
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To Edit a Tune File
Edit Tune allows you to edit Dynojet Tune, Custom Tune, or Copy of Stock Tune files directly
on the Power Vision.
Use the following steps to edit a tune on the Power Vision.
1
2
3
4
5

Turn the ignition key to the On position.
Verify the Run/Off switch is in the Run position.
Touch Program Vehicle >Edit Tune.
Touch a tune slot to edit.
Touch Select to use the selected slot.
Or
Touch Cancel to abort the process and return to the tune manager.

6
7

Touch parameters to edit.
Touch Select to edit a parameter.
Or
Touch Cancel to abort the process and return to the tune manager.

8
9

Enter a new value in field.
Touch Save to save the new value.
Or
Touch Cancel to abort the process and return to the tune manager.

10 Touch Yes to confirm the change.
Or
Touch No to cancel the change.
11 Touch Yes to save the changes.
Or
Touch No to cancel the change.
12 Touch OK to complete the procedure.
Note:For changes to be applied you must flash the edited tune file to the ECM.

Version 8

WinPV User Guide

4-17

CHAPTER 4
Power Vision Menus

To Check the ECM Status
Status allows you to verify the connection status between the Power Vision and the ECM.
Use the following steps to check the status.
1
2

Touch Program Vehicle >Status.
Touch Back to return to the Power Vision main menu.

To View Live Idle
Live Idle allows you to view and adjust the idle.
Use the following steps to view the idle.
1
2
3

Touch Program Vehicle >Live Idle.
Set your desired idle.
Touch Exit to return to the Power Vision main menu.

4-18
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To Enable AutoTune
For more information about AutoTune, refer to Understanding AutoTune.
Use the following steps to enable AutoTune.
1

Touch Program Vehicle >AutoTune.

Note:Verify the Setting for AutoTune is correct for your model of motorcycle. Refer to To
Edit AutoTune Settings.
2

Touch Enable AT.

Version 8

WinPV User Guide

4-19

CHAPTER 4
Power Vision Menus

3
4

Touch a tune file to load.
Touch Select to continue with the selected tune file.
Or
Touch Cancel to abort the process and return to the program vehicle menu.

5

Select an AutoTune mode from the list. and touch Select.
No O2 Sensors—not currently used.
Basic/OEM Narrowbands—uses factory O2 sensors.
Pro/Dynojet AT2 Wideband Kit—uses Dynojet AutoTune Pro kit with Wideband O2
sensors.
Dynojet Target Tune Wideband Kit—uses Target Tune kit with Wideband O2 sensors.

6

Touch Select to continue.
Or
Touch Cancel to abort the process and return to the tune manager.

4-20
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

7

Touch Continue to send the file to the ECM or touch Cancel to exit the screen without
any changes.
The tune is modified to be compatible with the mode you chose from above.
Note:The Power Vision must be connected to the vehicle with the key and run switch in
the on position with the engine not running.
WARNING!Do not turn off the ignition or interrupt the power during this
process. This can cause irreversible damage to the ECM.

8

Once the process is complete, you will be prompted to turn the key off and wait ten
seconds. Touch OK.
9 Turn the ignition key off and wait ten seconds.
10 Turn the ignition key back on.
AutoTune is set up.

Version 8

WinPV User Guide

4-21

CHAPTER 4
Power Vision Menus

To Start an AutoTune Session
You can define when AutoTune is active by adjusting various settings. For more information,
refer to To Edit AutoTune Settings. For more information about AutoTune, refer to
Understanding AutoTune.
The values learned during the AutoTune process will automatically save:
• Every five minutes
• When the vehicle comes to a stop during a drive cycle
The values learned during the AutoTune process will also save when you:
• Press the mode button
• Turn datalogging on or off
• Exit the green screen
• Disable AutoTune
Use the following process to start an AutoTune session.
Touch Program Vehicle >AutoTune >Datalog.

4-22
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

AutoTune is now active and will start learning anytime you are in the AutoTune Datalogger
screen (shown below). The AutoTune Datalogger screen indicates the learning process is
active and you're on your way to perfecting your tune.
Note:You have the option to create a log file by touching Log Start to log channels
required for Log Tuner. You do not need to select Log Start in order to start the AutoTune
process.

AutoTune Datalogger monitors various operating conditions to ensure you're ready to
start auto tuning and whether or not you're in a state to allow learning. A large message
will overlay the screen to indicate the condition that's currently preventing learning. Refer
to AutoTune Datalogger Operating Conditions for a list of conditions.

Version 8

WinPV User Guide

4-23

CHAPTER 4
Power Vision Menus

AutoTune Datalogger Operating Conditions
The following table lists the various AutoTune Datalogger operating conditions and a
description of each condition.
condition

description

No Connection

The ECM is not responding.

ET:!

The engine temperature is not reading.

ET:L

The engine temperature is too low.

ET:H

The engine temperature is too high.

WARMUP:

The ECM is still using warm up tables.

AE:

The ECM is using acceleration enrichment tables.

RPM:!

The engine speed is not reading.

RPM:L

The engine speed is too low.

RPM:H

The engine speed is too high.

WBF:!

The Wideband O2 sensor (front) is not ready.

WBF:L

The Wideband O2 sensor (front) too low (less than
lambda 0.68). This is usually during warm up.

WBF:H

The Wideband O2 sensor (front) too high (over lambda
1.22). This is usually during heavy deceleration.

WBR:!

The Wideband O2 sensor (rear) is not ready.

WBR:L

The Wideband O2 sensor (rear) too low (less than
lambda 0.68). This is usually during warm up.

WBR:H

The Wideband O2 sensor (rear) too high (over lambda
1.22). This is usually during heavy deceleration.

NBF:!

The OEM narrowband sensor (front) is not ready.

NBF:O

The OEM narrowband sensor (front) in open loop.

NBR:!

The OEM narrowband sensor (rear) is not ready.

NBR:O

The OEM narrowband sensor (rear) in open loop.

VE:!

Unable to match current conditions to a VE table cell.

VE:+

The conditions are changing too rapidly or moving
between VE table cells.

MAP:L

The map sensor is reading too low (usually
deceleration). Map <20 KPA.

4-24
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

AutoTune Datalogger Modes
The following table lists the various AutoTune Datalogger modes and a description of each
mode.
Note:Dynojet recommends viewing AutoTune Datalogger modes only while on a dyno.

Version 8

mode

description

HITS

Shows the length of time spent in each VE cell.
Shows the entire VE table at once.

VEFront

Shows the VE front table as stored in the tune.

VERear

Shows the VE rear table as stored in the tune.

LVE-F

Learned VE front.

LVE-R

Learned VE rear.

LCOR-F

Learned correction to VE front (in percent).

LCOR-R

Learned correction to VE rear (in percent).

RT

Real Time is the same as HITS but zooms in and
slides the VE table around as you drive allowing
you to target in on cells better.

WinPV User Guide

4-25

CHAPTER 4
Power Vision Menus

To Export a Learned Tune
Version 1.0.15-1184 of the Power Vision analyzes the learned values ensuring you do not
exceed the maximum allowed value for any cell in the VE tables (127.5). For more
information about AutoTune, refer to Understanding AutoTune.
Use the following steps to export learned data from the AutoTune process to a new tune in
the tune manager that can be flashed to the ECM.
1

From the AutoTune Session screen, touch Export Learned.

Note:Step #2 will only apply if your tuning session yields learned data that reaches the
upper limit of the VE table.
2

Touch Scale to allow the Power Vision AutoTune feature to auto scale the necessary
values in your tune to avoid reaching the maximum allowed VE values. This will increase
the engine displacement, decrease VE cells, then make the desired AutoTune changes.
Or
Touch Cap to proceed with the export and understand that some of the required
corrections could not be made to your tune.
Or
Touch Exit to exit the screen without any changes.

4-26
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

3

Touch Continue to apply all learned values to the tune and save it to a Custom Tune slot.

4

Touch a slot to save the tune file.
Note:If there is any data in the selected slot, it will be overwritten.

5

Touch Select to continue with the selected slot.
Or
Touch Cancel to abort the process.

6

Touch OK to continue.
A copy of the tune will be saved.
These are full tunes/calibrations, not just the values learned. This is a version of the tune
you started with but the VE (and potentially spark tables) will be modified.

Version 8

WinPV User Guide

4-27

CHAPTER 4
Power Vision Menus

It is time to flash the ECM with the new tune you just saved to the tune manager. Once the
new tune has been flashed to the ECM, you can ride the bike to feel the results or engage in
another tuning session to continue to refine your custom tune. If you do not flash a tune to
the ECM, you will still be running on a tune set up by the AutoTune feature.
7

Exit to the Main Menu and load your custom tune. Refer to To Load a Custom Tune File—
AutoTune.

To Load a Custom Tune File—AutoTune
For more information about AutoTune, refer to Understanding AutoTune.
1
2
3

Turn the ignition key to the On position.
Verify the Run/Off switch is in the Run position. Do not start the engine.
Touch Program Vehicle >Load Tune >Custom Tune.

4-28
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

4

Touch the last tune you saved to the Tune Manager. This will be the tune that contains the
AutoTune corrections.
Note:A tune saved in the Tune Manager will never have those values that are set up by
the AutoTune process included within them, only the values that were learned during the
AutoTune process.

5

Touch Select to continue with the selected tune file.
Or
Touch Cancel to abort the process and return to the custom tune screen.

6

Touch Flash to send the file to the ECM.
Note:Do not turn off the key while the Power Vision is flashing the ECM. Once the process
is complete, you will be prompted to turn the key off and wait ten seconds.

7
8
9

Touch OK.
Turn the ignition key off and wait ten seconds.
Turn the ignition key back on.
You can ride the bike with the changes from the AutoTune process or you can start a new
tuning session to continue to refine your custom tune.

Version 8

WinPV User Guide

4-29

CHAPTER 4
Power Vision Menus

To Edit AutoTune Settings
For more information about AutoTune, refer to Understanding AutoTune.
Use the following steps to edit the AutoTune settings.
1

Touch Program Vehicle >AutoTune >Settings.
Note:Changing the settings while AutoTune is active will reset all learned values.

2

Touch Continue.
Note:Changing the settings while AutoTune is active will reset all learned values.

4-30
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

3

Touch a setting to edit. In this example we will use Max Spark Learn.
To see a list of all settings and descriptions, refer to AutoTune Settings.

4

Touch Select to continue with the selected setting.
Or
Touch Exit to abort the process.

5

A description of the setting will appear. Touch Continue to edit the selected setting.
To see a list of all settings and descriptions, refer to AutoTune Settings.

Version 8

WinPV User Guide

4-31

CHAPTER 4
Power Vision Menus

6

Using the number pad, enter the value for the setting.
The numeric display will show the current value. The default value is shown under the
setting title.
In this example, 10 degrees was entered. This will enable spark tuning up to 10 degrees.

7

Touch Save to confirm the value or Cancel to return to the list of settings.

8

Touch Yes to confirm the changes.
Or
Touch No to abort the process.

4-32
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

The setting value is updated. In this example, Max Spark Learn is now 10 degrees.
9

Touch Exit to exit the Setting screen.

If you need assistance on recommended values for different families of bikes, please email
PVtech@dynojet.com.
AutoTune Settings
The following table lists the various AutoTune settings and a description of each setting.

Version 8

setting

description

Min Hit Count (ticks)

The minimum number of hits on a cell for
learning to take place.

Min VE Learn (Percent)

The minimum amount a VE cell needs to learn
before a change will take place.

Max VE Learn (Percent)

The maximum amount a VE cell is allowed to
change, in VE units. Set this to 0 to disable VE
learning.

Min Spark Learn (Degrees)

The minimum amount a Spark cell needs to
learn before a change will take place.

Max Spark Learn (Degrees)

The maximum amount, in degrees, that a
Spark cell is allowed to change. Set this to 0
to disable Spark learning. A good starting
value would 10 degrees.

Min WB Lambda (Lambda)

The richest value as measured on the
Wideband in Pro Mode that is allowed. This is
in Lambda.

Max WB Lambda (Lambda)

The leanest value as measured on the
Wideband in Pro Mode where learning is
allowed. This is in Lambda.

WinPV User Guide

4-33

CHAPTER 4
Power Vision Menus

setting

description

Min Engine Temp (DegC)

The coldest engine temperature where
learning is allowed, entered in Degrees Celsius
or Fahrenheit (depends on Power Vision Unit
Setting).

Max Engine Temp (DegC)

The maximum engine temperature where
learning is allowed, entered in Degrees Celsius
or Fahrenheit (depends on Power Vision Unit
Setting).

Min RPM (RPM)

The minimum engine speed where learning is
allowed, in RPM.

Max RPM (RPM)

The maximum engine speed where learning is
allowed, in RPM.

Min MAP (KPA)

The minimum MAP value where learning is
allowed. This is used to filter out deceleration
events.

Max MAP (KPA)

The maximum MAP value where learning is
allowed. This is usually marked as not used
and set to something high, like 120 KPA.

Default AutoTune Settings
The following table lists the default AutoTune settings for different vehicles.

setting

Big Twin including
Softail Dyna and
Touring models

V-Rod models

Sportster
models

Min Hit Count

5 ticks

5 ticks

5 ticks

Min VE Learn

0.01 percent

0.01 percent

0.01 percent

Max VE Learn

15.00 percent

15.00 percent

15.00 percent

Min Spark Learn

1.00 degrees

1.00 degrees

1.00 degrees

Max Spark Learn

0.00 degrees

0.00 degrees

0.00 degrees

Min WB Lambda

0.68 lambda

0.68 lambda

0.68 lambda

Max WB Lambda

1.22 lambda

1.22 lambda

1.22 lambda

Min Engine Temp

167°F

160°F

280°F

Max Engine Temp

300°F

230°F

410°F

Min RPM

900 RPM

1000 RPM

1000 RPM

Max RPM

6000 RPM

10000 RPM

7000 RPM

Min MAP

20 KPA

20 KPA

20 KPA

Max MAP

120 KPA

120 KPA

120 KPA

4-34
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To Configure Quick Tune
Quick Tune allows you to alter the last tune flashed to the vehicle’s ECM without requiring a
computer and WinPV software.
Note:You must flash a tune to the ECM before using Quick Tune. Once a tune is flashed to
the ECM, the tune is stored in a buffer allowing you to use the Quick Tune feature.
1
2

Touch Program Vehicle >Quick Tune.
To edit the settings in the General tab:
Use the General tab to set the Idle Offset, Rev Limit, and Reset Adaptive Fuel Tables.
2a Touch General.
2b Using the up or down arrows, increase or decrease the Idle Offset.
Idle Offset changes the RPM at which the engine will idle. A positive number
increases the idle and a negative number decreases the idle.
2c

Using the up or down arrows, increase or decrease the Rev Limit.
Rev Limit changes the RPM at which the rev limiter engages. A positive number
increases the rev limit and a negative number decreases the rev limit.

2d Click the box to reset the Adaptive Fuel Tables.
Resetting the Adaptive Fuel Tables clears the corrections the ECM has made based
on readings from the factory narrow band O2 sensors.

Version 8

WinPV User Guide

4-35

CHAPTER 4
Power Vision Menus

3

To edit the settings in the Config tab:
Use the Config tab to set the ACR (Auto Compression Release), Heated O2, VSS, Active
Intake, and Active Exhaust.
3a
3b
3c
3d
3e
3f

Touch Config.
Click the box to enable/disable ACR (Auto Compression Release).
Click the box to enable/disable Active Intake.
Click the box to enable/disable the oxygen sensor heater.
Click the box to enable/disable Active Exhaust.
Using the up or down arrows, increase or decrease the Vehicle Speed Sensor (VSS)
calibration.
This is used to calibrate the speedometer.

4-36
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

4

To edit the settings in the Tweaks tab:
Use the Tweaks tab to set Adaptive, Closed Loop, AutoTune Mode, Knock Control, and
EITMS (Engine Idle Temperature Management System).
4a
4b
4c
4d
4e

Version 8

Touch Tweaks.
Click the box to enable/disable Adaptive.
Click the box to enable/disable Knock Control.
Click the box to enable/disable Closed Loop.
Click the box to enable/disable EITMS (Engine Idle Temperature Management
System).

WinPV User Guide

4-37

CHAPTER 4
Power Vision Menus

5

To edit the settings in the Fuel tab:
Use the Fuel tab to set the fuel adjustment. The fuel adjustment range is -25 to 25%
offset of the base fuel map.
5a Touch Fuel.
5b Using the up or down arrows, set any of the six ranges of fuel adjustment.
Refer to the Fuel, Spark, and VE Ranges Table.

6

To edit the settings in the Spark tab:
Use the Spark tab to set the spark adjustment. The spark adjustment range is -5 to 5
degrees from the base timing advance map.
6a Touch Spark.
6b Using the up or down arrows, set any of the six ranges of spark adjustment.
Refer to the Fuel, Spark, and VE Ranges Table.

4-38
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

7

To edit the settings in the VE tab:
Use the VE (Volumetric Efficiency) tab to set the VE adjustment. The VE adjustment
range is -25 to 25 VE units offset from the base VE table.
7a Touch VE.
7b Using the up or down arrows, set any of the six ranges of VE adjustment.
Refer to the Fuel, Spark, and VE Ranges Table.

8 Touch Continue to apply your changes.
Fuel, Spark, and VE Ranges Table
The following table is an example of where the fuel, spark, and VE ranges are.

Version 8

WinPV User Guide

4-39

CHAPTER 4
Power Vision Menus

Datalog Menu
To View Gauges
1
2
3

Touch Datalog >Gauges.
Using the left or right arrows at the bottom of the screen, select your desired gauge
template.
Touch None, or the current gauge label, to edit the gauge properties.

4

Select None, or the current gauge label, (in the space located to the right of Signal).

4-40
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

5
6

From the device list, choose Harley or DJ Wideband2.
Touch Select to confirm your choice.
Or
Touch Cancel to return to the Set Gauge Properties screen.

7
8

From the Signal list, assign a signal.
Touch OK to confirm your selection.
Or
Touch Cancel to return to the Set Gauge Properties screen.

To edit additional gauge properties, refer to To Create Gauge Limits and Visual Warnings.
9 Touch OK to confirm the gauge properties.
10 Touch Exit to exit the Datalog menu.
11 Touch Back to return to the Power Vision main menu.

Version 8

WinPV User Guide

4-41

CHAPTER 4
Power Vision Menus

To Create Gauge Limits and Visual Warnings
1
2
3

Touch Datalog >Gauges.
Using the left or right arrows at the bottom of the screen, select your desired gauge
template.
Touch None, or the current gauge label, to edit the gauge properties.

4

Touch None, or the current gauge label, (in the space located to the right of Signal).

4-42
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

5
6

From the device list, choose Harley or DJ Wideband2.
Touch Select to confirm your choice.
Or
Touch Cancel to return to the Set Gauge Properties screen.

7
8

From the Signal list, assign a signal.
Touch OK to confirm your selection.
Or
Touch Cancel to return to the Set Gauge Properties screen.

9

To set the minimum value for the signal:
9a Touch L. Limit.
9b Using the number pad, enter the minimum value for the signal.
9c Touch Save to confirm the value or Cancel to return to the Set Gauge Properties
screen.

Version 8

WinPV User Guide

4-43

CHAPTER 4
Power Vision Menus

10 To set the maximum value for the signal:
10a Touch H. Limit.
10b Using the number pad, enter the maximum value for the signal.
10c Touch Save to confirm the value or Cancel to return to the Set Gauge Properties
screen.

11 To set the low warning value for the signal:
11a Touch L. Warning.
11b Using the number pad, enter the low warning value for the signal.
11c Touch Save to confirm the value or Cancel to return to the Set Gauge Properties
screen.

4-44
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

12 To set the high warning value for the signal:
12a Touch H. Warning.
12b Using the number pad, enter the high warning value for the signal.
12c Touch Save to confirm the value or Cancel to return to the Set Gauge Properties
screen.

13 Touch OK to confirm your changes.
Or
Touch Cancel to return to the gauge screen.
14 Touch Exit to exit the Datalog menu.
15 Touch Back to return to the Power Vision main menu.

Version 8

WinPV User Guide

4-45

CHAPTER 4
Power Vision Menus

To Playback a Log
Playback allows you to play back recorded log files saved on the Power Vision.
1
2

Touch Datalog >Playback.
Touch a log to view.

3
4
5

Touch View to view the log.
Touch Delete to delete the log.
Touch Exit to return to the Datalog menu.

4-46
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To View Signals
Signals are channels that can be logged on the Power Vision. You can add, edit, or delete
channels that are data logged.
1
2

Touch Datalog >Datalog Settings >Signals.
To edit one of the channels from the list:
2a Select a signal group to edit from the list.

2b Select a channel from the list.
2c Touch Edit to change the gauge properties for the selected channel.

Version 8

WinPV User Guide

4-47

CHAPTER 4
Power Vision Menus

2d Use the Set Global Signal Properties to set up a channel.
For more information about editing gauge properties, refer to To View Gauges and To
Create Gauge Limits and Visual Warnings.

3

To remove a channel from the list:
3a Select a channel from the list.
3b Touch Remove to delete the channel from the data logging global signal list.

4

To add a channel to the current list:
4a Touch Add to add a channel not in the current list.
4b Use the Set Global Signal Properties screen to select and set up a channel.
For more information about creating a gauge channel, refer to To View Gauges.

4-48
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

4c

5

Touch OK to return to the Data Logging Global Signals screen.

Touch Exit to return to the Datalog menu.

To Select a Datalog Theme
The Dynojet Power Vision has several datalog themes available for display.
1
2
3

Touch Datalog >Datalog Settings >Datalog Theme.
Select a theme from the list.
Touch Select to apply the theme.

Version 8

WinPV User Guide

4-49

CHAPTER 4
Power Vision Menus

To Reset Trip/Economy A
Reset Trip/Economy A resets the tripometer and fuel economy meter in the Power Vision.
Touch Datalog >Reset Trip/Eco A.

To Reset Trip/Economy B
Reset Trip/Economy A resets the tripometer and fuel economy meter in the Power Vision.
Touch Datalog >Reset Trip/Eco B.

To Create a Log with Power Vision
The Dynojet Power Vision has internal logging capabilities when monitoring gauges.
1
2
3
4
5

Touch Datalog >Gauges.
Using the left or right arrows at the bottom of the screen, select gauge you would like to
use.
Touch Start Log to begin logging.
Touch End Log to stop logging.
Touch Exit to return to the Datalog menu.

To Return to the Power Vision Main Menu
Touch Back.

4-50
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

Vehicle Tools Menu
To View Vehicle Info
Vehicle Info stores VIN data, ECM family information, model number, ECM part number, and
other vehicle specific information.
1
2

Touch Vehicle Tools >Vehicle Info.
Touch Exit to return to the Vehicle Tools menu.

Version 8

WinPV User Guide

4-51

CHAPTER 4
Power Vision Menus

To View Stored DTC’s
Stored DTC’s displays and allows you to clear Dealer Trouble Codes. Stored DTC’s can be
used on multiple Delphi equipped Harley-Davidson Motorcycles, even after the Power Vision
is married to one specific ECM.
1
2
3
4

Touch Vehicle Tools >Stored DTC’s.
Touch Read to view stored DTC’s.
Touch Clear to erase stored DTC’s.
Touch Exit to return to the Vehicle Tools menu.

4-52
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To Reset Trims
Reset Trims resets adaptive fuel or idle trims that have been learned by the ECM. Resetting
these trims before a tune session is recommended.
1
2

Touch Vehicle Tools >Reset Trims.
Touch Reset Fuel Trim to reset the fuel trims.
Or
Touch Reset Idle Trim to reset the idle trims.

3
4

Touch Read to view the current information.
Touch Exit to return to the Reset Trims screen.

5

Touch Back to return to the Vehicle Tools menu.

Version 8

WinPV User Guide

4-53

CHAPTER 4
Power Vision Menus

To Read ECM
Read ECM is for development purposes only and should only be selected when instructed by
a Dynojet Technician.
1
2

Touch Vehicle Tools >Read ECM.
Touch Yes to continue.
Or
Touch No to return to the Vehicle Tools menu.

4-54
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To Restore Original Tune
Restore Original Tune allows you to restore the factory ECM calibration.
1
2

Touch Vehicle Tools >Restore Original Tune.
Touch Yes to restore the original tune to your ECM.
Or
Touch No to return to the Vehicle Tools menu.

To Return to the Power Vision Main Menu
Touch Back.

Version 8

WinPV User Guide

4-55

CHAPTER 4
Power Vision Menus

Settings Menu
To Select the Units
Units sets all Power Vision units to either Metric or English.
1
2
3

Touch Settings >Units.
Touch English or Metric.
Touch Back to return to the Setting menu.

To Change the Brightness
1
2
3

Touch Settings >Brightness.
Use the arrows to increase or decrease the brightness of the Power Vision screen.
Touch Save to confirm the changes.
Or
Touch Cancel to return to the Settings menu.

4-56
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

To Enter a Code
1
2
3

Touch Settings >Enter Code.
Using the number pad, enter a code.
Touch Save to save the code.
Or
Touch Cancel to return to the Settings menu.

To Calibrate the Touch Screen
Use the following steps to calibrate the Power Vision touch screen.
1
2

Touch Settings >Touch Calibrate.
Touch the plus (+) signs as they appear.
The calibration process will complete once all points have been touched.

Version 8

WinPV User Guide

4-57

CHAPTER 4
Power Vision Menus

To Flip the Power Vision Screen
Flip Screen rotates the Power Vision screen orientation 180 degrees.
Touch Settings >Flip Screen.

To Return to the Power Vision Main Menu
Touch Back.

4-58
WinPV User Guide

WORK IN G WITH POWER VISION
Power Vision Menus

Device Info Menu
To View Information About the Power Vision
Device Info displays information about the Power Vision.
Touch Device Info.

Version 8

WinPV User Guide

4-59

CHAPTER 4
Power Vision Menus

Dealer Info Menu
To View Information About the Dealer
Dealer Info displays dealer information.
Touch Dealer Info.

4-60
WinPV User Guide

WORK IN G WITH POWER VISION
Understanding AutoTune

Understanding AutoTune
The Power Vision supports a process to correct your VE tables (and AFR) based on your OEM
narrowband O2 sensors (Basic Method) or with wideband O2 sensors from the Dynojet
AutoTune Kit (Pro Method). In addition, AutoTune can use the ECM's ion sensing knock
control strategy in order to remove timing/adjust spark advance from areas of your
calibration where knock was present. Refer to AutoTune Notes and Tips.
Power Vision automatically "sets up the tune", logs the correct channels, and applies a
correction to your tune. Leave the laptop at home, you now have a full time, professional
tuning expert inside your Power Vision.
Most modern EFI systems employ closed loop feedback for fuel control. These systems are
often based around narrowband O2 sensors that provide feedback to the ECM in regards to
how rich or lean the vehicle is running. If there is an error between what the ECM is asking
for and what the OEM narrowband sensor measures, a correction is made to adjust the lean
or rich condition. These corrections are stored in what are called Adaptive fuel tables.
Narrowband sensors are ONLY accurate at, or near, the stoichiometric value of the fuel being
used, which is 14.7:1 for gasoline. This value is where complete combustion would occur,
however, is not ideal for all operating conditions of an engine.
A typical Harley-Davidson ECM calibration has areas of closed loop and open loop. Open loop
means feedback from the O2 sensors is not used. When the engine is in a range that requires
precise measurement, but is outside the reliable window of a narrowband sensors operation
(considered 14.3 -15.2 AFR), then a tuner/EFI specialist must rely on wideband O2 sensor
data. The wideband O2 sensor values provide tuners or electronic tuning devices with data
needed to make decisions on how they will address fueling in the open loop areas of the ECM
calibration. In the case of a Harley engine management system, we fix the error by adjusting
the Volumetric Efficiency tables.
Power Vision offers three methods for AutoTune:
• AutoTune Basic—utilizes the narrowband O2 sensors on bikes that have OEM closed loop
fuel control. Refer to AutoTune Basic.
• AutoTune Pro—requires the use of Dynojet's AutoTune wideband O2 control module that
has dual wideband O2 sensors. Refer to AutoTune Pro and Target Tune.
• AutoTune Target Tune—requires the use of Dynojet's Target Tune module and dual
wideband O2 control module that has dual wideband O2 sensors. Refer to AutoTune Pro
and Target Tune.
The Power Vision can provide meaningful tuning feedback from either the OEM narrowband
O2 sensors and/or from the AutoTune module's wideband O2 sensors.
To Enable AutoTune
To Start an AutoTune Session
To Export a Learned Tune
To Load a Custom Tune File—AutoTune
To Edit AutoTune Settings

Version 8

WinPV User Guide

4-61

CHAPTER 4
Understanding AutoTune

AutoTune Basic
Without any additional modules, the Power Vision will take advantage of what the ECM "sees"
from its OEM narrowband O2 sensors and use that data to achieve the target AFR. This
method works great in those operating areas where it makes sense to run in a lean state:
idle, light load, and cruise conditions. AutoTune Basic will fix the normal closed loop range,
but can also temporarily extend the closed loop range to gain insight on the actual AFR in
areas that are normally open loop (high load/high RPM). At high load/high RPM ranges this
"temporary situation" is not ideal, and this is where it is advantageous to use AutoTune Pro.
Utilizing the AutoTune Basic AFR data and other data from the H-D OEM data bus, the Power
Vision can automatically fix the deviation between the target AFR and actual AFR by
adjusting the VE tables, instead of storing the changes in an Adaptive fuel table. The data is
learned in real time, but processing the data and adjusting the tune is done in an "offline
state" (key on/engine off). After the data is collected, the Power Vision can process the data,
correct the tune, and then re-flash the corrected tune into the ECM.
Neither AutoTune Basic nor AutoTune Pro requires that you interface with a computer. Power
Vision sets up the AutoTune parameters, monitors and logs the data, and then corrects the
tune to ensure that the final tune has optimum values in the VE table(s).

AutoTune Pro and Target Tune
Utilizing a Dynojet AutoTune wideband control module, Power Vision can provide a complete,
refined, and powerful tune. The AutoTune module uses wideband O2 sensors in order to
measure the actual AFR in the exhaust; these sensors can accurately sample AFR values
from 10.0:1 to 18.0:1 vs. 14.3 - 15.2 from narrow band sensors. Like AutoTune Basic, the
entire process will correct the error from what is commanded in the ECM defined as the
target AFR, and the AFR that's actually measured in the exhaust. The AutoTune Pro and
Target Tune method allows the target AFR table to include AFR values that are ideal for all
operating conditions, resulting in the best data for high load/high RPM operating ranges as
well as idle, light load, and cruise conditions.
Utilizing the AutoTune Pro and Target Tune AFR data and other data from the H-D OEM data
bus, the Power Vision can automatically fix the deviation between the target AFR and actual
AFR by adjusting the VE tables, instead of storing the changes in an Adaptive fuel table. The
data is learned in real time, but processing the data and adjusting the tune is done in an
"offline state" (key on/engine off). After the data is collected, the Power Vision can process
the data, correct the tune, and then re-flash the corrected tune into the ECM.
Neither AutoTune Basic nor AutoTune Pro and Target Tune requires that you interface with a
computer. Power Vision sets up the AutoTune parameters, monitors and logs the data, and
then corrects the tune to ensure that the final tune has optimum values in the VE table(s).

4-62
WinPV User Guide

WORK IN G WITH POWER VISION
Understanding AutoTune

AutoTune Wideband O2 Sensor Installation Options
• On bikes that do not have factory closed loop fuel control/O2 sensors, 18mm O2 bungs
must be welded into the exhaust or an aftermarket exhaust system that has 18mm O2
bungs can be installed.
• On bikes that have factory closed loop fuel control/18mm narrowband O2 sensors, the
18mm wideband O2 sensors can simply be installed in place of the OEM sensors. This
requires that you temporarily (or permanently) disable the closed loop function of the
ECM. If the bike has OEM 12mm narrowband O2 sensors, 18mm O2 bungs must be welded
into the exhaust.
• Retain the OEM narrowband O2 sensors/closed loop fuel control and install weld in bungs
for the AutoTune wideband O2 sensors.

Changes Made During AutoTune
The following changes are made to the tune file during the AutoTune process.
AutoTune Pro—automatically applies a .pvv to the tune that does the following:
• Sets the base fuel table to one static value, 13.0 for AFR or .89 lambda.
• Disables EITMS/PE/Adaptive Control.
• AE/DE are still active in the tune, but there's logic to disable or minimize learning when
they're active.
AutoTune Target Tune—automatically applies a .pvv to the tune that does the following:
• Disables EITMS/PE/Adaptive Control.
• AE/DE are still active in the tune, but there's logic to disable or minimize learning when
they're active.
AutoTune Basic—automatically applies a .pvv to the tune that does the following:
• Sets the base fuel table to 14.6 for AFR based calibrations and .982 for lambda based
calibrations.
• Disables AE/DE/EITMS/PE/Adaptive Control.
• Retards 4 degrees of timing.
• Bias the close loop range to .700mv on AFR based calibrations.
General
• Sets calib to PVAT (Session Number).
• Clears adaptive fuel tables after flashing.

Version 8

WinPV User Guide

4-63

CHAPTER 4
Understanding AutoTune

AutoTune Notes and Tips
• AutoTune can use the ECM's ion sensing knock control strategy in order to remove
timing/adjust spark advance from areas of your calibration where knock was present. This
feature can only remove timing, it will never add it. It is not recommended to use this
feature with AutoTune Basic, only AutoTune Pro and AutoTune Target Tune. This feature is
disabled by default, but changing the "Max Spark Learn" from 0 to a value such as 10
would make it active.
• If you do not have Wideband O2 sensors installed (ie. those included in the Dynojet
AutoTune kit) select Basic mode.
• The default values are acceptable for most big twin models. If you have a V-Rod or
Sportster, you will need to adjust the temperature (in degrees C) and RPM limit to an
acceptable range. Refer to To Edit AutoTune Settings.
• Knock control on Sportsters is not possible; the ECM does not support this feature and
AutoTune does not support automated spark adjustment based on knock activity.
• In Pro and Target Tune mode, you can tune fuel and spark simultaneously; however,
Dynojet recommends to address fuel first, and then focus on spark. To do this, after you've
completed tuning the fuel (via adjustments to your VE tables) and flashed the corrected
tune file to your ECM, you can then start a new AutoTune session that's focused on spark
corrections. In the settings area of AutoTune you can set Max VE Learn to 0 and Max Spark
Learn to 10. This will disable AutoTune's ability to change fuel, but allow it to monitor,
record, and eventually correct spark advance based on knock activity.

4-64
WinPV User Guide

INDEX
A

about window 3-34
acceleration enrichment 3-48
acceleration enrichment multiplier 3-49
active compression release 3-51
active exhaust 3-51
active file 3-26, 3-38
active intake 3-51
adaptive control 3-51
adaptive control enable temp 3-46
adaptive control maximum temp 3-46
adaptive control maximum temp hysteresis 3-47
adaptive control minimum temp hysteresis 3-47
adaptive knock retard 3-52
add 3-37
air flow
charge dilution effect 3-43
charge dilution effect (front) 3-43
charge dilution effect (rear) 3-43
DBW throttle position limit 3-45
drive by wire speed limit vs gear 3-45
drive by wire throttle limit vs gear 3-43
engine displacement 3-43
IAC warm-up steps 3-43
idle rpm 3-44
idle rpm adder 3-45
map default table 3-44
map load normalization 3-44
map tooth IVC (front cyl) 3-44
map tooth IVO (front cyl) 3-44
map tooth offset (rear cyl) 3-44
number of crank teeth 3-44
throttle blade control stage I 3-44
throttle blade control stage II 3-44
throttle table transition gear 3-45
VE front 3-44
VE rear 3-45
air fuel ratio, lambda 3-48
air fuel ratio, stoich 3-48
airflow 3-43
apply license 3-32

autotune
basic 4-20, 4-61, 4-62
changes made 4-63
datalog 4-22
datalogger modes 4-25
datalogger operating conditions 4-24
edit settings 4-30
enable 4-19
export a learned tune 4-26
load a custom tune 4-28
log tuner 4-23
notes and tips 4-64
pro 4-20, 4-61, 4-62
start session 4-22
target tune 4-20, 4-61, 4-62
understanding 4-61
wideband o2 4-63

B

backup stk 3-36
basic autotune 4-62
basic autotune mode 4-20
brightness 4-56

C

calibrate touch screen 4-57
calibration ID 3-43
cell colors 3-27, 3-38
compare high/low 3-27
table range 3-27
cell math toolbar 3-33, 3-37
add 3-37
customizing 3-39
divide 3-37
multiply 3-37
percent 3-37
set 3-37
subtract 3-37
value 3-37

WinPV User Guide

Index-i

INDEX

cells
copy 3-16
paste 3-16
charge dilution effect 3-43
charge dilution effect (front) 3-43
charge dilution effect (rear) 3-43
close compare 3-26, 3-38
closed loop 3-50, 3-52
closed loop bias 3-50
closed loop bias front 3-50
closed loop bias rear 3-50
closed loop lambda range 3-50
closed loop bias 3-50
closed loop bias front 3-50
closed loop bias rear 3-50
closed loop lambda range 3-50
closed loop minimum temp 3-47
closed loop minimum temp hysteresis 3-47
closed throttle spark front 3-52
closed throttle spark rear 3-53
code 4-57
compare file 3-27, 3-38
visual identifiers 3-42
compare high/low 3-27
compare menu 3-26
active file 3-26
cell colors 3-27
close compare 3-26
compare file 3-27
create difference report 3-28
delta 3-27
load compare 3-26
show delta as percent 3-28
show only differences 3-28
compare toolbar 3-33, 3-38
active file 3-38
cell colors 3-38
close compare 3-38
compare file 3-38
customizing 3-39
delta 3-38
load compare 3-38
config, quick tune 4-36
contact
email 1-1
phone 1-1
conventions 1-2
copy 3-35
copy cells 3-16
copy of current tune file 4-14
copy of original tune file 4-11
cranking fuel 3-48
create a log 4-50
create difference report 3-28
custom tune file 4-8
customizing the toolbars 3-39
cut 3-35

Index-ii
WinPV User Guide

D

datalog 4-22
datalog menu
create a log 4-50
datalog theme 4-49
gauge limits 4-42
gauges 4-40
playback a log 4-46
reset trip/economy A 4-50
reset trip/economy B 4-50
signals 4-47
visual warnings 4-42
datalog theme 4-49
datalogger modes 4-25
datalogger operating conditions 4-24
DBW throttle position limit 3-45
dealer info 4-60
dealer info menu 4-60
dealer info 4-60
deceleration enleanment 3-48
deceleration enrichment multiplier 3-49
delta 3-27, 3-38
description 3-43
device info 4-59
device info menu 4-59
device info 4-59
disable EUAO 3-18
divide 3-37
drive by wire speed limit vs gear 3-45
drive by wire throttle limit vs gear 3-43
drivers 2-2
DTCs 4-52
dynojet tune file 4-4

E

ecm status 4-18
edit 3-16
copy 3-16
cut 3-16
interpolate 3-16
interpolate, horizontal 3-16
redo 3-16
smooth 3-16
undo 3-16
edit a tune file 4-17
edit autotune settings 4-30
edit menu 3-16
edit tune 4-17
EITMS 3-51
EITMS off temp 3-46
EITMS on temp 3-46
email, contact 1-1
enable autotune 4-19
engine displacement 3-43
environment 3-46
adaptive control enable temp 3-46
adaptive control maximum temp 3-46
adaptive control maximum temp hysteresis 3-47
adaptive control minimum temp hysteresis 3-47
closed loop minimum temp 3-47
closed loop minimum temp hysteresis 3-47

INDEX

EITMS off temp 3-46
EITMS on temp 3-46
knock control minimum temp 3-46
knock control minimum temperature
hysteresis 3-46
exit pc link mode 3-24
export a learned tune 4-26

F

file
import power commander map file 3-7
load all values 3-12
load selected values 3-14
open 3-5
save all values 3-9
save as 3-6
save selected values 3-10
save selected values append 3-11
file menu 3-5
flip screen 4-58
fuel 3-48
acceleration enrichment 3-48
acceleration enrichment multiplier 3-49
air fuel ratio, lambda 3-48
air fuel ratio, stoich 3-48
cranking fuel 3-48
deceleration enleanment 3-48
deceleration enrichment multiplier 3-49
injector gas constant 3-49
injector size 3-48
mpg adjustment 3-49
PE air fuel ration, lambda stoich 3-49
warmup enrichment lambda 3-49
warmup enrichment stoich 3-49
fuel, quick tune 4-38

G

gauge limits 4-42
gauges 4-40
gear 3-50
gear ratios 3-50
speedometer calibration 3-50
gear ratios 3-50
general, quick tune 4-35
get ECM data 3-21
get license 3-36
get log 3-19, 3-36
get log from pv 3-19
get tune 3-17, 3-36
get tune from pv 3-17

H

heated O2 sensors 3-51
help menu 3-34
about window 3-34

I

IAC warm-up steps 3-43
idle rpm 3-44
idle rpm adder 3-45
import .djm, .pvm 3-7
import power commander map file 3-7
info 3-36
injector gas constant 3-49
injector size 3-48
interpolate 3-16
interpolate, horizontal 3-16

K

knock control 3-51
knock control minimum temp 3-46
knock control minimum temperature hysteresis 346

L

lambda based 3-43
limits and switches 3-51
active compression release 3-51
active exhaust 3-51
active intake 3-51
adaptive control 3-51
closed loop 3-52
EITMS 3-51
heated O2 sensors 3-51
knock control 3-51
PE disable rpm 3-52
PE disable tps 3-52
PE enable rpm 3-51
PE enable tps 3-51
rpm limit 3-51
live idle 4-18
load a copy of current tune file 4-14
load a copy of original tune file 4-11
load a custom tune 4-28
load a custom tune file 4-8
load all values 3-12
load compare 3-26, 3-38
load selected values 3-14
lock tune 3-18
log tuner 4-23

M

map default table 3-44
map load normalization 3-44
map tooth IVC (front cyl) 3-44
map tooth IVO (front cyl) 3-44
map tooth offset (rear cyl) 3-44
max knock retard 3-52
mpg adjustment 3-49
multiply 3-37

N

number of crank teeth 3-44

Version 8

WinPV User Guide

Index-iii

INDEX

O

open 3-5, 3-35
options 3-29
stock files 3-30
tune files 3-31
units 3-29
value files 3-32

P

paste 3-16, 3-35
paste cells 3-16
PE air fuel ration, lambda stoich 3-49
PE disable rpm 3-52
PE disable tps 3-52
PE enable rpm 3-51
PE enable tps 3-51
PE spark 3-52
percent 3-37
phone, contact 1-1
playback a log 4-46
power vision drivers, installing 2-2
power vision information 3-17
power vision menus 4-2
datalog menu 4-40
dealer info menu 4-60
device info menu 4-59
program vehicle menu 4-4
settings menu 4-56
vehicle tools menu 4-51
power vision toolbar 3-33
power vision tune file
open 3-5
save as 3-6
power vision, installing 2-9
powervision menu 3-17
exit pc link mode 3-24
get ECM data 3-21
get log from pv 3-19
get tune from pv 3-17
pv info 3-17
send original tune to pv 3-23
send stock file to pv 3-24
send tune to pv 3-18
spv online licensing 3-25
update tune using pv 3-21
powervision toolbar 3-36
backup stk 3-36
customizing 3-39
get license 3-36
get log 3-36
get tune 3-36
info 3-36
send tune 3-36
pro autotune 4-62
pro autotune mode 4-20
program vehicle menu
configure quick tune 4-35
ecm status 4-18
edit a tune file 4-17
edit autotune settings 4-30
Index-iv
WinPV User Guide

enable autotune 4-19
export a learned tune 4-26
live idle 4-18
load a copy of current tune file 4-14
load a copy of original tune file 4-11
load a custom tune 4-28
load a custom tune file 4-8
load a dynojet tune file 4-4
start autotune 4-22
pv info 3-17
pv online licensing 3-25
pv toolbar 3-33

Q

quick tune
config 4-36
configure 4-35
fuel 4-38
general 4-35
spark 4-38
tweaks 4-37
ve 4-39

R

read ecm 4-54
redo 3-16
reset trims 4-53
reset trip/economy A 4-50
reset trip/economy B 4-50
reset ui 3-33
reset user interface 3-33
restore original tune 4-55
rpm limit 3-51

S

save 3-35
save all values 3-9
save as 3-6
save selected values 3-10
save selected values append 3-11
scalar 3-40
send original tune to pv 3-23
send stock file to pv 3-24
send tune 3-18, 3-36
send tune to pv 3-18
disable EUAO 3-18
lock tune 3-18
set 3-37
settings menu 4-56
brightness 4-56
code 4-57
flip screen 4-58
touch calibrate 4-57
units 4-56
setup menu 3-29
apply license 3-32
options 3-29
show delta as percent 3-28
show only differences 3-28

INDEX

signals 4-47
smooth 3-16
software level 3-43
spark 3-52
adaptive knock retard 3-52
closed throttle spark front 3-52
closed throttle spark rear 3-53
max knock retard 3-52
PE spark 3-52
spark adjust by air temp 3-53
spark adjust by engine temp 3-53
spark adjust by head temp 3-53
spark advance front 3-52
spark advance rear 3-52
spark adjust by air temp 3-53
spark adjust by engine temp 3-53
spark adjust by head temp 3-53
spark advance front 3-52
spark advance rear 3-52
spark, quick tune 4-38
speedometer calibration 3-50
standard toolbar 3-33, 3-35
copy 3-35
customizing 3-39
cut 3-35
open 3-35
paste 3-35
save 3-35
start autotune 4-22
status bar 3-55
stock files 3-30
stored DTCs 4-52
subtract 3-37
switch 3-40

T

table range 3-27
tables 3-41
target tune 4-62
technical support 1-1
throttle blade control stage I 3-44
throttle blade control stage II 3-44
throttle table transition gear 3-45
touch calibrate 4-57
touch screen 4-57
tune file 4-5, 4-20
tune files 3-31
tune info 3-43
calibration ID 3-43
description 3-43
lambda based 3-43
software level 3-43
tune items 3-40, 3-54
airflow 3-43
closed loop 3-50
environment 3-46
fuel 3-48
gear 3-50
limits and switches 3-51

Version 8

scalar 3-40
spark 3-52
switch 3-40
tables 3-41
tune info 3-43
visual identifiers 3-42
tweaks, quick tune 4-37

U

undo 3-16
units 3-29, 4-56
update client 2-5
update tune using pv 3-21
user level 3-29
options 3-29

V

value 3-37
value files 3-32
VE front 3-44
VE rear 3-45
ve, quick tune 4-39
vehicle info 4-51
vehicle tools menu
read ecm 4-54
reset trims 4-53
restore original tune 4-55
stored DTCs 4-52
vehicle info 4-51
view gauges 4-40
view menu 3-33
cell math toolbar 3-33
compare toolbar 3-33
pv toolbar 3-33
reset ui 3-33
standard toolbar 3-33
visual identifiers 3-42
visual warnings 4-42

W

warmup enrichment lambda 3-49
warmup enrichment stoich 3-49
WinPV menus 3-3
compare menu 3-26
edit menu 3-16
file menu 3-5
help menu 3-34
powervision menu 3-17
setup menu 3-29
view menu 3-33
WinPV toolbar 3-35
cell math toolbar 3-37
compare toolbar 3-38
powervision toolbar 3-36
standard toolbar 3-35
WinPV update client 2-5
WinPV user interface 3-2

WinPV User Guide

Index-v
