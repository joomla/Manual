---
title: Dotenv
---

Dotenv
======

## What are `.env` files?

`.env` files are plain text files used to store environment-specific configuration settings. These files contain key-value pairs that define variables such as database credentials, debugging modes, and other application settings.

```env title=".env"
FOO=foo
BAR=bar
BAZ=baz
```

[Environment variables](https://en.wikipedia.org/wiki/Environment_variable) are dynamic values that can influence the behavior of an application depending on the environment it is running in (e.g., development, staging, or production).

To get a value from an environment variable, you can use either the [`$_SERVER`](https://www.php.net/manual/en/reserved.variables.server.php) or [`$_ENV`](https://www.php.net/manual/en/reserved.variables.environment.php) superglobals or the [`getenv()`](https://www.php.net/manual/en/function.getenv.php) function.

```php
$foo = $_SERVER['FOO'];
$bar = $_ENV['BAR'];
$baz = getenv('BAZ');
```

Joomla leverages the [symfony/dotenv](https://symfony.com/components/Dotenv) component to handle `.env` files. This component loads environment variables from `.env` files into the application's runtime, making them accessible as if they were defined in the server's environment.

Using `.env` files allows developers to separate configuration from code, making it easier to manage different environments without modifying the application's source code. This approach enhances security, as sensitive information like database passwords can be excluded from version control systems.

The [12-factor app](https://12factor.net) methodology recommends to [store config in the environment](https://12factor.net/config).

Also, using environment variables makes Joomla more cloud-friendly and simplifies running it inside containers.

## Get Started

First you need to create the `.env` file. You can use the one distributed with Joomla:

```sh
cp env.dist .env
```

By default, Joomla looks for a `.env` file in the root directory of the project. However, you can also use multiple `.env` files to manage different environments, such as `.env.dev` for development or `.env.local` for local overrides.

When multiple files are present, Joomla merges their contents, with values from later files taking precedence over earlier ones. This allows you to define global settings in `.env` and override them as needed for specific environments.

For example, the `env.dev.dist` file contains development-specific configuration settings (e.g. debugging, logging).

Let's use it:

```sh
cp env.dist .env.dev
```

Now, if you refresh your browser, you will see the debug console on the bottom of the page. If you don't need it, you can disable it by setting the `JOOMLA_DEBUG` variable:

```env title=".env.dev"
JOOMLA_DEBUG=0
```

## Joomla Environment (`JOOMLA_ENV`)

Joomla uses the `JOOMLA_ENV` variable to determine the current environment. Common values include:

- `dev`: development environment
- `prod`: production environment
- `test`: testing environment

By default Joomla runs in `prod` environment.

:::tip
To launch a Joomla CLI command in specific environment use the following shell syntax:

```sh
JOOMLA_ENV=prod php cli/joomla
```
:::

You can create as many environments as you need. Just create an additional `.env` file (e.g. `.env.staging`) with the same name as the environment (`staging`) and add the environment-specific configuration settings:

```env title=".env.staging"
JOOMLA_SITENAME='STAGING'
JOOMLA_ROBOTS='noindex,nofollow'
```

## Configure Joomla with environment variables

Joomla allows you to override any option defined in the `configuration.php` file using environment variables. These variables follow a naming convention prefixed with `JOOMLA_`:

```php title="configuration.php"
public $debug = true;
public $sitename = 'My Cool Site';
public $session_handler = 'redis';
```

```env title=".env"
JOOMLA_DEBUG=1
JOOMLA_SITENAME='My Cool Site'
JOOMLA_SESSION_HANDLER=redis
```

:::tip
All available options can be found in the [configuration reference](/docs/reference/configuration).
:::

To override a setting, simply define the corresponding environment variable in appropriate `.env` file: `.env`, `.env.local`, `.env.dev` and etc. For instance:

```sh title=".env.dev"
JOOMLA_DBTYPE=mysqli
JOOMLA_HOST=localhost
JOOMLA_USER=root
JOOMLA_PASSWORD=secret
JOOMLA_DB=joomla_db
```

:::info
Real environment variables **always win** over env vars created by any of the `.env` files.
:::

## Local overrides

If you need to override an environment value (e.g. to a different value on your local machine), you can do that in a `.env.local` file:

```env title=".env.local"
JOOMLA_ENV=prod
JOOMLA_CACHING=1
```

:::warning
The `.env.*.local` files are ignored in the `test` environment because tests should produce the same results for everyone.
:::

## Which `.env` file to choose?

- `.env`

  Defines the default values of the env vars needed by the application;

- `.env.local`

  Overrides the default values for all environments but only on the machine which contains the file;

- `.env.$JOOMLA_ENV` (e.g. `.env.dev`)

  Overrides env vars only for one environment but for all machines;

- `.env.$JOOMLA_ENV.local` (e.g. `.env.dev.local`)

  Defines machine-specific env var overrides only for one environment.

The `.env` and `.env.$JOOMLA_ENV` files **should be committed** to the repository because they are the same for all developers and machines.

The `.env.*.local` files **should not be committed** because only you will use them:

```gitignore title=".gitignore"
/.env.local
/.env.*.local
```
