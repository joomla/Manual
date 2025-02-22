---
sidebar_position: 992
---

# 5.2 to 5.3

An explanation of the code changes for each version of Joomla.
If you follow from the version of your current code until the version you want to support you should come across all the changes you need to make.

## Improved PHP 8.4 compatibility
With the release of PHP 8.4, some new deprecations have been released like the [implicitly nullable parameter types](https://wiki.php.net/rfc/deprecate-implicitly-nullable-types). Beside fixing them in core, some dependency updates have been necessary to ensure perfect compatibility with the latest PHP feature version. The following major dependency updates have been done in this release:

- [typo3/phar-stream-wrapper](https://github.com/joomla/joomla-cms/pull/44808) from version 3.1 to 4.0
- [php-debugbar/php-debugbar](https://github.com/joomla/joomla-cms/pull/44806) from version 1.23 to 2.1
- [wamania/php-stemmer](https://github.com/joomla/joomla-cms/pull/44657) from version 3.0 to 4.0
