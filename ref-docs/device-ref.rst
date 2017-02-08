.. _device_ref:

Device
======

The Device object represents a physical device in a SmartApp. When a user installs a SmartApp, they typically will select the devices to be used by the SmartApp. SmartApps can then interact with these Device objects to get device information, or send commands to the Device.

Device objects cannot be instantiated, but are created by the SmartThings platform and available via the name given in the preferences definition of a SmartApp:

.. code-block:: groovy

    preferences {
        section() {
            // prompt user to select a device that supports the switch capability.
            // assign the chosen device to a variable named "theswitch"
            input "theswitch", "capability.switch"
        }
    }
    ...
    // access Device instance using the input name:
    def deviceDisplayName = theswitch.displayName
    ...

.. note::

    Event history is limited to the last seven days. Methods that query devices for event history will only query the last seven days. This will be called out in those methods, but is good to be generally aware of.

----

.. _device_attribute_state:

<attribute name>State
---------------------

The latest :ref:`state_ref` instance for the specified Attribute.

The exact name will vary depending on the device and its available attributes.

For example, the Thermostat capability supports several attributes. To get the State for any of the attributes, simply use the attribute name to construct the call. Consider the case of the "temperature" and "heatingSetpoint" attributes:

.. code-block:: groovy

    somethermostat.temperatureState
    somethermostat.heatingSetpointState

**Signature:**
    ``State <attribute name>State``

**Returns:**
    :ref:`state_ref` - The latest State instance for the specified Attribute.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "thetemp", "capability.temperatureMeasurement"
        }
    }
    ...
    // The Temperature Measurement has a "temperature" attribute.
    // so the form is <attribute name>State = temperatureState
    def tempState = thetemp.temperatureState
    ...

----

<command name>()
----------------

Executes the specified command on the Device.

The method name will vary on the Device and Command being called.

For example, a Device that supports the Switch capability has both the ``on()`` and ``off()`` commands.

Some commands may take parameters; you will pass those parameters to the command as well.

**Signature:**
    ``void <command name>()``

    ``void <command name>([delay: Number])``

    ``void <command name>(arguments)``

    ``void <command name>(arguments, [delay: Number')])``

**Parameters:**
    ``arguments`` - The arguments to the command, if required.

    `Map`_ ``options`` - A map of options to send to the command. Only the ``delay`` option is currently supported:

    ========== ====== ===========
    option     type   description
    ========== ====== ===========
    ``delay``  Number The number of milliseconds to wait before sending the command to the device.
    ========== ====== ===========

**Returns:**
    void

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
            input "thethermostat", "capability.thermostat"
        }
    }
    ...
    // call the "on" command on theswitch - no arguments
    theswitch.on()

    // call the "setHeatingSetpoint" command on thethermostat - takes an argument:
    thethermostat.setHeatingSetpoint(72)

    // A map specifiying command options can be specified as the last parameter.
    // Only supported options are "delay":
    theswitch.on([delay: 30000]) // send command after 30 seconds
    thethermostat.setHeatingSetpoint(72, [delay: 30000])
    ...

----

.. _currentAttributeName:

current<Uppercase attribute name>
---------------------------------

The latest reported values for the specified attribute.

The specific signature will vary depending on the attribute name. Follow the patter of ``current`` plus the attribute name, with the *first letter capitalized*.

For example, the Carbon Monoxide Detector capability has an attribute "carbonMonoxide". To get the latest value for this attribute, you would call:

.. code-block:: groovy

    def currentCarbon = somedevice.currentCarbonMonoxide


**Signature:**
    ``Object current<Uppercase attribute name>``

**Returns:**
    `Object`_ - the latest reported values for the specified attribute. The specific type of object returned will vary depending on the specific attribute.

.. tip::

    The exact returned type for various attributes depends upon the underlying capability and Device Handler.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
            input "thetemp", "capability.temperatureMeasurement"
        }
    }
    ...
    def switchattr = theswitch.currentSwitch
    def tempattr = thetemp.currentTemperature

    log.debug "current switch: $switchattr"
    log.debug "current temp: $tempattr"

    // switch attribute returned as a string
    log.debug "switchattr instanceof String? ${switchattr instanceof String}"

    // temperature attribute returned as a Number
    log.debug "tempatt instanceof Number? ${tempattr instanceof Number}"

    ...

