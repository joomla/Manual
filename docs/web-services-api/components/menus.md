---
title: Menus API
sidebar_label: Menus
---

Menus API
=========

Manage menu containers and menu items with `com_menus`, keeping site and administrator clients separate.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, POST | `/v1/menus/site` | `menus.displayList`, `menus.add` |
| GET, PATCH, DELETE | `/v1/menus/site/{id}` | `menus.displayItem`, `menus.edit`, `menus.delete` |
| GET, POST | `/v1/menus/administrator` | `menus.displayList`, `menus.add` |
| GET, PATCH, DELETE | `/v1/menus/administrator/{id}` | `menus.displayItem`, `menus.edit`, `menus.delete` |
| GET, POST | `/v1/menus/site/items` | `items.displayList`, `items.add` |
| GET, PATCH, DELETE | `/v1/menus/site/items/{id}` | `items.displayItem`, `items.edit`, `items.delete` |
| GET, POST | `/v1/menus/administrator/items` | `items.displayList`, `items.add` |
| GET, PATCH, DELETE | `/v1/menus/administrator/items/{id}` | `items.displayItem`, `items.edit`, `items.delete` |
| GET | `/v1/menus/site/items/types` | `items.getTypes` |
| GET | `/v1/menus/administrator/items/types` | `items.getTypes` |

Collection GET lists records; item GET reads one; POST creates; PATCH updates; DELETE removes an eligible record. Some records must first be trashed. Consult individual operation responses for exceptions.

## Forms and data

Relevant forms and extension parameter manifests are:

- [Menu form (`com_menus`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_menus/forms/menu.xml)
- [Item form (`com_menus`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_menus/forms/item.xml)
- [Itemadmin form (`com_menus`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_menus/forms/itemadmin.xml)
- Menu item form selected by the item `type`.

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `menutype, title` | string | Required menu container key and title. |
| `title, menutype, type` | string | Required base menu item fields. |
| `parent_id` | integer or numeric string | Parent item in the menu tree. |
| `link, request, params` | string, object, object | Target and options chosen by item type and component view. |
| `published, home, browserNav` | integer or numeric string | Publication, default-page status and browser behaviour. |
| `access, template_style_id` | integer or numeric string | Viewing access level and template style. |

`/menus/site` and `/menus/administrator` hold containers; their `/items` collections hold links. When creating an administrator menu, send `client_id: 1`: without it, `POST /menus/administrator` returns 200 but creates a site menu. Discover item types with `/menus/{client}/items/types`, whose response has its own shape. A component item loads the target view parameter form. Public SEF URLs depend on ancestry, language and the component router, rather than alias alone.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Backend server-side requests

Use a unique menutype. This creates a site menu container without items or module assignment.

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
    'menutype' => 'api-menu',
    'title' => 'API menu',
    'description' => 'Menu created through the API',
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/menus/site');
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
  --url "$API_BASE/menus/site" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "menutype": "api-menu",
  "title": "API menu",
  "description": "Menu created through the API"
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "menus",
    "id": "42",
    "attributes": {
      "menutype": "api-menu",
      "title": "API menu",
      "description": "Menu created through the API"
    }
  }
}
```

Read `GET /menus/site/{id}`. For item changes, read the item and inspect its public URL independently.

## Frontend browser requests

These examples read site menu containers with `GET /menus/site`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/menus/site';
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
    url.pathname = '/api/index.php/v1/menus/site';
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
      "type": "menus",
      "id": "42",
      "attributes": {
        "menutype": "api-menu",
        "title": "API menu",
        "description": "Menu created through the API"
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
| 400 | Required fields are missing or the menu key is invalid. |
| 403 | The user cannot manage this menu client. |
| 404 | The menu, item or type cannot be found. |

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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_menus` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
