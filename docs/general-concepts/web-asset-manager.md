Web Asset Manager
=======================

## Concept

In the frontend world many assets are related. For example our keepalive script depends on the core.js file for options management. In Joomla there never was an easy way to specify this, you just had to include multiple files. Joomla 4 changes this with the concept of web assets.

## Definition

Related assets are defined in a JSON file such as [system/joomla.asset.json#L14-L21](https://github.com/joomla/joomla-cms/blob/7b72c565b610e02c1b01f8958d622879631fa6a2/build/media_source/system/joomla.asset.json#L14-L21)

This has a structure of having a schema definition (for validation), name, version, license and then one or more asset definitions. Assets are comprised of a list of js files and css files related to the assets and any dependencies. The dependencies section is just a list of asset names that are required for the asset to function. Example:

```json
{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "com_example",
  "version": "4.0.0",
  "description": "Joomla CMS",
  "license": "GPL-2.0+",
  "assets": [
    {
      "name": "bar",
      "type": "style",
      "uri": "com_example/bar.css"
    },
    {
      "name": "bar",
      "type": "script",
      "uri": "com_example/bar.js"
    },
    {
      "name": "beer",
      "type": "style",
      "uri": "com_example/beer.css",
      "dependencies": [
        "bar"
      ]
    },
    {
      "name": "beer",
      "type": "script",
      "dependencies": [
        "core",
        "bar"
      ],
      "uri": "com_example/beer.js",
      "attributes": {
        "defer": true,
        "data-foo": "bar"
      }
    }
  ]
}
```

The `$schema` attribute is a schema definition file that allows you to validate your file using JSON Schema. Read [the official website](https://json-schema.org/understanding-json-schema/index.html) for more information on json schema validation works.

:::note Note

Having joomla.asset.json for your extension or template are recommend but not required to WebAssset to work (see next section).
:::

:::note Note

It is not recommended to add an inline asset to a json file, prefer to use a file.
:::

## Explaining asset stages

Each asset has 2 stages: **registered** and **used**.

### Registered
Registered is a stage when an asset is loaded into `WebAssetRegistry`. That means `WebAssetManager` knows about the existence of these assets, but will not attach them to a document while rendering.

All assets loaded from `joomla.asset.json` is at `registered` stage.

### Used
Used is a stage when an asset is enabled via `$wa->useAsset()` (->useScript(), ->useStyle(), ->registerAndUseX() etc). That means `WebAssetManager` will attach these assets and their dependencies to a document while rendering.

An asset cannot be used if it was not registered before, this will cause an unknown asset exception.

## Register an asset

All known assets loaded and then stored in `WebAssetRegistry` (to enable/disable an asset item you have to use `WebAssetManager`, see next section).

Joomla! will look for next assets definition automatically at runtime (in following order):

```
media/vendor/joomla.asset.json (on first access to WebAssetRegistry)
media/system/joomla.asset.json
media/legacy/joomla.asset.json
media/{com_active_component}/joomla.asset.json (on dispatch the application)
templates/{active_template}/joomla.asset.json
```

And load them to registry of known assets.

:::note Note

Each following assets definition will override asset items from previous assets definition, by item name.
:::

You can register your own assets definition via `WebAssetRegistry`:

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wr = $wa->getRegistry();
$wr->addRegistryFile('relative/path/to/your/joomla.asset.json');
```

To add a custom asset item at runtime:

```php
$wr->add('script', new Joomla\CMS\WebAsset\WebAssetItem('foobar', 'com_foobar/file.js', ['type' => 'script']));
```

Or more simply, using `WebAssetManager`:

```php
$wa->registerScript('foobar', 'com_foobar/file.js');
```

The new asset item `foobar` will be added to the registry of know assets, but will not be attached to a document until your code (a layout, template etc) will request it.

To check whether an asset exists:

```php
if ($wa->assetExists('script', 'foobar'))
{
    var_dump('Script "foobar" exists!');
}
```

## Enabling an asset

All asset management in the current Document handled by `WebAssetManager`, which is accessible with `$doc->getWebAssetManager();`

By using Asset Manager you can enable or disable needed asset easily in Joomla! through a standard methods.

To enable an asset in the page use the useAsset function, for example:

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('keepalive');

// Or multiple
$wa->useScript('keepalive')
    ->useScript('fields.validate')
    ->useStyle('foobar')
    ->useScript('foobar');

// Add new asset item with dependency and use it
$wa->registerAndUseScript('bar', 'com_foobar/bar.js', [], [], ['core', 'foobar']);
```

`WebAssetManager` will look to `WebAssetRegistry` whether the requested asset exists, and will enable it for current Document instance. Otherwise it will throw an `UnknownAssetException`.

To disable an asset in the page use the disableAsset function. The example below will disable the jquery-noconflict asset from being loaded.

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->disableScript('jquery-noconflict');
```

:::note Note

If there are any dependencies to the disabled asset, then this asset will be re-enabled automatically, no matter what.
:::

To check whether asset enabled, and the asset state:

```php
// Checking whether an asset are active (enabled manually or automatically as dependency)
if ($wa->isAssetActive('script', 'foobar'))
{
    var_dump('Script "foobar" is active!');
}

// Checking state
switch($wa->getAssetState('script', 'foobar')){
	case Joomla\CMS\WebAsset\WebAssetManager::ASSET_STATE_ACTIVE:
		var_dump('Active! Was enabled manually');
		break;
	case Joomla\CMS\WebAsset\WebAssetManager::ASSET_STATE_DEPENDENCY:
		var_dump('Active! Was enabled automatically while resolving dependencies');
		break;
	default:
		var_dump('not active!');
}
```

## Overriding an asset

Overriding may be useful when you need to redefine the URI of asset item or its dependencies.
As already was noted, each of the following assets definition from joomla.asset.json will override asset items from previous assets definitions, by item name.

That means if you provide joomla.asset.json which contain already loaded asset items, they will be replaced with your items.
Another way to override in the code is to register an item with the same name.

Example, we have "foobar" script, that load com_example/foobar.js library, and we want to use CDN for this exact library:

How it defined in the system initially:

```json
...
{
  "name": "foobar",
  "type": "script",
  "uri": "com_example/foobar.js",
  "dependencies": ["core"]
}
...
```

To override the URI we define the asset item with "foobar" name in our joomla.asset.json:

```json
...
{
  "name": "foobar",
  "type": "script",
  "uri": "http://foobar.cdn.blabla/foobar.js",
  "dependencies": ["core"]
}
...
```

Or, register new asset item with AssetManager:

```php
$wa->registerScript('foobar', 'http://fobar.cdn.blabla/foobar.js', [], [], ['core']);
```

## Working with styles

Asset Manager allow to manage Stylesheet files. Stylesheet asset item have a type "style".

Example json definition of item in joomla.asset.json:

```json
...
{
  "name": "foobar",
  "type": "style",
  "uri": "com_example/foobar.css"
}
...
```

### Methods to work with styles

Asset Manager offers the following methods to work with style files:

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

// Attach foobar to the document
$wa->useStyle('foobar');

// Disable foobar from being attached
$wa->disableStyle('foobar');

// Register custom item without json definition
$wa->registerStyle('bar', 'com_example/bar.css', [], ['data-foo' => 'some attribute'], ['some.dependency']);
// And use it later
$wa->useStyle('bar');

// Register and attach a custom item in one run
$wa->registerAndUseStyle('bar', 'com_example/bar.css', [], ['data-foo' => 'some attribute'], ['some.dependency']);
```

### Add inline style

Additionally to style files, WebAssetManager allows you to add an inline style, and maintain their relation to the file asset.
Inline styles may be placed directly before the dependency, after the dependency, or as usual after all styles.

Inline asset may have a name as well as other assets (but not required), the name can be used to retrieve the asset item from a registry, or as a dependency to another inline asset. If the name is not specified then a generated name based on a content hash will be used.

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

// Add an inline content as usual, will be rendered in flow after all assets
$wa->addInlineStyle('content of inline1');

// Add an inline content that will be placed after "foobar" asset
$wa->addInlineStyle('content of inline2', ['position' => 'after'], ['data-foo' => 'bar'], ['foobar']);

// Add an inline content that will be placed before "foobar" asset
$wa->addInlineStyle('content of inline3', ['position' => 'before'], [], ['foobar']);

// Named inline asset
$wa->addInlineStyle('content of inline4', ['name' => 'my.inline.asset']);
```

:::note Note

`foobar` asset should exist in the asset registry, otherwise you will get an unsatisfied dependency exception.
:::

Example above will produce:

```html
...
<style>content of inline3</style>
<link rel="stylesheet" href="foobar.css" />
<style data-foo="bar">content of inline2</style>
...
...
<style>content of inline1</style>
<style>content of inline4</style>
...
```

If inline asset has multiple dependencies, then will be used last one for positioning. Example:

```php
$wa->addInlineStyle('content of inline1', ['position' => 'before'], [], ['foo', 'bar']);
$wa->addInlineStyle('content of inline2', ['position' => 'after'], [], ['foo', 'bar']);
```
Will produce:

```html
...
<link rel="stylesheet" href="foo.css" />
<style>content of inline1</style>
<link rel="stylesheet" href="bar.css" />
<style>content of inline2</style>
...
```

:::note Note

Named inline assets may be a dependency to another inline asset, however it is not recommended to use an inline asset as dependency to non-inline asset. This will work, but this behavior may change in the future. Prefer to use "position" instead.
:::

## Working with scripts

Asset Manager allow to manage Script files. Script asset item have a type "script".
Example json definition of item in joomla.asset.json:

```json
...
{
  "name": "foobar",
  "type": "script",
  "uri": "com_example/foobar.js",
  "dependencies": ["core"]
}
...
```

Example json definition of ES6 module script, with fallback to legacy:

```json
...
{
  "name": "foobar-legacy",
  "type": "script",
  "uri": "com_example/foobar-as5.js",
  "attributes": {
    "nomodule": true,
    "defer": true
  },
  "dependencies": ["core"]
}
{
  "name": "foobar",
  "type": "script",
  "uri": "com_example/foobar.js",
  "attributes": {
    "type": "module"
  },
  "dependencies": [
    "core",
    "foobar-legacy"
  ]
}
...
```

### Methods to work with scripts

Asset Manager offer next methods to work with script files:

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

// Attach foobar to the document
$wa->useScript('foobar');

// Disable foobar from being attached
$wa->disableScript('foobar');

// Register custom item without json definition
$wa->registerScript('bar', 'com_example/bar.js', [], ['defer' => true], ['core']);
// And use it later
$wa->useScript('bar');

// Register and attach a custom item in one run
$wa->registerAndUseScript('bar','com_example/bar.js', [], ['defer' => true], ['core']);
```

### Add inline script

Addittionally to script files WebAssetManager allow to add an inline script, and maintain their relation to the file asset.
Inline script may be placed directly before the dependency, after the dependency, or as usual after all scripts.

Inline asset may have a name as well as other assets (but not required), the name can be used to retrieve the asset item form a registry, or as dependency to another inline asset. If name not specified then will be used generated name based on a content hash.

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

// Add an inline content as usual, will be rendered in flow after all assets
$wa->addInlineScript('content of inline1');

// Add an inline content that will be placed after "foobar" asset
$wa->addInlineScript('content of inline2', ['position' => 'after'], ['data-foo' => 'bar'], ['foobar']);

// Add an inline content that will be placed before "foobar" asset
$wa->addInlineScript('content of inline3', ['position' => 'before'], [], ['foobar']);

// Named inline asset
$wa->addInlineScript('content of inline4', ['name' => 'my.inline.asset']);

// Specify script type
$wa->addInlineScript('content of inline5', [], ['type' => 'module']);
```

:::note Note

`foobar` asset should exist in the asset registry, otherwise you will get an unsatisfied dependency exception.
:::

Example above will produce:

```html
...
<script>content of inline3</script>
<script src="foobar.js"></script>
<script data-foo="bar">content of inline2</script>
...
...
<script>content of inline1</script>
<script>content of inline4</script>
<script type="module">content of inline5</script>
...
```

If inline asset have a multiple dependencies, then will be used last one for positioning. Example:

```php
$wa->addInlineScript('content of inline1', ['position' => 'before'], [], ['foo', 'bar']);
$wa->addInlineScript('content of inline2', ['position' => 'after'], [], ['foo', 'bar']);
```

Will produce:

```html
...
<script src="foo.js"></script>
<script>content of inline1</script>
<script src="bar.js"></script>
<script>content of inline2</script>
...
```

:::note Note

Named inline asset may be as dependency to another inline asset, however it is not recmomended to use an inline asset as dependency to non-inline asset. This will work, but this behavior may changes in future. Prefer to use "position" instead.
:::

## Working with a web component

Joomla! allows you to use [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for your needs. In Joomla! web components are not loaded as regular script, but loaded via Web Component loader so that they are loaded asynchronously.

In all other aspects, working with web components in Asset Manager is the same as working with a `script` asset item.

Example json definition of some web components in joomla.asset.json (as ES6 module):

```json
...
{
  "name": "webcomponent.foobar",
  "type": "style",
  "uri": "com_example/foobar-custom-element.css",
},
{
  "name": "webcomponent.foobar",
  "type": "script",
  "uri": "com_example/foobar-custom-element.js",
  "attributes": {
     "type": "module"
  },
}
...
```

Example with fallback, for browsers that does not support ES6 `module` feature. Note that the legacy script should have `wcpolyfill` dependency, and module script should have dependency from legacy script:

```json
...
{
  "name": "webcomponent.foobar",
  "type": "style",
  "uri": "com_example/foobar-custom-element.css",
},
{
  "name": "webcomponent.foobar-legacy",
  "type": "script",
  "uri": "com_example/foobar-custom-element-es5.js",
  "attributes": {
    "nomodule": true,
    "defer": true
  },
  "dependencies": [
    "wcpolyfill"
  ]
},
{
  "name": "webcomponent.foobar",
  "type": "script",
  "uri": "com_example/foobar-custom-element.js",
  "attributes": {
    "type": "module"
  },
  "dependencies": [
    "webcomponent.foobar-legacy"
  ]
}
...
```

Alternatively you can register them in PHP (as ES6 module):

```php
$wa->registerStyle('webcomponent.foobar', 'com_example/foobar-custom-element.css')
    ->registerScript('webcomponent.foobar', 'com_example/foobar-custom-element.js', ['type' => 'module']);
```

Attach to document:

```php
$wa->useStyle('webcomponent.foobar')
    ->useScript('webcomponent.foobar');
```

:::note Note

It is preferred to prefix the asset name with "webcomponent." to make it easily to spot, and distinct it from regular scripts in a layout.
:::

### Methods to work with web component

All methods to work with a web component are the same as methods to work with script asset item.

## Working with a presets

`Preset` is a special kind of asset item that hold a list of items that has to be enabled, in same way as direct call of `useAsset()` to each of item in the list.
Preset can hold mixed types of assets (script, style, another preset, etc.), the type should be provided after `#` symbol and follows after an asset name, example: `foo#style`, `bar#script`.

Example json definition of item in joomla.asset.json:

```json
...
{
  "name": "foobar",
  "type": "preset",
  "uri": "",
  "dependencies": [
    "core#script",
    "foobar#style",
    "foobar#script",
  ]
}
...
```

### Methods to work with preset

Asset Manager offer next methods to work with preset items:

```php
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

// Attach all items from foobar preset to the document
$wa->usePreset('foobar');

// Disable all items from foobar preset from being attached
$wa->disablePreset('foobar');

// Register custom item without json definition
$wa->registerPreset('bar', '', [], [], ['core#script', 'bar#script']);

// And use it later
$wa->usePreset('bar');

// Register and attach a custom item in one run
$wa->registerAndUsePreset('bar','', [], [], ['core#script', 'bar#script']);
```

## Advanced: Custom WebAssetItem class

The default class for all WebAsset items is `Joomla\CMS\WebAsset\WebAssetItem`.

You are also allowed to use a custom class, which must implement `Joomla\CMS\WebAsset\WebAssetItemInterface` or extend `Joomla\CMS\WebAsset\WebAssetItem`.

A custom class can allow you to do advanced actions, for example, including a script file depending on an active language:

```php
class MyComExampleAssetItem extends WebAssetItem
{
	public function getUri($resolvePath = true): string
	{
		$langTag = Factory::getApplication()->getLanguage()->getTag();
		// For script asset use ".js", for style we would use ".css"
		$path    = 'com_example/bar-' . $langTag . '.js';

		if ($resolvePath)
		{
			// For script asset use "script", for style we would use "stylesheet"
			$path = $this->resolvePath($path, 'script');
		}

		return $path;
	}
}
```

Additionally, implementing `Joomla\CMS\WebAsset\WebAssetAttachBehaviorInterface` allows you to add a script options (which may depend on the environment) when your asset is enabled and attached to the Document.

```php
class MyFancyFoobarAssetItem extends WebAssetItem implements WebAssetAttachBehaviorInterface
{
	public function onAttachCallback(Document $doc): void
	{
		$user = Factory::getApplication()->getIdentity();
		$doc->addScriptOptions('com_example.fancyfoobar', ['userName' => $user->username]);
	}
}
```

:::note Important note:

An asset item that implements `WebAssetAttachBehaviorInterface` should be enabled before [onBeforeCompileHead](https://docs.joomla.org/Plugin/Events/System#onBeforeCompileHead) event, otherwise `onAttachCallback` will be ignored.
:::

### Defining a custom WebAssetItem class in joomla.asset.json

In joomla.asset.json you can define which Class should be used with specific AssetItem.
For this you can use 2 properties `namespace` and `class`. `namespace` can be defined at Root level (then it will be used as default namespace for all Asset items in joomla.asset.json) or in the Item level. For example:

```json
{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "com_example",
  "version": "4.0.0",
  "namespace": "Joomla\Component\Example\WebAsset",
  "assets": [
    {
      "name": "foo",
      "type": "script",
      "class": "FooAssetItem",
      "uri": "com_example/foo.js"
    },
    {
      "name": "bar",
      "type": "script",
      "namespace": "MyFooBar\Library\Example\WebAsset",
      "class": "BarAssetItem",
      "uri": "com_example/bar.js"
    }
  ]
}
```

Here the asset `foo` will be associated with class `Joomla\Component\Example\WebAsset\FooAssetItem`, and `bar` with class `MyFooBar\Library\Example\WebAsset\BarAssetItem`.

:::note Note

If `namespace` are not defined then by default will be used `Joomla\CMS\WebAsset`. When `namespace` is defined but empty, then no namespace will be used, only `class`. Example:
:::

```json
{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "com_example",
  "assets": [
    {
      "name": "foo",
      "type": "script",
      "class": "FooAssetItem",
      "uri": "com_example/foo.js"
    },
    {
      "name": "bar",
      "type": "script",
      "namespace": "",
      "class": "BarAssetItem",
      "uri": "com_example/bar.js"
    }
  ]
}
```

Here the asset `foo` will be associated with class `Joomla\CMS\WebAsset\FooAssetItem`, and `bar` with class `BarAssetItem` (without namespace).
