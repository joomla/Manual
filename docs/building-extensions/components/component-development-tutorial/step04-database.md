---
sidebar_position: 4
title: Step 4 Using the Database
---

## Introduction

In this step we change to using the database to hold our landmarks,
but keep the same functionality.

The code is available at [com_example step 4](https://github.com/joomla/manual-examples/tree/main/component-tutorial/step04_database).

## Approach

We'll create a table in the database to hold our landmarks,
and insert 2 records into the table.

We'll want to remove all hard-coding of the existing 2 landmarks from our component.
This means we'll need to change how the menuitem is defined in the administrator,
and how the URL is interpreted in the site Model.

## Learning Points

SQL install / uninstall / updates 

The SQL form field

Using the Table class

## Database Operations

We add a [SQL section](../../install-update/installation/manifest.md#sql) 
to the manifest file to tell Joomla what SQL files to run 
whenever com_example is installed, upgraded or uninstalled. 

It's usual to store these SQL files in a sql subfolder on the administrator side,
so we need to ensure that this folder is read whenever Joomla installs the component,
by including `<folder>sql</folder>` within the `<administration> <files>` section.
During the install process this folder will be copied to 
administrator/components/com_example/sql/.

### Component Installation

When a component is first installed Joomla processes the `<install>` section within the manifest file:

```php title="com_example/example.xml"
<install>
    <sql>
        <file driver="mysql" charset="utf8">sql/install.mysql.sql</file>
    </sql>
</install>
```

and Joomla will expect to find the file sql/install.mysql.sql
under the administrator component folder administrator/components/com_example/.
(During the installation process the folders and files are copied 
to their usual places in a Joomla instance, before the SQL processing is performed.)

In our SQL file we create our table and insert 2 elements into it:

```php title="com_example/administrator/components/com_example/sql/install.mysql.sql"
CREATE TABLE IF NOT EXISTS `#__example_landmarks` (
    `id`        INT(11)     NOT NULL AUTO_INCREMENT,
    `title`     VARCHAR(40) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `#__example_landmarks` (`title`) VALUES
('The Eiffel Tower'),
('The Giant\'s Causeway');
```

Apart from the name of the table this is just standard [MySQL](https://www.mysql.com/) statements. 

When you install Joomla it proposes creating its database tables
with a prefix as an additional security measure. 
In your code, if you prefix a table name with `#__` 
then Joomla will substitute this with the site database prefix 
(found in the Global Configuration / configuration.php)
to produce the actual database table name. 

We've called our table "#__example_landmarks" with the name of our component com_example included at the start.
Obviously tables in a database must have unique names, 
so including the component name in this way significantly reduces the risk of a clash with another Joomla extension. 

In our table we have 2 columns:

- id - which auto-increments, and gives us a primary key for the table, and,

- title - which is the name of the landmark.

Joomla has several standard names which it gives to columns which serve a similar purpose.
You can find these standard names at [Reserved Column Names and Aliases](../../../general-concepts/table/advanced-table.md#reserved-column-names-and-aliases).

### Component Uninstall

If com_example is uninstalled then it should tidy up the database by removing its table.

The actions to perform are specified in the manifest file:

```php title="com_example/example.xml"
<uninstall>
    <sql>
        <file driver="mysql" charset="utf8">sql/uninstall.mysql.sql</file>
    </sql>
</uninstall>
```

and in the component uninstall SQL file:

```php title="com_example/administrator/components/com_example/sql/uninstall.mysql.sql"
DROP TABLE IF EXISTS `#__example_landmarks`;
```

### Component Upgrade

If you install a new version of a component which is already installed,
then the `<install>` section is ignored, 
and instead the section of the manifest file which is processed is:

```php title="com_example/example.xml"
<update>
    <schemas>
        <schemapath type="mysql">sql/updates/mysql</schemapath>
    </schemas>
</update>
```

This folder (sql/updates/mysql/) can contain a number of files,
each specifying the changes to the database for each version of the component.

We want the same database operations as in the new install case to be performed,
so we specify them in a file:

```php title="com_example/administrator/components/com_example/sql/updates/mysql/0.4.0.sql"
CREATE TABLE IF NOT EXISTS `#__example_landmarks` (
    `id`        INT(11)     NOT NULL AUTO_INCREMENT,
    `title`     VARCHAR(40) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `#__example_landmarks` (`title`) VALUES
('The Eiffel Tower'),
('The Giant\'s Causeway');
```

In practice, an administrator may skip some versions of an extension,
so this may result in a number of SQL update files being run,
including the updates for the versions which the administrator skipped. 

It's important to understand how Joomla handles this,
and you should read the documentation for the manifest file [SQL section](../../install-update/installation/manifest.md#sql-schema-numbering).

## Menuitem Select

Because our data is in the database we want to change how the landmark
is selected within the menuitem,
which is in the default.xml file in the same folder as the tmpl file.
Joomla provides a [sql standard form field](../../../general-concepts/forms-fields/standard-fields/sql.md)
which allows us to select entries from a database table,
and we use this in place of the hard-coded list field. 

```xml title="components/com_example/tmpl/landmark/default.xml"
    <field
        name="id"
        type="sql"
        label="COM_EXAMPLE_LANDMARK_FIELD_SELECT_TITLE"
        description="COM_EXAMPLE_LANDMARK_FIELD_SELECT_DESC"
        query="SELECT id, title FROM #__example_landmarks"
        key_field="id"
        value_field="title"
        >
```

## Site changes

On our site front-end we'll still have to interpret the same URL
(with the HTTP parameter "id=" identifying the id of the landmark).
However, now we must use the database to find the associated title.

Joomla provides 2 ways of accessing the database:

1. Using the [Table](../../../general-concepts/table/index.md) class to perform CRUD operations - 
these generally act upon a single record (although you can use it to delete multiple records),

2. Using the [Database](../../../general-concepts/database/index.md) object
to perform more general SQL statements.

Here we will use the Table approach. 
This means that we will define a class which represents our landmark table,
and which will allow us to find and load the correct record, based on the id.

### Defining the LandmarkTable class

We define our LandmarkTable class, which inherits from the standard Joomla Table class.
This is going to be used in both the administrator back-end and site front-end,
and we only need to define it once,
so we follow the Joomla convention and store it within the administrator area.

```php title="com_example/administrator/components/com_example/src/Table/LandmarkTable.php"
<?php
namespace My\Component\Example\Administrator\Table;
 
\defined('_JEXEC') or die;

use Joomla\CMS\Table\Table;
use Joomla\Database\DatabaseInterface;

class LandmarkTable extends Table
{
    public function __construct(DatabaseInterface $db)
    {
        parent::__construct('#__example_landmarks', 'id', $db);
    }
}
```

As this is the first time we've included a class file on the administrator side,
we'll need to include a `<folder>src</folder>` element within the 
`<administration> <files>` section in the manifest file. 

Our table class is actually instantiated by the MVCFactory instance,
as described in [MVC Factory Overview](../mvc/mvc-factory.md).
When it creates it, it passes the DatabaseDriver object in
(which implements the DatabaseInterface),
and to use the Table class we must call its constructor passing:

- the name of the database table,

- the primary field of the database table, and

- the DatabaseDriver object.

(The signature of the constructor method of LandmarkTable
is different from the constructor of its parent Table class).

### Using the LandmarkTable class

We use our LandmarkTable in the Model, where the getItem method now needs to be:

```php title="components/com_example/src/Model/LandmarkModel.php"
function getItem($pk = null)
{
    $app = Factory::getApplication();
    $input = $app->getInput();
    $id = $input->get('id', 0, 'INT');
    
  // highlight-start
    $table = $this->getTable('Landmark', 'Administrator');
    $result = $table->load($id);
    if ($result) {
        return $table->title;
    } else {
        throw new \UnexpectedValueException("id out of range");
    }
  // highlight-end 
}
```

```php
$table = $this->getTable('Landmark', 'Administrator');
```

This line results in our LandmarkTable being instantiated. 
It will be created by the MVCFactory instance, based on the passed parameters:

- 'Landmark' will result in the classname of 'LandmarkTable'

- 'Administrator' means that the administrator namespace prefix 
(\My\Component\Example\Administrator) will be used to form the class FQN.
(The default is 'Administrator', so you can omit this parameter).

Based on the FQN of \My\Component\Example\Administrator\Table\LandmarkTable,
Joomla will expect to find this class in 
administrator/components/com_example/src/Table/LandmarkTable.php.

```php
$result = $table->load($id);
```

This will 

- perform a database query to load the landmark record with primary key equal to the passed `$id`.
We told the Table instance in its constructor that the primary key was the 'id' field,
so this loads the record with id = `$id`.

- set up properties of the `$table` instance, matching the names of the columns of the database table.
So for us it will set up `$table->id` and `$table->title`.

- return `true` if a record was found, or `false` otherwise.

If `$result` is false then an invalid id value was given, so we raise the same exception.

The underlying Table class code may raise other types of exceptions,
but we're not interested in capturing and handling them, 
so they'll just pass through to the default Joomla exception handler,
which will display the exception on the error page, as it did for our UnexpectedValueException.

## Installing com_example

There have been a number of changes to the manifest file in this step, so here's the updated file:

```xml title="com_example/example.xml"
<?xml version="1.0" encoding="UTF-8"?>
<extension type="component" method="upgrade">

    <name>COM_EXAMPLE_TITLE</name>
    <creationDate>today</creationDate>
    <author>me</author>
    <license>GPL v3</license>
  <!-- highlight-next-line -->
    <version>0.4.0</version>
    <description>COM_EXAMPLE_DESCRIPTION</description>

    <element>com_example</element>

    <namespace path="src">My\Component\Example</namespace>

    <files folder="components/com_example">
        <folder>src</folder>
        <folder>tmpl</folder>
    </files>

    <administration>
        <files folder="administrator/components/com_example">
            <folder>services</folder>
          <!-- highlight-start -->
            <folder>sql</folder>
            <folder>src</folder>
          <!-- highlight-end -->
        </files>
        <languages folder="administrator/components/com_example/language">
            <language tag="en-GB">en-GB/com_example.ini</language>
            <language tag="en-GB">en-GB/com_example.sys.ini</language>
        </languages>
    </administration>

  <!-- highlight-start -->
    <install>
        <sql>
            <file driver="mysql" charset="utf8">sql/install.mysql.sql</file>
        </sql>
    </install>

    <uninstall>
        <sql>
            <file driver="mysql" charset="utf8">sql/uninstall.mysql.sql</file>
        </sql>
    </uninstall>
    
    <update>
        <schemas>
            <schemapath type="mysql">sql/updates/mysql</schemapath>
        </schemas>
    </update>
  <!-- highlight-end -->

</extension>
```

You should install the new version and confirm that it works similar to before.

## Exploring your installation

### Landmark Table

You should now see the `#__example_landmarks` table in the database, with its 2 entries.

Try adding an extra row and confirm that the functionality works as expected.

### Schemas Table

Examine the `#__schemas` table in the database. 
You should see a record with 
extension_id matching the id of com_example in the `#__extensions` table, and
version_id set to '0.4.0'.

This is now the baseline for SQL updates for com_example;
any SQL update files will have to have a filename numerically greater than '0.4.0' to be applied.

### Autoload Cache

If you check the file administrator/cache/autoload_psr4.php you should now see the line

```php
'My\\Component\\Example\\Administrator\\' => [JPATH_ADMINISTRATOR . '/components/com_example/src'],
```

This is because we now have a class (namely, LandmarkTable) on the administrator side.
This cache file is refreshed any time that an extension is installed. 

## Challenge

Can you change your site Model, View and tmpl source files
so that the id field is displayed as well as the title field?

## Footnotes

### Database Type

The code above is designed for MySQL database,
but you can easily adapt it to run on another database such as PostgreSQL.

Joomla also runs on MariaDB, which (at time of writing) has identical statements to those of MySQL above.

Also the CREATE TABLE statement above doesn't specify the Engine, character set or collation,
so these will be picked up from your database defaults. 
Recommended values would be:

- ENGINE = InnoDB

- DEFAULT CHARSET = utf8mb4 

- DEFAULT COLLATE = utf8mb4_unicode_ci

### Capitalisation 

In this step we've used:

```php
$table = $this->getTable('Landmark', 'Administrator');
```

whereas in similar calls to get other MVC classes we've used:

```php
$view = $this->getView('landmark', 'html');
$model = $this->getModel('landmark');
```

In these calls, it doesn't matter whether you capitalise the first character or not.
The MVCFactory calls `ucfirst` on the parameters passed in 
when it forms the FQN of the class to find. 
And then the class is found using the rules described in 
[Finding Class Files with PSR4](../../../general-concepts//namespaces/finding-classes-with-psr4.md).