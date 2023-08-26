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

For such events should use legacy listener, or access to argument with:
```php
[$arg1, $arg2] = array_values($event->getArguments());
```
