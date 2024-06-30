---
sidebar_position: 2
title: Editor Form Field
---


The **editor** form field type provides a WYSIWYG editor.

- **type** (mandatory) must be *editor*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **width** (optional) defines the width (in pixels) of the WYSIWYG editor and defaults to 100%. (Currently not supported)
- **height** (optional) defines the height (in pixels) of the WYSIWYG editor and defaults to 250px. (Currently not supported)
- **cols** (optional) defines the width of the editor (in columns). (Currently not supported)
- **rows** (optional) defines the height of the editor (in rows). (Currently not supported)
- **buttons** (optional) can be an array of plugin buttons to be excluded or set to false. The default editors-xtd are: article, image, pagebreak and readmore.
- **hide** (optional) array of plugin buttons to be hidden. E.g. set buttons="true" hide="readmore,pagebreak"
- **editor** specifies the editor to be used and can include two options. (editor="desired|alternative")
- **filter** (optional) allow the system to save certain HTML tags or raw data.

Implemented by: libraries/src/Form/Field/EditorField.php

## Example XML parameter definition

```xml
<field
        name="test1" 
        type="editor" 
        label="Test Field" 
        description="" 
        width="300" 
        filter="safehtml"
/>
```