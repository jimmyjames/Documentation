.. _zwave-device-handlers:

Building Z-Wave Device Handlers
===============================

The Z-Wave public specification is available `here <http://z-wave.sigmadesigns.com/design-z-wave/z-wave-public-specification/>`__.
SmartThings provides custom Z-Wave command objects that represent the standard commands and messages that Z-Wave devices use to send and request information.

----

Parsing Events
--------------

When Events from Z-Wave devices are passed into your Device hHandler's parse method, they are in an encoded string format.
The first thing your parse method should do is call ``zwave.parse`` on the description string to convert it to a Z-Wave command object.
The object's class is one of the subclasses of ``physicalgraph.zwave.Command`` that can be found in the `Z-Wave Command
Reference <https://graph.api.smartthings.com/ide/doc/zwave-utils.html>`__.
If the description string does not represent a valid Z-Wave command, ``zwave.parse`` will return ``null``.

.. code-block:: groovy

    def parse(String description) {
        def result = null
        def cmd = zwave.parse(description)
        if (cmd) {
            result = zwaveEvent(cmd)
            log.debug "Parsed ${cmd} to ${result.inspect()}"
        } else {
            log.debug "Non-parsed event: ${description}"
        }
        return result
    }

Once you have a command object, the recommended way of handling it is to
pass it to a overloaded function such as ``zwaveEvent()`` used in this
example, with different argument types for the different types of
commands you intend to handle:

.. code-block:: groovy

    def zwaveEvent(physicalgraph.zwave.commands.basicv1.BasicReport cmd)
    {
        def result
        if (cmd.value == 0) {
            result = createEvent(name: "switch", value: "off")
        } else {
            result = createEvent(name: "switch", value: "on")
        }
        return result
    }

    def zwaveEvent(physicalgraph.zwave.commands.meterv3.MeterReport cmd) {
        def result
        if (cmd.scale == 0) {
            result = createEvent(name: "energy", value: cmd.scaledMeterValue, unit: "kWh")
        } else if (cmd.scale == 1) {
            result = createEvent(name: "energy", value: cmd.scaledMeterValue, unit: "kVAh")
        } else {
            result = createEvent(name: "power", value: cmd.scaledMeterValue, unit: "W")
        }
        return result
    }

    def zwaveEvent(physicalgraph.zwave.Command cmd) {
        // This will capture any commands not handled by other instances of zwaveEvent
        // and is recommended for development so you can see every command the device sends
        return createEvent(descriptionText: "${device.displayName}: ${cmd}")
    }

Remember that when you use ``createEvent()`` to build an Event, the resulting map must be returned from ``parse()`` for the Event to be sent.
For information about ``createEvent``, see the `Creating Events <parse.html#creating-events>`__ section.

As the `Z-Wave Command Reference <https://graph.api.smartthings.com/ide/doc/zwave-utils.html>`__ shows, many Z-Wave command classes have multiple versions.
By default, ``zwave.parse()`` will parse a command using the highest version of the command class.
If the device is sending an earlier version of the command, some fields may be missing, or the command may fail to parse and return ``null``.
To fix this, you can pass in a map as the second argument to ``zwave.parse()`` to tell it which version of each command class to use:

.. code-block:: groovy

    zwave.parse(description, [0x26: 1, 0x70: 1])

This example will use version 1 of SwitchMultilevel (0x26) and Configuration (0x70) instead of the highest versions.

----

Sending commands
----------------

To send a Z-Wave command to the device, you must create the command object, call ``format()`` on it to convert it to the encoded string representation, and return it from the command method.

.. code-block:: groovy

    def on() {
        return zwave.basicV1.basicSet(value: 0xFF).format()
    }

There is a shorthand provided to create command objects: ``zwave.basicV1.basicSet(value: 0xFF)`` is the same as ``new physicalgraph.zwave.commands.basicv1.BasicSet(value: 0xFF)``.
Note the different capitalization of the command name and the 'V' in the command class name.

The value 0xFF passed in to the command is a hexadecimal number.
Many Z-Wave commands use 8-bit integers to represent device state.
Generally 0 means "off" or "inactive", 1-99 are used as percentage values for a variable level attribute, and 0xFF or 255 (the highest value) means "on" or "detected".

If you want to send more than one Z-Wave command, you can return a list of formatted command strings.
It is often a good idea to add a delay between commands to give the device an opportunity to finish processing each command and possibly send a response before receiving the next command.
To add a delay between commands, include a string of the form ``"delay N"`` where N is the number of milliseconds to delay.
There is a helper method ``delayBetween()`` that will take a list of commands and insert delay commands between them:

.. code-block:: groovy

    def off() {
        delayBetween([
            zwave.basicV1.basicSet(value: 0).format(),
            zwave.switchBinaryV1.switchBinaryGet().format()
        ], 100)
    }

This example returns the output of ``delayBetween``, and thus will send a BasicSet command, followed by a 100 ms delay (0.1 seconds), then a SwitchBinaryGet command in order to check immediately that the state of the switch was indeed changed by the *set* command.

----

Sending commands in response to Events
--------------------------------------

In some situations, instead of sending a command in response to a request by the user, you want to automatically send a command to the device on receipt of a Z-Wave command.

If you return a list from the parse method, each item of the list will be evaluated separately.
Items that are maps will be processed as Events as usual and sent to subscribed SmartApps and mobile clients.
Returned items that are HubAction items, however, will be sent via the Hub to the device, in much the same way as formatted commands returned from command methods.
The easiest way to send a command to a device in response to an Event is the ``response()`` helper, which takes a Z-Wave command or encoded string and supplies a HubAction:

.. code-block:: groovy

    def zwaveEvent(physicalgraph.zwave.commands.wakeupv1.WakeUpNotification cmd)
    {
        def event = createEvent(descriptionText: "${device.displayName} woke up", displayed: false)
        def cmds = []
        cmds << zwave.batteryV1.batteryGet().format()
        cmds << "delay 1200"
        cmds << zwave.wakeUpV1.wakeUpNoMoreInformation().format()
        [event, response(cmds)] // return a list containing the event and the result of response()
    }

The above example uses the ``response()`` helper to send Z-Wave commands and delay commands to the device whenever a WakeUpNotification Event is received.
The reception of this Event that indicates that the sleepy device is temporarily listening for commands.
In addition to creating a hidden Event, the handler will send a BatteryGet request, wait 1.2 seconds for a response, and then issue a WakeUpNoMoreInformation command to tell the device it can go back to sleep to save battery.
