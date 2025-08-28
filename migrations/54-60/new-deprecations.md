---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.


### Application input property is deprecated

PR: [46000](https://github.com/joomla/joomla-cms/pull/46000)
Files: 
- `libraries/vendor/joomla/application/src/AbstractWebApplication.php`
- `libraries/src/Application/WebApplication.php`
Description:
The `input` property is deprecated in the AbstractWebApplication class since Joomla 4.0, but it was not really obvious in the CMS classes because of class hierarchy. Access to the `input` property got now removed in the framework class but is still available in the CMS classes. It will trigger a deprecated warning when directly called.

```php
// Old code
$app->input->get('foo');
Factory::getApplication()->input->get('foo');

// New:
$app->getInput()->get('foo');
Factory::getApplication()->getInput()->get('foo');
```
