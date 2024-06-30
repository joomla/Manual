---
sidebar_position: 2
title: Menu Form Field
---


The **menu** form field type provides a drop down list of the available menus from your Joomla site. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *menu*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **default** (optional) is the default menu. Note that this is the name of the menu shown in the Type column on the Menu Manager screen and not the menu ID number.

Implemented by: libraries/src/Form/MenuField.php

## Example XML parameter definition

```xml
<field
        name="mymenu" 
        type="menu" 
        default="mainmenu" 
        label="Select a menu" 
        description="Select a menu"
/>
```
## See also
* [Menuitem form field type](./menuitem.md)