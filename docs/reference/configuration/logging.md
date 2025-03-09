---
title: Logging
---

Logging Settings
================

### log_path

The path to the log directory.

```php
public $log_path = '/var/www/html/administrator/logs';
```

### log_categories

Log categories: `databasequery`, `deprecated`, `deprecation-notes`, `system` and etc.

File: `${log_path}/custom-logging.php`

```php
public $log_categories = '';
```

### log_category_mode

Log category mode: `0`: include, `1`: exclude.

Default: `0`

```php
public $log_category_mode = 1;
```

### log_deprecated

Log deprecations.

File: `${log_path}/deprecated.php`

Default: `0` 

```php
public $log_deprecated = 1;
```

### log_everything

Log almost everything.

File: `${log_path}/everything.php`

Default: `0` 

```php
public $log_everything = 1;
```

### log_priorities

Log priorities.

Default: `array('0' => 'all')`.

```php
public $log_priorities = array('0' => 'critical', '1' => 'emergency');
```
