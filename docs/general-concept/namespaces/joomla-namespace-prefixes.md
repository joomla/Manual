---
sidebar_position: 1
title: Joomla Namespace Prefixes
---
# Joomla Namespace Prefixes

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
'Joomla\CMS\' points to libraries/src

'Joomla\SomethingElse\' points to libraries/vendor/somethingelse/src

eg 'Joomla\Event\' points to libraries/vendor/event/src

If a library classname doesn't start with 'Joomla' then it's going to be found in one of the other directories under libraries/vendor/. 

(Note that all the above is the general standard for Joomla code – you might however find the odd exception). 

If you look in administrator/cache/autoload_psr4.php you'll see all the namespace prefixes for Joomla component, modules and plugins, together with the associated position in the file system (and also the namespace prefixes of any installed extensions).