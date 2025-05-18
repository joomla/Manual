---
title: Configuration
---

Configuration 
=============

## Caching 

### caching

Enable caching: `0` (disabled), `1` (conservative), `2` (progressive).

Default: `0`

### cache_handler

The caching mechanism used: `file`, `apcu`, `memcached`, `redis`.

Default: `file`

### cachetime

The time (in minutes) before cached content expires.

Default: `15`

### cache_platformprefix

Enable platform prefix for caching.

Default: `false`

### memcached_server_host

Memcached server hostname or IP address.

Default: `localhost`

### memcached_server_port

Memcached server port.

Default: `11211`

### memcached_persist

Enable Memcached persistent connections.

Default: `false`

### memcached_compress

Enable Memcached compression.

Default: `false`

### redis_server_host

Redis server hostname or IP address.

Default: `localhost`

### redis_server_port

Redis server port.

Default: `6379`

### redis_server_auth

Redis server authentication key.

### redis_server_db

Redis database index.

Default: `0`

### redis_persist

Enable Redis persistent connections.

Default: `false`

### Example

```php title="configuration.php"
public $caching              = 1;
public $cache_handler        = 'redis';
public $cachetime            = 60;
public $cache_platformprefix = true;

public $memcached_server_host = '127.0.0.1';
public $memcached_server_port = 22122;
public $memcached_persist     = true;
public $memcached_compress    = true;

public $redis_server_host = '127.0.0.1';
public $redis_server_port = 9736;
public $redis_server_auth = 'redis_secret';
public $redis_server_db   = 1;
public $redis_persist     = true;
```

## CORS 

### cors

Enable CORS.

Default: `false`

### cors_allow_headers

HTTP headers that are allowed in response to a preflight request.

Default: `Content-Type,X-Joomla-Token`

### cors_allow_methods

HTTP methods (e.g., GET, POST, PUT) that are permitted for cross-origin requests.

Default: `''` (all methods available for the requested route)

### cors_allow_origin

Origins (domains) that are allowed to access the resource.

Default: `*`

### Example

```php title="configuration.php"
public $cors               = true;
public $cors_allow_headers = 'Content-Type,X-Joomla-Token,Authorization';
public $cors_allow_methods = 'GET,POST';
public $cors_allow_origin  = 'https://example.com,https://another-domain.com';
```

## Database

### dbtype

The type of database used: `mysqli`, `mysql`, `pgsql`.

Default: `mysqli`

### host

The database hostname or IP address.

Default: `localhost`

### user

The username for the database.

### password

The password for the database.

### db

The name of the database.

### dbprefix

The prefix for database tables.

Default: `jos_`

### dbencryption

Encrypt database connections: `0` (server controlled), `1` (one-way), `2` (two-way).

Default: `0`

### dbsslverifyservercert

Verify server certificate during SSL/TLS connection.

Default: `false`

### dbsslkey

The path to the SSL/TLS key file used for database connections.

### dbsslcert

The path to the SSL/TLS certificate file used for database connections.

### dbsslca

The path to the CA certificate file used for verifying the server's identity.

### dbsslcipher

The cipher suite to use for SSL/TLS connections.

### Example

```php title="configuration.php"
public $dbtype    = 'pgsql';
public $host      = '127.0.0.1';
public $user      = 'joomla_user';
public $password  = 'securepassword123';
public $db        = 'joomla_db';
public $dbprefix  = 'xyz_';

public $dbencryption          = 1;
public $dbsslverifyservercert = true;
public $dbsslkey              = '/path/to/your/key.crt.pem';
public $dbsslcert             = '/path/to/your/certificate.pem';
public $dbsslca               = '/path/to/ca_certificate.pem';
public $dbsslcipher           = 'ECDHE-RSA-AES256-GCM-SHA384';
```

## Debug

### debug

Enable debug mode.

Default: `false`

### debug_lang

Enable language debug mode.

Default: `false`

### debug_lang_const

Enable language constants debug mode.

Default: `true`

### error_reporting

The level of error reporting: `default`, `simple`, `maximum`, `none`.

### Example

