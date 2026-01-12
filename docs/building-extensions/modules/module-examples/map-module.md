---
sidebar_position: 2
title: Map Module
---

Map Module
==========

This section shows how to write a module which displays a dynamic map on a Joomla site.
It comes in two versions:

1. A simple version, for which the code is listed on this page

2. A more complex version, which is implemented as a package,
and available via the [Joomla manual examples repo](https://github.com/joomla/manual-examples).

## Background

To display a map you can either use [Raster or Vector map tiles](https://docs.maptiler.com/guides/general/raster-vs-vector-map-tiles-what-is-the-difference-between-the-two-data-types/);
this example uses raster tiles.

With raster tiles the map consists of a set of image files (usually png or jpg) laid out in a grid format,
and each image file displays a section of the map. These image files are known as map tiles.
There is a set of these tiles at each zoom level, so to identify a particular tile you need the x,y coordinate, plus the zoom level.

On top of these tiles you can mark features - for example, display a marker pin or show a GPS trail.

So to display a map on a web site you need:

1. A server where you can obtain the map tiles.

2. A javascript library which allows you to draw your features. 
It also presents controls which allow the user to scroll and zoom the map, 
and then obtains and displays the appropriate tiles from the tile server.

For the simple example we use the [OpenStreetMap](https://www.openstreetmap.org) (OSM) tile server
and the [OpenLayers](https://openlayers.org/) javascript library, which is open source.

Other [tile providers](https://wiki.openstreetmap.org/wiki/Raster_tile_providers) for OpenStreetMap data are available,
or you can use the tiles of other organisations such as Bing or Mapbox. 
(Note that Google doesn't allow you to use their map tiles if you're not using their javascript library).

Similarly you can find several map javascript libraries by searching the internet.

The use of the map tiles and/or the javascript licence may be subject to a commercial arrangement,
and you may be required to purchase an API key to use one or the other.

The more complex Joomla example uses OpenCycleMap map tiles from [Thunderforest](https://www.thunderforest.com).
At time of writing you can obtain a Hobby Project API key at [Thunderforest Pricing](https://www.thunderforest.com/pricing/)
which is free and does not require you to submit a credit card. 

## Simple Map Module

This allows you to display an OSM map in a module position. 
You can create several modules (including on the same page),
each with its own configuration of map position and zoom level.

To create the module write the following 6 files in a folder `mod_simple_map`:

```
mod_simple_map
    ├── mod_simple_map.xml
    ├── services/
    │   └── provider.php
    ├── src/
    │   └── Dispatcher/
    │       └── Dispatcher.php
    ├── tmpl/
    │   └── default.php
    └── media/
        ├── joomla.asset.json
        └── js/
            └── ol-maps.js
```

Note that to make the module as simple as possible we've taken some short cuts,
for example, the module uses just English, instead of language strings.
The more complex example which you can download from the Joomla Manual Examples repository fixes these shortcomings. 

Most of the concepts used in the source files below are described in the
[Module Development Tutorial](../module-development-tutorial/index.md),
and the explanations won't be repeated here.

### Manifest File

```xml title="mod_simple_map/mod_simple_map.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
    <name>Example Simple Map</name>
    <version>1.0.1</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <description>Displays a map in a module</description>
    <namespace path="src">My\Module\Map</namespace>
    <files>
        <folder module="mod_simple_map">services</folder>
        <folder>src</folder>
        <folder>tmpl</folder>
    </files>
    <media destination="mod_simple_map" folder="media">
        <filename>joomla.asset.json</filename>
        <folder>js</folder>
    </media>
    <config>
        <fields name="params">
            <fieldset name="basic">
                <field
                    name="lat"
                    type="number"
                    min="-90"
                    max="90"
                    label="Latitude"
                    />
                <field
                    name="long"
                    type="number"
                    min="-180"
                    max="180"
                    label="Longitude"
                    />
                <field
                    name="zoom"
                    type="integer"
                    first="1"
                    last="12"
                    step="1"
                    label="Zoom level"
                    />
            </fieldset>
        </fields>
    </config>
</extension>
```

As you can see, the module has 3 configurable parameters, the x and y values of the map position, and the zoom level.

### Service Provider file

```php title="mod_simple_map/services/provider.php"
<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Extension\Service\Provider\Module as ModuleServiceProvider;
use Joomla\CMS\Extension\Service\Provider\ModuleDispatcherFactory as ModuleDispatcherFactoryServiceProvider;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

return new class () implements ServiceProviderInterface {

    public function register(Container $container): void
    {
        $container->registerServiceProvider(new ModuleDispatcherFactoryServiceProvider('\\My\\Module\\Map'));
        $container->registerServiceProvider(new ModuleServiceProvider());
    }
};
```

This is just a standard services/provider.php file for a basic module.

### Dispatcher file

```php title="mod_simple_map/src/Dispatcher/Dispatcher.php"
<?php

namespace My\Module\Map\Site\Dispatcher;

\defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\DispatcherInterface;
use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Application\CMSApplicationInterface;
use Joomla\Input\Input;
use Joomla\Registry\Registry;

class Dispatcher implements DispatcherInterface
{
    protected $module;
    
    protected $app;

    public function __construct(\stdClass $module, CMSApplicationInterface $app, Input $input)
    {
        $this->module = $module;
        $this->app = $app;
    }

    public function dispatch()
    {
        $params = new Registry($this->module->params);

        $config = array('id' => 'mod_simple_map_' . $this->module->id,  // id of HTML div element for the map
                        'lat' => (float)$params->get('lat'),
                        'long' => (float)$params->get('long'),
                        'zoom' => (int)$params->get('zoom'),
                        );

        require ModuleHelper::getLayoutPath('mod_simple_map');
    }
}
```

The Dispatcher class provides the entry point for our module code. 

The constructor passes in the `$module` instance and the Application instance,
and we use the `$module` to find the unique id of the module instance,
and the configuration parameters which are stored in the `$module->params` property.

If the administrator configures on the site a number of instances of this map module,
then each will have its own unique id and separate configuration.

The `require ModuleHelper::getLayoutPath('mod_simple_map');` line will end up doing a PHP `require` of our
tmpl/default.php within the scope of the `dispatch()` function,
so the `$config` variable set up here will be available to use in that tmpl/default.php file. 

### tmpl file

```php title="mod_simple_map/tmpl/default.php"
<?php
defined('_JEXEC') or die;

$document = $this->app->getDocument();
$wa = $document->getWebAssetManager();
$wr = $wa->getRegistry();
$wr->addRegistryFile('media/mod_simple_map/joomla.asset.json');

$wa->usePreset('mod_simple_map.osmmaps');

$vars = $document->getScriptOptions('mod_simple_map.mapdata');
if ($vars) {
    $vars[] = $config;
} else {
    $vars = array($config);
}

$document->addScriptOptions('mod_simple_map.mapdata', $vars);

?>

<div>
    <div id="<?php echo $config['id']; ?>" style="height: 400px; width: 100%"></div>
</div>
```

This uses the [Web Asset Manager](../../../general-concepts/web-asset-manager.md) to process our 
`joomla.asset.json` file which contains the CSS and JavaScript files required by the module.
(For performance reasons, `joomla.asset.json` files for modules are not processed automatically by Joomla).

We then tell the Web Asset Manager to use the Preset defined in the asset file,
and this ensures our module js code and the Openlayers js and css code gets included with the HTTP response.

The [Document::addScriptOptions](cms-api://classes/Joomla-CMS-Document-Document.html#method_addScriptOptions) 
API enables passing the values of PHP variables down to the Javascript code. 
As there may be several instances of this site module configured for a page, 
the configuration data for each of them must be sent down independently,
and this is implemented by checking what other instances have set, and adding this instance's elements to the array.

Also, the id of the html element which is the map container includes the unique id of the module instance.

A general description of how to include JavaScript in your extension is given in 
[Adding JavaScript to your Extension](../../../general-concepts/javascript/adding-javascript.md).

### Media Asset File

```json title="mod_simple_map/media/joomla.asset.json"
{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "mod_simple_map",
  "version": "1.0.0",
  "description": "Example Map Module",
  "license": "GPL-2.0-or-later",
  "assets": [
    {
      "name": "mod_simple_map.osmmaps",
      "type": "preset",
      "dependencies": [
        "mod_simple_map.ol-maps#script",
        "mod_simple_map.openlayers#style",
        "mod_simple_map.openlayers#script"
      ]
    },
    {
      "name": "mod_simple_map.ol-maps",
      "type": "script",
      "uri": "mod_simple_map/ol-maps.js",
      "attributes": {
        "defer": true
      },
      "dependencies": [
        "core",
        "mod_simple_map.openlayers"
      ],
      "version": "1.0"
    },
    {
      "name": "mod_simple_map.openlayers",
      "type": "script",
      "uri": "https://cdn.jsdelivr.net/npm/ol@v10.7.0/dist/ol.js",
      "dependencies": [
      ],
      "attributes": {
        "defer": true
      },
      "version": "10.7.0"
    },
    {
      "name": "mod_simple_map.openlayers",
      "type": "style",
      "uri": "https://cdn.jsdelivr.net/npm/ol@v10.7.0/ol.css",
      "dependencies": [
      ],
      "attributes": {
        "defer": true
      },
      "version": "10.7.0"
    }
  ]
}
```

The Preset includes the module's `ol-maps.js` JavaScript code,
plus the CSS and JS OpenLayers library files.

Some points to note:

1. The "defer" = true attribute maps through to the `defer` attribute of the HTML `<script>` attribute,
which means that the script is executed after the document has been parsed. 

2. Making the openlayers js code a dependency of the ol-maps js code means that Joomla will ensure
that the browser will execute the openlayers js code before ol-maps.
Otherwise the javascript would halt whenever ol-maps.js referenced an openlayers entity.
(Having "mod_simple_map.openlayers#script" as a dependency of the preset as well is rather superfluous). 

4. Adding a "version" to your js (or css) code is a good idea. When you update your code (and your version number)
then Joomla will ensure that clients will use the latest version, rather than the browser using a cached version.

### JavaScript File

The Javascript code gets the configuration details of all of the map modules to be shown on the page,
and uses the OpenLayers library to draw each map. 

```js title="mod_simple_map/media/js/ol-maps.js"
// Get the data passed down from all the map modules set on the site page
// and draw a map for each module
let mapsdata = Joomla.getOptions('mod_simple_map.mapdata');
mapsdata.forEach(function(mapdata) {
    drawMap(mapdata);
});

function drawMap(mapdata) {

    // To draw a map, Openlayers needs:
    // 1. a target HTML element into which the map is put
    // 2. a map layer, which can be eg a Vector layer with details of polygons for
    //    country boundaries, lines for roads, etc, or a Tile layer, with individual
    //    .png files for each map tile (256 by 256 pixel square). We use a Tile layer.
    // 3. a view, specifying the 2D projection of the map (default Spherical Mercator),
    //    map centre coordinates and zoom level

    // we use raster Tile layers, and need to specify a source for the tiles
    let mapTile = new ol.layer.Tile({  // use the OSM server
        source: new ol.source.OSM()
    });

    // Use the module config lat, long and zoom values, plus the tile layer we've defined, to create the map
    const x = parseFloat(mapdata.long);
    const y = parseFloat(mapdata.lat);
    const mapCentre = ol.proj.fromLonLat([x, y]);

    const map = new ol.Map({
        target: mapdata.id,
        layers: [
            mapTile
        ],
        view: new ol.View({
            center: mapCentre,
            zoom: mapdata.zoom
        })
    });
}
```

### Installation

After you install the module Joomla will create a site module which you need to configure by specifying

- the latitude, longitude and zoom level of the map

- the template position to display the module

- the status, which should be set to Published

- the pages on which the module should be shown, via the Menu Assignment tab.

When you navigate to such a page on your site then the module should appear with the OpenStreetMap map.

You can create further instances of the site map module to display several maps on the same web page.

## Using an API Key

If you need to specify an API key to display a map, 
then you can obviously extend the module configuration to add an additional field to capture the key.

However, this means that the site administrator needs to add in this common API key into each site module,
and there could be several modules on the site. 
So really it would be better if the administrator had to enter the API key only once.

The solution adopted here is to use a plugin to capture the API key within its configuration.

When Joomla renders modules a number of [Module Events](../../plugins/plugin-events/module.md) are dispatched. 

The plugin listens for the [onRenderModule](../../plugins/plugin-events/module.md#onrendermodule) event,
and if the module being rendered is the map module, 
then it uses [Document::addScriptOptions](cms-api://classes/Joomla-CMS-Document-Document.html#method_addScriptOptions) 
to pass the configured API key down to the Javascript code.

To tie the plugin and module together we use a Joomla [package](../../packages.md). 
This means that we can install both extensions in a single install operation,
and we can ensure that neither the plugin nor module can be uninstalled separately,
and the uninstall operation has to be performed at the package level.

## Maps Package

The source code for the map package is available at [Manual Examples - map package](https://github.com/joomla/manual-examples/pull/51).
However, the functionality for using the API key is currently commented out in the javascript file.

To use the package with the API key do the following:

1. Fork/clone the [Manual Examples](https://github.com/joomla/manual-examples) repository to your personal computer. 

2. Obtain an API key at [Thunderforest](https://www.thunderforest.com/pricing/). 
(At time of writing no credit card is required).

3. Uncomment the lines in the module javascript file ./constituents/mod_example_maps/media/js/ol-maps.js (around lines 25-36).

4. Install the package - on your Joomla administrator Install Extensions page
click on the Install from Folder tab, and enter the directory in which the package manifest xml file is found.
You don't need to zip up any folders.

5. On the administrator Manage Plugins page edit the Map API key Plugin entry
to specify your API key and set the plugin status to Enabled.

6. On the administrator Site Modules page edit the Example Map Module entry, and enter

  - the map position, zoom and any marker pins you want to show on it

  - the template position where the module should appear

  - the Status as Published
  
  - on the Menu Assignment tab, the pages where the module should appear

7. Navigate to a site page where the module should appear, and you should see a depiction of the Thunderforest OpenCycleMap.

The `<blockChildUninstall>` tag within the package manifest file means that the module and plugin
cannot be separately uninstalled. 

### Module code

The module code is similar to simpler case above, but some aspects have been tidied up:

- the code uses language strings instead of hard-coding English text

- the js code is wrapped in an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) to avoid 
creating JavaScript global variables

- the functionality is extended to allow you to specify the position of marker pins on the map

- the js code supports retrieving the API key (passed down by the plugin) and using it to display the Thunderforest OpenCycleMap.

### Plugin code

Most of the plugin code is just boilerplate code. 

The code specific to this extension is in src/Extension/MapApiKey.php, and the comments should hopefully make this easy to understand.
