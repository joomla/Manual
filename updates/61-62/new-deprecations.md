---
sidebar_position: 2
---

New Deprecations
================

This page lists all the new deprecations you should be aware of and what you should now be using instead.

## Developer heads-up: `ApiController::allowDelete()` in Joomla 8.0

Joomla 6.2.1 prepares an API delete-authorization change: `ApiController::delete()` passes record data
and the name of the primary-key field to `allowDelete()` when checking individual records. The base
`ApiController::allowDelete()` method still has no parameters in Joomla 6.2.1, but is planned to accept
them in Joomla 8.0.

Third-party API controllers overriding `allowDelete()` should change their method declaration from
`protected function allowDelete(): bool` to:

```php
protected function allowDelete($data = [], $key = 'id'): bool
```

The additional parameters are optional and allow record-specific authorization. This is a
forward-compatibility notice; the base method has not yet changed. See
[Removed and Backward Incompatibility](removed-backward-incompatibility.md#prepare-allowdelete-overrides-for-joomla-80)
for a migration example.

Separately, the temporary `core.api` checks in `ApiController` for create, edit, and delete operations are deprecated and planned for removal in Joomla 8.0. They are a compatibility fallback, not a replacement for extending `ApiDispatcher`, particularly for read requests and custom controller actions. See the [Web Services migration notes](removed-backward-incompatibility.md#web-services-use-coreapi-in-joomla-621).
