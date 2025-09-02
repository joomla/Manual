---
sidebar_position: 2
title: Plugins Form Field
---

The **plugins** form field type provides a dropdown list of plugins from the specified folder.

- **type** (mandatory) must be *plugins*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **folder** (mandatory) eg `editors` or `captcha`
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Implemented by: libraries/src/Form/Field/PluginsField.php

## Example XML parameter definition

```xml
<field  name="editor" 
        type="plugins" 
        folder="editors"
        description="COM_USERS_USER_FIELD_EDITOR_DESC"
        label="COM_USERS_USER_FIELD_EDITOR_LABEL" >
        <option value="">JOPTION_USE_DEFAULT</option>
</field>
````

or

```xml
<field  name="captcha" 
        type="plugins" 
        folder="captcha"
        label="COM_CONTACT_FIELD_CAPTCHA_LABEL"
        description="COM_CONTACT_FIELD_CAPTCHA_DESC"
        default=""
        filter="cmd" >
        <option value="">JOPTION_USE_DEFAULT</option>
        <option value="0">JOPTION_DO_NOT_USE</option>
</field>
```
