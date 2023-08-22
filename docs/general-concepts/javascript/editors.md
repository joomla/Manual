Joomla Editors script
=====================

`JoomlaEditor` and `JoomlaEditorButton` provides an API for client side integration for different Editors scripts while keeping cross-extension communication.
This is allowing other Joomla extensions interact with editor and its content.

To enable it on the page use [WebAssetManager](docs/general-concepts/web-asset-manager.md) `$wa->useScript('editors')` (which also will load `editor-api` and `editor-decorator` modules).

The API consist with following elements:
 - `JoomlaEditorDecorator` - provides a common interface for editors to follow.
 - `JoomlaEditor` - responsible for editor registration, and retrieving of Active one.
 - `JoomlaEditorButton` - responsible for registration of an editor buttons and its actions.
 
They provided by `editor-api` module, and can be imported as following:
```javascript
import { JoomlaEditor, JoomlaEditorButton, JoomlaEditorDecorator } from 'editor-api';
```

### How it works

Editor script should provide (and register it with `JoomlaEditor.register(editor)`) own instance of `JoomlaEditorDecorator` with implementation of required methods.
Any time when User interact with editor or with one of Editor Button, the editor script should mark this instance as Active with `JoomlaEditor.setActive(editor)`.

Each Editor button can run one action, this action should be previously registered with `JoomlaEditorButton.registerAction(name, handler)`. Where:
- `name` - is an action name.
- `handler` - a function to be executed for this action.

When editor script decides to integrate Joomla Editor Buttons in to its interface (as for example it is done in Joomla TinyMCE integration), then editor script is responsible for calling button action `JoomlaEditorButton.runAction(name, options)` for these buttons. Where:
- `name` - is a name of the action that need to be run.
- `options` - an options object that will be passed to the action `handler`.

For examples look [How to create an Editor plugin](building-extensions/plugins/editors-plugin.md).

## `JoomlaEditor` Methods

 - `register(editor)` Register new editor (which implement `JoomlaEditorDecorator`). 
 - `unregister(editor)` Unregister editor instance (by `JoomlaEditorDecorator` or `id` of editor).
 - `get(id)` Return instance by `id` if exists.
 - `setActive(editor)` Set currently Active editor, the editor that in focus (by `JoomlaEditorDecorator` or `id` of editor). 
 - `getActive()` Return last Active editor, if there exist eny.

## `JoomlaEditorButton` Methods

- `registerAction(name, handler)` Register new button action, or override existing.
- `runAction(name, options, button)` Execute action.
- `getActionHandler(name)` Get registered handler by action name.

Action handler is a function (or callable object), that will be given an Active editor instance of `JoomlaEditorDecorator` and Button options:
```javascript
JoomlaEditorButton.registerAction('example', (editor, options) => {
  alret('Doing the Example action! For editor ' + editor.getType());
});
```
