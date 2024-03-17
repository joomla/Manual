---
sidebar_position: 2
title: Subform Form Field
---
TODO:: Rewrite Jquery and examples to use WebAssets.

The **subform** form field type provides a method for using XML forms inside one another or reuse forms inside an existing form. If attribute `multiple` is set to `true` then the included form will be **repeatable**.

The Field has two "predefined" layouts for displaying the subform as either a table or as a div container, as well as support for custom layouts.

- **type** (mandatory) must be *subform*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **formsource** (mandatory) the form source to be included. A relative path to the xml file (relative to the root folder for the installed Joomla site) or a valid form name which can be found by `Factory::getContainer()->get(FormFactoryInterface::class)->createForm($name, $options);`.
-  **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) is the default value, a JSON string.
- **required** (optional) The field must be filled before submitting the form.
- **message** (optional) The error message that will be displayed instead of the default message.
- **multiple** (optional) whether the subform fields are repeatable or not.
- **min** (optional) count of minimum repeating in multiple mode. Default: 0.
- **max** (optional) count of maximum repeating in multiple mode. Default: 1000.
- **groupByFieldset** (optional) whether to group the subform fields by its fieldset (true or false). Default: false.
- **buttons** (optional) which buttons to show in multiple mode. Default: add,remove,move.
- **layout** (optional) the name of the layout to use when displaying subform fields.  
  Available layouts:

  `joomla.form.field.subform.default` - render the subform in a div container, without support of repeating. Default for single mode.  
  `joomla.form.field.subform.repeatable` - render the subform in a div container, used for multiple mode. Support groupByFieldset.  
  `joomla.form.field.subform.repeatable-table` -  render the subform as a table, used for multiple mode. Supports groupByFieldset. By default each field is rendered as a table column, but if `groupByFieldset=true` then each fieldset is rendered as a table column.
- **validate** (optional) should be set to Subform (note that this is case-sensitive!) to ensure that fields in the subform are individually validated. Default: Fields in the subform are not validated, even if validation rules are specified.

Implemented by: libraries/src/Form/SubformField.php

## Example XML parameter definition for single mode:
```xml
<field 
        name="field-name" 
        type="subform"
        formsource="path/to/exampleform.xml"
        label="Subform Field" 
        description="Subform Field Description" 
/>
```
## Example XML parameter definition for multiple mode:
```xml
<field 
        name="field-name" 
        type="subform"
        formsource="path/to/exampleform.xml" 
        multiple="true"
        label="Subform Field" 
        description="Subform Field Description" />
```
Example XML of exampleform.xml:


```xml
<form>
    <field name="example_text" type="text" label="Example Text" />
    <field name="example_textarea" type="textarea" label="Example Textarea" cols="40" rows="8" />
</form>

```
An example XML of exampleform.xml with fieldsets:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<form>
    <fieldset name="section1" label="Section1">
        <field name="example_text" type="text" label="Example Text" />
        <field name="example_textarea" type="textarea" label="Example Textarea" cols="40" rows="8" />
    </fieldset>
    <fieldset name="section2" label="Section2">
        <field name="example_list" type="list" default="1" class="advancedSelect" label="Example List">
            <option value="1">JYES</option>
            <option value="0">JNO</option>
        </field>
    </fieldset>
</form>
```

The subform XML may also be specified inline as an alternative to placing the subform XML in a separate file. The following example illustrates this:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<field
        name="field-name"
        type="subform"
        label="Subform Field"
        description="Subform Field Description"
        multiple="true"
        min="1"
        max="10"
>
    <form>
        <field
                name="example_text"
                type="text"
                label="Example Text"
        />
        <field
                name="example_textarea"
                type="textarea"
                label="Example Textarea"
                cols="40"
                rows="8"
        />
    </form>
</field>
```


## Example XML parameter definition
### Allowing up to 8 image files to be uploaded

```xml
 <field
        name="mysubform-addingimages"
        type="subform"
        label="Add Images"
        description=""
        multiple="true"
        min="0"
        max="8"
>
  <form>
    <field
            name="image_file"
            type="file"
            class="file"
            accept="image/*"
    />
  </form>
</field>
```
### Be aware

If your field in the subform has additional JavaScript logic then it may not work in multiple mode, because do not see the fields which added by the subform field dynamically. If it happened then you need to adjust your field to support it. Next example may help:

```javascript
jQuery(document).ready(function(){
/*... here the code for setup your field as usual...*/

    jQuery(document).on('subform-row-add', function(event, row){
        /*... here is the code to set up the fields in the new row ...*/
    })
});
```
Because of this some extra Joomla! fields may not work for now. 

## Fields Validation and Filters
The subform form field does not provide the Validation and Filters for child fields.

Addition: Since a security fix in Joomla 3.9.7 the `filter="example"` attributes in subform child fields are supported and the fields will be validated; **but NOT** in custom form fields that extend the SubformField class. You have to adapt such custom fields yourself! 

### Be aware
All extensions that use subform fields MUST add an attribute `filter` to their subform child fields of type `editor`, `textarea`, `text` (maybe others, too) since Joomla 3.9.7 like it's common for "normal" Form fields, if you want to allow HTML input. Otherwise the validation falls back to STRING, which is the common behavior for "normal" Form fields. Examples: 

`filter="safehtml"`  
`filter="ComponentHelper::filterText"`  
`filter="raw" (bad decision in most cases)`

### A couple of problems / solutions
**Problem** - After adding new rows selects are not "chosen".

**Solution**
```javascript
jQuery(document).ready(function(){
    jQuery(document).on('subform-row-add', function(event, row){
        jQuery(row).find('select').chosen();
    })
});
```
Or a PHP snippet to be used in e.g. your plugin in **onBeforeCompileHead** method or in your component view. 
```php
$doc = Factory::getApplication()->getDocument(); 
$js = '
	jQuery(document).on(\'subform-row-add\', function(event, row){
		jQuery(row).find(\'select\').chosen();
	})
';
$doc->addScriptDeclaration($js);
```
So newly added rows now are "chosen" now 

**Problem** - Subform data not getting stored to database on custom component. 

**Solution**
Add the following line to the beginning of your corresponding table class:
```php
protected $_jsonEncode = array('fieldnamehere');
```
More information [Here](https://joomla.stackexchange.com/questions/19163/subform-multiple-data-not-saving). 