---
sidebar_position: 2
title: Transition Form Field
---

The **transition** form field extends the **groupedlist** form field type. 
In this case it shows all work flow transitions from one stage to the next grouped by stage title. 
If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected. 

- **type** (mandatory) must be *transition*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **default** (optional) (not translatable) is the default help site URL (not the visible help site name).
- **workflow_stage** which stage is current. An integer value.

Implemented by: libraries/src/Form/Field/TransitionField.php

## Example XML parameter definition

```xml
<field
        name="stage"
        type="transition"
        label="JOPTION_SELECT_STAGE"
        class="js-select-submit-on-change"
        activeonly="true"
        extension="com_content.article"
        workflow_stage="2"
/>
```
