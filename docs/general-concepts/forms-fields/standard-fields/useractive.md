---
sidebar_position: 2
title: Useractive Form Field
---

The **useractive** form field type provides a list box of statuses associated with the active status of a user. 
This field extends `PredefinedlistField` and is used in the Manage Users filter fields.

- **type** (mandatory) must be *useractive*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **required** (optional) if set to true, the first field option should be empty, see last example.

Implemented by: libraries/src/Form/Field/UseractiveField.php

## Example XML parameter definition

```xml
<field
        name="isuseractivate" 
        type="useractive"
        label="Choose" 
        description=""
/>
```

Based on the source code this returns the following entries in a list:  
Activated - COM_USERS_ACTIVATED  
Unactivated - COM_USERS_UNACTIVATED    