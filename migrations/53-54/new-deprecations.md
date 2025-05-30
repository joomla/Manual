---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations you should be aware of — and what you should use instead.

## Deprecation of `registerListeners()`
[43395](https://github.com/joomla/joomla-cms/pull/43395) – CMSPlugin: deprecation for registerListeners

- ❌ `registerListeners()` is deprecated in both `Joomla\CMS\Extension\PluginInterface` and `Joomla\CMS\Plugin\CMSPlugin`.
- ✅ Instead, implement the `SubscriberInterface`. The method is no longer required in this case.

## Deprecation of `$_db`, `getDbo()`, and `setDbo()`
[45165](https://github.com/joomla/joomla-cms/pull/45165) – Replace table _db with DatabaseAwareTrait

- ❌ Do not access the `Joomla\CMS\Table\Table::_db` property directly — it will be removed in the future.
- ❌ Avoid using the `getDbo()` and `setDbo()` methods — they will also be removed.
- ✅ Use **`getDatabase()`** and **`setDatabase()`** instead.
  Sample:
  ```php
  $db = $this->getDatabase();
  $this->setDatabase($db);
  ```
