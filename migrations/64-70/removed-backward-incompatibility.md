---
sidebar_position: 3
---

Removed and Backward Incompatibility
====================================

All the deprecated features that have now been removed and any backward incompatibilities.
There should be an explanation of how to mitigate the removals / changes.

## Removal of static methods in module helpers

- PR: https://github.com/joomla/joomla-cms/pull/45860
- PR: https://github.com/joomla/joomla-cms/pull/47460
- Files: modules/\*/src/Helper/\*.php & administrator/modules/\*/src/Helper/\*.php
- Description: Modules traditionally were written with a static helper class to retrieve data from the system. This isn't desirable from a dependency injection perspective and thus the modules were rewritten to use instantiated helper objects instead with dependency injection. The static methods were kept as a proxy to the new instantiated objects for version 5 and 6 of the CMS and with 7.0 these static methods were removed. Instantiate the helper object and call the non-static version of the respective method instead.

