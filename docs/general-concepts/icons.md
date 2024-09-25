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

You can also display FontAwesome icons which aren't used in Joomla, but you have to include an additional CSS class.
In the past this has been "fa" and then after that "fas" or "fab", 
but according to [fa style names](https://docs.fontawesome.com/web/setup/upgrade/whats-changed#full-style-names)
the CSS classes should be "fa-solid" or "fa-brands":

```php
?>
<span class="fa-solid fa-bomb"></span> <?php echo Text::_('JSAVE') ?> 
<span class="fa-brands fa-facebook"></span> <?php echo 'facebook' ?> 
```
