---
sidebar_position: 4
title: Accessing the Component Router class
---

Accessing the Component Router class
====================================

If you're not familiar with Joomla Dependency Injection and Extension classes then you may find it useful to 
read [Extension and Dispatcher Classes](../extension-and-dispatcher/index.md) and [Dependency Injection](../dependency-injection/index.md) before tackling this section. 
Since Joomla 4 the preferred way to access the component router class is by using a `RouterFactory` class which is 
injected as a dependency to the component. This means that in the component's services/provider.php file we have 
(eg in administrator/components/com_content/services/provider.php):

```php
use Joomla\CMS\Extension\Service\Provider\RouterFactory;
...
public function register(Container $container)
{
    ...
    $container->registerServiceProvider(new RouterFactory('\\Joomla\\Component\\Content'));

    $container->set(
        ComponentInterface::class,
        function (Container $container) {
            $component = new ContentComponent(,,,));
            ...
            $component->setRouterFactory($container->get(RouterFactoryInterface::class));

            return $component;
        }
    );
}
```

Note that here the `RouterFactory` refers to the class ` Joomla\CMS\Extension\Service\Provider\RouterFactory` which is in libraries/src/Extension/Service/Provider/RouterFactory.php. 

The line:

```php
$container->registerServiceProvider(new RouterFactory('\\Joomla\\Component\\Content'));
```

basically creates an instance of this class, passing in the namespace to use, and calls `register()` on the class instance:

```php
public function register(Container $container)
{
    $container->set(
        RouterFactoryInterface::class,
        function (Container $container) {
            $categoryFactory = null;

            if ($container->has(CategoryFactoryInterface::class)) {
                $categoryFactory = $container->get(CategoryFactoryInterface::class);
            }

            return new \Joomla\CMS\Component\Router\RouterFactory(
                $this->namespace,
                $categoryFactory,
                $container->get(DatabaseInterface::class)
            );
        }
    );
}
```

This results in another entry in the Dependency Injection Container (DIC), keyed by `RouterFactoryInterface::class` 
(which is just a string of the fully qualified name of that class). 

When the `com_content` component is instantiated Joomla gets it out of the DIC and then these lines are run:

```php
function (Container $container) {
    $component = new ContentComponent(,,,));
    ...
    $component->setRouterFactory($container->get(RouterFactoryInterface::class));

    return $component;
}
```

The ContentComponent is instantiated - this is the `com_content` Extension class which is in 
administrator/components/com_content/src/Extension/ContentComponent.php. If you have a look at the code in that file, 
then you'll see:

```php
// outside the class definition
use Joomla\CMS\Component\Router\RouterServiceTrait;

class ContentComponent extends MVCComponent implements
  ...
// inside the class definition
use RouterServiceTrait;
```

(The PHP `use` statement has [different meanings](https://www.w3schools.com/php/keyword_use.asp) depending upon whether it's used inside or outside a class.) 
This `RouterServiceTrait` in libraries/src/Component/Router/RouterServiceTrait.php has 2 key functions, which through 
this `use` statement become methods of the com_content Extension class:
1. `setRouterFactory` - this is immediately used in the line:

```php
$component->setRouterFactory($container->get(RouterFactoryInterface::class));
```

which also gets the `RouterFactoryInterface::class` entry out of the DIC. Referring back to the code in 
libraries/src/Extension/Service/Provider/RouterFactory.php you can see that getting the entry out of the DIC will result in a `new \Joomla\CMS\Component\Router\RouterFactory` - this now is the genuine RouterFactory class. The ` setRouterFactory` call now stores this instance locally within the com_content Extension as `$this->routerFactory`.

2. `createRouter` - this function is called when Joomla wants to get the `com_content` component router. As you 
3. can see from the `RouterServiceTrait` code, this retrieves the stored `routerFactory` and `calls createRouter` on it:

```php
return $this->routerFactory->createRouter($application, $menu);
```

(As you can see, there are 2 `createRouter` functions in different classes here!)

This will result in the `createRouter` function of the genuine `RouterFactory` being called. The code is in 
libraries/src/Component/Router/RouterFactory.php:

```php
public function createRouter(CMSApplicationInterface $application, AbstractMenu $menu): RouterInterface
{
    $className = trim($this->namespace, '\\') . '\\' . ucfirst($application->getName()) . '\\Service\\Router';

    if (!class_exists($className)) {
        throw new \RuntimeException('No router available for this application.');
    }

    return new $className($application, $menu, $this->categoryFactory, $this->db);
}
```

This forms the classname from :
- the stored namespace (for `com_content` this is `'\\Joomla\\Component\\Content'`, passed in the `registerServiceProvider` call within the com_content services/provider.php file)
- `$application->getName()` which when we're running on the Joomla site front-end returns "site".

The final class name for `com_content` is \Joomla\Component\Content\Site\Service\Router`, and from the PSR4 
namespacing rules this is found in components/com_content/src/Service/Router.php.

You should follow this pattern whenever you have a component router for your own component.

## Your Choice of Component Router
As described above, Joomla will expect to find your component router in the class `\<Your namespace>\Site\Service\Router`
in the file components/com_yourcomponent/src/Service/Router.php, and will expect it to implement 
the interface `Joomla\CMS\Component\Router\RouterInterface`.

At this stage you have the choice of whether to use the traditional router with preprocess(), build() and parse() 
functions, or to use the `RouterView` option. 

If you're using a traditional router then you will have to fill out the skeleton code below:

```php
use Joomla\CMS\Component\Router\RouterInterface;
use Joomla\CMS\Categories\CategoryFactoryInterface;
use Joomla\Database\DatabaseInterface;
class Router implements RouterInterface
{
    public function __construct($application, $menu, CategoryFactoryInterface $categoryFactory, DatabaseInterface $db) {}
    public function build(&$query) {}
    public function parse(&$segments) {}
    public function preprocess($query) {}
}
```

If you're using the `RouterView` approach then your class extends Joomla\CMS\Component\Router\RouterView, and this 
latter class implements `RouterInterface`. You provide the `RouterView` configurations as 
described in [RouterView Configurations](router-view.md).

## Using the Site Router in the Joomla back-end
There may be occasions where you want to display on the administrator back-end the result of building a SEF URL which
will be present on the site front-end. To enable this, Joomla provides the [`link()`](cms-api://classes/Joomla-CMS-Router-Route.html) method within 
the `Joomla\CMS\Router\Route` class. It's basically the same as the `Route::_()` function, except that it has an 
additional parameter "client" at p1, which you would set to "site" to enable a site SEF URL to be built.

However to get this to work in your component you do need to do some extra work.

If you're using a traditional router with preprocess, build and parse functions then the only change you're probably
going to have to make is how you obtain the set of site menuitems. When you're running the site application you can use:

```php
$sitemenu = $app->getMenu();
```

However, if you're running the administrator application then you need to explicitly get the site menuitems, and load them:

```php
use Joomla\CMS\Factory;
$app = Factory::getApplication();
$sitemenu = $app->getMenu('site');
$sitemenu->load();
```

as described in [Menus and Menuitems](../menus-menuitems.md#basic-operations). You only need to load them once. 

If your component router uses `RouterView` then you need to ensure that the site menuitems are pre-loaded before
you make the `link()` call. The SiteRouter code correctly looks for the site menuitems, even if you're running the
functionality from the administrator back-end, but it doesn't perform a `load()`. You may find the routing doesn't 
work quite as expected; I'm not sure why this is - it may be because the routing algorithm takes into account the
current site web page that the user is on (ie the "active" menuitem), which of course is not set if you're calling
this functionality from the administrator back-end.
