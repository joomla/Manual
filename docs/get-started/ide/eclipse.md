---
title: Eclipse
sidebar_position: 3
---
Eclipse
=======

This section explains how to install Eclipse together with Xdebug for developing with Joomla. As these products are both open source projects this option is free of charge. There are videos available online which show you how to install these products, but some of the key steps are explained below. It's assumed you have got an environment such as [WAMP](https://www.wampserver.com/) or [XAMPP](https://www.apachefriends.org/) running on your local machine, and that you're familiar with how to use it.

## Install Xdebug
Go to [xdebug.org](https://xdebug.org/), click on the Install menu item and follow the instructions for downloading and installing xdebug.

For example, for Windows using WAMP this will involve copying a .dll file down, moving it into the `/ext` directory below your php version folder, and renaming the file `php_xdebug.dll`.

If you have several versions of PHP on your machine then you'll need to copy this .dll file into each of the `/ext` subdirectories.

## Configure PHP
PHP is configured via the `php.ini` file, but WAMP for example uses a file `phpForApache.ini` to configure PHP when its handling web requests. Since you may be wanting to debug both:
- Joomla site and administrator applications (which may use `phpForApache.ini`) and
- Joomla command line applications (which use `php.ini`)

you should ensure that at least the following key lines of configuration are present in these `.ini` files. (And if you have multiple versions of PHP then the `.ini` files for each version must be configured):

```php
[DEBUG]
zend_extension="xdebug"
xdebug.mode=debug,develop
xdebug.log_level=0
```

See the Xdebug documentation which describes all of the Xdebug settings to confirm what you specifically need.

You need the `xdebug.mode` to include `debug` to enable step debugging of your program, and setting it to include `develop` provides an enhanced `var_dump` function, amongst other things. 

The `xdebug.log_level=0` means that only critical problems are logged in the log file. On WAMP if your xdebug log file gets too big then it will cause problems when you want to switch the version of the WAMP database software (mysql). 

## Check Xdebug is working
Write a small PHP script which includes the line:

```php
var_dump(xdebug_get_code_coverage());
```

Then run this script from the command line and/or from the webserver. If xdebug is correctly running then you'll output an empty array. If not then it will raise an error because it doesn't recognise the `xdebug_get_code_coverage` function.

## Install Eclipse
If you don't have an existing version of Eclipse installed then you can download a clean version of Eclipse for PHP from [Eclipse PHP Development Tools](https://eclipse.dev/pdt/). If you have an existing version of Eclipse then you can click on Help / Install New Software and then Work with `http://download.eclipse.org/tools/pdt/updates/latest` to obtain the latest PDT software.

## Configure Eclipse to use Xdebug
Within Eclipse click on Window / Preferences, and then under PHP click on Installed PHPs. Here you should see a list of your PHP versions and the associated debugger. 

Select one of these and click on Edit. In the window which appears click on the Debugger tab. You need to have:
- Debugger - Xdebug should be selected (if you can't select it then it means it's not installed or not properly configured in your php.ini file)
- Port - set to 9003 

When Xdebug moved from version 2.5 to 3.0 a number of the settings were changed, and the default debugger port was changed from 9000 to 9003. However, you may still find online documentation which relates to the old settings and the old port 9000.

Click on PHP / Debug and you should see Xdebug set as the Debugger. You can also check the "Break at First Line" checkbox if you want Eclipse to break at the first line of your PHP script by default. 

It's also worth checking in Window / Preferences under General / Web Browser that you've selected to use an external web browser, and your preferred browser.

## Import a Joomla installation for debugging
Within Eclipse click on File / New - PHP Project. Select "Create project at existing location" and Browse to select your top-level Joomla directory. Give your project a memorable name and click Finish. This will import your Joomla installation code into Eclipse.

Next you have to define a Debug Configuration. Click on Run / Debug Configurations, and in the window which appears click on the New symbol (top left). You have to specify:
- a name for the debug configuration
- on the Server tab click on Browse and select your site index.php file
- on the Debugger tab ensure that Break at First Line is checked.
- then click Apply to save the debug configuration
- you can then also click Debug to start debugging - and the code should break at the first executable line of index.php.

After saving the configuration you can run it repeatedly by going again into Run / Debug Configurations, or by clicking the little arrow to the right of the bug symbol in the menubar, and then selecting your debug configuration.

## Import a Joomla extension folder for development
You can use Eclipse as your IDE to assist with the code development process. To do this you need to import as a project the folder where you are developing your extension. Within Eclipse click on File / New - PHP Project. Select "Create project at existing location" and Browse to select the folder where you're developing your extension. Give your project a memorable name and click Finish. This will import your Joomla code into Eclipse.

When you import your development code you'll see a lot of errors against your `use` statements, because Eclipse can't find those classes. To resolve this, 
- right-click on the project in the Explorer pane, and select Properties. 
- Under PHP / Source Paths / Include Path click on the Projects tab. 
- Click Add, and select the your Joomla installation project, and click OK. 
- Then click on Apply and Close to save everything.

Then once again right-click on the development project and select Build Project. Eclipse should be able to find the source classes for your `use` statements and the errors should disappear. 