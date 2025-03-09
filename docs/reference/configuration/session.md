---
title: Session
---

Session Settings
================

### session_handler

The method used to handle sessions: `file`, `database`, `memcached`, `redis`.

Default: `database`

```php
public $session_handler = 'redis';
```

### shared_session

Enable shared sessions.

Default: `false`
```php
public $shared_session = true;
```

### session_metadata

Track session metadata.

Default: `true`

```php
public $session_metadata = false;
```

### session_metadata_for_guest

Track guest session metadata.

Default: `true`

```php
public $session_metadata_for_guest = false;
```

### lifetime

Session lifetime (in minutes).

Default: `15`

```php
public $lifetime = 60;
```

### session_filesystem_path

Path for session files.

```php
public $session_filesystem_path = '/var/www/sessions';
```

### session_memcached_server_host

Memcached server hostname or IP address.

Default: `localhost`

```php
public $session_memcached_server_host = '127.0.0.1';
```

### session_memcached_server_port

Memcached server port.

Default: `11211`

```php
public $session_memcached_server_port = 22122;
```

### session_redis_server_host

Redis server hostname or IP address.

Default: `localhost`

```php
public $session_redis_server_host = '127.0.0.1';
```

### session_redis_server_port

Redis server port.

Default: `6379`

```php
public $session_redis_server_port = 9736;
```

### session_redis_server_auth

Redis server authentication password.

```php
public $session_redis_server_auth = 'redis_password';
```

### session_redis_server_db

Redis server database index.

Default: `0`

```php
public $session_redis_server_db = 1;
```

### session_redis_persist

Enable Redis persistent connections.

Default: `true`

```php
public $session_redis_persist = false;
```
