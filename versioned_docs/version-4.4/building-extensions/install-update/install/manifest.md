---
sidebar_position: 1
title: Manifest Files
---

Manifest Files
==============

You install Joomla extensions by means of a manifest XML file, and there are many Joomla examples which you can use as a basis for your own extension:
- components - in administrator/components, eg administrator/components/com_contact/contact.xml
- modules - in modules or administrator/modules, eg modules/mod_breadcrumbs/mod_breadcrumbs.xml
- plugins - in plugins, eg plugins/system/remember/remember.xml
- templates - in templates or administrator/templates, eg administrator/templates/atum/templateDetails.xml
- languages - in language or administrator/language, eg language/en-GB/install.xml

This section covers the detailed definition of the XML in a Manifest File.

## File Naming Convention

It is important that you name your manifest file correctly. Otherwise you may find that your extension installs, but that your extension's namespace isn't built correctly, and your extension doesn't run.

Here are the naming rules for the different extension types (as listed in [Building Extensions](../../building-extensions/index.md)):

**Components**: for a component called com_example you can use either com_example.xml or example.xml.

**Modules**: for a module mod_example use mod_example.xml. This must match the module name given in your manifest `<files>` section

```xml
<files>
    <folder module="mod_example">services</folder>
    ...
</files>
```

or if you don't yet use a services/provider.php file:

```xml
<files>
    <filename module="mod_example">mod_example.php</folder>
    ...
</files>
```

**Plugins**: for a plugin plg_example use example.xml. This must match the plugin name given in your manifest `<files>` section

```xml
<files>
    <folder plugin="example">services</folder>
    ...
</files>
```

or if you don't yet use a services/provider.php file:

```xml
<files>
    <filename plugin="example">example.php</folder>
    ...
</files>
```

**Templates**: your manifest file must be named templateDetails.xml

**Language**: use install.xml

**File**, **Library**, **Package**: you can use any name, but libraries are usually named lib_example.xml and packages pkg_example.xml.

For components, modules and plugins the manifest file must match the 'element' field of your extension's record in the `#__extensions` table (except that for components the "com_" prefix may be omitted).
The 'element' is the internal name within Joomla of the extension. 

In priority order the 'element' database field is set 
- from the `<element>` in the manifest file, or 
- from the "module=" or "plugin=" attribute in the `<files>`, or
- from the `<name>` (after the text is cleaned).

## Root Element

The primary tag of the installation file is

```xml
<extension>
...
</extension>
```

This starting and closing tag is the same for all extensions. The following attributes are allowed within the tag: 

| Attribute                         | Values           | Applicable To    | Description                                              |
| --------------------------------- | ---------------- | ---------------- | -------------------------------------------------------- |
| type | component<br/>file<br/>language<br/>library<br/>module<br/>package<br/>plugin<br/>template | All extensions | |
| method | install<br/>upgrade | All extensions | The install value (default) means the installer will gracefully stop if it finds any existing file/folder of the new extension<br/>The upgrade value allows you to install an upgraded version on top of the existing version | 
| client | site<br/>administrator | Modules | Defines whether the module is a front-end site module or back-end administrator module |
| group | *string* | Plugins | The group name specifies for which group of plugins the new plugin is available.<br/>The existing groups are the folder names within the directory /plugins.<br/>The installer will create new folder names for group names that do not exist yet. |

## Metadata

The following elements can be used to insert metadata. Although not strictly required, you should define at least the `<name>`, `<author>`, '<version>` and `<description>` tags, all of which are used on the default administrator Manage Extensions form. 

```xml
<name> – extension name (e.g. com_banners). 
<author> – author's name (e.g. Joomla! Project)
<creationDate> – date of creation or release (e.g. April 2006)
<copyright> – a copyright statement (e.g. (C) 2020 - 2030 Open Source Matters. All rights reserved.)
<license> – a license statement (e.g. GNU General Public License version 3 or later; see LICENSE.txt)
<authorEmail> – author's email address (e.g. admin@joomla.org)
<authorUrl> – URL to the author's website (e.g. www.joomla.org)
<version> – the version number of the extension (e.g. 1.6.0)
<description> – the description of the component (may be shown as a tooltip on the admin Manage Extensions page)
<element> – the internal name of the component. If omitted, name will be cleaned and used
```

