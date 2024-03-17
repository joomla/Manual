---
sidebar_position: 2
---

# New deprecations

All the new deprecations that should be aware of and what you should now be using instead.

# Language strings

File: administrator/language/en-GB/com_joomlaupdate.ini  
Strings: INSTL_MB_STRING_OVERLOAD_OFF, INSTL_NOTICEMBSTRINGOVERLOAD

File: installation/language/en-GB/joomla.ini  
Strings: INSTL_MB_STRING_OVERLOAD_OFF, INSTL_NOTICE_MBSTRING_OVERLOAD_OFF

File: administrator/language/en-GB/plg_user_joomla.ini
Strings: PLG_USER_JOOMLA_FIELD_STRONG_PASSWORDS_LABEL, PLG_USER_JOOMLA_POSTINSTALL_STRONGPW_BTN, PLG_USER_JOOMLA_POSTINSTALL_STRONGPW_TEXT, PLG_USER_JOOMLA_POSTINSTALL_STRONGPW_TITLE

#### The item_associations property of the WebApplication class is deprecated

File: libraries/src/Application/WebApplication.php
Replacement: The $item_associations property will be removed with no replacement as it is not used in core anymore.

#### Privacy plugin db property is deprecated

File: administrator/components/com_privacy/src/Plugin/PrivacyPlugin.php
Replacement: The `$this->db` property is deprecated in the privacy plugins. Instead of use `$this->getDatabase()` when the plugin is converted to service providers.

#### Model states are not anymore of type CMSObject

File: libraries/src/MVC/Model/StateBehaviorTrait.php
Replacement: Direct property access to the state object of the model should be replaced with a get/set function call. The state object is now a `Registry` which contains all the convenient functions a store should provide.
Example:
```php
// Write to the state
$model->getState()->set('foo', 'bar');

// Access the state
$data = $model->getState()->get('foo');
```

#### ContentHelper actions are not anymore of type CMSObject

File: libraries/src/Helper/ContentHelper.php
Replacement: Direct property access to the canDo object of the view should be replaced with a get/set function call. The actions object is now a `Registry` which contains all the convenient functions a store should provide.
Example:
```php
$canCreate = \Joomla\CMS\Helper\ContentHelper::getActions('com_content')->get('core.create');
```

# Class deprecations

Planned to be removed in Joomla! 6.0

### Filesystem CMS package
The CMS Filesystem package can be found in libraries/src/Filesystem and will be completely replaced in 6.0 with the [Joomla Framework Filesystem](https://github.com/joomla-framework/filesystem) package. The CMS package and the Framework package are nearly 1-to-1 replacements for each other, however the Framework package uses Exceptions where appropriate instead of the old `setError` and `getError` which the CMS package uses.

In most cases you only have to change the namespace from `Joomla\CMS\Filesystem\*` to `Joomla\Filesystem\*`. To properly handle error cases, you will have to go through your code and catch the exceptions where necessary.

* File: `libraries/src/Filesystem/File.php`<br/>
  Class: `Joomla\CMS\Filesystem\File`<br/>
  Replacement: `Joomla\Filesystem\File`

* File: `libraries/src/Filesystem/FilesystemHelper.php`<br/>
  Class: `Joomla\CMS\Filesystem\FilesystemHelper`<br/>
  Replacement: `Joomla\Filesystem\Helper`

* File: `libraries/src/Filesystem/Folder.php`<br/>
  Class: `Joomla\CMS\Filesystem\Folder`<br/>
  Replacement: `Joomla\Filesystem\Folder`

* File: `libraries/src/Filesystem/Patcher.php`<br/>
  Class: `Joomla\CMS\Filesystem\Patcher`<br/>
  Replacement: `Joomla\Filesystem\Patcher`

* File: `libraries/src/Filesystem/Path.php`<br/>
  Class: `Joomla\CMS\Filesystem\Path`<br/>
  Replacement: `Joomla\Filesystem\Path`

* File: `libraries/src/Filesystem/Stream.php`<br/>
  Class: `Joomla\CMS\Filesystem\Stream`<br/>
  Replacement: `Joomla\Filesystem\Stream`

* File: `libraries/src/Filesystem/Streams/StreamString.php`<br/>
  Class: `Joomla\CMS\Filesystem\Streams\StreamString`<br/>
  Replacement: `Joomla\Filesystem\Stream\StringWrapper`

* File: `libraries/src/Filesystem/Support/StringController.php`<br/>
  Class: `Joomla\CMS\Filesystem\Support/StringController`<br/>
  Replacement: `Joomla\Filesystem\Support\StringController`

