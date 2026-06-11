---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removed legacy article moduels
- PR: https://github.com/joomla/joomla-cms/pull/47910
- Description: With the introduction of module mod_articles in 5.2 the following modules are not longer supported and are in legacy mode. They will no longer be dispatched as modules in Joomla Core. 
- Folders: 
  - /modules/mod_articles_archived
  - /modules/mod_articles_category
  - /modules/mod_articles_latest
  - /modules/mod_articles_news
  - /modules/mod_articles_popular
- Files
  - /languages/en-GB/mod_articles_archived.ini
  - /languages/en-GB/mod_articles_archived.sys.ini
  - /languages/en-GB/mod_articles_category.ini
  - /languages/en-GB/mod_articles_category.sys.ini
  - /languages/en-GB/mod_articles_latest.ini
  - /languages/en-GB/mod_articles_latest.sys.ini
  - /languages/en-GB/mod_articles_news.ini
  - /languages/en-GB/mod_articles_news.sys.ini
  - /languages/en-GB/mod_articles_popular.ini
  - /languages/en-GB/mod_articles_popular.sys.ini


## Removed featured classes
- PR: https://github.com/joomla/joomla-cms/pull/43907
- Description: Since j6.0 the featured Model and view are integrated into articles and no longer used.
- Files
  - \administrator\components\com_content\src\Model\FeaturedModel.php
  - \administrator\components\com_content\src\View\HtmlView.php

- PR: https://github.com/joomla/joomla-cms/pull/47941
- Description: Since j6.0 the featured Controller is no longer used.
- Files
  - \administrator\components\com_content\src\Controller\FeaturedController.php
