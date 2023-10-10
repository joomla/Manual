---
sidebar_position: 3
---

Removed and backward incompatibility
===============
All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

### Events: Using getArgument and getArguments as intended

It is not recommended to use `$event->getArgument('0')` for events that does not have an event class.
In future such event will receive own class and named arguments, and this code will not work.

As long as the event is not converted to it's own class or you need to support both versions please use the following example. All other ways are not supported. 

```php
[$arg1, $arg2] = array_values($event->getArguments());
```

As example for Joomla 4 and preparation for Joomla 5 you can use code such as

```php
public function onBeforeCooking(EventInterface $event)
{
  if ($event instanceof BeforeCookingEvent) {
    $recipe = $event->getRecipe();
    $plate  = $event->getPlate();
  } else {
    [$recipe, $plate] = array_values($event->getArguments());
  }
}
```

### Events: Setting a result of immutable event is deprecated

Setting the result of Immutable event `$event['result'][] = $result` is deprecated. 
Only an event which implement `ResultAwareInterface` can receive a result through `$event->addResult($result)`. 

### Event classes: Event pre-processing methods should now use onSet/onGet prefixes instead of set/get

- PR: https://github.com/joomla/joomla-cms/pull/41722
- Event classes that uses pre-processing method should now use `onSet/onGet` prefixes instead of `set/get`. Methods prefixed with `set/get` will continue to work until Joomla 6.

Example:
```php
// Old
protected function setFoobar(Foo $value): Foo
{
  return $value;
}

// New:
protected function onSetFoobar(Foo $value): Foo
{
  return $value;
}
```


