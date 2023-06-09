---
sidebar_position: 995
---

4.4 to 5.0
==========
An explanation of the code changes for each version of Joomla.
If you follow from the version of your current code until the version you want
to support you should come across all the changes you need to make.

# Compatibility Plugin

Most of the code deprecated in Joomla! 3.x has been removed. Some deprecations have been moved
to the [Compatibility Plugin](compat-plugin.md).

# Replacement of Factory::getUser
`Factory::getUser()` is deprecated since Joomla 4.0. To replace it, models, views and tables can implement the `CurrentUserInterface` and then is the currently logged in user available through `$this->getCurrentUser()`. In 5.0 are all the template files (default.php) changed from `Factory::getUser()` to `$this->getCurrentUser()`.


:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::
