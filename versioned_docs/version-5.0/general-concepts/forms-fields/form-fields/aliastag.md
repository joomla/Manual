---
sidebar_position: 2
title: Aliastag Form Field
---



The **aliastag** form field type provides a list box containing specific language definitions. It does this by getting a unique list of components and objects from `#__contentitem_tag_map` and then extracting the language definitions for each entry, i.e. it gets "com_content.article" from querying `#__contentitem_tag_map`and then splits it into `com_content` and `article` and looks for `COM_CONTENT_TAGS_ARTICLE="Article"` in the administrator language com_content.sys

-   **type** (mandatory) must be *aliastag*.
-   **name** (mandatory) is the unique name of the field.
-   **label** (mandatory) (translatable) is the descriptive title of the
    field.
-  *description** (optional) (translatable) is text that will be shown
     as a tooltip when the user moves the mouse over the field.
-  **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.


Implemented by: libraries/src/Form/Field/AliastagField.php

## Example XML parameter definition

```xml
<field
        name="myaliastags" 
        type="aliastag"
        label="Select a tag" 
        description=""
/>
```
