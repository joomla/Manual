---
title: Custom PHP Script
---

# Custom PHP Script

:::danger[Developer Notice]

Creating a script which directly includes loads and boots the CMS framework is not recommended and only needed in
rare cases. 
- If you plan to run the script from the server (in a cron job or from a terminal session) then you should use instead a [console plugin](../plugins/basic-console-plugin-helloworld.md). 
- If you plan to allow people to run the script from a client browser then you should use an [ajax plugin](../plugins/ajax-plugin.md). 
- If you wish to provide task functionality for an administrator, then using the Joomla Task Scheduler may be a possibility. 

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

This will not work with additonal security feature introduced in 5.0. Please consult the 5.0 documentation for more information.

:::
