---
sidebar_position: 2
---

#### Model states are not anymore of type CMSObject

File: libraries/src/MVC/Model/StateBehaviorTrait.php
Replacement: Direct property access to the state object of the model should be replaced with a get/set function call
Example:
```php
$data = $model->getState()->get('test');
```
