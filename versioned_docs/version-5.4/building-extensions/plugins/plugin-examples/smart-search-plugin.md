---
title: Smart Search Plugin
sidebar_position: 8
---

Smart Search Plugin
===================

## Introduction

Smart Search (`com_finder`) is the search component of Joomla.
Rather than querying the database tables of each extension when a user searches,
Smart Search builds an index of the content of your site in advance,
and then searches through that index.

The content which gets indexed is provided by Smart Search plugins (plugins in the `finder` group).
Joomla comes with Smart Search plugins for articles, categories, contacts, news feeds and tags.
If you want the content of your own component to be found by Smart Search then you have to write a Smart Search plugin for it.

This section demonstrates how to write a Smart Search plugin.
It indexes the landmarks of the `com_example` component which is developed in the
[Component Development Tutorial](../../components/component-development-tutorial/index.md),
so you can install the component from
[step 16 of the tutorial](https://github.com/joomla/manual-examples/tree/main/component-tutorial/step16_config)
and then install this plugin to try it out.

## Migrating from Search Plugins

Before Joomla 4 there was also a Search component (`com_search`), which ran a search
by triggering the `onContentSearchAreas` and `onContentSearch` events,
and each Search plugin queried the database tables of its extension directly.

The Search component is no longer part of Joomla core since Joomla 4,
and it isn't supported from Joomla 6.0 onwards.
So if you have a Search plugin for your extension then you should replace it by a Smart Search plugin.

The two types of plugins work in a very different way:

| Search plugin (`com_search`)                                    | Smart Search plugin (`com_finder`)                                                         |
|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| runs its database query every time a user searches              | adds the content to the index when the index is built, or when the content is changed     |
| has to match the search words itself, typically using `LIKE`    | Smart Search matches the search words against the index, including stemming and weighting |
| returns the matching items in the `onContentSearch` event       | passes each item to the indexer as a `Result` object                                       |
| checks the published state and access level in its query        | stores the published state and access level in the index, so they must be kept up to date |

The SQL query which your Search plugin used to find the items to display is a good starting point for the
`getListQuery()` method of your Smart Search plugin, but without the conditions which match the search words.

## How Smart Search Plugins Work

A Smart Search plugin extends the abstract `Adapter` class of `com_finder`
(`Joomla\Component\Finder\Administrator\Indexer\Adapter`, in `administrator/components/com_finder/src/Indexer/Adapter.php`),
which does most of the work.

### Building the index

When an administrator selects the Index button in the Smart Search administrator component
(or runs `php cli/joomla.php finder:index` from the command line)
the indexer triggers these events, which the `Adapter` class subscribes to:

- `onStartIndex` - the `Adapter` uses your `getListQuery()` to count how many items you have to index
- `onBeforeIndex` - the `Adapter` calls your `setup()` method, where you can do any preparation
- `onBuildIndex` - this is triggered repeatedly, and each time the `Adapter` uses your `getListQuery()`
to read the next batch of items and calls your `index()` method for each of them.

So you need to provide:
- `getListQuery()` - which returns the query to read your items from the database.
Each row is converted into a `Result` object (`Joomla\Component\Finder\Administrator\Indexer\Result`).
- `index()` - which completes the `Result` object, for example with the URL of the item, and passes it to the indexer
- `setup()` - which can just return `true` if no preparation is needed.

The `Result` object has properties which the indexer stores for each item, the most important of which are:

| Property   | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| `url`      | the unique key of the item in the index - this should be the non-SEF URL of the item     |
| `route`    | the non-SEF URL which is used to link to the item from the search results                |
| `title`    | the title of the item                                                                    |
| `summary`  | the text of the item; this is indexed and shown as the description in the search results |
| `state`    | 1 if the item should be found by a search, 0 otherwise                                   |
| `access`   | the access level of the item; only users who have this access level will find the item   |
| `language` | the language of the item - this defaults to `*` (all languages)                          |

The indexer splits the `title`, `summary` and some other properties into words and stores them in the index,
giving a higher weight to words in the title than to words in the text.
You can index further properties by calling the `addInstruction()` method of the `Result` object.

By calling `addTaxonomy()` you can add the item to taxonomies such as Type, Category or Language,
which enables users to filter the search results.

### Keeping the index up to date

When an item is saved, deleted or has its published state changed in the administrator back-end,
the index needs to be updated, otherwise the search results would be out of date.

Joomla's Admin models (`AdminModel`) trigger the
[content events](../plugin-events/content.md) `onContentAfterSave`, `onContentAfterDelete` and `onContentChangeState`,
and the "Content - Smart Search" plugin passes these on to the Smart Search plugins as
`onFinderAfterSave`, `onFinderAfterDelete` and `onFinderChangeState`.
The events include a `context` (for example `com_example.landmark`),
so your plugin can check that the event relates to one of its items.

Your plugin should handle these events by calling methods of the `Adapter` class:

- `reindex($id)` - to index again the item which has been saved
- `remove($id)` - to remove a deleted item from the index
- `change($id, 'state', $value)` - to update the published state of an item in the index.

Where an item has been deleted without these events being triggered (for example, directly in the database),
it remains in the index until an administrator selects Maintenance / Optimise in the Smart Search administrator component,
which triggers `onFinderGarbageCollection`. The `Adapter` handles this event
by removing the entries in the index for which there's no longer a record in your database table.

### Categories and access levels

Many Joomla components store their items within categories, and their items have an access level and a language.
The `Adapter` class includes a number of methods to support this.
For example, `itemStateChange()` takes into account the published state of the category of an item,
and `categoryAccessChange()` updates the access level of the items in a category after the access level of the category has been changed.
You can see how these are used in the Smart Search plugins of Joomla, for example in `plugins/finder/contacts`.

The landmarks of `com_example` don't belong to a category, and don't have an access level or a language,
so these features aren't used in this example.

## Plugin Source Code

You can copy the source code below into a directory `plg_finder_landmarks`, then zip the directory and install it.

After installation, remember to enable the plugin, then go to the Smart Search administrator component
and select the Index button. The landmarks should then be shown in the list of indexed content,
and you can find them using the Smart Search form or module on the site front-end.

### Manifest file

```xml title="plg_finder_landmarks/landmarks.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="finder" method="upgrade">
    <name>plg_finder_landmarks</name>
    <version>1.0.0</version>
    <description>PLG_FINDER_LANDMARKS_XML_DESCRIPTION</description>
    <author>Me</author>
    <creationDate>Today</creationDate>
    <namespace path="src">My\Plugin\Finder\Landmarks</namespace>
    <files>
        <folder plugin="landmarks">services</folder>
        <folder>src</folder>
        <folder>language</folder>
    </files>
</extension>
```

### Service Provider file

A standard service provider file for instantiating a plugin via the dependency injection container.
The plugin uses the database, so we also inject the database object into it.

```php title="plg_finder_landmarks/services/provider.php"
<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\Database\DatabaseInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use My\Plugin\Finder\Landmarks\Extension\Landmarks;

return new class () implements ServiceProviderInterface {
    public function register(Container $container)
    {
        $container->set(
            PluginInterface::class,
            function (Container $container) {
                $plugin = new Landmarks((array) PluginHelper::getPlugin('finder', 'landmarks'));
                $plugin->setApplication(Factory::getApplication());
                $plugin->setDatabase($container->get(DatabaseInterface::class));

                return $plugin;
            }
        );
    }
};
```

### Extension class file

The properties at the top of the class tell the `Adapter` about the content which the plugin indexes:

- `$context` - an identifier of the plugin, which must be unique among the Smart Search plugins.
It should be the plugin element name (`landmarks`), as the `Adapter` relies on this to remove the items from the index when the plugin is disabled.
- `$extension` and `$layout` - the `Adapter` uses these to build the URL of each item, in `getUrl()`.
In our case the URL becomes `index.php?option=com_example&view=landmark&id=<id>`.
The `$layout` is also used to look for a specific sublayout to display the item in the search results (see below).
- `$type_title` - the content type, which the `Adapter` registers with Smart Search when the plugin is first instantiated.
- `$table` and `$state_field` - the database table which holds the items, and the column which holds the published state.

```php title="plg_finder_landmarks/src/Extension/Landmarks.php"
<?php

namespace My\Plugin\Finder\Landmarks\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Event\Finder as FinderEvent;
use Joomla\Component\Finder\Administrator\Indexer\Adapter;
use Joomla\Component\Finder\Administrator\Indexer\Helper;
use Joomla\Component\Finder\Administrator\Indexer\Result;
use Joomla\Database\DatabaseAwareTrait;
use Joomla\Database\QueryInterface;
use Joomla\Event\SubscriberInterface;

final class Landmarks extends Adapter implements SubscriberInterface
{
    use DatabaseAwareTrait;

    // Unique identifier of the adapter - it must match the plugin element name (case-insensitive)
    protected $context = 'Landmarks';

    // The component which owns the content
    protected $extension = 'com_example';

    // The site view used to display a single item - used in the item URL and for the result sublayout
    protected $layout = 'landmark';

    // The content type, which is shown in the Smart Search filters
    protected $type_title = 'Landmark';

    // The database table which holds the content
    protected $table = '#__example_landmarks';

    // The column of the table which holds the published state
    protected $state_field = 'published';

    protected $autoloadLanguage = true;

    public static function getSubscribedEvents(): array
    {
        // The parent Adapter class subscribes to the events which are triggered when the index is built
        return array_merge(parent::getSubscribedEvents(), [
            'onFinderAfterSave'   => 'onFinderAfterSave',
            'onFinderAfterDelete' => 'onFinderAfterDelete',
            'onFinderChangeState' => 'onFinderChangeState',
        ]);
    }

    // Triggered after a landmark has been saved in the administrator edit form
    public function onFinderAfterSave(FinderEvent\AfterSaveEvent $event): void
    {
        if ($event->getContext() === 'com_example.landmark') {
            $this->reindex($event->getItem()->id);
        }
    }

    // Triggered after landmarks have been deleted (one event per landmark)
    public function onFinderAfterDelete(FinderEvent\AfterDeleteEvent $event): void
    {
        if ($event->getContext() === 'com_example.landmark') {
            $this->remove($event->getItem()->id);
        }
    }

    // Triggered after the published state of landmarks has been changed in the administrator landmarks list view
    public function onFinderChangeState(FinderEvent\AfterChangeStateEvent $event): void
    {
        $context = $event->getContext();

        if ($context === 'com_example.landmark') {
            foreach ($event->getPks() as $pk) {
                $this->change($pk, 'state', $this->translateState($event->getValue()));
            }
        }

        // Remove all landmarks from the index when this plugin is disabled
        if ($context === 'com_plugins.plugin' && $event->getValue() === 0) {
            $this->pluginDisable($event->getPks());
        }
    }

    protected function index(Result $item)
    {
        // Don't index anything if com_example is disabled
        if (ComponentHelper::isEnabled($this->extension) === false) {
            return;
        }

        // The URL is the unique key of the item in the index
        $item->url = $this->getUrl($item->id, $this->extension, $this->layout);

        // The route is the URL which is used to link to the item in the search results
        $item->route = $item->url;

        // Landmarks don't have an access level, so make them visible to everyone
        $item->access = 1;

        $item->state = $this->translateState($item->state);

        // Add the content type to the item, to allow users to filter the search results by type
        $item->addTaxonomy('Type', $this->type_title);

        // Allow other plugins to add extra content to the item
        Helper::getContentExtras($item);

        // Store the item in the index
        $this->indexer->index($item);
    }

    protected function setup()
    {
        return true;
    }

    protected function getListQuery($query = null)
    {
        $db = $this->getDatabase();

        // Use the supplied query (eg one restricting the ids to index) if there is one
        $query = $query instanceof QueryInterface ? $query : $db->createQuery();

        // The description is selected as the summary, so that it's indexed and shown in the search results
        $query->select($db->quoteName(['a.id', 'a.title', 'a.description', 'a.published'], ['id', 'title', 'summary', 'state']))
            ->from($db->quoteName($this->table, 'a'));

        return $query;
    }

    protected function getStateQuery()
    {
        // The Adapter version joins the categories table, but landmarks don't belong to a category
        $db = $this->getDatabase();

        return $db->createQuery()
            ->select($db->quoteName(['a.id', 'a.published'], ['id', 'state']))
            ->from($db->quoteName($this->table, 'a'));
    }

    protected function translateState($item, $category = null)
    {
        // com_example displays only published landmarks on the site front-end
        return (int) $item === 1 ? 1 : 0;
    }
}
```

Some points to note:

- The table must have the alias `a` in `getListQuery()`, because the `Adapter` adds a condition on `a.id`
when it reads a single item in `reindex()`.
The columns must be given the names of the corresponding `Result` properties, for example `summary` and `state`.
- `getStateQuery()` is used by the `Adapter` to read the published state of items, and, in `pluginDisable()`,
to find all the items in the table when the plugin is disabled.
We override it because the `Adapter` version joins the categories table on the column `catid`, which the landmarks table doesn't have.
- `translateState()` converts the published state of an item into the state which is stored in the index.
The `Adapter` version also treats archived items (state 2) as searchable, controlled by a `search_archived` plugin option,
but the site front-end of `com_example` displays only published landmarks, so we override it to index only those.
- `Helper::getContentExtras()` triggers the `onPrepareFinderContent` event, which allows other plugins to add data to the item before it's indexed.

### Language files

The language strings `PLG_FINDER_QUERY_FILTER_BRANCH_P_LANDMARK` and `PLG_FINDER_QUERY_FILTER_BRANCH_S_LANDMARK`
are the plural and singular names of the content type, which Smart Search displays in its filters and in the list of indexed content.
They are formed from the `$type_title`, in upper case and with any characters other than letters and digits replaced by underscores.
`PLG_FINDER_STATISTICS_LANDMARK` is similarly used in the Smart Search statistics.

```ini title="plg_finder_landmarks/language/en-GB/plg_finder_landmarks.ini"
PLG_FINDER_LANDMARKS="Smart Search - Landmarks"
PLG_FINDER_LANDMARKS_XML_DESCRIPTION="Indexes the landmarks of the com_example component for Smart Search."
PLG_FINDER_QUERY_FILTER_BRANCH_P_LANDMARK="Landmarks"
PLG_FINDER_QUERY_FILTER_BRANCH_S_LANDMARK="Landmark"
```

```ini title="plg_finder_landmarks/language/en-GB/plg_finder_landmarks.sys.ini"
PLG_FINDER_LANDMARKS="Smart Search - Landmarks"
PLG_FINDER_LANDMARKS_XML_DESCRIPTION="Indexes the landmarks of the com_example component for Smart Search."
PLG_FINDER_STATISTICS_LANDMARK="Landmark"
```

## Displaying the Search Results

Smart Search displays each search result using the `search/default_result.php` layout of `com_finder`.
If you want to display your items differently then you can create a template override
`html/com_finder/search/default_<layout>.php` in your site template, where `<layout>` is the `$layout` of your plugin.
In our example this would be `html/com_finder/search/default_landmark.php`,
and you can start by copying `default_result.php` into this file.

Within this layout `$this->result` is the indexed item.

## Testing the Plugin

Once you have enabled the plugin and indexed the content, you can check that the index is kept up to date:

- create a new landmark in the administrator back-end, and check that you can find it using Smart Search on the site front-end
- unpublish the landmark, and check that you can no longer find it
- publish it again, then trash it and delete it, and check that it's removed from the list of indexed content in the Smart Search administrator component
- disable the plugin, and check that all the landmarks are removed from the index.
