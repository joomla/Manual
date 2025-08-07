---
sidebar_position: 1
---

New Features
============

All the new features that have been added to this version.
Any changes in best practice.

#### Model states are a new class

File: libraries/src/MVC/Model/State.php
Description: The state of a model is not anymore a `CMSObject`. Instead of, it is a new class libraries/src/MVC/Model/State.php which inherits from a `Registry`. Like that are all functions available a state registry should have. The class itself is deprecated as only features from the registry should be used. In version 7.0 we are going to remove the state class all together and use then only the registry class.

For backwards compatibility, the state class supports direct property access though magic methods which will throw a deprecated warning when used.


#### Support for ESM importmap

Support of [ESM importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) 
provides a possibility to keep the code modular, flexible and allows to use existing ES modules with minimum recompilation. 
For more detail about how to register your module in to `importmap` look for Working with ESM importmap in Web Asset Manager.

#### JoomlaDialog script for rendering modals

New JoomlaDialog module for rendering modals and dialogs. 
For more detail check [Joomla Dialog (popup) script](https://manual.joomla.org/docs/general-concepts/javascript/joomla-dialog).

PR: https://github.com/joomla/joomla-cms/pull/40150

#### System events have own classes

Each system event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/40522.
The event class allows to retrieve an active application form the event:
```php
public function onAfterDispatch(Joomla\CMS\Event\Application\AfterDispatchEvent $event)
{
    dump($event->getApplication()->getName());
}
```

#### Content events have own classes

Each content event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41226

#### User events

Each user event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41317

The event `onUserAuthenticate` now is a real event, PR: https://github.com/joomla/joomla-cms/pull/41485

#### Finder events have own classes

Each finder event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41320

#### Module events have own classes

Each module event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41413
`onAfterRenderModules` should now use `$event->getContent()` and `$event->updateContent($content)`, instead of modification by reference. The referencing still works but will be removed in the future.

#### Installer events have own classes

Each installer event now have own event class, PR: 
 - https://github.com/joomla/joomla-cms/pull/41322
 - https://github.com/joomla/joomla-cms/pull/41518

#### Privacy component events have own classes

Each event of Privacy component now have own event class, PR:  https://github.com/joomla/joomla-cms/pull/41486

#### Custom fields events have own classes

Each Custom fields event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41495

#### Events for Actionlog, Cache, Contact, Checkin components have own classes

Each event for Actionlog, Cache, Contact, Checkin components have own class, PR: https://github.com/joomla/joomla-cms/pull/41488

#### Menu events have own classes

Each menu event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41498

#### com_ajax events have own classes

com_ajax events event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41524

#### New plugin events

 - System event `onAfterInitialiseDocument`, allows to access to Document instance at early stage of Document life, PR: https://github.com/joomla/joomla-cms/pull/40512

#### Added the option to serve Joomla from a public folder

 - The instance could be served from a public folder (either subfolder in the root folder of Joomla or not). Command Line tools are provided both for the installation process or to use at a later time. Requirements: templates need to support the `child templates`, no PHP files inside the folders `media` and `images` and a server that allows defining the end point of the serving folder.

#### Dark Mode Support

The Joomla backend template - atum now supports the browser dark theme and is enabled automatically through CSS media queries. In the majority of cases simply utilising bootstrap 5.3's classes will natively give you this support. We encourage all 3rd party extension developers to check their extensions in dark mode and make any minor tweaks required to facilitate a consistent dark mode UI for their extensions.

Templates that support dark mode through CSS media queries should add the `data-color-scheme-os` attribute to their body element (for both frontend and backend templates) so 3rd party extensions, such as the editor plugins ship with Joomla can load the appropriate dark theme.
