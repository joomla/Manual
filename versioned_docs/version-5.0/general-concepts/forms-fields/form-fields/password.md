---
sidebar_position: 2
title: Password Form Field
---


The **password** form field type provides a text box for entry of a password. The password characters will be obscured as they are entered. If the field has a saved value this is entered (in obscured form) into the text box. If not, the default value (if any) is entered.

- **type** (mandatory) must be *password*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
  **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) is the default password.
- **size** (optional) is the width of the text box in characters. If omitted the width is determined by the browser. The value of size does not limit the number of characters that may be entered.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'text_area'.
- **lock** (optional) is a boolean value, if active it removes the password from the output and adds a Modify button to the password field. It only transmits data if the fields is in modify mode.

Implemented by: libraries/src/Form/PasswordField.php

## Example XML parameter definition

```xml
<field
        name="mypassword" 
        type="password" 
        default="secret" 
        label="Enter a password" 
        description="" 
        size="5"
/>
```
## See also
* [Text form field type](./text.md)