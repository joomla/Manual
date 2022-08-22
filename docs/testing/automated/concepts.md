---
sidebar_position: 1
---

Concepts
=============

For Joomla! we are using different strategies to test the application.

# System Testing versus Unit Testing

System Testing and Unit Testing are complementary test strategies. In Joomla!, Unit Testing is mainly used to test the framework classes (for example, the classes in libraries/joomla). Unit tests test that an individual method (also known as function) in a class does what it is supposed to do. For example, a unit test is used to test that the methods in the JString class work as expected. Unit testing provides confidence that the framework classes work as expected and allows you to refactor these classes (improve the code without changing the functionality) and still have confidence that they still work correctly.

System tests test that the application works correctly from the user point of view. For example, a system test can test something simple, for example, that you can create a new menu item for a single article and show the menu item on the site. Or a system test can test something more detailed, for example that the parameters for a module all work as expected.

Designing and creating system tests requires that you know how to use the application. It does not require that you understand how the program is written. Application knowledge is more important than programming knowledge, so system tests can be designed and written by people with less technical knowledge of PHP or the Joomla! framework. 
