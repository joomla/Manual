---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removal of CMS HTTP package

- PR: https://github.com/joomla/joomla-cms/pull/47503
- Files: libraries/src/HTTP/\*
- Description: The CMS HTTP package is a duplicate of the framework HTTP package and was deprecated in Joomla 5.4 to be removed in 7.0. Use the framework package directly. (`\Joomla\HTTP` instead of `\Joomla\CMS\HTTP`)

