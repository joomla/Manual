---
title: Development Strategy
sidebar_position: 1
---
Joomla\! Development Strategy
=============
## Introduction

This strategy document sets out what the community of Joomla users, from ordinary non-technical users through to high-level technical developers, can expect from the products that come under the umbrella of the Joomla project.

This is primarily about how we approach and manage change: how we adapt, develop and grow our products in an ever-changing technological landscape; how we communicate to our users and contributors what to expect from our products as they change from one release to the next; and how we guide our contributors towards making the future changes that we want as a community.

The stakeholders in our project have widely varying needs and a balance must be struck between, at one extreme, those for whom any change is unwelcome and all shades to the other extreme of those who thrive on continuous change. Change is essential if our products are to remain relevant to their intended users, so our goal is to manage that change in such a way that we minimise the disruption it can cause.

Since the Joomla project is responsible for more than one product, this strategy is written to be as generic as possible and to allow new products to be added to our portfolio without forcing any extensive re-writes.

This strategy builds on the substantial practical experience of a lot of people over the many years since the project's foundation. The reasoning behind what is written here, and the lessons learned in leading up to it, is outside the scope of the document itself and reference should be made to other sources for that commentary.

The document here is an overview and a starting point, it refers to other documents to have the information at one and the right place. This should lead to a situation where information is valid and in the newest state.


### Executive Summary

This document is not long, but with all the information in other documents it is a lot of content to read. Recognising that reality, this section attempts to summarise what you need to know and point you to the appropriate sections for additional information.

These are the key points of this strategy:

* The version numbering scheme is your key to understanding the degree of change inherent in a release. The version number is in three parts separated by dots: \[major\].\[minor\].\[patch\]. For example, 5.3.2 has a major number of 5, a minor number of 3 and a patch number of 2\. A release which increments the major number is referred to as a major release; one that increments only the minor number is a minor release; and one that increments only the patch number is a patch release. Refer to our Release Policy for further details.
* A release is said to be "backward compatible" with an earlier release if your system continues to work correctly when updated to that release even when other parts of your system were not updated at the same time. However, there are limits to what is covered by backward compatibility and you should read the Backward Compatibility Policy for the full details.
* A major release is the only kind of release where backward compatibility can be intentionally broken. A minor release may add new features and capabilities but it must be backward compatible with the release it replaces. Patch releases are for bug and security fixes only and will not break backward compatibility. A needed security fix can break backward compatibility of any kind of release.
* Releases are either supported or they are not supported. When we say that a release is supported, we mean that all major issues and most minor issues will be addressed in a subsequent release. Refer to Support Policy for further information.
* Within each major series, only the most recent minor release is supported. As soon as a new minor release is made, support for the previous minor release ends.
* A major series may be declared end-of-life (and hence become unsupported) only after at least 2 years have elapsed since the most recent minor release in that series. What this means is that each time a minor release is made it resets the support clock for that series, thus ensuring that a major series will enjoy extended life for as long as there is sufficient interest in producing minor releases for it. Patch releases do not reset the support clock.
* There will always be a supported upgrade path from one version to any other subsequent version. By clearly defining what that upgrade path is, users can be more certain of a successful upgrade and developers will know exactly which upgrade paths must be tested. Refer to the Upgrade Policy for full details.
* We take security very seriously and we have a special team, the JSST, who review all reported issues and take the necessary action to mitigate or fix each confirmed issue. Refer to Security Policy for further information.
* We welcome contributions, individual, collaborative or corporate, that will enhance our products for the benefit of the community. Refer to our Contributor Policy for full details.

### Mission

Our mission is to provide a flexible platform for digital publishing and collaboration.

### Goals

To offer a stable and reliable platform for our current and future user base.

To make innovation available to users and developers on a manageable basis.

To make it easy for developers to contribute code and documentation to the project at any time.

### Principles

Joomla tries to follow the slogan “power through simplicity” for all its developments. For this, we have five major principles inherent to the Joomla development strategy aimed at achieving our goals:

#### Stability

It is critical to our mission that the branches of versions of a Joomla product are always stable and ready for a release within a short time.

#### Predictable, incremental software releases

We have a published release plan with concrete dates for releases.

#### Strong backward compatibility support

Backward compatibility for any software platform is a high priority.

#### Sound security policy

Our Security Strike team is always available and replies to issues in a timely manner.

#### Open development process

Our development process is designed to be open and accessible for anyone who wishes to participate. We strive to create an environment where people work together to solve problems and bring innovative, fresh ideas to life in the software we produce.

