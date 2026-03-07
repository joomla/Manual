---
title: URLs
---

URLs
====

This guide gives an overview of the Joomla\CMS\Uri\Uri class, 
which is what Joomla uses internally to manage URLs.

The APIs of the Uri class are spread across the [CMS Uri API](cms-api://classes/Joomla-CMS-Uri-Uri.html)
and the [Framework Uri API](framework-api://classes/Joomla-Uri-Uri.html).
Unfortunately it's not feasible to consolidate them into a single web page.

There isn't a sample extension associated with this section, 
but you can include some of the code snippets below within the code of a step in the 
[Module Development Tutorial](../building-extensions/modules/module-development-tutorial/index.md)
to experiment. 

## Getting the Current URL

To get the URL of the current webpage do:

```php
use Joomla\CMS\Uri\Uri;
$uri = Uri::getInstance();
$url = $uri->toString();
```

The advantage of using this method is that it handles any peculiarities of the webserver 
(e.g. Apache or IIS) and also performs some cleaning of the URL to avoid some types of injection attacks. 

## URL Segments

What gets returned from `Uri::getInstance()` isn't a PHP string of the URL, but rather a Joomla `Uri` object.
This object holds internally the various segments of the URL, 
and provides getter and setter methods to read or write these URL parts as shown below. 

```
 http://fredbloggs:itsasecret@www.example.com:8080/path/to/Joomla/index.php?task=view&id=32#anchorthis
 \__/   \________/ \________/ \_____________/ \__/\_______________________/ \_____________/ \________/
  |          |         |              |        |              |                    |            |
scheme      user       pass          host      port          path                 query       fragment
```

| Get method | Set method | Description | Example |
| ---------- | ---------- | ----------- | ------- |
| getFragment | setFragment | Fragment (everything after the '#').  This is often referred to as an anchor. | anchorthis | 
| getHost | setHost | Hostname or IP address.  For example, 'www.joomla.org' or '192.168.2.45'. | www.example.com | 
| getPass | setPass | Password part of the authority. Don't use this! | itsasecret | 
| getPath | setPath | Path string.  Note that the path always includes the leading "/" character. | /path/to/Joomla/index.php | 
| getPort | setPort | Port number.  Specific schemes (protocols) have their own defaults (for example, 'http' is port 80, 'ftp' is port 21). | 8080 | 
| getQuery | setQuery | Query in string format.  For example, ''foo=bar&x=y''. | task=view&id=32 | 
| getScheme | setScheme | Scheme (protocol).  For example, 'http', 'https', 'ftp'. | http | 
| getUser | setUser | Username part of the authority. Don't use this! | fredbloggs | 
| getVar | setVar | An individual query item value from within the query part. A query parameter may be removed using delVar. | 32 | 

Although supported by the API, passing the user/password in the URL in this fashion is insecure and shouldn't be used. 
You can't login to Joomla using this, and it's not considered further here.

## root() and base()

`Uri::root($pathonly)` is a static function which returns the URL to the root of the Joomla site. 
It may or may not be the same as the HTTP domain, depending upon how your webserver is configured. 
In the case where a Joomla instance "mysite" is installed in a directory under the webserver document root you are likely to get:

 - `Uri::root()` returns the string "http://www.mydomain.org/mysite/" (or https if you're using SSL, etc).
 - `Uri::root(true)` returns the string "/mysite".

The second parameter to `Uri::root()`, namely `$path`, sets the path locally within the Uri class, 
and will get used in subsequent invocations of `Uri::root()` 
(by any other extensions which are generating content for the web page).
Hence it's strongly advised that you don't set this parameter. 

`Uri::base($pathonly)` depends upon which type of Joomla application is being executed,
and what is returned is the root of the current Joomla application.  

- If the Joomla site is being executed then `Uri::base()` returns the same as `Uri::root()`

- If the Joomla administrator is being executed then `Uri::base()` returns `Uri::root()` plus "administrator", 
so using the example above, 

  - `Uri::base()` returns the string "http://www.mydomain.org/mysite/administrator/"

  - `Uri::base(true)` returns the string "/mysite/administrator".
  
- Similarly, if the API application is being executed then `Uri::root()` plus "api" is returned, and

- for a console application `Uri::root()` plus "cli" is returned

This is similar to the [Joomla Path constants](./path-constants.md) JPATH_ROOT and JPATH_BASE. 

## Specifying URLs

The way in which you should specify a URL from your extension's code depends on what type of URL it is.

### External URLs

Usually if you're including a URL which is external to your website then you will just specify it as a string, 
but there may be occasions where using the Uri class to manipulate parts of a URL could be useful. 
In this case you can do something like:

```php
use Joomla\CMS\Uri\Uri;
...
$joomla = Uri::getInstance("//www.joomla.org");
$joomla->setScheme("https");
$joomla->setPath("/announcements");
$joomlaNews = $joomla->toString();  // https://www.joomla.org/announcements
echo "<a href='$joomlaNews'>Joomla news</a><br>";
```

Joomla uses the PHP [parse-url](https://www.php.net/manual/en/function.parse-url.php) method to parse the URL, 
so you need to be careful to include appropriate slashes in the URL and path. 

### Internal Static URLs

To get an absolute URL which points to a file within the Joomla instance use:

```php
$url = Uri::root() . 'path/from/joomla/root/to/file.typ';
```

For example, to make a URL which points to a file picture.jpg in the Joomla images folder use:

```php
$url = Uri::root() . 'images/picture.jpg';
```

The advantage of this approach is that no changes need to be made if you change the name of your Joomla site or domain, 
such as moving from a development environment, via testing to live, 
and particularly if you want to display absolute URLs on your live site. 

You can similarly use `Uri::base()` to create URLs; 
you will then need to specify a path which is relative to the base of the application in which your code is executing. 

### Internal Dynamic URLs

These URLs point to some content within the site, to an article or contact, for example.

To create a URL which points to an item which is managed by a Joomla component `com_example` use an approach like:

```php
use Joomla\CMS\Router\Route;
$url = Route::_("index.php?option=com_example&view=showitem&id=14");
```

This is a bit trickier because you have to know what parameters to set in the query part of the URL. 
However, if you use the administrator form to set up (even temporarily) a new Menu Item 
which points to the appropriate view of the item type which you want to display, 
then you should see in the Link field the parameters which you should add in the `Route::_()` call.

(Although this method's name is an underscore, there's nothing special about it – it's just an ordinary PHP function). 

You can use `Route::_()` to build a URL which is related to the application on which your code is executing.
For example, if your code is executing on the Joomla front-end 
then you can use `Route::_()` to build a URL to another front-end page.
Or if your code is executing on the administrator back-end 
then you can use `Route::_()` to build a URL to another back-end page.

If you wish to build a route for a different application then you need to use the `link` method instead,
specifying the name of the `client` application for which you want the URL built.

For example, if your code is running in the administrator back-end 
and you want to output a link to a front-end item then use something like:

```php
use Joomla\CMS\Router\Route;
$url = Route::link("site", "index.php?option=com_example&view=showitem&id=14");
```

The `$client` parameter (first parameter) can be "site", "administrator", "api" or "cli".

If the Joomla site is configured to use SEF URLs 
then `Route::_()` and `Route::link()` will generate SEF URLs when generating site URLs,
as described in [Building an SEF URL](./routing/build.md).

### Additional Parameters

The `Route::_()` and `Route::link()` methods have a number of additional parameters, 
which are described below:

- `$xhtml` (default = true) – if true then the URL is passed through the PHP function `htmlspecialchars()` 
to convert special characters such as & to `&amp;` and < to `&lt;` etc. 
Spaces in URLs always get converted to %20, regardless of this parameter.

- `$tls` (default = self::TLS_IGNORE) – defines whether the output URL should be http or https
or just the same as the current page. There are 3 possible values:
   - Route::TLS_IGNORE (value 0) – if an absolute URL is requested, then the scheme (http or https) is set to the same as the current HTTP request
   - Route::TLS_FORCE (value 1) – the scheme is set to https and an absolute URL is returned (regardless of the setting of the `$absolute` parameter).
   - Route::TLS_DISABLE (value 2) – the scheme is set to http and an absolute URL is returned (regardless of the setting of the `$absolute` parameter).
    
- `$absolute` (default = false) – if true (or overridden by the `$tls` parameter) then an absolute URL is returned which includes the scheme, domain and port. 
If false, a root relative URL is output (where just the scheme, domain and port are missing).

## Joomla Standard Query Parameters

The table below lists the more common query parameters 
which are used in constructing URLs with `Route::_()`. 
It is not an exhaustive list. 

| Query Parameter | Description |
|-----------------|-------------|
| option | The component (e.g. "com_contact") associated with the webpage you want to link to | 
| view | The view which the component displays on that page (e.g. "article" for com_content) | 
| layout | The layout PHP file (in ''tmpl'' directory under the view) to be used | 
| id | The id of the item to be shown | 
| catid | The id of the category associated with the item | 
| Itemid | The id of the Menu Item which points to the webpage you want to link to | 
| lang | The language code | 
| task | In general the task parameter is of the form `<controllerType>.<method>` as described in [The HTTP Request task Parameter](../building-extensions/components/mvc/mvc-overview.md#the-http-request-task-parameter)| 
| tmpl | The template PHP file to use (instead of ''index.php''). It's commonly used with modals in the Administrator Backend, by specifying ''tmpl=component'' to display the template ''component.php'' file in the modal iframe, which doesn't output the toolbar menu etc. | 
| format | The response format expected. This controls which view file will be run or what kind of content the controller should send as response. The possible output formats are html (the default), json, jsonapi, image, feed, xml, raw. | 

## Other URI Methods

As well as the methods above, the Joomla Uri class provides the methods listed below. 
In the following example code snippets, `$uri` refers to a Uri instance, 
obtained for example through 

```php
$uri = Uri::getInstance();
```

- **toString**(array $parts = array('scheme', 'user', 'pass', 'host', 'port', 'path', 'query', 'fragment')) : string

`toString()` converts the Uri to a string, and allows you to select the parts of the URL which you want, e.g.

```php
$uri->toString(array('scheme','host','port','path'));
```

will return the URL minus any query or anchor (fragment).

- **render**() is similar to `toString()` in that it returns the parts of the URL you want, 
but as you have to pass the parts you want as a bitmask, 
it's preferable to use `toString()` instead.

- **isSsl**() returns true if the scheme is https, false otherwise, e.g.

```php
$secure = $uri->isSsl();
```

- **isInternal**() returns true if the URL is within the Joomla instance 
(including the administrator area), false otherwise. 
Note that this is a static function, and you pass the URL as a string, e.g.

```php
$internal = Uri::isInternal("myurl.org");
```

- **current**() returns the URL of the current page, minus any query string or fragment, e.g.

```php
$currentURL = Uri::current();
```

and is basically equivalent to

```php
$uri = Uri::getInstance();
$uri->toString(array('scheme','host','port','path'));
```