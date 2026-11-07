---
title: Contacts API
sidebar_label: Contacts
---

Contacts API
============

Manage contact records with `com_contact`, or submit a message to an existing contact through its form action.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| POST | `/v1/contacts/form/{id}` | `contact.submitForm` |
| GET, POST | `/v1/contacts` | `contact.displayList`, `contact.add` |
| GET, PATCH, DELETE | `/v1/contacts/{id}` | `contact.displayItem`, `contact.edit`, `contact.delete` |

Collection GET lists records; item GET reads one; POST creates; PATCH updates; DELETE removes an eligible record. Some records must first be trashed. Consult individual operation responses for exceptions.

## Forms and data

Relevant forms and extension parameter manifests are:

- [Administrator contact form (`com_contact`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_contact/forms/contact.xml)
- [Contact message form (`com_contact`)](https://github.com/joomla/joomla-cms/blob/6.2.0/components/com_contact/forms/contact.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `name, catid` | string, integer | Required when creating a contact. |
| `published` | integer or numeric string | Publication state. |
| `state` | string | Geographical region, not publication state. |
| `email_to, user_id` | string, integer or numeric string | Contact email or linked Joomla user. |
| `address, suburb, country` | string | Location fields. |
| `params, metadata, com_fields` | object | Options, metadata and custom fields. |
| `contact_name, contact_email, contact_subject, contact_message` | string | Required message fields for POST `/contacts/form/{id}`. |
| `contact_email_copy` | boolean | Request a copy, subject to contact configuration. |

Creating a contact and sending a message are separate operations. `/contacts/form/{id}` uses an existing contact ID and can involve contact plugins, CAPTCHA and mail delivery; it does not return a new contact record. A successful action can return `[]`. Avoid automatically retrying message submissions because this can send duplicate mail. Contact categories belong to `com_contact`.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Backend server-side requests

Replace category ID `2` with an existing contact category. This creates an unpublished contact and sends no message.

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
    'name' => 'API contact',
    'catid' => 2,
    'published' => 0,
    'language' => '*',
    'email_to' => 'contact@example.org',
    'state' => 'Cumbria',
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/contacts');
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
  --url "$API_BASE/contacts" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "name": "API contact",
  "catid": 2,
  "published": 0,
  "language": "*",
  "email_to": "contact@example.org",
  "state": "Cumbria"
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "contacts",
    "id": "42",
    "attributes": {
      "name": "API contact",
      "published": 0,
      "state": "Cumbria"
    }
  }
}
```

Read `GET /contacts/{id}` and compare the fields. For the message action, check its result separately from actual mail delivery.

## Frontend browser requests

These examples read contacts with `GET /contacts`. Calling the API from the browser still uses administrator models and ACL.
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
    url.pathname = '/api/index.php/v1/contacts';
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
    url.pathname = '/api/index.php/v1/contacts';
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
      "type": "contacts",
      "id": "42",
      "attributes": {
        "name": "API contact",
        "published": 0,
        "state": "Cumbria"
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
| 400 | Contact validation, message validation or CAPTCHA fails. |
| 403 | The user cannot manage the contact or perform this action. |
| 404 | The contact cannot be found. |

Form validation can produce HTTP `400 Bad Request`:

```json
{
  "errors": [
    {
      "title": "Invalid field: Name"
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
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_contact` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
