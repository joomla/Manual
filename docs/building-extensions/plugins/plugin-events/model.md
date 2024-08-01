---
sidebar_position: 2
title: Model Plugin Events
---

Model Plugin Events
===================

These are events which are raised during the process of handling submitted form data through Controllers and Models to the database.

Several of these have been traditionally classified as "Content" events.

This list gives a brief description of each event, what their parameters are, and any examples of their use which are available in the Joomla Manual.

Where a Return Value is expected, this should be returned via the event `addResult` method, as described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md).

## Model\NormaliseRequestDataEvent / onContentNormaliseRequestData

### Description

This event is triggered after the submitted form data (usually an array sent by the browser within a `jform` HTTP POST parameter) has been filtered and validated. 
The array of data is cast into a PHP `object` which is then passed as a parameter in the event. 
As PHP objects are always passed by reference, plugins listening for this event can modify the form data.

### Parameters

- **`context`** - The context of the content being passed to the plugin. This is the component name and name of item (e.g. com_content.article, com_contact.contact, com_users.user). Use this to check whether you are in the desired context for the plugin.

- **`data`** - The data in the fields of the submitted form, passed as a PHP object. You can access properties of this object using, for example, `$data->title`; the properties available will depend on what type of `data` is being passed. 
If you set any of these properties then they will be modified in the form data, and (most likely) persisted in the database.

- **`form`** - The Joomla `Form` instance, as described in [how Joomla forms work](../../../general-concepts/forms/how-forms-work.md).

### Return Value

None.

### Examples

None.

### Additional Notes

None.