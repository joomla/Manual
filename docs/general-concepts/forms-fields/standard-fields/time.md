---
sidebar_position: 2
title: Time Form Field
---

The **time** form field type provides a select list of integers with specified first, last and step values.

- **type** (mandatory) must be *time*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **min**  (optional) The allowable minimal value of the field.
- **max**  (optional) The allowable maximal value of the field.
- **step**  (optional) The steps between different values.
- **layout**  (optional) The name of the layout being used to render the field, default "joomla.form.field.time"


Implemented by: libraries/src/Form/Field/TimeField.php

## Example XML parameter definition

```xml
<field
        name="mytime" 
        type="time" 
        default="" 
        label="Select a help site" 
        description=""
/>
```
