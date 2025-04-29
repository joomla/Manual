---
sidebar_position: 4
title: Packages
---

Packages
========

A package is a special type of Joomla extension which is used to install multiple extensions at one time. Use a package if you have, for example, a component and a module that are dependent upon each other. Combining them in a package will allow the user to install and uninstall both extensions in a single operation.

## Creating a Package

A package extension is created by zipping all .zip files of the indivudal extensions together with a package xml manifest file. For example, if you have a package composed of the following constituents:

- component helloworld
- module helloworld
- library helloworld
- system plugin helloworld
- template helloworld

then the package should have the following tree within the `pkg_helloworld` folder:

```
pkg_helloworld
 ├─── pkg_helloworld.xml
 ├─── constituents
 │     ├─── com_helloworld.zip
 │     ├─── mod_helloworld.zip
 │     ├─── lib_helloworld.zip
 │     ├─── plg_sys_helloworld.zip
 │     └─── tpl_helloworld.zip
 └─── pkg_script.xml

```

The `pkg_helloworld.xml` manifest file could have the following contents:

```xml title="pkg_helloworld.xml"
<?xml version="1.0" encoding="UTF-8" ?>
<extension type="package" version="1.6" method="upgrade">
    <name>Hello World Package</name>
    <author>Hello World Package Team</author>
    <creationDate>today</creationDate>
    <packagename>helloworld</packagename>
    <version>1.0.0</version>
    <url>http://www.yoururl.com/</url>
    <packager>Hello World Package Team</packager>
    <packagerurl>http://www.yoururl.com/</packagerurl>
    <description>Example package to combine multiple extensions</description>
    <update>http://www.updateurl.com/update</update>
    <scriptfile>pkg_script.php</scriptfile>
    <blockChildUninstall>true</blockChildUninstall>
    <files folder="constituents">
        <file type="component" id="com_helloworld" >com_helloworld.zip</file>
        <file type="module" id="helloworld" client="site">mod_helloworld.zip</file>
        <file type="library" id="helloworld">lib_helloworld.zip</file>
        <file type="plugin" id="helloworld" group="system">plg_sys_helloworld.zip</file>
        <file type="template" id="helloworld" client="site">tpl_helloworld.zip</file>
    </files>
</extension>
```

You then zip up the `pkg_helloworld` folder and install the package extension in the normal way.
When you go to Manage Extensions you will then see:
- an entry for the overall helloworld package, and,
- entries for each of the constituent extensions within the package.

These match the associated rows in the Joomla `#__extensions` table.

Listed below are a number of items you have to make sure that you get right in order for the package install / uninstall process to work as you expect.

### File Naming

The manifest file of the package must be named `pkg_<packagename>.xml` where `<packagename>` is the element in your XML:

```xml
<packagename>helloworld</packagename>
```

So in this case the manifest file must be named `pkg_helloworld.xml`.

When you uninstall a package Joomla looks for a manifest file named `pkg_<packagename>.xml` and if you don't name it correctly then the uninstall will fail with Joomla reporting that it can't find the manifest file.

### `id` attribute

Within the `<file>` element of each constituent extension the `id` attribute must match the `element` column of that extension's record in the `#__extensions` table.

(See the [Metadata](manifest.md#metadata) and [Frontend Files](manifest.md#frontend-files) sections for some explanation of how this `element` field is set).

When you uninstall a package Joomla uses this information in the manifest file to perform a database lookup in the `#__extensions` table to find each constituent extension. If you don't set this correctly then Joomla will not uninstall that constituent extension.

### Plugin `group` attribute

The `group` attribute is required for the package installer to locate the plugin for uninstall.

Group refers to the `group` attribute specified within the `<extension>` element of the plugin manifest file, and matches the subfolder name under the Joomla /plugins directory.

### `blockChildUninstall` tag

Use this tag to prevent an administrator from uninstalling individually a constituent extension of your package.

If you omit this tag or have

```xml
<blockChildUninstall>false</blockChildUninstall>
```

then an administrator will be able to uninstall a constituent extension of your package, while leaving the others unaffected.

### Other tags

Other tags of the package XML manifest file work in a similar manner to those of other extensions, as described in [Manifest Files](manifest.md) and [Install Process and Script Files](install-process.md).
