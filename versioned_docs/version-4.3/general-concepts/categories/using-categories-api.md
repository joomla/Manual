---
sidebar_position: 2
title: Using the Categories API
---

# Using the Categories API

## Accessing the Categories class

To get access to the set of categories for `com_content` you can use:

```php
    use Joomla\CMS\Categories\Categories;
    ...
    $extension = "content";   // Note that you don't have the usual "com_" prefix in the extension. 
    $categories = Categories::getInstance($extension);
```

(This actually uses a deprecated API as the means of accessing the Categories class because it doesn't go via the Dependency Injection Container. However, it is a lot simpler, and an alternative method of using the DIC is described later). You can provide an associative array of options as a second parameter to the Categories static `getInstance()` method. The keys of this array are:

- "access" – if this is `true` (or some value which equates to PHP `true`) then only categories which the current user has access to view will be returned. If `false` then all categories will be returned, regardless of whether the current user has access to view them or not. The default is `true`.
- "published" – if this is 1 (integer one) then only categories which have a published state of 1 (ie 'published') will be returned. Otherwise categories of any state will be returned. The default is 1, meaning that only 'published' categories will be returned.
- "countitems" – if this is 1 (integer one) then when categories are returned Joomla will determine for each category record how many of the extension records are associated with that category (the default is not to count the items). To do this, Joomla will do a SQL JOIN with the extension table, WHERE the category id field in that table matches, and COUNTing the instances of a "key" field in that table. Joomla needs to know what these tables and fields are called, and these can be provided in the array options below.
- "table" – the name of the extension table. There is no default, so you must supply this if you're using "countitems".
- "field" – the name of the field in the extension table which holds the category id (default "catid")
- "key" – the name of the key field in the extension table over which the SQL COUNT is performed (default 'id').
- "statefield" – the name of the field in the extension table which holds the published status of the record (default 'state'). If Joomla is returning only published categories (as determined by the "published" option described above) then it will count over just published items in the extension table as well. (Note that the equivalent is NOT done for "access" – any Access field in the extension table is ignored).

Examples:

```php
$categories = Categories::getInstance("content", array("access" => false, "published" => 0));
```

Category nodes returned will not be restricted by Access or the Published state.

```php
$categories = Categories::getInstance("helloworld", array("countitems" => 1, "table" => "helloworld", "statefield" => "published"));
```

Category nodes of the "helloworld" component will include the number of associated records in the "helloworld" table, where the published state is held in a field called "published". 

## Categories get()

Once you have the `$categories` instance you can get `CategoryNode` instances using eg

```php
$categoryNodes = $categories->get(12);   // returns the category node for category with id=12
```

The Categories `get()` method takes as its first parameter the `id` of the category record to be read from the database and returns to the caller the corresponding `CategoryNode` object. If no `id` is given, then the method returns the `CategoryNode` object relating to the system `ROOT` record at the very top of the category tree in the database.

The `get()` functionality actually reads from the database all the ascendents of the requested category record up to the category `root` record (which enables the Category Path described below to be determined), as well as all the descendants of the requested category record. It then stores these locally so that subsequent calls to obtain data for any of those children can be served by returning the data from this cache rather than performing another query on the database.

However, if the second parameter `$forceload` is set to `true`, then it will service the request by querying the database again, rather than using the cached records.

In a multilanguage site the categories returned will be restricted to those of the current language or language * (for all). Similarly, any counting of items in the extension table will be restricted to those of the current language or language *, and Joomla will assume that the language is stored in field called "language" (you can't override what this language field is called). 

## CategoryNode Properties

The object from a call to the Categories `get($id)` method will be a `CategoryNode` object relating to the category with id `$id`. If you called `get()` using the default of 'root' then you will have to make a subsequent call to `getChildren()` to get an array of `CategoryNode` objects for the extension you want, eg:

```php
    use Joomla\CMS\Categories\Categories;
    use Joomla\CMS\Categories\CategoryNode;

    $categories = Categories::getInstance("content");
    $rootNode = $categories->get();   
    $categoryNodes = $rootNode->getChildren();
```

Once you have a `CategoryNode` object you can access the properties of this object as defined in the API definition, and these mostly relate closely to the category attributes visible in the Joomla admin forms. Properties where the meaning is fairly clear are not described below, but below is a list of those where the meaning may not be totally apparent.

- asset_id – where the administrator has defined ACLs for the individual category, then this is the id of the record in the asset table where these ACLs are stored.
- parent_id, lft, rgt, level – these fields relate to the category's position in the category tree, which is implemented using the [Nested Set](https://en.wikipedia.org/wiki/Nested_set_model) model. The `lft` and `rgt` values are implemented as required by the model, the `parent_id` is the id of the parent record in the category table (NOT in the asset table – this is a typo in the Joomla code), and the `level` is 0 for the root node, 1 for those records whose parent is the root node, 2 for the next level of descendants, etc.
- extension – this time the "com_" prefix is present
- numitems – the number of records in the extension table which are associated with this category
- childrennumitems – this isn't set – don't try to use it!
- slug – this is what Joomla has traditionally displayed as part of the URL when SEF URLs are displayed. It's of the form `id:alias`, for example "3:uncategorised".
- assets – this isn't set – don't try to use it!

## CategoryNode get Methods

A number of the CategoryNode `get` methods enable you to access other CategoryNode objects in the tree:

- `getChildren(boolean $recursive = false)` returns an array of the immediate children, or an array of all the descendants if `$recursive` = `true`.
- `getParent()` returns the parent CategoryNode
- `getSibling(boolean $right = true)` returns the sibling CategoryNode to the right, or to the left if `$right` = `false`.

A number of the `get` methods return properties of the CategoryNode object

- `getAuthor(boolean $modified_user = false)` returns the User object associated with the user who created the category, or the user who last modified the user if `$modified_user` = `true`
- `getMetadata()` returns a Joomla Registry object containing the category metadata (json structure)
- `getParams()` returns a Joomla Registry object containing the category params (json structure)
- `getNumItems(boolean $recursive = false)` returns the number of records in the extension table which are related to this category. If `$recursive` = `true` then it's the total number of records associated with this category and all of this category's descendants.
- `getPath()` returns an array of the slugs going from the root of the category tree down the tree to this category. For example, if this category has id 9 and alias "dog", its parent has id 6 and alias "mammal", and grandparent (immediately below the root) has id 3 and alias "animal" then `getPath()` will return `array(3 => "3:animal", 6 => "6:mammal", 9 => "9:dog"`).

Note that `hasParent()` includes the parent being the root node, so that a call to this method will always return `true` unless you're calling it on the root node.

## CategoryNode set Methods

There are a number of `set` methods of the CategoryNode API, but these are primarily used by the Joomla category functionality to set up the CategoryNode objects, based on data retrieved from the database. Calling one of these does not persist the data to the database, eg you can't use `setParent()` to reparent a category record under a different category parent in the database. 

## Sample Module Code

Below is the code for a simple Joomla module which you can install and run to demonstrate use of the Categories and CategoryNode API functionality. If you are unsure about development and installing a Joomla module then following the tutorial at [Creating a simple module](https://docs.joomla.org/J4.x:Creating_a_Simple_Module) will help. (Note that the code below doesn't follow best-practice guidelines regarding how to design a module, but it's simplified to showcase the categories APIs).

In a folder `mod_sample_categories` create the following 2 files:

`mod_sample_categories.xml` 
```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" version="3.1" client="site" method="upgrade">
    <name>Categories demo</name>
    <version>1.0.1</version>
    <description>Code demonstrating use of Joomla APIs related to Categories</description>
    <files>
        <filename module="mod_sample_categories">mod_sample_categories.php</filename>
    </files>
</extension>
```

`mod_sample_categories.php`
```php
<?php
defined('_JEXEC') or die('Restricted Access');

use Joomla\CMS\Factory;
use Joomla\CMS\Categories\Categories;
use Joomla\CMS\Categories\CategoryNode;

$app = Factory::getApplication();
$input = $app->input;
$ext = $input->get('categoryextension', "Content", "STRING");
$tab = $input->get('categorytable', "Content", "STRING");
echo "Getting {$ext} categories and using {$tab} table<br>";
echo "-------------<br>";

$categories = Categories::getInstance($ext, array("table" => "Content", "countItems" => 1, "access" => false));

$cat0 = $categories->get('root');

$cats = $cat0->getChildren(true);
foreach ($cats as $cat)
{
    echo "Category {$cat->id}, title: {$cat->title}<br>";
    $parent = $cat->getParent();
    echo "Level: {$cat->level}, parent id: {$cat->parent_id}, title: {$parent->title}<br>";
    echo "Numitems {$cat->getNumitems()}, including descendants: {$cat->getNumitems(true)}<br>";
    var_dump($cat->getPath());
    echo "-------------<br>";
}

$ext2 = $input->get('option', "", "STRING");
$catid = $input->get('catid', 0, "INT");
$view = $input->get('view', "", "STRING");
$id = $input->get('id', 0, "INT");
if ($ext2 && (strtolower(substr($ext2, 0, 4)) == "com_") && ($catid || (strtolower($view) == "category" && $id)))
{
    $ext2 = substr($ext2, 4);
    $categories2 = Categories::getInstance($ext2, array("access" => false));
    $categoryId = $catid ? $catid : $id; 
    echo "<br>Getting $ext2 category $categoryId<br>";
    $cat2 = $categories2->get($categoryId);
    if ($cat2)
    {
        echo "Category {$cat2->id}, title: {$cat2->title}<br>";
    }
}
```

Zip up the mod_sample_categories directory to create `mod_sample_categories.zip`.

Within your Joomla administrator go to Install Extensions and via the Upload Package File tab select this zip file to install this sample categories module.

Make this module visible by editing it (click on it within the Modules page) then:

1. making its status Published
2. selecting a position on the page for it to be shown
3. on the menu assignment tab specify the pages it should appear on

When you visit a site web page then you should see the module in your selected position, and it should show the set of com_content categories in the database and for each category:

- the id and title
- the level in the category tree and the id and title of the parent
- the number of articles which have this category set, and the number of articles which have this category or any of the category's descendants
- a `var_dump` of the category `getPath()` return value.

You can get categories for other components by adding the parameters `categoryextension` and `categorytable` to the URL, eg `...&categoryextension=contact&categorytable=contact_details` to get `com_contact` categories. Note that if you're trying to get the categories of a component which isn't one of the core Joomla components, then you may need to supply the component field names etc within the `options` to the `Categories::getInstance()` call, as described above.

The code also tries to guess if the page displayed relates to a category, by checking if there's a `catid` parameter in the URL, or if the `view` parameter is set to 'category'. In this case it shows the id and title of the associated category. Obviously this may not work correctly in all cases. 

## Getting Categories via the Dependency Injection Container

In general the preferred way to get access to the `Categories` class is via the DI container, and in particular by using a `CategoryFactory` class which is obtained via the DI container. Once you have a `CategoryFactory` you can call `createCategory($options)` on that instance and receive back a `Categories` object; the `$options` array is the set of options described at the top of this page. However, the `CategoryFactory` object has to be instantiated with the extension for which you want to access the categories, as the `createCategory()` will try to access the `\\<namespace prefix>\\Site\\Service\\Category` class in order to find the extension's database table etc.

A method of doing this for accessing `com_content` categories is by using the following in your services/provider.php file.

```php
<?php

defined('_JEXEC') or die;

use Joomla\CMS\Extension\Service\Provider\CategoryFactory;
use Joomla\CMS\Extension\Service\Provider\HelperFactory;
use Joomla\CMS\Extension\Service\Provider\Module;
use Joomla\CMS\Extension\Service\Provider\ModuleDispatcherFactory;
use Joomla\CMS\Dispatcher\ModuleDispatcherFactoryInterface;
use Joomla\CMS\Extension\ModuleInterface;
use Joomla\CMS\Helper\HelperFactoryInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Mycompany\Module\CategoriesDemo\Site\Extension\CategoriesDemoModule;
use Joomla\CMS\Categories\CategoryFactoryInterface;

return new class () implements ServiceProviderInterface {

    public function register(Container $container)
    {
        $container->registerServiceProvider(new CategoryFactory('\\Joomla\\Component\\Content'));
        $container->registerServiceProvider(new ModuleDispatcherFactory('\\Mycompany\\Module\\CategoriesDemo'));
        $container->registerServiceProvider(new HelperFactory('\\Mycompany\\Module\\CategoriesDemo\\Site\\Helper'));
        //$container->registerServiceProvider(new Module());
        $container->set(
            ModuleInterface::class,
            function (Container $container) {
                $module = new CategoriesDemoModule(
                    $container->get(ModuleDispatcherFactoryInterface::class),
                    $container->has(HelperFactoryInterface::class) ? $container->get(HelperFactoryInterface::class) : null
                );
                $module->setCategoryFactory($container->get(CategoryFactoryInterface::class));
                return $module;
            }
        );
    }
};
```

The line:

```php
$container->registerServiceProvider(new CategoryFactory('\\Joomla\\Component\\Content'));
```

will run the `register()` function in libraries/src/Extension/Service/Provider/CategoryFactory.php. This will create an entry in the DI container with key "Joomla\CMS\Categories\CategoryFactoryInterface", and as value a function which will return a CategoryFactory instantiated with the namespace prefix of `com_content`. 

The line:

```php
$module->setCategoryFactory($container->get(CategoryFactoryInterface::class));
```

will `get` this entry from the DI container (and so will get the CategoryFactory instance), and store it against our Extension `$module` via the `setCategoryFactory` call.

The above assumes that you set the namespace prefix of your own module in your module manifest file:

```xml
    <namespace path="src">Mycompany\Module\CategoriesDemo</namespace>
```

Then in your extension file (in the src/Extension/CategoriesDemoModule.php file of your module):

```php
<?php

namespace Mycompany\Module\CategoriesDemo\Site\Extension;

defined('JPATH_PLATFORM') or die;

use Joomla\CMS\Categories\CategoryServiceInterface;
use Joomla\CMS\Categories\CategoryServiceTrait;
use Joomla\CMS\Extension\BootableExtensionInterface;
use Psr\Container\ContainerInterface;
use Joomla\CMS\Extension\Module;
    
class CategoriesDemoModule extends Module implements CategoryServiceInterface, BootableExtensionInterface
{
    use CategoryServiceTrait;
    
    public static $categories;
    
    public function boot(ContainerInterface $container)
    {
        self::$categories = $this->categoryFactory->createCategory();
    }
    
    public static function getCategories()
    {
        return self::$categories;
    }
}
```

This is the Extension object which is created and returned as `$module` in the services/provider.php file. The function `setCategoryFactory` which was used there is in the `CategoryServiceTrait`, and that function stores the CategoryFactory as a local variable which can be accessed using `$this->categoryFactory`, or you could use:

```php
    self::$categories = $this->getCategory();
```

When your module is run Joomla will call your `boot()` function, and this sets up a static variable which holds the Categories instance. You can then access it via this static variable, eg:

```php
    use Mycompany\Module\CategoriesDemo\Site\Extension\CategoriesDemoModule;
    // ...
    $categories = CategoriesDemoModule::$categories;
```

Note however that 
- it's more problematic if (like the sample module code) you're determining in a dynamic fashion the extension whose categories you want to access, as this affects your line

    `$container->registerServiceProvider(new CategoryFactory('\\Joomla\\Component\\Content'));`

  when you load the entry into the DI container
- if you're wanting to access the categories of several component in your modules then this approach doesn't work as if you try to load both `com_content` and `com_contact` CategoryFactory classes by
  
    `$container->registerServiceProvider(new CategoryFactory('\\Joomla\\Component\\Content'));`
  
    `$container->registerServiceProvider(new CategoryFactory('\\Joomla\\Component\\Contact'));`
  
  This is because the second entry will overwrite the first as they both use the same key in the DI container.

Not all the issues regarding moving to using the DI container have been satisfactorily resolved!
