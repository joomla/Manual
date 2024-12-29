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

### postStoreProcess function in TagsHelper

PR: https://github.com/joomla/joomla-cms/pull/40613
File: libraries/src/Helper/TagsHelper.php
Description: With the new possibility to batch remove a tag, the `postStoreProcess()` function of class `\Joomla\CMS\Helper\TagsHelper` has been deprecated and will be removed in 7.0.
Replacement: New `postStore()` function which has an additional optional parameter `$remove` (default value is `false`) indicating whether the tags in parameter `$newTags` should be removed. If you set it to `true` then the parameter `$replace` is ignored.

### batchTag function in AdminModel

PR: https://github.com/joomla/joomla-cms/pull/40613
File: libraries/src/MVC/Model/AdminModel.php
Description: With the new possibility to batch remove a tag, the `batchTag` function of class `\Joomla\CMS\MVC\Model\AdminModel` has been deprecated and will be removed in 7.0.
Replacement: New `batchTags` function which has an additional optional parameter `$removeTags` (default value is `false`) indicating whether the tags in parameter `$value` have to be removed.
