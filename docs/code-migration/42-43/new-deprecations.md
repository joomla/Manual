---
sidebar_position: 2
---

New deprecations
===============
All the new deprecations that should be aware of and what you should now be using instead.

:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

# File deprecations

As part of restructuring it's possible that files get moved or classes get a namespace.
Normally when a class get a namespace or gets moved to a new directory we also remove
the file from the old location.
As b/c enhancement Joomla! keep files which to be known to be included/required directly
for legacy reasons. For example in Joomla 4 component helpers get moved from 
`components/helpers/banners.php` to `components/src/Helper/bannersHelper.php` and the class
get a namespace `\Joomla\Component\Banners\Administrator\Helper\BannersHelper`.

The class will be aliased in `libraries/classmap.php` or `libraries/extensions.classmap.php`.
In the next major version all aliases will be moved to the combat plugin. The file will be
kept till the next major version, in this version file and alias will be removed.

:::caution TODO

The section above should be moved to the deprecation strategy.

:::

Planned to be removed in Joomla! 6.0 alias added to the combat plugin.

* administrator/components/com_banners/helpers/banners.php
* administrator/components/com_categories/helpers/categories.php
* administrator/components/com_contact/helpers/contact.php
* administrator/components/com_content/helpers/content.php
* administrator/components/com_contenthistory/helpers/contenthistory.php
* administrator/components/com_fields/helpers/fields.php
* administrator/components/com_installer/helpers/installer.php
* administrator/components/com_menus/helpers/menus.php
* administrator/components/com_modules/helpers/modules.php
* administrator/components/com_newsfeeds/helpers/newsfeeds.php
* administrator/components/com_plugins/helpers/plugins.php
* administrator/components/com_redirect/helpers/redirect.php
* administrator/components/com_templates/helpers/template.php
* administrator/components/com_templates/helpers/templates.php
* administrator/components/com_users/helpers/users.php


* components/com_contact/helpers/route.php
* components/com_finder/helpers/route.php
* components/com_newsfeeds/helpers/route.php
* components/com_tags/helpers/route.php


# Class deprecations

Planned to be removed in Joomla! 6.0

##### BannersHelper

File: administrator/components/com_banners/helpers/banners.php  
Replacement: \Joomla\Component\Banners\Administrator\Helper\BannersHelper

##### CategoriesHelper

File: administrator/components/com_categories/helpers/categories.php  
Replacement: \Joomla\Component\Categories\Administrator\Helper\CategoriesHelper

##### ContactHelper

File: administrator/components/com_contact/helpers/contact.php
Replacement: \Joomla\Component\Contact\Administrator\Helper\ContactHelper

##### ContentHelper

File: administrator/components/com_content/helpers/content.php
Replacement: \Joomla\Component\Content\Administrator\Helper\ContentHelper

##### ContenthistoryHelper

File: administrator/components/com_contenthistory/helpers/contenthistory.php
Replacement: \Joomla\Component\Contenthistory\Administrator\Helper\ContenthistoryHelper

##### FieldsHelper

File: administrator/components/com_fields/helpers/fields.php
Replacement: \Joomla\Component\Fields\Administrator\Helper\FieldsHelper

##### InstallerHelper

File: administrator/components/com_installer/helpers/installer.php
Replacement: \Joomla\Component\Installer\Administrator\Helper\InstallerHelper

##### MenusHelper

File: administrator/components/com_menus/helpers/menus.php
Replacement: \Joomla\Component\Menus\Administrator\Helper\MenusHelper

##### ModulesHelper

File: administrator/components/com_modules/helpers/modules.php
Replacement: \Joomla\Component\Modules\Administrator\Helper\ModulesHelper

##### NewsfeedsHelper

File: administrator/components/com_newsfeeds/helpers/newsfeeds.php
Replacement: \Joomla\Component\Newsfeeds\Administrator\Helper\NewsfeedsHelper

##### PluginsHelper

File: administrator/components/com_plugins/helpers/plugins.php
Replacement: \Joomla\Component\Plugins\Administrator\Helper\PluginsHelper

##### RedirectHelper

File: administrator/components/com_redirect/helpers/redirect.php
Replacement: \Joomla\Component\Redirect\Administrator\Helper\RedirectHelper

##### TemplateHelper

File: administrator/components/com_templates/helpers/template.php
Replacement: \Joomla\Component\Templates\Administrator\Helper\TemplateHelper

##### TemplatesHelper

File: administrator/components/com_templates/helpers/templates.php
Replacement: \Joomla\Component\Templates\Administrator\Helper\TemplatesHelper

##### UsersHelperDebug

File: administrator/components/com_users/helpers/debug.php
Replacement: Joomla\Component\Users\Administrator\Helper\DebugHelper\UsersHelperDebug

##### UsersHelper

File: administrator/components/com_users/helpers/users.php
Replacement: \Joomla\Component\Users\Administrator\Helper\UsersHelper

##### ContactHelperRoute

File: components/com_contact/helpers/route.php
Replacement: Joomla\Component\Contact\Site\Helper\RouteHelper

##### FinderHelperRoute

File: components/com_finder/helpers/route.php
Replacement: Joomla\Component\Finder\Site\Helper\RouteHelper

##### NewsfeedsHelperRoute

File: components/com_newsfeeds/helpers/route.php
Replacement: Joomla\Component\Newsfeeds\Site\Helper\RouteHelper

##### TagsHelperRoute

File: components/com_tags/helpers/route.php
Replacement: Joomla\Component\Tags\Site\Helper\RouteHelper

##### 

File: 
Replacement: 

##### 

File: 
Replacement: 
