---
sidebar_position: 1
---

New Features
============

All new functions that have been added to version 5.4, as well as all enhancements to existing functionality.

:::tip[Developer & Tester Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
  The new features up to and including 5.4.0-beta1 are listed.
:::

## Automated Core Updates

Joomla 5.4 introduces Automated Core Updates for minor, patch and security releases.
This feature enables Joomla installations to be kept up to date reliably and without manual intervention –
an important step towards improving the security and maintainability of Joomla websites.
Automated Core Updates use *The Update Framework* (TUF), a secure software update distribution system
designed to prevent supply chain attacks when automatically updating Joomla core.


<details>
  <summary>Pull Requests in Detail</summary>

* [45143](https://github.com/joomla/joomla-cms/pull/45143) Add Automated Core Updates client functionality
* [45517](https://github.com/joomla/joomla-cms/pull/45517) Add Automated Updates information as fieldset description
* [45547](https://github.com/joomla/joomla-cms/pull/45547) Improve Automated Update UX for local sites
* [45685](https://github.com/joomla/joomla-cms/pull/45685) Notify all super users of Automated Updates
* [45669](https://github.com/joomla/joomla-cms/pull/45669) Improve Automated Update Quickicon language keys and icon
* [45697](https://github.com/joomla/joomla-cms/pull/45697) Allow opt-out from automated updates during installation
</details>

You can pre-test an automated update with Joomla 5.4.0 beta versions by installing the
'[System - Alpha Update Server](https://github.com/joomla/joomla-cms/issues/45540)' plugin.
Please ensure the test instance is accessible from the Internet
(for example, by using [Launch your Joomla! site](https://launch.joomla.org/)) and
**do not** use the beta release for production sites.

## More Links for User-Friendliness

1. New links make it easier to access related views directly from update notifications and checks.
2. Adding support for customisable registration menu link.

<details>
  <summary>Pull Requests in Detail</summary>

  1. New links make it easier to access related views directly from update notifications and checks.
     * [45318](https://github.com/joomla/joomla-cms/pull/45318) Added a link to more easily open the
       'System – Maintenance – Database' view from the Pre-Update Check.
     * [45318](https://github.com/joomla/joomla-cms/pull/45318) Added a link to more easily open the
       'Mail Templates' view from the Update Notification.

  2. Adding support for customisable registration menu link.
      * [45715](https://github.com/joomla/joomla-cms/pull/45715) Add support for custom registration menu link in com_users login menu item
</details>

## Additional Enhancements

1. New *None* options improve filtering and display of items without authors, tags, users or field groups.
2. New *Checked_out* filter for articles in the administrator backend and API.
3. New parameter *Year Sort Order* for archived articles.

<details>
  <summary>Pull Requests in Detail</summary>

  1. New *None* options improve filtering and display of items without authors, tags, users or field groups.
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
  2. New *Checked_out* filter for articles in the administrator backend and API.
     * [45761](https://github.com/joomla/joomla-cms/pull/45761) Add checkedout filter to the Article Manager

  3. New parameter *Year Sort Order* for archived articles.
     * [45841](https://github.com/joomla/joomla-cms/pull/45841) Add year filter order parameter for archived articles
</details>
