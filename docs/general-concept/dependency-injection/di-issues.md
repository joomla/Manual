---
title: Dependency Injection Issues
sidebar_position: 7
---
# Dependency Injection Issues
Dependency Injection was introduced in Joomla 4, with the intention of removing direct access to most key classes via `getInstance()` calls, including via `Factory::` calls, and many of these API calls are deprecated in Joomla 4. Note that not all `getInstance()` calls are deprecated; examples which are not deprecated include `Uri::getInstance()` and `Filter\InputFilter::getInstance()`. 

However, some issues do remain, which you should be aware of. Early versions of Joomla 5 still have a lot of these `getInstance` calls!

## Toolbar::getInstance()
The `Toolbar` class is used for managing the buttons on the forms within the Joomla administrator back-end. The [Toolbar API](https://api.joomla.org/cms-4/classes/Joomla-CMS-Toolbar-Toolbar.html) documentation seems to suggest that we should replace 
```php
$bar = Toolbar::getInstance('toolbar');
```
with
```php
$bar = Factory::getContainer()->get(ToolbarFactoryInterface::class)->createToolbar('toolbar');
```
However, this currently won't work. The problem is that all the other Joomla code uses `getInstance('toolbar')` to access the Toolbar class, including the code in administrator/modules/mod_toolbar/mod_toolbar.php which renders the toolbar. The `getInstance` method keeps track of the Toolbar instances in a local static variable `$instances`, and returns the same Toolbar instance on repeated invocations.

So if you use the second approach above you will get a Toolbar instance, but it won't be the same Toolbar instance as is stored in the `$instances` variable. It won't then be picked up by the Toolbar module, and so won't be rendered on the form. 

## Table::getInstance()
Usually a Table instance is created by the MVCFactory class by calling `getTable()` in your Model. However, there are other cases where you may want one:
- in your Table class code you may want another instance of your own component table to verify if an `alias` field entered by a user already exists
- you may wish to access the Table class of another component - eg of com_categories.

Neither of these is possible via your component's MVCFactory class as 
- it creates Table classes for your component alone, and,
- in your Table code by default you've no pointer back to MVCFactory class instance

However, you can obtain instances by a more convoluted route, eg for com_content 
```php
Factory::getApplication()->bootComponent('content')->getMVCFactory()->createTable($name, $prefix, $config);
```
You can also use this method to boot your own component, to get another instance of your own Table.

## Categories::getInstance()
If you use Categories in your component then you may want to use the Categories API, for example in a custom router, or in a site CategoryModel. The old method of calling
```php
$categories = Categories::getInstance(...); 
```
is deprecated.

You can get a CategoryFactory from your child DIC when you instantiate your Extension, but unfortunately it's not passed down via the MVCFactory class to your Model. One possible solution is to store the CategoryFactory reference as a static variable of your Extension class, as described in [Implementing Categories in your Component](../../using-core-functions/categories/implementing-categories-in-components.md).