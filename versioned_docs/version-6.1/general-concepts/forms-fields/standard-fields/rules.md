---
sidebar_position: 2
title: Rules Form Field
---

The **rules** form field type provides a matrix of group by action options for managing access control.

- **type** (mandatory) must be *rules*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **component** (mandatory) sets the component to which the action options will apply.
- **section** (mandatory) indicates the section of the access.xml actions the control should apply to. For example, "component" or "my_item_type".
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Implemented by: libraries/src/Form/Field/RulesField.php

This field is often used in config.xml files for a custom extension.

## Example XML parameter definition

```xml 
<fieldset 
        name="permissions" 
        description="JCONFIG_PERMISSIONS_DESC" 
        label="JCONFIG_PERMISSIONS_LABEL">
        <field name="rules" 
               type="rules" 
               component="com_mycomponent" 
               class="inputbox" 
               filter="rules" 
               validate="rules" 
               label="JCONFIG_PERMISSIONS_LABEL" 
               section="component" />
        </fieldset>
```
