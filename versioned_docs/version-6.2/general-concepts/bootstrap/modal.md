---
sidebar_position: 1
title: Modal
---

Modal
=====

The Bootstrap helper provides 2 functions for [Bootstrap modals](https://getbootstrap.com/docs/5.3/components/modal/):

- `bootstrap.renderModal` outputs the complete HTML of a modal, and loads the modal script

- `bootstrap.modal` just loads the modal script, for when you write the HTML of the modal yourself

:::tip
  Joomla also has its own [Joomla Dialog](../javascript/js-library/joomla-dialog.md) script,
  which displays popups without needing Bootstrap, and which you can create and control fully from JavaScript.
:::

## Rendering a modal

```php
HTMLHelper::_('bootstrap.renderModal', $selector, $options, $body);
```

where

- `$selector` - the id of the modal element (without a leading `#`)

- `$options` - an array of options, described below

- `$body` - the HTML for the body of the modal

The function returns the HTML of the modal, which you then have to output.
The modal is hidden until it is opened, and the usual way to open it is with a button which has
the Bootstrap `data-bs-toggle="modal"` attribute, and the id of the modal in the `data-bs-target` attribute:

```php
<?php
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;

echo HTMLHelper::_(
    'bootstrap.renderModal',
    'exampleModal',
    [
        'title'  => Text::_('COM_EXAMPLE_MODAL_TITLE'),
        'footer' => '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">'
            . Text::_('JCLOSE') . '</button>',
    ],
    '<p class="p-3">' . Text::_('COM_EXAMPLE_MODAL_BODY') . '</p>'
);
?>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <?php echo Text::_('COM_EXAMPLE_MODAL_OPEN'); ?>
</button>
```

Any element with the attribute `data-bs-dismiss="modal"` inside the modal closes it,
as does the close button in the header.

The options are:

| Option        | Type           | Description                                                                                          |
|---------------|----------------|------------------------------------------------------------------------------------------------------|
| `title`       | string         | The title shown in the header of the modal                                                           |
| `closeButton` | boolean        | Whether to show a close button in the header (default `true`). If there's no title and no close button, then the modal has no header |
| `footer`      | string         | The HTML for the footer of the modal. If you don't set it, then the modal has no footer             |
| `url`         | string         | The URL of a page to show in an `<iframe>` within the body of the modal - see below                 |
| `height`      | string         | The `height` attribute of the `<iframe>`                                                             |
| `width`       | string         | The `width` attribute of the `<iframe>`                                                              |
| `bodyHeight`  | integer        | The height of the modal body as a percentage of the browser window height. It's rounded to the nearest 10, and is used only if the result is between 20 and 80 |
| `modalWidth`  | integer        | The width of the modal as a percentage of the browser window width. It's rounded to the nearest 10, and is used only if the result is between 10 and 100 |
| `modalCss`    | string         | CSS classes for the `.modal-dialog` element, which replace the default `modal-lg` class (and the `modalWidth` class), eg `modal-dialog-centered` |
| `animation`   | boolean        | Whether the modal fades in and out (default `true`)                                                  |
| `backdrop`    | string         | Set to `'static'` to stop the modal being closed when the user clicks outside it                    |

A modal which is output by `renderModal` can always be closed with the Escape key.

The values of `title`, `footer` and `$body` are output as they are, so make sure that you escape any text in them
which comes from user input.

`renderModal` outputs a modal with a given id only once per page.
If you call it again with the same `$selector`, then it returns an empty string.

### Showing a page in the modal

If you set the `url` option, then the modal shows that page in an `<iframe>`.
The `<iframe>` is created each time the modal is opened, so the page is reloaded every time.
Usually you'll want to show the page without the template around it, so add `tmpl=component` to the URL:

```php
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Router\Route;

echo HTMLHelper::_(
    'bootstrap.renderModal',
    'landmarkModal',
    [
        'title'      => 'Landmark',
        'url'        => Route::_('index.php?option=com_example&view=landmark&id=1&tmpl=component'),
        'height'     => '400px',
        'width'      => '800px',
        'bodyHeight' => 70,
        'modalWidth' => 80,
    ]
);
```

If you also pass `$body`, then it is shown after the `<iframe>`.

## Writing the HTML of the modal yourself

If you want complete control over the HTML, then write the modal HTML as described in the
[Bootstrap modal documentation](https://getbootstrap.com/docs/5.3/components/modal/),
and just load the modal script:

```php
HTMLHelper::_('bootstrap.modal');
```

(This is the same as `$wa->useScript('bootstrap.modal')`.)

You can also pass the selector of your modal element, and an array of options:

```php
HTMLHelper::_('bootstrap.modal', '#myModal', ['backdrop' => 'static']);
```

in which case Joomla initialises the modal when the page loads.
The `backdrop` option can be set to `'static'`.
The `keyboard` and `focus` options are always `true` when they're set through the helper,
so if you don't want the modal to close when the user presses the Escape key,
then don't pass a selector, and instead add the `data-bs-keyboard="false"` attribute to the modal element.

## Opening and closing a modal from JavaScript

A modal which has been initialised by Joomla (with `renderModal`, or `bootstrap.modal` with a selector)
has `open()` and `close()` methods on its element:

```js
document.getElementById('exampleModal').open();
document.getElementById('exampleModal').close();
```

While such a modal is open, `Joomla.Modal.getCurrent()` returns its element.

For any Bootstrap modal you can also use the Bootstrap JavaScript API:

```js
window.bootstrap.Modal.getOrCreateInstance(document.getElementById('myModal')).show();
```
