---
sidebar_position: 992
title: 5.2 to 5.3
---

Joomla 5.2 to 5.3 Upgrade Notes
===============================

An explanation of the code changes for each version of Joomla.
If you follow from the version of your current code until the version you want to support you should come across all the changes you need to make.

## Improved PHP 8.4 Compatibility
With the release of PHP 8.4, some new deprecations have been released like the [implicitly nullable parameter types](https://wiki.php.net/rfc/deprecate-implicitly-nullable-types). Beside fixing them in core, some dependency updates have been necessary to ensure perfect compatibility with the latest PHP feature version. The following major dependency updates have been done in this release:

- [php-debugbar/php-debugbar](https://github.com/joomla/joomla-cms/pull/44806) from version 1.23 to 2.1
- [wamania/php-stemmer](https://github.com/joomla/joomla-cms/pull/44657) from version 3.0 to 4.0
- [algo26-matthias/idna-convert](https://github.com/joomla/joomla-cms/pull/45140) from version 3.1 to 3.2

Beside the production dependencies are some developer dependencies also updated with [pr 45138](https://github.com/joomla/joomla-cms/pull/45138) which are needed for building or testing joomla.
delete
