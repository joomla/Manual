---
sidebar_position: 2
title: ModalSelect Field
---

The **modal select** form field type provides a "modal" or "modal window" to allow the user to select an item in a row from a page displaying multiple rows. 

(An example of a modal is when you are creating a menuitem pointing to a Single Article.
When you press select to choose the article, then Joomla displays a modal with multiple articles (in an iframe)
and allows you to select the article for the menuitem).

- **type** (mandatory) must be *ModalSelect*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **required** (optional) Whether the field is required or not
- **hint** (optional) The HTML placeholder text 

- **select** set to "true" if you want to be able to select an item 
- **iconSelect** the [icon](../../icons.md) to display beside the "Select". Default is "icon-file"
- **titleSelect** the text (translatable) to display at the top of the Select modal
- **urlSelect** the URL for the iframe for the select modal window

- **sql_title_table**, **sql_title_column**, **sql_title_key** you'll probably need to set these fields for your ModalSelect field to work properly.
They're necessary if you're redisplaying a form after a submit. 
This is because in the submit POST parameters there's only room for the modal select field id, but when it's redisplayed it shows the associated title also.
So these fields are used to obtain the title from the id, by performing a SQL query on the database table.

- **clear** set to "true" if you want to allower users to cancel the selection of an item 
This causes the Clear button to be displayed when an item is selected.

- **new** set to "true" if you want to be able to create a new item
This causes the Create button to be displayed when no item is selected.
- **titleNew** the text (translatable) to display at the top of the Create modal
- **urlNew** the URL for the iframe for the create modal

- **edit** set to "true" if you want to be able to edit a selected item
This causes the Edit button to be displayed when an item is selected.
- **titleEdit** the text (translatable) to display at the top of the Edit modal
- **urlEdit** the URL for the iframe for the edit modal

- **urlCheckin** the URL to use to check-in an item

- **onchange** if you're using the ModalSelectField inside filter fields then you'll probably want
to set this to "this.form.submit();".
This means that once an item is selected the filter fields form is submitted to redisplay the
records based on the updated filter criteria.

Implemented by: libraries/src/Form/Field/ModalSelectField.php

## How it works

There are 2 main parts to the ModalSelect field.
The first part consists of the fields which are shown in the main window:

![ModalSelect fields in main window](./_assets/modalselect1.jpg)

Here you can see the HTML elements which are displayed in the main window:
- the label
- an asterisk next to the label, arising from the "required" attribute 
- the placeholder text "Select an Article", arising from the "hint" attribute
- a Select button - from the attribute `select="true"`
- a Create button - from the attribute `new="true"`

When you press the Select button then a modal appears:

![ModalSelectField modal](./_assets/modalselect2.jpg)

This modal is implemented by a [Joomla Dialog](../../javascript/js-library/joomla-dialog.md) web component, which contains:
- the text "Select an Article", from the `titleSelect` attribute
- an iframe displaying the articles, whose `src` is given by the `urlSelect` attribute

When you click on an article then the Joomla Dialog code does the following:
- identifies the article you clicked on (based on the nearest HTML element with the attribute 'data-content-select' set)
- reads the other 'data-...' attributes from that HTML element. 
You should set the 'data-id' and 'data-title' attributes as a minimum.
- passes the data attribute values to the main window in a postMessage message.

This is described in the [Joomla Modal Select](../../javascript/js-library/modal-content-select.md) section.

When the main window receives the postMessage notification with the selected article it displays:

![ModalSelectField with selected article](./_assets/modalselect3.jpg)

Here you can see:
- the title of the selected article (p4)
- the Edit button, from the `edit="true"` attribute
- the Clear button, from the `clear="true"` attribute
- There's also a hidden field which contains the id of the selected article, 
which will be sent to the server within the HTTP POST parameters

The Select and Create buttons are shown only if no item has been selected.

The Edit and Clear buttons are shown only if an item has been selected.

## Example ModalSelect field

ModalSelect fields work best on the administrator back-end, because that's where the necessary Joomla code is located for working with them.

However, you can use this [exampleform component](../../../building-extensions/components/component-examples/example-form-component.md) and insert the following into the XML form.

```xml
<field
  type="ModalSelect"
  name="article"
  label="Article"
  select="true"
  iconSelect="fa fa-bomb"
  titleSelect="Selecting the Article"
  urlSelect="index.php?option=com_content&amp;view=articles&amp;layout=modal&amp;tmpl=component"
  clear="true"
  sql_title_table="#__content"
  sql_title_column="title"
  sql_title_key="id"
/>
```

