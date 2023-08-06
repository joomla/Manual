---
sidebar_position: 995
---

4.4 to 5.0
===============
An explanation of the code changes for each version of Joomla.
If you follow from the version of your current code until the version you want to support you should come across all the changes you need to make.
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
