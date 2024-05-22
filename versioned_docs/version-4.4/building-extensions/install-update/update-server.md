---
sidebar_position: 3
title: Update Servers
---

Update Servers
==============

## Background

Updating Joomla extensions via an update server is a two step process:
1. Finding the updates available for the installed extensions.
2. Selecting an update and installing it.

Typically this is done by the administrator via the System Dashboard Update / Extensions page
1. You click on Check For Updates to find the updates available.
2. You mark the checkbox of each update you want to install and click on Update.

Joomla also checks automatically for extension updates when an administrator logs onto the back-end.

Each Joomla extension that is updated via an update server has a URL associated with it that points to an XML file containing details of the updates available. 
This file could be hosted on the extension developer's own website, for example. 
If you go to the admin System Dashboard and select Update / Update Sites then you will see this URL in the Update Site column, and you can click on those URLs to see the format of the XML files.

The XML file contains details of what updates are available for that extension, including any restrictions (for example, you may have to be running a certain Joomla version to be able to use it), and the URL of the zip file containing the new version of the extension.

## What you have to do

To provide an update server you have to do 3 things.

### 1 XML File

Firstly you need to define an XML file for your updates and load it into your update server directory. A basic file is shown below:

```xml title=extension.xml
<updates>
	<update>
		<name>Example component</name>
		<description>Example component</description>
		<element>com_example</element>
		<type>component</type>
		<version>1.0.0</version>
		<client>administrator</client>
		<downloads>
			<downloadurl type="full" format="zip">http://example.com/com_example-1-0-0.zip</downloadurl>
		</downloads>
		<targetplatform name="joomla" version="((4\.4)|(5\.(0|1|2|3|4|5|6|7|8|9)))" />
		<php_minimum>8.1</php_minimum>
	</update>
</updates>
```

Note that it has
- basic information about the extension – eg name, version
- a link to the zip file for that update
- restrictions – for Joomla versions 4.4 or 5.x only, and at least PHP version 8.1

Whenever an administrator clicks on the Find Updates button, Joomla sends HTTP requests to each of the URLs of these update servers to retrieve the XML files. It parses each XML file,
- ensures it's properly formed XML
- compares the version of the update with the version of the extension currently running
- checks any restrictions (Joomla versions, PHP versions, database versions) with what is currently running.

If it finds it's a valid update for this website, it inserts a record into the `#__updates` table in the database. (You'll find at most one update for each extension, because if there are several possible then Joomla will store only the most recent valid version, i.e. with the highest version number). 

### 2 Extension Update

You store on your update server the zip file of the update for your extension. 
The filename must match the `<downloadurl>` element in your XML file.

### 3 Tell Joomla where your update server is

You do this by specifying in your extension's manifest file, for example:

```xml
<updateservers>
	<server type="extension" name="Example Updates">http://example.com/extension.xml</server>
</updateservers>
```

You can have multiple servers within your `<updateservers>` tag.
If you have more than one update server, you can set a different priority for each. In that way you can control the order in which the update servers are checked. 

There are 2 types of server: "extension" and "collection" (described in detail below). So you could define your `<updateservers>` as

```xml
 <updateservers>
    <server type="collection">https://example.com/list.xml</server>
    <server type="extension" priority="2" name="My Extension's Updates">http://example.com/extension.xml</server>
 </updateservers>
```

## Installing Updates

Once an update has been inserted into the `#__updates` table it is visible to the administrator in the Update / Extensions section of the admin System Dashboard. 
When the administrator selects an extension and clicks Update Joomla will
- once again send an HTTP request to the URL of the update XML file
- parse the XML file and ensure that conditions for installing that version are still met
- send an HTTP request to the URL of the update zip file, storing the file received in the HTTP response in its /tmp directory
- proceed to install the new version from the downloaded zip file.

## Collection Server Type

This allows you to have a collection of different update XML files. You would use a "collection" type if, for example,

- Your extension is a package and you want to allow users to update the package components individually.
- You want to have different update XML files for different versions of Joomla.

The Joomla Language Pack uses a collection type. If you go to Update / Update Sites, you can see that the Update Site points to a URL like https://update.joomla.org/language/translationlist_4.xml which returns:

