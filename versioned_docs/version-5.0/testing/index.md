---
sidebar_position: 10
---

Testing
=============

# Overview

Testing Software is an important part of software development. For Joomla! we have different levels of testing:

## Automated Testing

For the automated testing we are using a continuous integration (CI) server drone. Any change that is made runs a series of tests on the CI system. We test if the code style for PHP, CSS and javascript is correct, run unit test for the supported PHP versions and run end to end tests. All this not only runs on different PHP version we are also testing different database version. At the end of the test we create an installable package with the changes included to support our manually testing. If something fails we save information about the reason.

## Manually Testing
While automated testing is more focused on making sure that a change doesn't break existing functionality, is manually testing focused on the change itself. Always tow people have to confirm that a change does for what is made. This can be a bugfix or new functionality.
