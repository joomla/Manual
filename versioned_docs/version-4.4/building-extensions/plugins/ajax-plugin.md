---
title: Ajax Plugin for Ad Hoc Jobs
sidebar_position: 4
---
# Introduction

Imagine a Joomla site which handles bookings for events. On the day of the event the people putting out the chairs want to know how many people are coming, so they enter a URL on their browser which runs a job on the Joomla site and outputs the number of attendees.

This is the sort of job which can be handled easily by using an Ajax plugin. Despite its name, an Ajax plugin isn't restricted to Ajax requests from javascript; you can use it to handle normal GET requests from a browser. 

For ad hoc jobs like these, using an Ajax plugin is better than using a [Custom Script](../custom-script/index.md) because the functionality is supported by Joomla, and generally doesn't require rework between Joomla versions. In addition you can keep all your jobs together in one PHP file.

This example Ajax plugin provides a utility to list the number of extensions on the Joomla instance, grouped by extension type. You enter a URL in your browser:

```
https://example.com/index.php?option=com_ajax&format=raw&plugin=extensions
```

and the utility responds with the counts:

```
component:45
file:3
language:9 
…
```

# Writing an Ajax plugin
To write a plugin which handles the URL

```
https://example.com/index.php?option=com_ajax&format=raw&plugin=extensions

```

you simply have to write a standard plugin which listens for the event `onAjaxExtensions` and returns the result as a string. That's all that's required! Here's the pseudo code:

```php
public function onAjaxExtensions(Event $event)
{
    // perform the database query
    // return the result
}
```

In the URL which you enter to run the functionality you have to specify as query parameters:
- `option=com_ajax`
- `format=<format type>` (you can specify `format=json` which then returns a JSON string, but format= anything else will just return the string)
- `plugin=<job name>` will cause the event `onAjax<Job name>` to be triggered (note the capitalisation). In our example `plugin=extensions` will cause `onAjaxExtensions` to be triggered. 

You can obviously specify other query parameters which you can then capture using [Input](../../general-concepts/input.md) and use in the logic of your function.

# Site, Administrator and Logged-on Users
If you look at the Joomla code, then you'll see that site `com_ajax` and the administrator `com_ajax` are exactly the same. So you could run the code using:

```
https://example.com/administrator/index.php?option=com_ajax&format=raw&plugin=extensions

```

However, in the previous case your code will run `SiteApplication` but in this case `AdministratorApplication`, which will have implications for functions such as building SEF routes using `Route::_()` (where you would need to use `Route::link()` on the back-end) and obtaining the site menuitems (where you would need to explicitly load them on the back-end). 

Also if the user is running the job after having been logged into the Joomla site front-end or administrator back-end then the Joomla Application will treat the user as logged on if the session hasn't expired, and this will cross over between the administrator and site if the Global Configuration / System / Shared Sessions option is set. 

If you decide to use hard-coded credentials to login a user within your code, then you should ensure that they're logged out before you exit (as described in [to logon or not to logon](https://manual.joomla.org/docs/building-extensions/custom-script/logging-on)), and wrap functions which you call in try / catch blocks so that you can catch any exceptions. Otherwise the logged-in state will persist through the session cookie. 

# Ajax Plugin code
This section contains the full source code for the ajax plugin. You can write the plugin manually by copying the code below, or you can download the zip file from [Download Ajax Plugin Extensions](./_assets/plg_ajax_jobs.zip). If you're writing it manually then include the following files in a folder eg `plg_ajax_jobs`.

Install the zip file and enable the plugin. Then enter the URL
```
https://example.com/index.php?option=com_ajax&format=raw&plugin=extensions

```
This should then display the number of each different type of extension on your Joomla instance.

Unfortunately it's not possible to create a nice SEF URL for `com_ajax` URLs. If you really want an easy-to-use URL then you would have to configure some rewrite rules in your web server. 

## Manifest file
A standard manifest file for a plugin:

```xml title="plg_ajax_jobs/jobs.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension method="upgrade" type="plugin" group="ajax">
    <name>Ajax Jobs</name>
    <version>1.0</version>
    <description>Example ajax plugin for ad hoc jobs</description>
    <author>Me</author>
	<creationDate>Today</creationDate>
    <namespace path="src">My\Plugin\Ajax\AjaxJobs</namespace>
    <files>
		<folder plugin="jobs">services</folder>
		<folder>src</folder>
	</files>
</extension>
```

## Service Provider file
A standard service provider file for instantiating a plugin via the dependency injection container:

```php title="plg_ajax_jobs/services/provider.php"
<?php

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Event\DispatcherInterface;
use My\Plugin\Ajax\AjaxJobs\Extension\Jobs;

    return new class() implements ServiceProviderInterface
    {
        public function register(Container $container)
        {
            $container->set(
                PluginInterface::class,
                function (Container $container) {
    
                    $config = (array) PluginHelper::getPlugin('ajax', 'jobs');
                    $subject = $container->get(DispatcherInterface::class);
                    $app = Factory::getApplication();
                    
                    $plugin = new Jobs($subject, $config);
                    $plugin->setApplication($app);
    
                    return $plugin;
                }
            );
        }
    };
```

## Jobs file
This is where you write your code for your ad hoc jobs. The result is returned as described in [Joomla 4 and 5 Changes](joomla-4-and-5-changes.md).

```php title="plg_ajax_jobs/src/Extension/Jobs.php"
<?php
namespace My\Plugin\Ajax\AjaxJobs\Extension;

// no direct access
defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Event\Result\ResultAwareInterface;
use Joomla\Database\DatabaseInterface;
   
class Jobs extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
                'onAjaxExtensions' => 'onAjaxExtensions', 
                ];
    }
    
    public function onAjaxExtensions(Event $event)
    {
        $db = Factory::getContainer()->get(DatabaseInterface::class);
        
        $query = $db->getQuery(true)
                ->select('type, count(*) as count')
                ->from($db->quoteName('#__extensions'))
                ->group('type');
        $db->setQuery($query);

        $counts = $db->loadAssocList('type', 'count');
        $output = "";
        foreach ($counts as $extension => $count) {
            $output .= "{$extension}:{$count}<br>";
        }

        if ($event instanceof ResultAwareInterface) {
            $event->addResult($output);
        } else {
            $result = $event->getArgument('result') ?? [];
            $result[] = $output;
            $event->setArgument('result', $result);
        }
    }
}
```


