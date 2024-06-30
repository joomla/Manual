---
sidebar_position: 2
title: Userstate Form Field
---

The **userstate** form field type provides a list box of statuses associated with the enabled state of a user.
This field extends `PredefinedlistField` and is used in the Manage Users filter fields.

- **type** (mandatory) must be *userstate*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
    field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **required** (optional) if set to true, the first field option should be empty, see last example.

Implemented by: libraries/src/Form/Field/UserstateField.php

## Example XML parameter definition

```xml
<field
        name="mystate" 
        type="userstate"
        label="Choose" 
        description=""
/>
```

Based on the source code this returns the following entries in a list:  
0 - Enabled - JENABLED  
1 - Disabled - JDISABLED   
