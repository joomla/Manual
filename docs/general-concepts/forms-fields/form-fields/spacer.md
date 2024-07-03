---
sidebar_position: 2
title: Spacer Form Field
---

The **spacer** form field type provides a visual separator between parameter field elements. It is purely a visual aid and no field value is stored.

- **type** (mandatory) must be *spacer*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) is the text to use as a spacer.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **hr** (optional) is whether to display a horizontal rule ('true' or 'false'). If this attribute is 'true', the label attribute will be ignored. 
- **class** (optional) is a CSS class name for the HTML form field.

Implemented by: libraries/src/Form/Field/SpacerField.php

## Example XML parameter definition

```xml
<field
        type="spacer" 
        name="myspacer" 
        hr="true"
/>
```

You can replace the basic horizontal line with a title which can be used to group parameters. For example:

```xml
<field
        type="spacer" 
        name="myspacer" 
        label="Advanced parameters"
/>
```
You can also place translatable text into the label attribute: 
```xml
<field 
        type="spacer" 
        name="myspacer" 
        class="text"
        label="PLG_TINY_FIELD_NAME_EXTENDED_LABEL"
/>
```
Note that you can also include HTML markup but it must be encoded. For example, to put the text into bold you can use: 
```xml
<field 
        type="spacer" 
        name="myspacer" 
        label="&lt;b&gt;Advanced parameters&lt;/b&gt;" 
/>
```

**You cannot combine the hr and label attributes.** To define a spacer with both a horizontal rule and a label, use an encoded `<hr/>` in the label attribute: 

```xml
<field 
        type="spacer" 
        name="myspacer" 
        label="&lt;hr/&gt;More parameters" 
/>
```