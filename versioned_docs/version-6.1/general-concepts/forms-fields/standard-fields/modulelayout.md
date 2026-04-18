---
sidebar_position: 2
title: Modulelayout Form Field
---

The **modulelayout** form field type provides a drop down list of all available layouts for a view of an extension. If the parameter has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

- **type** (mandatory) must be *modulelayout*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Combining following attributes enable you to provide a drop down list of layouts of a specific module.

- **module** (optional) is a specific module name (e.g. mod_articles_category).
- **client_id** (optional)  
  If 0 (site): Forces searching for layouts only in directories /modules/[MODULENAME]/tmpl/ and all /templates/[TEMPLATENAME]/html/[MODULENAME]/.   
  If 1 (administrator): Forces searching for layouts only in directories /administrator/modules/[MODULENAME]/tmpl/ and all /administrator/templates/[TEMPLATENAME]/html/[MODULENAME]/.
- **template** (optional) is a template name (e.g. cassiopeia or atum). If set forces searching for module template overrides only in this template.`

Implemented by: libraries/src/Form/Field/ModulelayoutField.php

## Example XML parameter definition

```xml
<field
        name="mymodulelayout" 
        type="modulelayout" 
        label="JFIELD_ALT_LAYOUT_LABEL" 
        description="JFIELD_ALT_MODULE_LAYOUT_DESC"
/>
```

### Use Language Constants as Option Values
The layout values can be translated if a language constant has been defined in the correct format in the module or template.

Within the module language file:
```xml
MOD_MYMODULE_LAYOUT_LIST="My Option Label"
```

The string "My Option Label" is displayed for the file / option "list.php" and not "list". 