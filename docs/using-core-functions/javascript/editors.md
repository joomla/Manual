Joomla Editors script
=====================

`Joomla.Editor` and `Joomla.EditorButton` provides an API for client side integration for different Editors scripts while keeping cross-extension communication.
This is allowing other Joomla extensions interact with editor and its content.

To enable it on the page use [WebAssetManager](/docs/using-core-functions/web-asset-manager.md) `$wa->useScript('editors')`.

The API consist with following elements:
 - `JoomlaEditorDecorator` - provides a common interface for editors to follow.
 - `Joomla.Editor` - responsible for editor registration, and retrieving of Active one.
 - `Joomla.EditorButton` - responsible for registration of an editor buttons and its actions. 

### How it works

Editor script should provide (with `Joomla.Editor.register(editor)`) own instance of `JoomlaEditorDecorator` with implementation of required methods.
Any time when User interact with editor or with one of Editor Button, the editor script should mark this instance as Active with `Joomla.Editor.setActive(editor)`.

Each Editor button can run one action, this action should be previously registered with `Joomla.EditorButton.registerAction(name, handler)`.

When editor script decides to integrate Joomla Editor Buttons in to its interface (as for example it is done in Joomla TinyMCE integration), then editor script is responsible for calling button action `Joomla.EditorButton.runAction(name, options)` for these buttons.


For examples look [How to create an Editor plugin](/building-extensions/plugins/editors-plugin.md).

## `Joomla.Editor` Methods

 - `register(editor)` Register new editor (which implement `JoomlaEditorDecorator`). 
 - `unregister(editor)` Unregister editor instance (by `JoomlaEditorDecorator` or `id` of editor).
 - `get(id)` Return instance by `id` if exists.
 - `setActive(editor)` Set currently Active editor, the editor that in focus (by `JoomlaEditorDecorator` or `id` of editor). 
 - `getActive()` Return last Active editor, if there exist eny.

## `Joomla.EditorButton` Methods

- `registerAction(name, handler)` Register new button action, or override existing.
- `runAction(name, options, button)` Execute action.
- `getActionHandler(name)` Get registered handler by action name.

Action handler is a function (or callable object), that will be given an Active editor instance of `JoomlaEditorDecorator` and Button options:
```javascript
Joomla.EditorButton.registerAction('example', (editor, options) => {
  
});
```
