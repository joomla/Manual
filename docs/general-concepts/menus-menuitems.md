---
title: Menus and Menuitems
---
# Introduction
The Joomla Menu and Menuitem classes manage the configuration and display of menus and menu items on the site front end. The Menu is the set of navigation links which you can have as a main menu (e.g. at the top of your site) or as a subsidiary menu (e.g. in the footer). Each of the individual navigation links is a Menuitem. 

Within an overall Menu structure you can have a "submenu". This isn't implemented as a Joomla Menu construct, rather as a set of menu items below a parent menu item. The Joomla menu items are thus implemented in an ordered tree structure, specifically using the [Nested Set model](https://en.wikipedia.org/wiki/Nested_set_model).

This guide describes how you can use the Joomla API to access the menu and menuitem data, and includes sample module code which you can install on your site as a demonstration of the capabilities. 

Note that these classes aren't used in the administrator back end.

# Basic Operations
To get the details of all the Menuitems on the site you do:
```php
use Joomla\CMS\Factory;
$app = Factory::getApplication();
$sitemenu = $app->getMenu();
```
If your code is running on the Joomla back end then you should do:
```php
use Joomla\CMS\Factory;
$app = Factory::getApplication();
$sitemenu = $app->getMenu('site')->load();
```
The `$sitemenu` structure will then have entries for all the site Menuitems.

