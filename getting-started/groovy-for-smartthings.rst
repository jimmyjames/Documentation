.. _groovy-for-smartthings:

Groovy With SmartThings
=======================

SmartThings runs Groovy in a sandboxed environment. This means that not all features of the Groovy programming language are available in SmartThings. To understand why, we need to understand where SmartThings code is executed.

All SmartThings code is executed in, and by, the SmartThings ecosystem. When you write a SmartApp or a Device Handler, it will ultimately be executed by the SmartThings platform. It may execute on the Hub or in the SmartThings cloud, but the important thing to note is that it is executed by SmartThings.

Because SmartApps and Device Handlers execute within the SmartThings ecosystem, SmartThings restricts access to certain methods or features. You can't create or open a file, for example.

Before we discuss the specifics of what is and what is not available to your SmartApps and Device Handlers, we'll first discuss how SmartThings makes several APIs available within your SmartApp or Device Handler. While this is not strictly necessary to understand to be able to develop with SmartThings, it may help to shed light on what is happening behind the scenes.

----

Groovy Version
--------------

The SmartThings platform utilizes the `Grails Framework <https://grails.org/>`__, which controls the version of Groovy SmartApps and Device Handlers are executed on.
The following table shows the current Grails and Groovy versions used by SmartThings:

============== ==============
Grails Version Groovy Version
============== ==============
2.5.4          2.4.4
============== ==============

----

How It Works
------------

One of the first things you'll notice when starting to develop with SmartThings, is that there are many methods available to you that do not require any import statements. In fact, it's rare to see import statements at all in SmartThings.

This is because every SmartApp or Device Handler is actually an instance of an abstract *Executor* class defined in the SmartThings platform. This *Executor* class defines or includes many methods. The result of this is that every SmartApp or Device Handler has available to it (through inheritance) a large number of methods without importing anything.

This model provides a simple framework in which you can develop your SmartApps and Device Handlers - all the necessary methods are simply available to call without needing to import anything.

Now that we understand (at least at a high level) how SmartApps and Device Handlers make various methods available, let's look at some of the things that are *not* allowed within SmartThings code. After that, we'll look at the entire whitelist of allowable classes.

----

Language Simplifications
------------------------

Classes and JARs
^^^^^^^^^^^^^^^^

As a SmartApp or Device Handler author, you cannot create your own classes, or import any custom JARs. While at first this may seem like a significant restriction, in practice you'll rarely find this to be the case. Because of the nature of SmartApps and Device Handlers, and the various methods available to you, the need to create your own classes or object structures is rarely needed.

There may be certain scenarios in which you discover your task would be easier if only you could import some third-party library or create your own helper class. In cases like these, reach out to us on the forums and let us know your specific use case. It's possible there already exists an API to do what you need, and if not, we may be able to get it added to SmartThings.

Restricted Methods
^^^^^^^^^^^^^^^^^^

Because SmartThings code executes within its own ecosystem, there are a few methods that we restrict for security purposes. Many of these methods deal with Groovy's advanced metaprogramming concepts. Groovy metaprogramming allows developers to get and modify runtime information for objects. In SmartThings, this isn't necessary to do and is a potential security risk, so they are disabled.

Here are the methods that are not available in SmartThings. Trying to access these will result in a ``SecurityException`` at runtime.

- ``addShutdownHook()``
- ``execute()``
- ``getClass()``
- ``getMetaClass()``
- ``setMetaClass()``
- ``propertyMissing()``
- ``methodMissing()``
- ``invokeMethod()``
- ``mixin()``
- ``print()``
- ``printf()``
- ``println()``
- ``sleep()``

Global Variables
^^^^^^^^^^^^^^^^

Constants
`````````

Due to the sandboxed nature of SmartApp and Device Handler execution, defining global constant variables like this will **not** work:

.. code-block:: groovy

    def MY_CONSTANT = "some constant value"

Defining constants as above is valid Groovy code and will compile, but the value of ``MY_CONSTANT`` will be ``null``.

Instead, for any global constants you'd like in your SmartApp or Device Handler, define a no-op getter method that returns the value:

.. code-block:: groovy

    def getMyConstant() {
        return "some constant value"
    }

You can then call the method directly, or use some :ref:`Groovy magic <groovy_getters_setters>` to invoke no-arg getters.

Mutable Variables
`````````````````

Similarly, creating a global variable and then updating it will **not** work:

.. code-block:: groovy

    def globalVar = "some value"

    def someMethod() {
        // update the variable here, but this will not persist across executions!
        globalVar = "some updated val"
    }

