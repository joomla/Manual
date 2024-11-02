---
sidebar_position: 2
title: Building an SEF URL
---

Building an SEF URL
===================

The building of an SEF URL is initiated with a call like:

```php
use Joomla\CMS\Router\Route;
…
$url = Route::_('index.php?option=com_content&view=article&id=21&catid=50&lang=en-GB');
```

Here we provide the query parameters in the call, and it's the router's job to generate the SEF URL, which might end up something like:

```
http://localhost/joom/index.php/en/mountains/50-alps/21-mont-blanc
```

There are 2 main stages in generating this URL:
1. A preprocess stage to identify the menuitem upon which to base this URL, and
2. A build stage where the segments are built

Plus a tidy-up at the end.

## Preprocess Stage

The preprocess stage falls within the remit of the component router. The Joomla Site Router uses the `option` parameter in the `Route::_()` call to identify the component (`com_content` in this example).  It then looks to call the `preprocess` method of the component router:

```php
public function preprocess($query)
```

The query parameters are passed as an associative array rather than as a string, ie like:

```php
$query = array('view' => 'article', 'id' => '21', ...)
```

It's the job of the component router `preprocess` function to identify the menuitem to use and set it within the `$query` array:

```php
$query['Itemid'] = 13;
return $query;
```

The core Joomla components generally don't explicitly provide the `preprocess()` function within their component router, but instead specify `RouterView` configurations - this is something described in the next section - and then it is the Site Router itself which provides the `preprocess()` function, and we'll consider how it does this for `com_content`.

In this case the Site Router finds all the menuitems on the site which relate to `com_content` and chooses one of them to base the SEF URL upon. Note that the set of menuitems will include those which are hidden, but not those which are unpublished.

How does the router know which one of these menuitems to select? Actually, the logic for selecting the menuitem has changed over a number of releases, causing a few Joomla Stack Exchange questions to be raised on the topic. As a general guide, it seems to be based on whatever rule is present first within the `RouterView` rules.

Note that you can specify the menuitem id (ie `Itemid`) in the `Route::_()` call:

```php
$url = Route::_('index.php?option=com_content&view=article&id=21&Itemid=6); ?>
```

but **the router may well ignore this and base the URL on a completely different menuitem**.

However, the flexibility of Joomla is such that if you don't like the way it selects the menuitem then you can write a plugin to override the default functionality with your own defined algorithm, as shown in [system plugin router rules](../../building-extensions/plugins/plugin-examples/system-plugin-router-rules.md). 

The selected menuitem provides the starting segment for our SEF URL, based on the menuitem's Alias field. If the menuitem is in a submenu, then the aliases of the parent menuitems going up through the menu tree are prepended as segments also - this is actually the `route` property of the menuitem, described in [Menus and Menuitems](../menus-menuitems.md#properties-and-parameters).

Let's assume the menuitem selected is a top-level menuitem, points to an article category list, and has alias 'mountains'. Our segments array will then have a single element:

```
$segments = array('mountains')
```

What happens if there aren't any menuitems on the site which relate to the option specified in the `Route::_()` call?

In this case the router will base the SEF URL on the home menuitem (for that language if it's a multilingual site). 
It will then add on segments which point to the component etc to use. For example, if the component is `com_contact` 
you could end up with segments something like:

```
/en/component/contact/contact/me?Itemid=1
```

This is a bad situation and to be avoided at all costs! The link (if it works at all!) will end up with the home page 
formatting and modules. 

The situation can easily be avoided by specifying a hidden menuitem which is associated with that component. However,
extension developers don't necessarily have control over how administrators build their menu structures. 

## Build Stage
The build stage is largely within the remit of the component router, and the Site Router looks to call the `build` 
method of the component router:

```php
public function build(&$query)
```

The query parameters are passed as an associative array and should now have the menuitem `Itemid` set, eg:

```php
$query = array('Itemid' => '13', 'view' => 'article', 'id' => '21',  catid => '50', ...)
```

The job of the component router `build` function is to generate the array of segments for the SEF URL, based on the 
query parameters passed it. It should return the array of segments and unset any query parameters which are used:

```php
$segments = array('50-alps', '21-mont-blanc');
unset($query['view']);
unset($query['id']);
unset($query['catid']);
return $segments;
```

If you don't unset some of the query parameters then they're added into the URL (in the query part of the URL), eg:

```
http://localhost/joom/index.php/en/mountains/50-alps/21-mont-blanc?view=article&id=21
```

The component router has the freedom to decide what segments it's going to set. It just has to be able to parse these 
segments when the URL is clicked by the user. 

Traditionally Joomla has set the segment to be of the form `id:alias` of the item, but the `id` part can be removed 
(leaving just the `alias` as the segment) by setting (for `com_content`) the Global Configuration: 
Articles / Integration / Routing Remove IDs from URLs option. (Similarly for Contacts). The advantage of the `id:alias`
format is that a database lookup isn't required when parsing the incoming URL. If you just use the `alias` format on 
your component then ensure that there's an index on your `alias` field in the database. 

Generally if the menuitem points to a single item (like a single article, or a single contact) then it can just 
create a segment which is the `id:alias` (or just alias) of that item. 

If the menuitem points to a category list of items then it should provide the category `id:alias`, and it's common 
to include the parent categories up the category tree. This can be easily found using the CategoryNode `getPath()` 
method, described in [CategoryNode get Methods](../categories/using-categories-api.md#categorynode-get-methods). (If you're not using ids in the segments then remember that 
category aliases don't have to be unique throughout a Joomla instance; they just have to be unique across the 
categories at the same level in the hierarchy. Hence the category path is needed.)

In our example we've assumed that the menuitem relates to a category list, and we provide as segments:
- the `id-alias` ('50-alps') of the item's category (which we've assumed is at the top level of the category tree)
- the `id-alias` of the item ('21-mont-blanc').

Including the 'mountains' segment which was found in the `preprocess` function, we now have 3 segments:

```
/mountains/50-alps/21-mont-blanc
```

## Remainder of URL

By this stage all the hard work of generating the SEF URL has been done. All that remains is to add the language 
segment (again done by the Language Filter plugin on a multilingual site), and the domain and entry 
point (index.php) if required.