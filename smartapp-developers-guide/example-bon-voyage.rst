Example: Bon Voyage
===================

To help illustrate some of the important concepts in writing a SmartApp,
let's walk through an example.

**Bon Voyage**

Our example SmartApp is fairly simple - it will monitor a set of presence
detectors, and trigger a mode change when everyone has left.

To accomplish this, our app will need to do the following:

- Gather the necessary input from the user, including which sensors to monitor, what mode to trigger, and other app preferences.
- Subscribe to the appropriate events, and take action when they are triggered.

Let's begin with configuring the preferences.

**Bon Voyage Configurations**

To configure the Bon Voyage app, we will want to gather the following information
from the user:

- Which sensors to monitor
- The mode to trigger when everyone is away
- A false alarm threshold
- Who should be notified, and how

Each of these inputs corresponds into a preferences section:

::

    preferences {
        section("When all of these people leave home") {
            input "people", "capability.presenceSensor", multiple: true
        }
        section("Change to this mode") {
            input "newMode", "mode", title: "Mode?"
        }
        section("False alarm threshold (defaults to 10 min)") {
            input "falseAlarmThreshold", "decimal", title: "Number of minutes", required: false
        }
        section( "Notifications" ) {
            input "sendPushMessage", "enum", title: "Send a push notification?", metadata:[values:["Yes","No"]], required:false
            input "phone", "phone", title: "Send a Text Message?", required: false
        }
    }

Let's look at each section in a bit more detail.

The *When all of these people leave home* section allows the user to 
configure what sensors to use for this app.
The user will see a section with the main title "When all of these
people leave home." A dropdown will be populated with all the devices
that have the presenceSensor capability (`capability.presenceSensor`) 
for them to select the sensor(s) they'd like to use. 
`Multiple: true` allows them to add as many sensors as they'd like. 
Their choice(s) are then stored in a variable named `people`.

The *Change to this mode* section allows the user to specify what mode
should be triggered when everyone is away. The input type of *mode* 
is used, so a dropdown will be populated with all the modes the user 
has set up. The title property is used to show the title "Mode?" above 
the field. The selection is stored in the variable named `newMode`.

The section *False alarm threshold (defaults to 10 min)* allows the 
user to specify a false alarm threshold. These types of thresholds are 
common in our SmartApps. A section is shown titled "False alarm 
threshold (defaults to 10 min)". The input fieldtype of decimal is 
used, to allow the user to input a numeric value that represents minutes. 
The title "Number of minutes" is specified, and we set the `required` 
property to false. By default, all fields are required, so you must 
explicitly state if it is not required. We store the user's input in 
the variable named `falseAlarmThreshold` for later use.

Finally, a section is shown labeled as "Notifications". This is where
the user can configure how they want to be notified when everyone is away.
An input with the field type of *enum* is created. With *enum* you must
define values for it, so they are defined via
`metadata:[values:["Yes","No"]]`. This field is not required as
specified by `required:false`, and what the user selects will be stored
in `sendPushMessage`. There is also an optional field called "Send a
Text Message?". It uses the field type of `phone` to provide a
formatted input for phone numbers. The values input by the user are stored in
the `phone` variable.

**Monitor and React**

Now that we have gathered the input we need from the user, we need to listen
to the appropriate events, and take action when they are triggered.

We do this through the required `installed` method:

::

    def installed() {
        log.debug "Installed with settings: ${settings}"
        log.debug "Current mode = ${location.mode}, people = ${people.collect{it.label + ': ' + it.currentPresence}}"
        subscribe(people, "presence", presence)
    }

Upon installation, we want to keep track of the status of our people. We
use the `subscribe` method to "listen" to the `presence` attribute
of the predefined group of presence sensors, `people`. When the
presence status changes of any of our people, the method `presence`
(the last parameter above) will be called.

(Also note the log statements. We won't discuss log statements in detail,
but providing good logging is a habbit you will want to get into as a SmartApps
developer. Good logging is invaluable when trying to debug/troubleshoot your app!)

Let's define our presence method.

