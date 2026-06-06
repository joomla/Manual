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

## Removed stub generator and PSR12 converter

- PR: https://github.com/joomla/joomla-cms/pull/47897
- Description: 
  - The stub generator was only for transition to make it easier to translate from Jx namespace to real php namespaces
  - The PSR12 converter was a onetime shot to get the Joomla code base to PSR12 / PER Coding Style
- Migration:
  - Not needed, if you still need the stub generator or the psr12 converter, use it from an older joomla version


Removed files:

- `/build/stubGenerator.php`
- `/build/psr12`
