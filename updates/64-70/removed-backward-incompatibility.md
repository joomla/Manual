---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removed legacy OTP code from `UserModel` and `ProfileModel`
- PR: https://github.com/joomla/joomla-cms/pull/47457
- Description: With the introduction of multi-factor authentication in Joomla 4.2, several methods for the one-time-password feature were made obsolete and deprecated. They were not working since 4.2 anyway, but with 7.0 they have been removed entirely. The following methods in the administrator part of `com_users` were removed:
  - `UserModel::getOtpConfig()`
  - `UserModel::setOtpConfig()`
  - `UserModel::getOtpConfigEncryptionKey()`
  - `UserModel::getTwofactorform()`
  - `UserModel::generateOteps()`
  - `UserModel::isValidSecretKey()`
  - `UserModel::isValidOtep()`
  - `ProfileModel::getTwofactorform()`
  - `ProfileModel::getOtpConfig()`

## `ActionLogPlugin` db and app properties removed
- PR: https://github.com/joomla/joomla-cms/pull/47880
- File: administrator/components/com_actionlogs/src/Plugin/ActionLogPlugin.php
- Description: The `$app` and `$db` properties in the `ActionLogPlugin` got removed. Inject the database and application in the provider.php. For example you can use:
```php
// Old:
$this->app;
$this->db;

// New:
$this->getApplication();
$this->getDatabase();
```

## `LogcreatorField` class removed
- PR: https://github.com/joomla/joomla-cms/pull/47874
- File: administrator/components/com_actionlogs/src/Field/LogcreatorField.php
- Description: The `LogcreatorField` got removed as it is better to use the user field instead. For example you can use:
```xml
// Old in form XML file:
<field name="user" type="logcreator" label="COM_ACTIONLOGS_NAME" class="js-select-submit-on-change">
	<option value="">COM_ACTIONLOGS_SELECT_USER</option>
</field>

// New in form XML file:
<field name="user" type="user" label="COM_ACTIONLOGS_NAME" class="js-select-submit-on-change">
	<option value="">COM_ACTIONLOGS_SELECT_USER</option>
</field>
```

## The CSS custom property `--cassiopeia-link-color` removal
- PR: [https://github.com/joomla/joomla-cms/pull/47457](https://github.com/joomla/joomla-cms/pull/47883)
- Description: The CSS custom property `--cassiopeia-link-color` is not used and got removed.

## Removed legacy stubs for admin component helpers

- PR: https://github.com/joomla/joomla-cms/pull/45856
- Description: The non-namespaced helper classes in the `helpers/` folder of several administrator components were deprecated in 4.3 and only forwarded to their namespaced replacements. They have now been removed entirely. They are **not** registered in the `behaviour/compat6` plugin classmap, so referencing the old global class name results in a "class not found" fatal error. Replace any use of the old class with the namespaced class below (add the matching `use` statement); all public method signatures are unchanged. To fix any errors, make a search and replace to use the namespaced versions now, e.g.

```
// Find
BannersHelper

// Replace
\Joomla\Component\Banners\Administrator\Helper\BannersHelper
```

- The following classes were removed:
  - `BannersHelper` — use `\Joomla\Component\Banners\Administrator\Helper\BannersHelper` instead
  - `CategoriesHelper` — use `\Joomla\Component\Categories\Administrator\Helper\CategoriesHelper` instead
  - `ContactHelper` — use `\Joomla\Component\Contact\Administrator\Helper\ContactHelper` instead
  - `ContentHelper` — use `\Joomla\Component\Content\Administrator\Helper\ContentHelper` instead
  - `ContenthistoryHelper` — use `\Joomla\Component\Contenthistory\Administrator\Helper\ContenthistoryHelper` instead
  - `FieldsHelper` — use `\Joomla\Component\Fields\Administrator\Helper\FieldsHelper` instead
  - `FinderHelperLanguage` — use `\Joomla\Component\Finder\Administrator\Helper\LanguageHelper` instead
  - `InstallerHelper` — use `\Joomla\Component\Installer\Administrator\Helper\InstallerHelper` instead
  - `MenusHelper` — use `\Joomla\Component\Menus\Administrator\Helper\MenusHelper` instead
  - `ModulesHelper` — use `\Joomla\Component\Modules\Administrator\Helper\ModulesHelper` instead
  - `NewsfeedsHelper` — use `\Joomla\Component\Newsfeeds\Administrator\Helper\NewsfeedsHelper` instead
  - `PluginsHelper` — use `\Joomla\Component\Plugins\Administrator\Helper\PluginsHelper` instead
  - `RedirectHelper` — use `\Joomla\Component\Redirect\Administrator\Helper\RedirectHelper` instead
  - `TemplateHelper` — use `\Joomla\Component\Templates\Administrator\Helper\TemplateHelper` instead
  - `TemplatesHelper` — use `\Joomla\Component\Templates\Administrator\Helper\TemplatesHelper` instead
  - `UsersHelperDebug` — use `\Joomla\Component\Users\Administrator\Helper\DebugHelper` instead
  - `UsersHelper` — use `\Joomla\Component\Users\Administrator\Helper\UsersHelper` instead

  Note that two classes were also renamed when they moved, so update the class name as well as the namespace: `FinderHelperLanguage` became `LanguageHelper`, and `UsersHelperDebug` became `DebugHelper`.


