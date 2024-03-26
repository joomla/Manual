---
sidebar_position: 2
title: Textarea Form Field
---


The **textarea** form field type provides a dropdown list of h1 to h6 as options.

- **type** (mandatory) must be *textarea*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **rows** (mandatory) is the height of the visible text area in lines. If omitted the height is determined by the browser. The value of rows does not limit the number of lines that may be entered.
- **cols** (mandatory) is the width of the visible text area in characters. If omitted the width is determined by the browser. The value of cols does not limit the number of characters that may be entered.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the default value.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'text_area'.
- **filter** (optional) allow the system to save certain html tags or raw data.
- **hint** (optional) The text displayed in the html placeholder element, usually a lighter coloured hint displayed inside an blank field.

Implemented by: libraries/src/Form/TextareaField.php

## Example XML parameter definition

```xml
<field
        name="mytextarea" 
        type="textarea" 
        default="default" 
        label="Enter some text" 
        description="" 
        rows="10" 
        cols="5"
/>
```
Use the raw filter to ensure that html code is preserved when the form is processed: 

```xml
<field
        name="mytextarea" 
        type="textarea" 
        default="default" 
        label="Enter some text" 
        description="" 
        rows="10" 
        cols="5"
        filter="raw"
/>
```

## Tips
If you need to line break just encode `<br />` in the XML config file like this: `&lt;br /&gt;`  
If you need a new line character in your default value, add `&#13;&#10;` to the default parameter.

## See also
* [Text form field type](./text.md)