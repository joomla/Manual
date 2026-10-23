---
title: Configuration API
sidebar_label: Configuration
---

Configuration API
=================

Read or update Global Configuration and component options with `com_config`. These operations use administrator configuration forms and permissions.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, PATCH | `/v1/config/application` | `application.displayList`, `application.edit` |
| GET, PATCH | `/v1/config/{component_name}` | `component.displayList`, `component.edit` |

## Forms and data

Relevant forms and extension parameter manifests are:

- [Application form (`com_config`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_config/forms/application.xml)
- Component configuration form selected by `component_name`.

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `application settings` | object | PATCH /config/application takes top-level setting names. |
| `component options` | object | PATCH `/config/{component_name}` takes top-level option names without a params wrapper. |
| `show_title` | integer | Example com_content option: 1 shows article titles, 0 hides them. |
| `Config_com_*` | schema | OpenAPI schemas for core component option forms. |
| `smtpauth` | integer or numeric string | SMTP authentication: 0 disabled, 1 username/password, 2 OAuth 2.0. |
| `smtp_oauth2_client_id, smtp_oauth2_client_secret` | string | OAuth client settings in Global Configuration. |
| `smtp_oauth2_scope, smtp_oauth2_authorize_url, smtp_oauth2_token_url` | string | OAuth scope and provider endpoints. |

GET returns a collection in which each resource contains one setting in `attributes`. Page through all results when taking a baseline. PATCH merges component options with their existing values before validating the selected form. A successful configuration PATCH does not return the updated configuration: an empty JSON array is possible. Read the options again. Global component options and options on individual articles are separate settings.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## SMTP authentication options

Global mail settings belong to `/config/application`, rather than an individual component's options.
`smtpauth` accepts `0`, `1` or `2`, including their numeric string equivalents; it is not a boolean option.
OAuth 2.0 uses the `smtp_oauth2_*` settings listed above. Saving these values through REST does not perform
the browser authorisation and consent step required by the provider. Complete that step through Joomla's
mail configuration interface before relying on OAuth-authenticated mail delivery.


## Backend server-side requests

This changes the global article title option. Read the current options first and use an account with configuration permissions for com_content.

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
    'show_title' => 1,
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/config/com_content');
$http = (new HttpFactory())->getHttp(['follow_location' => false]);
$response = $http->patch(
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
  --request PATCH \
  --url "$API_BASE/config/com_content" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "show_title": 1
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. This action returns an empty JSON array.

```json
[]
```

Read `GET /config/com_content` and follow pagination links until `show_title` is found. Compare its value with `1`.

## Frontend browser requests

These examples read article component options with `GET /config/com_content`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/config/com_content';
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
    url.pathname = '/api/index.php/v1/config/com_content';
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
      "type": "component",
      "id": "19",
      "attributes": {
        "show_title": "1"
      }
    }
  ]
}
```

Each resource contains one option. The ID is the component extension ID; it is shared by its option resources. Follow pagination to read further options.

## Errors

These responses apply to server-side and browser clients. Check both HTTP status and response body. Wording depends on the site language, plugins and server configuration. The following examples show possible error responses.

| HTTP status | Possible cause |
| --- | --- |
| 401 | Authentication is absent or invalid, or API login is not allowed. |
| 400 | A value fails configuration form validation. |
| 403 | The user lacks configuration permission. |
| 500 | The component is unavailable or its settings cannot be saved. |

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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_config` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
