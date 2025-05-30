---
sidebar_position: 1000
title: 3.10 to 4.0
---

Joomla 3.10 to 4.0 Upgrade Notes
================================
An explanation of the code changes for each version of Joomla.
If you follow from the version of your current code until the version you
want to support you should come across all the changes you need to make.

## Updated System Requirements

Beside changed to the code base itself we also increased the minimum
system requirements.

The system requirements have been updated as follows:

* PHP 7.2.5
* MySQL 5.6
* PostgreSQL 11.0
* **SQL Server support has been dropped.**

### PHP MySQL Extension

* Joomla **no longer supports** using PHP's **ext/MySQL** driver (which was removed in PHP 7.0).
  Joomla will automatically try to use the MySQLi extension (available since PHP 5.3) or
  the MySQL PDO Driver (available since PHP 5.3). Otherwise it will fail to create a
  database connection.

* Strict mode has been enabled. The following flags are now active by default in Joomla 4
  and you may have to update your database queries accordingly. This will help us with
  future MySQL version upgrades and also aligns more closely with Postgres to enable
  easier compatibility with queries in both languages.
  * STRICT_TRANS_TABLES
  * ERROR_FOR_DIVISION_BY_ZERO
  * NO_AUTO_CREATE_USER
  * NO_ENGINE_SUBSTITUTION

* As a consequence, Joomla 4 will only use `NULL` date defaults. The use of the invalid
  default date of **0000-00-00 00:00:00** in Joomla 4 has been deprecated.

### PHP Postgres Extension

Joomla **no longer supports** using PHP's **ext/pgsql** driver. Joomla will automatically try to
use the PostgreSQL PDO Driver (available since PHP 5.3 and Joomla 3.9). Otherwise it will
fail to create a database connection with a Postgres Database.

### PHP GMP Extension

This **is required** for using the **WebAuthn Passwordless Login** feature. Note the PHP GMP
extension is installed by default on the majority of hosting sites. The WebAuthn Passwordless
Login System Plugin is **enabled by default** in Joomla 4 on **HTTPS** sites.

### PHP mcrypt Extension

Since the mcyprt extensions has been **removed** from PHP in Version 7.2.0 you need the
[mycrypt PECL Package](https://pecl.php.net/package/mcrypt) for using the
`Joomla\CMS\Crypt\Cipher\CryptoCipher` class and its alias `JCryptCipherCrypto`.

The support for mcrypt will be **removed** with Joomla! 5.0 or 6.0.

