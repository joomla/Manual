---
sidebar_position: 3
title: Server-side Validation
---
## Introduction
Joomla provides a framework for implementing both client-side and server-side validation. 

Client-side validation is performed in the browser using Javascript which is downloaded with the web page.

Server-side validation is performed in PHP on the server, when the form fields are sent in the HTTP POST request.

Of these, server-side validation is the more important, as hackers can use utilities such as curl to send HTTP POST requests directly to your web server, bypassing both your HTML form and its client-side verification. 

This section outlines server-side validation in Joomla: the following describes client-side validation.
## Server-side Validation
This is triggered by specifying a `validate=...` attribute in your form definition. In the sample form used in the previous sections there is validation on the telephone number field
```php
<field name="telephone"
    type="telephone"
    label="Enter telephone number"
    required="true"
    size="40"
    class="inputbox"
    validate="tel" />
```
The `validate="tel"` line triggers the validation on this field, and it will use the `test` function in TelRule in libraries/src/Form/Rule to check if the field value is valid. 

You can see the list of validation rules that Joomla provides by looking at the class files in the libraries/src/Form/Rule directory, and choose what validation routine you want to run against the fields in your form. For example, to use the EmailRule you would include `validate="email"` against the email field in your form definition. 
### Custom Server-side Validation
You can define your own validation for a field by writing a custom validation rule. 

The [com_exampleform](../../building-extensions/components/component-examples/example-form-component.md) example component (which can be downloaded from [here](https://github.com/joomla/manual-examples/tree/main/component-exampleform)) provides another working example of server-side validation.

In this section we'll take as an example a custom rule called "custom" which we'll use to replace the Joomla-provided telephone number validation. You can obviously call your own rule whatever you like. Then you have to do 3 things:
- In your field definition against the field add the attribute `validate="custom"` against your field
- Write your CustomRule.php file - we'll come to that shortly
- Tell Joomla where to find your CustomRule class by means of an `addruleprefix` attribute

Let's say your `com_example` component has defined in your XML manifest file
```xml
<namespace path="src">Mycompany\Component\Example</namespace>
```
and you decide to store your rule within the administrator area in src/Rule/CustomRule.php, then you would have:
```php
<field 
    addruleprefix="Mycompany\Component\Example\Administrator\Rule"
    name="telephone"
    type="telephone"
    label="Enter telephone number"
    required="true"
    size="40"
    class="inputbox"
    validate="custom"
    message="The telephone number field is wrong" />
```
and inside your CustomRule.php:
```php
namespace Mycompany\Component\Example\Administrator\Rule;
class CustomRule …
```
If you can specify your custom validation rule as a regular expression, then your easiest option is to reuse the Joomla FormRule class which validates the value by using a protected variable `$regex`:
```php
namespace Mycompany\Component\Example\Administrator\Rule;
use Joomla\CMS\Form\FormRule; 
class CustomRule extends FormRule
{
    protected $regex = '^[0-9\*\#]+$';
}
```
The Joomla FormRule will then validate the field against the overridden `$regex` value, in this case checking that the telephone number contains only the characters 0 to 9, * and #. 

If your validation can't be expressed as a regular expression then you will have to provide the `test` function yourself, following the example of the other validation rules in libraries/src/Form/Rule:
```php
/**
 * Method to test the range for a number value using min and max attributes.
 *
 * @param   \SimpleXMLElement  $element  The SimpleXMLElement object representing the `<field>` tag for the form field object.
 * @param   mixed              $value    The form field value to validate.
 * @param   string             $group    The field name group control value. This acts as an array container for the field.
 *                                       For example if the field has name="foo" and the group value is set to "bar" then the
 *                                       full field name would end up being "bar[foo]".
 * @param   Registry           $input    An optional Registry object with the entire data set to validate against the entire form.
 * @param   Form               $form     The form object for which the field is being tested.
 */
public function test(\SimpleXMLElement $element, $value, $group = null, Registry $input = null, Form $form = null) { … }
```
As you can see from the comments, you are passed in a lot of information, just in case your validation routine needs access to it! For example the Joomla NumberRule tests if the value is between the "min" and "max" attributes set in the field definition in the XML form, and it obtains these limits from the `$element` parameter. In the same way you can specify your own attributes in the field definition, extract them from the `$element` parameter, and use them in your validation of the value entered by the user. You just need to return `true` or `false` from your `test` function.
### Additional Validation
As well as any specify validation against a field, Joomla will also perform two checks against the data:
- if the attribute `required` is set then it will verify that a value has been entered
- if the attribute `disabled` is set then it will verify that a value (other than the default) hasn't been entered

### Validation Error Messages
By default Joomla outputs an "Invalid Field" error message when a field fails its validation. To get Joomla to output a custom message, you can include a `message="Wrong telephone number"` attribute into the field attributes, as is done in the telephone field definition earlier in this page.

As the field attributes are included in the XML element which is passed to the validation `test` function, you can set this attribute from the `test` method. Below is an example for the telephone number validation rule.
```php
<?php
namespace Mycompany\Component\SampleForm2\Site\Rule;
defined('_JEXEC') or die('Restricted access');

use Joomla\CMS\Form\FormRule;
use Joomla\Registry\Registry;
use Joomla\CMS\Form\Form;

class TelephoneRule extends FormRule
{
	protected $regex = '^[0-9\#\*]+$';  // just numbers plus * plus #
    
    public function test(\SimpleXMLElement $element, $value, $group = null, Registry $input = null, Form $form = null)
    {
        if (preg_match(\chr(1) . $this->regex . \chr(1) . $this->modifiers, $value)) {
            return true;
        }
        
        $attr = $element->attributes();
        $error_message = 'The telephone number ' . $value . ' is wrong';
        // how you write the message attribute to the XML element depends on whether it's already set
        if (isset($attr['message'])) {
            $element->attributes()->message = $error_message;
        } else {
            $element->addAttribute('message', $error_message);
        }
        return false;
    }
}
```