----

.. _device_current_state:

currentState()
--------------

Gets the latest :ref:`state_ref` for the specified attribute.

**Signature:**
    ``State currentState(String attributeName)``

**Parameters:**
    `String`_ ``attributeName`` - The name of the attribute to get the State for.

**Returns:**
    :ref:`state_ref` - The latest State instance for the specified attribute.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "temp", "capability.temperatureMeasurement"
        }
    }
    ...
    def tempState = temp.currentState("temperature")
    log.debug "state value: ${tempState.value}"
    ...

----

.. _device_current_value:

currentValue()
--------------

Gets the latest reported values of the specified attribute.

**Signature:**
    ``Object currentValue(String attributeName)``

**Parameters:**
    `String`_ ``attributeName`` - The name of the attribute to get the latest values for.

**Returns:**
    `Object`_ - The latest reported values of the specified attribute. The exact return type will vary depending upon the attribute.

.. warning::

    The exact returned type for various attributes is not adequately documented at this time.

    Until they are, we recommend that you save often and experiment, or even look at the specific Device Handler for the device you are working with.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
            input "thetemp", "capability.temperatureMeasurement"
        }
    }
    ...
    def switchattr = theswitch.currentValue("switch")
    def tempattr = thetemp.currentValue("temperature")

    log.debug "current switch: $switchattr"
    log.debug "current temp: $tempattr"

    // switch attribute returned as a string
    log.debug "switchattr instanceof String? ${switchattr instanceof String}"

    // temperature attribute returned as a Number
    log.debug "tempatt instanceof Number? ${tempattr instanceof Number}"

    ...

----

events()
--------

Get a list of Events for the Device in reverse chronological order (newest first).

.. note::

    Only Events in the last seven days will be returned via the ``events()`` method.

**Signature:**
    ``List<Event> events([max: N])``

**Parameters:**
    `Map`_ options *(optional)* - Options for the query. Supported options below:

    ======= ========== ===========
    option  Type       Description
    ======= ========== ===========
    ``max`` `Number`_  The maximum number of Events to return. By default, the maximum is 10.
    ======= ========== ===========

**Returns:**
    `List`_ <:ref:`event_ref`> - A list of events in reverse chronological order (newest first).

**Example:**

.. code-block:: groovy

    def theEvents = somedevice.events()
    def mostRecent20Events = somedevice.events(max: 20)

----

eventsBetween()
---------------

Get a list of Events between the specified start and end dates.

.. note::

    Only Events from the *last seven days* is query-able. Using a date range that ends more than seven days ago will return zero events.

**Signature:**
    ``List<Event> eventsBetween(Date startDate, Date endDate [, Map options])``

**Parameters:**
    `Date`_ startDate - the lower Date range for the query.

    `Date`_ endDate - the upper Date range for the query.

    `Map`_ options *(optional)* - Options for the query. Supported options below:

    ======= ========== ===========
    option  Type       Description
    ======= ========== ===========
    ``max`` `Number`_  The maximum number of Events to return. By default, the maximum is 10.
    ======= ========== ===========

**Returns:**
    `List`_ <:ref:event_ref> - a list of Events between the specified start and end dates.

**Example:**

.. code-block:: groovy

    // 3 days ago
    def startDate = new Date() - 3

    // today
    def endDate = new Date()

    def theEvents = somedevice.eventsBetween(startDate, endDate)
    log.debug "there were ${theEvents.size()} events in the last three days"

    // events in the last 3 days - maximum of 5 events
    def limitedEvents = somedevice.eventsBetween(startDate, endDate, [max: 5])

----

eventsSince()
-------------

Get a list of Events since the specified date.

.. note::

    Only Events from the *last seven days* is query-able. Using a date range that ends more than seven days ago will return zero events.

**Signature:**
    ``List<Event> eventsSince(Date startDate [, Map options])``

**Parameters:**
    `Date`_ startDate - the date to start the query from.

    `Map`_ options *(optional)* - options for the query. Supported options below:

    ======= ========== ===========
    option  Type       Description
    ======= ========== ===========
    ``max`` `Number`_  The maximum number of Events to return. By default, the maximum is 10.
    ======= ========== ===========

**Returns:**
    `List`_ <:ref:`event_ref`> - a list of Events since the specified date.

