---
title: Joomla Update API
sidebar_label: Joomla Update
---

Joomla Update API
=================

The `com_joomlaupdate` web service supports automatic core updates with its own authentication and action responses.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET | `/v1/joomlaupdate/healthcheck` | `healthcheck.show` |
| GET | `/v1/joomlaupdate/getUpdate` | `updates.getUpdate` |
| POST | `/v1/joomlaupdate/prepareUpdate` | `updates.prepareUpdate` |
| POST | `/v1/joomlaupdate/finalizeUpdate` | `updates.finalizeUpdate` |
| POST | `/v1/joomlaupdate/notificationSuccess` | `notification.success` |
| POST | `/v1/joomlaupdate/notificationFailed` | `notification.failed` |

## Forms and data

Relevant forms and extension parameter manifests are:

- [Configuration form (`com_joomlaupdate`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_joomlaupdate/config.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `X-JUpdate-Token` | header string | Private update token, independent of X-Joomla-Token. |
| `targetVersion` | string | Required prepareUpdate input identifying an available update. |
| `fromVersion, updateFileName` | string | Finalisation inputs; filename is reduced to its basename. |
| `fromVersion, toVersion` | string | Version information for notification actions. |
| `success, errors` | response fields | Check action-level success even when HTTP status is 200. |

Routes are public for ordinary API routing, but controllers validate the private update token and automatic-update policy. Enable automatic updates and use an allowed update source and stability. `prepareUpdate` can return a temporary extraction password: treat it as a secret. A missing or invalid token is formatted as HTTP 400 with internal code 403. An unavailable target version can produce a generic HTTP 500. Do not infer HTTP status from an internal code or action result.

## Backend server-side requests

Enable Web Services - Joomla Update, configure automatic updates and obtain the private update token. This reads a health check without starting an update.

### Joomla HTTPFactory

Use this request in a Joomla component, plugin or console command. Set the API URL, token and record values for the target site. Keep the token in your integration's secret store. HTTP and JSON errors throw exceptions for the calling extension to handle.

```php
<?php
declare(strict_types=1);

use Joomla\Http\HttpFactory;
use Joomla\Uri\Uri;

$siteUrl = 'https://example.org';
$token = 'REPLACE_WITH_YOUR_UPDATE_TOKEN';
$headers = [
    'Accept' => 'application/vnd.api+json',
    'Content-Type' => 'application/json',
    'X-JUpdate-Token' => $token,
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/joomlaupdate/healthcheck');
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
TOKEN='REPLACE_WITH_YOUR_UPDATE_TOKEN'

curl --silent --show-error --fail-with-body --include --globoff \
  --request GET \
  --url "$API_BASE/joomlaupdate/healthcheck" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-JUpdate-Token: '"$TOKEN"
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "healthcheck",
    "id": "healthcheck",
    "attributes": {
      "php_version": "8.3.0",
      "db_type": "mysqli",
      "db_version": "8.0.0",
      "cms_version": "6.2.0"
    }
  }
}
```

For update actions, inspect the operation-specific result, then independently verify the installed version and update state. A health check does not demonstrate update completion.

## Frontend browser requests

These examples read Joomla Update component options with `GET /config/com_joomlaupdate`. Calling the API from the browser still uses administrator models and ACL.
Follow the [browser setup and authentication guidance](../index.md#frontend-browser-requests), including loading Joomla's `core` script for `Joomla.request`.
Replace the site origin and API path, then enter the signed-in operator's personal API token when prompted. Keep shared integration tokens on the server.

The browser examples use the **Configuration** API and ordinary `X-Joomla-Token` authentication to read Joomla Update options. Enable **Web Services - Config** and grant the required configuration permissions. They do not run an update. Keep the separate `X-JUpdate-Token` update workflow in a server-side integration.

### Joomla.request

```javascript
(async () => {
    const token = window.prompt('Enter your personal Joomla API token');

    if (!token) {
        throw new Error('An API token is required.');
    }

    const url = new URL('https://example.org');
    url.pathname = '/api/index.php/v1/config/com_joomlaupdate';
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
    url.pathname = '/api/index.php/v1/config/com_joomlaupdate';
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
        "updatesource": "default"
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
| 400 | The token is missing or invalid; the body can contain code 403. |
| 500 | The target update is unavailable or an action fails. |

An invalid update token can produce HTTP `400 Bad Request` with a different internal code:

```json
{
  "errors": [
    {
      "title": "Invalid update token",
      "code": 403
    }
  ]
}
```

After an interrupted or failed write, read the resource before retrying. Saving may have occurred before a later error.

## References

- [OpenAPI reference](../openapi.md)
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_joomlaupdate` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
