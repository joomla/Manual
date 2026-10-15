---
sidebar_position: 1
---

New Features
============

:::tip[Developer Note]
Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

## Explicit build and parse callbacks for the component router

- PR: https://github.com/joomla/joomla-cms/pull/48148
- Description: Until now, `RouterView` and its rules (`StandardRules` and `NomenuRules`) found the methods that turn an ID into a URL segment and back by their names. They called `get<ViewName>Segment()` and `get<ViewName>Id()` on the router if those methods existed. Static code analysis and IDEs can't follow these "magic" method names, so they were hard to understand and easy to get wrong. Every router also had to repeat the same category handling and add empty or proxy methods for views like `categories` or `form`.

  `RouterViewConfiguration` now has two new methods, `setBuildCallback()` and `setParseCallback()`. They let you set these callbacks explicitly for each view. A callback can be any PHP callable, so it doesn't have to be a method of the router class. It can also be replaced from outside the router, for example by a plugin that changes the view configuration.

    - The **build callback** gets the ID of the item and the query built so far, and returns the segment(s) for the item, for example `[42 => '42:my-article']`. For nestable views it returns the whole path, for example the category path.
    - The **parse callback** gets the segment and the query variables found so far, and returns the ID of the item. If the segment doesn't match, it returns `false`.

  If a view has no callback, the router falls back to the `get<ViewName>Segment()` and `get<ViewName>Id()` methods as before, so existing routers keep working without changes.

  ```php
  $article = new RouterViewConfiguration('article');
  $article->setKey('id')
      ->setParent($category, 'catid')
      ->setParseCallback([$this, 'getArticleId'])
      ->setBuildCallback([$this, 'getArticleSegment']);
  $this->registerView($article);
  ```

  The new `Joomla\CMS\Component\Router\CategoryCallbackTrait` contains the standard category handling that the core routers used to repeat. It provides `getCategorySegment()` and `getCategoryId()`, which you can use as build and parse callbacks for your `category` and `categories` views. Set the category factory in the router's constructor with `setCategoryFactory()`. You can then remove your own `getCategorySegment()`, `getCategoriesSegment()`, `getCategoryId()`, `getCategoriesId()` and `getCategories()` methods and the `$categoryFactory` and `$categoryCache` properties from your router.

  ```php
  use Joomla\CMS\Component\Router\CategoryCallbackTrait;
  use Joomla\CMS\Component\Router\RouterView;
  use Joomla\CMS\Component\Router\RouterViewConfiguration;

  class Router extends RouterView
  {
      use CategoryCallbackTrait;

      protected $noIDs = false;

      public function __construct(SiteApplication $app, AbstractMenu $menu, CategoryFactoryInterface $categoryFactory)
      {
          $this->setCategoryFactory($categoryFactory);
          $this->noIDs = (bool) ComponentHelper::getParams('com_example')->get('sef_ids');

          $categories = new RouterViewConfiguration('categories');
          $categories->setKey('id')
              ->setParseCallback([$this, 'getCategoryId'])
              ->setBuildCallback([$this, 'getCategorySegment']);
          $this->registerView($categories);

          $category = new RouterViewConfiguration('category');
          $category->setKey('id')
              ->setParent($categories, 'catid')
              ->setNestable()
              ->setParseCallback([$this, 'getCategoryId'])
              ->setBuildCallback([$this, 'getCategorySegment']);
          $this->registerView($category);

          // ... register your other views

          parent::__construct($app, $menu);

          $this->attachRule(new MenuRules($this));
          $this->attachRule(new StandardRules($this));
          $this->attachRule(new NomenuRules($this));
      }
  }
  ```

