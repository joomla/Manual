---
sidebar_position: 1
title: Extension Events
toc_max_heading_level: 2
---

Extension Events
================

Extension events are triggered when Joomla installs, updates or uninstalls an extension,
when the configuration of an extension (such as a plugin, module, template style or component options) is saved or deleted,
and when Joomla itself is updated.

Except where noted below, Joomla imports the plugins in the `extension` group before dispatching these events,
so to capture them you should develop a plugin of type `extension`.
The events relating to updating Joomla itself are dispatched to plugins in the `installer` group.

For the events which Joomla triggers while it is processing the installation package
(for example when the Install / Extensions form is submitted) see [Installer Events](./installer.md),
and for an overview of how these events fit into the installation process see [Install Process](../../install-update/installation/install-process.md).

For background on obtaining arguments and returning results see [Plugin Methods and Arguments](../methods-and-arguments.md).

## onExtensionBeforeInstall

### Description

This event is triggered immediately before Joomla installs an extension, after it has found the extension's manifest file.

It is triggered by `Joomla\CMS\Installer\Installer::install()` and `Joomla\CMS\Installer\Installer::discover_install()`.
Note that this means:
- it is triggered when an extension is installed using any of the methods on the System / Install / Extensions page,
or using the `extension:install` CLI command,
**even if the extension is already installed** and Joomla actually processes the installation as an update
(use the [onExtensionBeforeUpdate](#onextensionbeforeupdate) event to capture updates made from the System / Update / Extensions page)
- it is triggered for each of the extensions inside a package, after it has been triggered for the package itself
- it is triggered when an extension is installed from the System / Install / Discover page

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\BeforeInstallEvent` has the following arguments:

- **`method`** - `install` if the extension is being installed from an installation package,
or `discover_install` if it is being installed from the Discover page.

- **`type`** - The type of extension being installed, eg `component`, `module`, `plugin`, `template`, `language`, `library`, `file` or `package`.

- **`manifest`** - The `SimpleXMLElement` containing the extension's manifest file, or null in the case of `discover_install`.

- **`extension`** - The id of the extension record in the `#__extensions` table in the case of `discover_install`, otherwise 0.

### Return Value

None. The installation cannot be aborted using this event.

## onExtensionAfterInstall

### Description

This event is triggered after Joomla has run the installation of an extension,
whether or not the installation was successful.
It is triggered in the same cases as [onExtensionBeforeInstall](#onextensionbeforeinstall).

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\AfterInstallEvent` has the following arguments:

- **`installer`** - A copy of the `Joomla\CMS\Installer\Installer` instance which installed the extension.
You can use it to obtain details of the extension, for example `$installer->getManifest()` returns the `SimpleXMLElement` of the extension's manifest file,
and `$installer->getPath('extension_root')` returns the folder into which the extension was installed.

- **`eid`** - The id of the extension in the `#__extensions` table, or `false` if the installation failed.

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Extension\AfterInstallEvent;

public function onExtensionAfterInstall(AfterInstallEvent $event): void
{
    $eid = $event->getEid();

    // Do nothing if the installation failed
    if ($eid === false) {
        return;
    }

    $manifest = $event->getInstaller()->getManifest();

    // Only handle the installation of plugins
    if ((string) $manifest['type'] !== 'plugin') {
        return;
    }

    $group = (string) $manifest['group'];

    // ... perform your processing of the newly installed plugin (extension id $eid) here
}
```

The core Extension - Joomla plugin (plugins/extension/joomla) uses this event to store the update sites defined in the extension's manifest file,
and the Extension - Namespace Map plugin (plugins/extension/namespacemap) uses it to regenerate the autoload namespace map.

## onExtensionBeforeUpdate

### Description

This event is triggered immediately before Joomla updates an extension, after it has found the extension's manifest file.

It is triggered by `Joomla\CMS\Installer\Installer::update()`,
which Joomla calls when an extension is updated from the System / Update / Extensions page.
If an extension is updated by installing a newer version from the System / Install / Extensions page
then [onExtensionBeforeInstall](#onextensionbeforeinstall) is triggered instead.

When a package is updated this event is triggered for the package itself,
but the extensions within the package are processed by the `install()` method,
so for each of those [onExtensionBeforeInstall](#onextensionbeforeinstall) is triggered.

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\BeforeUpdateEvent` has the following arguments:

- **`type`** - The type of extension being updated, eg `component`, `module`, `plugin`, `template`, `language`, `library`, `file` or `package`.

- **`manifest`** - The `SimpleXMLElement` containing the manifest file of the new version of the extension.

### Return Value

None. The update cannot be aborted using this event.

## onExtensionAfterUpdate

### Description

This event is triggered after Joomla has run the update of an extension, whether or not the update was successful.
It is triggered in the same cases as [onExtensionBeforeUpdate](#onextensionbeforeupdate).

It is also triggered for each installed extension (other than the core Joomla extensions) which has an update server defined in its manifest file
when the administrator clicks on the Rebuild button on the System / Update / Update Sites page.
In this case:
- only the core Extension - Joomla plugin is explicitly imported by Joomla before the event is dispatched,
so your plugin will receive the event only if it has already been loaded earlier in that request
- the `installer` argument is not the instance which installed the extension,
but a new `Installer` object into which Joomla has loaded the extension's manifest file
- the extension files themselves have not been changed

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\AfterUpdateEvent` has the following arguments:

- **`installer`** - A copy of the `Joomla\CMS\Installer\Installer` instance which updated the extension.

- **`eid`** - The id of the extension in the `#__extensions` table, or `false` if the update failed.

### Return Value

None.

## onExtensionBeforeUninstall

### Description

This event is triggered immediately before Joomla uninstalls an extension.
This happens when an extension is uninstalled from the System / Manage / Extensions page or by using the `extension:remove` CLI command.
When a package is uninstalled the event is triggered for the package and then for each of the extensions within the package.

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\BeforeUninstallEvent` has the following arguments:

- **`eid`** - The id of the extension in the `#__extensions` table.
As the extension has not yet been removed, you can use this to read the extension's record from the database.

### Return Value

None. The uninstall cannot be aborted using this event.

## onExtensionAfterUninstall

### Description

This event is triggered after Joomla has run the uninstall of an extension, whether or not it was successful.

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\AfterUninstallEvent` has the following arguments:

- **`installer`** - A copy of the `Joomla\CMS\Installer\Installer` instance which uninstalled the extension.

- **`eid`** - The id which the extension had in the `#__extensions` table.
Normally this record will already have been deleted when the event is triggered.

- **`removed`** - `true` if the extension was uninstalled successfully, otherwise `false`.

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Extension\AfterUninstallEvent;

public function onExtensionAfterUninstall(AfterUninstallEvent $event): void
{
    if (!$event->getRemoved()) {
        return;
    }

    $eid = $event->getEid();

    // ... remove any data which your plugin has stored relating to extension $eid
}
```

## onExtensionBeforeSave

### Description

This event is triggered at the Model level before the record of an extension is saved in the database.
Joomla triggers it (instead of [onContentBeforeSave](./content.md#oncontentbeforesave)) when:

| Action | Context |
| ------ | ------- |
| a plugin is saved in the administrator Plugins form | `com_plugins.plugin` |
| a module is saved in the administrator Modules form | `com_modules.module` |
| a template style is saved, or copied (duplicated) | `com_templates.style` |
| a content language is saved in System / Manage / Content Languages | `com_languages.language` |
| the Options of a component are saved | `com_config.component` |

### Event Arguments

The event class `\Joomla\CMS\Event\Model\BeforeSaveEvent` has the following arguments:

- **`context`** - The context of the save operation, as listed in the table above.
Use this to check whether you are in the desired context for the plugin.

- **`item`** - The `Table` object containing the data to be stored,
for example a `Joomla\CMS\Table\Extension` object in the case of plugins and component options,
or a `Joomla\CMS\Table\Module` object in the case of modules.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - A boolean which is set to `true` if the record is about to be created (as opposed to updated).
It is always `false` when the options of a component are saved.

- **`data`** - The data which is about to be saved, passed as an associative array.
This is null when a template style is copied.

As the `item` is the object which is about to be stored,
you can modify the data which Joomla saves by changing the properties of that object.

### Return Value

To abort the save add `false` to the event result:

```php
$event->addResult(false);
```

### Examples

```php
use Joomla\CMS\Event\Model\BeforeSaveEvent;
use Joomla\Registry\Registry;

public function onExtensionBeforeSave(BeforeSaveEvent $event): void
{
    if ($event->getContext() !== 'com_config.component') {
        return;
    }

    $table = $event->getItem();

    if ($table->element !== 'com_example') {
        return;
    }

    $params = new Registry($table->params);

    // ... change the component options as required, eg
    $params->set('last_saved', time());

    $table->params = $params->toString();
}
```

The core Extension - Joomla Update plugin (plugins/extension/joomlaupdate) uses this event in a similar way
to adjust the automated updates settings when the options of the Joomla Update component are saved.

## onExtensionAfterSave

### Description

This event is triggered at the Model level after the record of an extension has been saved in the database.
It is triggered (instead of [onContentAfterSave](./content.md#oncontentaftersave))
in the same cases as [onExtensionBeforeSave](#onextensionbeforesave), using the same contexts.

When a module is saved this event is dispatched twice:
once immediately after the module record is stored,
and once more after Joomla has stored the module's menu assignments.

### Event Arguments

The event class `\Joomla\CMS\Event\Model\AfterSaveEvent` has the following arguments:

- **`context`** - The context of the save operation, as listed in the table in [onExtensionBeforeSave](#onextensionbeforesave).

- **`item`** - The `Table` object containing the data which was stored.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - A boolean which is set to `true` if the record was created (as opposed to updated).

- **`data`** - The data which was saved, passed as an associative array.
This is null when a template style is copied.

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Model\AfterSaveEvent;

public function onExtensionAfterSave(AfterSaveEvent $event): void
{
    if ($event->getContext() !== 'com_plugins.plugin') {
        return;
    }

    $plugin = $event->getItem();

    if ($plugin->folder === 'system' && $plugin->element === 'example') {
        // ... the options of plg_system_example have been changed
    }
}
```

The core Action Log - Joomla plugin (plugins/actionlog/joomla) uses this event to record changes to the configuration of extensions in the User Actions Log.

## onExtensionBeforeDelete

### Description

This event is triggered at the Model level before a module or a template style is deleted.
Joomla triggers it (instead of [onContentBeforeDelete](./content.md#oncontentbeforedelete)) when:

| Action | Context |
| ------ | ------- |
| a trashed module is deleted in the administrator Modules page | `com_modules.module` |
| a template style is deleted | `com_templates.style` |

### Event Arguments

The event class `\Joomla\CMS\Event\Model\BeforeDeleteEvent` has the following arguments:

- **`context`** - The context of the delete operation, as listed in the table above.

- **`item`** - The `Table` object containing the record which is about to be deleted.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

### Return Value

To abort the deletion add `false` to the event result:

```php
$event->addResult(false);
```

## onExtensionAfterDelete

### Description

This event is triggered at the Model level after a module or a template style has been deleted.
It is triggered in the same cases as [onExtensionBeforeDelete](#onextensionbeforedelete), using the same contexts.

### Event Arguments

The event class `\Joomla\CMS\Event\Model\AfterDeleteEvent` has the following arguments:

- **`context`** - The context of the delete operation, as listed in the table in [onExtensionBeforeDelete](#onextensionbeforedelete).

- **`item`** - The `Table` object containing the record which was deleted.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

### Return Value

None.

## onExtensionChangeState

### Description

This event is triggered when extensions are enabled or disabled on the System / Manage / Extensions page.

Note that the event is dispatched once for each of the selected extensions, immediately before the new state of that extension is stored,
but each time the `pks` argument contains the ids of all the selected extensions.
The event is also dispatched for protected extensions, even though Joomla doesn't change their state.

Enabling or disabling a plugin on the System / Manage / Plugins page, or publishing or unpublishing a module on the Modules page,
doesn't trigger this event. These pages dispatch [onContentBeforeChangeState](./content.md#oncontentbeforechangestate)
and [onContentChangeState](./content.md#oncontentchangestate) instead,
with the context `com_plugins.plugin` or `com_modules.module`.

### Event Arguments

The event class `\Joomla\CMS\Event\Model\BeforeChangeStateEvent` has the following arguments:

- **`context`** - This is set to `com_installer.manage`.

- **`pks`** - An array of the ids (in the `#__extensions` table) of the extensions which are being enabled or disabled.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`value`** - The new state of the extensions: 1 for enabled, 0 for disabled.

### Return Value

None. The return value is ignored by Joomla, so you can't use this event to prevent the change of state.

## onJoomlaBeforeUpdate

### Description

This event is triggered when Joomla is about to be updated using the Joomla Update component,
just before Joomla writes the file which is used by the update process to extract the update package.
This also happens for automated updates, in which case this event is triggered before [onBeforeJoomlaAutoupdate](#onbeforejoomlaautoupdate).

Joomla imports the plugins in the `installer` group before dispatching this event.

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\BeforeJoomlaUpdateEvent` has no arguments.

### Return Value

None.

### Examples

The core Installer - Override plugin (plugins/installer/override) uses this event
to record the core files for which template overrides exist,
so that it can check them in the [onJoomlaAfterUpdate](#onjoomlaafterupdate) event.

## onJoomlaAfterUpdate

### Description

This event is triggered at the end of the update of Joomla using the Joomla Update component,
after the update package has been extracted and the database has been updated, and the temporary update files have been removed.
This includes automated updates.

Joomla imports the plugins in the `installer` group before dispatching this event.

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\AfterJoomlaUpdateEvent` has the following arguments:

- **`oldVersion`** - The version of Joomla before the update, eg `6.1.2`. This is an empty string if the old version isn't known.

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Extension\AfterJoomlaUpdateEvent;

public function onJoomlaAfterUpdate(AfterJoomlaUpdateEvent $event): void
{
    $oldVersion = $event->getOldVersion();

    if ($oldVersion !== '' && version_compare($oldVersion, '6.0.0', '<')) {
        // ... the site has just been upgraded from Joomla 5 (or earlier) to Joomla 6
    }
}
```

## onBeforeJoomlaAutoupdate

### Description

This event is triggered when the Joomla automated updates service asks the site to prepare an automatic update of Joomla,
after the update package has been downloaded and checked, but before the update is started.
It allows a plugin to prevent the automated update from going ahead.

Joomla imports the plugins in the `installer` group before dispatching this event.

Note that the event class is listed against the name `onJoomlaBeforeAutoupdate` in `Joomla\CMS\Event\CoreEventAware`,
but Joomla dispatches the event using the name `onBeforeJoomlaAutoupdate`, so this is the name which your plugin must subscribe to.

### Event Arguments

The event class `\Joomla\CMS\Event\Extension\BeforeJoomlaAutoupdateEvent` has no arguments that you need to read.

### Return Value

To prevent the automated update call `$event->stopUpdate()`.
This also stops the event from being passed to any further plugins.
Joomla will then write the message "Update stopped by plugin." to the update log, and return an error response to the automated updates service instead of performing the update.

### Examples

```php
use Joomla\CMS\Event\Extension\BeforeJoomlaAutoupdateEvent;

public static function getSubscribedEvents(): array
{
    return [
        'onBeforeJoomlaAutoupdate' => 'onBeforeJoomlaAutoupdate',
    ];
}

public function onBeforeJoomlaAutoupdate(BeforeJoomlaAutoupdateEvent $event): void
{
    // Only allow automated updates of Joomla during the night
    $hour = (int) date('G');

    if ($hour >= 6 && $hour < 22) {
        $event->stopUpdate();
    }
}
```
