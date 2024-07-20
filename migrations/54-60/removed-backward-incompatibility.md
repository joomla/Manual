---
sidebar_position: 3
---

# Removed and backward incompatibility

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the deprecated features than have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

### CMS Input object switched to Framework Input object

- PR's: 
  - https://github.com/joomla/joomla-cms/pull/42805
  - https://github.com/joomla/joomla-cms/pull/42890
- Description: The CMS Input namespace `\Joomla\CMS\Input` has been removed. The CMS core code has switched the code to the Framework Input library with the namespace `\Joomla\Input`, which is very much a drop-in replacement. This is especially of relevance if you are using the MVC classes, which now use the framework class. Make sure that your code imports the correct class.

### CMS BaseApplication and CLI classes have been removed

- PR: https://github.com/joomla/joomla-cms/pull/42884
- Description: The class `\Joomla\CMS\Application\BaseApplication` and `\Joomla\CMS\Application\CliApplication` respective CLI input classes have been removed. The CMS core code has been switched to use the Application package of the Joomla Framework. Any reference to these classes should be replaced with the namespace `\Joomla\Application`. Cli apps should be replaced by console plugins.

### Web cron scheduler `id` parameter has been changed to `taskid` 

- PR: https://github.com/joomla/joomla-cms/pull/43490
The Web cron scheduler `id` parameter has been changed to `taskid`. All references to the old `id` parameter in URLs or API calls should be updated to `taskid`. For example, change `https://example.com/cron?id=123` to `https://example.com/cron?taskid=123`. Ensure all documentation and scripts are updated accordingly.

```php
// Old
$id = (int) $this->getApplication()->getInput()->getInt('id', 0);

// New
$taskId = (int) $this->getApplication()->getInput()->getInt('taskid', 0);
```
