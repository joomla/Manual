---
sidebar_position: 2
title: Groupedlist Form Field
---


The **groupedlist** form field type provides a drop down list or a list box of custom-defined entries which has the ability to show grouped data. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *groupedlist*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the default value, but doesn't mean much for a file.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'inputbox'.
- **multiple** (optional) is whether multiple items can be selected at the same time (true or false).

Implemented by: libraries/src/Form/GroupedlistField.php

The XML `<field>` element must include one or more `<option>` elements which define the list items. The text between the `<option>` and `</option>` tags is what will be shown in the drop down list and is a translatable string. The `<option>` tag takes the following argument:

* value (mandatory) is the value that will be saved for the field if this item is selected.

Tip: Don't forget to close the field definition with `</field>`.

To group the data simply put a `<group>` before the `<option>` elements you want to group and a `</group>` after them.
The `<group>` tag takes the following argument:

* label (translatable) is the text shown in the list.

## Example XML parameter definition

```xml
<field
        name="mylistvalue" 
        type="groupedlist" 
        default="" 
        label="Select an option" 
        description="">
        <group label="Group 1">
          <option value="0">Option 1</option>
          <option value="1">Option 2</option>
        </group>
        <group label="Group 2">
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </group>
        <option value="5">Option 5</option>
        <option value="6">Option 6</option>
</field>
```

## See also

* [List form field type](./list.md)
* [Filelist form field type](./filelist.md)
* [Folderlist form field type](./folderlist.md)
* [Imagelist form field type](./imagelist.md)