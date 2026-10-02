Editor File and Link Pickers
============================

:::note
Available from Joomla! 6.2.
:::

The Joomla TinyMCE integration connects the "browse" buttons of TinyMCE's image, media and link dialogs
to pickers registered on the `Joomla.editorFilePickers` registry. Any extension — core or third party — can
register a picker there to have its own media manager (or any other selection UI) open from these dialogs
and fill the Source/URL field with the selected value.

Core ships two pickers through this registry, with no special treatment:

- the **Media Manager**, registered for the image and media dialogs by the Image editor button plugin
  (`plg_editors-xtd_image`);
- the **Link picker**, registered for the link dialog by the TinyMCE integration itself. Its list of link
  sources is extensible: editors-xtd plugins can add their own content as a link source through the
  `editor-link-providers` script options (see [The core link picker](#the-core-link-picker) below).

Extensions do not set TinyMCE options and do not write TinyMCE plugins for this. The Joomla TinyMCE
integration ships a small TinyMCE plugin (`jfilepicker`, loaded for every editor instance) which reads the
registry and wires TinyMCE's `file_picker_types` and `file_picker_callback` accordingly.

## How it works

The registry is keyed by TinyMCE dialog filetype:

- `image` - the Insert/Edit Image dialog (and the poster field of the media dialog);
- `media` - the Insert/Edit Media dialog (audio/video source);
- `file` - the Insert/Edit Link dialog.

The browse button only appears on dialogs whose filetype has a registered picker. When the user clicks it,
the registered picker is called and its resolved value is inserted into the dialog field.

## The picker contract

A picker is a function receiving TinyMCE's file picker `meta` object and returning a Promise:

```javascript
Joomla.editorFilePickers = Joomla.editorFilePickers || {};

/**
 * @param {Object} meta  TinyMCE file picker meta, meta.filetype is 'image', 'media' or 'file'
 *
 * @returns {Promise<{url: string, alt?: string, text?: string}|null>}
 */
Joomla.editorFilePickers.image = (meta) => { /* open your UI */ };
```

- Resolve an object with `url` when the user picked something. The url may be root-relative or absolute,
  TinyMCE applies its own url conversion (`relative_urls`) afterwards.
- `alt` is used by the image/media dialogs, `text` is used as link text by the link dialog. Both are optional.
- Resolve `null` when the user cancelled, nothing is inserted.
- The same function may serve several filetypes and branch on `meta.filetype`.

## Register a picker

Register globally (all editors on the page), keyed by filetype:

```javascript
Joomla.editorFilePickers.image = myPicker;
Joomla.editorFilePickers.media = myPicker;
```

Or override for a single editor, keyed by the editor id (the id of the textarea):

```javascript
Joomla.editorFilePickers['jform_articletext'] = { image: myPicker };
```

A per-editor picker wins over the global one for that editor. A filetype registered only per-editor shows
its browse button only on that editor.

Registration must happen before the editors initialise (on `DOMContentLoaded`). Any script loaded normally
through the [WebAssetManager](../../../../general-concepts/web-asset-manager.md) (deferred or module) satisfies this.

## The core link picker

For the link dialog (`file` filetype) core registers its own picker: a dialog with a list of link sources on
the left and the selected source's view in an iframe on the right. The user picks an article, contact, menu
item or media file, and its url (plus a default link text) is inserted into the link dialog.

The source list is built from the `editor-link-providers` script options plus a built-in Media Manager
source. An editors-xtd plugin registers its content as a link source with a single call from its
`onEditorButtonsSetup` handler — this is how the core Article, Contact and Menu button plugins appear in
the list (see `plugins/editors-xtd/article/src/Extension/Article.php`):

```php
$this->getApplication()->getDocument()->addScriptOptions('editor-link-providers', [
    $this->_name => [
        'title'  => Text::_('PLG_MYPLUGIN_BUTTON_MYPLUGIN'),
        'icon'   => 'file-add',
        'src'    => 'index.php?option=com_mycomponent&view=items&layout=modal&tmpl=component',
        'select' => 'content',
    ],
], true);
```

Providers are keyed by a unique name (core uses the plugin name); registering the same key again overwrites
it. The entry options are:

| Option   | Description                                                                                                  |
|----------|--------------------------------------------------------------------------------------------------------------|
| `title`  | The label shown in the source list.                                                                          |
| `icon`   | An icon from the Joomla icon font, without the `icon-` prefix (for example `file-add`, `address`, `list`).   |
| `src`    | The url of the selection view, loaded in the iframe. The application base path and the CSRF token are applied automatically. |
| `select` | The selection mechanism of the view: `content` or `media`.                                                   |

With `select: 'content'` the view must be a modal select view which reports the selection to the parent
window with a `joomla:content-select` message carrying `uri` and `title` — the same protocol used by modal
select form fields, described in
[Content select and cross window communication](../../../../general-concepts/javascript/js-library/modal-content-select.md).
Components providing such a modal list view (`layout=modal&tmpl=component`) can be used as a link source
as they are.

`select: 'media'` is used by the built-in Media Manager source: selection happens through the Media Manager
events and a Select button in the dialog header. For your own provider, use `content`.

To *add* your content as a link target, registering a provider is all that is needed — no JavaScript at all.
Replacing the whole link dialog UX instead means registering your own `file` picker
(see [Multiple pickers and conflicts](#multiple-pickers-and-conflicts)).

## Registering your own picker (PHP implementation)

A reliable place to load a picker registration script is an editors-xtd plugin subscribing to the
`onEditorButtonsSetup` event, which fires whenever an editor with buttons is rendered. Registering a
toolbar button from that event is optional, the event can be used only to attach assets.

The complete plugin class below is all the PHP that is needed. Create a plugin under
`plugins/editors-xtd/mymediapicker/`, call it `mymediapicker`, assume namespace is
`JoomlaExample\Plugin\EditorsXtd\MyMediaPicker` (the plugin scaffolding — manifest and service provider —
is the same as for any [editors-xtd plugin](index.md)):

```php
namespace JoomlaExample\Plugin\EditorsXtd\MyMediaPicker\Extension;

use Joomla\CMS\Event\Editor\EditorButtonsSetupEvent;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Uri\Uri;
use Joomla\Event\SubscriberInterface;

final class MyMediaPicker extends CMSPlugin implements SubscriberInterface
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
    public function onEditorButtonsSetup(EditorButtonsSetupEvent $event): void
    {
        $user = $this->getApplication()->getIdentity();

        // Optional: only offer the picker to users allowed to use your media manager
        if (!$user->authorise('core.create', 'com_mymedia')) {
            return;
        }

        $this->loadLanguage();

        $doc = $this->getApplication()->getDocument();
        $wa  = $doc->getWebAssetManager();

        // The script that registers Joomla.editorFilePickers (see the JavaScript example below).
        // The event fires once per editor, guard against double registration.
        if (!$wa->assetExists('script', 'com_mymedia.editor-picker')) {
            $wa->registerScript(
                'com_mymedia.editor-picker',
                'com_mymedia/editor-picker.js',
                [],
                ['type' => 'module'],
                ['joomla.dialog']
            );
        }

        $wa->useScript('com_mymedia.editor-picker');

        // Anything your picker needs at runtime: endpoints, configuration, translations
        $doc->addScriptOptions('com_mymedia.picker', [
            'pickerUrl' => Uri::base(true) . '/index.php?option=com_mymedia&view=picker&tmpl=component',
        ]);

        Text::script('COM_MYMEDIA_PICKER_TITLE');
    }
}
```

No toolbar button is registered here — the plugin only attaches the assets. The core Image editor button
plugin (`plugins/editors-xtd/image/src/Extension/Image.php`) uses this same event to do both: register its
"Media" toolbar button and attach the file picker script.

## Complete example

A minimal picker opening the extension's own selection view in a
[Joomla Dialog](../../../../general-concepts/javascript/js-library/joomla-dialog.md) iframe.
The iframe view reports the selection to the parent window with `postMessage()`
(see [Content select and cross window communication](../../../../general-concepts/javascript/js-library/modal-content-select.md)):

```javascript
import JoomlaDialog from 'joomla.dialog';

// Provided by the plugin class above via addScriptOptions()
const { pickerUrl } = Joomla.getOptions('com_mymedia.picker', {});

Joomla.editorFilePickers = Joomla.editorFilePickers || {};

Joomla.editorFilePickers.image = (meta) => new Promise((resolve) => {
  const dialog = new JoomlaDialog({
    popupType: 'iframe',
    src: pickerUrl,
    textHeader: Joomla.Text._('COM_MYMEDIA_PICKER_TITLE'),
  });

  const onMessage = (event) => {
    if (event.origin !== window.location.origin || event.data.messageType !== 'mymedia:select') {
      return;
    }
    resolve({ url: event.data.url, alt: event.data.alt || '' });
    dialog.close();
  };

  window.addEventListener('message', onMessage);
  dialog.addEventListener('joomla-dialog:close', () => {
    window.removeEventListener('message', onMessage);
    dialog.destroy();
    resolve(null);
  });

  dialog.show();
});
```

The canonical core implementation is the Image editor button plugin: the picker in
`media_source/plg_editors-xtd_image/js/media-filepicker.es6.js` (opens the Media Manager and resolves the
selected file url) and its asset registration in `plugins/editors-xtd/image/src/Extension/Image.php`.

## Multiple pickers and conflicts

TinyMCE shows one browse button per dialog field, therefore only one picker per filetype can be active on
an editor. The rules are:

- Registering a filetype that is already registered replaces it, the last registration wins.
- Two extensions can coexist by serving different filetypes (for example one serves `image`/`media`,
  another serves `file`).
- To replace the core Media Manager only for specific editors, use the per-editor registration.
- To replace it globally, disable the core "Editor Button - Image" plugin, then your picker is the only
  registered one for `image`/`media`.
- The core link picker (`file`) is registered whenever TinyMCE is rendered. To replace it, register your
  own `file` picker in a script that runs after the core one, or use the per-editor registration. Before
  replacing it, consider whether [registering a link provider](#the-core-link-picker) is enough — that
  adds your content to the existing dialog instead of taking it over.

## Overriding and opting out

The registry-based wiring steps aside when a developer configures the editor directly:

- A `file_picker_callback` set on an editor's TinyMCE options is left untouched, the registry is ignored
  for that editor.
- A `file_picker_types` set on an editor's TinyMCE options wins over the computed filetype list.
- Removing `jfilepicker` from an editor's `plugins` option disables the feature for that editor entirely.

## See also

- [How to create an editors-xtd plugin](index.md)
- [Joomla Editors script](../../../../general-concepts/javascript/js-library/editors.md)
- [Joomla Dialog (popup) script](../../../../general-concepts/javascript/js-library/joomla-dialog.md)
- [Content select (in modal) and cross window communication](../../../../general-concepts/javascript/js-library/modal-content-select.md)
