---
sidebar_position: 1
---

# New features

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

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


#### Support of cross dependencies in WebAssetManager

It is now possible to define cross dependencies for assets. 
Check [Asset dependencies and cross dependencies](/docs/general-concepts/web-asset-manager#Asset-dependencies-and-cross-dependencies) for more detail.

PR: https://github.com/joomla/joomla-cms/pull/42681
