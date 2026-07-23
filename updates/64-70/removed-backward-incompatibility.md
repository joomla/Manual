---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Compat plugin
The following list of changes belong to the compatibility plugin and work when enabled, but are mentioned here, so developers can prepare for upcoming changes in the next major release:

### Functions that throw an error
- PR: https://github.com/joomla/joomla-cms/pull/47911
- Files: 
  - /libraries/src/Factory.php
  - /libraries/src/User/User.php
- Description: The compatibility plugin defines the constant `COMPAT_JOOMLA_7` when loaded. The constant is used in functions to check if compatibility mode is enabled. If the constant doesn't exist, an exception is thrown in the respective function. Like that get extension developers and site admins, with old overrides, an idea what might not work anymore in the next major version. In the deprecation message and The following list of functions will throw an error when the compatibility plugin is not enabled:
  - `\Joomla\CMS\Factory::getConfig()`  
  Get the config from the application.
  - `\Joomla\CMS\Factory::getSession()`  
  Get the session from the application.
  - `\Joomla\CMS\Factory::getMailer()`  
  Create a mailer from the injected factory or global container.
  - `\Joomla\CMS\User\User::get()`  
  Access directly the property from the user object.

### CMS Crypt package
- PR: https://github.com/joomla/joomla-cms/pull/47899
- Folder: /libraries/src/Crypt
- Description: The Crypt package of the CMS (`\Joomla\CMS\Crypt`) has been deprecated for a long time. Please use the [framework `Crypt`](https://github.com/joomla-framework/crypt) package (`\Joomla\Crypt`). The packages can be used nearly interchangeably,
  expect for
  - `Crypt::timingSafeCompare()` use `hash_equals()` instead
  - `Crypt::safeStrlen()` use `mb_strlen()` instead
  - `Crypt::safeSubstr()` use `mb_substr()` instead
  - `Cipher\SodiumCipher::class` use `\Joomla\Crypt\Cipher\Sodium::class` instead
  - `Cipher\CryptoCipher::class` use `\Joomla\Crypt\Cipher\Crypto::class` instead
  
### Radiobasic form field
- PR: https://github.com/joomla/joomla-cms/pull/47930
- Files: 
  - /libraries/src/Form/Field/RadiobasicField.php
  - /layouts/joomla/form/field/radiobasic.php
- Description: The form field `radiobasic` is obsolete and the normal radio form field should be used with the layout `joomla.form.field.radio.switcher`.
```xml
// Old:
<field type="radiobasic" />

// New:
<field type="radio" layout="joomla.form.field.radio.switcher"/>
```

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

## `PrivacyPlugin` db property removed
- PR: https://github.com/joomla/joomla-cms/pull/47880
- File: /administrator/components/com_privacy/src/Plugin/PrivacyPlugin.php
- Description: The `$db` property in the `abstract class PrivacyPlugin extends CMSPlugin
` got removed. Inject the database in the provider.php. For example you can use:
```php
// Old:
$this->db;

// New:
$this->getDatabase();
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

## Removed unused methods from localise 
- PR: https://github.com/joomla/joomla-cms/pull/47897
- File: /administrator/language/en-GB/localise.php
- Description: Unused filters removed: 
`--getIgnoredSearchWords`
`--getLowerLimitSearchWord`
`--getUpperLimitSearchWord`
`--getSearchDisplayedCharactersNumber`

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
- Description: The non-namespaced helper classes in the `helpers/` folder of several components were deprecated in 4.3 and only forwarded to their namespaced replacements. They have now been removed entirely. They are **not** registered in the `behaviour/compat7` plugin classmap, so referencing the old global class name results in a "class not found" fatal error. Replace any use of the old class with the namespaced class below (add the matching `use` statement); all public method signatures are unchanged. To fix any errors, make a search and replace to use the namespaced versions now, e.g.
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

## Removed local log entry functionality in debug plugin
- PR: https://github.com/joomla/joomla-cms/pull/47900
- File: /plugins/system/debug/src/Extension/Debug.php
- Description: Removes the `logger()` function in the `\Joomla\Plugin\System\Debug\Extension\Debug::class` in the debug system plugin.
```php
// Old:
$app->bootPlugin('debug', 'system')->logger();

// New:
\Joomla\CMS\Log\Log::add();
```

## Make onDisplay methods private in editor button plugins
- PR: https://github.com/joomla/joomla-cms/pull/47902
- Files: 
  - /plugins/editors-xtd/article/src/Extension/Article.php
  - /plugins/editors-xtd/contact/src/Extension/Contact.php
  - /plugins/editors-xtd/fields/src/Extension/Fields.php
  - /plugins/editors-xtd/image/src/Extension/Image.php
  - /plugins/editors-xtd/menu/src/Extension/Menu.php
  - /plugins/editors-xtd/module/src/Extension/Module.php
  - /plugins/editors-xtd/pagebreak/src/Extension/PageBreak.php
  - /plugins/editors-xtd/readmore/src/Extension/ReadMore.php
- Description: Removes the `onDisplay()` method and added a private 'getButton()' method

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

## Removed `Joomla.popupWindow` function
- PR: https://github.com/joomla/joomla-cms/pull/47908
- File: /media_source/legacy/js/toolbar.es5.js
- Description: The function `Joomla.popupWindow` is not used and got removed. To create popup windows use browser native call instead.

## Removed the window.Calendar instance in calendar.js
- PR: https://github.com/joomla/joomla-cms/pull/47907
- File: /media_source/system/js/fields/calendar.es5.js
- Description: In Javascript should the `JoomlaCalendar` instance be used and not anymore `window.calendar`.
```php
// Old:
window.Calendar.setup();

// New:
JoomlaCalendar.init();
```

## Removed Methods from models
- PR: https://github.com/joomla/joomla-cms/pull/47501
- Files:
  - /administrator/components/com_joomlaupdate/src/Model/UpdateModel.php
  - /administrator/components/com_modules/src/Service/HTML/Modules.php
  - /components/com_content/src/Model/ArchiveModel.php
- Description: The method to get the archived article list `getData()` is removed, use `getItems()` instead. The method to get the positions list `positionList()` is removed without replacement. The method `createRestorationFil()` is removed, use `createUpdateFile()` instead.
```php
// Old:
$updateModel->createRestorationFile();
$archiveModel->getData();

// New:
$updateModel->createUpdateFile();
$archiveModel->getItems();
```

## Removed tinymce uploaddirs field
- PR: https://github.com/joomla/joomla-cms/pull/47913
- File: /plugins/editors/tinymce/src/Field/UploaddirsField.php
- Description: The field is not used by core anymore instead `Joomla\CMS\Form\Field\FolderlistField` is used.
```xml
// Old:
<field type="Uploaddirs" />

// New:
<field type="Folderlist" />
```

## Removed Joomla.JText proxy
- PR: https://github.com/joomla/joomla-cms/pull/47928
- File: /media_source/system/js/core.es6.js
- Description: Removes the deprecated global `Joomla.JText` Javascript property. Use `Joomla.Text` instead.
```javascript
// Old:
Joomla.JText._('COM_FOO');

// New:
Joomla.Text._('COM_FOO');
```

## Removed support for string parameters to generate template thumbnails
- PR: https://github.com/joomla/joomla-cms/pull/47924
- File: /administrator/components/com_templates/src/Service/HTML/Templates.php
- Description: The method to get the thumbnails accept only a template object and not anymore a string.
```php
// Old:
HTMLHelper::_('templates.thumb', $item->name);
HTMLHelper::_('templates.thumbModal', $item->name);

// New:
HTMLHelper::_('templates.thumb', $item);
HTMLHelper::_('templates.thumbModal', $item);
```

## Url layout file is not escaping the url
- PR: https://github.com/joomla/joomla-cms/pull/47929
- File: /layouts/joomla/form/field/url.php
- Description: The url layout file is not escaping the url anymore, the logic is moved to the `UrlField` class. If the layout file /layouts/joomla/form/field/url.php is used in an extension, then the encoding must be done by again.
```php
// Old:
LayoutHelper::render('joomla.form.field.url', ['value' => 'https://www.joomla.org']);

// New:
LayoutHelper::render('joomla.form.field.url', ['value' => htmlspecialchars(PunycodeHelper::urlToUTF8('https://www.joomla.org'), ENT_QUOTES, 'UTF-8')]);
```

## BannerHelper class got removed
- PR: https://github.com/joomla/joomla-cms/pull/47937
- File: /components/com_banners/src/Helper/BannerHelper.php
- Description: The `BannerHelper` got removed as it contains only an image test function. When testing the image file, use `\Joomla\CMS\Helper\MediaHelper::isImage($url)` for pixel-based image files in combination with `\Joomla\CMS\Helper\MediaHelper::getMimeType($url) === 'image/svg+xml'` for vector based image files. Be aware that the image url should first be sanitized with the helper function.
```php
// Old:
BannerHelper::isImage($url);

// New:
MediaHelper::isImage(HTMLHelper::cleanImageURL($url));
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
- Description: Several pieces of deprecated code have been removed from the core application classes. 
  - The obsolete `loadSession()` method and static `purgeMessages()` method have been removed. For example you can use:
  - The magic `__get()` accessor on the console application has been removed, so protected/dynamic properties can no longer be read directly as `$app->somProperty` use the dedicated getter methods instead. 
  - The deprecated `getCfg()` method has been removed (read configuration with `get()`).
  - The API application doesn't have anymore the `getApiRouter` function.
```php
// Old:
$value = $app->getCfg('sitename');
AdministratorApplication:purgeMessages();
ApiApplication::getApiRouter();
$value = $app->input;

// New:
$value = $app->get('sitename');
Factory::getApplication()->bootComponent('messages')->getMVCFactory()
            ->createModel('Messages', 'Administrator')->purge(Factory::getApplication()->getIdentity()->id);
Factory::getContainer()->get(ApiRouter::class);
$value = $app->getInput();
```

## Database is required in extension classes
- PR: https://github.com/joomla/joomla-cms/pull/47945
- Files: 
  - /administrator/components/com_fields/src/Model/FieldModel.php
  - /administrator/components/com_finder/src/Indexer/Indexer.php
  - /administrator/components/com_finder/src/Indexer/Query.php
  - /administrator/modules/mod_menu/src/Menu/CssMenu.php
- Description: The classes in the file list require a database injected or set when used. When used in the MVC context, then they are already correctly injected, custom instantiation in extensions need to be aware about.
```php
// Old:
$indexer = new Indexer();

// New:
$indexer = new Indexer($this->getDatabase());
```

## Stringables in ajax calls are rendered directly
- PR: https://github.com/joomla/joomla-cms/pull/47945
- File: /components/com_ajax/ajax.php
- Description: When an extension returns a `Stringable` object for an ajax call, then it will be printed directly and not anymore wrapped in a `JsonResponse` object.
