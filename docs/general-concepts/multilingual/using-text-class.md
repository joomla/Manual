---
sidebar_position: 1
title: Using Text Class
---

Using Text Class
================

To translate strings within your code, use the `Text` handling class from Joomla.
The Text class contains six static main methods and one auxiliary method that can be used:

:::note
The key you pass to the ``Text::`` method must match a key defined in the corresponding language file or language
override.
:::

```ìni
MOD_EXAMPLE_HELLO="Hello"
MOD_EXAMPLE_GOODBYE="Goodbye"
```

## Using `Text::_`

Searches for the defined language string in the current language file and outputs it.

```php
use Joomla\CMS\Language\Text;

// Usage in PHP code
echo Text::_("MOD_EXAMPLE_HELLO");  // Outputs: Hello

echo Text::_("MOD_EXAMPLE_GOODBYE");  // Outputs: Goodbye
```

#### Using `Text::alt`

Searches for the defined language string in the current language and outputs it. The `$alt` option defines where
the translation has to be taken from.

```ìni title="Global"
JALL="All"
```

```ìni title="Module Language File"
JALL="All together"
```

```php
echo Text::alt('JALL', 'language'); // will generate a 'All' string in English but a "Toutes" string in French
echo Text::alt('JALL', 'module');   // will generate a 'All' string in English but a "Tous" string in French
```

:::info
By default, Joomla! always uses the language file supplied with the extension. It is then also possible to overwrite
global language constants in this file. However, if the global constant is to be used at a certain point in the
extension instead of the overwritten constant and its value, this can be achieved using the Text::alt method.
:::


- Text::alt
- Text::plural
- Text::sprintf
- Text::printf
- Text::script
- Text::getScriptStrings

