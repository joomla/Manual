Hide Table Columns
==================

## User-defined Hide Table Columns
All the core components have a button that lets the user decide which columns of a table to display.

### Adding Hide Table Columns to your component
Adding this functionality to your own component is very simple and is usually a simple case of adding the code below to the `tmpl` file for the table.

#### Check if you are you using WebAssetManager
Look for this line of code in the php block at the top of your `tmpl` file.
```
$wa = $this->document->getWebAssetManager();
```

#### Already using WebAssetManager
Add the following line to your existing code.

```
useScript('table.columns')
```

Note the line ending. Your final code will look similar to this example

```
/** @var \Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = $this->document->getWebAssetManager();
$wa->useScript('table.columns')
    ->useScript('multiselect');
```

#### Not using WebAssetManager (yet)
Add the following code anywhere in the php block at the top of your `tmpl` file.

```
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = $this->document->getWebAssetManager();
$wa->useScript('table.columns');
```

#### Notes
Your table will need to be a valid html table with a `<thead>` and each column a `<th>`.

Your table can not include `<tfoot>` or `<colgroup>` or `<colspan>` elements. These will cause the table to display empty columns at the end of the row and will break any classes or styles applied in the `<colgroup>`. ([Tracking Issue](https://github.com/joomla/joomla-cms/issues/43564))

If you have multiple tables on the page and you want to prevent the script loading on one of those tables then you can add the class "columns-order-ignore" to the table.

