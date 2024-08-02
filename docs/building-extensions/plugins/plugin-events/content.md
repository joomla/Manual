---
sidebar_position: 1
title: Content Plugin Events
---

Content Plugin Events
=====================

Content events are triggered during the content creation process. These events are triggered in many different components and modules - they are not specific to the `com_content` component. 

This list gives a brief description of each event, what the event arguments are, and any examples of their use which are available in the Joomla Manual.

<details>
  <summary>Accessing Event Arguments</summary>

To access the event arguments of an event concrete class you can use within your plugin class:

```php
use Joomla\CMS\Event\Content\ContentPrepareEvent;

class MyPlugin ...
    public function onContentPrepare(ContentPrepareEvent $event)
    {
        $context = $event->getArgument('context');
        $item = $event->getArgument('item');
        $params = $event->getArgument('params');
        $page = $event->getArgument('page');
        // ...
    }
```

However, if you want your plugin to work across Joomla 4 and 5 it may be better to use:

```php
use Joomla\Event\Event;

class MyPlugin ...
    public function onContentPrepare(Event $event)
    {
        [$context, $item, $params, $page] = array_values($event->getArguments());
        // ...
    }
```

This will work for both concrete event classes and generic event classes (as described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md)).
</details>

<details>
  <summary>Returning Values</summary>

Where a return value is expected, how this is handled differs depending upon whether the event class is a concrete class or is a generic event class. 
To return a value `$value` in a manner which works for both use the following:

```php
use Joomla\CMS\Event\Result\ResultAwareInterface;
...
    if ($event instanceof ResultAwareInterface) {
        $event->addResult($value);
        return;
    } else {   // use GenericEvent approach
        $result = $event->getArgument('result') ?: [];   // get the result argument from GenericEvent
        $result[] = $value;                              // add your return value into the array
        $event->setArgument('result', $result);  
    }
```

</details>

## onContentPrepare

### Description

This is the first stage in preparing content for output and is the most common point for content-orientated plugins to do their work. 
Since the item and related parameters are passed by reference, event handlers can modify them prior to display. 

### Event Arguments
The event class \Joomla\CMS\Event\Content\ContentPrepareEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`&item`** - A reference to the item which is being rendered by the view, for example, an article, contact or user. 
You can access properties of this object using, for example, `$item->title`; the properties available will depend on what type of `item` is being passed.
As `item` is passed by reference, if you set any of these properties then they will be carried through to the webpage output, but not persisted in the database.

- **`&params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). Any values which you set can affect the webpage output, but are not persisted in the database.

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

None.

### Examples

The [Basic Content](../basic-content-plugin.md) plugin provides a feature similar to the Wordpress Shortcodes feature. 
In an article text it replaces `{fieldname}` with the value of `fieldname`.

## onContentAfterTitle

This is a request for information that should be placed between the content title and the content body. 

### Event Arguments
The event class \Joomla\CMS\Event\Content\AfterTitleEvent has the following arguments:

Although `&item` and `&params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`&item`** - A reference to the item which is being rendered by the view, for example, an article, contact or user. 

- **`&params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

String of HTML. This will get displayed after the item title.

:::info
  The Joomla Custom Fields (com_fields) functionality has an associated plugin which is triggered by this event. 
This plugin returns the HTML for those custom fields which have the Automatic Display option set to After Title.
So this event is triggered within the view which displays an item such as an article (com_content Article View), contact (com_contact Contact View), etc.
If you implement a component which supports custom fields then you will need to dispatch this event.
:::

## onContentBeforeDisplay

This is a request for information that should be placed immediately before the component's main content (eg article text). 

For views that generate HTML, this might include the use of styles that are specified as part of the content or related parameters.

### Event Arguments
The event class \Joomla\CMS\Event\Content\BeforeDisplayEvent has the following arguments:

Although `&item` and `&params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`&item`** - A reference to the item which is being rendered by the view, for example, an article, contact or user. 

- **`&params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

String of HTML. This will get displayed before the text of the item.

### Examples

None.

:::info
  The Joomla Custom Fields (com_fields) functionality has an associated plugin which is triggered by this event. 
This plugin returns the HTML for those custom fields which have the Automatic Display option set to Before Display Content.
So this event is triggered within the view which displays an item such as an article (com_content Article View), contact (com_contact Contact View), etc.
If you implement a component which supports custom fields then you will need to dispatch this event.

It is also used by the Joomla Vote plugin which allows website visitors to specify a star rating against content.
:::

## onContentAfterDisplay

This is a request for information that should be placed immediately after the component's main content (eg article text). 

### Event Arguments
The event class \Joomla\CMS\Event\Content\AfterDisplayEvent has the following arguments:

Although `&item` and `&params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`&item`** - A reference to the item which is being rendered by the view, for example, an article, contact or user. 

- **`&params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

String of HTML. This will get displayed immediately after the text of the item.

:::info
  The Joomla Custom Fields (com_fields) functionality has an associated plugin which is triggered by this event. 
This plugin returns the HTML for those custom fields which have the Automatic Display option set to After Display Content.
So this event is triggered within the view which displays an item such as an article (com_content Article View), contact (com_contact Contact View), etc.
If you implement a component which supports custom fields then you will need to dispatch this event.
:::

## onContentNormaliseRequestData

### Description

This is an event which is raised during the process of handling submitted form data through Controllers and Models to the database.
It is triggered after the submitted form data (usually an array sent by the browser within a `jform` HTTP POST parameter) has been filtered and validated. 
The array of data is cast into a PHP `object` which is then passed as a parameter in the event. 
As PHP objects are always passed by reference, plugins listening for this event can modify the submitted form data.

### Event Arguments
The event class \Joomla\CMS\Event\Model\NormaliseRequestDataEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`data`** - The data in the fields of the submitted form, passed as a PHP object. You can access properties of this object using, for example, `$data->title`; the properties available will depend on what type of `data` is being passed. 
If you set any of these properties then they will be modified in the form data, and (most likely) persisted in the database.

- **`form`** - The Joomla `Form` instance, as described in [how Joomla forms work](../../../general-concepts/forms/how-forms-work.md).

### Return Value

None.