---
sidebar_position: 2
title: URL Form Field
---


The **url** form field type provides a text box for data entry which filters to fully qualified URLs. This field essentially is a text field with the type of url. If a fully qualified url (that is one with a scheme and domain such as http://example.com) is entered and it uses idn (that is uses characters that are non ascii such as ê or Ψ) it will translate the url into punycode prior to saving. This ensures that the url will work as intended regardless of environment. If you want to render field data in idn you should wrap it with the conversion method :
```php
use Joomla\CMS\String\PunycodeHelper;
$value = PunycodeHelper::urlToPunycode($value);
```

- **type** (mandatory) must be *url*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the field.
- **description** (optional) (translatable) is text that will be shown as a tooltip when the user moves the mouse over the field.
- **default** (optional) (not translatable) is the default value.
- **size** (optional) is the width of the text box in characters. If omitted the width is determined by the browser. The value of size does not limit the number of characters that may be entered.
- **maxlength** (optional) limits the number of characters that may be entered.
- **class** (optional) is a CSS class name for the HTML form field. If omitted this will default to 'text_area'.
- **readonly** (optional) The field cannot be changed and will automatically inherit the default value. (Possible values: "true", "1", "readonly" to set to true)
- **disabled** (optional) The field cannot be changed and will automatically inherit the default value - it will also not submit. (Possible values: "true", "1", "readonly" to set to true)
- **required** (optional) The field must be filled before submitting the form. (Possible values: "true", "1", "readonly" to set to true)
- **filter** (optional) allow the system to save certain html tags or raw data.
- **hint** (optional) The text displayed in the html placeholder element, usually a lighter coloured hint displayed inside an blank field.
- **validate** (optional) makes a validation.
- **relative** (optional) set to true for relative URLs.

Implemented by: libraries/src/Form/UrlField.php

## Example XML parameter definition

```xml
<field
        ame="mytextvalue" 
        type="url" 
        default="http://www.example.com" 
        label="Enter a URL" 
        description="" 
        size="10"
/>
```
Both a url rule and a url input filter can assist with this insuring that valid url data are entered into this field field.
## See also
* [Text form field type](./text.md)