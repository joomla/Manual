---
title: Installing a custom script
sidebar_position: 3
---

# Install

:::danger[Developer Notice]

Creating a script which directly includes loads and boots the CMS framework is not recommended and only needed in
rare cases. Depending on the usecase you should create a [console plugin](https://docs.joomla.org/J4.x:Writing_A_CLI_Application)
and extend the Joomla! console application. If you need to create a simple entry point for webrequests write an
[ajax plugin](https://docs.joomla.org/Using_Joomla_Ajax_Interface).

:::

:::note[TODO]

Update the link to docs.joomla.org in the "Developer notice" above when an example has been added to this manual.

:::

## Installing your Custom Script
If you have access to the file system of your web application then you can obviously just copy your script into the folder of your choice. 

If instead you want to install your script in the usual way, then you must use "file" as your extension type in the manifest file, for example. 

```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="file" version="5.0" method="upgrade">
    <name>Custom Script</name>
    <version>1.0</version>
    <description>Script to count the number of articles in the database</description>
    <fileset>
        <files target="cli">
            <filename>myscript.php</filename>
        </files>
    </fileset>
</extension>
```

Installing this will result in the script "myscript.php" being put into the Joomla `cli` directory. 