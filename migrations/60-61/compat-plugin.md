---
sidebar_position: 4
---

Compatibility Plugin
====================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

:::warning[Developer Note]
  Heads-up, don't create a plugin as `behaviour` plugin because it's possible that this group get removed at some point.
:::

## Joomla 5 Compatibility Plugin

As part of Joomla! 5.0 a plugin was introduced which enhance backward compatibility between Joomla 5 and 4.
Please check the [Backward Compatibility Plugin](https://manual.joomla.org/migrations/44-50/compat-plugin.md) for more details.

For more detail check [Compatibility Plugin Joomla! 5.0](https://manual.joomla.org/migrations/44-50/compat-plugin).

## Joomla 6 Compatibility Plugin

In Joomla! 6.0 the Compatibility Plugin introduced in Joomla! 5.0 will be replaced by a new plugin
called "Behaviour - Backward Compatibility 6".

Despite the warning about the potential removal of the `behaviour` plugin type, this compatibility plugin still uses
this type to ensure it loads before any other plugin, as this is critical for backward compatibility functionality.

### Detailed documentation

:::warning[Reader Note]
  Please read the [Compatibility Plugin 6.0](../54-60/compat-plugin.md) section
:::
