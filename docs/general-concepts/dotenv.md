---
title: Dotenv
---

Dotenv
======

## What are `.env` Files?

`.env` files are plain text files used to store environment-specific configuration settings. These files contain key-value pairs that define variables, such as database credentials, debugging modes, and other application settings.

```env title=".env"
FOO=foo
BAR=bar
BAZ=baz
```

[Environment variables](https://en.wikipedia.org/wiki/Environment_variable) are dynamic values that can influence the behavior of an application, depending on the environment in which it is running (e.g., development, staging, or production).

To retrieve a value from an environment variable, you can use either the [`$_SERVER`](https://www.php.net/manual/en/reserved.variables.server.php) or [`$_ENV`](https://www.php.net/manual/en/reserved.variables.environment.php) superglobals, or the [`getenv()`](https://www.php.net/manual/en/function.getenv.php) function.

```php
$foo = $_SERVER['FOO'];
$bar = $_ENV['BAR'];
$baz = getenv('BAZ');
```

Using environment variables allows developers to separate configuration from code, making it easier to manage different environments without modifying the application's source code. This approach enhances security because sensitive information, like database passwords, can be excluded from version control systems.

The [12-factor app](https://12factor.net) methodology recommends [storing configuration in the environment](https://12factor.net/config).

Additionally, using environment variables makes Joomla more cloud-friendly and simplifies running it inside containers.

## Configuring Joomla with Environment Variables

Joomla allows you to override any option defined in the `configuration.php` file by using environment variables.

These variables follow a naming convention, prefixed with `JOOMLA_`:

```php title="configuration.php"
public $debug = true;
public $error_reporting = 'maximum';
public $sitename = 'My Cool Site';
```

```env title=".env"
JOOMLA_DEBUG=true
JOOMLA_ERROR_REPORTING=maximum
JOOMLA_SITE_NAME='My Cool Site'
```

:::tip
All available options can be found in the [configuration reference](/docs/reference/configuration).
:::

To override a setting, simply define the corresponding environment variable in the `.env` file. For instance:

```sh title=".env"
JOOMLA_DB_TYPE=mysqli
JOOMLA_DB_HOST=localhost
JOOMLA_DB_USER=root
JOOMLA_DB_PASSWORD=secret
JOOMLA_DB_NAME=joomla_db
```

:::info
Real environment variables **always take precedence** over environment variables defined in `.env` files.
:::
