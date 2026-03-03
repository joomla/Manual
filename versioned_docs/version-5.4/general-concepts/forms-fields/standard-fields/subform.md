---
sidebar_position: 2
title: Subform Form Field
---

TODO:: Rewrite Jquery and examples to use WebAssets.

The **subform** form field type provides a method for using XML forms inside one another or reusing forms inside an existing form. If attribute `multiple` is set to `true` then the included form will be **repeatable**.

The Field has two "predefined" layouts for displaying the subform as either a table or as a div container, as well as support for custom layouts.

- **type** (mandatory) must be *subform*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **formsource** (mandatory) the form source to be included. A relative path to the xml file (relative to the root folder for the installed Joomla site) or a valid form name which can be found by `Factory::getContainer()->get(FormFactoryInterface::class)->createForm($name, $options);`.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **default** (optional) is the default value, a JSON string.
- **required** (optional) The field must be filled before submitting the form.
- **message** (optional) The error message that will be displayed instead of the default message.
- **multiple** (optional) whether the subform fields are repeatable or not.
- **min** (optional) count of minimum repeating in multiple mode. Default: 0.
- **max** (optional) count of maximum repeating in multiple mode. Default: 1000.
- **groupByFieldset** (optional) whether to group the subform fields by its fieldset (true or false). Default: false.
- **buttons** (optional) which buttons to show in multiple mode. Default: add,remove,move. Empty string sets default, to have no buttons set `buttons="none"`
- **layout** (optional) the name of the layout to use when displaying subform fields.  
  Available layouts:  
  `joomla.form.field.subform.default` - render the subform in a div container, without support of repeating. Default for single mode.  
  `joomla.form.field.subform.repeatable` - render the subform in a div container, used for multiple mode. Support groupByFieldset.  
  `joomla.form.field.subform.repeatable-table` -  render the subform as a table, used for multiple mode. Supports groupByFieldset. By default each field is rendered as a table column, but if `groupByFieldset=true` then each fieldset is rendered as a table column.
- **validate** (optional) should be set to 'Subform' (note that this is case-sensitive!) to ensure that fields in the subform are individually validated. Default: Fields in the subform are not validated, even if validation rules are specified.

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

The following form allows up to 8 image files to be uploaded

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
## Javascript

If a field in your subform has associated JavaScript logic then you may need to consider how to make this work in *multiple="true"* mode, because the subform fields are added dynamically. 

To handle this you can capture the 'joomla:updated' event which is triggered when a subform is added dynamically:

```javascript
document.addEventListener('joomla:updated', (event) => {
  const updatedElement = event.target;
  /*... your code here to process fields in the new row ("updatedElement") ...*/
});
```

If you have javascript validation set in fields of your subform (set by the class="validate-xxx") then this is not triggered when the focus leaves the field, but the validation is run prior to the form being submitted.

This is also true for custom fields which extend SubformField. 

## Server-side validation and filters

Server-side validation and filters are applied to the fields of the subform as normal, in the same way as when those fields are not part of a subform.

This is also true for custom fields which extend SubformField. 
