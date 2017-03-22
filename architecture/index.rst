.. _architecture:

Architecture
============

As a starting point in understanding SmartThings approach, it is important to recognize that it is centered on the separation of *intelligence* from devices.
SmartThings architecture is developed with a view that most of the value will be created in the *space between the devices*.
Moreover, the devices themselves can be limited to their primitive capabilities (open/close, on/off, heat/cool, brew/don’t brew), while the intelligence layer exists separately as an application layer.

By doing this we allow the intelligence (or application) layer to apply flexibly across a wide range of devices, and make it easier to create applications that interact with and across the physical world.
In many cases, we also benefit from lower-cost end devices, less maintenance complexity and longer battery life.

The SmartThings platform provides methods such that using these methods in Device Handlers we can abstract away the underlying complexity of devices and protocols, while at the same time coding in only the desired experience into SmartApps.

Each device in SmartThings has “capabilities”, which define and standardize available attributes and commands for a device.
This allows you to develop an application for a type of device, regardless of the connection protocol or the manufacturer.

All of the code that developers can write on our platform is written in Groovy, which is a dynamic, object-oriented language built for the Java platform.
You can learn more about Groovy on the :ref:`groovy-basics` page.

Big picture
-----------

.. TODO: I think we need a nicer looking picture. (Jesse O'Neill-Oine)

.. TODO: Picture says "Web IU", should be "UI"? (charlie@gorichanaz.com)

|Container Hierarchy|

Devices
^^^^^^^

Devices are the building blocks of the SmartThings infrastructure.
They are the connection between the SmartThings system and the physical world.
There's a huge variety in the devices you can use; some are created by SmartThings, but most are not.

The real power of SmartThings is that the platform works with most home automation devices already on the market.
We believe in a fully integrated approach, where you aren't tied into a particular technology or protocol.
SmartThings offers compatibility with standards such as ZigBee, Z-Wave, LAN, and Cloud-to-cloud integrations.
This allows SmartThings platform to work with hundreds of off the shelf third-party devices.

Hub
^^^

The SmartThings Hub connects directly to your broadband router.
The Hub provides communication between all connected devices, the SmartThings cloud and the SmartThings mobile application.
With a SmartThings Hub you:

-  Simply plug it into your Ethernet router and provide power.
-  Connect any SmartThings or SmartThings-ready device to your SmartThings account.
-  Build your own SmartThings kit by combining with other SmartThings devices.
-  Work with a variety of standard ZigBee and Z-Wave devices, such as GE Z-Wave in-wall switches and outlets.

The new Samsung SmartThings Hub also supports the ability to execute certain automations locally on the Hub itself, and ships with four AA batteries.
This allows for certain automations to continue, even without AC power.
It also ships with USB ports and is Bluetooth Low Energy capable.
While not active at launch, this allows for greater expansion in the future without requiring new hardware.

Connectivity management
^^^^^^^^^^^^^^^^^^^^^^^

Connectivity Management is the layer that connects your SmartThings Hub, the client devices (mobile phones) to SmartThings servers and to the cloud as a whole.
The Connectivity Management layer is comprised of:

-  Hub Connectivity that connects your Hub to the cloud.
-  Client Connectivity that connects your client devices to the cloud.

These are the highways by which your messages are sent to the internet.

Device Handler execution
^^^^^^^^^^^^^^^^^^^^^^^^

The SmartThings system determines what type of device you are using based on Device Handlers.
Once the Device Handler is selected, the incoming messages are parsed by that particular Device Handler.
The input to the Device Handler is a set of device-specific messages, and the output of the Device Handler is normalized SmartThings Events.
Note that one message can lead to many SmartThings Events.

Subscription management
^^^^^^^^^^^^^^^^^^^^^^^

When Events are created in the SmartThings platform, they don't inherently do anything besides publish that they've happened.
Instead of Events triggering change, SmartApps are configured with subscriptions that listen for defined Events.
The purpose of the subscription management layer is to match up Events that are triggered by the Device Handlers with the SmartApp that is using them.

SmartApp execution
^^^^^^^^^^^^^^^^^^

The SmartApp is run when triggered either via subscriptions, or via external calls to SmartApp endpoints, or by scheduled methods.
The SmartApp is transient in nature, as it runs and then stops running on completion of its task.
Any data that needs to persist throughout SmartApp instances must be stored in a special ``state`` variable that is discussed in the :ref:`storing-data` documentation.

Web UI and IDE
^^^^^^^^^^^^^^

The Web UI sits on top of all of the other technology and allows you to monitor your devices, Hubs, Locations and many other aspects of your SmartThings system.

You have full control of the configuration, including editing, adding, removing, and even creating SmartApps.
To create, you write code within the IDE for SmartApps and Device Handlers.
SmartThings also has an integrated Simulator that allows you to simulate any devices, so it's not required to own the devices you develop for.

Important concepts
------------------

Asynchronous and eventually consistent programming
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When dealing with the physical graph, i.e., a digital representation of the physical things connected around us, there will always be a delay between when you request something to happen and when it actually happens.
There is latency in all networks, but it's especially pronounced when dealing with the physical graph.

To deal with this, the SmartThings platform utilizes asynchronous execution.
This means that anytime you execute a command, it doesn't stop everything else from running.
This helps everyone's code run the most efficiently.

Our basic methodology towards executing a command, such as turning a light switch on, is "fire and forget".
This means that you execute a command, and assume it will turn on in due time, without any sort of follow up.

You cannot be guaranteed that your command has been executed, because another SmartApp could interact with your end device, and change its state.
For example, you might turn a light switch on, but another app might sneak in and turn it off.

If you need to know if a command was executed, you can subscribe to an Event triggered by the command you executed and check its timestamp to ensure it fired after you told it to.
You will, however, still have latency issues to take into consideration, so it's impossible to know the exact current status at any given time.

The SmartApps platform follows eventually consistent programming, meaning that responses to a request for a value in SmartApps will eventually be the same, but in the short term they might differ.

Containers
^^^^^^^^^^

Within the SmartThings platform, there are three different “containers” that are important concepts to understand.
These are: *accounts, Locations,* and *groups.*
These containers represent both security boundaries and navigation containers that make it easy for users to browse their devices.

The diagram below shows the hierarchical relationship between these containers.
Each type of container is described below in more detail.

.. figure:: ../img/overview/container-hierarchy.png
   :alt: Container Hierarchy

Accounts
^^^^^^^^

Accounts are the top-level container that represents the SmartThings ‘customer’.
Accounts contain only Locations and no other types of
objects.

Locations and users
^^^^^^^^^^^^^^^^^^^

Locations are meant to represent a geolocation such as “Home” or “Office”.
Locations can optionally be tagged with a geolocation (latitude and longitude).
In addition, Locations don’t have to have a SmartThings Hub, but generally do.
Finally, locations contain Groups or Devices.

Groups
^^^^^^

Groups are meant to represent a room or other physical space within a Location.
This allows for devices to be organized into groups making navigation and security easier.
A group can contain multiple devices, but devices can only be in a single group.
Further, nesting of groups is not currently supported.

----

Capability taxonomy
-------------------

Capabilities represent the common taxonomy that allows SmartThings platform to link SmartApps with Device Handlers.
An application interacts with devices based on their capabilities, so once we understand the capabilities that are needed by a SmartApp, and the capabilities that are provided by a device, we can understand which devices (based on the type of device and inherent capabilities) are eligible for use within a specific SmartApp.

The :ref:`capabilities_taxonomy` is evolving and is heavily influenced by existing standards like ZigBee and Z-Wave.

Capabilities themselves may be decomposed into both ‘Actions’ or ‘Commands’ (these are synonymous), and Attributes.
Actions represent ways in which you can control or actuate the device, whereas Attributes represent state information or properties of the device.

Attributes and events
^^^^^^^^^^^^^^^^^^^^^

Attributes represent the various properties or characteristics of a device.
Generally speaking device attributes represent a current device state of some kind.
For a temperature sensor, for example, ‘temperature’ might be an attribute.
For a door lock, an attribute such as ‘status’ with values of ‘open’ or ‘closed’ might be a typical.

Commands
^^^^^^^^

Commands are ways in which you can control the device.
A capability is supported by a specific set of commands.
For example, the ‘Switch’ capability has two required commands: ‘On’ and ‘Off’.
When a device supports a specific capability, it must generally support all of the commands required of that capability.

Custom capabilities
^^^^^^^^^^^^^^^^^^^

We do not currently support creating custom capabilities.
You can, however, create a device-type handler that exposes custom commands or attributes.

SmartThings cloud
-----------------

The SmartThings platform assumes a "Cloud First” approach.
This means that in order to use all supported devices and automations, and to ensure that the SmartThings mobile application reflects the correct state of your home, the SmartThings Hub will need to be online and be connected to the SmartThings cloud.

The second generation Hub, the Samsung SmartThings Hub, allows for some Hub-local capabilities.
Certain automations can execute even when disconnected from the SmartThings cloud.
This allows SmartThings to improve performance and insulate the user from intermittent internet outages.

This is accomplished by delivering certain automations to the Samsung SmartThings Hub itself, where it can execute locally.
The engine that executes these automations are typically referred to as "AppEngine".
Events are still sent to the SmartThings cloud - this is necessary to ensure that the SmartThings mobile application reflects the current state of the home, as well as to send any notifications or perform other cloud-based services.

The specific automations that execute locally are expanding and currently managed by the SmartThings internal team.
The ability for developers to execute their own SmartApps or Device Handlers locally is planned.

That said, there are a number of important scenarios where the cloud is simply required:

**Scenario: There may not be a hub at all**

Many devices are now already connected devices, via Wi-Fi/IP, and connect directly to the cloud without the need for a gateway device (hub).

The most likely use case for such devices involves adding intelligence to those devices through SmartApps.
These devices may not be connected to a SmartThings Hub, and instead are directly connected to the vendor cloud or the SmartThings Cloud.

Put simply, if there is no Hub, then the SmartApps layer must run in the cloud!

**Scenario: SmartApps may run across both cloud- and Hub-connected devices**

As a corollary to the first point above, since there are use cases where devices are not Hub-connected, SmartApps might be installed to use one device that is Hub-connected, and another device that is Cloud-connected, all in the same app.
In this case, the SmartApp needs to run in the cloud.

**Scenario: There may be multiple Hubs**

While the mesh network standards for ZigBee and Z-Wave generally eliminate the need for multiple SmartThings Hubs, we didn’t want to exclude this as a valid deployment configuration for large homes or even business applications of our technology.
In the multi-Hub case, SmartApps that use multiple devices that are split across hubs will run in the cloud in order to simplify the complexity of application deployment.

**Scenario: External service integration**

SmartApps may call external web services.
Calling them from SmartThings cloud reduces risk as it allows SmartThings to easily monitor for errors and ensure the security and privacy of the users.

In some cases, an external web service might even use IP white-listing such that they simply can’t be called from the Hub running at a user’s home or place of business.

Accordingly, SmartApps that use web services will run in the cloud also.

.. important::

   Note that because of the abstraction layer, SmartApp developers never have to understand where or how devices connect to the SmartThings platform.
   All of that is hidden from the developer so that whether a device (such as a Garage Door opener) is Hub-Connected or Cloud-Connected, all they need to understand is:

   .. code-block:: groovy

       myGarageDoor.open()

.. _hubs-and-locations:

Hubs and Locations
------------------

To efficiently manage performance, the SmartThings platform scales its cloud server architecture horizontally with *sharding*.
Sharding helps reduce the latency between the Hub and the cloud, and handles increasing capacity.
As a developer you must note the impact of sharding on how you work with the SmartThings IDE.

When you first install SmartThings app on your mobile phone, create your user account and claim your Hub, the SmartThings platform automatically assigns your Hub to the Location and connects your Location/Hub to a particular shard.
Before starting your development, you must note that:

- Your Location/Hub is connected to a *specific* SmartThings shard, based on the geographical location of the Hub, and,
- You must ensure that you are logged into the URL of this specific shard on IDE. Since the Location is always connected to the correct shard URL, you can do this by clicking on your Location from "My Locations" page after you log in.

.. note::

    If for some reason you are not seeing your Hub in the IDE, then from *My Locations* page select the Location and it will prompt you to log into correct shard where you can see your Hub.

Consequences of sharding
^^^^^^^^^^^^^^^^^^^^^^^^

In practice, some consequences of sharding are:

- A global layer, with a few specific services, spans across all shards while all other services are owned by the specific shard itself (which, as emphasized above, is Location-dependent). A few global layer services are: user account creation, authorization, OAuth authentication, mappings of Location-to-shard, users-to-Locations and Hub-to-Locations. All data that is down from the Location level are managed by the specific shard.
- A shard does not share information with another shard. For example, a common login across the shards does not exist yet. You will have to log in to each shard, although the userid and password will be the same (see the note above). At the same time, note that SmartThings mobile app users do not have to log in again because mobile client OAuth tokens are shared across the shards.
- SmartApps and Device Handlers are now published in a specific shard and not for your entire account. For example, if you have a Hub in North America and another Hub in Europe, you will need to publish your SmartApp twice, one in each Location, i.e., shard.
- Note that since a Hub is assigned to a Location, if you delete a Location, the Hub becomes unclaimed. Conversely, it is possible for a Location to exist without a claimed Hub at that Location.

.. |Container Hierarchy| image:: ../img/architecture/overview.png
