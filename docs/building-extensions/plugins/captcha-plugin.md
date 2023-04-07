Captcha Plugin
===============
This part describes how to develop a Captcha plugin.

The Captcha plugin works like following: The plugin register a Captcha provider, on `onCaptchaSetup` event, 
then system will use it depend on what is selected in the global configuration and how the Captcha field is configured in the form.

## Events in this group:

```
onCaptchaSetup
```

### onCaptchaSetup

Event signature:

```php
function onCaptchaSetup(Joomla\CMS\Event\Captcha\CaptchaSetupEvent $event){}
```

Event attributes:

```php
/** 
 * @var Joomla\CMS\Captcha\CaptchaRegistry $subject 
 */
$subject = $event->getSubject();
```

## Creating a captcha plugin

The captcha plugin consist with two main things:
 - The Captcha provider class, wich provide a captcha logic for rendering input and for validation.
 - The Plugin in Captcha group, which register the provider, so system know it existence.

Following example assume you already know  how to create Joomla plugin.

### Let's create a simple [Honeypot](https://en.wikipedia.org/wiki/Honeypot_(computing)) captcha.

For start create a plugin under `plugins/captcha/honeypot/` folder, call it `honeypot`, assume namespace is `JoomlaExample\Plugin\Captcha\Honeypot`.

Then create a Honeypot captcha provider, which will live under `plugins/captcha/honeypot/src/Provider/HoneypotCaptchaProvider.php`.

```php
namespace JoomlaExample\Plugin\Captcha\Honeypot\Provider;

use Joomla\CMS\Captcha\CaptchaProviderInterface;
use Joomla\CMS\Form\FormField;

/**
 * Provider for Honeypot Captcha
 */
final class HoneypotCaptchaProvider implements CaptchaProviderInterface
{
    /**
     * Return Captcha name, CMD string.
     *
     * @return string
     */
    public function getName(): string
    {
        return 'honeypot';
    }
    
    /**
     * Render the captcha input
     *
     * @param   string  $name        Input name given in the form
     * @param   array   $attributes  The class of the field nd other attributes, from the form.
     *
     * @return  string  The HTML to be embedded in the form
     *
     * @throws  \RuntimeException
     */
    public function display(string $name = '', array $attributes = []): string
    {
        return '<input type="hidden" value="" name="' . $name . '" id="' . ($attributes['id'] ?? '') . '" class="' . ($attributes['class'] ?? '') . '"/>';
    }
    
    /**
     * Validate the input data
     *
     * @param   string  $code  Answer provided by user
     *
     * @return  bool    If the answer is correct, false otherwise
     *
     * @throws  \RuntimeException
     */
    public function checkAnswer(string $code = null): bool
    {
        return !$code;
    }
    
    /**
     * Method to react on the setup of a captcha field. Gives the possibility
     * to change the field and/or the XML element for the field.
     *
     * @param   FormField         $field    Captcha field instance
     * @param   \SimpleXMLElement  $element  XML form definition
     *
     * @return void
     *
     * @throws  \RuntimeException
     */
    public function setupField(FormField $field, \SimpleXMLElement $element): void
    {
        // Hide the label for this captcha type
        $element['hiddenLabel'] = 'true';
    }
}
```

Register the provider in the system with a plugin and event:

```php
namespace JoomlaExample\Plugin\Captcha\Honeypot\Extension;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use JoomlaExample\Plugin\Captcha\Honeypot\Provider\HoneypotCaptchaProvider;

final class HoneypotCaptcha extends CMSPlugin implements SubscriberInterface
{
    /**
     * Returns an array of events this plugin will listen to.
     *
     * @return  array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onCaptchaSetup' => 'onCaptchaSetup',
        ];
    }
    
    /**
     * Register Captcha instance
     *
     * @param CaptchaSetupEvent $event
     *
     * @return void
     */
    public function onCaptchaSetup(CaptchaSetupEvent $event)
    {
       $event->getSubject()->add(new HoneypotCaptchaProvider());
    }
}
```

And all done 🎉 
After plugin installation and enabling this new captcha will be available in Global configuration to use.
