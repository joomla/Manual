---
title: Extension and Dispatcher Classes for Modules
sidebar_position: 3
---
# Extension and Dispatcher Classes for Modules
The Extension and Dispatcher classes for modules perform a similar role to those for components, but they're simpler because Joomla instantiates these classes just for the purpose of executing the module to capture the output (aka rendering the module). 

The Extension class instance is accessed in a similar way 
```php
$module = $app->bootModule($moduleName, $applicationName);
```
where `$moduleName` is the name of the module (eg 'mod_example') and `$applicationName` is 'site' or 'administrator'.

The default module Extension class is defined in libraries/src/Extension/Module.php, and really just provides a mechanism to get to other classes:
- the Dispatcher class (via a DispatcherFactory object), and,
- the module's own helper class (via a HelperFactory object)

Similar to components, the module Dispatcher class contains the `dispatch()` function, which is used to run the module's code.
```php
$module->getDispatcher($mod, $app)->dispatch();
```
Here `$mod` is a PHP stdClass object representing the module, including data such as the module name, module id, module title, template position, and `$app` is the Application instance.

The default module Dispatcher class is defined in libraries/src/Dispatcher/ModuleDispatcher.php

The Joomla code within the Dispatcher class makes available to the module copies of a number of key data items (which the module may find useful to have):
- the module stdClass described above
- the Application instance
- the Input data – the query parameters associated with the URL (`option`, `view`, etc)
- params – the module's params
- template –  the name of the template

Unlike in Joomla 3, from Joomla 4 these data items are copies, so if you change them you're not changing the original data items. 

In general you're likely to find that you can use the default module Extension and Dispatcher classes, and you can just provide (eg for mod_example)
- the module manifest XML file – mod_example.xml
- the module entry point file – mod_example.php, just containing PHP code rather than a class
- a module helper file (with code to obtain the required data) – a namespaced class under src/Helper/
- a tmpl file containing the HTML to output – under tmpl/, eg tmpl/default.php