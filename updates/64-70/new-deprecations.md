---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

:::tip[Reader Note]
  No deprecations have been introduced in Joomla 7.0 yet
:::

## Indexer `Adapter` db property needs to be injected in constructor
- PR: https://github.com/joomla/joomla-cms/pull/47906
- Files: 
  - /administrator/components/com_finder/src/Indexer/Adapter.php
  - /administrator/components/com_finder/src/Indexer/DebugAdapter.php
- Description: The `$db` property needs to be injected in the constructor in finder plugins which extend the `Adapter` class. In provider.php of the finder plugin change:
```php
// Old:
$plugin = new Foo(
	(array) PluginHelper::getPlugin('finder', 'foo')
);
$plugin->setApplication(Factory::getApplication());
$plugin->setDatabase($container->get(DatabaseInterface::class));

// New:
$plugin = new Foo(
	(array) PluginHelper::getPlugin('finder', 'foo'),
	$container->get(DatabaseInterface::class)
);
$plugin->setApplication(Factory::getApplication());