::

    def presence(evt) {
        log.debug "evt.name: $evt.value"
        if (evt.value == "not present") {
            if (location.mode != newMode) {
                log.debug "checking if everyone is away"  
                if (everyoneIsAway()) {
                    log.debug "starting sequence"
                    runIn(findFalseAlarmThreshold() * 60, "takeAction", [overwrite: false])
                }
            }
            else {
                log.debug "mode is the same, not evaluating"
            }
        }
        else {
            log.debug "present; doing nothing"
        }
    }

    // returns true if all configured sensors are not present,
    // false otherwise.
    private everyoneIsAway() {
        def result = true
        // iterate over our people variable that we defined
        // in the preferences method
        for (person in people) {
            if (person.currentPresence == "present") {
                // someone is present, so set our our result
                // variable to false and terminate the loop.
                result = false
                break
            }
        }
        log.debug "everyoneIsAway: $result"
        return result
    }

    // gets the false alarm threshold, in minutes. Defaults to 
    // 10 minutes if the preference is not defined.
    private findFalseAlarmThreshold() {
        // In Groovy, the return statement is implied, and not required.
        // We check to see if the variable we set in the preferences
        // is defined and non-empty, and if it is, return it.  Otherwise, 
        // return our default value of 10
        (falseAlarmThreshold != null && falseAlarmThreshold != "") ? falseAlarmThreshold : 10
    }

Let's break that down a bit.

The first thing we need to do is see what event was triggered. We do this
by inspecting the *evt* variable that is passed to our event handler.
The presence capability can be either "present" or "not present". 

Next, we check that the current mode isn't already set to the mode we
want to trigger. If we're already in our desired mode, there's nothing
else for us to do!

