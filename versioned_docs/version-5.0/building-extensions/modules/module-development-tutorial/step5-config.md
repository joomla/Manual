---
sidebar_position: 5
title: Step 5 Adding Configuration
---

Step 5 Adding Configuration
===========================

## Introduction

In this step we add a configuration parameter which specifies the header level of the "Hello" message. 
By clicking on the module within Content / Site Modules an administrator will be able to set the header level between h3 and h6.

As an aside, you may have noticed that there are module parameters in the Advanced tab of the administrator Module edit form.
These refer to the module wrapper and module title which Joomla adds automatically to each module.

The source code is available at [mod_hello step 5](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step5_config). 

## Updated Manifest File

The configuration is implemented by adding a section to the manifest file:

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
    <name>MOD_HELLO_NAME</name>
    <!-- highlight-next-line -->
    <version>1.0.5</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <description>MOD_HELLO_DESCRIPTION</description>
    <namespace path="src">My\Module\Hello</namespace>
    <files>
        <filename module="mod_hello">mod_hello.php</filename>
        <folder>src</folder>
        <folder>tmpl</folder>
        <folder>language</folder>
    </files>
    <!-- highlight-start -->
    <config>
        <fields name="params">
            <fieldset name="basic">
                <field
                    name="header"
                    type="list"
                    label="MOD_HELLO_HEADER_LEVEL"
                    >
                    <option value="h3">MOD_HELLO_HEADER_LEVEL_3</option>
                    <option value="h4">MOD_HELLO_HEADER_LEVEL_4</option>
                    <option value="h5">MOD_HELLO_HEADER_LEVEL_5</option>
                    <option value="h6">MOD_HELLO_HEADER_LEVEL_6</option>
                </field>
            </fieldset>
        </fields>
    </config>
    <!-- highlight-end -->
