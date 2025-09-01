---
title: Ajax demo component
---

Ajaxdemo Component
==================

This is an example component which you can download from [com_ajaxdemo](https://github.com/joomla/manual-examples/tree/main/component-ajaxdemo).

It demonstrates the use of Ajax within a Joomla component; 
for further background see the section [Ajax and JsonResponse](../../../general-concepts/javascript/ajax.md).

It can be easily adapted to demonstrate the use of [com_ajax](../../../general-concepts/javascript/com-ajax.md) for plugins and templates; 
simply change the url in media/js/divide.js to point to com_ajax instead of com_ajaxdemo, and set the other required URL parameters.

Once you have downloaded the source, zip up the com_ajaxdemo directory and install the component.

Then go to `<your domain>/index.php?option=com_ajaxdemo` to run it on your Joomla instance.

The component displays a form to capture two numbers A and B, and a button to calculate A/B. 
The division is performed by an Ajax call to the server, and if B is zero then an exception is raised.

Brief summaries of the main source files are provided below.

## Administrator service provider

Path: administrator/components/com_ajaxdemo/services/provider.php

This is boilerplate code for a basic MVC component. For components this file is placed under /administrator in the Joomla filesystem.
If you want to understand it fully then read the [Dependency Injection](../../../general-concepts/dependency-injection/index.md) section. 

From this file Joomla instantiates default [Extension and Dispatcher classes](../../../general-concepts/extension-and-dispatcher/index.md), 
and an MVC Factory class which creates Model, View and Controller classes for our component. 

The default Dispatcher class examines the URL `task` parameter, and from it works out the Controller to instantiate. 
The default Controller (when no `task` parameter is present) is the DisplayController.
When the Divide button is pressed the JavaScript code sends an Ajax request using `task` set to "ajax.divide". 
Based on this the default Dispatcher will instantiate this component's AjaxController and call its `divide` method. 

## Site Display Controller

Path: components/com_ajaxdemo/src/Controller/DisplayController.php

This controller's display method is what is run when you go to your site page which displays the form (ie navigate to the URL `.../index.php?option=com_ajaxdemo`).

It gets the associated Model and View classes, and calls display() on the View instance.

## Site Ajaxdemo View

Path: components/com_ajaxdemo/src/View/Ajaxdemo/HtmlView.php

This calls the model to set up the form, then calls display() to run the tmpl file.

## Site Ajaxdemo Model

Path: components/com_ajaxdemo/src/Model/AjaxdemoModel.php

This sets up the form as described in [Forms](../../../general-concepts/forms/index.md).

## Site Ajaxdemo tmpl file

Path: components/com_ajaxdemo/tmpl/ajaxdemo/default.php

This uses the [Web Asset Manager](../../../general-concepts/web-asset-manager.md) to attach the JavaScript divide.js which initiates the Ajax call.

It passes the root URL of your Joomla instance to the JavaScript code using [passing variables to Javascript](../../../general-concepts/javascript/adding-javascript.md#passing-variables-to-javascript)
as this makes the job of forming the URLs easier.

Then it outputs the `<form>` html, including the button with the onclick listener to run the divide.js code.

## "Divide" XML Form 

Path: components/com_ajaxdemo/forms/divide_form.xml

This uses [Joomla Standard Form Fields](../../../general-concepts/forms-fields/standard-fields/index.md) for the fields in the form.

## JavaScript code

Path: media/com_ajaxdemo/js/divide.js

The is the code which is run when the Divide button is pressed. 

It initiates the Ajax call and handles the response.

## Ajax Controller

Path: components/com_ajaxdemo/src/Controller/AjaxController.php

This is the controller with the divide() method which gets called when the Ajax request is serviced by Joomla. 

It computes a/b and sends the result back to the JavaScript code using JsonResponse.

If b is zero then it sends a 'divide by zero' exception into JsonResponse, which gets mapped to a JSON object with success=false passed back. 

It also sets up a couple of dummy enqueued messages to demonstrate this aspect of JsonResponse.

## media joomla.asset.json file

Path: media/com_ajaxdemo/joomla.asset.json

This is the file required by the [Web Asset Manager](../../../general-concepts/web-asset-manager.md) for defining the JavaScript asset and its dependencies. 
