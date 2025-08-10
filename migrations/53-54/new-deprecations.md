---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  This version of Joomla has not yet been released, so this page is subject to change at any time.
  Deprecations added up to and including version 5.4.0-alpha3 are listed below.
:::

All the new deprecations you should be aware of — and what you should use instead.

## Class Deprecations

Planned to be removed in Joomla! 7.0.

### Deprecation of UCM System

In Joomla 3.2, the Unified Content Model (UCM) was introduced, which was supposed to be a universal system for all content in Joomla. The concept turned out to be not viable and the remnants of this have now been deprecated for removal in Joomla 7.0. The following classes have been deprecated without replacement:

- `Joomla\CMS\Table\Ucm`
- `Joomla\CMS\UCM\UCM`
- `Joomla\CMS\UCM\UCMBase`
- `Joomla\CMS\UCM\UCMContent`
- `Joomla\CMS\UCM\UCMType`

Related PR: [44910](https://github.com/joomla/joomla-cms/pull/44910) – Deprecating UCM code

### Random Image Module

[45648](https://github.com/joomla/joomla-cms/pull/45648) – Convert mod_random_image to service provider

- ❌ Avoid using the `getRandomImage()` static method.
  - ✅ Instead use the non-static `getImage()` method.
- ❌ Avoid using the `getImages()` static method.
  - ✅ Instead use the non-static `getImagesFromFolder()` method.
- ❌ Avoid using the `getFolder()` static method.
  - ✅ Instead use the non-static `getSanitizedFolder()` method.

### Deprecation of `registerListeners()`
[43395](https://github.com/joomla/joomla-cms/pull/43395) – CMSPlugin: deprecation for registerListeners

- ❌ `registerListeners()` is deprecated in both `Joomla\CMS\Extension\PluginInterface` and `Joomla\CMS\Plugin\CMSPlugin`.
  - ✅ Instead, implement the `SubscriberInterface`. The method is no longer required in this case.

### Support for the deprecated event API was extended from Joomla 6 to Joomla 7.

[45818](https://github.com/joomla/joomla-cms/pull/45818): Support for the deprecated event API was extended from Joomla 6 to Joomla 7.
Support for events without an event class will be stopped in Joomla 7 instead of Joomla 6.

### Support for the deprecated Editor and Captcha APIs was extended from Joomla 6 to Joomla 7.
[45819](https://github.com/joomla/joomla-cms/pull/45819): Support for the deprecated Editor and Captcha APIs was extended from Joomla 6 to Joomla 7.
Example implementations using the new APIs:
 - [Editors Plugin](/docs/building-extensions/plugins/plugin-examples/editors-plugin/)
 - [Editors Buttons (XTD) Plugin](/docs/building-extensions/plugins/plugin-examples/editors-xtd-plugin/)
 - [Captcha Plugin](/docs/building-extensions/plugins/plugin-examples/captcha-plugin/)
### Deprecation of `$_db`, `getDbo()`, and `setDbo()`
[45165](https://github.com/joomla/joomla-cms/pull/45165) – Replace table _db with DatabaseAwareTrait

- ❌ Do not access the `Joomla\CMS\Table\Table::_db` property directly — it will be removed in the future.
- ❌ Avoid using the `getDbo()` and `setDbo()` methods — they will also be removed.
  - ✅ Use `getDatabase()` and `setDatabase()` instead.
  Sample:
    ```php
    $db = $this->getDatabase();
    $this->setDatabase($db);
    ```

### Deprecation of `$app` Property in Fields Plugin

File: administrator/components/com_fields/src/Plugin/FieldsPlugin.php
Replacement: The `$this->app` property is deprecated in the fields plugins. Instead, use `$this->getApplication()` when the plugin is converted to service providers.

## Language String Deprecation

Planned to be removed in Joomla! 6.0 are the language keys:
* [45564](https://github.com/joomla/joomla-cms/pull/45564) – Deprecate language string
  * ❌ Avoid using the `COM_JOOMLAUPDATE_VIEW_DEFAULT_UPDATES_INFO_TESTING` language key.
* [45725](https://github.com/joomla/joomla-cms/pull/45725) – Deprecate language string
  * ❌ Avoid using the `COM_FINDER_CONFIG_HILIGHT_CONTENT_SEARCH_TERMS_LABEL` language key.
    * ✅ Use `COM_FINDER_CONFIG_HIGHLIGHT_CONTENT_SEARCH_TERMS_LABEL` instead.
* [45727](https://github.com/joomla/joomla-cms/pull/45727) – Deprecate language string Mis_typed
  * ❌ Avoid using the `JERROR_LAYOUT_MIS_TYPED_ADDRESS` language key.
    * ✅ Use `JERROR_LAYOUT_MISTYPED_ADDRESS` instead.
* [45706](https://github.com/joomla/joomla-cms/pull/45706) – configurated
  * ❌ Avoid using the `PLG_SYSTEM_SCHEMAORG_FIELD_SCHEMA_DESCRIPTION_NOT_CONFIGURATED` language key.
    * ✅ Use `PLG_SYSTEM_SCHEMAORG_FIELD_SCHEMA_DESCRIPTION_NOT_CONFIGURED` instead.
  * ❌ Avoid using the `PLG_SYSTEM_SCHEMAORG_FIELD_SCHEMA_DESCRIPTION_NOT_CONFIGURATED_ADMIN` language key.
    * ✅ Use `PLG_SYSTEM_SCHEMAORG_FIELD_SCHEMA_DESCRIPTION_NOT_CONFIGURED_ADMIN` instead.
