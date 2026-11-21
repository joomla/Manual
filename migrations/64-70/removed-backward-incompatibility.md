---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removal of `LegacyPropertyManagementTrait` trait and `CMSObject`

- PR: https://github.com/joomla/joomla-cms/pull/47379
- PR: https://github.com/joomla/joomla-cms/pull/44906
- PR: https://github.com/joomla/joomla-cms/pull/44909
- PR: https://github.com/joomla/joomla-cms/pull/44907
- PR: https://github.com/joomla/joomla-cms/pull/44904
- PR: https://github.com/joomla/joomla-cms/pull/44897
- Description: The `LegacyPropertyManagementTrait` provided generic getters and setters, which unfortunately break the PHP permission system. It was possible to read and write into objects which used this trait from the outside even though the attributes of the object were actually protected. It also prevented proper static code analysis and thus code hinting by your IDE, because there simply wasn't really a defined return type for these getters or accepted inputs for the setters.
  
  At the same time, the `CMSObject` class was tightly linked to this trait and thus was removed at the same time.
  
  If you are using `set()`, `get()` or `getProperties()` to access an object, you will have to switch away from these methods. Generally you should either access the attribute directly or use the specific setters and getters instead.
