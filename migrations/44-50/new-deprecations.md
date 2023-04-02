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

File: administrator/language/en-GB/com_media.ini
Strings: COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_DESC, COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_LABEL

File: administrator/language/en-GB/com_users.ini
Strings: COM_USERS_MAIL_PASSWORD_RESET_TITLE, COM_USERS_MAIL_PLEASE_FILL_IN_THE_MESSAGE, COM_USERS_MAIL_PLEASE_FILL_IN_THE_SUBJECT, COM_USERS_MAIL_PLEASE_SELECT_A_GROUP

File: administrator/language/en-GB/joomla.ini
Strings: JFIELD_ALT_MODULE_LAYOUT_DESC, JFIELD_ASSET_ID_DESC, JFIELD_ASSET_ID_LABEL

File: api/language/en-GB/joomla.ini
Strings: FIELD_ALT_MODULE_LAYOUT_DESC, JFIELD_ASSET_ID_DESC, JFIELD_ASSET_ID_LABEL

File: installation/language/en-GB/joomla.ini  
Strings: INSTL_MB_STRING_OVERLOAD_OFF, INSTL_NOTICE_MBSTRING_OVERLOAD_OFF

File: language/en-GB/com_media.ini
Strings: COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_DESC, COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_LABEL

#### The item_associations property of the WebApplication class is deprecated

File: libraries/src/Application/WebApplication.php
Replacement: The $item_associations property will be removed with no replacement as it is not used in core anymore.

#### Privacy plugin app property is deprecated

File: administrator/components/com_privacy/src/Plugin/PrivacyPlugin.php
Replacement: The `$this->app` property is deprecated in the privacy plugins. Instead of use `$this->getApplication()` when the plugin is converted to service providers.
