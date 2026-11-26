---
sidebar_position: 1
---

New Features
============

:::tip[Developer Note]
Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

## New exceptions for the Table and Model layers

Joomla 6.3 introduces a set of typed exceptions for the Table layer and a new exception for batch operations in the Model layer.
They prepare the move away from the legacy `setError()`/`getError()` error handling towards exceptions.
Extension developers can already catch these exceptions today, so their code keeps working once core starts throwing them.

- **PR**: [#48095](https://github.com/joomla/joomla-cms/pull/48095)

### Table exceptions

All Table exceptions live in the `Joomla\CMS\Table\Exception` namespace and implement the new `TableExceptionInterface`.
This lets you catch every failure from the Table layer with a single `catch` block.

| Class | Extends | Meaning |
|-------|---------|---------|
| `ValidationException` | `\RuntimeException` | A record failed validation, e.g. a missing required field or a malformed value, as previously detected by `Table::check()`. |
| `DuplicateEntryException` | `ValidationException` | A unique-key violation, e.g. a duplicate alias, name or username. |
| `RecordNotFoundException` | `\RuntimeException` | A record could not be loaded by its primary key. |
| `InvalidHierarchyException` | `\LogicException` | A violation of a nested-set or parent-child rule, e.g. moving a node to be a child of itself. This indicates a programming error, not a problem with user input. |
| `WorkflowStateException` | `\RuntimeException` | An invalid workflow or publish-state transition, e.g. trying to disable a default workflow stage. |

Every Table exception takes the `Table` object it relates to as its first constructor parameter.
You can read it back with `getTable()`, which is declared on `TableExceptionInterface`:

```php
use Joomla\CMS\Table\Exception\DuplicateEntryException;
use Joomla\CMS\Table\Exception\RecordNotFoundException;
use Joomla\CMS\Table\Exception\ValidationException;

// Throwing from inside a Table class
throw new RecordNotFoundException($this, 'Record not found');
throw new ValidationException($this, 'The record is invalid', ['title' => 'Please enter a title']);
throw new DuplicateEntryException($this, 'Another article uses this alias', 'alias');
```

`ValidationException` also carries a list of validation messages, keyed by field name where known, which you can read with `getFieldErrors()`.
`DuplicateEntryException` additionally has `getField()`, which returns the name of the field holding the duplicate value.
Because `DuplicateEntryException` extends `ValidationException`, catching `ValidationException` also catches duplicate entries.

```php
use Joomla\CMS\Table\Exception\DuplicateEntryException;
use Joomla\CMS\Table\Exception\TableExceptionInterface;
use Joomla\CMS\Table\Exception\ValidationException;

try {
    $table->store();
} catch (DuplicateEntryException $e) {
    // e.g. 'alias'
    $field = $e->getField();
} catch (ValidationException $e) {
    foreach ($e->getFieldErrors() as $field => $message) {
        // ...
    }
} catch (TableExceptionInterface $e) {
    // Any other failure from the Table layer
    $failedTable = $e->getTable();
}
```

### Model exceptions

The new `Joomla\CMS\MVC\Model\Exception\BatchOperationException` is used when a batch operation cannot be carried out, e.g. because no items were selected or not enough information was supplied.
It extends `\RuntimeException` and implements the existing `ModelExceptionInterface`.

### `setError()` rethrows exceptions

When exceptions are enabled with `setUseExceptions(true)`, `LegacyErrorHandlingTrait::setError()` now also accepts a `\Throwable`.
The exception is rethrown unchanged, so its type is kept.
String messages are still turned into a generic `\Exception` with code 500, as before.
When exceptions are not enabled, the `\Throwable` is stored like any other error and can be read back with `getError()`.

```php
$this->setUseExceptions(true);

// Throws the RecordNotFoundException itself, not a generic \Exception
$this->setError(new RecordNotFoundException($table, 'Record not found'));
```
