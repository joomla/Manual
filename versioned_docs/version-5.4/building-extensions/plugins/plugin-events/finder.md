---
sidebar_position: 1
title: Smart Search Events
toc_max_heading_level: 2 
---

Smart Search Events
===================

Smart Search events are triggered by Smart Search (`com_finder`) when it builds its index, when content which is in the index is changed,
and when it displays search results on the site front-end.

For a plugin to capture these events it should be defined as a Smart Search plugin (in the `finder` plugin group),
as Joomla imports the Smart Search plugins before triggering these events.
Most Smart Search plugins provide the content of a component to the index, and extend the `Adapter` class of `com_finder`
(`Joomla\Component\Finder\Administrator\Indexer\Adapter`), which handles the events relating to building the index. 
The [Smart Search Plugin](../plugin-examples/smart-search-plugin.md) example describes how to write such a plugin. 

For background on obtaining arguments and returning results see [Plugin Methods and Arguments](../methods-and-arguments.md).

## Joomla Overview

### Building the Index

The index is built when an administrator selects the Index button in the Smart Search administrator component,
or runs `php cli/joomla.php finder:index` from the command line. 

Joomla first resets the indexer state, and then:

- triggers *onStartIndex* - each plugin counts how many items it has to index
- processes the items in batches. The number of items in each batch is set by the Indexer Batch Size option of Smart Search, and for each batch Joomla:
  - triggers *onBeforeIndex* - each plugin can do any preparation it needs
  - triggers *onBuildIndex* - each plugin indexes its next set of items, until the batch is full. 
  When a plugin indexes an item it normally calls `Helper::getContentExtras()`, which triggers *onPrepareFinderContent*,
  so that other plugins can add data to the item before it's stored in the index.

When the index is built from the administrator back-end, each batch is run in a separate HTTP request,
so *onBeforeIndex* is triggered before every batch.
When the index is built from the command line, *onBeforeIndex* is triggered only once, before the first batch.

The progress of the indexing is held in the indexer state, which you can obtain using
`Joomla\Component\Finder\Administrator\Indexer\Indexer::getState()`, and store again using `Indexer::setState($state)`.
This object has the properties:

- `batchSize` - the maximum number of items to index in each batch
- `batchOffset` - the number of items which have been indexed so far in the current batch
- `totalItems` - the number of items which remain to be indexed, across all plugins
- `pluginState` - an array with an element for each plugin, keyed by the context of the plugin, 
holding the number of items the plugin has to index (`total`) and the number of items it has indexed so far (`offset`).

The `Adapter` class handles onStartIndex, onBeforeIndex and onBuildIndex, and keeps the indexer state up to date, 
so you need to handle these events yourself only if your plugin doesn't extend the `Adapter` class. 

When an administrator selects Maintenance / Optimise in the Smart Search administrator component, Joomla triggers *onFinderGarbageCollection*
so that each plugin can remove from the index the items which no longer exist. 

### Keeping the Index up to Date

When an item is saved, deleted or has its published state changed, its entry in the index needs to be updated. 

Joomla's Admin models (`AdminModel`) trigger [Content Events](./content.md) when they save, delete or change the state of records.
The "Content - Smart Search" plugin listens for these events and triggers the corresponding Smart Search events,
after first importing the Smart Search plugins:

| Content event         | Smart Search event          |
|-----------------------|-----------------------------|
| onContentBeforeSave   | onFinderBeforeSave          |
| onContentAfterSave    | onFinderAfterSave           |
| onContentAfterDelete  | onFinderAfterDelete         |
| onContentChangeState  | onFinderChangeState         |
| onCategoryChangeState | onFinderCategoryChangeState |

So these events are triggered only if the "Content - Smart Search" plugin is enabled, 
and only for components whose models trigger the content events.

Each event passes the context of the records (for example, `com_content.article`), 
or in the case of onFinderCategoryChangeState the component to which the categories belong, 
and your plugin should check this to determine whether the event relates to the items it indexes. 

The examples for these events below are for a plugin which extends the `Adapter` class and indexes the items of a component `com_mycomponent`.
The items have the context `com_mycomponent.item`, and they belong to categories of `com_mycomponent`.

### Displaying Search Results

When a user searches using Smart Search on the site front-end, Joomla triggers *onFinderResult* for each of the search results to be displayed.

## onStartIndex

### Description

This event is triggered once, when Joomla starts to build the index. 

The `Adapter` class handles this event by counting the items to index, using your plugin's `getListQuery()`, 
and adding this number to the indexer state.

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\StartIndexEvent` has no arguments.

### Return Value

None.

If you don't extend the `Adapter` class then you should add the number of items which your plugin will index to the `totalItems` property of the indexer state,
and keep track of the progress of your plugin in an element of the `pluginState` array.

## onBeforeIndex

### Description

This event is triggered before each batch of items is indexed (or, on the command line, before the first batch). 

The `Adapter` class handles this event by calling your plugin's `setup()` method, 
unless the current batch is already full or your plugin has already indexed all its items.

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\BeforeIndexEvent` has no arguments.

