---
sidebar_position: 4
title: Class Autoloading
---
A Joomla instance contains thousands of PHP source files, with a comparable number of PHP classes. it's obviously impractical to do a `require` of every source file, to make the PHP interpreter aware of all the classes. How then can Joomla avoid getting a PHP Class not found fatal error when it tries to access a class which the PHP interpreter doesn't recognise? The answer is that it uses [class autoloading](https://www.php.net/manual/en/language.oop5.autoload.php).

When Joomla initialises it sets up (in libraries/loader.php `setup()`) a number of autoloaders using, for example:
```php
spl_autoload_register(['JLoader', 'loadByPsr']);
```

If the PHP interpreter encounters a line such as:
```php
if (class_exists($classname)) ...
``` 
and it doesn't recognise the name of the class then it will pass the class name to a registered autoloader and will call eg
```php
loadByPsr($classname)
```
passing the name of the class. From Joomla 4 onwards this should be a fully qualified classname.

The responsibility of the autoloader is to try and find the source file which contains that class, and perform an `include_once` on it, so that PHP then becomes aware of that class. For components, modules and plugins (both Joomla and third party extensions) Joomla uses the [PSR4](https://www.php-fig.org/psr/psr-4/) method of mapping class names to source files.

During initialisation Joomla looks through the components, modules and plugins directories for both the site and the administrator to find all the manifest XML files. It then loads the XML and looks for `<namespace>` elements, and from those elements builds a set of mappings of namespace prefixes to directories. As this involves quite a bit of work the result is cached in administrator/cache/autoload_psr4.php - go ahead and have a look at it!.

The `loadByPsr` function then uses this mapping and the PSR4 rules for finding source files described in [Finding classes with PSR4](./finding-classes-with-psr4.md) to determine the name of the file which should contain that class. It checks if the file exists and if so performs `include_once` on it, and returns. 

If the autoloader `loadByPsr` function has successfully found the class, then PHP treats the `class_exists($classname)` expression as now `true`, and continues down the code. If it was unsuccessful then PHP raises the class not found exception.

Joomla has a number of autoloader functions - not all classes are loaded using PSR4. For example libraries classes all have a mapping of FQN to the individual source file for that class - have a look through libraries/vendor/composer/autoload_classmap.php.

There is also a mapping (in libraries/classmap.php) from old global library names starting with J (eg JModelAdmin) to the FQN equivalents, but this disappears in Joomla 6.