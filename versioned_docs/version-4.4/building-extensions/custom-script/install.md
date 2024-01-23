---
title: Installing a custom script
sidebar_position: 3
---
# Installing your Custom Script
If you have access to the file system of your web application then you can obviously just copy your script into the folder of your choice. 

If instead you want to install your script in the usual way, then you must use "file" as your extension type in the manifest file, for example. 
```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="file" version="4.4" method="upgrade">
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