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


## Removed unused methods from localise 
- PR: [https://github.com/joomla/joomla-cms/pull/47897]
- Description: Unused filters removed: 
`--getIgnoredSearchWords`
`--getLowerLimitSearchWord`
`--getUpperLimitSearchWord`
`--getSearchDisplayedCharactersNumber`
