---
sidebar_position: 1
title: Authentication and User Events
toc_max_heading_level: 3
---

Authentication and User Events
==============================

Authentication and user events are categorised into:

- Login / Logoff Events - users logging on or logging off

- Database Table Events - modification of the users and usergroups records

- Username and Password Reminder Events

- Miscellaneous - currently only onUserLoginButtons

To receive the onUserAuthenticate event your plugin must be registered as a system plugin.

To receive the other onUser... events your plugin can be registered as a user plugin.

## User logon / logoff and Cookies

This section gives a brief description of how Joomla handles user simple logon, logoff and sessions,
to help you understand how the plugin events fit into the Joomla authentication and authorisation process.
It doesn't cover multi-factor authentication, which involves `multifactorauth` plugins and events.

### Session Cookie

After a user logs into Joomla (front-end or back-end) in an HTTP request Joomla sends back in the HTTP response a session cookie which is stored in the user's browser. 
Joomla also stores this cookie on the server, together with information about the user, 
for example, the user's id, and when the user last accessed the web site.

When the user navigates to another page then the browser sends with the next HTTP request the cookie.
From the cookie Joomla then retrieves the information stored on the server, including the user's id.
Joomla treats this user as continuing to be logged on, and doesn't prompt again for username and password.

No user or authentication events are triggered during this process of retrieving the user from the session cookie.

The period of time that the session cookie is valid for is determined by the Global Configuration / System - Session Lifetime value.

Consider the session lifetime being 5 minutes.
Then if the user accesses the website at 12.00 (and treated as logged on), 
but doesn't access the site again until 12.06,
then the session cookie will have expired and the user is treated as being logged out.

(Note that Joomla incorporates "keep alive" functionality, which involves javascript code sending HTTP "keep alive" Ajax HTTP requests to the server, 
which keeps the session cookie being updated and not expiring. 
These are sent, for example, if an administrator is editing an article; this may take a significant period of time, 
and it would be frustrating to click on Save and find that the updates were rejected because
the administrator was no longer logged in.)

### Logging in

Once the session cookie has expired the user must once again be logged in. 
This process of logging in does trigger authentication and user events.

As well as logging in being handled by the user entering again the username and password,
it can also be initiated via the Remember Me functionality - if the user clicked the Remember Me checkbox when he/she logged in.

The Remember Me functionality must be switched on in Joomla by

- enabling the System - Remember Me plugin

- enabling the Authentication - Cookie plugin, and specifying the Cookie lifetime in its parameters.

If the user is not logged in (eg if session cookie has expired) 
then the Remember Me plugin:

- checks if there's a Remember Me cookie (which hasn't yet expired)

- if there is, then it initiates the user logon based on this cookie.