(The reason that you don't need to call `load` on the front end is because the Menuitems will most likely have already been loaded by the time your code is run, as they're needed for the site router function. If you a writing a site system plugin which gets called before the router, then you'll need to add the `load` call yourself.)

There isn't a Joomla API to enable you to get *just* the set of Menus on the system (as opposed to the set of Menuitems), so if you really do need these then your only recourse is to read the data from the `menu_types` table directly using a SQL query. But you can find (from the Menuitem structure described below) the Menu to which that Menuitem belongs, and find all the Menuitems for a particular Menu. 

To get at the individual menu items we apply a filter to `$sitemenu` using `getItems()` to select the particular Menuitems we're interested in. To obtain an array of all the Menuitems use a blank filter:
```php
$menuitems = $sitemenu->getItems(array(), array());
```
To obtain an array of all the menu items which are in the "mainmenu" menu use:
```php
$mainmenuItems = $sitemenu->getItems('menutype', 'mainmenu');
```
The above gives all the menu items within the "mainmenu" menu, including those in submenus. To access just the menu items which are in either the topmost or the first submenu level of the "mainmenu" menu use:
```php
$mainmenuItems = $sitemenu->getItems(array('menutype','level'), array('mainmenu',array("1","2")));
```
In summary, to filter the specific menu items you want, you pass an array of properties (from the list in the next section) and an array of corresponding values which those properties should have.

Unpublished menu items are not returned. They're not included within the `$sitemenu` structure. 

As mentioned above, there isn't an equivalent method to get the menu items on the administrator back-end, as the Menu and Menuitem classes aren't used. If you wanted to access the menu details you would have to read and interpret the appropriate records from the database. 

# Properties and Parameters
The following are available as public properties of the Menuitem class. Most of these are shown in the first tab ("Details") of the "Menus: Edit Item" form when you're editing a menu item within the back end. Once you have a Menuitem object you can access the properties directly, as shown below. 
```php
$menuitems = $sitemenu->getItems(array(), array());
foreach ($menuitems as $menuitem)
{
	echo "Itemid: {$menuitem->id}";
}
```
- **id** – this is the id of the menu item. In Joomla code it's usually referred to as the Itemid, probably to distinguish it from the id of, for example, an article (as both often appear in URLs when not using SEF URLs)
- **menutype** – this identifies the Menu which the menu item belongs to. It's a unique identifier Menu Type which you assign to a menu
- **title** – what will be displayed when the menu item is shown on the menu (called the "Menu Title" in the form).
- **alias** – the segment of the URL when using SEF URLs
- **note** – the optional note shown on the form
- **route** – the section of the SEF URL which gets to this menu item. For example if the alias of this menu item is "me", the alias of its parent is "dad" and of its grandparent (at the top level of the menu) is "gran" then the route returned is "gran/dad/me".
- **link** – the link shown in the Link field of the form
- **type** – usually this will be "component" and the link will point to component functionality in Joomla. But it may also be one of the following, when the Menu Item Type selected is one of the System Links:
    - "heading" – Menu Heading – a heading for the parent of submenu items
    - "alias" – Menu Item Alias – an alias to another menu item
    - "separator" – Separator – a text string (e.g. dashes) to separate items in a menu
    - "url" – URL – a link to an external URL.
- **level** – the level within the menu item tree. The "root" entry at the base of the tree is level "0", menu items at the top level in a menu have level "1", first submenu level "2", etc.
- **language** – the language code. For example, "es-ES"
- **browserNav** – the value associated with the option entered in the Target Window field of the form. Generally this means the following;
    - 0 – Parent – the link opens in the same tab
    - 1 – New Window with Navigation – the link opens in a new tab
    - 2 – New Window without Navigation – the link opens in a new window
- **access** – the id of the AccessLevel assigned to this menu item. When you use this API it checks the logged on user and returns only those menu items which this user is permitted to view.
- **home** – whether or not this is a home page ("Default Page") for the site or language.
- **img** – this doesn't seem to be used any more. You can specify an image to be used in the menu item, but this is now specified in the Link Type tab in the form and stored in the params "menu_image" field.
- **template_style_id** – the id of the Template Style entered in the form
- **component_id** – the id of the component associated with this menu item
- **parent_id** – the id of the parent in the menu item tree
- **component** – the name of the associated component, e.g. "com_contact"
- **tree** – an array of the menu item ids getting to this menu item in the tree. If this menu item has id 789, its parent id 456 and grandparent id 123, where the grandparent is on the topmost menu (ie its parent is the root node), then tree returned will be an array ("123", "456", "789").
- **query** – an associative array of the query parameters shown in the Link field on the form. For example for a menu item pointing to a single article this will be of the form: array("option" => "com_content", "view" => "article", "id" => "123").

All the other attributes of the menu item are stored in the params field in the database and accessed using the `getParams()` method. These are too many and varied to specify completely here. Two examples are shown below: 
```php
$params = $menuitem->getParams();
$displayed = $params->get("menu_show");
$show_tags = $params->get("show_tags");
```
The `$displayed` variable will hold a boolean depending on whether this menu item should be shown in the menu or hidden, corresponding to the setting of the "Display in Menu" field in the Link Type tab in the form.

The `$show_tags` variable will hold a boolean defining whether or not to show tags associated with the item being displayed. However the presence of this field will depend on what is being presented on the web page which the menu item points to. If it's an article or contact then it's relevant and may be set, but if it's a link to a Search Form or Search Results then it isn't relevant and will not be set. 

Some of these parameters (e.g. those defined in the Link Type tab of the menu item edit form) may be defined for menu items in general, although the specific fields stored depend on the Menu Item Type selected (ie `type` property in the list of properties above). To find these look in the Joomla code under `administrator/components/com_menus/forms/item_<type>.xml`, replacing `<type>` by one of the `type`s above. These xml files provide definitions of parts of the "Menus: Edit Item" form and you can find in them the name of the attribute which is stored in the params json string in the database and accessed programmatically via the `getParams()->get()` method.

Other parameters are related to the component which is navigated to via this menu item and contain attributes which related to how the output of that component is displayed on that particular web page. To find these locate the .xml file in the folder where the layout file for that particular page is held. For example, for a page displaying a single contact look in `components/com_contact/tmpl/contact/`. 

# Getting Individual Menu Items
As well as the mechanisms described above for filtering down to the menu item(s) you want, there are some methods available to get directly to certain menu items. 

## Active Menu Item
The active menu item of a site web page relates to the menu item which Joomla is using to determine the presentation of that page (e.g. using the Template Style defined for the menu item). To find this use: 
```php
use Joomla\CMS\Factory;
$app = Factory::getApplication();
$sitemenu = $app->getMenu();
$activeMenuitem = $sitemenu->getActive();
```
You can then get the properties and parameters of this menu item as described above. 

However, note that there have been unusual cases where the active menu item has not been set (when you get SEF URLs of the form /component/com_xxx).

## Default Menu Item
To find the default menu item for a language use for example: 
```php
$menuitem = $sitemenu->getItem($itemid);
```
(When you view the list of menuitems in the administrator back end, then this is the menuitem which has the country's flag set against it.)

## Setting Menu Items
You can set menu item properties and parameters using for example: 
```php
$menuitem->setParams($params)     //set the params values

$sitemenu->setActive($itemid)     // set the active menu item
```
or by simply assigning different values to the menu item public properties. However these changes are not saved to the database and will last only for the duration of handling the current HTTP request. 

# Sample Module Code
Below is the code for a simple Joomla module which you can install and run to demonstrate use of the menu item API functionality. 

In a folder mod_sample_menu create the following 2 files: 

**mod_sample_menu.xml**
```php
<?xml version="1.0" encoding="utf-8"?>
<extension type="module" version="3.1" client="site" method="upgrade">
    <name>Menu demo</name>
    <version>1.0.1</version>
    <description>Code demonstrating use of Joomla APIs related to Menus and Menu Items</description>
    <files>
        <filename module="mod_sample_menu">mod_sample_menu.php</filename>
    </files>
</extension>
```

**mod_sample_menu.php**
```php
<?php
defined('_JEXEC') or die('Restricted Access');

use Joomla\CMS\Factory;

$app = Factory::getApplication();
$input = $app->input;

$sitemenu = $app->getMenu();

if ($activeMenuitem = $sitemenu->getActive())
{
	echo "Active menuitem is Itemid: {$activeMenuitem->id}<br>";
}
else
{
	echo "No active menuitem<br>";
}

if ($input->exists('menulanguage'))
{
	$lang = $input->get('menulanguage', "", "STRING");
}
else
{
	$lang = $app->getLanguage()->getTag();
}
echo "Getting details for language {$lang}<br>";

$menuitems = $sitemenu->getItems(array("language"), array($lang));

echo "<br>---- properties of menuitems ----<br>";
foreach ($menuitems as $menuitem)
{
	echo "<br>Itemid: {$menuitem->id}, title: {$menuitem->title}, type: {$menuitem->type}<br>";
	echo "<br>Language: {$menuitem->language}, level: {$menuitem->level}<br>";
	$params = $menuitem->getParams();
	if (!($displayed = $params->get("menu_show")))
	{
		echo "This menu item is hidden<br>";
	}
	if ($img = $params->get("menu_image"))
	{
		$imgURL = JURI::root() . $img;
		echo "Image: {$img}<br><img src='{$imgURL}'><br>";
	}
}
```
Zip up the `mod_sample_menu` directory to create `mod_sample_menu.zip`.

Within your Joomla administrator go to Install Extensions and via the Upload Package File tab select this zip file to install this sample menu module.

Make this module visible by editing it (click on it within the Modules page) then:

- making its status Published
- selecting a position on the page for it to be shown
- on the menu assignment tab specify the pages it should appear on

When you visit a site web page then you should see the module in your selected position and it should show

- the `Itemid` of the current active menuitem,
- a set of properties associated with menu items having the current language,
- a couple of attributes from the params (displaying if the menu item is hidden and any image associated with a menu item).

You can get it to display the properties and parameters for other languages by adding a URL parameter like `?menulanguage=fr-FR`. 