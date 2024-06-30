---
sidebar_position: 2
title: Integer Form Field
---


The **integer** form field type provides a select box with a range of integer values. If the field has a value saved, this value is displayed when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *integer*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) (translatable) is the default value.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'text_area'.
- **first** (mandatory) this value is the lowest on the list.
- **last** (mandatory) this value is the highest on the list.
- **step** (mandatory) each option will be the previous option incremented by this integer, starting with the **first** value until the **last** value is reached.

Implemented by: libraries/src/Form/Field/IntegerField.php

## Example XML parameter definition which would create a select box with the choices of 1,2,3,4,5,6,7,8,9,10:

```xml
<field
        name="myintegervalue"
        type="integer"
        default="Some integer"
        label="Choose an integer"
        description=""
        first="1"
        last="10"
        step="1"
/>
```
