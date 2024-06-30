---
sidebar_position: 2
title: User Form Field
---


The **user** form field type provides a modal select box of users.

- **type** (mandatory) must be *user*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the default help site URL (not the visible help site name).
- **class** (optional) is a CSS class name for the HTML form field.
- **size** (optional) is the width of the text box in characters. If omitted the width is determined by the browser. The value of size does not limit the number of characters that may be entered.

Implemented by: libraries/src/Form/Field/UserField.php

## Example XML parameter definition

```xml
<field
        name="modified_user_id" 
        type="user"
        label="JGLOBAL_FIELD_MODIFIED_BY_LABEL"
        class="readonly"
        readonly="true"
        filter="unset"
/>
```

### Note
The user field only works on administration forms and should not be added to front-end forms. 