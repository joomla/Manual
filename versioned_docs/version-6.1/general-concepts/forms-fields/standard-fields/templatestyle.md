---
sidebar_position: 2
title: Templatestyle Form Field
---

The **templatestyle** form field type provides a dropdown list of template style options

- **type** (mandatory) must be *templatestyle*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **client** (optional) site or administrator, defaults to site.
- **class** (optional) for styling.
- **multiple** (optional) is whether multiple items can be selected at the same time (true or false). In Joomla 4 it is recommended to use additionally `layout="joomla.form.field.groupedlist-fancy-select"` in the field declaration (replacement for the 'chosen' library used previously).

Implemented by: libraries/src/Form/Field/TemplatestyleField.php

## Example XML parameter definition

```xml
<field
        name="admin_style" 
        type="templatestyle"
        client="administrator"
        description="COM_ADMIN_USER_FIELD_BACKEND_TEMPLATE_DESC"
        label="COM_ADMIN_USER_FIELD_BACKEND_TEMPLATE_LABEL" 
        >
        <option value="">JOPTION_USE_DEFAULT</option>
</field>
```
