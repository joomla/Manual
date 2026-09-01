Content select (in modal) and cross window communication
========================================================

It is often need to have a possibility to select a content value while editing another content.
Usually this is achieved by use of a modal window. However, when the modal content is an iframe it introduces extra complexity related to cross window communication.

It may tempting to use direct access to a parent from an iframe `window.parent['field_id'].value='selected value';`. And it is what Joomla also used to do.
Such approach is insecure, not reliable and often does not work with field in multiple mode (like SubForm field).

A better approach is to use a message based communication: [Window: postMessage() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage),
which provide a reliable and secure way to transfer any data from children window (iframe) to parent.

### How it works:
 - Initiator creates a dialog/modal, and add a listener for `message` event of current window `window.addEventListener('message', ... )`;
 - Child window handle user selection, and post a message with selected value(s) to parent `window.parent.postMessage()`;
 - Initiator receive the message, set the values, removes `message` listener, and closes a dialog/modal;

Joomla provide `modal-content-select`, `modal-content-select-field` assets and `Joomla\CMS\Form\Field\ModalSelectField`,
that can be used as is or as base for your field.

`modal-content-select-field` asset loaded with `ModalSelect` field, creates a dialog when requested, and listen to `message`.

`modal-content-select` asset, a helper which should be loaded within the iframe. It will listen on click on any element with `data-content-select` attribute,
and will post message with `messageType: 'joomla:content-select'` and the element's dataset to parent.
Additionally, when scriptOptions contains `content-select-on-load` value, the helper will post this value to parent on iframe load event.
Example of the "selectable" elements:
```html
<button data-content-select data-id="1" data-title="Article 1">Select Article 1</button>
<button data-content-select data-id="31" data-title="Article 31">Select Article 31</button>
```
It is not limited to only id and title, it can be extended as needs.

The child window can post following messages:
 - `joomla:content-select` which used to post a value to parent, example `window.parent.postMessage({messageType: 'joomla:content-select', id: 1, title: 'A title'})`;
 - `joomla:cancel` which cancel any action, example `window.parent.postMessage({messageType: 'joomla:cancel'})`;


### Dialog buttons and advanced usage

It is recommended that all interactive buttons (like `save`, `cancel` etc) be embedded within dialog content (within iframe), instead of rendering them with parent window.
This reduce complexity and makes code more reliable.

When using Create/Edit/Cancel the controller usually do redirect to a complete page.
For dialog window you can do redirect to `layout=modalreturn`, and on this page set the final state to `scriptOptions` then `modal-content-select` script will check it,
and post the result to parent.
Example:
```php
$doc->addScriptOptions('content-select-on-load', [
  'id' => 1,
  'title' => 'A title',
]);
```


