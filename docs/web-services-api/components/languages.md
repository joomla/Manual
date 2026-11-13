---
title: Languages API
sidebar_label: Languages
---

Languages API
=============

Manage content languages and string overrides with `com_languages`. Language package installation is a separate operation.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, POST | `/v1/languages/content` | `languages.displayList`, `languages.add` |
| GET, PATCH, DELETE | `/v1/languages/content/{id}` | `languages.displayItem`, `languages.edit`, `languages.delete` |
| POST | `/v1/languages/overrides/search` | `strings.search` |
| POST | `/v1/languages/overrides/search/cache/refresh` | `strings.refresh` |
| GET, POST | `/v1/languages/overrides/site/{lang_code}` | `overrides.displayList`, `overrides.add` |
| GET, PATCH, DELETE | `/v1/languages/overrides/site/{lang_code}/{id}` | `overrides.displayItem`, `overrides.edit`, `overrides.delete` |
| GET, POST | `/v1/languages/overrides/administrator/{lang_code}` | `overrides.displayList`, `overrides.add` |
| GET, PATCH, DELETE | `/v1/languages/overrides/administrator/{lang_code}/{id}` | `overrides.displayItem`, `overrides.edit`, `overrides.delete` |

## Forms and data

Relevant forms and extension parameter manifests are:

- [Language form (`com_languages`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_languages/forms/language.xml)
- [Override form (`com_languages`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_languages/forms/override.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `lang_code, title, title_native, sef` | string | Required tag, title, native title and URL language code. |
| `published, access` | integer or numeric string | Publication state and viewing access level. |
| `key, override` | string | Language constant and replacement text. |
| `app, lang_code` | client and language | Override client and installed language. |
| `searchstring, searchtype` | string | Search term and type constant or value. |

Content-language IDs are numeric. Override IDs are constants matching `[A-Z0-9_]+`. The override write field is `override`, whereas responses use `value`. Override routes are generated for installed languages.

Saving an override reads `app` and `lang_code` from POST input. For POST, the API application puts route parameters into that input. For PATCH, route parameters are placed in the general input, so the client/language context is not guaranteed by the route and JSON body alone. Use the administrator override editor if PATCH cannot preserve the intended context.

Content-language lists use standard pagination. Override lists and string searches do not use the generic `page[offset]` and `page[limit]` slicing; check the operation-specific response.

## Backend server-side requests

Enable Web Services - Languages. This lists content languages without installing or creating one.

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
    ->setPath('/api/index.php/v1/languages/content');
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
  --url "$API_BASE/languages/content" \
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
      "type": "languages",
      "id": "42",
      "attributes": {
        "lang_code": "en-GB",
        "title": "English (United Kingdom)",
        "title_native": "English (United Kingdom)",
        "sef": "en",
        "published": 1
      }
    }
  ]
}
```

After a content-language write, read `/languages/content/{id}`. For an override, read the same client/language collection and compare its saved value.

## Frontend browser requests

These examples read content languages with `GET /languages/content`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/languages/content';
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
    url.pathname = '/api/index.php/v1/languages/content';
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
      "type": "languages",
      "id": "42",
      "attributes": {
        "lang_code": "en-GB",
        "title": "English (United Kingdom)",
        "title_native": "English (United Kingdom)",
        "sef": "en",
        "published": 1
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
| 400 | Content-language or override validation fails. |
| 403 | The user lacks language management access. |
| 404 | The language-specific route or record does not exist. |

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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_languages` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
