---
title: Daemon Process
---

Creating a Daemon Process
=========================

:::danger[Developer Notice]

Creating a script which directly includes loads and boots the CMS framework is not recommended and only needed in
rare cases. Depending on the usecase you should create a [console plugin](../plugins/plugin-examples/basic-console-plugin-helloworld.md)
and extend the Joomla! console application.

:::

## Introduction

Creating a daemon application means to create a long-running process which might be running in the background.
This application is started in the console or by a supervisor like systemd.

```bash
./cli/mydaemon.php
```

## Location

You can put your php script file in the cli subfolder of the joomla root directory. 
Example: `/var/lib/www/public_html/cli/mydaemon.php`

We use this path in the following code as our base path

## Sample code

A working example you can copy-paste, the first line is the [Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) and 
definies the program loader, in our case the php cli interpreter.

```php
#!/usr/bin/php
<?php
// We need to classify this script as Joomla entry point
define('_JEXEC', 1);

// Set the Joomla basepath one folder up relative to our current directory /cli
define('JPATH_BASE', dirname(__DIR__));

// Load the definitions and the framework
require_once JPATH_BASE . '/includes/defines.php';
require_once JPATH_BASE . '/includes/framework.php';

// Add a simple 'echo' logger
\Joomla\CMS\Log\Log::addLogger(['logger' => 'Echo']);

/**
 * The application which handles our business logic 
 */
class MyDaemon extends \Joomla\CMS\Application\DaemonApplication
{
    // Set the name of the application
    public $name = 'MyDaemon';
    
    public function __construct() {
        // Load the configuration
        $config = new \Joomla\Registry\Registry(new \JConfig());
        
        // We set the `pid file` manually but should be done in the configuration.php 
        $config->set('application_pid_file', '/run/mydaemon.pid');
        
        parent::__construct(null, $config);
    }

    // This function needs to be implemented since it's required by the CMSApplicationInterface  
    public function getName() {
      return $this->name;
   }

    // This function holds our business logic
    public function doExecute()
    {
        $this->out("Hello Joomla!");
    }
}

// Run the application
\Joomla\CMS\Application\DaemonApplication::getInstance('MyDaemon')->execute();
```

## Parameters

Joomla autodetects the `-f` parameter and executes the application in foreground and doesn't daemonize the process.

```bash
./cli/mydaemon.php -f
```

Using the `-f` flag makes it easier to debug and also the usage in the supervisor daemons allows a direct monitoring. 
