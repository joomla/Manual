---
title: Articles API
sidebar_label: Articles
---

Articles API
============

Manage articles with `com_content`, using the category, workflow, custom-field and permission rules of the administrator article editor.

See the [introduction](../index.md) for authentication, request formats and error handling.

## Routes

Paths are relative to `/api/index.php`. Enable the corresponding **Web Services** plugin.

| Methods | Path | Controller tasks |
| --- | --- | --- |
| GET, POST | `/v1/content/articles` | `articles.displayList`, `articles.add` |
| GET, PATCH, DELETE | `/v1/content/articles/{id}` | `articles.displayItem`, `articles.edit`, `articles.delete` |

Collection GET lists records; item GET reads one; POST creates; PATCH updates; DELETE removes an eligible record. Some records must first be trashed. Consult individual operation responses for exceptions.

## Forms and data

Relevant forms and extension parameter manifests are:

- [Article form (`com_content`)](https://github.com/joomla/joomla-cms/blob/6.2.0/administrator/components/com_content/forms/article.xml)

Joomla selects additional parameter fields according to the extension, client or field type. The OpenAPI specification includes these core parameter variants.

| Field | JSON type or role | Meaning |
| --- | --- | --- |
| `title` | string | Required article title. |
| `catid` | integer | Required category ID from the content category tree. |
| `introtext, fulltext` | string | Stored HTML before and after the read-more break. |
| `state` | integer or numeric string | 1 published, 0 unpublished, 2 archived, -2 trashed, subject to workflow and permissions. |
| `language, access` | string, integer or numeric string | Content language tag or *, and viewing access level ID. |
| `images, urls, metadata, attribs` | object | Nested image, link, metadata and article option structures. |
| `tags` | array | Tag IDs. |
| `com_fields` | object | Custom-field values keyed by field name. |
| `associations` | object | Content language tags mapped to associated article IDs. |

Set `state: 0` explicitly for a draft: the form default is published. `catid` is the write field; the category relationship in a response is not a replacement for it.

List and item responses expose `introtext` and `fulltext`. Use these separate fields in new clients; `text` is deprecated. Content plugins can still modify the article object during response preparation, so a GET response does not guarantee the exact bytes stored in the database. Keep the original HTML or use the matching content-history version when exact source preservation matters.

For source updates, submit `introtext` and `fulltext`. `articletext` is the editor field containing a read-more separator; on PATCH, loaded table columns can take precedence. `created_by` identifies a Joomla user, whereas `metadata.author` is an author string. Workflow transitions and multilingual associations depend on site configuration.

Write a flat JSON object with these form fields. Do not wrap it in JSON:API `data.attributes`. Read-only response attributes are not a write template.

## Images and translated articles

The `images` object contains separate values for intro and full article images. Alongside `image_intro`
and `image_fulltext`, use `image_intro_alt`, `image_fulltext_alt` and the corresponding caption fields.
`imgclass_intro` and `imgclass_fulltext` apply classes to the images; `float_intro` and `float_fulltext`
describe the surrounding figure classes.

When multilingual associations are enabled, send the desired language-to-record mapping in `associations`.
For example, the following body for `PATCH /content/articles/101` links an English article to an existing
Russian article. Both records must have the appropriate content languages and permissions.

```json
{
  "language": "en-GB",
  "associations": {
    "ru-RU": 102
  }
}
```

Send the complete desired mapping. An empty object does not clear all associations: the administrator model
skips an empty mapping. To remove an association from a submitted non-empty mapping, use `0` or an empty
value for that language. Check the associations of both records afterwards.


## Backend server-side requests

Replace category ID `2` with an existing category returned by `GET /content/categories`. This creates an unpublished article.

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
    'title' => 'API example',
    'alias' => 'api-example',
    'catid' => 2,
    'state' => 0,
    'language' => '*',
    'introtext' => '<p>Created through the Joomla API.</p>',
    'fulltext' => '',
];

$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/content/articles');
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
  --url "$API_BASE/content/articles" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --header 'Content-Type: application/json' \
  --data-binary @- <<'JSON'
{
  "title": "API example",
  "alias": "api-example",
  "catid": 2,
  "state": 0,
  "language": "*",
  "introtext": "<p>Created through the Joomla API.</p>",
  "fulltext": ""
}
JSON
```

## Server-side successful response

HTTP `200 OK`, with `Content-Type: application/vnd.api+json`. The response excerpt below shows the resource structure. Responses can also contain relationships, links and metadata. IDs and values depend on the site.

```json
{
  "data": {
    "type": "articles",
    "id": "42",
    "attributes": {
      "title": "API example",
      "alias": "api-example",
      "state": 0,
      "introtext": "<p>Created through the Joomla API.</p>",
      "fulltext": ""
    }
  }
}
```

Read `GET /content/articles/{id}` using the returned `data.id`; compare title, category and state. Check stored source separately when exact HTML preservation matters.

## Frontend browser requests

These examples read published articles with `GET /content/articles`. Calling the API from the browser still uses administrator models and ACL.
Follow the [browser setup and authentication guidance](../index.md#frontend-browser-requests), including loading Joomla's `core` script for `Joomla.request`.
Replace the site origin and API path, then enter the signed-in operator's personal API token when prompted. Keep shared integration tokens on the server.

`filter[state]=1` selects published articles; it does not reproduce public site access filtering.

### Joomla.request

```javascript
(async () => {
    const token = window.prompt('Enter your personal Joomla API token');

    if (!token) {
        throw new Error('An API token is required.');
    }

    const url = new URL('https://example.org');
    url.pathname = '/api/index.php/v1/content/articles';
    url.search = new URLSearchParams({
        "page[offset]": "0",
        "page[limit]": "20",
        "filter[state]": "1"
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
    url.pathname = '/api/index.php/v1/content/articles';
    url.search = new URLSearchParams({
        "page[offset]": "0",
        "page[limit]": "20",
        "filter[state]": "1"
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
      "type": "articles",
      "id": "42",
      "attributes": {
        "title": "API example",
        "alias": "api-example",
        "state": 1,
        "introtext": "<p>Created through the Joomla API.</p>",
        "fulltext": ""
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
| 400 | A required title or category is missing, or form validation fails. |
| 403 | The user cannot create or edit in this category. |
| 404 | The article cannot be found. |

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

A model exception while loading a missing article can reach the fallback formatter and produce HTTP `500 Internal Server Error`, rather than 404. The fallback body can use an object in `errors`:

```json
{
  "errors": {
    "code": 500,
    "title": "Internal server error"
  }
}
```

After an interrupted or failed write, read the resource before retrying. Saving may have occurred before a later error.

## References

- [OpenAPI reference](../openapi.md)
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json), including `com_content` schemas
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
