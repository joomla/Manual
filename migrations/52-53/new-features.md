---
sidebar_position: 1
---

# New features

#### Form control fields

New methods to manage form control fields.
More detail at [Form Control fields](/docs/general-concepts/forms/manipulating-forms.md#control-fields)

PR: https://github.com/joomla/joomla-cms/pull/43857

**Example**

Before:
```html
<input type="hidden" name="task" value="">
<input type="hidden" name="foo" value="bar">
<input type="hidden" name="return" value="<?php echo $input->getBase64('return'); ?>">
<?php echo HTMLHelper::_('form.token'); ?>
```

After:
```php
// Code in Controller/View
$this->form
  ->addControlField('task', '')
  ->addControlField('foo', 'bar')
  ->addControlField('return', $input->getBase64('return', ''));

// Code in the form layout
echo $this->form->renderControlFields();
```