```php title="configuration.php"
public $debug            = true;
public $debug_lang       = true;
public $debug_lang_const = false;
public $error_reporting  = 'maximum';
```

## Logging 

### log_path

The path to the log directory.

### log_categories

Log categories: `databasequery`, `deprecated`, `deprecation-notes`, `system` and etc.

File: `${log_path}/custom-logging.php`

### log_category_mode

Log category mode: `0` (include), `1` (exclude).

Default: `0`

### log_deprecated

Log deprecations.

File: `${log_path}/deprecated.php`

Default: `0`

### log_everything

Log almost everything.

File: `${log_path}/everything.php`

Default: `0` 

### log_priorities

Log priorities.

Default: `array('0' => 'all')`.

### Example

```php title="configuration.php"
public $log_path          = '/var/www/html/administrator/logs';
public $log_categories    = 'databasequery';
public $log_category_mode = 1;
public $log_deprecated    = 1;
public $log_everything    = 1;
public $log_priorities    = array('0' => 'critical', '1' => 'emergency');
```

## Mail

### mailonline

Enable email sending.

Default: `true`

### mailer

The method used to send emails: `mail`, `sendmail`, `smtp`.

### mailfrom

The email address used to send emails.

### fromname

The name displayed in the "From" field of emails.

### massmailoff

Disable mass mailings.

Default: `false`

### sendmail

Path to sendmail binary.

Default: `/usr/sbin/sendmail`

### smtphost

The SMTP server hostname or IP address.

### smtpport

The port used for SMTP.

Default: `25`

### smtpauth

Enable SMTP authentication.

Default: `false`

### smtpuser

The username for SMTP authentication.

### smtppass

The password for SMTP authentication.

### smtpsecure

The encryption method for SMTP: `none`, `ssl`, `tls`.

Default: `none`

### Example

```php title="configuration.php"
public $mailonline  = false;
public $mailer      = 'smtp';
public $mailfrom    = 'admin@example.com';
public $fromname    = 'My Joomla Site';
public $massmailoff = true;
public $sendmail    = '/usr/local/sbin/sendmail';

public $smtphost   = 'smtp.example.com';
public $smtpport   = 465;
public $smtpauth   = true;
public $smtpuser   = 'smtp_user';
public $smtppass   = 'smtp_password';
public $smtpsecure = 'tls';
```

## Metadata

### MetaDesc

Site meta description.

### MetaAuthor

Show author meta tag.

Default: `true`

### MetaVersion

Show Joomla version in generator meta tag.

Default: `false`

### MetaRights

Content rights meta tag value.

### robots

Robots meta tag value.

Default: `index, follow`

### Example

```php title="configuration.php"
public $MetaDesc    = 'Joomla!';
public $MetaAuthor  = false;
public $MetaVersion = true;
public $MetaRights  = 'Public Domain';
public $robots      = 'noindex, nofollow';
```

## Proxy

### proxy_enable

Enable HTTP proxy.

Default: `false`

### proxy_host

The HTTP proxy hostname or IP address.

### proxy_port

HTTP proxy port.

### proxy_user

HTTP proxy user.

### proxy_pass

HTTP proxy password.

### Example

```php title="configuration.php"
public $proxy_enable = true;
public $proxy_host   = 'example.com';
public $proxy_port   = 8080;
public $proxy_user   = 'proxy_user';
public $proxy_pass   = 'proxy_password';
```

## SEO

### sef

Enable search engine friendly URLs.

Default: `true`.

### sef_rewrite

Enable URL rewriting.

Default: `false`.

### sef_suffix

Add an `.html` suffix to URLs.

Default: `false`.

### unicodeslugs

Allow Unicode in slugs.

Default: `false`

### sitename_pagetitles

Append the site name to the `<title>` tag of each page header: `0` (no), `1` (after), `2` (before).

Default: `0`.

### Example

```php title="configuration.php"
public $sef                 = false;
public $sef_rewrite         = true;
public $sef_suffix          = true;
public $unicodeslugs        = true;
public $sitename_pagetitles = 2;
```

## Server

### tmp_path

The path to the temporary directory.

Default: `/tmp`.

### gzip

Enable GZIP compression.

Default: `false`.

