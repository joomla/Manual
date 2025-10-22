---
sidebar_position: 4
title: Update Data in the Database
---

Updating a Record
=================

## Using SQL

The `DatabaseQuery` class also provides methods for building update queries, in particular
update and set. We also reuse another method which we used when creating select statements, the where method.

```php
$db = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface:class);

$query = $db->createQuery();

// Fields to update.
$fields = array(
$db->quoteName('profile_value') . ' = :profile_value',
$db->quoteName('ordering') . ' = :ordering'
);

// Conditions for which records should be updated.
$conditions = array(
$db->quoteName('user_id') . ' = :user_id',
$db->quoteName('profile_key') . ' = :profile_key'
);

$query->update($db->quoteName('#__user_profiles'))->set($fields)->where($conditions);

$query
->bind(':profile_value', 'Updating custom message for user 1001.')
->bind(':ordering', 2, Joomla\Database\ParameterType::INTEGER)
->bind(':user_id', 42, Joomla\Database\ParameterType::INTEGER)   
->bind(':profile_key', 'custom.message');

$db->setQuery($query);

$result = $db->execute();
```

## Using an Object

Like `insertObject`, the `DatabaseDriver` class provides a convenience method for updating an object.

Below we will update our custom table with new values using an existing id primary key:

```php
// Create an object for the record we are going to update.
$object = new stdClass();

// Must be a valid primary key value.
$object->id = 1;
$object->title = 'My Custom Record';
$object->description = 'A custom record being updated in the database.';

// Update their details in the users table using id as the primary key.
$result = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface:class)->updateObject('#__custom_table', $object, 'id');
```

Just like `insertObject`, `updateObject` takes care of escaping table names for us.

The `updateObject` method will throw a error if there is a problem updating the record into the database table.

We need to ensure that the record already exists before attempting to update it, so we would
probably add some kind of record check before executing the `updateObject` method.
