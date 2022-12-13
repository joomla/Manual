---
sidebar_position: 2
---

New deprecations
===============
All the new deprecations that should be aware of and what you should now be using instead.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

### Joomla\CMS\Extension\PluginInterface to no longer extend Joomla\Event\DispatcherAwareInterface
In 6.0 `Joomla\CMS\Extension\PluginInterface` will no longer extend `Joomla\Event\DispatcherAwareInterface`. An instance of `Joomla\Event\DispatcherInterface` must be passed to `Joomla\CMS\Extension\PluginInterface::registerListeners()` instead. This applies to the `Joomla\CMS\Plugin\CMSPlugin` implementation too.

### Joomla\CMS\Plugin\CMSPlugin::__construct() to longer accept an instance of Joomla\Event\DispatcherInterface
In 6.0 passing an instance of `Joomla\Event\DispatcherInterface` as the first argument to `Joomla\CMS\Plugin\CMSPlugin::__construct()` will not be supported. An instance of `Joomla\Event\DispatcherInterface` must be passed to `Joomla\CMS\Plugin\CMSPlugin::registerListeners()` instead.

### Joomla\CMS\Plugin\CMSPlugin::registerLegacyListener() and Joomla\CMS\Plugin\CMSPlugin::registerListeners() deprecated
`Joomla\CMS\Plugin\CMSPlugin::registerLegacyListener()` and `Joomla\CMS\Plugin\CMSPlugin::registerListener()` methods are deprecated and will be removed in 6.0. Listeners must be registered with the event dispatcher in the `registerListeners()` method.

### Joomla\CMS\Plugin\PluginHelper::importPlugin() signature change
In 6.0 the fourth argument of `Joomla\CMS\Plugin\PluginHelper::importPlugin()` will no longer be optional and will require an instance of `Joomla\Event\DispatcherInterface`. Therefore, preceding arguments will become mandatory. Method calls must be updated accordingly, for example:

```php
Joomla\CMS\Plugin\PluginHelper::importPlugin('system', null, true, $dispatcher);
```

### Joomla\CMS\Plugin\PluginHelper::import() signature change
In 6.0 the third argument of `Joomla\CMS\Plugin\PluginHelper::import()` will not longer be optional and will require an instance of `Joomla\Event\DispatcherInterface`. Therefore, preceding arguments will become mandatory.
