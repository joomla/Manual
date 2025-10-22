---
sidebar_position: 1
title: Select Data from the Database
---

Select Data from the Database
=============================

Since Joomla introduced support for a variety of database types in Joomla 1.6 - the recommended way of building database queries is through "query chaining" (although string queries will always be supported).

Query chaining refers to a method of connecting a number of methods, one after the other, with each method returning an object that can support the next method, improving readability and simplifying code.

To obtain a new instance of the `\Joomla\Database\DatabaseQuery` class we use the `\Joomla\Database\DatabaseDriver` `getQuery` method:

```php
use Joomla\CMS\Factory;

// When used in the component's Model
$db = $this->getDatabase();

// When used in other places
$db = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface:class);

$query = $db->getQuery(true);
```

:::warning[Developer Note]
  Do **NOT** use the following Joomla 3 method anymore because it is deprecated:  
  ~~$db = Factory::getDbo();~~
:::

The `\Joomla\Database\DatabaseDriver::getQuery` takes an optional argument, $new,
which can be true or false (the default being false).

To query our data source we can call a number of `\Joomla\Database\DatabaseQuery` methods;
these methods encapsulate the data source's query language (in most cases SQL),
hiding query-specific syntax from the developer and increasing the portability of the developer's source code.

Some of the more frequently used methods include; select, from, join, where and order. 
There are also methods such as insert, update and delete for modifying records in the data store.
By chaining these and other method calls, you can create almost any query against your data store
without compromising portability of your code.

## Selecting Records from a Single Table

Below is an example of creating a database query using the `\Joomla\Database\DatabaseQuery` class.
Using the select, from, where and order methods, we can create queries which are flexible,
easily readable and portable:

```php
use Joomla\CMS\Factory;

// Get a db connection.
$db = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface:class);

// Create a new query object.
$query = $db->getQuery(true);

// Select all records from the user profile table where key begins with "custom.".
// Order it by the ordering field.
$query->select($db->quoteName(['user_id', 'profile_key', 'profile_value', 'ordering']));
$query->from($db->quoteName('#__user_profiles'));
$query->where($db->quoteName('profile_key') . ' LIKE :profile_key');
$query->order($db->quoteName('ordering') . ' ASC');

// bind value for prepared statements
$query->bind(':profile_key', 'custom.%');

// Reset the query using our newly populated query object.
$db->setQuery($query);

// Load the results as a list of stdClass objects (see later for more options on retrieving data).
$results = $db->loadObjectList();
```

The query can also be chained to simplify further:

```php
$query
    ->select($db->quoteName(['user_id', 'profile_key', 'profile_value', 'ordering']))
    ->from($db->quoteName('#__user_profiles'))
    ->where($db->quoteName('profile_key') . ' LIKE :profile_key')
    ->order($db->quoteName('ordering') . ' ASC')
    ->bind(':profile_key', 'custom.%');
```

Chaining can become useful when queries become longer and more complex.

Grouping can be achieved simply too. The following query would count the number of articles in each category.

```php
$query
    ->select( ['catid', 'COUNT(*)'] )
    ->from($db->quoteName('#__content'))
    ->group($db->quoteName('catid'));
```

A limit can be set to a query using "setLimit". For example in the following query, it would return up to 10 records.

```php
$query
    ->select($db->quoteName(['user_id', 'profile_key', 'profile_value', 'ordering']))
    ->from($db->quoteName('#__user_profiles'))
    ->setLimit('10');
```

## Selecting Records from Multiple Tables

Using the `\Joomla\Database\DatabaseQuery`'s join methods, we can select records from
multiple related tables. The generic "join" method takes two arguments: the join "type"
inner, outer, left, right) and the join condition. In the following example you will notice 
that we can use all of the keywords we would normally use if we were writing a native SQL query, 
including the AS keyword for aliasing tables and the ON keyword for creating relationships between tables. 
Also note that the table alias is used in all methods which reference table columns (I.e. select, where, order).

```php
use Joomla\CMS\Factory;

// Get a db connection.
$db = Factory::getContainer()->get(\Joomla\Database\DatabaseInterface:class);

// Create a new query object.
$query = $db->getQuery(true);

// Select all articles for users who have a username which starts with 'a'.
// Order it by the created date.
// Note by putting 'a' as a second parameter will generate `#__content` AS `a`
$query
    ->select(['a.*', 'b.username', 'b.name'])
    ->from($db->quoteName('#__content', 'a'))
    ->join('INNER', $db->quoteName('#__users', 'b') . ' ON (' . $db->quoteName('a.created_by') . ' = ' . $db->quoteName('b.id') . ')')
    ->where($db->quoteName('b.username') . ' LIKE :username')
    ->order($db->quoteName('a.created') . ' DESC')
    ->bind(':username', 'a%');

// Reset the query using our newly populated query object.
$db->setQuery($query);

// Load the results as a list of stdClass objects (see later for more options on retrieving data).
$results = $db->loadObjectList();

