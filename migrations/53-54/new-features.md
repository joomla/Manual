---
sidebar_position: 1
---

New Features
============

All the new features that have been added to version 5.4, along with any changes to best practices.

:::tip[Developer & Tester Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
  The new features up to and including 5.4.0-alpha3 are listed.
:::

## Admin Backend

<details>
  <summary><strong>Automated Core Updates</strong></summary>
* [45143](https://github.com/joomla/joomla-cms/pull/45143) Add Automated Core Updates client functionality
* [45517](https://github.com/joomla/joomla-cms/pull/45517) Add Automated Updates information as fieldset description
* [45547](https://github.com/joomla/joomla-cms/pull/45547) Improve Automated Update UX for local sites
* [45685](https://github.com/joomla/joomla-cms/pull/45685) Notify all super users of Automated Updates
* [45669](https://github.com/joomla/joomla-cms/pull/45669) Improve Automated Update Quickicon language keys and icon

---

You can pre-test an automated update with Joomla 5.4.0 alpha versions by installing the
'[System - Alpha Update Server](https://github.com/joomla/joomla-cms/issues/45540)' plugin.
Please ensure the test instance is accessible from the Internet
(for example, by using [Launch your Joomla! site](https://launch.joomla.org/)) and
**do not** use the alpha releases for production sites.

</details>

<details>
  <summary>Use of 'None' in Various Filter Options and List Views</summary>
* [45232](https://github.com/joomla/joomla-cms/pull/45232) New '- None -' author filter option in the Articles view
  to select articles associated with deleted user entries.
* [45274](https://github.com/joomla/joomla-cms/pull/45274) New '- None -' tag filter option in the Articles view
  to select articles without tags.
* [45459](https://github.com/joomla/joomla-cms/pull/45459) New '- None -' tag filter option in the Contacts view
  to select contacts without tags.
* [45460](https://github.com/joomla/joomla-cms/pull/45460) New '- None -' tag filter option in the News Feeds view
  to select news feed entries without tags.
* [45461](https://github.com/joomla/joomla-cms/pull/45461) New '- None -' tag filter option in the Articles: Categories view
  to select categories without tags.
* [45201](https://github.com/joomla/joomla-cms/pull/45201) Shows '[ None ]' in the field group column for a field
  unassigned to any field group.
* [45223](https://github.com/joomla/joomla-cms/pull/45223) Shows '[ None ]' in the user column for a user note
  linked to a deleted user entry.
</details>

<details>
  <summary>More Links for User-Friendliness</summary>
* [45318](https://github.com/joomla/joomla-cms/pull/45318) Added a link to more easily open the
  'System – Maintenance – Database' view from the Pre-Update Check.
* [45318](https://github.com/joomla/joomla-cms/pull/45318) Added a link to more easily open the
  'Mail Templates' view from the Update Notification.
</details>
