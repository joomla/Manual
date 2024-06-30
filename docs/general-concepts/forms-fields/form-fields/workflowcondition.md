---
sidebar_position: 2
title: Workflowcondition Form Field
---

The **workflowcondition** form field type provides a drop down list or a list box of workflow conditions. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *workflowcondition*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'inputbox'.
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.
- **useglobal** (optional) if set to true, it will show the value that is set in the global configuration if found in the database.

Implemented by: libraries/src/Form/Field/WorkflowconditionField.php

## Example XML parameter definition

```xml
<field
        name="publishing"
        type="workflowcondition"
        label="PLG_WORKFLOW_PUBLISHING_TRANSITION_ACTIONS_PUBLISHING_LABEL"
        description="PLG_WORKFLOW_PUBLISHING_TRANSITION_ACTIONS_PUBLISHING_DESC"
        default=""
        hide_all="true"
        >
        <option value="">JOPTION_DO_NOT_USE</option>
</field>
```