The `<name>` and `<description>` fields are translatable. If you use language strings for these elements then they should be defined in your language .sys.ini file AND your .ini file. 

## Front-end Files

```xml
<files folder="from-folder">
    <filename>example.php</filename>
    <folder>examples</folder>
</files>
```

This is used to copy files from your development "from-folder" into the front-end directory of your installed extension. 
You can either identify files individually using `<filename>` or copy a complete directory using `<folder>`.

For plugins and modules you should identify the entry point of your code.
If you are using dependency injection within your module or plugin and have a services/provider.php file then use

```xml
    <folder module="mod_example">services</folder> 
or
    <folder plugin="example">services</folder> 
```

Here "mod_example" / "example" is the internal name (aka 'element') of your module / plugin.

If you are not using a services/provider.php file then point to the specific filename:

```xml
    <filename module="mod_example">mod_example.php</folder> 
or
    <filename plugin="example">example.php</folder> 
```

## Media Files

This categories covers:
- your javascript files
- your css files
- any images which are inheritently part of your extension (ie not something an administrator should be able to change).

(For an example of these sorts of images, consider the flag symbols in media/mod_languages/images/ which are used by the language switcher.)

In your development area you should store these in separate folders: js/, css/, images/ then use 

```xml
<media folder="media" destination="com_example">
    <folder>js</folder>
    <folder>css</folder>
    <folder>images</folder>
</media>
```

The installer will move these folders into media/com_example/js, media/com_example/css and media/com_example/images, creating the com_example folder if required.

This media folder is used for both the site front-end and the administrator back-end.

## Administration section

```xml
<administration>
    <!-- various elements -->
</administration>
```

The administration section is defined in the `<administration>` element. Since only components apply to both the site and the administrator, only component manifests can include this element. 

### Administrator Back-end Files

Files to copy below the administrator directory should be placed in the `<files>` element under the `<administration>` and can be used to copy individual files or complete folders, as described above for front-end files. 

### Administrator Menu Links and Submenus

This maps to menu and submenu links for your component in the administrator sidebar menu (under Components).

```xml
<administration>
    <menu>COM_EXAMPLE</menu>
    <submenu>
        <!--
            Note that all & must be escaped to &amp; for the file to be valid
            XML and be parsed by the installer
        -->
        <menu link="anoption=avalue&amp;anoption1=avalue1">COM_EXAMPLE_SUBMENU_ANOPTION</menu>
        <menu view="viewname">COM_EXAMPLE_SUBMENU_VIEWNAME</menu>
    </submenu>
</administration>
```

Each `<menu>` item can define the following attributes: 

| Attribute          | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| link | A link to send the user to when the menu item is clicked. You can use "view" instead. |
| view | An URL parameter to add to the link.<br/> For example, `<menu view="cpanel">COM_EXAMPLE</menu>` in com_example's XML manifest would cause the URL of the menu item to be index.php?option=com_example&view=cpanel.<br/> You can use "link" instead. |
| img  | The (relative) path to an image (16x16 pixels) to appear beside the menu item.<br/>Must be an url compatible as a file too (e.g. no spaces) ! |
| alt  | alt text for the link |

You can also create links to dashboards - see the following section for details.

The value inside the tag is the menu's label. If you use language strings inside these elements then they should be defined in your component's .sys.ini file.

The installer creates entries in the `#__menu` table for these menu items, and Joomla loads from the database these entries when it builds the administrator menu.

