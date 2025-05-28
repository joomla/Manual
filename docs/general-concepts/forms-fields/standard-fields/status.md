---
sidebar_position: 2
title: Status Form Field
---

The **status** form field type provides a list box of statuses. This field extends `PredefinedlistField`.

- **type** (mandatory) must be *status*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.
- **optionsFilter** (optional) Comma-separated list of values to be displayed.
- **class** (optional) add the classname `form-select-color-state` to add color feedback for the selected state.

Implemented by: libraries/src/Form/Field/StatusField.php

## Example XML parameter definition

```xml
<field
        name="mystatus" 
        type="status"
        label="Choose" 
        description=""
/>
```

## Available options
Based on the source code this returns the following entries in a list: 

| Value | Text         |
| ----- | ------------ |
| -2    | JTRASHED     |
| 0     | JUNPUBLISHED |
| 1     | JPUBLISHED   |
| 2     | JARCHIVED    |
| *     | JALL         |

## Filter options
If this field is used in the element context and not as a filter, the *All* option is not required, for example.
In such a case, the **optionsFilter** attribute can be used to select which options should be selectable.

```xml
<field
        name="mystatus" 
        type="status"
        label="Choose" 
        description=""
        optionsFilter="0,1"
/>
```

The field now only loads the options JPUBLISHED and JUNPUBLISHED.
