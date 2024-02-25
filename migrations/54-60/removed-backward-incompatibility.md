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

The CMS Input object `\Joomla\CMS\Input` has been deprecated since Joomla 4.3. The CMS core code
has switched the code to the Framework Input object `\Joomla\Input`, which is very much a drop-in
replacement. This is especially of relevance if you are using the MVC classes, which now use the
framework class. Make sure that your code imports the correct class.
