.. _groovy-basics:

Groovy Basics
=============

SmartThings uses the Groovy programming language. If you've programmed before, you can learn Groovy.

The Groovy programming language is documented at http://www.groovy-lang.org/documentation.html. This tutorial will familiarize you with Groovy and its use in SmartThings, but is not a complete reference for the language.

.. tip::

    If you already know Groovy, or prefer to learn as you go, you can skip this tutorial and refer to this page as a mini-reference of sorts. It is important, however, that you understand how Groovy is used in SmartThings. That is discussed in the :ref:`groovy-for-smartthings` tutorial.

To develop with SmartThings, you do not need to be an expert in Groovy. The SmartThings development environment was created to be easy-to-use, so that it does not require someone to be proficient in Groovy (or any other language). That said, having a basic understanding of some of the core concepts of Groovy will help you be most productive in your development.

----

Overview
--------

Groovy is an object-oriented programming language for the Java platform. It is a dynamic language with features similar to those of Python, Ruby, Perl, and Smalltalk.

If you are familiar with languages like Java, C/C++, Python, Ruby, or JavaScript, you will see many similarities in Groovy.

Groovy code is compiled to byte code that is executed by the Java Virtual Machine (JVM). We choose Groovy as the SmartThings programming language for its simplicity and flexibility, as well as the performance and stability of the JVM.

Because Groovy is compiled to byte code that runs on the JVM Java Virtual Machine (JVM), 99% of Java code is valid Groovy. The standard Java libraries are available to Groovy programs. Groovy extends Java in many useful ways, which we'll learn about here.

----

Installing Groovy
-----------------

The best way to get familiar with Groovy is by installing it and experimenting. SmartThings development does not require you to have a copy of Groovy installed, since SmartThings code is executed within SmartThings infrastructure, but having a local copy of Groovy is useful for learning.

Head over to the `Groovy Documentation <http://www.groovy-lang.org/documentation.html>`__ site and follow the Getting Started guides for downloading and installing Groovy (the rest of the Getting Started material is pretty awesome too, and definitely worth a read).

We make heavy use of the Groovy Console to test things out, and recommend you do to.

.. note::

    In the code snippets below, you'll see a method ``assert()`` used often. This method is built in to Groovy, and we use it to verify assumptions. If the value passed to ``assert()`` is not true, the program will terminate. This lets us test out our code easily.

    For example, ``assert true`` is valid, and the program will continue. Anything that evaluates to false will cause the program to halt, so ``assert false`` will terminate with an informative message.

    While useful for learning, it's important to note that ``assert()`` is **not available** for you to use in SmartThings code. Neither is the method ``println()``, for that matter. For security and performance reasons, SmartThings runs in a sandboxed environment that restricts access to certain features. The sandboxed environment is discussed further in the :ref:`groovy-for-smartthings` tutorial.

----

Optional Semicolons
-------------------

Semicolons are optional in Groovy, and generally not used:

.. code-block:: groovy

    def someString = "this statement has a semicolon";
    def someOtherString = "this one does not"

----

Comments
--------

Groovy supports single line comments:

.. code-block:: groovy

    // this is a single line comment
    // each line requires slashes
    def myNum = 2  // comments can also come at the end of a statement

Multiline comments are also supported:

.. code-block:: groovy

    /* this is a comment that
       spans multiple lines.*/
    def myNum = 2

----

Objects
-------

In Groovy, everything is an object. Objects have *methods* and *properties*.

Methods are the things the object can do, and similar to other languages, are optionally (more on that later) invoked with parentheses ``()`` that may contain arguments.

.. code-block:: groovy

    // calling method doSomething on someObject
    someObject.doSomething()

    // calling method doSomethingElse with one argument
    someObject.doSomethingElse("a string argument")

    // get the property named someProperty on someObject
    someObject.someProperty

----

Optionally Typed
----------------

Groovy is an **optionally typed** language. The following are both valid Groovy:

.. code-block:: groovy

    // explicit typing
    Person person = new Person()

    // using def
    def person2 = new Person()

In Groovy, we can use ``def`` in place of an explicit type. The exact type of object that will be assigned will vary when using ``def``.

Why use ``def`` instead of explicit types? While not required, ``def`` is commonly used in Groovy (and in SmartThings) because it provides greater flexibility and readability.

Consider this strongly typed example:

