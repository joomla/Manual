---
sidebar_position: 2
---

# New deprecations

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

## Plugins deprecations

### CMSPlugin: deprecation for registerListeners

Deprecate `CMSPlugin::registerListeners()` as no longer needed when plugin will implement `SubscriberInterface`.

PR: https://github.com/joomla/joomla-cms/pull/43395
