---
sidebar_position: 5
---
Coding Style Guide
=======================

Since Joomla version 4.2 Joomla is using the [PSR-12](https://www.php-fig.org/psr/psr-12/) coding standard. You can enable the coding standard in your IDE to get hints when you're violating the rules or can use an auto fix, too.
We recommend that you follow this standard also when developing your own extensions to stay compatible always with core and that you don't have to switch when working with core.

## Install code style checker
:::caution TODO
Copy from https://docs.joomla.org/Joomla_CodeSniffer and update to the new version
:::

## Use integrated checker
The Joomla core system is shipping a so called "code sniffer" and a "code fixer" to check for code standard violations and to fix most (but sometimes not all) of them. This only works if you're using the full developer version from GitHub, not when you're working with a installation zip package.

To run the code sniffer/fixer you need to start a terminal, navigate to your Joomla root folder (the folder where your Joomla is installed) and run one of the following commands (don't forget the "."):

### Checking for code style violations

```./libraries/vendor/bin/phpcs --extensions=php -p --standard=ruleset.xml .```

This will run the code style check for the whole Joomla! installation, including your extensions, when installed in Joomla!

### Fixing code style violations

```./libraries/vendor/bin/phpcbf --extensions=php -p --standard=ruleset.xml .```

This will run the code style fixer for the whole Joomla installation, including your extension. The fixer tries to fix all violation, but sometimes it can't fix all. So it's recommended to run the checker (see above) afterwards and fix the last issues manually.


:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::
