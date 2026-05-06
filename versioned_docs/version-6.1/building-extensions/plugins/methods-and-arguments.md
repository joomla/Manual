---
title: Plugin Methods and Arguments
sidebar_position: 2
---

This section describes some general features of plugin code, 
and many of these are used in the [plugin tutorial](./basic-content-plugin.md) which follows.

Plugin Methods and Arguments
============================

There are 2 functions which you must implement within your plugin:

1. The `getSubscribedEvents()` method. You tell Joomla
  - which events you want to subscribe to
  - the code to run when one of those events is triggered

2. The handler function which Joomla should call when one of those events is triggered.

This section describes these functions in detail.

A note on terminology: you will find that the terms "dispatch", "trigger" and "emit" an event 
are used interchangeably in both the documentation and in the Joomla code.

## getSubscribedEvents method

In this function you simply return an associative array where 

- the index is the event name
- the value is the name of the function in your plugin which handles that event

```php
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;

class MyPlugin extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
                'onContentPrepare' => 'modifyContent',  
                'onContentAfterTitle' => 'addSubtitle',  
                ];
    }
```

It's important that you state that your plugin `implements SubscriberInterface`.

(Note that you can also set a priority for each event and handler - see [Priority of Events](./advanced-features.md#priority-of-events)).

## Your handler function

Here is an example based on the [onContentPrepare event](./plugin-events/content.md#oncontentprepare): 

```php
use \Joomla\CMS\Event\Content\ContentPrepareEvent;

public function modifyContent(ContentPrepareEvent $event): void
{
    if (!$this->getApplication()->isClient('site')) {
        return;
    }
    $item = $event->getItem();        // preferred way to get the event arguments
    $args = $event->getArguments();   // fallback mechanism
    $context = $event['context'];     // using PHP Array Access
    if ($context) {
        ...
    }
}
```

The subsections below provide some detailed descriptions.

### Event Class

Each event has its own PHP class, and you can find these in libraries/src/Event. 
Some event classes are in this directory, but most are in subdirectories categorised by the area of Joomla where that event is triggered.

The name of the event is often similar to the class name, 
eg the event class \Joomla\CMS\Event\Content\ContentPrepareEvent is associated with the event onContentPrepare.
This is an event which is of type "content", in the sense that plugins of type "content" are imported prior to it being triggered.
However, there isn't a "type" field associated with the event instance which defines this plugin type (`$event` doesn't have a "type" property).

There is a mapping between many event names and event classes in libraries/src/Event/CoreEventAware.php.

You may be wondering: "How do I find out which event to use to achieve what I want?"

If a suitable event isn't documented in this manual, and a response from AI doesn't give you a useful answer,
then there are a few options to consider:

- look through the event classes below libraries/src/Event or in libraries/vendor/composer/autoload_classmap.php 
- check for the mapping to event name in libraries/src/Event/CoreEventAware.php
- check the outdated [Plugin Events documentation](https://docs.joomla.org/Plugin/Events)
- search the Joomla code for the possible event names and event class names.

### Checking the Client

It's important to remember that plugins are run whenever Joomla is run:

- the front-end site
- the back-end administrator
- using the Joomla API
- running a console job

So in your event handler code you should generally check the context using something like:

```php
if (!$this->getApplication()->isClient('site')) {
    return;
}
```

The [getApplication](#getapplication) function is an inherited method, as described below.

### Getter Functions

Each Event instance has a number of arguments which are documented in the detailed plugin event pages
(and sometimes in the source code of the event class).

You should use the event getter functions to obtain the event arguments, for example

```php
$context = $event->getContext();
$item = $event->getItem();
$params = $event->getParams();
$page = $event->getPage();
```

The getter function matches the name of the argument in the documentation. 

`$event->getName()` returns the name of the event.

### Arguments

Occasionally you may find that there isn't a getter function for a particular argument.
In this case you can obtain the event arguments by: 

```php
$args = $event->getArguments();
```

The returned value is an associative array mapping the arguments to their values, eg:

```
["context" => "com_content.article", 
 "subject" => <the article class instance>, 
 "params" => <article params as a Registry class instance>, 
 "page" => 0]
```

Note that the array element index doesn't always match the argument in the documentation pages.
For example, for ContentPrepareEvent the `item` argument is given by the "subject" element in the array.
These exceptions will be noted in the documentation pages for the events.

If you are reading the arguments then it's best to use the getter functions.

If you are dispatching an event in your code then you must use the argument names associated with the array format. 

### Array Access

The Joomla Event class supports the [PHP ArrayAccess interface](https://www.php.net/manual/en/class.arrayaccess.php). 
So you can use this method to obtain the arguments, and you may find this useful in the case where an explicit getter function is not available.

```php
use \Joomla\CMS\Event\Content\ContentPrepareEvent;

    public function modifyContent(ContentPrepareEvent $event): void
    {
        $context = $event['context'];
        if ($context) {
            ...
        }
    }
```

If the 'context' array element / argument doesn't exist then `$event['context']` returns null,
so you can use this to check if an argument exists. No PHP warning is generated if the array index is not present. 

### Updating arguments and returning results

The documentation will state whether any arguments are modifiable, or whether a result should be returned.

For example, ContentPrepareEvent passes an 'item' argument which you can modify.
Depending upon the 'context' argument this item may be an article, a contact, a user, etc., 
and you can set properties of this object. 

```php
$context = $event->getContext();
if ($context === "com_content.article") {
    $article = $event->getItem();
    $article->text = $article->text . " [end of text]";  // Appends " [end of text]" to the end of the article
}
```

(In this case the appended text would be included in the HTTP response, but not saved to the database).

If the event allows a result to be returned then you should use this approach:

```php
use Joomla\CMS\Event\Content\AfterTitleEvent;

    public function onContentAfterTitle(AfterTitleEvent $event)
    {
        ...
        $event->addResult($value);
    }
```

Sometimes the event provides a specific function which allows you to update an entity.
For example, the [onInstallerBeforeInstaller](./plugin-events/installer.md#oninstallerbeforeinstaller) event
allows the plugin to change the package which is being installed:

```php
public function onInstallerBeforeInstaller(\Joomla\CMS\Event\Installer\BeforeInstallerEvent $event): void
{
    $newpkg = array("dir" => $pathToExtensionDirectory, "type" => "plugin", "extractdir" => null, "packagefile" => null);
    $event->updatePackage($newpkg);
}
```

## Methods available to Plugins

Inside your plugin you have access to several methods.

### getApplication

- `$this->getApplication()` returns the Application instance. (This method is inherited from CMSPlugin).
However, you need to inject this dependency in your plugin's services/provider.php file.

```php
    $plugin = new MyPlugin($subject, $config);
    $app = Joomla\CMS\Factory::getApplication();
    $plugin->setApplication($app);
```

From the `$app` instance you can find other details 
such as the global configuration (getConfig), current user (getIdentity), language (getLanguage), document (getDocument), etc.

### loadLanguage

- `$this->loadLanguage()` (also inherited) will load your plugin's language constants. 
You have to load them before using them in your code.

Alternatively you can set within your plugin class:  

```php
protected $autoloadLanguage = true;
```

and Joomla will load your plugin's language constants for you.

:::warning
  This feature has a negative effect on performance, as it means that your language constants are processed even when they're not used.
  You should always load them manually using `$this->loadLanguage()` instead.
:::

### Injected Dependencies

If your plugin needs access to other Joomla class instances which are in the main Dependency Injection container then you should follow this pattern:

- in your services/provider.php file get the instance out of the DI container and pass it into your plugin's setter method

- in your plugin use your getter method to retrieve it.

- include these getter and setter methods in your plugin by `use` + the appropriate trait

For example, to include the database object do this in your services/provider.php file:

```php
    $plugin = new MyPlugin( (array) PluginHelper::getPlugin('content', 'myplugin') );
    $plugin->setDatabase($container->get(DatabaseInterface::class));
```

and include this in your plugin file:

```php
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use Joomla\Database\DatabaseAwareTrait;

class MyPlugin extends CMSPlugin implements SubscriberInterface
{
    use DatabaseAwareTrait;

    public function modifyContent(ContentPrepareEvent $event): void
    {
        $db = $this->getDatabase();
    }
}
```

As another example, if your plugin sends mail then you can set the MailerFactory as a dependency.

```php title="services/provider.php"
    $plugin = new MyPlugin( (array) PluginHelper::getPlugin('content', 'myplugin') );
    $plugin->setMailerFactory($container->get(MailerFactoryInterface::class));
```

```php title="plugin file"
use Joomla\CMS\Mail\MailerFactoryAwareTrait;

class MyPlugin extends CMSPlugin implements SubscriberInterface
{
    use MailerFactoryAwareTrait;

    public function modifyContent(ContentPrepareEvent $event): void
    {
        $mailer = $this->getMailerFactory()->createMailer();
    }
}
```

These traits are scattered throughout the Joomla libraries directories, 
but you can find them by searching for filenames which match `*AwareTrait.php`.