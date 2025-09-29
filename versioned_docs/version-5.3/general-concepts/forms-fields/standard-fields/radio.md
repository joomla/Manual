---
sidebar_position: 2
title: Radio Form Field
---

The **radio** form field type provides radio buttons to select options. If the field has a saved value, this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *radio*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **default** (optional) is the default password.
- **class** (optional) is a CSS class name for the HTML form field. If set to `class="btn-group btn-group-yesno"` will show coloured buttons.
- **layout** (optional) can be used to set a Layout for the switcher. Eg. if set to `layout="joomla.form.field.radio.switcher"` will use the Joomla Radio-Switcher Layout.

The XML `<field>` element must include one or more `<option>` elements which define the individual radio button items. The text between the `<option>` and `</option>` tags is shown as the label for the radio button and is a translatable string. The `<option>` tag takes the following argument:

-    **value** (mandatory) is the value that will be saved for the parameter if this item is selected.

Tip: Don't forget to close the field definition with `</field>`.

Implemented by: libraries/src/Form/RadioField.php

## Example XML parameter definition

```xml
<field 
        name="myradiovalue" 
        type="radio" 
        default="0" 
        label="Select an option" 
        description="">
        <option value="0">1</option>
        <option value="1">2</option>
</field>
```

Styling with arbitrary values:

```xml
<field 
        name="myradiovalue" 
        type="radio" 
        default="0" 
        label="Select an option" 
        description=""
        class="btn-group">
        <option value="0">1</option>
        <option value="1">2</option>
</field>
```

Styling with yes/no values:

```xml
<field 
        name="myradiovalue" 
        type="radio" 
        default="0" 
        label="Select an option" 
        description=""
        class="btn-group btn-group-yesno">
        <option value="0">JNo</option>
        <option value="1">JYes</option>
</field>
```

Styling with yes/no values as Switcher:

```xml
<field 
        name="myradiovalue" 
        type="radio" 
        default="0" 
        label="Select an option" 
        description=""
        layout="joomla.form.field.radio.switcher">
        <option value="0">JNo</option>
        <option value="1">JYes</option>
</field>
```

## See also
* [List form field type](./list.md)