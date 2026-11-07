---
title: Web Services API
---

Web Services API
================

Joomla's core REST API gives integrations access to **administrator operations and data** over HTTP.
API controllers generally reuse administrator models, forms, validation and permissions.
An article request works with the article management model: it does not execute a site menu item,
render a template or reproduce the filtering of a public article page.

Use it for imports, synchronisation, publishing tools and administration from another system.
A frontend application using these endpoints must deliberately handle publication state, access levels,
languages and workflows. Authenticated lists can include data that a site visitor cannot see.
Keep privileged API tokens on the server; do not embed them in public JavaScript.

Start with the [component articles](#core-components) for practical requests, forms, responses and errors,
or download the [complete OpenAPI specification](./openapi.md).
For your own routes, see the existing [JSON response tutorial](./json-response-format/index.md).

## Enable access

1. Enable the **Web Services** plugin for the component you need.
2. Enable **API Authentication - Web Services Joomla Token** and **User - Joomla API Token**.
3. In **User - Joomla API Token**, select the allowed user groups. This setting controls which users see the token section in their `com_users` profile; the token authentication plugin also checks these groups.
4. In **System → Global Configuration → Permissions**, grant **Web Services Login** (`core.login.api`) to the appropriate group, taking inherited permissions into account. Also grant the component and record permissions needed for the operation.
5. Obtain the user's API token from the Joomla API Token section of their profile and use HTTPS.

A token authenticates a user; it does not bypass ACL, validation, content filtering or workflows.
The base API edit check requires `core.manage` for the component and either `core.edit` for the record
or `core.edit.own` with a matching owner. Components can override this check and require other permissions.
For example, managing user groups and viewing access levels requires `core.admin` on `com_users`, and
the Privacy read/export controllers require `core.admin` on `com_privacy`.

The global ACL login permission and the token plugin's allowed groups are separate checks: membership in an
allowed token group alone does not grant API login. An inherited explicit Denied permission cannot be overcome
by granting Allowed in a child group. If the token section is missing in the profile, check the user plugin and
its group settings; if a request is refused, also check Global Configuration permissions and component ACL.

**API Authentication - Web Services Basic Auth** is disabled by default. Username/password authentication only works when
this plugin is explicitly enabled. The token examples below use the token plugins and do not require Basic Auth.

Use `X-Joomla-Token` for ordinary token-authenticated routes. The token plugin also accepts the same token as
`Authorization: Bearer <token>`. It tries to extract a Bearer token first and falls back to `X-Joomla-Token`
when the extracted token is empty. A non-empty Bearer token takes precedence even when authentication fails.
The [Joomla Update API](./components/joomlaupdate.md) has its own `X-JUpdate-Token` protocol.

The base URL includes the API entry point:

```text
https://example.org/api/index.php/v1
```

Include a Joomla installation subdirectory before `/api` where applicable.
Core routes use `index.php` and do not depend on frontend SEF menu routing.

## Request and response formats

Request JSON:API using these headers:

```http
Accept: application/vnd.api+json
X-Joomla-Token: REPLACE_WITH_YOUR_API_TOKEN
```

For writes, add `Content-Type: application/json` and send a **flat object of form fields**.
For example, an article creation body is:

```json
{
  "title": "API example",
  "catid": 2,
  "state": 0,
  "introtext": "<p>Example text.</p>",
  "fulltext": ""
}
```

`catid` must identify an existing article category. The explicit `state: 0` requests an unpublished article.
The standard controller does not interpret JSON:API `data.attributes` as generic record input.
Special actions, including media and configuration, have their own documented bodies.

Responses have a different structure:

```json
{
  "data": {
    "type": "articles",
    "id": "42",
    "attributes": {
      "title": "API example",
      "state": 0
    }
  }
}
```

This example shows an item response. Collections have an array in `data`.
Responses can include relationships, links, included resources and metadata.
`data.id` is a string; other numeric values can be numbers or numeric strings depending on their source.
List and item views can expose different attributes, and neither is necessarily a complete write template.

## Backend server-side requests

These examples list published articles. Replace the site origin, API path and token first.
Published records can still have restricted viewing access; an API result does not establish public visibility.

### Joomla HTTPFactory

The HTTP client returned by HTTPFactory accepts a URL string or an object implementing
`Joomla\Uri\UriInterface`, including `Joomla\Uri\Uri`. The example below uses the URI setters to
build the path and query, then passes the object directly to `get()`.

Use this request in a Joomla component, plugin or console command. Set the site origin, token and
complete API path for the target site. `setPath()` replaces the path: if Joomla is installed under
`/joomla`, use `/joomla/api/index.php/v1/content/articles`. Keep the token in your integration's secret store.

`setPath()` returns the URI and supports chaining. Call `setQuery()` separately: it accepts the query
parameters as an array and does not return the URI object. Nested arrays represent parameters such as
`page[offset]` and `filter[state]`, which Joomla encodes when rendering the URL.

```php
<?php
declare(strict_types=1);

use Joomla\Http\HttpFactory;
use Joomla\Uri\Uri;

$siteUrl = 'https://example.org';
$token = 'REPLACE_WITH_YOUR_API_TOKEN';
$uri = (new Uri($siteUrl))
    ->setPath('/api/index.php/v1/content/articles');
$uri->setQuery([
    'page' => [
        'offset' => 0,
        'limit' => 20,
    ],
    'filter' => [
        'state' => 1,
    ],
]);

$http = (new HttpFactory())->getHttp(['follow_location' => false]);
$response = $http->get(
    $uri,
    [
        'Accept' => 'application/vnd.api+json',
        'X-Joomla-Token' => $token,
    ],
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

Use `Joomla\Http\HttpFactory` as an instance. The older `Joomla\CMS\Http\HttpFactory` is deprecated.

### curl

This POSIX shell example uses curl 7.76 or later. On Windows, use Git Bash or WSL.
`--globoff` prevents square brackets in query names being interpreted as URL ranges.

```bash
API_BASE='https://example.org/api/index.php/v1'
TOKEN='REPLACE_WITH_YOUR_API_TOKEN'

curl --silent --show-error --fail-with-body --include --globoff \
  --get --url "$API_BASE/content/articles" \
  --header 'Accept: application/vnd.api+json' \
  --header 'X-Joomla-Token: '"$TOKEN" \
  --data-urlencode 'page[offset]=0' \
  --data-urlencode 'page[limit]=20' \
  --data-urlencode 'filter[state]=1'
```

## Frontend browser requests

Browser JavaScript calls the same API entry point as PHP and curl. It does not switch an endpoint to the
site application or apply the visibility rules of a frontend view. Use these examples in a trusted
management interface where each operator supplies their own API token. A Joomla browser session and its
CSRF token do not replace API authentication or the global **Web Services Login** permission.

The examples prompt for a personal token so that it is supplied at runtime. Do not put a shared integration
token in JavaScript, HTML or a browser storage key. For a public visitor interface, call a server endpoint
that applies the required access rules and keeps integration credentials on the server.

### Load Joomla's request helper

`Joomla.request` is provided by the `core` Web Asset Manager script. In a Joomla view or template,
enable it before the document is rendered:

```php
<?php

use Joomla\CMS\Factory;

Factory::getApplication()
    ->getDocument()
    ->getWebAssetManager()
    ->useScript('core');
```

Declare `core` as a dependency of your own registered script so it runs after the helper is available.
See the [Joomla JavaScript library](../general-concepts/javascript/js-library/core.md) for further options.
Native `fetch()` needs no Joomla script dependency.

`Joomla.request({promise: true})` resolves with an `XMLHttpRequest`, rather than parsed JSON.
Its success branch accepts HTTP 200 only, so the examples recover the rejected request object and check
the full `2xx` range themselves. This also handles a successful DELETE returning 204. When `promise` is
enabled, use the returned promise instead of `onSuccess`, `onError` or `onComplete` callbacks.

`fetch()` resolves for HTTP error responses too. Check `response.ok` explicitly. Both examples read the
body as text first so that an empty 204 response does not cause a JSON parsing error, then check
`errors` and `success: false` as well as the HTTP status. Network, CORS, timeout and JSON parsing failures
reject the returned promise; catch these in your interface and show a suitable message to the operator.

### Read articles

The following requests list published articles. Replace the site origin and complete API path, including
any Joomla subdirectory. `URL.pathname` sets the path; `URLSearchParams` encodes the query parameter object.
The result can include records with restricted viewing access.

#### Joomla.request

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

#### Native fetch()

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

Both clients return the same JSON:API collection structure. For example:

```json
{
  "data": [
    {
      "type": "articles",
      "id": "42",
      "attributes": {
        "title": "API example",
        "state": 1
      }
    }
  ]
}
```

### Send JSON and handle deletion

The next two examples each create an unpublished article, read it back, move it to the trash and
permanently delete it. Choose an existing category ID and an account allowed to create, read,
change state and delete articles in that category. Run one example at a time.

For POST and PATCH, `Content-Type: application/json` and `JSON.stringify()` send the flat form object.
The shared request function also accepts GET and DELETE without a body. Ordinary creation and updates
return HTTP 200; successful deletion returns 204 and the helper returns `null`.
If a step fails, inspect the saved record before retrying and remove any temporary draft that remains.

#### Joomla.request

```javascript
(async () => {
    const token = window.prompt('Enter your personal Joomla API token');

    if (!token) {
        throw new Error('An API token is required.');
    }

    async function request(method, path, body) {
        const url = new URL('https://example.org');
        url.pathname = `/api/index.php/v1${path}`;

        let xhr;

        try {
            xhr = await Joomla.request({
                url: url.toString(),
                method: method,
                headers: {
                    Accept: 'application/vnd.api+json',
                    'X-Joomla-Token': token,
                    ...(body === undefined ? {} : {'Content-Type': 'application/json'}),
                },
                data: body === undefined ? undefined : JSON.stringify(body),
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

        return document;
    }

    // Select an existing article category that this user may manage.
    const categoryId = 2;
    const created = await request('POST', '/content/articles', {
        title: `API browser example ${Date.now()}`,
        catid: categoryId,
        state: 0,
        introtext: '<p>Temporary draft created through the API.</p>',
        fulltext: '',
        language: '*',
    });
    const articleId = created.data.id;
    const articlePath = `/content/articles/${encodeURIComponent(articleId)}`;
    const saved = await request('GET', articlePath);
    console.log(saved);

    // Trash the draft before permanently deleting it.
    await request('PATCH', articlePath, {state: -2});
    await request('DELETE', articlePath);
    console.log(`Removed temporary article ${articleId}`);
    return saved;
})();
```

#### Native fetch()

```javascript
(async () => {
    const token = window.prompt('Enter your personal Joomla API token');

    if (!token) {
        throw new Error('An API token is required.');
    }

    async function request(method, path, body) {
        const url = new URL('https://example.org');
        url.pathname = `/api/index.php/v1${path}`;

        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 30000);
        let response;
        let text;

        try {
            response = await fetch(url, {
                method: method,
                headers: {
                    Accept: 'application/vnd.api+json',
                    'X-Joomla-Token': token,
                    ...(body === undefined ? {} : {'Content-Type': 'application/json'}),
                },
                body: body === undefined ? undefined : JSON.stringify(body),
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

        return document;
    }

    // Select an existing article category that this user may manage.
    const categoryId = 2;
    const created = await request('POST', '/content/articles', {
        title: `API browser example ${Date.now()}`,
        catid: categoryId,
        state: 0,
        introtext: '<p>Temporary draft created through the API.</p>',
        fulltext: '',
        language: '*',
    });
    const articleId = created.data.id;
    const articlePath = `/content/articles/${encodeURIComponent(articleId)}`;
    const saved = await request('GET', articlePath);
    console.log(saved);

    // Trash the draft before permanently deleting it.
    await request('PATCH', articlePath, {state: -2});
    await request('DELETE', articlePath);
    console.log(`Removed temporary article ${articleId}`);
    return saved;
})();
```

### Origins and CORS

Prefer requests to the same site origin. If the management interface and API use different origins,
configure the API's CORS settings to allow the specific interface origin, methods and headers required
by the client. A token header and JSON writes normally trigger a browser preflight request.

Allow `Accept`, `Content-Type` and `X-Joomla-Token` as needed. `Joomla.request` additionally sends
`X-Requested-With` and `X-Ajax-Engine`; for a same-origin non-GET request it can add `X-CSRF-Token`
from Joomla's page options. Include any headers the client actually sends in the allowed CORS headers.
CORS does not grant API login or component permissions.

The fetch examples use `credentials: 'omit'` because API token authentication does not depend on session
cookies. They reject redirects with `redirect: 'error'`; use the final API URL directly. For
`Joomla.request`, use the intended API origin directly too, since XMLHttpRequest follows redirects.
Keep pagination and subsequent requests on the configured API origin when attaching a token.

## Pagination and filters

Standard lists use `page[offset]` and `page[limit]`, with a default page size of 20.
Follow `links.next` until no next page remains. Use a positive limit;
`page[limit]=0` is not a general way to fetch everything.

Media lists, module-type lists, language override lists and language-string searches do not use the generic
page slicing. Media models can return the whole retrieved set. Follow the specific operation's pagination
rules instead of assuming that every collection has a 20-record page.

Use only the operation's listed filters and ordering options.
For example, article lists support `filter[category]`, `filter[state]`, `filter[search]` and `list[ordering]`.
Other collections can differ. Do not assume every JSON:API query feature is implemented.
When following pagination with credentials, keep requests on the configured API origin.

## Forms and updates

Administrator XML forms define input names, required values, filters, validation and parameter groups.
A database column and form field can have different types. Read the request schema as well as the response schema.

POST validates the creation form. Standard PATCH processing loads omitted table columns before validation.
For omitted calendar fields using `SERVER_UTC` or `USER_UTC`, it restores the saved UTC values after validation,
preventing a second timezone conversion. Explicitly supplied dates still pass through their form filters.
Omitted keys, `null`, empty strings, arrays and objects have distinct meanings.
Do not assume recursive merging of nested objects; preserve the complete affected structure where required.

Many calendar fields take `YYYY-MM-DD` or `YYYY-MM-DD HH:mm:ss` in the effective user/site timezone, then store UTC.
Check the form format and filter. Some user date filters instead require RFC3339.
Preserve numeric state flags such as `0` and `1` according to the schema.
Some form fields also accept numeric strings such as `"0"` and `"1"`; this does not make booleans interchangeable
with numbers. Dynamic selectors such as categories, groups and menu assignments are populated by the site,
so their static form options do not necessarily list every valid value.

A closed request schema describes the supported field set. It does not mean every controller rejects every
extra key: some keys can be filtered out. Follow explicit endpoint restrictions. In particular, the Plugins API
rejects any PATCH key other than `enabled`, `access` and `ordering`, even though plugin parameter fields exist
in the administrator form.

Plugins can extend forms and API attributes. Core schemas cover supplied forms and extension types;
third-party fields and options need their own definitions. IDs, languages, groups and adapters come from the target site.

## Success and errors

| HTTP status | Common meaning |
| --- | --- |
| 200 | Successful GET or standard POST/PATCH; some actions return `[]`. |
| 204 | Successful standard deletion, with no required body. |
| 400 | Invalid input or form validation failure. |
| 401 | Missing/invalid authentication or API login denied. |
| 403 | Component or record access denied. |
| 404 | Route, record or task not found. |
| 406 | Unsupported response format. |
| 409 | Deletion requires a different record state, such as moving to trash first. |
| 500 | Server, model or unimplemented-task failure. |

Individual controllers can differ. Standard creation returns 200; do not require 201.
Inspect the operation-specific result: an action can report `success: false` or `errors` with HTTP 200.

An authentication failure can return HTTP 401 with the following body:

```json
{
  "errors": [
    {"title": "Forbidden"}
  ]
}
```

An ACL failure can return HTTP 403:

```json
{
  "errors": [
    {"title": "Access Denied", "code": 403}
  ]
}
```

Internal `code` need not equal HTTP status. Some deletion errors use Joomla's older `JsonResponse` wrapper
with `success`, `message`, `messages` and a `data` object containing the error status, code and message.
Non-Exception errors such as `TypeError` reach a renderer fallback that puts an object, rather than an array,
in `errors`:

```json
{
  "errors": {
    "code": 500,
    "title": "Internal server error"
  }
}
```

For example, a model failure while loading a missing record can reach this formatter and return 500.
Do not assume all missing-record failures become 404. Text can be localised, and some failures may return
a non-JSON body. Handle status, content type and the documented response shape together.

After writing, independently GET the record and compare changed fields.
HTTP success does not establish correct dates, source text or public output.
After a timeout or error, read the target before retrying POST: it may already have saved.
Do not assume universal idempotency keys or concurrency protection.

## Core components

| Component | Article |
| --- | --- |
| `com_content` | [Articles](./components/content.md) |
| `com_categories` | [Categories](./components/categories.md) |
| `com_banners` | [Banners and clients](./components/banners.md) |
| `com_contact` | [Contacts and messages](./components/contact.md) |
| `com_contenthistory` | [Content History](./components/contenthistory.md) |
| `com_fields` | [Custom Fields and groups](./components/fields.md) |
| `com_media` | [Media](./components/media.md) |
| `com_menus` | [Menus and items](./components/menus.md) |
| `com_modules` | [Modules](./components/modules.md) |
| `com_newsfeeds` | [News Feeds](./components/newsfeeds.md) |
| `com_tags` | [Tags](./components/tags.md) |
| `com_users` | [Users, groups and access levels](./components/users.md) |
| `com_messages` | [Private Messages](./components/messages.md) |
| `com_languages` | [Languages and overrides](./components/languages.md) |
| `com_config` | [Configuration](./components/config.md) |
| `com_plugins` | [Plugins](./components/plugins.md) |
| `com_templates` | [Template Styles](./components/templates.md) |
| `com_installer` | [Extension Inventory](./components/installer.md) |
| `com_privacy` | [Privacy](./components/privacy.md) |
| `com_redirect` | [Redirects](./components/redirect.md) |
| `com_joomlaupdate` | [Joomla Update](./components/joomlaupdate.md) |

## Components without a separate REST API

**Multilingual Associations (`com_associations`)** has no standalone core API routes. Manage supported
language associations through the owning component, such as the article `associations` field, or use
the administrator association interface. The content language and the related record IDs must match
the component and languages being associated.

**Smart Search (`com_finder`)** has no core REST search or indexing endpoints. Its component options can
be accessed through `/config/com_finder` with configuration permissions, but this does not search or rebuild
the index. Use Smart Search administrator tools or supported console commands for index management.
Saving or publishing an article does not establish that it appears in search results.

## References

- [OpenAPI reference](./openapi.md)
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json)
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
