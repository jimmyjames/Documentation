.. _editor_and_simulator:

====================
Editor and Simulator
====================

The SmartThings editor and simulator allows you to create, edit, and test SmartApps and Device Handlers.

.. figure:: ../img/ide/ide.png
   :alt: Ide

----

Creating a new SmartApp
-----------------------

To create a new SmartApp, click the *New SmartApp* button from the *My SmartApps* page.

.. important::

    Make sure you have selected the correct Location before creating a new SmartApp.
    Follow :ref:`these steps <ensure-proper-location>` to ensure your code will be puplished to the correct Location.

There are three different tabs on the *New SmartApp* page that allow you to create a new SmartApp in different ways:

- *From Form* allows you to create a new SmartApp based on the some metadata you can enter into the form.
- *From Code* allows you to create a new SmartApp directly from existing code. This is useful if you receive the code for a SmartApp - just paste it in to the page and a new SmartApp will be created from it.
- *From Template* allows you to create a new SmartApp based upon existing SmartApps. This is especially useful if you are new to SmartThings development, since you can start from an existing SmartApp.

.. important::

    Only install source code into your account that you fully understand, or that comes from a trusted source.

----

Creating a new Device Handler
-----------------------------

To create a new Device Handler, click the *Create New Device Handler* button from the *My Device Handlers* page.

.. important::

    Make sure you have selected the correct Location before creating a new Device Handler.
    Follow :ref:`these steps <ensure-proper-location>` to ensure your code will be puplished to the correct Location.

There are three different tabs on the *New Device Handler* page that allow you to create a new Device Handler in different ways:

- *From Form* allows you to create a new Device Handler based on the some metadata you can enter into the form.
- *From Code* allows you to create a new Device Handler directly from existing code. This is useful if you receive the code for a Device Handler - just paste it in to the page and a new Device Handler will be created from it.
- *From Template* allows you to create a new Device Handler based upon existing Device Handlers. This is especially useful if you are new to SmartThings development, since you can start from an existing Device Handlers.

.. important::

    Only install source code into your account that you fully understand, or that comes from a trusted source.

----

Using the editor
----------------

The SmartThings web editor allows you to edit code, and provides syntax highlighting for easy code readability.

You can choose from a variety of themes, key maps, and font sizes to suit your preferences by clicking on the *IDE Settings* button above the editor frame.

.. tip::

   Save often! To avoid losing unsaved changes when your session login to the IDE expires, get in the habit of saving often using *Save* button.

----

Using the Simulator
-------------------

.. warning::

   The simulator may not work reliably at all times, so we recommend that you validate your code on your SmartThings mobile app before deploying it.

The simulator allows you to test your SmartApps or Device Handlers within the IDE, and without requiring you to have the actual physical devices.

When you run your application in the IDE, it is always running in the simulation framework.
The IDE simulator does two very important things to support simulation:

-  It acts as a “Virtual Hub” that has virtual devices connected to it.
-  It acts as if it was the SmartThings Mobile application to receive
   and process status updates and support direct user actions on devices
   through a simulated mobile app control.

The IDE simulation environment also allows you to run the simulator
attached to any of the “Locations” defined within your account.

When editing a SmartApp or Device Handler, you can see the simulator on the right of the page.
You can choose a Location and click the *Set Location* button, and then input any preferences required by the SmartApp or Device Handler.
Click the *Install* button to run the simulator.

When simulating a SmartApp, any selected devices will appear in the IDE, along with controls to actuate the devices:

.. figure:: ../img/ide/simulator.png
   :alt: Simulator
