---
sidebar_position: 3
title: Custom Fields Overview
---
Custom Fields Overview
======================

You can define your own type of field (eg "mycustom") which you can then reference in your form definition XML file:

```xml
<field type="mycustom" … />
```

To do this you should extend the `\Joomla\CMS\Form\FormField` which is found in libraries/src/Form/Formfield.php, or you can extend one of the [standard form field types](https://docs.joomla.org/Standard_form_field_types) which extends `FormField`. 

When you define your custom form you will also need to include an `addfieldprefix` attribute in your form XML file, to tell Joomla where to find the field definition. For example, if you have

```php
namespace Mycompany\Component\Example\Administrator\Field;
class MycustomField extends FormField {
   protected $type = 'Mycustom';   
   // including the above is still common practice, but not now necessary with namespaced classes
…
```

then you should have

```xml
<field addfieldprefix ="Mycompany\Component\Example\Administrator\Field" type="mycustom" … />
```

You can include the `addfieldprefix` attribute either at the `<field>` level or inside a tag which encloses the `<field>` tag.

## Joomla Field Design Overview
Before we get into the details of how to code a custom field class, it's useful to get an appreciation of how Joomla handles fields. 
![Joomla Form Fields](_assets/formfield.jpg "Joomla Form Field").

As depicted in the diagram, basically the job of the field is to:

- take as input the `<field>` attributes within the XML file and
- produce as output the HTML relating to the field, in order that it can be included within the overall web page.

To do this the `Form` code calls 2 functions:

- `setup` - this function is passed the XML element relating to the `<field>`, together with the value of the field, and the field group (for when it's inside a `<fields>` element). It's usual that the code of this function extracts the relevant attributes from the XML element into local data.
- `renderField` - this function is expected to return the HTML for the field.

The field HTML comprises 3 parts:
1. the label for the field
2. the input element for the field
3. a `<div>` element which encloses both of the above

To get these parts `renderField` calls 
- getLabel() - to get the HTML for the label, and 
- getInput() - to get the HTML for the input element

and then uses a layout for the enclosing `<div>` element. The strings of HTML returned from `getLabel` and `getInput` are passed as variables into the layout, so that they get included appropriately with the final HTML. 

Many of the Joomla standard form fields use layouts for the HTML label and input elements as well, so the local data which is stored within the `setup()` function is passed as the `$displayData` to the layout, and in this way the HTML attributes such as `class`, `description`, etc get positioned correctly, based on the original attributes in the form XML file. 