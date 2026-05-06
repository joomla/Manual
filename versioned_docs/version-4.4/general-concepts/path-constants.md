---
title: Path Constants
---

Path Constants
==============

Joomla sets up a number of path constants which point to various directories within the Joomla instance.

You can use these within your code if you're wanting to perform file operations on files within the directories.

These paths are the absolute paths of these locations within the file system, NOT the path you'd use in a URL; see [URLs](./url.md).

Several of these path constants are fixed, in that they always point to specific directories.
They're generally defined in the includes/defines.php files. 
Note that there is no trailing slash on the directory.

Others vary depending upon the application and component which are being executed.

The fixed path constants are:

| Path Constant       | Description                             |
| ------------------- | --------------------------------------- |
| JPATH_ROOT          | Root directory of the Joomla instance |
| ------------------- |   |
| JPATH_SITE          | Path to the Joomla site - where the front-end index.php is located |
| JPATH_ADMINISTRATOR | Path to the Joomla administrator - where the administrator index.php is located |
| JPATH_API           | Path to the api folder - where the api index.php is located |
| JPATH_CLI           | Path to the cli folder - where the joomla.php is located (which is run for console jobs) |
| ------------------- |   |
| JPATH_CONFIGURATION | Path to the folder which contains the global config configuration.php file |
| JPATH_CACHE         | Path to the cache folder |
| JPATH_MANIFESTS     | Path to the folder where manifests are stored (by default /administrator/manifests) |
| JPATH_INSTALLATION  | Path to the Joomla installation folder (see note 2 below) |
| JPATH_LIBRARIES     | Path to the libraries folder |
| JPATH_PLUGINS       | Path to the plugins folder |
| JPATH_THEMES        | Path to the templates folder |

Notes

1. The installation folder (/installation) contains the code used to install Joomla. 
Joomla deletes this folder after installation.

The following path constants vary depending upon the context

| Path Constant       | Description                             |
| ------------------- | --------------------------------------- |
| JPATH_BASE          | Root directory of the current application (see note 1 below) |

Notes

1. JPATH_BASE is set to be the same as JPATH_SITE / JPATH_ADMINISTRATOR / JPATH_API / JPATH_CLI,
depending on which Joomla application is being executed.

2. Joomla also currently defines JPATH_COMPONENT, JPATH_COMPONENT_ADMINISTRATOR and JPATH_COMPONENT_SITE,
which point to the component folder. 
However these are deprecated with removal scheduled in Joomla 7, so you should avoid using them.
