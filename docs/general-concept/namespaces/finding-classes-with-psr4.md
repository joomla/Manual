---
sidebar_position: 1
title: Finding Class files with PSR4
---
Namespaces allow us to organise our PHP classes in a similar way that directories allow us to organise our files. In particular, the [PSR4 recommendation](https://www.php-fig.org/psr/psr-4/) which Joomla uses enables us to determine what file a certain class should be in. 

![Namespacing](_assets/namespace.jpg "PSR4 namespacing")

To see this, let's take an example of the file administrator/components/com_content/src/View/Articles/HtmlView.php, which contains the code for the view which presents the Articles to the administrator. This file contains the lines
```php
namespace Joomla\Component\Content\Administrator\View\Articles;
...
class HtmlView extends BaseHtmlView { …
```
so the fully qualified name (FQN) of the class is `\Joomla\Component\Content\Administrator\View\Articles\HtmlView`.

Joomla holds a list of namespace prefixes strings, and it compares the string containing the fully qualified class name to that list, starting at the left hand side of the class name, to see if it can find a partial match. In this example the namespace prefix `'Joomla\Component\Content\Administrator'` will match.

This namespace prefix has an associated directory within the file system, which is the starting point for finding classes. In this case the directory is administrator/components/com_content/src. (We'll see shortly how the namespace prefixes and associated directories are defined).

Next it removes the matching namespace prefix from the FQN, leaving \View\Articles\HtmlView, and treats this as the path down from the above directory. So the full file path is: administrator/components/com_content/src/View/Articles/HtmlView.php. The diagram gives a pictorial view of this.
