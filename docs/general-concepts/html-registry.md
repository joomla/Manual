---
title: HTML Registry
---

## Introduction

The HTML Registry class (not to be confused with the [Registry](./registry.md) utility class)
provides a set of reusable functions which are (in general) used to create snippets of HTML. 
An example is the HTML for the column headers and little arrows shown at the top of the columns 
in the administrator list of articles, and which control the sorting of the articles by those columns. 

You can find the source code for these reusable functions in libraries/src/HTML/Helpers.

Individual components can also use HTML Registry to define their own functions.
For example, in a multilingual site the Articles, Contacts and Menus forms display the associations for each item, 
and the code for generating the HTML is contained in component-specific HTML Registry entries,
with the source code within the src/Service/HTML/ subdirectory under the relevant administrator component directory. 
Delegating the complex logic to a separate helper function in this way makes the code in the main source file cleaner. 

Unlike [layouts](./layouts.md), the HTML of these functions cannot be overridden by a template override.
However, some HTML Registry functions in turn use layouts to produce the HTML, and, of course,
these layouts can be overridden in the usual way.

This documentation section describes

- how to use the HTML Registry functions in your own extension,

- how to define your own HTML Registry functions, and

- how to override the Joomla versions.

As described below, the functionality provides not only a means of reusing HTML snippets or utility functions,
but also provides a mechanism to access class instances which would otherwise be difficult to retrieve.

## Using HTML Registry functions

To use an HTML Registry function you do:

```php
use Joomla\CMS\HTML\HTMLHelper;
...
$html = HTMLHelper::_('registryEntry.functionName', arg1, arg2, ...);
```

where arg1, arg2, ... are the arguments which will be passed in the call to `functionName`.

For example, to generate the HTML for the column headers and little sorting arrows in the admin Articles list columns:

```php
$html = HTMLHelper::_('searchtools.sort', $columnName, $fieldName, $listDirn, $listOrder);
```

where the parameters are:

- `$columnName` - the text for the column header (usually a language string)

- `$fieldName` - the field name for this column (which com_content uses when performing the sort in the SQL query)

- `$listDirn` - the current sorting direction ('asc' or 'desc')

- `$listOrder` - the name of the field which is currently used for sorting

(If you are familiar with Joomla 3, then this is just the same as the `JHtml::_` function,
although it is implemented differently from Joomla 4 onwards.)

