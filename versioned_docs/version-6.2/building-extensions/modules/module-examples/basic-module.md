---
sidebar_position: 1
title: Output a Text String
---

Basic Module
============

If you're completely new to Joomla development you'll probably find it easier to go through the [Module Tutorial](../module-development-tutorial/index.md), 
which explains in more detail what you need to do.

In this section we will create a simple module to output a text string in the frontend.

## Manifest File

For general information on manifest files see [Manifest Files](../../install-update/installation/manifest.md).

```xml title="mod_example/mod_example.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
  <name>MOD_EXAMPLE</name>
  <creationDate>Today</creationDate>
  <author>Me</author>
  <authorEmail>email</authorEmail>
  <authorUrl>web</authorUrl>
  <copyright>(C) 2024 Open Source Matters, Inc.</copyright>
  <license>GNU General Public License version 2 or later</license>
  <namespace path="src">My\Module\Example</namespace>
  <version>1.0.0</version>
  <description><![CDATA[MOD_EXAMPLE_XML_DESCRIPTION]]></description>
  <files>
      <folder module="mod_example">services</folder>
      <folder>language</folder>
      <folder>src</folder>
      <folder>tmpl</folder>
      <file>mod_example.xml</file>
  </files>
  <languages>
      <language tag="en-GB">language/en-GB/mod_example.ini</language>
      <language tag="en-GB">language/en-GB/mod_example.sys.ini</language>
  </languages>
   <config>
      <fields name="params">
          <fieldset name="basic" addfieldprefix="My\Module\Example\Site\Field">
            <field name="my-message" type="text" label="MOD_EXAMPLE_FIELD_MY_MESSAGE_LABEL" description="MOD_EXAMPLE_FIELD_MY_MESSAGE_DESC" />
          </fieldset>
      </fields>
  </config>
</extension>
```

Joomla is quite particular when it comes to manifest files, and it's easy to get something wrong and wonder why your module isn't working. 
Here are a number of things which you must get right.

### Extension type

```xml
<extension type="module" client="site" method="upgrade">
```

### Language constants

```xml
<name>MOD_EXAMPLE</name>
<description><![CDATA[MOD_EXAMPLE_XML_DESCRIPTION]]></description>
```

You don't have to use language strings here, but if you do then you should provide the values of them in your language `.sys.ini` file. (The name and description are displayed in the administrator modules form).

### Namespacing

```xml
<namespace path="src">My\Module\Example</namespace>
```

Strictly speaking you don't have to follow the Joomla-recommended approach of 

```
<MyCompany>\Module\<module name>
```

However you must ensure that your namespace prefix here matches:
- the `use` statement in your services/provider.php file, and,
- the `namespace` statement in your main Extension class

and that all your classes are under the `/src` folder specified in the `path` attribute.

If you run into namespacing problems then it can be useful to check the `administrator/cache/autoload_psr4.php` to verify that your plugin's namespace prefix is pointing to where you expect. 
This cached file is regenerated whenever you install any extension (provided the `Extension - Namespace Updater` plugin is enabled), 
but if you're making changes directly in your Joomla site code then you may need to delete the cached file; it will be regenerated when you next navigate to your Joomla instance.

### Module entry point

```xml
  <files>
      <folder module="mod_example">services</folder>
      <folder>src</folder>
  </files>
```

Ensure that you specify where the entry point of your module is by using the `module="mod_example"` on the services folder.

Ensure that the name of your manifest XML file matches the naming conventions (ie it must be named `mod_example.xml`).

### Language Files

```xml
  <languages>
    <language tag="en-GB">language/en-GB/mod_example.ini</language>
    <language tag="en-GB">language/en-GB/mod_example.sys.ini</language>
  </languages>
```

Check out the manifest file documentation about language file conventions for more information. For our module we set the following language constants:

```xml title="language/en-GB/mod_example.ini"
MOD_EXAMPLE="Example"
MOD_EXAMPLE_XML_DESCRIPTION="An example Module for Joomla!"

MOD_EXAMPLE_FIELD_MY_MESSAGE_LABEL="Your Message"
MOD_EXAMPLE_FIELD_MY_MESSAGE_DESC="Description Text for your Message Field"
```

Please note that a description text always should be descriptive. For example, if we have a field with the title 'Company logo', the name alone should be meaningful enough and a description may not even be necessary.

```xml title="language/en-GB/mod_example.sys.ini"
MOD_EXAMPLE="Example"
MOD_EXAMPLE_XML_DESCRIPTION="An example Module for Joomla!"
```

The `mod_example.ini` file contains all language constants and translations that are used in the rendering of the module (administration interface and rendering) whereas the `mod_example.sys.ini` is used for everything outside of the module settings or the module rendering such as module title and description in the module form.

## Service Provider file

```php title="mod_example/services/provider.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Extension\Service\Provider\HelperFactory;
use Joomla\CMS\Extension\Service\Provider\Module;
use Joomla\CMS\Extension\Service\Provider\ModuleDispatcherFactory;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

return new class() implements ServiceProviderInterface
{
    /**
     * @param   Container  $container
     *
     * @since version
     */
    public function register(Container $container)
    {
        $container->registerServiceProvider( new ModuleDispatcherFactory('\\My\\Module\\Example'));
        $container->registerServiceProvider( new HelperFactory('\\My\\Module\\Example\\Site\\Helper'));
        $container->registerServiceProvider( new Module());
    }
};
```

