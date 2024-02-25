---
sidebar_position: 5
title: Delete Data from the Database
---

# Deleting a Record

Use the delete method to remove records from the database.

```php
$db = Factory::getContainer()->get('DatabaseDriver');

$query = $db->getQuery(true);

// delete all custom keys for user 1001.
$query->delete($db->quoteName('#__user_profiles'))
    ->where($db->quoteName('user_id') . ' = :user_id')
    ->where($db->quoteName('profile_key') . ' = :profile_key')
    ->bind(':user_id', 1001, \Joomla\Database\ParameterType::INTEGER)
    ->bind(':profile_key', 'custom.%');

$db->setQuery($query);

$result = $db->execute();
```
