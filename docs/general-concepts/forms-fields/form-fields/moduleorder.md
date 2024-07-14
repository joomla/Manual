---
sidebar_position: 2
title: Moduleorder Form Field
---

The **moduleorder** form field type provides a drop down to set the ordering of module in a given position.

- **type** (mandatory) must be *moduleorder*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Implemented by: libraries/src/Form/Field/ModuleorderField.php

## Example XML parameter definition

```xml
<field
        name="ordering" 
        type="moduleorder"
        label="JFIELD_ORDERING_LABEL"
        description="JFIELD_ORDERING_DESC"
/>
```
