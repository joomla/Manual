---
title: Bootstrap
---

Bootstrap
=========

Joomla ships with the [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/) framework.
The Cassiopeia site template and the Atum administrator template are both built on Bootstrap,
so you can use the Bootstrap CSS classes (grid, utilities, buttons, cards, etc.) in your extensions straight away.

The interactive Bootstrap components (modals, tabs, dropdowns, tooltips, etc.) need JavaScript,
and Joomla doesn't load this JavaScript on every page.
Instead, each Bootstrap component is available as a separate script, and you load only the ones your page needs.
This section describes how to do that, and how to use the PHP helper functions which Joomla provides
for the most common Bootstrap components.

## Bootstrap assets

The Bootstrap files are registered with the [Web Asset Manager](../web-asset-manager.md) as the following assets:

| Asset name           | Type   | Provides                                              |
|----------------------|--------|-------------------------------------------------------|
| `bootstrap.css`      | style  | The complete Bootstrap CSS                            |
| `bootstrap.alert`    | script | Alerts                                                |
| `bootstrap.button`   | script | Toggle buttons                                        |
| `bootstrap.carousel` | script | Carousels                                             |
| `bootstrap.collapse` | script | Collapses and accordions                              |
| `bootstrap.dropdown` | script | Dropdowns                                             |
| `bootstrap.modal`    | script | Modals                                                |
| `bootstrap.offcanvas`| script | Offcanvas panels                                      |
| `bootstrap.popover`  | script | Popovers and tooltips                                 |
| `bootstrap.scrollspy`| script | Scrollspy                                             |
| `bootstrap.tab`      | script | Tabs                                                  |
| `bootstrap.toast`    | script | Toasts                                                |

You don't normally need the `bootstrap.css` style, as the Cassiopeia and Atum templates
already include the Bootstrap styles in their own CSS.
It's useful if your extension is used with a template which isn't based on Bootstrap.

The scripts are ES modules which depend on the Joomla `core` script, so the Web Asset Manager loads `core` with them.

## Loading the Bootstrap JavaScript

There are 3 ways to load the script of a Bootstrap component.

1. Call the matching [HTML Registry](../html-registry.md) function of the Bootstrap helper class:

```php
use Joomla\CMS\HTML\HTMLHelper;

HTMLHelper::_('bootstrap.modal');
```

2. Ask the Web Asset Manager for the asset directly:

```php
$wa = $this->getDocument()->getWebAssetManager();   // eg within a View class or tmpl file
$wa->useScript('bootstrap.modal');
```

3. If your own script uses Bootstrap, add the Bootstrap asset to the `dependencies` of your script
in your extension's `joomla.asset.json` file, so that it is loaded whenever your script is:

```json
{
  "name": "com_example.landmarks",
  "type": "script",
  "uri": "com_example/landmarks.js",
  "dependencies": [
    "bootstrap.modal"
  ],
  "attributes": {
    "type": "module"
  }
}
```

Once the script is loaded, the Bootstrap components work with Bootstrap's own data attributes, exactly as described
in the Bootstrap documentation. For example, this button opens and closes the element with id "more"
once the `bootstrap.collapse` script is on the page:

```php
<?php HTMLHelper::_('bootstrap.collapse'); ?>
<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#more"
    aria-expanded="false" aria-controls="more">
    Show more
</button>
<div class="collapse" id="more">
    <p>Some more text</p>
</div>
```

:::warning
  `HTMLHelper::_('bootstrap.framework')`, which loads the scripts of all the Bootstrap components,
  has been deprecated since Joomla 4.0. Load only the components which your page uses.
:::

## Using the Bootstrap JavaScript API

Each script makes its Bootstrap class available in the global `bootstrap` object,
for example `window.bootstrap.Modal`, `window.bootstrap.Toast`, etc.
(The `bootstrap.popover` script provides both `window.bootstrap.Popover` and `window.bootstrap.Tooltip`.)

As the Bootstrap scripts are ES modules, they run only after the HTML document has been parsed.
So unless your own script is a module which has the Bootstrap asset as a dependency,
wait for the `DOMContentLoaded` event (which fires after the modules have run) before you use the `bootstrap` object.
For example, to show a toast:

```js
document.addEventListener('DOMContentLoaded', () => {
  const toastElement = document.getElementById('myToast');
  window.bootstrap.Toast.getOrCreateInstance(toastElement).show();
});
```

See the documentation of each component on the [Bootstrap website](https://getbootstrap.com/docs/5.3/)
for the methods and events which are available.

## The Bootstrap helper functions

The [Bootstrap helper class](cms-api://classes/Joomla-CMS-HTML-Helpers-Bootstrap.html)
provides one function for each Bootstrap component script, plus some functions which output the HTML
for a modal, a set of tabs or an accordion:

| Function                                                     | Description                                                     |
|--------------------------------------------------------------|-----------------------------------------------------------------|
| `bootstrap.alert`, `bootstrap.button`, `bootstrap.carousel`, `bootstrap.collapse`, `bootstrap.dropdown`, `bootstrap.offcanvas`, `bootstrap.popover`, `bootstrap.scrollspy`, `bootstrap.tooltip`, `bootstrap.toast` | Load the component script, and optionally initialise elements - see [Other Components](./other-components.md) |
| `bootstrap.modal`, `bootstrap.renderModal`                   | Load the modal script / output the HTML of a modal - see [Modal](./modal.md) |
| `bootstrap.tab`, `bootstrap.startTabSet`, `bootstrap.addTab`, `bootstrap.endTab`, `bootstrap.endTabSet` | Output the HTML of a set of tabs - see [Tabs](./tabs.md) |
| `bootstrap.startAccordion`, `bootstrap.addSlide`, `bootstrap.endSlide`, `bootstrap.endAccordion` | Output the HTML of an accordion - see [Accordion](./accordion.md) |
| `bootstrap.loadCss`                                          | Load the `bootstrap.css` style                                  |

### Initialising elements with a selector

The script loading functions (eg `bootstrap.toast`) all have the same signature:

```php
HTMLHelper::_('bootstrap.toast', $selector = '', $options = []);
```

If you call the function without a selector, then it just loads the script.

If you pass a CSS selector, then the selector and options are passed to the browser in the
[Joomla script options](../javascript/adding-javascript.md#passing-variables-to-javascript), and when the page loads the Joomla script creates
a Bootstrap instance, using these options, for each element on the page which matches the selector.
For example:

```php
HTMLHelper::_('bootstrap.tooltip', '.hasTooltip', ['placement' => 'bottom']);
```

creates a Bootstrap tooltip for every element with the class `hasTooltip`.

There are some things to be aware of:

- The elements are initialised only once, when the page loads.
Elements which you add to the page later with JavaScript have to be initialised in your own JavaScript code.

- For most components, the helper passes an option through to Bootstrap only if its value isn't empty,
and otherwise the Joomla script uses its own default value.
This means that you often can't switch off an option by setting it to `false`
(for example, a modal can't be prevented from closing with the Escape key in this way).

- Options which are passed in from the helper take precedence over the Bootstrap `data-bs-*` attributes
of the element.

So if you need options which the helper doesn't pass on, call the function without a selector,
and configure the element with Bootstrap data attributes, or create the instance in your own JavaScript code.
