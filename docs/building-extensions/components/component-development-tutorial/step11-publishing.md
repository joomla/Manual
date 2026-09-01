---
sidebar_position: 11
title: Step 11 Publishing
---

## Introduction

In this step we include publishing landmark records - each record will have a state of either "published" or "unpublished",
and we provide administrator functionality to change this published state, and use it to filter landmarks displayed on the front-end.

Publishing is implemented within Joomla by using an int to store a published state value:

0 - means that the item is unpublished

1 - means that the item is published

(Other values used by Joomla components are 2 (archived) and -2 (trashed), but we're not using these here).

## Learning Points

Publish and unpublish

Introduction to Layouts

## Approach

Here's a list of the changes we need to make:

**Database**

We add a new field to the database to hold the published state,
so we need to change the SQL install and update files.

**Admin List of Landmarks**

We need to include the published state in our administrator LandmarksModel's query, and display it on the form.
And when it's displayed, we'll enable an administrator to click on it to 

- publish the record if its state is currently unpublished, and,

- unpublish the record if its state is currently published.

We'll also add toolbar buttons for publishing and unpublishing selected landmark records. 

**Admin New/Edit Form**

We need to add the publish state as a field in the XML definition of this form,
plus handle the resulting HTTP POST so that the field gets saved to the database.

**Front-end Menuitem selecting a landmark**

In [Step 2](./step02-menuitem.md) we added the ability of an administrator to set up a menuitem pointing to a landmark,
and in [Step 4](./step04-database.md#menuitem-select) we changed this to select the landmark from the database records.
We'll now change this again so that it displays only published landmarks.

**Front-end display landmark**

If a front-end user tries to display a landmark which is unpublished, then they'll receive a status 404 (page not found).

## Database

We'll call the new column "published", in line with [Table Reserved Column Names and Aliases](../../../general-concepts/table/advanced-table.md#reserved-column-names-and-aliases).

Here's the updated SQL install file:

```sql title="com_example/administrator/components/com_example/sql/install.mysql.sql"
CREATE TABLE IF NOT EXISTS `#__example_landmarks` (
    `id`        INT(11)     NOT NULL AUTO_INCREMENT,
    `title`     VARCHAR(40) NOT NULL,
    `description` TEXT      NOT NULL,
  /* highlight-next-line */
    `published` TINYINT(4) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
);

INSERT INTO `#__example_landmarks` (`title`, `description`, `published`) VALUES
  /* highlight-start */
('The Eiffel Tower', '', 1),
('The Giant\'s Causeway', '', 1);
  /* highlight-end */
```

We set the default state to be 1 (published).

And we create a new SQL update file for this version:

```sql title="com_example/administrator/components/com_example/sql/updates/mysql/0.11.0.sql"
ALTER TABLE `#__example_landmarks` 
ADD COLUMN `published` TINYINT(4) NOT NULL DEFAULT 1;
```

## Admin List of Landmarks

### Display the List of Landmarks

We need to include "published" in the Model query which selects the records from the database:

```php title="administrator/components/com_example/src/Model/LandmarksModel.php"
    protected function getListQuery()
    {
        $db = $this->getDatabase();
        $query = $db->getQuery(true);
      // highlight-next-line
        $query->select('id, title, published')
            ->from($db->quoteName('#__example_landmarks'));

        return $query;
    }
```

In the View class file we'll add 2 more toolbar buttons "Publish" and "Unpublish". 
They'll work on records which have been selected by the administrator, in the same way as the "Delete" button.

```php title="administrator/components/com_example/src/View/Landmarks/HtmlView.php"
    private function addToolBar() 
    {
        ToolBarHelper::title(Text::_('COM_EXAMPLE_LANDMARKS_VIEW_TITLE'), 'camera');
        ToolbarHelper::addNew('landmark.add', 'JTOOLBAR_NEW');   // New button
        ToolbarHelper::deleteList('', 'landmarks.delete', 'JTOOLBAR_DELETE');   // Delete button
      // highlight-start
        ToolbarHelper::publishList('landmarks.publish', 'JTOOLBAR_PUBLISH');   // Publish button
        ToolbarHelper::unpublishList('landmarks.unpublish', 'JTOOLBAR_UNPUBLISH');   // Unpublish button
      // highlight-end
    }
```

When the buttons are pressed then they will generate HTTP POST requests to the server,
with the task variable set to 'landmarks.publish' or 'landmarks.unpublish'.

The associated tmpl file needs to include the published state in a new column in the HTML table.

```php title="administrator/components/com_example/tmpl/landmarks/default.php"
<?php

\defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
// highlight-next-line
use Joomla\CMS\Button\PublishedButton;

?>
<form action="<?php echo Route::_('index.php?option=com_example&view=landmarks'); ?>" method="post" name="adminForm" id="adminForm">

    <table class="table">
        <caption class="visually-hidden">
            <?php echo Text::_('COM_EXAMPLE_LANDMARKS_CAPTION'); ?>
        </caption>
        <thead>
            <tr>
                <td class="w-1 text-center">
                    <?php echo HTMLHelper::_('grid.checkall'); ?>
                </td>
                <th scope="col">
                    <?php echo Text::_('COM_EXAMPLE_LANDMARK_TITLE_LABEL'); ?>
                </th>
              // highlight-start
                <th scope="col" class="w-1 text-center">
                    <?php echo Text::_('JSTATUS'); ?>
                </th>
              // highlight-end
                <th scope="col">
                    <?php echo Text::_('JGRID_HEADING_ID'); ?>
                </th>
            </tr>
        </thead>
        <tbody><?php foreach ($this->items as $i => $item) :?>
                    <tr>
                        <td class="text-center">
                            <?php echo HTMLHelper::_('grid.id', $i, $item->id, false, 'cid', 'cb', $item->title); ?>
                        </td>
                        <th scope="row">
                            <?php 
                                $url = Route::_('index.php?option=com_example&task=landmark.edit&id=' . $item->id);
                                $linkText = $this->escape($item->title); 
                                echo "<a href='{$url}'>{$linkText}</a>";
                            ?>
                        </th>
                      // highlight-start
                        <td class="text-center">
                            <?php
                                $options = [
                                    'task_prefix' => 'landmarks.',
                                    'id' => 'published-' . $item->id,
                                ];
                                echo (new PublishedButton())->render((int) $item->published, $i, $options);
                            ?>
                        </td>
                      // highlight-end
                        <td>
                            <?php echo (int) $item->id; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
        </tbody>
    </table>
    <input type="hidden" name="task" value="" />
    <input type="hidden" name="boxchecked" value="0" />
    <?php echo HTMLHelper::_('form.token'); ?>
</form>
```

The PublishedButton class handles displaying the tick or cross indicating that the item is published or unpublished.

When the PublishedButton tick/cross is pressed then it results in an HTTP POST,
similar to the case where the Publish / Unpublish toolbar buttons are pressed. 

You need to set the `$options` array:

```php
$options = [
    'task_prefix' => 'landmarks.',
    'id' => 'published-' . $item->id,
];
```

When the button is pressed, Joomla uses the task_prefix to form the task parameter, setting it to:

- 'landmarks.publish' if the current published state (passed in `$item->published`) is 0 (unpublished)

- 'landmarks.unpublish' if the current published state is 1 (published)

The 'id' option relates to the HTML id of the tooltip which Joomla generates for this HTML element. 

### Handling the POST

Both methods of publishing/unpublishing send the same form of parameters to the server in an HTTP POST.

#### Publishing 

For the case of publishing we get:

- `task` - set to 'landmarks.publish'

- `cid[]` - set to an array of the database ids of the records to be deleted

(Obviously in the case of the PublishedButton there will be only 1 id in the cid array).

This is very similar to the case of [deleting records](./step10-delete-records.md#controller).

Based on the `task` parameter, the Dispatcher class will call the `publish` function of the LandmarksController class.
Our LandmarksController class will use the `publish` function of the Joomla AdminController class,
which you can find in libraries/src/MVC/Controller/AdminController.php.

If you look at the AdminController code then you'll see how it 

- retrieves the `cid` array from the POST parameters,

- calls `$this->getModel()` to get the Model to use,

- calls the Model publish method passing the cid array and the value (which will be 1 for the publish operation)

- calls `setMessage` to provide a confirmation back to the user of the publish operation.

In our LandmarksController we override the getModel method to return the LandmarkModel by default,
and because LandmarkModel inherits from AdminModel, the AdminModel::publish function will be called.

For each of the entries in the cid array AdminModel::publish() will load the Table record,
and then remove the entry if the published state is already equal to the passed-in value. 

It then calls `$table->publish($pks, $value, $user->id)` to change the remaining entries to the published state given by `$value`. 

#### Unpublishing 

For the case of unpublishing we get:

- `task` - set to 'landmarks.unpublish'

- `cid[]` - set to an array of the database ids of the records to be deleted

However, we don't have an `unpublish` method in our AdminController, but instead it uses the `registerTask` approach 
which was used for Apply/Save in [Step 8 Higher-level MVC Controller methods](./step08-higher-level-mvc.md#controller-methods).

In the AdminController constructor we have:

```php
$this->registerTask('unpublish', 'publish');
```

which means that for unpublish operations the publish() method will be called as well.
Inside the publish() method it then has to determine if this is a publish or an unpublish operation:

```php
$data  = ['publish' => 1, 'unpublish' => 0, 'archive' => 2, 'trash' => -2, 'report' => -3];
$task  = $this->getTask();
$value = ArrayHelper::getValue($data, $task, 0, 'int');
```

So this code sets `$value` to 0 for `$task` set to 'unpublish' and 1 for `$task` set to 'publish',
and it is this `$value` which gets passed as a parameter into the Model publish function to set the published state. 

#### Summary

The conclusion of all this is that we have no extra code to write to handle the POST,
and we just have to include some more language strings relating to the confirmations.

```php title="administrator/components/com_example/language/en-GB/com_example.ini"
COM_EXAMPLE_LANDMARK_FIELD_SELECT_TITLE="Landmark"
COM_EXAMPLE_LANDMARK_FIELD_SELECT_DESC="Select a landmark"
; Admin landmarks view
COM_EXAMPLE_LANDMARKS_VIEW_TITLE="Landmarks"
COM_EXAMPLE_LANDMARKS_CAPTION="Table of Landmarks"
COM_EXAMPLE_LANDMARK_TITLE_LABEL="Name"
; Admin landmarks view - confirmations
COM_EXAMPLE_N_ITEMS_DELETED_1="Landmark deleted."
COM_EXAMPLE_N_ITEMS_DELETED="%d Landmarks deleted."
// highlight-start
COM_EXAMPLE_N_ITEMS_PUBLISHED_1="Landmark published."
COM_EXAMPLE_N_ITEMS_PUBLISHED="%d Landmarks published."
COM_EXAMPLE_N_ITEMS_UNPUBLISHED_1="Landmark unpublished."
COM_EXAMPLE_N_ITEMS_UNPUBLISHED="%d Landmarks unpublished."
// highlight-end
; Admin landmark edit form
COM_EXAMPLE_LANDMARK_EDIT="Landmarks: Edit"
COM_EXAMPLE_LANDMARK_TITLE_DESC="Name of the landmark"
COM_EXAMPLE_LANDMARK_DESCRIPTION_LABEL="Description"
COM_EXAMPLE_LANDMARK_DESCRIPTION_DESC="A summary description of the landmark"
COM_EXAMPLE_SAVE_SUCCESS="Landmark successfully saved"
```

## Admin New/Edit Form

What is displayed on this form is defined in the XML file, so we must add a field for the published state:

```xml title="administrator/components/com_example/forms/landmark.xml"
<?xml version="1.0" encoding="utf-8"?>
<form> 
    <field
            name="id"
            type="text"
            label="JGLOBAL_FIELD_ID_LABEL"
            class="readonly"
            default="0"
            readonly="true"
            />
    <field
            name="title"
            type="text"
            label="COM_EXAMPLE_LANDMARK_TITLE_LABEL"
            description="COM_EXAMPLE_LANDMARK_TITLE_DESC"
            required="true"
            default=""
            />
    <field  name="description" 
            type="editor"
            label="COM_EXAMPLE_LANDMARK_DESCRIPTION_LABEL" 
            description="COM_EXAMPLE_LANDMARK_DESCRIPTION_DESC"
            filter="\Joomla\CMS\Component\ComponentHelper::filterText" 
            buttons="true" 
            />
  <!-- highlight-start -->
    <field
            name="published"
            type="list"
            label="JSTATUS"
            default="1"
            validate="options"
            >
            <option value="1">JPUBLISHED</option>
            <option value="0">JUNPUBLISHED</option>
    </field>
  <!-- highlight-end -->
</form>
```

Notice again that it's crucial to have the `name` attribute of the `<field>` set to the same name as the associated column in the database.
The "list" type field is described in [List Form Field](../../../general-concepts/forms-fields/standard-fields/list.md).

We then need to display this field within the tmpl file:

```php title="administrator/components/com_example/tmpl/landmark/edit.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Router\Route;
use Joomla\CMS\HTML\HTMLHelper;
// highlight-next-line
use Joomla\CMS\Layout\LayoutHelper;

?>

<form action="<?php echo Route::_('index.php?option=com_example&layout=edit&id=' . (int) $this->item->id); ?>"
    method="post" name="adminForm" id="adminForm">

    <?php echo $this->form->renderField('title');  ?>
    
  // highlight-start
    <div class="row">
        <div class="col-lg-9">
  // highlight-end
            <?php echo $this->form->renderField('description');  ?>
            <?php echo $this->form->renderField('id');  ?>
  // highlight-start
        </div>
        
        <div class="col-lg-3">
            <?php echo LayoutHelper::render('joomla.edit.global', $this); ?>
        </div>
    </div>
  // highlight-end

    <input type="hidden" name="task" value="" />
    <?php echo HTMLHelper::_('form.token'); ?>
</form>
```

Here we've aligned with how Joomla presents this form, in one row with the description on the left and publishing state etc on the right.

The CSS classes col-lg-3 and col-lg-9 come from the Bootstrap Grid layout, with pages split into 12 columns,
so that col-lg-3 occupies 25% and col-lg-9 occupies 75% of the whole.

Here we've used a layout to output the published state field; you can read more about layouts in [Layouts](../../../general-concepts/layouts.md).

The layout 'joomla.edit.global' can be found in layouts/joomla/edit/global.php. 
If you view the source you will see the names of the fields which it will display. 

We also have to consider handling the POST which arises from the form being submitted.
Happily Joomla handles this for us, mapping our 'published' field through to the associated column in the database.

It also performs validation on this field, triggered by the validate="options" attribute in the field definition;
we will cover validation in a future step.

## Front-end Menuitem selecting a landmark

Whenever an administrator defines a menuitem which points to a landmark,
then the form which allows him/her to select the landmark is defined in default.xml in the same directory as the site tmpl file which displays that landmark. 

We simply need to change the SQL statement in this file to filter on published state:

```xml title="components/com_example/tmpl/landmark/default.xml"
<?xml version="1.0" encoding="utf-8"?>
<metadata>
    <layout title="COM_EXAMPLE_LANDMARK_MENUITEM_TITLE">
        <message>COM_EXAMPLE_LANDMARK_MENUITEM_DESCRIPTION</message>
    </layout>
    <fields name="request">
        <fieldset name="request">
            <field
                name="id"
                type="sql"
                label="COM_EXAMPLE_LANDMARK_FIELD_SELECT_TITLE"
                description="COM_EXAMPLE_LANDMARK_FIELD_SELECT_DESC"
              <!-- highlight-next-line -->
                query="SELECT id, title FROM #__example_landmarks where published = 1"
                key_field="id"
                value_field="title"
                >
            </field>
        </fieldset>
    </fields>
</metadata>
```

## Front-end display landmark

If the site gets a request to display a landmark which is unpublished then it should return an error.

To do this, we change the site Model to include a check for the published state:

```php title="components/com_example/src/Model/LandmarkModel.php"
<?php
namespace My\Component\Example\Site\Model;
 
\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\ItemModel;
use Joomla\CMS\Factory;

class LandmarkModel extends ItemModel
{
    function getItem($pk = null)
    {
        $app = Factory::getApplication();
        $input = $app->getInput();
        $id = $input->get('id', 0, 'INT');

        $table = $this->getTable('Landmark', 'Administrator');
        $result = $table->load($id);
      // highlight-next-line
        if ($result && $table->published == 1) {
            return $table;
        } else {
            throw new \UnexpectedValueException("id out of range");
        }
    }
}
```

## Installation

In the manifest file, update the version number:

```xml title="com_example/example.xml"
  <!-- highlight-next-line -->
    <version>0.11.0</version>
...
```

and then install the updated component.

## Exploring your installation

Experiment with setting the publishing state in the administrator back-end,
confirming that it works as expected, and that it has the expected results in the front-end.

You can view the HTTP requests in your browser's devtools, and use phpmyadmin to check the entries in the database.

## Challenge

In the administrator Articles view com_content doesn't display individual buttons for publish, unpublish, etc,
but rather displays an ...Actions button.
When an article is selected then the Actions button is enabled and the publish and unpublish buttons can be found in its dropdown.

Can you use the relevant lines from administrator/components/com_content/src/View/Articles/HtmlView.php::addToolbar function
to create an Actions button which has working Delete, Publish and Unpublish options within the dropdown?