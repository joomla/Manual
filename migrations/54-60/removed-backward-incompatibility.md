---
sidebar_position: 3
---

# Removed and backward incompatibility

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

### CMS Input object switched to Framework Input object

- PR: https://github.com/joomla/joomla-cms/pull/42805
- Description: The CMS Input object `\Joomla\CMS\Input` has been deprecated since Joomla 4.3. The CMS core code has switched the code to the Framework Input object `\Joomla\Input`, which is very much a drop-in replacement. This is especially of relevance if you are using the MVC classes, which now use the framework class. Make sure that your code imports the correct class.

### Library extension for enhanced batched tag handling

- PR: https://github.com/joomla/joomla-cms/pull/40613
- Description: With the new possibility to batch remove a tag, the following library classes has been extended:

#### libraries/src/Helper/TagsHelper.php

The function `postStoreProcess` of class `\Joomla\CMS\Helper\TagsHelper` has been extended with a new optional parameter `$remove` (default value is `false`) indicating whether the tags in parameter `$newTags` should be removed. If you set it to `true` then the parameter `$replace` is ignored.

#### libraries/src/MVC/Model/AdminModel.php

The function `batchTag` of class `\Joomla\CMS\MVC\Model\AdminModel` has been extended with a new optional parameter `$removeTags` (default value is `false`) indicating whether the tags in parameter `$value` have to be removed.

