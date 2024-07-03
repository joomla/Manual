---
sidebar_position: 2
title: Number Form Field
---

The **number** form field type provides a HTML5 text box with arrows. If the field has a value saved, this value is displayed when the page is first loaded. If not, the default value (if any) is used.

- **type** (mandatory) must be *number*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **default** (optional) (translatable) is the default value.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'text_area'.
- **min** (optional) this value is the lowest that can be chosen.
- **max** (optional) this value is the highest that can be chosen.
- **step** (optional) if user click up/down arrow current value will change by this attribute (this attribute value will be added or subtracted to current field value).
- **filter** (optional) the filter to be used on this field value after submit.
- **hint** (optional) placeholder to be set on this field.
- **disabled** (optional) should this field be disabled?
- **readonly** (optional) should this field be read only?
- **required** (optional) should this field be required?
- **autocomplete** (optional) should this field use auto complete?
- **autofocus** (optional) should this field have focus when page first time loads?
- **size** (optional) the maximum field width in characters.

Implemented by: libraries/src/Form/Field/NumberField.php

## Example XML parameter definition 
This will create a number box allowing the user to choose values between 0 and 10 and change current value by 1 each time user click up/down field button.

```xml
<field
        name="mynumbervalue" 
        type="number" 
        default="0" 
        label="Choose an number" 
        description="" 
        min="0" 
        max="10" 
        step="1"
/>
```

## See also

* [Integer field type](./integer.md)