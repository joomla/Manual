---
title: CORS
---

CORS Settings
=============

- #### cors

  Enable CORS.

  Default: `false`

  ```php
  public $cors = true;
  ```

- #### cors_allow_headers

  HTTP headers that are allowed in response to a preflight request.

  Default: `Content-Type,X-Joomla-Token`

  ```php
  public $cors_allow_headers = 'Content-Type,X-Joomla-Token,Authorization';
  ```

- #### cors_allow_methods

  HTTP methods (e.g., GET, POST, PUT) that are permitted for cross-origin requests.

  Default: `''` (all methods available for the requested route)

  ```php
  public $cors_allow_methods = 'GET,POST';
  ```

- #### cors_allow_origin

  Origins (domains) that are allowed to access the resource.

  Default: `*`

  ```php
  public $cors_allow_origin = 'https://example.com,https://another-domain.com';
  ```
