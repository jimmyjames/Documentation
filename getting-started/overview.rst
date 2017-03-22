.. _get-started-overview:

Overview
========

SmartThings is the open developer platform for the Internet of Things.

With SmartThings, developers can:

- Create applications that let users connect devices, actions, and external services to create automations.
- Integrate new devices into the SmartThings ecosystem.
- Publish applications and device integrations to the SmartThings catalog.

----

Developer highlights
--------------------

SmartThings was built to be developer-friendly. Some of the key developer features:

- A simple programming framework using the Groovy programming language. Don't know Groovy? No worries. We've written a :ref:`tutorial <groovy-basics>` to get you up to speed.
- An architecture that allows developers to control hardware with simple software. Turning a switch on is as easy as ``switch.on()``.
- A web-based IDE for developing SmartThings solutions.
- A Simulator for testing your code, *even if you don't have specific devices you are developing for*.
- An active and growing `community <https://community.smartthings.com/>`__ of SmartThings developers.

----

How it works
------------

There are two primary ways that developers can create with SmartThings.

SmartApps
^^^^^^^^^

.. code-block:: groovy

    def someoneArrived(evt) {
        lights.on()
        sendPush("Someone has arrived!")
    }

*SmartApps* are small programs that allow users to connect their devices to make their home more intelligent. As the world around us becomes more and more connected, it is the intelligence *between* these devices that makes our world smart. SmartApps allow developers to control hardware with simple software.

SmartApps can typically be summarized by what they do. Some example SmartApps:

- *"Turn the lights off after a certain time when no motion is detected"*
- *"Notify me if a door opens when I'm not home"*
- *"Turn my thermostat down when I leave home"*


SmartThings ships with many SmartApps already available. Almost all automations that you configure with your SmartThings mobile application are SmartApps. If you've set up your lights to come on when motion is detected, or to receive a notification if your door opens when you aren't home, you've used SmartApps.

Of course, SmartApps are capable of much more than the above examples. SmartApps can communicate with external web services, send push and SMS notifications, expose their own REST endpoints, and more.

Device Handlers
^^^^^^^^^^^^^^^

.. code-block:: groovy

    def on() {
    	zigbee.on()
    }

Developers can also integrate new devices into the SmartThings ecosystem by creating *Device Handlers*. These Groovy programs encapsulate the details of communication between SmartThings and the physical devices. In the SmartApp code example above, we turned the lights on by simply calling ``lights.on()``. The Device Handler is responsible for physically turning the light on (don't worry about the details of this just yet).

----

An open platform
----------------

SmartThings was built by developers, for developers. We recognized that only by creating an open development platform, will the power of the IoT be fully unleashed.

Our :ref:`web-based IDE and simulator <tools_ide>` allows developers to create, edit, test, and publish their SmartThings code. SmartApps and Device Handlers are hosted in our `public GitHub Repository <https://github.com/SmartThingsCommunity/SmartThingsPublic>`__, and our web-based IDE and Simulator is :ref:`integrated with GitHub <github_integration>`.

Our vibrant `developer community <https://community.smartthings.com/c/developers>`__ is a great place to learn, collaborate, and help each other.

----

What's next
-----------

To start developing with SmartThings, you will need to create a developer account and become familiar with the developer tools. This is covered next in the :ref:`quick-start`.

SmartThings uses the Groovy programming language. Don't know Groovy? Check out our :ref:`groovy-basics` and :ref:`groovy-for-smartthings` tutorials.

Then, take a deep dive into developing with SmartThings by writing your first SmartApp, using the :ref:`first-smartapp-tutorial`.
