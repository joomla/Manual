---
sidebar_position: 1
title: Adding JavaScript
---

Adding JavaScript to your Extension
===================================

This section covers what you need to do to add JavaScript to your Joomla extension.

## JavaScript Code Files

To add JavaScript files to your extension you should use the Joomla [Web Asset Manager](../web-asset-manager.md) and do the following.

### 1 Store your JavaScript files in the media folder

You should store your JS files in your development media/js folder, for example:

```
media
  ├─ css
  └─ js
      ├─ myjs1.js
      └─ myjs2.js
```

This then needs to copied into the media folder of your Joomla instance, so in your installation manifest file you need:

```xml title="Extension manifest file"
    <media destination="com_example" folder="media">
        <folder>js</folder>
    </media>
```

where here (and elsewhere in this documentation page) you need to replace "com_example" with the type and name of your extension.

When you install your extension Joomla will copy your js files into the folder media/com_example/js.

:::info
  You can also implement a JavaScript library for your extension in, for example, your development folder media/mylib/js/ containing js source files.
  This would get mapped to media/com_example/mylib/js when your extension is installed. 
:::

### 2 Create a media/joomla.asset.json file

Create a file `joomla.asset.json` in your media folder, as defined in [Web Asset Manager - Definition](../web-asset-manager.md#definition), for example:

```json
{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "com_example",
  "version": "1.0.0",
  "description": "Example joomla.asset.json file",
  "license": "GPL-2.0+",
  "assets": [
    {
      "name": "com_example.myjs1",
      "type": "script",
      "uri": "com_example/myjs1.js",
      "attributes": {
        "defer": true
      },
      "dependencies": [
        "core", "jquery"
      ],
      "version": "1.2.0"
    },
    {
      "name": "com_example.myjs2",
      "type": "script",
      "uri": "com_example/myjs1.min.js",
      "attributes": {
        "async": true
      },
      "dependencies": [
        "com_example.myjs1", "form.validate"
      ],
      "version": "1.0.3"
    }
    ]
}
```

Within the `assets` array the keys are:

**name** - you can assign any string here, but it's usual to set it to the name of your extension "dot" the name of your JavaScript file. 
This `name` is what you will use in your PHP code to get your JavaScript file included into the web page.
Including your extension name means that the name shouldn't clash with an asset of Joomla or any other extension.

**type** - this is "script" for JavaScript

**uri** - this tells Joomla where to find your code. It's the path under the media folder, **but with the js segment removed**. 
Note that you can use minified JavaScript, as in the "myjs2" example.
If you include both myjs2.js and myjs2.min.js in the js folder, 
then if you switch on Joomla Debug in the Global Configuration the Web Asset Manager will include the non-minified version. 

**attributes** - these are attributes which just get mapped to attributes of the HTML `<script>` tag within the page HTML output.

**dependencies** - the name or names of other assets upon which your code depends, for example in the json above:
- "com_example.myjs1" is dependent upon Joomla "core" (specified in media/system/joomla.asset.json as the Joomla core.js library)
and upon "jquery" (specified in media/vendor/joomla.asset.json)
- "com_example.myjs2" is dependent upon "form.validate" (specified in media/system/joomla.asset.json, for performing form field validation)
- "com_example.myjs2" is also dependent upon "com_example.myjs1" (in the same joomla.asset.json file),
so when myjs2.js is loaded Joomla will also load myjs1.js, and all of the dependencies of "com_example.myjs1" as well. 

The Web Asset Manager orders the `<script>` tags in the HTML to ensure that the browser processes the dependencies first.

How do you know the names of the Joomla libraries to include as dependencies? 
Entries in the [Joomla JavaScript Library](./js-library/index.md) may help, but you may need to look through the code files
- Joomla library assets are in media/system/joomla.asset.json, and refer to code in media/system/js
- vendor library assets are in media/vendor/joomla.asset.json, and refer to code in media/vendor/js

These two joomla.asset.json files are always processed by Joomla, so their assets are always available.

**version** - the version you want to apply to your JavaScript code. 
When you update your code then if you increase the version number then Joomla will force the browser to reload your code, instead of using a cached copy.
(It does this by adding your version as a query parameter in the URL of your js file).

You also need to get Joomla to copy your joomla.asset.json file into the media folder:

```xml title="Extension manifest file"
    <media destination="com_example" folder="media">
        <filename>joomla.asset.json</filename>
        <folder>js</folder>
    </media>
```

:::info
  If your extension has only 1 or 2 assets then you may find it more convenient 
  to [register your asset](../web-asset-manager.md#register-an-asset) directly with the Web Asset Manager, rather than via a joomla.asset.json file.
  You can use [WebAssetManager::registerScript](cms-api://classes/Joomla-CMS-WebAsset-WebAssetManager.html#method_registerScript):
  
```php
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->registerScript('com_example.myjs1', 'com_example/myjs1.js', [], ['defer' => 'true'], ["core", "jquery"]);
```  

  or use [WebAssetManager::method_registerAndUseScript](cms-api://classes/Joomla-CMS-WebAsset-WebAssetManager.html#method_registerAndUseScript)
  to both register and use your script in one go:

```php
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->registerAndUseScript('com_example.myjs1', 'com_example/myjs1.js', [], ['defer' => 'true'], ["core", "jquery"]);
```  
:::

### 3 Get Joomla to process your joomla.asset.json file

If your extension is a component or a template then Joomla performs this step automatically for you, and you have nothing to do.

If your extension is a plugin or a module then you need to register your file with the Web Asset Manager in your PHP code:

```php
$app = Factory::getApplication();
$document = $app->getDocument();
$wa = $document->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('mod_example');
```

The code above will get Joomla to process media/mod_example/joomla.asset.json and register the assets within it.

### 4 Use your asset in your PHP Code

```php
$app = Factory::getApplication();
$document = $app->getDocument();
$wa = $document->getWebAssetManager();
$wa->useScript('com_example.myjs2');
```

The Web Asset Manager will include a `<script>` tag for your myjs2.js code, plus tags for all its dependencies. 

In core Joomla the code for using scripts is usually placed within the relevant `tmpl` file, 
although you can place it in another file, for example in a `View` class file.
Sometimes a View may have different `tmpl` files, only one of which may need the JavaScript code,
so placing the `useScript` in the appropriate `tmpl` file will be more efficient.

:::tip
  If your extension uses Joomla library code then you may be able to access the `Document` instance using

```php
$document = $this->getDocument();
// or the Application instance via
$app = $this->getApplication();
```

  Using [Dependency Injection](../dependency-injection/index.md) in this way, rather than repeating calls to `Factory` static functions
  enables you to mock classes more easily for automated unit testing, to improve the quality of your code.
:::

## Using External JavaScript Libraries

To use an external library you specify the URL of the library as the value of the **uri** key of the asset. 

For example, to draw maps the [Joomla v3 Helloworld MVC tutorial](https://docs.joomla.org/J3.x:Developing_an_MVC_Component/Upgrading_to_Joomla4) 
used the [Openlayers JS library](https://github.com/openlayers/openlayers) distributed by [cdnjs.com](https://cdnjs.com/libraries/openlayers/4.6.4):

```json
    {
      "name": "com_helloworld.mymap",
      "type": "script",
      "uri": "com_helloworld/mymap.min.js",
      "dependencies": [
        "com_helloworld.openlayers"
      ],
      "attributes": {
        "defer": true
      },
      "version": "1.0.0"
    },
    {
      "name": "com_helloworld.openlayers",
      "type": "script",
      "uri": "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol.js",
      "dependencies": [
      ],
      "attributes": {
        "defer": true
      },
      "version": "4.6.4"
    }
```

## Inline Scripts

At times you may need to generate your JavaScript code dynamically, rather than having it stored in a file.

In this case you can use the Web Asset Manager [addInlineScript](cms-api://classes/Joomla-CMS-WebAsset-WebAssetManager.html#method_addInlineScript) function, for example:

```php
$hi = "function sayhi() { alert('Hi!'); }";
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->addInlineScript($hi);
```

See [Web Asset Manager - Add Inline Script](../web-asset-manager.md#add-inline-script) for further details. 

## Passing Variables to JavaScript

You can pass variables from your PHP code to your JavaScript code using the Document class [addScriptOptions](cms-api://classes/Joomla-CMS-Document-Document.html#method_addScriptOptions) method.

For example: 

```php
$phpvars = array('alpha' => 1, 'beta' => 'test', 'gamma' => null);
$document = Factory::getApplication()->getDocument();
$document->addScriptOptions('com_example.myvars', $phpvars);
```

Then you can retrieve these in your JavaScript:

```js
var jsvars = Joomla.getOptions('com_example.myvars');
console.log(jsvars);
```

This will output on the browser console the JavaScript Object structure:

```json
{alpha: 1, beta: "test", gamma: null}
```

You can use this multiple times in your code, using different keys (the key being 'com_example.myvars' in the example above). 

You should include your extension name within the key because the data is passed in global "options storage" and otherwise it could clash with data from another extension.

The `Joomla.getOptions` function is within the Joomla system core.js library file, so your JavaScript asset should include "core" as a dependency. 

## Passing Language Constants to JavaScript

You can pass language constants to JavaScript using the Language [Text::script](cms-api://classes/Joomla-CMS-Language-Text.html#method_script) function

```php
use Joomla\CMS\Language\Text;

Text::script('COM_EXAMPLE_ERROR_MESSAGE');
```

You should ensure that the extension's language is already loaded - Joomla does this in MVC library code for components, but it's not handled automatically for modules or plugins. 

Within your JavaScript you can access the translated string using:

```js
const errorMessage = Joomla.Text._('COM_EXAMPLE_ERROR_MESSAGE');
```

and you can write an error message into the message area of the Joomla webpage using:

```js
Joomla.renderMessages({ 'error': [errorMessage] });
```

If your language constants include `%s` to allow parameters, then you will have to use JavaScript functions to replace these `%s` entries.

The JavaScript `Joomla.Text._` function is in core.js, but the PHP `Text::script` function ensures that this is loaded for you.

The JavaScript `Joomla.renderMessages` function is in messages.js, so your asset needs to include "messages" as a dependency.

## Examples

The Module Development Tutorial [Step 7 Adding JavaScript](../../building-extensions/modules/module-development-tutorial/step7-javascript.md) contains examples of
- adding JavaScript files
- passing variables to JavaScript

The Module Development Tutorial [Step 9 Adding Ajax](../../building-extensions/modules/module-development-tutorial/step9-ajax.md) contains examples of
- passing language constants to JavaScript
- rendering messages within JavaScript