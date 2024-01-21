---
sidebar_position: 1
---


Setup your testing environment
===============

## Prepare your Workstation

You need a set of tools to have a good testing setup. Tools you should have:

* git
* node (16.16.0 is the current LTS)
* database (mysql 5.6+, mariaDB 10.1+, postgres 11.0+)
* PHP (good to have different versions and the ability to switch)
* Composer, [Installation instructions here](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)
* Webserver (apache 2.4+, nginx 1.18+) - **optional**
* Editor (PhpStorm, Visual Studio Code)

:::note

This is pretty much the same toolset you need for system testing. Listed version numbers reflect the current state of the time writing.

:::

## MAC OS

As always there are different ways of installing the listed software. One way is the use of [Valet](https://laravel.com/docs/9.x/valet) in combination with [Homebrew](https://brew.sh/)

Now as you have all tools installed you can clone the [joomla-cms repository](https://github.com/joomla/joomla-cms).

1. Open a terminal
2. Go into a directory on you workstation.
3. clone the joomla-cms repository: ```git clone https://github.com/joomla/joomla-cms.git``` another option here is to fork the joomla-cms repo and then clone your fork. We recommend the 2nd way because then you can make changes and Pull Request directly.
4. Go into the joomla-cms directory
5. **Optional** - If you have installed valet, run ```valet link```
5. Run ```composer install```
6. Run ```npm ci```
7. Copy ```phpunit.xml.dist``` file to ```phpunit.xml```. This file allows config setting for phpunit.

 Here is a example ```phpunit.xml```

 ```xml
 <?xml version="1.0" encoding="UTF-8"?>
    <phpunit bootstrap="tests/Unit/bootstrap.php" colors="false">
	    <testsuites>
		    <testsuite name="Unit">
			    <directory suffix="Test.php">./tests/Unit/Libraries</directory>
		    </testsuite>
		    <testsuite name="Integration">
			    <directory suffix="Test.php">./tests/Integration/Libraries</directory>
		    </testsuite>
	    </testsuites>
        <php>
            <const name="JTEST_DB_ENGINE" value="mysqli" />
            <const name="JTEST_DB_HOST" value="mysql" />
            <const name="JTEST_DB_NAME" value="test_joomla" />
            <const name="JTEST_DB_USER" value="root" />
            <const name="JTEST_DB_PASSWORD" value="password" />
        </php>
    </phpunit>
 ```

8. Run ```phpunit --testdox```
 


## Windows




:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::
