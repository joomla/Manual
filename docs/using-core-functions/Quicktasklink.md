Quicktask Link and Icon
=======================

In general, a component has has one or more links to its views.They are defined in the manifest file and is added int othe menu during installation.

```HTMLx title="A link to your component "
<administration>
	<menu img="class:calendar">
		COM_EXAMPLE
	</menu>
	
	[..]
</administration>
```
Sometimes it is useful to add so called <strong>quicktask link</strong> which enables an action calling fromthe menuy without first visiting the Overview.
You can see this for Joomla core components, for example articles in com_content, here the quicktask is the plus icon and lets you add a new article in a single click.
Your menu link is added in the manfest file during installation.

## Qicktask link

A quicktask link and icon are added as params to a menu item.

```xml title="Qicktask Link and icon"
	<menu link="option=com_example&amp;view=examples">
		COM_EXAMPLE_MENU_EXAMPLE
		<params>
			<menu-quicktask-title>>COM_EXAMPLE_QUICKTASK_TITLE</menu-quicktask-title>
			<menu-quicktask>index.php?option=com_example&amp;view=example&amp;layout=edit</menu-quicktask>
		</params>
	</menu>

```

## Example 

This example shows a complete menu with dashboard, submenu and a quicktask.

```
		<menu img="class:calendar">
			COM_EXAMPLE
			<params>
				<dashboard>wickedevent</dashboard>
			</params>
		</menu>
		<submenu>
			<menu link="option=com_example">
				COM_EXAMPLE
				<params>
					<menu-quicktask-title>>COM_EXAMPLE_EXAMPLES</menu-quicktask-title>
					<menu-quicktask>index.php?option=com_example&amp;view=example&amp;layout=edit</menu-quicktask>
				</params>
			</menu>
			<menu link="option=com_categories&amp;extension=com_example">
				JCATEGORY
				<params>
					<menu-quicktask-title>JCATEGORY</menu-quicktask-title>
					<menu-quicktask>index.php?option=com_categories&amp;view=category&amp;layout=edit&amp;extension=com_example</menu-quicktask>
				</params>
			</menu>
			<menu link="option=com_fields&amp;view=fields&amp;context=com_example,example">Felder</menu>
			<menu link="option=com_fields&amp;view=groups&amp;context=com_example,example">Feldgruppen</menu>
		</submenu>

```