This functionality is triggered by the [onAfterInitialise](./application.md#onafterinitialise) event. 

### Authentication

Authentication determines the user's identity (using credentials such as username and password, or using a cookie).

Authorisation determines what the user is permitted to do.

For example, a user may authenticate correctly (provide the correct username and password) on the Joomla back-end,
but may not be authorised to access the administrator functionality.

At the start of the logon process the onUserAuthenticate event is dispatched, 
and Joomla looks to one of the plugins handling this event to authenticate the user.

For example:

- the Authentication - Joomla plugin handles authentication based on the username and password

- the Authentication - Cookie plugin handles authentication based on the Remember Me cookie.

Joomla passes in the plugin event a Joomla\CMS\Authentication\AuthenticationResponse instance (see libraries/src/Authentication/AuthenticationResponse.php),
and expects the plugin to fill in the fields of this instance.
In particular the status fields should be set to one of the values in libraries/src/Authentication/Authentication.php.

Note that if a plugin successfully authenticates a user 
then it's usual for it to [stop the event propagation](../advanced-features.md#stop-event-propagation).

### User Login events

If the user fails to authenticate then the onUserLoginFailure event is triggered.

If the user successfully authenticates then the onUserAuthorisation event is triggered.
This gives plugins the opportunity to reject the login, by calling `$event->addResult($auth)`,
passing an AuthenticationResponse instance (`$auth`) with status set to `Authentication::STATUS_DENIED`. 
If a plugin rejects the login then onUserAuthorisationFailure is dispatched, and the login process finishes with login failure.

Assuming there is no rejection from the onUserAuthorisation event,
then next the onUserLogin event is triggered. 
This again gives plugins the opportunity to reject the login, by calling `$event->addResult(false)`.
If a plugin rejects the login then onUserLoginFailure is dispatched, and the login process finishes with login failure.

However, the Joomla user plugin (in plugins/user/joomla.php) also handles the onUserLogin event, and if it doesn't find a problem
then it sets up the session cookie to treat the user as logged in. 
So even though another plugin rejects the login in the onUserLogin event, by default the user is still treated as logged in by Joomla. 
For this reason, if you want to reject a login for some reason then it is better to do it in handling the onUserAuthorisation event.

If the login is not rejected by a plugin then the event onUserAfterLogin is triggered,
and the login process finishes with login success.

## Login / Logoff Events

### onUserAuthenticate

#### Description

This event is triggered to perform authentication of the user's credentials.

Joomla passes a Joomla\CMS\Authentication\AuthenticationResponse instance (see libraries/src/Authentication/AuthenticationResponse.php),
and expects the plugin to fill in the fields of this instance.
In particular the status fields should be set to one of the values in libraries/src/Authentication/Authentication.php.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AuthenticationEvent has the following arguments:

- **`credentials`** - an array containing the username, password and secret key, available via `$event->getCredentials()`

- **`options`** - an array of options, available via `$event->getOptions()`, for example from a site login form:

```php
  "remember"  => true,  // whether Remember Me was checked or not
  "return"    => "index.php?option=com_users&view=profile",   // return URL
  "entry_url" => "http://<domain>/index.php?option=com_users&task=user.login", // where called from
  "action"    => "core.login.site"   // or could be "core.login.administrator"
```

- **`authenticationResponse`** - an instance of Joomla\CMS\Authentication\AuthenticationResponse, 
which is available by calling `$event->getAuthenticationResponse()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

You can provide an authentication reponse by updating the AuthenticationResponse which is passed in. For example,

```php
use Joomla\CMS\Authentication\Authentication;
...
$response = $event->getAuthenticationResponse();

// if successful authentication:
$response->status = Authentication::STATUS_SUCCESS;
$response->username = ...  // fill in other fields of AuthenticationResponse from the users record

// if unsuccessful authentication:
$response->status = Authentication::STATUS_FAILURE;
// you can fill in the $response->error_message, but provided it's not an API authentication 
// then it's probably better just to call enqueueMessage directly.
```

You don't call `$event->addResult` with the authentication reponse.

#### Examples

You can find an example at [Creating an Authentication Plugin for Joomla](https://docs.joomla.org/J3.x:Creating_an_Authentication_Plugin_for_Joomla).
This example is for Joomla 3, so it doesn't include aspects such as namespacing, dependency injection or the newer method of handling events,
but the core logic of the plugin is still valid.

### onUserLoginFailure

#### Description

This event is triggered if the user fails to authenticate. 
It is also triggered if a plugin responds false to the onUserLogin event.

#### Event Arguments

The event class \Joomla\CMS\Event\User\LoginFailureEvent has the following arguments:

- **`authenticationResponse`** - an instance of Joomla\CMS\Authentication\AuthenticationResponse, 
which is returned from calling `$event->getAuthenticationResponse()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`options`** - an array of options, available via `$event->getOptions()`, as described in [onUserAuthenticate](#onuserauthenticate)

#### Return Value

None

### onUserAuthorisation

#### Description

This event is triggered after successful authentication. 
It allows plugins to reject the login attempt, eg because the user isn't permitted to perform the operation.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AuthorisationEvent has the following arguments:

- **`authenticationResponse`** - an instance of Joomla\CMS\Authentication\AuthenticationResponse, 
which is returned from calling `$event->getAuthenticationResponse()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`options`** - an array of options, available via `$event->getOptions()`, as described in [onUserAuthenticate](#onuserauthenticate)

#### Return Value

To return an authorisation failure do something like:

```php
use Joomla\CMS\Authentication\Authentication;
...
$response = $event->getAuthenticationResponse();
$response->status = Authentication::STATUS_DENIED;
$event->addResult($response);
$this->getApplication()->enqueueMessage($this->getApplication()->getLanguage()->_('JERROR_LOGIN_DENIED'), 'warning');
```

In general it's best to use `enqueueMessage` to output the message which you want to display,
rather than relying on setting the `$event->error_message` property.

### onUserAuthorisationFailure

#### Description

This event is triggered if a plugin handling onUserAuthorisation rejects the login 
(by setting the authenticationResponse status to Authentication::STATUS_EXPIRED or Authentication::STATUS_DENIED).

#### Event Arguments

The event class \Joomla\CMS\Event\User\AuthorisationFailureEvent has the following arguments:

- **`authenticationResponse`** - an instance of Joomla\CMS\Authentication\AuthenticationResponse, 
which is returned from calling `$event->getAuthenticationResponse()`. 
This is the AuthenticationResponse instance which was returned by the plugin which rejected the login.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`options`** - an array of options, available via `$event->getOptions()`, as described in [onUserAuthenticate](#onuserauthenticate)

#### Return Value

None

### onUserLogin

#### Description

This event is triggered after successful authentication and authorisation. 

#### Event Arguments

The event class \Joomla\CMS\Event\User\LoginEvent has the following arguments:

- **`authenticationResponse`** - an instance of Joomla\CMS\Authentication\AuthenticationResponse, 
which is returned from calling `$event->getAuthenticationResponse()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`options`** - an array of options, available via `$event->getOptions()`, as described in [onUserAuthenticate](#onuserauthenticate)

#### Return Value

You can reject the logon attempt by doing:

```php
$event->addResult(false);
```

However, as described above in [User Login events](#user-login-events),
the Joomla user plugin still sets the session cookie to log the user on. 
For this reason, I'd recommend using [onUserAuthorisation](#onuserauthorisation) instead if you have a reason to reject a login attempt.

### onUserAfterLogin

#### Description

This event is triggered after a user has successfully logged in. 

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterLoginEvent has the following arguments:

- **`options`** - an array of options, available via `$event->getOptions()`, as described in [onUserAuthenticate](#onuserauthenticate)

- **`authenticationResponse`** - an instance of Joomla\CMS\Authentication\AuthenticationResponse, 
which is returned from calling `$event->getAuthenticationResponse()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

### onUserLogout

#### Description

This event is triggered when a user logs out. 

#### Event Arguments

The event class \Joomla\CMS\Event\User\LogoutEvent has the following arguments:

- **`parameters`** - an array of 2 elements "username" and "id" of the users record, available via `$event->getParameters()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`options`** - an array of options with 1 element "clientid" - set to 0 for site and 1 for administrator, available via `$event->getOptions()`, 

#### Return Value

You can try to reject the logout attempt by doing:

```php
$event->addResult(false);
```

This will cause the onUserLogoutFailure event to be triggered instead of onUserAfterLogout,
but apart from that it doesn't really do anything. The user is still logged out.

### onUserAfterLogout

#### Description

This event is triggered after a user successfully logs out. 

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterLogoutEvent has the following arguments:

- **`options`** - an array of options with 2 elements "clientid" - set to 0 for site and 1 for administrator, 
and "username". It is available via `$event->getOptions()`, 

- **`parameters`** - an array of 2 elements "username" and "id" of the users record, available via `$event->getParameters()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

### onUserLogoutFailure

#### Description

This event is triggered after a user logs out, and a plugin handling onUserLogout returns `false`. 
The user is logged out nevertheless.

#### Event Arguments

The event class \Joomla\CMS\Event\User\LogoutFailureEvent has the following arguments:

- **`parameters`** - an array of 2 elements "username" and "id", available via `$event->getParameters()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`options`** - an array of options with 1 element "clientid" - set to 0 for site and 1 for administrator, available via `$event->getOptions()`, 

#### Return Value

None

## Database Table Events

### onUserBeforeSave

#### Description

This event is triggered before a `users` record is created or updated in the database.

#### Event Arguments

The event class \Joomla\CMS\Event\User\BeforeSaveEvent has the following arguments:

- **`user`** - an associative array with elements relating to the fields of the existing record, available via `$event->getUser()`.
If the operation relates to creating a new record then the array has the same keys, but with blank / default values. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - whether the save operation relates to creating a new record, or updating an existing record, available via `$event->getIsNew()`.

- **`data`** - an associative array with elements relating to the fields of the new/updated record, available via `$event->getData()`.

#### Return Value

You can abort the save operation by doing:

```php
$event->addResult(false);
```

You should also ensure that a suitable error message is provided, either by calling enqueueMessage or raising an exception.

### onUserAfterSave

#### Description

This event is triggered after a `users` record is created or updated in the database.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterSaveEvent has the following arguments:

- **`user`** - an associative array with elements relating to the fields of the new/updated record, available via `$event->getUser()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - whether the save operation relates to creating a new record, or updating an existing record, available via `$event->getIsNew()`.

- **`savingResult`** - whether the save operation succeeded (true) or failed (false), available via `$event->getSavingResult()`.

- **`errorMessage`** - any error message associated with the save operation, available via `$event->getErrorMessage()`.

#### Return Value

None

### onUserBeforeDelete

#### Description

This event is triggered before a `users` record is deleted in the database.

#### Event Arguments

The event class \Joomla\CMS\Event\User\BeforeDeleteEvent has the following arguments:

- **`user`** - an associative array with elements relating to the fields of the `users` record being deleted, available via `$event->getUser()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None. If you want to prevent the user from being deleted, you may abort the delete by redirecting back to the User Manager. For example: 

```php
use Joomla\CMS\Router\Route;
use Joomla\CMS\Language\Text;
...
if ($this->deleteNotAllowed($data))
{
    $url = Route::_('index.php?option=com_users&view=users', false);
    $msg = Text::sprintf('PLG_USER_DELETE_NOT_ALLOWED', $data['username']);
    $app = $this->getApplication();
    $app->enqueueMessage($msg, 'error');
    $app->redirect($url);
}
```

### onUserAfterDelete

#### Description

This event is triggered after a `users` record is successfully deleted in the database.
If the delete operation fails then this event is not triggered.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterDeleteEvent has the following arguments:

- **`user`** - an associative array with elements relating to the fields of the deleted `users` record, available via `$event->getUser()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`deletingResult`** - will be `true` as this event is triggered only if the delete operation succeeded.

- **`errorMessage`** - will be blank.

#### Return Value

None

### onUserBeforeSaveGroup

#### Description

This event is triggered before a `usergroups` record is created or updated in the database.

#### Event Arguments

The event class \Joomla\CMS\Event\Model\BeforeSaveEvent (note: Model not User!) has the following arguments:

- **`context`** - will be "com_users.group" available via `$event->getContext()`.

- **`item`** - the `usergroups` Table instance relating to the record being updated, 
or an instance with blank fields if a new `usergroups` record is being created, available via `$event->getItem()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - whether the save operation relates to creating a new record, or updating an existing record, available via `$event->getIsNew()`.

- **`data`** - an associative array with elements relating to the fields of the new/updated `usergroups` record, available via `$event->getData()`.

#### Return Value

You can abort the save operation by doing:

```php
$event->addResult(false);
```

You should also ensure that a suitable error message is provided, either by calling enqueueMessage or raising an exception.

### onUserAfterSaveGroup

#### Description

This event is triggered after a `usergroups` record is created or updated in the database.

#### Event Arguments

The event class \Joomla\CMS\Event\Model\AfterSaveEvent (note: Model not User!) has the following arguments:

- **`context`** - will be "com_users.group" available via `$event->getContext()`.

- **`item`** - the `usergroups` Table instance relating to the record updated / created, available via `$event->getItem()`.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`isNew`** - whether the save operation relates to creating a new record, or updating an existing record, available via `$event->getIsNew()`.

- **`data`** - an associative array with elements relating to the fields of the new/updated `usergroups` record, available via `$event->getData()`.

#### Return Value

None

### onUserBeforeDeleteGroup

#### Description

This event is triggered before a `usergroups` record is deleted in the database.

#### Event Arguments

The event class \Joomla\CMS\Event\User\BeforeDeleteEvent has the following arguments:

- **`data`** - an associative array with elements relating to the fields of the `usergroups` record being deleted. 
This argument does not have a getter function, and is deprecated, due to be removed in some Joomla 6 release.

- **`context`** - will be "com_users.group" available via `$event->getContext()`.

- **`item`** - the `usergroups` Table instance relating to the record being deleted, available via `$event->getItem()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

You can abort the delete operation by doing:

```php
$event->addResult(false);
```

You should also ensure that a suitable error message is provided, either by calling enqueueMessage or raising an exception.

### onUserAfterDeleteGroup

#### Description

This event is triggered after a `usergroups` record is successfully deleted in the database.
If the delete operation fails then this event is not triggered.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterDeleteEvent has the following arguments:

- **`data`** - an associative array with elements relating to the fields of the `usergroups` record which was deleted. 
This argument does not have a getter function, and is deprecated, due to be removed in some Joomla 6 release.

- **`deletingResult`** - will be `true` as this event is triggered only if the delete operation succeeded.
This argument does not have a getter function, and is deprecated, due to be removed in some Joomla 6 release.

- **`errorMessage`** - will be blank.
This argument does not have a getter function, and is deprecated, due to be removed in some Joomla 6 release.

- **`context`** - will be "com_users.group" available via `$event->getContext()`.

- **`item`** - the `usergroups` Table instance relating to the record which was deleted, available via `$event->getItem()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

## Username and Password Reminder Events

### onUserAfterRemind

#### Description

This event is triggered after a user has clicked on the "Forgot username" link on the login form. 
The event is dispatched after the username reminder has been emailed to the user.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterRemindEvent has the following arguments:

- **`user`** - the Joomla User instance, available via `$event->getUser()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

### onUserBeforeResetRequest

#### Description

This event is triggered after a user has clicked on the "Forgot password" link on the login form. 
The event is dispatched before the password reset link is emailed to the user.

#### Event Arguments

The event class \Joomla\CMS\Event\User\BeforeResetRequestEvent has the following arguments:

- **`user`** - the Joomla User instance, available via `$event->getUser()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

### onUserAfterResetRequest

#### Description

This event is triggered after a user has clicked on the "Forgot password" link on the login form. 
The event is dispatched after the password reset link has been emailed to the user.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterResetRequestEvent has the following arguments:

- **`user`** - the Joomla User instance, available via `$event->getUser()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

### onUserBeforeResetComplete

#### Description

This event is triggered after a user has clicked the reset password link which Joomla has emailed to him/her,
and he/she has submitted a new password. 

The event is dispatched before the updated password is saved to the database.

#### Event Arguments

The event class \Joomla\CMS\Event\User\BeforeResetCompleteEvent has the following arguments:

- **`user`** - the Joomla User instance, available via `$event->getUser()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

### onUserAfterResetComplete

#### Description

This event is triggered after a user has clicked the reset password link which Joomla has emailed to him/her,
and he/she has submitted a new password. 

The event is dispatched after the updated password has been saved to the database.

#### Event Arguments

The event class \Joomla\CMS\Event\User\AfterResetCompleteEvent has the following arguments:

- **`user`** - the Joomla User instance, available via `$event->getUser()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

None

## Miscellaneous

### onUserLoginButtons

#### Description

This event is triggered when Joomla is displaying a login form, allowing plugins to add extra buttons to the form. 

#### Event Arguments

The event class \Joomla\CMS\Event\User\LoginButtonsEvent has the following arguments:

- **`formId`** - the id of the Joomla Form instance which displays the login form, available via `$event->getFormId()`. 

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

#### Return Value

An array of the details needed to display the additional button (see the example below).

#### Example

This event is used by Joomla to provide passwordless login, as described in [WebAuthn Passwordless Authentication](https://docs.joomla.org/WebAuthn_Passwordless_Login).
If you are intending to use this event, then you should study this example.
In particular, the array to return is given in /plugins/system/webauthn/src/PluginTraits/AdditionalLoginButtons.php.