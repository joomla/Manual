---
title: Server
---

Server Settings
===============

- #### tmp_path

  The path to the temporary directory.

  Default: `/tmp`.

  ```php
  public $tmp_path = '/var/www/html/tmp';
  ```

- #### gzip

  Enable GZIP compression.

  Default: `false`.
  ```php
  public $gzip = true;
  ```

- #### offset

  The server's timezone offset.

  Default: `UTC`.

  ```php
  public $offset = 'Asia/Vladivostok';
  ```

- #### behind_loadbalancer

  Behind load balancer.

  Default: `false`.
  ```php
  public $behind_loadbalancer = true;
  ```
