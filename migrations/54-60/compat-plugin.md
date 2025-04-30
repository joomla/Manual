---
sidebar_position: 4
---

# Compatibility Plugin

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

:::caution[Update Needed]
  No decision has made yet what's happening to this plugin in Joomla 6.0
:::

As part of Joomla! 5.0 a plugin was introduced which enhance backward compatibility between Joomla 5 and 4.
The plugin is implemented as "Behaviour" plugin type to guarantee that is loaded before any other plugin is loaded.
(Just a heads-up, don't create a plugin as behaviour plugin because it's possible that this group get removed at some point)

For more detail check [Compatibility Plugin Joomla! 5.0](https://manual.joomla.org/migrations/44-50/compat-plugin).

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
