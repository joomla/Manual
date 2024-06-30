---
sidebar_position: 2
title: Range Form Field
---


The **range** form field type provides a horizontal slider for numeric input. While the default value can be set, there is no indication of the actual value being chosen, just the position of the slider’s thumb.

- **type** (mandatory) must be *range*.
- **name** (mandatory) is the unique name of the field.
- **label** (optional) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) the initial value.
- **class** (optional) is a CSS class name for the HTML form field.
- **min** (optional) the lowest value that can be chosen.
- **max** (optional) the highest value that can be chosen.
- **step** (optional) if user click up/down arrow current value will change by this attribute (this attribute value will be added or subtracted to current field value).
- **required** (optional) should the user be required to enter data in this field?

Implemented by: libraries/src/Form/Field/RangeField.php

## Example XML parameter definition 

This will create a slider having the initial value of 0, with possibility to choose values between -0.5 and 0.5. The slider’s value changes by 0.1 as the slider is moved left or right.

```xml
<field
        ame="myrange" 
        type="range" 
        default="0" 
        label="Range from -0.5 to 0.5 step 0.1" 
        description="" 
        min="-0.5" 
        max="0.5" 
        step="0.1"
/>
```