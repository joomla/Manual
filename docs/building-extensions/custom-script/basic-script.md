---
title: Example PHP Script
sidebar_position: 2
---

Example PHP Script
==================

:::danger[Developer Notice]

Creating a script which directly includes loads and boots the CMS framework is not recommended and only needed in
rare cases. Depending on the usecase you should create a [console plugin](../plugins/basic-console-plugin-helloworld.md) 
and extend the Joomla! console application. If you need to create a simple entry point for webrequests write an 
[ajax plugin](../plugins/ajax-plugin.md).

:::

## General Approach
To make use of the Joomla framework, and in particular the Joomla APIs, you need to have an `Application` class instance. As `ConsoleApplication` and `CliApplication` both have checks to ensure that their application is run from the command line, and neither `AdministratorApplication` nor `ApiApplication` is appropriate, the clear choice is to build your script upon `SiteApplication`.

So to build your script you basically have to mirror how Joomla initialises and instantiates `SiteApplication`, which involves:
- running the Joomla start-up PHP files
- instantiating the `SiteApplication` via the Dependency Injection Container (which will instantiate also its key dependencies)
-  providing the `Application` class instance with any necessary configuration items (for example, the language to use, user, logging).

Because the Joomla startup routine changes from time to time you will certainly need to check if your custom scripts work on new versions of Joomla, and you well may need to change them. 

The code below is for a basic custom script which you should store in eg the /cli directory under the root folder of your joomla instance if you want to try running it. 
You can comment out all the Optional sections and confirm that it still works ok.
```php
<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Session\Session;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\CMS\Language\Language;
use Joomla\CMS\Log\Log;

define('_JEXEC', 1);

// define your preferred error reporting levels
error_reporting(E_ALL);
ini_set('display_errors', 1);

// the line below assumes that this PHP script file is in a directory below the root of the joomla instance, eg in <root>/cli
define('JPATH_BASE', realpath(dirname(__FILE__).'/..'));

require_once JPATH_BASE . '/includes/defines.php';
require_once JPATH_BASE . '/includes/framework.php';

// Boot the DI container - this will load in the classes in libraries/src/Service/Provider/
$container = \Joomla\CMS\Factory::getContainer();

// We need to set up an alias to get the Session dependency from the DIC
$container->alias(\Joomla\Session\SessionInterface::class, 'session.web.site');

// Instantiate the application.
$app = $container->get(\Joomla\CMS\Application\SiteApplication::class);

// Set what gets returned from Factory::getApplication()
\Joomla\CMS\Factory::$application = $app;

// Optional - This is so that Joomla can find classes relating to extensions
$app->createExtensionNamespaceMap();

// Optional - Set up basic logging framework
if ($app->get('log_everything')) {
    Log::addLogger(['text_file' => 'everything.php']);
}
Log::add('logging initialised ok', Log::DEBUG, 'script-debug');

// Optional - set up the language and load the joomla library text strings - select your preferred language
$lang = Language::getInstance("en-GB");
$app->loadLanguage($lang);
$app->getLanguage()->load('lib_joomla', JPATH_ADMINISTRATOR);

// Write below here what you want your script to do
$db = $container->get(Joomla\Database\DatabaseInterface::class);

$query = $db->getQuery(true);
$query->select('count(*)')
    ->from('#__content');

$db->setQuery($query);

$count = $db->loadResult();

echo "<h2>{$count} articles found</h2>";
```
