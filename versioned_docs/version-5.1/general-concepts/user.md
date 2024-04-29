---
title: User
---
## Overview
This page describes the functionality associated with the Joomla `User` class, accessible via the [User API](https://api.joomla.org/cms-5/classes/Joomla-CMS-User-User.html). At the bottom of the page there is also the code of a module that you can install to demonstrate some of this functionality.

In general, the `user` represents the identity of someone who can log on to a Joomla instance, whether that be the front-end, back-end (Administrator functionality) or both. Associated with the `user` is

- static information such as username and email address, as well as user preferences regarding language, preferred editor, etc.
- dynamic information such as the last logon date/time
- privileges data, specifying the privileges that each user has, which allow him/her to perform actions on items within the Joomla instance.

The Joomla User APIs allow you to view the user account attributes, modify those attributes, check user privileges, delete user accounts and perform user account management functions such as block an account.

Setting some of the user attributes impacts the user's ability to log on – e.g. blocking the account or changing the password. However, the User API code won't include other actions that you may need to take in conjunction with that – e.g. sending users an email to warn them that they're blocked. 

## Basic Operations
To get the User object for the currently logged-on user:

```php
use Joomla\CMS\Factory;
$user = Factory::getApplication()->getIdentity();
```

If no user is logged on then `Factory::getApplication()->getIdentity()` returns a "blank" user object, with the `id` field set to 0 (zero).

To get information about any other registered user you can use functions of the [UserFactory](https://api.joomla.org/cms-5/classes/Joomla-CMS-User-UserFactory.html) class (which you get from the Dependency Injection Container)

```
use Joomla\CMS\User\UserFactoryInterface;
...
// Get the UserFactory 
$userFactory = Factory::getContainer()->get(UserFactoryInterface::class);
// to get User object for user with id = 99
$user = $userFactory->loadUserById(99);
// to get User object for user with username = "joomuser"
$user = $userFactory->loadUserByUsername("joomuser");
```

Another way commonly used within the Joomla code to get a User object is by instantiating it directly. If you pass the id of a user then it will load that User object:

```php
use Joomla\CMS\User\User;
...
$id = 99;
$user = new User($id);
```

However instantiating classes like this (rather than via factory methods obtained from the Dependency Injection Container) does make it harder for you to mock classes for unit testing. 

Once you have the User object, you can display information about the user. For example, this code displays the current user's name, email and user name:

```php
echo "<p>This user's name is {$user->name}, email is {$user->email}, and username is {$user->username}</p>";
```

## User Object Properties

Joomla stores some of the data items associated with a user in fixed fields in the `#__users` table, and other data items in a `params` field within the `#__users` table. This is then reflected in what data items you have available as properties of the `User` object, and what data items you must use the `params` property to access.

With regard to the admin Users functionality, generally the data items in the fixed fields are in the first tab in the admin Users Manage / Edit form (currently named "Account Details"), and the attributes stored in the params are visible in a subsidiary tab (currently named "Basic Settings").

These are the properties automatically generated on a call to `getIdentity()`, in the order defined in the API documentation

- id - The unique, numerical user id. (In other Joomla database tables this id is used as the foreign key to point to the associated user record).
- name - The name of the user. (e.g. Vint Cerf)
- username - The login/screen name of the user. (e.g. shmuffin1979)
- email - The email address of the user. (e.g. crashoverride@hackers.com)
- password - The encrypted version of the user's password
- password_clear - Set to the user's password only when it is being changed. Otherwise, remains blank.
- block - Set to '1' when the user is set to 'blocked' in Joomla (i.e. prevented from logging on)
- sendEmail - Specifies whether this user should receive system emails or not
- registerDate - Set to the date when the user was first registered.
- lastvisitDate - Set to the date the user last visited the site.
- activation - an activation token. This is used when the site allows users to self-register. To complete account setup, an email is sent to the person who has self-registered, and the link embedded in the email contains this activation token.
- params - a json string of name/value pairs for the subsidiary user attributes (see below).
- groups - an associative array of group id => (string) group id for the user groups that this user is a member of
- guest - If the user is not logged in, this variable will be set to '1'. The other variables will be unset or default values.
- lastResetTime - Set to the last time the password was reset.
- resetCount - Counts the number of password resets.
- requireReset - indicates that this user will be forced to reset the password the next time they log in.

The user attributes that are stored in the `params` field in the database, and that are available via `$user->getParam()` are the following.

- admin_style – the id of the template on the back-end.
- admin_language – the language tag of the language on the back-end
- language – the language tag of the language on the front-end
- editor – the preferred editor
- timezone – the user's selected timezone (one of the standard PHP time zones). The timezone is also available via `$user->getTimezone()`.

For example, to get the user's preferred front-end language call the `getParam()` member function of the `User` object, passing in the name of the parameter you want (i.e. 'language') along with a default value in case it is blank.

```php
use Joomla\CMS\Factory;
$user = Factory::getApplication()->getIdentity();
$language = $user->getParam('language', 'the default');

echo "<p>Your Frontend language is set to {$language}.</p>";
```

## Determining Status

Frequently, you will just want to make sure the user is logged in before continuing. The `guest` property will be set to '1' when the current user is not logged in. When the user is authenticated, `guest` will be set to '0'.

```php
$user = JFactory::getApplication()->getIdentity();
if ($user->guest) {
	echo "<p>You must login to see this content.</p>";
} else {
	echo "<p>You are logged in, you can see the content.</p>";
}
```

(If you've used `loadUserById` or `loadUserByUsername` to find the user object of another user on the system, then note that `guest` does not indicate whether this user is "logged on" or not (in the sense of there being a current session cookie for that user); `guest` set to 0 is more an indication that a valid user record has been loaded.) 

## Privileges

Not all users are given equal rights. For instance, a Super Administrator may be able to edit anyone's content, while a Publisher may only be able to edit their own. Certain articles may be confidential and may be viewed only by users who have permission to view them.

There are 4 method calls in the User API relating to privileges

### authorise()

The `authorise()` member function can be used to determine if the current user has permission to do a certain task. The first parameter is used to identify which task we wish to check being allowed. The second represents the component we wish to retrieve the ACL information from.

```php
$user = Factory::getApplication()->getIdentity();

if ($user->authorise('core.edit', 'com_content'))
{
	echo "<p>You may edit all content.</p>";
}
else
{
	echo "<p>You may not edit all content.</p>";
}

if ($user->authorise('core.edit.own', 'com_content'))
{
	echo "<p>You may edit your own content.</p>";
}
else
{
	echo "<p>You may not edit your own content.</p>";
}
```

### getAuthorisedCategories()

You call `getAuthorisedCategories()` passing in the component and the action you want to perform, and the method returns an array of category ids on which this user can perform the action. For example:

```php
$user->getAuthorisedCategories('com_content', 'core.delete')
```

returns an array of category ids of `com_content` categories which this user can delete.

### getAuthorisedGroups()

`$user->getAuthorisedGroups()` returns an array of User Group ids which this user is within. You can see the User Group ids by navigating to the admin Users / Groups page.

### getAuthorisedViewLevels()

`$user->getAuthorisedViewLevels()` returns an array of Viewing Access Levels ids (which you can see by navigating to the admin Users / Access Levels page). 
Generally components that want to restrict viewing pages assign an Access Level to each item – one of the Access Levels which you see on that admin page – and then store the id of the assigned access level against the item in a database field called `Access` within the item's database table. 
Then to check if a given user may view that item you would check if the value in the `Access` database field was within the array of AuthorisedViewLevels for that user.

For example, if you wanted to restrict an article called "article50" to a Viewing Access Level called Special (with an id of 3), then you would put 3 in the Access field of the Content record for article50, and a user would be allowed to view it if the array returned by `getAuthorisedViewLevels()` included the element 3. 

## Database Operations

The diagram below shows how you can use the User API to update user data. Black arrows indicate flow of control: green arrows indicate direction of data.

Note that the editing of user data is managed within the Joomla admin Users functionality (`com_users` component), where there are many checks performed to ensure that users can perform only operations that they are authorised to perform. For example, general users may not grant themselves additional privileges.
If you use the User APIs then the vast majority of these validations are not performed, so you will likely have to build in additional validation checks yourself.

The `User` class uses the Joomla `Table` class to perform CRUD operations at the database level. Operations which change the User record will cause [Plugin User Events](https://docs.joomla.org/Plugin/Events/User) to be raised. 

:::note[TODO]
  Update above link when plugin events are moved to the manual
:::

![User database operations](./_assets/user.jpg "User Database operations")]

### load()

Use `$user->load($id)` to load in from the database the attributes of a user record (identified by `$id`) from the database. The User class code will read the data from the database and (assuming it's a valid user) will store the attributes in the class properties, including the params field which stores the additional attributes. You can then access these properties directly, e.g. `$user->name`.

### bind().

Use `$user->bind($data)` if you have an associative array `$data` of property names to property values, e.g. `array('name' => 'Vint Cerf', 'username' => 'shmuffin1979')`. The `bind()` method will then update the local properties with the values passed in.

You can similarly set the values of the properties directly `$user->name = 'Vint Cerf'` or the params property via `setParams()`.

### save()

Use `$user->save()` to write to the database the updated properties that you have set. The `save()` code copies the property values into its 'table' structure and calls the Table class bind() and store() methods to write them to the database.

### Inserting Records

You can similarly use the above mechanism to insert new user records, the only difference being that you don't load an existing record from the database first.

### Deleting Records

To delete a user record you first load it from the database then use the `delete()` method, eg:

```php
$user = Factory::getContainer()->get(UserFactoryInterface::class)->loadUserById(99);
$user->delete();
```

Related records in other user tables (such as in `#__user_usergroup_map` that holds the mapping to user groups and in `#__messages` which holds user-user messages) are deleted as well, and this operation triggers the events `onUserBeforeDelete` and `onUserAfterDelete` so that plugins can also delete any related user data. 
However, if the user has, for example, created articles or is associated with a contact record then the references to the user's id in those records will remain. 

## Sample Module code

Below is the code for a simple Joomla module that you can install and run to demonstrate use of the Joomla User API functionality. You can also download the code from [download mod_sample_user zip file](./_assets/mod_sample_user.zip).

In a folder mod_sample_user create the following two files: 

```php title="mod_sample_user/mod_sample_user.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" version="4.4" client="site" method="upgrade">
    <name>User demo</name>
    <version>1.0.1</version>
    <description>Code demonstrating use of Joomla User class</description>
    <files>
        <filename module="mod_sample_user">mod_sample_user.php</filename>
    </files>
</extension>
```

```php title="mod_sample_user/mod_sample_user.php"
<?php
defined('_JEXEC') or die('Restricted Access');

use Joomla\CMS\Factory;
use Joomla\CMS\Language\LanguageHelper;
use Joomla\CMS\User\UserFactoryInterface;

$input = Factory::getApplication()->input;

// find the user - either from username=xxx parameter or current user
if ($input->exists('username'))
{
    $username = $input->get('username', "", "STRING");
    echo "Getting details for {$username}<br>";
    $user = Factory::getContainer()->get(UserFactoryInterface::class)->loadUserByUsername($username);
}
else
{
    $user = Factory::getApplication()->getIdentity();
}
if ($user->id == 0)
{
    echo "Please logon or provide a valid username as URL parameter";
    return;
}

// output the user's email address and Frontend language
$language = $user->getParam('language', 'the default');
echo "Email address of {$user->name} is {$user->email}, Frontend language is {$language}<br>";

// Set new Frontend language of this user if userlanguage=xxx parameter set
// This will fail if you try to change the language of a Super User, and you're not logged on as a Super User
if ($new_language = $input->get('userlanguage', "", "STRING"))
{
    if (array_key_exists($new_language, LanguageHelper::getContentLanguages()))
    {
        $user->setParam('language', $new_language);
        if ($user->save())
        {
            echo "Language successfully set to {$new_language}<br>";
        }
        else
        {
            echo "Setting language to {$new_language} failed<br>{$user->getError()}<br>";
        }
    }
    else
    {
        echo "Setting language to {$new_language} failed - language doesn't exist<br>";
    }
}

// if we're on a single article page, then check if the user can edit the article
$option = $input->get('option', "", "cmd");
$view = $input->get('view', "", "string");
$id = $input->get('id', 0, "int");

if ($option == "com_content" && $view == "article")
{
    if ($user->authorise('core.edit', "com_content.article.{$id}"))
    {
        echo "{$user->name} may edit this article<br>";
    }
    else
    {
        echo "{$user->name} may not edit this article<br>";
    }
}
```

Zip up the `mod_sample_user` directory to create `mod_sample_user.zip`.

Within your Joomla Administrator go to Install Extensions and via the Upload Package File tab select this zip file to install this sample user module.

Make this module visible by editing it (click on it within the Content / Site Modules page) then:

- making its status Published
- selecting a position on the page for it to be shown
- on the menu assignment tab specify the pages it should appear on

When you visit a site web page then you should see the module in your selected position. The module does the following:

- gets the user object, and displays the user's name, email address and preferred front-end language. You define the user to select by either logging in, or by specifying a parameter to the URL username=XXX (replacing XXX by a valid username on the system).
- if you specify a URL parameter e.g. userlanguage=es-ES the code will set this language (Peninsular Spanish in this instance) as the preferred front-end language of the user (provided this language is installed on the system as a Content Language).
- if you navigate to a page which displays a single article, then the code will output whether this user may edit that article or not.

You can easily adapt the module code to experiment with some of the other API calls described above. 