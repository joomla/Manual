---
sidebar_position: 1
---

New features
===============
All the new features that have been added to this version.
Any changes in best practice.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

#### Implementation of JoomlaDialog script

Implementation of newly introduced JoomlaDialog javascript module (5.0) into standard modal fields, batch windows and multilanguage status overview.

- ```Modal_Category``` field - PR: [#42293](https://github.com/joomla/joomla-cms/pull/42293)
- ```Modal_Contact``` field - PR: [#42326](https://github.com/joomla/joomla-cms/pull/42326)
- ```Modal_Newsfeed``` field - PR [#42327](https://github.com/joomla/joomla-cms/pull/42327)
- batch windows - PR: [42328](https://github.com/joomla/joomla-cms/pull/42328)
- multilanguage status overview - PR [#42082](https://github.com/joomla/joomla-cms/pull/42082)
- Use Dialog for Module editing - PR [#42423](https://github.com/joomla/joomla-cms/pull/42423)
- Use Dialog for Plugins editing - PR [#42447](https://github.com/joomla/joomla-cms/pull/42447)



For more detail check [Joomla Dialog (popup) script](https://manual.joomla.org/docs/next/general-concepts/javascript/joomla-dialog).

PR: https://github.com/joomla/joomla-cms/pull/40150

#### `FormField` new method `collectLayoutData()`

`FormField` class got a new method `collectLayoutData()`, to cache the data from `getLayoutData()`. 
This was made to prevent a multiple call of this method, which may lead to doubled Queries/Request that may happen in some circumstances.

it is recommended to update your fields to use new method to improve performance. Example:
```php
// Old code
protected function getInput()
{
  return $this->getRenderer($this->layout)->render($this->getLayoutData());
}
protected function getLabel()
{
  $data = $this->getLayoutData();
  ...
  return $this->getRenderer($this->renderLabelLayout)->render($data);
}

```

```php
// New code
protected function getInput()
{
  return $this->getRenderer($this->layout)->render($this->collectLayoutData());
}
protected function getLabel()
{
  $data = $this->getLayoutData();
  ...
  return $this->getRenderer($this->renderLabelLayout)->collectLayoutData($data);
}
```

PR: https://github.com/joomla/joomla-cms/pull/42709
