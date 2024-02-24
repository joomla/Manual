---
sidebar_position: 2
title: Email Form Field
---


The **email** form field type provides an input field for an email address.

- **type** (mandatory) must be *email*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
  **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **size** (optional) determines the size of the field on the screen.
- **required** (optional) "true" to enforce a value.
- **class** (optional) for styling.
- **validate** (optional) makes sure it is an email address.

Implemented by: libraries/src/Form/Field/EmailField.php

## Example XML parameter definition

```xml

<field
        name="email" 
        type="email"
        label="JGLOBAL_EMAIL"
        description="COM_ADMIN_USER_FIELD_EMAIL_DESC"
        required="true"
        size="30"
        class="inputbox"
        validate="email"
/>
```