By navigating to "/index.php/component/exampleform/" on your site front-end, this will display a ModalSelect field which will allow you to select an article.

After clicking the "Select" button the field will open a Joomla Dialog containing a iframe.
The content of the iframe comes from `urlSelect` which is 
```
"index.php?option=com_content&amp;view=articles&amp;layout=modal&amp;tmpl=component"
```
and this displays the list of articles to select from.

In this example, on the front-end 
the com_content view will assign the `modal` layout from the administrator back-end.
This is because in the front-end com_content DisplayController constructor it has:

```php
if ($this->input->get('view') === 'articles' && $this->input->get('layout') === 'modal') {
    // Article frontpage Editor article proxying:
    $config['base_path'] = JPATH_COMPONENT_ADMINISTRATOR;
    }
```

and this results in the administrator Articles view being displayed. 

If you use the ModalSelect field on the administrator back-end to select an article, 
then com_content will use the administrator Articles `modal` layout directly.

(The display looks a bit different on the site front-end because the site template (by default cassiopeia)
is different from the administrator template (by default atum)).

## Custom Components

If you want to enable a ModalSelect for your custom component, then you need to do the following.

For your equivalent of the administrator com_content articles view you need to write your equivalent of 
administrator/components/com_content/tmpl/articles/modal.php.

This differs from articles.php (in the same folder) in the following key details, which you should replicate:

- include the system modal-select-field.js code:

```php
$this->document->getWebAssetManager()->useScript('modal-content-select');
```

- specify '&tmpl=component' within the `<form action="...">` URL. 
This means that the display will use the template component.php file instead of index.php file within the iframe,
and will avoid displaying the Joomla toolbar, for example.

- on your field within the display which you want to allow users to selecting by clicking, add the following attributes

```php
$attribs = 'data-content-select'
        . ' data-id="' . $row->id . '"'
        . ' data-title="' . $this->escape($row->title) . '"';
```

(Change `$row->id` and `$row->title` to match your fields).

The 'data-content-select' is used by the Joomla dialog to define that this field should be clickable.

The 'data-id' and 'data-title' fields are used to define the values of the id and title for the ModalSelect field.

You'll also need to select this modal.php tmpl file by specifying `&amp;layout=modal` within the `urlSelect` attribute.

## Creating and Editing items

If you have a custom component and you want to allow Edit and Create of items within your ModalSelectField,
then you have to specify
- edit="true", and specify the `urlEdit` to be the URL pointing to your item edit form
- new="true", and specify the `urlNew` to be the URL pointing to your item create form

These will then be run within the iframe of the Joomla Dialog, and will cause a record to be edited or created.

However, you have extra work to do because the edited/created item has to be injected back into the ModalSelectField as the item selected.

To do this, you can take the following approach:
- inside your Controller which handles the `save()`, after you have saved the record check if you're in the context of a modal, 
and if so then get the record id and redirect to a "modalreturn" layout:


```php
if ($this->input->get('layout') === 'modal' && $this->task === 'save') {
    $id = $model->getState('item.id', '');   // use your own state variable here
    $return = 'index.php?option=' . $this->option . '&view=' . $this->view_item . $this->getRedirectToItemAppend($id)
                . '&layout=modalreturn';
    $this->setRedirect(Route::_($return, false));
    }
```

You then need to write your modalreturn.php tmpl file for the same View. The key aspects are:
- use the modal-content-select.js script:

```php
$wa = $this->document->getWebAssetManager();
$wa->useScript('modal-content-select');
```

- pass your item's id and title down to the javascript:

```php
if ($this->item) {
    $data['id']    = $this->item->id;
    $data['title'] = $this->item->title;
    }
$this->document->addScriptOptions('content-select-on-load', $data, false);
```

If the modal-content-select.js code finds data within the 'content-select-on-load' datastore,
then it immediately passes the data in a postMessage to the main window. 
The message listener in the main window receives the message and sets the passed id and title in the modal select field.
It then closes the Joomla Dialog.

If you get stuck you can follow the example of com_content:
- administrator/components/com_content/src/Controller/ArticleController.php - com_content uses 
the save() method of the MVC library FormController class, 
so the relevant code is in the postSaveHook() method,
which gets called at the end of FormController::save().
- administrator/components/com_content/tmpl/article/modalreturn.php - this also displays the title
of the selected article which appears momentarily before the Joomla Dialog is closed.