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

Planned to be removed in Joomla! 6.0 alias added to the combat plugin in 5.0.

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

# Classes made final

##### \Joomla\CMS\Log\DelegatingPsrLogger
File: libraries/src/Log/DelegatingPsrLogger.php

Class becomes final and marked internal, therefore it cannot be overridden ([reasoning](https://github.com/joomla/joomla-cms/pull/39134#issuecomment-1316841537)).

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


# Language strings

File: administrator/language/en-GB/com_users.ini  
Strings: COM_USERS_MAIL_PLEASE_FILL_IN_THE_FORM_CORRECTLY, COM_USERS_MAIL_PLEASE_FILL_IN_THE_MESSAGE, COM_USERS_MAIL_PLEASE_FILL_IN_THE_SUBJECT, COM_USERS_MAIL_PLEASE_SELECT_A_GROUP

# Method deprecations

Planned to be removed in Joomla! 6.0

##### ArticlesLatestHelper static getList(Registry $params, ArticlesModel $model)

File: modules/mod_articles_latest/src/Helper/ArticlesLatestHelper.php
Replacement: $this->getArticles(Registry $params, SiteApplication $app)
Example:
```php
// Usally used in the module context which implements \Joomla\CMS\Helper\HelperFactoryAwareInterface
$articles = $this->getHelperFactory()->getHelper('ArticlesLatestHelper')->getArticles($data['params'], $this->getApplication());
```

##### ArticlesNewsHelper static getList(Registry $params, ArticlesModel $model)

File: modules/mod_articles_news/src/Helper/ArticlesNewsHelper.php
Replacement: $this->getArticles(Registry $params, SiteApplication $app)
Example:
```php
// Usally used in the module context which implements \Joomla\CMS\Helper\HelperFactoryAwareInterface
$articles = $this->getHelperFactory()->getHelper('ArticlesNewsHelper')->getArticles($data['params'], $this->getApplication());
```

#### CMSObject legacy traits

File: libraries/src/Object/CMSObject.php
Replacement: The CMSObject should be replaced by stdclass or \Joomla\Registry\Registry
Example:
```php
$data = new \stdClass();
// Or
$data = (object) ['foo' => 1, 'bar' => 2];
```

File: libraries/src/Object/LegacyErrorHandlingTrait.php
Replacement: The `setError` and `getError` functions should not be used anymore and an exception should be thrown.
Example:
```php
throw new \Exception(...);
```

File: libraries/src/Object/LegacyPropertyManagementTrait.php
Replacement: Dynamic properties should not be used anymore in regard to the deprecated [dynamic properties change in PHP 8.2](https://wiki.php.net/rfc/deprecate_dynamic_properties). Properties should be declared in the class and proper getter and setters be used.
Example:
```php
class MyDataObject {
    private $foo;
    
    public function getFoo() {
        return $foo;
    }
    
    public function setFoo($foo) {
        $this->foo = $foo;
    }
}
```
