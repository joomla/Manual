---
sidebar_position: 1
---
Technical Requirements
======================

All recommended versions are based on the latest released version of each series.

## Requirements for Supported Software
### Requirements for Joomla! 5.x

| Software              | Recommended | Minimum[^7] | More Information                                                                                                 |
|-----------------------|-------------|-------------|------------------------------------------------------------------------------------------------------------------|
| PHP                   | 8.2         | 7.2.5       | https://www.php.net                                                                                              |
| Supported Databases   |             |             |                                                                                                                  |
| MySQL                 | 8.0 +       | 5.6         | https://www.mysql.com                                                                                            |
| PostgreSQL            | 11.0 +      | 11.0        | https://www.postgresql.org/ <br/>(ext/pgsql support in PHP has been removed. Now uses the PostgreSQL PDO Driver) |
| Supported Web Servers |             |             |                                                                                                                  |
| Apache[^3]            | 2.4 +       | 2.4         | https://www.apache.org  <br/>(with mod_mysql, mod_xml, and mod_zlib)                                             |
| Nginx                 | 1.18 +      | 1.10        | https://www.nginx.com/resources/wiki/                                                                            |
| Microsoft IIS [^6]    | 10 +        | 8           | https://www.iis.net                                                                                              |

### Requirements for Joomla! 4.x

| Software              | Recommended | Minimum[^7] | More Information                                                                                                 |
|-----------------------|-------------|-------------|------------------------------------------------------------------------------------------------------------------|
| PHP                   | 8.2         | 7.2.5       | https://www.php.net                                                                                              |
| Supported Databases   |             |             |                                                                                                                  |
| MySQL                 | 8.0 +       | 5.6         | https://www.mysql.com                                                                                            |
| PostgreSQL            | 11.0 +      | 11.0        | https://www.postgresql.org/ <br/>(ext/pgsql support in PHP has been removed. Now uses the PostgreSQL PDO Driver) |
| Supported Web Servers |             |             |                                                                                                                  |
| Apache[^3]            | 2.4 +       | 2.4         | https://www.apache.org  <br/>(with mod_mysql, mod_xml, and mod_zlib)                                             |
| Nginx                 | 1.18 +      | 1.10        | https://www.nginx.com/resources/wiki/                                                                            |
| Microsoft IIS [^6]    | 10 +        | 8           | https://www.iis.net                                                                                              |

### Requirements for older Versions

On this page you see only currently supported versions if you need the requirements for older Joomla Versions
please select the old version in the version switcher in the top right corner. Requierements for versions 3 and
lower are listed in the documentention for [4.4](/versioned_docs/version-4.4/get-started/technical-requirements.md). 

## Footnotes

[^1]: PHP 5.3.1 is required for versions 3.0 through 3.2. At 3.3, the minimum is raised to PHP 5.3.10. Joomla! versions 3.5 and later are compatible with PHP 7.

[^2]: As of Joomla! 3.5, support for MySQL's `utf8mb4` character set is added and used by default by servers which support it.

[^3]: In order to use SEO URLs, you will need to have the Apache mod_rewrite extension installed.

[^4]: Do not use PHP 4.3.9, 4.4.2 or 5.0.4. These releases have known bugs that will interfere with installation. [Zend Optimizer](https://www.zend.com/) 2.5.10 for PHP 4.4 also has serious bugs and you should ask your host to upgrade to a newer version. Joomla! versions 1.5.15 and later are compatible with PHP 5.3. Note that the OpenID library is not compatible with PHP 5.3.

[^5]: Support for Microsoft SQL Server was added for the 2.5 release; 1.6 and 1.7 do not have this support.

[^6]: For Microsoft IIS (depending on your setup) you may need the following:

* PHP - [Installation instructions](https://www.php.net/manual/en/install.windows.php)
* MySQL - [Installation instructions](https://dev.mysql.com/doc/mysql/en/windows-installation.html)
* Microsoft URL Rewrite Module - Required for SEO URLs only. For more information, [click here](https://learn.iis.net/page.aspx/460/using-url-rewrite-module/. For information about using ISAPI, [click here](https://docs.joomla.org/S:MyLanguage/Enabling_Search_Engine_Friendly_(SEF)_URLs_on_IIS).
* FastCGI - [Download for IIS6](https://www.iis.net/downloads/default.aspx?tabid=34&g=6&i=1521). [Download for IIS7](https://www.iis.net/downloads/default.aspx?tabid=34&i=1299&g=6).
* For further assistance using Microsoft IIS, visit the [Joomla! IIS forum](https://forum.joomla.org/viewforum.php?f=543).

[^7]: This is the minimum version which is guaranteed to work, older versions may work but are not supported.

