---
sidebar_position: 4
---

# Error handling in Joomla 6.0 and onwards

Joomla 1.0 originally supported PHP4, which didn't have exceptions yet. That is why Joomla introduced its own error 
handling with methods like `$this->setError()` and `$this->getError()`. Unfortunately it has been very hard to break 
this old habbit and so Joomla 5 still has this bad behavior, but at least all those `getError()/setError()` have been
 combined into the `LegacyErrorHandlingTrait`.

For a transition away from this custom error handling to a normal exceptions-based solution, the `LegacyErrorHandlingTrait`
was extended in **Joomla 5.4** with the `shouldUseExceptions()` flag. This allows to check if exceptions should be thrown or
the legacy error handling system should be used. Joomla will convert all calls to `LegacyErrorHandlingTrait::setError()`
to check this flag and if the flag is set, will throw an exception. If it is not set, it will still call the legacy
`setError()`. This will allow to gradually convert all code from the old system to the standard exception handling.

You can set the flag by calling `setUseExceptions(true)` on the object which should use the new system. To query the flag
call `shouldUseExceptions()`. The legacy code when encountering an error looked like this:
```php
if ($errorConditionEvaluatingToFalse) {
    $this->setError($table->getError());

    return false;
}
```
The new code in the core would look similar to this:
```php
if ($errorConditionEvaluatingToFalse) {
    if ($this->shouldUseExceptions()) {
        throw new \Exception($table->getError());
    }

    $this->setError($table->getError());

    return false;
}
```

**To ease the transition to exceptions, `setError()` will also throw the error as exception when the flag is set.** 
Ideally, you should use error-specific exceptions, which is why the core will use this more complex solution. `setError()`
just throws a generic `Exception` exception.

If your object instantiates other objects which also use the `LegacyErrorHandlingTrait`, you should pass the current 
status of the `shouldUseExceptions()` flag to the new object as well.

## How will the core drop the `LegacyErrorHandlingTrait`?
The plan is to implement proper exceptions everywhere in the core code during the time of Joomla 6.x in parallel with the
legacy system. In Joomla 7.0, the core will remove calls to `setError()` and the checks for `shouldUseExceptions()`.
At that point in time, the Joomla core would be entirely transitioned to exceptions. It is still up for discussion if
the calls to `shouldUseExceptions()` should then also default to `true` instead of `false` like right now. The trait itself 
is planned to be dropped in Joomla 8.0.

## What should third party developers do?
The above examples from the core look quite complex and cumbersome. Fortunately third party developers can go a much
simpler route by simply switching to exceptions right away. Remember that the core needs to support both code which does
and doesn't supports exceptions at the same time. As a third party developer, you can simply switch all of your code to 
exceptions at once and only have to make sure that the core classes, which you are extending from, also throw exceptions. 
For this, you can simply call `$this->setUseExceptions(true);` in the constructor of your object to directly force
exceptions.

This will allow you to do one refactoring of your code to use exceptions anywhere in the release cycle of Joomla 6 and
 you only have to touch this somewhere before Joomla 8 to remove the `$this->setUseExceptions(true);` again.

## Example of new error handling in views
This is the current error handling in views on the example of the articles view in the backend of com_content:
```php
    $model = $this->getModel();
    $this->items         = $model->getItems();
    $this->pagination    = $model->getPagination();
    $this->state         = $model->getState();
    $this->filterForm    = $model->getFilterForm();
    $this->activeFilters = $model->getActiveFilters();
    $this->vote          = PluginHelper::isEnabled('content', 'vote');
    $this->hits          = ComponentHelper::getParams('com_content')->get('record_hits', 1) == 1;

    if (!\count($this->items) && $this->isEmptyState = $model->getIsEmptyState()) {
        $this->setLayout('emptystate');
    }

    if (ComponentHelper::getParams('com_content')->get('workflow_enabled')) {
        PluginHelper::importPlugin('workflow');

        $this->transitions = $model->getTransitions();
    }

    // Check for errors.
    if (\count($errors = $model->getErrors()) || $this->transitions === false) {
        throw new GenericDataException(implode("\n", $errors), 500);
    }
```
And this is the new solution based on exceptions in Joomla 6.0 and onwards:
```php
    $model = $this->getModel();
    $model->setUseExceptions(true);

    try {
        $this->items         = $model->getItems();
        $this->pagination    = $model->getPagination();
        $this->state         = $model->getState();
        $this->filterForm    = $model->getFilterForm();
        $this->activeFilters = $model->getActiveFilters();
        $this->vote          = PluginHelper::isEnabled('content', 'vote');
        $this->hits          = ComponentHelper::getParams('com_content')->get('record_hits', 1) == 1;

        if (!\count($this->items) && $this->isEmptyState = $model->getIsEmptyState()) {
            $this->setLayout('emptystate');
        }

        if (ComponentHelper::getParams('com_content')->get('workflow_enabled')) {
            PluginHelper::importPlugin('workflow');
            $this->transitions = $model->getTransitions();
        }
    } catch (\Exception $e) {
        throw new GenericDataException($e->getMessage(), 500, $e);
    }
```
