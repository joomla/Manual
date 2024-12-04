---
title: Dispatcher Class for Components
sidebar_position: 2
---
Dispatcher Class for Components
===============================

The Dispatcher class comes into play whenever Joomla wants to run a component in order to capture the output to display on the web page. The class has one main function: `dispatch()`, which will run the component.

So to run a component you first get its Extension class then:

```php
$extension->getDispatcher()->dispatch();
```

How the Extension class gets the Dispatcher class instance via the `getDispatcher()` call is covered in the Dependency Injection documentation; you will find the code for `getDispatcher()` in libraries/src/Extension/Component.php - the Component class in this file is in the inheritance chain of the Extension instance. 

(You may be wondering why isn't there just a dispatch() function in the Extension class, rather than having this additional Dispatcher class. I think it's because the Joomla designers wanted a common Extension / Dispatcher pattern among components, modules and plugins, and the Dispatcher class for plugins is a lot more complex.)

For components the main purpose of the Dispatcher `dispatch()` code is to 
1. work out which component Controller to use, and then 
2. instantiate it
3. call its `execute()` method – basically running the MVC component, starting with the controller
4. call its `redirect()` method (to handle where an HTTP redirect is required)

It works out the Controller to use by examining the HTTP query parameters, in particular the *task* parameter. 
It uses the *task* by considering its parts as `<controller type>.<method>` (taking 'display' as default if either part is missing). It will then 
- create an instance of the class `<Controller type>Controller`
- call its function `<method>` 

If the *task* parameter is missing then it will instantiate `DisplayController` and call its `display()` method.

The Controller will be prefixed with the site or administrator namespace prefix to form the fully qualified classname.

(If you're familiar with Joomla 3 components, then you're probably now realising that this is basically the same as you would have had in your entry point file, as described in [Joomla 3 Model-View-Controller](https://docs.joomla.org/Model-View-Controller) The *task* parameter is treated in much the same way in Joomla 4, except that the DisplayController now fits in better with the other controllers. By the way, you may see for some Joomla components an AjaxController.php. Joomla **hasn't** examined the XHR bit and decided to route to an AjaxController because of it. Rather it's because the client javascript has set 'ajax.something' in the task parameter of the Ajax HTTP request.)

If your component uses the *task* parameter as described above to route to the appropriate controller and method then you'll probably not need to define your own Dispatcher class and can use the standard ComponentDispatcher class provided by Joomla in libraries/src/Dispatcher/ComponentDispatcher.php. 