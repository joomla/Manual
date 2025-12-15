---
title: Logging
---

Logging
=======

This section describes the Joomla logging framework, which enables extensions to log messages to files, etc.

You can use this feature for debugging your extensions, 
but more importantly for troubleshooting problems with your extensions in live operation.
For example, you can logon to a site where your extension is live, navigate through the site,
and view your extension's logged messages via a debug console, while other users of the site are unaffected.

There isn't a sample extension to download to demonstrate the functionality,
but you can easily use one of the [module tutorial](../building-extensions/modules/module-development-tutorial/index.md) steps
as the basis for experimenting with the functions described below.

Note that Joomla logging is different from Joomla Action Logs (which isn't covered here).

## Basic Logging

To log a message you use the static `add()` function of the Joomla\CMS\Log\Log class. For example: 

```php
use Joomla\CMS\Log\Log;
...
Log::add('my error message', Log::ERROR, 'my-extension-category');
```

The parameters are

- A message string - whatever you like. 
You can use language translation with these, for example, `Joomla\CMS\Language\Text::_('MY_EXTENSION_ERR_MSG')` 
(provided you have loaded your extension's language constants). 
You can also display the values of variables, provided you convert them into a string format. 

- A priority, which can be one of Log::EMERGENCY, Log::ALERT, Log::CRITICAL, Log::ERROR, Log::WARNING, Log::NOTICE, Log::INFO, Log::DEBUG.
These are based on the standard syslog / RFC 5424 severity levels – see the [wikipedia article on syslog](https://en.wikipedia.org/wiki/Syslog),
and defined in libraries/src/Log/Log.php.

- A category, which is just a text string. 
You can define whatever categories you like, but it is best to define them to avoid possible clashes with those of other extensions.
Using your extension's name is fine.

:::note
If you log a message with 'jerror' as the category then the message will also be displayed in the message area on the web page.
:::

The logging is controller by the administrator functionality, so to see the logged message you must switch logging on.

In the admin Global Configuration / Logging tab:

- ensure that the path to log folder is set (by default it's an absolute pathname pointing to administrator/logs). 

- set the Log Almost Everything switch to Yes. 

After logging the message in your code you should see it in the `everything.php` file. 
(All categories of messages except deprecation categories get logged in this file).

## Custom Logging

The `everything.php` file contains messages logged by all the software components of the Joomla instance. 
If just a subset is wanted then an administrator can use the Custom logging section on the Global Configuration / Logging tab.

Joomla will write to a file `custom-logging.php` any messages which:

- match any of the priorities in the Log Priorities field, and
- match any of a list of categories in the Log Categories field

when the Log Category Mode is set to Include.

(These messages are still written to `everything.php` as well).

So if you set your message category or categories to be similar to the name of your extension,
then you can easily get a log of your extension's messages, separate from all the others.

## Debug Console

Joomla debug is switched on/off on the Global Configuration / System tab,
and has the effect of setting the PHP global constant JDEBUG to true/false.

The debug console is configured via the System - Debug plugin,
and 2 parameters are particularly relevant here:

- Plugin tab, Allowed Groups specifies the user groups to which the debug console will be visible. 
An administrator could define a separate group for developers, 
so that when they log into a live site they are the only users who will see the debug console. 

- Logging tab, Log Entries specifies that log entries should be displayed within the debug console.

You can thus display more detailed diagnostic information than you would want to write to the log file
by wrapping your logging within a check for JDEBUG:

```php
if (JDEBUG)
{
    Log::add('my debug message', Log::DEBUG, 'my-extension-category');
}
```

## Logging to a Specific Log File

You can use `Log::addLogger()` to set up logging to an additional log file, 
filtering the log messages to be sent there by priority and/or category. 
The parameters of `Log::addLogger()` are:

- an array with configuration options – including the name of the log file
- the priority levels to be logged in that file
- an array of the categories to be logged in that file. 
(If parameter 4 is set to true, this array defines the categories which are NOT to be logged in the file.)
- an optional boolean specifying whether parameter 3 is an include list
(the default, P4 = false) or an exclude list (P4 = true).

For example, if you have developed a mod_example extension you could use the following: 

```php
Log::addLogger(
    array(
         // Sets file name
         'text_file' => 'mod_example.log.php'
    ),
    // Logs messages of CRITICAL and EMERGENCY priority in the file.
    Log::CRITICAL + Log::EMERGENCY,
    // The log category/categories which should be recorded in this file.
    // In this case, it's just the one category from our extension.
    // We still need to put it inside an array.
    array('mod_example')
);
```

The priority values are implemented as separate bits of an integer, 
so you can use bitwise operations to calculate the appropriate log levels. 
Log::All is a constant integer which has all the relevant bits set, 
so that all the Joomla priority levels are included. 

Then when you log a message, specify the category as 'mod_example', as in the example below 

```php
Log::add(Text::_('MOD_EXAMPLE_ERROR_MESSAGE_123'), Log::CRITICAL, 'mod_example');
```

This will result in your log message being written to mod_example.log.php. 
If the Global Configuration settings have "Log Almost Everything" set to Yes, 
the message will appear in the common `everything.php` log file as well. 

:::warning
  The administrator cannot switch off this logging to a specific file,
  so if you use it then you should consider how to avoid the log file growing uncontrollably.
:::

## Other addLogger options

In addition to the 'text_file' option described 
there are a number of other options which can be included in the array passed as the first parameter to `Log::addLogger()`

### text_entry_format

The entry 'text_entry_format', specifies the format of each line in your log file.

The default format is:   `'{DATETIME} {PRIORITY}      {CATEGORY}      {MESSAGE}'`

In addition, the following values can be used:

- `{CLIENTIP}`      (this is the IP address of the client)

- `{TIME}`

- `{DATE}`

### text_file_no_php

This specifies whether the log file is prepended with the usual prefix of: 

```php
#
#<?php die('Forbidden.'); ?>
```

By default it is set to false, and usually you should not set this to true. 
Log files should not be readable from the outside as they can provide valuable information about your system for attackers.

### text_file_path

Set this to store the log file somewhere other than the logging path configured in the Joomla global configuration.

## Logging to Other Places

As well as logging to files, you can log to other places as well, such as

- the Joomla message area

- just a simple echo statement.

The source code of the different loggers can be found in libraries/src/Log/Loggers.

To log a message to the Joomla message area:

```php
Log::addLogger(array('logger' => 'messagequeue'), Log::ALL, array('msg-error-cat'));
Log::add('an error to display', Log::ERROR, 'msg-error-cat');
```

To log a message as a simple echo statement:

```php
Log::addLogger(array('logger' => 'echo'), Log::ALL, array('msg-echo-cat'));
Log::add('echo this', Log::ERROR, 'msg-echo-cat');
```

## PSR-3 Logger

Joomla incorporates a logger which adheres to the [PSR-3 Logger Interface](https://www.php-fig.org/psr/psr-3/). 
This enables libraries which follow this standard recommendation to integrate with the Joomla logging system. To use this, first do: 

```php
use Joomla\CMS\Log\Log;
...
$psr3Logger = Log::createDelegatedLogger();
```

This returns an object on which you have available 
the methods of the PSR-3 LoggerInterface Psr\Log\LoggerInterface (in libraries/vendor/psr/log/src/LoggerInterface.php).

```php
$psr3Logger->critical("critical error text", array("category" => "mod_example"));
```

## Exceptions

Note that `Log::add()` will throw an exception if it can't write to the log file. 
