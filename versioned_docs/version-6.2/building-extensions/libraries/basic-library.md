---
sidebar_position: 2
title: Create a Joomla Library
---

Creating a Joomla Library
======================================

A Joomla library is a reusable set of classes or functions that can be shared across multiple extensions. Libraries help in organizing and reusing code, making development more efficient and maintainable.

In this guide, we will create a Joomla library and learn how to use it in Joomla projects.

## Folder Structure

The folder structure for a Joomla library is as follows:

```
libraries/
    yourlibraryname/
        src/
            YourLibrary.php
        yourlibraryname.xml
```

### Key Sections of the Library

- `src/YourLibrary.php`: This is the main file of the library. It contains the class definition and the functions that the library will provide.
- `yourlibraryname.xml`: This file contains the metadata for the library.

### Extension manifest file

```xml title="libraries/yourlibraryname/yourlibraryname.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="library" method="upgrade">
    <name>Joomla 5 Example Library</name>
    <libraryname>JoomlaExampleLibrary</libraryname>
    <author>Author Name</author>
    <creationDate>2024-09-08</creationDate>
    <license>GNU General Public License version 2 or later</license>
    <version>1.0.0</version>
    <description>Showcase on how to create a Joomla 5 library to reuse code.</description>
    <namespace path="src">VendorName\LibraryName</namespace>
    <files>
        <folder>src</folder>
    </files>
</extension>
```

### Library Class

Inside this class is where you will define the functions that the library will provide. Here is an example of a simple library class:

```php title="libraries/yourlibraryname/src/YourLibrary.php"
<?php
namespace VendorName\LibraryName;

class YourLibrary
{
    public static function helloWorld()
    {
        return "Hello, World!";
    }
    
     public function greet($name)
    {
        return "Hello, " . $name . "!";
    }

}
```

### Packaging the Library for Installation

Once you have created the library, you need to package it for installation. You can do this by creating a zip file with the following structure:

```
yourlibraryname.zip
    ├── yourlibraryname.xml
    └── src/
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
use VendorName\LibraryName\YourLibrary;

$library = new YourLibrary();
echo $library->greet("John");

echo YourLibrary::helloWorld();
```