(Administrator menu items for components such as com_content are defined in the component's preset folder, eg in administrator/components/com_content/presets/content.xml).

## Dashboards

You create a dashboard for your component using

```xml
<dashboards>
    <dashboard title="Example Dashboard" icon="icon-lock">example</dashboard>
</dashboards>
```

When your component is installed then you can navigate to your dashboard using 

```
administrator/index.php?option=com_cpanel&view=cpanel&dashboard=example
```

This will display at the top the `title` and `icon`, but will initially be empty. 
You can define items for your dashboard using a preset and / or by adding administrator modules to it using the position `cpanel-example`, as described in [Dashboard](../../../general-concepts/dashboard.md). 

To create a link to your dashboard use (in your administrator menu section):

```xml
<administration>
    <menu>COM_EXAMPLE
        <params>
            <dashboard>example</dashboard>
        </params>
    </menu>
</administration>
```

The text "example" within the `<dashboard>` tags must match the text within the corresponding tags in the `<dashboards>` element.

## Configuration

For modules, plugins and templates you can define configuration using a `<config>` section. 
Within the `<config>` tags you specify the configuration fields as described in [Form Fields](../../../general-concepts/forms-fields/index.md).

There are many examples among the Joomla extensions, see mod_breadcrumbs for example. 

The configuration is defined by navigating to the administrator Manage Modules / Manage Plugins / Template Styles functionality.

You cannot use `<config>` for defining configuration for components.
For details of how to provide component configuration see [Developing an MVC Component/Adding configuration](https://docs.joomla.org/J3.x:Developing_an_MVC_Component/Adding_configuration), which (though written for Joomla 3) is still applicable.

:::note[TODO]
  Update the above link when the MVC Component Tutorial is included in the manual.
:::

## Namespace

Define the namespace prefix for your extension using:

```xml
<namespace path="src">Mycompany\Component\Example</namespace>
```

See the manual [Namespace](../../../general-concepts/namespaces/index.md) section for details. 

## SQL

The SQL section (primarily used by components) enables you to make changes to the database data owned by your extension. 

There are 3 types of changes:
1. **Install** Initial database setup for your extension, for the first version of your extension (or, at least, the first version which configures the database). 
2. **Update** Database changes to be applied upgrading to this version from the previous version
3. **Uninstall** Database changes to be applied when the extension is uninstalled.

For each type of database (eg mysql) you will have:
- 1 SQL file for the install
- 1 SQL file for the uninstall
- a folder containing several update SQL files, each enabling upgrading from the previous version to the current

Each SQL file contains a series of SQL statements, with table names using the '#__' prefix, eg '#__categories'. 

By convention all these sql files are stored in a folder called "sql" within the administrator folder, which you must define within your administrator files section, eg

```xml
<administration>
    <files folder="admin/">
        <folder>sql</folder>
    </files>
</administration>
```

For your install file:

```xml
<install>
    <sql>
        <file driver="mysql" charset="utf8">sql/example.install.sql</file>
    </sql>
</install>
```

You can have several `<file>` elements, for different database drivers.

For your uninstall file(s):

```xml
<uninstall>
    <sql>
        <file driver="mysql" charset="utf8">sql/example.uninstall.sql</file>
    </sql>
</uninstall>
```

For your update files:

```xml
<update>
    <schemas>
        <schemapath type="mysql">sql/updates/mysql</schemapath>
    </schemas>
</update>
```

where, for example, sql/updates/mysql contains a series of files, eg:
- 0.0.2.sql (for upgrading to v0.0.2)
- 0.0.3.sql (for upgrading from v0.0.2 to v0.0.3), etc.
- 0.0.4.sql (for upgrading from v0.0.3 to v0.0.4), etc.

If the first version you install is eg 0.0.4 then Joomla will use the initial example.install.sql file, and then apply in order the update files to arrive at v0.0.4.

If you install one version of the extension then skip some versions before installing the next, then Joomla applies each of the update sql files to go from your previous version to the one you're installing. 

The currently installed version is maintained in the `#__schemas` table. 
You can find a worked example in [Developing an MVC Component/Using the database](https://docs.joomla.org/J3.x:Developing_an_MVC_Component/Using_the_database).

:::note[TODO]
  Update the above link when the MVC Component Tutorial is included in the manual.
:::

## Languages

You specify your language ini files in a structure like this:

```
language
 ├─── en-GB
 │     ├─── mod_hello.ini
 │     └─── mod_hello.sys.ini
 └─── fr-FR
       ├─── mod_hello.ini
       └─── mod_hello.sys.ini
```

The subfolder name (eg en-GB) must match the language code of the language your extension is supporting. 
You can find the list of all languages supported by Joomla (together with their language codes) via the [Joomla Language Downloads](https://downloads.joomla.org/language-packs).

(For historical reasons Joomla also supports the language file names being prefixed with the language code, eg en-GB.mod_hello.ini).

There are 2 ways which you can use to install your extension's language files.

1. Using the `<languages>` tag

```xml
<languages folder="language">
    <language tag="en-GB">com_example.ini</language>
    <language tag="en-GB">com_example.sys.ini</language>
</languages>
```

Joomla will copy your language files (from the folder specified in the 'folder' attribute) into the appropriate Joomla language folder:
- under /language for the site front-end (site modules, site templates and components when the `<languages>` tag is immediately inside `<extension>`).
- under /administrator/language for the administrator back-end (plugins, administrator modules, administrator templates and components when the `<languages>` tag is inside `<administration>`).

In your code you can then load your .ini language file using (eg for mod_example):

```php
Factory::getApplication()->getLanguage()->load('mod_example');
```

2. Copying from a language folder

```xml
<files>
    <folder>language</folder>
</files>
or
<administration>
    <files>
        <folder>language</folder>
    </files>
</administration>
```

This will simply copy your 'language' folder into the target folder of your extension.
In this case, you must name your folder "language", as this is the name of the folder where Joomla will look to find your language files.

To load your .ini language file you must pass the base path for your extension (eg for site module mod_example):

```php
Factory::getApplication()->getLanguage()->load('mod_example', JPATH_BASE . '/modules/mod_example');
```

The advantage of this second approach is that the language files continue to be closely associated with your extension.

If an administrator uninstalls a language then 
- for option 1 your extension's language files will be deleted
- for option 2 your extension's language files will remain.

If the administrator then reinstalls the removed language then
- for option 1 your extension will need to be reinstalled to restore its language files for the reinstalled language
- for option 2 no further action is needed.

## Script File

```xml
<scriptfile>script.php</scriptfile>
```

This specifies the filename of a script file containing PHP code which is run during the installation process. It is described in [Install Process and Script Files](./install-process.md).

## Library Files

This is specific to a manifest of type "library".

```xml
<libraryname>mylib</libraryname>
```

Joomla will treat libraries/mylib as the target directory, and any files and folders will be copied under it.

If your company has several libraries and you want to group them together under the folder JPATH_SITE/libraries/mycompany then include your company name in the `<libraryname>` tag of each library:

```xml
<libraryname>mycompany/mylib1</libraryname>
```

```xml
<libraryname>mycompany/mylib2</libraryname>
```

These libraries will then be installed in the JPATH_SITE/libraries/mycompany/mylib1 and JPATH_SITE/libraries/mycompany/mylib2 folders.
Uninstalling mylib1 will still leave mylib2 installed on your site. 

## Update Server

```xml
<updateservers>
    <server type="extension" priority="1" name="Extension Update Site">http://example.com/extension.xml</server>
    <server type="collection" priority="2" name="Collection Update Site">http://example.com/collection.xml</server>
</updateservers>
```

Please see [Update Servers](../update-server.md).

## Changelog

Specify the URL of the changelog description for this version of your extension:

```xml
<changelogurl>https://example.com/updates/changelog.xml</changelogurl>
```

The URL in the `<changelogurl>` tag must not have any spaces or line breaks before or after it. 

See the section on [ChangeLogs](./change-log.md).

## Download Keys

Users can enter their download keys via the Update Sites list, which provides a single place to manage them. 
When a user is going to update an extension, Joomla will check if there is a download key. If there is a download key, Joomla will add the download key to the update URL. 

To support download keys you must include the dlid tag in the manifest file. The dlid tag takes 2 arguments:
- prefix
- suffix

The dlid tag will look like this in your manifest file:

```xml
<dlid prefix="dlid=" suffix="&amp;dummy=my.zip"/>
```

The prefix will be added before the download key and the suffix after the download key. Using the example above the full query added to the download link will be:

```
dlid=KEY&amp;dummy=my.zip
```

The key is added before the `onInstallerBeforePackageDownload` event is triggered, so the full URL will be passed to the event. 

## Summary

This documents which manifest elements are supported during which installation of an extension.

| Component | File | Language | Library | Module | Package | Plugin | Template |
| --------- | ---- | -------- | ------- | ------ | ------- | ------ | -------- | 
| `<sql>` | yes | yes | no | no | yes | no | yes | no |
| `<languages>` | yes | yes | no | yes | yes | yes | yes | yes | 
| `<tag>` | no | no | yes | no | no | no | no | no |
| `<media>` | yes | no | yes | yes | yes | no | yes | yes |
| `<config>` | no | no | no | no | yes | no | yes | yes |
| `<script>` | yes | yes | no | no | yes | yes | yes | no |
| `<updateserver>` | yes | yes | yes | yes | yes | yes | yes | yes |
