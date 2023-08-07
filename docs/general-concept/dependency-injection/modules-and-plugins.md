---
title: Modules and Plugins
sidebar_position: 6
---
# Modules and Plugins
The service provider files for modules and plugins are considerably more straightforward than those for components. If you look through your Joomla instance modules and plugins folders then you'll find several examples of services/provider.php files.

## Modules
For example, for mod_breadcrumbs in Joomla 5 we have:
```php
use Joomla\CMS\Extension\Service\Provider\Module;

public function register(Container $container): void
{
    $container->registerServiceProvider(new ModuleDispatcherFactory('\\Joomla\\Module\\Breadcrumbs'));
    $container->registerServiceProvider(new HelperFactory('\\Joomla\\Module\\Breadcrumbs\\Site\\Helper'));

    $container->registerServiceProvider(new Module());
}
```
This module uses the standard Joomla\CMS\Extension\Service\Provider\Module class to generate its extension class \Joomla\CMS\Extension\Module. 

It has 2 dependencies:
1. It uses a ModuleDispatcherFactory class to instantiate its own Dispatcher.php in src/Dispatcher/Dispatcher.php
2. It uses a HelperFactory to find its helper file in src/Helper/BreadcrumbsHelper.php

## Plugins
For example for the custom field color plugin in plugins/fields/color
```php
use Joomla\Plugin\Fields\Color\Extension\Color;

public function register(Container $container)
{
    $container->set(
        PluginInterface::class,
        function (Container $container) {
            $plugin     = new Color(
                $container->get(DispatcherInterface::class),
                (array) PluginHelper::getPlugin('fields', 'color')
            );
            $plugin->setApplication(Factory::getApplication());

            return $plugin;
        }
    );
}
```
The plugin's Extension class is Color, which gets instantiated with 2 parameters being passed into its constructor:
- the EventDispatcher class – this is obtained from the parent DIC, having been originally put into it from libraries/src/Service/Provider/Dispatcher.php when Joomla initialised
- the plugin stdClass object which Joomla has used to store plugin data (id, name, type and params).

This is a standard pattern that you can use for your own plugins. You can obviously get the Application instance by calling `Factory::getApplication` either in the services/provider.php file or in your standard plugin code. 