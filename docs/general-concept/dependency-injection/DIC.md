---
title: The Dependency Injection Container
sidebar_position: 2
---
# The Dependency Injection Container
The Joomla Dependency Injection Container, DIC for short, is basically a repository of key-value pairs where: 
- the key is a string which is (usually) the fully qualified name of a class or interface 
- the value is an instance of the relevant class, or a function that returns an instance of that class.

It doesn't *really* matter what the key is set to - as long as it's intelligible and you use the same key for putting entries in and taking entries out. Of course, it has to be unique.

![DIC](_assets/dic.jpg "DIC")

You put things into the container using `set()` passing: 
- the class name or interface name 
- a function which returns an instance of the class (or the value can be just an instance of the class, without the enveloping function) 
- a boolean defining whether the class instance may be shared or not (ie if there is a second request to the DIC to supply that instance, does it return the same instance or a new one)
- a boolean defining whether this entry into the DI container is protected or not (an error will be raised if you try to overwrite a protected entry by calling `set()` again using the same key).

The function `share()` is basically the same as `set()` with the shared boolean set to true. 

You get things out of the container by calling `get()` passing the key of the resource you want. The DI functionality will 
- find the key in the container 
- if the value isn't already a class instance, then it will run the associated function to generate an instance of the class 
- if the resource is shared, it will store the class instance, so that on subsequent invocations of `get()` it can just return the instance 
- return the class instance to you

You can also define aliases for each key in the container, which means that you call `get()` passing either the key or an alias of the key. 