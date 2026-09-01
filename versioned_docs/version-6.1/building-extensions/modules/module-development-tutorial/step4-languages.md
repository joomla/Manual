---
sidebar_position: 4
title: Step 4 Adding Languages
---

Step 4 Adding Language Support
==============================

## Introduction

Up to now any text associated with our module has been in English. In this step we change it so that it can display multiple languages, so that:
- an administrator can view the module description in his/her preferred language
- a site visitor can see the module output with "Hello" replaced by a greeting in their own language

To view multiple languages on your site you have to configure it as multilingual. You can find online various videos and tutorials, for example [this one](https://www.themexpert.com/blog/beginners-guide-to-multilingual-joomla-website).

In this step we write the infrastructure to support multiple languages, but implement it only for English. 
If you configure your own site as multilingual then you can easily extend what's here to implement another language.

The source code is available at [mod_hello step 4](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step4_languages). 

## Language Files

Our mod_hello module has 3 places where text is output:
1. The module name set in the `<name>` element of the manifest file.
2. The module description set in the `<description>` element of the manifest field
3. The greeting 'Hello' output by the module on the site page.

We define 3 language constants for these text strings: MOD_HELLO_NAME, MOD_HELLO_DESCRIPTION and MOD_HELLO_GREETING.

All the language constants should start with the (unique) name of the extension, as this ensures that there are no clashes with other extensions. By convention these are all in capitals.

We define values for these constants in 2 language files:

```php title="mod_hello/language/en-GB/mod_hello.sys.ini"
; mod_hello language strings for administrator listings of modules
MOD_HELLO_NAME="Joomla Module Tutorial"
MOD_HELLO_DESCRIPTION="Source code for the Joomla module tutorial"
```

```php title="mod_hello/language/en-GB/mod_hello.ini"
; language strings used inside mod_hello 
MOD_HELLO_NAME="Joomla Module Tutorial"
MOD_HELLO_DESCRIPTION="Source code for the Joomla module tutorial"
MOD_HELLO_GREETING="Hello "
```

The .sys.ini file is used for constants where the text appears in an HTML form which lists multiple modules. 
For example in the administrator back-end in System / Manage / Extensions the list of extensions has
- the extension name in the Name field (as defined in the manifest file `<name>` element)
- the extension description, as a tooltip for the extension name (as defined in the manifest file `<description>` element).

The .ini file is used for constants which appear when the individual module is displayed.

The name and description constants are needed in the .ini file as well because Joomla displays them when an administrator selects Content / Site Modules and creates or edits a mod_hello module.
In this case Joomla just reads the .ini file as it's the single mod_hello module which is being displayed.

The reason for the split is performance, to minimise the number of language constants which have to be read.

## Updated Manifest File

We replace the English text in the manifest file with the language constants, and we also tell the Joomla installer where to find the language files:

As described in the [Manifest File Languages section](../../install-update/installation/manifest.md#languages), there are 2 ways of including language files in an extension, and we opt for the second approach.

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="UTF-8"?>
<extension type="module" client="site" method="upgrade">
    <!-- highlight-next-line -->
    <name>MOD_HELLO_NAME</name>
    <!-- highlight-next-line -->
    <version>1.0.4</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <!-- highlight-next-line -->
    <description>MOD_HELLO_DESCRIPTION</description>
    <namespace path="src">My\Module\Hello</namespace>
    <files>
        <folder module="mod_hello">services</folder>
        <folder>src</folder>
        <folder>tmpl</folder>
        <!-- highlight-next-line -->
        <folder>language</folder>
    </files>
</extension>
```

## Interpreting the Language Constants

To obtain the text associated with a language constant the source code needs to do 2 things:
1. Load the appropriate language file (.ini or .sys.ini)
2. Obtain the text associated with an individual language constant.

We can load the language .ini file in our module using:

```php
use Joomla\CMS\Factory;

$language = Factory::getApplication()->getLanguage();
$language->load('mod_hello', JPATH_BASE . '/modules/mod_hello');
```

We obtain the text associated with an individual language constant using:

```php
use Joomla\CMS\Language\Text;
...
$text = Text::_('MOD_HELLO_GREETING');
```

Don't be concerned that the function name is an underscore - it's just an ordinary PHP function. 

We'll add these lines in our Dispatcher code.

In the administrator forms Joomla looks after loading the language and interpreting the language constants, for example when editing the module via Content / Site Modules. 

Our updated main Dispatcher source code file is now:

```php title="mod_hello/src/Dispatcher/Dispatcher.php"
<?php

namespace My\Module\Hello\Site\Dispatcher;

\defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\DispatcherInterface;
use Joomla\CMS\Helper\ModuleHelper;
// highlight-next-line
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use My\Module\Hello\Site\Helper\HelloHelper;

class Dispatcher implements DispatcherInterface
{
    public function dispatch()
    {
        // highlight-start
        $language = Factory::getApplication()->getLanguage();
        $language->load('mod_hello', JPATH_BASE . '/modules/mod_hello');
        // highlight-end
        
        $username = HelloHelper::getLoggedonUsername('Guest');

        // highlight-next-line
        $hello = Text::_('MOD_HELLO_GREETING') . $username;

        require ModuleHelper::getLayoutPath('mod_hello');
    }
}
```

## Installation, Tips and Troubleshooting

Once again, zip up your mod_hello directory and install the upgraded module on Joomla. 

The text of the language strings in the .sys.ini is slightly different from previous steps, so you should be able to see these differences when the extension is installed, and when you navigate to Administrator / System / Manage / Extensions.

The module output should be the same.

A useful tip is to go to System / Global Configuration / System tab, and then set Debug Language to Yes, and then Save.

This causes language strings to be highlighted between 2 asterisks. By toggling the Language Display option which appears you can get Joomla to output either the language constant or the associated text.

If you're writing a multilingual module which has a lot of language constants then you should consider how best to order them in the language files, otherwise it can be hard to spot missing constants in foreign language files.
For example, in Joomla extensions they're ordered alphabetically.
