---
sidebar_position: 1
title: Parsing an SEF URL
---
# Parsing an SEF URL

Using the following SEF URL let's consider what the parse function involves: 

```
http://localhost/joom/index.php/en/mountain/21-mont-blanc
```

Once it's parsed we want to end up with an array of query parameters (option, view, layout, lang, etc) which enables Joomla to know what component to call (the option parameter), and the other parameters give the component the necessary details to construct the HTML (or json or xml etc) output. 

`http://localhost/joom` - this is the base of the Joomla instance. This is removed as it's common to all the URLs on the site and not relevant for routing.

`index.php` - this is the entry point (and may be missing, depending upon how the site is configured). It also is removed as it's not relevant for routing.

What we are left with are 3 segments:

`/en/mountain/21-mont-blanc`

Internally Joomla uses 2 arrays to hold the segments and the query parameters (aka query variables). At this stage we've got:

```
$segments = array('en', 'mountain', '21-mont-blanc')
$queryVars = array()
```

Next the Language Filter plugin gets involved. When this plugin is instantiated it injects a "rule" into the Site Router, which basically says to the router "when you start processing the segments then please call my `parseRule()` function". When `parseRule()` is called it recognises 'en' as a valid language code (which on my site equates to 'en-GB'), removes it from the `$segments` and adds the language to the query parameters. Now after this stage we've got

```
$segments = array('mountain', '21-mont-blanc')
$queryVars = array('lang' => 'en-GB')
```

Next the router tries to match the first element of the `$segments` array (ie 'mountain') with the Alias field of a top-level menuitem in one of the site menus. 

If it doesn't find one then it raises an exception and an HTTP status 404 (page not found) is returned. 

If it does find it then it checks if this menuitem has a submenu below it, and tries to match the next segment ('21-mont-blanc') with the Alias fields of the submenu items. It continues this, going down any submenu chain and trying to match successive segments to find the lowest possible menuitem.

Let's assume that it matches a menuitem with alias 'mountain', but there are no submenu items below it. Let's also assume that the id of this menuitem is 6. As the 'mountain' segment has now been matched, it's removed from the `$segments` and the id of the menuitem is included in the query variables:

```
$segments = array('21-mont-blanc')
$queryVars = array('lang' => 'en-GB', 'Itemid' => '6')
```

Also if you look at the Link fields associated with menuitems in the admin back-end then you'll see that there are often other variables associated with the menuitem. For example, you might have:

```
Link: index.php?option=com_content&view=article&id=10
```
So now there are other variables to include in the query variables:

```
$segments = array('21-mont-blanc')
$queryVars = array('lang' => 'en-GB', 'Itemid' => '6', 'option' => 'com_content', 'view' => 'article', 'id' => '10')
```

As an aside, the identification of the menuitem is important for a number of reasons. Not only does it identify the component to use (eg `option=com_content`), but also defines much of the formatting of the web page, including the modules which will appear on that page, and the template which will be applied to that page (that is, unless a "?template=anothertemplate" parameter has been included in the URL). 

Once this menuitem has been found the router sets it as the "active" menuitem using the Menu `setActive()` function. This means that other code can obtain this menuitem easily using `getActive()` (as described in [Menus and Menuitems](../menus-menuitems.md#active-menu-item)). 

At this stage the Site Router has gone as far as it can. It now looks to hand the remaining segments over to a component router to parse. When you write a component which uses SEF URLs you will almost always have to provide a component router, and this includes providing a `parse()` function:

```php
public function parse(&$segments)
``` 

The router passes the segments by reference, and expects the component router's `parse` function to process the passed segments to identify the query variables, and then to
- unset the segments which have been used (if there are any remaining segments after this stage then the router will cause an HTTP 404 page not found exception to be generated) and
- return the array of query variables identified.

For example, if our site displays mountains, and menuitem with Itemid=6 links to an article on Everest (with article id = 10), but our Mont Blanc article has id = 21, then the parse function will be called with

```
$segments = array('21-mont-blanc')
```

and the code should have something like:

```php
unset($segments[0]);
$vars = array('view' => 'article', 'id' => '21-mont-blanc');
return $vars;
```

It's ok to return an id of '21-mont-blanc' because the variable will be passed through an `int` filter, which ignores anything after the 21. Also, it's best to specifically return the 'view' (and other variables such as 'layout') and not rely on the router merging these values from the menuitem. 

After this stage our URL parsing is complete and we've ended up with:

```
$segments = array()
$queryVars = array('lang' => 'en-GB', 'Itemid' => '6', 'option' => 'com_content', 'view' => 'article', 'id' => '21')
```

Joomla now has all it needs to service the request:
- the language INI files to use will be those for `en-GB`
- from the menuitem `Itemid` it knows details of formatting the page, including which template to use, and which modules to included
- the component to use is `com_content`, and it knows the `view` to use, and the `id` of the article to display.