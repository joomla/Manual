---
title: Icons
---

Standard Joomla! Icons 
=====

## Overview
Joomla uses the free [FontAwesome](https://fontawesome.com/search) icons,
which are implemented as [CSS pseudo-elements](https://docs.fontawesome.com/web/add-icons/pseudo-elements)

Joomla implemented the free standard icons, brand icons and supports a subset "icon-..." to be compatible with J!3x and following versions

The source list of available icons can be found in joomla file ```media/templates/administrator/atum/css/vendor/fontawesome-free.css```. A visible representation of all icons with additional information see our [guide.joomla.org](https://guide.joomla.org/user-manual/templates/standard-icons?highlight=WyJpY29ucyJd)

## Fontawesome icons
Fontawesome icons can be used for HTML in following forms:

```php
<i style="font-size: 2rem;" class="fa fa-!name!"></i>
<span class="fa fa-!name! "></span>
```

The actual icon name fa-!name! class is accompanied by a prefix class like "fa ..". More below or see [FontAwesome 'classic' styles](https://docs.fontawesome.com/web/dig-deeper/styles)  
The \<span\> element can also do the job but the preferred way is to use classes inside the \<i\> element.

Add attribute ```aria-hidden="true"``` for hiding the icon from screen readers and improves accessibility. Use attribute ```style="font-size: 2rem;"``` or ```style="font-size: 48px;"``` for the size of the icon font.

### Standard icons

The Prefix part is ```fa``` which is short for ```fas``` which is short for ```fa-solid``` which can be used instead.

The icon name part begins with ```fa-``` and the name. Example: 
```php
<i class="fa fa-envelope"></i>
<i class="fa-solid fa-save" aria-hidden="true"></i> <?php echo Text::_('JSAVE') ?> 
```

### Brand icons

The prefix part is ```fab``` which is short for ```fa-brands``` which can be used instead

Example: 
```php
<i class="fab fa-joomla"></i>
<i class="fa-brands fa-facebook" aria-hidden="true"></i> <?php echo 'Facebook' ?> 
```

## Icomoon replacement form / 'icon' parameter in code function calls

For this set of icons icon names from J3! (icomoon) were replaced (partly) by fontawesome icons. The icon itself is one of the fontawesome icons but the name may differ. Also this is a smaller subset with less icons. It is kept for compatibility with J!3 icomoon replacements. In joomla code there are functions which accept the icon name as parameter.

### Direct Html use

The class gets prefix "icon-" (e.g., "icon-calendar", "icon-file", etc.)

Form: ```<i class="icon-name"></i>```. The name has to be exchanged for icon name. 
Add attribute aria-hidden="true" for hiding the icon from screen readers and improves accessibility. 

Example: 
```php
<i class="icon-joomla" style="font-size: 48px;" ></i>
<i class="icon-joomla"  aria-hidden="true" style="font-size: 48px;" ></i>
```

### Parameter in J! functions

For example in HtmlView.php of a component the ToolBarHelper:: functions accept a icon name from this icon set.

Example: 
```php
ToolBarHelper::title(Text::_('COM_EXAMPLE_TITLE'), 'envelope');
```

:::tip
Instead of using an 'icon' name of the icon class (see above) a fontawesome icon may be used instead in following form. It is helpful when the required symbol is not available — or looks better.
```php
ToolBarHelper::title(Text::_('COM_EXAMPLE_TITLE'), 'none fa fa-camera-retro');
```
With 'none' given internally a 'icon-none' will be written into the HTML class and ' fa fa-camera-retro' will follow. 
Attention: This could affect subsequent button icons whose CSS formatting is then redefined.
:::

## Using other icon sets

In case you want to display other icons not included in the Joomla pack, you have several options, one of which is to use additional FontAwesome icons.
This can be achieved in different ways depending on your needs:
1. Using FontAwesome Kit - this is the easiest approach, but you should have an account on their site.
2. Using self-hosted webfonts and additional CSS files from FontAwesome.
3. Using self-hosted SVG and JS files - for a few icons, this way you will have some speed optimization.
