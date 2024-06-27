---
sidebar_position: 2
title: Cachehandler Form Field
---



The **cachehandler** form field type provides a list of available cache handling options.

-   **type** (mandatory) must be *cachehandler*.
-   **name** (mandatory) is the unique name of the field.
-   **label** (mandatory) (translatable) is the descriptive title of the
    field.
-  *description** (optional) (translatable) is descriptive text for the field.
-   **filter** (optional) filter to apply, normally use "word".

Implemented by: libraries/src/Form/Field/CachehandlerField.php

## Example XML parameter definition

```xml
<field
        name="cache_handler"
        type="cachehandler"
        label="COM_CONFIG_FIELD_CACHE_HANDLER_LABEL"
        description="COM_CONFIG_FIELD_CACHE_HANDLER_DESC"
        filter="word"
        />
```