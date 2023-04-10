Editors Plugin
===============
This part describes how to develop an Editor plugin.

The Editor plugin works like following: The plugin register an Editor provider, on `onEditorSetup` event,
then system will use it depend on what is selected in the global configuration and how the Editor field is configured in the form.

## Events in this group:

```
onEditorSetup
```

### onEditorSetup

The event triggered once at runtime, when system need to render the Editor field.

Event signature:

```php
function onEditorSetup(Joomla\CMS\Event\Editor\EditorSetupEvent $event){}
```

Event attributes:

```php
/** 
 * @var Joomla\CMS\Editor\EditorsRegistry $subject 
 */
$subject = $event->getEditorsRegistry();
```

## Creating an editor plugin

The plugin consist with three main things:
- The Editor provider class, wich provide a logic for rendering input, and loading Editor Buttons (XTD) plugins.
- The Editor JavaScript code for client side integration.
- The Plugin in Editors group, which register the provider, so system know it existence.

Following example assume you already know  how to create Joomla plugin.

### Let's create a simple editor

In the example we display a `<textarea>` as our Editor. 

#### Backend side

For start create a plugin under `plugins/editors/example/` folder, call it `example`, assume namespace is `JoomlaExample\Plugin\Editors\Example`.

Then create a provider, which will live under `plugins/editors/example/src/Provider/ExampleEditorProvider.php`.

```php
namespace JoomlaExample\Plugin\Editors\Example\Provider;

use Joomla\CMS\Application\CMSApplicationInterface;
use Joomla\CMS\Editor\AbstractEditorProvider;
use Joomla\Event\DispatcherInterface;
use Joomla\Registry\Registry;

/**
 * Provider for Example editor
 */
final class ExampleEditorProvider extends AbstractEditorProvider
{
    /**
     * A Registry object holding the parameters for the plugin
     *
     * @var    Registry
     */
    protected $params;

    /**
     * The application object
     *
     * @var    CMSApplicationInterface
     */
    protected $application;
    
    /**
     * Class constructor
     *
     * @param   Registry                 $params
     * @param   CMSApplicationInterface  $application
     * @param   DispatcherInterface      $dispatcher
     */
    public function __construct(Registry $params, CMSApplicationInterface $application, DispatcherInterface $dispatcher)
    {
        $this->params      = $params;
        $this->application = $application;

        $this->setDispatcher($dispatcher);
    }
    
    /**
     * Return Editor name, CMD string.
     *
     * @return string
     */
    public function getName(): string
    {
        return 'example';
    }
    
    /**
     * Gets the editor HTML markup
     *
     * @param   string  $name        Input name.
     * @param   string  $content     The content of the field.
     * @param   array   $attributes  Associative array of editor attributes.
     * @param   array   $params      Associative array of editor parameters.
     *
     * @return  string  The HTML markup of the editor
     */
    public function display(string $name, string $content = '', array $attributes = [], array $params = [])
    {
        // Check editor attributes and parameters
        $col     = $attributes['col'] ?? '';
        $row     = $attributes['row'] ?? '';
        $id      = $attributes['id'] ?? '';
        $buttons = $params['buttons'] ?? true;
        $asset   = $params['asset'] ?? 0;
        $author  = $params['author'] ?? 0;
        
        // Render the editor markup
        return '<joomla-editor-example>' 
          . '<textarea name="' . $name . '" id="' . $id . '" cols="' . $col . '" rows="' . $row . '">' . $content . '</textarea>';
          . $this->displayButtons($buttons, ['asset' => $asset, 'author' => $author, 'editorId' => $id]);
          . '</joomla-editor-example>'
    }
}
```

**Note:** We use `AbstractEditorProvider` as base, it already contains a logic for loading and rendering Editor Buttons (XTD) plugins.

Here `display()` method renders the editor markup, it is important to keep the Editor Buttons (XTD) within the same container as an editor.
We use `<joomla-editor-example>` custom element, this will simplify client side integration, however it can be just a `<div>` wrapper.

Now register the provider in the system with a plugin and event:

