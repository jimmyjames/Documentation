Preferences
===========

Device Handlers may specify simple preferences to allow the user to configure certain properties of their device.

----

Overview
--------

When a user adds a device to SmartThings, they are given the option to name their device and select a room.
If there are additional configuration options that you wish to expose to the user, you can specify them using ``preferences``.
They will appear on the same page as the device name preference.

----

Defining preferences
--------------------

Device preferences should be placed in the Device Handler's ``metadata``.
They can appear anywhere in the ``metadata`` definition.

.. code-block:: groovy

    metadata {
        definition(...) {...}
        tiles() {...}
        preferences {
            input "tempOffset", "number", title: "Degrees", description: "Adjust temperature by this many degrees",
                  range: "*..*", displayDuringSetup: false
        }
    }

----

Device preferences are flat
---------------------------

*Device preferences are static, and single-page.*

Multiple page preferences and dynamic preferences pages are not supported in Device Handlers.
Device Handler preferences are a simple list of inputs:

.. code-block:: groovy

    preferences {
        input name: "text", type: "text", title: "Text", description: "Enter Text", required: true
    }

----

Display on setup
----------------

Use ``displayDuringSetup: true`` to force the preference input to be displayed when the device is being added to SmartThings:

.. code-block:: groovy

    preferences {
        input name: "email", type: "email", title: "Email", description: "Enter Email Address", required: true,
              displayDuringSetup: true
    }

Preferences that do not specify this value, or specify ``displayDuringSetup: false``, will only appear when the user presses the Settings button on the Device in the mobile application.

----

Supported input types
---------------------

The following input types are supported in Device Handler preferences:

- ``bool``
- ``decimal``
- ``email``
- ``enum``
- ``number``
- ``password``
- ``phone``
- ``time``
- ``text``

----

Getting preference input values
-------------------------------

Just as with SmartApp preferences, the name of the preferences input is a reference to the preference value:

.. code-block:: groovy

    metadata {
        definition(...) {...}
        tiles() {...}
        preferences {
            input "tempOffset", "number", title: "Degrees", description: "Adjust temperature by this many degrees", range: "*..*", displayDuringSetup: false
        }
    }

    def someCommandMethod() {
        if (tempOffset) {
            // handle offset value
        }
    }

.. note::

    Preference values are only available to the Device Handler when it is executing in response to Events or commands.
    It is not possible to use preference values in other ``metadata`` definitions, including ``tiles()``.

----

Example
-------

.. code-block:: groovy

    metadata {
        simulator {
            // TODO: define status and reply messages here
        }

        tiles {
            // TODO: define your main and details tiles here
        }

        preferences {
            input name: "email", type: "email", title: "Email", description: "Enter Email Address", required: true, displayDuringSetup: true
            input name: "text", type: "text", title: "Text", description: "Enter Text", required: true
            input name: "number", type: "number", title: "Number", description: "Enter number", required: true
            input name: "bool", type: "bool", title: "Bool", description: "Enter boolean", required: true
            input name: "password", type: "password", title: "password", description: "Enter password", required: true
            input name: "phone", type: "phone", title: "phone", description: "Enter phone", required: true
            input name: "decimal", type: "decimal", title: "decimal", description: "Enter decimal", required: true
            input name: "time", type: "time", title: "time", description: "Enter time", required: true
            input name: "options", type: "enum", title: "enum", options: ["Option 1", "Option 2"], description: "Enter enum", required: true
        }
    }

    def someCommand() {
        log.debug "email: $email"
        log.debug "text: $text"
        log.debug "bool: $bool"
        log.debug "password: $password"
        log.debug "phone: $phone"
        log.debug "decimal: $decimal"
        log.debug "time: $time"
        log.debug "options: $options"
    }

----

Additional notes
----------------

- Setting a default value (``defaultValue: "foobar"``) for an input may render that selection in the mobile app, but the user still needs to enter data in that field. It's recommended to not use ``defaultValue`` to avoid confusion.
