.. _mode_ref:

Mode
====

Modes can be thought of as behavior filters for your home. Users want to change how things act or behave in their home based on the Mode you’re in.

SmartThings developers cannot create a new Mode. The most common way to interact with a Mode instance is by using the :ref:`location_ref` to get Mode information:

.. code-block:: groovy

    // Get the current Mode
    def curMode = location.currentMode

    // Get a list of all Modes for this location
    def allModesForLocation = location.modes

----

getId()
-------

The unique internal system identifier of the Mode.

**Signature:**
    ``String getId()``

**Returns:**
    `String`_ - the unique internal system identifier for the Mode.

.. code-block:: groovy

    def curMode = location.currentMode
    log.debug "The current Mode ID is: ${curMode.id}"

----

getName()
---------

The name of the Mode.

**Signature:**
    ``String getName()``

**Returns:**
    `String`_ - the name of the Mode, usually assigned by the user.

**Example:**

.. code-block:: groovy

    def curMode = location.currentMode
    log.debug "The current mode name is: ${curMode.name}"


.. _String: http://docs.oracle.com/javase/7/docs/api/java/lang/String.html
