---
sidebar_position: 2
---

New deprecations
================

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new deprecations that should be aware of and what you should now be using instead.

## Class deprecations

Planned to be removed in Joomla! 7.0.

### AbstractView::get()
#### Short version
`AbstractView::get()` is deprecated and will be removed in 7.0. Use the following code instead:
```php
$model = $this->getModel();
$this->items = $model->getItems();
```
#### Explanation
Joomla and most extensions have extensively been using `Joomla\CMS\MVC\View\AbstractView::get()` in all views. From 5.3 onwards, this method is deprecated and is going to be removed in Joomla 7.0.

This code in the past was used to retrieve data from the model. It was included in the `HtmlView.php` and often looked like this:
```php
public function display($tpl = null)
{
    $this->items = $this->get('Items');
    $this->pagination = $this->get('Pagination');

    parent::display($tpl);
}
```
This code in the view called the method `get<FirstArgument>` on the model and returned the result. If the model didn't have such a method, it returned the classes attribute named by the first argument.

The downside of this is an indirection which no IDE and static code analyser can understand and which hides errors. The better solution is to call the model directly, making it easy for an IDE to understand the code. The new code should look like this:
```php
public function display($tpl = null)
{
    /** @var ArticlesModel $model */
    $model = $this->getModel();
    $this->items = $model->getItems();
    $this->pagination = $model->getPagination();

    parent::display($tpl);
}
```
The first line is a docblock comment, which provides a hint for the IDE for the actual model that is used. The second line will retrieve the model set in the view. If you have more than one model in a view, you can provide it with a parameter to select the right model. The last two lines retrieve the actual data from the model. With the first two lines, IDEs can hint at the available methods in the model and now the returned values from those methods, making it possible to find issues further down the line.

## AdminModel::postProcessStore()

**namespace**: \Joomla\CMS\MVC\Model;

PR [#40613](https://github.com/joomla/joomla-cms/pull/40613)

postStoreProcess() replaced by postStore() preferred method, adds TableInterface to method.

```php title="New method AdminModel::postStore() replaces AdminModelpostStoreProcess()"
public function postStoreProcess(TableInterface $table, $newTags = [], $replace = true)
{
    $this->postStore($table, $newTags, $replace);
}
```

## AdminModel::batchTag()

**namespace**: \Joomla\CMS\MVC\Model;

PR [#40613](https://github.com/joomla/joomla-cms/pull/40613)

batchTag() method replaced with batchTags preferred method providing more accurate descriptive title.

```php title="New method AdminModel::batchTags() replaces AdminModelbatchTag()"
protected function batchTag($value, $pks, $contexts)
{
    return $this->batchTags($value, $pks, $contexts);
}
```