.. code-block:: groovy

    String addThem(String str1, String str2) {
        return str1 + str2
    }

    String added = addThem("Smart", "Things");
    assert "SmartThings" == added

In the example above, ``addThem()`` is defined to accept two ``String`` parameters. Groovy supports operator overloading, so using the ``+`` operator concatenates the two strings.

What happens when we try to invoke ``addThem()`` with two numbers?

.. code-block:: groovy

    // fails!
    assert 3 == addThem(1, 2)

This results in an exception like this:

.. code-block:: bash

    groovy.lang.MissingMethodException: No signature of method: Script1.addThem() is applicable for argument types: (java.lang.Integer, java.lang.Integer) values: [1, 2]
    Possible solutions: addThem(java.lang.String, java.lang.String)
    at Script1.run(Script1.groovy:7)

Because ``addThem()`` is defined to accept two String parameters, we get a ``MissingMethodException`` when calling ``addThem(1, 2)``, since there is no method named ``addThem`` that accepts two numbers.

If we use ``def`` instead of an explicit type, we can take advantage of something called `duck typing <https://en.wikipedia.org/wiki/Duck_typing>`__. Put simply, duck typing is the principle that if it walks like a duck and quacks like a duck, then it's a duck. In programming terms, this means that if an object supports certain properties or methods, then we can use those regardless of its type.

To illustrate this with an example, consider the above example refactored to use ``def``:

.. code-block:: groovy

    def addThem(str1, str2) {
        // strings and numbers support the + operator
        return str1 + str2
    }

    def added = addThem("Smart", "Things")
    assert added == "SmartThings"

    def added2 = addThem(4, 2)
    assert added2 == 6


Omitting the explicit type information in favor of ``def`` allows us to build flexible programs without getting bogged down in ensuring we have all our typing information correct. This is particularly useful for smaller programs, which is what you will be writing with SmartThings.

.. note::

    Strict statically typed languages like Java determine the method that will be called at *compile time*. Groovy determines the methods to invoke at *runtime*, using something called multi-methods or dynamic dispatch. You can read more about multi-methods `here <http://www.groovy-lang.org/differences.html#_multi_methods>`__ in the Groovy documentation.

----

Operators
---------

Groovy supports all the typical operators, such as arithmetic operators, assignment operators, and relational operators:

.. code-block:: groovy

    assert 1 + 2 == 3 // use == for checking equality
    assert 1 < 2

    def a = 1
    def b = a += 2
    assert a == 3

    def c = 4
    def d = c++
    assert d == 5

There a few other notable operators that you may not have seen in other languages; one of them is the Safe Navigation Operator. Using Groovy's Safe Navigation Operator, you can navigate object structures without fear of getting a ``NullPointerException`` on a null object.

Suppose we have a property named ``location``, that also has a method ``getHelloHome()``. Further, suppose that the object returned by ``getHelloHome()`` has a method named ``getPhrases()``. Ultimately, we want to get the phrases.

We could do:

.. code-block:: groovy

    def phrases = location.getHelloHome().getPhrases()

But, what if ``getHelloHome()`` returns null? We'd then get a ``NullPointerException`` at runtime when trying to call ``getPhrases()`` on a null object.

If you're not familiar with Groovy, you might try something like this to avoid that:

.. code-block:: groovy

    def hh = location.getHelloHome()
    def phrases
    // recall that non-null objects are "true"
    if (hh) {
        phrases = hh.getPhrases()
    }

That works, and is valid Groovy, but we can do better. Using the safe navigation operator (``?.``), we can safely traverse the object graph. If any objects are null, the method simply will not be invoked and ``null`` will be returned.

This results in much cleaner code:

.. code-block:: groovy

    def phrases = location.getHelloHome()?.getPhrases()

In this example, if ``getHelloHome()`` is not null, we'll call the ``getPhrases()`` method on it. If it does return null, the whole expression simply returns ``null``.

If there's ever a chance of running into a ``NullPointerException`` when navigating an object structure, use the safe navigation operator to safely (and concisely) avoid it.

There are many more Groovy operators documented `here <http://docs.groovy-lang.org/latest/html/documentation/#groovy-operators>`__.

----

Strings
-------

Strings can be defined using single, double, or triple quotes:

.. code-block:: groovy

    def a = "some string"
    def b = 'another string'
    dev c = '''Triple quotes
               allow multiple
               lines'''

