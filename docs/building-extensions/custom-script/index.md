---
title: Custom PHP Script
---

Custom PHP Script
=================

:::danger[Developer Notice]

Creating a script which directly includes loads and boots the CMS framework is not recommended and only needed in
rare cases. Depending on the usecase you should create a [console plugin](../plugins/plugin-examples/basic-console-plugin-helloworld.md)
and extend the Joomla! console application. If you need to create a simple entry point for webrequests write an
[ajax plugin](../plugins/plugin-examples/ajax-plugin.md).

:::

## Introduction
By a custom PHP script I mean a PHP script which can be run from a browser. Usually users will navigate using a browser to the Joomla site:

```
https://example.com/index.php
```

or to the Joomla administrator back-end:

```
https://example.com/administrator/index.php
```

In this section we look at developing a PHP script (eg myscript.php) which can be put eg in the root folder, so that users will navigate to:

```
https://example.com/myscript.php
```

:::danger[Developer Notice]
 
This will not work with advanced security option [public folder](../../../../migrations/44-50/new-features#added-the-option-to-serve-joomla-from-a-public-folder) introduced in Joomla 5.0.

:::

There are several ways which you can use the Joomla framework to perform ad hoc tasks:
- using the Joomla Console application
- using the Joomla Task Scheduler
- using the Joomla Ajax component
- using a custom PHP script

However, the Joomla Console application requires that the script (cli/joomla.php) be run from the server command line (eg in a cron job), which does make it more complex for users to run the script, in addition to the security risk of providing the extra user access to the command line. 

Similarly to allow users to run a Task Scheduler job you need to grant them access to the administator back-end. 

So for simple ad hoc tasks which you want to allow ordinary website users to run, the custom PHP script is an option. However, you should be aware that the Joomla development team do not formally support this type of script.