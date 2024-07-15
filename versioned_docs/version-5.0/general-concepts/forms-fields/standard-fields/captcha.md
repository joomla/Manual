---
sidebar_position: 2
title: Captcha Form Field
---


The **captcha** form field type provides access to an installed captcha plugin.

- **type** (mandatory) must be *captcha*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **validate** (mandatory) must be "captcha".
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **namespace** (optional) only relevant if there are 2 captchas on a page. If the 2 captchas have the same `namespace` then they will share the same Captcha object. If omitted, the `name` of the `form` object is used instead.

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

To use a Captcha on a form you must have:
- downloaded and installed a Captcha plugin (eg from the [Joomla Extension Directory](https://extensions.joomla.org/))
- enabled the Captcha plugin
- set the Global Configuration / Site / Default Captcha parameter

## See Also

How to develop a [Captcha Plugin](../../../building-extensions/plugins/captcha-plugin.md). 