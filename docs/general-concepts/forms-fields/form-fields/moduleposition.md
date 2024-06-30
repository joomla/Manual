---
sidebar_position: 2
title: Moduleposition Form Field
---


The **moduleposition** form field type provides a drop down to set the ordering of modules in a given position.

- **type** (mandatory) must be *moduleposition*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.

Implemented by: libraries/src/Form/Field/ModulepositionField.php

## Example XML parameter definition

```xml
<field
        name="position" 
        type="moduleposition"
        description="COM_MODULES_FIELD_POSITION_DESC"
        label="COM_MODULES_FIELD_POSITION_LABEL"
        default=""
        maxlength="50"
/>
```

If adding this field to a fieldset outside of the com_modules scope you will have to include addfieldpath="administrator/components/com_modules/models/fields" in your `<fieldset>` tag

```xml
<fieldset name="fieldsetname" label="myfield"
	  addfieldpath="administrator/components/com_modules/models/fields"
>
```

If set up properly, you will see a button displayed next to the textbox (with Joomla standard language text that you can set up to say what you wish in your language file) which when clicked, brings up the standard module position selection window you're used to seeing in the Module Manager. 