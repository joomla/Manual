---
sidebar_position: 3
title: Insert Data into the Database
---

Insert Data into the Database
=============================

## The Query

Joomla's database querying has changed since the new Joomla Framework was introduced "query chaining" 
is now the recommended method for building database queries (although string queries are still supported).

Query chaining refers to a method of connecting a number of methods, one after the other, with each method
returning an object that can support the next method, improving readability and simplifying code.

To obtain a new instance of the `DatabaseQuery` class we use the `DatabaseInterface` `createQuery` method:

```php
use Joomla\CMS\Factory;

// When used in the component's Model
$db = $this->getDatabase();

// When used in other places
$db = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface::class);

$query = $db->createQuery();
```

:::warning[Developer Note]
  Do **NOT** use the following Joomla 3 method anymore because it is deprecated:  
  ~~$db = Factory::getDbo();~~
:::

:::note[Developer Note]
  Do **NOT** use the `DatabaseDriver::getQuery(true)` method to get a new query object anymore.
  Use the `DatabaseInterface::createQuery()` method instead.
:::

To query our data source we can call a number of `DatabaseQuery` methods; these methods encapsulate the data
source's query language (in most cases SQL), hiding query-specific syntax from the developer and increasing
the portability of the developer's source code.

Some of the more frequently used methods include; select, from, join, where and order. There are also methods
such as insert, update and delete for modifying records in the data store. By chaining these and other method
calls, you can create almost any query against your data store without compromising portability of your code.

## Inserting a Record

### Using SQL via the Query Object

The `DatabaseQuery` class provides a number of methods for building insert queries,
the most common being insert, columns and values.

```php
// Define the variables passed to the bind function.
$user_id       = 1001;
$profile_key   = 'custom.message';
$profile_value = 'Inserting a record using insert()';
$ordering      = 1;

// Get a db connection.
$db = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface::class);

// Create a new query object.
$query = $db->createQuery();

// Insert columns.
$columns = array('user_id', 'profile_key', 'profile_value', 'ordering');

// Prepare the insert query.
$query
    ->insert($db->quoteName('#__user_profiles'))
    ->columns($db->quoteName($columns))
    ->values(':user_id, :profile_key, :profile_value, :ordering');

// Bind values
$query
    ->bind(':user_id', $user_id, \Joomla\Database\ParameterType::INTEGER)
    ->bind(':profile_key', $profile_key)
    ->bind(':profile_value', $profile_value)
    ->bind(':ordering', $ordering, \Joomla\Database\ParameterType::INTEGER);

// Set the query using our newly populated query object and execute it.
$db->setQuery($query);

$db->execute();
```

### Using an Object

The `DatabaseDriver` class also provides a convenient method for saving an object directly to the database
allowing us to add a record to a table without writing a single line of SQL.

```php
// Create and populate an object.
$profile = new stdClass();
$profile->user_id = 1001;
$profile->profile_key='custom.message';
$profile->profile_value='Inserting a record using insertObject()';
$profile->ordering=1;

// Insert the object into the user profile table.
$result = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface::class)->insertObject('#__user_profiles', $profile);
```

Notice here that we do not need to escape the table name; the `insertObject` method does this for us.

The `insertObject` method will throw a error if there is a problem inserting the record into the database table.

If you are providing a unique primary key value (as in the example above), it is highly recommended that
you select from the table by that column value before attempting an insert.

If you are simply inserting the next row in your table (i.e. the database generates a primary key value),
you can specify the primary key column-name as the third parameter of the `insertObject()` method and
the method will update the object with the newly generated primary key value.

For example, given the following statement:

```php
$result = $dbconnect->insertObject('#__my_table', $object, 'primary_key');
```

After execution, `$object->primary_key` will be updated with the newly inserted row's primary key value.

:::note[Developer Note]
  Set `$object->primary_key` to null or 0 (zero) before inserting.
:::
