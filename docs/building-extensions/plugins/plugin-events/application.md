---
sidebar_position: 1
title: Application / System Events
toc_max_heading_level: 2 
---

Application / System Events
===========================

Application / System Events are triggered by the core Joomla application code - 
the highest level code which provides the main flow of control in Joomla.

For a plugin to capture these events it should be defined as a system plugin. 

In this category we also include the events onBeforeExtensionBoot and onAfterExtensionBoot,
as they don't fit into any other category, and your plugin has to be a system plugin to receive them all. 

:::warning
  System plugins are loaded every time Joomla runs, on both the site front-end and administrator back-end. 
If you have a PHP syntax error in a system plugin then you will get locked out of the Joomla administrator back-end, 
and will have to go into phpmyadmin (or equivalent) to set to 0 the `enabled` field within the plugin record in the `#__extensions` table. 
:::

## Joomla overview

The overview below of how Joomla handles an HTTP request on the front-end of a website
is designed to give you an idea of how the system events fit into the overall control flow.
If you would like further information then you may find it helpful to watch the video 
[How Joomla Works - a guide for extension developers](https://youtu.be/JKnq47Yhtvs).

- Initialisation 
- trigger *onAfterInitialise*
- Route - to work out the main component, and associated parameters (view, layout, etc)
- trigger *onAfterRoute*
- Instantiate the Document object representing the output - normally HtmlDocument
- trigger *onAfterInitialiseDocument*
- run the component - the output from the component is stored in a buffer
- trigger *onAfterDispatch*
- reads and parses the template file (eg templates/cassiopeia/index.php) which forms the basis of what is returned to the client
- trigger *onBeforeRender*
- processes the template file, filling in the `<jdoc:include type="..." />` "holes" there, for the various types:
  - type="metas" - trigger *onBeforeCompileHead*, and produce metadata to include in the `<head>`
  - type="styles", type="scripts" - include CSS and Javascript
  - type="component" - include the component output
  - type="message" - include entries for the system message area
  - type="modules" - run the code of each of the modules to be displayed on that page, and include the output
- trigger *onAfterRender*
- if gzip compression is required, then compress the output and trigger *onAfterCompress*
- trigger *onBeforeRespond*
- send the HTTP response with the HTML
- trigger *onAfterRespond*
- tidy up, including storing the session data

## Application Events overview

The application event classes can be found in libraries/src/Event/Application. 
In general they have a single parameter `application` which is set to the Application instance,
and the getter method for this parameter is `getApplication`, for example:

```php
use Joomla\CMS\Event\Application\AfterInitialiseEvent;

public function onAfterInitialise(AfterInitialiseEvent $event): void
{
    $app = $event->getApplication(); 
}
```

The documentation below does not cover all of the application events, 
only the main ones which are triggered during Joomla handling a web HTTP request.

Several of the others are emitted when Joomla handles a console job or API request. 
They follow the same pattern as those described below, 
and you can search for those events in the Joomla code to find where they're triggered.

Searching for the event name within the Joomla plugins/system directory will also provide examples of where Joomla uses these events.

## onBeforeExtensionBoot and onAfterExtensionBoot events

The events onBeforeExtensionBoot and onAfterExtensionBoot are triggered before and after every plugin, module or component is booted.
So these will be triggered
- whenever a plugin is imported
- whenever the main component is run to capture its output
- whenever a module is run to capture its output

However, you should be aware that extensions are booted on other occasions as well.
For example, a component is booted whenever Joomla or another extension wants to call one of the methods of its Extension class,
as described in [Extension Class for Components](../../../general-concepts/extension-and-dispatcher/extension-component.md).

Examples of this type include:
- when Joomla runs the system router to route the request, it will usually use the component router to parse the SEF URL,
so this will involve booting that component
- whenever content is displayed then the fields plugin will run, and it will boot com_fields to get any custom fields to be displayed on the page
- whenever the mod_menu module runs to display the menuitems, it will run the router to build the SEF URLs,
and this may also involve running a component router.

Note also that the event is triggered *the first time only that each extension is booted*. 
Once an extension is booted the reference to that object is stored, 
and when there is another request to boot that extension, then the stored object is returned, and these events are not triggered.

One reason why it is important to understand all this is the following: 
depending upon when these events are triggered will determine which Joomla objects are available.
For example, imagine that your plugin is wanting to capture the onBeforeExtensionBoot event for com_content.
For a site page displaying an article the onBeforeExtensionBoot will be triggered *before the Joomla Document instance is instantiated*.
This is because the com_content extension will be booted during the routing, 
when the Joomla site router needs to call the com_content component router.

## onAfterInitialise

### Description

This event is triggered after Joomla has performed initialisation routines. 

You can use this event, for example, to change the input HTTP parameters, and hence the routing of the request.

Also, at this stage the Router object will have been instantiated, 
so if your plugin uses the Joomla\CMS\Router\SiteRouterAwareTrait trait
then you can access the router instance and add rules to affect how URLs are built and parsed:

```php
use Joomla\CMS\Router\SiteRouterAwareTrait;
use Joomla\CMS\Event\Application\AfterInitialiseEvent;

public function onAfterInitialise(AfterInitialiseEvent $event): void
{
    $router = $this->getSiteRouter();
    $router->attachBuildRule(<callback object and method>, <build process stage>);
    ...
}
```

### Event Arguments

The event class \Joomla\CMS\Event\Application\AfterInitialiseEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

### Return Value

None

## onAfterRoute

### Description

This event is triggered after Joomla has routed the request. 

You can use this event, for example, to tidy up aspects after the routing functionality.

### Event Arguments

The event class \Joomla\CMS\Event\Application\AfterRouteEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

### Return Value

None

## onAfterInitialiseDocument

### Description

This event is triggered after Joomla has initialised the Document object. 

You can use this event, to set aspects of the Document.

### Event Arguments

The event class \Joomla\CMS\Event\Application\AfterInitialiseDocumentEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

- **`document`** - The Document, available via `$event->getDocument()`

### Return Value

None

## onAfterDispatch

### Description

This event is triggered after Joomla has run the main component and buffered its output.

### Event Arguments

The event class \Joomla\CMS\Event\Application\AfterDispatchEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

### Return Value

None

## onBeforeRender

### Description

This event is triggered just before Joomla starts to process the template file, 
to fill in the `<jdoc:include>` tags.

### Event Arguments

The event class \Joomla\CMS\Event\Application\BeforeRenderEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

### Return Value

None

## onBeforeCompileHead

### Description

This event is triggered when Joomla is processing the `<jdoc:include type="metas">` tag,
to include relevant tags within the HTML `<head>` output.
You can use this to include other items within the `<head>`, via the [Web Asset Manager](../../../general-concepts/web-asset-manager.md)

### Event Arguments

The event class \Joomla\CMS\Event\Application\BeforeCompileHeadEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

- **`document`** - The Document, available via `$event->getDocument()`

### Return Value

None

## onAfterRender

### Description

This event is triggered after Joomla has generated the output (eg HTML document), but before the HTTP response has been sent. 
You can use this to make any final modifications to the HTML document, which you can access using

```php
use Joomla\CMS\Event\Application\AfterRenderEvent;

public function onAfterRender(AfterRenderEvent $event): void
{
    $doc = $event->getApplication()->getDocument();   // to get the Document, or
    $body = $event->getApplication()->getBody();      // to get just the HTML body
    ...
}
```

### Event Arguments

The event class \Joomla\CMS\Event\Application\AfterRenderEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

### Return Value

None

## onBeforeRespond

### Description

This event is triggered just before Joomla sends the HTTP response.

### Event Arguments

The event class \Joomla\CMS\Event\Application\BeforeRespondEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

### Return Value

None

## onAfterRespond

### Description

This event is triggered just after Joomla sends the HTTP response.

### Event Arguments

The event class \Joomla\CMS\Event\Application\AfterRespondEvent has the following arguments:

- **`application`** - the Application instance, available via `$event->getApplication()`

### Return Value

None

## onBeforeExtensionBoot

### Description

See the section on [onBeforeExtensionBoot and onAfterExtensionBoot events](application.md#onbeforeextensionboot-and-onafterextensionboot-events) above.

This event is triggered just before Joomla boots an extension.
You could use this event to enter a dependency into the child container, for example,
which could be used by the extension's `boot()` method (which is run when the extension is booted).

### Event Arguments

The event class \Joomla\CMS\Event\BeforeExtensionBootEvent has the following arguments:

- **`application`** - the Application instance, but note that there is no getter function for this. Instead you can use:

```php
use \Joomla\CMS\Event\BeforeExtensionBootEvent;

public function onBeforeExtensionBoot(BeforeExtensionBootEvent $event): void
{
    $app = $event['subject'];
}
```

- **`extensionType`** - This is the type of extension being booted, 
identified by the interface it supports, eg "Joomla\CMS\Extension\PluginInterface".
Available via `$event->getExtensionType()`

- **`extensionName`** - The extension name, available via `$event->getExtensionName()`:

  - for components the component name, eg "content"
  - for modules the module name, eg "breadcrumbs"
  - for plugins the plugin name and type separated by a colon, eg "fields:content"

- **`container`** - The child container, available via `$event->getContainer()`, 
as described in [Extensions and Child Containers](../../../general-concepts/dependency-injection/extension-child-containers.md).
This is before the extension's services/provider.php file has been interpreted, 
so the container won't contain any of the extension's own dependencies.

### Return Value

None

## onAfterExtensionBoot

### Description

See the section on [onBeforeExtensionBoot and onAfterExtensionBoot events](application.md#onbeforeextensionboot-and-onafterextensionboot-events) above.

This event is triggered just after Joomla boots an extension.

This enables one of Joomla's most powerful points of flexibility. 
The child container which is passed contains the dependencies of the extension,
and Joomla extensions generally make these dependencies modifiable.
This means that in a plugin you can overwrite these dependencies to use your own code instead of Joomla's.

So for com_content, for example, you can define your own MVCFactory class, 
which creates your own controllers, views, models and tables.
If you replace the standard MVCFactory dependency in the child container with a version that you have written,
then com_content will run your MVC classes instead of its own. 

### Event Arguments

The event class \Joomla\CMS\Event\AfterExtensionBootEvent has the following arguments:

- **`application`** - the Application instance, but note that there is no getter function for this. Instead you can use:

```php
use \Joomla\CMS\Event\AfterExtensionBootEvent;

public function onBeforeExtensionBoot(AfterExtensionBootEvent $event): void
{
    $app = $event['subject'];
}
```

- **`extensionType`** - This is the type of extension being booted, 
identified by the interface it supports, eg "Joomla\CMS\Extension\PluginInterface".
Available via `$event->getExtensionType()`

```php
$type = $event->getExtensionType();
```

- **`extensionName`** - The extension name, available via `$event->getExtensionName()`:

  - for components the component name, eg "content"
  - for modules the module name, eg "breadcrumbs"
  - for plugins the plugin name and type separated by a colon, eg "fields:content"

- **`container`** - The child container, available via `$event->getContainer()`, 
as described in [Extensions and Child Containers](../../../general-concepts/dependency-injection/extension-child-containers.md).
This will now contain the extension's own dependencies, as specified in its services/provider.php file. 

### Return Value

None

### Examples

The [System Plugin Router Rules example](../plugin-examples/system-plugin-router-rules.md) 
uses this mechanism to replace the com_content component router with a customised version.