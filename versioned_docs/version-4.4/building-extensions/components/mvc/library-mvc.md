---
title: Library MVC Classes
sidebar_position: 4
---
# Joomla Library MVC Classes
Joomla provides several Controller, View and Model library classes, and this section gives an overview of these, and explains when your own component should use each class. However, it doesn't attempt to provide a full description of each class's functionality. The classes can be found in libraries/src/MVC.

# Base MVC Classes
In practical terms, the lowest level classes you would be likely to use are:
- BaseController in libraries/src/MVC/Controller/BaseController.php
- HtmlView in libraries/src/MVC/View/HtmlView.php (for displaying web pages)
- BaseDatabaseModel in libraries/src/MVC/Model/BaseDatabaseModel.php

(If your component is responding to an Ajax call with a JSON-encoded object then you would use libraries/src/MVC/View/JsonView.php instead.)

In general, using these base classes is a good option if your component is displaying a single item on a site page. 

## BaseController
The functionality within BaseController includes: 
- the `execute()` method described above, which runs the appropriate Controller function, based on the *task* parameter's `<method>` part (which is passed to it).
- functions for determining the appropriate View and Model classes to use (based on the setting of the view parameter within the HTTP request), and getting the MVCFactory class to create them
- a default `display()` method, which gets instances of the View and Model classes (including providing the View instance with a link to the Model instance), and then calls the `display()` method of the View class.

## HtmlView
The functionality within HtmlView includes: 
- a default `display()` method, which runs the tmpl file
- code for finding the tmpl file, taking into account a layout override which may have been put into the template folder structure
- code for setting the model instance, and subsequently retrieving it

## BaseDatabaseModel
The functionality within BaseDatabaseModel includes: 
- code for getting an instance of the Table class (via the MVCFactory class)
- base code for creating a model "state". This feature is useful if the component and/or several modules shown on the web page all use the same base data. In this case they may share the same Model instance and the model "state" acts like a container for sharing the values of items across the component and modules.

# Higher-level Controller Classes
There are 2 higher-level controller classes, each of which inherit from BaseController. 

## AdminController 
AdminController contains methods which handle the types of operations that can be performed on multiple items, for example:

- delete
- checking-in
- changing the publishing state
- changing the relative ordering of records

The code generally calls the related Model method to effect the operation, sets up the message based on the success of the Model operation, and sets up the redirect back to the same page. For this reason it's very useful in Action 2 shown in the diagram above in the [Post/Request/Get pattern](post-redirect-get.md) section.

The name AdminController suggests that this controller is to be used only on the back end administrator functionality, however, this is not the case. It's appropriate to use it on the site front end as well.

Note however that it doesn't support the operations enabled by the Batch button on e.g. the Content/Articles page; these POST requests are handled by the FormController.

## FormController
FormController contains methods which are associated with editing an individual item 

- handling a request to edit an item – which involves checking that the user is allowed to edit the item and that it isn't already checked out, and if these checks pass then the item is checked out (if that component has enabled checkout) and a redirect is issued to display the edit form
- handling a request to add a new item – which involves checking that the user is allowed to create the item and results in a redirect to display a blank edit form
- handling the Save of an item being edited or created from new – the code checks that the user is allowed to perform the operation and calls the appropriate model method to save the new/edited item.
- handling the Cancel of an edit, redirecting the user back to the appropriate page (and checking-in the record if required).
- handling the operations initiated through the Batch button

The FormController is thus well suited to Actions 3 and 5 shown in the diagrams above in the [Post/Request/Get pattern](post-redirect-get.md) section.

