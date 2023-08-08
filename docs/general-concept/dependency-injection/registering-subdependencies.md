---
title: Registering Subdependencies
sidebar_position: 5
---
# Registering Subdependencies
The final aspect of understanding the service provider files is registering subdependencies. The two-step process for loading extensions, which was described partially in the previous section, is really as follows:
1. The extension class is entered into child DIC and any dependencies of the Extension class are registered (ie entered into the child DIC)
2. The extension class is retrieved from the child DIC, creating an instance of the class. And any subdependencies of the Extension class are retrieved from the DIC, with the Extension instance storing pointers to those dependent objects, for when it needs them. 

## Minimal services/provider.php file
Let's look at a minimal example for com_example, namespace Mycompany\Component\Example. In this case we'll assume that com_example doesn't need its own `Extension` class and can just use the Joomla-supplied `MVCComponent` class as its `Extension`. So this services/provider.php file is about as minimalist as it gets for a basic component.
```php
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\MVCComponent;
use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Mycompany\Component\Example\Administrator\Extension\ExampleComponent;

return new class implements ServiceProviderInterface {
    public function register(Container $container): void 
    {
        $container->registerServiceProvider(new Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory('\\Mycompany\\Component\\Example'));
        $container->registerServiceProvider(new Joomla\CMS\Extension\Service\Provider\MVCFactory('\\Mycompany\\Component\\Example'));
        $container->set(
            ComponentInterface::class,
            function (Container $container) {
                $component = new MVCComponent($container->get(ComponentDispatcherFactoryInterface::class));
                $component->setMVCFactory($container->get(MVCFactoryInterface::class));
                return $component;
            }
        );
    }
};
```
Here we have included a few additional lines in the services/provider.php file, which relate to classes which will be needed by the com_example `Extension` instance
- a DispatcherFactory will be needed to create the Dispatcher class instance, and then Joomla will call `dispatch()` on this Dispatcher object, as the next step in running the component
- an MVCFactory will be needed to create the Controller, View, Model and Table class instances on behalf of the component.

The two `registerServiceProvider` calls result in the two dependencies being loaded into the child DIC.

Then when component is instantiated there are `get` calls to obtain instances of these two Factory classes from the child DIC. 

## Duplicate Class Warning!
Warning! Be aware that there are classnames here which have the same final part of the FQN:

ComponentDispatcherFactory:
- can refer to  \Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory in libraries/src/Service/Provider/ComponentDispatcherFactory.php 
- and can also refer to \Joomla\CMS\Dispatcher\ComponentDispatcherFactory in libraries/src/Dispatcher/ComponentDispatcherFactory.php.

MVCFactory:
- can refer to \Joomla\CMS\Extension\Service\Provider\MVCFactory in libraries/src/Service/Provider/MVCFactory.php 
- and can also refer to \Joomla\CMS\MVC\Factory\MVCFactory in libraries/src/MVC/Factory/MVCFactory.php.

In each case the latter is the true "Factory" class, the former is the service provider class which enables the true Factory class to be instantiated via the DIC. To try and reduce confusion, the FQNs of the service provider classes are used above.

## Resolving the ComponentDispatcherFactory Dependency
In the second step, when Joomla calls `get(ComponentInterface::class)` the Extension class (the MVCComponent class in this example) is instantiated and the dependencies resolved. 

