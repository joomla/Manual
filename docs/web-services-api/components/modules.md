---
title: Modules API
sidebar_label: Modules
---

Modules API
===========

Manage module instances with `com_modules`. An instance combines module type, parameters, template position and menu assignment.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET | `/v1/modules/types/site` | `modules.getTypes` |
| GET | `/v1/modules/types/administrator` | `modules.getTypes` |
| GET, POST | `/v1/modules/site` | `modules.displayList`, `modules.add` |
| GET, PATCH, DELETE | `/v1/modules/site/{id}` | `modules.displayItem`, `modules.edit`, `modules.delete` |
| GET, POST | `/v1/modules/administrator` | `modules.displayList`, `modules.add` |
| GET, PATCH, DELETE | `/v1/modules/administrator/{id}` | `modules.displayItem`, `modules.edit`, `modules.delete` |

Collection GET lists records; item GET reads one; POST creates; PATCH updates; DELETE removes an eligible record. Some records must first be trashed. Consult individual operation responses for exceptions.

## Forms and data

Relevant forms and extension parameter manifests are:

- [Module form (`com_modules`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_modules/forms/module.xml)
- [Moduleadmin form (`com_modules`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_modules/forms/moduleadmin.xml)
- Site module parameter form selected by `module`.
- Administrator module parameter form selected by `module`.

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `title` | string | Required instance title. |
| `module` | string | Installed module type, such as mod_custom. |
| `content` | string | Custom HTML for mod_custom. |
| `position` | string | Position supported by the active template. |
| `published, showtitle` | integer or numeric string | Publication and title-display flags. |
| `assignment, assigned` | integer or numeric string, array | Assignment mode and menu IDs. |
| `params` | object | Parameter schema selected by module type and client. |

Site routes set `client_id=0`; administrator routes set `client_id=1` for reading. When creating an administrator module, also send `client_id: 1`: without it, `POST /modules/administrator` creates a site module and returns 404. A new module also needs `language` and a non-empty `params` object. `/modules/types/{client}` lists types, not instances. Select the parameter schema by type and client rather than instance ID alone. An empty assignment set does not automatically mean all pages: specify the assignment mode. Third-party module forms can add parameters.

Module instance lists use standard pagination, while the module-type endpoints return the retrieved type list without generic page slicing.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Backend server-side requests

Confirm mod_custom is installed. This creates an unpublished site module assigned to all pages. Select a real template position before publishing.

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

$payload = [
    'title' => 'API custom module',
    'module' => 'mod_custom',
    'content' => '<p>Example module</p>',
    'published' => 0,
    'showtitle' => 1,
    'language' => '*',
    'assignment' => '0',
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/modules/site');
$http = (new HttpFactory())->getHttp(['follow_location' => false]);
$response = $http->post(
    $uri,
    json_encode($payload, JSON_THROW_ON_ERROR), $headers,
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
  --request POST \
  --url "$API_BASE/modules/site" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "title": "API custom module",
  "module": "mod_custom",
  "content": "<p>Example module</p>",
  "published": 0,
  "showtitle": 1,
  "language": "*",
  "assignment": "0"
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "modules",
    "id": "42",
    "attributes": {
      "title": "API custom module",
      "module": "mod_custom",
      "published": 0
    }
  }
}
```

Read `GET /modules/site/{id}` and compare content, publication and assignment. Inspect frontend output separately after publishing.

## Frontend browser requests

These examples read site modules with `GET /modules/site`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/modules/site';
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
    url.pathname = '/api/index.php/v1/modules/site';
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
      "type": "modules",
      "id": "42",
      "attributes": {
        "title": "API custom module",
        "module": "mod_custom",
        "published": 0
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
| 400 | Title, type or module parameter validation fails. |
| 403 | The user cannot manage modules for this client. |
| 404 | The module instance or type cannot be found. |

Form validation can produce HTTP `400 Bad Request`:

```json
{
  "errors": [
    {
      "title": "Invalid field: Title"
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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_modules` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