# Higher-level View Classes
Apart from the CategoryFeedView, which is used for generating a [feed](https://docs.joomla.org/J3.x:Developing_an_MVC_Component/Adding_a_Feed), there are two higher level View classes in common usage:
- CategoryView – for displaying a category and its children
- CategoriesView – for displaying all the categories at a certain level in the category hierarchy, and the number of items associated with each category

The two classes ListView and FormView seem to be aimed at functionality for displaying a list of records (like the `com_content` administrator View\Articles\HtmlView) and a form for editing a record (like the `com_content` administrator View\Article\HtmlView). However, at time of writing (Joomla 5 alpha has recently appeared), they aren't used by any of the Joomla components, so I wouldn't recommend using them, at least not yet.

## Higher-level Model Classes
The diagram shows the inheritance tree of the Joomla library MVC models. 
![Model Class Hierarchy](_assets/model-hierarchy.jpg "Model Class Hierarchy")

**ItemModel** is almost the same as BaseDatabaseModel. It just has an extra `getStoreId()` method which is relevant when you have a component and/or several modules sharing the same model and you want to distinguish between data sets relevant to each.

In addition to `getStoreId()`, **ListModel** has capability relating to obtaining a set of records for display on a web page, including support for pagination. Note that the pagination capability may still be slightly different between the front end and the back end. The ListModel is useful for supporting Action 1 in the diagrams in the [Post/Request/Get pattern](post-redirect-get.md) section.

**FormModel** includes support for Joomla forms, both for setting up the form so that it can be displayed, and also so that the form data sent in the POST can be validated. In addition, it has methods for implementing checkin and checkout of database records. So it's suitable for handling Actions 3 and 4 in the diagrams.

**AdminModel** extends FormModel, so it has all the capability for handling forms, but in addition has methods for handling database updates – including capability for adding, updating and deleting records – as well as support for handling operations in batch. So it's suitable for handling Actions 2 and 5 in the diagrams. As with the AdminController, this model is not just appropriate for the administrator functionality, but can be used on the front end as well.

However, although the FormModel and AdminModel support different cases in the flow associated with editing a record, in practice it's common to use the same model for all the different steps of the flow. All the Joomla core components use the same model across these steps, and so they all extend AdminModel instead of FormModel.

Something to be aware of if you are using the same model across the "edit item" flow is that your model code is performing 2 purposes:
- preparing data to be shown on a web page
- preparing a form, either for display on a web page or for validating POST data

When you're using the model because you're handling a POST (i.e. cases 3 and 5 in the diagram) then any effort expended in preparing the data for a web page is going to be wasted. (In fact, in the FormController `getModel()` method call, the parameter `$config` is set to `array('ignore_request' => true)` by default, which results in the model's `populateState` method not being run, to save this wasted effort.) 

# Summary
As we've seen, Joomla has rich functionality in higher level Controller and Model classes which can greatly simplify your code (all of which can be used on both the front end and back end). 

The choice of which controller and model classes to extend is easier on the back end, because you just follow the pattern of the Joomla core components.

For the front end here's a rough guide to choosing the most appropriate Controller and Model classes to extend; in each case you're using the standard HtmlView as base View class to extend.

## Simple Display
Simply displaying a record or a set of records, without providing the ability to change anything
- Controller extends BaseController
- Model extends BaseDatabaseModel or (particularly if you're sharing a model between a component and modules) ItemModel if it's a single record, ListModel if it's multiple records.

## Displaying records, plus operations on selected records
Displaying a form with multiple records (but the form isn't defined in an XML file), including the providing the ability to select several records and apply some sort of operation to them (eg delete, publish):
- Controller extends BaseController
- Model extends ListModel – except if you're using the same model for displaying the form and handling the updates, in which case use AdminModel

## Handling the HTTP POSTs from the above
- Controller extends AdminController
- Model extends AdminModel

## Editing a record
Displaying a form with a single record, where the form is defined in an XML file, and allowing the user to edit it, or a blank record and allowing the user to create a record:
- Controller extends BaseController
- Model extends FormModel – except if you're using the same model for displaying the form and handling the updates (as is usually the case), in which case use AdminModel

## Handling the HTTP POSTs from the above
- Controller extends FormController
- Model extends AdminModel