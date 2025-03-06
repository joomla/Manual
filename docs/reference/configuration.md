---
title: Configuration
---

Configuration
=============

## Caching

### caching

Enable caching: `0` (disabled), `1` (conservative), `2` (progressive).

Default: `0`

Env: `JOOMLA_CACHING`

### cache_handler

The caching mechanism used: `file`, `apcu`, `memcached`, `redis`.

Default: `file`

Env: `JOOMLA_CACHE_HANDLER`

### cachetime

The time (in minutes) before cached content expires.

Default: `15`

Env: `JOOMLA_CACHE_TIME`

### cache_platformprefix

Enable platform prefix for caching.

Default: `false`

Env: `JOOMLA_CACHE_PLATFORM_PREFIX`

### memcached_server_host

Memcached server hostname or IP address.

Default: `localhost`

Env: `JOOMLA_CACHE_MEMCACHED_SERVER_HOST`

### memcached_server_port

Memcached server port.

Default: `11211`

Env: `JOOMLA_CACHE_MEMCACHED_SERVER_PORT`

### memcached_persist

Enable Memcached persistent connections.

Default: `false`

Env: `JOOMLA_CACHE_MEMCACHED_PERSIST`

### memcached_compress

Enable Memcached compression.

Default: `false`

Env: `JOOMLA_CACHE_MEMCACHED_COMPRESS`

### redis_server_host

Redis server hostname or IP address.

Default: `localhost`

Env: `JOOMLA_CACHE_REDIS_SERVER_HOST`

### redis_server_port

Redis server port.

Default: `6379`

Env: `JOOMLA_CACHE_REDIS_SERVER_PORT`

### redis_server_auth

Redis server authentication key.

Env: `JOOMLA_CACHE_REDIS_SERVER_AUTH`

### redis_server_db

Redis database index.

Default: `0`

Env: `JOOMLA_CACHE_REDIS_SERVER_DB`

### redis_persist

Enable Redis persistent connections.

Default: `false`

Env: `JOOMLA_CACHE_REDIS_PERSIST`

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

```env title=".env"
JOOMLA_CACHING=1
JOOMLA_CACHE_HANDLER=redis
JOOMLA_CACHE_TIME=60
JOOMLA_CACHE_PLATFORM_PREFIX=true

JOOMLA_CACHE_MEMCACHED_SERVER_HOST=127.0.0.1
JOOMLA_CACHE_MEMCACHED_SERVER_PORT=22122
JOOMLA_CACHE_MEMCACHED_PERSIST=true
JOOMLA_CACHE_MEMCACHED_COMPRESS=true

JOOMLA_CACHE_REDIS_SERVER_HOST=127.0.0.1
JOOMLA_CACHE_REDIS_SERVER_PORT=9736
JOOMLA_CACHE_REDIS_SERVER_AUTH=redis_secret
JOOMLA_CACHE_REDIS_SERVER_DB=1
JOOMLA_CACHE_REDIS_PERSIST=true
```

## Cookie

### cookie_domain

Cookie domain.

Env: `JOOMLA_COOKIE_DOMAIN`

### cookie_path

Cookie path.

Env: `JOOMLA_COOKIE_PATH`

### Example

```php title="configuration.php"
public $cookie_domain = 'example.com';
public $cookie_path   = '/subfolder';
```

```env title=".env"
JOOMLA_COOKIE_DOMAIN=example.com
JOOMLA_COOKIE_PATH=/subfolder
```

## CORS

### cors

Enable CORS.

Default: `false`

Env: `JOOMLA_CORS`

### cors_allow_headers

HTTP headers that are allowed in response to a preflight request.

Default: `Content-Type,X-Joomla-Token`

Env: `JOOMLA_CORS_ALLOW_HEADERS`

### cors_allow_methods

HTTP methods (e.g., GET, POST, PUT) that are permitted for cross-origin requests.

Default: `''` (all methods available for the requested route)

Env: `JOOMLA_CORS_ALLOW_METHODS`

### cors_allow_origin

Origins (domains) that are allowed to access the resource.

Default: `*`

Env: `JOOMLA_CORS_ALLOW_ORIGIN`

### Example

```php title="configuration.php"
public $cors               = true;
public $cors_allow_headers = 'Content-Type,X-Joomla-Token,Authorization';
public $cors_allow_methods = 'GET,POST';
public $cors_allow_origin  = 'https://example.com,https://another-domain.com';
```

