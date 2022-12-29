---
sidebar_position: 3
---

:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::


# Removed and backward incompatibility

Most of the code deprecated in Joomla! 3.x has been removed. Some Deprecations
have been moved to the [combat plugin](combat-plugin.md).
There should be an explanation of how to mitigate the removals / changes.

## Removed files

The following files hasn't been removed to prevent code which directly include
these files to thru an fatal error.

Migration: Remove the require/include class and use autoloading to load the class

* administrator/components/com_finder/helpers/language.php
* administrator/components/com_finder/helpers/indexer/adapter.php
* administrator/components/com_finder/helpers/indexer/helper.php
* administrator/components/com_finder/helpers/indexer/parser.php
* administrator/components/com_finder/helpers/indexer/query.php
* administrator/components/com_finder/helpers/indexer/result.php
* administrator/components/com_finder/helpers/indexer/taxonomy.php
* administrator/components/com_finder/helpers/indexer/token.php

:::caution TODO

to be continued

:::

## Modified function signatures

##### Removed second parameter `$clientId = 0` in function cleanCache this parameter is no longer used

* administrator/components/com_categories/src/Model/CategoryModel.php
* administrator/components/com_content/src/Model/ArticleModel.php
* administrator/components/com_fields/src/Model/FieldModel.php
* administrator/components/com_finder/src/Model/FilterModel.php
* administrator/components/com_fields/src/Model/GroupModel.php
* administrator/components/com_languages/src/Model/LanguageModel.php
* administrator/components/com_languages/src/Model/LanguagesModel.php
* administrator/components/com_menus/src/Model/ItemModel.php
* administrator/components/com_menus/src/Model/MenuModel.php
* administrator/components/com_modules/src/Model/ModuleModel.php
* administrator/components/com_plugins/src/Model/PluginModel.php
* administrator/components/com_templates/src/Model/StyleModel.php

##### Return Types
All return types have been updated to match the PHP 8.1 return type signatures added. This address any class utilising the ArrayAccess interface, the Datetime interface and the JsonSerializable interface. If you extend from any of the affected classes and require compatibility with both Joomla 4.x and 5.x you should add the `#[\ReturnTypeWillChange]` annotation to your code.


:::caution TODO

to be continued

:::