```php
namespace JoomlaExample\Plugin\Editors\Example\Extension;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use JoomlaExample\Plugin\Editors\Example\Provider\ExampleEditorProvider;

final class ExampleEditor extends CMSPlugin implements SubscriberInterface
{
    /**
     * Returns an array of events this plugin will listen to.
     *
     * @return  array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onEditorSetup' => 'onEditorSetup',
        ];
    }
    
    /**
     * Register Editor instance
     *
     * @param EditorSetupEvent $event
     *
     * @return void
     *
     * @since   __DEPLOY_VERSION__
     */
    public function onEditorSetup(EditorSetupEvent $event)
    {
        $event->getEditorsRegistry()->add(new ExampleEditorProvider($this->params, $this->getApplication(), $this->getDispatcher()));
    }
}
```

At this point, after plugin installation and enabling, the editor already should be available in Global configuration, and render our `textarea`.
However, we stil missing a client side integration, that will be a next step.

#### Frontend side

This is allowing other Joomla extensions interact with editor and its content.
Create a JavaScript file under `media/plg_editors_example/js/editor-example.js`, and modify `display()` method of Editor provider, to load this file.

```php
public function display(string $name, string $content = '', array $attributes = [], array $params = [])
{
    // Load the editor asset files
    $this->application->getDocument()->getWebAssetManager()
        ->registerAndUseScript(
            'plg_editors_example.editor-example',
            'plg_editors_example/editor-example.js',
            [],
            ['type' => 'module'],
            ['editors']
        );

    // Check editor attributes and parameters
    $col     = $attributes['col'] ?? '';
    $row     = $attributes['row'] ?? '';
    $id      = $attributes['id'] ?? '';
    $buttons = $params['buttons'] ?? true;
    $asset   = $params['asset'] ?? 0;
    $author  = $params['author'] ?? 0;

    // Render the editor markup
    return '<joomla-editor-example>' 
      . '<textarea name="' . $name . '" id="' . $id . '" cols="' . $col . '" rows="' . $row . '">' . $content . '</textarea>';
      . $this->displayButtons($buttons, ['asset' => $asset, 'author' => $author, 'editorId' => $id]);
      . '</joomla-editor-example>'
}
```

The script should register editor instance, and provide a basic methods, for set/get value and replace selection, etc.

```javascript
/**
 * EditorExample Decorator wich implements required methods per Editor instance.
 * Joomla will use this to share it betwen Extension, to interact with a main Editor instance.
 */
class EditorExampleDecorator extends JoomlaEditorDecorator {

  getValue() {
    return this.instance.input.value;
  }

  setValue(value) {
    this.instance.input.value = value;
    return this;
  }

  getSelection() {
    const input = this.instance.input;
    
    if (input.selectionStart || input.selectionStart === 0) {
        return input.value.substring(input.selectionStart, input.selectionEnd);
    }
    return input.value;
  }

  replaceSelection(value) {
    const input = this.instance.input;
    if (input.selectionStart || input.selectionStart === 0) {
        input.value = input.value.substring(0, input.selectionStart)
            + text
            + input.value.substring(input.selectionEnd, input.value.length);
    } else {
        input.value += text;
    }
    return this;
  }

  disable(enable) {
    this.instance.input.disabled = !enable;
    this.instance.input.readOnly = !enable;
    return this;
  }
}

/**
 * The editor initialisation
 */
class JoomlaEditorExample extends HTMLElement {
    // Element attached to DOM
    connectedCallback() {
        // Pick <textarea> input which is a first children in markup
        this.input = this.firstElementChild;
        
        // Register the Decorator in Joomla.Editor
        const jEditor = new EditorExampleDecorator(this, 'example', this.input.id);
        Joomla.Editor.register(jEditor);

        // Find out when editor is interacted
        // The script should tell to joomla when editor or one of Editor buttons (XTD) is interacted
        if (!this.interactionCallback) {
            this.interactionCallback = () => {                 
                Joomla.Editor.setActive(this.input.id);
            };
        }
        this.addEventListener('click', this.interactionCallback);        
    }

    // Element removed from DOM
    disconnectedCallback() {
        // Unregister editor and unbind all events
        Joomla.Editor.unregister(this.input.id);
        this.removeEventListener('click', this.interactionCallback);
    }    
}

customElements.define('joomla-editor-example', JoomlaEditorExample);
```

And all done 🎉 
Now we have a new, fully integrated editor.
