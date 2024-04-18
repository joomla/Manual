---
sidebar_position: 2
---

# New deprecations

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.


# Class deprecations

Planned to be removed in Joomla! 7.0.

## WebApplication::$JComponentTitle

`JComponentTitle` will be removed in 7.0 and is not used in a long time. Use `Docment::getTitle()`
Example: `\Joomla\CMS\Factory::getApplication()->getDocument()->getTitle();`
Related PR: https://github.com/joomla/joomla-cms/pull/43304
