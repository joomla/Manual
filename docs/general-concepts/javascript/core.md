Joomla core.js
==============

Provides a global `Joomla` object and a core functionality for client side: options storage, translations, etc.

To enable it on the page use [WebAssetManager](../web-asset-manager.md) `$wa->useScript('core')`.

## Client side options

Joomla provides a generic way to share script options between server side and client side.
To share your script option from php to javascript, add them:

```php
$doc = Joomla\CMS\Factory::getApplication()->getDocument();
$doc->addScriptOptions('my_extension_options', ['foo' => 'bar']);
```

To read the options on client side:

```javascript
console.log(Joomla.getOptions('my_extension_options'));
```

## Client side translations

To add translation to your script, add needed strings in a layout:
```php
Joomla\CMS\Language\Text::script('LANG_CONSTANT1');
Joomla\CMS\Language\Text::script('LANG_CONSTANT2');
Joomla\CMS\Language\Text::script('LANG_CONSTANT3');
```

Use in your script:
```javascript
console.log(Joomla.Text('LANG_CONSTANT1', 'Default string1'));
console.log(Joomla.Text('LANG_CONSTANT2', 'Default string2'));
console.log(Joomla.Text('LANG_CONSTANT3', 'Default string3'));
```

**Note:** Fallback  to default string works only when the language constant was not added at all. When it was added but untranslated then it will return untranslated constant.

## Sanitize Html string

`Joomla.sanitizeHtml()` method sanitize untrusted HTML string. And should be used anytime when rendering HTML that comes from dynamic variables, translations etc.

```javascript
const myElement = document.createElement('div');
myElement.innerHTML = Joomla.sanitizeHtml(Joomla.Text('LANG_CONSTANT1', '<p>Default string1</p>'));
```

## Joomla ajax request

For basic stuff like simple `GET` requests it is recommended to use browser native [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) method. 
However, when need something more complex, like Upload with progress, or queue requests, Joomla provide `Joomla.request()` method. Which is a wrapper around [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

### `Joomla.request()` 

Options:

- `url: ''` Request URL
- `method: 'GET'` Request method `GET` (default), `POST` etc.
- `data` Data to be sent, see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/send.
- `promise: false` Whether return a Promise instance.  When is `true` then next options are ignored: `perform`, `onSuccess`, `onError`, `onComplete`.
- `perform: true` Perform the request immediately or return `XMLHttpRequest` instance and perform it later.
- `headers: {}` Object of custom headers, eg `{'X-Foo': 'Bar', 'X-Bar': 'Foo'}`.
- `onBefore:  (xhr) => {}` Callback on before the request
- `onSuccess: (response, xhr) => {}` Callback on the request success
- `onError:   (xhr) => {}` Callback on the request error
- `onComplete: (xhr) => {}` Callback on the request completed, with/without error

#### Example upload:

```javascript
const formData = new FormData;
formData.append('file', fileBlob, filename);

Joomla.request({
    url: 'index.php?option=com_example&task=upload.file',
    method: 'POST',
    promise: true,
    data: formData,
    onBefore(xhr) {
        xhr.upload.addEventListener('progress', (event) => {
            console.log('Progres', event.loaded, event.total);
        });
    },
}).then((xhr) => {
   console.log('File uploaded');
}).catch((error) => {
    console.log('File failed');
});
```

### `Joomla.enqueueRequest()` 

A FIFO queue of requests to execute serially. Used to prevent simultaneous execution of multiple requests against the server which could trigger its Denial of Service protection.
Accepts the same options as `Joomla.request()`, with one difference, it requires `promise` to be set to `true`. 

#### Example queue:

```javascript
Joomla.request(options1);
Joomla.request(options2);
Joomla.request(options3);
```
