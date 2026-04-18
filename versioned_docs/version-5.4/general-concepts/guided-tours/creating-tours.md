# Creating and launching tours

The simplest way to create tours for your organization or extensions is to create those tours with the tools provided in Joomla.

Go to System (Manage section) -> Guided Tours.

## Creating a new tour

An identifier is provided for each tour. This is not a required field but a value will always be present.
This identifier is supposed to:

- allow a tour to be started from anywhere,
- differentiate tours, and gives a hint on their origin,
- give the file name structure for the language files, if any is required for the tour,
- allow possible updates on an existing tour, easily traceable in the database.

New in Joomla 5 as well is the creation of 2 separate language files. One for the tour and one for the steps of the tour.


### The identifier

This is a unique string, very much like an alias for an article.
The string should be formatted as:

```
authorname-tourname
companyname-tourname
domain-tourname
```

For instance, a welcome tour created by Joomla would have an identifier name `joomla-welcome`.
authorname, companyname, domain name should be one single word, tourname can contain dashes.

As long as the tour you create includes your 'signature' and is unique in your pool of tours, there will be no duplication issue for users. 

The identifier corresponds to the `uid` column of the `#__guidedtour` table.
On save or duplicate, a suggested identifier string is created.


### The language files

Not all tours need language files, especially if you are only targeting a one-language audience.
But if you do need them, the files need to follow the new convention didacted by the identifier.

For instance, for the tour with identifier `joomla-welcome`, the language files will be:

```
guidedtours.joomla_welcome.ini
guidedtours.joomla_welcome_steps.ini
```

where the first file only contains 2 keys, one for the tour name and one for its description and the second file contains all step keys.

All language files need to start with `guidedtours.` and end with `.ini` or `_steps.ini`.

Reminder: the language keys can be anything BUT need to contain GUIDEDTOUR in the key name. This is to allow the tour and step views to properly distinguish what is a language key and what is just regular content.

#### Language files inside an extension

Language files do not need to be placed into administrator/language/[language]/. You can leave the files inside the extension's file structure.

In that case, the tour's uid needs to start with the name of the extension and be followed by the rest of the tour's name.

For instance, use the tour's uid:
`com_patchtester.configuration-part1`
to create a configuration tour (part 1) for the Patch Tester extension.

Tour uids need to start with 'com_extensionname.', 'mod_modulename.', 'plg_[group]_pluginname.' or 'tpl_templatename.' to be recognized properly.

All language files need to start with 'com_extensionname.', 'mod_modulename.', 'plg_[group]_pluginname.' or 'tpl_templatename.', and end with `.ini` or `_steps.ini`.

For instance, following the previous example for the Patch Tester extension, we would have: 

```
com_patchtester.configuration_part1.ini
com_patchtester.configuration_part1_steps.ini
```
alongside the other extension's language files.


### The tour context

A `Component selector` parameter has been available ever since tours have been introduced in Joomla.
The definition of 'component selector' slightly differs in Joomla 5.
Now, on any given page where the module 'Take a tour' is showing, the tours being in the context of the page are the ones showing in priority.

Selecting a component will ensure the tour will be tagged as 'favorite' when in the component's views. 'All' will show the tour in priority in all pages. Leaving the selection to 'All' is not recommended. As a third party developer, you would select the extension(s) the tour is tied to.  

For instance, the 'How to create articles' tour will be visible in priority when in an 'Articles', 'Featured articles' or 'Categories' views.
To allow that, the tour's component selector is set to 'Articles' and 'Categories'.

Note that the Guided Tour component knows how to differentiate category tours for specific components. For instance, if you create a categories tour for com_contact, the category tour for articles won't show as a favorite tour when in 'Contact' context.

There is no available tour when editing a specific module, plugin or template. That is where launching a tour from anywhere can become handy.


### Auto start

You can set tours to auto start. Those tours will run automatically once a user enters the context of the tour. Once a tour auto starts, the user can hide the tour forever (although the tour can still be run manually), and a cancellation will delay the tour for a later run. Once a specific time has passed (the delay setting can be found in the Global Configuration of the Guided Tours - it defaults to 1 hour), the tour will run again automatically, once in context.


### Event dispatchers

Once a user cancels, opts-out or completes a tour, events are triggered, allowing developers to act according to user actions. One may want to send a message to a user after completion of a tour in order to propose another one, for instance.
Those events are triggered at different stages:
- onBeforeTourSaveUserState: before saving the auto-start tour user state (used to record states in the User Action Logs),
- onAfterTourSaveUserState: after saving the auto-start tour user state.

You can find those events in the AjaxController class.


### Adding images to the content

Use the editor to include images inside the content descriptions. Images are located in the media folder, ```/images``` by default.
However, expecially when creating a tour for a third party extension, you may want to include images located in the media folder of the extension.
In this case, the image path must start with ```media/...```.


## Launching a tour from any location

Launching a tour from a different location than the Guided Tours module is as easy as adding the attribute `data-gt-uid` with the identifier of the tour.

As an example, create a custom module in the cpanel dashboard and add this HTML to it:

```
<button class="btn btn-primary button-start-guidedtour" type="button" data-gt-uid="joomla-articles">How to create articles?</button>
<button class="btn btn-secondary button-start-guidedtour" type="button" data-gt-uid="joomla-contacts">How to create contacts?</button>
```
