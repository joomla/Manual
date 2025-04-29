---
sidebar_position: 3
title: RouterView
---

RouterView
==========

Writing the router preprocess, parse and build functions for your component can be a challenging task. If your component broadly follows the example of `com_content` in having items which are grouped by categories then using RouterView configurations can save you a lot of work.

On the other hand, if you find it doesn't work then it's practically impossible to debug to find where things have gone wrong, and you're better just using the preprocess, parse and build functions.

Personally I would recommend that you try the RouterView configuration approach and see if you can get it to work for your component. You might need to experiment a little! If you can't get it to work after a few days then revert to using the standard preprocess, build and parse functions.

## RouterView Configurations
To build the RouterView configurations you need it's easiest to follow an example, such as for `com_content` in components/com_content/src/Service/Router.php.

For each of your component's views - for `com_content` these are the folders under components/com_content/tmpl - you need to specify a `RouterViewConfiguration`, eg

```php
$this->registerView(new RouterViewConfiguration('featured'));
```

If your view doesn't have any other associated query parameters, then that's all you need to do.

A more complex example is for the `article` view (as in components/com_content/tmpl/article)

```php
$article = new RouterViewConfiguration('article');
$article->setKey('id')->setParent($category, 'catid');
$this->registerView($article);
```
This `com_content` view can be reused for different articles, the key being the `id` query parameter. Associated with the internal URL you can also have a category - identified by 'catid'. 

If we follow up the `setParent()` tree we can see the `setNestable()` against the categories, which means that we can get a series of category segments associated with the path in the category tree.

Also on the 'category' view there's an additional layout `addLayout('blog')` (for the category blog types of menuitems) - which is in addition to the default layout (for the category list menuitems).

This configuration is used by the router to enable it to understand what to expect in the query parameters, and what those parameters mean. 

## Rules
The next lines of code specify which router functions you want to include:

```php
$this->attachRule(new MenuRules($this));
$this->attachRule(new StandardRules($this));
$this->attachRule(new NomenuRules($this));
```

- MenuRules – this is the `preprocess()` code which is used during the building of an SEF URL to determine which menuitem to base the URL upon.
- StandardRules - this is the `build()` and `parse()` functions for the case where a menuitem has been found.
- NomenuRules - this is the `build()` and `parse()` functions for the case where a menuitem has not been found. So this is the case described in the previous section where you are ending up with segments like

```
/en/component/contact/contact/me?Itemid=1
```

This is how these rules relate to the 3 functions involved in the component router - preprocess(), build() and parse():

| Rule type     | preprocess |   build   |   parse   |
| --------------|------------|-----------|-----------|
| MenuRules     |  &check;   |           |           |
| StandardRules |            |  &check;  |  &check;  |
| NomenuRules   |            |  &check;  |  &check;  |

A big advantage of Joomla structuring the code this way is that if you don't like how Joomla handles one of these routing aspects then you can write your own code and get it used (eg by `com_content`) instead of the Joomla-supplied version, as shown in [system plugin router rules](../../building-extensions/plugins/plugin-examples/system-plugin-router-rules.md).

## Segments and query variables
The third aspect of RouterView configurations enables the router to convert between the segments of the SEF URL and the associated id of the query parameters. So for each RouterView configuration (ie for each view) you need to write 2 callback functions:
- `get<Viewname>Segment` - passes an id and asks you to return the associated segment or segments
- `get<Viewname>Id` - passes a segment and asks you to return the associated id

In addition you're passed a `$query` parameter representing the current state of the request being built or parsed.
