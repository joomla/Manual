---
sidebar_position: 2
---

# New deprecations

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

# Language strings

Strings will be removed in 6.0:

File: `administrator/language/en-GB/com_content.ini`
* `COM_CONTENT_RUN_TRANSITION`, use `JWORKFLOW_RUN_TRANSITION` instead 
* `COM_CONTENT_WORKFLOW_STAGE`, use `JWORKFLOW_STAGE` instead 

File: `administrator/language/en-GB/com_fields.ini`
* `COM_FIELDS_FIELD_FORM_LAYOUT_LABEL`, use `JLIB_FORM_FIELD_PARAM_LAYOUT_LABEL` instead 

File: `administrator/language/en-GB/plg_fields_list.ini`
* `PLG_FIELDS_LIST_PARAMS_FORM_LAYOUT_FANCY_SELECT`, use `JLIB_FORM_FIELD_PARAM_LAYOUT_FANCY_SELECT` instead 

File: `administrator/language/en-GB/plg_fields_sql.ini`
* `PLG_FIELDS_SQL_PARAMS_FORM_LAYOUT_FANCY_SELECT`, use `JLIB_FORM_FIELD_PARAM_LAYOUT_FANCY_SELECT` instead 

# Class deprecations

Planned to be removed in Joomla! 7.0.

### Banner component helper

File: `components/com_banners/src/Helper/BannerHelper.php`

Replacement: no replacement

The function `BannerHelper::isImage($url)` has been replaced with a combination of 
`Joomla\CMS\Helper\MediaHelper::isImage($url)` for pixel-based image files and
`Joomla\CMS\Helper\MediaHelper::getMimeType($url) === 'image/svg+xml'` for vector based image files
after being sanitized with the helper function `Joomla\CMS\HTML\HTMLHelper::cleanImageURL($imageurl)`
