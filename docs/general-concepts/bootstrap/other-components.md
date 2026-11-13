---
sidebar_position: 4
title: Other Components
---

Other Bootstrap Components
==========================

This page describes the Bootstrap helper functions for the Bootstrap components other than
[modals](./modal.md), [tabs](./tabs.md) and [accordions](./accordion.md).

All these functions have the same signature:

```php
HTMLHelper::_('bootstrap.<component>', $selector = '', $options = []);
```

Without a selector the function just loads the script of the component.
With a selector Joomla also creates a Bootstrap instance, with the given options, for each matching element
when the page loads, as described in [Initialising elements with a selector](./index.md#initialising-elements-with-a-selector).

For the HTML of each component see the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/).

## Alert

```php
HTMLHelper::_('bootstrap.alert');
```

Loads the script which makes [dismissible alerts](https://getbootstrap.com/docs/5.3/components/alerts/#dismissing)
work: a button with the `data-bs-dismiss="alert"` attribute closes the alert which contains it.

```html
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    The landmark is closed for renovation.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

## Button

```php
HTMLHelper::_('bootstrap.button');
```

Loads the script for [toggle buttons](https://getbootstrap.com/docs/5.3/components/buttons/#toggle-states),
ie buttons with the `data-bs-toggle="button"` attribute.

## Carousel

```php
HTMLHelper::_('bootstrap.carousel', '#landmarkCarousel', ['interval' => 3000, 'ride' => 'carousel']);
```

Loads the [carousel](https://getbootstrap.com/docs/5.3/components/carousel/) script,
and if a selector is passed, initialises the matching carousels with these options:

| Option     | Type           | Default   | Description                                                                         |
|------------|----------------|-----------|-------------------------------------------------------------------------------------|
| `interval` | integer        | `5000`    | The time in milliseconds between the slides                                         |
| `keyboard` | boolean        | `true`    | Whether the carousel reacts to the keyboard                                         |
| `pause`    | string&#124;boolean | `'hover'` | `'hover'` to pause the carousel while the mouse is over it, or `false`        |
| `ride`     | string&#124;boolean | `false`   | `'carousel'` to start cycling when the page loads, or `true` to start cycling after the user has moved to the next slide |
| `touch`    | boolean        | `true`    | Whether the carousel can be swiped on touchscreens                                  |
| `wrap`     | boolean        | `true`    | Whether the carousel goes back to the first slide after the last one                |

Unlike the other components, the carousel accepts `false` values for its options.

## Collapse

```php
HTMLHelper::_('bootstrap.collapse');
```

Loads the [collapse](https://getbootstrap.com/docs/5.3/components/collapse/) script, so that elements with the
`data-bs-toggle="collapse"` attribute open and close their target elements.
See [Loading the Bootstrap JavaScript](./index.md#loading-the-bootstrap-javascript) for an example.

Call this function without a selector:
if you pass the selector of collapsible elements, then they are all opened when the page loads.

## Dropdown

```php
HTMLHelper::_('bootstrap.dropdown');
```

Loads the [dropdown](https://getbootstrap.com/docs/5.3/components/dropdowns/) script, so that buttons with the
`data-bs-toggle="dropdown"` attribute open and close their dropdown menus.

The options of this function aren't passed through to Bootstrap,
so configure the dropdowns with Bootstrap data attributes, such as `data-bs-auto-close`.

## Offcanvas

```php
HTMLHelper::_('bootstrap.offcanvas');
```

Loads the [offcanvas](https://getbootstrap.com/docs/5.3/components/offcanvas/) script, so that elements with the
`data-bs-toggle="offcanvas"` attribute open and close their offcanvas panels.

Call this function without a selector, and configure the panels with Bootstrap data attributes
(eg `data-bs-scroll="true"` to allow the page to be scrolled while the panel is open).
If you pass a selector, then the page can always be scrolled while the panel is open,
whatever value you give the `scroll` option.

## Popover and tooltip

[Popovers](https://getbootstrap.com/docs/5.3/components/popovers/) and
[tooltips](https://getbootstrap.com/docs/5.3/components/tooltips/) work only once they've been initialised,
so for these components you need to pass a selector (or create the instances in your own JavaScript code):

```php
HTMLHelper::_('bootstrap.tooltip', '.hasTooltip', ['placement' => 'bottom']);
HTMLHelper::_('bootstrap.popover', '.hasPopover');
```

```html
<button type="button" class="btn btn-secondary hasTooltip" title="Opening hours: 9:00 to 17:00">
    Opening hours
</button>

<button type="button" class="btn btn-secondary hasPopover" title="Opening hours"
    data-bs-content="9:00 to 17:00, closed on Mondays">
    Opening hours
</button>
```

Both functions load the `bootstrap.popover` script.

A tooltip takes its text from the `title` attribute of the element (`data-bs-title` doesn't work here).
A popover takes its title from the `title` attribute, and its content from the `data-bs-content` attribute,
or from the `content` option.

The main options are:

| Option        | Type           | Default                                         | Description                                                    |
|---------------|----------------|-------------------------------------------------|----------------------------------------------------------------|
| `placement`   | string         | `'top'`                                         | `'top'`, `'bottom'`, `'left'`, `'right'` or `'auto'`           |
| `trigger`     | string         | `'click'` (popover), `'hover focus'` (tooltip) | What shows the popover or tooltip: any of `'click'`, `'hover'`, `'focus'` and `'manual'`, separated by spaces |
| `html`        | boolean        | `true`                                          | Whether the title and content are treated as HTML (which Bootstrap sanitises) |
| `container`   | string         | `'body'`                                        | The element to which the popover or tooltip is appended       |
| `content`     | string         |                                                 | (popover only) The content, if the element has no `data-bs-content` attribute |
| `customClass` | string         |                                                 | CSS classes to add to the popover or tooltip                  |
| `template`    | string         |                                                 | The HTML used to create the popover or tooltip                 |

## Scrollspy

```php
HTMLHelper::_('bootstrap.scrollspy');
```

Loads the [scrollspy](https://getbootstrap.com/docs/5.3/components/scrollspy/) script,
which initialises the elements with the `data-bs-spy="scroll"` attribute when the page has loaded.
Configure the scrollspy with Bootstrap data attributes, such as `data-bs-target`.

## Toast

```php
HTMLHelper::_('bootstrap.toast', '.toast', ['delay' => 3000]);
```

Loads the [toast](https://getbootstrap.com/docs/5.3/components/toasts/) script,
and if a selector is passed, initialises the matching toasts.
The `delay` option is the time in milliseconds after which the toast is hidden (default `5000`).

Toasts are not shown automatically, so you have to show them with JavaScript:

```js
document.addEventListener('DOMContentLoaded', () => {
  window.bootstrap.Toast.getOrCreateInstance(document.getElementById('myToast')).show();
});
```

A toast which is initialised by Joomla is always hidden after the delay.
For a toast which stays open until the user closes it, don't pass a selector,
and instead create the toast in your own JavaScript code:

```js
window.bootstrap.Toast.getOrCreateInstance(document.getElementById('myToast'), { autohide: false }).show();
```