(Also, although the function name is an underscore, it's still just an ordinary PHP function.)

## How it works

The HTML Registry is a mapping from a key to a class, 
which you can see in the `$serviceMap` instance variable in libraries/src/HTML/Registry.php.

For the example above the mapping is:

```php
'searchtools' => Helpers\SearchTools::class,
```

(The `::class` notation is just a shorthand for getting a string which is the Fully Qualified Name of the class).

The com_content code calls the function:

```php
$html = HTMLHelper::_('searchtools.sort', $columnName, $fieldName, $listDirn, $listOrder);
```

The code in `HTMLHelper::_` splits at the dot character the first parameter ('searchtools.sort') and

- 'searchtools' - indicates the key of the registry, which is used to find the class

- 'sort' - indicates the function of that class to call.

so that this results in the call to the `sort` function within the `SearchTools` class,
(found in libraries/src/HTML/Helpers/SearchTools.php). 

The remaining parameters of `HTMLHelper::_` are passed as parameters to the function being called.

To find what parameters you should pass to these functions, 
it's easiest to follow the example of where they're called in the Joomla extensions,
backed up with examining the code in these Helper functions.
You'll see, for example, that `sort` has a number of other parameters which aren't supplied in the above.

## Defining your own HTML Registry entries

To define your own function you

- write your function in a class, 

- get a handle on the Joomla HTML Registry class instance, and

- use the [HTML Registry register](cms-api://classes/Joomla-CMS-HTML-Registry.html) function to register your entry.

You can use both class static functions and class instance functions, as described in the following sections.

### Class static function

Let's assume we want to register a function called 'getSomething' for a component com_example.

First we write the function, as a static function enclosed in a class:

```php
<?php
namespace My\Component\Example\Administrator\Service\HTML;

defined('_JEXEC') or die;

class Something
{
    public static function getSomething()
    {
        return "Something";
    }
}
```

The namespace indicates that we're storing this on the administrator side, in src/Service/HTML/Something.php.
It's usual for Joomla components to store it here, although strictly-speaking you can store it anywhere under your src directory. 

Next we get the HTML Registry class from the [DIC](./dependency-injection/DIC.md),
and then call its `registry` method:

```php
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\Registry as HTMLRegistry;
use My\Component\Example\Administrator\Service\HTML\Something;
...
$registry = Factory::getContainer()->get(HTMLRegistry::class);
$registry->register('something', Something::class);
```

This means that we can use the function from anywhere within our extension (both back-end and front-end):

```php
use Joomla\CMS\HTML\HTMLHelper;
...
echo HTMLHelper::_('something.getSomething');   // outputs the string "Something"
```

### Class instance function

The HTML Registry class also accepts a class instance as a value,
which means that we can inject an object into its constructor,
and then retrieve it later from elsewhere in the extension.

The following example demonstrates a means of getting access to the [child DIC](./dependency-injection/extension-child-containers.md)
from anywhere in the extension code. 
Firstly we write the function code inside a class ChildContainer.php

```php
<?php
namespace My\Component\Example\Administrator\Service\HTML;

defined('_JEXEC') or die;

use Joomla\DI\Container;

class ChildContainer
{
    private $container;
    
    public function __construct(Container $container)
    {
        $this->container = $container;  // store the container for later use
    }
    
    public function getDependency($dependency)
    {
        return $this->container->get($dependency);  // use the stored container to retrieve a dependency
    }
}
```

We will want to call `getDependency` to get a dependency from our child DIC.
Note that this is an instance function, rather than a static function,
and that we will be injecting the child container into the class constructor.

We define the dependency within the (minimalist) services/provider.php file:

```php
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
use Joomla\CMS\HTML\Registry;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use My\Component\Example\Administrator\Extension\ExampleComponent;

return new class implements ServiceProviderInterface {
    
    public function register(Container $container): void 
    {
        $container->registerServiceProvider(new ComponentDispatcherFactory('\\My\\Component\\Example'));
        $container->set(
            ComponentInterface::class,
            function (Container $container) {
                $component = new ExampleComponent($container->get(ComponentDispatcherFactoryInterface::class));
                $component->setRegistry($container->get(Registry::class));
                return $component;
            }
        );
        $container->set('ExampleDependency', 'an example dependency');
    }
};
```

Note that:

1. The line `$component->setRegistry($container->get(Registry::class));` gets the HTML Registry class instance
out of the main DIC, and makes it available within our Extension class instance `$component`.

2. The line `$container->set('ExampleDependency', 'an example dependency');` defines the additional dependency.
We've used a string here as the value of the dependency, but we could instead use any PHP object.

When this ExampleComponent extension is started up, a new child DIC is created,
the services/provider.php file is run, and the `register` function is called, passing in the child container.
This causes the entries to be created in the child DIC, including our additional 'ExampleDependency' dependency.

The entry with key `ComponentInterface::class` is then retrieved from the container,
which causes the code of the function to run:

```php
$component = new ExampleComponent(...)   // creates the Extension class ExampleComponent
$component->setRegistry($container->get(Registry::class));  // gets the HTML Registry from the main DIC, and passes it to the Extension
```

The code of the extension class ExampleComponent is below:

```
<?php
namespace My\Component\Example\Site\Extension;

defined('_JEXEC') or die;

use Joomla\CMS\Extension\BootableExtensionInterface;
use Joomla\CMS\Extension\MVCComponent;
use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
use Psr\Container\ContainerInterface;
use My\Component\Example\Administrator\Service\HTML\ChildContainer;

class ExampleComponent extends MVCComponent implements BootableExtensionInterface
{
    use HTMLRegistryAwareTrait;

    public function boot(ContainerInterface $container)
    {
        $this->getRegistry()->register('childContainer', new ChildContainer($container));
    }
}
```

There are a few items to note:

1. The class implements BootableExtensionInterface - 
this is necessary to get Joomla to call the extension's `boot` function

2. `use HTMLRegistryAwareTrait;` - 
this includes the getter and setter for the HTML Registry instance

3. `$this->getRegistry()->register('childContainer', new ChildContainer($container));` -
this is the line which registers the 'childContainer' entry in the HTML Registry.
The value associated with the key 'childContainer' is a class instance,
and the child container has been injected into the class constructor.

(It is a common pattern among Joomla core components,
that the HTML Registry entries are written within the `boot` method of the extension class.)

The entry in the HTML Registry enables us to get a dependency, 
no matter where we are in the component code:

```php
use Joomla\CMS\HTML\HTMLHelper;
...
$dependency = HTMLHelper::_('childContainer.getDependency', 'ExampleDependency');   // returns 'an example dependency'
```

## Overriding Joomla HTML Registry functions

To override one of the Joomla HTML Registry entries you:

- define your own version of the Joomla function

- call the HTML Registry `register` method with the 3rd parameter ("replace") set to true.

For example, to override the 'searchtools' entry with your own variant in a class MySearchtools:

```php
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\Registry as HTMLRegistry;
...
$registry = Factory::getContainer()->get(HTMLRegistry::class);
$registry->register('searchtools', MySearchtools::class, true);
```

If you override the entry within your own component, 
then your component will use your variant instead of the Joomla standard version.

Alternatively you can override the entry within a plugin which listens for an appropriate event,
to force a Joomla extension to use your variant instead. 