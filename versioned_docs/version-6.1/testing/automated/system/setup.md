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
* Webserver (apache 2.4+, nginx 1.18+)
* Editor (PhpStorm, Visual Studio Code)

:::note

This is pretty much the same toolset you need for unit testing

:::

## MAC OS

As always there are different ways of installing the listed software. One way is the use of [Valet](https://laravel.com/docs/9.x/valet) in combination with [Homebrew](https://brew.sh/)

Now as you have all tools installed you can clone the [joomla-cms repository](https://github.com/joomla/joomla-cms).

1. Open a terminal
2. Go into a directory on you workstation.
3. clone the joomla-cms repository: ```git clone https://github.com/joomla/joomla-cms.git``` another option here is to fork the joomla-cms repo and then clone your fork. We recommend the 2nd way because then you can make changes and Pull Request directly.
4. Go into the joomla-cms directory
5. If you have installed valet, run ```valet link```
5. Run ```composer install```
6. Run ```npm ci```
7. Create a ```cypress.env.json``` file. This file allows to overwrite config setting from ```cypress.config.js```

 Here is a example ```cypress.env.json```

 ```json
 {
  "sitename": "Joomla CMS Test Local",
  "name": "jane doe",
  "email": "admin@example.com",
  "username": "local-admin",
  "password": "joomla-17082005",
  "db_type": "MySQLi",
  "db_host": "localhost",
  "db_name": "test_joomla",
  "db_user": "root",
  "db_password": "password",
  "db_prefix": "jos_"
 }
 ```
 You don't need all settings, just look what you have to change for your local environment compared to ```cypress.config.js```   

8. Run ```npx cypress open --e2e --browser=chrome --config baseUrl=http://joomla-cms.test```
 
 This will open two windows, one you can ignore and one to run the tests


 ![Cypress Window 1](./assets/cypress-window1.jpg)

 In the following window you can select test and let them run. You need to install first.

 ![Cypress Window 2](./assets/cypress-window2.jpg)


## Windows




:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::
