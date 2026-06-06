---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removed legacy OTP code from `UserModel` and `ProfileModel`
- PR: https://github.com/joomla/joomla-cms/pull/47457
- Files:
  - /administrator/components/com_users/src/Model/UserModel.php
  - /components/com_users/src/Model/ProfileModel.php
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

## `CMSPlugin` db and app properties detection removed
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

## `ActionLogPlugin` db and app properties removed
- PR: https://github.com/joomla/joomla-cms/pull/47880
- File: /administrator/components/com_actionlogs/src/Plugin/ActionLogPlugin.php
- Description: The `$app` and `$db` properties in the `ActionLogPlugin` got removed. Inject the database and application in the provider.php. For example you can use:
```php
// Old:
$this->app;
$this->db;

// New:
$this->getApplication();
$this->getDatabase();
```

## `FieldsPlugin` app property removed
- PR: https://github.com/joomla/joomla-cms/pull/47904
- File: /administrator/components/com_fields/src/Plugin/FieldsPlugin.php
- Description: The `$app` property in the `FieldsPlugin` got removed. Inject the application in the provider.php. For example you can use:
```php
// Old:
$this->app;

// New:
$this->getApplication();
```

## `LogcreatorField` class removed
- PR: https://github.com/joomla/joomla-cms/pull/47874
- File: /administrator/components/com_actionlogs/src/Field/LogcreatorField.php
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
- PR: https://github.com/joomla/joomla-cms/pull/47883
- Files:
  - /media_source/templates/site/cassiopeia/scss/global/colors_alternative.scss
  - /media_source/templates/site/cassiopeia/scss/global/colors_standard.scss
- Description: The CSS custom property `--cassiopeia-link-color` is not used and got removed.

## Removed legacy stubs for component helpers
- PR's: 
  - https://github.com/joomla/joomla-cms/pull/45856
  - https://github.com/joomla/joomla-cms/pull/45857
- Files:
  - /components/com_contact/helpers/route.php
  - /components/com_content/helpers/icon.php
  - /components/com_finder/helpers/route.php
  - /components/com_newsfeeds/helpers/route.php
  - /components/com_tags/helpers/route.php
  - /administrator/components/com_banners/helpers/banners.php
  - /administrator/components/com_categories/helpers/categories.php
  - /administrator/components/com_contact/helpers/contact.php
  - /administrator/components/com_content/helpers/content.php
  - /administrator/components/com_content/src/Model/FeaturedModel.php
  - /administrator/components/com_content/src/View/Featured/HtmlView.php
  - /administrator/components/com_contenthistory/helpers/contenthistory.php
  - /administrator/components/com_fields/helpers/fields.php
  - /administrator/components/com_fields/src/Plugin/FieldsPlugin.php
  - /administrator/components/com_finder/helpers/language.php
  - /administrator/components/com_installer/helpers/installer.php
  - /administrator/components/com_joomlaupdate/src/Model/UpdateModel.php
  - /administrator/components/com_menus/helpers/menus.php
  - /administrator/components/com_modules/helpers/modules.php
  - /administrator/components/com_modules/src/Service/HTML/Modules.php
  - /administrator/components/com_newsfeeds/helpers/newsfeeds.php
  - /administrator/components/com_plugins/helpers/plugins.php
  - /administrator/components/com_privacy/src/Plugin/PrivacyPlugin.php
  - /administrator/components/com_redirect/helpers/redirect.php
  - /administrator/components/com_templates/helpers/template.php
  - /administrator/components/com_templates/helpers/templates.php
  - /administrator/components/com_templates/src/Service/HTML/Templates.php
  - /administrator/components/com_users/helpers/debug.php
  - /administrator/components/com_users/helpers/users.php
- Description: The non-namespaced helper classes in the `helpers/` folder of several components were deprecated in 4.3 and only forwarded to their namespaced replacements. They have now been removed entirely. They are **not** registered in the `behaviour/compat6` plugin classmap, so referencing the old global class name results in a "class not found" fatal error. Replace any use of the old class with the namespaced class below (add the matching `use` statement); all public method signatures are unchanged. To fix any errors, make a search and replace to use the namespaced versions now, e.g.
- Class list mapping:
  - `ContactHelperRoute` — use `\Joomla\Component\Contact\Site\Helper\RouteHelper\ContactHelperRoute` instead
  - `JHtmlIcon` — use `\Joomla\Component\Content\Administrator\Service\HTML\Icon` instead
  - `FinderHelperRoute` — use `\Joomla\Component\Finder\Site\Helper\RouteHelper\FinderHelperRoute` instead
  - `NewsfeedsHelperRoute` — use `\Joomla\Component\Newsfeeds\Site\Helper\RouteHelper\NewsfeedsHelperRoute` instead
  - `TagsHelperRoute` — use `\Joomla\Component\Tags\Site\Helper\RouteHelper\TagsHelperRoute` instead
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
```php
// Old:
BannersHelper::function();

// New
\Joomla\Component\Banners\Administrator\Helper\BannersHelper::function();
```

