---
sidebar_position: 2
title: Language Form Field
---


The **language** form field type provides a drop down list of the installed languages for the Frontend or Backend. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected. The value saved is the language tag. For example, for English (United Kingdom) this will be en-GB.

- **type** (mandatory) must be *language*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **client** (mandatory) is the application whose installed languages will be listed. Use 'site' when you want to list the Frontend languages or 'administrator' when you want to list the Backend languages.
- **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **default** (optional) (translatable) is the default value.

Implemented by: libraries/src/Form/Field/LanguageField.php

## Example XML parameter definition

```xml
<field
        name="mylanguage" 
        type="language" 
        client="site" 
        default="en-GB" 
        label="Select a language" 
        description=""
/>
```
