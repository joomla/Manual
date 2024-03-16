---
sidebar_position: 2
title: Radiobasic Form Field
---

**NOTE** This field is not currently used within Joomla and there is a PR to remove it in future Joomla releases ([https://github.com/joomla/joomla-cms/issues/19299)](https://github.com/joomla/joomla-cms/issues/19299)

The **radio** form field type provides radio button inputs using default styling

- **type** (mandatory) must be *radio*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
  **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) is the default password.
- **class** (optional) is a CSS class name for the HTML form field. 

The XML `<field>` element must include one or more `<option>` elements which define the individual radio button items. The text between the `<option>` and `</option>` tags is shown as the label for the radio button and is a translatable string. The `<option>` tag takes the following argument:

-    **value** (mandatory) is the value that will be saved for the parameter if this item is selected.

Tip: Don't forget to close the field definition with `</field>`.

Implemented by: libraries/src/Form/RadiobasicField.php

## Example XML parameter definition

```xml
<field 
        name="myradiovalue" 
        type="radiobasic" 
        default="0" 
        label="Select an option" 
        description="">
        <option value="0">1</option>
        <option value="1">2</option>
</field>
```


## See also
* [List form field type](./list.md)
* [Radio form field type](./radio.md)