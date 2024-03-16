---
sidebar_position: 2
title: ChromeStyle Form Field
---


The **chromestyle** form field type provides a dropdown list of style options with the current option selected.

- **type** (mandatory) must be *chromestyle*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
  **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.

Implemented by: libraries/src/Form/Field/ChromestyleField.php

## Example XML parameter definition

```xml
<field
        name="style" 
        type="chromestyle"
        label="COM_MODULES_FIELD_MODULE_STYLE_LABEL"
        description="COM_MODULES_FIELD_MODULE_STYLE_DESC"
/>
```