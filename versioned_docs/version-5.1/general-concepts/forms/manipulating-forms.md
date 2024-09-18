---
sidebar_position: 4
title: Manipulating Forms
---

Manipulating Forms
==================

## Introduction
This section describes more advanced features of the Joomla Form API than is covered previously, and comprises the following aspects:

- setting the file Path to enable Joomla to find your definition of your form(s), in the case where you don't follow the Joomla standards.
- defining groupings of fields – Joomla provides two types, namely fieldsets and field groups.
- dynamically changing your form (after it's been loaded from an XML file)
- reflection-like methods which allow you to extract information from your form structure and data.

The section concludes with a sample component with examples of the above aspects. 

## File Paths
By default Joomla will look in the …/forms folder of your component to find the XML definition of your form (and also the …/models/forms folder to maintain compatibility with Joomla 3), within the site files if your form is being displayed on the front end, or within the administrator files if your form is being displayed on the back end. The static function `addFormPath()` allows you to add a different directory to the list of directories which Joomla will search.

(Similarly `addFieldPath()` allows you to define a different directory for any custom form field definitions (the default being …/models/fields in Joomla 3) and `addRulePath()` allows you to define a different directory for any custom validation rules (the default being …/models/rules in Joomla 3). However with namespacing introduced in Joomla 4 it's easier to add `addfieldprefix` and `addruleprefix` attributes to your form to enable Joomla to find custom field types and validation rules.)

## Fieldsets
Fieldsets are associated with the `<fieldset name="myfieldset">` element in the XML definition of the form. The advantage of using fieldsets is that in your layout file you can use
```php
$form->renderFieldset("myfieldset");
```
to render all the fields which have `<field>` elements inside the `<fieldset>` opening and closing tags. This is instead of having to call `renderField()` for each field within the fieldset.

A fieldset can be viewed as a set of fields which should be displayed together in a form, and are thus similar in concept to the HTML `<fieldset>` element. However, note that `renderFieldset()` does not output the HTML `<fieldset>` or related tags. 

## Field Groups
Field groups are associated with the `<fields name="mygroup">` element in the XML definition of the form. This affects the HTML name attribute which is assigned to HTML input elements of fields which are defined within the `<fields>` opening and closing tags in the XML form definition, and hence the name of the parameter as sent to the server in the HTTP POST request.

If you specify the option `"control" => "myform"` when you set up your Form instance then input field values will be sent to the server in the HTTP POST request keyed like
```
myform[field1]

myform[field2]

myform[field3]
```

If you enclose these fields in the XML form definition within a `<fields name="mygroup">` element then the POST parameters will be sent with names like
```
myform[mygroup][field1]

myform[mygroup][field2]

myform[mygroup][field3]
```
If your component has a database table and you store a number of parameters in a json string in one of the columns of the table, then you can group the HTML input elements of those parameters inside a `<fields>` element. If you name the fields tag to match your column name then you can use the Joomla Table functionality to easily convert the PHP associative array arising from the POST parameters into the json string for storing in the database.

The `$group` parameter which appears in several Form API methods refers to the `name` attribute of the `<fields>` tag in the form definition XML.

Note that `fieldsets` and `field groups` are independent. In your form XML definition you can have `<fields>` elements within `<fieldset>` elements, and also `<fieldset>` elements within `<fields>` elements. 

## Dynamically Changing Forms
If you have defined your form statically in an XML file, then once it's been loaded you can modify it dynamically in your PHP code using the Form APIs

- adding further fields to your form by loading another form XML definition
- modifying an existing field or fields,
- removing a field or group of fields.

### Adding Fields via form definition
To include additional definitions from a file into your form do
```php
$form->loadFile($filename);
```
passing the `$filename` of an XML file structured in the same way as your main form definition file.

Alternatively you can create a `SimpleXMLElement` (`$xml` say) in your code which contains the same XML and then call
```php
$form->load($xml);
```
(The Joomla code for `loadFile()` just reads the data from the file into a SimpleXMLElement variable and then calls `load()`).

With both these functions you can pass additional parameters:

- `$replace` (in the `load()` method) / `$reset` (in the `loadFile()` method) – both of these have the same effect, and relate to the case where a field in the XML being loaded has a name which is the same as one in the form already. If set to true then the new field replaces the old one. If set to false then the new field is ignored.
- `$xpath` – if you want only part of the XML structure being loaded to be considered then you can specify an xpath to select the part or parts of the XML you want to include.

In addition to the example in the sample code below, you can find examples of loading additional XML files in the core Joomla administrator `com_menu` code, related to when an admin is setting up site menu options. The basic options for a site menuitem are specified in the item.xml file in administrator/com_menus/models/forms, but in the com_menu model item.php code this is supplemented with options defined in the XML file which is in the layout directory related to the site page which is going to be displayed. 

### Dynamically Setting Fields
You can use `setField()` to add or replace a single field in the Form instance, and `setFields()` to add or replace several fields. To use these you create the XML relating to a field, then pass this to `setField()`
```php
$xml = new SimpleXMLElement('<field name="newfield" … />');
$form->setField($xml);
```
Similarly you can define an array of such XML elements and pass these to `setFields()`, which is the equivalent of calling `setField()` on each of the individual elements.

Specify the `$group` and `$fieldset` parameters to include the new field within a specific field group and fieldset.

If the `$replace` parameter is set to true then if an existing field with the same field group and name is found, it will be replaced.

If the `$replace` parameter is set to false and an existing field with the same field group and name is found, then the new field will be ignored. 

### Setting Field Attributes and Values
`setFieldAttribute()` allows you to set / amend an attribute associated with a field. Note that the attribute refers to the Joomla field attribute, rather than the HTML attribute of the input element. For example, to set the HTML `placeholder` attribute you have to set the Joomla `hint` field attribute, and this works only if the Form Field type supports that attribute.

The HTML `value` attribute is treated somewhat differently from other HTML attributes. As outlined in [How Forms Work](how-forms-work.md), in the Joomla Form instance the XML form structure (defined by the form definition XML file) is held separately from the form pre-fill data (passed in the `bind()` method). What is output in the `value` attribute of the HTML input element is primarily the default Joomla form field attribute (if supported for that field type), but this is overridden by any value specified for that field in the `bind()` call.

You can thus set the default attribute using `setFieldAttribute()`, but to set the field value directly within the pre-fill data use `setValue()`.

### Removing Fields
You can remove fields from the Form definition by calling `removeField()` to remove a specific field or `removeGroup()` to remove all the fields within a specified field group. 

## Reflection Methods
There are a number of methods which allow you to access various aspects of the Form instance data. Mostly these are fairly straightforward to understand, and only cases where it may not be totally clear are explained below.

`getData()` returns as a Joomla Registry object the pre-fill data which has been set using the Form `bind()` call.

The methods `getField()`, `getFieldset()` and `getGroup()` all return fields as Joomla FormField objects, rather than how they're held internally within the Form instance.

`getFieldsets()` returns an array of Fieldset objects with properties which reflect the `<fieldset>` tag in the form definition file. So if you have
```xml
<fieldset name="myfieldset" label="myfieldsetLabel" description="myfieldsetDescription">
```
then you can do
```php
$fieldsets = $form->getFieldsets();
echo $fieldsets['myfieldset']->label;   // outputs "myfieldsetLabel"
```
`getFormControl()` returns the string from your `$options` parameter passed when you created the Form instance. If you used the Joomla standard of `"control" => "jform"` within this `$options` array then `getFormControl()` will return the string "jform".

`getInput()` and `getLabel()` return the HTML for the `<input>` tag and `<label>` respectively of the field which has been passed as a parameter. However, note that neither of these work if you have a Custom Field. Also note that these Form methods are different from the `getInput()` and `getLabel()` FormField methods which you have to provide when you are setting up some types of Custom Fields.

`getValue()` returns the value of the field you pass as a parameter, reading this from the data passed in the `bind()` call. It doesn't take account of the default attribute set against the field, which will get converted into the HTML field value attribute if no pre-fill data for that field is provided. 

## Sample Component Code
For this section you can download [this component zip file](./_assets/com_sample_form3.zip) and install it. It demonstrates several of the features described in this section. It doesn't follow the standard Joomla MVC pattern, and instead has all of the functionality in the single Extension class. This is because its aim is to highlight the APIs associated with manipulating forms. 

After you have installed the file, navigate to your site home page and add the query parameter `?option=com_sample_form3` to run the component. This should display the form and allow you to enter data and submit the form. The comments in the code should make it clear what's going on.
