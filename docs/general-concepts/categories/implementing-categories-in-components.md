---
sidebar_position: 3
title: Implementing Categories in your Component
---
# Implementing Categories in your Component
It's quite straightforward to implement categories in a custom component. Here is a summary of what you have to do.

## Specify a category id column in your component's database table
All the category data is held in the Categories table; you just have specify a foreign key to the appropriate Categories record, so you will have to create an extra column in your component table to hold the key. It's usual to call your column 'catid', but you don't have to. It matches the 'id' field of the Categories table. 

## Add a field to capture the category
Where you allow users to add new records or edit existing records you'll want to extend the form to capture the associated category. You can add something like what's below to the XML file for adding or editing your component records:

```xml
<field
    name="catid"
    type="category"
    extension="com_yourcomponent"
    class="inputbox"
    default=""
    label="JCATEGORY"
    required="true"
    >
    <option value="0">JOPTION_SELECT_CATEGORY</option>
</field>
```

Provided you call the `name` of the field the same as the name of your database column Joomla will map the data from the submitted form through to the database table for you.

## Add entries in the administrator submenu
You should add an entry in your component's submenu to enable administrators to manage the category data. You can do this within the administrator `<submenu>` tags in your component manifest XML file:

```xml
<administration>
    <submenu>
        <menu link="option=com_categories&amp;extension=com_yourcomponent">JCATEGORIES</menu>
    </submenu>
</administration>
```

## Specify ACLs for the Categories
You need to access some entries into your access.xml, eg

```xml
<?xml version="1.0" encoding="utf-8" ?>
<access component="com_yourcomponent">
    <section name="component">
            <action name="core.admin" title="JACTION_ADMIN"/>
            <action name="core.manage" title="JACTION_MANAGE"/>
            <action name="core.create" title="JACTION_CREATE"/>
            <action name="core.delete" title="JACTION_DELETE"/>
            <action name="core.edit" title="JACTION_EDIT"/>
            <action name="core.edit.state" title="JACTION_EDITSTATE"/>
    </section>
    <section name="category">
            <action name="core.create" title="JACTION_CREATE"/>
            <action name="core.delete" title="JACTION_DELETE"/>
            <action name="core.edit" title="JACTION_EDIT"/>
            <action name="core.edit.state" title="JACTION_EDITSTATE"/>
    </section>
</access>
```

## Category Summary by Published State
On the administrator Categories form it's usual to display for each category record the number of your component records which have Published / Unpublished / Archived / Trashed state. To implement this `com_categories` boots your component and calls the `countItems()` function (defined in Joomla\CMS\Categories\CategoryServiceInterface) on your Extension class instance. You can either provide the `countItems()` function directly or (if your category field is called `catid`) use the Joomla\CMS\Categories\CategoryServiceTrait and override 
- getTableNameForSection – return your component's tablename, 
- getStateColumnForSection – return the column which holds the state (eg 'published').

com_categories would then perform the query on your component's table itself. 

## Create an Uncategorised Category
You may have noticed that when you first install Joomla there's an Uncategorised category record for each of the Joomla core components which uses categories. Also that the `catid` field in their database tables does not allow NULL – there has to be an associated category record for each of the component's items.

You should follow this pattern, setting up your component's Uncategorised category record in your install script. Otherwise you are likely to find difficulties in some areas (multilingual associations for one) because Joomla library code sometimes assumes that an associated category is not optional.

## Other Changes
There are a variety of other changes which you would might wish to make, depending upon the functionality in your component, for example:
- if you have a form which displays your component items and their attributes, you will probably want to extend this to include the category
- also include the category within the list of filter fields for this form
- batch operations associated with categories

## Getting the CategoryFactory
If you're planning to support SEF routes in your component then you'll need a custom router, and this will involve using the Categories API to build and parse the categories segments of the SEF route. You may also wish to use the Categories API for other reasons, eg displaying category detail in a Category view of your component.

The preferred way of getting access to the Categories object is by instantiating it from a CategoryFactory object, and by obtaining this CategoryFactory object via the Dependency Injection Container (DIC). To do this you can use the following approach.

The services/provider.php file below is for a component `com_example`, with namespace `Mycompany\Component\Example` (as defined in the xml manifest file). The lines relating to obtaining the CategoryFactory have been commented to explain what's going on.

```php
<?php

defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory as ComponentDispatcherFactoryServiceProvider;
use Joomla\CMS\Extension\Service\Provider\CategoryFactory as CategoryFactorServiceProvider;
use Joomla\CMS\Extension\Service\Provider\MVCFactory as MVCFactoryServiceProvider;
use Joomla\CMS\Extension\Service\Provider\RouterFactory as RouterFactoryServiceProvider;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\CMS\Categories\CategoryFactoryInterface;
use Joomla\CMS\Component\Router\RouterFactoryInterface;
use Mycompany\Component\Example\Administrator\Extension\ExampleComponent;
use Joomla\Database\DatabaseInterface;


return new class implements ServiceProviderInterface {
    
    public function register(Container $container): void 
    {
        
        /* The line below will call register() in libraries/src/Extension/Service/Provider/CategoryFactory.php
            * That function will create an entry in our component's child DIC with:
            *   key = 'Joomla\CMS\Categories\CategoryFactoryInterface'
            *   value = a function which will 
            *      1. create an instance of CategoryFactory, instantiated with the namespace string passed in
            *      2. call setDatabase() on that CategoryFactory instance, so that it's got access to the database object
            *      3. return the CategoryFactory instance
            */
        $container->registerServiceProvider(new CategoryFactorServiceProvider('\\Mycompany\\Component\\Example'));
        $container->registerServiceProvider(new MVCFactoryServiceProvider('\\Mycompany\\Component\\Example'));
        $container->registerServiceProvider(new ComponentDispatcherFactoryServiceProvider('\\Mycompany\\Component\\Example'));
        $container->registerServiceProvider(new RouterFactoryServiceProvider('\\Mycompany\\Component\\Example'));
        $container->set(
            ComponentInterface::class,
            function (Container $container) {
                // The next line creates an instance of our com_example component Extension class
                $component = new ExampleComponent($container->get(ComponentDispatcherFactoryInterface::class));
                $component->setMVCFactory($container->get(MVCFactoryInterface::class));
                /* The line below will get from the DIC the entry with key 'Joomla\CMS\Categories\CategoryFactoryInterface'
                    * The CategoryFactory instance will be returned, and we'll save a reference to it in our component by
                    * calling setCategoryFactory(), passing it in as the parameter
                    */
                $component->setCategoryFactory($container->get(CategoryFactoryInterface::class));
                $component->setRouterFactory($container->get(RouterFactoryInterface::class));
                $component->setDatabase($container->get(DatabaseInterface::class));

                return $component;
            }
        );
    }
};
```

