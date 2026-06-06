---
sidebar_position: 2
title: Limitbox Form Field
---

The **limitbox** form field type provides a list of item count limits.

- **type** (mandatory) must be *limitbox*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'inputbox'.
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **limits** (optional) a comma-separated string containing limits, i.e. 5,25,50,150.
- **append** (optional) a comma-separated string containing limits to be appended to the default limits.
- **remove** (optional) a comma-separated string containing limits to be removed from the default limits.
- **showall** (optional) controls whether an "All" option is displayed in the dropdown list.
  - **true**: shows the "All" option
  - **false**: hides the "All" option (default)
  - If "All" is selected then a value of 0 is sent as the field value in the parameters of the HTTP POST

The default limits are 5, 10, 15, 20, 25, 30, 50, 100, 200, 500.

**Note** This field is usually used in a form filter.xml file within a component.

Implemented by: libraries/src/Form/Field/LimitboxField.php

## Example XML parameter definition

```xml
<fields name="list">
    <field name="limit"
           type="limitbox"
           label="JGLOBAL_LIST_LIMIT"
           class="input-mini"
           default="10"
           showall="true"
           onchange="this.form.submit();"
    />
</fields>

```

## See also

* [List form field type](./list.md)