---
sidebar_position: 2
title: Author Form Field
---

The **author** form field type provides a list box containing authors (users) that have created content. 

- **type** (mandatory) must be *author*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.

Implemented by: libraries/src/Form/Field/AuthorField.php

## Example XML parameter definition

```xml
<field
        name="myauthorlist" 
        type="author"
        label="Select an author" 
        description=""
/>
```
