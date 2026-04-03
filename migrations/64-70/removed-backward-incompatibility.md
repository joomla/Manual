---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removal of the custom DB object from `Table` Class
The `\Joomla\CMS\Table\Table` class has custom methods to access the database object, namely `getDbo()`, `setDbo()`, `getDatabase()` and `setDatabase()`. Internally it also has `$this->_db` to save the database object. In Joomla 7.0, the attribute and the custom methods were removed in favour of the `DatabaseAwareTrait`, which provides the `getDatabase()` and `setDatabase()` for all relevant core classes. Only `getDbo()` was kept to soften the transition for third party code. Please migrate all calls for `getDbo()` in your code to use `getDatabase()` instead. The legacy `getDbo()` method will be removed in Joomla 8.0.

PR: https://github.com/joomla/joomla-cms/pull/47440
