---
sidebar_position: 3
---

Removed and backward incompatibility
===============
All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

### PSR-3 upgraded to version 3

The PSR-3 (Logging) is upgraded to [version 3](https://github.com/php-fig/log/tree/3.0.0) of the specification.

Most critically, the signature of the `\Psr\Log\LoggerInterface` methods has changed. The `$message` argument is now strongly typed as `string|\Stringable`. Any logger implementation you use **must** be compatible with this new signature. This is relevant to you if you implement your own logger, or if you are using a third party logger such as Monolog, in your extension.

If you are using your own logger, you want to preserve compatibility with Joomla 4 and 5 in the same extension package, and you do not mind losing PSR-3 compatibility you can include a copy of PSR-3 in your extension _as long as it's under your extension's namespace_. For example, instead of using `\Psr\Log\LoggerInterface` you could use `\Acme\Component\Example\Administrator\Log\LoggerInterface`. Note that you can use [PHP Scoper](https://github.com/humbug/php-scoper) to easily migrate your dependencies under your own namespace.

If you only need to maintain compatibilty with PSR-3 to use an logger external to your component, such as Joomla's logger, you can still typehint against `\Psr\Log\LoggerInterface`. Please note that the external logger you are using must be compatible with PSR-3 version 1 on Joomla 4 and PSR-3 version 3 on Joomla 5. If you are providing a third party, external logger yourself you may need to include two versions of the logger with your extension and only load the correct one for each Joomla version.

### Database must be injected in constructor model
- PR: https://github.com/joomla/joomla-cms/pull/38511
- Description: The database instance in the model should be injected through the `$this->setDatabase()` or the deprecated function `$this->setDbo()`  configuration in the constructor to make it available in the base class. Like that it is ensured that calls to `$this->getDatabase()` and the deprecated function `$this->getDbo()` will point to the same instance.

```php
class MyModel extends ListModel {
  public function __construct(..) {
    parent::__construct(...);
    $this->setDatabase(MyHelper::getGridDB());
  }
}
```

### CSS removals
The CSS class ".ie11" was removed [via PR #39018](https://github.com/joomla/joomla-cms/pull/39018)

### Language strings
File: administrator/language/en-GB/com_admin.ini
Strings: COM_ADMIN_A11Y_SETTINGS_FIELDSET_LABEL, COM_ADMIN_A11Y_SETTINGS_FIELD_CONTRAST, COM_ADMIN_A11Y_SETTINGS_FIELD_FONTSIZE, COM_ADMIN_A11Y_SETTINGS_FIELD_HIGHLIGHT, COM_ADMIN_A11Y_SETTINGS_FIELD_MONOCHROME

File: administrator/language/en-GB/com_media.ini 
Strings: COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_DESC, COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_LABEL

File: administrator/language/en-GB/com_users.ini 
Strings: COM_USERS_MAIL_PASSWORD_RESET_TITLE, COM_USERS_MAIL_PLEASE_FILL_IN_THE_MESSAGE, COM_USERS_MAIL_PLEASE_FILL_IN_THE_SUBJECT, COM_USERS_MAIL_PLEASE_SELECT_A_GROUP

File: administrator/language/en-GB/joomla.ini 
Strings: JFIELD_ALT_MODULE_LAYOUT_DESC, JFIELD_ASSET_ID_DESC, JFIELD_ASSET_ID_LABEL

File: administrator/language/en-GB/plg_system_debug.ini
Strings: PLG_DEBUG_BYTES, PLG_DEBUG_CALL_STACK, PLG_DEBUG_CALL_STACK_CALLER, PLG_DEBUG_CALL_STACK_FILE_AND_LINE, PLG_DEBUG_CALL_STACK_SAME_FILE, PLG_DEBUG_ERRORS, PLG_DEBUG_EXPLAIN, PLG_DEBUG_LANGUAGE_FILES_IN_ERROR, PLG_DEBUG_LANGUAGE_FILES_LOADED, PLG_DEBUG_LANG_LOADED, PLG_DEBUG_LANG_NOT_LOADED, PLG_DEBUG_LINK_FORMAT, PLG_DEBUG_LOGS, PLG_DEBUG_LOGS_DEPRECATED_FOUND_TEXT, PLG_DEBUG_LOGS_DEPRECATED_FOUND_TITLE, PLG_DEBUG_LOGS_LOGGED, PLG_DEBUG_MEMORY, PLG_DEBUG_MEMORY_USAGE, PLG_DEBUG_MEMORY_USED_FOR_QUERY, PLG_DEBUG_NO_PROFILE, PLG_DEBUG_OTHER_QUERIES, PLG_DEBUG_PROFILE, PLG_DEBUG_PROFILE_INFORMATION, PLG_DEBUG_QUERIES, PLG_DEBUG_QUERIES_LOGGED, PLG_DEBUG_QUERIES_TIME, PLG_DEBUG_QUERY_AFTER_LAST, PLG_DEBUG_QUERY_DUPLICATES, PLG_DEBUG_QUERY_DUPLICATES_FOUND, PLG_DEBUG_QUERY_DUPLICATES_NUMBER, PLG_DEBUG_QUERY_DUPLICATES_TOTAL_NUMBER, PLG_DEBUG_QUERY_EXPLAIN_NOT_POSSIBLE, PLG_DEBUG_QUERY_TIME, PLG_DEBUG_QUERY_TYPES_LOGGED, PLG_DEBUG_QUERY_TYPE_AND_OCCURRENCES, PLG_DEBUG_ROWS_RETURNED_BY_QUERY, PLG_DEBUG_SELECT_QUERIES, PLG_DEBUG_SESSION, PLG_DEBUG_TIME, PLG_DEBUG_TITLE, PLG_DEBUG_UNKNOWN_FILE, PLG_DEBUG_UNTRANSLATED_STRINGS, PLG_DEBUG_WARNING_NO_INDEX, PLG_DEBUG_WARNING_NO_INDEX_DESC, PLG_DEBUG_WARNING_USING_FILESORT, PLG_DEBUG_WARNING_USING_FILESORT_DESC

File: api/language/en-GB/joomla.ini 
Strings: FIELD_ALT_MODULE_LAYOUT_DESC, JFIELD_ASSET_ID_DESC, JFIELD_ASSET_ID_LABEL

File: installation/language/en-GB/joomla.ini
Strings: INSTL_MB_STRING_OVERLOAD_OFF, INSTL_NOTICE_MBSTRING_OVERLOAD_OFF

File: language/en-GB/com_media.ini 
Strings: COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_DESC, COM_MEDIA_FIELD_ILLEGAL_MIME_TYPES_LABEL


