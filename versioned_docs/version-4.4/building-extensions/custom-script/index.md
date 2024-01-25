---
title: Custom PHP Script
---
:::warning

Custom scripts like this are not supported formally by the Joomla team!

:::
# Introduction
By a custom PHP script I mean a PHP script which can be run from a browser. Usually users will navigate using a browser to the Joomla site:
```
https://domain.org/index.php
```
or to the Joomla administrator back-end:
```
https://domain.org/administrator/index.php
```
In this section we look at developing a PHP script (eg myscript.php) which can be put eg in the cli folder, so that users will navigate to:
```
https://domain.org/cli/myscript.php
```
There are several ways which you can use the Joomla framework to perform ad hoc tasks:
- using the Joomla Console application
- using the Joomla Task Scheduler
- using a custom PHP script

However, the Joomla Console application requires that the script (cli/joomla.php) be run from the server command line (eg in a cron job), which does make it more complex for users to run the script, in addition to the security risk of providing the extra user access to the command line. 

Similarly to allow users to run a Task Scheduler job you need to grant them access to the administator back-end. 

So for simple ad hoc tasks which you want to allow ordinary website users to run, the custom PHP script is a good option. However, you should be aware that the Joomla development team do not formally support this type of script. 