---
title: Basic Table Functionality
sidebar_position: 1
---

This page covers basic functionality of the Joomla Table class.

The API definitions are at [Joomla Table APIs](cms-api://classes/Joomla-CMS-Table-Table.html).

Introduction
============

The Joomla Table class (Joomla\CMS\Table\Table in libraries/src/Table/Table.php) 
provides a framework which enables you to do CRUD operations (and more) on database tables. 

The usual case is that you are developing a component with its own database table,
and you use the Table class to implement administrator CRUD operations for data in your database table. 

The Joomla Table class is an abstract class, so you must create your own table class (for your component's database table) which extends the Joomla Table class.

## Instantiating your table class

If you're developing a component with its own database table or tables, 
then you should use the [Joomla MVC pattern](../../building-extensions/components/mvc/index.md),
and use the MVC Factory for creating controller, view, model and table instances. 

Then within your model you can use 

```php
$table = $this->getTable();           // if your Table class matches the view= parameter in the HTTP request
$table = $this->getTable('example');  // to get the ExampleTable class
```

:::note[TODO]
  Add an appropriate link to the updated component development tutorial when it's written.
:::

If you're developing a module or plugin then you don't have access to the MVC Factory, 
and the easiest way is to instantiate it directly, passing the database object:

```php
$table = new ExampleTable($dbo);
```

See the sample module code at the end of this page for an example.

Your table class defines 2 important items of data:

1. The name of your database table, in the format "#__example". Joomla adds the prefix specified for the database

2. The primary key (one or more fields) of the database table

## Basic Table functions

There are several basic functions within the Table class.
These are described below for a database table with 2 fields:

- `id` - the primary key
- `title` - a descriptive text field

### load()

The `load()` method reads a record from the database and makes the fields of the record available as properties of the table object.

```php
$id = 1;   // set the id field to some value (usually based on an HTTP GET parameter)
$result = $table->load($id);  // loads the record with id=1
if ($result)     // $result is true/false depending on whether the record was loaded successfully or not
{
    echo $table->title;    // outputs the title associated with the currently loaded record
}
```

### bind()

Use `bind($data)` when you have `$data` which you want to set into the record. 
The `$data` should be in the form of an associative array. 

```php
$id = 1;
$table->load($id);
$data = array("title" => "first");
$table->bind($data);
echo $table->title; // outputs "first"
```

The `bind` call has the effect of replacing the properties of the table object:

- prior to `bind` call the `$table->title` property would have whatever was read from the database.
- after the `bind` call the `$table->title` property has whatever is passed in the `$data` array for element "title".

### check()

Use `check()` to perform any validation on your record before you save it to the database.
The Joomla Table class doesn't provide any default validation - it's up to you to specify what you want.

### store()

Use `store()` to write the database record from the table class instance. 
Joomla maps the properties of the instance object to fields of the database record, and then stores the record.

The Joomla default `store()` method examines the properties of the object relating to the primary key of the database table

- if the primary key is not set (or id = 0 in the case of a numeric id primary key) then it issues SQL INSERT

- if the primary key is set then it issues SQL UPDATE

### save()

The `save()` method is really just a concatenation of `bind()`, `check()` and `store()`.

### delete()

You can use the `delete()` method with or without a parameter:

- `delete()` - deletes the record which was previously read using a `load()` call

- `delete($key)` - deletes the record whose primary key matches `$key`.

## CRUD Operations

To perform CRUD operations you string together calls to the above methods

- READ

  - `load($key)` - passing the value of the primary key
  
- UPDATE

  - `load($key)`
  - `bind($data)` - bind the new data
  - `check()` - perform validation
  - `store()` - issue the SQL UPDATE
  
- CREATE

  - `bind($data)` - bind the data (a previous `load` isn't appropriate here)
  - `check()` - perform validation
  - `store()` - issue the SQL INSERT
  
- DELETE

  - `load($key)`
  - `delete()`
  - or instead you can just do `delete($key)`

## Sample Module

This section contains the code for a simple Joomla module which you can install and run to demonstrate use of the basic Table functionality. 
If you are unsure about development and installing a Joomla module 
then [Module Development Tutorial](../../building-extensions/modules/module-development-tutorial/index.md) should help. 

### Module Code

From the Joomla Manual Examples repository download the [mod_table_example module code](https://github.com/joomla/manual-examples/tree/main/module-example-table/mod_table_example).

### Module Installation

Zip up the mod_table_example directory to create mod_table_example.zip.

Within your Joomla administrator go to Install Extensions and via the Upload Package File tab 
select this zip file to install this sample mod_table_example module.

Make this module visible by editing it (click on it within the Modules page) then:

- making its status Published
- selecting a position on the page for it to be shown
- on the menu assignment tab specify the pages where it should appear

### Using the module

When you navigate to your site page where the module is displayed, then the module code will run.

The module contains functionality relating to this page (in the function `doBasicTableOperations`),
as well as the function `doAdvancedTableOperations` which relates to the next section.

The basic functionality demonstrates reading a record from the modules table then writing an update back to that record in the database. 

The modules table contains the module instances which are displayed on the Joomla site or administrator,
and you'll find it useful to view the table through phpmyadmin, for example. 

Some notes on the functionality of this module:

- The module record is loaded from the database record and the title of the module is output
- The module params is json decoded into an associative array and the header tag is then set to 'h2' 
(which controls how the header title is displayed in the module on the web page)
- The new note to be written to the module record is read from the `demonote` parameter in the URL, 
so you can set this yourself by adding `?demonote=something` in the URL
- The new note and params are written back to the database record using `bind()` and `store()` commands.
- The params will be converted back to a json string because of the line `protected $_jsonEncode = array('params');` in our table class
- The `check()` function in our table class appends a string " added via module" to the note.

You can verify the changes to the database record by viewing the module record within the admin back-end or by using phpmyadmin.

:::warning
  This sample module is purely for demonstrating some of the functionality of the Table class.
  In general you should not alter Joomla core tables in this way, as you could corrupt the integrity of the Joomla database. 
:::