---
sidebar_position: 4
title: Plugin Events
---

List of Plugin Events
=====================

As described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md), Joomla events have changed from being strings to PHP classes.

The list of events below includes both the traditional event name and the name of the event class, together with links to the detailed description.

The event Group refers to the group of plugins which Joomla ensures are imported prior to dispatching that event. 

| Event Name                        | Event Class (under \Joomla\Event\Event) | Group            | From Release |
| --------------------------------- | --------------------------------------- | ---------------- | ------------ |
| [onContentPrepare](content.md#contentcontentprepareevent--oncontentprepare) | [Content\ContentPrepareEvent](content.md#contentcontentprepareevent--oncontentprepare) | Content          |  before 4.0  |
| [onContentAfterTitle](./content.md#contentaftertitleevent--oncontentaftertitle) | [Content\AfterTitleEvent](./content.md#contentaftertitleevent--oncontentaftertitle) | Content          |  before 4.0  |
| [onContentBeforeDisplay](./content.md#contentbeforedisplayevent--oncontentbeforedisplay) | [Content\BeforeDisplayEvent](./content.md#contentbeforedisplayevent--oncontentbeforedisplay) | Content          |  before 4.0  |
| [onContentAfterDisplay](./content.md#contentafterdisplayevent--oncontentbeforedisplay) | [Content\BeforeAfterEvent](./content.md#contentbeforedisplayevent--oncontentafterdisplay) | Content          |  before 4.0  |
| [onContentNormaliseRequestData](./model.md#modelnormaliserequestdataevent--oncontentnormaliserequestdata) | [Model\NormaliseRequestDataEvent](./model.md#modelnormaliserequestdataevent--oncontentnormaliserequestdata) | Content          |  4.0  |