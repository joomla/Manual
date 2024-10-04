---
sidebar_position: 995
---

# 4.4 to 5.0

An explanation of the code changes for each version of Joomla.
If you follow from the version of your current code until the version you want
to support you should come across all the changes you need to make.

# Compatibility Plugin

Most of the code deprecated in Joomla! 3.x has been removed. Some deprecations have been moved
to the [Compatibility Plugin](compat-plugin.md).

# Replacement of Factory::getUser
`Factory::getUser()` is deprecated since Joomla 4.0. To replace it, models, views, form fields and tables can implement the `CurrentUserInterface` and then the currently logged in user is available through `$this->getCurrentUser()`.

In 5.0 all the template files (default.php) have been changed from `Factory::getUser()` to `$this->getCurrentUser()`.


:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

## Form field classes
There is a long list of old style form field classes that have no equivalent in Joomla 5. For example:
- JFormFieldList
- JFormFieldText

In Joomla 5 the namespaced classes are:
- \Joomla\CMS\Form\Field\ListField
- \Joomla\CMS\Form\Field\TextField

The namespaced version is not available in Joomla 3. If you want to run your extension on both Joomla 3 and Joomla 5 without the compatibility plugin you will have to refactor the use of these form field classes to use your own.
