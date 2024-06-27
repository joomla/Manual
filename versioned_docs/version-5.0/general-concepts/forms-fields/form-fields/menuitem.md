---
sidebar_position: 2
title: Menuitem Form Field
---


The **menuitem** form field type provides a drop down list of the available menus from your Joomla! site. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *menuitem*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
  **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) is the default menu item. Note that this is the ItemID number of the menu item.
- **published** (optional) determines whether all menu items are listed or only published menu items. If state is '0' then all menu items will be listed. If state is '1' then only published menu items will be listed. You also can use comma separated values like '1,2'.
- **menu_type** (optional) filters by the `menutype` value in database table `#__menu` or rather the value of form field Menu Type in edit form of a menu.
- **client_id** (optional) filters by the `client_id` value in database table `#__menu`. '0' for site menu items. '1' for administrator menu items. The default value is '0'.
- **language** (optional) filters by the `language` value in database table `#__menu` (language tags). You can also use comma separated values like 'en-GB,de-DE'.

Implemented by: libraries/src/Form/MenuitemField.php

## Example XML parameter definition

```xml
<field 
        name="mymenuitem" 
        type="menuitem" 
        default="45" 
        label="Select a menu item" 
        description="Select a menu item"
/>
```
To add additional rows with translatable strings (such as "Select" or "Default") add an option to the XML. For example:
```xml
<option	value="">JDEFAULT</option>
```


## See also
* [Menu form field type](./menu.md)