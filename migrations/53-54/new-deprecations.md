---
sidebar_position: 2
---

# New deprecations

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

## Plugin deprecations

### CMSPlugin: deprecation for registerListeners

* [43395](https://github.com/joomla/joomla-cms/pull/43395) The `registerListeners()`method is now deprecated
  in the `CMSPlugin` class and the `PluginInterface` interface.
  This method is no longer required when a plugin implements the **`SubscriberInterface`**.

## Forward compatibility

### Replace table _db with DatabaseAwareTrait 

* [45165](https://github.com/joomla/joomla-cms/pull/45165) Introduces **`setDatabase()`** and **`getDatabase()`**
  in a backward compatibility (B/C) way, in case the `_db` variable and the `setDbo()` and `getDbo()` methods
  are removed in the future.
