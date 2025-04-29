---
sidebar_position: 2
title: Checkbox Form Field
---

The **checkbox** form field type provides a single checkbox. If the parameter has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *checkbox*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **value** (optional) is the value of the parameter if this checkbox is set (usually 1).
- **checked** (optional) should be set to 1 to check the checkbox by default or 0 if not.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) allows you set a css class for display. If omitted this will default to 'inputbox'
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.

Implemented by: libraries/src/Form/Field/CheckboxField.php

## Example XML parameter definition

```xml
<field
        name="show_title"
        type="checkbox"
        label="Show title"
        description="Show the title of the item"
        value="1"
/>
```

## With Checkbox checked

```xml
<field
        name="show_title"
        type="checkbox"
        label="Show title"
        description="Show the title of the item"
        value="1"
        checked="1"
/>
```

## Form Processing

:::warning
  Special care needs to be taken when saving a checkbox in a form!
:::

A checkbox that is unchecked is absent from the POST information sent by the browser on form submission. This is standard browser behaviour.

If the form data is stored in the `params` field of a table the unchecked checkbox will be absent. This is not usually a problem.

If the checkbox state is stored in its own field special action is required on submission: test for the presence of the field in the form data and if absent explicitly set it to the unchecked value, usually 0, before storage. Otherwise, unchecking a previously checked checkbox may appear to have no effect.
