---
sidebar_position: 4
title: Plugin Events
---

List of Plugin Events
=====================

As described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md), Joomla events have changed from being strings with associated parameters to PHP classes.

The list of events below includes the event name and the fully-qualified name of the event class, together with links to the detailed description.


:::warning
  Note that some concrete event classes were introduced in Joomla 4 and others in Joomla 5. If you want your plugin to support both concrete and generic event classes then you need to code it as described in [Joomla 4 and 5 changes](../joomla-4-and-5-changes.md).
:::

The event Group refers to the group of plugins which Joomla ensures are imported prior to dispatching that event. 

| Event Name                        | Event Class                             | Group            | From Release |
| --------------------------------- | --------------------------------------- | ---------------- | ------------ |
| [onContentPrepare](content.md#contentcontentprepareevent--oncontentprepare) | \Joomla\CMS\Event\Content\ContentPrepareEvent | Content          |  before 4.0  |
| [onContentAfterTitle](./content.md#contentaftertitleevent--oncontentaftertitle) | \Joomla\CMS\Event\Content\AfterTitleEvent | Content          |  before 4.0  |
| [onContentBeforeDisplay](./content.md#contentbeforedisplayevent--oncontentbeforedisplay) | \Joomla\CMS\Event\Content\BeforeDisplayEvent | Content          |  before 4.0  |
| [onContentAfterDisplay](./content.md#contentafterdisplayevent--oncontentbeforedisplay) | \Joomla\CMS\Event\Content\BeforeAfterEvent | Content          |  before 4.0  |
| [onContentNormaliseRequestData](./content.md#oncontentnormaliserequestdata) | \Joomla\CMS\Event\Model\NormaliseRequestDataEvent | Content          |  4.0  |

