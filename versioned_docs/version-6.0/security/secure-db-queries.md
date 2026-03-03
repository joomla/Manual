---
sidebar_position: 4
---

Secure DB Queries
======================
A SQL injection attack is a type of vulnerability where an attacker is able to manipulate a SQL query by injecting user controlled content.

Consider the following code snippet:

```php
$query = $this->db->getQuery(true);
$username = $user->username;
$newPassword = password_hash($newPassword, PASSWORD_DEFAULT);

$query->update('#__users')->set('password = "' . $newPassword . '"')->where('username = "' . $username . '"');

$this->db->setQuery($query)->execute();
```

The code is supposed to update the password of the currently logged-in user who's identified by his username and the resulting query for the user "foobar" will look like this:

```sql
UPDATE jos_users SET password = "{HASH}" WHERE username = "foobar";
```

Now let's assume that the user chose `foobar" OR username="admin` as his username of choice. That would result in a very different query:

```sql
UPDATE jos_users SET password = "{HASH}" WHERE username = "foobar" OR username="admin";
```

So, the attacker has injected his user controlled commands in the query, resetting not only his password but also the password of the admin user.

### Prevention
#### Use prepared statements
This is the gold standard to prevent SQLi attacks.

The basic principle is simple: instead of integrating the user provided values in the query within the PHP code, query and input values are sent to the DB server in separate calls:

```
Prepared Statements
Query: SELECT foobar FROM bar WHERE foo = ?
Data:  [? = 'bar']
```

The basic principle is simple: instead of integrating the user provided values in the query within the PHP code, query and input values are sent to the DB server in separate calls. The DB server will then combine queries and values with each other and take care of escaping and/or quotes where necessary.

So, by separating queries and injected values from each other, an injection becomes impossible.

##### Implementing Prepared Statements through JDatabaseDriver
Implementing prepared statements in Joomla is very simple and is cross-platform:

```php
$query = $this->db->getQuery(true)
	->select($this->db->quoteName(array('id', 'password')))
	->from($this->db->quoteName('#__users'))
	->where($this->db->quoteName('username') . ' = :username')
	->bind(':username', $credentials['username']);
```

Within your query you define a so called named placeholder, prefixed with a double-colon. The actual replacement value for that placeholder is then passed to the DB server using the ```bind()``` method.

The following functions accept arrays to reduce function call overhead:
* bind()
* bindArray()
* whereIn()
* whereNotIn()

__!If possible you should use prepared statements!__

Learn more:
* [The PHP Manual on Prepared statements](https://php.net/manual/en/pdo.prepared-statements.php)
* [Simple Pull Request Implementing a Prepared Statement in Joomla](https://github.com/joomla/joomla-cms/pull/25049/files )
* [Joomla Framework API](https://api.joomla.org/framework-1/classes/Joomla.Database.DatabaseQuery.html)


#### Escape user controlled input
By escaping characters that are considered as control-characters in SQL queries, it's also possible to prevent an attacker from "escaping" from the double-quote-prison that you have built in a query:

```php
$query = $this->db->getQuery(true);
$username = $user->username;
$newPassword = password_hash($newPassword, PASSWORD_DEFAULT);

$query->update('#__users')->set('password = "' . $this->db->escape($newPassword) . '"')->where('username = "' . $this->db->escape($username) . '"');

$this->db->setQuery($query)->execute();
```

You can also remove the manually added double quotes in the query and use the ```quote()``` and ```quoteName()``` methods as these will by default also escape the provided input.

