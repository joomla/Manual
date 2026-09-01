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

## Joomla 7 Compatibility Plugin

In Joomla! 7.0 the Compatibility Plugin introduced in Joomla! 6.0 will be replaced by a new plugin
called "Behaviour - Backward Compatibility 7".

Despite the warning about the potential removal of the `behaviour` plugin type, this compatibility plugin still uses
this type to ensure it loads before any other plugin, as this is critical for backward compatibility functionality.

### Detailed documentation

The compatibility plugin does contain some deprecated code which is only loaded when the plugin is enabled. In the [removed backward incompatibility](removed-backward-incompatibility.md) guide is documented in detail, what is moved to the plugin.
