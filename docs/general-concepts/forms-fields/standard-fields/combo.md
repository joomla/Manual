---
sidebar_position: 2
title: Combo Form Field
---

The **combo** form field type provides a combobox field, which offers a list like the List Form Field Type, but additionally allows free text

- **type** (mandatory) must be *combo*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) allows you set a css class for display. If omitted this will default to 'combobox'.
- **readonly** (optional) set to "true", meaning not editable, defaults to false.
- **disabled** (optional) set to "true", meaning not enabled, defaults to false.
- **size** (optional) sets the input size of the field.
- **required** (optional) sets whether input is required, defaults to no input required.

Implemented by: libraries/src/Form/Field/ComboField.php

## Example XML parameter definition

```xml
<field
        name="myeditbox" 
        type="combo" 
        label="MyEditBox" 
        description="myeditbox_Desc" 
        size="7">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
/>
```
