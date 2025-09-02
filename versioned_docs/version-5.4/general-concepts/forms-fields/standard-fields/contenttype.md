---
sidebar_position: 2
title: Contenttype Form Field
---

The **contenttype** form field type provides a list of content types.

- **type** (mandatory) must be *contenttype*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **multiple** (optional) when set to true allows multiple selections.

Implemented by: libraries/src/Form/Field/ContenttypeField.php

## Example XML parameter definition

```xml
<field
        name="types" type="contenttype"
        label="COM_TAGS_FIELD_TYPE_LABEL"
        description="COM_TAGS_FIELD_TYPE_DESC"
        multiple="true"
/>
```