## CMS Crypt Package Moved to the 'Behaviour - Backward Compatibility 7' Plugin
- PR: https://github.com/joomla/joomla-cms/pull/47899
- Folder: /libraries/src/Crypt
- Description: The Crypt package of the CMS (`\Joomla\CMS\Crypt`) has been deprecated for a long time. For Joomla 7.0 it has been moved to the compat plugin and will finally be completely removed in 8.0. 
  Please use the [framework `Crypt`](https://github.com/joomla-framework/crypt) package (`\Joomla\Crypt`). The packages can be used nearly interchangeably, 
  expect for
  - `Crypt::timingSafeCompare()` use `hash_equals()` instead
  - `Crypt::safeStrlen()` use `mb_strlen()` instead
  - `Crypt::safeSubstr()` use `mb_substr()` instead
  - `Cipher\SodiumCipher::class` use `\Joomla\Crypt\Cipher\Sodium::class` instead
  - `Cipher\CryptoCipher::class` use `\Joomla\Crypt\Cipher\Crypto::class` instead


## Removed local log entry functionality in debug plugin
- PR: https://github.com/joomla/joomla-cms/pull/47900
- File: /plugins/system/debug/src/Extension/Debug.php
- Description: Removes the `logger()` function in the `\Joomla\Plugin\System\Debug\Extension\Debug::class` in the debug system plugin.
```php
// Old:
$app->bootPlugin('debug', 'system)->logger();

// New:
\Joomla\CMS\Log\Log::add();
```

## Removed deprecated layout files
- PR: https://github.com/joomla/joomla-cms/pull/47884
- Files:
  - /layouts/joomla/content/icons/create.php
  - /layouts/joomla/html/batch/user.php
- Description: Removed unused layout files, there is no replacement for them.

## Removed stub generator and PSR12 converter
- PR: https://github.com/joomla/joomla-cms/pull/47897
- File: /build/stubGenerator.php
- Folder: /build/psr12
- Description: The stub generator was only for transition to make it easier to translate from Jx namespace to real php namespaces. The PSR12 converter was a onetime shot to get the Joomla code base to PSR12 / PER Coding Style. If you still need the stub generator or the psr12 converter, use it from an older joomla version.

## Removed `Factory::getConfig()` and `getCfg()`
- PR: https://github.com/joomla/joomla-cms/pull/45870
- Files:
  - libraries/src/Factory.php
  - libraries/src/Application/CMSApplication.php
- Description: The long-deprecated `Factory::getConfig()` method and the matching `CMSApplication::getCfg()` method have been removed, along with the internal `Factory::createConfig()` helper. The global configuration is part of the application, so read configuration values from the application instead. For example you can use:
```php
// Old:
$config   = \Joomla\CMS\Factory::getConfig();
$sitename = $config->get('sitename');

// New:
$sitename = \Joomla\CMS\Factory::getApplication()->get('sitename');
```

## Removed deprecated code in the application classes
- PR: https://github.com/joomla/joomla-cms/pull/45866
- Files:
  - libraries/src/Application/CMSApplication.php
  - libraries/src/Application/CMSApplicationInterface.php
  - libraries/src/Application/AdministratorApplication.php
  - libraries/src/Application/ApiApplication.php
  - libraries/src/Application/ConsoleApplication.php
  - libraries/src/Application/WebApplication.php
- Description: Several pieces of deprecated code have been removed from the core application classes. The magic `__get()` accessor on the application has been removed, so protected/dynamic properties can no longer be read directly as `$app->somProperty`; use the dedicated getter methods instead. The deprecated `getCfg()` method has been removed (read configuration with `get()`), and the obsolete `loadSession()` method and static `purgeMessages()` method have been removed. For example you can use:
```php
// Old:
$value = $app->getCfg('sitename');

// New:
$value = $app->get('sitename');
```

## `AbstractView::$document` made private; use `getDocument()`/`setDocument()`
- PR: https://github.com/joomla/joomla-cms/pull/45862
- Files:
  - libraries/src/MVC/View/AbstractView.php
  - libraries/src/MVC/Controller/BaseController.php
  - and the controllers/views of com_banners, com_categories, com_installer, com_joomlaupdate, com_privacy, com_users and com_config
- Description: The `AbstractView::$document` property is now `private` and can no longer be accessed directly. This is an intentional backward-compatibility break so that the document is always reached through `getDocument()` and `setDocument()`, which implement `DocumentAwareInterface`. Update any view or template override that reads `$this->document` directly. For example you can use:
```php
// Old:
$this->document->setTitle('My title');
$doc = $this->document;

// New:
$this->getDocument()->setTitle('My title');
$doc = $this->getDocument();
```

## Removed deprecated methods from component models
- PR: https://github.com/joomla/joomla-cms/pull/47501
- Files:
  - administrator/components/com_joomlaupdate/src/Model/UpdateModel.php
  - administrator/components/com_modules/src/Service/HTML/Modules.php
  - components/com_content/src/Model/ArchiveModel.php
- Description: Several deprecated, unused methods have been removed from component models and HTML services:
  - `Joomla\Component\Joomlaupdate\Administrator\Model\UpdateModel::createRestorationFile()`
  - `Joomla\Component\Modules\Administrator\Service\HTML\Modules::positionList()`
  - `Joomla\Component\Content\Site\Model\ArchiveModel::getData()`

  These methods were already deprecated and are not used in core. If your extension calls them, remove the call or replace it with the current API for the respective component.

## Removed further deprecated component code
- PR: https://github.com/joomla/joomla-cms/pull/45858
- Files:
  - administrator/components/com_templates/src/Service/HTML/Templates.php
  - administrator/components/com_users/src/Helper/UsersHelper.php
  - administrator/components/com_privacy/src/Plugin/PrivacyPlugin.php
  - components/com_tags/src/Helper/RouteHelper.php
- Description: A further batch of deprecated component code has been removed. (The `UpdateModel::createRestorationFile()` and `Modules::positionList()` removals that also appear in this change are documented under PR #47501 above.) The following methods have been removed:
  - `Joomla\Component\Templates\Administrator\Service\HTML\Templates::thumb()` and `::thumbModal()`
  - `Joomla\Component\Users\Administrator\Helper\UsersHelper::getTwoFactorMethods()`, `::getContexts()` and `::validateSection()`
  - `Joomla\Component\Tags\Site\Helper\RouteHelper::getTagRoute()` and `::getTagsRoute()`

  These were deprecated helpers. Use the current component services instead: build tag routes through the component router rather than `RouteHelper::getTagRoute()`, and obtain multi-factor methods through the MFA plugins rather than `UsersHelper::getTwoFactorMethods()`.

## `PrivacyPlugin` `$app` and `$db` properties removed
- PR: https://github.com/joomla/joomla-cms/pull/47500
- File: administrator/components/com_privacy/src/Plugin/PrivacyPlugin.php
- Description: The deprecated `$app` and `$db` properties have been removed from `PrivacyPlugin`, completing the same change already applied to `ActionLogPlugin` and `FieldsPlugin` (documented above). Inject the database and application in the plugin's `provider.php`. If injection is not possible, set them in the constructor with `$this->app = Factory::getApplication();` and `$this->db = Factory::getContainer()->get(DatabaseInterface::class);`. For example you can use:
```php
// Old:
$this->app;
$this->db;

// New:
$this->getApplication();
$this->getDatabase();
```

## Removed `ReshapeArgumentsAware` trait and legacy event setters
- PR: https://github.com/joomla/joomla-cms/pull/47459
- Files: the event classes throughout libraries/src/Event/* (Cache, Checkin, Contact, Content, CustomFields, Extension, Finder, Installer, Mail, Menu, Model and more)
- Description: The deprecated `ReshapeArgumentsAware` trait (and its `reshapeArguments()` method) has been removed from the core event classes, together with the legacy per-argument setter methods (the `setX()` and `onSetX()` methods such as `setQuery()`, `setResult()`, `setState()`, `setSubject()` and so on). Several setters that were previously `public` are now `protected`. Construct events by passing the named arguments array to the constructor and read values with the documented getters; do not call the removed setters or rely on the old positional-argument reshaping. If you dispatch core events from your extension, build the event with its named arguments rather than setting them after construction.

## Installer package now throws exceptions instead of setting errors
- PR: https://github.com/joomla/joomla-cms/pull/47504
- Files: libraries/src/Installer/* (Installer, InstallerAdapter, InstallerScript, InstallerScriptTrait and all of the Adapter classes), administrator/components/com_installer/src/Model/InstallModel.php
- Description: The installer package has been converted away from the legacy error-handling trait (the `setError()`/`getError()` pattern) to throw proper exceptions on failure. If you extend an installer adapter, or call installer methods directly, handle the thrown exception rather than checking a boolean return value or reading `getError()`. For example you can use:
```php
// Old:
if (!$installer->install($path)) {
    Factory::getApplication()->enqueueMessage($installer->getError(), 'error');
}

// New:
try {
    $installer->install($path);
} catch (\RuntimeException $e) {
    Factory::getApplication()->enqueueMessage($e->getMessage(), 'error');
}
```

## Removed legacy user-authentication password hashes
- PR: https://github.com/joomla/joomla-cms/pull/44237
- Files:
  - libraries/phpass/PasswordHash.php
  - libraries/src/Authentication/Password/PHPassHandler.php
  - libraries/src/Service/Provider/Authentication.php
  - libraries/src/User/UserHelper.php
  - libraries/import.legacy.php
- Description: Support for the obsolete PHPass (`$P$`) password-hash format has been removed: the `phpass` `PasswordHash` class and the `PHPassHandler` are gone, along with the legacy hashing constants on `UserHelper` (`HASH_PHPASS`, `HASH_BCRYPT_BC`, `HASH_ARGON2I_BC` and `HASH_ARGON2ID_BC`). Joomla switched to bcrypt in 3.2.1 and rehashes passwords to the current algorithm on login, so these have been unused for over a decade. The only accounts affected are ones that have not logged in since before Joomla 3.2.1; such a user must use the "forgotten password" reset to log in again. Remove any reference to the removed constants or to `PHPassHandler` from your code.
