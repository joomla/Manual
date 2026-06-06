---
sidebar_position: 2
title: Meter Form Field
---

The **meter** form field type draws a progress bar. 
See [Bootstrap Progress Bar](https://getbootstrap.com/2.3.2/components.html#progress) for more details.

- **type** (mandatory) must be *meter*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) is a CSS class name for the HTML form field.
- **size** (optional) sets the input size of the field.
- **default** (optional) the initial value of the progress bar.
- **min** (optional) the minimum value of the progress bar.
- **max** (optional) the maximum value of the progress bar.
- **step** (optional) the step at which the progress changes on the bar.
- **animated** (optional) (default:true) sets whether the progress bar is animated or not.
- **active** (optional) (default:false) sets whether the progress bar animation is active. Works with animated.

Note that without setting the min and max values it will probably not work as expected. This is NOT an input type. It just creates a progress bar:

Implemented by: libraries/src/Form/Field/MeterField.php

## Example XML parameter definition 

```xml
<field
        name="meter"
        active="true"
        type="meter"
        label="Meter"
        max="1000"
        min="1"
        step="10"
        default="240"
/>
```
This will create the following HTML code: 

```html
<div class="control-group">
  <div class="control-label">
    <label id="jform_meter-lbl" for="jform_meter" class="">
	Meter
    </label>
    </div>
    <div class="controls">
       <div class="progress  progress-striped active" data-max="1000" data-min="1" data-step="10" data-value="240">		
          <div class="bar" style="width: 23.923923923924%;"></div>
       </div>
    </div>
</div>
```