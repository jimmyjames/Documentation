.. _smartapp-time-methods:

Working With Time
=================

Monitoring the home and triggering Events based on what is detected often entails asking the question: "Is it the right time?" and then based on the answer, perform "Do this, or not," actions.
For example, a SmartApp can turn on a room light when a door is opened but only during certain hours, or wake up the house in the morning at different times based on what day of the week it is.

Time methods can be used in a SmartApp to accomplish such automations.
These time methods support a variety of time-related queries such as get the current time or today's date, know the time zone, or find out if a given moment of time is between a preset time-window.


.. smartapp_taking-action_in_a_time_window:

Taking action within a time window
----------------------------------

A common automation with SmartThings is to turn on a room light when the door is opened between certain hours, and do not turn on the light during other times.
The :ref:`smartapp_timeofdayisbetween` method comes in handy to set up a SmartApp that accomplishes such an automation.

Refer to the SmartApp code below.
First we set up the ``preferences()`` section with ``openCloseSensor``, an open/close sensor that detects when the door is opened, and a ``roomLight`` that controls the switch to the room light.
With the ``fromTime`` and ``toTime`` inputs the user will set up the preferred time-window during which the light should be turn on whenever the door is opened.

.. code-block:: groovy

    preferences {
        section("Select SmartThings") {
            input "openCloseSensor", "capability.contactSensor", title: "Which door?", required: true, multiple: false
            input "roomLight", "capability.switch", title: "Which room light?", required: true, multiple: false
        }
        section("Turn on between what times?") {
            input "fromTime", "time", title: "From", required: true
            input "toTime", "time", title: "To", required: true
        }

    }


Next, we begin watching the door by creating the ``contactHandler`` event handler and have it subscribe to the ``contact.open`` attribute of the ``openCloseSensor`` contact sensor.
This enables the ``contactHandler`` event handler to be sensitive only to the ``open`` Event of the contact sensor, i.e, when the door is opened.

.. code-block:: groovy

    def initialize() {
        subscribe(openCloseSensor, "contact.open", contactHandler)
    }


In the ``contactHandler()`` implementation below, we ensure our SmartApp performs the following checks:

- Is the door open? No? Then do nothing (in this particular example we do not care if the door is closed).
- If the door is open, then are we within the time-window? No? Then do nothing.
- If the door is open, *and* we are within the time-window, then turn on the room light.

.. code-block:: groovy

    def contactHandler(evt) {

        // Door is opened. Now check if the current time is within the visiting hours window
        def between = timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (between) {
            roomLight.on()
        } else {
            roomLight.off()
        }
    }

The ``timeOfDayIsBetween()`` method returns a Boolean ``true`` or ``false`` following the logic in the table below.

============ ============= ============= ==========
fromTime      toTime        new Date()   between
============ ============= ============= ==========
12:30         12:32         12:29:59      false
12:30         12:32         12:30:00      true
12:30         12:32         12:30:01      true
12:30         12:32         12:31:59      true
12:30         12:32         12:32:00      true
12:30         12:32         12:32:01      false
============ ============= ============= ==========


----

.. smartapp_execute_on_certain_days:

Execute only on certain days
----------------------------

A natural extension to the above automation of taking action within a time window is taking action only within a time window on *selected* days of the week.
This can be easily achieved by a slight modification to the above SmartApp.

First we prompt the user to select the preferred days of the week, by adding an enumerated ``input`` *days* in the ``preferences`` section, as below:

.. code-block:: groovy

    preferences {
        section("On Which Days") {
            input "days", "enum", title: "Select Days of the Week", required: true, multiple: true, options: ["Monday": "Monday", "Tuesday": "Tuesday", "Wednesday": "Wednesday", "Thursday": "Thursday", "Friday": "Friday"]
        }
    }


Next, we make modifications to the ``contactHandler`` event handler so that it checks for the following conditions:

- Is the door open? No? Then do nothing (as in the earlier example, we do not care if the door is closed).
- If the door is open, then is today one of the preferred days-of-the-week?
- If no, then do nothing.
- If yes, i.e., if today is one of the preferred days-of-the-week, then are we within the time-window? No? Then do nothing.
- If yes, then turn on the room light.

.. code-block:: groovy

    def contactHandler(evt) {

        // Door is opened. Now check if today is one of the preset days-of-week
        def df = new java.text.SimpleDateFormat("EEEE")
        // Ensure the new date object is set to local time zone
        df.setTimeZone(location.timeZone)
        def day = df.format(new Date())
        //Does the preference input Days, i.e., days-of-week, contain today?
        def dayCheck = days.contains(day)
        if (dayCheck) {
            def between = timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
            if (between) {
                roomLight.on()
            } else {
                roomLight.off()
            }
        }
    }


----

.. _smartapp_timezones:

Working with time zones
-----------------------

Often we may want to set or adjust the SmartApp automation settings while we are traveling, in which case the time zone of the hub may differ from the time zone of the mobile app (our current travel location).
For this reason, the code defining the SmartApp should be aware of the time zone of the physical location of the hub.

When working with time-related methods, SmartThings provides ways to handle time zone of both the physical location of the hub and of the mobile app (installed on mobile phone).

For example, ``location.getTimeZone()`` gives the time zone of the physical location of the hub, whereas invoking :ref:`smartapp_timezone` method will give the current time zone of the mobile app, i.e., the time zone where mobile phone is currently located.

For a hub that is physically located in Eastern Time Zone in the U.S., and the mobile phone with SmartThings mobile app located in the Pacific Time Zone, the below SmartApp code fragment prints the results shown in the comments:

.. code-block:: groovy

    preferences {
        section("What time?") {
            input "myTime", "time", title: "From", required: false
        }
    }

    ...

    def contactHandler(evt) {
        // this below outputs "America/New_York", i.e., time zone of hub's physical location
        log.debug "location.getTimeZone() value is: ${location.getTimeZone()}"
        // this below outputs "America/Los_Angeles", the time zone of the mobile app
        log.debug "timeZone() for the preference time input value is: ${timeZone(myTime)}"
    }

Many time-related methods, such as ``timeOfDayIsBetween()`` and ``timeToday()`` require ``timeZone`` argument to ensure that the correct time zone of the hub is used.
