.. _hubaction_ref:

=========
HubAction
=========

The HubAction class is used to encapsulate a detailed request string while communicating with the devices in your network.
For example, this request string can be used for search and discovery of devices in your network.
HubAction can also be used in a SmartApp or in a Device Handler to communicate with the device.

**Signature:**
	``HubAction myhubAction = new physicalgraph.device.HubAction(String action, Protocol protocol)``

	``HubAction myhubAction = new physicalgraph.device.HubAction(String action, Protocol protocol, String dni, Map options)``

	``HubAction myhubAction = new physicalgraph.device.HubAction(Map params, String dni = null, [Map options])``

**Parameters:**
	``String action`` - A string comprised of the request details targeted for the device.

	``Protocol protocol`` - Specific protocol to be used. Default value is ``Protocol.LAN``.

	``String dni`` - Device Network ID of the device. Default value is null. For dni, we recommend using MAC address and not use IP and port numbers.

	``Map options`` - Default value is null. Available options are:

	======== ===========
	Option   Description
	======== ===========
	callback Name of the callback method
	type	 Type of LAN request. Allowed values are: LAN_TYPE_CLIENT, LAN_TYPE_SERVER. Default value is LAN_TYPE_CLIENT.
	protocol Allowed values are LAN_PROTOCOL_TCP and LAN_PROTOCOL_UDP and default value is LAN_PROTOCOL_TCP. Note the difference in allowed values of this parameter when used in ``Maps params`` and ``Protocol protocol`` signatures.
	======== ===========

	``Map params`` - Available parameters are:

	============ ===========
	Parameter 	 Description
	============ ===========
	path 		 Allowed values are any string of the form ``"/somepath"``. Default value is ``"/"``.
	method 		 Allowed values are ``"POST"``, ``"GET"``, ``"PUT"`` and ``"PATCH"``. Default value is ``"POST"``.
	protocol 	 Allowed values are ``Protocol.LAN``. Default value is also ``Protocol.LAN``.
	HOST 		 The ``"IP":"port"`` string of the device.
	headers 	 A map of HTTP headers. Default values are ``['Accept': '*/*', 'User-Agent': 'Linux UPnP/1.0 SmartThings',]``. If 'Content-Type' is not included, then it is set to ``'application/json'`` if ``params:body`` is a ``Map``; otherwise 'Content-Type' is set to ``'text/xml; charset="utf-8"'``.
	query 		 A map of URL query parameters.
	body 		 Request body.
	============ ===========

**Example:**

Send a device discovery command string to look for Samsung SmartCam device in your LAN network, via SSDP protocol.

.. code-block:: groovy

    // Send a device discovery command string to look for Samsung SmartCam device in your LAN network, via SSDP protocol.
    sendHubCommand(new physicalgraph.device.HubAction("lan discovery urn:schemas-upnp-org:device:WANDevice:1", physicalgraph.device.Protocol.LAN))

.. note::

	Typically, the device discovery is done mainly via SSDP protocol.
	After the device is discovered, either REST or UPnP calls can be made for verification and communication with the device.

	See :ref:`building_servicemanager` for more information.

	Also note that, in the above example, while ``"urn:schemas-upnp-org:device:WANDevice:1"`` portion of the request string represents the notation defined by UPnP standard for device types, the terms ``"lan"`` and ``"discovery"`` are SmartThings-specific terms.

After the device is discovered, additional device information, such as device IP, MAC, port id, is available.
Now it is possible to interact with the device using this additional information.
Send a ``HubAction`` to the device as shown below, where myMAC is the MAC address string of the SmartCam device and ``calledBackHandler`` is the name of the method that is to be called when the device responds to this HubAction request object.

.. code-block:: groovy

    sendHubCommand(new physicalgraph.device.HubAction("""GET /xml/device_description.xml HTTP/1.1\r\nHOST: $ip\r\n\r\n""", physicalgraph.device.Protocol.LAN, myMAC, [callback: calledBackHandler]))

    ...

    // the below calledBackHandler() is triggered when the device responds to the sendHubCommand() with "device_description.xml" resource

    void calledBackHandler(physicalgraph.device.HubResponse hubResponse) {
    	log.debug "Entered calledBackHandler()..."
    	def body = hubResponse.xml
    	def devices = getDevices()
    	def device = devices.find { it?.key?.contains(body?.device?.UDN?.text()) }
    	if (device) {
    	    device.value << [name: body?.device?.roomName?.text(), model: body?.device?.modelName?.text(), serialNumber: body?.device?.serialNum?.text(), verified: true]
    	}
    	log.debug "device in calledBackHandler() is: ${device}"
    	log.debug "body in calledBackHandler() is: ${body}"
    }


----

**Returns:**
    ``HubAction`` object.

.. note::

	A Device Handler's ``parse()`` method can also return a ``HubAction`` object, in adddition to the above-described usage by explicitly  calling ``sendHubCommand``.

	See :ref:`building_devicetype` for more information.