And to match this you need to have some key lines in your Extension class:

```php
<?php

namespace Mycompany\Component\Example\Administrator\Extension;

defined('JPATH_PLATFORM') or die;

use Joomla\CMS\Categories\CategoryServiceInterface;
use Joomla\CMS\Categories\CategoryServiceTrait;
use Joomla\CMS\Extension\BootableExtensionInterface;
use Joomla\CMS\Extension\MVCComponent;
use Psr\Container\ContainerInterface;
use Joomla\CMS\Component\Router\RouterServiceTrait;
use Joomla\CMS\Component\Router\RouterServiceInterface;
use Joomla\Database\DatabaseAwareTrait;

    
class ExampleComponent extends MVCComponent implements 
    CategoryServiceInterface, RouterServiceInterface, BootableExtensionInterface
{
    use CategoryServiceTrait;
    use RouterServiceTrait;
    use DatabaseAwareTrait;
    
    // Use a static variable to store the Categories instance
    public static $categories;

    public function boot(ContainerInterface $container)
    {
        self::$categories = $this->categoryFactory->createCategory();
    }
    // ...
```

The `CategoryServiceTrait` which is used is what contains the function `setCategoryFactory` which was used in services/provider.php to save the returned CategoryFactory. The function saves it in an instance variable `$categoryFactory`. 

Whenever Joomla wants to execute the component it runs the services/provider.php file (which creates the Extension instance) and then calls `boot()` on this Extension object. The code in `boot()` above accesses the stored CategoryFactory and calls `createCategory()` on it to create the `Categories` instance. The result of this is stored in a static variable which can be accessed anywhere in the component using 

`$categories = ExampleComponent::$categories;``

The CategoryFactory `createCategory()` code will use the namespace which was passed into it (originally in services/provider.php above) and will try to instantiate a class `<namespace>\Site\Service\Category`, raising an exception if it does not exist. So you need to provide a file within your site area src/Service/Category.php similar to the following:

```php
<?php

namespace Mycompany\Component\Example\Site\Service;

use Joomla\CMS\Categories\Categories;

\defined('_JEXEC') or die;

class Category extends Categories
{

    public function __construct($options = array())
    {
        $options['table']     = '#__example';
        $options['extension'] = 'com_example';

        parent::__construct($options);
    }
}
```

In this way the array of options for the [Categories API](https://manual.joomla.org/docs/using-core-functions/categories/using-categories-api) are defined. (You can pass these options as a parameter to the `createCategory()` call but you still have to provide your Category.php class file).

## Multiple Categories Fields
You can have multiple different types of categories associated with your component. For example, if you have a component com_product you can have 
- a size category – which may be small, medium, large etc, and,
- a price category – which may be cheap, medium, expensive etc.

To support this Joomla allows you to have sections within your component's partition of the Categories table, and your component's entries within that table will have the `extension` field set to "com_product.size" or "com_product.price".

To implement this in your component you'll obviously need 2 category columns in your component's database table eg catid1, catid2. 

There are some other changes you'll also need to implement.

### Administrator submenu
You'll need to have something like:

```xml
<menu link="option=com_categories&amp;extension=com_product.size">Size categories</menu>
<menu link="option=com_categories&amp;extension=com_product.price">Price categories</menu>
```

to create the 2 categories menuitems in the administrator submenu for your component. 

### Administrator edit item
In the administrator edit product xml form (where you define each product, and its associated size and price categories) your fields for capturing the categories must distinguish between them, eg

```xml
<field name=catid1 type="category" extension="com_product.size" …/>
<field name=catid2 type="category" extension="com_product.price" …/>
```

and similarly for any filter fields in `filter_products.xml` for filtering the list of products shown in the administrator products form.

### Category Summary.
In your Extension class you'll need to provide the `countItems()` function which is in the trait `Joomla\CMS\Categories\CategoryServiceTrait`. `com_categories` will call this function passing in the category `section`, and if you're using `ContentHelper::countRelations()` to provide the summary then you'll need to set the appropriate category id field for each section – eg 'catid1' for section 'size' and 'catid2' for section 'price'. An example is below.

```php
public function countItems(array $items, string $section)
{
    $config = (object) [
        'related_tbl'   => $this->getTableNameForSection($section),
        'state_col'     => $this->getStateColumnForSection($section),
        'group_col'     => $section == "size" ? 'catid1' : 'catid2',
        'relation_type' => 'category_or_group',
    ];

    ContentHelper::countRelations($items, $config);
}
```