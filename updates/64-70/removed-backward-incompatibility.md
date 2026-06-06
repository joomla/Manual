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

## Removed deprecated static functions from module helpers
- PR: https://github.com/joomla/joomla-cms/pull/47891
- Files: 
    - /administrator/modules/mod_feed/src/Helper/FeedHelper.php
    - /administrator/modules/mod_latest/src/Helper/LatestHelper.php
    - /administrator/modules/mod_latestactions/src/Helper/LatestActionsHelper.php
    - /administrator/modules/mod_logged/src/Helper/LoggedHelper.php
    - /administrator/modules/mod_login/src/Helper/LoginHelper.php
    - /administrator/modules/mod_privacy_dashboard/src/Helper/PrivacyDashboardHelper.php
    - /administrator/modules/mod_privacy_status/src/Helper/PrivacyStatusHelper.php
    - /administrator/modules/mod_sampledata/src/Helper/SampledataHelper.php
    - /administrator/modules/mod_stats_admin/src/Helper/StatsAdminHelper.php
    - /administrator/modules/mod_version/src/Helper/VersionHelper.php
    - /modules/mod_articles_archive/src/Helper/ArticlesArchiveHelper.php
    - /modules/mod_articles_categories/src/Helper/ArticlesCategoriesHelper.php
    - /modules/mod_articles_category/src/Helper/ArticlesCategoryHelper.php
    - /modules/mod_articles_latest/src/Helper/ArticlesLatestHelper.php
    - /modules/mod_articles_news/src/Helper/ArticlesNewsHelper.php
    - /modules/mod_articles_popular/src/Helper/ArticlesPopularHelper.php
    - /modules/mod_banners/src/Helper/BannersHelper.php
    - /modules/mod_breadcrumbs/src/Helper/BreadcrumbsHelper.php
    - /modules/mod_feed/src/Helper/FeedHelper.php
    - /modules/mod_finder/src/Helper/FinderHelper.php
    - /modules/mod_languages/src/Helper/LanguagesHelper.php
    - /modules/mod_login/src/Helper/LoginHelper.php
    - /modules/mod_menu/src/Helper/MenuHelper.php
    - /modules/mod_random_image/src/Helper/RandomImageHelper.php
    - /modules/mod_related_items/src/Helper/RelatedItemsHelper.php
    - /modules/mod_stats/src/Helper/StatsHelper.php
    - /modules/mod_syndicate/src/Helper/SyndicateHelper.php
    - /modules/mod_tags_popular/src/Helper/TagsPopularHelper.php
    - /modules/mod_tags_similar/src/Helper/TagsSimilarHelper.php
    - /modules/mod_users_latest/src/Helper/UsersLatestHelper.php
    - /modules/mod_whosonline/src/Helper/WhosonlineHelper.php
    - /modules/mod_wrapper/src/Helper/WrapperHelper.php
- Description: Modules traditionally were written with a static helper class to retrieve data from the system. This isn't desirable from a dependency injection perspective and thus the modules were rewritten to use instantiated helper objects instead with dependency injection. Instantiate the helper object and call the non-static version of the respective method instead. For example you can use:
```php
// Old:
ArticlesNewsHelper::getArticles($params);

// New:
Factory::getApplication()->bootModule('mod_articles_news', 'site')
  ->getHelper('ArticlesNewsHelper')
  ->getArticles($params, Factory::getApplication());
```

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

## CMS Crypt Package Moved to the 'Behaviour - Backward Compatibility 7' Plugin

- PR: https://github.com/joomla/joomla-cms/pull/47899
- Folder: libraries/src/Crypt
- Description: The Crypt package of the CMS (`\Joomla\CMS\Crypt`) has been deprecated for a long time. For Joomla 7.0 it has been moved to the compat plugin and will finally be completely removed in 8.0. 
  Please use the [framework `Crypt`](https://github.com/joomla-framework/crypt) package (`\Joomla\Crypt`). The packages can be used nearly interchangeably, 
  expect for
  - `Crypt::timingSafeCompare()` use `hash_equals()` instead
  - `Crypt::safeStrlen()` use `mb_strlen()` instead
  - `Crypt::safeSubstr()` use `mb_substr()` instead
  - `Cipher\SodiumCipher::class` use `\Joomla\Crypt\Cipher\Sodium::class` instead
  - `Cipher\CryptoCipher::class` use `\Joomla\Crypt\Cipher\Crypto::class` instead
