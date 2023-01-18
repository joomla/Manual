---
sidebar_position: 2
---

New deprecations
===============
All the new deprecations that should be aware of and what you should now be using instead.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.
:::

#### Model states are not anymore of type CMSObject

File: libraries/src/MVC/Model/StateBehaviorTrait.php
Replacement: Direct property access to the state object of the model should be replaced with a get/set function call
Example:
```php
// Write to the state
$model->getState()->set('foo', 'bar);

// Access the state
$data = $model->getState()->get('foo');
```
