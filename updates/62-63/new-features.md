---
sidebar_position: 1
---

New Features
============

:::tip[Developer Note]
Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

## Sanitize file names on upload

The Media Manager can now clean up the names of uploaded files, for example `My Holiday Photo 2025.JPG` becomes `my-holiday-photo-2025.jpg`.
The options are in the new **File Names** tab of the Media options:

- **Sanitize File Names**: enabled for new installations, disabled for sites updated from an earlier version
- **Replace Spaces With**: hyphen, underscore, dot or nothing
- **Lower Case**
- **Transliterate to ASCII**: when disabled, letters and numbers of any script are kept (`Запрос Фото.png` becomes `запрос-фото.png`).
When enabled, the transliterator of the active language is used first.

Characters which are unsafe in a file name are always removed.
The check for an existing file uses the sanitized name, so uploading `test a.jpg` when `test-a.jpg` exists asks before overwriting it.
Only uploads are affected, existing files are not renamed.

- **PR**: [#48957](https://github.com/joomla/joomla-cms/pull/48957)
- **Discussion**: [#48796](https://github.com/joomla/joomla-cms/discussions/48796)
- **New methods**: `Joomla\CMS\Helper\MediaHelper::sanitizeFileName()` and `MediaHelper::isFileNameSanitizingEnabled()`.
Extensions which store uploaded files themselves can use them to name files the same way as the Media Manager.
- **Usage**:
  ```php
  use Joomla\CMS\Helper\MediaHelper;

  if (MediaHelper::isFileNameSanitizingEnabled()) {
      // Uses the com_media options, pass a Registry as second argument to use other options
      $fileName = MediaHelper::sanitizeFileName($fileName);
  }
  ```
