---
sidebar_position: 2
title: Ajax for Components and JsonResponse
---

Ajax and JsonResponse
=====================

This section describes how to use Ajax in your Joomla components,
including how to use JsonResponse to provide a response back from the server.

At the end of the section there is a link to a sample component which you can download and run as an example.

You can also use Ajax within Joomla modules, plugins and templates, and this is covered in the next document.

It's assumed that you're familiar with using [Ajax](https://en.wikipedia.org/wiki/Ajax_(programming)) in general. 

## Routing

When you make an Ajax call from JavaScript to the URL of a Joomla site then Joomla routes the HTTP request in the same way as it would for a "normal" HTTP request;
there's no special processing for Ajax requests. 
Joomla finds the `component` which is associated with the URL, and passes control to it.

So if you're using Ajax within a component, then you need to specify the URL which will route through to your component.

If you're using Ajax within a module, plugin or template, then you need to route the request to the Joomla com_ajax component,
and this component acts as a proxy for your module/plugin/template.
This is covered in the next document.

Within your component you should use the [MVC approach](../../building-extensions/components/mvc/index.md),
and split your functionality into different Controllers, Models and Views.

The default Joomla [Extension/Dispatcher](../extension-and-dispatcher/index.md) code uses the URL 
[`task` parameter](../../building-extensions/components/mvc/mvc-overview.md#the-http-request-task-parameter) 
to determine the Controller class to instantiate and the method within that Controller to call.

For example, if you set the `task` parameter to "ajax.divide" then the default Dispatcher code will instantiate your AjaxController and call its `divide` instance method.

## JsonResponse - Basic Use

Once you have performed the logic to obtain the necessary data, then you will want to pass that data back to the JavaScript code in the Ajax response. 
This is where the JsonResponse class can help. 

Its basic use is as follows:

```php
use Joomla\CMS\Response\JsonResponse;
use Joomla\CMS\MVC\Controller\BaseController;

class AjaxController extends BaseController
{
  public function divide()
  {
    try
    {
      // if you're using Joomla MVC classes then the Application instance is injected into
      // the BaseController constructor and stored in the $app instance variable
      $anyParam = $this->app->input->get('anyparam');

      $result = $this->getModel('example')->calculateSomething($anyParam);

      echo new JsonResponse($result);
    }
    catch(\Exception $e)
    {
      echo new JsonResponse($e);
    }
  }
}
```

In the default case, the return value of something that has been calculated by the model is simply passed into a new `JsonResponse` object and written to the output. 
This will automatically create a JSON-encoded string like:

```json
{"success":true,"message":null,"messages":null,"data":{"result1":1,"result2":42, ...}}
```

In the data field, you can send any array, object or value you want and the success flag is automatically set to `true`.

If any exception occurred in the model, this exception is simply passed directly to a new `JsonResponse` object which would create the following output:

```json
{"success":false,"message":"This is the message of the exception","messages":null,"data":null}
```

Since it is an exception the success flag is automatically set to `false` and the message of the exception becomes the main response message. 

## JsonResponse - Adding a message

If you want to add a message to your JsonResponse then you can do that provided that you haven't passed an Exception as the first parameter of the constructor.

```php
echo new JsonResponse($result, Text::_('COM_EXAMPLE_AJAX_SUCCESS'));
```

This sends back 

```json
{"success":true,"message":"Success message!","messages":null,"data":{"result1":1,"result2":42, ...}}
```

You can also set the error flag to `true` via the third argument (`$error`): 

```php
echo new JsonResponse($result, Text::_('COM_EXAMPLE_AJAX_FAILURE'), true);
```

which sends back

```json
{"success":false,"message":"Failure message!","messages":null,"data":{"result1":1,"result2":42, ...}}
```

In this way you can also send some data back, even in the case of an error.

If you want to output your message in the template messages area then you can use the `Joomla.renderMessages` JavaScript function, 
but you need to pass the message like:

```js
Joomla.renderMessages({"notice": [result.message]});
```

as the `Joomla.renderMessages` function expects a JSON object where
- the key is the type of the message
- the value is an array of strings

This function is in media/system/js/messages.js, so you need to include "messages" as a dependency of your script asset in your extension's joomla.asset.json file.

## JsonResponse - Enqueued messages

By default, when you use JsonResponse it will obtain all the enqueued messages and pass them down as the "messages" parameter in the JSON response.

The structure of this "messages" parameter is as required by `Joomla.renderMessages` so in your JavaScript you can simply call

```js
Joomla.renderMessages(result.messages);
```

to output these messages in the message area.

However, if you're using `Joomla.renderMessages` to render your own Ajax success/failure message as well,
then the second call to `Joomla.renderMessages` will by default remove any messages currently in that message area,
namely, the message which you have just posted there.

To avoid this, on your second call you should pass `true` as the third parameter to `Joomla.renderMessages`:

```js
Joomla.renderMessages(result.messages, undefined, true);
```

If you don't want JsonResponse to pass down the enqueued messages, 
then in your PHP call set the fourth argument (`$ignoreMessages`) of the JsonResponse constructor to `true`:

```php
echo new JsonResponse($result, Text::_('COM_EXAMPLE_AJAX_SUCCESS'), null, true);
```

## Example Component

The [com_ajaxdemo](../../building-extensions/components/component-examples/ajaxdemo.md) component demonstrates many of the features discussed in this section.

You can download com_ajaxdemo from the [Manual examples](https://github.com/joomla/manual-examples/tree/main/component-ajaxdemo) site.
