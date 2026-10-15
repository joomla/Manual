---
sidebar_position: 8
title: Step 8 Using Higher-level MVC Classes
---

## Introduction

In this step we don't provide any new functionality,
but show how we can use the higher-level MVC classes to simplify our code.

We'll provide the updated LandmarkController and LandmarkModel code,
and then explain how the functions of [step 7](./step07-admin-edit.md) are provided within the FormController and AdminModel,
which our classes now inherit from.

You may find it useful to read [Joomla Library MVC Classes](../mvc/library-mvc.md).

The code is available at [com_example step 8](https://github.com/joomla/manual-examples/tree/main/component-tutorial/step08_higher_level_mvc).

## Learning Points

Joomla Higher-level MVC Classes

## Updated Controller and Model

The LandmarkController inherits from FormController (which is in libraries/src/MVC/Controller/FormController.php).

```php title="administrator/components/com_example/src/Controller/LandmarkController.php"
<?php

namespace My\Component\Example\Administrator\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\FormController;

class LandmarkController extends FormController {

    protected $context = 'landmark';

}
```

The LandmarkModel inherits from AdminModel (which is in libraries/src/MVC/Model/AdminModel.php).

```php title="administrator/components/com_example/src/Model/LandmarkModel.php"
<?php
namespace My\Component\Example\Administrator\Model;
 
\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\AdminModel;
use Joomla\CMS\Factory;

class LandmarkModel extends AdminModel
{
    function getForm($data = array(), $loadData = true)
    {
        $form = $this->loadForm(
            'com_example.landmark', // a name you assign to the form - include com_example to make it unique
            'landmark',             // the xml filename - Joomla will find it in forms/landmark.xml
            array(
                'control' => 'jform',       // the name of the parameter in the HTTP POST
                'load_data' => $loadData    // whether to prefill data or not
            )
        );

        if (empty($form))
        {
            return false;
        }

        return $form;
    }
    
    protected function loadFormData()  // the callback function which is called if $loadData was true
    {
        // Check the session for previously entered form data.
        $data = Factory::getApplication()->getUserState('com_example.edit.landmark.data', array());

        if (empty($data))
        {
            $data = $this->getItem();
        }

        return $data;
    }
}
```

As you can see, most of the functions written in the previous step are now supplied by the higher-level Controller and Model classes.

## Action 3

This refers to Action 3 within the [Post-Request-Get Pattern Edit Article](../mvc/post-redirect-get.md#example-2-edit-article) example.

After the landmarks view has displayed the list of landmarks, and the administrator has clicked on one of them to edit it,
then the link is something like `index.php?option=com_example&task=landmark.edit&id=1`,
which results in a call to the `edit` method within LandmarkController.

This `edit` method is now provided by FormController,
and you should read through the code to see how it provides what is needed. 

Joomla expects the class to provide the `$context` variable:

```php
protected $context = 'landmark';
```

as this is used in finding the Model class, 
and in calling [setUserState](./step07-admin-edit.md#setting-and-getting-the-userstate).

The FormController contains functionality which we will use in future steps:

- checking that the user is permitted to edit this record, and,

- checking out the record, to avoid 2 users simultaneously editing the same record.

At the end of the `edit` function is the `setRedirect` call to display the edit form. 

## Action 4

At this point we used in [step 7](./step07-admin-edit.md#action-4):

- a DisplayController::display() method - which was provided by the BaseController. 
This continues to work, as the FormController which we use now also inherits from BaseController.

- a View class, with an associated tmpl file - these don't change

- a form definition in XML - which doesn't change

- a LandmarkModel, which now inherits from AdminModel - this is the only file which changes

In the updated LandmarkModel we still need:

- the `getForm` method to load the form from the XML definition, and

- the `loadFormData` method to prefill the fields of the form.

This step 7 code:

```php
class LandmarkModel extends ItemModel implements FormFactoryAwareInterface, FormModelInterface
{
    use FormFactoryAwareTrait;  // getter/setter for FormFactory, which instantiates the Form object
    use FormBehaviorTrait;      // contains the functions for loadForm etc
```

now becomes:

```php
class LandmarkModel extends AdminModel
{
```

This is because AdminModel inherits from FormModel, and you can see that FormModel provides that functionality
by looking at libraries/src/MVC/Model/FormModel.php.

We also no longer need the `getItem` function, as this is present in AdminModel,
and it works because we're following the Joomla pattern in how we're using Models, Tables and primary keys. 

## Action 5

Here we handle the HTTP POST request with the submitted form data.
In [step 7](./step07-admin-edit.md#action-5) we had:

- LandmarkController `apply`, `save` and `cancel` methods to match the Save, Save & Close and Cancel buttons

- LandmarkModel `filter`, `validate` and `save` methods to handle the data filtering and validation, and saving the updated record to the database.

All of this functionality is now supplied by the higher-level MVC classes.

### Controller methods

In the FormController class in libraries/src/MVC/Controller/FormController.php you can see the `save` and `cancel` functions.
You don't find an `apply` function, and the reason for this is below.

The Dispatcher code (in libraries/src/Dispatcher/ComponentDispatcher.php::dispatch()) analyses the `task` parameter 
(which in this case is the string "landmark.apply"). It therefore causes the LandmarkController to be instantiated,
but doesn't directly call its `apply` method, but instead does:

```php
$controller->execute($task);   // with $task set to "apply"
```

The Controller `execute` method (in BaseController) uses a `$taskMap` variable to map the value of `$task` to its associated method
(by default, a method with the same name as `$task` is called).

In the FormController constructor we have:

```php
$this->registerTask('apply', 'save');
```

and this maps the "apply" task to the `save` method.

The functionality required by `save` and `apply` are similar, and within the `save` method the code uses 

```php
$task    = $this->getTask();
```

to get the value of the original `$task` parameter (ie "apply" in this case), in order to handle where the functionality differs.

### Model methods

The FormModel doesn't supply a separate `filter` function,
but both the `filter` and `validate` functions are covered by the `FormModel::validate` function,
via the `Form::process` method (in libraries/src/Form/Form.php).

The Model `save` function is provided by AdminModel.

## Installation

Update the version number in the manifest file:

```xml title="com_example/example.xml"
  <!-- highlight-next-line -->
    <version>0.8.0</version>
...
```

Install the updated component and verify that the administrator edit functionality works as before.