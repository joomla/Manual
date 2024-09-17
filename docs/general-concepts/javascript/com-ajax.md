---
sidebar_position: 3
title: Ajax for Modules, Plugins and Templates
---

Using com_ajax for Modules, Plugins and Templates
=================================================

This section demonstrates how you can use Ajax within your modules, plugins and templates by making use of com_ajax.
Because you can't send an HTTP request directly to your module/plugin/template you have to use com_ajax as a proxy,
and it will pass control to your extension based on parameters within the Ajax HTTP request.

:::tip
  You can also use com_ajax in a manner not related to Ajax calls, 
  to support defining a URL for [ad hoc jobs](../../building-extensions/plugins/plugin-examples/ajax-plugin.md). 
:::

## Modules

To pass an Ajax call to a module you need to set within the URL of the Ajax HTTP request
- option - com_ajax
- module - the name of your module without the "mod_" prefix. 
- method - when "Ajax" is added as a suffix, this is the name of the module's helper method to call 
- format - the format of response expected - either "json" or "raw"

The method to call must a public instance function of your module's helper class, 
and the helper class must be named `<Modulename>Helper`, and be namespaced following the Joomla pattern for helper classes. 

Your helper function just returns the required data; com_ajax will use JsonResponse to provide a JSON or raw format output, 
depending on the `format` parameter in the HTTP Request.

If you choose format=raw then whatever is returned from the helper method is echoed directly to the output.

### Module Example 

You can find an example in the [Module Tutorial step 9 Ajax](../../building-extensions/modules/module-development-tutorial/step9-ajax.md).

In this example:
- the module is called mod_hello
- the method within the helper file is countAjax()
- the format requested is json.

Hence the URL has to be of the form:

```
index.php?option=com_ajax&module=hello&method=count&format=json
```

## Plugins

This works by com_ajax raising an Event called `OnAjax<Methodname>` which your plugin must listen for. 

To pass an Ajax call to a plugin you need to set within the URL of the Ajax HTTP request
- option - com_ajax
- plugin - when "OnAjax" is added as a prefix, this is the name of the event which is dispatched 
- format - the format of response expected - either "json" or "raw"

Your plugin should be of the "ajax" plugin group, so in your plugin's manifest file:

```xml
<extension method="upgrade" type="plugin" group="ajax">
```

Your plugin should add the result to the event "result" argument and com_ajax will use JsonResponse to provide a JSON or raw format output, 
depending on the `format` parameter in the HTTP Request. 

Your plugin can raise an Exception, and this will be captured by com_ajax and treated as a failure, 
with the Exception text being passed down in the Ajax response.

### Plugin Example

As an example you can easily modify the [com_ajaxdemo](../../building-extensions/components/component-examples/ajaxdemo.md) code 
of the [Ajax](./ajax.md) documentation section.

Within media/js/divide.js just change the line:

```js
let url = vars.root + 'index.php?option=com_ajaxdemo&format=json&task=ajax.divide';
```

to

```js
let url = vars.root + 'index.php?option=com_ajax&plugin=divide&format=json',
```

This will route the Ajax HTTP request to com_ajax, which will import the "ajax" plugin group, and raise the "OnAjaxDivide" event.

You can download [plg_ajaxdemo](./_assets/plg_ajaxdemo.zip), and then install and enable this plugin.
This plugin performs the a/b division in a similar way to the com_ajaxdemo component.

## Templates

To pass an Ajax call to a template you need to set within the URL of the Ajax HTTP request
- option - com_ajax
- template - the name of the template (eg cassiopeia)
- method - when "Ajax" is added as a suffix, this is the name of the method within the template's helper method to call 
- format - the format of response expected - either "json" or "raw"

The method to call must a public static function of your template's helper class, 
and the helper class must be named `Tpl<Templatename>Helper`, and be in helper.php within the template's directory.

Your helper function just returns the required data; com_ajax will use JsonResponse to provide a JSON or raw format output, 
depending on the `format` parameter in the HTTP Request.

If you choose format=raw then whatever is returned from the helper method is echoed directly to the output.

### Template Example

As an example you can easily modify the [com_ajaxdemo](../../building-extensions/components/component-examples/ajaxdemo.md) code 
of the [Ajax](./ajax.md) documentation section.

Within media/js/divide.js just change the line:

```js
let url = vars.root + 'index.php?option=com_ajaxdemo&format=json&task=ajax.divide';
```

to

```js
let url = vars.root + 'index.php?option=com_ajax&template=cassiopeia&format=json',
```

Then store the following file:
 
```php title="templates/cassiopeia/helper.php"
<?php

defined('_JEXEC') or die;

use Joomla\CMS\Factory;

class TplCassiopeiaHelper
{
    public static function divideAjax()
    {
        $app = Factory::getApplication();
        $input = $app->input; 

        $a = $input->get("a", 0, "float");
        $b = $input->get("b", 0, "float");

        $result = self::_divide($a, $b);
        return $result;
    }
    
    private static function _divide($a, $b)  
    {
        if ($b == 0)
        {
            throw new \Exception('Division by zero!');
        }
        return $a/$b;
    }
}
```

Of course, you should never write files in a folder belonging to Joomla's core files.

However, if you have developed your own template, or if you have created a child template of cassiopeia,
then you can use that template, and store the helper.php file in that template's directory.