.. _zigbee_primer:

ZigBee Primer
=============

Before we start, lets take a look at a full ZigBee message as it would look in a SmartThings Device Handler.
Then we’ll break up the message into its parts and dive into what each part means.
Make sure you download the ZigBee Cluster Library as a reference for ZigBee message formatting and what is possible for each device.
You can also see our :ref:`zigbee_ref` for more detailed descriptions of our library methods.

Here are some full commands:

Set the level of a device
    ``zigbee.command(0x0008, 0x04, "FE0500")``

Read the current level (e.g. of a light)
    ``zigbee.readAttribute(0x0008, 0x0000)``

Write the value 0xBEEF to cluster 0x0008 attribute 0x0010
    ``zigbee.writeAttribute(0x0008, 0x0010, DataType.UINT16, 0xBEEF)``

Report battery level every 10 minutes to 6 hours if it changes value by 1
    ``zigbee.configureReporting(0x0001, 0x0021, DataType.UINT8, 600, 21600, 0x01)``

The 4 Main types of ZigBee Messages

-  zigbee.command - A ZigBee command for a given cluster.
-  zigbee.readAttribute - A ZigBee Read Attribute requesting the value of an attribute from a cluster.
-  zigbee.writeAttribute - A ZigBee Write Attribute writing a value to the attribute of a cluster.
-  zigbee.configureReporting - A ZigBee Configure Report that configures a cluster attribute to report changes of a given amount within a certain time period.

----

Device Network ID
-----------------

All connected devices have a Device Network ID that is used to route messages correctly to the device.
In the loosest terms think of the Network ID as the IP Address.
It is a 4 digit hex number that the device gets while pairing.
Since the Network ID is unique by device on a network, it can be handled by the ZigBee library provided by SmartThings and needs not be handled directly.

----

Endpoints
---------

Endpoints are simple.
Think of them basically as ports.
Different endpoints can support different clusters and a device can have multiple endpoints to do different things.
Endpoints can be used to separate functionality when needed.
For example a temperature sensor can have the Temperature Measurement Cluster on endpoint 1 and have Over The Air Boot loader Cluster on endpoint 2.

----

Clusters
--------

Clusters are a group of commands and attributes that define what a device can do.
Think of clusters as a group of actions by function.
A device can support multiple clusters to do a whole variety of tasks.
The majority of clusters are defined by the ZigBee Alliance and listed in the ZigBee Cluster Library.
There are also profile specific clusters that are defined by their own ZigBee profile like Home Automation or ZigBee Smart Energy, and Manufacture Specific clusters that are defined by the manufacture of the device.
These are typically used when no existing cluster can be used for a device.

Most used clusters are

-  0x0006 - On/Off (Switch)
-  0x0008 - Level Control (Dimmer)
-  0x0201 - Thermostat
-  0x0202 - Fan Control
-  0x0402 - Temperature Measurement
-  0x0406 - Occupancy Sensing

----

Commands
--------

Commands are basically actions a device can take.
It’s how we get things to do stuff.
Commands and whats available are defined by the cluster.

Keeping on the On/Off cluster as an example, the available commands are:

-  0x00 - Off
-  0x01 - On
-  0x02 - Toggle

In a SmartThings Device Type the following line would turn a switch off
(look at the last number):
``zigbee.command(0x0006, 0x00)``

This would turn it on:
``zigbee.command(0x0006, 0x01)``

This would toggle it:
``zigbee.command(0x0006, 0x02)``

----

Read and Write Attributes
-------------------------

Attributes are used to get information from a device and to set preferences on a device.
The two main types are Read and Write.
The data type and values are specified by cluster.

An example of a Read Attribute that would read the current level of a
dimmer and return the value:

``zigbee.readAttribute(0x0008, 0x0000)``

Write Attributes are used to set specific preferences.
Write attributes can need specific data type that the payload is in.

An example of a Write Attribute that would set the transition time from
on to off of a dimmer look like this:

``zigbee.writeAttribute(0x0008, 0x0010, DataType.UINT16, 0x0014)``

In this case the value (0x0014) translates to 2 seconds.
Breaking the payload down we see that the hex value of 0x0014 equals the decimal value of 20. 20 * 1/10 of a second equals 2 seconds.

----

Configure reporting
-------------------

Many times you will have an attribute for a given device that you are interested in receiving notifications about.
For example you may want to be notified any time the battery level changes.
The way to do this in ZigBee is by configuring a report for that cluster.

An example of configuring a report for the battery level:
``zigbee.configureReporting(0x0001, 0x0021, DataType.UINT8, 600, 21600, 0x01)``

This is for cluster 0x0001 (power cluster), attribute 0x0021 (battery level), whose type is UINT8, the minimum time
between reports is 10 minutes (600 seconds) and the maximum time between reports is 6 hours (21600 seconds), and the
amount of change needed to trigger a report is 1 unit (0x01).


Device discovery
----------------

After a ZigBee device joins the network it must be queried in order to select
the correct Device Handler. After a device joins (or rejoins) the network
the Hub will collect the simple descriptor, manufacturer, model and application
version for each endpoint without any interaction with the cloud. The Hub will
automatically resend any messages that the device does not respond to in a
timely manner. Once all the information has been obtained it is sent to the
cloud in the `zbjoin` message. This message is visible in Hub Events.

Here is an example of the message when a SmartSense Multi Sensor was joined::

    zbjoin: {"dni":"5CF4",
             "d":"000D6F0005767F37",
             "capabilities":"80",
             "endpoints":[{"simple":"01 0104 0402 00 07 0000 0001 0003 0020 0402 0500 0B05 01 0019",
                           "application":"",
                           "manufacturer":
                           "CentraLite",
                           "model":"3325-S"},
                          {"simple":"02 C2DF 0107 00 05 0000 0001 0003 0B05 FC46 01 0003",
                           "application":"",
                           "manufacturer":null,
                           "model":null}
                         ]
            }

The value is a dictionary that contains all the information gathered from the device. Here is what each part means:

  * dni: `Device Network ID`_
  * d: the ZigBee EUID aka long address
  * capabilities: the MAC capability field from the Device Announce message (not currently used by SmartThings)
  * endpoints: a list of information for each available endpoint
  * simple: a space separated string of hex values that contains the following pieces of information:

    * Endpoint
    * Profile ID
    * Device ID
    * Device version
    * Number of in/server clusters
    * List of In/server clusters
    * Number of out/client clusters
    * List of out/client clusters

  * application: the Application Version read from attribute 0x0001 of the Basic Cluster
  * manufacturer: The Manufacturer value read from attribute 0x0004 of the Basic Cluster
  * model: The Model value read from attribute 0x0005 of the Basic Cluster

See :ref:`zigbee-fingerprinting-label` for more information on how the platform uses this
information to find the correct Device Handler for the device.

----

Useful ZigBee references
------------------------

`ZigBee Cluster Library (ZCL) <http://www.zigbee.org/download/standards-zigbee-cluster-library/>`__

`ZigBee Home Automation (HA) <http://www.zigbee.org/zigbee-for-developers/applicationstandards/zigbeehomeautomation/>`__

`ZigBee Specification <http://www.zigbee.org/download/standards-zigbee-specification/>`__
