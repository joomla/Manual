---
sidebar_position: 2
title: Moduletag Form Field
---

The **moduletag** form field type provides a dropdown list of tags for a module wrapper. The preset list of tags includes most suitable wrapper tags: address, article, aside, details, div, footer, header, main, nav and section. Custom modules may specify additional tags.

- **type** must be *moduletag*.
- **name** is the unique name of the field.
- **label** is a translatable label for the field.
- **description** is an optional translatable [field description](../standard-form-field-attributes.md#description).
- **default** is an optional default value.

Implemented by: libraries/src/Form/Field/ModuletagField.php

## Example XML parameter definitions

Example definition that displays the preset list of module tags to choose from:

```xml
<field
        name="module_tag" 
        type="moduletag"
        label="COM_MODULES_FIELD_MODULE_TAG_LABEL"
        description="COM_MODULES_FIELD_MODULE_TAG_DESC"
        default="div"
/>
```

Example definition that displays the preset list of module tags with additional options:

```xml
    <field
        name="module_tag" 
        type="moduletag"
        label="COM_MODULES_FIELD_MODULE_TAG_LABEL"
        description="COM_MODULES_FIELD_MODULE_TAG_DESC"
        default="div"
    >
        <option value="blockquote">blockquote</option> 
        <option value="figure">figure</option> 
        <option value="form">form</option> 
    </field>
```
