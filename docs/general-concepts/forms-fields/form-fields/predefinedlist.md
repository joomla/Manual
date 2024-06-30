---
sidebar_position: 2
title: Predefinedlist Form Field
---


The **predefinedlist** form field type provides a drop down list of pre-defined entries. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

Largely the configuration options are the same as that of the list field however the values for the field are created by the predefinedOptions class variable. So the following variables have the same meaning as the list field.

- **type** (mandatory) must be *predefinedlist*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the default list item value.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'inputbox'.
- **multiple** (optional) is whether multiple items can be selected at the same time (true or false).
- **required** (optional) if set to true, the first field option should be empty, see last example.
- **useglobal** (optional) if set to true, it will show the value that is set in the global configuration if found in the database.

Implemented by: libraries/src/Form/Field/PredefinedlistField.php

## Example XML parameter definition

```xml
<field 
        name="mylistvalue" 
        type="Myextension.Mycustompredefinedlist" 
        default="" 
        label="Select an option" 
        description="">
</field>
```

this would be accompanied by your field defined in PHP which would look like: 

```php
class MyextensionFormFieldMycustompredefinedlist extends JFormFieldPredefinedList
{
	public $type = 'Mycustompredefinedlist';

	protected $predefinedOptions = array(
		'1'  => 'COM_FOO_LABEL_FOR_TRANSLATION',
		'0'  => 'COM_FOO_ANOTHER_LABEL_FOR_TRANSLATION',
	);
}
```

Additionally in PHP you can set the `translate` class variable to false which will cause the values of your predefined option to not pass through `Text` for translation before being shown to the user. 