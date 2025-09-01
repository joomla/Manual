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

The whole `Joomla\CMS\Http` package is deprecated in Joomla 6.0 and will be removed in 8.0. Please use the Joomla Framework `Joomla\Http` package instead. The Framework package is an almost complete drop-in replacement. You only have to pay attention when accessing the data from the `Response` object. Don't read from the (magic) attributes, but use the PSR-7 methods instead.

### Application input property is deprecated

PR: [46000](https://github.com/joomla/joomla-cms/pull/46000)
Files: 
- `libraries/vendor/joomla/application/src/AbstractWebApplication.php`
- `libraries/src/Application/WebApplication.php`
Description:
The `input` property is deprecated in the AbstractWebApplication class since Joomla 4.0, but it was not really obvious in the CMS classes because of class hierarchy. Access to the `input` property got now removed in the framework class but is still available in the CMS classes. It will trigger a deprecated warning when directly called.

```php
// Old code
$app->input->get('foo');
Factory::getApplication()->input->get('foo');

// New:
$app->getInput()->get('foo');
Factory::getApplication()->getInput()->get('foo');
```

### Featured articles are integrated into articles 

Since the first Joomla version, the code for featured articles was a duplicate of the articles code, with only minor differences.
Now, featured articles are integrated into articles. This change affects only the administrator.

PR: https://github.com/joomla/joomla-cms/pull/43907

Deprecated: `Joomla\Component\Content\Administrator\Model\FeaturedModel`
Use `Joomla\Component\Content\Administrator\Model\ArticlesModel` with `filter.featured = 1` instead.

New code:
```php
        $model = $app->bootComponent('com_content')->getMVCFactory()->createModel('Articles', 'Administrator', ['ignore_request' => true]);
        $model->setState('filter.featured', '1');
```

New menu link to featured articles: `administrator/index.php?option=com_content&view=articles&filter[featured]=1`
 
	
Deprecated: `Joomla\Component\Content\Administrator\Controller\FeaturedController`
Use `Joomla\Component\Content\Administrator\Controller\ArticlesController` instead.
 
Deprecated without replacement: `HtmlView` - View class for a list of featured articles