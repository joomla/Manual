---
sidebar_position: 4
title: Client-side Validation
---

Client-side Validation
======================

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
    type="telephone"
    class="inputbox validate-numeric"
    …
/>
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
    type="telephone"
    required="true"
    …
/>
```

then the javascript will also verify that a value has been entered into the field.

The validation is performed whenever you click on a button on the form which relates to saving the data, for example:

```html
<button type="button" class="btn btn-primary" onclick="Joomla.submitbutton('myform.submit')">Submit</button>
```

and the validation is triggered within the javascript Joomla.submitbutton function. 

You may also have a cancel button, which doesn't trigger the validation:

```html
<button type="button" class="btn btn-primary" onclick="Joomla.submitbutton('myform.cancel')">Cancel</button>
```

When the toolbar buttons are created only those which involve saving the data have a `class="form-validation"` attribute added to the button's HTML element. When a button is pressed then its `class` attribute is checked. If the `form-validation` class is present then the javascript `Joomla.submitbutton` function is called with the `validate` parameter set to `true`. Otherwise it is called with `validate` set to `false`.

## Custom Validation using pattern

For fields such as `type="text"` and `type="telephone"` (which relate to an html `<input>` element) you can specify a javascript regular expression which the data entered by the user must match. For example

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

You can write your own javascript validation function as described below. The [com_exampleform](../../building-extensions/components/component-examples/example-form-component.md) example component (which can be downloaded from [here](https://github.com/joomla/manual-examples/tree/main/component-exampleform)) provides a working example of client-side validation.

1. Step 1 Write the js function. (Although a regex is used below, you're obviously not limited to this). The value of the field is passed in the `value` parameter, and you should return `true` if the value is valid, or `false` if it isn't.

```js title="no-uppercase.js"
window.onload = (event) => {
    document.formvalidator.setHandler('noUppercase',
        function (value) {
            // look for any uppercase characters 
            regex=/[A-Z]/g;
            // we should return false if any uppercase characters are found
            // ie, it has failed validation
            return !regex.test(value);
        });
};
```

You should store all js files within the media folder, eg as media/js/no-uppercase.js within your component development directory structure. 

2. Assuming you're writing this for a component `com_example`, include the js file within your media/joomla.asset.json list of assets. The code is dependent upon the `form.validate` entry:

```json
{
      "name": "com_example.validate-no-uppercase",
      "type": "script",
      "uri": "com_example/no-uppercase.js",
      "dependencies": [
        "form.validate"
      ],
      "attributes": {
        "defer": true
      },
      "version": "1.0.0"
    } 
```

3. Include your asset within your code, eg in your tmpl file:

```php
$this->document()->getWebAssetManager()->useScript('com_example.validate-no-uppercase');
```

4. In your form definition XML file specify the field to which this validation should be applied. The class attribute "validate-noUppercase" should match the parameter to setHandler in step 1, after the prefix "validate-" is removed. 

```xml
<field 
    name="message"
    type="text"
    class="inputbox validate-noUppercase"
    ... />
```

**This applies to the client-side validation only! It has no effect on the server-side validation!**
