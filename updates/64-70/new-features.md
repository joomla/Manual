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


## Concrete event classes for seven core events
- PR: https://github.com/joomla/joomla-cms/pull/XXXXX
- Files:
  - /libraries/src/Event/Application/BuildAdministratorLoginUrlEvent.php
  - /libraries/src/Event/Finder/IndexAfterDeleteEvent.php
  - /libraries/src/Event/Finder/IndexAfterIndexEvent.php
  - /libraries/src/Event/Finder/IndexAfterPurgeEvent.php
  - /libraries/src/Event/Finder/SortOrderFieldsEvent.php
  - /libraries/src/Event/Mail/BeforeTagsRenderingEvent.php
  - /libraries/src/Event/Module/GetStatsEvent.php
  - /libraries/src/Event/CoreEventAware.php
- Description: Seven core events were still dispatched as the generic `Joomla\Event\Event` with positional arguments, so a listener could only reach their data through `$event->getArgument(0)`. Each now has a concrete event class, registered in `CoreEventAware`, with named arguments and typed getters.

  | Event | Class | Arguments |
  | --- | --- | --- |
  | `onFinderIndexAfterIndex` | `Joomla\CMS\Event\Finder\IndexAfterIndexEvent` | `subject` (`Result`), `linkId` |
  | `onFinderIndexAfterDelete` | `Joomla\CMS\Event\Finder\IndexAfterDeleteEvent` | `linkId` or `itemId` |
  | `onFinderIndexAfterPurge` | `Joomla\CMS\Event\Finder\IndexAfterPurgeEvent` | none |
  | `onFinderSortOrderFields` | `Joomla\CMS\Event\Finder\SortOrderFieldsEvent` | `sortOrderFields` |
  | `onMailBeforeTagsRendering` | `Joomla\CMS\Event\Mail\BeforeTagsRenderingEvent` | `templateId`, `subject` |
  | `onGetStats` | `Joomla\CMS\Event\Module\GetStatsEvent` | `context` |
  | `onBuildAdministratorLoginURL` | `Joomla\CMS\Event\Application\BuildAdministratorLoginUrlEvent` | `subject` (`Uri`) |

  Read the arguments through the getters instead of by position:
```php
// Old:
public function onFinderIndexAfterIndex($event)
{
    $item   = $event->getArgument(0);
    $linkId = $event->getArgument(1);
}

// New:
public function onFinderIndexAfterIndex(IndexAfterIndexEvent $event): void
{
    $item   = $event->getItem();
    $linkId = $event->getLinkId();
}
```
  `onFinderIndexAfterDelete` carries a `linkId` when the indexer removed a link, and an `itemId` when an
  indexer adapter was asked to remove a source item that had no link. Exactly one of the two is set, so
  check both:
```php
$id = $event->getLinkId() ?? $event->getItemId();
```

## Plugins declaring `DispatcherAwareInterface` receive the dispatcher
- PR: https://github.com/joomla/joomla-cms/pull/XXXXX
- Files:
  - /libraries/src/Plugin/PluginHelper.php
- Description: `CMSPlugin::getDispatcher()` and `CMSPlugin::setDispatcher()` are deprecated, and the notice asks plugins that need a dispatcher to implement `DispatcherAwareInterface` themselves. Until now that did not work for plugins implementing `SubscriberInterface`: `PluginHelper::import()` registered them with `$dispatcher->addSubscriber($plugin)` and never called `setDispatcher()`, so `$this->getDispatcher()` threw an `UnexpectedValueException`.

  `PluginHelper::import()` now injects the dispatcher into plugins which declare `DispatcherAwareInterface` themselves, before registering their listeners. Plugins which only inherit it from `CMSPlugin` are unchanged, so no additional deprecation notices are emitted.

  A plugin which dispatches its own events should declare the interface and use the trait:
```php
// New:
final class MyPlugin extends CMSPlugin implements SubscriberInterface, DispatcherAwareInterface
{
    use DispatcherAwareTrait;

    private function fire(): void
    {
        // The dispatcher its own listeners were registered on, not necessarily the application one.
        $this->getDispatcher()->dispatch('onMyEvent', new MyEvent('onMyEvent', ['context' => 'com_example']));
    }
}
```
  This matters when a caller passes its own dispatcher to `PluginHelper::importPlugin()`, which several
  core controllers do. Listeners are registered on that dispatcher, so events fired on any other one
  reach nobody.
