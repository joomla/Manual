---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

## Class Deprecations

### `Joomla\CMS\Http` is deprecated

The whole `Joomla\CMS\Http` package is deprecated in Joomla 6.0 and will be removed in 7.0. Please use the Joomla Framework `Joomla\Http` package instead. The Framework package is an almost complete drop-in replacement. You only have to pay attention when accessing the data from the `Response` object. Don't read from the (magic) attributes, but use the PSR-7 methods instead.
