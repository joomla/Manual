---
title: Layouts
---

## Introduction

Joomla layouts provide a library of HTML/PHP chunks which can be reused across Joomla extensions.

The layouts can be customised by a Joomla administrator by using the template override functionality.

The set of layouts vary in size from output of individual HTML elements (eg for displaying an image)
through to displaying many of the tabs in the form which allows an administrator to edit an item such as an article. 

The general layouts used across Joomla are found in the '/layouts' folder. 
In particular, '/layouts/joomla' contains many of reusable HTML you might have expected to see.
For example, '/layouts/joomla/form/field' contains the HTML for the `<input>` element
associated with Joomla standard form fields. 

Individual extensions may also have their own layouts. 
For example, many Joomla components have their own 'searchtools' layout
for generating the HTML for the Search/Filter fields 
(shown at the top of administrator forms for Content/Articles, Users/Manage, Menus/Manage, etc).
Component-specific layouts are stored within a '/layouts' folder within the component administrator or site areas
(eg in administrator/components/com_menus/layouts). or components/com_menus/layouts).

Both the general layouts and component-specific layouts are customisable via the administrator template override functionality.

There is no sample code for this section, but you can easily incorporate the code snippets 
within one of the extensions in the [Joomla manual examples repository](https://github.com/joomla/manual-examples).

## Using Joomla layouts

To use a Joomla layout use the [LayoutHelper::render function](cms-api://classes/Joomla-CMS-Layout-LayoutHelper.html):

```php
use Joomla\CMS\Layout\LayoutHelper;
...
echo LayoutHelper::render($layoutId, $data, $basePath, $options);
```

As an example, the following uses the layout in layouts/joomla/html/image.php to output an `<img>` element:

```php
use Joomla\CMS\Layout\LayoutHelper;

$imageData = ['src' => 'images/joomla_black.png', 'alt' => 'Joomla logo'];
echo LayoutHelper::render('joomla.html.image', $imageData); 
```

There are a number of aspects to note:

1. The first parameter to `render()` is the 'layout id' 
and Joomla replaces each '.' by '/' when it forms the pathname to find the layout.

2. Joomla first searches for the layout the templates override directory, 
and uses the '/layouts' directory only if no override has been provided.

3. The second parameter is the data which the layout required. 

How do you know what data is required by an individual layout?

If it's a small layout then sometimes the Joomla code contains a comment describing the data items required.
However usually you need to explore the code to work out what needs passed,
or follow the example of how Joomla components invoke the layout. 

## Specifying your own layouts

### Components

To specify a layout within your own component, you simply have to include the code in a layouts folder,
within either the site or the administrator section of your code. 
Remember to include the layouts folder within your component's XML manifest file!

For example, to create a layout to output an HTML `<div>` container element with a fixed height and width:

```php title="components/com_example/layouts/com_example/div.php"
<?php
defined('_JEXEC') or die;

$id = $displayData['id'] ?? "1";
$width = $displayData['width'] ?? "100px";
$height = $displayData['height'] ?? "100px";
?>

<div id="<?php echo $id; ?>" style="height: <?php echo $height; ?>; width: <?php echo $width; ?>"></div>
```

To avoid confusion and possible filename conflicts with other extensions, 
you should put your layouts in a subdirectory which has the name of your extension. 
So use layouts/com_example/div.php rather than just layouts/div.php.

Note that the `$data` which is passed into the layout is injected into the layout in the variable `$displayData`.

To use the layout do (eg in your component's tmpl file):

```php
<?php
defined('_JEXEC') or die;
use Joomla\CMS\Layout\LayoutHelper;
...
$data = array('id' => $config['id'], 'height' => '600px', 'width' => '600px');
echo LayoutHelper::render('com_example.div', $data);
```

In the administrator template override functionality the Joomla code searches the components'
directories for a subfolder called 'layouts', 
and if found then it includes this as an area which the administrator can override.
So if you put your component's layouts into a folder called 'layouts' 
(in either/both your administrator and site areas)
then Joomla will find them and make them available as administrator and/or site template overrides.

Whenever Joomla seeks to resolve the layout id passed to `LayoutHelper::render` 
it searches a number of directories in order:

1. The template override directory for that component's layouts

2. The component's layout directory

3. The template override directory for the general Joomla layouts

4. The general Joomla layouts directory

This depends on whether the call to `LayoutHelper::render` is made in your component's front-end or back-end:

- if front-end then the site template overrides and site layouts are searched

- if back-end then the administrator template overrides and administrator layouts are searched.

To change this, you set the 'client' option, as described below. 

### Modules and Plugins

You can create layouts for modules and plugins, 
but Joomla doesn't include them as potential template overrides,
nor does it include module or plugin layouts folders when it searches for a layout.

To force Joomla to use a layout folder of a module or plugin, 
you can use the `$basePath` parameter of the `LayoutHelper::render` function, eg:

```php
echo LayoutHelper::render('mod_example.div', $data, JPATH_ROOT . '/modules/mod_example/layouts');
```

Joomla then puts this base path at the top of the paths to search for the layout. 

## Render options

This section describes the `$options` array parameter of the `LayoutHelper::render` function.
You can set options like as follows:

```php
$options = array('debug' => true, 'client' => 1, 'component' => 'com_content');
```

Within the layout code the `$options` is available as a [Registry](./registry.md) object `$this->options`.

### Debug

When switched on, this feature outputs the search paths for the layouts, 
and the layout selected. An example output for a Joomla instance called 'j6' on Windows is:

```
Layout: com_example.div
Include Paths: Array
(
    [0] => C:\...\j6\templates/cassiopeia/html/layouts/com_example
    [1] => C:\...\j6/components/com_example/layouts
    [2] => C:\...\j6\templates/cassiopeia/html/layouts
    [3] => C:\...\j6/layouts
)

Searching layout for: com_example/div.php
Found layout: C:\...\j6\components\com_example\layouts\com_example\div.php
```

As there can be multiple layouts with the same name, but in different directories of the Joomla instance,
this feature is very useful for identifying the search path and the selected file,
particularly when using the `$basePath` and some of the options below.

### Client

When an extension calls `LayoutHelper::render` to use a layout,
by default Joomla checks if the extension is running on the front-end or back-end.

- if front-end then the site template overrides and site layouts are searched

- if back-end then the administrator template overrides and administrator layouts are searched.

If you wish to use a layout from the other side, then set the 'client' entry in the options array:

- 'client' => 0 : Joomla searches for a site layout

- 'client' => 1 : Joomla searches for an administrator layout

### Component

Set the 'component' entry in the options array to force Joomla to search for a layout in that component's "layouts" directory:

```php
$options = array('component' => 'com_content');
```

This will cause Joomla to add the layouts directory of com_content and its associated template override directory
into the top of the search paths. (The template override directory is always searched first).

### Suffixes

Specify an array suffixes to get Joomla to look for variants of the layout. For example:

```php
$options = array('suffixes' => ['abc', 'def']);
echo LayoutHelper::render('com_example.div', $data, null, $options);
```

This will search each layout folder for the following files (with the search performed in the order below):

```
com_example/div.abc.php
com_example/div.def.php
com_example/div.php
```

Previous Joomla layouts documentation suggested that this might be useful to 
support variants associated with different software versions, or right-to-left languages.

## Sublayouts

Inside a layout the `sublayout` method provides a convenient means of running a subsidiary layout,
which Joomla expects to find in a subsidiary folder (with folder name = name of original layout file).

For example, if inside the layout com_example/div.php you have:

```php
$this->sublayout('sub', $displayData);
``` 

then PHP will look for a layout sub.php inside com_example/div/ (ie will look for com_example/div/sub.php).

The `$basePath` and `$options` parameters to the original layout will be passed into the sublayout (ie into sub.php).

Obviously you can choose to pass all the data `$displayData` or just a subset eg `$displayData['subItem']`.

## Using FileLayout

Occasionally you may find that using the simplified `LayoutHelper::render` function may not meet your needs,
and you need to access the underlying \Joomla\CMS\Layout\FileLayout class.
An example could be if your company uses a library of layouts, 
and you want to search this library for layouts whenever one of your extensions uses a layout.

If your layouts are in a top level "mycompany" directory then you can do:

```php
use Joomla\CMS\Layout\FileLayout;
...
$layout = new FileLayout('com_example.div', $basePath, $options);
$layout->addIncludePath(JPATH_ROOT . '/mycompany/layouts');
echo $layout->render($data);
```

The FileLayout constructor accepts the same `$basePath` and `$options` parameters.
Alternatively you can set the options etc via the [FileLayout API](cms-api://classes/Joomla-CMS-Layout-FileLayout.html).