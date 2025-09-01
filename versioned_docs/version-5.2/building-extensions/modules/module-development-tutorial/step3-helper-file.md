---
sidebar_position: 3
title: Step 3 Adding a helper file
---

Step 3 Adding a helper file
===========================

## Introduction

In this step we add a helper file to the module. 
Helper files are used in Joomla to hold complex logic, so that the main module code is kept simple.

In this case we use a helper file to find the username of the currently logged on user, and then output `"Hello <username>"`. 
If the user isn't logged on then we output `"Hello Guest"`.

The source code is available at [mod_hello step 3](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step3_helper).

## Helper File

Following the Joomla convention, we call our helper class HelloHelper, and store it in src/Helper/HelloHelper.php. 
This then means that our namespace and class definitions must be 

```php
namespace My\Module\Hello\Site\Helper;

class HelloHelper { ... }
```

In the helper file we obtain the username of the logged-on user; here's the full code of the helper class:

```php title="mod_hello/src/Helper/HelloHelper.php"
<?php

namespace My\Module\Hello\Site\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;

class HelloHelper
{
    public static function getLoggedonUsername(string $default)
    {
        $user = Factory::getApplication()->getIdentity();
        if ($user->id !== 0)  // found a logged-on user
        {
            return $user->username;
        }
        else
        {
            return $default;
        }
    }
}
```

## Dispatcher

There are 2 ways we can get access to our HelloHelper class. 
In this step we'll access it directly using Namespacing.
When we later look at [Dependency Injection](step8-dependency-injection.md) we'll change the code to use the alternative method of getting it instantiated via a HelperFactory class. 

```php title="mod_hello/src/Dispatcher/Dispatcher.php"
<?php

namespace My\Module\Hello\Site\Dispatcher;

\defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\DispatcherInterface;
use Joomla\CMS\Helper\ModuleHelper;
// highlight-next-line
use My\Module\Hello\Site\Helper\HelloHelper;

class Dispatcher implements DispatcherInterface
{
    public function dispatch()
    {
        // highlight-start
        $username = HelloHelper::getLoggedonUsername('Guest');

        $hello = "Hello {$username}";
        // highlight-end

        require ModuleHelper::getLayoutPath('mod_hello');
    }
}
```

## Manifest File update

We've already included the /src directory in our list of files which Joomla should process, so we just specify the updated version number. 

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="UTF-8"?>
<extension type="module" client="site" method="upgrade">
    <name>Joomla module tutorial</name>
    <!-- highlight-next-line -->
    <version>1.0.3</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <description>Code used in the Joomla module tutorial</description>
    <namespace path="src">My\Module\Hello</namespace>
    <files>
        <folder module="mod_hello">services</folder>
        <folder>src</folder>
        <folder>tmpl</folder>
    </files>
</extension>
```

## Installation

Once again, zip up your mod_hello directory and install the upgraded module on Joomla. 

When you navigate to a site page you should now see 
- `"Hello <your username>"` displayed by the module when you're logged in
- `"Hello Guest"` when you're not logged in