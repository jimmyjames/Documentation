.. _async_http_response_ref:

====================
AsyncResponse (Beta)
====================

.. include:: ../common/async-http-beta-note.txt

The ``AsyncResponse`` object represents the response of an asynchronous HTTP request.
An instance of it is passed to the response handler specified when making the request.

This documentation is specific to handling responses from asynchronous HTTP requests.
For reference documentation regarding making the request, see the :doc:`async-http-ref` documentation.

----

.. _async_response_ref_get_data:

getData()
---------

Return the response as a string.
Throws an exception if the request failed to get a response (e.g. Connection timeout, Response timeout), or if the status code was not 2XX.

**Signature:**
    ``String getData()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        log.debug "raw response: $response.data"
    }

----

.. _async_response_ref_get_error_data:

getErrorData()
--------------

In the Event of an error response, returns the response body as a string.
Throws an exception if the response is successful and has a 2XX response.

**Signature:**
    ``String getErrorData()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        if (response.hasError()) {
            log.debug "raw response: $response.errorData"
        }
    }

----

.. _async_response_ref_get_error_json:

getErrorJson()
--------------

If the response has an error, parses the response body as JSON and returns the corresponding data structure.
Throws an exception if the response is successful and has a 2XX response, or if the body fails to parse as JSON.

**Signature:**
    ``JSONElement getErrorJson()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        if (response.hasError()) {
            try {
                log.debug "error json: $response.errorJson"
            } catch (e) {
                log.debug "error parsing json - raw error data is $response.errorData"
            }
        }
    }

----

.. _async_response_ref_get_error_message:

getErrorMessage()
-----------------

Gets a human-readable error message if the request failed to get a response (e.g. Connection timeout, Response timeout), or if the status code was not 2XX.

**Signature:**
    ``String getErrorMessage()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        if (response.hasError()) {
            log.debug "error on response: $response.errorMessage"
        }
    }

----

.. _async_response_ref_get_error_xml:

getErrorXml()
-------------

If the response has an error, parses the response body as XML and returns the corresponding data structure.
Throws an exception if the response is successful and has a 2XX response, or if the body fails to parse as XML.

.. note::
    You can learn more about Groovy XML parsing and GPath `here <http://groovy-lang.org/processing-xml.html#_gpath>`_.

**Signature:**
    ``GPathResult getErrorXml()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        if (response.hasError()) {
            try {
                def xml = response.errorXml
            } catch(e) {
                log.warn "could not parse body to XML"
            }
        }
    }

----

.. _async_response_ref_get_headers:

getHeaders()
------------

Get the headers of the response.

**Signature:**
    ``Map<String, String> getHeaders()``

**Returns:**
    `Map`_ < `String`_ , `String`_ > - A map of response headers keyed by the header name.

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        def headers = response.headers
        headers.each {header, value ->
            log.debug "$header: $value"
        }
    }

----

.. _async_response_ref_get_json:

getJson()
---------

Parses the response body as JSON and returns the corresponding data structure.
Throws an exception if the body fails to parse as JSON, if the request failed to get a response (e.g. Connection timeout, Response timeout), or if the status code was not 2XX).

**Signature:**
    ``JSONElement getJson()``

**Example:**

.. code-block:: groovy

    include 'asynchttp_v1'

    def initialize() {
        def params = [
            uri: 'https://someapi.com',
            path: '/some/path',
            requestContentType: 'application/json'
        ]
        asynchttp_v1.get(processResponse, params)
    }

    def processResponse(response, data) {
        try {
            log.debug "json response is: $response.json"
        } catch (e) {
            log.error("exception during response processing", e)
        }

    }

----

.. _async_response_ref_get_status:

getStatus()
-----------

Get the status code of the response.

**Signature:**
    ``int getStatus()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        log.debug "response status code is: $response.status"
    }

----

.. _async_response_ref_get_warning_messages:

getWarningMessages()
--------------------

Gets a list of warning messages, if applicable.
Returns an empty list if there are no warning messages.

Typically used for debugging purposes.
For example, a warning message will be found if the response is larger than the allowable limit.

**Signature:**
    ``List<String> getWarningMessages()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        log.debug "warning messages: $response.warningMessages"
    }

----

.. _async_response_ref_get_xml:

getXml()
--------

Parses the response body as XML and returns the corresponding data structure.
Throws an exception if the body fails to parse as XML, if the request failed to get a response (e.g. Connection timeout, Response timeout), or if the status code was not 2XX).

.. note::
    You can learn more about Groovy XML parsing and GPath `here <http://groovy-lang.org/processing-xml.html#_gpath>`_.

**Signature:**
    ``GPathResult getXml()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        if (!response.hasError()) {
            try {
                def xml = response.xml
            } catch(e) {
                log.warn "could not parse body to XML"
            }
        }
    }

----

.. _async_response_ref_has_error:

hasError()
----------

Return if the request has an error of some sort.
This will be ``true`` if the request failed to complete or returned a non-2XX status code, and ``false`` if the request succeeded with a 2XX status code.

**Signature:**
    ``boolean hasError()``

**Example:**

.. code-block:: groovy

    def responseHandler(response, data) {
        if (response.hasError()) {
            log.error "response has error: ${response.getErrorMessage()}"
        }
    }

----

.. _processing_xml: http://groovy-lang.org/processing-xml.html#_gpath
.. _Map: http://docs.oracle.com/javase/7/docs/api/java/util/Map.html
.. _String: http://docs.oracle.com/javase/7/docs/api/java/lang/String.html
