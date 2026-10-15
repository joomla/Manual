---
sidebar_position: 994
title: 5.0 to 5.1
---

Joomla 5.0 to 5.1 Upgrade Notes
===============================

An explanation of the code changes for each version of Joomla.
If you follow from the version of your current code until the version you want to support you should come across all the changes you need to make.

## Modal Editing for Plugins Using `JoomlaDialog`

A popup for Plugin editing update from Bootstrap modal to JoomlaDialog.

PR [#42447](https://github.com/joomla/joomla-cms/pull/42447)

Old code:
```php
$link = Route::_('index.php?option=com_plugins&client_id=0&task=plugin.edit&extension_id=' . $pluginId . '&tmpl=component&layout=modal');

echo HTMLHelper::_(
    'bootstrap.renderModal',
    'plugin' . $pluginId . 'Modal',
    [...]
);

echo HTMLHelper::_('link', '#plugin' . $pluginId . 'Modal', 'Edit the plugin', 'data-bs-toggle="modal"');
```

New code:
```php
$doc->getWebAssetManager()
  ->useScript('joomla.dialog-autocreate');
    
$popupOptions = [
  'popupType'  => 'iframe',
  'textHeader' => 'Plugin parameters',
  'src'        => Route::_('index.php?option=com_plugins&client_id=0&task=plugin.edit&extension_id=' . $pluginId . '&tmpl=component&layout=modal', false),
];

echo HTMLHelper::_('link', '#', 'Edit the plugin', [
  'data-joomla-dialog'    => htmlspecialchars(json_encode($popupOptions, JSON_UNESCAPED_SLASHES)),
  'data-checkin-url'      => Route::_('index.php?option=com_plugins&task=plugins.checkin&format=json&cid[]=' . $pluginId),
  'data-close-on-message' => '',
  'data-reload-on-close'  => '',
]);
```

## Modal Editing for Modules Using `JoomlaDialog`

A popup for Module editing update from Bootstrap modal to JoomlaDialog.

PR [#42423](https://github.com/joomla/joomla-cms/pull/42423)

Old code:
```php
$link = Route::_('index.php?option=com_modules&task=module.edit&id=' . $moduleId . '&tmpl=component&layout=modal');

echo HTMLHelper::_(
    'bootstrap.renderModal',
    'moduleEdit' . $moduleId . 'Modal',
    [...]
);

echo HTMLHelper::_('link', 'moduleEdit' . $moduleId . 'Modal', 'Edit the module', 'data-bs-toggle="modal"');
```

New code:
```php
$doc->getWebAssetManager()
  ->useScript('joomla.dialog-autocreate');
    
$popupOptions = [
  'popupType'  => 'iframe',
  'textHeader' => 'Module parameters',
  'src'        => Route::_('index.php?option=com_modules&task=module.edit&id=' . $moduleId . '&tmpl=component&layout=modal', false),
];

echo HTMLHelper::_('link', '#', 'Edit the module', [
  'data-joomla-dialog'    => htmlspecialchars(json_encode($popupOptions, JSON_UNESCAPED_SLASHES)),
  'data-checkin-url'      => Route::_('index.php?option=com_modules&task=modules.checkin&format=json&cid[]=' . $moduleId),
  'data-close-on-message' => '',
  'data-reload-on-close'  => '',
]);
```
