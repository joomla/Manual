---
sidebar_position: 2
title: Category Form Field
---

The **category** form field type provides a drop down list of all published categories for a certain extension. If the parameter has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected. If the show_root attribute is 1, the first option on the list will be a string representing the root category (which is a translatable string) and is given the value 0.

- **type** (mandatory) must be *category*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **extension** (mandatory) is the name of the extension for which the categories will be retrieved. For example, to list content categories, use the value 'com_content'.
- **scope** (optional) is an alias for extension.
- **show_root** (optional) is whether a choice representing the root category will be shown.
- **default** (optional) is the default category ID number.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) allows you set a css class for display. If omitted this will default to 'inputbox'
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.

Implemented by: libraries/src/Form/Field/CategoryField.php

## Example XML parameter definition

```xml
<field
        name="mycategory" 
        type="category" 
        extension="com_content" 
        label="Select a category" 
        description=""
/>
```