This is pretty much boilerplate code for obtaining your module from the Dependency Injection Container, and you need to change just 2 lines to set the correct namespace for your module.

```php title="Lines that need to be changed in mod_example/services/provider.php"

$container->registerServiceProvider( new ModuleDispatcherFactory('\\My\\Module\\Example'));
$container->registerServiceProvider( new HelperFactory('\\My\\Module\\Example\\Site\\Helper'));
```

## Dispatcher

```php title="mod_example/src/Dispatcher/Dispatcher.php"
<?php
/**
 * @package                                     <mod_example>
 *
 * @author                                      <MyCompany> | <Me> <email>
 * @copyright                                   Copyright(R) year by  <MyCompany> | <Me>
 * @license                                     GNU General Public License version 2 or later; see LICENSE.txt
 * @link                                        <mywebsite>
 * @since                                       1.0.0
 *
 */

namespace My\Module\Example\Site\Dispatcher;

defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\AbstractModuleDispatcher;
use Joomla\CMS\Helper\HelperFactoryAwareInterface;
use Joomla\CMS\Helper\HelperFactoryAwareTrait;
use Joomla\CMS\Uri\Uri;
use Joomla\Registry\Registry;
use My\Module\Example\Site\Helper\ExampleHelper;

class Dispatcher extends AbstractModuleDispatcher implements HelperFactoryAwareInterface
{
    use HelperFactoryAwareTrait;

    protected function getLayoutData()
    {
    // Get the module Parameters
        $params = new Registry($this->module->params);
        $data          = parent::getLayoutData();

        $helperName    = 'ExampleHelper';
        $data['mymsg'] = $this->getHelperFactory()->getHelper($helperName)->getMessage($data['params'], $this->getApplication());
        return $data;
    }
}
```
The dispatcher handles the call of our module and ensures that the desired data is processed and prepared for display. To do this, we use a helper class, our `ExampleHelper`. The getLayoutData method can still be extended by many possibilities, you could also integrate the WebAssets json here and register the assets of this module centrally, address other helper classes or modules and much more.

All key values within the `$data` array are directly available later in the module templates. For example, we will be able to retrieve our message later in the module template simply via `$mymsg`.

## ExampleHelper

In our Dispatcher we've called a Helper file which needs to be created now.

```php title="mod_example/src/Helper/ExampleHelper.php"
<?php
/**
 * @package                                     <mod_example>
 *
 * @author                                      <MyCompany> | <Me> <email>
 * @copyright                                   Copyright(R) year by  <MyCompany> | <Me>
 * @license                                     GNU General Public License version 2 or later; see LICENSE.txt
 * @link                                        <mywebsite>
 * @since                                       1.0.0
 *
 */

namespace My\Module\Example\Site\Helper;

defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

class ExampleHelper
{
	/**
	 * Method to get the items the helper calls the model to get the items
	 *
	 * @param   Registry  $params  The module parameters
	 * @param   object $app     The application object
	 *
	 * @return  array
	 *
	 * @since   2.0
	 */
	public function getMessage($params, $app)
	{
		// Get the message from the $params
		$message = $params->get('my-message', 'Fallback Message can be noted here');

		return $message;
	}
}
```

Of course, this whole construct is a bit overdone to display a message from the module settings in the template, but it should serve as an example of how to implement a helper in a module.
As always, it is important to define the appropriate namespace so that Joomla! also takes this helper into account.

If required, the helper class can of course contain further logic, call models and much more.

## Template File

The template file is responsible for the effective rendering of the module, in most cases you place your HTML structure in the template file and output the variables.

```php title="mod_example/tmpl/default.php"
<?php
/**
 * @package                                     <mod_example>
 *
 * @author                                      <MyCompany> | <Me> <email>
 * @copyright                                   Copyright(R) year by  <MyCompany> | <Me>
 * @license                                     GNU General Public License version 2 or later; see LICENSE.txt
 * @link                                        <mywebsite>
 * @since                                       1.0.0
 *
 * @var     $module     \Joomla\CMS\Module\Module   The module object
 * @var     $params     \Joomla\Registry\Registry   The module params
 * @var     $mymsg     string                       The String that has been noted in the module settings and has been stored in the data array in our Dispatcher
 *
 */

defined('_JEXEC') or die;

echo '<h1>' . $mymsg . '</h1>';
```

## Installation and Testing

Once you have created the source files, zip up the directory and install the extension via the Joomla administrator back-end.

You then need to go to administrator Content / Site Modules, click on your Example module to edit it and then:
- Enter your message
- Publish your module
- Define a template position for your module
- Define in Menu Assignment which site pages will display your module

Then you can navigate to your site front-end and you should see your module displayed with your custom message. 

If you encounter problems then you can download a zip file of the module from [here](./_assets/mod_example.zip).