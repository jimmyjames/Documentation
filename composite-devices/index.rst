.. _composite-devices:

Composite Devices
=================

Devices such as Hue LAN bridge, AEON Z-Wave SmartStrip, or a Zooz ZEN20 Z-Wave Power Strip have multiple components, and each component can be controlled independently.
For example, a Zooz ZEN20 Z-Wave Power Strip can be used with a separate Thing connected to each of its five outlets and each Thing can have its own SmartApp.

SmartThings categorizes such a multiple-component device as a *composite device.*
A device is said to be a composite device when it treats each of its component as its child device.
Integrating a composite device into SmartThings platform involves incorporating the composite device functionality into its Device Handler.
Additionally, you may need to modify the Service Manager SmartApp and the SmartApp.

----

.. _device_handler_for_composite_device:

Device Handler for a Composite Device
-------------------------------------

When you integrate a composite device into SmartThings, the composite device maintains a parent-child relationship between itself and its child devices.
For example, the Device Handler of Zooz ZEN20 Z-Wave Power Strip composite device implements the Power Strip as a parent device and each outlet as a separate child device.
More specifically, each individual outlet of the Power Strip is implemented as a *child device instance* of Zooz Power Strip Outlet, whereas the Power Strip itself is an instance of Zooz Power Strip as a *parent device*.

Similarly, the Hue bridge Device Handler implements the Hue bridge as a parent device and Hue bulbs as child devices of the Hue bridge parent device.

.. _composite_device_parent_device_handler:

Parent Device Handler
^^^^^^^^^^^^^^^^^^^^^

Let's look at how to set up a parent Device Handler.
For example, in the Device Handler of the Zooz ZEN20 Z-Wave Power Strip composite device, the parent device functionality shown below:

- Creates a *child device instance* of ``Zooz Power Strip Outlet`` device for each outlet of the Power Strip, by using the :ref:`addChildDevice_DH_ref` method, as below:

.. code-block:: groovy

	metadata {
		definition (name: "ZooZ Power Strip", namespace: "smartthings", author: "SmartThings") {
		capability "Switch"
		capability "Refresh"
		capability "Configuration"
		capability "Actuator"
		capability "Sensor"
		fingerprint deviceId: "0x1004", inClusters: "0x5E,0x85,0x59,0x5A,0x72,0x60,0x8E,0x73,0x27,0x25,0x86", manufacturer: "015D", model: "F51C", prod: "0651", deviceJoinName: "ZooZ ZEN 20 Power Strip"
	}

	...

	def installed() {
		createChildDevices()
		response(refresh() + configure())
	}

	...

	private void createChildDevices() {
		// Save the device label for updates by updated()
		state.oldLabel = device.label
		// Add child devices for all five outlets of Zooz Power Strip
		for (i in 1..5) {
		addChildDevice("ZooZ Power Strip Outlet", "${device.deviceNetworkId}-${i}", null,[completedSetup: true, label: "${device.displayName} (CH${i})", isComponent: true, componentName: "ch$i", componentLabel: "Channel $i"])
		}
	}

and,

- Creates child device APIs such as:

.. code-block:: groovy

	void childOn(String dni) {
 		onOffCmd(0xFF, channelNumber(dni))
 	}
 	void childOff(String dni) {
 		onOffCmd(0, channelNumber(dni))
 	}

.. _composite_device_child_device_handler:

Child Device Handler
^^^^^^^^^^^^^^^^^^^^

Next, the below Device Handler code sets up the *outlet* of the Zooz ZEN20 Z-Wave Power Strip device as the *child device instance*.

.. code-block:: groovy

	metadata {
	definition (name: "ZooZ Power Strip Outlet", namespace: "smartthings", author: "SmartThings") {
		capability "Switch"
		capability "Actuator"
		capability "Sensor"
	}

	...

	void on() {
		parent.childOn(device.deviceNetworkId)
	}

	void off() {
		parent.childOff(device.deviceNetworkId)
	}

In the above example, the method calls, ``parent.childOn(device.deviceNetworkId)`` and ``parent.childOff(device.deviceNetworkId)``, are the means of communication between the parent and the child instances of this composite device. 

Deleting a Composite Device
---------------------------

Deleting a composite parent device will delete all children devices. 
For example, deleting the Power Strip itself will delete its outlets as devices from the SmartThings platform.

SmartApps can be configured to control individual outlets as well as the entire power strip.
In such a case, if you try to delete the Power Strip parent device itself, then you are given an option to force-delete the outlet device.

If you try to delete a composite device from your SmartThings mobile app, then the following applies:

- If the parameter ``isComponent`` is set to ``true``, as shown in the :ref:`composite_device_parent_device_handler` example above, then the device is hidden from the Things view and you will not be presented with the option of deleting child devices individually.

- If the parameter ``isComponent`` is set to ``false``, then you can delete individual child devices. 

.. note::

	Note that the following applies for a composite device:

	

	- A single SmartApp can control all the components, each independently, sending and receive messages from each component device.

	- A single SmartApp can control all components together in an all-or-nothing fashion.