```

The join method above enables us to query both the content and user tables,
retrieving articles with their author details. There are also convenience methods for joins:

- innerJoin()
- leftJoin()
- rightJoin()
- outerJoin()

We can use multiple joins to query across more than two tables:

```php
$query
    ->select(array('a.*', 'b.username', 'b.name', 'c.*', 'd.*'))
    ->from($db->quoteName('#__content', 'a'))
    ->join('INNER', $db->quoteName('#__users', 'b') . ' ON (' . $db->quoteName('a.created_by') . ' = ' . $db->quoteName('b.id') . ')')
    ->join('LEFT', $db->quoteName('#__user_profiles', 'c') . ' ON (' . $db->quoteName('b.id') . ' = ' . $db->quoteName('c.user_id') . ')')
    ->join('RIGHT', $db->quoteName('#__categories', 'd') . ' ON (' . $db->quoteName('a.catid') . ' = ' . $db->quoteName('d.id') . ')')
    ->where($db->quoteName('b.username') . ' LIKE :username')
    ->order($db->quoteName('a.created') . ' DESC')
    ->bind(':username', 'a%');
```

Notice how chaining makes the source code more readable for these longer queries.

In some cases, you will also need to use the AS clause when selecting items to avoid column name conflicts.
In this case, multiple select statements can be chained in conjunction with using the second parameter of `$db->quoteName`.

```php
$query
    ->select('a.*')
    ->select($db->quoteName('b.username', 'username'))
    ->select($db->quoteName('b.name', 'name'))
    ->from($db->quoteName('#__content', 'a'))
    ->join('INNER', $db->quoteName('#__users', 'b'), $db->quoteName('a.created_by') . ' = ' . $db->quoteName('b.id'))
    ->where($db->quoteName('b.username') . ' LIKE :username')
    ->order($db->quoteName('a.created') . ' DESC')
    ->bind(':username', 'a%');
```

A second array can also be used as the second parameter of the select statement to populate the
values of the AS clause. Remember to include nulls in the second array to correspond to columns in the
first array that you don't want to use the AS clause for:

```php
$query
    ->select(['a.*'])
    ->select($db->quoteName(array('b.username', 'b.name'), ['username', 'name']))
    ->from($db->quoteName('#__content', 'a'))
    ->join('INNER', $db->quoteName('#__users', 'b') . ' ON (' . $db->quoteName('a.created_by') . ' = ' . $db->quoteName('b.id') . ')')
    ->where($db->quoteName('b.username') . ' LIKE :username')
    ->order($db->quoteName('a.created') . ' DESC')
    ->bind(':username', 'a%');
```

## Using Prepared Statements

With Joomla! 4.0 we have moved all queries to use **prepared statements**. For easier use of prepared
statements we introduced some helper functions and allow to use arrays in several function calls. Simple
query with prepared statements.

```php
$query = $this->db->getQuery(true)
	->select($this->db->quoteName(array('id', 'password')))
	->from($this->db->quoteName('#__users'))
	->where($this->db->quoteName('username') . ' = :username')
	->bind(':username', $credentials['username']);
```

You see that we don't add the **$credentials['username']** directly to the query, instead we
add the placeholder :username into the query and bind the variable to the query. When we bind a
variable to a query we don't need to escape nor to quote it. Beware that binding a variable will
always be a reference. A nice side effect of this, is that you can manipulate the query in a loop.

```php
$listOfUsernames = [ 'admin', 'user1' ];

$query = $this->db->getQuery(true)
	->select($this->db->quoteName(array('id', 'password')))
	->from($this->db->quoteName('#__users'))
	->where($this->db->quoteName('username') . ' = :username')
	->bind(':username', $username);

foreach($listOfUsernames as $name)
{
  $username = $name;
  $this->db->setQuery($query);
  $user = $this->db->loadObject();
  print_r($user);
}
```

In the loop we set the previously bound $username variable with the $name variable from the loop,
then we have to set the query again (because Joomla resets the database driver after query execution
which is only true for load* functions). The result will be multiple queries with different username
values. We can use arrays to add multiple variables at once.

```php
$query = $this->db->getQuery(true)
	->select($this->db->quoteName(array('id', 'password')))
	->from($this->db->quoteName('#__users'))
	->where($this->db->quoteName('username') . ' = :username')
	->where($this->db->quoteName('id') . ' = :id')
	->bind(
	[':username', ':id'], 
	[$credentials['username'], 42], 
	[Joomla\Database\ParameterType::STRING, Joomla\Database\ParameterType::INTEGER]
	);
```

We add **username** and **id** as bind parameter and set the correct ParameterType for each variable.
It's also possible to use one variable for all bind values and ParameterTypes.

```php
$query = $this->db->getQuery(true)
	->select($this->db->quoteName(array('id', 'password')))
	->from($this->db->quoteName('#__users'))
	->where($this->db->quoteName('username') . ' = :username')
	->where($this->db->quoteName('password') . ' = :password')
	->bind([':username', ':password'], $credentials['username']);
```

The parameter :username and :password get set to the same value and the default ParameterType.
The function **whereIn()** and **whereNotIn()** always use prepared statements, internal these
functions uses the **bindArray** function. It can be used to bind an array of variables without
specifying the placeholder.

```php
$userids = [1,2,3,4];

$query = $this->db->getQuery(true)
	->select($this->db->quoteName(array('id', 'password')))
	->from($this->db->quoteName('#__users'));

$parameterNames = $query->bindArray($userids);

$query->where($this->db->quoteName('id') . ' IN (' . implode(',', $parameterNames) . ')');
```

The **bindArray** function returns an array of placeholders. The index is unique for the whole query.

```php
$placeholders = [
  ':preparedArray1',
  ':preparedArray2',
  ':preparedArray3',
  ':preparedArray4'
];
```
