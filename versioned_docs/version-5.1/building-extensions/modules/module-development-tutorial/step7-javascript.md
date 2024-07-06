---
sidebar_position: 7
title: Step 7 Adding Javascript
---

Step 7 Adding Javascript
========================

## Introduction

In this step we add a "!" to the end of the "Hello Username" greeting, but implement this using javascript, and pass the "!" as a variable from the PHP code. 
So this step describes:
- how to pass variables from PHP to javascript.
- how to use the Joomla Web Asset Manager to manage the javascript asset

The source code is available at [mod_hello step 7](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step7_javascript). 

## Passing Variables to Javascript

To pass variables from PHP to js we use the [Document::addScriptOptions](cms-api://classes/Joomla-CMS-Document-Document.html#method_addScriptOptions) function. 

```php
$document = $this->app->getDocument();
$document->addScriptOptions('mod_hello.vars', array('suffix' => "!"));
```

We can get the `Document` instance (which is an object relating to what will be output in the HTML document) via the Application parameter that is injected into our module constructor by Joomla (as described in the previous tutorial step).

Then in the js code we can retrieve the variables using the same key "mod_hello.vars":

```js
const arr = Joomla.getOptions('mod_hello.vars');
console.log(arr);   // outputs Object { suffix: "!" }
```

You can set any string as the key for passing the Options, but it's conventional to start it with the extension name, because the data is passed in global storage, and this ensures that there isn't a clash with the key of another extension. 

We'll set an HTML class "mod_hello" on the element we're going to update, so our js code is:

```js title="mod_hello/media/js/add-suffix.js
if (!window.Joomla) {
  throw new Error('Joomla API was not properly initialised');
}

const { suffix } = Joomla.getOptions('mod_hello.vars');
document.querySelectorAll('.mod_hello').forEach(element => {
  element.innerText += suffix;
});
```

## Web Asset Manager

If you're not familar with the Web Asset Manager then you should read [this manual section](../../../general-concepts/web-asset-manager.md). 

Fur our js code file we create an asset in mod_hello/media/joomla.asset.json, as described in [Web Asset Manager Definition](https://manual.joomla.org/docs/general-concepts/web-asset-manager#definition):

```json title="mod_hello/media/joomla.asset.json"
{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "mod_hello",
  "version": "1.0.0",
  "description": "Joomla Module Tutorial",
  "license": "GPL-2.0-or-later",
  "assets": [
    {
      "name": "mod_hello.add-suffix",
      "type": "script",
      "uri": "mod_hello/add-suffix.js",
      "dependencies": [
        "core"
      ],
      "attributes": {
        "type": "module"
      },
      "version": "1.0.0"
    } 
  ]
}
```

We've used the function Joomla.getOptions to retrieve the suffix we set in the PHP code.
This function is in the Joomla core.js javascript library (in media/system/js/core.js), so we need to include "core" as a dependency. 

The Web Asset Manager doesn't automatically read the joomla.asset.json files of modules, so we need to tell it to process it, by calling `addExtensionRegistryFile` on the Web Asset Manager registry.
Then we need to tell it that we want to use the "mod_hello.add-suffix" asset, so that our js file gets included in the HTTP response:

```php
$document = $app->getDocument();
$wa = $document->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('mod_hello');
$wa->useScript('mod_hello.add-suffix');
```

The Web Asset Manager orders the HTML `<script>` elements to ensure that our dependency "core" is loaded before our add-suffix.js. 

The above code could be included in our Dispatcher code or in the tmpl file, but within Joomla the convention seems to be that it should go in the tmpl file.

Our updated tmpl file is:

```php title="mod_hello/tmpl/default.php"
<?php
defined('_JEXEC') or die;

// highlight-start
$document = $app->getDocument();
$wa = $document->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('mod_hello');
$wa->useScript('mod_hello.add-suffix');

// Pass the suffix to add down to js
$document->addScriptOptions('mod_hello.vars', array('suffix' => "!"));
// highlight-end

$h = $params->get('header', 'h4');
// highlight-next-line
$greeting = "<{$h} class='mod_hello'>{$hello}</{$h}>"
?>

<?php echo $greeting; ?>
```

## Updated Manifest File

We need to tell the Joomla installer to include our media folder, and to put those files below the /media/mod_hello folder. 

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="UTF-8"?>
<extension type="module" client="site" method="upgrade">
    <name>MOD_HELLO_NAME</name>
    <!-- highlight-next-line -->
    <version>1.0.7</version>
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
    <scriptfile>script.php</scriptfile>
    <!-- highlight-start -->
    <media destination="mod_hello" folder="media">
        <filename>joomla.asset.json</filename>
        <folder>js</folder>
    </media>
    <!-- highlight-end -->
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

All the js and css files should be stored below the Joomla /media folder, under a subfolder which has the same name as the extension.
Our js file will end up in /media/mod_hello/js/add-suffix.js.

When you have zipped up the updated module and installed it, then a site page should show the mod_hello greeting with the "!" at the end.

## Adding CSS

You can use the Web Asset Manager to add CSS files in a similar manner. For a file called example.css you should do the following:

1. Store the file in mod_hello/media/css/example.css

2. Include a style asset in the same mod_hello/media/joomla.asset.json file:

```json
    {
      "name": "mod_hello.example",
      "type": "style",
      "uri": "mod_hello/example.css",
      "version": "1.0.0"
    }
```

(just as in the case for js, the "uri" doesn't include the css subfolder).

3. Use the style in your PHP code:

```php
$wa->useStyle('mod_hello.example');
```
