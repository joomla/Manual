---
sidebar_position: 4
title: Plugin Events
---

List of Plugin Events
=====================

The list of events below includes the event name and a short description of its use, together with a link to the detailed description.

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
| [onCustomFieldsGetTypes](./custom-fields.md#oncustomfieldsgettypes) | Getting the types of custom field which the plugins provide | Fields |  before 4.0  |
| [onCustomFieldsPrepareDom](./custom-fields.md#oncustomfieldspreparedom) | Adding a custom field to a form | Fields |  before 4.0  |
| [onCustomFieldsBeforePrepareField](./custom-fields.md#oncustomfieldsbeforepreparefield) | Before the value of a custom field is prepared for display | Fields |  before 4.0  |
| [onCustomFieldsPrepareField](./custom-fields.md#oncustomfieldspreparefield) | Preparing the value of a custom field for display | Fields |  before 4.0  |
| [onCustomFieldsAfterPrepareField](./custom-fields.md#oncustomfieldsafterpreparefield) | After the value of a custom field has been prepared for display | Fields |  before 4.0  |
| [onStartIndex](./finder.md#onstartindex) | Smart Search is starting to build the index | Finder     |  before 4.0  |
| [onBeforeIndex](./finder.md#onbeforeindex) | Before Smart Search indexes a batch of items | Finder     |  before 4.0  |
| [onBuildIndex](./finder.md#onbuildindex) | Smart Search is indexing a batch of items | Finder     |  before 4.0  |
| [onPrepareFinderContent](./finder.md#onpreparefindercontent) | Before an item is stored in the Smart Search index | Finder     |  before 4.0  |
| [onFinderGarbageCollection](./finder.md#onfindergarbagecollection) | Removing items which no longer exist from the Smart Search index | Finder     |  4.2  |
| [onFinderBeforeSave](./finder.md#onfinderbeforesave) | Before a record is saved, triggered by the "Content - Smart Search" plugin | Finder     |  before 4.0  |
| [onFinderAfterSave](./finder.md#onfinderaftersave) | After a record is saved, triggered by the "Content - Smart Search" plugin | Finder     |  before 4.0  |
| [onFinderAfterDelete](./finder.md#onfinderafterdelete) | After a record is deleted, triggered by the "Content - Smart Search" plugin | Finder     |  before 4.0  |
| [onFinderChangeState](./finder.md#onfinderchangestate) | After a set of records changes state, triggered by the "Content - Smart Search" plugin | Finder     |  before 4.0  |
| [onFinderCategoryChangeState](./finder.md#onfindercategorychangestate) | After a set of category records changes state, triggered by the "Content - Smart Search" plugin | Finder     |  before 4.0  |
| [onFinderResult](./finder.md#onfinderresult) | Before a Smart Search result is displayed | Finder / Content     |  4.0  |
| [onInstallerAddInstallationTab](./installer.md#oninstalleraddinstallationtab) | In com_installer, in building the Install / Extensions form | Installer     |  before 4.0  |
| [onInstallerBeforePackageDownload](./installer.md#oninstallerbeforepackagedownload) | In Installer, before a package is downloaded | Installer     |  before 4.0  |
| [onInstallerBeforeUpdateSiteDownload](./installer.md#oninstallerbeforeupdatesitedownload) | In Installer, before an update site is downloaded | Installer     |  5.3  |
| [onInstallerBeforeInstallation](./installer.md#oninstallerbeforeinstallation) | At the beginning of the installation of a package / extension | Installer     |  before 4.0  |
| [onInstallerBeforeInstaller](./installer.md#oninstallerbeforeinstaller) | After zip files extracted, before extension installation | Installer     |  before 4.0  |
| [onInstallerAfterInstaller](./installer.md#oninstallerafterinstaller) | After extension installation | Installer     |  before 4.0  |
| [onPrepareModuleList](./module.md#onpreparemodulelist) | Before getting the list of modules | System (Module)|  before 4.0  |
| [onAfterModuleList](./module.md#onaftermodulelist) | After getting the list of modules, but before cleaning | System (Module)     |  before 4.0  |
| [onAfterCleanModuleList](./module.md#onaftercleanmodulelist) | After getting the cleaned list of modules | System (Module)     |  before 4.0  |
| [onRenderModule](./module.md#onrendermodule) | After getting the raw module output | System (Module)     |  before 4.0  |
| [onAfterRenderModule](./module.md#onafterrendermodule) | After the module style has been applied to the module raw output | System (Module)     |  before 4.0  |
| [onAfterRenderModules](./module.md#onafterrendermodules) | After rendering of all modules for a template position  | System (Module)     |  before 4.0  |
| [onUserAuthenticate](./user-auth.md#onuserauthenticate) | To authenticate a user  | System (Authentication)     |  before 4.0  |
| [onUserLoginFailure](./user-auth.md#onuserloginfailure) | The user fails authentication  | User |  before 4.0  |
| [onUserAuthorisation](./user-auth.md#onuserauthorisation) | To perform user authorisation  | User |  before 4.0  |
| [onUserAuthorisationFailure](./user-auth.md#onuserauthorisationfailure) | User authorisation fails | User |  before 4.0  |
| [onUserLogin](./user-auth.md#onuserlogin) | User has successfully passed authentication and authorisation | User |  before 4.0  |
| [onUserAfterLogin](./user-auth.md#onuserafterlogin) | User has successfully logged on | User |  before 4.0  |
| [onUserLogout](./user-auth.md#onuserlogout) | User is logging out | User |  before 4.0  |
| [onUserAfterLogout](./user-auth.md#onuserafterlogout) | User has successfully logged out | User |  before 4.0  |
| [onUserLogoutFailure](./user-auth.md#onuserlogoutfailure) | A problem with a user logout has arisen | User |  before 4.0  |
| [onUserBeforeSave](./user-auth.md#onuserbeforesave) | Before saving a Users record | User |  before 4.0  |
| [onUserAfterSave](./user-auth.md#onuseraftersave) | After saving a Users record | User |  before 4.0  |
| [onUserBeforeDelete](./user-auth.md#onuserbeforedelete) | Before deleting a Users record | User |  before 4.0  |
| [onUserAfterDelete](./user-auth.md#onuserafterdelete) | After deleting a Users record | User |  before 4.0  |
| [onUserBeforeSaveGroup](./user-auth.md#onuserbeforesavegroup) | Before saving a Usergroups record | User |  before 4.0  |
| [onUserAfterSaveGroup](./user-auth.md#onuseraftersavegroup) | After saving a Usergroups record | User |  before 4.0  |
| [onUserBeforeDeleteGroup](./user-auth.md#onuserbeforedeletegroup) | Before deleting a Usergroups record | User |  before 4.0  |
| [onUserAfterDeleteGroup](./user-auth.md#onuserafterdeletegroup) | After deleting a Usergroups record | User |  before 4.0  |
| [onUserAfterRemind](./user-auth.md#onuserafterremind) | After emailing a username reminder | User |  before 4.0  |
| [onUserBeforeResetRequest](./user-auth.md#onuserbeforeresetrequest) | Before sending an email to reset a password | User |  4.2  |
| [onUserAfterResetRequest](./user-auth.md#onuserafterresetrequest) | After sending an email to reset a password | User |  4.2  |
| [onUserBeforeResetComplete](./user-auth.md#onuserbeforeresetcomplete) | Before updating a forgotten password which has been reset | User |  4.2  |
| [onUserAfterResetComplete](./user-auth.md#onuserafterresetcomplete) | After updating a forgotten password which has been reset | User |  4.2  |
| [onUserLoginButtons](./user-auth.md#onuserloginbuttons) | To allow buttons to be added to the logon form | User |  4.0  |

