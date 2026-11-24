Web Services API
================

Joomla's core REST API provides authenticated access to administrator operations and data over HTTP. Start with the [JSON response tutorial](json-response-format/index.md) for examples of creating API routes and formatting responses.

## Enable API access

1. Enable the **Web Services** plugin for each component you need.
2. Enable **API Authentication - Web Services Joomla Token** and **User - Joomla API Token**.
3. Configure the token plugin's allowed user groups and grant **Web Services Login** (`core.login.api`) to the API user's group in Global Configuration.
4. Grant the component's `core.api` permission to groups that need its non-public API endpoints. This dedicated permission is required since Joomla 6.2.1; it is separate from `core.manage`, which continues to control administrator component access.
5. Grant only the operation permissions needed, such as `core.create`, `core.edit`, and `core.delete`. Endpoints may also check permissions on individual records, categories, or menu items.

A token authenticates a user but does not bypass ACL checks. Third-party components exposing Web Services should add this action to their `access.xml`:

```xml
<action name="core.api" title="JACTION_API" />
```

Custom API dispatchers should extend `Joomla\CMS\Dispatcher\ApiDispatcher` and preserve its access check when overriding `checkAccess()` or `dispatch()`. The default dispatcher does not apply the component-level `core.api` check to routes explicitly marked public. Since Joomla 6.2.1, a route is public only when its `public` option is the Boolean `true`:

```php
$route = ['public' => true];
```

Do not mark routes public unless unauthenticated access is intended. For the 6.2.1 migration details, see [Web Services backward-compatibility notes](/updates/61-62/removed-backward-incompatibility/#web-services-use-coreapi-in-joomla-621).
