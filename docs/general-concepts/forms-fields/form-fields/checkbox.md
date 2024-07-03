---
sidebar_position: 2
title: Checkbox Form Field
---

The **checkbox** form field type provides a single checkbox. If the parameter has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *checkbox*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **value** (optional) is the value of the parameter if this checkbox is set (usually 1).
- **checked** (optional) should be set to 1 to check the checkbox by default or 0 if not.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) allows you set a css class for display. If omitted this will default to 'inputbox'
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.

Implemented by: libraries/src/Form/Field/CheckboxField.php

## Example XML parameter definition

```xml
<field
        name="show_title" 
        type="checkbox" 
        label="Show title" 
        description="Show the title of the item" 
        value="1"
/>
```

## Example XML parameter definition (with Checkbox checked)

```xml
<field
        name="show_title" 
        type="checkbox" 
        label="Show title" 
        description="Show the title of the item" 
        value="1"
        checked="1"
/>
```

:::warning 
  Special care needs to be taken with saving a checkbox from a form!! This is a common mistake.
You see, on saving a form with a checkbox that is unchecked, there is no variable for it in the POST information and joomla does not take care of that yet!
See Discussion on [this page](https://docs.joomla.org/Talk:Checkbox_form_field_type) for more.
:::