---
sidebar_position: 2
title: Headertag Form Field
---

The **headertag** form field type provides a dropdown list of h1 to h6 as options.

- **type** (mandatory) must be *headertag*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **default** (optional) (not translatable) is the default value.

Implemented by: libraries/src/Form/Field/HeadertagField.php

## Example XML parameter definition

```xml
<field
        name="header_tag" 
        type="headertag"
        label="COM_MODULES_FIELD_HEADER_TAG_LABEL"
        description="COM_MODULES_FIELD_HEADER_TAG_DESC"
        default="h3"
/>
```
