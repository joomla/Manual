---
sidebar_position: 3
title: Plural
---

Plural
======

Joomla language strings support singular & plural. The following example demonstrates the usage of the `Text::plural`
call where `$ids` is an array of element id's:

```php title="mod_example Template File Plural example"
echo Text::plural('MOD_EXAMPLE_N_ITEMS_FOUND', count($ids));
```

```ini title="MOD_EXAMPLE Language File"
MOD_EXAMPLE_N_ITEMS_FOUND="%d items found."
MOD_EXAMPLE_N_ITEMS_FOUND_0="No items found."
MOD_EXAMPLE_N_ITEMS_FOUND_1="Only one item found."
MOD_EXAMPLE_N_ITEMS_FOUND_2="Two items found."
```

If the array `$ids` contains only one element, the language string for `MOD_EXAMPLE_N_ITEMS_FOUND_1` is output, if
there are two `MOD_EXAMPLE_N_ITEMS_FOUND_2` or `MOD_EXAMPLE_N_ITEMS_FOUND` for three or more elements.

:::info
The `plural` method takes care of using the most appropriate translation constant (taking into account the effective 
number and the defined constants including suffix in the language file such as "_1, _2, ... , _MORE, _OTHER"), if no 
pluralisation is found in the language constants, Joomla! will use the "base" constant which is defined when calling 
the function.
:::

## The Constants More & Other

In addition to the named sets, the plural method can also be used with the keywords `MORE` or `OTHER`, whereby `OTHER` 
is primarily used by the plural method if both are defined:

Given are the following translation strings:

```ini title="MOD_EXAMPLE Language File"
MOD_EXAMPLE_N_APPLES_MSG="Apples"
MOD_EXAMPLE_N_APPLES_MSG_5="There are exactly five apples"
MOD_EXAMPLE_N_APPLES_MSG_MORE="There are %d apples."
MOD_EXAMPLE_N_APPLES_MSG_OTHER="There are a lot of apples."
```

If the method is now called with a value greater than 5:

```php title="Calling the Text::plural Method"
$n = 6;
echo Text::plural("MOD_EXAMPLE_N_APPLES_MSG", $n);
```

```plaintext title="Result if $n is greater than 5"
There are a lot of apples.
```

Joomla! is using the translation with the `OTHER` constant. It makes no difference whether the translation is defined 
with the constant `MORE` in the language file before or after `MOD_EXAMPLE_N_APPLES_MSG_OTHER` will be preferred if 
defined. 

The same applies if `$n` has a value smaller than the defined values. Even if `$n` has a value of **3** in 
this example, the translation `MOD_EXAMPLE_N_APPLES_MSG_OTHER` from Joomla! will still be used. However, when the 
translation with the constant `OTHER` is removed from the language file, Joomla! will then use the translation with 
the language constant `MORE` to display translations in plural for a not exactly defined quantity.

```ini title="MOD_EXAMPLE Language File without OTHER Definition"
MOD_EXAMPLE_N_APPLES_MSG="Apples"
MOD_EXAMPLE_N_APPLES_MSG_5="There are exactly five apples"
MOD_EXAMPLE_N_APPLES_MSG_MORE="There are %d apples."
```

```php title="Calling the Text::plural Method with MORE Constant"
$n = 3;
echo Text::plural("MOD_EXAMPLE_N_APPLES_MSG", $n);
```

```plaintext title="Result if $n is smaller than 5"
There are 3 apples.
```
