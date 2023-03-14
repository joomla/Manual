---
sidebar_position: 2
---

New deprecations
===============
All the new deprecations that should be aware of and what you should now be using instead.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

# Class deprecations

Planned to be removed in Joomla! 6.0

### Filesystem CMS package
The CMS Filesystem package can be found in libraries/src/Filesystem and will be completely replaced in 6.0 with the [Joomla Framework Filesystem](https://github.com/joomla-framework/filesystem) package. The CMS package and the Framework package are nearly 1-to-1 replacements for each other, however the Framework package uses Exceptions where appropriate instead of the old `setError` and `getError` which the CMS package uses.

In most cases you only have to change the namespace from `Joomla\CMS\Filesystem\*` to `Joomla\Filesystem\*`. To properly handle error cases, you will have to go through your code and catch the exceptions where necessary.  

* File: `libraries/src/Filesystem/File.php`<br>
  Class: `Joomla\CMS\Filesystem\File`<br>
  Replacement: `Joomla\Filesystem\File`

* File: `libraries/src/Filesystem/FilesystemHelper.php`<br>
  Class: `Joomla\CMS\Filesystem\FilesystemHelper`<br>
  Replacement: `Joomla\Filesystem\Helper`

* File: `libraries/src/Filesystem/Folder.php`<br>
  Class: `Joomla\CMS\Filesystem\Folder`<br>
  Replacement: `Joomla\Filesystem\Folder`

* File: `libraries/src/Filesystem/Patcher.php`<br>
  Class: `Joomla\CMS\Filesystem\Patcher`<br>
  Replacement: `Joomla\Filesystem\Patcher`

* File: `libraries/src/Filesystem/Path.php`<br>
  Class: `Joomla\CMS\Filesystem\Path`<br>
  Replacement: `Joomla\Filesystem\Path`

* File: `libraries/src/Filesystem/Stream.php`<br>
  Class: `Joomla\CMS\Filesystem\Stream`<br>
  Replacement: `Joomla\Filesystem\Stream`

* File: `libraries/src/Filesystem/Streams/StreamString.php`<br>
  Class: `Joomla\CMS\Filesystem\Streams\StreamString`<br>
  Replacement: `Joomla\Filesystem\Stream\StringWrapper`

* File: `libraries/src/Filesystem/Support/StringController.php`<br>
  Class: `Joomla\CMS\Filesystem\Support/StringController`<br>
  Replacement: `Joomla\Filesystem\Support\StringController`



