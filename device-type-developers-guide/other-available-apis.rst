====================
Other Useful Methods
====================

Device Handlers have available to them other APIs for features like scheduling, storing data, and making HTTP requests.
While not often necessary for Device Handlers, these features can be useful for certain use cases.

----

Scheduling
----------

Device Handlers can schedule future executions, just like SmartApps, with one notable difference - the ``runEvery*()`` methods are **not available**.

You can learn about scheduling in the :ref:`smartapp-scheduling` guide.

----

Storing Data
------------

Device Handlers can persist small amounts of data across exections using ``state``, just as SmartApps.
Note that Atomic State is **not available** to Device Handlers.

You can learn about storing data in the :ref:`storing-data` guide.

----

Making External HTTP Requests
-----------------------------

Device Handlers can make HTTP requests to third party services, just like SmartApps.

- :ref:`calling_web_services`
- :ref:`async_http_guide`
