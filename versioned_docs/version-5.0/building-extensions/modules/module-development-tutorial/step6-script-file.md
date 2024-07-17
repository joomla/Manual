---
sidebar_position: 6
title: Step 6 Adding a Script File
---

Step 6 Adding a Script File
===========================

## Introduction

From this step on we cover some more advanced topics.

In this step we include an installation script file. 
This script file is run whenever the extension is installed or uninstalled, and can be used to perform various operations associated with the installation, for example to:
- check the minimum PHP version and Joomla version required
- predefine default configuration for the extension

The source code is available at [mod_hello step 6](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step6_script). 

An installation script file is a class with 5 functions: 
- preflight - called at the start of the install process
- install, update, uninstall - called part way through the process:
    - install is called when the operation is an initial install of an extension
    - update is called when the operation is an install of an existing extension
    - uninstall is called when the operation is a removal of an extension
- postflight - called at the end of the install process

## Install Process

You should first read about the Joomla [Installation Process](../../install-update/install/install-process.md#installation-process), to get an understanding of how the script file fits into the overall process. 

## Script File

The easiest way to write a script file is to use the \Joomla\CMS\Installer\InstallerScriptInterface definition in libraries/src/Installer/InstallerScriptInterface.php.

You simply have to return an instance of a class which implements the 5 installer functions. The class name doesn't matter, so below we use an anonymous class:

```php title="script.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Installer\InstallerAdapter;
use Joomla\CMS\Installer\InstallerScriptInterface;
use Joomla\CMS\Language\Text;

return new class () implements InstallerScriptInterface {

    private string $minimumJoomla = '4.4.0';
    private string $minimumPhp    = '7.4.0';

    public function install(InstallerAdapter $adapter): bool
    {
        echo "mod_hello install<br>";
        return true;
    }

    public function update(InstallerAdapter $adapter): bool
    {

        echo "mod_hello update<br>";
        return true;
    }

    public function uninstall(InstallerAdapter $adapter): bool
    {
        echo "mod_hello uninstall<br>";
        return true;
    }

    public function preflight(string $type, InstallerAdapter $adapter): bool
    {
        echo "mod_hello preflight<br>";
        
        if (version_compare(PHP_VERSION, $this->minimumPhp, '<')) {
            Factory::getApplication()->enqueueMessage(sprintf(Text::_('JLIB_INSTALLER_MINIMUM_PHP'), $this->minimumPhp), 'error');
            return false;
        }

        if (version_compare(JVERSION, $this->minimumJoomla, '<')) {
            Factory::getApplication()->enqueueMessage(sprintf(Text::_('JLIB_INSTALLER_MINIMUM_JOOMLA'), $this->minimumJoomla), 'error');
            return false;
        }

        return true;
    }

    public function postflight(string $type, InstallerAdapter $adapter): bool
    {
        echo "mod_hello postflight<br>";
        return true;
    }
};
```

In the function calls:
- `$type` is a string containing the type of installation: 'install', 'update' or 'uninstall'. (Or it may be 'discover-install', but that's outside the scope of what we're covering here).
- `$adapter` is the instance of \Joomla\CMS\Installer\Adapter\ModuleAdapter (from libraries/src/Installer/Adapter/ModuleAdapter.php).

For several of the functions the code just echoes text to the screen and you will see these messages if the extension installs ok.
The text above is in English but you can use language strings if you put them into the .sys.ini file.

The preflight version checks the Joomla and PHP versions; this is important as the mod_hello code uses API calls which were not available before Joomla version 4. 

If the install fails (eg if the minimum version check fails) then Joomla responds to the HTTP request with a redirect back to the install extensions page. 
This means that any `echo` outputs will not be seen, and instead `enqueueMessage` must be used.
This function stores the message in the session, and Joomla outputs the message in response to the next HTTP request after the redirect response. 

## Manifest File

All that remains is to update the manifest file to notify Joomla that there is a script file to process:

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="UTF-8"?>
<extension type="module" client="site" method="upgrade">
    <name>MOD_HELLO_NAME</name>
    <!-- highlight-next-line -->
    <version>1.0.6</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <description>MOD_HELLO_DESCRIPTION</description>
    <namespace path="src">My\Module\Hello</namespace>
    <files>
        <folder module="mod_hello">services</folder>
        <folder>src</folder>
        <folder>tmpl</folder>
        <folder>language</folder>
    </files>
    <!-- highlight-next-line -->
    <scriptfile>script.php</scriptfile>
    <config>
        <fields name="params">
            <fieldset name="basic">
                <field
                    name="header"
                    type="list"
                    label="MOD_HELLO_HEADER_LEVEL"
                    default="h4"
                    >
                    <option value="h3">MOD_HELLO_HEADER_LEVEL_3</option>
                    <option value="h4">MOD_HELLO_HEADER_LEVEL_4</option>
                    <option value="h5">MOD_HELLO_HEADER_LEVEL_5</option>
                    <option value="h6">MOD_HELLO_HEADER_LEVEL_6</option>
                </field>
            </fieldset>
        </fields>
    </config>
</extension>
```