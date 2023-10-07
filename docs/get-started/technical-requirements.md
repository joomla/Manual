---
sidebar_position: 1
---
Technical Requirements
======================

All recommended versions are based on the latest released version of each series.

## Requirements for Supported Software
### Requirements for Joomla! 5.x

| Software                                  | Recommended[^4] | Minimum[^3] | More Information                                    |
|-------------------------------------------|-----------------|-------------|-----------------------------------------------------|
| [PHP](https://php.net)                    | 8.2             | 8.1.0       | Modules: json, simplexml, dom, gd, mysqlnd or pgsql |
| **Databases**                             |                 |             |                                                     |
| [MySQL](https://mysql.com)                | 8.1             | 8.0.13      |                                                     |
| [MariaDB](https://mariadb.com)            | 11.1.0          | 10.4.0      |                                                     |
| [PostgreSQL](https://postgresql.org)      | 16.0            | 12.0        |                                                     |
| **Web Servers**                           |                 |             |                                                     |
| [Apache](https://httpd.apache.org) [^2]   | 2.4             | 2.4         |                                                     |
| [Nginx](https://nginx.com)                | 1.25            | 1.21        |                                                     |
| [Microsoft IIS](https://www.iis.net) [^1] | 10              | 10          |                                                     |

### Requirements for Joomla! 4.x

| Software           | Recommended[^4] | Minimum[^3] | More Information                                                                                                 |
|--------------------|-----------------|-------------|------------------------------------------------------------------------------------------------------------------|
| PHP                | 8.2             | 7.2.5       | https://www.php.net                                                                                              |
| **Databases**      |                 |             |                                                                                                                  |
| MySQL              | 8.0             | 5.6         | https://www.mysql.com                                                                                            |
| PostgreSQL         | 11.0            | 11.0        | https://www.postgresql.org/ <br/>(ext/pgsql support in PHP has been removed. Now uses the PostgreSQL PDO Driver) |
| **Web Servers**    |                 |             |                                                                                                                  |
| Apache [^2]        | 2.4             | 2.4         | https://www.apache.org                                                                                           |
| Nginx              | 1.18            | 1.10        | https://www.nginx.com/resources/wiki/                                                                            |
| Microsoft IIS [^1] | 10              | 8           | https://www.iis.net                                                                                              |

### Requirements for older Versions

On this page you see only currently supported versions if you need the requirements for older Joomla Versions
please select the old version in the version switcher in the top right corner. Requierements for versions 3 and
lower are listed in the documentention for [4.4](/versioned_docs/version-4.4/get-started/technical-requirements.md). 

## Footnotes

[^1]: For Microsoft IIS (depending on your setup) you may need the following:  PHP, MySQL, Micorosoft URL Rewrite Module, FastCGI
    * PHP - [Installation instructions](https://www.php.net/manual/en/install.windows.php)
    * MySQL - [Installation instructions](https://dev.mysql.com/doc/mysql/en/windows-installation.html)
    * Microsoft URL Rewrite Module - Required for SEO URLs only. For more information, [click here](https://learn.iis.net/page.aspx/460/using-url-rewrite-module/. For information about using ISAPI, [click here](https://docs.joomla.org/S:MyLanguage/Enabling_Search_Engine_Friendly_(SEF)_URLs_on_IIS).
    * FastCGI - [Download for IIS6](https://www.iis.net/downloads/default.aspx?tabid=34&g=6&i=1521). [Download for IIS7](https://www.iis.net/downloads/default.aspx?tabid=34&i=1299&g=6).
    * For further assistance using Microsoft IIS, visit the [Joomla! IIS forum](https://forum.joomla.org/viewforum.php?f=543).

[^2]: We always recommend the latest version, the recommended version listed is the version which is known to work.  

[^3]: This is the minimum version which is guaranteed to work, older versions may work but are not supported.

[^4]: In order to use SEO URLs, you will need to have the Apache mod_rewrite extension installed.
