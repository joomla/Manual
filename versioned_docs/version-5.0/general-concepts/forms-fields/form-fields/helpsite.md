---
sidebar_position: 2
title: Helpsite Form Field
---


The **helpsite** form field type provides a dropdown list of h1 to h6 as options.

- **type** (mandatory) must be *helpsite*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
  **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the default help site URL (not the visible help site name).

Implemented by: libraries/src/Form/HelpsiteField.php

## Example XML parameter definition

```xml
<field
        name="myhelpsite" 
        type="helpsite" 
        default="" 
        label="Select a help site" 
        description=""
/>
```
