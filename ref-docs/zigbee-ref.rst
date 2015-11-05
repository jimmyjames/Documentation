.. _zigbee_ref:

ZigBee
======

<Description of the ZigBee Object - purpose and how to access (``zigbee`` object injected into every device type handler). Also probably add a link to the (updated) ZigBee guide for more information>

----

<all methods properties documented here, in alphabetical order, separeted with a "---". See other reference material for examples, and a few stubs below. Methods have a "()" after them, properties do not>

getKnownDescription()
~~~~~~~~~~~~~~~~~~~~~

<description of method>

**Signature:**
    ``Map getKnownDescription(String description)``

**Returns:**

    `Map`_ - <description of return value. In the case of maps, expected keys and values should also be documented.

**Example:**

.. code-block:: groovy

    def parse(description) {
        ...
        def knownDescription = zigbee.getKnownDescription(description)
        // returns empty map if could not get a known description
        if (knownDescription) {
            ...
        } else {
            // getKnownDescription unable to get a known description,
            // handle some other way
        }
    }

----

on()
~~~~

<description of method>

**Signature:**
    ``todo``

**Returns:**
    TODO

**Example:**

.. _code-block:: groovy

    // TODO

----

.. define links here

.. _Map: http://docs.oracle.com/javase/7/docs/api/java/util/Map.html
