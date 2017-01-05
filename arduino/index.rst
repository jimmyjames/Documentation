Arduino ThingShield
==========================

.. warning::

    The SmartThings Arduino ThingShield has been discontinued, and is no longer supported.

    All code and libraries discussed in this document are no longer supported by SmartThings, and should be used on a as-is basis.

Using the SmartThings Arduino Shield (ThingShield), you can add SmartThings capability to any Arduino compatible board with the R3 pinout, including the Uno, Mega, Duemilanove, and Leonardo.

Specs:

 - Works with: Uno, Mega, Duemilanove, Leonardo
 - Dimensions: 2.5 x 1.9 x 0.3”
 - Weight: 8 ounces

Installing the Library
----------------------

To install, copy the entire SmartThings directory into the ‘libraries’ directory in your sketchbook. Your sketchbook location is set in the Arduino IDE preferences, by default, the location will be:

Windows:
‘My Documents\Arduino\libraries\SmartThings’

OSX:
‘~/Documents/Arduino/libraries/SmartThings’

You can download the `SmartThings Arduino Library here <http://cl.ly/ZMHh>`__.

Pairing the Shield
------------------

To join the shield to your SmartThings hub, go to “Add SmartThings” mode in the
SmartThings app by hitting the “+” icon in the desired location, and then press the Switch button on the shield. You should see the shield appear in the app.

To unpair the shield, press and hold the Switch button for 6 seconds and release. The shield will now be unpaired from your SmartThings Hub. Make sure to delete from your account if you plan to re-pair it!

Changing the Device Handler
---------------------------

By changing the Device Handler in the SmartThings cloud you can change how to interact with your Arduino + ThingShield. When a shield first pairs, it has no functionality and only serves to help identify the device in the mobile app. We have some pre-built Device Handlers that you can use for most functionality. One pre-built Arduino device handler is the “On/Off Shield (example)”

To change your Device Handler, log into `http://graph.api.smartthings.com/` and click on “Devices” Navigate to and click on the Arduino ThingShield then click on “Edit” on the bottom left of the page.

Select the "Type" drop down menu.

Choose "On/Off Shield (example)"

Hit the "Update" button

Your Arduino will now be able to accept the commands "on" "off", and "hello"

`Here is what the Arduino sketch looks like <https://gist.github.com/aurman/6546221>`__ and here is the `device handler <https://gist.github.com/aurman/6862503>`__.

`Here is a different Device Handler that can read a string sent from an Arduino and display it in a tile <https://gist.github.com/aurman/6546257>`__.

Arduino Examples
----------------

We have created some example Arduino Sketches (code) to use as a reference for building your own devices. The following is meant to go with the ”On/Off Shield (example)” Device Handler.

`Download all of our examples here <https://www.dropbox.com/s/4tz4arq67k21ogs/ThingShield%20Examples.zip?dl=0>`__.
