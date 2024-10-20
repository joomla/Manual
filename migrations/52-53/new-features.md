---
sidebar_position: 1
---

# New features

#### com_ajax support Stringable result

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
