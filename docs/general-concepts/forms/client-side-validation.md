---
sidebar_position: 4
title: Client-side Validation
---
# Client-side Validation
Client-side validation is performed by javascript running in the user's browser. However, it's important to highlight that this is not sufficient to make your website secure, as hackers can use utilities such as curl to send form data directly to your server, bypassing your validation. So you always need robust server-side validation.

You can build client-side validation into your forms by doing the following 3 steps:
1. Include the Joomla validate javascript library via the [Web Asset Manager](../web-asset-manager.md):
```php
Factory::getApplication()->getDocument()->getWebAssetManager()->useScript('form.validate');
```
If you're writing this line within a tmpl file, then you will usually have the `Document` available:
```php
$this->document->getWebAssetManager()->useScript('form.validate');
```
This line will result in the file media/system/js/fields/validate.js being sent to the client browser.

2. Specify that you want validation to be performed on your form by adding the form-validate class:
```html
<form class="form-validate"> ... </form>
```

3. Specify the validation you want to be applied to a form field. You do this in your form definition XML file, by adding a class `validate-...` to a field. For example to specify that a telephone number field should be numeric:
```xml
<field 
    name="telephone"
    type="tel"
    class="inputbox validate-numeric"
    ... />
```
There are 4 types of validation which you can use:
- validate-username
- validate-password
- validate-numeric
- validate-email

These all use a javascript regular expression for checking the value entered by the user. (If you need to check the details of the regex used then you can look in media/system/js/fields/validate.js, within the class JFormValidator constructor). 

Note that if you use a form field of `type="email"` then the `validate-email` class will automatically be added. (You still have to add steps 1 and 2 above for it to work though).

Also if you specify that the field is required by eg:
```xml
<field 
    name="telephone"
    type="tel"
    required="true"
    ... />
```
then the javascript will also verify that a value has been entered into the field.

The validation is performed whenever you click on a `submit` button on the form.
```html
<button type="button" class="btn btn-primary" onclick="Joomla.submitbutton('myform.submit')">Submit</button>
```
and the validation is triggered within the javascript Joomla.submitbutton function. You may also have a cancel button:
```html
<button type="button" class="btn btn-primary" onclick="Joomla.submitbutton('myform.cancel')">Cancel</button>
```
The same Joomla.submitbutton function is run, but it checks if the second part of the parameter is 'cancel', and if so it doesn't trigger the validation. 


## Custom Validation using pattern
For `type="text"` and `type="tel"` fields you can specify a javascript regular expression which the data entered by the user must match. For example
```xml
<field 
    name="message"
    type="text"
    pattern="[^x]+"
    ... />
```
will reject the data if there is a letter "x" within the field.

**This applies to the client-side validation only! It has no effect on the server-side validation!**

## Custom Validation routine
You can write your own javascript validation function as follows.

1. Step 1 Write the js function. (Although a regex is used below, you're obviously not limited to this).
```js
jQuery(function() {
    document.formvalidator.setHandler('message',
        function (value) {
            regex=/^[^y]+$/;
            return regex.test(value);
        });
});
```
You should store all js files within the media folder, eg as media/js/validate-message.js within your component development directory structure. 

2. Assuming you're writing this for a component `com_example`, include the js file within your media/joomla.asset.json list of assets. The code is dependent upon the `form.validate` entry and upon jquery:
```json
{
      "name": "com_example.validate-message",
      "type": "script",
      "uri": "com_example/validate-message.js",
      "dependencies": [
        "form.validate", "jquery"
      ],
      "attributes": {
        "defer": true
      },
      "version": "1.0.0"
    } 
```

3. Include your asset within your code, eg in your tmpl file:
```php
$this->document()->getWebAssetManager()->useScript('com_example.validate-message');
```

4. In your form definition XML file specify the field to which this validation should be applied
```xml
<field 
    name="message"
    type="text"
    class="inputbox validate-message"
    ... />
```

**This applies to the client-side validation only! It has no effect on the server-side validation!**
