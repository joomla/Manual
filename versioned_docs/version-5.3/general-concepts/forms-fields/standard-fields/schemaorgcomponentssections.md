---
sidebar_position: 2
title: Schemaorgcomponentsections Form Field
---

The **Schemaorgcomponentsections** form field type provides a list box containing enabled extensions of type component. It extends from ComponentsField and restricts the data to items of type SchemaorgServiceInterface.

- **type** (mandatory) must be *schemaorgcomponentsections*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.

Implemented by: libraries/src/Form/Field/SchemaorgComponentSectionsField.php

## Example XML parameter definition

```xml
<field
        name="schemacomponentslist" 
        type="Schemaorgcomponentsections"
        label="Select a schema" 
        description=""
/>
```
