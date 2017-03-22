.. _web_services_smartapps_troubleshooting:

===============
Troubleshooting
===============

General
-------

Developing and testing Web Services SmartApps can be tricky, in large part due to the nature of the OAuth process.
Here are some general tips and strategies to help you be successful:

- Make you sure you have read and understand the :ref:`Web Services Authorization <webservices_authorization>` documentation.
- Remember that only SmartApps published by SmartThings can be installed into general user accounts. If you self-published the SmartApp, *only the account who published it can install the SmartApp for testing purposes.*
- Trying to complete the OAuth process through the browser, without exposing a callable URL to receive the token, will not work. Read through the :ref:`smartapp_as_web_service_part_2` to see how this can be done.
- Understand that to make API calls to the SmartApp, you must first :ref:`make a REST call to obtain the specific URL for the installed SmartApp <web_services_get_endpoints>`. This should always be made to ``https://graph.api.smartthings.com/api/smartapps/endpoints``, *regardless of the specific server the SmartApp is installed into*.

----

Errors during installation
--------------------------

When choosing a Location and selecting devices to authorize, there are some common errors that may occur.

"<clientID> is not associated with a SmartApp in Location" after selecting Location
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Problem
    When attempting to install a Web Services SmartApp via the OAuth flow, SmartThings looks for a SmartApp published to the specific server for that Location with that Client ID.
    This error results from either the SmartApp not being published to the server that the user is installing into, or from trying to install a Web Services SmartApp into an account that did not publish the SmartApp.

Solution
    If the SmartApp was self-published, make sure you are using the same account to install into (only Web Service SmartApps published by SmartThings may be installed into other user accounts).
    If it is the same account, and you are trying to install into a different Location, ensure the SmartApp is published on that Location as well (this will require handling different OAuth Client ID and Secret).

    If this is a SmartApp published by SmartThings, contact support@smartthings.com.

----

"Please select at least one device to authorize" error after clicking Authorize
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Problem
    If you have selected devices to authorize, this error likely indicates that an exception occurred during the installation process itself (in the ``installed()`` or ``updated()`` methods).

Solution
    Check Live Logging for any exceptions, and look at any code executing in the ``installed()`` or ``updated()`` methods for possible bugs.
