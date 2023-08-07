---
title: JConfig Example
sidebar_position: 3
---
# JConfig Example
Early in its initialisation phase Joomla initialises the dependency injection container (DIC) by calling `createContainer()` which is in library/src/Factory.php. This results in the `register()` function being called in each of the class files in libraries/src/Service/Provider. By looking through those files you can see what gets put into the DIC upon initialisation. 

Let's look at library/src/Service/Provider/Config.php, which sets up the configuration class `JConfig`. Here's what gets executed when the `register()` function is called:
```php
$container->alias('config', 'JConfig')
    ->share(
        'JConfig',
        function (Container $container) {
            if (!is_file(JPATH_CONFIGURATION . '/configuration.php')) {
                return new Registry();
            }

            \JLoader::register('JConfig', JPATH_CONFIGURATION . '/configuration.php');

            if (!class_exists('JConfig')) {
                throw new \RuntimeException('Configuration class does not exist.');
            }

            return new Registry(new \JConfig());
        },
        true
    );
```
Here's an explanation of the code:
```php
$container->alias('config', 'JConfig')
```
This sets up an alias in the DIC so that you can call `$container->get('config')` as well as `$container->get('JConfig')`. Notice that the return value of this function is again the `$container` so that you can chain function calls. 

Next there's a call to `share()` passing 3 parameters:
1. the string 'JConfig'
2. a function which returns something, which will look at shortly
3. `true` – for the `protected` parameter, which means that if another call is made to try and put an entry with key 'JConfig' into the DIC then it will be rejected (rather than overwriting this entry).

Remember that `share()` is the same as `set()` with the `shared` parameter set to `true`, so that the same class instance is going to be returned for each `get('JConfig')` call.

When some part of the Joomla code calls 
```php
$container->get('JConfig')
```
then the function passed as parameter 2 above will be executed. 

The Joomla global configuration is held in the `JConfig` class in configuration.php in the top level folder of your Joomla instance, so that function does the following:
1. Checks if configuration.php exists, and if it doesn't just return an empty set of configuration data
2. Registers the 'JConfig' class in configuration.php, so that the autoloader knows where to find it
3. Checks if the class exist – this will force PHP to call the Joomla autoloader function, which will then do a `require` of configuration.php. If the `JConfig` class still doesn't exist, then an exception will be raised.
4. The `JConfig` class is instantiated, and passed into a Registry object which is then returned.

As this DIC entry is shared, the Registry instance will be stored in the DIC and will be returned on subsequent calls to `get('JConfig')`.

So you can obtain the global configuration parameters by 
```php
use Joomla\CMS\Factory;
$container = Factory::getContainer();
$container->get('JConfig');   // or ...
$container->get('config');
```
These calls go directly to the DIC to obtain the shared JConfig instance.

Or you can obtain them via the Application instance, which has already got them from the DIC:
```php
use Joomla\CMS\Factory;
$application = Factory::getApplication();
$application->getConfig();   // or, to get a particular parameter:
$application->get($paramName, $defaultValue);
```
