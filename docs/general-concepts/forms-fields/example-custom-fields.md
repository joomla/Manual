---
sidebar_position: 3
title: Example Custom Fields
---
This section provides 4 examples of how to create custom fields. The examples are also available in the [sample component code](./_assets/com_sample_form_field.zip) which you can download and install. 

## Custom Field extending FormField
If you extend FormField then you should provide the `getInput` method and from this you should return the string of HTML for the field. For example, to capture a 3 character [IATA airport code](https://wikipedia.org/wiki/International_Air_Transport_Association_code):
```php
protected function getInput()
{
    $html = "<input type='text' id='{$this->id}' name='{$this->name}' " .
            "minlength='3' maxlength='3' size='3' " .
            "oninput='this.value = this.value.toUpperCase()'/>";
    return $html;
}
```
The attributes from your `<field>` element in the form definition XML file will have been loaded in the `setup` function into properties of the class, and so accessible via `$this->name` etc.

It's important to set the `name` attribute because this will be used as the key in the HTTP POST data when the form data is submitted.

By default, the label is set from the `label=` attribute in the form definition XML field. You can override this, for example if you want to include a link:
```php
protected function getLabel()
{
    $html = "Enter the <a href='https://wikipedia.org/wiki/IATA_airport_code' target='_blank'>" .
            "3 character IATA airport code</a>";
    return $html;
}
```
In the [sample component code](./_assets/com_sample_form_field.zip) the custom field type "custom1" gives an example of this.

## Custom Field extending FormField using a layout
If you set the instance variable `$layout` then this is what will be taken as the layout for `getInput`. You don't then need to provide an implementation of `getInput`:
```php
class Custom2Field extends FormField
{
    protected $layout = 'custom2field';
}
```
Joomla loads the attribute data held in `$this` into the `$displayData` so that you can `extract` the variables in your layout file, generating variables such as `$id` and `$name`. For example, in the site layouts/custom2field.php file:
```php
<?php
defined('_JEXEC') or die;
extract($displayData);
?>
<input 
    type='text' 
    id='<?php echo $id?>' 
    name='<?php echo $name?>' 
    minlength='3' 
    maxlength='3' 
    size='3'
    oninput='this.value = this.value.toUpperCase()'/>
```
Remember to include the site layouts folder in your manifest XML file!

In the [sample component code](./_assets/com_sample_form_field.zip) the custom field type "custom2" gives an example of this.

## Custom Field extending ListField
If you want your custom field to display a list of options then you can extend `Joomla\CMS\Form\Field\ListField` and override the `getOptions` function:
```php
use Joomla\CMS\Form\Field\ListField;
class Custom3Field extends ListField
{
    public function getOptions()
    {
        $options  = array("BFS", "HND", "YYZ");
        $options = array_merge(parent::getOptions(), $options);
        return $options;
    }
}
```
The line `$options = array_merge(parent::getOptions(), $options)` merges the options from the previous line with any `<option>` elements from the field in the form definition XML file. 

In the [sample component code](./_assets/com_sample_form_field.zip) the custom field type "custom3" gives an example of this.

## Custom Field extending GroupedlistField
This enables your options to be grouped. For example, if you want to have airport codes grouped by countries, then you can override `getGroups`:
```php
use Joomla\CMS\Form\Field\GroupedlistField;
class Custom4Field extends GroupedlistField
{
    public function getGroups()
    {
        $groups['Japan'] = array("HND");
        $groups['Canada'] = array("XXY", "ABC", "DEF");
        $groups['Northern Ireland'] = array("BFS", "BHD");
        $groups = array_merge(parent::getGroups(), $groups);
        return $groups;
    }
}
```
In the [sample component code](./_assets/com_sample_form_field.zip) the custom field type "custom4" gives an example of this.