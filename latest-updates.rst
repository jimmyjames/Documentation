.. _latest-updates:

==============
Latest Updates
==============

February 10 2017
----------------

- Did you notice? We've updated the :ref:`docs homepage <docs_home_page>` to help readers quickly identify and navigate to common areas of interest.

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/10-February-2017>`__

----

February 08 2017
----------------

- Z-Wave fingerprinting updates! The :ref:`zwave-fingerprinting` documentation has been expanded and updated with the latest information.
- Get information about a Device's status and last activity using the new :ref:`device_get_status` and :ref:`device_get_last_activity` methods.
- New to Device Handler development, or looking for a refresher? We've overhauled our :ref:`device-handler-quickstart` to ensure you can get up and running quickly and pain-free.
- Do you use cron to create recurring schedules? Have you seen if you could replace that often-difficult to understand, write, and maintain cron expression with any of our :ref:`runEvery* <schedule_run_every>` methods? We've updated the :ref:`documentation <scheduling_recurring_schedules>` to highlight these methods and encourage their use, instead of using cron.
- Did you know you can copy code examples right to your clipboard? We updated the UX to increase the visibility of this handy feature.

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/08-February-2017>`__

----

January 23 2017
---------------

- Search, discover and communicate with the devices in your network with the ``HubAction`` class. Check out the :ref:`new reference document for HubAction <hubaction_ref>`.
- If you need to get the account ID associated with an installed SmartApp, check out the :ref:`isa_ref_get_account_id` method available on the :ref:`installed_smart_app_wrapper` object!
- We've updated the :ref:`editor_and_simulator` guide to clarify that you need to ensure you are on the correct shard when creating SmartApps or Device Handlers.
- A new Capability, :ref:`infraredLevel`, is now available!

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/23-January-2017>`__

----

January 03 2017
---------------

- Thinking about setting up a regular on and off schedule for your SmartThings? See our latest update, with examples, in :ref:`schedule_using_cron`.
- Confused about sharding and where to publish your SmartApp or Device Handler? Here is a big picture view that clarifies :ref:`Publishing Custom Code <publishing>`.
- Did you know there's a default delay between commands when you send a sequence of them to the Hub? See :ref:`smartapp_sendhubcommand` reference documentation for details.

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/03-January-2017>`__

----

December 08 2016
----------------

- Quick, how do you know what Capabilities are supported by SmartThings? Checkout out the new generated :ref:`capabilities_taxonomy`, now live.
- Don't know much about ZigBee? We got you covered with our updated ZigBee documentation in the :ref:`zigbee_primer` and :ref:`zigbee_ref` guides.
- What you, as a developer, must know while working with the SmartThings IDE. Checkout latest in the :ref:`hubs-and-locations` guide.

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/08-December-2016>`__

----

November 30 2016
----------------

- Did you know you can refresh any page of the SmartApp on the mobile device with a set interval? See the :ref:`dynamic-page-options` guide.

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/30-November-2016>`__

----

November 17 2016
----------------

- Changed code blocks to use the monokai dark theme.

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/17-November-2016>`__

----

November 15 2016
----------------

- Added ability to copy code blocks to the clipboard.

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/15-November-2016>`__

----

November 14 2016
----------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/14-November-2016_2>`__

- Added documentation for :ref:`working with time zones <smartapp_timezones>`.
- Fixed warnings related to lexical parsing of code blocks.

----

November 10 2016
----------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/10-November-2016>`__

- Documented new :ref:`device_ref_model_name` and :ref:`device_ref_manufacturer_name`.
- Styling and organiational changes to the left-hand navigation.
- Internal build error fixes.

----

November 03 2016
----------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/03-November-2016>`__

- Revised timeTodayAfter() method description in the :ref:`smartapp_ref` Guide
- Added :ref:`smartapp-time-methods` guide to the SmartApp Developers Guide
- Fixed up scheduling reference docs in :ref:`device_handler_ref`, and :ref:`smartapp_ref` Guides
- Clarify getting latest device state in :ref:`device_ref`, and :ref:`smartapp_working_with_devices`
- Corrected timeZone() method description in the :ref:`smartapp_ref` Guide

----

October 26 2016
---------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/26-October-2016>`__

