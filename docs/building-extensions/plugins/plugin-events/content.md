---
sidebar_position: 1
title: Content Plugin Events
---

Content Plugin Events
=====================

Content events are triggered during the content creation process. These events are triggered in many different components and modules - they are not specific to the `com_content` component. 

This list gives a brief description of each event, what their parameters are, and any examples of their use which are available in the Joomla Manual.

Where a Return Value is expected, this should be returned via the event `addResult` method, as described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md).

## Content\ContentPrepareEvent / onContentPrepare

### Description

This is the first stage in preparing content for output and is the most common point for content-orientated plugins to do their work. 
Since the item and related parameters are passed by reference, event handlers can modify them prior to display. 

### Parameters

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

### Additional Notes

None.

## Content\AfterTitleEvent / onContentAfterTitle

This is a request for information that should be placed between the content title and the content body. 

### Parameters

Although `&item` and `&params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`&item`** - A reference to the item which is being rendered by the view, for example, an article, contact or user. 

- **`&params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

String. This will get displayed after the item title.

### Examples

None.

### Additional Notes

The Joomla Custom Fields (com_fields) functionality has an associated plugin which is triggered by this event. 
This plugin returns the HTML for those custom fields which have the Automatic Display option set to After Title.

## Content\BeforeDisplayEvent / onContentBeforeDisplay

This is a request for information that should be placed immediately before the component's main content (eg article text). 

For views that generate HTML, this might include the use of styles that are specified as part of the content or related parameters.

### Parameters

Although `&item` and `&params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`&item`** - A reference to the item which is being rendered by the view, for example, an article, contact or user. 

- **`&params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

String. This will get displayed before the text of the item.

### Examples

None.

### Additional Notes

The Joomla Custom Fields (com_fields) functionality has an associated plugin which is triggered by this event. 
This plugin returns the HTML for those custom fields which have the Automatic Display option set to Before Display Content.

It is also used by the Joomla Vote plugin which allows website visitors to specify a star rating against content.

## Content\AfterDisplayEvent / onContentAfterDisplay

This is a request for information that should be placed immediately after the component's main content (eg article text). 

### Parameters

Although `&item` and `&params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`&item`** - A reference to the item which is being rendered by the view, for example, an article, contact or user. 

- **`&params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

String. This will get displayed immediately after the text of the item.

### Examples

None.

### Additional Notes

The Joomla Custom Fields (com_fields) functionality has an associated plugin which is triggered by this event. 
This plugin returns the HTML for those custom fields which have the Automatic Display option set to After Display Content.
