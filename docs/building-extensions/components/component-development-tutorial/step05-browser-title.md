---
sidebar_position: 5
title: Step 5 Setting the Browser Title
---

## Introduction

In this step we set the browser title - the text which appears in the tab of a browser.
It's fairly basic functionality, but this step introduces the Document class, which is one of the key classes within Joomla.

We set the browser title on the site front-end only, and set it to the name of the landmark being displayed on that page.

## Learning Points

Joomla Document class

## Approach

The browser title is set by the Document [setTitle method](cms-api://classes/Joomla-CMS-Document-Document.html#method_setTitle).

To get the Document instance we use the Application [getDocument method](cms-api://classes/Joomla-CMS-Application-WebApplication.html#method_getDocument).

The Application object is passed as a parameter to the Controller constructor, 
where it is stored (within BaseController) as an instance variable `$this->app`.

## Site Controller 

The updated display method of the Controller is:

```php title="components/com_example/src/Controller/DisplayController.php"
    public function display($cachable = false, $urlparams = array())
    {
        $view = $this->getView('landmark', 'html');
        $model = $this->getModel('landmark');
        $view->setModel($model, true);
      // highlight-start
        $document = $this->app->getDocument();
        $view->setDocument($document);
      // highlight-end
        $view->display();
    }
```

The Document object reflects the core of what will be output as HTML in the HTTP response.
Various pieces of code can set properties of this object,
and then these are reflected in the HTML generated. 

## View

The updated display method of the View is:

```php title="components/com_example/src/View/Landmark/HtmlView.php"
    function display($tpl = null)
    {
        $this->data = $this->getModel()->getItem();
        parent::display($tpl);
      // highlight-start
        $document = $this->getDocument();
        $document->setTitle($this->data);
      // highlight-end
    }
```

The line `parent::display($tpl)` creates content for the HTML `<body>` section,
but comes before the `$document->setTitle($this->data)` which sets data to be output in the HTML `<head>`.
However, this isn't a problem because the content is buffered within the Document object,
until the Document object is used to generate the HTML output.

## Installation

Update the version in the manifest file and then install the updated component.

```xml title="com_example/example.xml"
<version>0.5.0</version>
```

When you navigate to a page displaying a landmark, then you should see the landmark title as browser title.

## Challenge

If you look at the methods of the base HtmlView class you can see [setDocumentTitle](cms-api://classes/Joomla-CMS-MVC-View-HtmlView.html#method_setDocumentTitle).
Change the View code to use this method instead. 

This method takes account of the setting in Global Configuration / Site tab, Site Name in Page Titles (in SEO section).
Change this setting, and verify that the browser title displayed matches the Global Config setting.