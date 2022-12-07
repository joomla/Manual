Hide Table Columns
=======================



# User-defined Hide Table Columns
All the core components have a button that lets the user decide which columns of a table to display.

## Adding Hide Table Columns to your component
Adding this functionality to your own component is very simple and is usually a simple case of adding the code below to the `tmpl` file for the table.

### Check if you are you using WebAssetManager
Look for this line of code in the php block at the top of your `tmpl` file.
```
$wa = $this->document->getWebAssetManager();
```

### Already using WebAssetManager
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

### Not using WebAssetManager (yet)
Add the following code anywhere in the php block at the top of your `tmpl` file.

```
/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = $this->document->getWebAssetManager();
$wa->useScript('table.columns');
```

### Note
Your table will need to be a valid html table with a `<thead>` and each column a `<th>`.
