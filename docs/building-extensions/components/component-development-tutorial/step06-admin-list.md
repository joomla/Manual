---
sidebar_position: 5
title: Step 5 Administrator List
---

## Introduction

We now begin the development which allows administators to manage the landmarks.
In this step we provide a list of landmarks to the administrator. 

The code is available at [com_example step 5](https://github.com/joomla/manual-examples/tree/main/component-tutorial/step05_admin_list).

## Learning Points

Defining the administrator menu

List Model

## Approach

![Admin display](./_assets/step05-admin-display.jpg)

In this step we develop the 2 items highlighted in the screenshot above:

- in the red rectangle, we'll add our menuitems into the Administrator / Components menu

- in the green rectangle, we'll output the landmarks in an HTML table.

## Defining the administrator menu

The administrator menu is defined in the manifest XML file, so we add a couple of items to the `<administration>` section:

```php title="com_example/example.xml"
    <administration>
        <files folder="administrator/components/com_example">
            <folder>services</folder>
            <folder>sql</folder>
            <folder>src</folder>
            <folder>tmpl</folder>
        </files>
        <languages folder="administrator/components/com_example/language">
            <language tag="en-GB">en-GB/com_example.ini</language>
            <language tag="en-GB">en-GB/com_example.sys.ini</language>
        </languages>
      <--! highlight-start -->
        <menu link="option=com_example">COM_EXAMPLE_MENU</menu>
        <submenu>
            <menu link="option=com_example&amp;view=landmarks">COM_EXAMPLE_MENU</menu>
        </submenu>
      <--! highlight-end -->
    </administration>
```

Here both menu items are given the same text: COM_EXAMPLE_MENU, but you can obviously make them different if you wish.

As these are shown on a page with display from multiple comments, the language string must go into the .sys.ini file:

```php title="administrator/components/com_example/language/en-GB/com_example.sys.ini"
COM_EXAMPLE_TITLE="Joomla Component Tutorial"
COM_EXAMPLE_DESCRIPTION="Builds an example application for managing famous landmarks"
; Menu items
COM_EXAMPLE_LANDMARK_MENUITEM_TITLE="Landmark"
COM_EXAMPLE_LANDMARK_MENUITEM_DESCRIPTION="Displays a famous landmark"
// highlight-start
; Admin menu
COM_EXAMPLE_MENU="Landmarks"
// highlight-end
```

## Displaying the HTML Table

As in the display of a landmark on a site page, we use an MVC approach, 
so we define a Controller, View, Model and tmpl file.

### Controller

As we're displaying data in response to an HTTP GET request, this will be called DisplayController.

```php title="administrator/components/com_example/src/Controller/DisplayController.php"
<?php

namespace My\Component\Example\Administrator\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;

class DisplayController extends BaseController {

    public function display($cachable = false, $urlparams = array()) {
        return parent::display($cachable, $urlparams);
    }
}
``` 

