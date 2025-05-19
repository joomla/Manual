---
sidebar_position: 1
---

# New features

All the new features that have been added to version 5.4, along with any changes to best practices.

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

## Admin backend

* [45371](https://github.com/joomla/joomla-cms/pull/45371) New '**Behaviour - Backward Compatibility 6**' plugin added
  in preparation for the Joomla 6 update.
  * On Joomla 5.4 the plugin does not do anything except of being there and being enabled,
    so that when we update the code to Joomla 6 it can immediately run with the updated code,
    and 3rd party extensions which would require that plugin being enabled in 6 will not cause the update to break.
* [45232](https://github.com/joomla/joomla-cms/pull/45232) New '**- None -**' author filter option in the artice view
  to select articles associated with deleted user entries.
* [45274](https://github.com/joomla/joomla-cms/pull/45274) New '**- None -**' tag filter option in the article view
  to select articles without tags.
* [45201](https://github.com/joomla/joomla-cms/pull/45201) Shows '**[ None ]**' in the field group column for a field
  unassigned to any field group.
* [45223](https://github.com/joomla/joomla-cms/pull/45223) Shows '**[ None ]**' in the user column for a user note
  linked to a deleted user entry.
* [45318](https://github.com/joomla/joomla-cms/pull/45318) Added a link to more easily open the
  'System – Maintenance – Database' view from the **Pre-Update Check**.
