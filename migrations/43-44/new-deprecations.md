---
sidebar_position: 2
---

New Deprecations
================

All the new deprecations that should be aware of and what you should now be using instead.

## Workflow Requires Database and Application

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

## `countMenuChildren` in HtmlDocument is Deprecated

File: libraries/src/Document/HtmlDocument.php
Replacement: Load the active menu item directly from the application and count the children with the php `count` function.
Example:
```php
$app->getMenu()->getActive() ? count($app->getMenu()->getActive()->getChildren()) : 0;
```

## `com_search`-specific Methods in Language are Deprecated

File: libraries/src/Language/Language.php
Replacement: com_search will not be supported in Joomla 6.0 anymore and there is no replacement for these methods.

## `JPATH_PLATFORM` Variable is Deprecated

File: libraries/bootstrap.php
Replacement: The variable `JPATH_PLATFORM` should not be used anymore to check if the CMS is correctly initialized, use `_JEXEC` instead.
Example:
```php
defined('_JEXEC') or die;
```

## The Function `emailToPunycode` in the PunycodeHelper Class Is Not Accepting Null Values

File: libraries/src/String/PunycodeHelper.php
Replacement: The function throws a deprecated message when a `NULL` email address is passed to the function.

#### The `$aid` Property of the User Class Is Deprecated

File: libraries/src/User/User.php
Replacement: The $aid property will be removed with no replacement as the user roles are defined through an access level.
