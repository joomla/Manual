---
title: Advanced Table Functionality
sidebar_position: 2
---

This page covers more advanced functionality of the Joomla Table class.

The API definitions are at [Joomla Table APIs](cms-api://classes/Joomla-CMS-Table-Table.html).

## Checkout / Checkin

Checkout capability avoids the unexpected results which can arise when 2 users edit the same record simultaneously. 
The Joomla pattern is that whenever a component displays an "edit" form for a selected record (allowing the user to edit the record), 
then at that time the record is updated to set the `checked_out` field to the userid of the user editing the record, 
and the `checked_out_time` field to the current date/time. 
Another user viewing the same record then sees a padlock symbol against the "locked" record and is prevented from editing it.

When the user editing the record successfully saves his/her changes, or cancels the edit, 
then the record is "checked in" by resetting the `checked_out` and `checked_out_time` fields.

### Checkout

```php
checkOut(integer $userId, mixed $pk = null)
```

If the table has columns called `checked_out` and `checked_out_time` 
then this function sets the `checked_out` field to the passed-in `$userId`
and the `checked_out_time` field to the current date/time for the record identified by the primary key `$pk`
(or if `$pk` is null then the currently stored primary key is used, eg from the last `load()` call).

### Checkin

```php
checkIn(mixed $pk = null)
```

If the table has columns called `checked_out` and `checked_out_time` 
then this function resets the `checked_out` and `checked_out_time` fields for the record identified by the primary key `$pk`
(or if `$pk` is null then the currently stored primary key is used, eg from the last `load()` call).

### isCheckedOut

```php
isCheckedOut(integer $userid)
```

You can use this method to find if it's "safe" for the current user to update the currently loaded record. This method returns false if:

- the `checked_out` field of this record indicates not checked out (eg field has a value of 0), or,
- the `checked_out` field has the same value as `$userid` (ie it's checked out to this user), or,
- the `checked_out` field indicates that the record is checked out to another user, but that user doesn't have a current session record.

In these cases it's arguably "safe" to update the values in the record and check it in.

(The absence of a session record indicates that the user has logged out, 
or that his/her session has expired and Joomla has subsequently performed a cleanup operation on the session records. 
But if that user had been editing a record and left it in a checked out state, 
then it will continue to be checked out if the user logs out or just closes the browser tab, 
and the record is still shown with a padlock symbol against it. 
However, you can argue that in that case it's safe to override the checkout.)

The Joomla Table class doesn't include checkIn or checkOut functionality when you call methods such as `load()`, `bind()` or `store()`, 
but if you use `save()` as a shorthand for these then `checkIn()` is attempted within that method.

On the other hand, if your component controller and model inherit (either directly or indirectly) from the Joomla MVC `FormController` and `FormModel`
then you are likely to find that the presence of columns called `checked_out` and `checked_out_time` in your table 
will result in checkout / checkin functionality being incorporated automatically.

## ACL Assets

As described in the [ACL documentation](../acl/index.md) Joomla provides the ACL (Access Control List) framework for defining permissions 
which specify whether or not each user group may create, update or delete items.
These permissions may be set within the admin backend within the permissions tabs of the edit forms, and can be at several levels:

- at an overall component level (specified on the Global Configuration page)
- for individual categories of a component (specified when you edit a category of that component)
- for individual items of a component (eg article, contact), specified when editing that component item

Joomla stores all these permissions as "rules" within the assets table, 
and the `name` field in that assets table defines which of the above 3 cases the asset record refers to. 
For example, for `com_content` possible values of the `name` field are as follows:

- "com_content" – the ACL rules related to performing actions upon articles in general
- "com_content.category.2" – the ACL rules related to articles having a category which has id=2
- "com_content.article.4" – the ACL rules related to the article with id=4.

If a component allows setting ACL permissions at the individual record level, then the record should have a column called `asset_id`, 
and the value in this field of a record will be the `id` of the associated record in the assets table 
(ie the `asset_id` field is a foreign key, pointing to the asset record in the assets table).

The Table class has 2 public functions and 3 protected functions associated with managing assets.

### getRules

```php
getRules()
```

You might expect that after you had called `load()` to load a record you could use this function to find the associated asset rules. 
However it doesn't (it just returns null unless a previous `setRules()` call has been made) 
and to find the existing rules you need to read the associated assets record yourself. 
So it's arguably of little value outside core Joomla development.

You can, of course, implement a more sophisticated getRules method within your own table class that extends Joomla Table.

### setRules

```php
setRules(mixed $input)
```

This function enables you to define the ACL rules which should be applied against this record. 
In array form a set of rules would be like the example below:

```php
array("core.edit" => array(10 => 1, 11 => 0), "core.delete" => array(10 => 0, 11 => 1))
```

where 10 and 11 are ids of usergroups, and 1 is Allowed and 0 is Denied. In this example:

- core.edit entry: usergroup 10 is allowed to edit the item, while usergroup 11 is denied edit access
- core.delete entry: usergroup 11 can delete the item, while usergroup 10 is denied delete access

The `$input` parameter can be rules in the above array format, or in the equivalent json-encoded format, 
or in the Joomla Rules object format which is generated from passing either form to the Rules class constructor.

If you're developing a component which has ACL permissions on individual items, 
then use the [standard form field "rules"](../forms-fields/standard-fields/rules.md) in your XML edit file.

```xml
<field
    name="rules"
    type="rules"
    ...
/>
```

Then in `bind()` method you can call (where `$data` holds the array of values sent in the HTTP POST request):

```php
$this->setRules($data['rules']);
```

If you call `setRules()` to set the ACL permissions which should be applied to the record, 
and then call `store()` to save the record to the database, 
then the Table class functionality will update also the associated record in the assets table; you don't have to do this yourself.

### Get Asset helper functions

In writing new assets records the Table class needs to know an additional 3 items of information, 
which you can see by browsing the assets records using phpmyadmin, for example. 
These 3 items of information it requests by calling 3 protected functions, 
which Joomla expects that you will provide in your own table class which inherits from Joomla Table. These are

- `_getAssetName()` – to provide the name field – this is usually of the form "com_example.item.12"
- `_getAssetTitle()` - to provide the title field – this is usually the title of the com_example item
- `_getAssetParentId()` – to provide the position of the asset record in the asset hierarchy 
(implemented as a tree structure in the assets table using the Nested Model), by returning the parent asset id. 
For a com_example item this would usually be the record with just "com_example" as the name, 
ie the general ACL permissions for the com_example component.

Examples of these are in the sample module code at the end of this guide.

## Ordering

Many Joomla items include the concept of ordering, for example, modules have an order in which they are displayed in each possible template position. 
This is governed by a field called `ordering` in the database table, 
and when items are selected from the database the SQL query includes an ORDER BY `ordering` clause if they're to be output in order.

The Joomla Table class has 3 methods which relate to ordering.

### getNextOrder

```php
getNextOrder(string $where)
```

This determines the max value of the ordering field among the records selected by the optional where clause `$where`, and returns this max + 1.

Don't include the word "WHERE" in the `$where` string.

This function is useful if you're inserting a record into your table 
and you want it to appear at the end of the group of records identified in the where clause - 
you can set your ordering value to what is returned by `getNextOrder()`. 
If you want it to appear at the start you can set the ordering field to 0 (zero) and then use `reorder()` below.

### Reorder

```php
reorder(string $where)
```

This function reads the set of N records defined by the where clause `$where`, using ORDER BY `ordering` 
and then writes them back with the ordering fields nicely numbered from 1 to N.

### Move

```php
move(integer $delta, string $where)
```

This function basically finds the record with the next greater (if `$delta` is positive) or lesser (if `$delta` is negative) 
value of the ordering field, and it then swaps the ordering values of the two records.

Despite what the Joomla API definition says, the magnitude of `$delta` is irrelevant – 
the function always just moves the record by 1 in the ordering sequence.

This function might be useful if you provided users with a user interface which allowed them to move records up or down by one. 
However, Joomla provides a more sophisticated mechanism built using javascript for dragging a record to a new position. 
When a record is dragged the javascript recalculates the ordering values of all the displayed records 
and sends the updated ordering values to the server in an ajax request, and they are then written to the database. 
So if you used that approach, then you wouldn't need this `move` function. 

## Publish

```php
publish(mixed $pks = null, integer $state = 1, integer $userId)
```

This sets the `publish` field to `$state` for the set of records identified by the `$pks` primary key(s) array. 
These publish states in Joomla are conventionally identified by integer values, eg:

- 0 - unpublished
- 1 - published
- 2 - archived
- -2 - trashed

It also sets the `publish_up` field (if it exists) to the current date/time. 
However the condition in the source code for doing this is if the *currently loaded record* has a blank `publish_up` value 
(rather than if one of the records identified by `$pks` has a blank `publish_up` value). (This looks like a bug).

If `$pks` is an `array(field1 => value1, field2 => value2, …)` 
then this gets mapped to the SQL where clause WHERE field1 = value1 AND field2 = value2, … 
to identify the records to be updated. If `$pks` is absent then just the current loaded record is affected.

Any records in this set which are checked out to a user other than `$userId` are excluded. 
If there are no such records then any records of the affected set which are checked out to the user identified by `$userId` are checked in.

Note that this API isn't widely used within the core Joomla application, and you may wish to follow the example of main Joomla 
components and use the `publish()` method with the MVC AdminModel class, rather than use this API.

## Hits

```php
hit(mixed $pk = null)
```

A hits counter is usually used to count the number of times a webpage is visited. 
In Joomla you can record how many times a component is displayed on the frontend by using adding a hits column to the component's database table, 
and calling this function each time the component is displayed.

The function simply increments the value in the hits field in the record identified by the `$pk` key, 
or in the currently loaded record if `$pk` is null. 

## Reflection Methods

There are several reflection-like methods which provide information about the table which is being accessed

**`getTableName`** – returns the name of the table, "#__modules" for example

**`getKeyName`** – returns the name(s) of the primary key field(s)

**`getPrimaryKeys`** – returns an array of the primary key(s) and value(s)

**`getFields`** – returns an array of the names of the columns of the database table

**`hasPrimaryKey`** – checks if the primary key has a value set

**`hasField($name)`** – checks if the table has a field of that `$name` 

## Reserved Column Names and Aliases

Much of the functionality associated with the Table class relies upon certain columns being given specific names, 
such as "ordering", "checked_out" and "asset_id". 
The presence of a column named with one of these special names is sufficient to switch on functionality in the Table class.

For a number of these names it is possible to set up an alias, 
so that if the field in which you store your published state is called "state" 
then you can use setColumnAlias() to set up an alias, for example,

```php
$table->setColumnAlias('published', 'state');
```

The corresponding getter function is,

```php
$alias = $table->getColumnAlias('published');
```

which using the example above would return the string "state".

In this way you are free to follow your own column naming convention but at the same time get access to Joomla core functionality. 
However, it's my opinion that you shouldn't take that approach, 
and instead you should name your columns to follow exactly the Joomla approach. 
The reason is that while Joomla helps you out with aliases here, 
there are other areas of code where aliases for those fields may not be supported, either now or in the future. 

In particular Joomla core javascript code assumes that certain fields are given certain names, and doesn't always support aliases. 
An exception to the above is using the name "state" for the published state of a record instead of "published". 
Because com_content and other core Joomla components use "state" you are pretty safe taking that approach, 
because new code will always have to support those core components.

For reference, the fields with special meanings are listed in the table below

| Field names | Meaning |
|-------------|---------|
| **The following fields can be aliased in the Table class** ||
| checked_out, checked_out_time | the userid to which the record is checked out, and the checkout date/time |
| hits | the number of hits for that item |
| ordering | the integer reflecting the record's order |
| published | the published state of the item (Unpublished / Published / Trashed etc). Some core Joomla components use "state" for this column |
| publish_up | the date/time the record was first published |
| **The following fields have special meanings within Table, but cannot be aliased** ||
| asset_id | the foreign key pointing to the associated assets record |
| **The following fields have special meanings elsewhere in Joomla (this isn't an exhaustive list)** ||
| id | the autogenerated id of the table |
| title | the title of the item |
| alias | the alias of the item |
| language | the language code |
| access | the id of the Access Level |
| params | a JSON-encoded string of parameters |
| created_user_id, created_time | userid of user who created the item, and date/time |
| modified_user_id, modified_time | userid of user who modified the item, and date/time |
| catid | id of the assigned category |
| parent_id, lft, rgt, level, path | fields associated with nested tables |

## Sample Module

The example module below incorporates several aspects described above. 
It's the same module as in the previous section describing basic table operations.

### Module Code

From the Joomla Manual Examples repository download the [mod_table_example module code](https://github.com/joomla/manual-examples/tree/main/module-example-table/mod_table_example).

### Module Installation

Zip up the mod_table_example directory to create mod_table_example.zip.

Within your Joomla administrator go to Install Extensions and via the Upload Package File tab 
select this zip file to install this sample mod_table_example module.

Make this module visible by editing it (click on it within the Modules page) then:

- making its status Published
- selecting a position on the page for it to be shown
- on the menu assignment tab specify the pages where it should appear

### Using the module

When you navigate to your site page where the module is displayed, then the module code will run.

The module contains functionality relating to this page (in the function `doAdvancedTableOperations`),
as well as the function `doBasicTableOperations` which relates to the previous section.

It uses its own record in modules table to illustrate Table method calls, specifically:

- using `isCheckedOut()` to check if a record is checked out or not
- calling `getRules()` to obtain the ACL, but as explained above, this returns null
- defining the ACL rules for the module record using `setRules()`, including defining the 3 protected functions to provide values for fields in the assets table
- use of the reflection method `getTableName()`
- use of the some of the ordering methods
