Advanced Plugin features
========================

## Lazy Subscriber

The decorator `Joomla\CMS\Event\LazyServiceSubscriber` allows to instantiate the plugin with heavy dependencies only when the event is actually dispatched.
The plugin should implement `Joomla\Event\SubscriberInterface` to be able to use decorator.

Note that the use of the lazy decorator does not make sense when the plugin is subscribed to events that happen regularly, like `onAfterInitialise`.

Additionally, the interface `Joomla\CMS\Event\LazySubscriberInterface` allows to use [`LazyServiceEventListener`](https://github.com/joomla-framework/event/blob/2.0-dev/src/LazyServiceEventListener.php), however the plugin should implement it on its own.

### Example usage of the lazy subscriber decorator for the plugin with heavy dependencies:

Code for `plugins/system/example/services/provider.php`.

**Before, regular plugin service:**
```php
return new class () implements ServiceProviderInterface {
  public function register(Container $container)
  {
    $container->set(
        PluginInterface::class,
        function (Container $container) {
            $heavyDependency1 = $container->get(Foo::class);
            $heavyDependency2 = $container->get(Bar::class);
            
            return new ExamplePlugin(
                $container->get(DispatcherInterface::class),
                (array) PluginHelper::getPlugin('system', 'example'),
                $heavyDependency1,
                $heavyDependency2
            );
        }
    );
  }
}
```
**After, plugin service with LazyServiceSubscriber:**

```php
return new class () implements ServiceProviderInterface {
  public function register(Container $container)
  {
    $container->set(
        ExamplePlugin::class,
        function (Container $container) {
            $heavyDependency1 = $container->get(Foo::class);
            $heavyDependency2 = $container->get(Bar::class);
            
            return new ExamplePlugin(
                $container->get(DispatcherInterface::class),
                (array) PluginHelper::getPlugin('system', 'example'),
                $heavyDependency1,
                $heavyDependency2
            );
        }
    )->set(
        PluginInterface::class,
        function (Container $container) {
            return new LazyServiceSubscriber($container, ExamplePlugin::class);
        }
    );
  }
}
```
