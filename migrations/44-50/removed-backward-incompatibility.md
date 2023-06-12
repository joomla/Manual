---
sidebar_position: 3
---

Removed and backward incompatibility
===============
All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

### PSR-3 upgraded to version 3

The PSR-3 (Logging) is upgraded to [version 3](https://github.com/php-fig/log/tree/3.0.0) of the specification.

Most critically, the signature of the `\Psr\Log\LoggerInterface` methods has changed. The `$message` argument is now strongly typed as `string|\Stringable`. Any logger implementation you use **must** be compatible with this new signature. This is relevant to you if you implement your own logger, or if you are using a third party logger such as Monolog, in your extension.

If you are using your own logger, you want to preserve compatibility with Joomla 4 and 5 in the same extension package, and you do not mind losing PSR-3 compatibility you can include a copy of PSR-3 in your extension _as long as it's under your extension's namespace_. For example, instead of using `\Psr\Log\LoggerInterface` you could use `\Acme\Component\Example\Administrator\Log\LoggerInterface`. Note that you can use [PHP Scoper](https://github.com/humbug/php-scoper) to easily migrate your dependencies under your own namespace.

If you only need to maintain compatibilty with PSR-3 to use an logger external to your component, such as Joomla's logger, you can still typehint against `\Psr\Log\LoggerInterface`. Please note that the external logger you are using must be compatible with PSR-3 version 1 on Joomla 4 and PSR-3 version 3 on Joomla 5. If you are providing a third party, external logger yourself you may need to include two versions of the logger with your extension and only load the correct one for each Joomla version.

### Database must be injected in constructor model
- PR: https://github.com/joomla/joomla-cms/pull/38511
- Description: The database instance in the model should be injected through the `$this->setDatabase()` or the deprecated function `$this->setDbo()`  configuration in the constructor to make it available in the base class. Like that it is ensured that calls to `$this->getDatabase()` and the deprecated function `$this->getDbo()` will point to the same instance.

```php
class MyModel extends ListModel {
  public function __construct(..) {
    parent::__construct(...);
    $this->setDatabase(MyHelper::getGridDB());
  }
}
```

### CSS removals
The CSS class ".ie11" was removed [via PR #39018](https://github.com/joomla/joomla-cms/pull/39018)

### Change ordered lists in com_content links to unordered lists
The links in com_content > category > blog-links.php and com_content > featured > default-links.php use `<ul></ul>` instead of `<ol></ol>`.
Changes made [via PR #40629](https://github.com/joomla/joomla-cms/pull/40629) 

### TinyMCE
CSS classes defined in the editor.css file of a template are no longer displayed in the formats dropdown menu or button. They can be displayed if you wish by enabling the **new** TinyMCE plugin option CSS Classes Menu.
