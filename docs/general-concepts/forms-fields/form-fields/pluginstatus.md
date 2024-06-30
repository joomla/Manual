---
sidebar_position: 2
title: Pluginstatus Form Field
---

The **pluginstatus** form field type provides a list box of statuses applicable to plugins. This field extends `PredefinedlistField`.

- **type** (mandatory) must be *pluginstatus*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
    field.
- **description** (optional) (translatable) is text that will be shown
     as a tooltip when the user moves the mouse over the field.
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.

Implemented by: libraries/src/Form/Field/PluginstatusField.php

## Example XML parameter definition

```xml
<field
        name="mystatus" 
        type="pluginstatus"
        label="Choose" 
        description=""
/>
```

This returns the following entries in a list box (as plugins can currently be either enabled or disabled):

Disabled

Enabled