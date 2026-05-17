---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

This page lists all the new deprecations you should be aware of and what you should now be using instead.

### MailTemplate accepts MailerInterface objects

PR: [47677](https://github.com/joomla/joomla-cms/pull/47677)
Files: 
- `libraries/src/Mail/MailTemplate.php`
Description:
The injected `mailer` property can be a `MailerInterface` to not enforce a `Mail` instance. Not injecting a mailer instance is deprecated and will be not supported anymore in 8.0.

```php
// Old code
$mail   = Factory::getMailer();
$mailer = new MailTemplate('com_foo.bar', $language, $mail);

// New:
$mail   = $this->getMailerFactory()->createMailer($config);
$mailer = new MailTemplate('com_foo.bar', $language, $mail);
```
