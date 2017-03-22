===========================
Samsung SmartThings Hub FAQ
===========================

*A collection of frequently asked questions about the new Samsung SmartThings Hub, and updated SmartThings mobile applications, for SmartThings developers.*

----

**What can developers do with the new Samsung SmartThings Hub and updated mobile apps?**

Developers can use the new Contact Book feature to easily send notifications to a user’s selected contacts, without requesting the user to enter in a phone number for each SmartApp. You can learn more about it in the :ref:`smartapp_sending_notifications` documentation.

The new iOS and Android mobile apps also make use of a new Device Tiles layout, that uses a 6 column grid. There is also a new tile available to use for devices - multi-attribute tiles allow a single tile to display information about more than one attribute of a device. You can learn more in the :doc:`device-type-developers-guide/tiles-metadata` documentation.

With the new Hub and mobile experience, we've also laid the groundwork for exciting new developer features in the near future. Our developers are what makes SmartThings great, and we're excited to build together!

----

**Do I need to update my SmartApps or Device Handlers?**

Most custom SmartApps and Device Types will continue to work without the need for code changes. There are some features that you may wish to take advantage of, however, like the new multi-attribute device tile. SmartApps that send notifications should be updated to use the new Contact Book feature, but they will continue to function as they did before without updating your code.

Despite our best intentions and precautions, it is possible that your custom SmartApp or Device Type may not work as it did before. If this is the case, please report the issue to support at support@smartthings.com (include example code, relevant log messages, and screenshots if applicable). The `SmartThings Community Forums <http://community.smartthings.com>`__ are also a good place for developers to help one another. The SmartThings Community Team will be monitoring the forums to identify and help with issues, and incorporating feedback into our documentation.

----

**Hello Home Actions now appear as "Routines" in the mobile application. Do I need to update any of my SmartApps to get or execute Routines?**

No. SmartApps that work with Routines still use the methods discussed in the :ref:`smartapp-routines` documentation.

At some point in the future, we may create new methods that reflect the terminology change, but we will not do so without advanced notification.

----

**How does local SmartApp or Device Type processing work?**

Certain automations can now execute locally on the Samsung SmartThings Hub.
The SmartThings internal team specifies which automations are eligible for local execution. This process requires evaluation and testing of the SmartApp and devices, as well as ensuring that the necessary code artifacts are delivered to the Hub.

Any locally executing SmartApps or Device Handlers still send events to the SmartThings cloud. This is necessary so that the mobile application can accurately reflect the current state of the devices, as well as perform any cloud-required services (e.g., sending notifications). In the event of an internet outage, the events will be queued and sent to the SmartThings cloud when internet is restored.

It is not possible for developers to specify that certain Device Types or SmartApps execute in any particular location (cloud or on the Hub).  SmartApps or Device Types that have not been reviewed, tested, and delivered to the Hub by the SmartThings team will execute in the SmartThings cloud.

----

**What happens when the internet to the Hub goes out?**

Provided there is still power to the Hub (wired or battery), any SmartApps that are able to execute locally will still run without an internet connection. The mobile app will report the Hub is offline, and because there are no events being sent to the SmartThings cloud, notifications will not work.

The radios in the Hub will still function without internet. Events to the cloud will be queued, and sent when the internet is restored.

----

**The mobile app has some new video-related features. How can developers utilize those capabilities?**

The APIs for working with the new video features are not yet available, but we are excited to bring them to you soon!

----

**Does the Hub have UDP support?**

UDP access for developers is not currently supported, but may come in future updates.

----

**Does the Hub support local file storage?**

The Samsung SmartThings Hub stores some information about SmartApps, Device Types, and Locations locally, but this is not publicly accessible.

----

**Can I SSH into the Hub?**

No, you cannot SSH into the Samsung SmartThings Hub.

----

**What about Bluetooth?**

The Samsung SmartThings Hub ships with BLE to support future expandability, but will be inactive at product launch.

----

**What can I do with the USB ports?**

Adding USB ports to the Samsung SmartThings Hub allows for future expandability, but will have no functionality at product launch.

----

**Does the Hub support IPv6?**

No. This may come in future updates.

----

**Does the Hub support WebSocket or Telnet for developers?**

The Samsung SmartThings Hub does not support WebSocket, Telnet, or raw socket access for developers.

----

**Does the Hub support getting local device status, or controlling local devices, without going through the SmartThings cloud? For example, can I just access the Hub to get device status or control devices?**

Currently, no. We know this is a requested feature, and have identified it for future roadmap consideration.
