---
sidebar_position: 2
title: Sessionhandler Form Field
---

The **sessionhandler** form field type provides a dropdown list of session handler options (as in Global Configuration / System / Session Handler).

- **type** (mandatory) must be *sessionhandler*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) sets a default value.
- **required** (optional) should this field be required? true/false.
- **filter** (optional) cleans the input.

Implemented by: libraries/src/Form/SessionhandlerField.php

## Example XML parameter definition

```xml
<field
        name="session_handler" 
        type="sessionhandler"
        default="none"
        label="COM_CONFIG_FIELD_SESSION_HANDLER_LABEL"
        description="COM_CONFIG_FIELD_SESSION_HANDLER_DESC"
        required="true"
        filter="word"
/>
```
