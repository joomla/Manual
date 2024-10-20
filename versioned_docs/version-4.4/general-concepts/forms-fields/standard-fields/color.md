---
sidebar_position: 2
title: Color Form Field
---

The **color** form field type provides a color picker. Enter the color as #ff00ff or pick it from the palette.

- **type** (mandatory) must be *color*.
- **name** (mandatory) is the unique name of the field.
- **default** (optional) provides a selected colour when none set
- **format** (optional) allows you to select the type of colour format, you can select rgb, rgba, hex.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Implemented by: libraries/src/Form/Field/ColorField.php

## Example XML parameter definition

```xml
<field
        name="backgroundcolor" 
        type="color" 
        default="#eee" 
        format="rgba"
        label="TPL_BEEZ3_FIELD_HEADER_BACKGROUND_COLOR_LABEL"
        description="TPL_BEEZ3_FIELD_HEADER_BACKGROUND_COLOR_DESC"
/>
```