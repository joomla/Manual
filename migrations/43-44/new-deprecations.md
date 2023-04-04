---
sidebar_position: 2
---

New deprecations
===============
All the new deprecations that should be aware of and what you should now be using instead.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

#### Workflow requires database and application

File: libraries/src/Workflow/Workflow.php
Replacement: The application and database will be mandatory
Example:
```php
$workflow = new Workflow($extension, $app, $db);
```

File: libraries/src/MVC/Model/WorkflowBehaviorTrait.php
Replacement: The trait requires a getDatabase function which is provided by the Joomla\Database\DatabaseAwareTrait trait so it is recommended to use both traits together. If you are using the workflow trait in a model, then the database trait is already available.
Example:
```php
class Foo {
  use MVC/Model/WorkflowBehaviorTrait;
  use Joomla\Database\DatabaseAwareTrait;
}
```

#### ModuleHelper::moduleCache is deprecated

File: libraries/src/Helper/ModuleHelper.php
Replacement: The static `moduleCache` function in the `ModuleHelper` class is is deprecated. Instead of use `$this->loadFromCache()` in the module dispatcher class which is inherited from the `AbstractModuleDispatcher` class. The only difference is that the cache params should be passed as Registry and not plain object anymore.
