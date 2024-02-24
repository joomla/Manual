---
sidebar_position: 2
title: Query Results after Selecting Data from the Database
---

# Query Results

The database class contains many methods for working with a query's result set that you can get after [SELECT](/docs/general-concepts/database/select-data) queries.

## Single Value Result

### loadResult()
Use ``loadResult()`` when you expect just a single value back from your database query.
<table>
<tr>
<th>id</th>
<th>name</th>
<th>email</th>
<th>username</th>
</tr>
<tr>
<td>1</td>
<td style="background-color: yellow;">John Smith</td>
<td>johnsmith@domain.example</td>
<td>johnsmith</td>
</tr>
<tr>
<td>2</td>
<td>Magda Hellman</td>
<td>magda_h@domain.example</td>
<td>magdah</td>
</tr>
<tr>
<td>3</td>
<td>Yvonne de Gaulle</td>
<td>ydg@domain.example</td>
<td>ydegaulle</td>
</tr>
</table>
This is often the result of a 'count' query to get the number of records:

```php
use Joomla\CMS\Factory;
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->getQuery(true);
$query->select('COUNT(*)');
$query->from($db->quoteName('#__my_table'));
$query->where($db->quoteName('name')." = :value");
$query->bind('value', $value)

// Reset the query using our newly populated query object.
$db->setQuery($query);
$count = $db->loadResult();
```
or where you are just looking for a single field from a single row of the table (or possibly a single field from the first row returned).
```php
use Joomla\CMS\Factory;
$db = Factory::getContainer()->get('DatabaseDriver');
$query = $db->getQuery(true);
$query->select('field_name');
$query->from($db->quoteName('#__my_table'));
$query->where($db->quoteName('some_name')." = :value");
$query->bind(':value', $some_value);

$db->setQuery($query);
$result = $db->loadResult();
```
## Single Row Results
Each of these results functions will return a single record from the database even though there may be several records that meet the criteria that you have set. To get more records, you need to call the function again.
<table>
  <tr>
    <th>id</th>
    <th>name</th>
    <th>email</th>
    <th>username</th>
  </tr>
  <tr style="background-color: yellow;">
    <td>1</td>
    <td>John Smith</td>
    <td>johnsmith@domain.example</td>
    <td>johnsmith</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Magda Hellman</td>
    <td>magda_h@domain.example</td>
    <td>magdah</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Yvonne de Gaulle</td>
    <td>ydg@domain.example</td>
    <td>ydegaulle</td>
  </tr>
</table>

### loadRow()

``loadRow()`` returns an indexed array from a single record in the table:
```php
. . .
$db->setQuery($query);
$row = $db->loadRow();
print_r($row);
```
will give:
```txt
Array ( [0] => 1, [1] => John Smith, [2] => johnsmith@domain.example, [3] => johnsmith )
```
You can access the individual values by using:

```php
$row['index'] // e.g. $row['2']
```
Notes:
- The array indices are numeric starting from zero. 
- Whilst you can repeat the call to get further rows, one of the functions that returns multiple rows might be more useful.

### loadAssoc()
``loadAssoc()`` returns an associated array from a single record in the table:
```php
. . .
$db->setQuery($query);
$row = $db->loadAssoc();
print_r($row);
```
will give:
```txt
Array ( [id] => 1, [name] => John Smith, [email] => johnsmith@domain.example, [username] => johnsmith )
```
You can access the individual values by using:
```php
$row['name'] // e.g. $row['email']
```
Notes:
- Whilst you can repeat the call to get further rows, one of the functions that returns multiple rows might be more useful.

### loadObject()
``loadObject()`` returns a PHP object from a single record in the table:
```php
. . .
$db->setQuery($query);
$result = $db->loadObject();
print_r($result);
```
will give:
```txt
stdClass Object ( [id] => 1, [name] => John Smith, [email] => johnsmith@domain.example, [username] => johnsmith )
```
You can access the individual values by using:
```php
$result->index // e.g. $result->email
```
Notes:
- Whilst you can repeat the call to get further rows, one of the functions that returns multiple rows might be more useful.

## Single Column Results
Each of these results functions will return a single column from the database.
<table>
  <tr>
    <th>id</th>
    <th>name</th>
    <th>email</th>
    <th>username</th>
  </tr>
  <tr>
    <td>1</td>
    <td style="background-color: yellow;">John Smith</td>
    <td>johnsmith@domain.example</td>
    <td>johnsmith</td>
  </tr>
  <tr>
    <td>2</td>
    <td style="background-color: yellow;">Magda Hellman</td>
    <td>magda_h@domain.example</td>
    <td>magdah</td>
  </tr>
  <tr>
    <td>3</td>
    <td style="background-color: yellow;">Yvonne de Gaulle</td>
    <td>ydg@domain.example</td>
    <td>ydegaulle</td>
  </tr>
