---
title: Mail
---

Mail Settings
=============

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
