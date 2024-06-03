---
sidebar_position: 2
---

# New deprecations

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

# Class deprecations

Planned to be removed in Joomla! 7.0.

### getData() method in ArchiveModel will be removed 

PR: https://github.com/joomla/joomla-cms/pull/43354
File: /components/com_content/src/Model/ArchiveModel.php
Description: The `getData()` method in the `ArchiveModel.php` will be removed in 7.0. Use `getItems()` instead.
