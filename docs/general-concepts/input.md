---
title: Input
---
# Joomla Input - Introduction
The Joomla Input functionality provides an easy-to-use interface to obtaining and sanitising the data of several of the [PHP Superglobals](https://www.php.net/manual/en/language.variables.superglobals.php)
- HTTP GET and POST parameters
- routing parameters ("option", "view", "layout", etc) which are generated as a result of parsing the incoming SEF URL
- information related to uploaded files 
- PHP `$_SERVER` data - server and execution environment information. 

To get started you have to get an instance of the Joomla `Input` class:
```php
use Joomla\CMS\Factory;
$input = Factory::getApplication()->getInput();
```

This document explains how you can then obtain the data items listed above.

# Getting Individual Parameters with Filters
To get the value of a specific parameter use
```php
$val = $input->get(param_name, default_value, filter);

```
where: 
- `param_name` is a string containing the name of the parameter you want to retrieve 
- `default_value` is the value you want returned if the parameter is not found; it may be a string, integer, array, null, etc. – whatever you want. 
- `filter` is a string specifying one of the filters in the list below. If you don't specify this parameter then a default of "cmd" is used.

You can use this to obtain the value of any GET, POST or routing parameter - `Input` provides a common interface for obtaining any of these types of parameters. The method for obtaining specifically GET or POST parameters is described later in this documentation. 

## Available Filters
Below is a list of the available filters, together with a little explanation if appropriate. Filters can be specified in either lower or upper case, and if 2 filters are listed on the same line below, then it indicates that they are equivalent. If you need further details on a filter you can examine the source code in libraries/vendor/joomla/filter/src/InputFilter.php.

- **"INT", "INTEGER"** - returns the first integer found in the parameter value. For example if the parameter is "abc123def456" then the return value from applying this filter would be 123 (as an integer). 

- **"UINT"** - returns an unsigned int. For example, if the parameter is specified `?p1=-2` then this filter will discard the minus sign and you will get the value 2 returned as the value of `p1`.

- **"FLOAT", "DOUBLE"** - returns the first float found

- **"BOOL", "BOOLEAN"** - be careful with this! If you specify in the URL `?p1=false` then the value of `p1` is actually the string "false" and as this is a non-empty string (bool) `p1` will return `true`.

- **"WORD"** - filters out any characters which aren't letters or an underscore

- **"ALNUM"** - alphanumeric - filters out any characters which aren't letters or numbers

- **"CMD"** - filters out any characters which aren't letters, numbers, underscore, dot or dash, and removes any leading dots from the result. This is the default filter for the `get()` method, and is used often when obtaining the `?option=controller.task` parameter in Joomla components.

- **"BASE64"** - filters out any characters which aren't letters, numbers, forward slash, plus or equals. base64 can be used to encode a URL as a string of text, which is then stored in a request parameter. For example, if a user accesses a URL which is protected then he/she may be redirected to the URL of the login page, with the original URL being base64 encoded and stored as a (return) parameter within the redirected URL. Once the user has logged in correctly the return parameter is retrieved and he/she is redirected back to the original URL accessed. (Note that you still have to decode the base64 yourself, the filter doesn't do this for you).

- **"STRING"** - converts any HTML entities to their corresponding characters (eg `&lt;` is converted to `<`, `&quot;` is converted to a double quotation mark), and then any HTML tags (including attributes) are removed. For example, `"<br>&lt;test&gt;filter"` will return "filter".

- **"HTML"** - Removes HTML tags, but without previously converting HTML entities. For example, `"<br>&lt;test&gt;filter"` will return `"&lt;test&gt;filter"`.

- **"ARRAY"** - performs no filtering, just tries to convert the parameter to an array

- **"PATH"** - Converts the input into a string and validates it as a file path (e.g. path/to/file.png or path/to/dir), checking it first against the pattern for a linux path, and then against the pattern for a Windows path. Note: Does NOT accept absolute paths, or paths ending in a trailing slash. If it fails to match against a valid path then the empty string is returned. 

