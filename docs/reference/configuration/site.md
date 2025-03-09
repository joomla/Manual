---
title: Site
---

Site Settings
=============

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