Let's look first at the ComponentDispatcherFactory
```php
$component = new MVCComponent($container->get(ComponentDispatcherFactoryInterface::class));
```
The code `$container->get(ComponentDispatcherFactoryInterface::class)` runs the function in the child DIC associated with the ComponentDispatcherFactoryInterface::class key. This function is found in libraries/src/Extension/Service/Provider/ComponentDispatcherFactory.php, and the object returned:
```php
new \Joomla\CMS\Dispatcher\ComponentDispatcherFactory($this->namespace, $container->get(MVCFactoryInterface::class))
```
gets passed into the MVCComponent constructor as a parameter. The component class Joomla\CMS\Extension\MVCComponent inherits from Joomla\CMS\Extension\Component, and in the constructor of the latter it stores a reference to the passed-in ComponentDispatcherFactory:
```php
public function __construct(ComponentDispatcherFactoryInterface $dispatcherFactory)
{
    $this->dispatcherFactory = $dispatcherFactory;
}
```
And it also has a function `getDispatcher` which retrieves it, and uses it to instantiate a Dispatcher class:
```php
public function getDispatcher(CMSApplicationInterface $application): DispatcherInterface
{
    return $this->dispatcherFactory->createDispatcher($application);
}
```
Let's take another look at the line when the ComponentDispatcherFactory is instantiated:
```php
new \Joomla\CMS\Dispatcher\ComponentDispatcherFactory($this->namespace, $container->get(MVCFactoryInterface::class))
```
Here the code is also getting the MVCFactory instance out of the child DIC; the ComponentDispatcherFactory has in turn a dependency on the MVCFactory. Why is this? As described in the [Dispatcher documentation](../extension-and-dispatcher/dispatcher-component.md) whenever the Dispatcher's `dispatch` function is called it analyses the *task* parameter of the URL, to decide which Controller class to instantiate. So it stores the MVCFactory object passed in its constructor so that it can later use it to create the Controller class:
```php
$controller = $this->mvcFactory->createController(...);
$controller->execute($task);
```
So the ComponentDispatcherFactory gets MVCFactory out of the DIC, stores a reference to it, and then passes it down to the Dispatcher class when instantiates it. Its code is in libraries/src/Dispatcher/ComponentDispatcherFactory.php.

## Resolving the MVCFactory Dependency
This follows a pattern similar to that of the ComponentDispatcherFactory dependency.

The dependency is registered with the line:
```php
$container->registerServiceProvider(new Joomla\CMS\Extension\Service\Provider\MVCFactory('\\Mycompany\\Component\\Example'));
```
which causes the `register` function in libraries/src/Extension/Service/Provider/MVCFactory.php to be run on an instance of that class. If you look at this file you'll see that the MVCFactory has several dependencies, all of which will get resolved by obtaining entries from the parent DIC.

The second step involves instantiating the Extension class and resolving its dependencies:
```php
$component = new MVCComponent($container->get(ComponentDispatcherFactoryInterface::class));
$component->setMVCFactory($container->get(MVCFactoryInterface::class));
```
In the first line the Extension class (MVCComponent) gets instantiated, with the ComponentDispatchFactory instance being passed into the constructor (as we saw above).

In the second line the code `$container->get(MVCFactoryInterface::class` obtains the MVCFactory instance from the child DIC, and then a reference to it is stored locally through it being passed to `setMVCFactory`. This function is available to `MVCComponent` via the trait Joomla\CMS\MVC\Factory\MVCFactoryServiceTrait, which is used in MVCComponent, and which contains the lines:
```php
public function setMVCFactory(MVCFactoryInterface $mvcFactory)
{
    $this->mvcFactory = $mvcFactory;
}
```
## Namespaces parameters
You will have noticed that the namespace '\Mycompany\Component\Example' gets passed as a parameter into several classes constructors. (By the way, this is exactly the same PHP string as its equivalent with double backslashes instead of single backslashes).

The reason for this is that these Factory class instances have responsibility for instantiating various classes on behalf of the component: 
- the ComponentDispatcherFactory will instantiate a Dispatcher class
- the MVCFactory will instantiate Controller, View, Model and Table classes

For example, the `createDispatcher` function of the ComponentDispatcherFactory looks to see if there's a specific Dispatcher class for com_example by forming a class name:
```php
$className = '\\' . trim($this->namespace, '\\') . '\\' . $name . '\\Dispatcher\\Dispatcher';
```
(where `$name` is 'Site' or 'Administrator') and seeing if that class exists. If it doesn't then it instantiates the default Joomla\CMS\Dispatcher\ComponentDispatcher class. 

Similarly the MVCFactory uses the namespace to work out the fully qualified classnames of the com_example Controller, View, Model and Table classes in order to instantiate them. 

This is one reason why a child DIC is necessary. Over the course of responding to an HTTP request Joomla will instantiate several extensions, each with their dependencies. As Joomla uses common keys – eg ComponentInterface::class for components – child DICs are necessary to separate out the entries for each extension.