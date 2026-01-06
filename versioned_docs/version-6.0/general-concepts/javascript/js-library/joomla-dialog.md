Joomla Dialog (popup) script
============================

Joomla Dialog module provides a functionality which allows to display various Dialogs (popup) windows. 

To add Joomla Dialog module to the page use [WebAssetManager](../../web-asset-manager.md) `$wa->useScript('joomla.dialog')`, 
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
- `src` (string) Source path for iframe, image, ajax, or CSS selector for HTML element (for `inline` type).
- `popupContent` (string|HTMLElement|HTMLTemplateElement) Content for inline type popup.
- `cancelable` (boolean) Whether popup can be closed by `Esc` button. (default `true`)
- `textClose` (string) An optional text for close button. Applied when no Buttons provided.
- `textHeader` (string) An optional text for header.
- `iconHeader` (string) An optional Class names for header icon.
- `width` (string) An optional limit for the popup width, any valid CSS value.
- `height` (string) An optional height for the popup, any valid CSS value.
- `popupTemplate` (string|HTMLTemplateElement) A template for the popup.
- `preferredParent` (string|HTMLElement) The element where to attach the dialog, for cases when no parentElement exist, see show(). This allows to keep the dialog in the same branch of DOM as the popupContent.
- `popupButtons` (array)  An optional list of buttons, to be rendered in footer/header (or bottom/top of the popup body, when header/footer does not exist).
- `className` (string) An optional class for the `joomla-dialog` element.
- `data` (object) An optional object with data attributes for `joomla-dialog` element. Note: the data keys should be `camelCase`, example `{fooBar: 1}` for `data-foo-bar="1"`.

:::note
The properties of Joomla Dialog are immutable, they can be set only before rendering. After that they cannot be changed.
:::

Any property can be set as instance property or in class constructor. This two is equal:

```javascript
// Property in class constructor
const dialog = new JoomlaDialog({
  textHeader: 'The header',
  popupContent: '<p class="p-3">Popup content text</p>',
});
dialog.show();

// Property in to class instance
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

- `JoomlaDialog.alert(bodytext,headertext)` Show a text dialog, with one "okay" button. Returns Promise, that resolves when User closes dialog.
- `JoomlaDialog.confirm(bodytext,headertext)` Show a text dialog, with "Yes/No" buttons. Returns Promise, that resolves when User click one of buttons, with result `true` or `false`.

`.confirm()` and `.alert()` methods take an optional second parameter which will be the header text. If missing the header text defaults to **Info** 

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

### Example for `inline` content from `<template>` and `<div>` element:

For inline content it is possible to use [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template) (or existing element on the page) instead of adding large amount of HTML in to `popupContent` parameter.
The `<template>` creates a copy of the content and other elements uses the content directly from the DOM.
For common cases it is preferable to use `<template>` element.

```html
<template id="my-inline-content-from-template">
    <p class="p-3">Cat ipsum dolor sit amet, 
        meow go back to sleep owner brings food and water tries to pet on head</p>
</template>

<div id="my-inline-content-from-div">
	<p class="p-3">Cat ipsum dolor sit amet, 
        meow go back to sleep owner brings food and water tries to pet on head</p>
</div>
```
```javascript
import JoomlaDialog from 'joomla.dialog';

// Inline from <template>
const dialog = new JoomlaDialog(
  popupType: 'inline',
  textHeader: 'The header',
  src: '#my-inline-content-from-template',
});
dialog.show();

// Inline from <div>
const dialog = new JoomlaDialog(
  popupType: 'inline',
  textHeader: 'The header',
  src: '#my-inline-content-from-div',
});
dialog.show();
```


### Alert and Confirm usage:
```javascript
import JoomlaDialog from 'joomla.dialog';

// Alert
JoomlaDialog.alert('Chase ball of string eat plants, meow','Cat Header')
  .then(() => { 
    console.log('All done'); 
  });

// Confirmation
JoomlaDialog.confirm('Cheese on toast airedale the big cheese?','Mouse Header')
  .then((result) => { 
    console.log(result ? 'Okay' : 'Not okay'); 
  });
```

## Dialog auto-create

Binding button/anchor for basic stuff.
The asset allows to create the dialog for basic needs without use of additional JavaScript.

Enable asset with `$wa->useScript('joomla.dialog-autocreate')`.

### Button attributes:

- `data-joomla-dialog` Indicates that the element is intended for `joomla.dialog-autocreate`. Can be empty or contain JSON string with parameters for `JoomlaDialog`.
- `data-joomla-dialog-cache` When attribute is present the dialog will be cached, and not destroyed on close. Any future click will open the same dialog instead of creating a new one.
- `data-reload-on-close` When attribute is present then script will reload the page after closing of the dialog. 
- `data-close-on-message` When attribute is present then script will close the dialog on receiving any message from its Window (from `postMessage()`).
- `data-checkin-url` When attribute is present and contain a value then the script will perform POST request to given URL after closing of the dialog. Useful for `checkin` operations for dialogs with content editing. 

### Auto-create examples

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
