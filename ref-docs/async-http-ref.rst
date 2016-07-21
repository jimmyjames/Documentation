.. async_http_api_ref:

=================
Asynchronous HTTP
=================

.. admonition:: Beta Feature
   :class: beta-feature

   The ability to make asynchronous HTTP requests is currently available as a beta development feature.

   These APIs are subject to change without notice.

All asynchronous HTTP APIs are only availble after including the "asynchttp" API:

.. code-block:: groovy

    include 'asynchttp'

    def initialize() {
        // invoke methods on the injected asynchttp object that was included
        asynchttp.get(...)
    }

----

.. _async_http_ref_get:

get()
-----

Make a GET request which will not block execution and therefore can run longer than the execution timeout.

**Signature:**
    ``void get(String callbackMethod, Map params, Map data = null)``

**Parameters:**

    `String`_ callbackMethod - the name of the method to call with the response.

    `Map`_ params - parameters for the request. Supported keys below:

    ================== ===========
    Key                Description
    ================== ===========
    uri (required)     Either a URI or URL of of the endpoint to make a request from.
    path               Request path that is merged with the URI.
    query              Map of URL query parameters.
    headers            Map of HTTP headers.
    requestContentType The value of the ``Content-Type`` request header. Defaults to ``'application/json'``.
    contentType        The value of the ``Accept`` request header. Defaults to the value of the ``requestContentType`` parameter if not specified.
    ================== ===========

    `Map`_ data *(optional)* - A map of data to pass to the response handler.

**Example:**

.. code-block:: groovy

    include 'asynchttp'

    def initialize() {
        def params = [
            uri: 'https://api.github.com',
            path: '/search/code',
            query: [q: "httpGet+repo:SmartThingsCommunity/SmartThingsPublic"],
            contentType: 'application/json'
        ]
        asynchttp.get(processResponse, params)
    }

    def processResponse(response, data) { ... }

----

.. _async_http_ref_head:

head()
------

Make a HEAD request which will not block execution and therefore can run longer than the execution timeout.

**Signature:**
    ``void head(String callbackMethod, Map params, Map data = null)``

**Parameters:**

    `String`_ callbackMethod - the name of the method to call with the response.

    `Map`_ params - parameters for the request. Supported keys below:

    ================== ===========
    Key                Description
    ================== ===========
    uri (required)     Either a URI or URL of of the endpoint to make a request from.
    path               Request path that is merged with the URI.
    query              Map of URL query parameters.
    headers            Map of HTTP headers.
    requestContentType The value of the ``Content-Type`` request header. Defaults to ``'application/json'``.
    contentType        The value of the ``Accept`` request header. Defaults to the value of the ``requestContentType`` parameter if not specified.
    ================== ===========

    `Map`_ data *(optional)* - A map of data to pass to the response handler.

**Example:**

.. code-block:: groovy

    include 'asynchttp'

    def initialize() {
        def params = [
            uri: 'https://someapi.com',
            path: '/some/path',
            query: [key1: 'value 1']
        ]
        asynchttp.head(processResponse, params)
    }

    def processResponse(response, data) { ... }

----

.. _async_http_ref_patch:

patch()
-------

Make a PATCH request which will not block execution and therefore can run longer than the execution timeout.

**Signature:**
    ``void patch(String callbackMethod, Map params, Map data = null)``

**Parameters:**

    `String`_ callbackMethod - the name of the method to call with the response.

    `Map`_ params - parameters for the request. Supported keys below:

    ================== ===========
    Key                Description
    ================== ===========
    uri (required)     Either a URI or URL of of the endpoint to make a request from.
    path               Request path that is merged with the URI.
    query              Map of URL query parameters.
    headers            Map of HTTP headers.
    requestContentType The value of the ``Content-Type`` request header. Defaults to ``'application/json'``.
    contentType        The value of the ``Accept`` request header. Defaults to the value of the ``requestContentType`` parameter if not specified.
    body               The request body to send. Can be a string, or if the ``requestContentType`` is ``"application/json"``, a Map or List (will be serialized to JSON).
    ================== ===========

    `Map`_ data *(optional)* - A map of data to pass to the response handler.

**Example:**

.. code-block:: groovy

    include 'asynchttp'

    def initialize() {
        def params = [
            uri: 'https://someapi.com',
            path: '/some/path',
            body: [key1: 'value 1']
        ]
        asynchttp.patch(processResponse, params)
    }

    def processResponse(response, data) { ... }

----

.. _async_http_ref_post:

post()
------

Make a POST request which will not block execution and therefore can run longer than the execution timeout.

**Signature:**
    ``void post(String callbackMethod, Map params, Map data = null)``

**Parameters:**

    `String`_ callbackMethod - the name of the method to call with the response.

    `Map`_ params - parameters for the request. Supported keys below:

    ================== ===========
    Key                Description
    ================== ===========
    uri (required)     Either a URI or URL of of the endpoint to make a request from.
    path               Request path that is merged with the URI.
    query              Map of URL query parameters.
    headers            Map of HTTP headers.
    requestContentType The value of the ``Content-Type`` request header. Defaults to ``'application/json'``.
    contentType        The value of the ``Accept`` request header. Defaults to the value of the ``requestContentType`` parameter if not specified.
    body               The request body to send. Can be a string, or if the ``requestContentType`` is ``"application/json"``, a Map or List (will be serialized to JSON).
    ================== ===========

    `Map`_ data *(optional)* - A map of data to pass to the response handler.

**Example:**

.. code-block:: groovy

    include 'asynchttp'

    def initialize() {
        def params = [
            uri: 'https://someapi.com',
            path: '/some/path',
            body: [key1: 'value 1']
        ]
        asynchttp.post(processResponse, params)
    }

    def processResponse(response, data) { ... }

----

.. _async_http_ref_put:

put()
-----

Make a PUT request which will not block execution and therefore can run longer than the execution timeout.

**Signature:**
    ``void put(String callbackMethod, Map params, Map data = null)``

**Parameters:**

    `String`_ callbackMethod - the name of the method to call with the response.

    `Map`_ params - parameters for the request. Supported keys below:

    ================== ===========
    Key                Description
    ================== ===========
    uri (required)     Either a URI or URL of of the endpoint to make a request from.
    path               Request path that is merged with the URI.
    query              Map of URL query parameters.
    headers            Map of HTTP headers.
    requestContentType The value of the ``Content-Type`` request header. Defaults to ``'application/json'``.
    contentType        The value of the ``Accept`` request header. Defaults to the value of the ``requestContentType`` parameter if not specified.
    body               The request body to send. Can be a string, or if the ``requestContentType`` is ``"application/json"``, a Map or List (will be serialized to JSON).
    ================== ===========

    `Map`_ data *(optional)* - A map of data to pass to the response handler.

**Example:**

.. code-block:: groovy

    include 'asynchttp'

    def initialize() {
        def params = [
            uri: 'https://someapi.com',
            path: '/some/path',
            body: [key1: 'value 1']
        ]
        asynchttp.put(processResponse, params)
    }

    def processResponse(response, data) { ... }

----

.. _Map: http://docs.oracle.com/javase/7/docs/api/java/util/Map.html
.. _String: http://docs.oracle.com/javase/7/docs/api/java/lang/String.html
