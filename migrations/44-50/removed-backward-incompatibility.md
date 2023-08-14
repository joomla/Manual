---
sidebar_position: 3
---

Removed and backward incompatibility
===============
All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

### PSR-3 upgraded to version 3

The PSR-3 (Logging) is upgraded to [version 3](https://github.com/php-fig/log/tree/3.0.0) of the specification.

Most critically, the signature of the `\Psr\Log\LoggerInterface` methods has changed. The `$message` argument is now strongly typed as `string|\Stringable`. Any logger implementation you use **must** be compatible with this new signature. This is relevant to you if you implement your own logger, or if you are using a third party logger such as Monolog, in your extension.

If you are using your own logger, you want to preserve compatibility with Joomla 4 and 5 in the same extension package, and you do not mind losing PSR-3 compatibility you can include a copy of PSR-3 in your extension _as long as it's under your extension's namespace_. For example, instead of using `\Psr\Log\LoggerInterface` you could use `\Acme\Component\Example\Administrator\Log\LoggerInterface`. Note that you can use [PHP Scoper](https://github.com/humbug/php-scoper) to easily migrate your dependencies under your own namespace.

If you only need to maintain compatibilty with PSR-3 to use an logger external to your component, such as Joomla's logger, you can still typehint against `\Psr\Log\LoggerInterface`. Please note that the external logger you are using must be compatible with PSR-3 version 1 on Joomla 4 and PSR-3 version 3 on Joomla 5. If you are providing a third party, external logger yourself you may need to include two versions of the logger with your extension and only load the correct one for each Joomla version.

### Framework Update

Joomla! 5.0 uses the Joomla! Framework 3.0, this might have it own breaking changes:

- Dependency Container:  
  PR: https://github.com/joomla-framework/di/pull/48
  Description: It is possible to override services in child containers. This allows to override protected services, like the form factory one, in the containers of an extension when they are booted.


### Database must be injected in constructor model
- PR: https://github.com/joomla/joomla-cms/pull/38511
- Description: The database instance in the model should be injected through the `$this->setDatabase()` or the deprecated function `$this->setDbo()`  configuration in the constructor to make it available in the base class. Like that it is ensured that calls to `$this->getDatabase()` and the deprecated function `$this->getDbo()` will point to the same instance.

```php
class MyModel extends ListModel {
  public function __construct(..) {
    parent::__construct(...);
    $this->setDatabase(MyHelper::getGridDB());
  }
}
```

### Drop -es5.js files
- PR: https://github.com/joomla/joomla-cms/pull/39618
- Descriptions: The build tools won't produce es5 files (IIFE, transpiled to ES5) anymore. Further more the dependencies in all the assets.json files that were pointing to these (es5) files were removed (the acutal entries for the -es5.js were kept for B/C but the URLs are empty, the files won't be loaded). The .es6.js files are transpiled to ES2018 and specifically the minimum browser versions are the ones from [caniuse: es6-module](https://caniuse.com/es6-module). 3rd PD code that used the `type=module`/`nomodule` to load modern/legacy code will still work as it did before but the core is not distributiong anymore `IE11` compatible scripts!
.
### CSS removals
The CSS class ".ie11" was removed [via PR #39018](https://github.com/joomla/joomla-cms/pull/39018)

### Javascript removals
The following Javascript assets were removed [via PR #40302](https://github.com/joomla/joomla-cms/pull/40302):
- `/media/com_templates/js/admin-template-compare.js` - Not used anymore by the core since version 4.3.0, [see PR #38823](https://github.com/joomla/joomla-cms/pull/38823).

- `/media/com_users/js/admin-users-mail.js` - Not used anymore by the core since version 4.3.0, [see PR #39374](https://github.com/joomla/joomla-cms/pull/39374).

This includes also the `-es5.js` files and the minified and gzipped files and the corresponding entries in `joomla.asset.json` files.

The files have been kept in Joomla 4 for b/c with layout overrides.

To fix these layout overrides for Joomla 5, change your layout override in the same way as the corresponding core layout has been changed by the PR mentioned in the list above for each Javascript asset.

Eg for the template manager's side-by-side comparison view, [see PR #38823](https://github.com/joomla/joomla-cms/pull/38823).

### Return Types
All return types have been updated to match the PHP 8.1 return type signatures. This addresses any class utilising the ArrayAccess, Datetime or the JsonSerializable interfaces. If you extend from any of the affected classes and require compatibility with both Joomla 4.x and 5.x you should add the `#[\ReturnTypeWillChange]` annotation to your code.

#### administrator/components/com_users/src/DataShape/DataShapeObject.php

```php
public function __isset(...)      --> public function __isset(...): bool
public function offsetExists(...) --> public function offsetExists(...): bool
public function offsetGet(...)    --> public function offsetGet(...): mixed
public function offsetSet(...)    --> public function offsetSet(...): void
public function offsetUnset(...)  --> public function offsetUnset(...): void
```

#### libraries/src/Date/Date.php

```php
public function format(...)      --> public function format(...): string
public function setTimezone(...) --> public function setTimezone(...): \Datetime
```

#### libraries/src/Document/JsonapiDocument.php

```php
public function jsonSerialize(...) --> public function jsonSerialize(...): mixed
```

#### libraries/src/Feed/Feed.php

```php
public function count(...)        --> public function count(...): int
public function offsetExists(...) --> public function offsetExists(...): bool
public function offsetGet(...)    --> public function offsetGet(...): mixed
public function offsetSet(...)    --> public function offsetSet(...): void
public function offsetUnset(...)  --> public function offsetUnset(...): void
```

#### libraries/src/Language/Language.php

\Joomla\CMS\Language\Language extends now from \Joomla\Language\Language

Duplicated code which is extended from the framework has been removed

```php
public function debugFile(...) --> public function debugFile(string $filename): int
```

### Menus controller resync function got removed
- PR: https://github.com/joomla/joomla-cms/pull/40336
- Description: The resync function in the administrator MenusController class is only used for the 1.5 to 1.6 upgrade routine.

### User changes
- Removed message "Cannot load user X", for removed users.  PR: https://github.com/joomla/joomla-cms/pull/41048

### Some core classes are not anymore of type CMSObject

PR: https://github.com/joomla/joomla-cms/pull/40999
Files:
- libraries/src/Categories/CategoryNode.php
- libraries/src/Changelog/Changelog.php
- libraries/src/Filesystem/Stream.php
- libraries/src/Installer/InstallerExtension.php
- libraries/src/MVC/Model/BaseModel.php
- libraries/src/MVC/View/AbstractView.php
- libraries/src/Table/Table.php
- libraries/src/Updater/Update.php
- libraries/src/User/User.php

Description: These classes do not extend anymore from `CMSObject`, but are including the `LegacyErrorHandlingTrait` and `LegacyPropertyManagementTrait` legacy traits as the `CMSObject` does too. Like that does the functionality not change. Keep in mind that the functions of these traits are deprecated and exceptions should be thrown or proper getter and setters should be created.

### DIC Service Provider Changes
PR: https://github.com/joomla/joomla-cms/pull/36499

The input object is now available in the DIC. You should NOT use it directly in your extensions and should continue to
get the input via the application object.

\Joomla\CMS\Factory::$application is no longer sometimes set inside the Application's DIC provider but instead is now
reliably set inside the includes/app.php file of each Application. It is not expected for this change to affect
extension developers as there are no extension hooks this early in the Joomla Application lifecycle.

### Session Object Changes
In the unusual case of creating a full custom session object of `\Joomla\CMS\Session\Storage\JoomlaStorage` the
cookie domain and cookie path should now be set in the options object when creating the class. They will not be fetched
from the application object to fix various circular dependency issues. As we expect all extensions to use the principal
session created by the CMS in the application this is not expected to have a practical effect on end users.

### Plugins

#### Demo task plugin got removed
- PR: https://github.com/joomla/joomla-cms/pull/40147
- Description: The demo task plugin got removed as it was intended for demonstration purposes only.

#### Codemirror plugin

PR: https://github.com/joomla/joomla-cms/pull/41070

Codemirror script has been update to 6-th version. New version are based on ES modules. 
Any customisation and javascript code written for Codemirror 5 is incompatible with Codemirror 6.


To initialise codemirror instance you can use helper provided by Joomla in `codemirror` module, example:
```php
$wa->getRegistry()->addExtensionRegistryFile('plg_editors_codemirror');
$wa->useScript('codemirror');
```
```javascript
import { createFromTextarea } from 'codemirror';
const editor = await createFromTextarea(textAreaElement, options);
```
### Removed 3rd party libraries

## Joomla\Ldap

Our own LDAP library is no longer compatible with Joomla 5, it has been removed.
As part of this we removed the following class aliases from the b/c plugin:

- JClientLdap -> \\Joomla\\Ldap\\LdapClient
- JLDAP -> \\Joomla\\Ldap\\LdapClient

Joomla 4 and 5 includes the symfony Ldap package.

### Change ordered lists in com_content links to unordered lists
The links in com_content > category > blog-links.php and com_content > featured > default-links.php use `<ul></ul>` instead of `<ol></ol>`.
Changes made [via PR #40629](https://github.com/joomla/joomla-cms/pull/40629) 
