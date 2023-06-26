---
sidebar_position: 1
---

New features
===============
All the new features that have been added to this version.
Any changes in best practice.
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

#### Model states are a new class

File: libraries/src/MVC/Model/State.php
Description: The state of a model is not anymore a `CMSObject`. Instead of, it is a new class libraries/src/MVC/Model/State.php which inherits from a `Registry`. Like that are all functions available a state registry should have. The class itself is deprecated as only features from the registry should be used. In version 7.0 we are going to remove the state class all together and use then only the registry class.

For backwards compatibility, the state class supports direct property access though magic methods which will throw a deprecated warning when used.
