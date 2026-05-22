---
sidebar_position: 2
---

New Deprecations
================

All the new deprecations that should be aware of and what you should now be using instead.

### libraries/src/Filesystem/Path.php:clean()
- PR: https://github.com/joomla/joomla-cms/pull/38511
- Description: Null should not be passed to the clean function, only strings are allowed. This function will throw an exception in version 6.
