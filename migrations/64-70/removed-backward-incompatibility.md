---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removal of `Joomla\CMS\MVC\View\CanDo` class

- PR: https://github.com/joomla/joomla-cms/pull/47681
- Description: `Joomla\CMS\MVC\View\CanDo` was deprecated in 5.0 and to be removed in 7.0. Use the `Joomla\Registry\Registry` class directly instead.
