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
Please check the [Backward Compatibility Plugin](../44-50/compat-plugin.md) for more details.

For more detail check [Compatibility Plugin Joomla! 5.0](../44-50/compat-plugin).

## Joomla 6 Compatibility Plugin

In Joomla! 6.0 the Compatibility Plugin introduced in Joomla! 5.0 will be replaced by a new plugin
called "Behaviour - Backward Compatibility 6".

The plugin is implemented as "Behaviour" plugin type to guarantee that is loaded before any other plugin is loaded.


### CMS BaseApplication and CLI classes

- PR's:
  - https://github.com/joomla/joomla-cms/pull/42884
  - https://github.com/joomla/joomla-cms/pull/44926
- Description: Any reference to the class `\Joomla\CMS\Application\BaseApplication` and `\Joomla\CMS\Application\CliApplication` with the respective CLI input classes should be replaced with the namespace `\Joomla\Application`. Cli apps should be replaced by console plugins.

### JPATH_PLATFORM constant

- PR: https://github.com/joomla/joomla-cms/pull/44638
- File: All bootstrapping files
- Description: The `JPATH_PLATFORM` is an old constant and should not be used if the Joomla core got correctly bootstrapped. Change your checks to `_JEXEC`
```php
// Old:
\defined('JPATH_PLATFORM') or die;

// New:
\defined('_JEXEC') or die;
```
