---
sidebar_position: 2
title: MVC and other considerations
---

MVC and other considerations
============================

## Introduction

This section describes MVC and other design patterns, and following these patterns generally make the component code easier to follow, especially in large components. 
A sample component com_sample_form2 is provided below.

### Joomla MVC Split
In general terms Joomla splits components into separate types of functionality:

- the Controller contains the logic to decide how to respond to the HTTP request - in particular, deciding which View and Model to use
- the View defines what data items should be shown on the web page to be presented, and makes calls to the Model to obtain those data items
- the Model provides access to the data
- the tmpl file is an extension of the View (it runs within the context of the View class instance and so has direct access to the `$this` variable of the View object). It outputs the HTML for the component, and it includes in the output the data which has been collated by the View. It's separate from the View code so that the HTML output can easily be overridden using a template override. 

### Post/Request/Get Pattern
In Joomla the HTML output (such as the display of a form) is usually performed in response to an HTTP GET, following the [Post/Redirect/Get Pattern](https://en.wikipedia.org/wiki/Post/Redirect/Get) pattern. 
To follow the Joomla pattern, in the code which handles the POST we should include a HTTP GET redirect to the form URL. 
As that GET will then be a new HTTP request/response we must store in the user session the data to be shown 
when the form is redisplayed, which includes the following 2 items:

- the validation error messages are stored and output using the `enqueueMessage()` method (which stores data in the user session automatically for us)

```php
$app = Factory::getApplication();
$app->enqueueMessage('some message text');
```

- the user-entered data is stored using `setUserState()` and retrieved using `getUserState()`, and keyed by a context which should be unique to this form. For example:

```php
$app->setUserState('com_sample_form2.sample', $data);
```

The code which provides the data for the form `bind()` operation must first check using `getUserState()` to see if there is any data in the session, as it will be the data which the user previously entered, and should be redisplayed. 

Also, if the user enters data which successfully passes validation then `setUserState()` should then be called passing `null` in order to clear this prefill data in the session; otherwise it will appear whenever the user next displays the form.

Of course, although Joomla works using this pattern, you don't always have to follow it. For example, if you have a large amount of confirmation data which you want to output after a form has been successfully submitted then you can instead output this just as a response to the HTTP POST. 

### Separate Controllers
Joomla routes HTTP requests to separate Controllers based on the value of the *task* URL parameter sent in the request. This parameter is often set by Joomla core javascript based on the submit button, e.g. in the example below:
```php
onclick="Joomla.submitbutton('myform.submit')"
```
When the `submit` button is clicked then the onclick listener calls the javascript function `Joomla.submitbutton` passing in the parameter 'myform.submit', and this results in the *task* parameter being set to "myform.submit". 

In general the *task* parameter is of the form `<controller type>.<method>` and so in this case the HTTP POST containing the form data will be handled by the MyformController and its `submit` method. 

### Joomla MVC Classes
Joomla provides feature-rich Controller, View and Model classes from which your component Controllers, Views and Models can inherit. The Model code in `com_sample_form2` inherits from FormModel which shields somewhat the Joomla Form API explained in the previous section. In this case our model calls the FormModel `loadForm()` method, and this method then executes a callback to our `loadFormData()` to provide the data to `bind()` to the form. So in the code there isn't a separate call to `bind()`.

### Security Token
Joomla uses a security token on forms to prevent [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The token is output in the layout file
```php
<?php echo HTMLHelper::_('form.token'); ?>
```
and checked within the controller handling the POST:
```php
$this->checkToken();
```
If the token is found to be invalid then `checkToken()` outputs a warning and redirects the user back to the previous page. 

### Validation
This is covered in the following sections.

## Example Component Code

To demonstrate the basic use of Joomla forms, 
you can download and install the [Example Form Component](../../building-extensions/components/component-examples/example-form-component.md).

This component also provides a basis for further experimentation with Joomla forms and fields.