```env title=".env"
JOOMLA_CORS=true
JOOMLA_CORS_ALLOW_HEADERS='Content-Type,X-Joomla-Token,Authorization'
JOOMLA_CORS_ALLOW_METHODS='GET,POST'
JOOMLA_CORS_ALLOW_ORIGIN='https://example.com,https://another-domain.com'
```

## Database

### dbtype

The type of database used: `mysqli`, `mysql`, `pgsql`.

Default: `mysqli`

Env: `JOOMLA_DB_TYPE`

### host

The database hostname or IP address.

Default: `localhost`

Env: `JOOMLA_DB_HOST`

### user

The username for the database.

Env: `JOOMLA_DB_USER`

### password

The password for the database.

Env: `JOOMLA_DB_PASSWORD`

### db

The name of the database.

Env: `JOOMLA_DB_NAME`

### dbprefix

The prefix for database tables.

Default: `jos_`

Env: `JOOMLA_DB_PREFIX`

### dbencryption

Encrypt database connections: `0` (server controlled), `1` (one-way), `2` (two-way).

Default: `0`

Env: `JOOMLA_DB_ENCRYPTION`

### dbsslverifyservercert

Verify server certificate during SSL/TLS connection.

Default: `false`

Env: `JOOMLA_DB_SSL_VERIFY_SERVER_CERT`

### dbsslkey

The path to the SSL/TLS key file used for database connections.

Env: `JOOMLA_DB_SSL_KEY`

### dbsslcert

The path to the SSL/TLS certificate file used for database connections.

Env: `JOOMLA_DB_SSL_CERT`

### dbsslca

The path to the CA certificate file used for verifying the server's identity.

Env: `JOOMLA_DB_SSL_CA`

### dbsslcipher

The cipher suite to use for SSL/TLS connections.

Env: `JOOMLA_DB_SSL_CIPHER`

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

```env title=".env"
JOOMLA_DB_TYPE=pgsql
JOOMLA_DB_HOST=127.0.0.1
JOOMLA_DB_USER=joomla_user
JOOMLA_DB_PASSWORD=securepassword123
JOOMLA_DB_NAME=joomla_db
JOOMLA_DB_PREFIX=xyz_

JOOMLA_DB_ENCRYPTION=1
JOOMLA_DB_SSL_VERIFY_SERVER_CERT=true
JOOMLA_DB_SSL_KEY=/path/to/your/key.crt.pem
JOOMLA_DB_SSL_CERT=/path/to/your/certificate.pem
JOOMLA_DB_SSL_CA=/path/to/ca_certificate.pem
JOOMLA_DB_SSL_CIPHER=ECDHE-RSA-AES256-GCM-SHA384
```

## Debug

### debug

Enable debug mode.

Default: `false`

Env: `JOOMLA_DEBUG`

### debug_lang

Enable language debug mode.

Default: `false`

Env: `JOOMLA_DEBUG_LANG`

### debug_lang_const

Enable language constants debug mode.

Default: `true`

Env: `JOOMLA_DEBUG_LANG_CONST`

### error_reporting

The level of error reporting: `default`, `simple`, `maximum`, `none`.

Env: `JOOMLA_ERROR_REPORTING`

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

Env: `JOOMLA_LOG_PATH`

### log_categories

Log categories: `databasequery`, `deprecated`, `deprecation-notes`, `system` and etc.

File: `${log_path}/custom-logging.php`

Env: `JOOMLA_LOG_CATEGORIES`

### log_category_mode

Log category mode: `0` (include), `1` (exclude).

Default: `0`

Env: `JOOMLA_LOG_CATEGORY_MODE`

### log_deprecated

Log deprecations.

File: `${log_path}/deprecated.php`

Default: `0`

Env: `JOOMLA_LOG_DEPRECATED`

### log_everything

Log almost everything.

File: `${log_path}/everything.php`

Default: `0`

Env: `JOOMLA_LOG_EVERYTHING`

### log_priorities

Log priorities.

Default: `array('0' => 'all')`.

Env: `JOOMLA_LOG_PRIORITIES` (JSON format)

### Example

```php title="configuration.php"
public $log_path          = '/var/www/html/administrator/logs';
public $log_categories    = 'databasequery';
public $log_category_mode = 1;
public $log_deprecated    = 1;
public $log_everything    = 1;
public $log_priorities    = array('0' => 'critical', '1' => 'emergency');
```

```env title=".env"
JOOMLA_LOG_PATH=/var/www/html/administrator/logs
JOOMLA_LOG_CATEGORIES=databasequery
JOOMLA_LOG_CATEGORY_MODE=1
JOOMLA_LOG_DEPRECATED=1
JOOMLA_LOG_EVERYTHING=1
JOOMLA_LOG_PRIORITIES='{"0":"critical","1":"emergency"}'
```