## Contribution Policy

The policies for contribution to the source code can be found in the repositories on github.

## Software Release Cycle

The following description of the software release cycle is for our main product, the CMS. Joomla switched with version 4.0 to a timely based release cycle. This means that every two years a major version of the CMS will be released. The release date is planned for October in a year with an odd year number (e.g. 2025, 2027, 2029 …). Within the two years we release every 6 months a minor release. Patch releases are usually released every 6 weeks.

![Release Plan](./_assets/releaseplan.png "Release Plan")

### Phases of the life cycle

The software release life cycle is composed of distinct phases and milestones that express the software's maturity as it advances from planning to development to release and support. Not every release will go through every possible phase. For example, patch releases will generally omit the alpha and beta milestones.

#### Planning phase

The planning phase consists mostly of discussion with little or no actual software likely to be available. An idea for a new feature may take its first tentative steps towards implementation with a RFC discussion on [github](https://github.com/joomla/joomla-cms/discussions/categories/rfc) or the publication of a [Request for Comments (RFC) document.](https://github.com/joomla/rfc) An RFC is a discussion of an idea and its potential implementation with an invitation for the wider community to get involved in further discussion, feedback and refinement of the idea.

During the planning phase some code snippets or proof-of-concept implementations may be produced to demonstrate feasibility or to elicit further feedback and assessment of the idea.

Releases made during this phase are sometimes referred to as “pre-alpha” releases.

#### Development and testing phase

During this phase software is being actively written, tested and documented according to the plan. This is coordinated by the CMS Maintainer Team and the Release Managers for the series of the software. Particularly for the larger features the Production Department will make a vote, if a feature will be part of the next version. It is highly recommended to publish ideas as early as possible and get approval for the idea.

During this phase releases will be made that are labelled “alpha”, “beta” and “release candidate”.

#### Release phase

Software enters the release phase when the first "general availability" release becomes available. In this phase the code is considered to be of production quality and suitable for use by general users.

Releases during this phase are subject to the version numbering scheme which mandates semantic versioning as explained in the Version numbering part of this document.

#### Support phase

After the release of a x.0.0 version we are going into the support phase of the series. In this phase we are fixing bugs, creating patch releases. A patch release is only for fixing bugs, new features can be added to minor releases as long as this doesn’t include a backwards compatibility break.

We plan 4 minor releases. The last minor release is a bridge release and doesn’t contain new features and is meant as a preparation for the next major release. An update to the next major release can only be made from the bridge release, usually a x.y.4 release. After the x.4.0 release date, we are fixing bugs for one year and making security fixes for two years.

A software release is no longer supported when the next minor release is released. For example the x.2.z release goes out of support when the x.3.0 release is published.

### Software milestones

There are four milestones in the Software Release Cycle: alpha, beta, release candidate, and general availability.

#### Alpha

The alpha milestone signifies that there is new technology in the software that is ready for testing, but that the software is not feature complete. Alpha software may also be used to demonstrate a possible combination of features to see if they work together successfully. Some features may be removed later.

The target audience for an alpha release is the development community including third-party developers who may be affected by core changes or new features.

Alpha software is not suitable for production environments.

#### Beta

The beta milestone is considered feature complete, but is still not considered suitable for production environments. The software is intended to be tested thoroughly for regressions, security and stability problems.

Third-party extension developers should be testing their products against all beta releases and reporting any issues on the Issue Tracker. Waiting for a release candidate is too late.

#### Release Candidate (RC)

The purpose of a release candidate is to test the final packaging and release process to ensure that everything is ready for the software to move into the release phase with the first general availability release.

All language tags have to be added before the release candidate is published (Language Freeze).

It is important that third-party extension developers carry out final tests on all release candidates and report any bugs immediately. However, only significant “show stopper” bugs involving core software or the included extensions will be fixed in the release candidates. Issues that only affect third-party software will not be fixed at this stage. No features will be added or removed.

Release candidates are considered complete and suitable for production environments, however they should only be deployed in production by knowledgeable people who understand the risks. A release candidate has the potential to be relabelled as a general availability release unless critical problems emerge.

#### General Availability (GA)

The general availability milestone indicates that the release is very stable and appropriate for end users. This version can only be released when all “Release Blocker” Issues have been fixed.

### Version numbering

A software release is the distribution of software code, documentation, and support materials. Each release carries a version identifier which is structured to give readers an idea of how it relates to other releases.

Joomla follows [Semantic Versioning (2.0.0)](http://semver.org/spec/v2.0.0.html) and this document also uses the terminology defined there.

In summary, the version identifiers for Joomla follow a three level numerical convention where the levels are defined by change significance.

major.minor.patch

where

1. An increment in the major version identifier indicates a break in backward compatibility.
2. An increment in the minor version identifier indicates the addition of new features or a significant change to existing features.
3. An increment in the patch version identifier indicates that bugs have been fixed.

Refer to the [SemVer](http://semver.org/spec/v2.0.0.html) documentation for full details. Refer to Backward Compatibility for further information about what constitutes backward compatibility in our products.

### Upgrades

The goal for upgrading from one version of a product to any subsequent version will always be to make it as simple and painless as possible. However, since it is not realistically possible to support direct upgrades from one arbitrary version to any other arbitrary version, we have set out the minimal upgrade path that will be supported.

It is important to have this supported upgrade path because testing of this path should be carried out during the development of any new release and will be a requirement for acceptance of the code. Third-party extension developers should also be aware that this is the supported upgrade path so that they can ensure that their products can also be upgraded/migrated along the same path.

Upgrades should be simple one-click affairs. It is possible that for an update to the next major version users will need to follow a series of manual steps in order to successfully update a site.

In summary, the supported upgrade path is always to first upgrade to the current fully-patched minor release in the major series currently in use, followed by an update to the latest fully-patched minor release in the next sequential major series.

#### Patch releases

Patch releases must be capable of being applied by an automatic process with a very high probability of success.

The supported upgrade path to the next sequential minor or major release assumes that all patches within the currently installed minor series have been applied.

#### Minor releases

Minor releases should be capable of being applied by a "one-click" upgrade process with a high probability of success. Since new features may have been added it is possible that a minor release will also introduce new bugs that will subsequently be addressed in patch releases. A minor release may reduce stability whereas a patch release should always increase it. Consequently, minor releases should normally be handled by a human who can run follow-up tests to ensure that the upgrade was successful.

#### Major releases

Major releases should be capable of being applied by a "one-click" upgrade process with a high probability of success.

The supported upgrade path to the next sequential major release assumes that the currently installed minor release is patched to the latest version of the major release series. Once the currently installed minor release has been fully patched, the site can be upgraded to the next sequential major release.

#### Example upgrade path

As an example, suppose that the current fully-patched supported releases are 4.4.2, 5.4.3 and 6.2.3. Assume also that the latest patch for the 4.4 minor release was 4.4.2. We have a site on 4.2.9 which is to be updated to the latest 6.2.3 release. Then the supported upgrade path comprises the following sequence of individual upgrade steps:

1\. Apply patches from 4.2.9 to 4.4.2.

2\. Update from 4.4.2 to 5.4.3.

4\. Update from 5.4.3 to 6.2.3.

Note that updates from end of life releases are not, by definition, supported. However, it is highly likely that the last supported update path will continue to work.

## Backward Compatibility Policy

The Joomla project seeks to maintain backward compatibility as long as possible and full backward compatibility is guaranteed within a major series. Backward compatibility may only be broken when a new major series is started or in the case of a security release that can’t be made without breaking backward compatibility.

Clean, maintainable code is important, but as time progresses the need to maintain backward compatibility makes software more complex and less maintainable. This technical debt (see, for example: [http://martinfowler.com/bliki/TechnicalDebt.html](http://martinfowler.com/bliki/TechnicalDebt.html)) can only be relieved in the first release of a new major series.

Sometimes the best way to continue development is to drop support for some element. This process of deprecation must be handled carefully as it can lead to backward compatibility issues.

### Applicability

The backward compatibility policy can only apply to certain aspects of the software and it is important that these are defined so that everyone is clear and can understand the limits of that promise. In general, backward compatibility applies to, where applicable:

#### PHP

All PHP code in the /libraries folder which is not flagged as private/internal and is not in the vendor folder is considered to be part of the Joomla API and subject to backwards compatibility constraints.

Additionally extensions are not intended to be extended. For example: plugin classes will be marked as final and are not allowed to be used as base for 3rd party plugins. Extending ArticleModel from com\_content is not intended.

#### JavaScript

All JavaScript functions and classes that are not flagged as private/internal and which are not directly associated with an extension.

For example, Javascript found in build/media\_source/com\_content is not part of this policy. Code in build/media\_source/system is part of this policy.

#### Database schemata

All database schema changes must be accompanied by a conversion script that can be executed to losslessly convert from the old schema to the new one.

#### XML schemata

Adding new entities and attributes is generally acceptable; changing or deleting them is not.

#### JSON schemata

Adding new entities is generally acceptable; changing or deleting them is not.

#### Language keys

Changing or deleting a language key is considered a backwards compatibility break. Adding new ones is not. Substantially changing the meaning associated with a language key is a compatibility break. Rephrasing something for a more accurate description or proper en-GB grammar is not.

#### Rendered markup

For the time being, rendered markup is not subject to our backwards compatibility promise. We will try not to change markup in such a way that a site might render differently, but we can't promise not to break anything at the present time. We will work on defining ways in which we might make a backwards compatibility promise for markup in the future, but we do not currently have a satisfactory consensus on a workable standard.

#### CSS

CSS rules can be updated but not deleted.

#### URLs

Any change to a URL that will give a 404 (or some other error) where it previously gave a 200 is a break in backwards compatibility. However, if the change results in a redirect to a new URL (which gives a 200\) then that is acceptable.

In general, if a URL is changed then provided the new URL delivers the exact same resource rendered in the same way then that is not considered to be a break in backwards compatibility. For example, changing the order of the arguments in the query part of a URL is not considered to be a break.

### Used libraries

Modern software development often uses libraries from other software providers. They can be updated in minor and patch releases when this is needed to fix a bug or to increase security.  This should not change the technical requirements of the product. In such cases when an update MUST applied the project can fork the library and use the forked version of the library. This is a case to case decision, but we are trying to use a solution with the lowest impact.

Libraries can be upgraded within their major version (if they follow a SemVer like strategy) on a first minor or major Joomla version. We also update libraries in the pre release candidate  phase of the development process of minor and major releases.

Transcendent dependencies of a used library are not part of the b/c policy.

No longer used libraries will be removed in the next major version. We keep files as long as possible to not break sites who have used a library even if we don’t use the library in the core product.

### Deprecation

An element can be marked as being deprecated at any time in the software life cycle but it can only be removed in the 2nd major version following the current major version. Advice on how to amend code that is currently using an element that is marked as deprecated MUST be added to the documentation.

Deprecated elements should be removed as soon as possible from the core product.

For example, code that is deprecated in version 4.3.5 will be scheduled for removal in version 7.0.0. Code that is deprecated in 7.0.0 cannot be removed until the release of version 9.0.0.

Code that is deprecated will have a @deprecated tag added to the appropriate docblock which include the version of the deprecation and the earliest removal version. Also it will be documented in the migration guide on manual.joomla.org. and it will be noted in the release notes. The tag MUST explain a replacement or add a notice that it is removed without replacement.

For example a deprecation block could look like:  
@deprecated  4.3 will be removed in 6.0  
Use the class \\Joomla\\Component\\Content\\Administrator\\Service\\HTML\\Icon instead

Classes, functions, variables or other items which are marked as **internal**, **final**, **private** are not covered by the deprecation policy and can be removed at any time.

The Production Department Leadership may elect to defer the removal of deprecated elements if deemed appropriate.

### Compatibility Plugin

Deprecated code CAN be moved to a compatibility plugin. The plugin allows a smoother update between major versions. It holds the code from the previous version that might break a site after an update, because an extension is using deprecated code. An extension is only fully compatible when it runs without problems with a disabled compatibility plugin.

The compatibility plugin will be enabled after a major update.

### Regressions

There will no doubt be occasions when a release unintentionally breaks backward compatibility. If one or more such backward compatibility regressions are found within a major series they will be fixed by making a patch release as soon as possible after their discovery.

### Minimum technical requirements

The minimum technical requirements, such as PHP version, database version, etc., can only be increased for the first release of a new major version.

### Downgrading

Downgrading a Joomla product is not supported. Changes brought about during an upgrade may be irreversible. So if you experience an issue following an upgrade, you should restore from a backup copy made immediately prior to the upgrade.

Downgrading an element that a Joomla product depends on is also not supported. For example, whilst moving the product to a new host with a lower version of the web server, the database engine, or PHP would normally be expected to work, provided the dependent element is still within the minimum requirements for the product, this cannot be guaranteed because in some cases data used by the product may depend on some property of the dependent element that cannot be reversed. For example, downgrading an encryption library would tend to be problematic.

Similarly, migrating across dependent element types is also not supported. For example, moving from Postgres to MySQL or vice versa, is not supported. There may be third-party tools available which are able to perform such a migration, but these are outside the scope of our support policy.

## Security Policy

The security policy for the CMS can be found in the [git repository.](https://github.com/joomla/joomla-cms?tab=security-ov-file\#readme)
