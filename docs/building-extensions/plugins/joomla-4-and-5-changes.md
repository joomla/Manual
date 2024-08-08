---
title: Joomla 4 and 5 Changes
sidebar_position: 2
---

Joomla 4 and 5 Changes
======================

## Key changes
In Joomla 4 a number of significant changes began to be introduced to the plugins area:
1. Plugins were instantiated via the Dependency Injection Container, through the `services/provider.php` file. Previously plugins were run via the plugin's main php file.
2. Plugins subscribed to the events which they wanted to get notified about. Previously you wrote a method whose name matched the name of the event, and Joomla used PHP reflection classes to determine when your method got called. With the subscription mechanism Joomla checks if your plugin implements `Joomla\Event\SubscriberInterface` and if so calls `getSubscribedEvents` to which the plugin returns the event types it wants to handle, and the method which Joomla should call:
```php
public static function getSubscribedEvents(): array
{
    return [
        'onContentPrepare' => 'myContentPrepareMethod',  
        'onContentAfterTitle' => 'myContentAfterTitleMethod',  
    ];
}
```
3. Events were passed to plugins as Joomla Event objects. Previously each method associated with an event had parameters passed which were specific to that event type. For example, the method called when `onContentPrepare` was triggered was:
```php
public function onContentPrepare($context, &$row, $params, $page = 0)
```
In Joomla 3 "events" basically comprised 
- a string with the event name eg "onContentPrepare", and
- associated parameters, which were passed to the `onContentPrepare` method.

The aim of the Joomla team has been to replace these with event classes, with each type of event having its own concrete event class. For example, for the `onContentPrepare` event there would be a `ContentPrepareEvent` class, with properties `$context`, `$row`, `$params` and `$page`. However, the process of replacing all the current code has been spread over a number of Joomla releases, some being done in Joomla 4 and some in Joomla 5.

To enable plugins to use Event classes before the full concrete event class could be implemented a temporary solution was adopted, that is, to provide a `GenericEvent` class, which meant that plugins could be developed which used the Event parameter in their methods, rather than the list of parameters. 

**It's important to understand that the way you obtain the parameters of your plugin method, and the way which you provide your return value is different depending on whether a GenericEvent or a concrete class is used.**

This is what we're now going to look at in detail. 

## Joomla 3 / 4 / 5 comparison
Let's take the example of `onContentPrepare` and consider how it has changed through these releases. 

### Joomla 3
In Joomla 3 the event was triggered in `com_content` using
```php
$dispatcher->trigger('onContentPrepare', array ('com_content.article', &$item, &$item->params, $offset));
```
This resulted in a call to your plugin method: 
```php
public function onContentPrepare($context, &$row, $params, $page = 0)
```
and Joomla found this method by using the reflection class of your plugin class. 

`onContentPrepare` doesn't take any return value, but other plugins such as `onContentAfterTitle` do. To specify the return value you simply did
```php
return $value;
```

The Joomla team have provided backward compatibility for plugins through releases 4 and 5, so this mechanism will still work. However it will likely disappear in Joomla 6, so you should not write any new plugins this way. 

### Joomla 4
In Joomla 4 the event is triggered using:
```php
$this->dispatchEvent(new Event('onContentPrepare', ['com_content.article', &$item, &$item->params, $offset]));
```
This creates a `GenericEvent` which has Argument fields for the parameters above, which can be obtained via the `getArguments` method (using PHP array destructuring):
```php
[$context, $article, $params, $page] = array_values($event->getArguments());
```
The `array_values` is not really necessary here, but we'll see the reason for it shortly. 

For `GenericEvent` the `result` is an array which is held within the `GenericEvent` class, and you have to add any return value from your plugin into this array. So to return a value from a plugin method using `GenericEvent` you use:
```php
$result = $event->getArgument('result') ?: [];   // get the result argument from GenericEvent
$result[] = $value;                              // add your return value into the array
$event->setArgument('result', $result);          // write back the updated result into the GenericEvent instance
```

### Joomla 5
In Joomla 5 the event is triggered using:
```php
$dispatcher->dispatch('onContentPrepare', new Content\ContentPrepareEvent('onContentPrepare', $contentEventArguments));
```
Here the concrete event class `ContentPrepareEvent` (from libraries/src/Event/Content/ContentPrepareEvent.php) is used. Such events may have specific getter methods (eg `getContext`), but you can still get the parameters using:
```php
[$context, $article, $params, $page] = array_values($event->getArguments());
```
Here the `array_values` is necessary, so if you use this to obtain the parameters it will work for both `GenericEvent` and concrete Event classes. 

To return a value your plugin should use `$event->addResult($value)`, but you can check if this method exists by 
```php
use Joomla\CMS\Event\Result\ResultAwareInterface;
...
    if ($event instanceof ResultAwareInterface) {
        $event->addResult($value);
        return;
    } else {
        // use GenericEvent approach
    }
```

