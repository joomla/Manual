---
sidebar_position: 2
title: Moduletag Form Field
---

The **moduletag** form field type provides a dropdown list of html5 elements (used to wrap a module in).

- **type** (mandatory) must be *moduletag*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Implemented by: libraries/src/Form/Field/ModuletagField.php

## Example XML parameter definition

```xml
<field
        ame="module_tag" 
        type="moduletag"
        label="COM_MODULES_FIELD_MODULE_TAG_LABEL"
        description="COM_MODULES_FIELD_MODULE_TAG_DESC"
        default="div"
/>
```