## Mail

### mailonline

Enable email sending.

Default: `true`

Env: `JOOMLA_MAIL_ONLINE`

### mailer

The method used to send emails: `mail`, `sendmail`, `smtp`.

Env: `JOOMLA_MAIL_MAILER`

### mailfrom

The email address used to send emails.

Env: `JOOMLA_MAIL_FROM`

### fromname

The name displayed in the "From" field of emails.

Env: `JOOMLA_MAIL_FROMNAME`

### massmailoff

Disable mass mailings.

Default: `false`

Env: `JOOMLA_MAIL_MASSMAIL_OFF`

### sendmail

Path to sendmail binary.

Default: `/usr/sbin/sendmail`

Env: `JOOMLA_SENDMAIL`

### smtphost

The SMTP server hostname or IP address.

Env: `JOOMLA_SMTP_HOST`

### smtpport

The port used for SMTP.

Default: `25`

Env: `JOOMLA_SMTP_PORT`

### smtpauth

Enable SMTP authentication.

Default: `false`

Env: `JOOMLA_SMTP_AUTH`

### smtpuser

The username for SMTP authentication.

Env: `JOOMLA_SMTP_USER`

### smtppass

The password for SMTP authentication.

Env: `JOOMLA_SMTP_PASS`

### smtpsecure

The encryption method for SMTP: `none`, `ssl`, `tls`.

Default: `none`

Env: `JOOMLA_SMTP_SECURE`

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

```env title=".env"
JOOMLA_MAIL_ONLINE=false
JOOMLA_MAIL_MAILER=smtp
JOOMLA_MAIL_FROM=admin@example.com
JOOMLA_MAIL_FROMNAME='My Joomla Site'
JOOMLA_MAIL_MASSMAIL_OFF=true
JOOMLA_SENDMAIL=/usr/local/sbin/sendmail

JOOMLA_SMTP_HOST=smtp.example.com
JOOMLA_SMTP_PORT=465
JOOMLA_SMTP_AUTH=true
JOOMLA_SMTP_USER=smtp_user
JOOMLA_SMTP_PASS=smtp_password
JOOMLA_SMTP_SECURE=tls
```

## Metadata

### MetaDesc

Site meta description.

Env: `JOOMLA_META_DESC`

### MetaAuthor

Show author meta tag.

Default: `true`

Env: `JOOMLA_META_AUTHOR`

### MetaVersion

Show Joomla version in generator meta tag.

Default: `false`

Env: `JOOMLA_META_VERSION`

### MetaRights

Content rights meta tag value.

Env: `JOOMLA_META_RIGHTS`

### robots

Robots meta tag value.

Default: `index, follow`

Env: `JOOMLA_META_ROBOTS`

### Example

```php title="configuration.php"
public $MetaDesc    = 'Joomla!';
public $MetaAuthor  = false;
public $MetaVersion = true;
public $MetaRights  = 'Public Domain';
public $robots      = 'noindex, nofollow';
```

```env title=".env"
JOOMLA_META_DESC=Joomla!
JOOMLA_META_AUTHOR=false
JOOMLA_META_VERSION=true
JOOMLA_META_RIGHTS='Public Domain'
JOOMLA_META_ROBOTS='noindex, nofollow'
```

## Proxy

### proxy_enable

Enable HTTP proxy.

Default: `false`

Env: `JOOMLA_PROXY_ENABLE`

### proxy_host

The HTTP proxy hostname or IP address.

Env: `JOOMLA_PROXY_HOST`

### proxy_port

HTTP proxy port.

Env: `JOOMLA_PROXY_PORT`

### proxy_user

HTTP proxy user.

Env: `JOOMLA_PROXY_USER`

### proxy_pass

HTTP proxy password.

Env: `JOOMLA_PROXY_PASS`

### Example

```php title="configuration.php"
public $proxy_enable = true;
public $proxy_host   = 'example.com';
public $proxy_port   = 8080;
public $proxy_user   = 'proxy_user';
public $proxy_pass   = 'proxy_password';
```

```env title=".env"
JOOMLA_PROXY_ENABLE=true
JOOMLA_PROXY_HOST=example.com
JOOMLA_PROXY_PORT=8080
JOOMLA_PROXY_USER=proxy_user
JOOMLA_PROXY_PASS=proxy_password
```

## SEO

### sef

Enable search engine friendly URLs.

Default: `true`.

