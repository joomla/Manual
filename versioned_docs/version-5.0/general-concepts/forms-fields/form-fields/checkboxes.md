---
sidebar_position: 2
title: Checkboxes Form Field
---


The **checkboxes** form field type provides a set of checkboxes.

- **type** (mandatory) must be *checkbox*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **option** (mandatory) contains a checkbox definition.
- **checkedOptions** (optional) is a comma separated list of checked checkboxes value.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the label.
- **class** (optional) allows you set a css class for display.
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.


Implemented by: libraries/src/Form/Field/CheckboxesField.php

## Example XML parameter definition

```xml
<field 
        name="toppings" 
        type="checkboxes">
        <option value="anch">Anchovies</option>
        <option value="chor">Chorizo</option>
        <option value="on">Onions</option>
        <option value="mush">Mushrooms</option>
</field>
```


[!WARNING]  
Unlike most standard form field types, such as textfield or checkbox, this field is not an "out of the box" solution. It will create checkboxes for you, and submit their values in form of an array, but it will not store them in the database. 
Example: 
```xml
<field
        name="toppings"
        type="checkboxes">
        <option value="anch">Anchovies</option>
        <option value="chor">Chorizo</option>
        <option value="on">Onions</option>
        <option value="mush">Mushrooms</option>
</field>
```
The set of checkboxes can be generated in your form with a single statement like this: 
```php
<?php echo $this->form->getInput('toppings'); ?>
```
This will generate the following HTML, which can be styled using CSS: 
```xml
<fieldset id="jform_toppings" class="checkboxes">
	<ul>
		<li><input type="checkbox" id="jform_toppings0"
			name="jform[toppings][]" value="anch" /><label for="jform_toppings0">Anchovies</label></li>
		<li><input type="checkbox" id="jform_toppings1"
			name="jform[toppings][]" value="chor" /><label for="jform_toppings1">Chorizo</label></li>
		<li><input type="checkbox" id="jform_toppings2"
			name="jform[toppings][]" value="on" /><label for="jform_toppings2">Onions</label></li>
		<li><input type="checkbox" id="jform_toppings3"
			name="jform[toppings][]" value="mush" /><label for="jform_toppings3">Mushrooms</label></li>
	</ul>
</fieldset>
```
If the user checks the second and fourth item and submits the form, the Joomla server will provide the following result: 

```php
print_r(JRequest::getVar('jform')['toppings']) =>

Array
(
    [0] => chor
    [1] => mush
)
```
