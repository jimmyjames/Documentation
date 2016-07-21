.. _async_response_ref_ref:

=============
AsyncResponse
=============

.. _async_response_ref_get_data:

getData()
---------

----

.. _async_response_ref_get_error_data:

getErrorData()
--------------

----

.. _async_response_ref_get_error_json:

getErrorJson()
--------------

----

.. _async_response_ref_get_error_message:

getErrorMessage()
-----------------

TODO - what is failed on AsyncResponse, and how is it set? Error api's check the failed field or if the status is > 299 or < 200. This means 304 might not be a "failure" but would be treated similarly (error message is different for non 2XX responses than for "failure")

----

.. _async_response_ref_get_error_xml:

getErrorXml()
-------------

----

.. _async_response_ref_get_json:

getJson()
---------

Parses the response body as json and returns the corresponding data structure.
This will throw an exception if the body fails to parse as json, if the request failed to get a response (e.g. Connection timeout, Response timeout), or if the status code was not 2XX).
If you want to get the status of a non-200 response that can be done with the :ref:`async_response_get_error_json` method.

**Signature:**
    ``JSONElement getJson()``

**Returns:**
    org.codehaus.groovy.grails.web.json.JSONElement - the parsed data structure from the response body

**Example:**

.. code-block:: groovy

    include 'asynchttp'

    def initialize() {
        def params = [
            uri: 'https://someapi.com',
            path: '/some/path',
            requestContentType: 'application/json'
        ]
        asynchttp.get(processResponse, params)
    }

    def processResponse(response, data) {
        try {
            log.debug "json response is: $response.json"
        } catch (e) {
            log.error("exception during response processing", e)
        }

    }

----

.. _async_response_ref_get_warning_messages:

getWarningMessages()
---------------

----

.. _async_response_ref_get_xml:

getXml()
--------

----

.. _async_response_ref_has_error:

hasError()
----------
