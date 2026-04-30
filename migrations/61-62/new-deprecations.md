---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

This page lists all the new deprecations you should be aware of and what you should now be using instead.

### MailTemplate static functions deprecated

PR: [47677](https://github.com/joomla/joomla-cms/pull/47717)
Files: 
- `libraries/src/Mail/MailTemplate.php`
Description:
The following static functions in the `MailTemplate` have been deprecated and will be removed without replacement in 8.0:
- `getTemplate`
- `createTemplate`
- `updateTemplate`
- `deleteTemplate`

```php
// Old code
MailTemplate::getTemplate(...);

// New code:
Factory::getApplication()->bootComponent('com_mails')->getMVCFactory()->createModel('Template', 'Administrator')->getTemplate();

// Old code
MailTemplate::createTemplate(...);

// New code:
Factory::getApplication()->bootComponent('com_mails')->getMVCFactory()->createModel('Template', 'Administrator')->save();

// Old code
MailTemplate::updateTemplate(...);

// New code:
Factory::getApplication()->bootComponent('com_mails')->getMVCFactory()->createModel('Template', 'Administrator')->save();

// Old code
MailTemplate::deleteTemplate(...);

// New code:
Factory::getApplication()->bootComponent('com_mails')->getMVCFactory()->createModel('Template', 'Administrator')->delete();
```
