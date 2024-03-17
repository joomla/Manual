Custom Error Pages
==================
As of Joomla 5.0 the default Cassiopeia template can now be customised to support custom 404 and 403 pages.

There are two new module positions available (error-403 and error-404) which will add content to the error.php file of the template to replace the default message depending on it being a 403 (forbidden) or 404 (not found) error.

The existing error page text is displayed if there is no module and if debug is enabled then the debug information is still displayed below the module.


### Default 404 error page

![Screenshot of the standard 404 error page](./custom-errorpages/_assets/original404.png)


### Example custom 404 error pages

![Screenshot of custom 404 error page with images and buttons](./custom-errorpages/_assets/example404.png)

![Screenshot of funny custom 404 error page](./custom-errorpages/_assets/example404-2.png)


## Adding a custom error page to your template
This functionality can be added to your own template error.php file by using the code below to get the error code and then display any module in that module position.

```php
<?php $errorCode = $this->error->getCode(); ?>
```

```php
<?php if ($this->countModules('error-' . $errorCode)) : ?>
    <div class="container">
        <jdoc:include type="modules" name="error-<?php echo $errorCode; ?>" style="none" />
    </div>
<?php else : ?>
```

_This is the minimum code required but you will probably want to customise it further._