- **"RAW"** - no filtering is done; be careful using this, to avoid injection attacks on your website!

- **"USERNAME"** - filters out characters not permitted in a Joomla username 

Alternatively instead of adding the filter you can use the Input type specific methods, for example: 
```php
// Instead of:
$input->get('name', '', 'STRING');
// you can use:
$input->getString('name', '');

// Instead of:
$input->get('memberId', 0, 'INT');
// you can use:
$input->getInt('memberId', 0);
```
Except that `getArray()` is different; see below.

To retrieve an object, you can use: 
```php
$obj = $input->get(param_name, null, null);
```

# Arrays
Arrays come into play whenever 
- the data is sent from the client in the form of an array - as will be the case when you're using Joomla forms, and the form field data is sent to the server in the array (by default) `jform[]`.
- the data sent is in the form of individual parameters, but you want to read them into an array.

We'll consider the second type first.

## Reading single parameters into an array
There are several methods for doing this, and they differ regarding the filter which is applied. 

### Option 1
```php
$value = $input->get('p1', array(), "array");
```
As described above, the right hand side will return an array, and `$value[0]` will be set to the string value of p1. No filtering is applied to the parameter 'p1'.

### Option 2
```php
$values = $input->getArray();
```
This will return all the parameters as an associative array, mapping parameter name to value. The "STRING" filter is applied to all the parameters, and value of each parameter is 
- a string for individual parameters or 
- an associative array for parameters which are arrays (with again the "STRING" filter being applied to each of its elements)

**While the default filter for the `get()` method is "CMD", the default filter for the `getArray()` method is "STRING".**

### Option 3
You can specify which parameters you wish to retrieve into an array:
```php
$values = $input->getArray(array('p1' => '', 'p2' => '', 'p3' => ''));
```
This will return an associative array with elements 'p1', 'p2' and 'p3' pointing to their values. The "STRING" filter is applied to all the parameters. This is really the same as calling `getArray()` in Option 2, but restricting the set of parameters which will be returned.

### Option 4
In addition to specifying which parameters you wish to retrieve, you can also specify which filter to be applied to each:
```php
$values = $input->getArray(array('p1' => 'string', 'p2' => 'int', 'p3' => 'cmd'));
```
`$values` will be an associative array with elements 'p1', 'p2' and 'p3' pointing to their values. Each parameter will be filtered according to the requested filter, and the type will be set to match the filter (eg `$value['p2]` will be an `int`).

You can also nest arrays to get more complicated hierarchies of values: 
```php
$values = $input->getArray(array(
    'jform' => array(
        'title' => 'string',
        'quantity' => 'int',
        'state' => 'int'
    )
));
```
## Reading Array Parameters

If the parameters you are reading are already in the form of an array, then there are several methods available to read them into a PHP array, some of them overlapping with the above. Again, the filter applied can vary. In the options below it is assumed that `jform` is an array of values being sent to the server.

### Option 1
```php
$value = $input->get('jform');
```
`$value` will be an associative array, with keys matching the keys of the `jform` array. The "CMD" filter will be applied to all the values of the array elements, and they will all have type `string`.

### Option 2
You can define which filter is applied to each of the elements, eg:
```php
$value = $input->get('jform', array(), "STRING");
```
As in option 1, `$value` will be an associative array with keys matching the keys of the 'jform' array, but in this case the "STRING" filter will be applied to each entry.

### Option 3
You can define which elements of the `jform` array you want to capture, specifying the filter to be applied to each:
```php
$values = $input->getArray(array(
    'jform' => array(
        'title' => 'string',
        'quantity' => 'int',
        'state' => 'int'
    )
));
```
This is as in the previous section. 

