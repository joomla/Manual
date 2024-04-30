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
<extension type="module" version="4.4" client="site" method="upgrade">
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
    </files>
    <languages>
        <language tag="en-GB">language/en-GB/mod_hello.ini</language>
        <language tag="en-GB">language/en-GB/mod_hello.sys.ini</language>
    </languages>
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
This includes a framework for handling the HTTP POST parameters, right through to storing these in the database. 

All this makes it very easy to develop Joomla forms quickly without having to duplicate boilerplate text, once you have overcome the initial threshold of understanding how they work.

In this case the `<config>` section specifies an HTML Select input field with a drop-down list. 
This field becomes part of the form which is presented when an administrator clicks on a module in the Content / Site Modules list.
(This form is actually defined in administrator/components/com_modules/forms/module.xml).

Some parts of this `<config>` section are described below:
- `<fields name="params">` results in the data being sent (in the HTTP POST parameters) in an array called `params`. This will map through to the database field "params" in this site module's record in the `#__modules` database table, where the params are stored as a JSON string.
- `<fieldset name="basic">` results in the field being included in the Module tab within the form. If you specified "advanced" instead then it would appear in the Advanced tab.
- `<field name="header">` you use this to get the value of the field
- `<field type="list">` specifies the type of Joomla field that will be generated. The types of fields available are listed at [standard form field types](https://docs.joomla.org/Standard_form_field_types).
- `<field label="MOD_HELLO_HEADER_LEVEL">` will get mapped to the HTML label for the field

:::note[TODO]
  Update the link above when the standard form fields are included to the manual
:::

## Obtaining the parameter value

When Joomla runs your module code it makes 5 variables available by default:
1. `$module` - a PHP stdClass with fields which are mostly aligned to the fields of the module's record in the `#__modules` table. 
2. `$app` - the `SiteApplication` instance
3. `$input` - the `Input` class instance through which you can get details of the HTTP request's parameters (as described [here](../../../general-concepts/input.md))
4. `$params` - a [Registry](https://github.com/joomla-framework/registry) instance containing the data of the module's params
5. `$template` - a string containing the name of the site template, eg "cassiopeia"

You can use these variables in your module code, but be careful not to change properties of `$module`, `$app` or `$input`, as these point to the real Joomla instances (ie they're not just copies).

We can obtain the value of the params field using the `name` of the field (which is set to "header"):

```php
$value = $params->get('header');
```

We use this in our updated tmpl file:

```php title="mod_hello/tmpl/default.php"
<?php
defined('_JEXEC') or die('Restricted Access');

// highlight-start
$h = $params->get('header');
$greeting = "<{$h}>{$data}</{$h}>"
// highlight-end
?>

// highlight-next-line
<?php echo $greeting; ?>
```

## Updated Language File

We must include the new language constants from our `<config>` in the .ini file:

```php title="language/en-GB/mod_hello.ini"
; language strings used inside mod_hello 
MOD_HELLO_NAME="Joomla Module Tutorial"
MOD_HELLO_DESCRIPTION="Source code for the Joomla module tutorial"
MOD_HELLO_GREETING="Hello "
; highlight-start
MOD_HELLO_HEADER_LEVEL="Header level of greeting"
MOD_HELLO_HEADER_LEVEL_3="Header level 3"
MOD_HELLO_HEADER_LEVEL_4="Header level 4"
MOD_HELLO_HEADER_LEVEL_5="Header level 5"
MOD_HELLO_HEADER_LEVEL_6="Header level 6"
; highlight-end
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