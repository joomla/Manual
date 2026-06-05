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

## Removed deprecated getList() method from module helpers

PR: https://github.com/joomla/joomla-cms/pull/47891

    Description: Since 4.3 we use the non-static method for getting there respective Model in Helper Classes. These Methods are now removed and extensions use for example: 
    Factory::getApplication()->bootModule('mod_articles_news', 'site')
    ->getHelper('ArticlesNewsHelper')
    ->getArticles($params, Factory::getApplication())

The getList() method is removed in following files:

    /modules/mod_articles_archive/src/Helper/ArticlesArchiveHelper.php
    /modules/mod_articles_categories/src/Helper/ArticlesCategoriesHelper.php
    /modules/mod_articles_category/src/Helper/ArticlesCategoryHelper.php
    /modules/mod_articles_latest/src/Helper/ArticlesLatestHelper.php
    /modules/mod_articles_news/src/Helper/ArticlesNewsHelper.php
    /modules/mod_articles_popular/src/Helper/ArticlesPopularHelper.php

