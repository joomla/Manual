---
sidebar_position: 5
---
Coding Style Guide
=======================

Since Joomla version 4.2, Joomla uses the [PSR-12](https://www.php-fig.org/psr/psr-12/) coding standard. You can enable this coding standard in your IDE and get hints if you're not following the coding standard or use an auto fix, too.
We recommend that you follow this standard when developing your own extensions to stay compatible with core and to ensure your code will hopefully work with future versions.

## Install code style checker
:::caution TODO
Copy from https://docs.joomla.org/Joomla_CodeSniffer and update to the new version
:::

## Use integrated checker
If you download the full developer version from GitHub of Joomla (not the downloadable installation zip package), you will find a so called "code sniffer", to check for coding standard violations, and a "code fixer" to fix most (but, sometimes, not all) of them. 

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