# GET and POST parameters
The `Input` `get` and `post` properties allows you to access HTTP GET and POST parameters:
```php
$input->get     // property to retrieve GET parameters
$input->post    // property to retrieve POST parameters
```
You can call the `get()` and `getArray()` methods on these properties to obtain values of parameters, and as above "CMD" is the default filter for `get()` and "STRING" the default filter for `getArray()`.

If your site uses SEF URLs then note that these DON'T include the routing parameters "option", "view", etc which are generated by the Joomla router when it parses the SEF URL. Only true GET and POST parameters are returned. 

For example, to retrieve a GET parameter 'p1' use the following:
```php
$value = $input->get->get('p1');
```
`$value` will contain the value of GET parameter 'p1', with the value being filtered using the "CMD" filter.

To retrieve a GET parameter 'p1' and use an "INT" filter use (for example) the following:
```php
$value = $input->get->get('p1', 0, "int");
```

To retrieve all the GET parameters:
```php
$value = $input->get->getArray();
```
`$value` will contain an associative array of the GET parameters, with the values being filtered using the "STRING" filter.

To retrieve a POST parameter 'p1' use the following:
```php
$value = $input->post->get('p1');
```
`$value` will contain the value of POST parameter 'p1', with the value being filtered using the "CMD" filter.

To retrieve all the POST parameters:
```php
$value = $input->post->getArray();
```
`$value` will contain an associative array of the POST parameters, with the values being filtered using the "STRING" filter.

