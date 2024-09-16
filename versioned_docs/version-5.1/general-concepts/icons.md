---
title: Icons
---

Icons
=====

Joomla uses free [FontAwesome](https://fontawesome.com/search) icons,
which are implemented as [CSS pseudo-elements](https://docs.fontawesome.com/v5/web/advanced/css-pseudo-elements)

The list of icons which are available can be found in media/templates/administrator/atum/css/vendor/fontawesome-free.css

The subset of FontAwesome icons which are used internally within Joomla are designated as "icon-something",
for example, "icon-file" is used to display a file icon.

To display such an icon you can use:

```php
?>
<span class="icon-cancel"></span> <?php echo Text::_('JCANCEL') ?> 
```

You can also display FontAwesome icons which aren't used in Joomla, but you have to include the "fa" class:

```php
?>
<span class="fa fa-bomb"></span> <?php echo Text::_('JSAVE') ?> 
```

