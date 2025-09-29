---
sidebar_position: 1
---

New Features
============

All the new features that have been added to this version.
Any changes in best practice.

## Media: New Folder for Documents and Other Non-Image Files
Until now by default Joomla had only `/images` folder in Media manager for upload.
Starting from 5.3 version Joomla have additional `/files` folder for non image files, for new installations.

Existing installations will not be affected. 
To add it to existing installation, need to:
- Configure **Media** component and set **Path to Files Folder** option to `files`;
- Configure **FileSystem - Local** plugin and add `files` to list of directories, additionally to existing `images`;


PR: https://github.com/joomla/joomla-cms/pull/43532

## Form Control Fields

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

## New `BeforeUpdateSiteDownloadEvent`

A new event is available where an installer plugin can hook in before an update site url is fetched. Similar to what we have for package download of an extension.

PR: https://github.com/joomla/joomla-cms/pull/44516

The event can be used like:
```php
public function onInstallerBeforeUpdateSiteDownload(\Joomla\CMS\Event\Installer\BeforeUpdateSiteDownloadEvent $event): void
{
    $event->updateUrl($event->getUrl() . '?auth=foo');
}
```

## Media: Allow Thumbnails for Any File Type

The changes allow to add thumbnail for any file type: video, pdf, audio etc. Previously it was worked only for images.

PR: https://github.com/joomla/joomla-cms/pull/44847


## com_ajax: Support for Stringable Result

Allows to customise the response for com_ajax, with help of `Joomla\CMS\String\StringableInterface`.

PR: https://github.com/joomla/joomla-cms/pull/43530

Example of Module helper getAjax() method, with `&format=json` request.
**Before:**
```php
function getAjax() {
    echo json_encode(['title' => 'Foo', 'text' => 'Bar']);
    exit;
}
```
**After:**
```php
function getAjax() {
    $result = new class() implements \Joomla\CMS\String\StringableInterface {
        public $title = '';
        public $text = '';
        
        public function __toString(): string
        {
          return json_encode($this);
        }
    };
    
    $result->title = 'Foo';
    $result->text = 'Bar';
    
    return $result;
}
```

Example of customised `Joomla\CMS\Response\JsonResponse` response:

```php
function getAjax() {
    $data   = $this->getData(); //... code to load your data
    $result = new class($data, null, false, false) extends \Joomla\CMS\Response\JsonResponse implements \Joomla\CMS\String\StringableInterface {};
   
    return $result;
}
```
