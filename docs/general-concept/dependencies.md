Dependencies
============
Description of dependency injection in Joomla
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

## Introduction

Joomla 4 introduces the practice of Dependency Injection Containers
(DIC's) into Joomla. This article aims to explain why we are introducing
them and how to use them in Joomla.

DIC's have been around in the PHP ecosystem for a long time now to
support the goals of dependency injection. For example Symfony
[introduced the concept
in 2009](http://fabien.potencier.org/do-you-need-a-dependency-injection-container.html).

There's a variety of reasons why now is the right time to introduce
these into Joomla 4:

1.  **Testing** - one of the themes of Joomla 3 has been buggy releases.
    We need to be able to test classes and components in an easier
    fashion. Dependency injection allows significantly easier injection
    of Mock classes hopefully allowing us to reduce the amount of bugs.
2.  **Reduce the amount of magic in Joomla** - Joomla has a large number
    of magic files you need to guess the names of. This increases the
    amount of time people new to Joomla have to take researching these
    conventions. Exposing a concrete class in extensions allows us to
    easily test extensions compatibility with other extensions (for
    example categories and associations).

## The global container

The Global Dependency injection is very loosely a replacement for the
JFactory class. However it shouldn't be mistaken for a direct
replacement.

So for example in your Controllers in the CMS instead of substituting

``` php
\Joomla\CMS\Factory::getDocument()
```

consider using

``` php
$this->app->getDocument()
```

. This uses the injected application and therefore allows for easier
testing.

### Creating an object in a container

To place something in the Global DIC the most simple way is to pass in
an anonymous function. An example for a logger is below

``` php
// Assuming we have an instance of a Joomla Container
$container->share(
    LoggerInterface::class,
    function (Container $container)
    {
        return \Joomla\CMS\Log\Log::createDelegatedLogger();
    },
    true
);
```

The share function takes two compulsory parameters and an optional third
parameter.

  - A name for the service is nearly always the class name that you're
    creating
  - An anonymous function takes a single parameter - the container
    instance (this allows you to retrieve any dependencies out the
    container). The return is the service that you want to place into
    the container
  - (optional) This boolean controls whether the service is protected
    (i.e. whether anyone else is allowed to override it in the
    container). Generally for Joomla core services, such as session
    objects, this is true.

Let's now look at a more complicated
example:

``` php
$container->alias('AmazingApiRouter', Joomla\CMS\Router\ApiRouter::class)
    ->share(
    \Joomla\CMS\Router\ApiRouter::class,
    function (Container $container)
    {
        return new \Joomla\CMS\Router\ApiRouter($container->get(\Joomla\CMS\Application\ApiApplication::class));
    },
    true
);
```

Here you can see we've done two extra things - we've started using
dependencies (the api router gets the api application out the container)
and we've also created an alias for the ApiRouter. That means whilst the
container recognises that if it needs to build an ApiRouter instance it
can do that. But in our code to keep things simple we can also run

``` php
Factory::getContainer()->get('AmazingApiRouter')
```

to retrieve our router.

Whilst in Joomla our providers can look more complicated than this
because the logic to create objects inside the anonymous function is
more complicated - all of them follow this base idea.

### Providers

Providers in Joomla are a way of registering a dependency into a service
container. To do this create a class that implements

``` php
Joomla\DI\ServiceProviderInterface
```

. This gives you a register method which contains the container. You can
then use the share method again to add any number of objects into the
container. You can then register this into the container with the
\`\\Joomla\\DI\\Container::registerServiceProvider\` method in the
container. You can see where we register all the core service providers
[here in the \\Joomla\\CMS\\Factory::createContainer
method](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/Factory.php#L570-L594)

## Component Containers

Every component also has its own container (which is located in the
administrator section of Joomla). However this container is not exposed.
It's just there to get the system dependencies and allow a class to
represent your extension. This class is the Extension class and at a
minimum must implement the relevant extensions type interface. For
example a component must implement the

``` php
\Joomla\CMS\Extension\ComponentInterface
```

(found on [here on
GitHub](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/Extension/ComponentInterface.php)).  
For full information on implementing this in your extension, we
recommend reading [Developing an MVC
Component](S:MyLanguage/J4.x:Developing_an_MVC_Component "wikilink")

### Using a component container in another extension

You can easily grab the container of another extension through the
CMSApplication object. For
example

``` php
Factory::getApplication()->bootComponent('com_content')->getMVCFactory()->createModel('Articles', 'Site');
```

Will get the com\_content container, get the MVC Factory and get the
ArticlesModel from the frontend of Joomla. And this will work in any
extension in frontend, backend or the API of Joomla (unlike the old
LegacyModel::getInstance() method)

## Read More

There's a great example in the Joomla Framework docs on why Dependency
Injection is good for your Application and how DIC's help structure it.
[Read it
here](https://github.com/joomla-framework/di/blob/2.0-dev/docs/why-dependency-injection.md)
