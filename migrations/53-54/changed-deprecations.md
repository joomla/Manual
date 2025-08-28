---
sidebar_position: 3
---

Changed Deprecations
====================

:::tip[Developer Note]
  This version of Joomla has not yet been released, so this page is subject to change at any time.
  Deprecations changed up to and including version 5.4.0-beta1 are listed below.
:::

## Class Deprecations

All these deprecations already existed, but the Joomla version in which they take effect has changed
from Joomla! 6.0 to 7.0. They are now planned to be removed in Joomla! 7.0.
For new introduced deprecations see the [New Deprecations](../new-deprecations) page.

### Event API

[45818](https://github.com/joomla/joomla-cms/pull/45818): Support for the deprecated event API was extended from Joomla 6 to Joomla 7.
Support for events without an event class will be stopped in Joomla 7 instead of Joomla 6.

### Editor and Captcha APIs

[45819](https://github.com/joomla/joomla-cms/pull/45819): Support for the deprecated Editor and Captcha APIs was extended from Joomla 6 to Joomla 7.
Example implementations using the new APIs:
 - [Editors Plugin](/docs/building-extensions/plugins/plugin-examples/editors-plugin)
 - [Editors Buttons (XTD) Plugin](/docs/building-extensions/plugins/plugin-examples/editors-xtd-plugin)
 - [Captcha Plugin](/docs/building-extensions/plugins/plugin-examples/captcha-plugin)

### `register` Method of the `JLoader` Class

[45878](https://github.com/joomla/joomla-cms/pull/45878): Support for the deprecated `JLoader::register()` method was extended from Joomla 6 to Joomla 7.
The `JLoader::register()` method will be removed in Joomla 7 instead of Joomla 6.
