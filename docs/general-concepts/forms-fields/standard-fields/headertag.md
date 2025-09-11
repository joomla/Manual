---
sidebar_position: 2
title: Headertag Form Field
---

The **headertag** form field type provides a dropdown list of tags for a module header. The preset list of tags includes h1 to h6, p and div. Custom modules may specify additional tags.

- **type** must be *headertag*.
- **name** is the unique name of the field.
- **label** is a translatable label for the field.
- **description** is an optional translatable [field description](../standard-form-field-attributes.md#description).
- **default** is an optional default value.

Implemented by: libraries/src/Form/Field/HeadertagField.php

## Example XML parameter definitions

Example definition that displays the preset list of header tags to choose from:

```xml
    <field
        name="header_tag" 
        type="headertag"
        label="COM_MODULES_FIELD_HEADER_TAG_LABEL"
        description="COM_MODULES_FIELD_HEADER_TAG_DESC"
        default="h3"
    />
```

Example definition that displays the preset list of header tags with additional options:

```xml
    <field
        name="header_tag" 
        type="headertag"
        label="COM_MODULES_FIELD_HEADER_TAG_LABEL"
        description="COM_MODULES_FIELD_HEADER_TAG_DESC"
        default="h3"
    >
        <option value="figcaption">figcaption</option> 
        <option value="legend">legend</option>
        <option value="label">label</option> 
        <option value="summary">summary</option>
    </field>
```