**Example:**

.. code-block:: groovy

    def eventsSinceYesterday = somedevice.eventsSince(new Date() - 1)
    log.debug "there have been ${eventsSinceYesterday.size()} since yesterday"

----

getCapabilities()
-----------------

The List of Capabilities provided by this Device.

**Signature:**
    ``List<Capability> getCapabilities()``

**Returns:**
    `List`_ <:ref:`capability_ref`> - a List of Capabilities supported by this Device.

**Example:**

.. code-block:: groovy

    def supportedCaps = somedevice.capabilities
    supportedCaps.each {cap ->
        log.debug "This device supports the ${cap.name} capability"
    }

----

getDisplayName()
----------------

The label of the Device assigned by the user.

**Signature:**
    ``String getDisplayName()``

**Returns:**
    `String`_ - the label of the Device assigned by the user, ``null`` if no label iset.

**Example:**

.. code-block:: groovy

    def devLabel = somedevice.displayName
    if (devLabel) {
        log.debug "label set by user: $devLabel"
    } else {
        log.debug "no label set by user for this device"
    }

----

getHub()
--------

The Hub associated with this Device.

**Signature:**
    ``Hub getHub()``

**Returns:**
    :ref:`hub_ref` - the Hub for this Device.

**Example:**

.. code-block:: groovy

    log.debug "Hub: ${someDevice.hub.name}"

----

getId()
-------

The unique system identifier for this Device.

**Signature:**
    ``String getId()``

**Returns:**
    `String`_ - the unique system identifer for this Device.

----

getLabel()
----------

The name of the Device set by the user in the mobile application or Web IDE.

**Signature:**
    ``String getLabel()``

**Returns:**
    `String`_ - the name of the Device as configured by the user.

----

.. _device_get_last_activity:

getLastActivity()
-----------------

The date of the last event with a source of ``device``. (i.e. not commands)

**Signature:**
    ``String getLastActivity()``

**Returns:**
    `Date`_ - Date of the last event with a source of ``device``.

----

.. _device_ref_manufacturer_name:

getManufacturerName()
---------------------

Gets the manufacturer name of the device, as specified in the Device Handler's :ref:`fingerprint <device_handler_fingerprinting_best_practices>`.
If the device was joined using a generic fingerprint, it is whatever the device reported while joining.

Not applicable for cloud or LAN-connected devices (``null`` will be returned).

**Signature:**
    ``String getManufacturerName()``

**Returns:**
    `String`_ - the manufacturer name of the device, or ``null``.

**Example:**

.. code-block:: groovy

    preferences {
        input "switches", "capability.switch", multiple: true
    }

    def installed() {
        switches.each {
            log.debug "switch id: ${it.id}, manufacturer name: ${it.getManufacturerName()}"
        }
    }

----

.. _device_ref_model_name:

getModelName()
--------------

Gets the model name of the device, as specified in the Device Handler's :ref:`fingerprint <device_handler_fingerprinting_best_practices>`.
If the device was joined using a generic fingerprint, it is whatever the device reported while joining.

Not applicable for cloud or LAN-connected devices (``null`` will be returned).

**Signature:**
    ``String getModelName()``

**Returns:**
    `String`_ - the model name of the device, or ``null``.

**Example:**

.. code-block:: groovy

    preferences {
        input "switches", "capability.switch", multiple: true
    }

    def installed() {
        switches.each {
            log.debug "switch id: ${it.id}, model name: ${it.getModelName()}"
        }
    }

----

.. _device_get_status:

getStatus()
-----------

Get the current status of the Device. If no status is found then ``INACTIVE`` is returned.

**Signature:**
    ``String getStatus()``

**Returns:**
    `String`_ - the status of the Device or ``INACTIVE`` if one doesn't exist.

----

getName()
---------

The internal name of the Device. Typically assigned by the system and editable only by a user in the IDE.

**Signature:**
    ``String getName()``

**Returns:**
    `String`_ - the internal name of the Device.

----

.. _supportedAttributes:

getSupportedAttributes()
------------------------

The list of :ref:`attribute_ref` s for this Device.

**Signature:**
    ``List<Attribute> getSupportedAttributes()``