Strings defined with double quotes support interpolation. This allows us to substitute any Groovy expression into a String at the specified location. Interpolation is achieved using the ``${}`` syntax:

.. code-block:: groovy

    def name = "Your Name"
    def greeting = "Hello, ${name}"
    assert "Hello, Your Name" == greeting

Of course, more interesting interpolations are possible. Any expression can be placed inside the ``${}``:

.. code-block:: groovy

    def name = "Your Name"
    def greeting = "Hello, ${name.toUpperCase()}"
    assert "Hello, YOUR NAME" == greeting

You can also use the ``$`` without the ``{}`` for simple property substitutions or simple dotted expressions:

.. code-block:: groovy

    def name = "Your Name"

    // can omit the {} here
    def greeting = "Hello, $name"
    assert "Hello, Your Name" == greeting

    def person = [firstName: 'Walter', lastName: 'Sobchak']
    def greeting = "Hello, $person.firstName $person.lastName"

.. note::
    Dotted expressions are expressions of the form ``a.b`` or ``a.b.c``. Expressions that would contain parentheses like method calls, curly braces for closures, or arithmetic operators, are not dotted expressions and you should use ``${}``. We recommend always using the ``${}`` notation.

You'll see String interpolations frequently in SmartThings.

There are some other handy Groovy String features, like the ability to remove part of a string using the ``-`` operator:

.. code-block:: groovy

    def lannisters = "A Lannister does not always pays their debts"
    def corrected = lannisters - "does not "
    assert "A Lannister always pays their debts" == corrected

You can read more about Strings `here <http://docs.groovy-lang.org/latest/html/documentation/#all-strings>`__.

----

Lists and Maps
--------------

Groovy supports the typical collection structures like Lists and Maps in an easy-to-use way.

Here are some examples showing how to work with Lists in Groovy:

.. code-block:: groovy

    // simple list of Numbers
    def myList = [2, 3, 5, 8, 13, 21]

    // use the << operator to append items to a list
    myList << 34
    assert myList == [2, 3, 5, 8, 13, 21, 34]

    // get elements in a list
    // first element is at index 0
    assert 8 == myList[3]

    // can use negative index to start from the end
    assert 21 == myList[-2]

    // lists can support different types of data
    def myMixedList = [1, "two", true]

Maps are similarly straightforward:

.. code-block:: groovy

    // simple map of key/value pairs
    def myMap = [key1: "value1", key2: "value2"]

    // can get value for a key with the "." notation:
    assert "value1" == myMap.key1

    // can also get the value using subscript notation:
    assert "value2" == myMap['key2']

    // a list of maps
    def listOfMaps = [[key1: "val1", key2: "val2"],
                      [key1: "another val", key2: "and another"]]
    assert "another val" == listOfMaps[1].key1

While lists and maps are simple in Groovy, there are many powerful methods in the Groovy collections APIs that extend their power. You are encouraged to read the Groovy documentation for more information, but here are some cool examples:

.. code-block:: groovy

    def colors = ["red", "green", 42, "blue"]

    // remove items from a list with the "-" operator
    colors = colors - 42
    assert ["red", "green", "blue"] == colors

    def people = [[first: "Jimmy", last: "James"],
                  [first: "Bill", last: "McNeal"]]

    // The * operator allows us to invoke an action on every item in the
    // collection, returning a new list of results.
    def firstNames = people*.first
    assert ["Jimmy", "Bill"] == firstNames

    // this is also useful for invoking the same method on a collection of objects:
    def listOfStrings = ["a", "b", "c"]
    assert ["A", "B", "C"] == listOfStrings*.toUpperCase()

----

Control Structures
------------------

Groovy supports the conditional if/else syntax as you'd expect:

.. code-block:: groovy

    if (...) {
        ...
    } else if (...) {
        ...
    } else {
        ...
    }

You can also use the ``switch`` statement to handle possible values conditionally:

.. code-block:: groovy

    def deviceDescription = "presence: 1"
    def result = ""

    switch (deviceDescription) {
        case "presence: 0":
            result = "not present"
            break
        case "presence: 1":
            result = "present"
            break
        default:
            result = "unknown"
    }

    assert "present" == result

Looping is also similar to Java or C:

