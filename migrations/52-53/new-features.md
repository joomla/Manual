---
sidebar_position: 1
---

# New features

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

#### Media: a new folder for documents and other non image files
Until now by default Joomla had only `/images` folder in Media manager for upload.
Starting from 5.3 version Joomla have additional `/files` folder for non image files, for new installations.

Existing installations will not be affected. 
To add it to existing installation, need to:
- Configure **Media** component and set **Path to Files Folder** option to `files`;
- Configure **FileSystem - Local** plugin and add `files` to list of directories, additionally to existing `images`;


PR: https://github.com/joomla/joomla-cms/pull/43532

#### Form control fields

New methods to manage form control fields.
More detail at [Form Control fields](https://manual.joomla.org/docs/general-concepts/forms/manipulating-forms.md#control-fields)

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
