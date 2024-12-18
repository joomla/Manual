---
sidebar_position: 1
title: Installer Events
toc_max_heading_level: 2 
---

Installer Events
================


Installer plugin events are triggered when some routines are performed during the install process of extensions or when their update sites are downloaded.

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

## onInstallerBeforeUpdateSiteDownload

### Description

This event will be executed before an update site is downloaded. It allows to modify the url or headers for the request. 

### Event Arguments

The event class `\Joomla\CMS\Event\Installer\BeforeUpdateSiteDownloadEvent` has the following arguments:


- **`url`** - The url of the update site.

- **`headers`** - The headers which are sent with the request.

### Return Value

None.

### Examples

```php
public function onInstallerBeforeUpdateSiteDownload(\Joomla\CMS\Event\Installer\BeforeUpdateSiteDownloadEvent $event): void
{
    $event->updateUrl($event->getUrl() . '?auth=foo');
}
```
