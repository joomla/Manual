---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.


## Removal of the `CMSObject` Class Usage
The `CMSObject` (`JObject`) contains various functions in one single class which made sense at the time it was introduced in Joomla 1.7. PHP has evolved and many use cases are now built into the core language or are replaced and not anymore up to date. Therefore the class got [deprecated in 4.0](https://github.com/joomla/joomla-cms/pull/4910) and will be removed in an upcoming major release (currently 7.0). Over time, the maintainers removed the usage in core and with the following chapters are the last traces removed, which couldn't be done in a backwards compatible way.

## `getItem` returns a `stdClass` Instead of `CMSObject`

- PR: https://github.com/joomla/joomla-cms/pull/42961
- File: libraries/src/MVC/Model/AdminModel.php
- Description: The `AdminModel` class does return a `stdClass` object in the `getItem` function instead of a `CMSObject`. This means that all the deprecated functions of `CMSObject` are not available anymore. Mainly the set and get function should be replaced accordingly as documented in the `CMSObject` class or the respective traits. For example you can use 
```php
// Old:
$article = $app->bootComponent('content')->getMVCFactory()->createModel('Article', 'Administrator')->getItem(1);
echo $article->get('title');

// New:
$article = $app->bootComponent('content')->getMVCFactory()->createModel('Article', 'Administrator')->getItem(1);
echo $article->title;
```

## Removed `CMSObject` Usage in Core

- PR: https://github.com/joomla/joomla-cms/pull/43795
- PR: https://github.com/joomla/joomla-cms/pull/44655
- PR: https://github.com/joomla/joomla-cms/pull/44945
- Description: The `CMSObject` class has been problematic for a long time, because it allows to circumvent the visibility setting of object properties. The `CMSObject` class will be removed in Joomla 7.0, but with Joomla 6.0 it is removed everywhere in the core code. The following code is affected:
  - Smart Search (finder) plugins now use `\stdClass` objects to store the state.
  - The following models now return `\stdClass` objects instead of `CMSObject`:
    - `Joomla\Component\Installer\Administrator\Model\UpdatesiteModel`
    - `\Joomla\Component\Installer\Administrator\Model\UpdatesitesModel`
    - `\Joomla\Component\Languages\Administrator\Model\LanguageModel`
    - `\Joomla\Component\Mails\Administrator\Model\TemplateModel`
    - `\Joomla\Component\Menu\Administrator\Model\MenuModel`
    - `\Joomla\Component\Menus\Administrator\Model\MenutypesModel`
    - `\Joomla\Component\Messages\Administrator\Model\ConfigModel`
    - `\Joomla\Component\Modules\Administrator\Model\ModuleModel`
    - `\Joomla\Component\Plugins\Administrator\Model\PluginModel`
    - `\Joomla\Component\Scheduler\Administrator\Model\TaskModel`
    - `\Joomla\Component\Scheduler\Administrator\Model\TasksModel`
    - `\Joomla\Component\Templates\Administrator\Model\StyleModel`
    - `\Joomla\Component\Users\Administrator\Model\GroupModel`
    - `\Joomla\Component\Workflow\Administrator\Model\TransitionModel`
    - `\Joomla\CMS\Component\Contact\Model\FormModel`
    - `\Joomla\CMS\Component\Content\Model\FormModel`
    - `\Joomla\Component\Tags\Site\Model\TagModel`
  - The code of the installer component is using `\stdClass` objects now. 
  - `\Joomla\CMS\Access\Rules::getAllowed()` now returns a `stdClass`
  - `\Joomla\CMS\MVC\Controller\ApiController` uses a `Registry` object for the model state.
  - `\Joomla\CMS\User\UserHelper::getProfile()` returns a `stdClass` object now.
  - The save/delete events when a media file is uploaded or a folder is created/deleted are sending now an object of type `stdClass` and not anymore `CMSObject`.

## `CMS\Input` Object Switched to Framework `Input` Object

- PR's: 
  - https://github.com/joomla/joomla-cms/pull/42805
  - https://github.com/joomla/joomla-cms/pull/42890
- Description: The CMS Input namespace `\Joomla\CMS\Input` has been removed. The CMS core code has switched the code to the Framework Input library with the namespace `\Joomla\Input`, which is very much a drop-in replacement. This is especially of relevance if you are using the MVC classes, which now use the framework class. Make sure that your code imports the correct class.

## UTC Used Instead of GMT

- PR: https://github.com/joomla/joomla-cms/pull/43912
- Description: To unify the code base, all instances do use or fallback to UTC timezone. Make sure that your code doesn't do a check against GMT string.

## Removed Legacy B/C Code in `\Joomla\CMS\Date\Date` Class

- PR: https://github.com/joomla/joomla-cms/pull/43959
- Description: Removed Date::$gmt and Date::$stz variables and related code. If you extend the \Joomla\CMS\Date\Date class make sure not to depend on them any longer.

## View Classes No Longer Have a Database Reference

- PR: https://github.com/joomla/joomla-cms/pull/42962
- Description: In Joomla 3 some views had a reference to the global database instance to check if a date is a special null date (0000-00-00 00:00:00). Since Joomla 4 all these dates are real null values and the database check is not used anymore. If there are some old template overrides in place with these checks, they can be removed.

```php
// Old:
if ($this->item->created !== $this->db->getNullDate()) {
	echo $this->item->created;
}

// New:
if ($this->item->created !== null) {
	echo $this->item->created;
}
```

## None-Namespaced Indexer File Removed

- PR: https://github.com/joomla/joomla-cms/pull/44646
- Folder: administrator/components/com_finder/helpers/indexer
- Description: The files in /administrator/components/com_finder/helpers/indexer were containing the none namespaced classes and are left only for legacy include code. They are empty as class alias do exist for them already. The include code in extensions can be removed and the namespaced classes should be used as they are autoloaded. For example you can use 

```php
// Old:
require_once JPATH_ADMINISTRATOR . '/components/com_finder/helpers/indexer/helper.php';
FinderIndexerHelper::getFinderPluginId();

// New:
Joomla\Component\Finder\Administrator\Helper\FinderHelper::getFinderPluginId();
```

## `$app` Variable is Removed in `plugins`

- PR: https://github.com/joomla/joomla-cms/pull/44647
- Folder: plugins
- Description: The `$app` variable is left in some plugins for layout overrides of the plugins/tmpl folder and is not used anymore in the plugin class itself and the respective layouts. The `getApplication` function should be used instead  

```php
// Old:
$app = $this->app;

// New:
$app = $this->getApplication();
```

## `JCOMPAT_UNICODE_PROPERTIES` Constant Removed in `FormRule` Class

- PR: https://github.com/joomla/joomla-cms/pull/44662
- File: libraries/src/Form/FormRule.php
- Description: The `FormRule` class has a deprecated `JCOMPAT_UNICODE_PROPERTIES` constant which is not used anymore and got removed without a replacement. If the constant is still be used in an extension, copy the code from the FormRule class to your extension.

## `createThumbs` Function Removed from the `image` Class

- PR: https://github.com/joomla/joomla-cms/pull/44663
- File: libraries/src/Image/Image.php
- Description: The `createThumbs` function in the `Image` class got removed as the function `createThumbnails` should be used instead. For example you can use 

```php
// Old:
$image = new Image($path);
$image->createThumbs('50x50');

// New:
$image = new Image($path);
$image->createThumbnails('50x50');
```


## `Mod_breadcrumbs setSeparator`
- PR: https://github.com/joomla/joomla-cms/pull/44605/
- File: modules/mod_breadcrumbs/src/Helper/BreadcrumbsHelper.php
- Description: setSeparator to set the breadcrumbs separator for the breadcrumbs display has not been used since 4.0 and is removed without replacement

## `$clientId` Attribute Removed in Form Models `cleanCache` Function

- PR: https://github.com/joomla/joomla-cms/pull/44637
- Description: The `cleanCache` function doesn't use the `$clientId` attribute anymore since 4.0. This pr removes the leftovers in various models which do extend the `BaseDatabaseModel` `cleanCache` function. If you extend one of these models and do overwrite the `cleanCache` function, remove the `$clientId` attribute.

## Removed `isCli` Function in Application Classes

- PR: https://github.com/joomla/joomla-cms/pull/44611
- Files: libraries/src/Application/CMSApplicationInterface.php
- Description: The deprecated `isCli` got removed from the application classes. It was introduced as transient flag which was deprecated right from the beginning and should never be used anyway. If an extension was still using it, then adapt the code as described below
```php
// Old:
if ($app->isCli()) {
    // Do your stuff
}

// New:
if ($app instanceof \Joomla\CMS\Application\ConsoleApplication) {
    // Do your stuff
}
```

## Removed `LegacyErrorHandlingTrait` from `CategoryNode` and `Changelog` Class

- PR: https://github.com/joomla/joomla-cms/pull/43777
- Files: libraries/src/Categories/CategoryNode.php, libraries/src/Changelog/Changelog.php
- Description: The `CategoryNode` class and the `Changelog` class both contained the `LegacyErrorHandlingTrait`, but both didn't use it. Since the trait is deprecated, it has been removed from these two classes in 6.0 without replacement.

## Legacy and Outdated Static Assets Removed or Moved

- Tabs State (js)
	- File removed: build/media_source/legacy/js/tabs-state.es5.js
	- PR: https://github.com/joomla/joomla-cms/pull/45021
 - jQuery No Conflict (js)
	- File moved from `media/legacy/js` to `media/vendor/jquery/js`
	- PR: https://github.com/joomla/joomla-cms/pull/45020
 
## CMS Filesystem Package Moved to the Backward Compatibility Plugin

- PR: https://github.com/joomla/joomla-cms/pull/44240
- Folder: libraries/src/Filesystem
- Description: The Filesystem package of the CMS (`\Joomla\CMS\Filesystem`) has been deprecated for a long time. For Joomla 6.0 it has been moved to the compat plugin and will finally be completely removed in 7.0. Please use the [framework `Filesystem`](https://github.com/joomla-framework/filesystem) package (`\Joomla\Filesystem`). The packages can be used nearly interchangeably, with the exception of `File::exists()` and `Folder::exists()`. Please use `is_file()` and `is_dir()` directly.

## `voku/portable-utf8` Composer Library Removed

The [voku/portable-utf8](https://github.com/voku/portable-utf8) package seems to be abandoned and is also not used in Joomla itself.
If you need UTF8-compatible string functions from PHP, have a look at the [joomla/string](https://github.com/joomla-framework/string) package.

## `TYPO3/phar-stream-wrapper` Removed

- PR: https://github.com/joomla/joomla-cms/pull/45256
- Description: The TYPO3/phar-stream-wrapper dependency fixes a security issue in PHP 7, which has been fixed in PHP 8.0. This means that this package isn't necessary at all in Joomla and can be removed entirely.

## `buildVotingQuery` Function in `QueryHelper` Removed

- PR: https://github.com/joomla/joomla-cms/pull/45389
- File: components/com_content/src/Helper/QueryHelper.php
- Description: The `buildVotingQuery` is not used in core. If the extension needs that functionality, copy it from the 5.3 branch.

## `tfa` Property Removed from Login View

- PR: https://github.com/joomla/joomla-cms/pull/45399
- File: components/com_users/src/View/Login/HtmlView.php
- Description: The `tfa` is not used in the login view anymore as it is a leftover from the old two factor authentication system.

## `BufferStreamHandler` No Longer Automatically Registers the Stream

- PR: https://github.com/joomla/joomla-cms/pull/45402
- File: libraries/src/Utility/BufferStreamHandler.php
- Description: The `BufferStreamHandler` does not auto register the stream anymore. An extension should do it now by itself by calling `BufferStreamHandler::stream_register();`.


## Table Objects Now Instantiated Directly Instead of via `Table::getInstance()`

- PR: https://github.com/joomla/joomla-cms/pull/44090
- Description: `Table` objects in the core code have been instantiated with `Table::getInstance()` in the past. Starting with Joomla 6.0, you should use the explicit table class directly instead. After this change it is not possible to override the table class by calling `Table::addIncludePath()` anymore. At the same time it simplifies code handling a lot and especially allows IDEs to properly understand the code properly.

```php
// Old:
$table = Table::getInstance('content');

// New:
$table = new \Joomla\CMS\Table\Content($db);
```

## `WebApplication` No Longer Has `$item_associations` Property

- PR: https://github.com/joomla/joomla-cms/pull/45425
- File: libraries/src/Application/WebApplication.php
- Description: The `$item_associations` was added to the `WebApplication` class for improved PHP 8.2 compatibility and is not used at all.

## `getLogContentTypeParams` Method Removed from of `ActionlogsHelper`

- PR: https://github.com/joomla/joomla-cms/pull/45434
- File: administrator/components/com_actionlogs/src/Helper/ActionlogsHelper.php
- Description: The `getLogContentTypeParams` function in the the `ActionlogsHelper` class got removed as the one in the model should be used:

```php
// Old:
ActionlogsHelper::getLogContentTypeParams('context');

// New:
Factory::getApplication()->bootComponent('actionlogs')->getMVCFactory()
    ->createModel('ActionlogConfig', 'Administrator')->getLogContentTypeParams('context');
```

## Removal of old `com_search`-related methods from Language class
- PR: https://github.com/joomla/joomla-cms/pull/42892
- File: libraries/src/Language/Language.php
- Description: The `\Joomla\CMS\Language\Language` class contained special methods for the old `com_search` component, which should have been removed in 4.0. These methods are removed without replacement. The following methods have been removed:
  - `getIgnoredSearchWords()`
  - `getIgnoredSearchWordsCallback()`
  - `setIgnoredSearchWordsCallback()`
  - `getLowerLimitSearchWord()`
  - `getLowerLimitSearchWordCallback()`
  - `setLowerLimitSearchWordCallback()`
  - `getUpperLimitSearchWord()`
  - `getUpperLimitSearchWordCallback()`
  - `setUpperLimitSearchWordCallback()`
  - `getSearchDisplayedCharactersNumber()`
  - `getSearchDisplayedCharactersNumberCallback()`
  - `setSearchDisplayedCharactersNumberCallback()`
