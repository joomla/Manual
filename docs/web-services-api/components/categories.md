---
title: Categories API
sidebar_label: Categories
---

Categories API
==============

Manage the category trees shared by articles, contacts, banners and news feeds. The route selects the component that owns the tree.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, POST | `/v1/banners/categories` | `categories.displayList`, `categories.add` |
| GET, PATCH, DELETE | `/v1/banners/categories/{id}` | `categories.displayItem`, `categories.edit`, `categories.delete` |
| GET, POST | `/v1/contacts/categories` | `categories.displayList`, `categories.add` |
| GET, PATCH, DELETE | `/v1/contacts/categories/{id}` | `categories.displayItem`, `categories.edit`, `categories.delete` |
| GET, POST | `/v1/content/categories` | `categories.displayList`, `categories.add` |
| GET, PATCH, DELETE | `/v1/content/categories/{id}` | `categories.displayItem`, `categories.edit`, `categories.delete` |
| GET, POST | `/v1/newsfeeds/categories` | `categories.displayList`, `categories.add` |
| GET, PATCH, DELETE | `/v1/newsfeeds/categories/{id}` | `categories.displayItem`, `categories.edit`, `categories.delete` |

Collection GET lists records; item GET reads one; POST creates; PATCH updates; DELETE removes an eligible record. Some records must first be trashed. Consult individual operation responses for exceptions.

## Forms and data

Relevant forms and extension parameter manifests are:

- [Category form (`com_categories`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_categories/forms/category.xml)
- [Category form (`com_content`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_content/forms/category.xml)
- [Category form (`com_contact`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_contact/forms/category.xml)
- [Category form (`com_banners`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_banners/forms/category.xml)
- [Category form (`com_newsfeeds`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_newsfeeds/forms/category.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `title` | string | Required category title. |
| `parent_id` | integer or numeric string | Parent in the same tree; 1 is the root. |
| `alias, description` | string | URL alias and description. |
| `published` | integer or numeric string | Publication state. |
| `language, access` | string, integer or numeric string | Content language and viewing access level. |
| `params, metadata` | object | Component-specific options and metadata. |
| `rules` | object | ACL rules, separate from viewing access. |
| `location` | string | Tree positioning: before, after, first-child or last-child. |
| `location_reference` | integer or numeric string | Reference category for positioning after save. |
| `associations` | object | Language-to-category mapping where the owner supports multilingual associations. |

Route defaults fix `extension` to `com_content`, `com_contact`, `com_banners` or `com_newsfeeds`. Do not move a category between component trees by changing `extension`. `lft`, `rgt` and `level` are maintained by Joomla.

The collection supports `filter[state]`, an integer passed to the publication-state filter. For example, `GET /content/categories?filter[state]=1` selects published article categories.

For tree positioning, the controller reads `location` and `location_reference` from the JSON body and calls `setLocation` after saving. `location` accepts `before`, `after`, `first-child` or `last-child`; the reference is the category ID, with `parent_id` used when no explicit reference is provided. Changing ordinary fields and positioning the record are separate steps, so read back the parent and ordering even when the initial save succeeds. Component plugins can add options to the base form.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Backend server-side requests

This creates an unpublished article category. Confirm parent ID `1` is the root of the target tree.

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
    'title' => 'API category',
    'alias' => 'api-category',
    'parent_id' => 1,
    'published' => 0,
    'language' => '*',
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/content/categories');
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
  --url "$API_BASE/content/categories" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "title": "API category",
  "alias": "api-category",
  "parent_id": 1,
  "published": 0,
  "language": "*"
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "categories",
    "id": "42",
    "attributes": {
      "title": "API category",
      "alias": "api-category",
      "published": 0
    }
  }
}
```

Read `GET /content/categories/{id}`. Use the matching route prefix for another component tree.

## Frontend browser requests

These examples read article categories with `GET /content/categories`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/content/categories';
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
    url.pathname = '/api/index.php/v1/content/categories';
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
      "type": "categories",
      "id": "42",
      "attributes": {
        "title": "API category",
        "alias": "api-category",
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
| 400 | The title or selected parent is invalid. |
| 403 | The user cannot manage categories in this component. |
| 404 | The category cannot be found in this context. |

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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_categories` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
