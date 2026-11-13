---
sidebar_position: 2
title: Tabs
---

Tabs
====

The Bootstrap helper provides a set of functions which output the HTML for a set of
[Bootstrap tabs](https://getbootstrap.com/docs/5.3/components/navs-tabs/#javascript-behavior):

| Function                | Parameters                                 | Output                                   |
|-------------------------|--------------------------------------------|------------------------------------------|
| `bootstrap.startTabSet` | `$selector`, `$params`                     | The start of the tab set                 |
| `bootstrap.addTab`      | `$selector`, `$id`, `$title`               | The start of a tab panel                 |
| `bootstrap.endTab`      |                                            | The end of a tab panel                   |
| `bootstrap.endTabSet`   |                                            | The end of the tab set                   |

where

- `$selector` - the id of the tab set (without a leading `#`), which must be the same in `startTabSet` and `addTab`

- `$params` - an array, in which `active` is the `$id` of the tab which is shown when the page loads

- `$id` - the id of the tab panel

- `$title` - the text shown on the tab

For example:

```php
<?php
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
?>
<?php echo HTMLHelper::_('bootstrap.startTabSet', 'landmarkTabs', ['active' => 'details']); ?>

<?php echo HTMLHelper::_('bootstrap.addTab', 'landmarkTabs', 'details', Text::_('COM_EXAMPLE_TAB_DETAILS')); ?>
    <p>The content of the Details tab</p>
<?php echo HTMLHelper::_('bootstrap.endTab'); ?>

<?php echo HTMLHelper::_('bootstrap.addTab', 'landmarkTabs', 'location', Text::_('COM_EXAMPLE_TAB_LOCATION')); ?>
    <p>The content of the Location tab</p>
<?php echo HTMLHelper::_('bootstrap.endTab'); ?>

<?php echo HTMLHelper::_('bootstrap.endTabSet'); ?>
```

`startTabSet` outputs an empty `<ul>` with id `landmarkTabsTabs` and a `<div>` with id `landmarkTabsContent`
which contains the tab panels.
When the page loads, the Joomla tab script builds the tabs within the `<ul>` from the titles of the panels.

Always set the `active` parameter:
if you don't, then no panel is shown until the user clicks one of the tabs.

## Writing the HTML of the tabs yourself

If you want to write the HTML of the tabs yourself, as described in the
[Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/navs-tabs/#javascript-behavior),
then just load the tab script:

```php
HTMLHelper::_('bootstrap.tab');
```

The tabs then work through their `data-bs-toggle="tab"` attributes.

## Joomla tabs

As an alternative to the Bootstrap tabs, Joomla has its own `joomla-tab` web component, which is used for the tabs
in the forms of the administrator area.
These tabs switch to an accordion on narrow screens, and they can remember which tab was last open.
You create them with the `uitab` functions, which take the same parameters as the Bootstrap functions above:

```php
<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', ['active' => 'details', 'recall' => true, 'breakpoint' => 768]); ?>

<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'details', Text::_('COM_EXAMPLE_TAB_DETAILS')); ?>
    <p>The content of the Details tab</p>
<?php echo HTMLHelper::_('uitab.endTab'); ?>

<?php echo HTMLHelper::_('uitab.endTabSet'); ?>
```

where, in the `startTabSet` parameters:

- `recall` - if this key is present (whatever its value), then the tab which was last open is shown again
when the page is reloaded during the same browser session

- `breakpoint` - the screen width in pixels below which the tabs are shown as an accordion (default 768)

- `orientation` - `horizontal` (the default) or `vertical`
