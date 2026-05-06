---
sidebar_position: 2
title: Redirectstatus Form Field
---

The **redirectstatus** form field type provides a list box of statuses which are used by the Administrator URL Redirects component. This field extends `PredefinedlistField`.

- **type** (mandatory) must be *redirectstatus*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.

Implemented by: libraries/src/Form/Field/RedirectstatusField.php

## Example XML parameter definition

```xml
<field
        name="mystatus" 
        type="redirectstatus"
        label="Choose" 
        description=""
/>
```

This returns the following entries in a list:  
Trashed - JTRASHED  
Disabled - JDISABLED    
Enabled - JENABLED  
Archived - JARCHIVED  
All - JALL