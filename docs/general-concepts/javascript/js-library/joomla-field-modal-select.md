joomla-field-modal-select Web Component
=======================================

`joomla-field-modal-select` is a generic web component that turns any field element (a `joomla-field-fancy-select`, a plain `<select>`, or a plain `<input>`) into a modal-picker field. It wraps the inner field together with a "Browse" button. When the button is clicked the component opens a [JoomlaDialog](./joomla-dialog.md) iframe containing a picker page, listens for a `postMessage` from that page, and writes the chosen value back into the inner field.

This makes it easy to build "select from a modal list" fields (positions, articles, categories, …) without writing any JavaScript — the component handles dialog lifecycle, message routing, and change event propagation automatically.

## Asset usage

Register the component with [WebAssetManager](../../web-asset-manager.md):

```php
$wa->useScript('webcomponent.field-modal-select');
```

The asset automatically pulls in the `joomla.dialog` dependency, so you do not need to load it separately.

## HTML attributes

| Attribute | Type | Description |
|---|---|---|
| `modal-url` | string | The `src` URL for the picker iframe. |
| `modal-title` | string | Text shown in the dialog header. |

## Inner field discovery

On connection the component scans its own subtree and picks the first match in this priority order:

1. `joomla-field-fancy-select` (Choices.js wrapper)
2. `<select>`
3. `<input>`

The discovered element is the target for programmatic `.value =` assignment after a user makes a selection.

## Browse button

The button that opens the dialog **must** carry the attribute `data-button-action="select"`:

```html
<button type="button" class="btn btn-primary" data-button-action="select">
  <span class="icon-search" aria-hidden="true"></span>
  <span class="visually-hidden">Select</span>
</button>
```

The component binds and unbinds its click listener automatically as the element enters and leaves the DOM.

## Events

### `joomla-field-modal-select:open`

Fired on the component **before** the dialog is opened. The event is cancelable — call `event.preventDefault()` to abort opening.

- Bubbles: yes
- Cancelable: yes
- `event.detail`: none

### `change` (on the component)

Fired on the `<joomla-field-modal-select>` element after the user selects a value in the picker.

- Bubbles: yes
- Cancelable: no
- `event.detail`: `{ value: string, title: string }`

### `change` (on the inner field)

A standard `change` event is also dispatched on the inner field element (or its inner `<select>` when a `joomla-field-fancy-select` is used). This ensures framework reactivity (e.g. Choices.js listeners, Vue, Alpine) picks up the programmatic value change.

## PostMessage protocol

The picker page loaded inside the iframe must communicate back using `window.parent.postMessage`. The component only accepts messages originating from the same origin.

**User selected a value:**

```javascript
window.parent.postMessage(
  { messageType: 'joomla:content-select', id: 'selected-value', title: 'Human-readable label' },
  '*'
);
```

**User cancelled (close without selecting):**

```javascript
window.parent.postMessage({ messageType: 'joomla:cancel' }, '*');
```

:::tip
Joomla ships a ready-made asset `modal-content-select` that provides a small helper to send these messages from your picker template. Load it with `$wa->useScript('modal-content-select')` in the modal template and add `data-content-select`, `data-id`, and `data-title` attributes to your clickable items — the asset wires up the `postMessage` call for you.
:::

## Basic HTML usage

```html
<joomla-field-modal-select
    modal-url="index.php?option=com_example&view=items&layout=modal&tmpl=component"
    modal-title="Select an item">
  <div class="d-flex flex-nowrap gap-1">
    <input type="text" class="form-control flex-grow-1" name="myfield" value="">
    <button type="button" class="btn btn-primary" data-button-action="select">
      <span class="icon-search" aria-hidden="true"></span>
      <span class="visually-hidden">Select</span>
    </button>
  </div>
</joomla-field-modal-select>
```

## PHP field layout usage

A typical Joomla field layout loads the asset and renders the component:

```php
<?php
// In your layout file (e.g. layouts/joomla/form/field/myfield.php)

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;

defined('_JEXEC') or die;

extract($displayData);

/** @var \Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getDocument()->getWebAssetManager();
$wa->useScript('webcomponent.field-modal-select');
?>
<joomla-field-modal-select
    modal-url="<?php echo $this->escape(Route::_($modalUrl, false)); ?>"
    modal-title="<?php echo $this->escape(Text::_('COM_EXAMPLE_SELECT_ITEM')); ?>">
  <div class="d-flex flex-nowrap gap-1">
    <input
        type="text"
        class="form-control flex-grow-1"
        id="<?php echo $id; ?>"
        name="<?php echo $name; ?>"
        value="<?php echo $this->escape($value); ?>"
        <?php echo $readonly ? 'readonly' : ''; ?>
        <?php echo $disabled ? 'disabled' : ''; ?>>
    <button type="button" class="btn btn-primary" data-button-action="select">
      <span class="icon-search" aria-hidden="true"></span>
      <span class="visually-hidden"><?php echo Text::_('JSELECT'); ?></span>
    </button>
  </div>
</joomla-field-modal-select>
```

The `$modalUrl` variable is typically constructed by the `FormField` class and passed into the layout via `getLayoutData()`.

## Listening to the change event

