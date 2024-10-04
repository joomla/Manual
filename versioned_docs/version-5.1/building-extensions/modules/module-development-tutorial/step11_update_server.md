---
sidebar_position: 11
title: Step 11 Update Server
---

Step 11 Update Server
=====================

In this step we provide an update server for mod_hello. You should first read about [Update Servers](../../install-update/update-server.md).

There is no associated github code for this step as it falls outside the extension code which you install. 

To implement a test update server locally you have to choose a folder which is within the set of folders served by your web server.

For example, if have set up a web server on your own machine using WAMP or XAMPP then you can just create a folder "updateserver" under your Joomla instance.

In this tutorial step we're going to assume that your Joomla instance is called "joom"; you'll have to change this to whatever you use.

## Updating your Manifest File

To associate mod_hello with an update server you need to add the following lines into the manifest file:

```xml
<updateservers>
    <!-- Change the URL below to match that of your own update development environment -->
    <server type="extension" name="Hello Module Updates">http://localhost/joom/updateserver/updates.xml</server>
</updateservers>
```

Your updated manifest file is thus:

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="UTF-8"?>
<extension type="module" client="site" method="upgrade">
    <name>MOD_HELLO_NAME</name>
    <!-- highlight-next=line -->
    <version>1.0.11</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <description>MOD_HELLO_DESCRIPTION</description>
    <namespace path="src">My\Module\Hello</namespace>
    <files>
        <folder module="mod_hello">services</folder>
        <folder>src</folder>
        <folder>tmpl</folder>
        <folder>language</folder>
    </files>
    <scriptfile>script.php</scriptfile>
    <media destination="mod_hello" folder="media">
        <filename>joomla.asset.json</filename>
        <folder>js</folder>
    </media>
    <config>
        <fields name="params">
            <fieldset name="basic">
                <field
                    name="header"
                    type="list"
                    label="MOD_HELLO_HEADER_LEVEL"
                    >
                    <option value="h3">MOD_HELLO_HEADER_LEVEL_3</option>
                    <option value="h4">MOD_HELLO_HEADER_LEVEL_4</option>
                    <option value="h5">MOD_HELLO_HEADER_LEVEL_5</option>
                    <option value="h6">MOD_HELLO_HEADER_LEVEL_6</option>
                </field>
            </fieldset>
        </fields>
    </config>
    <!-- highlight-start -->
    <updateservers>
        <!-- Change the URL below to match that of your own update development environment -->
        <server type="extension" name="Hello Module Updates">http://localhost/joom/updateserver/updates.xml</server>
    </updateservers>
    <!-- highlight-end -->
</extension>
```

Now go ahead and install this version of mod_hello.

## Update Server Files

First of all, create a new version of mod_hello, just by changing the version number in the manifest file and zipping up the folder.
The version number needs to be greater than 1.0.11; you could use 1.1.0, for example.

Put the zipped-up new version into your joom/updateserver folder, calling it mod_hello-v1-1-0.zip as an example.

Now you need to create the file updates.xml (matching the `<server>` element in your manifest file):

```xml title="joom/updateserver/updates.xml"
<updates>
    <update>
        <name>Hello Module</name>
        <description>Joomla Module Tutorial</description>
        <element>mod_hello</element>
        <type>module</type>
        <version>1.1.0</version>
        <client>site</client>
        <downloads>
            <downloadurl type="full" format="zip">http://localhost/joom/updateserver/mod_hello-v1-1-0.zip</downloadurl>
        </downloads>
        <infourl>http://localhost/joom/updateserver/mod_hello110.html</infourl>
        <targetplatform name="joomla" version="((4\.4)|(5\.(0|1|2|3|4|5|6|7|8|9)))" />
    </update>
</updates>
```

This tells Joomla that there's a version 1.1.0 available at that download link, and that it will work on Joomla 4.4 or any Joomla 5.x platform.

The xml above includes a link `<infourl>` so you should create a file joom/updateserver/mod_hello110.html with some html content describing this version.

## Testing the Update Server

In the administrator System Dashboard go to Update / Update Sites. 
You should see an entry for "Hello Module Updates" with a link to your updates.xml file which you can follow.

In the administrator System Dashboard go to Update / Extensions, and click on the button Check For Updates.
You should see an entry for "Hello Module" with the currently installed version and the available version. 
It should also have a link to your `<infourl>` html file which you can click.

You can select the "Hello Module" and click on Update to install that version.

In the administrator System Dashboard go to Manage / Extensions and confirm that mod_hello has been updated to the latest version. 

You can experiment further using multiple versions and multiple `<update>` tags; Joomla will only ever offer one entry in the Extensions Update list, relating to the highest version which matches the version restrictions (eg `<targetplatform>`, `<php_minimum>`).

You can also experiment with other tags of the [update server xml](../../install-update/update-server.md#extension-server-type). 
