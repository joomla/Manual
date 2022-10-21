---
sidebar_position: 997
---

4.2 to 4.3
==========

:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

Joomla! 4.3 is a feature release. It also holds all deprecations which are targeted
to be remove in 6.0.

Minimum Developer Requirements
==============================

As part of our development strategy we need to increase our minimum requirements for
building Joomla!.

* Nodejs 18

Testing Framework
=================

Starting with Joomla! 4.3 we switched our automated e2e testing from 
[codeception](https://codeception.com) to [cypress](https://www.cypress.io).

For older versions then Joomla! 4.3 we still provide the codeception
[joomla-browser](https://github.com/joomla-projects/joomla-browser).

Starting with 4.3 we provide a [node package](https://github.com/joomla-projects/joomla-cypress) 
for testing Joomla! in cypress.

For more information about system tests can be found at 
[System Tests](/docs/testing/automated/system/)

