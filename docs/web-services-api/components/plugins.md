---
title: Plugins API
sidebar_label: Plugins
---

Plugins API
===========

List, inspect and update plugins with `com_plugins`. Installation and removal are outside these routes.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET | `/v1/plugins` | `plugins.displayList` |
| GET, PATCH | `/v1/plugins/{id}` | `plugins.displayItem`, `plugins.edit` |

## Forms and data

Relevant forms and extension parameter manifests are:

- [Plugin form (`com_plugins`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_plugins/forms/plugin.xml)
- Plugin parameter form selected by `folder` and `element`.

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `id / extension_id` | integer identifier | Installed plugin extension ID. |
| `folder, element` | response fields | Plugin group and machine name; not writable through this endpoint. |
| `enabled` | integer or numeric string | 1 enables the plugin, 0 disables it. |
| `ordering, access` | integer or numeric string | The other two supported PATCH fields. |

Only GET collection, GET item and PATCH item are registered. There is no plugin POST or DELETE route.

PATCH accepts only `enabled`, `access` and `ordering` in a flat JSON object. The controller checks the raw input: `params`, `folder`, `element`, `name`, a `data` wrapper or any other key causes HTTP 400. For example, `{"enabled":1}` is a supported state change; `{"params":{"example":1}}` is not.

The item response omits `params`, and the API cannot change them. Plugin parameter schemas describe the administrator form and do not grant write support to this endpoint. Read and change plugin options through that form. Changing authentication or web-services plugins can remove access needed for later requests.

## Backend server-side requests

Enable Web Services - Plugins. This lists plugins without changing their state.

### Joomla HTTPFactory

Use this request in a Joomla component, plugin or console command. Set the API URL, token and record values for the target site. Keep the token in your integration's secret store. HTTP and JSON errors throw exceptions for the calling extension to handle.

```php
<?php
declare(strict_types=1);

use Joomla\Http\HttpFactory;
use Joomla\Uri\Uri;

$siteUrl = 'https://example.org';
$token = 'REPLACE_WITH_YOUR_API_TOKEN';
$headers = [
    'Accept' => 'application/vnd.api+json',
    'Content-Type' => 'application/json',
    'X-Joomla-Token' => $token,
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/plugins');
$uri->setQuery([
    'page' => [
        'offset' => 0,
        'limit' => 20,
    ],
]);
$http = (new HttpFactory())->getHttp(['follow_location' => false]);
$response = $http->get(
    $uri,
    $headers,
    30
);

$status = $response->getStatusCode();
$body = (string) $response->getBody();

if ($status < 200 || $status >= 300) {
    throw new \RuntimeException('HTTP ' . $status . ': ' . $body);
}

$document = json_decode($body, true, 512, JSON_THROW_ON_ERROR);

if (!empty($document['errors'])) {
    throw new \RuntimeException(json_encode($document['errors'], JSON_THROW_ON_ERROR));
}

if (isset($document['success']) && $document['success'] === false) {
    throw new \RuntimeException('The API action reported failure.');
}

echo json_encode($document, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR), PHP_EOL;
```

### curl

This complete POSIX shell example requires curl 7.76 or later. On Windows, use a compatible shell such as Git Bash or WSL.

```bash
API_BASE='https://example.org/api/index.php/v1'
TOKEN='REPLACE_WITH_YOUR_API_TOKEN'

curl --silent --show-error --fail-with-body --include --globoff \
  --request GET \
  --url "$API_BASE/plugins" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --get \
  --data-urlencode 'page[offset]=0' \
  --data-urlencode 'page[limit]=20'
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": [
    {
      "type": "plugins",
      "id": "42",
      "attributes": {
        "name": "Content - Fields",
        "element": "fields",
        "folder": "content",
        "enabled": 1
      }
    }
  ]
}
```

After a state, access or ordering change, read `GET /plugins/{id}`. Plugin option changes must be checked by reopening the administrator form.

## Frontend browser requests

These examples read installed plugins with `GET /plugins`. Calling the API from the browser still uses administrator models and ACL.
Follow the [browser setup and authentication guidance](../index.md#frontend-browser-requests), including loading Joomla's `core` script for `Joomla.request`.
Replace the site origin and API path, then enter the signed-in operator's personal API token when prompted. Keep shared integration tokens on the server.

### Joomla.request

```javascript
(async () => {
    const token = window.prompt('Enter your personal Joomla API token');

    if (!token) {
        throw new Error('An API token is required.');
    }

    const url = new URL('https://example.org');
    url.pathname = '/api/index.php/v1/plugins';
    url.search = new URLSearchParams({
        "page[offset]": "0",
        "page[limit]": "20"
    }).toString();

    let xhr;

    try {
        xhr = await Joomla.request({
            url: url.toString(),
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'X-Joomla-Token': token,
            },
            promise: true,
            onBefore(request) {
                request.timeout = 30000;
            },
        });
    } catch (error) {
        // Joomla.request rejects statuses other than 200, including 204.
        if (!(error instanceof XMLHttpRequest)) {
            throw error;
        }

        xhr = error;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
        throw new Error(`HTTP ${xhr.status}: ${xhr.responseText || xhr.statusText}`);
    }

    const text = xhr.responseText;

    const document = text.trim() ? JSON.parse(text) : null;

    if (document?.errors && Object.keys(document.errors).length > 0) {
        throw new Error(JSON.stringify(document.errors));
    }

    if (document?.success === false) {
        throw new Error(document.message || 'The API action reported failure.');
    }

    console.log(document);
    return document;
})();
```

### Native fetch()

```javascript
(async () => {
    const token = window.prompt('Enter your personal Joomla API token');

    if (!token) {
        throw new Error('An API token is required.');
    }

    const url = new URL('https://example.org');
    url.pathname = '/api/index.php/v1/plugins';
    url.search = new URLSearchParams({
        "page[offset]": "0",
        "page[limit]": "20"
    }).toString();

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    let response;
    let text;

    try {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'X-Joomla-Token': token,
            },
            credentials: 'omit',
            redirect: 'error',
            signal: controller.signal,
        });
        text = await response.text();
    } finally {
        window.clearTimeout(timeout);
    }

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
    }

    const document = text.trim() ? JSON.parse(text) : null;

    if (document?.errors && Object.keys(document.errors).length > 0) {
        throw new Error(JSON.stringify(document.errors));
    }

    if (document?.success === false) {
        throw new Error(document.message || 'The API action reported failure.');
    }

    console.log(document);
    return document;
})();
```

Both examples check the HTTP status and API error fields. An empty successful body produces `null`; a JSON collection has an array in `data`.

### Browser successful response

HTTP `200 OK` returns a collection such as:

```json
{
  "data": [
    {
      "type": "plugins",
      "id": "42",
      "attributes": {
        "name": "Content - Fields",
        "element": "fields",
        "folder": "content",
        "enabled": 1
      }
    }
  ]
}
```

This collection excerpt omits other attributes, relationships, links and metadata. An empty result has `"data": []`.

## Errors

These responses apply to server-side and browser clients. Check both HTTP status and response body. Wording depends on the site language, plugins and server configuration. The following examples show possible error responses.

| HTTP status | Possible cause |
| --- | --- |
| 401 | Authentication is absent or invalid, or API login is not allowed. |
| 400 | The body contains an unsupported key, a data wrapper or invalid writable values. |
| 403 | The user cannot manage plugins. |
| 404 | The ID or an unsupported installation/removal route cannot be found. |

Form validation can produce HTTP `400 Bad Request`:

```json
{
  "errors": [
    {
      "title": "Invalid field: Access"
    }
  ]
}
```

Authentication failure can produce HTTP `401 Unauthorized`:

```json
{
  "errors": [
    {
      "title": "Forbidden"
    }
  ]
}
```

After an interrupted or failed write, read the resource before retrying. Saving may have occurred before a later error.

## References

- [OpenAPI reference](../openapi.md)
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_plugins` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
