---
sidebar_position: 2
title: Captcha Form Field
---


The **captcha** form field type provides access to an installed captcha plugin.

- **type** (mandatory) must be *captcha*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **validate** (mandatory) must be captcha.
  **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **namespace** (optional) is used on the com_contact component but I don't know enough about it to comment (from original docs.joomla.org).

Implemented by: libraries/src/Form/Field/CaptchaField.php

## Example XML parameter definition

```xml
<field
        name="captcha" 
        type="captcha" 
        validate="captcha"
        namespace="contact"
        label="COM_CONTACT_CAPTCHA_LABEL"
        description="COM_CONTACT_CAPTCHA_DESC"
/>
```