Env: `JOOMLA_SEF`

### sef_rewrite

Enable URL rewriting.

Default: `false`.

Env: `JOOMLA_SEF_REWRITE`

### sef_suffix

Add an `.html` suffix to URLs.

Default: `false`.

Env: `JOOMLA_SEF_SUFFIX`

### unicodeslugs

Allow Unicode in slugs.

Default: `false`

Env: `JOOMLA_SEF_UNICODESLUGS`

### sitename_pagetitles

Append the site name to the `<title>` tag of each page header: `0` (no), `1` (after), `2` (before).

Default: `0`.

Env: `JOOMLA_SITENAME_PAGETITLES`

### Example

```php title="configuration.php"
public $sef                 = false;
public $sef_rewrite         = true;
public $sef_suffix          = true;
public $unicodeslugs        = true;
public $sitename_pagetitles = 2;
```

```env title=".env"
JOOMLA_SEF=false
JOOMLA_SEF_REWRITE=true
JOOMLA_SEF_SUFFIX=true
JOOMLA_SEF_UNICODESLUGS=true
JOOMLA_SITENAME_PAGETITLES=2
```

## Server

### force_ssl

Force SSL/TLS for the site or admin area: `0` (none), `1` (admin), `2` (entire site).

Default: `0`

Env: `JOOMLA_FORCE_SSL`

### gzip

Enable GZIP compression.

Default: `false`.

Env: `JOOMLA_GZIP`

### live_site

The full URL of the site (optional).

Env: `JOOMLA_LIVE_SITE`

### offset

The server's timezone offset.

Default: `UTC`.

Env: `JOOMLA_TIMEZONE`

### secret

A secret key used for security purposes.

Env: `JOOMLA_SECRET`

### tmp_path

The path to the temporary directory.

Default: `/tmp`.

Env: `JOOMLA_TMP_PATH`

### Example

```php title="configuration.php"
public $force_ssl = 2;
public $gzip      = true;
public $live_site = 'https://www.example.com';
public $offset    = 'Asia/Vladivostok';
public $secret    = 'your_secret_key';
public $tmp_path  = '/var/www/html/tmp';
```

```env title=".env"
JOOMLA_FORCE_SSL=2
JOOMLA_GZIP=true
JOOMLA_LIVE_SITE=https://www.example.com
JOOMLA_SECRET=your_secret_key
JOOMLA_TIMEZONE='Asia/Vladivostok'
JOOMLA_TMP_PATH=/var/www/html/tmp
```

## Session

### session_handler

The method used to handle sessions: `file`, `database`, `memcached`, `redis`.

Default: `database`

Env: `JOOMLA_SESSION_HANDLER`

### lifetime

Session lifetime (in minutes).

Default: `15`

Env: `JOOMLA_SESSION_LIFETIME`

### shared_session

Share session between public and administrator areas of the site.

Default: `false`

Env: `JOOMLA_SESSION_SHARED`

### session_metadata

Track session metadata.

Default: `true`

Env: `JOOMLA_SESSION_METADATA`

### session_metadata_for_guest

Track guest session metadata.

Default: `true`

Env: `JOOMLA_SESSION_METADATA_FOR_GUEST`

### session_filesystem_path

Path for session files.

Env: `JOOMLA_SESSION_FILESYSTEM_PATH`

### session_memcached_server_host

Memcached server hostname or IP address.

Default: `localhost`

Env: `JOOMLA_SESSION_MEMCACHED_SERVER_HOST`

### session_memcached_server_port

Memcached server port.

Default: `11211`

Env: `JOOMLA_SESSION_MEMCACHED_SERVER_PORT`

### session_memcached_server_id

Memcached server identity.

Default: `joomla_cms`

Env: `JOOMLA_SESSION_MEMCACHED_SERVER_ID`

### session_redis_server_host

Redis server hostname or IP address.

Default: `localhost`

Env: `JOOMLA_SESSION_REDIS_SERVER_HOST`

### session_redis_server_port

Redis server port.

Default: `6379`

Env: `JOOMLA_SESSION_REDIS_SERVER_PORT`

### session_redis_server_auth

Redis server authentication password.

Env: `JOOMLA_SESSION_REDIS_SERVER_AUTH`

### session_redis_server_db

Redis server database index.

Default: `0`

Env: `JOOMLA_SESSION_REDIS_SERVER_DB`

### session_redis_persist

Enable Redis persistent connections.

Default: `true`

Env: `JOOMLA_SESSION_REDIS_PERSIST`

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

