---
sidebar_position: 3
---

Backward Compatibility Policy
=============================

The Joomla project seeks to maintain backward compatibility as long as possible and full backward compatibility is guaranteed within a major series. Backward compatibility may only be broken when a new major series is started or in the case of a security release that can’t be made without breaking backward compatibility.

Clean, maintainable code is important, but as time progresses the need to maintain backward compatibility makes software more complex and less maintainable. This technical debt (see, for example: [http://martinfowler.com/bliki/TechnicalDebt.html](http://martinfowler.com/bliki/TechnicalDebt.html)) can only be relieved in the first release of a new major series.

Sometimes the best way to continue development is to drop support for some element. This process of deprecation must be handled carefully as it can lead to backward compatibility issues.

## Applicability

The backward compatibility policy can only apply to certain aspects of the software and it is important that these are defined so that everyone is clear and can understand the limits of that promise. In general, backward compatibility applies to, where applicable:

### PHP

All PHP code in the /libraries folder which is not flagged as private/internal and is not in the vendor folder is considered to be part of the Joomla API and subject to backwards compatibility constraints.

Additionally extensions are not intended to be extended. For example: plugin classes will be marked as final and are not allowed to be used as base for 3rd party plugins. Extending ArticleModel from com\_content is not intended.

### JavaScript

All JavaScript functions and classes that are not flagged as private/internal and which are not directly associated with an extension.

For example, Javascript found in build/media\_source/com\_content is not part of this policy. Code in build/media\_source/system is part of this policy.

### Database schemata

All database schema changes must be accompanied by a conversion script that can be executed to losslessly convert from the old schema to the new one.

### XML schemata

Adding new entities and attributes is generally acceptable; changing or deleting them is not.

### JSON schemata

Adding new entities is generally acceptable; changing or deleting them is not.

### Language keys

Changing or deleting a language key is considered a backwards compatibility break. Adding new ones is not. Substantially changing the meaning associated with a language key is a compatibility break. Rephrasing something for a more accurate description or proper en-GB grammar is not.

### Rendered markup

For the time being, rendered markup is not subject to our backwards compatibility promise. We will try not to change markup in such a way that a site might render differently, but we can't promise not to break anything at the present time. We will work on defining ways in which we might make a backwards compatibility promise for markup in the future, but we do not currently have a satisfactory consensus on a workable standard.

### CSS

CSS rules can be updated but not deleted.

### URLs

Any change to a URL that will give a 404 (or some other error) where it previously gave a 200 is a break in backwards compatibility. However, if the change results in a redirect to a new URL (which gives a 200\) then that is acceptable.

In general, if a URL is changed then provided the new URL delivers the exact same resource rendered in the same way then that is not considered to be a break in backwards compatibility. For example, changing the order of the arguments in the query part of a URL is not considered to be a break.

## Used libraries

Modern software development often uses libraries from other software providers. They can be updated in minor and patch releases when this is needed to fix a bug or to increase security.  This should not change the technical requirements of the product. In such cases when an update MUST applied the project can fork the library and use the forked version of the library. This is a case to case decision, but we are trying to use a solution with the lowest impact.

Libraries can be upgraded within their major version (if they follow a SemVer like strategy) on a first minor or major Joomla version. We also update libraries in the pre release candidate  phase of the development process of minor and major releases.

Transcendent dependencies of a used library are not part of the b/c policy.

No longer used libraries will be removed in the next major version. We keep files as long as possible to not break sites who have used a library even if we don’t use the library in the core product.

## Deprecation

An element can be marked as being deprecated at any time in the software life cycle but it can only be removed in the 2nd major version following the current major version. Advice on how to amend code that is currently using an element that is marked as deprecated MUST be added to the documentation.

Deprecated elements should be removed as soon as possible from the core product.

For example, code that is deprecated in version 4.3.5 will be scheduled for removal in version 7.0.0. Code that is deprecated in 7.0.0 cannot be removed until the release of version 9.0.0.

Code that is deprecated will have a @deprecated tag added to the appropriate docblock which include the version of the deprecation and the earliest removal version. Also it will be documented in the migration guide on manual.joomla.org. and it will be noted in the release notes. The tag MUST explain a replacement or add a notice that it is removed without replacement.

For example a deprecation block could look like:
@deprecated  4.3 will be removed in 6.0
Use the class \\Joomla\\Component\\Content\\Administrator\\Service\\HTML\\Icon instead

Classes, functions, variables or other items which are marked as **internal**, **final**, **private** are not covered by the deprecation policy and can be removed at any time.

The Production Department Leadership may elect to defer the removal of deprecated elements if deemed appropriate.

## Compatibility Plugin

Deprecated code CAN be moved to a compatibility plugin. The plugin allows a smoother update between major versions. It holds the code from the previous version that might break a site after an update, because an extension is using deprecated code. An extension is only fully compatible when it runs without problems with a disabled compatibility plugin.

The compatibility plugin will be enabled after a major update.

## Regressions

There will no doubt be occasions when a release unintentionally breaks backward compatibility. If one or more such backward compatibility regressions are found within a major series they will be fixed by making a patch release as soon as possible after their discovery.

## Minimum technical requirements

The minimum technical requirements, such as PHP version, database version, etc., can only be increased for the first release of a new major version.

## Downgrading

Downgrading a Joomla product is not supported. Changes brought about during an upgrade may be irreversible. So if you experience an issue following an upgrade, you should restore from a backup copy made immediately prior to the upgrade.

Downgrading an element that a Joomla product depends on is also not supported. For example, whilst moving the product to a new host with a lower version of the web server, the database engine, or PHP would normally be expected to work, provided the dependent element is still within the minimum requirements for the product, this cannot be guaranteed because in some cases data used by the product may depend on some property of the dependent element that cannot be reversed. For example, downgrading an encryption library would tend to be problematic.

Similarly, migrating across dependent element types is also not supported. For example, moving from Postgres to MySQL or vice versa, is not supported. There may be third-party tools available which are able to perform such a migration, but these are outside the scope of our support policy.
