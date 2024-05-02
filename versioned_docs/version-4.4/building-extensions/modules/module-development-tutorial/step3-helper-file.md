---
sidebar_position: 3
title: Step 3 Adding a helper file
---

Step 3 Adding a helper file
===========================

## Introduction

In this step we add a helper file to the module, and assign a namespace to the module. 
Helper files are used in Joomla to hold complex logic, so that the main module code is kept simple.

In this case we use a helper file to find the username of the currently logged on user, and then output `"Hello <username>"`. 
If the user isn't logged on then we output `"Hello Guest"`.

The source code is available at [mod_hello step 3](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step3_helper).

## Manifest File update

We introduce a namespace for our module by following the [Joomla recommendation](../../../general-concepts/namespaces/defining-your-namespace.md), and we've used "My" as our company name. 
The manifest file is where we tell Joomla what namespace the module is going to use.

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" version="4.4" client="site" method="upgrade">
    <name>Joomla module tutorial</name>
    <!-- highlight-next-line -->
    <version>1.0.3</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <description>Code used in the Joomla module tutorial</description>
    <!-- highlight-next-line -->
    <namespace path="src">My\Module\Hello</namespace>
    <files>
        <filename module="mod_hello">mod_hello.php</filename>
        <!-- highlight-next-line -->
        <folder>src</folder>
        <folder>tmpl</folder>
    </files>
</extension>
```

This means that we should store our PHP classes in the /src subfolder, and we have to include it within the `<files>` element so that the Joomla installer processes it. 
Then the namespace prefix \My\Module\Hello\Site will point to this folder, and we should name our classes below it according to the [PSR-4 recommendation](https://www.php-fig.org/psr/psr-4/). 

## Helper File

Following the Joomla convention, we call our helper class HelloHelper, and store it in src/Helper/HelloHelper.php. 
This then means that our namespace and class definitions must be 

```php
namespace My\Module\Hello\Site\Helper;

class HelloHelper { ... }
```

In the helper file we obtain the username of the logged-on user, using the User API. Here's the full code of the helper class:

```php title="mod_hello/src/Helper/HelloHelper.php"
<?php

namespace My\Module\Hello\Site\Helper;

use Joomla\CMS\Factory;

\defined('_JEXEC') or die;

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

(The backslash in front of the `defined` function is just to indicate that we want to use the PHP `defined` function in the global namespace, rather than this file's namespace. Here it won't matter if we omit the backslash because we haven't got a local `defined` function, and PHP will revert to the global one if it doesn't find one here.)

## Module main file

We update our module main file to use the helper:

```php title="mod_hello/mod_hello.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
// highlight-start
use My\Module\Hello\Site\Helper\HelloHelper;

$username = HelloHelper::getLoggedonUsername("Guest");
$data = "Hello {$username}";
// highlight-end

require ModuleHelper::getLayoutPath('mod_hello');
```

## Installation

Once again, zip up your mod_hello directory and install the upgraded module on Joomla. 

When you navigate to a site page you should now see 
- `"Hello <your username>"` displayed by the module when you're logged in
- `"Hello Guest"` when you're not logged in