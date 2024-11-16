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

### UTC is used instead of GMT

- PR: https://github.com/joomla/joomla-cms/pull/43912
- Description: To unify the code base, all instances do use or fallback to UTC timezone. Make sure that your code doesn't do a check against GMT string.

### Removed legacy b/c code in \Joomla\CMS\Date\Date Class

- PR: https://github.com/joomla/joomla-cms/pull/43959
- Description: Removed Date::$gmt and Date::$stz variables and related code. If you extend the \Joomla\CMS\Date\Date class make sure not to depend on them any longer.

### View classes do not have a database reference

- PR: https://github.com/joomla/joomla-cms/pull/42962
- Description: In Joomla 3 some views had a reference to the global database instance to check if a date is a special null date (0000-00-00 00:00:00). Since Joomla 4 all these dates are real null values and the database check is not used anymore. If there are some old template overrides in place with these checks, they can be removed.

```php
// Old:
if ($this->item->created !== $this->db->getNullDate()) {
	echo $this->item->created;
}

// New:
if ($this->item->created !== null) {
	echo $this->item->created;
}
```
