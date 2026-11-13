---
title: OpenAPI Reference
sidebar_position: 2
---

OpenAPI Reference
=================

The [complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json) describes the core Joomla
Web Services API in OpenAPI 3.1 format. It includes routes, authentication, path and query parameters,
request and response schemas, and parameter options for core extensions.

Import the specification into an OpenAPI-compatible client or open it in a viewer to explore operations
and their data structures. The [component guides](./index.md#core-components) explain how to use the endpoints
with server-side Joomla HTTPFactory and curl, and browser-side `Joomla.request` and native `fetch()`.

## Set the API address

The specification lists two servers. The first, `{scheme}://{site}/api/index.php`, has a `site` variable:
set it to the domain of the target site and include any Joomla installation subdirectory, for example
`example.org/joomla`. Its `scheme` variable is `https`, or `http` for a local test site. The second is the relative URL `/api/index.php`, for a viewer served from the site itself.
Operation paths begin with `/v1`, producing URLs such as:

```text
https://example.org/api/index.php/v1/content/articles
```

Use the API entry point for requests. Frontend menu aliases and SEF URLs do not identify API resources.

## Authentication in the specification

The specification offers three alternative security schemes: `BearerAuth` (the API token as
`Authorization: Bearer <token>`), `JoomlaToken` (the same token in `X-Joomla-Token`) and `BasicAuth` (username and
password, only when the Basic Auth plugin is enabled). The Joomla Update operations use `JUpdateToken` instead.
In an OpenAPI viewer, enter the token for one of the token schemes.

## Read an operation

1. Find the path and method, or filter by a resource tag such as `Content Articles`. `x-tagGroups` groups
   the tags by component, such as `com_content`.
2. Check authentication, path parameters and listed query parameters.
3. Read `requestBody`: ordinary writes take flat JSON objects.
4. Inspect the response schema; list, item, creation and action results can differ.
5. Check `x-support`, the component guide and limitations before calling it.

`x-controller-task` identifies the controller task, while `x-route-defaults` records values selected by the route,
such as the component, client or field context. `x-source` links a definition to the corresponding Joomla code.

## Understand the data schemas

Request schemas describe the fields accepted by a particular operation. Check `required` for mandatory fields,
`enum` for allowed values and `default` for form defaults. A property may use `oneOf` or `anyOf` to describe
alternative structures or accepted types. Do not replace numeric publication states with boolean values
unless the field schema allows it.

Response schemas describe returned resources and can differ between collection, item and action endpoints.
Response-only properties, relationships and calculated values are not automatically accepted as write fields.
Ordinary record writes use flat JSON form data; JSON:API response envelopes are not a generic request template.

Form schemas include required fields, Joomla validation metadata and parameter groups for core extensions.
The selected component, module, plugin, template or field type determines which parameter schema applies.
`JsonValue` marks an extension point where the installed extension defines the structure.

An administrator form inventory can contain fields that the API controller does not accept. The operation's
`requestBody` takes precedence. For example, plugin parameter forms describe the administrator interface,
while plugin PATCH requests accept only `enabled`, `access` and `ordering`.

Check the method as well as the path: access-level `rules` is an array for creation but a JSON-encoded array
string for PATCH. The two bodies are not interchangeable.

Some request bodies have two examples: `minimal` shows the smallest accepted body, `joomlaSite` a body with
realistic values. Error responses and parameters used by many operations, such as `Id`, `PageOffset` and
`PageLimit`, are defined once under `components` and referenced with `$ref`.

## Operation availability

Registered does not always mean implemented. `POST /v1/languages` maps to an unavailable
`languages.install` task and is marked `registered-unimplemented`.
A default display action can run instead, so an HTTP 200 response does not establish that installation occurred.
`com_associations` and `com_finder` contribute form/configuration schemas without independent REST routes.
Their presence in the catalogue does not add endpoints.

The matching Web Services plugin must be enabled. Authentication and ACL determine whether the current user
can perform an operation; a route being listed in OpenAPI does not grant access to it.

## Apply the specification to a site

Replace example URLs, tokens and identifiers with values for the target site. Category, user, group,
language and storage adapter identifiers depend on that site's configuration and data.

Installed plugins can extend forms, validation and API responses. Core schemas describe Joomla's standard
fields and extensions; third-party parameter groups and custom-field values require their own definitions.

Check both the HTTP status and the operation-specific response. Validation, access and model errors can have
different bodies, and some actions report failure within an HTTP 200 response. The examples show possible
error structures; they do not imply that every listed error applies to every operation.

After a write, read the resource again and compare the changed fields. For changes affecting the frontend,
also check publication, access and rendered output.

When adapting a Postman example, compare its method, path and body with the operation in this specification.
The core reference includes operations that may be absent from a collection; a collection's folder title
does not determine which endpoint its request actually calls.

## References

- [Web Services API introduction](./index.md)
- [Complete OpenAPI specification](pathname:///openapi/joomla-6.2.0.json)
- [Joomla Web Services Collection for Postman](https://documenter.getpostman.com/view/7443864/2s9YywfKez#dae52fb7-d932-4299-8845-90495030df7c)
