---
sidebar_position: 1
---

About Migrations Documentation
==============================

An explanation of the code changes for each version of Joomla.
The Migrations Documentation is separate from the [Development Documentation](../docs/next), as it is intended to be version-independent.
Since the Development Documentation only reflects the current CMS version, it makes little sense to view only the deprecations and improvements up to that point.

Joomla! is trying to follow SemVer as much as possible but some parts of SemVer doesn't fit into the lifecycle of the CMS.

## Deprecations

Deprecations based on SemVer are only introduced in minor versions, but not removed in the next major version.
Production department decided in motion [PROD2022/011](https://volunteers.joomla.org/departments/production/reports/1793-production-dept-meeting-minutes-august-23-2022)
that deprecations will not be removed in the next major version. Instead, it will be removed in the next next major version
but don't have to. This allows 3rd party developers to have at least 2 years to adapt their code.

### From the Motion:

> Currently, deprecated code can be removed in the next major version (something deprecated in 4.x could be removed in 5.0) 
> but with the new release timeline of two years a new major release this short time frame gives some challenges for developer. 
> So the standard is, that deprecatd code has to be available as long as the Joomla version where the code was deprecated is still supported. 
> That means, something deprecated in 4.x can earliest be removed in 6.0 (but don't have to). For specific important changes 
> a production motion is needed to remove code earlier.

## Code Migrations

Joomla! improves overtime and find better ways to write code. Also, PHP improves and allows us to write better and/or faster code.
But often this requires us to rewrite code. For this we add examples of how to change the code within the Joomla api and how to call it.

Often this requires a new PHP version and would most likely be introduced in a major version. If you follow from the version 
of your current code until the version you want to support you should come across all the changes you need to make.

Please read all migrations. This will also help you find code that may not have been migrated, even if it's from an older version.
