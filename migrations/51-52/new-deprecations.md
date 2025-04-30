---
sidebar_position: 2
---

New deprecations
================

All the new deprecations that should be aware of and what you should now be using instead.

## Class deprecations

Planned to be removed in Joomla! 7.0.

### WebApplication::$JComponentTitle

`JComponentTitle` will be removed in 7.0 and is not used in a long time. Use `Docment::getTitle()`
Example: `\Joomla\CMS\Factory::getApplication()->getDocument()->getTitle();`
Related PR: https://github.com/joomla/joomla-cms/pull/43304

### getData() method in ArchiveModel will be removed 

PR: https://github.com/joomla/joomla-cms/pull/43354
File: /components/com_content/src/Model/ArchiveModel.php
Description: The `getData()` method in the `ArchiveModel.php` will be removed in 7.0. Use `getItems()` instead.

### RadiobasicField

PR: https://github.com/joomla/joomla-cms/pull/43860
Description: Based on the Issue #19299 and PR #19320 the radiobasic field is pretty useless and can be removed.
Decision in the maintainer meeting we deprecate the field in 5.x and move it to the b/c plugin in 6.0 and remove it in 7.0.