To retrieve the POST parameters of `jform` with no filter being applied to any of the data:
```php
$value = $input->post->get("jform", array(), "array");
```
This method is used within the Joomla core MVC code to retrieve raw form data. The data array is then passed to the Model `validate` function which handles both the filtering and validation of the data. The filtering is done using the form filters which are described in [how forms work](./forms/how-forms-work.md) using the `bind()` function (note that these filters are different from the `Input` filters we've been discussing in this section) and then validation is performed as described in [server-side validation](./forms/server-side-validation.md).

# Files
You may have in your Joomla form an HTML input element with type="file" to enable the user to upload a file to your website. In this case PHP writes the contents of the POST request into a file in its tmp directory, and makes available information about the upload. Joomla provides an easy-to-use interface to access this information. (The information isn't available via GET/POST parameters). 

Suppose you have a form like this:
```html
<form action="<?php echo Route::_('index.php?option=com_example&task=file.submit'); ?>" enctype="multipart/form-data" method="post">
	<input type="file" name="jform1[test][]" />
	<input type="file" name="jform1[test][]" />
	<input type="submit" value="submit" />
</form>
```
Then you can use:
```php
$files = $input->files->get('jform1');
```
`$files` then becomes something like: 
```php
Array
(
    [test] => Array
        (
            [0] => Array
                (
                    [name] => youtube_icon.png      // filename on local system
                    [type] => image/png             // mime type
                    [tmp_name] => /tmp/phpXoIpSD    // name given by PHP in tmp directory
                    [error] => 0                    // should be 0 for no error
                    [size] => 34409                 // in bytes
                )

            [1] => Array
                (
                    [name] => Younger_Son_2.jpg
                    [type] => image/jpeg
                    [tmp_name] => /tmp/phpWDE7ye
                    [error] => 0
                    [size] => 99529
                )
        )
)
```

# JSON
When you send the data as a json string in the POST data of an Ajax request, then you can retrieve the data as an associative array by using:
```php
$jsonArray = $input->json->get(param_name);
```
It won't work for the case where you have multiple POST parameters and one of them is a json string - the whole body has to be a json string. Joomla captures the data from `php://input` and calls `json_decode()` on the data.

Also if you're using this approach then it's recommended to send the security token as one of the GET parameters in the URL.

For a worked example, look at how Joomla handles the updating of Permissions values in the Global Configuration 
- in the js file media/system/fields/joomla-field-permissions.js in `sendPermissions()`
- in the php file  administrator/components/com_config/src/Model/ApplicationModel.php in `storePermissions()`.

# Server data
You can retrieve and sanitise PHP [$_SERVER](https://www.php.net/manual/en/reserved.variables.server.php) data by using:
```php
$val = $input->server->get(param_name, default_value, filter);
```

# Setting Values
The functions `set()` and `def()` allow you to set input parameters and their values.
```php
$input->set('p2', "someval");
```
sets the value of parameter `p2` to the string "someval" (creating `p2` if it doesn't already exist).
```php
$input->def('p2', "someval");
```
creates a parameter `p2` and sets its value to the string "someval", but only if `p2` doesn't already exist. If `p2` already exists then `def('p2', "someval");` does nothing. 

# Sample Module Code
Below is the code for a simple Joomla module which you can install and run to demonstrate retrieval of parameter values. 

In a folder `mod_input` create the following 2 files: 

`mod_input.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" version="3.1" client="site" method="upgrade">
    <name>Input demo</name>
    <version>1.0.1</version>
    <description>Code demonstrating use of Joomla Input class to obtain HTTP parameters</description>
    <files>
        <filename module="mod_input">mod_input.php</filename>
    </files>
</extension>
```
`mod_input.php`
```php
<?php
defined('_JEXEC') or die('Restricted Access');

use Joomla\CMS\Factory;

$app = Factory::getApplication();   // equivalent of $app = JFactory::getApplication();
$input = $app->getInput();

if ($input->exists('p1'))
{
	$v1 = $input->get('p1', 0, "INT");  // rhs equivalent to $input->getInt('p1', 0);
	echo "<p>Int value of p1 is $v1</p>";
	$v1 = $input->get('p1', 0, "UINT"); // uint
	echo "<p>Uint value of p1 is $v1</p>";
	$v1 = $input->get('p1', 0, "string"); 
	echo "<p>String Value of p1 is $v1</p>";
}
else
{
	echo "<p>Parameter p1 not specified</p>";
}
```
Zip up the mod_input directory to create `mod_input.zip`.

Within your Joomla administrator go to Install Extensions and via the Upload Package File tab upload this zip file to install this sample module.

Make this module visible by editing it (click on it within the Modules page) then:

- making its status Published
- selecting a position on the page for it to be shown
- on the menu assignment tab specify the pages it should appear on

Display a web page on which this module appears. Then add the `p1` parameter to the URL

- if the URL has no existing parameters then append `?p1=123abc`
- if the URL has existing parameters then append `&p1=123abc`

You should see the results of retrieving the `p1` parameter, and passing it through different filters. You can experiment by specifying different values for `p1`, applying different filters, and you can use a utility such as [curl](https://curl.se/) to send HTTP POST parameters to confirm it works for those as well. 

# Sample Component Code
You can also download and use [this sample component code](./forms-fields/_assets/com_sample_form_field.zip) as the basis of experimenting with retrieving POST parameters, files, etc. The src/Controller/PostController.php uses Input to retrieve POST parameters and store them in the session data:
```php
// name of array 'jform' must match 'control' => 'jform' line in the model code
$data  = $this->input->post->get('jform', array(), 'array');
// store this in the session so that we can display it in DisplayController
$app->setUserState('com_sample_form_field.post', $data);
```
After the redirect back to display the form, the view reads this stored data in src/View/Sample/HtmlView.php:
```php
// check if there's any POST data from the previous form submission
$this->postdata = Factory::getApplication()->getUserState('com_sample_form_field.post', null);
// and clear it, ready for the next submission
Factory::getApplication()->setUserState('com_sample_form_field.post', array());
```
and then it is displayed in the tmpl/sample/default.php file:
```php
ob_start();
var_dump($this->postdata);
$post = ob_get_contents();
ob_end_clean();
...
<?php echo '<pre>' . htmlspecialchars($post, ENT_QUOTES) . '</pre>'; ?>
```
By following this pattern you can try out different methods and filters in PostController, then store the result in the session. Then after the redirect you can pick thie data out of the session in the view file, and display it in the tmpl default.php file. 