---
sidebar_position: 1
---
Technical Requirements
======================

## Requirements for Supported Software

In the following tables the *Recommended* versions of supporting software are known to work with the specified 
Joomla! version. The *Minimum* versions are guaranteed to work. Older versions may work but are not supported.

### Requirements for Joomla! 6.x

| Software           | Recommended | Minimum | Required |
|--------------------|-------------|---------|----------|
| PHP                | 8.4         | 8.3.0   | 8.3.0    |
| **Databases**      |             |         |          |
| MySQL              | 8.4         | 8.0.13  | 8.0.13   |
| MariaDB            | 12.0        | 10.6    | 10.4     |
| PostgreSQL         | 17.6        | 14.0    | 12.0     |
| **Web Servers**    |             |         |          |
| Apache             | 2.4         | 2.4     |          |
| Nginx              | 1.29        | 1.26    |          |
| Microsoft IIS      | 10          | 10      |          |

**Required PHP Modules:** json, simplexml, dom, zlib, gd, mysqlnd or pdo_mysql or pdo_pgsql  
**Recommended PHP Modules:** mbstring  
**Optional Apache Modules:** _mod_rewrite_ extension to use SEO URLs  
**Optional Microsoft IIS Modules:** [URL Rewrite Module](https://learn.iis.net/page.aspx/460/using-url-rewrite-module/) to use SEO URLs

### Requirements for Joomla! 5.x

| Software           | Recommended     | Minimum     |
|--------------------|-----------------|-------------|
| PHP                | 8.3             | 8.1.0       |
| **Databases**      |                 |             |
| MySQL              | 8.1             | 8.0.13      |
| MariaDB            | 11.1.0          | 10.4.0      |
| PostgreSQL         | 16.0            | 12.0        |
| **Web Servers**    |                 |             |
| Apache             | 2.4             | 2.4         |
| Nginx              | 1.25            | 1.21        |
| Microsoft IIS      | 10              | 10          |

**Required PHP Modules:** json, simplexml, dom, zlib, gd, mysqlnd or pdo_mysql or pdo_pgsql  
**Optional Apache Modules:** _mod_rewrite_ extension to use SEO URLs  
**Optional Microsoft IIS Modules:** [URL Rewrite Module](https://learn.iis.net/page.aspx/460/using-url-rewrite-module/) to use SEO URLs

### Requirements for older Versions

If you need the requirements for older Joomla versions please use the Current Releases 
version switcher in the top left corner to select the [4.4 (Security)](/versioned_docs/version-4.4/get-started/technical-requirements.md) version.

## Additional Information

- [PHP](https://www.php.net) A popular general-purpose scripting language that is especially suited to web development.
- [MySQL](https://www.mysql.com) is available in several editions. It is normal to install a GPL Community Edition for your software platform.
- [MariaDB](https://mariadb.com) is also available in several editions. It is normal to install a free Community Edition for your software platform.
- [PostgreSQL](https://www.postgresql.org/) is open source and available in numerous editions.
- [Apache](https://httpd.apache.org) HTTP Server Project is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows.
- [Nginx](https://nginx.org) is an HTTP web server, reverse proxy, content cache and load balancer.
- [Microsoft IIS](https://www.iis.net) (Internet Information Services) for Windows® Server is a flexible, secure and manageable Web server for hosting anything on the Web.

### Glossar

#### Recommended

This column describes which version the Joomla! Project recommends to use for the selected Joomla version.

#### Minimum

This column describes which version the Joomla! Project has set as the minimum supported version.
This means any bug found in this version or higher will be considered for fixing. This version might
not be enforced. The minimum version usually reflects the latest version of the software package
supported by the vendor.

#### Required

This column describes the enforced version by the CMS or the framework in use. That means you may use
a lower version than the minimum version, but not lower than the required version. For versions below
the minimum version, you might not receive support from the Joomla maintainers.