**If you're developing a developing a plugin to handle a `GenericEvent` then it's crucial to use the above mechanisms to avoid the plugin failing whenever the triggering code moves to using a concrete Event class.**

## Summary - Accessing Event Arguments

### Concrete Event Class

You can use this approach if under libraries/src/Event there is a Joomla event class (known as a "concrete" event class) which is specific to the plugin event group. (Only a limited set is available for Joomla 4).

```php
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use Joomla\CMS\Event\Content\ContentPrepareEvent;

class MyPlugin extends CMSPlugin extends SubscriberInterface
{
  public static function getSubscribedEvents(): array
  {
    return [
      'onContentPrepare' => 'myOnContentPrepare',  
    ];
  } 

  public function myOnContentPrepare(ContentPrepareEvent $event)
  {
    $context = $event->getArgument('context');
    $item = $event->getArgument('subject'); 
    $params = $event->getArgument('params');
    $page = $event->getArgument('page');
    // ...
  }
```

Here in the `getArgument()` call you must use the correct name for the argument, and in the Joomla manual documentation the correct name is always specified.

To use an event class your plugin class must implement \Joomla\Event\SubscriberInterface and provide the `getSubscribedEvents` function. Your plugin listener function must then have just the single `$event` parameter.

### Generic Event Class

Use this approach after Joomla 4.0 if you wish to use event classes, but a concrete event class isn't available for your target Joomla version.

```php
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use Joomla\Event\Event;

class MyPlugin extends CMSPlugin extends SubscriberInterface
{
  public static function getSubscribedEvents(): array
  {
    return [
      'onContentPrepare' => 'myOnContentPrepare',  
    ];
  } 

  public function myOnContentPrepare(Event $event)
  {
    [$context, $item, $params, $page] = array_values($event->getArguments());
    ...
  }
```

This approach also works for concrete event classes. 

It depends on the order of the arguments in the event class, and the correct order is always given in the documentation.

There is a commitment from the Joomla team to preserve the same order within the event arguments as within the order of the parameters of the legacy method, but this will be removed in Joomla 6. This is implemented via the variable `$legacyArgumentsOrder`, eg in Joomla\CMS\Event\Content\ContentPrepareEvent (in libraries/src/Event/Content/ContentPrepareEvent.php):

```php
class ContentPrepareEvent extends ContentEvent
{
    protected $legacyArgumentsOrder = ['context', 'subject', 'params', 'page'];
```

### Traditional Legacy Method

You will be using this method if you developed your plugin before Joomla 4.0. In this case, you're probably better to continue this approach until concrete event classes are available for all the events your plugin listens for.

You shouldn't use this approach for developing a new plugin, as you will have to rework it.

To use the traditional (legacy) method, you specify a public function which has the same name as the event name, and Joomla uses PHP reflection to find your method. You specify the event parameters in your function signature, for example:

```php
use Joomla\CMS\Plugin\CMSPlugin;

class MyPlugin extends CMSPlugin 
{
  public function onContentPrepare($context, $item, $params, $page)
  {
    if ($context == "com_content.article") ...
  }
```

It doesn't matter what you specify as the names of your function parameters, just on their order in the parameter sequence.
The documentation in the Joomla manual always specifies the correct order of these arguments.

## Summary - Returning Values

### Concrete Event Class

To return a value when using a concrete event class use `$event->addResult()`:

```php
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Event\Content\AfterTitleEvent;

class MyPlugin extends CMSPlugin 

    public function onContentAfterTitle(AfterTitleEvent $event)
    {
        ...
        $event->addResult($value);
    }
```

### Generic Event Class

To return a value when using a generic event class use the following:

```php
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;

class MyPlugin extends CMSPlugin 

    public function onContentAfterTitle(Event $event)
    {
        ...
        $result = $event->getArgument('result') ?: [];   // get the result argument from GenericEvent
        $result[] = $value;                              // add your return value into the array
        $event->setArgument('result', $result);  
    }
```

This approach will also work with concrete event classes.

### Traditional Legacy Method

To return a value when using the legacy method use the PHP `return`:

```
  public function onContentAfterTitle($context, $item, $params, $page)
  {
    ...
    return $value;
  }
```

## Other New Features
### Priority
To use a plugin priority other than the default, specify this in your response to `getSubscribedEvents`
```php
public static function getSubscribedEvents(): array
{
    return [
        'onContentPrepare' => ['myContentPrepareMethod', \Joomla\Event\Priority::HIGH], 
        'onContentAfterTitle' => ['myContentAfterTitleMethod', \Joomla\Event\Priority::MIN], 
    ];
}
```
See the other values available in libraries/vendor/joomla/event/src/Priority.php. Use with caution though, as this will override any priority which the site administrator may want to set through ordering the plugins.

### Stop Propagation
To stop the propagation of an event to other plugins you can call
```php
$event->stopPropagation();
```