Now it starts to get fun! If everyone is away, we call the built-in *runIn* method,
which runs the method `takeAction` in a specified amount of time (we'll define that method shortly).
We use a helper method `findFalseAlarmTrheshold()` multiplied by 60
to convert minutes to seconds, which is what the runIn method requires.
We specify `overwrite: false` so that it won't overwrite previously scheduled
takeAction calls. In the context of this SmartApp, it means that if one user 
leaves, and then another user leaves within the `falseAlarmThreshold` time,
takeAction will still be called twice. By default, overwrite is true,
meaning that if you scheduled takeAction to run previously, it would be
cancelled and replaced by your current call.

We also have defined two helper methods above, `everyoneIsAway`, and 
`findFalseAlarmThreshold`. 

`everyoneIsAway` returns true if all configured sensors are not present,
and false otherwise. It iterates over all the sensors configured and stored
in the `people` variable, and inspects the `currentPresence` property.
If the `currentPresence` is "present", we set the result to false, and terminate
the loop. We then return the value of the result variable.

`findFalseAlarmThreshold` gets the false alarm threshold, in minutes, 
as configured by the user. If the threshold preference has not been set, 
it returns ten minutes as the default.

Now we need to define our *takeAction* method:

::

    def takeAction() {
        if (everyoneIsAway()) {
            def threshold = 1000 * 60 * findFalseAlarmThreshold() - 1000
            def awayLongEnough = people.findAll { person ->
                def presenceState = person.currentState("presence")
                def elapsed = now() - presenceState.rawDateCreated.time
                elapsed >= threshold
            }
            log.debug "Found ${awayLongEnough.size()} out of ${people.size()} person(s) who were away long enough"
            if (awayLongEnough.size() == people.size()) {
                //def message = "${app.label} changed your mode to '${newMode}' because everyone left home"
                def message = "SmartThings changed your mode to '${newMode}' because everyone left home"
                log.info message
                send(message)
                setLocationMode(newMode)
            } else {
                log.debug "not everyone has been away long enough; doing nothing"
            }
        } else {
            log.debug "not everyone is away; doing nothing"
        }
    }

    private send(msg) {
        if ( sendPushMessage != "No" ) {
            log.debug( "sending push message" )
            sendPush( msg )
        }

        if ( phone ) {
            log.debug( "sending text message" )
            sendSms( phone, msg )
        }

        log.debug msg
    }

There's a lot going on here, so we'll look at some of the more interesting
parts.

The first thing we do is check again if everyone is away. This is necessary
since something may have changed since it was already called, because of
the `falseAlarmThreshold`.

If everyone is away, we need to find out how many people have been 
away for long enough, using our false alarm threshold. We create a 
variable, `awayLongEnough` and set it through the Groovy findAll method.
The findAll method returns a subset of the collection based on the 
logic of the passed-in closure. For each person, we use the
`currentState` method available to us, and use that to 
get the time elapsed since the event was triggered. If the time elapsed
since this event exceeds our threshold, we add it to the `awayLongEnough`
collection by returning true in our closure (note that we could omit
the "return" keyword, as it is implied in Groovy). For more information
about the findAll method, or how Groovy utilizes closures, consult the 
Groovy documentation at http://groovy.codehaus.org/Documentation

If the number of people away long enough equals the total number of
people configured for this app, we send a message (we'll look at that
method next), and then call the `setLocationMode` method with the 
desired mode. This is what will cause a mode change.

The `send` method takes a String parameter, `msg`, and if the user has
configured the app to send a push notification, calls the `sendPush`
method. It then checks to see if the user has chosen to send a text message,
by checking if the `phone` variable has been set. If it has, it calls the
`sendSms(phone, msg)` method.

Finally, we need to write our `updated` method, which is called whenever
the user changes any of their configurations. When this method is called,
we need to call the `unsubscribe` method, and then `subscribe`, to
effectively reset our app.

::

    def updated() {
        log.debug "Updated with settings: ${settings}"
        log.debug "Current mode = ${location.mode}, people = ${people.collect{it.label + ': ' + it.currentPresence}}"
        unsubscribe()
        subscribe(people, "presence", presence)
    }

Our SmartApp is now complete! Putting it all together, here's our final
Bon Voyage app:

**Complete Code Listing**

::

    /**
     *  Bon Voyage
     *
     *  Author: SmartThings
     *  Date: 2013-03-07
     *
     *  Monitors a set of presence detectors and triggers a mode change when everyone has left.
     */

    preferences {
        section("When all of these people leave home") {
            input "people", "capability.presenceSensor", multiple: true
        }
        section("Change to this mode") {
            input "newMode", "mode", title: "Mode?"
        }
        section("False alarm threshold (defaults to 10 min)") {
            input "falseAlarmThreshold", "decimal", title: "Number of minutes", required: false
        }
        section( "Notifications" ) {
            input "sendPushMessage", "enum", title: "Send a push notification?", metadata:[values:["Yes","No"]], required:false
            input "phone", "phone", title: "Send a Text Message?", required: false
        }
    }

    def installed() {
        log.debug "Installed with settings: ${settings}"
        log.debug "Current mode = ${location.mode}, people = ${people.collect{it.label + ': ' + it.currentPresence}}"
        subscribe(people, "presence", presence)
    }

    def updated() {
        log.debug "Updated with settings: ${settings}"
        log.debug "Current mode = ${location.mode}, people = ${people.collect{it.label + ': ' + it.currentPresence}}"
        unsubscribe()
        subscribe(people, "presence", presence)
    }

    def presence(evt) {
        log.debug "evt.name: $evt.value"
        
        // The presence capability can either by "present" or "not present".
        // If the user is not present, we want to check if everyone is away 
        if (evt.value == "not present") {
            // Check that the desire mode isn't already the same as the current mode.
            if (location.mode != newMode) {
                log.debug "checking if everyone is away"  
                // If everyone is away, start the sequence
                if (everyoneIsAway()) {
                    log.debug "starting sequence"
                    runIn(findFalseAlarmThreshold() * 60, "takeAction", [overwrite: false])
                }
            }
            else {
                log.debug "mode is the same, not evaluating"
            }
        }
        else {
            log.debug "present; doing nothing"
        }
    }

    // returns true if all configured sensors are not present,
    // false otherwise.
    private everyoneIsAway() {
        def result = true
        // iterate over our people variable that we defined
        // in the preferences method
        for (person in people) {
            if (person.currentPresence == "present") {
                // someone is present, so set our our result
                // variable to false and terminate the loop.
                result = false
                break
            }
        }
        log.debug "everyoneIsAway: $result"
        return result
    }

    // gets the false alarm threshold, in minutes. Defaults to 
    // 10 minutes if the preference is not defined.
    private findFalseAlarmThreshold() {
        // In Groovy, the return statement is implied, and not required.
        // We check to see if the variable we set in the preferences
        // is defined and non-empty, and if it is, return it.  Otherwise, 
        // return our default value of 10
        (falseAlarmThreshold != null && falseAlarmThreshold != "") ? falseAlarmThreshold : 10
    }

    def takeAction() {
        if (everyoneIsAway()) {
            def threshold = 1000 * 60 * findFalseAlarmThreshold() - 1000
            def awayLongEnough = people.findAll { person ->
                def presenceState = person.currentState("presence")
                def elapsed = now() - presenceState.rawDateCreated.time
                elapsed >= threshold
            }
            log.debug "Found ${awayLongEnough.size()} out of ${people.size()} person(s) who were away long enough"
            if (awayLongEnough.size() == people.size()) {
                //def message = "${app.label} changed your mode to '${newMode}' because everyone left home"
                def message = "SmartThings changed your mode to '${newMode}' because everyone left home"
                log.info message
                send(message)
                setLocationMode(newMode)
            } else {
                log.debug "not everyone has been away long enough; doing nothing"
            }
        } else {
            log.debug "not everyone is away; doing nothing"
        }
    }

    private send(msg) {
        if ( sendPushMessage != "No" ) {
            log.debug( "sending push message" )
            sendPush( msg )
        }

        if ( phone ) {
            log.debug( "sending text message" )
            sendSms( phone, msg )
        }

        log.debug msg
    }

