---
sidebar_position: 17
title: Step 17 Validation
---

## Introduction

In this step we apply server-side and client-side validation to the fields of our component.

Server-side validation is the more important as it prevents both accidental and deliberate
attempts to corrupt the integrity of our extension.

Client-side validation provides a better user experience, as user errors can be reported faster,
and it also reduces load on the server.  

The additional filtering and validation which we will apply will involve adding attributes in the form definition XML files.
We'll describe these changes for each of the fields for both server-side and client-side validation,
and then provide the updated XML definition files at the end.

We'll also look at how to use [curl](https://curl.se/) to bypass the client-side validation
and check the efficacy of our server-side validation.

The code is available at [com_example step 17](https://github.com/joomla/manual-examples/tree/main/component-tutorial/step17_validation).

## Learning Points

Server-side validation

Client-side validation

Testing validation using curl

## Server-side Validation

### Background

As described in the Form documentation [Handling the HTTP POST Data](../../../general-concepts/forms/how-forms-work.md#step-5-handling-the-http-post-data),
Joomla has a 2-step process for cleaning and validating data entered by users:

1. Filtering - the data is passed through a filter to remove inappropriate characters.
In the XML form definition this is defined by the `filter=` field attribute,
and the value may be one of the [Input Filters](../../../general-concepts/input.md#available-filters)
or one of the [Form Filters](../../../general-concepts/forms-fields/standard-form-field-attributes.md#filter).

2. Validation - the data is passed to a validation routine, 
which will return whether the data is valid or not, plus an error message if it's invalid. 
In the XML form definition the validation routine is defined by the `validate=` field attribute,
and the value may be one of the available [Validation Rules](../../../general-concepts/forms/server-side-validation.md#server-side-validation).

The validate() function in FormModel passes each field of a form through both the filter and validation routines.
If no filter attribute is present in a field definition then a default input filter is used which sanitizes HTML. 
If no validate attribute is present then no validation routine is executed.

Our administrator LandmarkModel inherits from AdminModel (which extends FormModel),
so this validate() function will be automatically called in the code which handles the HTTP POST from the landmark edit form.

If the validation routine fails then an error message is output,
and you can set what this should be by setting the `message=` attribute.

In addition to the validation routines, Joomla also checks that the data matches how the following field attributes are set:

- required - field must be set

- disabled - field must not be present

### Landmark Fields

Let's now consider what filtering and validation should be performed for the landmark fields.

**title** - the name of the landmark, limited to 40 characters text (based on the database column size).

Currently this has no filter, so the default filter (to remove HTML angle brackets) will be applied, and this is sufficient.

There is currently no validation routine, but we could add an attribute:

```
maxlength="40"
```

This will make the browser limit the number of characters allowed in the HTML input element.

Of course, using curl we can bypass the browser and send a POST directly to the server with a longer 'title',
and setting maxlength doesn't have any effect in this case.
Even with no validation routine defined, this action will fail when com_example tries to store the title in the database. 
There isn't a standard Joomla validation routine for validating the length, but we can do it using a regex:

```
validate="regex"
validate_regex="^.{2,40}$"   // checks that the string is between 2 and 40 characters long
message="COM_EXAMPLE_INVALID_TITLE"  // "Name must be between 2 and 40 characters"
```

**description**

This is an editor field, so we want to allow some HTML to provide the formatting. There is currently:

```
filter="\Joomla\CMS\Component\ComponentHelper::filterText" 
```

This is a custom filter which applies the Global Configuration / Text Filters to the text,
and the HTML tags which are filtered depend on the authorisation level of the administrator editing the record. 

Again, this is sufficient, and we don't need any special validation either.

**published**

Here we currently have no filter (so the default filter will be applied), but we do have validation:

```
validate="options"
```

This will validate the field against the `value` attributes of the `<option>` elements, so this is sufficient.

**picture**

This is an 'accessiblemedia' type field, and if you look at the source in libraries/src/Form/Field/AccessiblemediaField.php
you'll see that its class extends SubformField, ie it's based on a type="subform" field.

A [subform form field](../../../general-concepts/forms-fields/standard-fields/subform.md) 
allows you to include a section of an XML form definition, containing some subsidiary fields.

With a subform field, Joomla ensures that the filter and validation rules of the constituent fields of the subform get executed.
You can examine the code of the accessiblemedia field to see what filters and validation rules are applied.

**lat**, **long**

These fields currently have no filter and no validation, and we need to apply both.
The type="number" will be passed to the browser as `<input type="number">`,
which means that a browser should not pass inappropriate characters to a server,
but a POST crafted using curl can send anything in these fields.

So we apply a filter:

```
filter="float"
```

and this will ensure that only characters which a part of a floating point number get through. 

Also we need to apply validation to check the limits of latitudes and longitudes, so for latitude we set:

```
validate="number"
min="-90"
max="90"
message="COM_EXAMPLE_INVALID_LATITUDE"
```

and similarly for longitude.

**zoom**

Here we need an integer filter:

```
filter="integer"
```

and some limits applied to the valid values of the zoom factor:

```
validate="number"
min="0"
max="20"
```

We don't really need a message here because using the browser it isn't possible to select a value outside this range,
and the purpose of the validation is to prevent crafted POST messages corrupting the data.

We need to apply these attributes for the zoom field in both our landmark.xml form definition,
and in the config.xml for the component configuration. 

### Language Strings

We need to add the following validation language constants into the admin .ini file:

```php title="administrator/components/com_example/language/en-GB/com_example.ini
// highlight-start
; Validation errors
COM_EXAMPLE_INVALID_TITLE="Name must be between 2 and 40 characters"
COM_EXAMPLE_INVALID_LATITUDE="Invalid latitude - please enter a value between -90.0 and 90.0"
COM_EXAMPLE_INVALID_LONGITUDE="Invalid longitude - please enter a value between -180.0 and 180.0"
// highlight-end
```

## Client-side Validation

The [Client-side Validation documentation](../../../general-concepts/forms/client-side-validation.md)
describes what needs to be done to implement client-side validation in the browser.
In general, this doesn't need to be as extensive as server-side validation,
because often the HTML input elements don't permit the user to enter invalid data. 

For this step we will implement the validation of the latitude and longitude fields,
to ensure that the values lie between the limits.
This involves writing 2 validation routines in JavaScript:

```js title="media/com_example/js/fieldValidations.js"
window.onload = (event) => {
    document.formvalidator.setHandler('plusMinus90',
        function (value, element) {
            f = parseFloat(value);
            return (f >= -90.0 && f <= 90.0);
        });
    document.formvalidator.setHandler('plusMinus180',
        function (value, element) {
            f = parseFloat(value);
            return (f >= -180.0 && f <= 180.0);
        });
};
```

We need to include this as an asset within the joomla.asset.json file, and make it dependent upon form.validator:

```json title="media/com_example/joomla.asset.json"
{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "com_example",
  "version": "1.0.0",
  "description": "Joomla CMS",
  "license": "GPL-2.0-or-later",
  "assets": [
    {
      "name": "com_example.map",
      "type": "preset",
      "dependencies": [
        "com_example.map#style",
        "com_example.map#script"
      ],
      "version": "1.0.0"
    },
    {
      "name": "com_example.map",
      "type": "style",
      "uri": "com_example/map.css",
      "dependencies": [
        "com_example.leaflet"
      ],
      "attributes": {},
      "version": "1.0.0"
    },
    {
      "name": "com_example.map",
      "type": "script",
      "uri": "com_example/map.js",
      "dependencies": [
        "com_example.leaflet",
        "core"
      ],
      "attributes": {
        "type": "module"
      },
      "version": "1.1.0"
    },
    {
      "name": "com_example.leaflet",
      "type": "script",
      "uri": "https://cdn.jsdelivr.net/npm/leaflet@2.0.0-alpha.1/dist/leaflet.js",
      "dependencies": [],
      "attributes": {
        "type": "module"
      },
      "version": "2.0.0-alpha.1"
    },
    {
      "name": "com_example.leaflet",
      "type": "style",
      "uri": "https://cdn.jsdelivr.net/npm/leaflet@2.0.0-alpha.1/dist/leaflet.css",
      "dependencies": [],
      "attributes": {},
      "version": "2.0.0-alpha.1"
// highlight-start
    },
    {
      "name": "com_example.fieldValidations",
      "type": "script",
      "uri": "com_example/fieldValidations.js",
      "dependencies": [
        "form.validate"
      ],
      "attributes": {
      },
      "version": "1.0.0"
    }
// highlight-end
  ]
}
```

In the tmpl file for the administrator edit landmark we use this web asset, 
and we add class="form-validate" to the `<form>` element:

```php title="administrator/components/com_example/tmpl/landmark/edit.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Router\Route;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Language\Text;

// highlight-next-line
$this->document->getWebAssetManager()->useScript('com_example.fieldValidations');
?>

<form action="<?php echo Route::_('index.php?option=com_example&layout=edit&id=' . (int) $this->item->id); ?>"
// highlight-next-line
    method="post" name="adminForm" id="adminForm" class="form-validate">

    <?php echo $this->form->renderField('title');  ?>
    
    <?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', ['active' => 'general tab', 'recall' => true, 'breakpoint' => 768]); ?>

    <?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'general tab', Text::_('COM_EXAMPLE_LANDMARK_GENERAL_TAB')); ?>
    
    <div class="row">
        <div class="col-lg-9">
            <?php echo $this->form->renderField('description');  ?>
        </div>
        
        <div class="col-lg-3">
            <?php echo LayoutHelper::render('joomla.edit.global', $this); ?>
        </div>
    </div>
    
    <?php echo HTMLHelper::_('uitab.endTab'); ?>
    
    <?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'details tab', Text::_('COM_EXAMPLE_LANDMARK_DETAILS_TAB')); ?>

        <?php echo $this->form->renderFieldset('details');  ?>
    
    <?php echo HTMLHelper::_('uitab.endTab'); ?>
    
    <?php echo HTMLHelper::_('uitab.endTabSet'); ?>
    
    <input type="hidden" name="task" value="" />
    <?php echo HTMLHelper::_('form.token'); ?>
</form>
```

Finally, we have to add attributes to the XML form definition to enable this js validation to be executed.
For the latitude this means adding:

```
class="validate-plusMinus90"
data-validation-text="Error: Latitude must be between -90 and 90"
```

and for the longitude:

```
class="validate-plusMinus180"
data-validation-text="Error: Longitude must be between -180 and 180"
```

Joomla has had an issue in that language constants weren't supported in the data-validation-text.
You can check if your version of Joomla has [this fix for validation text](https://github.com/joomla/joomla-cms/pull/48417).

## XML Form Definitions

Here are the updated files:

```xml title="administrator/components/com_example/forms/landmark.xml"
<?xml version="1.0" encoding="utf-8"?>
<form> 
    <field
            name="title"
            type="text"
            label="COM_EXAMPLE_LANDMARK_TITLE_LABEL"
            description="COM_EXAMPLE_LANDMARK_TITLE_DESC"
            required="true"
  <!-- highlight-start -->
            maxlength="40"
            validate="regex"
            validate_regex="^.{2,40}$"
            message="COM_EXAMPLE_INVALID_TITLE"
  <!-- highlight-end -->
            default=""
            />
    <field  name="description" 
            type="editor"
            label="COM_EXAMPLE_LANDMARK_DESCRIPTION_LABEL" 
            description="COM_EXAMPLE_LANDMARK_DESCRIPTION_DESC"
            filter="\Joomla\CMS\Component\ComponentHelper::filterText" 
            buttons="true" 
            />
    <field
            name="published"
            type="list"
            label="JSTATUS"
            default="1"
            validate="options"
            >
            <option value="1">JPUBLISHED</option>
            <option value="0">JUNPUBLISHED</option>
            <option value="-2">JTRASHED</option>
    </field>
    <fieldset name="details">
        <field
                name="picture"
                label="COM_EXAMPLE_LANDMARK_PICTURE_LABEL"
                description="COM_EXAMPLE_LANDMARK_PICTURE_DESC"
                type="accessiblemedia"
                />
        <fields name="location">
            <field
                name="lat"
                label="COM_EXAMPLE_LANDMARK_LATITUDE_LABEL"
                description="COM_EXAMPLE_LANDMARK_LATITUDE_DESC"
                type="number"
  <!-- highlight-start -->
                filter="float"
                validate="number"
                min="-90"
                max="90"
                message="COM_EXAMPLE_INVALID_LATITUDE"
                class="validate-plusMinus90"
                data-validation-text="Error: Latitude must be between -90 and 90"
  <!-- highlight-end -->
                />
            <field
                name="long"
                label="COM_EXAMPLE_LANDMARK_LONGITUDE_LABEL"
                description="COM_EXAMPLE_LANDMARK_LONGITUDE_DESC"
                type="number"
  <!-- highlight-start -->
                filter="float"
                validate="number"
                min="-180"
                max="180"
                message="COM_EXAMPLE_INVALID_LONGITUDE"
                class="validate-plusMinus180"
                data-validation-text="Error: Longitude must be between -180 and 180"
  <!-- highlight-end -->
                />
        </fields>
        <fields name="params">
            <field 
                name="zoom"
                label="COM_EXAMPLE_LANDMARK_ZOOM_LABEL"
                description="COM_EXAMPLE_LANDMARK_ZOOM_DESC"
                type="integer"
  <!-- highlight-next-line -->
                filter="integer"
                first="0"
                last="20"
                step="1"
  <!-- highlight-start -->
                validate="number"
                min="0"
                max="20"
  <!-- highlight-end -->
                useglobal="true"
                />
        </fields>
        <field
                name="id"
                type="text"
                label="JGLOBAL_FIELD_ID_LABEL"
                class="readonly"
                default="0"
                readonly="true"
                />    
    </fieldset>
</form>
```

```xml title="administrator/components/com_example/config.xml"
<?xml version="1.0" encoding="utf-8"?>
<config>
    <fieldset
        name="display"
        label="COM_EXAMPLE_CONFIG_DISPLAY_SETTINGS_LABEL"
        description="COM_EXAMPLE_CONFIG_DISPLAY_SETTINGS_DESC"
        >
        <field
            name="zoom"
            type="integer"
            label="COM_EXAMPLE_CONFIG_DEFAULT_ZOOM_LABEL"
            description="COM_EXAMPLE_CONFIG_DEFAULT_ZOOM_DESC"
            first="0"
            last="20"
            step="1"
  <!-- highlight-start -->
            validate="number"
            min="0"
            max="20"
  <!-- highlight-end -->
            />
    </fieldset>
</config>
```

and the updated language strings:

```php title="administrator/components/com_example/language/en-GB/com_example.ini"
COM_EXAMPLE_LANDMARK_FIELD_SELECT_TITLE="Landmark"
COM_EXAMPLE_LANDMARK_FIELD_SELECT_DESC="Select a landmark"
; Admin landmarks view
COM_EXAMPLE_LANDMARKS_VIEW_TITLE="Landmarks"
COM_EXAMPLE_LANDMARKS_CAPTION="Table of Landmarks"
COM_EXAMPLE_LANDMARK_TITLE_LABEL="Name"
COM_EXAMPLE_LANDMARKS_LOCATION="Location"
; Admin landmarks view - filter fields
COM_EXAMPLE_LANDMARK_TITLE_ASCENDING="Name ascending"
COM_EXAMPLE_LANDMARK_TITLE_DESCENDING="Name descending"
COM_EXAMPLE_LANDMARK_LOCATION_ASCENDING="Location ascending"
COM_EXAMPLE_LANDMARK_LOCATION_DESCENDING="Location descending"
; Admin landmarks view - confirmations
COM_EXAMPLE_N_ITEMS_DELETED_1="Landmark deleted."
COM_EXAMPLE_N_ITEMS_DELETED="%d Landmarks deleted."
COM_EXAMPLE_N_ITEMS_PUBLISHED_1="Landmark published."
COM_EXAMPLE_N_ITEMS_PUBLISHED="%d Landmarks published."
COM_EXAMPLE_N_ITEMS_UNPUBLISHED_1="Landmark unpublished."
COM_EXAMPLE_N_ITEMS_UNPUBLISHED="%d Landmarks unpublished."
COM_EXAMPLE_N_ITEMS_TRASHED_1="Landmark moved to trash."
COM_EXAMPLE_N_ITEMS_TRASHED="%d Landmarks moved to trash."
; Admin landmark edit form
COM_EXAMPLE_LANDMARK_EDIT="Landmarks: Edit"
COM_EXAMPLE_LANDMARK_TITLE_DESC="Name of the landmark"
COM_EXAMPLE_LANDMARK_DESCRIPTION_LABEL="Description"
COM_EXAMPLE_LANDMARK_DESCRIPTION_DESC="A summary description of the landmark"
COM_EXAMPLE_LANDMARK_PICTURE_LABEL="Landmark image"
COM_EXAMPLE_LANDMARK_PICTURE_DESC="A picture of the landmark"
COM_EXAMPLE_LANDMARK_LATITUDE_LABEL="Latitude"
COM_EXAMPLE_LANDMARK_LATITUDE_DESC="Latitude between -90.0 and 90.0"
COM_EXAMPLE_LANDMARK_LONGITUDE_LABEL="Longitude"
COM_EXAMPLE_LANDMARK_LONGITUDE_DESC="Longitude between -180.0 and 180.0"
COM_EXAMPLE_LANDMARK_ZOOM_LABEL="Zoom level"
COM_EXAMPLE_LANDMARK_ZOOM_DESC="Zoom level for the map, between 0 and 20"
COM_EXAMPLE_SAVE_SUCCESS="Landmark successfully saved"
; Admin landmark edit form - tabs
COM_EXAMPLE_LANDMARK_GENERAL_TAB="General"
COM_EXAMPLE_LANDMARK_DETAILS_TAB="Details"
; Component Configuration
COM_EXAMPLE_CONFIGURATION="Landmarks: Options"
COM_EXAMPLE_CONFIG_DISPLAY_SETTINGS_LABEL="Display"
COM_EXAMPLE_CONFIG_DISPLAY_SETTINGS_DESC="Display options"
COM_EXAMPLE_CONFIG_DEFAULT_ZOOM_LABEL="Zoom"
COM_EXAMPLE_CONFIG_DEFAULT_ZOOM_DESC="Default zoom level for map"
// highlight-start
; Validation errors
COM_EXAMPLE_INVALID_TITLE="Name must be between 2 and 40 characters"
COM_EXAMPLE_INVALID_LATITUDE="Invalid latitude - please enter a value between -90.0 and 90.0"
COM_EXAMPLE_INVALID_LONGITUDE="Invalid longitude - please enter a value between -180.0 and 180.0"
// highlight-end
```

## Installation

In the manifest file, update the version number:

```xml title="com_example/example.xml"
  <!-- highlight-next-line -->
    <version>0.17.0</version>
...
```

and then install the updated component. 

## Exploring your installation - using curl

You can use [curl](https://curl.se/) to generate HTTP POST messages to test the server filtering and validation.

The easiest way I've found to do this is as follows:

1. With your browser's devtools on, navigate to the edit landmark form and press Save.

2. In the devtools Network tab, right-click on the HTTP POST message and select Copy / Copy as cURL (for either bash or cmd)

3. Paste the selection into an editor (I use notepad++ on Windows)

4. Add the curl options:

  -L which makes curl follow the redirect returned from Joomla, and then capture the next page of HTML
  
  -o response.html which outputs the HTML page to a file; put this within your web server document root so you can view it easily.
  
5. Modify the data in the editor, changing the values of the parameters for which you want to test the validation

6. Copy the text from the editor and paste into bash (linux/unix) or cmd (Windows). 
You can then view response.html to see the results.

Some things to try - using the code of the previous step, and then the code of this step, to see the difference.
(If you've installed this step 17 code, then you can still just reinstall the step 16 code to overwrite it).

- set a title longer than 40 characters

- Add letters after the lat/long number - using step 16 code without the filter these letters will get stored in the database,
while step 17 code will filter them out.

- Set a zoom value outside the range 0 to 20.

(If you're using Firefox, then remember that it will let you enter letters into a `<input type="number>` field,
but then will send an empty value for that field to the server).

## Challenge

If your Joomla version includes the [data-validation-text fix](https://github.com/joomla/joomla-cms/pull/48417)
then try changing the code to use language strings for the client-side validation error messages,
by setting the `validationtext=` attribute, as proposed in that pull request.

## For Further Study

If you want to experiment more with different field types, filtering and validation,
then you can try using the [com_exampleform component](../component-examples/example-form-component.md).
