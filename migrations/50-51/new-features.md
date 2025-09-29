---
sidebar_position: 1
---

New Features
============

All the new features that have been added to this version.
Any changes in best practice.

## Implementation of Joomla Dialog Script

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

## New `collectLayoutData()` Method for `FormField` Class

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
  $data = $this->collectLayoutData();
  ...
  return $this->getRenderer($this->renderLabelLayout)->render($data);
}
```

PR: https://github.com/joomla/joomla-cms/pull/42709

## Dark Mode Switch and Color Scheme API

Added a switch for changing color scheme "Dark"/"Light" for the Atum template.
More about new [Color scheme API](https://manual.joomla.org/docs/next/building-extensions/templates/color-scheme)

PR: https://github.com/joomla/joomla-cms/pull/42221
