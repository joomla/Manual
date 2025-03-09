---
title: Database
---

Database Settings
=================

### dbtype

The type of database used: `mysqli`, `mysql`, `pgsql`.

Default: `mysqli`

```php
public $dbtype = 'pgsql';
```

### host

The database hostname or IP address.

Default: `localhost`

```php
public $host = '127.0.0.1';
```

### user

The username for the database.

```php
public $user = 'joomla_user';
```

### password

The password for the database.

```php
public $password = 'securepassword123';
```

### db

The name of the database.

```php
public $db = 'joomla_db';
```

### dbprefix

The prefix for database tables.

Default: `jos_`

```php
public $dbprefix = 'xyz_';
```

### dbencryption

Encrypt database connections: `0` (server controlled), `1` (one-way), `2` (two-way).

Default: `0`

```php
public $dbencryption = 1;
```

### dbsslverifyservercert

Verify server certificate during SSL/TLS connection.

Default: `false`

```php
public $dbsslverifyservercert = true;
```

### dbsslkey

The path to the SSL/TLS key file used for database connections.

```php
public $dbsslkey = '/path/to/your/key.crt.pem';
```

### dbsslcert

The path to the SSL/TLS certificate file used for database connections.

```php
public $dbsslcert = '/path/to/your/certificate.pem';
```

### dbsslca

The path to the CA certificate file used for verifying the server's identity.

```php
public $dbsslca = '/path/to/ca_certificate.pem';
```

### dbsslcipher

The cipher suite to use for SSL/TLS connections.

```php
public $dbsslcipher = 'ECDHE-RSA-AES256-GCM-SHA384';
```
