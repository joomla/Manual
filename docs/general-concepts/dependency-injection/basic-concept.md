---
title: Basic Concept
sidebar_position: 1
---
# Basic Concept
The basic idea behind Joomla dependency injection is that developers should no longer get access to key Joomla class instances by calling
```php
$obj = new JoomlaClass();
or
$obj = JoomlaClass::getInstance();
```
Instead they should make a request to the Dependency Injection Container (DIC):
```php
$obj = $container( – please give me an instance of JoomlaClass – );
```
or get an instance via the Application class or a Factory class which has been obtained from the DIC.

The main reason for this is to enable better testing by making it easier to mock classes. If the code has multiple calls to `JoomlaClass::getInstance()` then it's hard to mock that class for testing.

If instead the code always uses the DIC to get an instance of the class, then to mock it all we have to do is put the mocked class into the DIC instead of the real one. 
To make it less obvious that a specific class is being requested we can ask instead for a class which meets a particular interface:
```php
$obj = $container( – please give me an instance of a class that implements JoomlaInterface – );
```
The DIC will then return either the real class or the mocked class, depending upon how it has been configured. However, using a class name versus an interface name has no bearing on the functionality; as we shall see, the key used for putting things into and getting things out of the DIC is just a string, so we just have to ensure that we use the same key string for both operations.