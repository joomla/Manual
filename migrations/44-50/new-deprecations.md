---
sidebar_position: 2
---

New deprecations
================
All the new deprecations that should be aware of and what you should now be using instead.

:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::


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
