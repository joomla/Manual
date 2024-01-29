---
title: Basic Content Plugin
sidebar_position: 3
---
# Introduction
In this section we develop a plugin to provide a feature similar to the shortcodes feature in Wordpress. With this we can include in an article a reference to a field:
```
On my Joomla instance {sitename} the default editor is {editor}.
```
The fields will be restricted to the global params (defined in `configuration.php`), and the plugin will modify the article to output what these params are set to, so that what is displayed is something like:

On my Joomla instance j442 the default editor is tinymce.

In addition, the plugin demonstrates the use of:
- language constants - both in the manifest file and in the plugin code
- returning a value from a plugin method - through the use of the `onContentAfterTitle` event. The plugin code adds some text after the article title.

You can test this plugin on both Joomla 4 and Joomla 5 instances, to see the differences in obtaining the parameters and returning the result (as described in [Joomla 4 and 5 changes](./joomla-4-and-5-changes)). 

![Shortcodes plugin files](_assets/shortcodes.jpg "Shortcodes plugin files")

The diagram shows the plugin files to write, or you can download a zip file of the plugin from [shortcodes plugin download](./_assets/plg_shortcodes.zip).

# Manifest File
For general information on manifest files see [Manifest Files](https://docs.joomla.org/Manifest_files).

```xml title="plg_shortcodes/shortcodes.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension method="upgrade" type="plugin" group="content">
    <name>PLG_CONTENT_SHORTCODES</name>
    <version>1.0</version>
    <description>PLG_CONTENT_SHORTCODES_DESCRIPTION</description>
    <author>Me</author>
	<creationDate>Today</creationDate>
    <copyright>(C) 2024 Open Source Matters, Inc.</copyright>
	<license>GNU General Public License version 2 or later</license>
    <namespace path="src">My\Plugin\Content\Shortcodes</namespace>
    <files>
		<folder plugin="shortcodes">services</folder>
		<folder>src</folder>
	</files>
    <languages>
		<language tag="en-GB">language/en-GB/plg_content_shortcodes.ini</language>
		<language tag="en-GB">language/en-GB/plg_content_shortcodes.sys.ini</language>
	</languages>
</extension>
```

Joomla is quite particular when it comes to plugin manifest files, and it's easy to get something wrong and wonder why your plugin isn't working. Here are a number of things which you must get right.

## Plugin type/group

```xml
<extension method="upgrade" type="plugin" group="content">
```

Previous sections described plugin types as 'content', 'system', etc but here the `type` is "plugin" (as it's the type of the extension) and the `group` refers to the plugin type.

## Language constants

```xml
<name>PLG_CONTENT_SHORTCODES</name>
<description>PLG_CONTENT_SHORTCODES_DESCRIPTION</description>
```

You don't have to use language strings here, but if you do then you should provide the values of them in your language `.sys.ini` file. (The name and description are displayed in the administrator plugins form).

## Namespacing

```xml
<namespace path="src">My\Plugin\Content\Shortcodes</namespace>
```

Strictly speaking you don't have to follow the Joomla-recommended approach of 

```php
Mycompany\Plugin\<plugin type>\<plugin name>
```

However you must ensure that your namespace prefix here matches:
- the `use` statement in your services/provider.php file, and,
- the `namespace` statement in your main Extension class

and that all your classes are under the `/src` folder specified in the `path` attribute.

If you run into namespacing problems then it can be useful to check the `administrator/cache/autoload_psr4.php` to verify that your plugin's namespace prefix is pointing to where you expect. This cached file is regenerated whenever you install any extension (provided the `Extension - Namespace Updater` plugin is enabled), but if you're making changes directly in your Joomla site code then you may need to delete the cached file; it will be regenerated when you next navigate to your Joomla instance.

## Plugin entry point

```xml
<files>
    <folder plugin="shortcodes">services</folder>
    <folder>src</folder>
</files>
```

Ensure that you specify where the entry point of your plugin is by using the `plugin="shortcodes"` on the folder. This also gets mapped to the `element` field in your admin plugins form.

## Language Files

```xml
<languages>
    <language tag="en-GB">language/en-GB/plg_content_shortcodes.ini</language>
    <language tag="en-GB">language/en-GB/plg_content_shortcodes.sys.ini</language>
</languages>
```

Ensure that your plugin language files are named correctly. You must include in the filename:
- the plugin type - matching the `<extension group=."..">` attribute, and
- the plugin element - matching the `<folder plugin="...">` attribute.

# Service Provider file

```php title="plg_shortcodes/services/provider.php"
<?php

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Event\DispatcherInterface;
use My\Plugin\Content\Shortcodes\Extension\Shortcode;

    return new class() implements ServiceProviderInterface
    {
        public function register(Container $container)
        {
            $container->set(
                PluginInterface::class,
                function (Container $container) {
    
                    $config = (array) PluginHelper::getPlugin('content', 'shortcodes');
                    $subject = $container->get(DispatcherInterface::class);
                    $app = Factory::getApplication();
                    
                    $plugin = new Shortcode($subject, $config);
                    $plugin->setApplication($app);
    
                    return $plugin;
                }
            );
        }
    };
```

This is pretty much boilerplate code for obtaining your plugin from the Dependency Injection Container, and you need to change just 3 lines from what seems to be standard code in Joomla core plugins.

```php
use My\Plugin\Content\Shortcodes\Extension\Shortcode;
```

Ensure that this aligns with your `<namespace>` in the manifest file and your `namespace` statement and class name in the Extension class file. .

```php
$config = (array) PluginHelper::getPlugin('content', 'shortcodes');
```

Ensure that this contains your plugin type and element, matching the manifest file.

```php
$plugin = new Shortcode($subject, $config);
```

Ensure that this matches your class in your `src/Extension` directory.

## Extension Class
This is the main code of the plugin. Hopefully the comments in the code explain what is going on.

As explained in [Joomla 4 and 5 changes](./joomla-4-and-5-changes), code which triggers the Events can use a `GenericEvent` or a concrete Event, eg `ContentPrepareEvent`. In both these cases you can get the arguments using

```php
[$context, $article, $params, $page] = array_values($event->getArguments());
```

but you have to check in your code how to return the result. 

Using this approach means that you don't need to change your plugin code if the code which is triggering the event changes from using a generic Event class to a concrete event class. 

```php title="plg_shortcodes/src/Extension/Shortcode.php"
<?php
namespace My\Plugin\Content\Shortcodes\Extension;

// no direct access
defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Event\Result\ResultAwareInterface;

class Shortcode extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        // we want this plugin to work only on the site, not eg on administrator or api
        if (Factory::getApplication()->isClient('site')) {
            return [
                'onContentPrepare' => 'replaceShortcodes',  
                'onContentAfterTitle' => 'addShortcodeSubtitle',  
            ];
        } else {
            return [];
        }
    }

    // this will be called whenever the onContentPrepare event is triggered
    public function replaceShortcodes(Event $event)
    {
        /* This function processes the text of an article being presented on the site.
         * It replaces any text of the form "{configname}" (where configname is the name 
         * of a config parameter in configuration.php) with the value of the parameter.
         *
         * This is similar to shortcodes functionality within wordpress
         */
         
        // use this format to get the arguments for both Joomla 4 and Joomla 5
        // In Joomla 4 a generic Event is passed
        // In Joomla 5 a concrete ContentPrepareEvent is passed
        [$context, $article, $params, $page] = array_values($event->getArguments());
        if ($context !== "com_content.article" && $context !== "com_content.featured") return;
        
        $text = $article->text; // text of the article
        $config = Factory::getApplication()->getConfig()->toArray();  // config params as an array
            // (we can't do a foreach over the config params as a Registry because they're protected)
        
        // the following is just code to replace {configname} with the parameter value
        $offset = 0;
        // find opening curly brackets ...
        while (($start = strpos($text, "{", $offset)) !== false) {
            // find the corresponding closing bracket and extract the "shortcode"
            if ($end = strpos($text, "}", $start)) {
               $shortcode = substr($text, $start + 1, $end - $start - 1);
               
               // cycle through the config array looking for a match
               $match_found = false;
               foreach ($config as $key => $value) {
                   if ($key === $shortcode) {
                       $text = substr_replace($text, htmlspecialchars($value), $start, $end - $start + 1);
                       $match_found = true;
                       break;
                   }
                } 
                
                // if no match found replace it with an error string
                if (!$match_found) {
                    $this->loadLanguage();  // you need to load the plugin's language constants before using them
                    // (alternatively you can set:  protected $autoloadLanguage = true; and Joomla will load it for you)
                    $text = substr_replace($text, Text::_('PLG_CONTENT_SHORTCODES_NO_MATCH'), $start, $end - $start + 1);
                }
                
            } else {
               break;
            }
           
           $offset = $end;
        }

        // now update the article text with the processed text
        $article->text = $text;
    }
    
    public function addShortcodeSubtitle(Event $event)
    {
        [$context, $article, $params, $page] = array_values($event->getArguments());
        if ($context !== "com_content.article" && $context !== "com_content.featured") return;
        
        $eventType = method_exists($event, 'getContext') ? "concrete event class" : "generic event class";
        
        if ($event instanceof ResultAwareInterface) {
            $event->addResult("{$eventType} via addResult");
        } else {
            $result = $event->getArgument('result') ?? [];
            $result[] = "{$eventType} via setArgument";
            $event->setArgument('result', $result);
        }
    }
}
```

# Language Files
Language constants which are used in the manifest file:

```php title="plg_shortcodes/language/en-GB/plg_content_shortcodes.sys.ini"
PLG_CONTENT_SHORTCODES="Shortcodes Plugin"
PLG_CONTENT_SHORTCODES_DESCRIPTION="Replaces article shortcodes (in {} brackets) with field values"
```

Language constants which are used in the plugin code:

```php title="plg_shortcodes/language/en-GB/plg_content_shortcodes.ini"
PLG_CONTENT_SHORTCODES_NO_MATCH="Error: no match for shortcode found"
```

# Installation
Once you have copied the files into your local filesystem you can zip up the directory and install the extension. Remember to enable the plugin!

Write an article with some text like:
```
On my Joomla instance {sitename} the default editor is {editor}.
```
Then navigate to a Joomla site menuitem which displays this article, either as a single article or as one of the featured articles. 

The code should work on both Joomla 4 and Joomla 5, and should also display after the article title information about the type of event class used, and how the value is returned. 