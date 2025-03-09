---
title: Configuration
---

Configuration 
=============

## Caching 

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

## CORS 

### cors

Enable CORS.

Default: `false`

```php
public $cors = true;
```

### cors_allow_headers

HTTP headers that are allowed in response to a preflight request.

Default: `Content-Type,X-Joomla-Token`

```php
public $cors_allow_headers = 'Content-Type,X-Joomla-Token,Authorization';
```

### cors_allow_methods

HTTP methods (e.g., GET, POST, PUT) that are permitted for cross-origin requests.

Default: `''` (all methods available for the requested route)

```php
public $cors_allow_methods = 'GET,POST';
```

### cors_allow_origin

Origins (domains) that are allowed to access the resource.

Default: `*`

```php
public $cors_allow_origin = 'https://example.com,https://another-domain.com';
```

## Database

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

## Debug

### debug

Enable debug mode.

Default: `false`

```php
public $debug = true;
```

### debug_lang

Enable language debug mode.

Default: `false`

```php
public $debug_lang = true;
```

### debug_lang_const

Enable language constants debug mode.

Default: `true`

```php
public $debug_lang_const = false;
```

### error_reporting

The level of error reporting: `default`, `simple`, `maximum`, `none`.

```php
public $error_reporting = 'default';
```

## Logging 

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

## Mail

### mailonline

Enable email sending.

Default: `true`

```php
public $mailonline = false;
```

### mailer

The method used to send emails: `mail`, `sendmail`, `smtp`.

```php
public $mailer = 'smtp';
```

### mailfrom

The email address used to send emails.

```php
public $mailfrom = 'admin@example.com';
```

### fromname

The name displayed in the "From" field of emails.

```php
public $fromname = 'My Joomla Site';
```

### massmailoff

Disable mass mailings.

Default: `false`

```php
public $massmailoff = true;
```

### sendmail

Path to sendmail binary.

Default: `/usr/sbin/sendmail`

```php
public $sendmail = '/usr/local/sbin/sendmail';
```

### smtpauth

Enable SMTP authentication.

Default: `false`

```php
public $smtpauth = true;
```

### smtpuser

The username for SMTP authentication.

```php
public $smtpuser = 'smtp_user';
```

### smtppass

The password for SMTP authentication.

```php
public $smtppass = 'smtp_password';
```

### smtphost

The SMTP server hostname or IP address.

```php
public $smtphost = 'smtp.example.com';
```

### smtpsecure

The encryption method for SMTP: `none`, `ssl`, `tls`.

Default: `none`

```php
public $smtpsecure = 'tls';
```

### smtpport

The port used for SMTP.

Default: `25`

```php
public $smtpport = 465;
```

## Metadata

### MetaDesc

Site meta description.

```php
public $MetaDesc = 'Joomla!';
```

### MetaAuthor

Show author meta tag.

Default: `true`

```php
public $MetaAuthor = false;
```

### MetaVersion

Show Joomla version in generator meta tag.

Default: `false`

```php
public $MetaVersion = true;
```

### MetaRights

Content rights meta tag value.

```php
public $MetaRights = 'Public domain';
```

### robots

Robots meta tag value.

Default: `index, follow`

```php
public $robots = 'noindex, nofollow';
```

## Proxy

### proxy_enable

Enable HTTP proxy.

Default: `false`

```php
public $proxy_enable = true;
```

### proxy_host

The HTTP proxy hostname or IP address.

```php
public $proxy_host = 'example.com';
```

### proxy_port

HTTP proxy port.

```php
public $proxy_port = 8080;
```

### proxy_user

HTTP proxy user.

```php
public $proxy_user = 'proxy_user';
```

### proxy_pass

HTTP proxy password.

```php
public $proxy_pass = 'proxy_password';
```

## SEO

### sef

Enable search engine friendly URLs.

Default: `true`.

```php
public $sef = false;
```

### sef_rewrite

Enable URL rewriting.

Default: `false`.

```php
public $sef_rewrite = true;
```

### sef_suffix


Add an `.html` suffix to URLs.

Default: `false`.

```php
public $sef_suffix = true;
```

### unicodeslugs

Allow Unicode in slugs.

Default: `false`

```php
public $unicodeslugs = true;
```

### sitename_pagetitles

Show site name in page titles: `0` (no), `1` (after), `2` (before).

Default: `0`.

```php
public $sitename_pagetitles = 2;
```

## Server

### tmp_path

The path to the temporary directory.

Default: `/tmp`.

```php
public $tmp_path = '/var/www/html/tmp';
```

### gzip

Enable GZIP compression.

Default: `false`.
```php
public $gzip = true;
```

### offset

The server's timezone offset.

Default: `UTC`.

```php
public $offset = 'Asia/Vladivostok';
```

### behind_loadbalancer

Behind load balancer.

Default: `false`.
```php
public $behind_loadbalancer = true;
```

## Session

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

## Site

### sitename

The name of the website.

```php
public $sitename = 'My Joomla Site';
```

### offline

Enable offline mode.
```php
public $offline = true;
```

### offline_message

The message that will be displayed on the site when the site is offline.

Default: `This site is down for maintenance.<br> Please check back again soon.`

```php
public $offline_message = 'Maintenance';
```

### display_offline_message

Display offline message: `0` (hide), `1` (custom message), `2` (default message).

Default: `1`

```php
public $display_offline_message = 2;
```

### offline_image

The image that will be displayed when the site is offline.

```php
public $offline_image = 'images/offline.png';
```

### editor

The default editor for content creation: `tinymce`, `codemirror`, `none`.

Default: `tinymce`

```php
public $editor = 'codemirror';
```

### captcha

The default Captcha.

```php
public $captcha = 0;
```

### list_limit

The number of items displayed per page in the admin panel.

Default: `20`

```php
public $list_limit = 50;
```

### live_site

The full URL of the site (optional).

```php
public $live_site = 'https://www.example.com';
```

### secret

A secret key used for security purposes.

```php
public $secret = 'your_secret_key';
```

### force_ssl

Force SSL/TLS for the site or admin area: `0` (none), `1` (admin), `2` (entire site).

Default: `0`

```php
public $force_ssl = 2;
```

### access

The default access level for newly created items: `1` (public), `2` (registered), `3` (special), `5` (guest), `6` (super users).

Default: `1`

```php
public $access = 2;
```

### frontediting

Enable frontend editing: `0` (none), `1` (modules), `2` (modules &amp; menus)

Default: `1`

```php
public $frontediting = 2;
```

### feed_limit

The number of content items to be shown in any RSS news feeds set up on the website.

Default: `10`

```php
public $feed_limit = 20;
```

### feed_email

Feed email: `none`, `author`, `site`.

Default: `none`

```php
public $feed_email = 'author';
```

### cookie_domain

Cookie domain.

```php
public $cookie_domain = 'example.com';
```

### cookie_path

Cookie path.

```php
public $cookie_path = '/subfolder';
```

### helpurl

Help URL.

Default: `https://help.joomla.org/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}`

```php
public $helpurl = 'https://example.com/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}';
```

### asset_id

Asset ID.

Default: `1`

```php
public $asset_id = 42;
```
