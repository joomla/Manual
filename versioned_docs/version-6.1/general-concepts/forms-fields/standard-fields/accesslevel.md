---
sidebar_position: 2
title: Accesslevel Form Field
---

The **accesslevel** form field type provides a dropdown list of accesslevel options with the current option selected. 

- **type** (mandatory) must be *accesslevel*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) allows you set a css class for display.
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **useglobal** (optional) if set to true, it will show the value that is set in the global configuration if found in the database.

Implemented by: libraries/src/Form/Field/AccesslevelField.php

## Example XML parameter definition

```xml
<field
        name="access"
        type="accesslevel"
        label="JFIELD_ACCESS_LABEL"
        description="JFIELD_ACCESS_DESC"
        class="span12 small" 
/>
```