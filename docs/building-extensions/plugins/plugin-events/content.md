---
sidebar_position: 1
title: Content Events
toc_max_heading_level: 2 
---

Content Events
==============

Content plugin events are triggered not only by `com_content` but also by other components such as Contacts, Categories and Tags, as well as some modules.

They are triggered during the process of:
- preparing the content for display in a View - both for textual HTML and for HTML forms
- handling the POST data submitted from a form - relating to data validation and CRUD operations at the MVC Model level

The sections below give a brief description of each content event, what the event parameters / arguments are, and any examples of their use which are available in the Joomla Manual.

For background on Joomla transitioning to using classes for events see [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md), where you can also find explanations for [accessing the arguments](../joomla-4-and-5-changes.md#summary---accessing-event-arguments) and [returning values](../joomla-4-and-5-changes.md#summary---returning-values). 

## onContentPrepare

### Description

This is the first stage in preparing content for output and is the most common point for content-orientated plugins to do their work. 
Since the item and related parameters are passed by reference, event handlers can modify them prior to display. 

### Event Arguments

The event class \Joomla\CMS\Event\Content\ContentPrepareEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The item which is being rendered by the view, for example, an article, contact or user. 
You can access properties of this object using, for example, `$item->title`; the properties available will depend on what type of `item` is being passed.
If you set any of these properties then they will be carried through to the webpage output, but not persisted in the database.

- **`params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). Any values which you set can affect the webpage output, but are not persisted in the database.

- **`page`** - An integer which has been associated with the offset when displaying paginated lists of items. 
However, it is often set to 0 or null, so you probably shouldn't rely on it.

### Return Value

None.

### Examples

The [Basic Content](../basic-content-plugin.md) plugin provides a feature which processes the text of articles to replace `{fieldname}` with the value of `fieldname`.

## onContentAfterTitle

This is a request for information that should be placed between the content title and the content body. 

### Event Arguments

The event class \Joomla\CMS\Event\Content\AfterTitleEvent has the following arguments:

Although `item` and `params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The item which is being rendered by the view, for example, an article, contact or user. 

- **`params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

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

Although `item` and `params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The item which is being rendered by the view, for example, an article, contact or user. 

- **`params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

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

Although `item` and `params` are passed by reference, this is not the event to modify item data. Use onContentPrepare for that purpose. 

- **`context`** - The context of the content being passed to the plugin. This is the component name and view - or name of module (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The item which is being rendered by the view, for example, an article, contact or user. 

- **`params`** - A reference to an associative array of the item parameters (usually the `params` field in the item's database record, but the `attribs` database field for com_content). 

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

## onContentPrepareData

### Description

This event is called after the initial data for a Joomla Form has been set, and can be used to modify that pre-fill data.

Within Joomla, when a form is loaded there is a callback `loadFormData` which is used to specify the initial data for the form. 
(For example, when editing a record the initial data will be the existing fields of the record). 
At the end of `loadFormData` Joomla extensions call `preprocessData` and the default version of this function triggers this event.

Within Joomla extensions it is triggered before onContentPrepareForm. 

### Event Arguments

The event class \Joomla\CMS\Event\Model\PrepareDataEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`data`** - The initial (pre-fill) data for the fields of the form, passed as a PHP object. You can access properties of this object using, for example, `$data->title`; the properties available will depend on what type of `data` is being passed. 
If you set any of these properties then they will be modified in the form data which is presented to the user.

However, setting the properties directly is deprecated, and you should use `updateData` instead:

```php
$data = $event->getData();
// modify $data
$event->updateData($data);
```

### Return Value

None.

## onContentPrepareForm

This event is triggered after a Form has been loaded and can be used to modify the Form object using techniques described in [Dynamically Changing Forms](../../../general-concepts/forms/manipulating-forms.md#dynamically-changing-forms).

In Joomla components a form is loaded
- whenever the form is about to be displayed on a page
- in the process of handling the POST from a form (as it's needed to perform the field validation)

In both these cases the onContentPrepareForm event is dispatched.

### Event Arguments

The event class \Joomla\CMS\Event\Model\PrepareFormEvent has the following arguments:

- **`form`** - The Form object. The `name` object of this object (which you can get via `$form->getName()`) will be of the form 'com_content.article', 'com_contact.contact', and you can use this to check whether you are in the desired context for the plugin.
You can then modify this `form` object using methods of the [Form API](cms-api://classes/Joomla-CMS-Form-Form.html).

- **`data`** - The pre-fill data in the fields of the submitted form, passed as a PHP object. You can access properties of this object using, for example, `$data->title`; the properties available will depend on what type of `data` is being passed. If you set any of these properties then they will be modified in the form data which is presented to the user.

If the event is triggered in the process of handling the POST from a form then the `data` will be empty and modifying it will have no effect.

### Return Value

None.

## onContentBeforeValidateData

When handling data submitted in a POST from a Joomla form, this event is triggered by the Model just before it applies the validation rules. 
You can use this event to modify the submitted data, or (probably less likely) the form object.

### Event Arguments

The event class \Joomla\CMS\Event\Model\BeforeValidateDataEvent has the following arguments:

- **`form`** - The Form object. The `name` object of this object (which you can get via `$form->getName()`) will be of the form 'com_content.article', 'com_contact.contact', and you can use this to check whether you are in the desired context for the plugin.

- **`data`** - The submitted form data, passed by reference as an associative array. The array elements available will depend on the form. If you set any of these elements then they will be modified prior to the data validation being applied.

However, setting the `data` directly is deprecated, and you should use `updateData` instead:

```php
$data = $event->getData();
// modify $data
$event->updateData($data);
```

### Return Value

None.

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

## onContentBeforeSave

### Description

This event is triggered at the Model level before any call to save new or updated data in the database. 
You can abort the save by returning `false`.
If you do return `false` then by default the error displayed to the user will then be set by calling `$this->setError($table->getError)`.
As there probably isn't an error associated with the Table object, you may wish to enqueue your own message to explain to the user why the save was rejected. 

onContentBeforeSave is triggered for most types of data (for example, content, contacts). However some Models dispatch their own type of event instead:
- onExtensionBeforeSave is triggered for Extensions
- onUserBeforeSave is triggered for Users

### Event Arguments

The event class \Joomla\CMS\Event\Model\BeforeSaveEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The `Table` object containing the data to be stored. 

- **`isNew`** - A boolean which is set to `true` if the content is about to be created (as opposed to updated)

- **`data`** - The data which is about to be saved, passed as an associative array. 

Note that both `item` and `data` show the data which is going to be saved, in other words, the modified data. 
Neither shows the data values which are currently in the database. 

### Return Value

Return `false` to abort the save. 

## onContentAfterSave

### Description

This event is triggered at the Model level after a call to save new or updated data in the database. 
You can use this event to initiate storing related information in the database or files.

onContentAfterSave is triggered for most types of data (for example, content, contacts). However some Models dispatch their own type of event instead:
- onExtensionAfterSave is triggered for Extensions
- onUserAfterSave is triggered for Users

### Event Arguments

The event class \Joomla\CMS\Event\Model\AfterSaveEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The `Table` object containing the data which was stored. 

- **`isNew`** - A boolean which is set to `true` if the content was created (as opposed to updated)

- **`data`** - The data which was saved, passed as an associative array. 

### Return Value

None

## onContentBeforeDelete

### Description

This event is triggered at the Model level before the call to delete a record in the database. 
You can abort the delete by returning `false`.
If you do return `false` then by default the error displayed to the user will then be set by calling `$this->setError($table->getError)`.
As there probably isn't an error associated with the Table object, you may wish to enqueue your own message to explain to the user why the delete was rejected. 

In Joomla components when you "Trash" an item such as an article, then the item isn't deleted, but rather its state is changed to "trashed".
The item is deleted when you select an item and choose "Empty Trash". 
If you select multiple items in this Empty Trash action then this event is fired for each record selected for deletion.

onContentBeforeDelete is triggered for most types of data (for example, content, contacts). However some Models dispatch their own type of event instead:
- onExtensionBeforeDelete is triggered for Extensions
- onUserBeforeDelete is triggered for Users

### Event Arguments

The event class \Joomla\CMS\Event\Model\BeforeDeleteEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The `Table` object containing the data to be deleted. 

### Return Value

Return `false` to abort the delete. 

## onContentAfterDelete

### Description

This event is triggered at the Model level after a call to delete a record in the database. 
You can use this event to initiate the deletion of related information, for example.

If you are deleting multiple records at once then this event is fired for each record.

onContentAfterDelete is triggered for most types of data (for example, content, contacts). However some Models dispatch their own type of event instead:
- onExtensionAfterDelete is triggered for Extensions
- onUserAfterDelete is triggered for Users

### Event Arguments

The event class \Joomla\CMS\Event\Model\AfterDeleteEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact). Use this to check whether you are in the desired context for the plugin.

- **`item`** - The `Table` object containing the data which was deleted. 

### Return Value

None

## onContentBeforeChangeState

### Description

This event is triggered at the Model level before the state of a number of items is changed.
You can abort the change of state by returning `false`. 
However, in this case you should enqueue s message to explain to the user why the change of state was rejected. 

:::Warning
  Joomla doesn't handle this rejection properly - the requested change of state is not applied, but messages output to the user may indicate that the action was successful.
:::

This occurs whenever the user:
- displays the Articles form (which shows a page of multiple articles)
- selects a number of articles (via the checkboxes)
- selects an Action which changes the state (Publish/Unpublish/Archive/Trash)

This event is also fired for similar components (for example Contacts, Tags), but not for enabling/disabling Users or Extensions.

:::Warning
  This event is NOT fired whenever you edit an item, change its published state and then Save.
:::

### Event Arguments

The event class \Joomla\CMS\Event\Model\BeforeChangeStateEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact, com_categories.category). Use this to check whether you are in the desired context for the plugin.

- **`pks`** - An array of the primary keys of the records whose state is going to be changed. 

- **`value`** - The value of the published state which is to be applied (0: Unpublished, 1: Published, 2: Archived, -2: Trashed).

### Return Value

Return `false` to abort the change of state. 

## onContentChangeState

Note that this event isn't called "onContentAfterChangeState" - Joomla is a little inconsistent here.

### Description

This event is triggered at the Model level after the state of a number of items is changed.

:::Warning
  This event is NOT fired whenever you edit an item, change its published state and then Save.
:::

### Event Arguments

The event class \Joomla\CMS\Event\Model\AfterChangeStateEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact). Use this to check whether you are in the desired context for the plugin.

- **`pks`** - An array of the primary keys of the records whose state was changed. 

- **`value`** - The value of the published state which was applied (0: Unpublished, 1: Published, 2: Archived, -2: Trashed).

### Return Value

None.

## onCategoryChangeState

### Description

This event is triggered at the Model level after the state of a number of categories is changed.
When a number of categories are selected for changing state, then the following events are triggered in order:
- onContentBeforeChangeState
- onContentChangeState
- onCategoryChangeState

Note that the `context` for `onCategoryChangeState` is different from the others.

### Event Arguments

The event class \Joomla\CMS\Event\Model\AfterCategoryChangeStateEvent has the following arguments:

- **`context`** - The context of the content being passed to the plugin. This is the component associated with the categories (e.g. com_content, com_contact). Use this to check whether you are in the desired context for the plugin.

- **`pks`** - An array of the primary keys of the categories records whose state was changed. 

- **`value`** - The value of the published state which was applied (0: Unpublished, 1: Published, 2: Archived, -2: Trashed).

### Return Value

None.
