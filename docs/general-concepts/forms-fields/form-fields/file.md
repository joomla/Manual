---
sidebar_position: 2
title: File Form Field
---


The **file** form field type provides an input field for files.

- **type** (mandatory) must be *file*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the default value, but doesn't mean much for a file.
- **size** (optional) is the width of the file box in characters.
- **accept** (optional) Tells the browser what file/MIME types your form will allow to be uploaded. See [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept).
- **class** (optional) is a CSS class name for the HTML form field.
- **labelclass** (optional) adds a CSS class for form field's label; for Joomla 2.5.4+
  disabled (optional) HTML equivalent attribute.
- **onchange** (optional) HTML equivalent attribute (javascript use).
- **required** Cannot be used with this field type. If the field is marked as required it will always fail validation
  regardless of whether a file has been uploaded or not. The suggested workaround is to add a filerequired attribute
  which can be tested in your own file handling code.
- **validate** (optional) Whether to Joomla validate the field according to rules.
- **showon** (optional) Allows you to hide the field based on the value(s) of another field; for Joomla 3.2.4+
- **multiple** (optional) Allows you to upload multiple files at once when set to multiple="true"

Implemented by: libraries/src/Form/Field/FileField.php

**Note 1:** When using the file input type you should always add the attribute enctype="multipart/form-data" to your form tag. Otherwise, the uploaded files will not be attached correctly. 

**Note 2:** You can put a soft limit file size by adding a hidden field with name="MAX_FILE_SIZE" and value the maximum allowed bytes which is handled by php, but you must also handle it in your code with or without it.

## Example XML parameter definition

```xml
<field
        name="myfilevalue" 
        type="file" 
        label="Enter some text" 
        description="Choose an image from your computer with maximum 100KB" 
        size="10" 
        accept="image/*"
/>
```

## See also
* [How to use the filesystem package](https://docs.joomla.org/Special:MyLanguage/How_to_use_the_filesystem_package)