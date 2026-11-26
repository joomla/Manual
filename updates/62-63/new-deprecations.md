---
sidebar_position: 2
---

New Deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

This page lists all the new deprecations you should be aware of and what you should now be using instead.

## Exception classes without the `Exception` suffix

All exception classes in the CMS now use the `Exception` suffix.
For each exception class that was missing the suffix, a new class with the suffix has been added, and the old class now extends the new one.
Code that catches the new class will therefore also catch the old class, which core still throws.
Change your `catch` blocks and `instanceof` checks to the new class names now.
Core will switch to throwing the new classes when the old ones are removed.

- **PR**: [#48095](https://github.com/joomla/joomla-cms/pull/48095)

Planned to be removed in Joomla! 8.0

* File: `libraries/src/Access/Exception/AuthenticationFailed.php`<br/>
  Class: `Joomla\CMS\Access\Exception\AuthenticationFailed`<br/>
  Replacement: `Joomla\CMS\Access\Exception\AuthenticationFailedException`

* File: `libraries/src/Access/Exception/NotAllowed.php`<br/>
  Class: `Joomla\CMS\Access\Exception\NotAllowed`<br/>
  Replacement: `Joomla\CMS\Access\Exception\NotAllowedException`

* File: `libraries/src/Application/Exception/NotAcceptable.php`<br/>
  Class: `Joomla\CMS\Application\Exception\NotAcceptable`<br/>
  Replacement: `Joomla\CMS\Application\Exception\NotAcceptableException`

* File: `libraries/src/MVC/Controller/Exception/CheckinCheckout.php`<br/>
  Class: `Joomla\CMS\MVC\Controller\Exception\CheckinCheckout`<br/>
  Replacement: `Joomla\CMS\MVC\Controller\Exception\CheckinCheckoutException`

* File: `libraries/src/MVC/Controller/Exception/ResourceNotFound.php`<br/>
  Class: `Joomla\CMS\MVC\Controller\Exception\ResourceNotFound`<br/>
  Replacement: `Joomla\CMS\MVC\Controller\Exception\ResourceNotFoundException`

* File: `libraries/src/MVC/Controller/Exception/Save.php`<br/>
  Class: `Joomla\CMS\MVC\Controller\Exception\Save`<br/>
  Replacement: `Joomla\CMS\MVC\Controller\Exception\SaveException`

* File: `libraries/src/MVC/Controller/Exception/SendEmail.php`<br/>
  Class: `Joomla\CMS\MVC\Controller\Exception\SendEmail`<br/>
  Replacement: `Joomla\CMS\MVC\Controller\Exception\SendEmailException`

Example:

```php
// Old
use Joomla\CMS\Access\Exception\NotAllowed;

try {
    // ...
} catch (NotAllowed $e) {
    // ...
}

// New
use Joomla\CMS\Access\Exception\NotAllowedException;

try {
    // ...
} catch (NotAllowedException $e) {
    // ...
}
```
