---
sidebar_position: 4
title: Plugin Events
---

List of Plugin Events
=====================

The list of events below includes the event name and a short description of its use, together with a link to the detailed description.

As described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md), Joomla events have changed from being strings with associated parameters to "concrete" event classes specific to each event, sometimes via a "generic" event class. Some concrete event classes were introduced in Joomla 4 and others in Joomla 5. If you want your plugin to support both concrete and generic event classes then you need to code it as described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md).

The event Group refers to the group of plugins which Joomla ensures are imported prior to dispatching that event. 

| Event Name                        | Short Description                            | Group            | From Release |
| --------------------------------- | --------------------------------------- | ---------------- | ------------ |
| [onContentPrepare](content.md#oncontentprepare) | Modifying content displayed in a View | Content          |  before 4.0  |
| [onContentAfterTitle](./content.md#oncontentaftertitle) | Injecting HTML after the title | Content          |  before 4.0  |
| [onContentBeforeDisplay](./content.md#oncontentbeforedisplay) | Injecting HTML before the main page content | Content          |  before 4.0  |
| [onContentAfterDisplay](./content.md#oncontentafterdisplay) | Injecting HTML after the main page content | Content          |  before 4.0  |
| [onContentPrepareData](./content.md#oncontentpreparedata) | Modifying pre-fill data for a form | Content          |  before 4.0  |
| [onContentPrepareForm](./content.md#oncontentprepareform) | Modifying a form | Content          |  before 4.0  |
| [onContentBeforeValidateData](./content.md#oncontentbeforevalidatedata) | Before POST data validation | Content          |  4.0  |
| [onContentNormaliseRequestData](./content.md#oncontentnormaliserequestdata) | After POST data validation | Content          |  4.0  |
| [onContentBeforeSave](./content.md#oncontentbeforesave) | In Model, before new/updated data is saved | Content          |  before 4.0  |
| [onContentAfterSave](./content.md#oncontentaftersave) | In Model, after new/updated data is saved | Content          |  before 4.0  |
| [onContentBeforeDelete](./content.md#oncontentbeforedelete) | In Model, before a record is deleted | Content          |  before 4.0  |
| [onContentAfterDelete](./content.md#oncontentafterdelete) | In Model, after a record is deleted | Content          |  before 4.0  |
| [onContentBeforeChangeState](./content.md#oncontentbeforechangestate) | In Model, before a set of records changes state | Content      |  4.0  |
| [onContentChangeState](./content.md#oncontentchangestate) | In Model, after a set of records changes state | Content          |  before 4.0  |
| [onCategoryChangeState](./content.md#oncategorychangestate) | In Model, before a set of category records changes state | Content     |  before 4.0  |
