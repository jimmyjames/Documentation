.. _installed_smart_app_wrapper:

========================
InstalledSmartApp
========================

The ``InstalledSmartApp`` class represents a SmartApp.
Every SmartApp has an instance of ``InstalledSmartApp`` available to it via the ``app`` object.
``InstalledSmartApp`` is also used in :ref:`parent_child_smartapps`, specifically it is the return type of :ref:`add_child_app`.

----

currentState()
--------------

Gets the current state of the given attribute.

**Signature:**
    ``AppState`` currentState(String attributeName)

**Parameters:**
    `String`_ attributeName - The attribute name to get the state for

**Returns:**
    :ref:`app_state` - The latest state information for the specified attribute

**Example:**

.. code-block:: groovy

    ...
    def myAppState = app.currentState("someAttribute")
    log.debug "state value: ${myAppState.value}"
    ...

----

getAccountId()
-----------------

Gets the account ID of the owner of the Location in to which this SmartApp is installed.

**Signature:**
    ``String getAccountId()``

**Returns:**
    `String`_ - The account ID of the owner of the Location in to which this SmartApp is installed.

**Example:**

.. code-block:: groovy

    def accountId = app.getAccountId()
    log.debug "This account ID of this installed SmartApp is $accountId"

----

getAllChildApps()
-----------------

Gets a list of child SmartApps associated with this SmartApp.
This returns child SmartApps that have both "complete" and "incomplete" :ref:`installation states <isa_get_installation_state>`.

**Signature:**
    ``def getAllChildApps()``

**Returns:**
    `List`_ < :ref:`installed_smart_app_wrapper` > - A list of child SmartApps

**Example:**

.. code-block:: groovy

    def childApps = app.getAllChildApps()
    log.debug "The app has ${childApps.size()} child SmartApps"

----

getAppSettings()
----------------

Gets the settings currently associated with this SmartApp.

.. note::
    This method applies to the SmartApp's :ref:`app_settings`.

**Signature:**
    ``Map`` app.getAppSettings()

**Returns:**
    `Map`_ - A map of key, value pairs that represent the current SmartApp settings

----

getChildApps()
--------------

Gets a list of child apps associated with this SmartApp.
This only returns child SmartApps that have an :ref:`installation states <isa_get_installation_state>` of "complete".

**Signature:**
    ``def getChildApps()``

**Returns:**
    `List`_ < :ref:`installed_smart_app_wrapper` > - A list of child SmartApps

**Example:**

.. code-block:: groovy

    def childApps = app.childApps

    // Update the label for all child apps
    childApps.each {
        if (!it.label?.startsWith(app.name)) {
            it.updateLabel("$app.name/$it.label")
        }
    }

----

getChildDevices()
-----------------

Gets a list of child devices associated with this SmartApp.

**Signature:**
    ``List<Device>`` getChildDevices()

**Returns:**
    `List`_ < :ref:`device_ref` > - A list of child devices

**Example:**

.. code-block:: groovy

    // When uninstalling a SmartApp, remove all devices created.
    // This is most likely used with the connect app type architecture.
    def uninstalled() {
        removeChildDevices(app.childDevices)
    }

    private removeChildDevices(delete) {
	    log.debug "deleting ${delete.size()} dropcams"
	    delete.each {
		    state.suppressDelete[it.deviceNetworkId] = true
		    deleteChildDevice(it.deviceNetworkId)
		    state.suppressDelete.remove(it.deviceNetworkId)
	    }
    }

----

getExecutionIsModeRestricted()
------------------------------

Returns `true` if the SmartApp's execution is restricted by modes.
The restrictive modes would have been configured when the SmartApp was installed.

**Signature:**
    ``Boolean`` getExecutionIsModeRestricted()()

**Returns:**
    `Boolean`_ - True if the execution of the SmartApp is restricted to certain modes

----

getExecutableModes()
--------------------

Get a list of modes that this SmartApp is allowed to execute in.

**Signature:**
    :ref:`mode_ref` getExecutableModes()

**Returns:**
    :ref:`mode_ref` - A list of modes that this SmartApp is allowed to execute in

----

getId()
-------

Get the id of the SmartApp

**Signature:**
    ``String getId()``

**Returns:**
    The ID of the SmartApp

----

.. _isa_get_installation_state:

getInstallationState()
----------------------

Get the current installation state of the SmartApp.

**Signature:**
    ``String getInstallationState()``

**Returns:**
    The current installation state of the SmartApp. Can be ``incomplete`` or ``complete``

----

getLabel()
----------

Get the label of the SmartApp

**Signature:**
    ``String getLabel()``

**Returns:**
    The label of the SmartApp

----

getName()
---------

Get the name of the SmartApp

**Signature:**
    ``String getName()``

**Returns:**
    The name of the SmartApp

----

getNamespace()
--------------

Get the namespace of the SmartApp

**Signature:**
    ``String getNamespace()``

**Returns:**
    The namespace of the SmartApp

----

getParent()
-----------

Gets the parent of the SmartApp.

**Signature:**
    :ref:`installed_smart_app_wrapper` getParent()

**Returns:**
    :ref:`installed_smart_app_wrapper` - The parent of this SmartApp

----

getSubscriptions()
------------------

**Signature:**
    ``List<EventSubscriptionWrapper>`` getSubscriptions()

**Returns**
    `List<EventSubscriptionWrapper[]` - A list of subscriptions associated with this SmartApp

----

statesBetween()
---------------

Get a list of app :ref:`app_state` objects for the specified attribute between the specified times in reverse chronological order (newest first).

.. note::

    Only State instances from the *last seven days* is query-able. Using a date range that ends more than seven days ago will return zero State objects.

**Signature:**
    ``List<AppState> statesBetween(String attributeName, Date startDate, Date endDate [, Map options])``

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
    `List`_ <:ref:`app_state`> - A list of State objects between the dates specified. A maximum of 1000 :ref:`state_ref` objects will be returned.

**Example:**

.. code-block:: groovy

    ...
    def start = new Date() - 5
    def end = new Date() - 1

    def theStates = app.statesBetween("myAttribute", start, end)
    log.debug "There are ${theStates.size()} between five days ago and yesterday"
    ...

----

statesSince()
-------------

Get a list of app :ref:`app_state` objects for the specified attribute since the date specified.

.. note::

    Only State instances from the *last seven days* is query-able. Using a date range that ends more than seven days ago will return zero State objects.

**Signature:**
    ``List<AppState> statesSince(String attributeName, Date startDate [, Map options])``

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
    `List`_ <:ref:`app_state`> - A list of State records since the specified start date. A maximum of 1000 :ref:`state_ref` instances will be returned.

**Example:**

.. code-block:: groovy

    def theStates = app.statesSince("myAttribute", new Date() -3)
    log.debug "There are ${theStates.size()} State records in the last 3 days"
    ...

----

updateLabel()
-------------

Update the label of this SmartApp.

**Signature:**
    ``void updateLabel(String label)``

**Parameters:**
    `String`_ label - The updated label value

**Returns:**
    `void`

----

.. _Boolean: http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html
.. _Date: http://docs.oracle.com/javase/7/docs/api/java/util/Date.html
.. _Map: http://docs.oracle.com/javase/7/docs/api/java/util/Map.html
.. _Number: http://docs.oracle.com/javase/7/docs/api/java/lang/Number.html
.. _Object: http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html
.. _List: http://docs.oracle.com/javase/7/docs/api/java/util/List.html
.. _String: http://docs.oracle.com/javase/7/docs/api/java/lang/String.html
