Joomla Dialog (popup) script
============================

Joomla Dialog module provides a functionality wich allows to display various Dialogs (popup) windows. 

To add Joomla Dialog module to the page use [WebAssetManager](/docs/general-concepts/web-asset-manager) `$wa->useScript('joomla.dialog')`, 
and to enable auto binding of the buttons on the page use `$wa->useScript('joomla.dialog-autocreate')`.

Joomla Dialog allows to display dialogs with following content:

- `inline` - text or html content;
- `iframe` - embed/remote content, in iframe;
- `ajax` - same as inline but the content loaded through ajax request; 
- `image` - image lightbox;

Provides helper methods for replacement `alert()` and `confirm()` dialogs.
Provides helper to bind page button/anchor to show the popup, for basic stuff, without extra js needed.

## Properties

- `popupType` (string) The popup type, supported: `inline`, `iframe`, `image`, `ajax`.
- `src` (string) Source path for iframe, image, ajax.
- `popupContent` (string|HTMLElement|HTMLTemplateElement) Content for inline type popup.
- `cancelable` (boolean) Whether popup can be closed by `Esc` button.
- `textClose` (string) An optional text for close button. Applied when no Buttons provided.
- `textHeader` (string) An optional text for header.
- `iconHeader` (string) An optional Class names for header icon.
- `width` (string) An optional limit for the popup width, any valid CSS value.
- `height` (string) An optional height for the popup, any valid CSS value.
- `popupTemplate` (string|HTMLTemplateElement) A template for the popup.
- `preferredParent` (string|HTMLElement) The element where to attach the dialog, for cases when no parentElement exist, see show(). This allows to keep the dialog in the same branch of DOM as the popupContent.
- `popupButtons` (array)  An optional list of buttons, to be rendered in footer/header (or bottom/top of the popup body, when header/footer does not exists).

Any property can be set as instance property or in class constructor. This two is equal:

```javascript
// Proprty in class constructor
const dialog = new JoomlaDialog({
  textHeader: 'The header',
  popupContent: '<p class="p-3">Popup content text</p>',
});
dialog.show();

// Proprty in to class instance
const dialog = new JoomlaDialog();
dialog.textHeader = 'The header';
dialog.popupContent = '<p class="p-3">Popup content text</p>';
dialog.show();
```

Buttons example:
```javascript
dialog.popupButtons = [
  { label: 'Yes', onClick: () => dialog.destroy() },
  { label: 'No', onClick: () => dialog.destroy(), className: 'btn btn-outline-danger ms-2' },
  { label: 'Click me', onClick: () => dialog.destroy(), location: 'header' },
];
```

## Methods

- `show()` Show the dialog. Will append dialog to DOM when it was not appended before.
- `close()` Close the dialog.
- `destroy()` Destroys the dialog.
- `getBody()` Return the dialog body element.
- `getBodyContent()` Return content element. Will return `popupContent` for inline and ajax types, `HTMLIframeElement` for iframe type, and `HTMLImageElement` for image type.
- `getHeader()` Return Header part of the dialog, when available.
- `getFooter()` Return Footer part of the dialog, when available.

### Static methods

- `JoomlaDialog.alert(text)` Show a text dialog, with one "okay" button. Returns Promise, that resolves when User closes dialog.
- `JoomlaDialog.confirm(text)` Show a text dialog, with "Yes/No" buttons. Returns Promise, that resolves when User click one of buttons, with result `true` or `false`.

## Events

- `joomla-dialog:open` Fired when dialog is opened.
- `joomla-dialog:close` Fired when dialog is closed.
- `joomla-dialog:load` Fired when content is finished loading.

```javascript
const dialog = new JoomlaDialog({
  popupContent: '<p class="p-3">Popup content text</p>',
});
dialog.addEventListener('joomla-dialog:open', () => {
    console.log('Dialog is opened!');
});
dialog.addEventListener('joomla-dialog:close', () => {
    console.log('Dialog is closed!');
});
dialog.addEventListener('joomla-dialog:load', () => {
    console.log('Dialog content is loaded!');
});
dialog.show();
```

## Usage examples

Enable asset with `$wa->useScript('joomla.dialog')`.

```javascript
import JoomlaDialog from 'joomla.dialog';

// Inline 
const dialog = new JoomlaDialog({
  textHeader: 'The header',
  popupContent: '<p class="p-3">Popup content text</p>',
});
dialog.show();

// IFrame
const dialog = new JoomlaDialog({
  popupType: 'iframe',
  textHeader: 'The header',
  src: 'index.php?option=com_content&view=articles&tmpl=component&layout=modal',
});
dialog.show();

// Ajax
const dialog = new JoomlaDialog({
  popupType: 'ajax',
  textHeader: 'The header',
  src: 'index.php?option=com_content&view=articles&tmpl=component&layout=modal',
});
dialog.show();

// Image
const dialog = new JoomlaDialog({
  popupType: 'image',
  src: 'images/headers/walden-pond.jpg',
});
dialog.show();

```


### Alert and Confirm usage:
```javascript
import JoomlaDialog from 'joomla.dialog';

// Alert
JoomlaDialog.alert('Chase ball of string eat plants, meow')
  .then(() => { 
    console.log('All done'); 
  });

// Confirmation
JoomlaDialog.confirm('Cheese on toast airedale the big cheese?')
  .then((result) => { 
    console.log(result ? 'Okay' : 'Not okay'); 
  });
```

### Binding button/anchor for basic stuff

Enable asset with `$wa->useScript('joomla.dialog-autocreate')`.

```html
<button class="btn btn-primary" type="button"
    data-joomla-dialog='{"popupType": "iframe", "width":"80vw", "height": "80vh", "src":"index.php?option=com_content&view=articles&tmpl=component&layout=modal"}'>Click</button>

<button class="btn btn-primary" type="button"
    data-joomla-dialog='{"popupType": "inline", "src":"#popupText", "width": "fit-content", "height": "fit-content"}'>Click</button>

<a href="index.php?option=com_content&view=articles&tmpl=component&layout=modal"
  data-joomla-dialog class="btn btn-outline-primary">Click</a>
<a href="#popupText" data-joomla-dialog class="btn btn-outline-primary">Click</a>

<template id="popupText"><p class="p-3">Popup content text</p></template>
```