**Returns:**
    `List`_ <:ref:`attribute_ref`> - the list of Attributes for this Device. Includes both capability attributes as well as Device-specific attributes.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
        }
    }
    ...
    def theAtts = theswitch.supportedAttributes
    theAtts.each {att ->
        log.debug "Supported Attribute: ${att.name}"
    }
    ...

----

getSupportedCommands()
----------------------

The list of :ref:`command_ref` s for this Device.

**Signature:**
    ``List<Command> getSupportedCommands()``

**Returns:**
    `List`_ <:ref:`command_ref`> - the list of Commands for this Device. Includes both capability commands as well as Device-specific commands.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
        }
    }
    ...
    def theCommands = theswitch.supportedCommands
    theCommands.each {com ->
        log.debug "Supported Command: ${com.name}"
    }
    ...

----

hasAttribute()
--------------

Determine if this Device has the specified attribute.

.. tip::

    Attribute names are case-sensitive.

**Signature:**
    ``Boolean hasAttribute(String attributeName)``

**Parameters:**
    `String`_ ``attributeName`` - the name of the attribute to check if the Device supports.

**Returns:**
    `Boolean`_ - ``true`` if this Device has the specified attribute. Returns a non-true value if not (may be ``null``).

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
            input "thetemp", "capability.temperatureMeasurement"
        }
    }
    ...
    def hasTempAttr = thetemp.hasAttribute("temperature")
    // true, since this device supports the 'temperature' capability
    log.debug "${thetemp.displayName} has temperature attribute? $hasTempAttr"

    def hasTempAttrCaseSensitive = thetemp.hasAttribute("Temperature")
    if (hasTempAttrCaseSensitive) {
        log.debug "${thetemp.displayName} supports the Temperature attribute."
    } else {
        // this block will execute, since attribute names are case sensitive
        log.debug "${thetemp.displayName} does NOT support the Temperature attribute."
    }

    ...

----

hasCapability()
---------------

Determine if this Device supports the specified capability name.

.. tip::

    Capability names are case-sensitive.

**Signature:**
    ``Boolean hasCapability(String capabilityName)``

**Parameters:**
    `String`_ ``capabilityName`` - the name of the capability to check if the Device supports.

**Returns:**
    `Boolean`_ - ``true`` if this Device has the specified capability. Returns a non-true value if not (may be ``null``).

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
            input "thetemp", "capability.temperatureMeasurement"
        }
    }
    ...
    def hasSwitch = theswitch.hasCapability("Switch")
    def hasSwitchCaseSensitive = theswitch.hasCapability("switch")
    def hasPower = theswitch.hasCapability("Power")

    // true
    log.debug "${theswitch.displayName} has Switch capability? $hasSwitch"

    if (!hasSwitchCaseSensitive) {
        // enters this block (names are case-sensitive!)
        log.debug "${theswitch.displayName} does not have the switch capability"
    }

    // true
    log.debug "${theswitch.displayName} also has Power capability? $multiCapabilities"

    ...

----

hasCommand()
------------

Determine if this Device has the specified command name.

.. tip::

    Command names are case-sensitive.

**Signature:**
    ``Boolean hasCommand(String commandName)``

**Parameters:**
    `String`_ ``commandName`` - the name of the command to check if the Device supports.

**Returns:**
    `Boolean`_ - ``true`` if this Device has the specified command. Returns a non-true value if not (may be ``null``).

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
            input "switchlevel", "capability.switchLevel"
        }
    }
    ...

    def hasOn = theswitch.hasCommand("on")
    def hasOnCaseSensitive = theswitch.hasCommand("On")

    // true
    log.debug "${theswitch.displayName} has on command? $hasOn"

    if (!hasOnCaseSensitive) {
        // enters this block - case-sensitive!
        log.debug "${theswitch.displayName} does not have On command"
    }

    def hasSetLevelCommand = switchlevel.hasCommand("setLevel")
    // true
    log.debug "${switchlevel.displayName} has command setLevel? $hasSetLevelCommand"
    ...

----

latestState()
-------------

Get the latest Device State record for the specified attribute.

**Signature:**
    ``State latestState(String attributeName)``

**Parameters:**
    `String` ``attributeName`` - The name of the attribute to get the State record for.

**Returns:**
    :ref:`state_ref` - The latest State record for the attribute specified for this Device.

**Example:**