.. code-block:: groovy

    def result = ""
    for (int i = 0; i < 3; i++) {
        result += "Z"
    }
    assert "ZZZ" == result

You can also use the for/in loop when working with collections:

.. code-block:: groovy

    def next = 0
    for (i in [8, 13]) {
        next += i
    }
    assert next == 21

----

Calling Methods
---------------

When invoking methods, parentheses are *sometimes* optional. Methods that do not accept any parameters must include the parentheses.

.. code-block:: groovy

    def myMethod() {
        // ...
    }

    def myOtherMethod(someArg1, someArg2) {
        // ...
    }

    myMethod()          // OK
    myMethod            // error
    myOtherMethod(2, 3) // OK
    myOtherMethod 4, 5  // OK

----

.. _groovy_getters_setters:

Getters and Setters
-------------------

Groovy adds in some convenience JavaBean style getter and setter methods.
It's worth being aware of this in case you see some code that references a property that seemingly isn't defined anywhere:

.. code-block:: groovy

    def getSomeValue() {
        return "got it"
    }

    assert "got it" == someValue

How did referencing ``someValue`` end up invoking the method ``getSomeValue()``?
When Groovy sees a reference to the property named ``someValue``, it first looks to see if it is defined somewhere.
In the above example, it is not.
So, Groovy then looks to see if there is a getter method.
JavaBean conventions specify that a properties getter method should be named beginning with "get", followed by the name of the property (with the first letter of the property capitalized).

Don't worry if that's somewhat confusing; just know that if you a reference to a property name that doesn't appear to exist, it might be invoking a getter method.

----

Defining Methods
----------------

Methods are generally defined and invoked as in other modern languages, with some notable enhancements.

First, the basics. Method signatures can accept both typed and untyped arguments:

.. code-block:: groovy

    // arguments types are optional:
    def asMap(arg1, arg2) {
        return [arg1: arg2]
    }
    assert [key: "val"] == asMap("key", "val")

    // can use typed arguments as well
    Map asMapWithTypedArgs(String arg1, String arg2) {
        return [arg1: arg2]
    }
    assert [key: "another val"] = asMap("key", "another val")

The ``return`` statement is optional in a Groovy method. The value of the last expression evaluated is returned by default:

.. code-block:: groovy

    def asMap(arg1, arg2) {
        // no return statement
        [arg1: arg2]
    }
    assert [key: "val"] == asMap("key", "val")

Methods can also be defined to accept *named parameters*. This is frequently used in SmartThings, as it allows for flexible and easily-extendable methods. This is accomplished by accepting a ``Map`` parameter (the typing is optional, but used here for clarity):

.. code-block:: groovy

    def myMethod(Map params) {
        "$params.firstName, $params.lastName"
    }

    // note the lack of parentheses here also
    assert "First, Last" == myMethod firstName: "First", lastName: "Last"

Methods can also define default values for parameters. If not passed when calling the method, the default will be used:

.. code-block:: groovy

    def defaultParams(first, last, middle = "") {
        "Welcome, $first $middle $last"
    }

    def greetGeorge = defaultParams("George", "Costanza", "Louis")
    def greetKramer = defaultParams("Cosmo", "Kramer")

    assert "Welcome, George Louis Costanza" == greetGeorge
    assert "Welcome, Cosmo  Kramer" == greetKramer

Worth noting is that none of the above definitions include any type of explicit visibility modifier information. By default, when using ``def``, the method is public. Want to make your method private? It's syntactically allowed, but actually isn't respected by Groovy (gasp!). And in SmartThings, this really isn't necessary since we are not creating our own classes or object models. So, we typically just omit any visibility modifier for simplicity.

----

Exception Handling
------------------

Like other programming languages, Groovy has error conditions, or exceptions. Because Groovy is based on Java, there are similarities to how Java handles exceptions. The big difference is that Groovy *does not require you to handle so-called checked exceptions*. In Groovy, we are always free to handle exceptions if we want, or disregard them and let them percolate up the call stack.

To handle general exceptions, you can place the potentially exception-causing code in a try/catch block:

.. code-block:: groovy

    try {
        someMethodThatMightGoBoom()
    } catch (e)
        // log the error message, and/or handle in some way
    }

By not declaring the type of exception we can catch, any exception will be caught here.

----

Closures
--------

If you are most familiar with languages like C or Java, closures may be something you haven't heard of or used. You'll see a *lot* of closures being used in Groovy and SmartThings, so it's worth understanding the basics.

