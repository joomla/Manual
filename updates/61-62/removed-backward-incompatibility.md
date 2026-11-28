---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

This page describes backward-incompatible changes in Joomla 6.2.1 and how to adapt extensions and API clients.

## Web Services use `core.api` in Joomla 6.2.1

- Version: Joomla 6.2.1
- Files: `libraries/src/Dispatcher/ApiDispatcher.php`, `libraries/src/MVC/Controller/ApiController.php`, and component `access.xml` files
- Description: The default access check for non-public Web Services endpoints now uses a dedicated `core.api` permission. API authentication (`core.login.api`) remains separate, as do the operation-specific permissions used for create, edit, and delete actions.

### Declare and grant API access

Third-party components exposing Web Services should declare `core.api` in their component's `access.xml`:

```xml
<action name="core.api" title="JACTION_API" />
```

Grant `core.api` to the groups that need access to that component's non-public API endpoints. Replace checks for `core.manage` with `core.api` only where they control Web Services access:

```php
// Before: component management permission also controlled API access.
$allowed = $user->authorise('core.manage', 'com_example');

// After: Web Services access has its own permission.
$allowed = $user->authorise('core.api', 'com_example');
```

Keep `core.manage` for administrator component access. API users still need `core.login.api` to authenticate and operation-specific permissions such as `core.create`, `core.edit`, and `core.delete`; endpoints can also check permissions on a record, category, or menu item. Requests denied by these checks return HTTP `403 Forbidden`.

The Joomla 6.2.1 database update copies existing explicitly stored `core.manage` rules to `core.api` where available. Review the resulting permissions, especially if API access should differ from administrator access.

### Extend `ApiDispatcher` for custom API dispatchers

Third-party components with a custom API dispatcher must extend `Joomla\CMS\Dispatcher\ApiDispatcher`, rather than `Joomla\CMS\Dispatcher\ComponentDispatcher`:

```php
namespace Joomla\Component\Example\Api\Dispatcher;

use Joomla\CMS\Dispatcher\ApiDispatcher;

class Dispatcher extends ApiDispatcher
{
}
```

The base `ApiDispatcher` checks `core.api` before dispatching non-public requests. If your dispatcher overrides `checkAccess()`, call `parent::checkAccess()` unless you intentionally implement equivalent authorization. If it overrides `dispatch()`, preserve the parent's dispatch behavior, including the access check.

### Mark public routes explicitly

Joomla 6.2.1 treats an API route as public only when its `public` option is the Boolean `true` (`=== true`). Previously, a set value other than strict `false` was treated as public, so a route using `'public' => 1` is no longer public and requires authentication and the applicable authorization checks.

For a route intentionally designed for public access, set the option explicitly:

```php
// Before: no longer treated as public in Joomla 6.2.1.
$route = ['public' => 1];

// After: explicitly public.
$route = ['public' => true];
```

The base `ApiDispatcher` skips the component-level `core.api` check for routes explicitly marked public. Do not mark a route public just to avoid an authentication or authorization error.

## Record-aware API delete authorization

`ApiController::delete()` now checks each requested record before deleting it. It passes the record data and the name of the table's primary-key field to `allowDelete()`. Overrides can use these optional values to authorize deletion for a specific record rather than only applying a component-wide rule.

The base `ApiController::allowDelete()` method still has no parameters in Joomla 6.2.1. This change is preparation for Joomla 8.0, when the base method is planned to accept the parameters. Third-party overrides can be updated now without changing the base method:

### Prepare `allowDelete()` overrides for Joomla 8.0

```php
protected function allowDelete($data = [], $key = 'id'): bool
{
    $recordId = $data[$key] ?? null;

    if ($recordId === null) {
        return false;
    }

    // Apply any record-specific authorization required by the extension.

    return parent::allowDelete($data, $key);
}
```

The additional parameters are optional. Keep the existing authorization rules in the override and use `$data[$key]` when a decision depends on the record. The same record-aware call is present in Joomla 5.4.11; see its [Web Services API notes](../53-54/removed-backward-incompatibility.md#record-aware-api-delete-authorization).

### Backward compatibility

`ApiController` temporarily retains `core.api` checks for create, edit, and delete operations as a fallback for third-party extensions that do not use `ApiDispatcher`. These checks are deprecated and intended for removal in Joomla 8.0. They do not replace extending `ApiDispatcher`, particularly for read requests and custom controller actions.

## Refused API deletes return HTTP 409

When a model refuses to delete a record without setting a model error, Joomla 6.2.1 now returns `409 Conflict` instead of incorrectly reporting `204 No Content`. For example, a content plugin may refuse to delete a trashed category that still contains articles. The JSON response includes the reason in `messages.error`; API clients should treat the request as unsuccessful and should not assume the record was deleted.

Successful deletes still return `204 No Content`, missing records return `404 Not Found`, and requests denied by permissions return `403 Forbidden`. This refused-delete response change is specific to Joomla 6.2.1 and is not included in Joomla 5.4.11. See [CMS pull request #48648](https://github.com/joomla/joomla-cms/pull/48648).