---
sidebar_position: 4
---

Compatibility Plugins
=====================

## Joomla 6 Compatibility Plugin

New in Joomla 5.4 is the '**Behaviour - Backward Compatibility 6**' plugin.

In Joomla 5.4, the plugin does not perform any actions other than existing and being enabled.
This ensures that when the code is updated for Joomla 6, it can run immediately with the updated code,
and third-party extensions that require the plugin to be enabled in Joomla 6 will not cause the update to fail.

* [45371](https://github.com/joomla/joomla-cms/pull/45371) New 'Behaviour - Backward Compatibility 6' plugin added
  in preparation for the Joomla 6 update.
* [45525](https://github.com/joomla/joomla-cms/pull/45525) Making sure that the plugins'
  options are enabled on update to Joomla 6.

## Joomla 5 Compatibility Plugin

As part of Joomla! 5.0, the '**Behaviour - Backward Compatibility**' plugin was introduced to enhance backward compatibility between Joomla 5 and Joomla 4.
The plugin is implemented as *Behaviour* plugin type to ensure it is loaded before any other plugin.

> Just a heads-up – avoid creating your own plugin as a Behaviour plugin, as this group may be removed in a future release.

For more details, see [Compatibility Plugin Joomla! 5.0](https://manual.joomla.org/migrations/44-50/compat-plugin).

> Although it is recommended to disable the Joomla 5 'Behaviour - Backward Compatibility' plugin,
> __do not__ disable other Behaviour plugins such as 'Behaviour - Taggable' or 'Behaviour - Versionable',
> as you will silently lose functionality such as tagging or version history.