Instead, any information you need persisted between executions needs to be stored the application :ref:`state <storing-data>`.

Other Notable Restrictions
^^^^^^^^^^^^^^^^^^^^^^^^^^

There are a few other notable restrictions in SmartThings worth discussing:

- You cannot create your own threads.
- You cannot use ``System`` methods, like ``System.out()``
- You cannot create or access files.
- You cannot define closures outside of a method. Something like ``def squareItClosure = {it * it}`` is not allowed at the top-level, outside of a method body.

----

Allowed Classes
---------------

SmartThings also specifies a *whitelist* of allowed classes. Only classes included in this whitelist are available for use within SmartThings. Whenever a method is called (any method), SmartThings first checks to see that the *receiver* of the method (the object the method is being called on) is in the allowable types whitelist. If it isn't, a ``SecurityException`` will be thrown. This same principle applies to the creation of new objects with the ``new`` keyword - if the object being created is not in the whitelist, a ``SecurityException`` is also thrown.

Most SmartThings solutions will not need to instantiate any of these classes directly. The majority of objects you work with will be available to you via callback parameters or injected right into your SmartApp or Device Handler.
Here is the whitelist of available, non-SmartThings-specific types (i.e., Java, Groovy and third party library classes):

.. important::
    Certain methods that update JVM settings are disallowed, even though the usage of the class is permitted.
    For example, calling ``TimeZone.setDefault()`` is not allowed, and will throw a ``SecurityException``.

    This is due to the fact that many SmartThings applications may be executing on a single JVM.
    Updating system-wide properties may have unintended consequences on other applications running on the same JVM.

    As a general rule-of-thumb, if a method has impact on the underlying JVM, it will not be allowed, for the reasons discussed above.

- ``ArrayList``
- ``BigDecimal``
- ``BigInteger``
- ``Boolean``
- ``Byte``
- ``ByteArrayInputStream``
- ``ByteArrayOutputStream``
- ``Calendar``
- ``Closure``
- ``Collection``
- ``Collections``
- ``Date``
- ``DecimalFormat``
- ``Double``
- ``Float``
- ``GregorianCalendar``
- ``HashMap``
- ``HashMap.Entry``
- ``HashMap.KeyIterator``
- ``HashMap.KeySet``
- ``HashMap.Values``
- ``HashSet``
- ``Integer``
- ``JsonBuilder``
- ``LinkedHashMap``
- ``LinkedHashMap.Entry``
- ``LinkedHashSet``
- ``LinkedList``
- ``List``
- ``Long``
- ``Map``
- ``MarkupBuilder``
- ``Math``
- ``Random``
- ``Set``
- ``Short``
- ``SimpleDateFormat``
- ``String``
- ``StringBuilder``
- ``StringReader``
- ``StringWriter``
- ``SubList``
- ``TimeCategory``
- ``TimeZone``
- ``TreeMap``
- ``TreeMap.Entry``
- ``TreeMap.KeySet``
- ``TreeMap.Values``
- ``TreeSet``
- ``URLDecoder``
- ``URLEncoder``
- ``UUID``
- ``XPath``
- ``XPathConstants``
- ``XPathExpressionImpl``
- ``XPathFactory``
- ``XPathFactoryImpl``
- ``XPathImpl``
- ``ZoneInfo``
- ``com.amazonaws.services.s3.model.S3Object``
- ``com.amazonaws.services.s3.model.S3ObjectInputStream``
- ``com.sun.org.apache.xerces.internal.dom.DocumentImpl``
- ``com.sun.org.apache.xerces.internal.dom.ElementImpl``
- ``groovy.json.JsonOutput``
- ``groovy.json.JsonSlurper``
- ``groovy.util.Node``
- ``groovy.util.NodeList``
- ``groovy.util.XmlParser``
- ``groovy.util.XmlSlurper``
- ``groovy.xml.XmlUtil``
- ``java.net.URI``
- ``java.util.RandomAccessSubList``
- ``org.apache.commons.codec.binary.Base64``
- ``org.apache.xerces.dom.DocumentImpl``
- ``org.apache.xerces.dom.ElementImpl``
- ``org.codehaus.groovy.runtime.EncodingGroovyMethods``
- ``org.json.JSONArray``
- ``org.json.JSONException``
- ``org.json.JSONObject``
- ``org.json.JSONObject.Null``

----

Summary and Next Steps
----------------------

Now that you understand how and why SmartThings restricts certain features of the Groovy programming language, it's time to dive deeper and write our first SmartApp! Head over to the :ref:`first-smartapp-tutorial` and learn how easy it is to program the physical world.
