---
sidebar_position: 2
title: Hidden Form Field
---


The **hidden** form field type provides a hidden field for saving a field whose value cannot be altered directly by a user in the Administrator (it can be altered in code or by editing the xml file). If the parameter has a saved value this is entered in the text box. If not, the default value (if any) is entered. As the field is hidden there is no visible field in the Administrator.

- **type** (mandatory) must be *helpsite*.
- **name** (mandatory) is the unique name of the field.
- **default** (optional) (not translatable) s the default help site URL (not the visible help site name).
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'text_area'.

Implemented by: libraries/src/Form/HiddenField.php

## Example XML parameter definition

```xml
<field
        name="mysecretvariable" 
        type="hidden" 
        default=""
/>
```
