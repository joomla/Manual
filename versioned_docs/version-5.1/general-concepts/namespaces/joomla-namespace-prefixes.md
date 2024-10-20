---
sidebar_position: 2
title: Joomla Namespace Prefixes
---

Joomla Namespace Prefixes
=========================

Joomla holds namespace prefixes and their mapping to the position in the file system for the following:

## Components

`'Joomla\Component\<Component name>\Administrator\'` points to `administrator/components/com_<component name>/src`

`'Joomla\Component\<Component name>\Site\'` points to `components/com_<component name>/src`

`'Joomla\Component\<Component name>\Api\'` points to `api/components/com_<component name>/src`

eg 'Joomla\Component\Content\Administrator\' points to administrator/components/com_content/src

## Modules

`'Joomla\Module\<Module name>\Administrator\'` points to `administrator/modules/mod_<module name>/src`

`'Joomla\Module\<Module name>\Site\'` points to `modules/mod_<module name>/src`

eg 'Joomla\Module\Login\Site\' points to modules/mod_login/src

## Plugins

`'Joomla\Plugin\<Plugin type>\<Plugin name>\'` points to `plugins/<plugin type>/<plugin name>/src`

eg 'Joomla\Plugin\Fields\Calendar' points to plugins/fields/calendar/src

## Library Classes

'Joomla\CMS\' points to libraries/src. Note that these are the classes which are described in the [API docs](https://api.joomla.org/) on the [Joomla CMS](cms-api://index.html) side. 

'Joomla\SomethingElse\' points to libraries/vendor/somethingelse/src. 

eg 'Joomla\Event\' points to libraries/vendor/event/src

Note that these are the classes which are described in the [API docs](https://api.joomla.org/) on the [Framework](framework-api://index.html) side. 

(As an aside, just be aware that if a class on the CMS side inherits from a class on the framework side, then not all of the methods available might be in the API docs. For example, the class Joomla\CMS\Application\WebApplication has methods such as `setHeader` because it extends [Joomla\Application\AbstractWebApplication](framework-api://classes/Joomla-Application-AbstractWebApplication.html), but this function isn't listed in [WebApplication API doc](https://api.joomla.org/cms-4/classes/Joomla-CMS-Application-WebApplication.html).)

If a library classname doesn't start with 'Joomla' then it's going to be found in one of the other directories under libraries/vendor/. 

(Note that all the above is the general standard for Joomla code – you might however find the odd exception). 

If you look in administrator/cache/autoload_psr4.php you'll see all the namespace prefixes for Joomla component, modules and plugins, together with the associated position in the file system (and also the namespace prefixes of any installed extensions).

## Duplicate class names

Before namespacing was introduced Joomla had a lot of duplicate classnames, eg. for com_example the MVC model code would be in the class ExampleModelExample for both site and administrator, with both classes in the global namespace. This presented an obstacle to sharing code - you couldn't just have your site model class inheriting from your admin model class, for instance.

With Joomla namespacing, the FQNs of the site and administrator model are different, as they're in different namespaces. This makes it very easy to share code between them - you just have to let one model class inherit from the other.

```php
<?php
namespace Mycompany\Component\Example\Site\Model;

use Mycompany\Component\Example\Administrator\ExampleModel as AdministratorModel;

class ExampleModel extends AdministratorModel {
```

A word of warning: although Joomla has unique FQNs for all the classes, **there are some Joomla library classes which share the same last segment of the FQN**, for example:

- Registry may refer to Joomla\Registry\Registry (a utility class for holding data structures) or Joomla\CMS\HTML\Registry (a class for holding snippets of HTML used in `HtmlHelper::_()` calls)

- CategoryFactory may refer to Joomla\CMS\Extension\Service\Provider\CategoryFactory or Joomla\CMS\Categories\CategoryFactory - there are several similar instances where the same last segment of the FQN may refer to the Factory class, or to the service provider class which registers the Factory class in the dependency injection container.

- DispatcherInterface may refer to Joomla\CMS\Dispatcher\DispatcherInterface (the DispatcherInterface for components and modules) or Joomla\Event\DispatcherInterface (the DispatcherInterface for plugins).

You just need to be careful to examine the `use` statement to see exactly which class is being referred to.