```javascript
document.querySelector('joomla-field-modal-select')
  .addEventListener('change', (event) => {
    const { value, title } = event.detail;
    console.log('Selected:', value, title);
  });
```

Because the event bubbles you can also listen at a higher level, for example on the form, and use `event.target` to identify which field changed.

## Canceling the dialog open

```javascript
document.querySelector('joomla-field-modal-select')
  .addEventListener('joomla-field-modal-select:open', (event) => {
    if (!confirm('Are you sure you want to open the picker?')) {
      event.preventDefault();
    }
  });
```

## Real-world example: com_modules position picker

`com_modules` uses `joomla-field-modal-select` to let editors browse and pick a module position. The pattern shows all three pieces: the field class, the layout, and the modal template.

### 1 - Field class builds the modal URL

`ModulesPositioneditField` (in `administrator/components/com_modules/src/Field/ModulesPositioneditField.php`) constructs the picker URL and passes it to the layout:

```php
$linkPositions = (new Uri())->setPath(Uri::base(true) . '/index.php');
$linkPositions->setQuery([
    'option'                => 'com_modules',
    'view'                  => 'positions',
    'layout'                => 'modal',
    'tmpl'                  => 'component',
    'client_id'             => $clientId,
    Session::getFormToken() => 1,
]);
$data['modalUrl'] = (string) $linkPositions;
```

### 2 - Layout renders the component

`layouts/joomla/form/field/modulespositionedit.php` conditionally loads the asset and renders the web component with a `joomla-field-fancy-select` inside:

```php
$showBrowse = !$readonly && !$disabled && !empty($modalUrl);

/** @var \Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getDocument()->getWebAssetManager();
$wa->usePreset('choicesjs')
    ->useScript('webcomponent.field-fancy-select');

if ($showBrowse) {
    $wa->useScript('webcomponent.field-modal-select');
}
?>
<joomla-field-modal-select
    <?php if ($showBrowse) : ?>
    modal-url="<?php echo $this->escape(Route::_($modalUrl, false)); ?>"
    modal-title="<?php echo $this->escape(Text::_('COM_MODULES_SELECT_A_POSITION')); ?>"
    <?php endif; ?>>
  <div class="<?php echo $showBrowse ? 'd-flex flex-nowrap gap-1' : ''; ?>">
    <joomla-field-fancy-select
        <?php echo $showBrowse ? 'class="flex-grow-1"' : ''; ?>
        class="<?php echo $class; ?>"
        allow-custom
        search-placeholder="<?php echo $this->escape(Text::_('COM_MODULES_TYPE_OR_SELECT_POSITION')); ?>">
      <?php echo HTMLHelper::_('select.groupedlist', $positions, $name, [
          'id'          => $id,
          'list.select' => $value,
          'list.attr'   => implode(' ', $selectAttr),
      ]); ?>
    </joomla-field-fancy-select>
    <?php if ($showBrowse) : ?>
    <button type="button" class="btn btn-primary" data-button-action="select">
      <span class="icon-search" aria-hidden="true"></span>
      <span class="visually-hidden"><?php echo Text::_('JSELECT'); ?></span>
    </button>
    <?php endif; ?>
  </div>
</joomla-field-modal-select>
```

### 3 - Modal template sends the postMessage

`administrator/components/com_modules/tmpl/positions/modal.php` renders a list of positions as buttons. The `com_modules.admin-modules-positions-modal` script (built from `media_source/com_modules/js/admin-modules-positions-modal.es6.js`) listens for button clicks and sends:

```javascript
window.parent.postMessage(
  { messageType: 'joomla:content-select', id: positionValue, title: positionText },
  '*'
);
```

The `joomla-field-modal-select` component in the parent window receives this message, writes `positionValue` into the fancy-select, fires the `change` events, and closes the dialog.

## Choosing the right approach

Joomla ships two generic mechanisms for opening a picker modal and writing the result back into a field.

| | `joomla-field-modal-select` | `modal-content-select-field` |
|---|---|---|
| Type | Web component | Class-based / event delegation |
| Inner field | fancy-select → select → input (auto-discovered) | Two plain `<input>`s (`.js-input-value` / `.js-input-title`) |
| Button actions | `select` only | `select`, `create`, `edit`, `clear` |
| Show/hide on value | No | Yes (`data-show-when-value`) |
| Cancelable open event | **Yes** | No |
| Component-level `change` event | **Yes** (`{ value, title }`) | No |
| Works with `joomla-field-fancy-select` | **Yes** | No |

**Use `joomla-field-modal-select`** when the field only needs a single "Select" button, the inner field is or wraps a `<select>` (including `joomla-field-fancy-select` / Choices.js), or you need a component-level `change` event or a cancelable open event.

**Use `modal-content-select-field`** when the field needs a richer action set beyond browse-and-select — for example a "Create new" button, an "Edit selected" button, a "Clear" button, or show/hide UI regions that depend on whether a value is set. Most of Joomla's built-in content-picker fields (articles, categories, contacts, tags) follow this pattern.

:::note
The same web-component pattern used here is also found in `joomla-field-user`, which opens a user-picker modal. But that component is strongly scoped to user selection and is not a general-purpose picker.
:::
