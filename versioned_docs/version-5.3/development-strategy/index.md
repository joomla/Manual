---
title: Development Strategy
sidebar_position: 1
---
Joomla\! Development Strategy
=============================

## Introduction

This strategy document sets out what the community of Joomla users, from ordinary non-technical users through to high-level technical developers, can expect from the products that come under the umbrella of the Joomla project.

This is primarily about how we approach and manage change: how we adapt, develop and grow our products in an ever-changing technological landscape; how we communicate to our users and contributors what to expect from our products as they change from one release to the next; and how we guide our contributors towards making the future changes that we want as a community.

The stakeholders in our project have widely varying needs and a balance must be struck between, at one extreme, those for whom any change is unwelcome and all shades to the other extreme of those who thrive on continuous change. Change is essential if our products are to remain relevant to their intended users, so our goal is to manage that change in such a way that we minimise the disruption it can cause.

Since the Joomla project is responsible for more than one product, this strategy is written to be as generic as possible and to allow new products to be added to our portfolio without forcing any extensive re-writes.

This strategy builds on the substantial practical experience of a lot of people over the many years since the project's foundation. The reasoning behind what is written here, and the lessons learned in leading up to it, is outside the scope of the document itself and reference should be made to other sources for that commentary.

The document here is an overview and a starting point, it refers to other documents to have the information at one and the right place. This should lead to a situation where information is valid and in the newest state.


## Executive Summary

This document is not long, but with all the information in other documents it is a lot of content to read. Recognising that reality, this section attempts to summarise what you need to know and point you to the appropriate sections for additional information.

These are the key points of this strategy:

* The version numbering scheme is your key to understanding the degree of change inherent in a release. The version number is in three parts separated by dots: \[major\].\[minor\].\[patch\]. For example, 5.3.2 has a major number of 5, a minor number of 3 and a patch number of 2\. A release which increments the major number is referred to as a major release; one that increments only the minor number is a minor release; and one that increments only the patch number is a patch release. Refer to our Release Policy for further details.
* A release is said to be "backward compatible" with an earlier release if your system continues to work correctly when updated to that release even when other parts of your system were not updated at the same time. However, there are limits to what is covered by backward compatibility and you should read the Backward Compatibility Policy for the full details.
* A major release is the only kind of release where backward compatibility can be intentionally broken. A minor release may add new features and capabilities but it must be backward compatible with the release it replaces. Patch releases are for bug and security fixes only and will not break backward compatibility. A needed security fix can break backward compatibility of any kind of release.
* Releases are either supported or they are not supported. When we say that a release is supported, we mean that all major issues and most minor issues will be addressed in a subsequent release. Refer to [Support Policy](https://manual.joomla.org/docs/development-strategy/software-release-cycle/#support-phase) for further information.
* Within each major series, only the most recent minor release is supported. As soon as a new minor release is made, support for the previous minor release ends.
* A major series may be declared end-of-life (and hence become unsupported) only after at least 2 years have elapsed since the most recent minor release in that series. What this means is that each time a minor release is made it resets the support clock for that series, thus ensuring that a major series will enjoy extended life for as long as there is sufficient interest in producing minor releases for it. Patch releases do not reset the support clock.
* There will always be a supported upgrade path from one version to any other subsequent version. By clearly defining what that upgrade path is, users can be more certain of a successful upgrade and developers will know exactly which upgrade paths must be tested. Refer to the [Upgrade Policy](https://manual.joomla.org/docs/development-strategy/software-release-cycle/#upgrades) for full details.
* We take security very seriously and we have a special team, the JSST, who review all reported issues and take the necessary action to mitigate or fix each confirmed issue. Refer to [Security Policy](https://manual.joomla.org/docs/development-strategy/security-policy/) for further information.
* We welcome contributions, individual, collaborative or corporate, that will enhance our products for the benefit of the community. Refer to our [Contributor Policy](https://manual.joomla.org/about/contributing/) for full details.

## Mission

Our mission is to provide a flexible platform for digital publishing and collaboration.

## Goals

To offer a stable and reliable platform for our current and future user base.

To make innovation available to users and developers on a manageable basis.

To make it easy for developers to contribute code and documentation to the project at any time.

## Principles

Joomla tries to follow the slogan “Power Through Simplicity” for all its developments. For this, we have five major principles inherent to the Joomla development strategy aimed at achieving our goals:

### Stability

It is critical to our mission that the branches of versions of a Joomla product are always stable and ready for a release within a short time.

### Predictable, incremental software releases

We have a published release plan with concrete dates for releases.

### Strong backward compatibility support

Backward compatibility for any software platform is a high priority.

### Sound security policy

Our Security Strike team is always available and replies to issues in a timely manner.

### Open development process

Our development process is designed to be open and accessible for anyone who wishes to participate. We strive to create an environment where people work together to solve problems and bring innovative, fresh ideas to life in the software we produce.
