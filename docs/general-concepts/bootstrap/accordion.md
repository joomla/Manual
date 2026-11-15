---
sidebar_position: 3
title: Accordion
---

Accordion
=========

The Bootstrap helper provides a set of functions which output the HTML for a
[Bootstrap accordion](https://getbootstrap.com/docs/5.3/components/accordion/):

| Function                   | Parameters                                  | Output                                   |
|----------------------------|---------------------------------------------|------------------------------------------|
| `bootstrap.startAccordion` | `$selector`, `$options`                     | The start of the accordion               |
| `bootstrap.addSlide`       | `$selector`, `$text`, `$id`, `$class`       | The start of a slide                     |
| `bootstrap.endSlide`       |                                             | The end of a slide                       |
| `bootstrap.endAccordion`   |                                             | The end of the accordion                 |

where

- `$selector` - the id of the accordion (without a leading `#`), which must be the same in `startAccordion` and `addSlide`

- `$options` - an array of options, described below

- `$text` - the text of the button which opens and closes the slide

- `$id` - the id of the slide

- `$class` - (optional) a CSS class to add to the slide

For example:

```php
<?php
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
?>
<?php echo HTMLHelper::_('bootstrap.startAccordion', 'landmarkAccordion', ['active' => 'history']); ?>

<?php echo HTMLHelper::_('bootstrap.addSlide', 'landmarkAccordion', Text::_('COM_EXAMPLE_SLIDE_HISTORY'), 'history'); ?>
    <p>The content of the History slide</p>
<?php echo HTMLHelper::_('bootstrap.endSlide'); ?>

<?php echo HTMLHelper::_('bootstrap.addSlide', 'landmarkAccordion', Text::_('COM_EXAMPLE_SLIDE_ACCESS'), 'access'); ?>
    <p>The content of the Access slide</p>
<?php echo HTMLHelper::_('bootstrap.endSlide'); ?>

<?php echo HTMLHelper::_('bootstrap.endAccordion'); ?>
```

The value of `$text` is output as it is, so make sure that you escape any text in it which comes from user input.

The options of `startAccordion` are:

| Option   | Type    | Description                                                                                 |
|----------|---------|---------------------------------------------------------------------------------------------|
| `active` | string  | The `$id` of the slide which is open when the page loads. If you don't set it, then all the slides are closed |
| `parent` | boolean | If `true`, then opening a slide closes the slide which is open, so that only one slide is open at a time. By default each slide opens and closes independently |

:::note
  If you set the `parent` option, then the `active` slide isn't opened when the page loads,
  and all the slides start closed.
:::

## Writing the HTML of the accordion yourself

If you want to write the HTML of the accordion yourself, as described in the
[Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/accordion/),
then just load the collapse script, which the accordion uses:

```php
HTMLHelper::_('bootstrap.collapse');
```

The slides then open and close through their `data-bs-toggle="collapse"` attributes,
and you can give each slide a `data-bs-parent` attribute to allow only one slide to be open at a time.
