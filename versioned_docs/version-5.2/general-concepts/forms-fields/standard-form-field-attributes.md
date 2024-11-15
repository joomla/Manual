---
sidebar_position: 2
title: Standard Form Field Attributes
---

Standard Form Field Attributes
==============================

Many of the attributes of the standard form map directly to HTML field attributes, and don't require any further explanation. The descriptions below relate to attributes where the meaning may not be totally clear.

You can view the available list of general attributes by looking at libraries/src/Form/FormField.php, in the `__set` function. 
As many of these can be used across the range of Joomla standard form fields, they're often not explicitly cited in the form field detailed description.

These attributes include, for example:
- **onchange** - in which you can pass a javascript function which should get control when the input element is changed
- **autofocus** - to specify the input element which should receive focus on page load
- **data-xxx** - data attributes to be set on the input element

## class

This maps to the HTML class attribute of the field. It is used to define the [client-side validation](../forms/client-side-validation.md) to be applied, in addition to the normal use by CSS.

## description

Prior to Joomla 4 this was mapped to the tooltip. From Joomla 4 on this is shown as a separate text below the field.

In the administrator back-end the description is made visible / hidden by the Toggle Inline Help button. 
You can implement this feature in forms of your own component by doing the following:

1. Add the Toggle Inline Help button to your toolbar:

```php
$toolbar = Toolbar::getInstance();
...
$toolbar->inlinehelp();
```

2. Add the configuration to your form XML file:

```xml
<form>
	<config>
		<inlinehelp button="show"/>
	</config>
  ...
</form>
```
 
## filter

This defines the filter which is applied to the field data entered by the user. 
It is important to filter data received from the internet to prevent injection attacks.

By default data from text-related fields are filtered using the \Joomla\Filter\InputFilter class in libraries/vendor/joomla/filter/src/InputFilter.php, which removes, for example, certain HTML tags and attributes.
These tags and attributes are hardcoded, not configurable via Global Configuration / Text Filters.

The alternative filters supplied by Joomla are in libraries/src/Form/Filter and are described below.
If you specify a filter to be used then the default filter is not applied.
Note that these are different from the filters applied to URL parameters (described in [Input Filters](../input.md#available-filters)).

**intarray** - filters the text using PHP [intval](https://www.php.net/manual/en/function.intval.php). Other text characters are discarded. (The data item passed can be a string, it doesn't have to be an array).

**raw** - no filter is applied. 

**rules** - a filter specifically for filtering the type "rules" field, used for entering permissions

**safehtml** - basically the same as the default filter, in that it removes certain HTML tags and attributes. You can easily customise this filter to include additional HTML tags which you wish to be blocked. 

**tel** - applies a filter based on various schemes for telephone numbers. See the source code for details.

**unset** - removes everything and returns null

**url** - removes characters which should not appear in a valid URL

### Custom Filter

To define a custom filter you must:

1. Write the code for your filter class eg Myfilter, which must implement \Joomla\CMS\Form\FormFilterInterface - it must have a filter() method which takes the source string (among other parameters) and returns the filtered string.

2. In your form XML file tell Joomla where to find your filter class by including within or enclosing the `<field>` tag an attribute like:

```
addfilterprefix="My\Component\Example\Site\Filter"
```

3. Use your filter against a field by specifying the attribute filter="myfilter".

The [com_exampleform](../../building-extensions/components/component-examples/example-form-component.md) component whose code you can find at [Example Form Component](https://github.com/joomla/manual-examples/tree/main/component-exampleform) contains an example of a custom filter.

## hint

This maps to the HTML `placeholder` attribute.

## pattern

This is a regular expression which used in [client-side validation](../forms/client-side-validation.md).

## showon

This this controls whether a field appears in the form, dependent upon the value of another field. For example (as shown in [Example Form Component](https://github.com/joomla/manual-examples/tree/main/component-exampleform))

```xml
<field name="radiofield" type="radio" default="1" >
  <option value="1">No showon</option>
  <option value="2">This must be selected for showon field</option>
</field>
<field name="textfield" type="text" showon="radiofield:2"/>
```

The text field is shown only if the radio field is set to 2. 

The condition can include operators `[AND]` or `[OR]`:

```
showon="radio1:2[AND]radio2:2"
```

and you can also use

- `showon="radiofield!:2"` - shown if the value of `radiofield` is not equal to 2
- `showon="somefield!:"` - shown if `somefield` has a value - ie it's not blank/null.

## validate

This is used to define the server-side validation to be applied; see the section on [server-side validation](../forms/server-side-validation.md).

That section also describes how you can define your own custom validation rules, and an example of a custom rule is shown in the `com_exampleform` component available at [Exampleform component](https://github.com/joomla/manual-examples/tree/main/component-exampleform).

## value

This defines the default value of a field, and is shown as the HTML value in the field unless the `loadFormData` callback results in this field value being set. So for example if the form is being re-presented because a field has an invalid entry, then any previous field value entered by the user will be set as the HTML field value, rather than what is defined in the `value=` attribute of the form XML file. 
