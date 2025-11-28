---
sidebar_position: 1
title: Installer Events
toc_max_heading_level: 2 
---

Installer Events
================


Installer plugin events are triggered when some routines are performed during the install process of extensions or when their update sites are downloaded.

For an overview of how a number of these events fit into the installation process see [Install Process](../../install-update/installation/install-process.md).
(Note that the onExtensionBeforeInstall and onExtensionAfterInstall events aren't covered here).

For background on Joomla transitioning to using classes for events see [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md), 
where you can also find explanations for [accessing the arguments](../joomla-4-and-5-changes.md#summary---accessing-event-arguments) 
and [returning values](../joomla-4-and-5-changes.md#summary---returning-values). 

## onInstallerAddInstallationTab

### Description

This event is triggered when Joomla is building the form in the administrator Install / Extensions page.

### Event Arguments

The event class `\Joomla\CMS\Event\Installer\AddInstallationTabEvent` has no arguments.

### Return Value

Return the contents of the additional tab which you want to include in the options for install.

### Examples

The Joomla core uses this mechanism to create the tabs "Upload Package File", "Install from Folder" etc. 
You should look at these install plugins and follow them as exemplars. 

## onInstallerBeforePackageDownload

### Description

This event will be executed before an installable package (zip file) of an extension (package, component, module, plugin, template, library) is downloaded. It allows plugins to modify the url or headers for the request. 


### Event Arguments

The event class `\Joomla\CMS\Event\Installer\BeforePackageDownloadEvent` has the following arguments:


- **`url`** - The url of the package.

- **`headers`** - The headers which are sent with the request.

### Return Value

None.

### Examples

```php
public function onInstallerBeforePackageDownload(\Joomla\CMS\Event\Installer\BeforePackageDownloadEvent $event): void
{
    $event->updateUrl($event->getUrl() . '?auth=foo');
}
```

## onInstallerBeforeInstallation

### Description

This event is triggered at the beginning of an installation operation. 

### Event Arguments

The event class `\Joomla\CMS\Event\Installer\BeforeInstallationEvent` has the following arguments:

- **`subject`** - This will be the FQN of the install model class Joomla\Component\Installer\Administrator\Model\InstallModel

Note that there is no getter for the subject argument. Instead you should use:

```php
public function onInstallerBeforeInstallation(\Joomla\CMS\Event\Installer\BeforeInstallationEvent $event): void
{
    $args = $event->getArguments();
    $subject = $args['subject'];
}
```

- **`package`** - This is null. 

The **`package`** is passed by reference, so you can update it, but this approach is deprecated 
and you should view the documentation for more up-to-date versions to understand what will change. 

### Return Value

A return value of true will cause the Joomla installer to exit with true (indicating that the extension was installed).

A return value of false will cause the Joomla installer to exit with false (indicating that the extension installation failed).

If you don't set a return value then the installation will continue as normal. 

## onInstallerBeforeInstaller

### Description

This event is triggered after the extension code has been obtained, and any extraction of zip files performed,
but before Joomla has started to process the extension's installation files. 

### Event Arguments

The event class `\Joomla\CMS\Event\Installer\BeforeInstallerEvent` has the following arguments:

- **`subject`** - This will be the FQN of the install model class Joomla\Component\Installer\Administrator\Model\InstallModel

Note that there is no getter for the subject argument. Instead you should use:

```php
public function onInstallerBeforeInstaller(\Joomla\CMS\Event\Installer\BeforeInstallerEvent $event): void
{
    $args = $event->getArguments();
    $subject = $args['subject'];
}
```

- **`package`** - This is an array of 4 elements, which in the case of uploading a zip file will contain:
 
   - extractdir - the directory into which the zip file has been extracted
   - packagefile - the location of the zip file
   - dir - the directory containing the extension manifest file, and the other installation files
   - type - the type of extension (eg "plugin")

The array elements vary depending upon how the installation code is selected. 
For example, for "Install from Folder" the extractdir and packagefile elements will be null.

The **`package`** is passed by reference, so you can update it, but this approach is deprecated 
and you should view the documentation for more up-to-date versions to understand what will change. 

### Return Value

A return value of true will cause the Joomla installer to exit with true (indicating that the extension was installed).

A return value of false will cause the Joomla installer to exit with false (indicating that the extension installation failed).

If you don't set a return value then the installation will continue as normal. 

## onInstallerAfterInstaller

### Description

This event is triggered after extension has been installed. 

### Event Arguments

The event class `\Joomla\CMS\Event\Installer\AfterInstallerEvent` has the following arguments:

- **`subject`** - This will be the FQN of the install model class Joomla\Component\Installer\Administrator\Model\InstallModel

Note that there is no getter for the subject argument. Instead you should use:

```php
public function onInstallerAfterInstaller(\Joomla\CMS\Event\Installer\AfterInstallerEvent $event): void
{
    $args = $event->getArguments();
    $subject = $args['subject'];
}
```

- **`package`** - The package which has been installed, in the form described in onInstallerBeforeInstaller above.

- **`installer`** - The installer class - Joomla sets this to "Joomla\CMS\Installer\Installer"

- **`installerResult`** - true or false, depending upon whether the package was successfully installed or not 

- **`message`** - The message output to the administrator, eg "Installation of the plugin was successful."

### Return Value

Any return value has limited affect, as the extension has already been installed at this stage.

The **`installerResult`** and **`message`** are passed by reference, so you can update them, but this approach is deprecated 
and you should view the documentation for more up-to-date versions to understand what will change. 