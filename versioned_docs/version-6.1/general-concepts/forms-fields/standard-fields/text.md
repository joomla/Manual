---
sidebar_position: 2
title: Text Form Field
---

The **text** form field type provides a text box for data entry. If the field has a value saved, this value is displayed when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *text*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **default** (optional) (not translatable) is the default value.
- **size** (optional) is the width of the text box in characters. If omitted the width is determined by the browser. The value of size does not limit the number of characters that may be entered.
- **maxlength** (optional) limits the number of characters that may be entered.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'text_area'.
- **readonly** (optional) The field cannot be changed and will automatically inherit the default value. (Possible values: "true", "1", "readonly" to set to true)
- **disabled** (optional) The field cannot be changed and will automatically inherit the default value - it will also not submit. (Possible values: "true", "1", "readonly" to set to true)
- **required** (optional) The field must be filled before submitting the form. (Possible values: "true", "1", "readonly" to set to true)
- **filter** (optional) is the [filter](../standard-form-field-attributes.md#filter) to apply.
- **message** (optional) The error message that will be displayed instead of the default message.
- **hint** (optional) The text displayed in the html placeholder element, usually a lighter coloured hint displayed inside an blank field.
- **inputtype** (optional) Set the HTML5 input type
- **pattern** (optional) A regular expression pattern to use for validation.
- **charcounter** (optional) (from Joomla 4.3) Show a character counter (true or false). Use in conjunction with `maxlength`. Default: false.

The Text field can also take an array of option sub elements in order to show suggestions to user in the text field.

Implemented by: libraries/src/Form/Field/TextField.php

## Example XML parameter definition

```xml
<field
        name="mytextvalue" 
        type="text" 
        default="Some text" 
        label="Enter some text" 
        description="" 
        size="10"
/>
```

## Example - Use the integer filter to ensure that letters types get stripped when the form is processed.

```xml
<field 
        name="myintvalue" 
        type="text" 
        default="8" 
        label="Enter some text" 
        description="Enter some description" 
        filter="integer" 
/>
```
## Example - Use the raw filter to ensure that html code is preserved when the form is processed.

```xml
<field
        name="myintvalue"
        type="text"
        default="8"
        label="Enter some text"
        description="Enter some description"
        filter="raw"
/>
```

## See also
* [Textarea form field type](./textarea.md)