```xml
<extensionset name="Accredited Joomla! Translations" description="Accredited Joomla! Translations Updates">
    <extension name="Afrikaans" element="pkg_af-ZA" type="package" version="4.4.2.2" detailsurl="https://update.joomla.org/language/details4/af-ZA_details.xml"/>
    <extension name="Arabic Unitag" element="pkg_ar-AA" type="package" version="4.0.2.1" detailsurl="https://update.joomla.org/language/details4/ar-AA_details.xml"/>
    ...
</extensionset>
```

If you navigate to one of the detailsurl entries, then you'll see the "extension" type server XML for that language.

All definitions must be defined between `<extensionset>` tags in your update server XML collection. 

The `<extensionset>` tag has two optional parameters; name and description. 

For each extension that this collection references, a separate `<extension>` tag is required. The `<extension>` tag has the following parameters, all of which are required for updates to properly process:

- name – The name of the extension
- element – The untranslated extension name i.e. mod_custom
- type – The extension type (component, module, plugin, etc.)
- version – The latest version of the extension
- detailsurl – The URL of the XML file which contains that extension's individual update definitions

## Extension Server Type

The Extension Server type provides updates for an individual extension. 
All Collection Server types eventually point to an Extension Server type.

Here is an example Extension Server type - for the Joomla 4.4 release: 

```xml title="https://update.joomla.org/core/j4/default.xml"
<updates>
    <update>
        <name>Joomla! 4.4</name>
        <description>Joomla! 4.4 CMS</description>
        <element>joomla</element>
        <type>file</type>
        <version>4.4.4</version>
        <infourl title="Joomla 4.4.4 Release">
            https://www.joomla.org/announcements/release-news/5907-joomla-5-1-0-and-joomla-4-4-4-are-here.html
        </infourl>
        <downloads>
        <downloadurl type="full" format="zip">
            https://downloads.joomla.org/cms/joomla4/4-4-4/Joomla_4.4.4-Stable-Update_Package.zip
        </downloadurl>
        <downloadsource type="full" format="zip">
            https://github.com/joomla/joomla-cms/releases/download/4.4.4/Joomla_4.4.4-Stable-Update_Package.zip
        </downloadsource>
        <downloadsource type="full" format="zip">
            https://update.joomla.org/releases/4.4.4/Joomla_4.4.4-Stable-Update_Package.zip
        </downloadsource>
        </downloads>
        <tags>
            <tag>stable</tag>
        </tags>
        <supported_databases mysql="5.6" mariadb="10.1" postgresql="11.0"/>
        <php_minimum>7.2.5</php_minimum>
        <sha256>
            02158d2d9e388aa21718fcfc98ea6c0c0c306f130ce6b3ecd02ade7ced863e61
        </sha256>
        <sha384>
            0ecae1ebae84584433c7d60f7bd2bedb4bc55c73f89e9fc0416d9445dab6670a6b29bb3aef84e80177f28a0b9cac06eb
        </sha384>
        <sha512>
            f774f13e97d6d96ffe1fb5847088120734bbe14b3e49c6e9042e725c3b21a8960f89f034bd517157aa7bcb588a11271dc4dc646010530e08a9c90eeb82dfa377
        </sha512>
        <maintainer>Joomla! Production Department</maintainer>
        <maintainerurl>https://www.joomla.org</maintainerurl>
        <section>STS</section>
        <targetplatform name="joomla" version="4.[1234]"/>
    </update>
</updates>
```

You can have different `<update>` elements in this file and these must be within an enclosing `<updates>` element.
A separate <update> definition will be required for each version of your extension you release.

You might also have different updates relating to the same version of your extension, but for different `<targetplatform>` Joomla versions.

