---
sidebar_position: 2
title: Moduletag Form Field
---


The **moduletag** form field type provides a dropdown list of h1 to h6 as options.

- **type** (mandatory) must be *helpsite*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
  **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.

Implemented by: libraries/src/Form/ModuletagField.php

## Example XML parameter definition

```xml
<field
        ame="module_tag" 
        type="moduletag"
        label="COM_MODULES_FIELD_MODULE_TAG_LABEL"
        description="COM_MODULES_FIELD_MODULE_TAG_DESC"
        default="div"
/>
```
