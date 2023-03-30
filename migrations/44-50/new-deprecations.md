---
sidebar_position: 2
---

New deprecations
===============
All the new deprecations that should be aware of and what you should now be using instead.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

#### The item_associations property of the WebApplication class is deprecated

File: libraries/src/Application/WebApplication.php
Replacement: The $item_associations property will be removed with no replacement as it is not used in core anymore.

#### The aid property of the User class is deprecated

File: libraries/src/User/User.php
Replacement: The $aid property will be removed with no replacement as the user roles are defined through an access level.