First, consider a simple example. Say we have a List of numbers, and want to do something with each item in the list. For our purposes, it doesn't matter what we want to do, only that we want to iterate over every item in the list and do something.

We could certainly do something like this:

.. code-block:: groovy

    def list = [1, 2, 3, 4]
    for (int i = 0; i < list.size(); i++) {
        println list[i]
    }

That works, but if you think about it, our code shouldn't have to know the details of the list's size or control iterating over its contents. All we really care about is doing something to each item!

Fortunately, because Groovy supports closures, we can rewrite the above code as:

.. code-block:: groovy

    def list [1, 2, 3, 4]
    list.each {num ->
        println num
    }

If you have a Java background, you might be thinking to yourself that Java already solves this with the for/each statement. And for simple iteration, you're right - both the for/each statement in Java and the ``each()`` method in Groovy appear to do the same thing. But, closures are much more powerful than just providing more convenient ways to iterate, as we'll see next.

Consider an example where given a list of numbers, we want to know which numbers are greater than 50. Without closures, we would probably write something like this:

.. code-block:: groovy

    def greaterThan50(nums) {
        def result = []
        for (num in nums) {
            if (num > 50) {
                result << num
            }
        }
        result
    }

    def test = greaterThan50([2, 5, 62, 50, 25, 88])
    assert 2 == test.size()
    assert test.contains(62)
    assert test.contains(88)

This is valid Groovy, but with the ability to use closures, we can write code that is much more expressive and concise:

.. code-block:: groovy

    def greaterThan50(nums) {
        // findAll returns a list of items
        // that match the condition specified in the passed-in closure
        nums.findAll {
            it > 50
        }
    }

    def test = greaterThan50([2, 5, 62, 50, 25, 88])
    assert 2 == test.size()
    assert test.contains(62)
    assert test.contains(88)

This may look very foreign to you, but once you start using and understanding closures, you'll find them *very* useful.

Simply put, Groovy Closures are anonymous blocks of code that can be passed to other methods, and those methods can then call that block of code.

The example above uses the ``findAll()`` method that is available on all Groovy collections. The method accepts a closure (defined within ``{}``) as the argument (when passing closures to methods, it is typical and preferred to *not* put parentheses around the parameters).

``findAll()`` works by calling the passed-in closure on every element in the list, and if the item meets the criteria specified in the closure (greater than 50), adds it to a new list that is returned. The closure (``{ it > 50}``) is passed the item - by default, this is available in a variable named ``it``. You can also provide a name if you wish, by using the ``->`` operator:

.. code-block:: groovy

        nums.findAll {num ->
            num > 50
        }

To deepen our understanding, we will next look at an example of creating a method that accepts a closure.

Let's say we want to print all even numbers up to a a specified number [1]_. While we can do this without closures, using them will illustrate how they work.

Here's the code to do this:

.. code-block:: groovy

    def pickEven(n, block) {
        for (int i=2; i <= n; i += 2) {
            block(i)
        }
    }

    pickEven(10) {
        println it
    }

The ``pickEven()`` method accepts an upper bound (``n``), and a closure (``block``). It iterates over all the even numbers up to the upper bound, and calls the passed-in closure on each (``block(i)``).

When we call ``pickEven()``, the closure simply calls ``println()`` on each item. Running this would result in the following output:

.. code-block:: bash

    2
    4
    6
    8
    10

A final note about closures, with regards to the use of the optional parentheses. As discussed earlier, parentheses are optional when calling methods in most cases. This is no different for closures, but convention is to *not* put parentheses around closures as arguments to methods.

The above call to ``findAll()`` could be written as:

.. code-block:: groovy

    nums.findAll({ num ->
        num > 50
    })

It is idiomatic Groovy to not surround closure arguments with parentheses. When a method accepts multiple parameters, and the closure is the last parameter, the closure should be outside the parentheses.

.. code-block:: groovy

    // instead of:
    pickEven(10 {
        println it
    })

    // prefer:
    pickEven(10) {
        println it
    }

There's much more to know about closures if you're curious, but if you understand the above concepts you will know enough to use them in your SmartThings development.

----

Groovy Truth
------------

Groovy has some special definitions for what is true and what is false. It's worth understanding these definitions, as they become very valuable in writing concise, expressive Groovy code.

