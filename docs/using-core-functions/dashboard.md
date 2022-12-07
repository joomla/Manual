Dashboard
=======================
It is common usage to insert a link into the component menu for direct access to your own component.
This is done in the manifest file: 

```xml title="Menu item Component in example.xml "
    <administration>
	    <menu>COM_EXAMPLE</menu>
	
	[.. ]
	</administration>
```
Add a dashboard to your component:
==================================

A parameter < dashboard > expands the menu entry with link to a dashboard for your component. You can give this dashboard any name you want, but <strong> Note:</strong> use lowercase and only "-", never underscore for the dashboard name.
my-example or example are correct, my_example, Com-MY_EXAMPLE are wrong.

The param < dashboard > 
- will make a dashboard icon appear next to the administrator menu item for the component
- The dashboard icon will click through to display modules assigned to the cpanel-example administrator module position
- The title and icon defined in the XML file will be used as the header and icon at the top of the component's dashboard page.

```xml title="Dashboard Link "
<administration>
	<menu img="class:calendar">
		COM_EXAMPLE
		<params>
			<dashboard>example</dashboard>
		</params>
	</menu>
	
	[..]
</administration>
```
Joomla provides now a dashboard for your component. You can add modules here using the <strong> position: cpanel-example </strong>. 

## Dashboard title and icon 

Give your dashboard a name and an icon. Add this to your manifest file:

```xml title="Dashboard title and icon"
    <dashboards>
		<dashboard title="COM_EXAMPLE" icon="icon-calendar">COM_EXAMPLE_DASHBOARD_NAME</dashboard>
	</dashboards>
```

## Submenu
If you want to address different views of your component, expand the menuy by a submenu.  

```xml title="Submenu items"
<menu img="class:folder">
	COM_EXAMPLE
	<params>
		<dashboard>example</dashboard>
	</params>
</menu>
<submenu>
	<menu link="option=com_example" view="examples"
		alt="10 good examples">COM_EXAMPLE_EXAMPLES</menu>
	<menu link="option=com_categories&amp;extension=com_example"
		view="categories" alt="Example Categories">COM_EXAMPLE_CATEGORIES</menu>
	<menu link="option=com_fields&amp;view=fields&ap;mp;context=com_example_example">COM_EXAMPLE_FIELDS</menu>
	<menu link="option=com_fields&amp;view=groups&amp;context=com_example_example">>COM_EXAMPLE_FIELDGROUPS</menu>
</submenu>
```

# Submenu Module on your Dashboard

Your dashboard is empty and waits for modules to be filled in. If you want to add your submenu, you have to
- add a folder presets to your component
- write a preset for your module
- add the presets folder to your .xml file
- expand your install script

Presets are already used in the core, see examples the component com_menu.

## The menu preset

In a folder 'presets' write a preset file, name it example.php. 

```xml title="presets/example.xml"
<?xml version="1.0"?>
<menu
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="urn:joomla.org"
	xsi:schemaLocation="urn:joomla.org menu.xsd"
	>
	<menuitem
		title="COM_EXAMPLE"
		type="heading"
		icon="calendar"
		dashboard="example"
		>
		<menuitem
			title="COM_EXAMPLE_EXAMPLE"
			type="component"
			element="com_example"
			link="index.php?option=com_example&amp;view=examples"
		/>

		<menuitem
			title="COM_EXAMPLE_CATEGORY"
			type="component"
			element="com_categories"
			link="index.php?option=com_categories&amp;view=categories&amp;extension=com_example"
		/>
	</menuitem>
</menu>
```


## Manifest file

```xml title="New folder in example.xml"
	<administration>

    [..]

		<files folder="admin">
            <folder>forms</folder>
			<folder>language</folder>
            <folder>presets</folder>
			<folder>services</folder>
			<folder>sql</folder>
			<folder>src</folder>
            <folder>tmpl</folder>
            <filename>access.xml</filename>
            <filename>config.xml</filename>
			<filename>eaxmple.xml</filename>
		</files>
	</administration>
```

## install script

We suppose here that you have a install script in your component. If not, please read the doc for install scripts.

You add your preset in the dashboard of your component with a single line of code during installation: 

```xml title="installation script"
    // Add menu module to dashboard 
    $this->addDashboardMenu('example', 'example');
```

See also: https://api.joomla.org/cms-4/classes/Joomla-CMS-Installer-InstallerScript.html#method_addDashboardMenu

