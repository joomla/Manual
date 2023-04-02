Joomla Dialog (popup) script
============================

Joomla Dialog script provides a functionality wich allows to display various Dialogs (popup) windows. 

To enable it on the page, enable it with [WebAssetManager](/docs/using-core-functions/web-asset-manager.md) `$wa->useScript('dialog')`.

Joomla Dialog allows to display dialogs with following content:

- `inline` - text or html content;
- `iframe` - embed/remote content, in iframe;
- `ajax` - same as inline but the content loaded through ajax request; 
- `image` - image lightbox;

Provides helper methods for replacement `alert()` and `confirm()` dialogs.
Provides helper to bind page button/anchor to show the popup, for basic stuff, without extra js needed.

## Usage examples

```javascript
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

Any property can be set as instance property or in class constructor. This two is equal:

```javascript
// Proprty in class constructor
const dialog = new JoomlaDialog({
  textHeader: 'The header',
  popupContent: '<p class="p-3">Popup content text</p>',
});

// Proprty in to class instance
const dialog = new JoomlaDialog();
dialog.textHeader = 'The header';
dialog.popupContent = '<p class="p-3">Popup content text</p>';
```

Other options:
```javascript
// Optional sizing:
dialog.width = '80vw';
dialog.height = '80vh';

// Definig your own buttons:
dialog.popupButtons = [
  { label: 'Yes', onClick: () => dialog.destroy() },
  { label: 'No', onClick: () => dialog.destroy(), className: 'btn btn-outline-danger ms-2' },
];
```

### Alert and Confirm usage:
```javascript
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
