---
sidebar_position: 2
title: Componentlayout Form Field
---

The **componentlayout** form field type provides a drop down list of all available layouts for a view of an extension. If the parameter has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *componentlayout*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **extension** (mandatory) is the name of the extension for which the layouts will be retrieved (e.g. 'com_content').
- **view** (mandatory) is the name of the view for which the layouts will be retrieved (e.g. 'article').
- **useglobal** (optional) if set to true, it will show the value that is set in the global configuration if found in the database.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.

Implemented by: libraries/src/Form/Field/ComponentlayoutField.php

## Example XML parameter definition

```xml
<field
        name="mylayout" 
        type="componentlayout" 
        extension="com_content" 
        view="article" 
        label="JFIELD_ALT_LAYOUT" 
        useglobal="true" 
        description="JFIELD_ALT_COMPONENT_LAYOUT"
/>
```