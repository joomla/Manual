---
title: Advanced Features
sidebar_position: 4
---

Plugin Advanced Features
========================

## Priority

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

See the other values available in libraries/vendor/joomla/event/src/Priority.php. 
Use with caution though, as this will override any priority which the site administrator may want to set through ordering the plugins.

## Stop Propagation

To stop the propagation of an event to other plugins you can call

```php
$event->stopPropagation();
```
