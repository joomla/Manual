---
title: Sustainable Extension Development Setup
---

Sustainable Extension Development Setup
=================

Unless you are writing a trivial extension and you are doing it just for a one-time quick test, you eventually run into the question how to make development easier, sustainable and professionell.
This section of the manual documents one way to setup a professional development setup, which allows you to do reliable coding, have a build script for your extensions and ensure quality with several tools.

While this tutorial provides a full setup, you *don't* have to switch all of your current setup to this. Each part can be used separately and you can substitute each part with your own solution.

This example is using Jetbrains PHPStorm as IDE and Github as storage and CI/CD solution, however you can of course use any other similar solution you want. The following setup description is here to not force you to reinvent the wheel for all of this, but to benefit from the works of others in this area. However there might be several reasons why you can't use one or the other tool in here and then you are encouraged to adapt this to your situation.

## Storing your source code

The first question is how to store your source code. While version control is a standard nowadays, how to structure the repository is still something which is left to the individual developer.
In this first chapter we are going through a possible structure of a git repository for your extension.

To read more go to the [Repository Setup](repo.md).

## IDE setup

The next section handles the configuration of PHPStorm.

To read more go to the [IDE Setup](ide.md).

## Release handling

With the setup of our repo and IDE we do have an extension to release. This section handles building a release with JoRobo.

To read more go to the [Release handling](release.md).

## Quality Assurance

Learn how to use phpstan to find bugs and how a consistent codestyle can help you.

To read more go to the [Quality Assurance setup](checks.md).

## Automated testing


## Step-by-step list to create setup for an existing extension

See the [Checklist](checklist.md).
