---
sidebar_position: 1
---

#### Model states are a new class

File: libraries/src/MVC/Model/State.php
Description: The state of a model is not anymore a `CMSObject`. Instead of it is a new class libraries/src/MVC/Model/State.php which contains a get and set function to access and store values in the model state. For backwards compatibility, the state supports direct property access though magic methods which will throw a deprecated warning when used. This is the main reason we did not use `Joomla\Registry\Registry` as it doesn't support direct property access. Beside that is the new class much faster and has a lower footprint as it doesn't store values in nested arrays.
