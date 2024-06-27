---
sidebar_position: 2
title: Templatestyle Form Field
---


The **templatestyle** form field type provides a dropdown list of style options

- **type** (mandatory) must be *templatestyle*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **client** (optional) site or administrator, defaults to site.
- **class** (optional) for styling.
- **multiple** (optional) is whether multiple items can be selected at the same time (true or false). In Joomla 4 it is recommended to use additionally `layout="joomla.form.field.groupedlist-fancy-select"` in the field declaration (= `chosen` replacement).


Implemented by: libraries/src/Form/TemplatestyleField.php

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
