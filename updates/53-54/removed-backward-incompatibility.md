---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

This page describes backward-incompatible changes in Joomla 5.4.11 and how to adapt extensions and API clients.

## Web Services use `core.api` in Joomla 5.4.11

- Version: Joomla 5.4.11
- Files: `libraries/src/Dispatcher/ApiDispatcher.php`, `libraries/src/MVC/Controller/ApiController.php`, and component `access.xml` files
- Description: Non-public Web Services routes require the component's dedicated `core.api` permission, separate from API login and administrator component access.

### Declare and grant API access

Third-party components exposing Web Services should declare `core.api` in their component's `access.xml`:

```xml
<action name="core.api" title="JACTION_API" />
```

Grant `core.api` to the groups that need non-public API access for that component. Replace `core.manage` with `core.api` only in checks that control Web Services access; retain `core.manage` for administrator component access. API users also need `core.login.api` to authenticate and operation-specific permissions such as `core.create`, `core.edit`, and `core.delete`. Endpoints may perform additional checks on records, categories, or menu items, and denied requests return HTTP `403 Forbidden`.

### Extend `ApiDispatcher` for custom API dispatchers

Third-party components with a custom API dispatcher should extend `Joomla\CMS\Dispatcher\ApiDispatcher`, rather than `Joomla\CMS\Dispatcher\ComponentDispatcher`. The base dispatcher checks `core.api` before dispatching non-public routes. If you override `checkAccess()`, preserve the parent check unless equivalent authorization is implemented; if you override `dispatch()`, preserve the access-check behavior.

### Mark public routes explicitly

Joomla 5.4.11 treats an API route as public only when its `public` option is the Boolean `true` (`=== true`). Values such as `1` are no longer treated as public and require authentication and applicable authorization checks. For a route intentionally designed for public access, set the option explicitly:

```php
// Before: not considered public in Joomla 5.4.11.
$route = ['public' => 1];

// After: explicitly public.
$route = ['public' => true];
```

The default `ApiDispatcher` skips the component-level `core.api` check for routes explicitly marked public. Do not mark routes public merely to work around an authorization error.

### Backward compatibility

`ApiController` temporarily retains `core.api` checks for create, edit, and delete operations as a fallback for third-party extensions that do not use `ApiDispatcher`. These checks are deprecated and intended for removal in Joomla 8.0. They do not replace extending `ApiDispatcher`, especially for read requests and custom controller actions.

## Record-aware API delete authorization

`ApiController::delete()` now checks each requested record before deleting it. It passes the record data and the name of the table's primary-key field to `allowDelete()`. Overrides can use these optional values to authorize deletion for a specific record rather than only applying a component-wide rule.

The base `ApiController::allowDelete()` method still has no parameters in Joomla 5.4.11. This change is preparation for Joomla 8.0, when the base method is planned to accept the parameters. Third-party overrides can be updated now; see the [`allowDelete()` migration example](../61-62/removed-backward-incompatibility.md#prepare-allowdelete-overrides-for-joomla-80).

Joomla 5.4.11 does not include the Joomla 6.2.1 change to return `409 Conflict` when a model refuses a delete without setting an error. Do not rely on that response behavior when integrating with Joomla 5.4.11.
