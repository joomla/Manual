Editors Buttons (XTD) Plugin
============================
This part describes how to develop an Editor XTD plugin.

The plugin works like following: The plugin register an Editor Button on `onEditorButtonsSetup` event,
then system will use it depend on how the Editor field is configured in the form.

## Events in this group:

```
onEditorButtonsSetup
```

### onEditorButtonsSetup

The event triggered every time when the Editor is rendering.

Event signature:

```php
function onEditorButtonsSetup(Joomla\CMS\Event\Editor\EditorButtonsSetupEvent $event){}
```

Event attributes:

```php
/** 
 * @var Joomla\CMS\Editor\Button\ButtonsRegistry $subject 
 * @var array    $disabledButtons  List of disabled button names
 * @var string   $editorType       Editor type
 * @var integer  $asset            Optional id of Asset, for access check
 * @var integer  $author           Optional id of Author, for access check
 */
$subject    = $event->getButtonsRegistry();
$disabled   = $event->getDisabledButtons();
$editorType = $event->getEditorType();
$asset      = $event->getAsset();
$author     = $event->getAuthor();
```

## Creating an editor button (xtd) plugin

Following example assume you already know  how to create Joomla plugin.

In the example we create a two button which insert 🍺 and 🐈 in to editor.
First button will use predefined `insert` action, and second will use our custom action that doing the same. 

For start create a plugin under `plugins/editors-xtd/example/` folder, call it `example`, assume namespace is `JoomlaExample\Plugin\EditorsXtd\Example`.

Then set up buttons in `onEditorButtonsSetup` event handler.

```php
namespace JoomlaExample\Plugin\EditorsXtd\Example\Extension;

use Joomla\CMS\Editor\Button\Button;
use Joomla\CMS\Event\Editor\EditorButtonsSetupEvent;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;

final class Example extends CMSPlugin implements SubscriberInterface
{
    /**
     * Returns an array of events this subscriber will listen to.
     *
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return ['onEditorButtonsSetup' => 'onEditorButtonsSetup'];
    }
    
    /**
     * @param  EditorButtonsSetupEvent $event
     * @return void
     */
    public function onEditorButtonsSetup(EditorButtonsSetupEvent $event)
    {
        $subject  = $event->getButtonsRegistry();
        $disabled = $event->getDisabledButtons();

        if (!\in_array('example-beer', $disabled)) {
            $button1 = new Button('example-beer', [
                'text' => 'Insert 🍺'
                'icon' => 'file-add',
                'action' => 'insert', // Action already provided by Joomla.EditorButton
            ], [
                'content' => '🍺', // Content to insert
            ]);
            
            $subject->add($button1);
        }
        
        if (!\in_array('example-cat', $disabled)) {
            // Register script with our custom action
            $this->getApplication()->getDocument()->getWebAssetManager()
                ->registerScript(
                    'editor-button.example-cat',
                    'plg_editors_xtd_example/example-cat.js',
                    [],
                    ['type' => 'module'],
                    ['editors']
                );
            
            $button2 = new Button('example-cat', [
                'text'   => 'Insert 🐈'
                'icon'   => 'file-add',
                'action' => 'insert-cat', // Custom action, will code it later
            ]);
            
            $subject->add($button2);
        }
    }
}
```

Now create a JavaScript to make `insert-cat` action to work.
Create a JavaScript file under `media/plg_editors_xtd_example/js/example-cat.js`, and register handler for `insert-cat` action in `Joomla.EditorButton`

```javascript
// Insert 🐈 on cursor
JoomlaEditorButton.registerAction('insert-cat', (editor, options) => {
  editor.replaceSelection('🐈');
});
```

And all done 🎉 
After plugin installation and enabling, the buttons should be available and do its job.