- Documentation for :ref:`smartapp_nextoccurrence`.
- Documentation for :ref:`smartapp_get_all_child_apps`, :ref:`smartapp_find_all_child_apps_by_name`, :ref:`smartapp_find_all_child_apps_by_namespace_and_name`, :ref:`smartapp_find_child_app_by_namespace_and_name`, and :ref:`smartapp_get_all_child_apps`.
- Updated documentation for :ref:`smartapp_get_child_apps` to reflect that only "complete" child app installations will be returned.
- Changed reference API docs to use getter forms instead of property access.
- New attribute values added for the :ref:`lock` capability.
- Typo fixes and other copy edits.

----

October 17 2016
---------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/17-October-2016>`__

- Documentation for :ref:`beta asynchronous HTTP APIs <async_http_guide>`
- Typo fixes and other copy edits

----


October 13 2016
---------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/13-October-2016>`__

- Moved rate limiting documentation into its own :doc:`guide <ratelimits/index>`
- Typo fixes and other copy edits

----

October 11 2016
---------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/11-October-2016>`__

- Documented :ref:`sms_rate_limits`
- Fixed typos

----


October 06 2016
---------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/06-October-2016>`__

- Added instructions for creating a simple code example when :ref:`creating a developer support ticket <developer_support_form>`.
- Added :ref:`documentation <custom_remove_button>` for specifying a custom Remove button for preferences.

----

October 05 2016
---------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/05-October-2016>`__

- Added documentation for :ref:`passing data to schedule handler methods <scheduling_passing_data>`.
- Added :ref:`best practices <review_guidelines_parent_child>` for parent-child relationships.
- Updated the repository's README with pull request guidelines.
- Added scheduling APIs to the :ref:`device_handler_ref` reference documentation (including all ``runEvery*`` APIs, which are now supported in Device Handlers).
- Fixed broken cron tutorial link the :ref:`smartapp-scheduling` guide.
- Added note to the :ref:`first SmartApp tutorial <first-smartapp-tutorial>` and :ref:`editor_and_simulator` that the simulator is inconsistent with the mobile application.

----

September 23 2016
-----------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/23-September-2016>`__

- Added link to the Z-Wave public spec on the following Z-Wave pages: :ref:`Building Z-Wave Device Handlers <zwave-device-handlers>` and :ref:`Z-Wave Primer <zwave-primer>`
- Updated the :ref:`Color Control <colorControl>` capability to correctly reflect the capability definition.
- Updated Jinja template to add some more features for the ongoing generated capability documentation project.
- Fixed minor grammatical errors.

----

September 14 2016
-----------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/14-September-2016>`__

- Update to the :ref:`State and Atomic State documentation <storing-data>` to reorganize, clarify, and expand content.

----

September 09 2016
-----------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/09-September-2016>`__

- Removed Occupancy capability
- Fixed :ref:`smartapp_unschedule` docs to clarify that a specific handler method name can be passed to ``unschedule()``.

September 02 2016 (3)
---------------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/02-September-2016-03>`__

- Fixing RTD build

----

September 02 2016 (2)
---------------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/02-September-2016-02>`__

- Fixing RTD build

----

September 02 2016
-----------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/02-September-2016>`__

- Typos and spelling fixes
- Added more around the generated capabilities documentation framework
- Added :ref:`web_services_smartapps_troubleshooting` document to the SmartApp Web Services guide
- Fixed :ref:`colorControl` example code in the capabilities reference

----

August 17 2016
--------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/17-August-2016>`__

- Fix :ref:`documentation <smartapp_subscribe_to_command>` for ``subscribeToCommand()`` (only takes a Device argument, not a list of Devices)
- Typos and spelling fixes

