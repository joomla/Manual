---
sidebar_position: 5
---

Compatibility Plugins
=====================

## Joomla 6 Compatibility Plugin

The **‘Behaviour – Backward Compatibility 6’** plugin is essential for the migration from Joomla! 5.4 to 6.x.

In Joomla 5.4, this plugin is installed and enabled by default, but it does not perform any actions.
Its presence ensures that when the site is upgraded to Joomla 6, the updated code can run immediately,
and any third-party extensions requiring the plugin to be enabled in Joomla 6 will not cause the update to fail.

As a `behaviour`-type plugin, it loads before any other plugin —
a critical requirement for ensuring backward compatibility.

For upgrades from Joomla! 5.4 to Joomla! 6.x, it is mandatory that this plugin is both installed and enabled.
To review which backward compatibility cases have been removed, see
[Removed and Backward Incompatibility](removed-backward-incompatibility).

:::tip NEW INSTALLATIONS
For new Joomla! 6.0 installations, the **‘Behaviour – Backward Compatibility 6’**
plugin is installed but disabled by default.
:::

Related PRs are:
* [45336](https://github.com/joomla/joomla-cms/pull/45336)
    Introduce Joomla 6.0 compatibility plugin
* [45371](https://github.com/joomla/joomla-cms/pull/45371)
    Add compat6 behaviour plugin to 5.4 so it is available and enabled when updating to 6.x.
* [45480](https://github.com/joomla/joomla-cms/pull/45480)
    Introduce Joomla 6.0 compatibility plugin
* [45493](https://github.com/joomla/joomla-cms/pull/45493)
    Add pre-update checks for backward compatibility plugins for update to Joomla 6
* [45525](https://github.com/joomla/joomla-cms/pull/45525)
    Add compat6 behaviour plugin to 5.4 with enabled options
* [45973](https://github.com/joomla/joomla-cms/pull/45973)
    Don't insert duplicate records in update SQL scripts when they are executed multiple times

:::warning DEVELOPER NOTE
Avoid creating your own plugin within the *Behaviour* group, as this group may be removed in a future release.
:::

## Joomla 5 Compatibility Plugin

Introduced in Joomla! 5.0, the **‘Behaviour – Backward Compatibility’**
plugin improves compatibility between Joomla 5 and 4.

When upgrading from Joomla! 5.4 to Joomla! 6.x, this plugin must be disabled.
If a site crashes during the upgrade process, it can usually be recovered by temporarily re-enabling
this plugin in Joomla 5.4. However, the underlying issues causing the errors must then be identified and
resolved before proceeding with the upgrade.
