---
title: Icons
---

Icons
=====

Joomla uses free [FontAwesome](https://fontawesome.com/search) icons,
which are implemented as [CSS pseudo-elements](https://docs.fontawesome.com/web/add-icons/pseudo-elements)

The list of available icons can be found in media/templates/administrator/atum/css/vendor/fontawesome-free.css

The subset of FontAwesome icons used internally within Joomla is designated with the prefix "icon-" (e.g., "icon-calendar", "icon-file", etc.)
This is a remnant of the old coding style of FontAwesome; its latest versions use the "fa-" prefix, but Joomla is keeping the old prefix for backward compatibility.

To display such an icon, you can use:

```
    <span class="icon-cancel" aria-hidden="true"></span> <?php echo Text::_('JCANCEL') ?> 
```
The attribute aria-hidden="true" hides the icon from screen readers and improves accessibility. 

In case you want to display other icons not included in the Joomla pack, you have several options, one of which is to use additional FontAwesome icons.
This can be achieved in different ways depending on your needs:
1. Using FontAwesome Kit - this is the easiest approach, but you should have an account on their site.
2. Using self-hosted webfonts and additional CSS files from FontAwesome;
3. Using self-hosted SVG and JS files - for a few icons, this way you will have some speed optimization.


According to [How To Add Icons](https://docs.fontawesome.com/web/add-icons/how-to), the CSS classes are prefixed "fa-" as "fa-solid" or "fa-brands".
The preferred way is to use classes inside the `<i>` element:
```
    <i class="fa-solid fa-calendar" aria-hidden="true"></i>
```
But the span element can also do the job:
```
    <span class="fa-solid fa-bomb" aria-hidden="true"></span> <?php echo Text::_('JSAVE') ?> 
    <span class="fa-brands fa-facebook" aria-hidden="true"></span> <?php echo 'Facebook' ?> 
```
