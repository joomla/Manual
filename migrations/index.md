---
sidebar_position: 1
---

About Migration Documentation
=============================

An explanation of the code changes for each version of Joomla. This documentation is outside the development documentation
to be version independent. The documentation is per CMS version, and it makes not much sense to see only deprecations
and improvements up to the current CMS version.

Joomla! is trying to follow SemVer as much as possible but some parts of SemVer doesn't fit into the lifecycle of the CMS.

## Deprecations

Base on SemVer deprecations are only introduced in minor versions but not removed in the next major version.
Production department decided in motion [PROD2022/011](https://volunteers.joomla.org/departments/production/reports/1793-production-dept-meeting-minutes-august-23-2022)
that deprecations will not be removed in the next major version. Instead, it will be removed in the next next major version
but don't have to. This allows 3rd party developer to have at least 2 years to adapter there code.

### From the motion:

> Currently, deprecated code can be removed in the next major version (something deprecated in 4.x could be removed in 5.0) 
> but with the new release timeline of two years a new major release this short time frame gives some challenges for developer. 
> So the standard is, that deprecatd code has to be available as long as the Joomla version where the code was deprecated is still supported. 
> That means, something deprecated in 4.x can earliest be removed in 6.0 (but don't have to). For specific important changes 
> a production motion is needed to remove code earlier.

## Code migration

Joomla! improves overtime and find better ways to write code. Also, PHP improves and allows us to write better and/or faster code.
But often this requires us to rewrite code. For this we add examples how to change code within the Joomla api and how to call it.

Often this requires a new PHP version and would most likely be introduced in a major version. If you follow from the version 
of your current code until the version you want to support you should come across all the changes you need to make.

Please read all migrations, this allows you to also find code which maybe have not been migrated even if it's from an older version. 
