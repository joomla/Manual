---
sidebar_position: 2
title: Combo Form Field
---

The **combo** form field type provides a text field, which offers a list list of options to select from. The options do not appear as a dropdown list but are filtered and shown as a popover once 2 or more characters are typed.

- **type** (mandatory) must be *combo*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) allows you set a css class for display. If omitted this will default to 'combobox'.
- **readonly** (optional) set to "true", meaning not editable, defaults to false.
- **disabled** (optional) set to "true", meaning not enabled, defaults to false.
- **size** (optional) sets the input size of the field.
- **required** (optional) sets whether input is required, defaults to no input required.
- **hint** (optional) specify placeholder text to prompt the user

Implemented by: libraries/src/Form/Field/ComboField.php

## Example XML parameter definition

```xml
<field
        name="myeditbox" 
        type="combo" 
        label="MyEditBox" 
        description="myeditbox_Desc"
        hint="type to search or add new text"
        size="40">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
</field>
```
### Note
This does not render as conventional comboBox which appears like a drop down list (`<select ... > ... </select>`) field but with the added ability to type new text in the box. Instead it is rendered as a plain text box and when you start to type after 2 characters any matching options are displayed in a popover for you to select or continue typing new text. The user cannot see all the options at once to select from.

There is a trick the user can use to see all the options by typing 2 spaces in the box - the filter is then triggered, but it ignores spaces so the full list will be displayed. Not many users know that.

If you wish to have something more like a comboBox where the user can see all the options before typing anything, then you can override the layout file (`/layouts/joomla/form/field/combo.php`) - see example below. For a fully featured comboBox there is no plain html alternative (yet) although it can be implemented with custom javascript and css or third party libraries - search the internet for solutions. A full comboBox form-field type may be added in a future version of Joomla. 

## Example override of layout file to use displaylist

This is partial code to replace lines from 52`// Initialize some field attributes.` to the end in your copy of the file `/layouts/joomla/form/field/combo.php` in your component or template `layouts` folder.

```php
// Initialize some field attributes.
$attr .= !empty($class) ? ' class="form-control ' . $class . '"' : ' class="form-control"';
$attr .= !empty($size) ? ' size="' . $size . '"' : '';
$attr .= !empty($readonly) ? ' readonly' : '';
$attr .= !empty($disabled) ? ' disabled' : '';
$attr .= !empty($required) ? ' required' : '';
$attr .= !empty($description) ? ' aria-describedby="' . ($id ?: $name) . '-desc"' : '';
$attr .= !empty($hint) ? ' placeholder="'.$hint.'"' : ' placeholder="click or type"';

// Initialize JavaScript field attributes.
$attr .= !empty($onchange) ? ' onchange="' . $onchange . '"' : '';

$opts = '';
foreach ($options as $option) {
    $opts .= '<option value="'.$option->text.'">';
}
?>
<input
    type="search"
    name="<?php echo $name; ?>"
    id="<?php echo $id; ?>"
    list="xbcombo"
    value="<?php echo htmlspecialchars($value, ENT_COMPAT, 'UTF-8'); ?>"
    <?php echo $attr; ?>
> 
<datalist id="xbcombo">
	<?php echo $opts; ?>
</datalist>
```
So this uses a displaylist element that will pop up when you click in the box. Although all main browsers now support displaylist, the styling is set by the browser and can't be changed. 

The input type is changed to "search" so that a cross is displayed at the end of the box to clear existing text. If there is text in the box then the options will be filtered by the text as with the Joomla combo  field until you clear the box.
