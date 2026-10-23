---
title: Privacy API
sidebar_label: Privacy
---

Privacy API
===========

Inspect information requests and consents, create requests and export data through the `com_privacy` workflow.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, POST | `/v1/privacy/requests` | `requests.displayList`, `requests.add` |
| GET | `/v1/privacy/requests/{id}` | `requests.displayItem` |
| GET | `/v1/privacy/requests/export/{id}` | `requests.export` |
| GET | `/v1/privacy/consents` | `consents.displayList` |
| GET | `/v1/privacy/consents/{id}` | `consents.displayItem` |

## Forms and data

Relevant forms and extension parameter manifests are:

- [Request form (`com_privacy`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_privacy/forms/request.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `email` | string | Required address for an information request. |
| `request_type` | string | Request action, such as export or remove, as defined by the form. |
| `requested_at, status` | response fields | Request time and workflow state. |
| `GET /privacy/requests/export/{id}` | request ID | Export action for an existing request. |
| `GET /privacy/consents` | collection | Consents, separate from information requests. |

List and item endpoints for requests and consents, together with the export endpoint, require `core.admin` on `com_privacy`. There is no consent DELETE route.

Creation, confirmation, export and removal are separate stages. Creating a request does not complete export or delete a user. The export action requires `request_type: "export"` and confirmed status `1`; otherwise the model supplies no export data and the view raises a route-not-found exception.

Privacy plugins supply the export domains, but the API serialises their array as one resource. Its attributes can therefore be an array of domain names and descriptions, with an empty resource ID. Protected domain items are not included by that serializer. A missing ID can also raise a PHP warning and fail under stricter error handling. Do not treat this response as a complete personal-data export or as the export file produced in the administrator. Use the administrator export workflow when you need that complete result. There is no generic PATCH or DELETE workflow for request records.

## Export response

The export representation is distinct from the information request itself. For example,
`GET /privacy/requests/export/42` can return the following structure:

```json
{
  "data": {
    "type": "export",
    "id": "",
    "attributes": [
      {
        "name": "example",
        "description": "Example privacy domain"
      }
    ]
  }
}
```

This domain metadata is not a complete export of the person's records. Inspect the operation's schema and
use the supported privacy workflow rather than assuming that an HTTP 200 response contains all personal data.


## Backend server-side requests

Enable Web Services - Privacy and use an account with `core.admin` on `com_privacy`. This reads requests without creating one or exporting data.

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
    ->setPath('/api/index.php/v1/privacy/requests');
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
  --url "$API_BASE/privacy/requests" \
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
      "type": "requests",
      "id": "42",
      "attributes": {
        "email": "person@example.org",
        "requested_at": "2026-01-15 12:00:00",
        "status": 0
      }
    }
  ]
}
```

After creation, read `/privacy/requests/{id}` and check its workflow state. Export and removal need separate completion checks.

## Frontend browser requests

These examples read privacy requests with `GET /privacy/requests`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/privacy/requests';
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
    url.pathname = '/api/index.php/v1/privacy/requests';
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
      "type": "requests",
      "id": "42",
      "attributes": {
        "email": "person@example.org",
        "requested_at": "2026-01-15 12:00:00",
        "status": 0
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
| 400 | Email/type validation fails or a workflow action is invalid. |
| 403 | The user cannot access privacy management or export data. |
| 404 | The request or consent cannot be found. |

Form validation can produce HTTP `400 Bad Request`:

```json
{
  "errors": [
    {
      "title": "Invalid field: Email"
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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_privacy` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
