---
sidebar_position: 2
title: Accessiblemedia Form Field
---



The **accessiblemedia** form field type provides modal access to the media manager for the choice of an image like the media field. Users with appropriate permissions will be able to upload files.

-   **type** (mandatory) must be *media*.
-   **name** (mandatory) is the unique name of the field.
-   **label** (mandatory) (translatable) is the descriptive title of the
    field.
    **description** (optional) (translatable) is text that will be shown
     as a tooltip when the user moves the mouse over the drop-down box.
-   **directory** (optional) (translatable) is the directory from which the user will be able to choose a file. This attribute should be relative to the top level /images/ folder. The default is that the user will be confined to the top level /images/ folder.
-   **preview** (optional) shows or hides the preview of the currently chosen image. ("true": Show always, "tooltip": Show as tooltip, "false": Show never). Default is "tooltip". (since Joomla! 2.5.5)
-  **preview_width** (optional) sets the max-width of preview image (default: "200").
- **preview_height** (optional) sets the max-height of preview image (default: "200").

Implemented by: libraries/src/Form/Field/AccessiblemediaField.php

## Example XML parameter definition

```xml
<field
  name="myimage"
  type="accessiblemedia"
  directory="stories"
/>
```
![](\img\accessiblemedia.jpg)
The one the right is an Accessible Media Field.

This will open the media manager with the directory /images/stories/ already selected an provide an text field like the media field. In addition it offers a text field for add an alternative text. Note that if you are using this field on the frontend then permissions restrictions are likely to be in force. If the user is not authorized to view or add media they will see an error page in the modal popup ("403 You are not authorized to view this resource."). 

**See also**

PR where the field is addedː [PR](https://github.com/joomla/joomla-cms/pull/27712)