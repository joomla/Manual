---
sidebar_position: 3
title: Defining your Namespace Prefix
---
Defining your Namespace Prefix
==============================

## Components
When you develop a Joomla extension you define the namespace you want to use in your manifest file, eg for `com_example`:

```xml
<namespace path="src">Mycompany\Component\Example</namespace>
```

Let's look at the various parts of this:

- Mycompany – you are free to put whatever you like here – it's generally set to indicate the name of the company who developed the extension.

- Component – this must be set to Component if your Joomla extension is a component

- Example – this should match the name of the component you're developing

- src – this is the subfolder where you store your class files. You don't have to call it this, but it is common practice.

From this manifest file Joomla will create 2 namespace prefixes:

- 'Mycompany\Component\Example\Site\' will point to components/com_example/src
- 'Mycompany\Component\Example\Administrator\' will point to administrator/components/com_example/src

(Assuming you have both site and administrator aspects to your component).

## Modules

You would do a similar thing for modules:

```xml
<namespace path="src">Mycompany\Module\Example</namespace>
<files>
	<filename module="mod_example">mod_example.php</filename>
	<folder>src</folder>
	<folder>tmpl</folder>
</files>
```

It's not essential to match the "Example" in the namespace to "mod_example" 
– the name of the module – but you'll probably find it easier to do that. 

If this is a site module then Joomla will create the namespace prefix:
'Mycompany\Module\Example\Site\' will point to modules/mod_example/src

If this is an administration module then Joomla will create the namespace prefix:
'Mycompany\Module\Example\Administrator\' will point to administrator/modules/mod_example/src

## Plugins

For plugins:

```xml
<namespace path="src">Mycompany\Plugin\Content\Example</namespace>
<files>
    <filename plugin="example">example.php</filename>
    <folder>src</folder>
</files>
```

Here there's an extra part to the namespace, which must be set to the plugin type – 'Content' in the example above. 

Once again the 'Example' segment in the namespace doesn't have to match exactly the plugin="example" name of the plugin.

For the above Joomla would create the namespace prefix:

'Mycompany\Plugin\Content\Example\' will point to plugins/content/example/src

## Capitalisation 

**Be careful to ensure that capitalisation within parts of the fully qualified classname matches capitalisation within
the names of directories and files! If you develop on Windows but your target system is linux you may find that your 
extension works on your development machine but not on your target system. This is because Windows is forgiving if you 
have wrong capitalisation in your filenames or directory names – it will still open the file for you – but linux isn't.**

## Finding your Classes

Once you have decided upon your namespaces then you can sort out where you class files are going to be located. 
Joomla components use a fairly flat directory structure under `src`, but you don't stick to that. As long as you 
adhere to the PSR4 recommendation for matching fully qualified class names to file paths then Joomla will find the 
source files for your classes. Gone are the days when you had to guess what directory to store your helper file in, 
and what to name to give the file! 

However, there is one case where you need to give Joomla a helping hand - in your form XML files.
- if you define a custom field then you need to tell Joomla where to find the class which defines that custom field
- if you define a custom validation rule then you need to tell Joomla where to find the class which defines that rule

As XML files don't have PHP `<namespace>` statements you have to provide the equivalent, and it's easiest to do this by
including an `addfieldprefix` or `addruleprefix` attribute within an XML element which encloses where you use them, eg:

```xml
<?xml version="1.0" encoding="utf-8"?>
<form
    addruleprefix="Mycompany\Component\Example\Administrator\Rule"
    addfieldprefix="Mycompany\Component\Example\Administrator\Field"
>
```

## PHP Global namespace

If you have a `<namespace>` statement in your PHP source file then PHP will by default assume that any classnames you 
refer to in your code will be under that namespace. So if you use any standard PHP classes such as `Exception`, you 
will have to precede them with a backslash `\Exception`. The backslash at the start indicates to PHP that this is a 
fully qualified classname, and as there is just one segment to this FQN it will be found in the global namespace.

Similarly, if you use a function, then PHP will try to find that function under your namespace. But unlike classes, 
if it doesn't find the function under your namespace it will revert back to looking for it in the global namespace. 
So it's marginally more performant if you tell PHP not to bother looking in your namespace by prefixing the function 
name with a backslash, eg `\strlen(...)`. You will see this present at times in the Joomla PHP code.

:::note[Developer Note]
Attention: The first character of the namespace name is restricted to "a-zA-Z_" with some additionals. See
[PHP valid variable names](https://www.php.net/manual/en/language.variables.basics.php)  
So be careful of company or extension names beginning with a number or other restricted characters. Recommendation: Use '_' as the first character instead.  
Joomla does not check the extension name in the installation process. However, errors are reported later when the PHP code is executed.
:::
