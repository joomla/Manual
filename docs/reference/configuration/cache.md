---
title: Cache
---

Cache Settings
==============

### caching

Enable caching: `0` (disabled), `1` (conservative), `2` (progressive).

Default: `0`

```php
public $caching = 1;
```

### cache_handler

The caching mechanism used: `file`, `apcu`, `memcached`, `redis`.

Default: `file`

```php
public $cache_handler = 'redis';
```

### cachetime

The time (in minutes) before cached content expires.

Default: `15`

```php
public $cachetime = 60;
```

### cache_platformprefix

Enable platform prefix for caching.

Default: `false`

```php
public $cache_platformprefix = true;
```

### memcached_persist

Enable Memcached.

Default: `false`

```php
public $memcached_persist = true;
```

### memcached_compress

Enable Memcached compression.

Default: `false`

```php
public $memcached_compress = true;
```

### memcached_server_host

Memcached server hostname or IP address.

Default: `localhost`

```php
public $memcached_server_host = '127.0.0.1';
```

### memcached_server_port

Memcached server port.

Default: `11211`

```php
public $memcached_server_port = 22122;
```

### redis_server_host

Redis server hostname or IP address.

Default: `localhost`

```php
public $redis_server_host = '127.0.0.1';
```

### redis_server_port

Redis server port.

Default: `6379`

```php
public $redis_server_port = 9736;
```

### redis_server_auth

Redis server authentication key.

```php
public $redis_server_auth = 'redis_secret';
```

### redis_server_db

Redis database index.

Default: `0`

```php
public $redis_server_db = 1;
```

### redis_persist

Enable Redis persistent connections.

Default: `false`

```php
public $redis_persist = true;
```
