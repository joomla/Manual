---
sidebar_position: 1
---

New Features
============

The main new features are documented in this section.
It provides an overview of key additions and improvements in Joomla 5.4.

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
* [45669](https://github.com/joomla/joomla-cms/pull/45669) Improve Automated Update Quickicon language keys and icon
* [45673](https://github.com/joomla/joomla-cms/pull/45673) Fix handling of responses from autoupdate server
* [45685](https://github.com/joomla/joomla-cms/pull/45685) Send Automated Update Notifications to all super users
* [45696](https://github.com/joomla/joomla-cms/pull/45696) Implement autoupdate plugin events
* [45697](https://github.com/joomla/joomla-cms/pull/45697) Allow opt-out from automated updates during installation
* [45721](https://github.com/joomla/joomla-cms/pull/45721) Autoupdate email groups
* [45696](https://github.com/joomla/joomla-cms/pull/45696) Implement autoupdate plugin events
* [45900](https://github.com/joomla/joomla-cms/pull/45900) Autoupdates - Improve download logging
* [45966](https://github.com/joomla/joomla-cms/pull/45966) Adjust status code of com_joomlaupdate APIs if automated updates are disabled
* [46050](https://github.com/joomla/joomla-cms/pull/46050) Use correct language for autoupdate notification mails
* [46493](https://github.com/joomla/joomla-cms/pull/46493) Expose finalization errors in autoupdate API response
</details>

You can test Automated Updates by installing Joomla! [5.4.0](https://github.com/joomla/joomla-cms/releases/tag/5.4.0)
and enabling Automated Updates on an instance accessible from the internet.
Your instance will be updated to a higher patch version without interaction,
and you will receive an email with the result.

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
      * [45715](https://github.com/joomla/joomla-cms/pull/45715) Add support for custom registration menu link
        in com_users login menu item
</details>

## Support for PHP 8.5

Joomla 5.4 adds support for PHP 8.5, ensuring compatibility with the latest PHP release and allowing sites
to benefit from ongoing performance improvements, language enhancements and security updates provided by PHP.
The Joomla Continuous Integration (CI) environment has been extended to run tests with PHP 8.5.

<details>
  <summary>Pull Requests in Detail</summary>

  * [46134](https://github.com/joomla/joomla-cms/pull/46134) PHP8.5 deprecated code
  * [46136](https://github.com/joomla/joomla-cms/pull/46136) PHP8.5 Deprecations
  * [46137](https://github.com/joomla/joomla-cms/pull/46137) PHP8.5 deprecated code
  * [46198](https://github.com/joomla/joomla-cms/pull/46198) PHP8.5 curl_close() function has been deprecated
  * [46199](https://github.com/joomla/joomla-cms/pull/46199) PHP8.5 xml_parser_free() function has been deprecated
  * [46200](https://github.com/joomla/joomla-cms/pull/46200) PHP8.5 imagedestroy() function has been deprecated
  * [46201](https://github.com/joomla/joomla-cms/pull/46201) PHP8.5 Using null as an array offset is now deprecated
  * [46202](https://github.com/joomla/joomla-cms/pull/46202) PHP8.5 setAccessible() methods of various Reflection objects have been deprecated
  * [46203](https://github.com/joomla/joomla-cms/pull/46203) PHP8.5 Using null as an array offset is now deprecated (unit tests)
  * [46223](https://github.com/joomla/joomla-cms/pull/46223) Add php 8.5 to unit and integration tests
  * [46301](https://github.com/joomla/joomla-cms/pull/46301) PHP8.5 Composer update joomla/http to 3.1.3 to fix PHP 8.5 deprecation of curl_close()
  * [46309](https://github.com/joomla/joomla-cms/pull/46309) PHP8.5 Composer update joomla/test to 3.0.4 to fix PHP 8.5 deprecation of reflection setAccessible()
  * [46480](https://github.com/joomla/joomla-cms/pull/46480) php 8.5 version check
</details>

## Additional Enhancements

1. New *None* options improve filtering and display of items without authors, tags, users or field groups.
2. New *Checked_out* filter for articles in the administrator backend and API.
3. New parameter *Year Sort Order* for archived articles.
4. New cloud-based development and testing environment using GitHub Codespaces.

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
     * [45461](https://github.com/joomla/joomla-cms/pull/45461) New '- None -' tag filter option in the Articles:
       Categories view to select categories without tags.
     * [45201](https://github.com/joomla/joomla-cms/pull/45201) Shows '[ None ]' in the field group column for a field
       unassigned to any field group.
     * [45223](https://github.com/joomla/joomla-cms/pull/45223) Shows '[ None ]' in the user column for a user note
       linked to a deleted user entry.
  2. New *Checked_out* filter for articles in the administrator backend and API.
     * [45761](https://github.com/joomla/joomla-cms/pull/45761) Add checkedout filter to the Article Manager

  3. New parameter *Year Sort Order* for archived articles.
     * [45841](https://github.com/joomla/joomla-cms/pull/45841) Add year filter order parameter for archived articles

  4. New cloud-based development and testing environment using GitHub Codespaces.
     * [45950](https://github.com/joomla/joomla-cms/pull/45950) Add Support for GitHub Codespaces
     * This provides Joomla, phpMyAdmin, interactive Cypress tests, VS Code and command-line access, see
       [Testing/Manual Testing/GitHub Codespaces](https://manual.joomla.org/docs/5.4/testing/manually/github-codespaces/).
</details>
