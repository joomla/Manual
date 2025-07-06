---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

## Deprecation of `$app` Property in Fields Plugin

File: administrator/components/com_fields/src/Plugin/FieldsPlugin.php
Replacement: The `$this->app` property is deprecated in the fields plugins. Instead, use `$this->getApplication()` when the plugin is converted to service providers.
