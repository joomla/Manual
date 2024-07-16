Multilingual
=======================

## Using Language Overrides from the Backend

Letting Content Editors edit translations in Joomla is easy.

```php
use Joomla\CMS\Language\Text;
```

To translate strings to a specific language that you installed, use the Text handling class from Joomla. 

When you want to use the string inside your code, do this:

```php
<?php echo Text::_("NAME_OF_YOUR_CONSTANT"); ?>
```

### Creating Language Overrides

You can create these constants inside the backend in `System > Language Overrides`. Choose `Site` for text displayed in the Front End, and `Administrator` for strings inside the backend.
