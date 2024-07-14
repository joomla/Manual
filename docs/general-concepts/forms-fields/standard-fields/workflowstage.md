---
sidebar_position: 2
title: Workflowstage Form Field
---

The **workflowstage** form field extends the **groupedlist** form field type. 
In this case it shows all workflow stages grouped by workflow. 
If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected. 

- **type** (mandatory) must be *workflowstage*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **default** (optional) (not translatable) is the default help site URL (not the visible help site name).

Implemented by: libraries/src/Form/Field/WorkflowstageField.php

## Example XML parameter definition

```xml
<field
        name="stage"
        type="workflowstage"
        label="JOPTION_SELECT_STAGE"
        class="js-select-submit-on-change"
        activeonly="true"
        extension="com_content.article"
        >
        <option value="">JOPTION_SELECT_STAGE</option>
</field>
```