</table>

### loadColumn()
``loadColumn()`` returns an indexed array from a single column in the table:

```php
$query->select('name'));
->from . . .";
. . .
$db->setQuery($query);
$column= $db->loadColumn();
print_r($column);
```
will give:
```txt
Array ( [0] => John Smith, [1] => Magda Hellman, [2] => Yvonne de Gaulle )
```
You can access the individual values by using:
```php
$column['index'] // e.g. $column['2']
```
Notes:
- The array indices are numeric starting from zero.
- ``loadColumn()`` is equivalent to ``loadColumn(0)``.

### loadColumn($index)
``loadColumn($index)`` returns an indexed array from a single column in the table:
```php
$query->select(array('name', 'email', 'username'));
->from . . .";
. . .
$db->setQuery($query);
$column= $db->loadColumn(1);
print_r($column);
```
will give:
```txt
Array ( [0] => johnsmith@domain.example, [1] => magda_h@domain.example, [2] => ydg@domain.example )
```
You can access the individual values by using:
```php
$column['index'] // e.g. $column['2']
```
``loadColumn($index)`` allows you to iterate through a series of columns in the results:
```php
. . .
$db->setQuery($query);
for ( $i = 0; $i <= 2; $i++ ) {
$column = $db->loadColumn($i);
print_r($column);
}
```
will give:
```txt
Array ( [0] => John Smith, [1] => Magda Hellman, [2] => Yvonne de Gaulle ),
Array ( [0] => johnsmith@domain.example, [1] => magda_h@domain.example, [2] => ydg@domain.example ),
Array ( [0] => johnsmith, [1] => magdah, [2] => ydegaulle )
```
Notes:
- The array indices are numeric starting from zero.

## Multi-Row Results
Each of these results functions will return multiple records from the database.
<table>
  <tr>
    <th>id</th>
    <th>name</th>
    <th>email</th>
    <th>username</th>
  </tr>
  <tr style="background-color: yellow;">
    <td>1</td>
    <td>John Smith</td>
    <td>johnsmith@domain.example</td>
    <td>johnsmith</td>
  </tr>
  <tr style="background-color: yellow;">
    <td>2</td>
    <td>Magda Hellman</td>
    <td>magda_h@domain.example</td>
    <td>magdah</td>
  </tr>
  <tr style="background-color: yellow;">
    <td>3</td>
    <td>Yvonne de Gaulle</td>
    <td>ydg@domain.example</td>
    <td>ydegaulle</td>
  </tr>
</table>

### loadRowList()
``loadRowList()`` returns an indexed array of indexed arrays from the table records returned by the query:
```php
. . .
$db->setQuery($query);
$row = $db->loadRowList();
print_r($row);
```
will give (with line breaks added for clarity):
```txt
Array (
[0] => Array ( [0] => 1, [1] => John Smith, [2] => johnsmith@domain.example, [3] => johnsmith ),
[1] => Array ( [0] => 2, [1] => Magda Hellman, [2] => magda_h@domain.example, [3] => magdah ),
[2] => Array ( [0] => 3, [1] => Yvonne de Gaulle, [2] => ydg@domain.example, [3] => ydegaulle )
)
```
You can access the individual rows by using:
```php
$row['index'] // e.g. $row['2']
```
and you can access the individual values by using:
```php
$row['index']['index'] // e.g. $row['2']['3']
```
Notes:
- The array indices are numeric starting from zero.

### loadAssocList()
``loadAssocList()`` returns an indexed array of associated arrays from the table records returned by the query:
```php
. . .
$db->setQuery($query);
$row = $db->loadAssocList();
print_r($row);
```
will give (with line breaks added for clarity):
```txt
Array (
[0] => Array ( [id] => 1, [name] => John Smith, [email] => johnsmith@domain.example, [username] => johnsmith ),
[1] => Array ( [id] => 2, [name] => Magda Hellman, [email] => magda_h@domain.example, [username] => magdah ),
[2] => Array ( [id] => 3, [name] => Yvonne de Gaulle, [email] => ydg@domain.example, [username] => ydegaulle )
)
```
You can access the individual rows by using:
```php
$row['index'] // e.g. $row['2']
```
and you can access the individual values by using:
```php
$row['index']['column_name'] // e.g. $row['2']['email']
```

