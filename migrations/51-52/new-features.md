---
sidebar_position: 1
---

# New features

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

#### Usability: Add total number of items to Page Navigation
This new feature adds a "total" counter at the bottom near the pagination in Joomla's back-end, 
displaying the number of items available after applying filters for easier item management.

PR: [43575](https://github.com/joomla/joomla-cms/pull/43575)


#### New lazy decorator for Plugins

Adding Lazy Subscriber interface and decorator. 
The decorator allows to instantiate the plugin with heavy dependencies only when the event is actually dispatched.
PR: https://github.com/joomla/joomla-cms/pull/43658

More details here: [Lazy Subscriber](https://manual.joomla.org/docs/building-extensions/plugins/advanced-plugin-features#lazy-subscriber).
