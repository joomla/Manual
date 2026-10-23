---
title: Content History API
sidebar_label: Content History
---

Content History API
===================

Read stored versions of articles, contacts and banners with `com_contenthistory`, and manage whether individual versions are retained.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, DELETE | `/v1/banners/{id}/contenthistory` | `history.displayList`, `history.delete` |
| PATCH | `/v1/banners/{id}/contenthistory/keep` | `history.keep` |
| GET, DELETE | `/v1/contacts/{id}/contenthistory` | `history.displayList`, `history.delete` |
| PATCH | `/v1/contacts/{id}/contenthistory/keep` | `history.keep` |
| GET, DELETE | `/v1/content/articles/{id}/contenthistory` | `history.displayList`, `history.delete` |
| PATCH | `/v1/content/articles/{id}/contenthistory/keep` | `history.keep` |

## Forms and data

These actions use stored version data, rather than an editable administrator record form.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `id in GET history path` | integer | ID of the owning article, contact or banner. |
| `id in keep or DELETE path` | integer | History version ID, not owner ID. |
| `version_note, save_date` | string | Version note and timestamp. |
| `keep_forever` | 0/1 flag | Protection from automatic version cleanup. |
| `version_data` | object or array | Version data decoded by the API view from the stored JSON string. |

GET uses the owner ID and route defaults for `type_alias` and `type_id`. PATCH to `/keep` toggles `keep_forever`; it does not accept a desired state such as `{"keep":true}`. Repeating it can undo the first action. There is no general history creation form or restore endpoint here. Use stored version data as editing source only when it matches the owner and intended version.

## Backend server-side requests

Replace article ID `42` with an article whose history you can view. Version history must have been enabled to obtain stored versions.

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
    ->setPath('/api/index.php/v1/content/articles/42/contenthistory');
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
  --url "$API_BASE/content/articles/42/contenthistory" \
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
      "type": "history",
      "id": "42",
      "attributes": {
        "version_note": "First draft",
        "keep_forever": "0",
        "version_data": {
          "title": "API example",
          "introtext": "<p>Draft</p>"
        }
      }
    }
  ]
}
```

After toggling retention, read the owner history again and locate the version by its own `data[].id`. After deletion, confirm that version is absent.

## Frontend browser requests

These examples read stored versions of article 42 with `GET /content/articles/42/contenthistory`. Calling the API from the browser still uses administrator models and ACL.
Follow the [browser setup and authentication guidance](../index.md#frontend-browser-requests), including loading Joomla's `core` script for `Joomla.request`.
Replace the site origin and API path, then enter the signed-in operator's personal API token when prompted. Keep shared integration tokens on the server.

Replace `42` with an article ID that has stored content versions and that the API user may manage.

### Joomla.request

```javascript
(async () => {
    const token = window.prompt('Enter your personal Joomla API token');

    if (!token) {
        throw new Error('An API token is required.');
    }

    const url = new URL('https://example.org');
    url.pathname = '/api/index.php/v1/content/articles/42/contenthistory';
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
    url.pathname = '/api/index.php/v1/content/articles/42/contenthistory';
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
      "type": "history",
      "id": "42",
      "attributes": {
        "version_note": "First draft",
        "keep_forever": "0",
        "version_data": {
          "title": "API example",
          "introtext": "<p>Draft</p>"
        }
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
| 403 | The user cannot view or manage history. |
| 404 | The owner or history version cannot be found. |
| 400 | The retention action fails for this version. |

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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_contenthistory` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
