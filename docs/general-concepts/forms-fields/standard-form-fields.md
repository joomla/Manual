---
sidebar_position: 1
title: Standard Form Fields
---

Standard Form Fields
====================

## Introduction

Joomla provides an extensive range of type of fields which you can use in your forms. The source code for these field types is found in the libraries/src/Form/Field directory, and nearly all of these are described at [Joomla standard form fields](https://docs.joomla.org/Standard_form_field_types).
To use one of these in your form you simply set it as the `type`, as in the following example:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form> 
    <field
        name="message"
        type="text"
        />
</form>
```

The detailed descriptions of the [standard form field types](https://docs.joomla.org/Standard_form_field_types) also include the attributes you can associate with each form field type; for example you can find a general set of attributes associated with ordinary text input fields at [text field type](https://docs.joomla.org/Text_form_field_type).

If you look at the list of standard form file types you'll see that they fall into a few different categories:

1. several refer to types of fields which map directly to HTML types of [input elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) (eg `color`, `checkbox`, `number`, `tel`). There are examples of `type=text` and `type=email` form fields in the [sample component](./_assets/com_sample_form_field.zip). 
2. there are a couple of types of list field (`list` and `groupedlist`) which map to html `<select>` elements
3. several refer to Joomla-specific entities (eg category, editor, tag), which are used in Joomla forms to capture these types of entities.  
4. the `sql` type allows you to enter a SQL query to define the options available in an HTML `<select>` element
5. the `subform` type provides the ability to include a "subform" consisting of a group of fields, usually defined in a separate XML file. This group of elements can be repeated. There is an example of a `subform` in the [sample component](./_assets/com_sample_form_field.zip) 

## Attributes

Many of the attributes of the fields in the form definition XML file map directly to HTML field attributes, and don't require any further explanation. The descriptions below relate to attributes where the meaning may not be totally clear.

**validate** - is used to define the server-side validation to be applied; see the section on [server-side validation](../forms/server-side-validation.md)

**hint** - maps to the HTML placeholder attribute

**class** - maps to the HTML class attribute of the field. It is used to define the [client-side validation](../forms/client-side-validation.md) to be applied, in addition to the normal use by CSS

**showon** - this controls whether a field appears in the form, dependent upon the value of another field. For example, 
```xml
<field name="radiofield" type="radio" default="1" >
  <option value="1">No showon</option>
  <option value="2">This must be selected for showon field</option>
</field>
<field name="textfield" type="text" showon="radiofield:2"/>
```
The text field is shown only if the radio field is set to 2. The condition can include operators `[AND]` or `[OR]`, as demonstrated in the [sample component code](./_assets/com_sample_form_field.zip) available for download. You can also use
- `showon="radiofield!:2"` - shown if the value of `radiofield` is not equal to 2
- `showon="somefield!:"` - shown if `somefield` has a value - ie it's not blank/null.

**value** - this defines the default value of a field, and is shown as the HTML value in the field unless the `loadFormData` callback results in this field value being set. So for example if the form is being re-presented because a field has an invalid entry, then any previous field value entered by the user will be set as the HTML field value, rather than what is defined in the `value=` attribute of the form XML file. 

**pattern** - this is a regular expression which used in [client-side validation](../forms/client-side-validation.md).

**description** - prior to Joomla 4 this was mapped to the tooltip. From Joomla 4 on this is shown as a separate field which in the admin back-end is made visible / hidden by the Toggle Inline Help button. 