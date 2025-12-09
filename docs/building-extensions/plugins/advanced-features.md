---
title: Advanced Features
sidebar_position: 4
---

Plugin Advanced Features
========================

## Priority of Events

Often there will be several plugins listening for the same event. 

The order in which these plugins' handler functions are called is by default controlled by the order the plugins are read in from the database,
and this is determined by the order of the plugins set by the administrator in the Manage / Plugins page on the back-end.

You can change the priority of your plugin's handler function on a per-event basis. 
To do this, specify the priority in your response to `getSubscribedEvents` an array of `[<handler function>, <priority>]`

```php
public static function getSubscribedEvents(): array
{
    return [
        'onContentPrepare' => ['myContentPrepareMethod', \Joomla\Event\Priority::HIGH], 
        'onContentAfterTitle' => ['myContentAfterTitleMethod', \Joomla\Event\Priority::MIN], 
    ];
}
```

See the other values available in libraries/vendor/joomla/event/src/Priority.php. 
Use with caution though, as this will override any priority which the site administrator may want to set through ordering the plugins.

## Stop Event Propagation

To stop the propagation of an event to other plugins you can call

```php
$event->stopPropagation();
```