.. code-block:: groovy

    def latestDeviceState = somedevice.latestState("someAttribute")
    log.debug "latest state value: ${latestDeviceState.value}"

----

.. _device_latest_value:

latestValue()
-------------

Get the latest reported value for the specified attribute.

**Signature:**
    ``Object latestValue(String attributeName)``

**Parameters:**
    `String`_ ``attributeName`` - the name of the attribute to get the latest value for.

**Returns:**
    `Object`_ - the latest reported value. The exact type returned will vary depending upon the attribute.

.. warning::

    The exact returned type for various attributes is not adequately documented at this time.

    Until they are, we recommend that you save often and experiment, or even look at the specific Device Handler for the device you are working with.


**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
            input "thetemp", "capability.temperatureMeasurement"
        }
    }
    ...
    def switchattr = theswitch.latestValue("switch")
    def tempattr = thetemp.latestValue("temperature")

    log.debug "current switch: $switchattr"
    log.debug "current temp: $tempattr"

    // switch attribute returned as a string
    log.debug "switchattr instanceof String? ${switchattr instanceof String}"

    // temperature attribute returned as a Number
    log.debug "tempatt instanceof Number? ${tempattr instanceof Number}"

    ...


----

statesBetween()
---------------

Get a list of Device :ref:`state_ref` objects for the specified attribute between the specified times in reverse chronological order (newest first).

.. note::

    Only State instances from the *last seven days* is query-able. Using a date range that ends more than seven days ago will return zero State objects.

**Signature:**
    ``List<State> statesBetween(String attributeName, Date startDate, Date endDate [, Map options])``

**Parameters:**
    `String`_ attributeName - The name of the attribute to get the States for.

    `Date`_ ``startDate`` - The beginning date for the query.

    `Date`_ ``endDate`` - The end date for the query.

    `Map`_ options *(optional)* - options for the query. Supported options below:

    ======= ========== ===========
    option  Type       Description
    ======= ========== ===========
    ``max`` `Number`_  The maximum number of Events to return. By default, the maximum is 10.
    ======= ========== ===========

**Returns:**
    `List`_ <:ref:`state_ref`> - A list of State objects between the dates specified. A maximum of 1000 :ref:`state_ref` objects will be returned.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
        }
    }
    ...
    def start = new Date() - 5
    def end = new Date() - 1

    def theStates = theswitch.statesBetween("switch", start, end)
    log.debug "There are ${theStates.size()} between five days ago and yesterday"
    ...

----

statesSince()
-------------

Get a list of Device :ref:`state_ref` objects for the specified attribute since the date specified.

.. note::

    Only State instances from the *last seven days* is query-able. Using a date range that ends more than seven days ago will return zero State objects.

**Signature:**
    ``List<State> statesSince(String attributeName, Date startDate [, Map options])``

**Parameters:**
    `String`_ attributeName - The name of the attribute to get the States for.

    `Date`_ ``startDate`` - The beginning date for the query.

    `Map`_ options *(optional)* - options for the query. Supported options below:

    ======= ========== ===========
    option  Type       Description
    ======= ========== ===========
    ``max`` `Number`_  The maximum number of Events to return. By default, the maximum is 10.
    ======= ========== ===========

**Returns:**
    `List`_ <:ref:`state_ref`> - A list of State records since the specified start date. A maximum of 1000 :ref:`state_ref` instances will be returned.

**Example:**

.. code-block:: groovy

    preferences {
        section() {
            input "theswitch", "capability.switch"
        }
    }
    ...
    def theStates = theswitch.statesBetween("switch", new Date() -3)
    log.debug "There are ${theStates.size()} State records in the last 3 days"
    ...

----

.. _BigDecimal: http://docs.oracle.com/javase/7/docs/api/java/math/BigDecimal.html
.. _Boolean: http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html
.. _Date: http://docs.oracle.com/javase/7/docs/api/java/util/Date.html
.. _Map: http://docs.oracle.com/javase/7/docs/api/java/util/Map.html
.. _Number: http://docs.oracle.com/javase/7/docs/api/java/lang/Number.html
.. _Object: http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html
.. _List: http://docs.oracle.com/javase/7/docs/api/java/util/List.html
.. _String: http://docs.oracle.com/javase/7/docs/api/java/lang/String.html
