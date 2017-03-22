.. _webservices_authorization:

Authorization
=============

To make REST requests to a SmartApp, the client must establish a trusted relationship using an implementation of the OAuth2 Authorization Code Flow.

----

Overview
--------

The general flow is:

#. Request an authorization code.
#. Use the code to request an access token.
#. Get the endpoint URI for the SmartApp.
#. Make REST calls to the SmartApp using the endpoint URI.

As part of the authorization flow, the SmartApp will be installed to the user's selected Location.

.. include:: ../common/oauth-install-restriction.txt

.. note::

    Regardless of the server the SmartApp is actually published to, ``https://graph.api.smartthings.com`` should be used to obtain the authorization code, access token, and endpoints.

----

Get authorization code
----------------------

Authorization URL: ``https://graph.api.smartthings.com/oauth/authorize``

To obtain an authorization code, make a ``GET`` request to ``https://graph.api.smartthings.com/oauth/authorize``:

.. code-block:: bash

    GET https://graph.api.smartthings.com/oauth/authorize?
            response_type=code&
            client_id=YOUR-SMARTAPP-CLIENT-ID&
            scope=app&
            redirect_uri=YOUR-SERVER-URI


The following parameters are required:

============== ===========
parameter      value
============== ===========
response_type  Use ``code`` to obtain the authorization code.
client_id      The OAuth client ID of the SmartApp.
scope          This should always be "app" for this authorization flow.
redirect_uri   The URI of your server that will receive the authorization code. This URI must match one of the redirect URIs specified in the SmartApp settings, otherwise validation will fail.
============== ===========

This will require the user to log in with their SmartThings account credentials, choose a Location, and select what devices may be accessed by the third party.

The authorization code expires 24 hours after issue.

----

Get access token
----------------

Token URL: ``https://graph.api.smartthings.com/oauth/token``

Use the code you received to obtain the access token:

.. code::

    POST https://graph.api.smartthings.com/oauth/token HTTP/1.1
    Host: graph.api.smartthings.com
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code&code=YOUR_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=YOUR_REDIRECT_URI

The ``content-type`` header of your request should be of the type ``application/x-www-form-urlencoded``. The following form parameters are required:

=================== ===========
parameter           value
=================== ===========
grant_type          This is always "authorization_code" for this flow.
code                The code you received.
client_id           The client ID for the SmartApp.
client_secret       The client secret for the SmartApp.
redirect_uri        The URI of the server that will receive the token. This must match the URI you used to obtain the authorization code.
=================== ===========

A successful response will look like this:

.. code::

    {
      "access_token": "XXXXXXXXXXXX",
      "expires_in": 1576799999,
      "token_type": "bearer"
    }

The ``expires_in`` response is the time, in seconds from now, that this token will expire.

Once you have the token, it must be stored securely in the application.

----

.. _web_services_get_endpoints:

Get SmartApp endpoints
----------------------

You can use the token to request the callable endpoints of the SmartApp, by making a ``GET`` request to ``https://graph.api.smartthings.com/api/smartapps/endpoints``.
The access token should be supplied via a ``Authorization: Bearer`` header:

.. code-block:: bash

    GET -H "Authorization: Bearer ACCESS-TOKEN" "https://graph.api.smartthings.com/api/smartapps/endpoints"

A successful response will return a list of all installed SmartApps for the ``clientID`` associated with the given access token.

.. code-block:: javascript

    [
        {
            "oauthClient": {
                "clientId": "CLIENT-ID"
            },
            "location": {
                "id": ID,
                "name": "LOCATION-NAME"
            }
            "uri": "BASE-URL/api/smartapps/installations/INSTALLATION-ID",
            "base_url": "BASE-URL",
            "url": "/api/smartapps/installations/INSTALLATION-ID"
        },
        ...
    ]

.. important::

    The ``base_url`` (and base URL of the ``uri``) will vary depending upon the server the SmartApp is being installed to.

    SmartApps may be installed into any number of servers depending upon the location of the end-user.
    You should always use the ``uri`` and ``base_url`` to find the location this SmartApp can be reached at.

    Do not assume that the SmartApp will be installed on ``https://graph.api.smartthings.com``.

----

Make REST calls
---------------

Using the ``uri`` returned from ``/api/smartapps/endpoints``, you can then make REST calls the SmartApp.

Simply append any paths your SmartApp declares in its ``mappings`` to make the appropriate request.

For example, assuming a ``mappings`` definition like this:

.. code-block:: groovy

    mappings {
        path("/switches") {
            action: [GET: "getSwitches"]
        }
    }

    def getSwitches() {
        // ...
    }

And a URI of ``https://graph.api.smartthings.com/api/smartapps/installations/12345``, you can make a request to the ``/switches`` endpoint like this:

.. code-block:: bash

    curl -H "Authorization: Bearer ACCESS-TOKEN" -X GET "https://graph.api.smartthings.com/api/smartapps/installations/12345/switches"