### Return Value

None.

## onBuildIndex

### Description

This event is triggered once for each batch of items to be indexed. 

The `Adapter` class handles this event by reading the next set of your items from the database, using your plugin's `getListQuery()`,
and passing each of them to your plugin's `index()` method. 
It reads only as many items as still fit into the current batch, and updates the `batchOffset`, `totalItems` and `pluginState` properties of the indexer state.

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\BuildIndexEvent` has no arguments.

### Return Value

None.

If you don't extend the `Adapter` class then you should index at most `batchSize - batchOffset` items each time this event is triggered,
and update the indexer state, so that Joomla can determine when all the content has been indexed. 

## onPrepareFinderContent

### Description

This event is triggered when an item is about to be stored in the index, provided that the plugin which is indexing the item calls 

```php
use Joomla\Component\Finder\Administrator\Indexer\Helper;

Helper::getContentExtras($item);
```

in its `index()` method. All the Smart Search plugins of Joomla do this. 

You can use this event to add further data to an item before it's indexed, for example comments which relate to an article.

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\PrepareContentEvent` has the following arguments:

- **`item`** - the item to be indexed, as a `Joomla\Component\Finder\Administrator\Indexer\Result` object, available via `$event->getItem()`

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

### Return Value

None, but you can change the `Result` object, as it's an object.

### Examples

This example adds a property containing extra text to articles, and tells the indexer to index this property as text:

```php
use Joomla\CMS\Event\Finder\PrepareContentEvent;
use Joomla\Component\Finder\Administrator\Indexer\Indexer;

public function onPrepareFinderContent(PrepareContentEvent $event): void
{
    $item = $event->getItem();

    if ($item->context === 'com_content.article') {
        $item->comments = $this->getCommentsText($item->id);
        $item->addInstruction(Indexer::TEXT_CONTEXT, 'comments');
    }
}
```

Here `getCommentsText()` stands for a method of your plugin which obtains the text to index. 

Of the Joomla Smart Search plugins, only the plugin for articles sets the `context` property of the item. 
Items which are indexed by plugins extending the `Adapter` class also have a `layout` property (for example `category` or `contact`),
which is set from the `$layout` of the plugin, and which you can use to identify the type of an item.

## onFinderGarbageCollection

### Description

This event is triggered when an administrator selects Maintenance / Optimise in the Smart Search administrator component. 

The `Adapter` class handles this event by removing from the index the items of your plugin for which there's no longer a record in your plugin's `$table`. 
This removes items which have been deleted without the onFinderAfterDelete event being triggered, for example directly in the database. 

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\GarbageCollectionEvent` has no arguments.

### Return Value

None.

## onFinderBeforeSave

### Description

This event is triggered before a record is saved, if the component's model triggers the onContentBeforeSave event. 

As the record hasn't been saved yet, you can use this event to read from the database values which you need to compare with the new values after the record has been saved. 
For example, the Joomla Smart Search plugin for articles reads the access level of an article before it's saved. 
Then, in onFinderAfterSave, if the access level has changed it updates the access level of the article in the index.

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\BeforeSaveEvent` has the following arguments:

- **`context`** - the context of the record, for example `com_content.article`, available via `$event->getContext()`

- **`item`** - the record which is about to be saved, available via `$event->getItem()`. 
This is usually a `Table` object containing the new values. 
For a new record the primary key hasn't been set yet. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - `true` if a new record is being created, and `false` if an existing record is being updated, available via `$event->getIsNew()`

### Return Value

None.

## onFinderAfterSave

### Description

This event is triggered after a record has been saved, if the component's model triggers the onContentAfterSave event. 

You can use this event to index the record again, so that the index matches the saved record. 

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\AfterSaveEvent` has the following arguments:

- **`context`** - the context of the record, for example `com_content.article`, available via `$event->getContext()`

- **`item`** - the record which has been saved, available via `$event->getItem()`. 
This is usually a `Table` object, and for a new record it contains the `id` of the record which has been created. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - `true` if a new record has been created, and `false` if an existing record has been updated, available via `$event->getIsNew()`

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Finder\AfterSaveEvent;

public function onFinderAfterSave(AfterSaveEvent $event): void
{
    if ($event->getContext() === 'com_mycomponent.item') {
        $this->reindex($event->getItem()->id);
    }
}
```

The `reindex()` method of the `Adapter` class reads the record from the database and indexes it again.
See also the [Smart Search Plugin](../plugin-examples/smart-search-plugin.md) example. 

## onFinderAfterDelete

### Description

This event is triggered after a record has been deleted, if the component's model triggers the onContentAfterDelete event. 
If several records are deleted at once then the event is triggered once for each record. 

