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

## `CMSPlugin` db and app properties removed
- PR: https://github.com/joomla/joomla-cms/pull/47881
- File: libraries/src/Plugin/CMSPlugin.php
- Description: The autodetection and fill of the `$app` and `$db` properties in the `CMSPlugin` got removed. Inject the database and application in the provider.php. If it is not possible to use the aware trait or inject the application, then use `$this->app = Factory::getApplication();` and `$this->db = Factory::getContainer()->get(DatabaseInterface::class);` in the constructor of your plugin. For example you can use:
```php
// Old:
$this->app;
$this->db;

// New:
$this->getApplication();
$this->getDatabase();
```
