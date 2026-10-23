---
title: Users API
sidebar_label: Users
---

Users API
=========

Manage users, groups and viewing access levels with `com_users`. These are separate resources with separate administrator forms.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, POST | `/v1/users` | `users.displayList`, `users.add` |
| GET, PATCH, DELETE | `/v1/users/{id}` | `users.displayItem`, `users.edit`, `users.delete` |
| GET, POST | `/v1/users/groups` | `groups.displayList`, `groups.add` |
| GET, PATCH, DELETE | `/v1/users/groups/{id}` | `groups.displayItem`, `groups.edit`, `groups.delete` |
| GET, POST | `/v1/users/levels` | `levels.displayList`, `levels.add` |
| GET, PATCH, DELETE | `/v1/users/levels/{id}` | `levels.displayItem`, `levels.edit`, `levels.delete` |

Collection GET lists records; item GET reads one; POST creates; PATCH updates; DELETE removes an eligible record. Some records must first be trashed. Consult individual operation responses for exceptions.

## Forms and data

Relevant forms and extension parameter manifests are:

- [User form (`com_users`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_users/forms/user.xml)
- [Group form (`com_users`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_users/forms/group.xml)
- [Level form (`com_users`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_users/forms/level.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `name, username, email` | string | Required when creating a user. |
| `password` | string | New password; omitted PATCH preserves it. |
| `groups` | array | User group IDs, separate from content access-level IDs. |
| `block, requireReset, sendEmail` | integer or numeric string flags | Blocking, password reset and system-email preference. |
| `params, com_fields` | object | Preferences and custom fields. |
| `title, parent_id` | string, integer or numeric string | Group title and parent. |
| `title, rules` | string, group selection | Access-level title and allowed groups; different from component ACL rules. |

GET never returns passwords. The create controller copies a supplied `password` into confirmation. PATCH preserves omitted passwords and has special handling for omitted group memberships. Filters such as `registrationDateStart` and `lastVisitDateEnd` take RFC3339 date-time values, unlike many administrator calendar writes. User plugins and custom fields can extend the form. Grant integrations only the group-management permissions they need.

Managing user groups and creating, editing or deleting viewing access levels requires `core.admin` on `com_users`. A general edit permission is insufficient for these operations.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Access-level group rules

Access-level `rules` contains the IDs of groups allowed to view the content. Its input type differs between
creation and editing because the edit controller decodes the stored JSON before form validation.

For `POST /users/levels`, send an array:

```json
{
  "title": "Example access level",
  "rules": [2, 3]
}
```

For `PATCH /users/levels/5`, send that array as a JSON-encoded string:

```json
{
  "rules": "[2,3]"
}
```

Replace the level and group IDs with existing site values. Sending an array in this PATCH field causes
a `TypeError`; omitting `rules` preserves the saved selection. Read `/users/levels/{id}` afterwards and
compare the groups. These group IDs have a different meaning from a component's nested ACL rules.


## Backend server-side requests

Use a unique username, an address you control and a strong password; confirm group ID `2`. This creates a blocked account. User plugins can still trigger notifications.

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
    'name' => 'API example user',
    'username' => 'api-example-user',
    'email' => 'api-user@example.org',
    'password' => 'REPLACE_WITH_A_UNIQUE_STRONG_PASSWORD',
    'groups' => [2],
    'block' => 1,
    'sendEmail' => 0,
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/users');
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
  --url "$API_BASE/users" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "name": "API example user",
  "username": "api-example-user",
  "email": "api-user@example.org",
  "password": "REPLACE_WITH_A_UNIQUE_STRONG_PASSWORD",
  "groups": [
    2
  ],
  "block": 1,
  "sendEmail": 0
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "users",
    "id": "42",
    "attributes": {
      "name": "API example user",
      "username": "api-example-user",
      "email": "api-user@example.org",
      "block": 1,
      "groups": [
        2
      ]
    }
  }
}
```

Read `GET /users/{id}` and compare non-secret fields and group membership. Responses must not contain the password.

## Frontend browser requests

These examples read users with `GET /users`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/users';
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
    url.pathname = '/api/index.php/v1/users';
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
      "type": "users",
      "id": "42",
      "attributes": {
        "name": "API example user",
        "username": "api-example-user",
        "email": "api-user@example.org",
        "block": 1,
        "groups": [
          2
        ]
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
| 400 | Required fields, uniqueness, password or group validation fails. |
| 403 | The user cannot manage accounts or assign this group. |
| 404 | The user, group or access level cannot be found. |

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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_users` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
