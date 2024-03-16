---
sidebar_position: 2
title: Time Form Field
---


The **time** form field type provides a select list of integers with specified first, last and step values.

- **type** (mandatory) must be *time*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **min**  (optional) The allowable minimal value of the field.
- **max**  (optional) The allowable maximal value of the field.
- **step**  (optional) The steps between different values.
- **layout**  (optional) The name of the layout being used to render the field, default "joomla.form.field.time"


Implemented by: libraries/src/Form/TimeField.php

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
