---
title: Caching Components and Modules
sidebar_position: 1
toc_max_heading_level: 4
---

## Administration Cache Options

To understand how to incorporate cache within components and modules
it's useful to appreciate the configuration options available to Joomla administrators.

Joomla provides 3 configuration options:

1. Page Cache - available by configuring the plugin System - Page Cache

2. Progressive Caching - enabled by setting the Global Configuration / System tab / System Cache option
to "ON - Progressive caching"

3. Conservative Caching - enabled by setting the Global Configuration / System tab / System Cache option
to "ON - Conservative caching"

These 3 mechanisms are outlined below, but you may wish to watch a couple of videos which demonstrate them:

- [Page Cache](https://www.youtube.com/watch?v=A6ou7AAl0Eg)

- [Progressive and Conservative Cache](https://www.youtube.com/watch?v=3GSy9qTzRIk)

These videos were recorded for Joomla 3, but although there have been minor changes - for example, 
the page cache plugin is now triggered on onAfterRoute rather than onAfterInitialise -
the general principles described are still valid. 

If you wish to experiment with Joomla caching then you can download the little module used in the videos
to display the current time at [mod_curtime](_assets/mod_curtime.zip).

:::warning
  There is a lot of information on the Internet describing Joomla Progressive and Conservative caching
  which is either outdated or simply wrong!
:::

The descriptions below relate to Joomla using file storage to cache the content.
By default, the caching files are stored in the administrator/cache folder,
but can be changed via the Global Configuration / System tab / Path to Cache Folder parameter.

Note that **Joomla performs no caching for logged-on users** - this is true of all 3 types of caching. 
There are a couple of good reasons for this:

- You can't serve cached content to user B which has been cached when user A visited the page.
This is because user B may not have the same [Joomla Access](../acl/acl-access.md) as user A, 
and may not be permitted to view content in the component view or in a module of the page.

- To handle the above, you'd need to store cache on an individual user basis,
and for a site with many users this could cause a massive amount of file usage.

### Page Cache

This option is enabled by setting the System - Page Cache plugin status to Enabled.

Then when someone visits a page on the site, Joomla writes the full HTML of the page to a file in the cache folder.

When there is another request for the same URL then Joomla returns the HTML which was stored in the file,
rather than generating the page HTML based on the component and modules for that page.

Joomla continues to serve the cached HTML until it's expired - 
as defined by the Cache Time Global Configuration parameter. 

Different site pages will obviously have different cache files stored,
and the Page Cache plugin has parameters to exclude certain menuitems and URLs.

Note that if an article is updated then the page cache is **NOT** automatically cleared. 
The cached article will continue to be served until the cache expiry time is reached.
Alternatively an administrator can clear the cache via the System / Clear Cache functionality. 

Individual extensions have no control over this page caching - Joomla handles it completely. 

(As an aside, the Platform Specific Caching parameter within the Global Configuration
refers to the ability to store different versions of the same page for computers and mobile devices.
However, as most templates are now responsive this parameter has now become obsolescent.)

### Progressive Cache

Progressive Caching is enabled by setting the System Cache option to "ON - Progressive caching".

When someone visits a site page then there are 2 things which can be cached

1. The output associated with the view of the component which is displayed on that page. 
This is under the control of the individual component, and is explained in the Component View Cache section below. 

2. The modules which are displayed on that web page. 
All these modules are written en bloc to a cache file in the com_modules subfolder under the cache folder. 
Individual modules have no control over this caching - Joomla handles it completely. 

If someone visits the same site page within the cache expiry time, 
then Joomla regenerates the HTML using

- the view cache stored for that component, and,

- the modules cache stored for the set of modules which are displayed on that page.

#### Component View Cache

Individual components determine whether the HTML associated with each of the component views can be cached or not.

This is managed within the component Controller display() function,
and as an example, consider the following code within the com_content DisplayController::display() method:

```php
public function display($cachable = false, $urlparams = false)
{
    $cachable = true;
    ...
    $user = $this->app->getIdentity();
    if (
        $user->id
        || ($this->input->getMethod() === 'POST'
        && (($vName === 'category' && $this->input->get('layout') !== 'blog') || $vName === 'archive'))
    ) {
        $cachable = false;
    }
```

Here com_content is determining whether what is being displayed can be cached or not.
The HTML can be cached (ie `$cachable = true`) unless:

- the site visitor is logged on, or,

- it's an HTTP POST with certain conditions regarding the view and layout which are being used

Of course, com_content usually displays lots of different pages on a site,
eg individual articles, articles in a category, featured articles, etc.
When the com_content output is stored in a cache file, 
then the file must be specific to the type of view / category / article etc,
so that when the cache is served to the next visitor it matches what is expected.

To do this, com_content sets the `$safeurlparams`, 
and passes them with the `$cachable` variable to the parent `display()` function:

```php
$safeurlparams = [
            'catid'            => 'INT',
            'id'               => 'INT',
            'cid'              => 'ARRAY',
            'year'             => 'INT',
            'month'            => 'INT',
            'limit'            => 'UINT',
            'limitstart'       => 'UINT',
            'showall'          => 'INT',
            'return'           => 'BASE64',
            'filter'           => 'STRING',
            'filter_order'     => 'CMD',
            'filter_order_Dir' => 'CMD',
            'filter-search'    => 'STRING',
            'print'            => 'BOOLEAN',
            'lang'             => 'CMD',
            'Itemid'           => 'INT', ];
...
parent::display($cachable, $safeurlparams);
```

It's basically saying that the combination of these `$safeurlparams` 
will be sufficiently unique to create a cache file based on them. 

The Joomla library cache code uses these `$safeurlparams` by:

- finding the value of the URL parameter for each of them

- for those URL parameters which have matched, create an md5 hash of the parameter values

This hash is then used within the name of the cache file, 
which is stored in the com_content subfolder under the cache folder.

Note that com_content doesn't check the setting of the Global Config caching parameter. 
The core Joomla code checks this on behalf of component,
and if it's set then it uses the cache if the component states that the content is `$cachable`.

Joomla components also clear their cache after an administrator has performed certain modifications,
such as editing an article, reordering articles, or deleting articles.

It's usual for components to use libraries/src/MVC/Model/AdminModel.php to handle these sorts of operations,
and such functions in AdminModel make a call to:

```php
$this->cleanCache();
```

The component model can then override `cleanCache()` to remove relevant cache files. 
For example, the com_content ArticleModel has 

```php
protected function cleanCache($group = null, $clientId = 0)
{
    parent::cleanCache('com_content');
    parent::cleanCache('mod_articles');
    parent::cleanCache('mod_articles_archive');
    parent::cleanCache('mod_articles_categories');
    parent::cleanCache('mod_articles_category');
    parent::cleanCache('mod_articles_latest');
    parent::cleanCache('mod_articles_news');
    parent::cleanCache('mod_articles_popular');
}
```

This clears the component view cache ('com_content') 
plus the cache of certain modules related to com_content 
(which have been generated when conservative caching has been set).

### Conservative Cache

Conservative Caching is enabled by setting the System Cache option to "ON - Conservative caching".

When someone visits a site page then there are 2 things which can be cached

1. The output associated with the view of the component which is displayed on that page. 
This is under the control of the individual component, and is exactly the same as for Progressive Cache. 

2. Individual modules which are displayed on that web page, under the control of each module.

#### Individual Module Cache

An example of a cachable Joomla module is mod_breadcrumbs, which displays the site breadcrumbs.
You configure caching on this module by navigating to administrator Content / Site Modules,
and then selecting the breadcrumbs module to edit it. Under the Advanced tab are the options:

- Caching - which can be set to:
  - Use Global - uses the Global Configurating / System cache setting, 
  so when this is set to Conservative caching then this site module will be cached
  - No caching - the site module is not cached
  
- Cache Time - in seconds

:::warning
  Note that the cache time in the Site Modules configuration is in seconds,
  whereas the Global Configuration cache time is in minutes.
:::

You can have the same module appear as 2 different Site Modules, 
and each can have its own cache settings.

To enable caching on an individual module you just have to include the cache configuration for the module.
So you have to have within the module manifest file:

```xml
<config>
    <fields name="params">
        <fieldset name="advanced">
            <field
                name="cache"
                type="list"
                label="COM_MODULES_FIELD_CACHING_LABEL"
                default="0"
                filter="integer"
                validate="options"
                >
                <option value="1">JGLOBAL_USE_GLOBAL</option>
                <option value="0">COM_MODULES_FIELD_VALUE_NOCACHING</option>
            </field>
            <field
                name="cache_time"
                type="number"
                label="COM_MODULES_FIELD_CACHE_TIME_LABEL"
                default="0"
                filter="integer"
            />
        </fieldset>
    </fields>
</config>
```

Joomla handles the caching depending upon the settings it finds in these parameters.

If a module doesn't include this configuration then it's not cached under Conservative caching.

## Enabling caching in your extensions

To enable caching in your own extension, follow the examples described in [Component View Cache](#component-view-cache)
and [Individual Module Cache](#individual-module-cache) above.

For **components**, in your component DisplayController:

```php
public function display($cachable = false, $urlparams = false)
{
    
    // Set conditions for when you want your component to use or to not use caching
    // It's usual to disable caching for logged-on users
    $cachable = ...
    
    // Decide which URL parameters will give your component a unique page display
    $safeurlparams = [
        'id'               => 'INT',
        ...
        ];

    // pass the parameters to the parent display()
    parent::display($cachable, $safeurlparams);

    return $this;
}
```

In your component model(s), clear the cache whenever the administrator (or on the front-end, if allowed)
makes a change which should be reflected in the site.

```php
protected function cleanCache($group = null, $clientId = 0)
{
    parent::cleanCache('com_example');
}
```

For **modules**, include the configuration parameters in the manifest file,
as described in [Individual Module Cache](#individual-module-cache) above.