### offset

The server's timezone offset.

Default: `UTC`.

### behind_loadbalancer

Behind load balancer.

Default: `false`.

### Example

```php title="configuration.php"
public $tmp_path            = '/var/www/html/tmp';
public $gzip                = true;
public $offset              = 'Asia/Vladivostok';
public $behind_loadbalancer = true;
```

## Session

### session_handler

The method used to handle sessions: `file`, `database`, `memcached`, `redis`.

Default: `database`

### lifetime

Session lifetime (in minutes).

Default: `15`

### shared_session

Share session between public and administrator areas of the site.

Default: `false`

### session_metadata

Track session metadata.

Default: `true`

### session_metadata_for_guest

Track guest session metadata.

Default: `true`

### session_filesystem_path

Path for session files.

### session_memcached_server_host

Memcached server hostname or IP address.

Default: `localhost`

### session_memcached_server_port

Memcached server port.

Default: `11211`

### session_memcached_server_id

Memcached server identity.

Default: `joomla_cms`

### session_redis_server_host

Redis server hostname or IP address.

Default: `localhost`

### session_redis_server_port

Redis server port.

Default: `6379`

### session_redis_server_auth

Redis server authentication password.

### session_redis_server_db

Redis server database index.

Default: `0`

### session_redis_persist

Enable Redis persistent connections.

Default: `true`

### Example

```php title="configuration.php"
public $session_handler            = 'redis';
public $lifetime                   = 60;
public $shared_session             = true;
public $session_metadata           = false;
public $session_metadata_for_guest = false;
public $session_filesystem_path    = '/var/www/sessions';

public $session_memcached_server_host = '127.0.0.1';
public $session_memcached_server_port = 22122;
public $session_memcached_server_id   = 'joomla'

public $session_redis_server_host = '127.0.0.1';
public $session_redis_server_port = 9736;
public $session_redis_server_auth = 'redis_password';
public $session_redis_server_db   = 1;
public $session_redis_persist     = false;
```

## Site

### sitename

The name of the website.

### editor

The default editor for content creation: `tinymce`, `codemirror`, `none`.

Default: `tinymce`

### captcha

The default Captcha.

### list_limit

The number of items displayed per page in the admin panel.

Default: `20`

### live_site

The full URL of the site (optional).

### secret

A secret key used for security purposes.

### force_ssl

Force SSL/TLS for the site or admin area: `0` (none), `1` (admin), `2` (entire site).

Default: `0`

### access

The default access level for newly created items: `1` (public), `2` (registered), `3` (special), `5` (guest), `6` (super users).

Default: `1`

### frontediting

Enable frontend editing: `0` (none), `1` (modules), `2` (modules &amp; menus)

Default: `1`

### helpurl

Help URL.

Default: `https://help.joomla.org/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}`

### asset_id

Asset ID.

Default: `1`

### offline

Enable offline mode.

### offline_message

The message that will be displayed on the site when the site is offline.

Default: `This site is down for maintenance.<br> Please check back again soon.`

### display_offline_message

Display offline message: `0` (hide), `1` (custom message), `2` (default message).

Default: `1`

### offline_image

The image that will be displayed when the site is offline.

### feed_limit

The number of content items to be shown in any RSS news feeds set up on the website.

Default: `10`

### feed_email

Feed email: `none`, `author`, `site`.

Default: `none`

### cookie_domain

Cookie domain.

### cookie_path

Cookie path.

### Example

```php title="configuration.php"
public $sitename     = 'My Joomla Site';
public $editor       = 'codemirror';
public $captcha      = 1;
public $list_limit   = 50;
public $live_site    = 'https://www.example.com';
public $secret       = 'your_secret_key';
public $force_ssl    = 2;
public $access       = 2;
public $frontediting = 2;
public $helpurl      = 'https://example.com/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}';
public $asset_id     = 42;

public $offline                 = true;
public $offline_message         = 'Maintenance';
public $display_offline_message = 2;
public $offline_image           = 'images/offline.png';

public $feed_limit = 20;
public $feed_email = 'author';

public $cookie_domain = 'example.com';
public $cookie_path   = '/subfolder';
```
