---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations you should be aware of — and what you should use instead.

## Class deprecations

Planned to be removed in Joomla! 7.0.

### Deprecation of UCM system
In Joomla 3.2, the `Unified Content Model` was introduced, which was supposed to be a universal system for all content in Joomla. The concept turned out to be not viable and the remnants of this have now been deprecated for removal in Joomla 7.0. The following classes have been deprecated without replacement:

- `Joomla\CMS\Table\Ucm`
- `Joomla\CMS\UCM\UCM`
- `Joomla\CMS\UCM\UCMBase`
- `Joomla\CMS\UCM\UCMContent`
- `Joomla\CMS\UCM\UCMType`

Related PR: https://github.com/joomla/joomla-cms/pull/44910

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

## Language String Deprecation

Planned to be removed in Joomla! 6.0 is the language string:
* [45564](https://github.com/joomla/joomla-cms/pull/45564) – Deprecate language string
  * ❌ `COM_JOOMLAUPDATE_VIEW_DEFAULT_UPDATES_INFO_TESTING`
