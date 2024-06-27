---
sidebar_position: 2
title: Tag Form Field
---


The **tag** form field type provides a point where you can enter tags - this is either AJAX or nested.

- **type** (mandatory) must be *tag*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **mode** (optional) (translatable) is the description of the field.
- **id** (optional) is the id to add to the field. Note if none is set this will be the name of the field.
- **class** (optional) is the class to add to the field.
- **published** (optional) determines if non published tags should be allowed.
- **language** (optional) is language to filter the existing tags by.
- **multiple** (optional) is the ability to add more than 1 tag to the form field.
- **custom** (optional) if the ajax mode is chosen setting this to deny will prevent users from adding in new tags.

Implemented by: libraries/src/Form/Tagield.php

## Example XML parameter definition for an Ajax Tag

```xml
<field
        name="tags" 
        type="tag" 
        label="JTAG" 
        description="JTAG_DESC" 
        mode="ajax" 
        class="inputbox span12 small" 
        multiple="true"
/>
```

## Example XML parameter definition for a Nested Tag

```xml
<field
        name="tags" 
        type="tag" 
        label="JTAG" 
        description="JTAG_DESC" 
        mode="nested" 
        class="inputbox span12 small" 
        multiple="true"
/>
```

## See Also
[Joomla! Community Magazine April 2013 Issue](http://magazine.joomla.org/issues/issue-apr-2103/item/1225-joomla-tag-field)