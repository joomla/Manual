---
title: Custom PHP Script
---

# Custom PHP Script

:::danger[Developer Notice]

Creating a script which directly includes loads and boots the CMS framework is not recommended and only needed in
rare cases. Depending on the use case you should create a [console plugin](../plugins/basic-console-plugin-helloworld.md) 
and extend the Joomla! console application. If you need to create a simple entry point for web requests write an 
[ajax plugin](../plugins/ajax-plugin.md).

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
