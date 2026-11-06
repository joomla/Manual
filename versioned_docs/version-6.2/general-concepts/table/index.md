---
title: Table
---

The Joomla Table class provides a framework which enables you to do CRUD operations (and more) on database tables. 
It is an implementation of the [Active Record](https://en.wikipedia.org/wiki/Active_record_pattern) design pattern. 
It's mainly used for the case where you're developing a Joomla component with its associated database table, 
and you're providing admin functionality for managing the data in the database table 
or displaying site pages associated with individual database records.

The Table functionality can be used for batch operations if the batch operation is split into individual record updates. 
However it doesn't support SQL operations on multiple records (eg selecting several records from a database table); 
for this see the [Joomla Database documentation](../database/index.md).

The Basic and Advanced table functionality relate to the standard Joomla Table class.

The Nested Set Tables descriptions relate to tables which have a tree structure. 