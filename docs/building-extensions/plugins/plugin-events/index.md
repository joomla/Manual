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
| [onAfterInitialise](application.md#onafterinitialise) | After Joomla initialisation | Application / System |  before 4.0  |
| [onAfterRoute](application.md#onafterroute) | After the router has completed | Application / System |  before 4.0  |
| [onAfterInitialiseDocument](application.md#onafterinitialisedocument) | After the Document has been instantiated | Application / System |  5.0  |
| [onAfterDispatch](application.md#onafterdispatch) | After the main component has been run | Application / System |  before 4.0  |
| [onBeforeRender](application.md#onbeforerender) | Before processing the template file | Application / System |  before 4.0  |
| [onBeforeCompileHead](application.md#onbeforecompilehead) | Before Joomla renders the `<head>` section | Application / System |  before 4.0  |
| [onAfterRender](application.md#onafterrender) | After the output has been prepared | Application / System |  before 4.0  |
| [onBeforeRespond](application.md#onbeforerespond) | Before Joomla sends the HTTP response | Application / System |  before 4.0  |
| [onAfterRespond](application.md#onafterrespond) | After Joomla sends the HTTP response | Application / System |  before 4.0  |
| [onBeforeExtensionBoot](application.md#onbeforeextensionboot) | Before an extension is booted | Application / System |  4.0  |
| [onAfterExtensionBoot](application.md#onafterextensionboot) | After an extension is booted | Application / System |  4.0  |
| [onContentPrepare](content.md#oncontentprepare) | Modifying content displayed in a View | Content          |  before 4.0  |
| [onContentAfterTitle](./content.md#oncontentaftertitle) | Injecting HTML after the title | Content          |  before 4.0  |
| [onContentBeforeDisplay](./content.md#oncontentbeforedisplay) | Injecting HTML before the main page content | Content          |  before 4.0  |
| [onContentAfterDisplay](./content.md#oncontentafterdisplay) | Injecting HTML after the main page content | Content          |  before 4.0  |
| [onContentPrepareData](./content.md#oncontentpreparedata) | Modifying pre-fill data for a form | Content          |  before 4.0  |
| [onContentPrepareForm](./content.md#oncontentprepareform) | Modifying a form | Content          |  before 4.0  |
| [onContentNormaliseRequestData](./content.md#oncontentnormaliserequestdata) | Before POST data validation, triggered by Controller | Content          |  4.0  |
| [onContentBeforeValidateData](./content.md#oncontentbeforevalidatedata) | Before POST data validation, triggered by Model | Content          |  4.0  |
| [onContentBeforeSave](./content.md#oncontentbeforesave) | In Model, before new/updated data is saved | Content          |  before 4.0  |
| [onContentAfterSave](./content.md#oncontentaftersave) | In Model, after new/updated data is saved | Content          |  before 4.0  |
| [onContentBeforeDelete](./content.md#oncontentbeforedelete) | In Model, before a record is deleted | Content          |  before 4.0  |
| [onContentAfterDelete](./content.md#oncontentafterdelete) | In Model, after a record is deleted | Content          |  before 4.0  |
| [onContentBeforeChangeState](./content.md#oncontentbeforechangestate) | In Model, before a set of records changes state | Content      |  4.0  |
| [onContentChangeState](./content.md#oncontentchangestate) | In Model, after a set of records changes state | Content          |  before 4.0  |
| [onCategoryChangeState](./content.md#oncategorychangestate) | In Model, before a set of category records changes state | Content     |  before 4.0  |
| [onInstallerAddInstallationTab](./installer.md#oninstalleraddinstallationtab) | In com_installer, in building the Install / Extensions form | Installer     |  before 4.0  |
| [onInstallerBeforePackageDownload](./installer.md#oninstallerbeforepackagedownload) | In Installer, before a package is downloaded | Installer     |  before 4.0  |
| [onInstallerBeforeUpdateSiteDownload](./installer.md#oninstallerbeforeupdatesitedownload) | In Installer, before an update site is downloaded | Installer     |  5.3  |
| [onInstallerBeforeInstallation](./installer.md#oninstallerbeforeinstallation) | At the beginning of the installation of a package / extension | Installer     |  before 4.0  |
| [onInstallerBeforeInstaller](./installer.md#oninstallerbeforeinstaller) | After zip files extracted, before extension installation | Installer     |  before 4.0  |
| [onInstallerAfterInstaller](./installer.md#oninstallerafterinstaller) | After extension installation | Installer     |  before 4.0  |