The following section describes the elements of a single update entity.
- **name** – The name of the extension, this name will appear in the Name column of the Extension Manager's Update view (required)
- **description** – A short description of the extension (optional) — if you choose to use `<![CDATA[]]>`, double-quotes will break the HTML formatting. Use single quotes with your HTML entities.
- **element** – The installed name of the extension (required). For plugins, this needs to be same as plugin attribute value for main file in plugin manifest. For <filename plugin="pluginname">pluginname.php</filename>, element value should be **pluginname**.
- **type** – The type of extension (component, module, plugin, etc.) (required)
- **folder** – Specific to plugins, this tag describes the type of plugin being updated (content, system, etc.) (required for plugins)
- **client** – The client of the extension. Required for modules and templates. Possible values at this time are "site" or "administrator". Warning! Plugins and front-end modules are automatically installed with a client of site, but you will need to specify the client in an update or it will default to administrator and then found update would not be shown because it would not match any extension. Components are automatically installed with a client of administrator, which is currently the default.
- **version** – The version of the release (required)
- **infourl** – A URL to point users to containing information about the update (optional) 
- **downloads** – The section which lists all download locations
    - **downloadurl** – The URL to download the extension from; the <downloadurl> tag has two required parameters:
        - **type** – The type of package (full or upgrade)
        - **format** – The format of the package (zip, tar, etc.)
    - **downloadsource** – Optional. Alternative URL to download the extension from when the connection to <downloadurl> fails. Multiple <downloadsource> tags are allowed. The <downloadsource> tag has two required parameters:
        - **type** – The type of package (full or upgrade)
        - **format** – The format of the package (zip, tar, etc.)

        **NB** – there must be no newline before or after the URL; it needs to all be on one line or you will get Error connecting to the server: malformed when the update is run.
- **changelogurl** - A link to an xml file holding the changelog. Joomla 4.0 and later will allow you to show a button for the changelog in the extension updater page. More details in how to use it can be found below.
- **tags** – A list of tags relevant to this version. Joomla! uses this to determine the stability level of the update. The valid tags are:
    - **dev**: Development versions, very unstable and pre-alpha (e.g. nightly builds)
    - **alpha**: Alpha quality software (features not implemented, show-stopper bugs)
    - **beta**: Beta quality software (all features implemented, show-stopper bugs possible, minor bugs almost certain)
    - **rc**: Release Candidate quality software (no show-stopper bugs, minor bugs may still be present)
    - **stable**: Production quality software All other tags are currently ignored. 
    
    If you provide more than one tag containing one of the aforementioned stability keywords only the LAST tag will be taken into account. If you do not provide any tags Joomla! will assume it is a stable version.

- **maintainer** – The name of the extension maintainer (similar to the `<author>` tag in a manifest) (optional)
- **maintainerurl** – The website of the extension maintainer (similar to the `<authorUrl>` tag in a manifest) (optional)
- **section** – Optional (unknown use)
- **targetplatform** – A tag to define platform requirements with the following elementsː
    - **name** – The name of the platform dependency; it should ONLY be "joomla"
    - **version** – The version of Joomla! the extension supports, like a regular expression (mandatory). For example `version="4.[1234]"` will run on Joomla 4.1 to 4.4, but not on any Joomla 3 or Joomla 5 instance, `version="4.(2|4)"` will run only on 4.2 or 4.4.
    - **min_dev_level** and **max_dev_level** – These attributes allow you to select a target platform based on the developer level ("z" in x.y.z). They are optional. You can specify either one or both. If omitted, all developer levels are matched. For example, the following matches versions 4.0.0 and 4.0.1. <targetplatform name="joomla" version="4.0" min_dev_level="0" max_dev_level="1"/>

- **php_minimum** – a minimum supported PHP version can be supplied in the update stream. If the server does not meet the minimum, a message is displayed to the user advising that an update is available but cannot be installed due to unsupported requirements.
- **supported_databases** – a minimum supported databases + version check can be supplied in the update stream. When the server does not meet the minimum, a message is displayed to the user advising that an update is available but cannot be installed due to unsupported requirements. For example:  `<supported_databases mysql="5.5.3" mariadb="10.1" postgresql="9.2" mssql="10.50.1600.1" />`
- **sha256**, **sha384**, **sha512** – Optional. The checksum of the downloadable extension file, in these various hash formats. The update will stop if a provided checksum doesn't match. You can find online utilities for generating these checksums.

The values of **element**, **type** and **folder** should match those in the table `#_extensions`, and the client_id there should match the **client** (0 for site, 1 for administrator).

**Important for plugins**: Plugins have to include `<folder>` and `<client>` elements to work properly 

