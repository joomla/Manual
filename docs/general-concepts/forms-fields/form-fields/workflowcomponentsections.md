---
sidebar_position: 2
title: WorkflowComponentSections Form Field
---



The **workflowComponentSections** form field type provides a list box containing enabled extensions of type component. 

-   **type** (mandatory) must be *workflowComponentSections*.
-   **name** (mandatory) is the unique name of the field.
-   **label** (mandatory) (translatable) is the descriptive title of the
    field.
-  *description** (optional) (translatable) is text that will be shown
     as a tooltip when the user moves the mouse over the field.
-  **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.
- **layout** (optional) a selected layout for the field, i.e. 'joomla.form.field.list-fancy-select'


Implemented by: libraries/src/Form/Field/WorkflowComponentSectionsField.php

## Example XML parameter definition

```xml
<field
        name="allowedlist"
        type="WorkflowComponentSections"
        label="JWORKFLOW_EXTENSION_ALLOWED_LABEL"
        description="JWORKFLOW_EXTENSION_ALLOWED_DESCRIPTION"
        multiple="multiple"
        layout="joomla.form.field.list-fancy-select"
/>
```