```env title=".env"
JOOMLA_SESSION_HANDLER=redis
JOOMLA_SESSION_LIFETIME=60
JOOMLA_SESSION_SHARED=true
JOOMLA_SESSION_METADATA=false
JOOMLA_SESSION_METADATA_FOR_GUEST=false

JOOMLA_SESSION_FILESYSTEM_PATH=/var/www/sessions

JOOMLA_SESSION_MEMCACHED_SERVER_HOST=127.0.0.1
JOOMLA_SESSION_MEMCACHED_SERVER_PORT=22122
JOOMLA_SESSION_MEMCACHED_SERVER_ID=joomla

JOOMLA_SESSION_REDIS_SERVER_HOST=127.0.0.1
JOOMLA_SESSION_REDIS_SERVER_PORT=9736
JOOMLA_SESSION_REDIS_SERVER_AUTH=redis_password
JOOMLA_SESSION_REDIS_SERVER_DB=1
JOOMLA_SESSION_REDIS_PERSIST=false
```

## Site

### sitename

The name of the website.

Env: `JOOMLA_SITE_NAME`

### editor

The default editor for content creation: `tinymce`, `codemirror`, `none`.

Default: `tinymce`

Env: `JOOMLA_SITE_EDITOR`

### captcha

The default Captcha.

Env: `JOOMLA_SITE_CAPTCHA`

### list_limit

The number of items displayed per page in the admin panel.

Default: `20`

Env: `JOOMLA_SITE_LIST_LIMIT`

### access

The default access level for newly created items: `1` (public), `2` (registered), `3` (special), `5` (guest), `6` (super users).

Default: `1`

Env: `JOOMLA_SITE_ACCESS`

### frontediting

Enable frontend editing: `0` (none), `1` (modules), `2` (modules &amp; menus)

Default: `1`

Env: `JOOMLA_SITE_FRONT_EDITING`

### helpurl

Help URL.

Default: `https://help.joomla.org/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}`

Env: `JOOMLA_HELPURL`

### behind_loadbalancer

Behind load balancer.

Default: `false`.

Env: `JOOMLA_SITE_BEHIND_LOADBALANCER`

### offline

Enable offline mode.

Env: `JOOMLA_SITE_OFFLINE`

### offline_message

The message that will be displayed on the site when the site is offline.

Default: `This site is down for maintenance.<br> Please check back again soon.`

Env: `JOOMLA_SITE_OFFLINE_MESSAGE`

### display_offline_message

Display offline message: `0` (hide), `1` (custom message), `2` (default message).

Default: `1`

Env: `JOOMLA_SITE_OFFLINE_MESSAGE_DISPLAY`

### offline_image

The image that will be displayed when the site is offline.

Env: `JOOMLA_SITE_OFFLINE_IMAGE`

### feed_limit

The number of content items to be shown in any RSS news feeds set up on the website.

Default: `10`

Env: `JOOMLA_SITE_FEED_LIMIT`

### feed_email

Feed email: `none`, `author`, `site`.

Default: `none`

Env: `JOOMLE_SITE_FEED_EMAIL`

### Example

```php title="configuration.php"
public $sitename            = 'My Joomla Site';
public $editor              = 'codemirror';
public $captcha             = 1;
public $list_limit          = 50;
public $access              = 2;
public $frontediting        = 2;
public $helpurl             = 'https://example.com/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}';
public $behind_loadbalancer = true;

public $offline                 = true;
public $offline_message         = 'Maintenance';
public $display_offline_message = 2;
public $offline_image           = 'images/offline.png';

public $feed_limit = 20;
public $feed_email = 'author';
```

```env title=".env"
JOOMLA_SITE_NAME='My Joomla Site'
JOOMLA_SITE_EDITOR=codemirror
JOOMLA_SITE_CAPTCHA=1
JOOMLA_SITE_LIST_LIMIT=50
JOOMLA_SITE_ACCESS=2
JOOMLA_SITE_FRONT_EDITING=2
JOOMLA_HELPURL='https://example.com/proxy?keyref=Help{major}{minor}:{keyref}&lang={langcode}'
JOOMLA_SITE_BEHIND_LOADBALANCER=true

JOOMLA_SITE_OFFLINE=true
JOOMLA_SITE_OFFLINE_MESSAGE=Maintenance
JOOMLA_SITE_OFFLINE_MESSAGE_DISPLAY=2
JOOMLA_SITE_OFFLINE_IMAGE=images/offline.png

JOOMLA_SITE_FEED_LIMIT=20
JOOMLE_SITE_FEED_EMAIL=author
```
