Advanced Plugin features
========================

## Subscriber Registration Checker

Subscriber Registration Checker `Joomla\CMS\Event\SubscriberRegistrationCheckerInterface` interface allows the Plugin to be checked before listener registration.
This allows the plugin to be registered only when special conditions are met, e.g., only for specific applications.

### Example:

Creating the plugin that will be run only for Administrator or Api application:

```php
use Joomla\CMS\Event\SubscriberRegistrationCheckerInterface;
use Joomla\CMS\Plugin\CMSPlugin;

class MyExamplePlugin extends CMSPlugin implements SubscriberRegistrationCheckerInterface
{
    //... rest of the plugin code
    
    /**
     * Check whether the Subscriber (or event listener) should be registered.
     *
     * @return bool
     */
    public function shouldRegisterListeners(): bool
    {
        $app = $this->getApplication();
        
        return $app->isClient('administrator') || $app->isClient('api');
    }
}
```