### loadAssocList($key)
``loadAssocList($key)``
loadAssocList('key') returns an associated array - indexed on 'key' - of associated arrays from the table records returned by the query:
```php
. . .
$db->setQuery($query);
$row = $db->loadAssocList('username');
print_r($row);
```
will give (with line breaks added for clarity):
```txt
Array (
[johnsmith] => Array ( [id] => 1, [name] => John Smith, [email] => johnsmith@domain.example, [username] => johnsmith ),
[magdah] => Array ( [id] => 2, [name] => Magda Hellman, [email] => magda_h@domain.example, [username] => magdah ),
[ydegaulle] => Array ( [id] => 3, [name] => Yvonne de Gaulle, [email] => ydg@domain.example, [username] => ydegaulle )
)
```
You can access the individual rows by using:
```php
$row['key_value'] // e.g. $row['johnsmith']
```
and you can access the individual values by using:
```php
$row['key_value']['column_name'] // e.g. $row['johnsmith']['email']
```
Note: 
- Key must be a valid column name from the table; it does not have to be an Index or a Primary Key. But if it does not have a unique value you may not be able to retrieve results reliably.

### loadAssocList($key, $column)
``loadAssocList('key', 'column')`` returns an associative array, indexed on 'key', of values from the column named 'column' returned by the query:
```php
. . .
$db->setQuery($query);
$row = $db->loadAssocList('id', 'username');
print_r($row);
```
will give (with line breaks added for clarity):
```txt
Array (
[1] => John Smith,
[2] => Magda Hellman,
[3] => Yvonne de Gaulle,
)
```
Note: 
- Key must be a valid column name from the table; it does not have to be an Index or a Primary Key. But if it does not have a unique value you may not be able to retrieve results reliably.

### loadObjectList()
``loadObjectList()``` returns an indexed array of PHP objects from the table records returned by the query:
```php
. . .
$db->setQuery($query);
$row = $db->loadObjectList();
print_r($row);
```
will give (with line breaks added for clarity):
```txt
Array (
[0] => stdClass Object ( [id] => 1, [name] => John Smith,
[email] => johnsmith@domain.example, [username] => johnsmith ),
[1] => stdClass Object ( [id] => 2, [name] => Magda Hellman,
[email] => magda_h@domain.example, [username] => magdah ),
[2] => stdClass Object ( [id] => 3, [name] => Yvonne de Gaulle,
[email] => ydg@domain.example, [username] => ydegaulle )
)
```
You can access the individual rows by using:
```php
$row['index'] // e.g. $row['2']
```
and you can access the individual values by using:
```php
$row['index']->name // e.g. $row['2']->email
```

### loadObjectList($key)
``loadObjectList('key')`` returns an associated array - indexed on 'key' - of objects from the table records returned by the query:
```php
. . .
$db->setQuery($query);
$row = $db->loadObjectList('username');
print_r($row);
```
will give (with line breaks added for clarity):
```txt
Array (
[johnsmith] => stdClass Object ( [id] => 1, [name] => John Smith,
[email] => johnsmith@domain.example, [username] => johnsmith ),
[magdah] => stdClass Object ( [id] => 2, [name] => Magda Hellman,
[email] => magda_h@domain.example, [username] => magdah ),
[ydegaulle] => stdClass Object ( [id] => 3, [name] => Yvonne de Gaulle,
[email] => ydg@domain.example, [username] => ydegaulle )
)
```
You can access the individual rows by using:
```php
$row['key_value'] // e.g. $row['johnsmith']
```
and you can access the individual values by using:
```php
$row['key_value']->column_name // e.g. $row['johnsmith']->email
```
Note: 
- Key must be a valid column name from the table; it does not have to be an Index or a Primary Key. But if it does not have a unique value you may not be able to retrieve results reliably.

## Miscellaneous Result Set Methods

### getNumRows()
``getNumRows()`` will return the number of result rows found by the last SELECT or SHOW query and waiting to be read. To get a result from getNumRows() you have to run it **after** the query and **before** you have retrieved any results. To retrieve the number of rows affected by a INSERT, UPDATE, REPLACE or DELETE query, use ``getAffectedRows()``.
```php
. . .
$db->setQuery($query);
$db->execute();
$num_rows = $db->getNumRows();
print_r($num_rows);
$result = $db->loadRowList();
```
will return
```txt
3
```
Note: 
- ``getNumRows()`` is only valid for statements like SELECT or SHOW that return an actual result set. If you run ``getNumRows()`` after ``loadRowList()`` - or any other retrieval method - you will get a PHP Warning:
```txt
Warning: mysql_num_rows(): 80 is not a valid MySQL result resource
in libraries\joomla\database\database\mysql.php on line 344
```

# More Database
- [Select data from the database](/docs/general-concepts/database/select-data)
- [Insert data into the database](/docs/general-concepts/database/insert-data)
- [Update data in the database](/docs/general-concepts/database/update-data)
- [Delete data from the database](/docs/general-concepts/database/delete-data)
- [Secure DB Queries](/docs/next/security/secure-db-queries)