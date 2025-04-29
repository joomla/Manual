---
sidebar_position: 2
title: Media Form Field
---

The **media** form field type provides modal access to the media manager for the choice of an image or other kind of media, e.g. video. Users with appropriate permissions will be able to upload files.

- **type** (mandatory) must be *media*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **directory** (optional) (translatable) is the directory from which the user will be able to choose a file. This attribute should be relative to the top level /images/ folder. The default is that the user will be confined to the top level /images/ folder.
-  **preview** (optional) shows or hides the preview of the currently chosen image. ("true": Show always, "tooltip": Show as tooltip, "false": Show never). Default is "tooltip".
- **preview_width** (optional) sets the max-width of preview image (default: "200").
- **preview_height** (optional) sets the max-height of preview image (default: "200").
- **types** (optional) is a comma-separated list of file types (`images`, `audios`, `videos`, `documents`, `directories`). 
Default is `images`. This list decides which of the allowed file extensions from Media Manager configuration are used. 
For example, `images,documents` means only files with an allowed images extension or an allowed documents extension are available for selection. 
When the type `directories` is used then the field will allow selection of a directory; 
this can be useful in setting extension parameters, to define an upload destination for example.

Implemented by: libraries/src/Form/Field/MediaField.php

## Example XML parameter definition

```xml
<field
  name="myimage"
  type="accessiblemedia"
  directory="stories"
/>
```
This will open the media manager with the directory /images/stories/ already selected.

Note that if you are using this field on the frontend then permissions restrictions are likely to be in force. If the user is not authorised to view or add media they will see an error page in the modal popup ("403 You are not authorised to view this resource.").

## See also

* [File form field type](file.md)
* [Imagelist form field type](imagelist.md)
* [Accessible Media field type](./accessiblemedia.md)
