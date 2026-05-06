---
sidebar_position: 9
---

Common Errors
=============
Some frequently asked questions on Error messages and how to resolve them. 

As a developer you sometimes will be stuck in your code. 
If it happens to you, also have a look on https://joomla.stackexchange.com/ - a huge collection of valuable knowledge. 
Here we collect some frequently asked questions. 

Class [..] not found
--------------------

You need to understand the namespace concept as described in section General Concepts (work in progress)
Then check:
- Is the namespace defined in your manifest file? 
- Has every class in your extension the correct namespace?
- Is every filename correct and matches the namespace? 

Examples: 
Code: use FooNamespace\Component\Foos\Administrator\Extension\FooComponent

But the filename is src/Extension/FoosComponent.php 




:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::
