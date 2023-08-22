---
sidebar_position: 1
---

New features
===============
All the new features that have been added to this version.
Any changes in best practice.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

#### Model states are a new class

File: libraries/src/MVC/Model/State.php
Description: The state of a model is not anymore a `CMSObject`. Instead of, it is a new class libraries/src/MVC/Model/State.php which inherits from a `Registry`. Like that are all functions available a state registry should have. The class itself is deprecated as only features from the registry should be used. In version 7.0 we are going to remove the state class all together and use then only the registry class.

For backwards compatibility, the state class supports direct property access though magic methods which will throw a deprecated warning when used.


#### Support for ESM importmap

Support of [ESM importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) 
provides a possibility to keep the code modular, flexible and allows to use existing ES modules with minimum recompilation. 
For more detail about how to register your module in to `importmap` look for Working with ESM importmap in Web Asset Manager.

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

#### User events have own classes

Each user event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41317

#### Finder events have own classes

Each finder event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41320

#### Module events have own classes

Each module event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41413
`onAfterRenderModules` should now use `$event->getContent()` and `$event->setContent($content)`, instead of modification by reference.

#### Installer events have own classes

Each installer event now have own event class, PR: https://github.com/joomla/joomla-cms/pull/41322

#### New plugin events

 - System event `onAfterInitialiseDocument`, allows to access to Document instance at early stage of Document life, PR: https://github.com/joomla/joomla-cms/pull/40512