</extension>
```

Joomla provides a mechanism for defining HTML forms in XML, which you can read about in the [Forms](../../../general-concepts/forms/index.md) and [Form Fields](../../../general-concepts/forms-fields/index.md) sections. 
This includes a framework for handling the form HTTP POST parameters, right through to storing these in the database. 

All this makes it very easy to develop Joomla forms quickly without having to duplicate boilerplate text, once you have overcome the initial threshold of understanding how they work.

In this case the `<config>` section specifies an HTML Select input field with a drop-down list. 
This field becomes part of the form which is presented when an administrator clicks on a module in the Content / Site Modules list.
(This form is actually defined in administrator/components/com_modules/forms/module.xml).

Some parts of this `<config>` section are described below:
- `<fields name="params">` results in the data being sent (in the HTTP POST parameters) in an array called `params`. This will map through to the database field "params" in this site module's record in the `#__modules` database table, where the params are stored as a JSON string.
- `<fieldset name="basic">` results in the field being included in the Module tab within the form. If you specified "advanced" instead then it would appear in the Advanced tab.
- `<field name="header">` you use this to get the value of the field in your code
- `<field type="list">` specifies the type of Joomla field that will be generated. The types of fields available are listed at [standard form field types](https://docs.joomla.org/Standard_form_field_types).
- `<field label="MOD_HELLO_HEADER_LEVEL">` will get mapped to the HTML label for the field

:::note[TODO]
  Update the link above when the standard form fields are included to the manual
:::

## Obtaining the parameter value

When Joomla instantiates your Dispatcher class it passes into the constructor 3 parameters:

```php
public function __construct(\stdClass $module, CMSApplicationInterface $app, Input $input)
```

Let's look at each parameter in more detail.

### Module Parameter

The `$module` parameter is a structure with several fields related to the module, and several of these can be found in the `#__modules` database table. 
In particular, the configuration parameters are held in a field called `params` in a JSON string. 

To access the individual parameters you can use the Joomla [Registry class](https://github.com/joomla-framework/registry), which is a utility class for manipulating data structures. 

In our Dispatcher constructor we'll store the `$module` as an instance variable, and then later access the 'header' parameter like this:

```php
use Joomla\Registry\Registry;

$params = Registry($this->module->params);

// and in the tmpl file:
$h = $params->get('header', 'default');
```

See the [Registry API documentation](https://api.joomla.org/framework-3/classes/Joomla-Registry-Registry.html) for details. 

### Application Parameter

The Application class is the central class of the Joomla application, and having access to it enables us to access many other Joomla class instances, such as the Language class in the previous tutorial step. 

In our Dispatcher constructor we'll store it as an instance variable `$app`, and then use it to replace the line:

```php
$language = Factory::getApplication()->getLanguage();
```

with 

```php
$language = $this->app->getLanguage();

```

### Input Parameter

This can be used to access URL parameters, as described in [Input documentation](../../../general-concepts/input.md), but there's no need to use it in mod_hello.

## Updated Dispatcher File

```php title="mod_hello/src/Dispatcher/Dispatcher.php"
<?php

namespace My\Module\Hello\Site\Dispatcher;

\defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\DispatcherInterface;
use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Application\CMSApplicationInterface;
use Joomla\Input\Input;
use Joomla\Registry\Registry;
use My\Module\Hello\Site\Helper\HelloHelper;

class Dispatcher implements DispatcherInterface
{
    // highlight-start
    protected $module;
    
    protected $app;

    public function __construct(\stdClass $module, CMSApplicationInterface $app, Input $input)
    {
        $this->module = $module;
        $this->app = $app;
    }
    // highlight-end
    
    public function dispatch()
    {
        // highlight-next-line
        $language = $this->app->getLanguage();
        $language->load('mod_hello', JPATH_BASE . '/modules/mod_hello');
        
        $username = HelloHelper::getLoggedonUsername('Guest');

        $hello = Text::_('MOD_HELLO_GREETING') . $username;
        
        // highlight-next-line
        $params = new Registry($this->module->params);

        require ModuleHelper::getLayoutPath('mod_hello');
    }
}
```

## Updated tmpl File

Remember that the tmpl file will run in the same function context as our `dispatch()` function, so we can access the `$params` variable which we defined there.

```php title="mod_hello/tmpl/default.php"
<?php
defined('_JEXEC') or die;

// highlight-start
$h = $params->get('header', 'h4');
$greeting = "<{$h}>{$hello}</{$h}>"
// highlight-end
?>

// highlight-next-line
<?php echo $greeting; ?>
```

## Updated Language File

We must include the new language constants from our `<config>` in the .ini file:

```php title="mod_hello/language/en-GB/mod_hello.ini"
; language strings used inside mod_hello 
MOD_HELLO_NAME="Joomla Module Tutorial"
MOD_HELLO_DESCRIPTION="Source code for the Joomla module tutorial"
MOD_HELLO_GREETING="Hello "
// highlight-start
MOD_HELLO_HEADER_LEVEL="Header level of greeting"
MOD_HELLO_HEADER_LEVEL_3="Header level 3"
MOD_HELLO_HEADER_LEVEL_4="Header level 4"
MOD_HELLO_HEADER_LEVEL_5="Header level 5"
MOD_HELLO_HEADER_LEVEL_6="Header level 6"
// highlight-end
```

## Installation

After installing the zip file in the usual way, you can go to Administrator Content / Site Modules and click on the mod_hello module to edit it.
This should allow you to change the header level between h3 and h6. 
Once you save the changes, display a site page and use your browser's devtools to examine the html element.

## Extensions and Modules tables

You may have noticed that mod_hello appears in both the `#__extensions` and `#__modules` database tables, and may be wondering why.

The `#__extensions` table contains records for all of the extensions which are installed on the Joomla instance. 
There will only ever be one record for each extension in this table.

The `#__modules` table contains records for each module which has been selected to appear on either the administrator back-end or site front-end, one record for each module instance.
You can create multiple instances of mod_hello (or any module) to appear in different (or even the same) template positions on the webpages. 
You will then get multiple instances of that module in the `#__modules` database table.

When Joomla installs mod_hello it not only creates the `#__extensions` record, but it tries to make it easy for you by creating a `#__modules` record as well. 
It assumes that, because you're installing this module, you're going to want to use it on a web page.
Of course, it doesn't know where you want to put it (template position) and it's not sure if you really want it on a page, so it creates it in an unpublished state, with menu assignment set to "No pages".

The configuration we've implemented here relates to the configuration of the individual module instances. 
So you can create multiple instances of mod_hello with Content / Site Modules, each with its own particular configuration parameters.