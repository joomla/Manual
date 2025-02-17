---
sidebar_position: 3
---

# Removed and backward incompatibility

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

### CMS Input object switched to Framework Input object

- PR's: 
  - https://github.com/joomla/joomla-cms/pull/42805
  - https://github.com/joomla/joomla-cms/pull/42890
- Description: The CMS Input namespace `\Joomla\CMS\Input` has been removed. The CMS core code has switched the code to the Framework Input library with the namespace `\Joomla\Input`, which is very much a drop-in replacement. This is especially of relevance if you are using the MVC classes, which now use the framework class. Make sure that your code imports the correct class.

### CMS BaseApplication and CLI classes have been removed

- PR: https://github.com/joomla/joomla-cms/pull/42884
- Description: The class `\Joomla\CMS\Application\BaseApplication` and `\Joomla\CMS\Application\CliApplication` respective CLI input classes have been removed. The CMS core code has been switched to use the Application package of the Joomla Framework. Any reference to these classes should be replaced with the namespace `\Joomla\Application`. Cli apps should be replaced by console plugins.

### UTC is used instead of GMT

- PR: https://github.com/joomla/joomla-cms/pull/43912
- Description: To unify the code base, all instances do use or fallback to UTC timezone. Make sure that your code doesn't do a check against GMT string.

### Removed legacy b/c code in \Joomla\CMS\Date\Date Class

- PR: https://github.com/joomla/joomla-cms/pull/43959
- Description: Removed Date::$gmt and Date::$stz variables and related code. If you extend the \Joomla\CMS\Date\Date class make sure not to depend on them any longer.

### View classes do not have a database reference

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

### getItem returns a stdClass instead of CMSObject

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

### None namespaced indexer file removed

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

### App variable is removed in plugins

- PR: https://github.com/joomla/joomla-cms/pull/44647
- Folder: plugins
- Description: The `$app` variable is left in some plugins for layout overrides of the plugins/tmpl folder and is not used anymore in the plugin class itself and the respective layouts. The `getApplication` function should be used instead  

```php
// Old:
$app = $this->app;

// New:
$app = $this->getApplication();
```

### JCOMPAT_UNICODE_PROPERTIES constant got removed in FormRule class

- PR: https://github.com/joomla/joomla-cms/pull/44662
- File: libraries/src/Form/FormRule.php
- Description: The `FormRule` class has a deprecated `JCOMPAT_UNICODE_PROPERTIES` constant which is not used anymore and got removed without a replacement. If the constant is still be used in an extension, copy the code from the FormRule class to your extension.


### createThumbs function got removed from the image class

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

### Client id attribute removed in form models cleanCache function

- PR: https://github.com/joomla/joomla-cms/pull/44637
- Description: The `cleanCache` function doesn't use the `$clientId` attribute anymore since 4.0. This pr removes the leftovers in various models which do extend the `BaseDatabaseModel` `cleanCache` function. If you extend one of these models and do overwrite the `cleanCache` function, remove the `$clientId` attribute.

### Removed isCli function in application classes

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

### CMSObject usage in core has been removed

- PR: https://github.com/joomla/joomla-cms/pull/43795
- PR: https://github.com/joomla/joomla-cms/pull/44655
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

