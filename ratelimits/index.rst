.. _rate_limits:

===========
Rate Limits
===========

Rate limiting ensures that no single SmartApp or Device Handler will consume too many shared resources.

Rate limits apply to SmartApps, Device Handlers, and Web Services SmartApps.

-----

SmartApp and Device Handler rate limits
---------------------------------------

SmartApps and Device Handlers are monitored for excessive resource utilization on two measures: **Execution Time Limits** and **Execution Count Limits.**

Execution time limits
^^^^^^^^^^^^^^^^^^^^^

- Methods are limited to a continuous execution time of 20 seconds.
- SmartApps are limited to a total continuous execution time of 40 seconds.
- Device Handlers are limited to a total continuous execution time of 40 seconds.

If these limits are exceeded, the current execution will be suspended.

Execution count limits
^^^^^^^^^^^^^^^^^^^^^^

A SmartApp or a Device Handler is limited to no more than 250 executions in 60 seconds. If the limit of 250 executions is reached in a 60-second time window, no further executions will occur until the next time window. A log entry will be created for the SmartApp or the Device Handler that was rate limited. The count will start over when the current time window closes and the next time window begins.

Ways to avoid hitting rate limits
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A common cause for exceeding the 250 executions within 60 seconds limit is excessive subscriptions that might result in an infinite loop of events. For example, subscribing to an “on” and “off” Event and the “on” command triggers the “off” Event and vice versa - leading to a never-ending chain of event handlers being called. It is also possible that a SmartApp that subscribes to a very large number of particularly “chatty” devices may run into this limit. Making sure that your SmartApp subscriptions are not excessive in number will help avoid hitting the rate limit.

Similarly, a Device Handler may exceed Rate Limit when it sends many commands to one device by receiving a large number of Event subscriptions (if that doesn’t first hit the limit for SmartApps). For example, DLNA players that are extremely chatty, or devices that bind to frequently changing energy/power values may also encounter this limit. Ensure that your Device Handler does not issue too many commands to one single device in a single 60-second time window.

----

.. _web_services_rate_limiting:

Web services SmartApps rate limits
----------------------------------

SmartApps or Device Handlers that expose their web services APIs are limited to receiving 250 requests in a single 60-second time window.

There are various headers available on every request that provide information about the current rate limit limits for a given installed SmartApp or Device Handler. These are discussed further below.


Rate limit headers
^^^^^^^^^^^^^^^^^^

The SmartThings platform will set three HTTP headers on the response for every inbound API call, so that a client may understand the current rate limiting status:

*X-RateLimit-Limit: 250*
   The rate limit - in this example, the limit is 250 requests.

*X-RateLimit-Current: 1*
   The current count of requests for the given time window. In this example, there has been one request within the current rate limit time window.

*X-RateLimit-TTL: 58*
   The time remaining in the current rate limit window. In this example, there is 58 seconds remaining before the current rate limit window resets.


Rate limit HTTP status code
^^^^^^^^^^^^^^^^^^^^^^^^^^^

In addition to the three HTTP headers above, when the rate limit has been exceeded, the HTTP status code of 429 will be sent on the response, as shown below.


Rate limit error handling
^^^^^^^^^^^^^^^^^^^^^^^^^

The following error may be returned by the SmartThings platform when a Rate Limit is hit:

=========================== =============================================================================================================== =====
HTTP Response Code          Error Message                                                                                                   Cause
=========================== =============================================================================================================== =====
``429 (Too Many Requests)`` {"error": true, "type": "RateLimit", "message": "Please try again later"}                                       The rate limit for this SmartApp installation has been exceeded.
=========================== =============================================================================================================== =====

----

.. _sms_rate_limits:

SMS rate limits
---------------

No more than 15 SMS messages may be sent to the same number per minute.

If this limit is exceeded, no additional SMS messages will be sent until the next minute.

.. note::

    This limit applies **per number**, not per SmartApp or user.
