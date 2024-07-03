---
sidebar_position: 2
title: Tag Form Field
---

The **tag** form field type provides a point where you can enter tags - this is either AJAX or nested.

- **type** (mandatory) must be *tag*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **mode** (optional) (translatable) is either "ajax" or "nested".
- **id** (optional) is the id to add to the field. Note if none is set this will be the name of the field.
- **class** (optional) is the class to add to the field.
- **published** (optional) determines if non published tags should be allowed.
- **language** (optional) is language to filter the existing tags by.
- **multiple** (optional) is the ability to add more than 1 tag to the form field.
- **custom** (optional) if the ajax mode is chosen setting this to "deny" will prevent users from adding in new tags.

You can see the difference between "ajax" mode and "nested" mode by setting the Global Configuration / Tags / Data Entry and then entering data into the Tags field of an existing article.

**Ajax mode** 

- The field searches tags (via Ajax) while the user types them in the tag field.
- Three min characters are required to launch the first background AJAX search.
- The field also allows custom tag insertion by writing the new tag and pressing the ENTER key (but no longer the COMMA key). 
- All the new custom tags inserted in the field are created on the fly in the database.

**Nested mode**

- The tag dropdown list displays a hierarchical list of tags (shown in a similar way to how categories are shown)
- You cannot create new tags on the fly

Implemented by: libraries/src/Form/Field/TagField.php

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
