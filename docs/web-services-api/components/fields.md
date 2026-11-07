---
title: Custom Fields API
sidebar_label: Custom Fields
---

Custom Fields API
=================

Manage custom-field definitions and groups with `com_fields`. Values for a particular article, contact or user are written through the owning component.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, POST | `/v1/fields/contacts/contact` | `fields.displayList`, `fields.add` |
| GET, PATCH, DELETE | `/v1/fields/contacts/contact/{id}` | `fields.displayItem`, `fields.edit`, `fields.delete` |
| GET, POST | `/v1/fields/contacts/mail` | `fields.displayList`, `fields.add` |
| GET, PATCH, DELETE | `/v1/fields/contacts/mail/{id}` | `fields.displayItem`, `fields.edit`, `fields.delete` |
| GET, POST | `/v1/fields/contacts/categories` | `fields.displayList`, `fields.add` |
| GET, PATCH, DELETE | `/v1/fields/contacts/categories/{id}` | `fields.displayItem`, `fields.edit`, `fields.delete` |
| GET, POST | `/v1/fields/groups/contacts/contact` | `groups.displayList`, `groups.add` |
| GET, PATCH, DELETE | `/v1/fields/groups/contacts/contact/{id}` | `groups.displayItem`, `groups.edit`, `groups.delete` |
| GET, POST | `/v1/fields/groups/contacts/mail` | `groups.displayList`, `groups.add` |
| GET, PATCH, DELETE | `/v1/fields/groups/contacts/mail/{id}` | `groups.displayItem`, `groups.edit`, `groups.delete` |
| GET, POST | `/v1/fields/groups/contacts/categories` | `groups.displayList`, `groups.add` |
| GET, PATCH, DELETE | `/v1/fields/groups/contacts/categories/{id}` | `groups.displayItem`, `groups.edit`, `groups.delete` |
| GET, POST | `/v1/fields/content/articles` | `fields.displayList`, `fields.add` |
| GET, PATCH, DELETE | `/v1/fields/content/articles/{id}` | `fields.displayItem`, `fields.edit`, `fields.delete` |
| GET, POST | `/v1/fields/content/categories` | `fields.displayList`, `fields.add` |
| GET, PATCH, DELETE | `/v1/fields/content/categories/{id}` | `fields.displayItem`, `fields.edit`, `fields.delete` |
| GET, POST | `/v1/fields/groups/content/articles` | `groups.displayList`, `groups.add` |
| GET, PATCH, DELETE | `/v1/fields/groups/content/articles/{id}` | `groups.displayItem`, `groups.edit`, `groups.delete` |
| GET, POST | `/v1/fields/groups/content/categories` | `groups.displayList`, `groups.add` |
| GET, PATCH, DELETE | `/v1/fields/groups/content/categories/{id}` | `groups.displayItem`, `groups.edit`, `groups.delete` |
| GET, POST | `/v1/fields/users` | `fields.displayList`, `fields.add` |
| GET, PATCH, DELETE | `/v1/fields/users/{id}` | `fields.displayItem`, `fields.edit`, `fields.delete` |
| GET, POST | `/v1/fields/groups/users` | `groups.displayList`, `groups.add` |
| GET, PATCH, DELETE | `/v1/fields/groups/users/{id}` | `groups.displayItem`, `groups.edit`, `groups.delete` |

Collection GET lists records; item GET reads one; POST creates; PATCH updates; DELETE removes an eligible record. Some records must first be trashed. Consult individual operation responses for exceptions.

## Forms and data

Relevant forms and extension parameter manifests are:

- [Field form (`com_fields`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_fields/forms/field.xml)
- [Group form (`com_fields`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_fields/forms/group.xml)
- Field plugin parameter form selected by the field `type`.

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `title, type` | string | Required field title and enabled field plugin type. |
| `name` | string | Machine name used to submit the value on its owner. |
| `group_id` | integer or numeric string | Group in the same context, or 0 for no group. |
| `assigned_cat_ids` | array | Category IDs restricting applicability. |
| `fieldparams` | object | Options of the selected field type. |
| `params` | object | Display and behaviour options. |
| `title` | string | Required when creating a group. |
| `com_fields on owner` | object | Values keyed by machine name, not definition ID. |

The route selects the context for reading: article, category, contact, contact-mail and user fields have separate collections. When creating a field or field group, also send `context` with the context of the route, for example `com_content.article`: the route's context is not applied when saving. Without it the record is saved without a context, and the request returns 404. `description` and a non-empty `params` object are also needed when creating a field (`description` when creating a group), and a field name must be unique over all contexts. Do not reuse a definition ID in another context. The field plugin determines value shape and `fieldparams`. A text field takes a string; a subform has rows whose complete structure must be preserved. A partial recursive merge of subform rows is not guaranteed. The contracts include parameter forms for core field plugins.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Backend server-side requests

Enable Fields - Text and Web Services - Fields. This creates an article field definition without setting any article value.

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
    'title' => 'Reading time',
    'name' => 'reading-time',
    'type' => 'text',
    'label' => 'Reading time',
    'state' => 1,
    'language' => '*',
    'required' => 0,
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/fields/content/articles');
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
  --url "$API_BASE/fields/content/articles" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "title": "Reading time",
  "name": "reading-time",
  "type": "text",
  "label": "Reading time",
  "state": 1,
  "language": "*",
  "required": 0
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "fields",
    "id": "42",
    "attributes": {
      "title": "Reading time",
      "name": "reading-time",
      "type": "text",
      "context": "com_content.article"
    }
  }
}
```

Read `GET /fields/content/articles/{id}`. To set its value, PATCH an article with `{"com_fields":{"reading-time":"5 minutes"}}`, then read that article again.

## Frontend browser requests

These examples read article custom fields with `GET /fields/content/articles`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/fields/content/articles';
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
    url.pathname = '/api/index.php/v1/fields/content/articles';
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
      "type": "fields",
      "id": "42",
      "attributes": {
        "title": "Reading time",
        "name": "reading-time",
        "type": "text",
        "context": "com_content.article"
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
| 400 | The title, type or type-specific field validation fails. |
| 403 | The user cannot manage fields in this context. |
| 404 | The field or group is absent from this context. |

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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_fields` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
