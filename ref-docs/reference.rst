.. _ref_docs:

API Documentation
=================

This is where you can find API-level documentation for the various objects available in your SmartApps and Device Handlers.

**How to Read The Docs**

*Objects*

SmartThings objects are rarely created directly by SmartApp or Device Handler developers. Instead, various objects are already created and available in your applications.

You will rarely see constructor documentation for this reason. Each object will contain a summary at the top of the document that discusses some of the common ways to get a reference to the object.

Also worth noting is that some of the "objects" documented are not really objects at all. A SmartApp is not an object, in the strict sense of the word, for example (neither is a Device Handler). But each running execution of a SmartApp or Device Handler has available to it many methods and properties. For convenience, we have organized the methods available to SmartApps and Device Handlers into the SmartApp or Device Handler API documentation.

*Object Wrappers*

You may notice in various log messages or error messages that the objects are actually wrapper objects. For example, ``Event`` is actually an instance of ``EventWrapper``. We have wrapped many of our core objects with wrapper objects to protect access to the underlying system object.

This should be transparent to developers, since these objects cannot be instantiated directly. The underlying wrapper class may even change at some point (the supported APIs should not, without notice).

But, should you be confused about messages in the log, this is why.

*Dynamic Methods*

The Groovy programming language offers a powerful feature called `Metaprogramming <http://www.groovy-lang.org/metaprogramming.html>`__ that (among other things) allows for Groovy programs to be written in a way that *methods can be created dynamically at run time.*

SmartThings makes use of this powerful feature in a few ways. For example, you can get a reference to a Device configured in a SmartApp preference by simply referencing the name of the device configured in the preference. Another example is getting various Attribute values for a Device by invoking a method in the form <someDevice>.current<AttributeName>.

This powerful feature can make documenting all available methods difficult, since methods may not exist until runtime. For any dynamic methods, the method or property will be enclosed in ``<>``, and a description and example will be given.

*Conventions*

All methods and properties are listed in alphabetical order, with the exception of SmartApp and Device Handler methods that are expected to be defined by SmartApps and Device Handlers - those will be listed first.

Methods are listed with a ``()`` after the name. Properties do not have a ``()``. For example: ``subscribe()`` is a method, ``floatValue`` is a property.

.. note::

    Groovy follows the JavaBean convention, and adds some syntactic sugar on top. Any zero-arg getter can be retrieved via property access directly. For example, ``isPhysical()`` *could* be invoked as ``physical``. Because this relies upon details of the backing internal object, we recommend that you use the documented version.

Some methods may have many signatures. For example, the ``schedule`` method available to SmartApps can be called with a variety of arguments. We have documented all forms in one location (``schedule()``). All supported signatures will be listed, as well as all parameters for the various signatures.

Optional parameters will be listed inside brackets (``[]``) in the method signature.

Code examples may not be executable as-is. Since SmartApps and Device Handlers execute in response to various schedules or events, and rely upon having other metdata defined, the examples have been written with brevity in mind. The code samples may need to be defined inside an event handler or otherwise executable code block to fully function.

When appropriate, we have included various tips or warnings. In cases where an API is not adequately documented currently, we have called attention to that. We plan to add the supporting documentation soon!

**API Contents**

.. toctree::
   :maxdepth: 1

   smartapp-ref
   device-handler-ref
   attribute-ref
   capability-ref
   command-ref
   device-ref
   event-ref
   hub-ref
   installed-smart-app-wrapper-ref
   location-ref
   mode-ref
   state-ref
   app-state-ref
   async-http-ref
   async-response-ref
   zigbee-ref
   z-wave-ref
