---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

### `Joomla\CMS\Changelog\Changelog` has been changed significantly

- PR: https://github.com/joomla/joomla-cms/pull/44897
- Description: The `Changelog` class was entirely depending on the `LegacyPropertyManagementTrait` and its `->get()` method. This is problematic because the `->get()` method circumvents the complete access protection in PHP and the trait itself is deprecated. In Joomla 6.0 the properties of the class have been mostly changed to public and can be accessed directly and the trait has been removed.
