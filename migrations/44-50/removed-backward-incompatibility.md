---
sidebar_position: 3
---

Removed and backward incompatibility
===============
All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

### PSR-3 upgraded to version 3

The PSR-3 (Logging) is upgraded to [version 3](https://github.com/php-fig/log/tree/3.0.0) of the specification.

Most critically, the signature of the `\Psr\Log\LoggerInterface` methods has changed. The `$message` argument is now strongly typed as `string|\Stringable`. Any logger implementation you use **must** be compatible with this new signature. This is relevant to you if you implement your own logger, or if you are using a third party logger such as Monolog, in your extension.

If you are using your own logger, you want to preserve compatibility with Joomla 4 and 5 in the same extension package, and you do not mind losing PSR-3 compatibility you can include a copy of PSR-3 in your extension _as long as it's under your extension's namespace_. For example, instead of using `\Psr\Log\LoggerInterface` you could use `\Acme\Component\Example\Administrator\Log\LoggerInterface`. Note that you can use [PHP Scoper](https://github.com/humbug/php-scoper) to easily migrate your dependencies under your own namespace.

If you only need to maintain compatibilty with PSR-3 to use an logger external to your component, such as Joomla's logger, you can still typehint against `\Psr\Log\LoggerInterface`. Please note that the external logger you are using must be compatible with PSR-3 version 1 on Joomla 4 and PSR-3 version 3 on Joomla 5. If you are providing a third party, external logger yourself you may need to include two versions of the logger with your extension and only load the correct one for each Joomla version.

### Framework Update

Joomla! 5.0 uses the Joomla! Framework 3.0, this might have it own breaking changes:

- Dependency Container:  
  PR: https://github.com/joomla-framework/di/pull/48
  Description: It is possible to override services in child containers. This allows to override protected services, like the form factory one, in the containers of an extension when they are booted.


### Database must be injected in constructor model
- PR: https://github.com/joomla/joomla-cms/pull/38511
- Description: The database instance in the model should be injected through the `$this->setDatabase()` or the deprecated function `$this->setDbo()`  configuration in the constructor to make it available in the base class. Like that it is ensured that calls to `$this->getDatabase()` and the deprecated function `$this->getDbo()` will point to the same instance.

```php
class MyModel extends ListModel {
  public function __construct(..) {
    parent::__construct(...);
    $this->setDatabase(MyHelper::getGridDB());
  }
}
```

### CSS removals
The CSS class ".ie11" was removed [via PR #39018](https://github.com/joomla/joomla-cms/pull/39018)


### Return Types
All return types have been updated to match the PHP 8.1 return type signatures. This addresses any class utilising the ArrayAccess, Datetime or the JsonSerializable interfaces. If you extend from any of the affected classes and require compatibility with both Joomla 4.x and 5.x you should add the `#[\ReturnTypeWillChange]` annotation to your code.

#### administrator/components/com_users/src/DataShape/DataShapeObject.php

```php
public function __isset(...)      --> public function __isset(...): bool
public function offsetExists(...) --> public function offsetExists(...): bool
public function offsetGet(...)    --> public function offsetGet(...): mixed
public function offsetSet(...)    --> public function offsetSet(...): void
public function offsetUnset(...)  --> public function offsetUnset(...): void
```

#### libraries/src/Date/Date.php

```php
public function format(...)      --> public function format(...): string
public function setTimezone(...) --> public function setTimezone(...): \Datetime
```

#### libraries/src/Document/JsonapiDocument.php

```php
public function jsonSerialize(...) --> public function jsonSerialize(...): mixed
```

#### libraries/src/Feed/Feed.php

```php
public function count(...)        --> public function count(...): int
public function offsetExists(...) --> public function offsetExists(...): bool
public function offsetGet(...)    --> public function offsetGet(...): mixed
public function offsetSet(...)    --> public function offsetSet(...): void
public function offsetUnset(...)  --> public function offsetUnset(...): void
```

#### libraries/src/Language/Language.php

\Joomla\CMS\Language\Language extends now from \Joomla\Language\Language

Duplicated code which is extended from the framework has been removed

```php
public function debugFile(...) --> public function debugFile(string $filename): int
```

### Menus controller resync function got removed
- PR: https://github.com/joomla/joomla-cms/pull/40336
- Description: The resync function in the administrator MenusController class is only used for the 1.5 to 1.6 upgrade routine.

### Demo task plugin got removed
- PR: https://github.com/joomla/joomla-cms/pull/40147
- Description: The demo task plugin got removed as it was intended for demonstration purposes only.

### User changes
- PR: https://github.com/joomla/joomla-cms/pull/41048
- Description: Removed message "Cannot load user X", for removed users.  
  
### Plugin constructor doesn't contain the assignment operator
- PR: https://github.com/joomla/joomla-cms/pull/40746
- Description: The constructor of the `CMSPlugin` class doesn't contain now the extra assign operator for the dispatcher as objects are always passed by reference. So constructors in plugins should now be written in the following way:  
```php
public function __construct(DispatcherInterface $dispatcher, array $config, more arguments)
{
	parent::__construct($dispatcher, $config);

	// Assign the extra arguments to internal variables
}
```
