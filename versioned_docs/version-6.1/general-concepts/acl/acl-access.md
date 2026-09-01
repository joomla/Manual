---
title: Access
---

How Joomla Access Works
=======================

Joomla items such as Articles, Contacts and Menuitems have an Access field which is used in determining whether a user may or may not view that item. 

The value of the Access field is called the "Viewing Access Level", and it is basically an integer value which has an associated name; these level names can be seen on the admin back-end by selecting Users / Access Levels.

On that same form you can see the User Groups With Viewing Access to that Level. The administrator specifies the User Groups which are able to see an item with that Access Level.

When an administrator edits a User record, he/she can set in the Assigned User Groups tab the User Groups to which that User belongs. User Groups have a hierarchical (tree) structure, so that if a user belongs to a User Group which is a child of another, then that user is also a member of the parent User Group. 

For example, using the default Joomla User Groups, the Administrator User Group is a child of the Manager User Group, so a User who is assigned the Administrator User Group will also automatically belong to the Manager User Group. 

![Joomla Access levels](_assets/access-levels.jpg "Joomla Access levels")

Referring to the diagram, let's assume that the User belongs to User Groups (columns) A, C and D. The User may be assigned directly to one of these groups, or may belong to it because it's in the parent chain of a User Group to which the User has been assigned. 

The coloured diamonds represent the different Access Levels on the Joomla site.

The light blue Access Level allows visibility for User Groups A, D and E.

Because the User belongs to User Groups A and D, any item which has a light blue Access Level should be visible to this user.

If the User belongs to ***any*** User Group which is associated with an Access Level, then that User should be able to view it. It doesn't matter that the User doesn't belong to ***all*** the User Groups associated with an Access Level.

The red Access Level allows visibility for User Group E only.

Because the User doesn't belong to User Group E, any item which has a red Access Level should not be visible to this user. 

Following this approach you should see that the User should have visibility to item 5, but not to items 3 or 4. 

## Coding Approach
It's important to understand that Joomla doesn't magically apply the Access rules to ensure website visitors see only what they should be allowed to see. It's up to you when you're coding your extension to follow the example of the core Joomla components and apply the Access framework to your extension. Joomla does provide library functions which enable you (and the developers of the core Joomla components and modules) to apply the Access rules easily. 

When checking Access in your code, the easiest approach is to use the `User::getAuthorisedViewLevels` function:
```php
$user = Factory::getApplication()->getIdentity();
$levels = $user->getAuthorisedViewLevels();
```
The `getAuthorisedViewLevels` function returns an array of integers, which are the values of the Access Levels which this User should be allowed to view. In the diagram above, where the Access Levels are represented by colours, this array would be the set of colours which the user was allowed to view. 

(By the way, sometimes in the Joomla code you'll see `$groups = $user->getAuthorisedViewLevels();`, giving the impression that the function returns an array of User Groups, but this isn't the case and the code is misleading.)

So to check if a User may view a particular item, get the value of the item's Access field and check if that value is in the array returned by `getAuthorisedViewLevels`, eg 
```php
$levels = $user->getAuthorisedViewLevels();
$canView = in_array($item->access, $levels);
```

It's important to note that the `core.edit.own` permission does not inherently check if the user created the item. This can be accomplished by combining checking this permission with the item's created_by value, such as with `$user->authorise('core.edit.own', 'com_example.item.' . $this->item->id) && $this->item->created_by == $user->id`

However, note that Super Users should be able to see all items, regardless of the Access Level, so generally there's another check:
```php
 if ($user->authorise('core.admin')) {
   // this is a Super user – allow the user to view the item
```

If the user doesn't have access to view an item, then you should consider how best to report the error. 
- If the user is logged in you may wish to return an HTTP status 403 (Forbidden). 
- If the user isn't logged in then you may wish to return a status 403, or you may wish to redirect the user to the login screen with a message to login in order to be able to view the item.

You can find if a user is logged in or not by checking the `guest` property of the User object. For example, to return a 403 with a "not authorised" message if the user isn't logged in:
```php
if ($user->guest) {
    throw new \Exception(Text::_('JERROR_ALERTNOAUTHOR'), 403);
}
```
