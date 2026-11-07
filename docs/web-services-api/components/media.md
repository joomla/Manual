---
title: Media API
sidebar_label: Media
---

Media API
=========

Discover storage adapters, list media, create folders, upload files and modify files through the `com_media` Media Manager backend.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET | `/v1/media/adapters` | `adapters.displayList` |
| GET | `/v1/media/adapters/{id}` | `adapters.displayItem` |
| GET, POST | `/v1/media/files` | `media.displayList`, `media.add` |
| GET | `/v1/media/files/{path}/` | `media.displayList` |
| GET, PATCH, DELETE | `/v1/media/files/{path}` | `media.displayItem`, `media.edit`, `media.delete` |

## Forms and data

Relevant forms and extension parameter manifests are:

- [File form (`com_media`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_media/forms/file.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `path` | string | Adapter-qualified path, such as local-images:/api-example. |
| `content` | base64 string | File bytes without a data URI prefix; omit to create a folder. |
| `override` | boolean | Overwrite flag: POST defaults to false, PATCH to true. |
| `PATCH URL path` | string | Existing item path. |
| `PATCH body path` | string | New path when renaming or moving. |
| `url, content, tempUrl` | response fields | Conditional on request options and adapter capabilities. |

Discover adapter IDs through `/media/adapters`; `local-images` is site configuration, not a universal ID. `/media/files/{path}/` lists a directory; the same path without the trailing slash reads one item. Use JSON rather than multipart. For files, provide base64 `content`; for folders, omit it. PATCH requires at least `path` or `content`; explicitly set `override: false` to forbid overwriting. Allowed extensions, MIME types, sizes and operations depend on Media Manager and adapter settings.

The media models return the retrieved set without standard page slicing; do not use `page[limit]` to infer completeness. File lists support `filter[search]` and `search_recursive`. The `url`, `temp` and `content` query flags select optional URL, temporary URL or encoded-content attributes where the adapter supports them.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Backend server-side requests

Confirm the adapter ID with GET /media/adapters. This creates a folder named api-example. Use a name that does not already exist.

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
    'path' => 'local-images:/api-example',
    'override' => false,
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/media/files');
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
  --url "$API_BASE/media/files" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "path": "local-images:/api-example",
  "override": false
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "media",
    "id": "0",
    "attributes": {
      "name": "api-example",
      "path": "local-images:/api-example",
      "type": "dir"
    }
  }
}
```

Read `GET /media/files/local-images:/api-example` for the created item; add the trailing slash to list its contents. URL-encode segments containing reserved characters, but not the
slashes between them: with Apache's default `AllowEncodedSlashes Off`, a `%2F` in the URL path returns a 404 from
the web server before Joomla is reached. `GET /media/files?path=local-images:/api-example/` lists the same folder
through a query parameter, where encoded slashes do work.

## Frontend browser requests

These examples read available media adapters with `GET /media/adapters`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/media/adapters';

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
    url.pathname = '/api/index.php/v1/media/adapters';

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
      "type": "adapters",
      "id": "local-images",
      "attributes": {
        "provider_id": "local",
        "name": "images",
        "path": "images"
      }
    }
  ]
}
```

Adapter IDs and paths depend on the enabled filesystem plugins and their configuration.

## Errors

These responses apply to server-side and browser clients. Check both HTTP status and response body. Wording depends on the site language, plugins and server configuration. The following examples show possible error responses.

| HTTP status | Possible cause |
| --- | --- |
| 401 | Authentication is absent or invalid, or API login is not allowed. |
| 400 | Path, content or the operation is invalid. |
| 403 | The user or adapter disallows this operation. |
| 404 | The adapter or source item does not exist. |

Form validation can produce HTTP `400 Bad Request`:

```json
{
  "errors": [
    {
      "title": "Invalid field: Path"
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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_media` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