Boolean values behave as you'd expect:

.. code-block:: groovy

    def t = true
    def f = false

    assert t
    assert !f

If an object reference is null, it will evaluate to false:

.. code-block:: groovy

    def obj
    assert !obj

This allows us to remove some boilerplate code around null checks. If you're familiar with Java, you have probably seen code like this:

.. code-block:: groovy

    if (obj != null) {
        // ...
    }

In Groovy, we can simply do:

.. code-block:: groovy

    if (obj) {
        // ...
    }

Strings also provide some handy truthiness:

.. code-block:: groovy

    def str1 = ""
    def str2 = "some string"

    assert !str1  // empty strings are false
    assert str2

Collections also support reasonable boolean values - empty collections evaluate to ``false``:

.. code-block:: groovy

    def list1 = [1, 2, 3]
    def list2 = []
    def map1 = ['myKey': 'myValue']
    def map2 = [:]

    assert list1
    assert !list2   // empty list is false
    assert map1
    assert !map2    // empty map is false

Back to Java, you may be familiar with writing code like this:

.. code-block:: java

    Map<String, String> myMap = someMethodThatReturnsAMap();
    if (myMap != null && !myMap.isEmpty()) {
        // ...
    }

That's a lot of noise in the code just to check that the map is not empty. With Groovy, this becomes much more straightforward:

.. code-block:: groovy

    def myMap = someMethodThatReturnsAMap()
    if (myMap) {
        // here we know that the map is not null, and contains items.
    }

The above should get you through 99% of the code you'll see and write with SmartThings, but see the Groovy documentation for `more on the Groovy Truth <http://docs.groovy-lang.org/latest/html/documentation/#Groovy-Truth>`__.

----

Default Imports
---------------

Groovy imports several Java and Groovy packages by default. The following packages are imported for us (no need to explicitly import them via the ``import`` statement):

- ``java.io.*``
- ``java.lang.*``
- ``java.math.BigDecimal``
- ``java.math.BigInteger``
- ``java.net.*``
- ``java.util.*``
- ``groovy.lang.*``
- ``groovy.util.*``

----

What About Classes?
-------------------

At the beginning of this tutorial, we said that Groovy is an object-oriented language. Yet, we haven't discussed creating classes in this tutorial. The reason for this is that in SmartThings, creating your own classes actually isn't possible. In SmartThings, each SmartApp or Device Handler is a relatively small, contained piece of code that runs in a sandboxed environment.

If you want to learn more about classes in Groovy in general or for usage outside of SmartThings, see the Groovy documentation.

----

Further Reading
---------------

There are many resources available to learn more about Groovy. As we'll see in the :ref:`groovy-for-smartthings` tutorial, there are some things about the Groovy programming language that we simplify with SmartThings, so a full knowledge of Groovy and all its capabilities is not necessary to develop with SmartThings.

If you want to learn more about Groovy, here are some good resources available online:

- The `Groovy Documentation <http://www.groovy-lang.org/documentation.html>`__ is the official language documentation.
- The `Style Guide <http://www.groovy-lang.org/style-guide.html>`__ in the Groovy documentation contains many useful guidelines and recommendations for writing idiomatic Groovy code.
- `Learn Groovy in Y minutes <http://learnxinyminutes.com/docs/groovy>`__ is an excellent, concise, and code-heavy tutorial for getting familiar with Groovy.
- `Groovy for Java Developers <https://www.timroes.de/2015/06/27/groovy-tutorial-for-java-developers/>`__ aims to get Java developers familiar with Groovy quickly.

There are also several books on Groovy. Here are a couple we know and recommend:

- `Groovy in Action <http://www.amazon.com/Groovy-Action-Dierk-246-nig/dp/1935182447>`__
- `Programming Groovy <http://www.amazon.com/Programming-Groovy-Productivity-Developer-Programmers/dp/1937785300>`__

----

Next Steps
----------

Now that you know some of the basics of Groovy, head over to our :ref:`groovy-for-smartthings` tutorial to learn how SmartThings uses Groovy in some very specific ways for development.

.. [1] This example is taken from the book `Programming Groovy: Dynamic Productivity for the Java Developer <http://www.amazon.com/Programming-Groovy-Productivity-Developer-Programmers/dp/1934356093/>`__ by Venkat Subramaniam.
