---
sidebar_position: 2
title: Folderlist Form Field
---


The **folderlist** form field type provides a drop down list of folders from a specfied directory. If the field has a
saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

By default, the first item on the list is '- Do not use -' (which is translatable) and is given the value '-1' and this
is followed by '- Use default -' (also translatable) given the value '0'.

- **type** (mandatory) must be *folderlist*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **directory** (mandatory) is the filesystem path to the directory containing the folders to be listed.
  **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **default** (optional) is the default folder name.
- **filter** (Joomla 3.x) or **fileFilter** (Joomla 4.0 and later) (optional) is a regular expression string which is
  used to filter the list of folders selected for inclusion in the drop-down list. If omitted, all folders in the
  directory are included. The filter argument expression is applied before the exclude argument expression. For
  information on constructing regular expressions
  see [Regular expressions](https://docs.joomla.org/Special:MyLanguage/J1.5:Regular_expressions_in_parameter_arguments)
  in parameter arguments.
- **exclude** (optional) is a regular expression string which is used to exclude files from the list. The exclude
  argument expression is applied after the filter argument expression. For information on constructing regular
  expressions
  see [Regular expressions](https://docs.joomla.org/Special:MyLanguage/J1.5:Regular_expressions_in_parameter_arguments)
  in parameter arguments.
- **hide_none** (optional) is a Boolean argument. If true, the '- None selected -' item is omitted from the drop-down
  list.
- **hide_default** (optional) is a Boolean argument. If true, the '- Use default -' item is omitted from the drop-down
  list.
- **recursive** (optional) is a Boolean argument. If true, the list of folders recursively includes any sub-folders
  found. Caution: If you have a large number of sub-folders this can make page loading slow.

Implemented by: libraries/src/Form/FolderlistField.php

## Example XML parameter definition

```xml
<field
        name="myfolder"
        type="folderlist"
        default=""
        label="Select a folder"
        directory="administrator"
        filter=""
        exclude=""
        stripext=""
/>
```

## See also

* [Filelist form field type](./filelist.md)
* [Imagelist form field type](./imagelist.md)
