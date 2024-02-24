---
sidebar_position: 2
title: Filelist Form Field
---


The **filelist** form field type provides a drop down list of files from a specified directory. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

By default, the first item on the list is '- Do not use -' (which is translatable) and is given the value '-1' and this is followed by '- Use default -' (also translatable) given the value '0'.

- **type** (mandatory) must be *filelist*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
  **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.
- **directory** (optional) is the filesystem path to the directory containing the files to be listed. If omitted the directory given by JPATH_ROOT is assumed.
- **default** (optional) is the default file name.
- **filter** (Joomla 3.x) or **fileFilter** (Joomla 4.0 and later) (optional) is a regular expression string which is used to filter the list of files selected for inclusion in the drop-down list. If omitted, all files in the directory are included. The filter argument expression is applied before the exclude argument expression. For information on constructing regular expressions see [Regular expressions in parameter arguments](https://docs.joomla.org/Special:MyLanguage/J1.5:Regular_expressions_in_parameter_arguments).
- **exclude** (optional) is a regular expression string which is used to exclude files from the list. The exclude argument expression is applied after the filter argument expression. For information on constructing regular expressions see [Regular expressions in parameter arguments](https://docs.joomla.org/Special:MyLanguage/J1.5:Regular_expressions_in_parameter_arguments).
- **stripext** (optional) is a Boolean argument. If true then file name extensions will be stripped from the file names listed. Also note that the file name will be saved without the extension too.
- **hide_none** (optional) is a Boolean argument. If true, the '- None selected -' item is omitted from the drop-down list.
- **hide_default** (optional) is a Boolean argument. If true, the '- Use default -' item is omitted from the drop-down list.

Implemented by: libraries/src/Form/FilelistField.php

## Example XML parameter definition

```xml

<field
        name="myfile" 
        type="filelist" 
        default="" 
        label="Select a file" 
        description="" 
        directory="administrator" 
        filter="" 
        exclude="" 
        stripext=""
/>
```

## See also
* Folderlist form field type
* Imagelist form field type

## TODO: Fix links