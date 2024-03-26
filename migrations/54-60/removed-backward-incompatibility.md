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

### getItem returns a stdClass instead of CMSObject

- PR: https://github.com/joomla/joomla-cms/pull/42961
- File: libraries/src/MVC/Model/AdminModel.php
- Description: The `AdminModel` class does return a `stdClass` object in the `getItem` function instead of a `CMSObject`. This means that all the deprecated functions of `CMSObject` are not available anymore. Mainly the set and get function should be replaced accordingly as documented in the `CMSObject` class or the respective traits. For example you can use 
```php
// Old:
$article = $app->bootComponent('content')->getMVCFactory()->createModel('Article', 'Administrator')->getItem(1);
echo $article->get('title');

// New:
$article = $app->bootComponent('content')->getMVCFactory()->createModel('Article', 'Administrator')->getItem(1);
echo $article->title;
```
  
