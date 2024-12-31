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
MOD_EXAMPLE_N_ITEMS_FOUND_1="Only one item found."
MOD_EXAMPLE_N_ITEMS_FOUND_2="Two items found."
```

If the array `$ids` contains only one element, the language string for `MOD_EXAMPLE_N_ITEMS_FOUND_1` is output, if
there are two `MOD_EXAMPLE_N_ITEMS_FOUND_2` or `MOD_EXAMPLE_N_ITEMS_FOUND` for three or more elements.