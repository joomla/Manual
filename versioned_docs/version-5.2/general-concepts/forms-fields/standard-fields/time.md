---
sidebar_position: 2
title: Time Form Field
---

The **time** form field type provides a select list of integers with specified first, last and step values.

- **type** (mandatory) must be *time*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **min**  (optional) The allowable minimal value of the field in seconds.
- **max**  (optional) The allowable maximal value of the field in seconds.
- **step**  (optional) The steps between different values in seconds.
- **layout**  (optional) The name of the layout being used to render the field, default "joomla.form.field.time"


Implemented by: libraries/src/Form/Field/TimeField.php

## Example XML parameter definition

```xml
<field
        name="mytime" 
        type="time" 
        default="" 
        label="Choose Time" 
        description="TRANSLATABLE_STRING_KEY"
/>
```
### Note: Setting a default value

A default value can be specified as a string time with colon separators in either `HH:MM:SS` or `HH:MM` format. If seconds are included in the default then the display will include a seconds field and a seconds selector in the clock popup. If only hours and minutes are specified then no seconds will be available for either text entry or from the selector - *unless* they are required by the value of max, min or step (see below)

Unlike the calendar field it is **not** possible to use the string "now" to set the default to the current time. 

### Note: Using **max**, **min**, &amp; **step** and when seconds get included.

The TimeField renders as HTML `<input type="time" ... >`. Text entry is provided for hours minutes and optionally seconds, separated by colons. Up and down arrow keys can be used to increment or decrement the selected value. To the right is a clock icon which, when clicked, pops up a selector for setting hour, minute and second values.

The styling and layout of the control is defined by the browser and almost all current browsers have some limitations which you may need to be aware of - in particular the selector values shown when the clock icon is clicked generally do not respect the **min**, **max**, or **step** attributes, and their styling can not be changed.

Furthermore the implementation of these attributes in most current browsers is internally inconsistent - text entry and selector values can override the max and min settings, and step values may not behave as you expect.

By default (with no **default**, **max**, **min** or **step** attributes specified) only hours and minutes are displayed. The max, min and step values are specified in seconds whether or not seconds are actually displayed and returned in the value.

If a **default** value is specified which includes seconds, then seconds will be available in the text display and popup selector, and the returned value will be as a string format HH:MM:SS.

Attribute **step** can also affect whether seconds are displayed. If the value of step is less than 60 and is a factor of 60 (ie represents a whole number fraction of a minute), then seconds will be displayed. 

In this case the step will affect the seconds value; not changing the minutes but wrapping around 60 seconds. For most browsers the up/down arrow keys will step the value. The step values will **not** be represented in the popup selector, and it will still be possible to enter an arbitary value as text, but using the arrow keys will force it to the next step value. 

In the same way if the step value represents a whole number of minutes that is a factor of 60 (ie a whole number fraction of an hour) the the step will be applied to the minutes. In this case if seconds are displayed (eg if the default value includes seconds) the the seonds text display will be greyed out and not selectable and the seconds dial will not be shown in the popup.

The same considerations apply to step values that are a whole number of hours that are a factor of 24 (ie a whole number fraction of a day - 2,3,4,6,8, or 12 hours)

The simplest solution to achieving the effect you might expect, or want, from max, min and step settings, is to provide a javascript function called by `onchange="myfunc(this)"` in the field xml definition which enforces the behaviour you want by correcting any inconsistent values. Passing 'this' as a parameter gives you access to the field's attributes in the javascript.


