---
sidebar_position: 2
---

New deprecations
===============
All the new deprecations that should be aware of and what you should now be using instead.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

#### Workflow rquires database and application

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

#### JPATH_PLATFORM variable is deprecated

File: libraries/bootstrap.php
Replacement: The variable `JPATH_PLATFORM` should not be used anymore to check if the CMS is correctly initialized, use `_JEXEC` instead.
Example:
```php
defined('_JEXEC') or die;
```
