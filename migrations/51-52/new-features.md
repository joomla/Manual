---
sidebar_position: 1
---

# New features

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

#### Usability: Add total number of items to Page Navigation
This new feature adds a "total" counter at the bottom near the pagination in Joomla's back-end, 
displaying the number of items available after applying filters for easier item management.

PR: [43575](https://github.com/joomla/joomla-cms/pull/43575)

### com_ajax support Stringable result

Allows to customise the response for com_ajax.

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
    }
    
    $result->title = 'Foo';
    $result->text => 'Bar';
    
    return $result;
}
```

Example of customised `Joomla\CMS\Response\JsonResponse` response:

```php
function getAjax() {
    $data   = $this->getData(); //... code to load your data
    $result = new class($data, null, false, false) extends \Joomla\CMS\Response\JsonResponse implements \Joomla\CMS\String\StringableInterface {}
   
    return $result;
}
```

