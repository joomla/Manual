---
sidebar_position: 2
title: Create a Joomla Library
---

Creating a Joomla Library
======================================

In this guide, we will create a Joomla library to use in Joomla.

## Folder Structure

The folder structure for a Joomla library is as follows:

```
libraries/
    mylibrary/
        Service/
            MyService.php
        mylibrary.xml
```

### Key Sections of the Library

- `Service/MyService.php`: This is the main file of the library. It contains the class definition and the functions that the library will provide.
- `mylibrary.xml`: This file contains the metadata for the library.
- `mylibrary.php`: This file is the entry point for the library.
- `Service/`: This folder contains the service classes for the library.

### Extension manifest file

```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="library" version="5.0" method="upgrade">
    <name>Joomla 5 Example Library</name>
    <libraryname>JoomlaExampleLibrary</libraryname>
    <author>Author Name</author>
    <creationDate>2024-09-08</creationDate>
    <license>GNU General Public License version 2 or later</license>
    <version>1.0.0</version>
    <description>Showcase on how to create a Joomla 5 library to reuse code.</description>
    <files>
        <folder>Service</folder>
        <filename>joomlaexamplelibrary.xml</filename>
    </files>
</extension>
```

### Service Class

The service class is where you define the functions that the library will provide. Here is an example of a service class:

```php
<?php
namespace YourLibraryNamespace;

class YourLibrary
{
    public static function helloWorld()
    {
        return "Hello, World!";
    }
}
```

### Packaging the Library for Installation

Once you have created the library, you need to package it for installation. You can do this by creating a zip file with the following structure:

```
yourlibraryname.zip
    ├── yourlibraryname.xml
    └── Service/
        └── YourLibrary.php
```

With the zip file created, you can install the library using the Joomla extension manager in the Administrator backend.

## Installation

1. Go to the Joomla Administrator backend.
2. Go to Extensions > Manage > Install.
3. Upload the zip file containing the library.

## Usage

To use the library in your Joomla extension, you need to include the library in your code. Here is an example of how to use the library:

```php
<?php
use YourLibraryNamespace\YourLibrary;

$service = new YourLibrary();
echo $service->helloWorld();
```