----

August 16 2016
--------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/16-August-2016>`__

- :ref:`Documentation <logging_exceptions>` for the ability to pass a ``Throwable`` to logging methods to get more logging details about the exception shown in the logs.

----

August 15 2016
--------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/15-August-2016>`__

- Make edits to Makefile as a first step in getting generated capabilities documentation integrated into the documentation build.

----

August 04 2016
--------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/04-August-2016>`__

- Added :ref:`zigbee_parse_zone_status` documentation
- Added documentation for :ref:`zigbee_additional_zigbee_classes`
- Clarified :ref:`smartapp_find_child_app_by_name` API documentation
- Added :doc:`documentation <device-type-developers-guide/other-available-apis>` to Device Handler Guide for other useful APIs available to Device Handlers, including Scheduling, HTTP Requests, and State.
- Fixed documentation for :ref:`Event.dateValue <event_date_value>` to indicate that it returns ``null`` if date cannot be parsed
- Various fixes for reStructuredText formatting and legal syntax warnings
- Moved this documentation change log to top of navigation

----

July 28 2016
------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/28-July-2016>`__

- Document the new :ref:`hideWhenEmpty <prefs_hide_when_empty>` preferences option.

----

July 25 2016
------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/25-July-2016>`__

- Add a strong warning to the :ref:`State documentation <storing-data>` to emphasize the importance of never mixing ``atomicState`` and ``state`` in the same SmartApp.

----

July 21 2016
------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/21-July-2016>`__

- :ref:`Documented <webservices_smartapp_enable_oauth>` the new redirect URI field on OAuth SmartApps

----

July 07 2016
------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/07-July-2016>`__

- Added documentation for working with collections in :ref:`State <state_collections>` and :ref:`Atomic State <atomic_state_collections>`.
- Added documentation for :doc:`ref-docs/app-state-ref`
- Added documentation for :doc:`ref-docs/installed-smart-app-wrapper-ref`
- Added :ref:`clarification <run_api_smartapp_simulator>` that the callable URL for Web Services SmartApps will vary by installed location
- Updated :ref:`developer_discussions` with the new developer call schedule

----

June 23 2016
------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/23-June-2016>`__

- Splitting the Music Player `capability <http://docs.smartthings.com/en/latest/capabilities-reference.html>`_ into three capabilities
    - Audio Notification
    - Music Player
    - Tracking Music Player

----

June 17 2016
------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/17-June-2016>`__

- Adding `WOL (Wake On Lan) documentation <http://docs.smartthings.com/en/latest/cloud-and-lan-connected-device-types-developers-guide/building-lan-connected-device-types/building-the-device-type.html#wake-on-lan-wol>`_

----

June 13 2016
------------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/13-June-2016>`__

- Adding :doc:`Code Review Guidelines and Best Practices <code-review-guidelines>` for SmartApps and Device Handlers.

----

June 9 2016
-----------

`GitHub Release Tag <https://github.com/SmartThingsCommunity/Documentation/releases/tag/09-June-2016>`__

- Fix spelling of "capability" in :ref:`attribute_ref` docs
- Fix capitalization of "localIP" in :ref:`hub_ref` docs
- Document the :ref:`developer_support_form` form
- Document :doc:`Device Handler Preferences <device-type-developers-guide/device-preferences>`
- Document :ref:`device-specific preference inputs <device_specific_inputs>`
- Clarify :doc:`tools-and-ide/github-integration` only available in the US

----

May 27 2016
-----------

- Add ``additionalParams`` argument for ZigBee library. :doc:`Docs <ref-docs/zigbee-ref>` | `GitHub PR <https://github.com/SmartThingsCommunity/Documentation/pull/315>`__

----

May 23 2016
-----------

- Updated and expanded Device Handler tiles docs. :doc:`Docs <device-type-developers-guide/tiles-metadata>`  | `GitHub PR <https://github.com/SmartThingsCommunity/Documentation/pull/314>`__.
