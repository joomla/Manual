---
sidebar_position: 2
title: Frontendlanguage Form Field
---

The **frontendlanguage** form field type provides a list of published content languages with home pages.

It does not appear to be used within Joomla 4 or 5.

- **type** (mandatory) must be *frontendlanguage*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Implemented by: libraries/src/Form/Field/FrontendlanguageField.php

## Example XML parameter definition

```xml
<field
        name="mylanguage" 
        type="frontendlanguage" 
        default="" 
        label="Choose" 
        description=""
/>
```
