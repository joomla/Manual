---
sidebar_position: 10
title: Step 10 Using AbstractModuleDispatcher
---

Step 10 Using AbstractModuleDispatcher
======================================

If you've looked at the code of any of the Joomla modules then you may have noticed that their Dispatcher code looks quite different from the code we've developed in this module tutorial.
This is because they inherit from the AbstractModuleDispatcher class.

In this step we look at AbstractModuleDispatcher and how we can simplify our code using it.

The source code is available at [mod_hello step 10](https://github.com/joomla/manual-examples/tree/main/module-tutorial/step10_abstract_module_dispatcher). 

## AbstractModuleDispatcher Functionality

The code for \Joomla\CMS\Dispatcher\AbstractModuleDispatcher is in libraries/src/Dispatcher/AbstractModuleDispatcher.php, and this class in turn extends \Joomla\CMS\Dispatcher\Dispatcher in libraries/src/Dispatcher/Dispatcher.php

There are a few things to note about AbstractModuleDispatcher:

1. It gets passed into its constructor the module `$module`, application `$app` and input `$input` variables, and these are stored in instance variables.

2. It has a function `loadLanguage` which loads the .ini language file for the module.

3. It has a function `getLayoutData` which returns an array of 5 variables (module, app, input, params and template):

```php
return [
    'module'   => $this->module,
    'app'      => $this->app,
    'input'    => $this->input,
    'params'   => new Registry($this->module->params),
    'template' => $this->app->getTemplate(),
];
```

(These 5 variables were made available to the module code prior to Joomla 4, so are preserved for backward compatibility).

4. It has a function `dispatch` which performs the following:
   - loads the language via `loadLanguage`
   - calls `getLayoutData` and assigns the array returned to a variable `$displayData`
   - uses PHP `extract` to extract into variables the array elements of `$displayData`
   - executes `require ModuleHelper::getLayoutPath($module->module, $params->get('layout', 'default'));` which runs the tmpl file.

The last 2 operations are performed inside a separate function to create a clean scope.

## Using AbstractModuleDispatcher

Because of the similarity of our mod_hello Dispatcher and AbstractModuleDispatcher we can use the latter to do the following for us:
- store the constructor parameters, making available the` $module`, `$app` and `$input` variables
- load the language
- load the tmpl file

We just have to override `getLayoutData` to add the 'hello' element into the `$data` array, which will become the `$hello` variable when the PHP `extract` is executed.

Our update Dispatcher file has several lines deleted and becomes:

```php title="mod_hello/src/Dispatcher/Dispatcher.php"
<?php

namespace My\Module\Hello\Site\Dispatcher;

\defined('_JEXEC') or die;

// highlight-next-line
use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Application\CMSApplicationInterface;
use Joomla\Input\Input;
use Joomla\Registry\Registry;
use Joomla\CMS\Helper\HelperFactoryAwareInterface;
use Joomla\CMS\Helper\HelperFactoryAwareTrait;

// highlight-next-line
class Dispatcher extends AbstractModuleDispatcher implements HelperFactoryAwareInterface
{
    use HelperFactoryAwareTrait;

    // highlight-start
    protected function getLayoutData(): array
    {
        $data = parent::getLayoutData();

        $username = $this->getHelperFactory()->getHelper('HelloHelper')->getLoggedonUsername('Guest');
        $data['hello'] = Text::_('MOD_HELLO_GREETING') . $username;

        return $data;
    }
    // highlight-end
}
```

In our tmpl file we just have to remember to access the application using `$app` instead of `$this->app`. The `$hello` variable will be defined when the `extract` is performed on the `$data` array. 

```php title="mod_hello/tmpl/default.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

// highlight-next-line
$document = $app->getDocument();
$wa = $document->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('mod_hello');
$wa->useScript('mod_hello.add-suffix');

// Pass the suffix to add down to js
$document->addScriptOptions('mod_hello.vars', ['suffix' => '!']);

$h = $params->get('header', 'h4');
$greeting = "<{$h} class='mod_hello'>{$hello}</{$h}>";

Text::script('MOD_HELLO_AJAX_OK');
Text::script('JLIB_JS_AJAX_ERROR_OTHER');
?>

<?php echo $greeting; ?>
<div>
    <p><?php echo Text::_('MOD_HELLO_NUSERS'); ?><span class="mod_hello_nusers"></span></p>
    <button class="mod_hello_updateusers"><?php echo Text::_('MOD_HELLO_UPDATE_NUSERS'); ?></button>
</div>
```

## A Pattern for Modules

Modules in general follow a simple pattern:
- get the data you want to display (putting any complex logic into a helper file), and,
- display the data in a section of HTML

If the module you want to develop follows this pattern then you can do the following:
- write a Dispatcher class like that of mod_hello
- customise the getLayoutData to set up the data array to suit your requirements. Remember that the elements of this array get extracted into PHP variables (which are available in the tmpl file)
- put any complex logic into functions within the helper file
- using the data you set up, output the HTML in the tmpl file

If you have more complex requirements then you may need to override more functionality in the Dispatcher.php file, but you can use AbstractModuleDispatcher as a base class.

## Updated Manifest File

```xml title="mod_hello/mod_hello.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
    <name>MOD_HELLO_NAME</name>
    <!-- highlight-next-line -->
    <version>1.0.10</version>
    <author>me</author>
    <creationDate>today</creationDate>
    <description>MOD_HELLO_DESCRIPTION</description>
    <namespace path="src">My\Module\Hello</namespace>
    <files>
        <folder module="mod_hello">services</folder>
        <folder>src</folder>
        <folder>tmpl</folder>
        <folder>language</folder>
    </files>
    <scriptfile>script.php</scriptfile>
    <media destination="mod_hello" folder="media">
        <filename>joomla.asset.json</filename>
        <folder>js</folder>
    </media>
    <config>
        <fields name="params">
            <fieldset name="basic">
                <field
                    name="header"
                    type="list"
                    label="MOD_HELLO_HEADER_LEVEL"
                    >
                    <option value="h3">MOD_HELLO_HEADER_LEVEL_3</option>
                    <option value="h4">MOD_HELLO_HEADER_LEVEL_4</option>
                    <option value="h5">MOD_HELLO_HEADER_LEVEL_5</option>
                    <option value="h6">MOD_HELLO_HEADER_LEVEL_6</option>
                </field>
            </fieldset>
        </fields>
    </config>
</extension>
```