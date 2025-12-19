---
sidebar_position: 1
title: Module Events
toc_max_heading_level: 2 
---

Module Events
=============

Module Events are triggered when Joomla processes the modules to obtain the HTML output to include in the HTTP response.

For a plugin to capture these events it should be defined as a system plugin. 

:::warning
  System plugins are loaded every time Joomla runs, on both the site front-end and administrator back-end. 
If you have a PHP syntax error in a system plugin then you will get locked out of the Joomla administrator back-end, 
and will have to go into phpmyadmin (or equivalent) to set to 0 the `enabled` field within the plugin record in the `#__extensions` table. 
:::

For background on obtaining arguments and returning results see [Plugin Methods and Arguments](../methods-and-arguments.md).

## Joomla Overview

Joomla processes the modules after it has obtained the component output and determined the template to use,
and is processing elements such as `<jdoc:include type="modules" name="topbar" style="none" />` 
within the template file (eg templates/cassiopeia/index.php).

There are 2 stages to Joomla obtaining the module output:

1. It obtains the list of modules which should be displayed on the requested web page

2. It renders each of these modules. (In other words, it runs each of these modules to obtain its output, 
and then includes the output in the HTML to return to the client.)

### Obtaining the List of Modules

This is handled in ModuleHelper::load() (in libraries/src/Helper/ModuleHelper.php).

- trigger *onPrepareModuleList* - your plugin can return a list of modules, 
and then Joomla will use your list instead of performing the next step
- Joomla reads from the database the list of modules to display, taking into account the Module Menu Assignment options,
but only those where the module is included on pages
- trigger *onAfterModuleList* - your plugin can update the list of modules
- Joomla cleans the module list, by removing those which the Module Menu Assignment options define as being excluded on this page 
- trigger *onAfterCleanModuleList* - your plugin can update the list of modules

After this, Joomla has the definitive set of modules to use for the requested web page.

### Rendering the Modules

Joomla processes in turn each `<jdoc:include type="modules" name=<template position>...>` in the template file,
and this will involve rendering each of the modules which is using that template position. 

For each template position Joomla does the following:

- For each module using that template position 
  - run the module and capture its raw output
  - trigger *onRenderModule* 
  - add the HTML wrapper (chrome style) as defined in the Module Advanced tab / Module Style 
  (if set to "Inherited" then it will use the style defined in the template file)
  - trigger *onAfterRenderModule* 
  - add the HTML to the buffer containing the HTML for that template position

- Then (after all the modules for a template position have been rendered) trigger *onAfterRenderModules* 

## onPrepareModuleList

### Description

This event is triggered before Joomla obtains the list of modules to run. 

You can use this event to define the modules which Joomla will use.

### Event Arguments

The event class \Joomla\CMS\Event\Module\PrepareModuleListEvent has the following arguments:

- **`modules`** - the array of modules (which at this stage is an empty array), available via `$event->getModules()`

- **`subject`** - null (not used)

### Return Value

You can define the set of modules which Joomla will use by 

```php
$event->updateModules($modules);
```

where `$modules` is an array of the modules, each of which must have the same properties as the variable in the Joomla source code. 

## onAfterModuleList

### Description

This event is triggered after Joomla has obtained the list of modules to run, but before the list is cleaned. 

You can use this event to alter the modules which Joomla will use.

### Event Arguments

The event class \Joomla\CMS\Event\Module\AfterModuleListEvent has the following arguments:

- **`modules`** - the array of modules, available via `$event->getModules()`

- **`subject`** - null (not used)

### Return Value

You can define the set of modules which Joomla will use by 

```php
$event->updateModules($modules);
```

where `$modules` is an array of the modules, each of which must have the same properties as the variable in the Joomla source code. 

## onAfterCleanModuleList

### Description

This event is triggered after Joomla has obtained and cleaned the list of modules to run. 

You can use this event to alter the modules which Joomla will use.

### Event Arguments

The event class \Joomla\CMS\Event\Module\AfterCleanModuleListEvent has the following arguments:

- **`modules`** - the array of modules, available via `$event->getModules()`

- **`subject`** - null (not used)

### Return Value

You can define the set of modules which Joomla will use by 

```php
$event->updateModules($modules);
```

where `$modules` is an array of the modules, each of which must have the same properties as the variable in the Joomla source code. 

## onRenderModule

### Description

This event is triggered after Joomla has run each module, and obtained the module raw output.

### Event Arguments

The event class \Joomla\CMS\Event\Module\RenderModuleEvent has the following arguments:

- **`module`** - the module which has been rendered, available via `$event->getModule()`

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`attributes`** - the array of attributes, available via `$event->getAttributes()`. The `$attributes` array contains the elements:

  - name - name of the template position

  - style - module style

### Return Value

You can update the attributes using

```php
$event->updateAttributes($attributes);
```

Changing the style attribute will change the module style to apply.

Change the name attribute will have no affect.

You can also change the module content directly:

```php
$module = $event->getModule();
$module->content = "<some html>"
```

If you set the `$module->content` to an empty string then Joomla will not attempt to add a module style (chrome wrapper).

## onAfterRenderModule

### Description

This event is triggered after Joomla has applied the module style (chrome wrapper around the module raw output).

### Event Arguments

The event class \Joomla\CMS\Event\Module\AfterRenderModuleEvent has the following arguments:

- **`module`** - the module which has been rendered, available via `$event->getModule()`

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`attributes`** - the array of attributes, available via `$event->getAttributes()`
The `$attributes` array contains the elements:

  - name - name of the template position

  - style - module style

### Return Value

You can change the module content directly:

```php
$module = $event->getModule();
$module->content = "<some html>"
```

## onAfterRenderModules

### Description

This event is triggered after Joomla has rendered all of the modules for a given template position.

### Event Arguments

The event class \Joomla\CMS\Event\Module\AfterRenderModulesEvent has the following arguments:

- **`content`** - the HTML content for the module position, available via `$event->getContent()`

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`attributes`** - the array of attributes, available via `$event->getAttributes()`
The `$attributes` array contains the elements:

  - name - name of the template position

  - style - the default module style, as specified in the template file

- **`subject`** - null (not used)

### Return Value

You can update the content using:

```php
$event->updateContent($newContent);
```
