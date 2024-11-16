---
sidebar_position: 1
---

# New features

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

#### Media: a new folder for documents and other non image files
Until now by default Joomla had only `/images` folder in Media manager for upload.
Starting from 5.2 version Joomla have additional `/files` folder for non image files, for new installations.

Existing installations will not be affected. 
To add it to existing installation, have to:
- Configure **Media** component and set **Path to Files Folder** option to `files`;
- Configure **FileSystem - Local** plugin and add `files` to list of directories, additionally to existing `images`;


PR: https://github.com/joomla/joomla-cms/pull/43532
