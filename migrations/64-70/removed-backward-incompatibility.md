---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removal of `setDbo()`/`_db` from `BaseDatabaseModel`

- PR: https://github.com/joomla/joomla-cms/pull/47441
- Description: The models based on `BaseDatabaseModel` are implementing the `DatabaseAwareTrait`, providing the methods `getDatabase()` and `setDatabase()`. 
  The legacy methods `setDbo()` and the attribute `_db` have thus been removed from the model class in 7.0. The widely used `getDbo()` method is still kept around until 8.0 to ease the transition, but you should transition to `getDatabase()` there as well.
