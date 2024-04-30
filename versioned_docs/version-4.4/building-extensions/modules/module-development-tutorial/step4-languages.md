---
sidebar_position: 4
title: Step 4 Adding Languages
---

Step 4 Adding Language Support
==============================

## Introduction

Up to now any text associated with our module has been in English. In this step we change it so that it can display multiple languages, so that:
- an adminstrator can view the module description in his/her preferred language
- a site visitor can see the module output with "Hello" replaced by a greeting in their own language

To view multiple languages on your site you have to configure it as multilingual. You can find online various videos and tutorials, for example [this one](https://www.themexpert.com/blog/beginners-guide-to-multilingual-joomla-website).

In this step we write the infrastructure to support multiple languages, but implement it only for English. 
If you configure your own site as multilingual then you can easily extend what's here to implement another language.

The source code is available at [mod_hello step4](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step4_languages). 

## Language Files

Our mod_hello module has 3 places where text is output:
1. The module name set in the `<name>` element of the manifest file.
2. The module description set in the `<description>` element of the manifest field
3. The greeting 'Hello' output by the module on the site page.

We define 3 language constants for these text strings: MOD_HELLO_NAME, MOD_HELLO_DESCRIPTION and MOD_HELLO_GREETING.

All the language constants should start with the (unique) name of the extension, as this ensures that there are no clashes with other extensions. By convention these are all in capitals.

We define values for these constants in 2 language files:

```php title="language/en-GB/mod_hello.sys.ini"
; mod_hello language strings for administrator listings of modules
MOD_HELLO_NAME="Joomla Module Tutorial"
MOD_HELLO_DESCRIPTION="Source code for the Joomla module tutorial"
```

```php title="language/en-GB/mod_hello.ini"
; language strings used inside mod_hello 
MOD_HELLO_GREETING="Hello "
```

The .sys.ini file is used for constants where the text appears in a form which lists multiple modules. 
For example in the administrator back-end in System / Manage / Extensions the list of extensions has
- the extension name in the Name field (as defined in the manifest file `<name>` element)
- the extension description, as a tooltip for the extension name (as defined in the manifest file `<description>` element).

The .ini file is used for constants which appear when the module is displayed. 

The reason for the split is performance, to minimise the number of language constants which have to be read.


## Updated Manifest File

We replace the English text in the manifest file with the language constants, and we also tell the Joomla installer where to find the language files:

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" version="4.4" client="site" method="upgrade">
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
        <filename module="mod_hello">mod_hello.php</filename>
        <folder>src</folder>
        <folder>tmpl</folder>
    </files>
    <!-- highlight-start -->
    <languages>
        <language tag="en-GB">language/en-GB/mod_hello.ini</language>
        <language tag="en-GB">language/en-GB/mod_hello.sys.ini</language>
    </languages>
    <!-- highlight-end -->
</extension>
```

## Interpreting the Language Constants

To obtain the text associated with a language constant the source code needs to do 2 things:
1. Load the appropriate language file (.ini or .sys.ini)
2. Obtain the text associated with an individual language constant.

For mod_hello Joomla handles loading the language files, both in the administrator forms and when rendering the module on the site pages.

For the administrator functionality Joomla also handles the interpretation of the mod_hello language constants.

The only thing left for us to do is to handle the language constants within the module code, and we do this using:

```php
use Joomla\CMS\Language\Text;
...
$text = Text::_('MOD_HELLO_GREETING');
```

Don't be concerned that the function name is an underscore - it's just an ordinary PHP function. 

Our updated main source code file is now:

```php title="mod_hello/mod_hello.php"
<?php
defined('_JEXEC') or die('Restricted Access');

use Joomla\CMS\Helper\ModuleHelper;
use My\Module\Hello\Site\Helper\HelloHelper;

$username = HelloHelper::getLoggedonUsername("Guest");
// highlight-next-line
$data = Text::_('MOD_HELLO_GREETING') . $username;

require ModuleHelper::getLayoutPath('mod_hello');
```

## Installation and Troubleshooting

Once again, zip up your mod_hello directory and install the upgraded module on Joomla. 

The language strings in the .sys.ini are slightly different from previous steps, so you should be able to see these differences when the extension is installed, and when you navigate to Administrator / System / Manage / Extensions.

The module output should be the same.

A useful tip is to go to System / Global Configuration / System tab, and then set Debug Language to Yes, and then Save.

This causes language strings to be highlighted between 2 asterisks. By toggling the Language Display option which appears you can get Joomla to output either the language constant or the associated text.