You can use this event to remove the record from the index. 

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\AfterDeleteEvent` has the following arguments:

- **`context`** - the context of the record, for example `com_content.article`, available via `$event->getContext()`

- **`item`** - the record which has been deleted, available via `$event->getItem()`. 
This is usually a `Table` object which still contains the values of the deleted record. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Finder\AfterDeleteEvent;

public function onFinderAfterDelete(AfterDeleteEvent $event): void
{
    if ($event->getContext() === 'com_mycomponent.item') {
        $this->remove($event->getItem()->id);
    }
}
```

The `remove()` method of the `Adapter` class removes the item from the index.

## onFinderChangeState

### Description

This event is triggered after the published state of one or more records has been changed, 
for example when an administrator publishes, unpublishes or trashes records in a list view, 
if the component's model triggers the onContentChangeState event. 

It's also triggered when plugins are enabled or disabled, with the context `com_plugins.plugin`,
and the Joomla Smart Search plugins use this to remove all their items from the index when they are disabled.

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\AfterChangeStateEvent` has the following arguments:

- **`context`** - the context of the records, for example `com_content.article`, available via `$event->getContext()`

- **`pks`** - an array of the primary keys of the records whose state has changed, available via `$event->getPks()`

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`value`** - the new state of the records, available via `$event->getValue()`. 
The values are the usual Joomla published states: 1 for published, 0 for unpublished, 2 for archived and -2 for trashed. 

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Finder\AfterChangeStateEvent;

public function onFinderChangeState(AfterChangeStateEvent $event): void
{
    $context = $event->getContext();

    if ($context === 'com_mycomponent.item') {
        $this->itemStateChange($event->getPks(), $event->getValue());
    }

    // Remove all the items of this plugin from the index when it is disabled
    if ($context === 'com_plugins.plugin' && $event->getValue() === 0) {
        $this->pluginDisable($event->getPks());
    }
}
```

The `itemStateChange()` method of the `Adapter` class updates the state of the items in the index, 
taking into account the published state of their category. 
If your items don't belong to a category then you can use the `change()` method instead, 
as shown in the [Smart Search Plugin](../plugin-examples/smart-search-plugin.md) example. 

## onFinderCategoryChangeState

### Description

This event is triggered after the published state of one or more categories has been changed in the Categories administrator component. 

You can use this event to update the state in the index of the items which belong to those categories,
as an item isn't shown in the search results if its category is unpublished. 

When the state of categories is changed, Joomla triggers onFinderChangeState (with the context `com_categories.category`) as well as this event. 

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\AfterCategoryChangeStateEvent` has the following arguments:

- **`extension`** - the component to which the categories belong, for example `com_content`, available via `$event->getExtension()`

(This is actually the 'context' element in the array returned by `$event->getArguments()`, and it's also available via `$event->getContext()`.)

- **`pks`** - an array of the primary keys of the categories whose state has changed, available via `$event->getPks()`

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`value`** - the new state of the categories, available via `$event->getValue()`

### Return Value

None.

### Examples

```php
use Joomla\CMS\Event\Finder\AfterCategoryChangeStateEvent;

public function onFinderCategoryChangeState(AfterCategoryChangeStateEvent $event): void
{
    if ($event->getExtension() === 'com_mycomponent') {
        $this->categoryStateChange($event->getPks(), $event->getValue());
    }
}
```

The `categoryStateChange()` method of the `Adapter` class updates the state in the index of all the items in the categories.

## onFinderResult

### Description

This event is triggered when Smart Search displays the results of a search on the site front-end. 
It's triggered once for each of the search results on the page, before the results are displayed. 

You can use this event to change how a search result is displayed. 
For example, the "System - Highlight" plugin adds the search terms to the URL of each result, 
so that the terms can be highlighted on the page which the user goes to. 

Before triggering this event Joomla imports the Content plugins as well as the Smart Search plugins, 
so a Content plugin can also listen for this event.

### Event Arguments

The event class `\Joomla\CMS\Event\Finder\ResultEvent` has the following arguments:

- **`item`** - the search result, as a `Joomla\Component\Finder\Administrator\Indexer\Result` object, available via `$event->getItem()`. 
This is the object which was stored in the index when the item was indexed, 
and it has properties such as `title`, `route` (the URL of the item) and `description`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`query`** - the search query, as a `Joomla\Component\Finder\Administrator\Indexer\Query` object, available via `$event->getQuery()`.
For example, `$event->getQuery()->input` is the text which the user entered. 

### Return Value

None, but you can change the `Result` object, as it's an object.

### Examples

```php
use Joomla\CMS\Event\Finder\ResultEvent;

public function onFinderResult(ResultEvent $event): void
{
    $item = $event->getItem();

    if ($item->context === 'com_content.article') {
        $item->title .= ' (Article)';
    }
}
```
