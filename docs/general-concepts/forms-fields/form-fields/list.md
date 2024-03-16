---
sidebar_position: 2
title: List Form Field
---



The **list** form field type provides  a drop down list or a list box of custom-defined entries. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

-   **type** (mandatory) must be *list*.
-   **name** (mandatory) is the unique name of the field.
-   **label** (mandatory) (translatable) is the descriptive title of the
    field.
-  *description** (optional) (translatable) is text that will be shown
     as a tooltip when the user moves the mouse over the field.
-   **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'inputbox'.
-   **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.
-  **useglobal** (optional) if set to true, it will show the value that is set in the global configuration if found in the database.

Implemented by: libraries/src/Form/Field/ListField.php

The XML `<field>` element must include one or more `<option>` elements which define the list items. The text between the `<option>` and `</option>` tags is what will be shown in the drop down list and is a translatable string. The `<option>` tag takes the following argument:

-    **value** (mandatory) is the value that will be saved for the field if this item is selected.
 -   **requires** (optional) Values: multilanguage, associations and adminlanguage can be used.

Tip: Don't forget to close the field definition with `</field>`.

Tip: Add first an option without a value, with a text like "Select an option". Otherwise, in case of a required field, the first option with a value gets silently selected (i.e., without the user choosing it). This text will typically be seen by users before clicking the dropdown list.

Tip: Some values for "name" field are reserved, so don't use them and avoid problems. One of them is: "style".

## Example XML parameter definition

```xml
<field
        name="mylistvalue" 
        type="list" 
        default="" 
        label="Select an option" 
        description="">
        <option value="">Please Select</option>
        <option value="0">Option 1</option>
        <option value="1">Option 2</option>
</field>
```

## Example XML parameter definition with required value

```xml
<field
        name="mylistvalue" 
        type="list" 
        default="" 
        required="true" 
        label="Select an option" 
        description="">
        <option value="">Please Select</option>
        <option value="0">Option 1</option>
        <option value="1">Option 2</option>
</field>
```

## Showon attribute for list options

Since Joomla 3.9.0 one can use the `showon` attribute for `option` tags in a list field.

* See [Showon documentation](https://docs.joomla.org/Special:MyLanguage/Form_field#Showon).
    This feature was introduced with the [Pull Request #18998](https://github.com/joomla/joomla-cms/pull/18998).
#### Example XML parameter definition for two list fields `fielda` and `fieldb` where the displayed options of `fieldb` are controlled by selections in `fielda`

```xml
<field
    name="fielda"
    type="list"
    label="FIELDA_LABEL"
    description="FIELDA_DESC"
    >
    <option value="editor">TYPE_EDITOR</option>
    <option value="text">TYPE_TEXT</option>
    <option value="textarea">TYPE_TEXTAREA</option>
</field>

<field
    name="fieldb"
    type="list"
    label="FIELDB_LABEL"
    description="FIELDB_DESC"
    >
    <option value="0">JNO</option>
    <option value="1">Option 1</option>
    <option
	    showon="fielda:text,textarea"
	    value="2">Option 2</option>
    <option
	    showon="fielda:text"
	    value="3">Option 3</option>
</field>
```
*    "Option 3" of `fieldb` is only displayed if option "TYPE_TEXT" is selected in `fielda`.
*    "Option 2" of `fieldb` is only displayed if option "TYPE_TEXT" OR "TYPE_TEXTAREA" is selected in `fielda`.
*    "Option 1" and "JNO" of `fieldb` is always displayed.
* 
## See also

* [Filelist form field type](./filelist.md)
* [Folderlist form field type](./folderlist.md)
* [Imagelist form field type](./imagelist.md)