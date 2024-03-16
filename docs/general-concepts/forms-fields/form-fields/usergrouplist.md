---
sidebar_position: 2
title: Usergrouplist Form Field
---


The **usergrouplist** form field type provides a  dropdown select box of user groups.

- **type** (mandatory) must be *usergrouplist*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the usergroup id of the default selection in the dropdown list.
- **layout** (optional) (translatable) is the layout, for example joomla.form.field.list-fancy-select.
- **checksuperusergroup** (optional) is boolean to omit Super User groups. Values 1 or 0.
- **multiple** (optional) If set to true then allows more than one usergroup to be selected.

Implemented by: libraries/src/Form/UsergrouplistField.php

## Example XML parameter definition

```xml
<field
        name="usergroup"
        type="UserGroupList"
        label="MOD_EXAMPLE_USERGROUP_LABEL"
        description="MOD_EXAMPLE_USERGROUP_DESC"
        layout="joomla.form.field.list-fancy-select"
        checksuperusergroup="1"
        default=""
        multiple="0"
        >
        <option value="0">MOD_EXAMPLE_SELECT</option>
</field>
```
