---
sidebar_position: 3
title: Using Variables
---

Using Variables
===============

Sometimes it is required to use variables or specially formatted variables within translations. This usually happens
where numbers are involved but can occur for dates and times or when precise formatting instructions are required.
If the strings were not to be translated, the standard PHP functions printf and sprintf could be used. The printf
function outputs a string formatted using embedded formatting instructions. The sprintf function returns a string
formatted using the same embedded formatting instructions.

Joomla's `Text` class provides wrapper methods for the printf and sprintf functions allowing static text to be
translated
while also allowing formatted fields to be embedded using the same syntax as the PHP functions.
By using `Text::sprintf`, the placeholder **%s** can be used for a variable string within a translation.
You can use the following placeholders:

- **%b** The argument is treated as an integer and presented as a binary number.
- **%c** The argument is treated as an integer and presented as the character with that ASCII value.
- **%d** The argument is treated as an integer and presented as a signed decimal number.
- **%e** The argument is treated as scientific notation (e.g. 1.2e+2).
- **%u** The argument is treated as an integer and presented as an unsigned decimal number.
- **%f** The argument is treated as a float and presented as a floating-point number (locale aware).
- **%F** The argument is treated as a float and presented as a floating-point number (non-locale aware).
- **%o** The argument is treated as an integer and presented as an octal number.
- **%s** The argument is treated and presented as a string.
- **%x** The argument is treated as an integer and presented as a hexadecimal number (with lowercase letters).
- **%X** The argument is treated as an integer and presented as a hexadecimal number (with uppercase letters).

:::note
the list above gives a brief overview of the different placeholder value types further details can be found in the
[Syntax of Format Specifiers](#syntax-of-format-specifiers) section.
:::

## Single Variable

```ini title="Language Strings containing Placeholder for variable"
COM_EXAMPLE_MY_STRING = "The value of my transferred variable is %s and is included like this."
```

```php title="Calling the translation and transferring a variable"
...
echo Text::sprintf("COM_EXAMPLE_MY_STRING", $someVariable)
...
```

Another (practical) example can be found in the contact component:

```ini title="COM_CONTACT Language File"
COM_CONTACT_CHECKED_OUT_BY = "Checked out by %s"
```

In the PHP code, the call looks like this:

```php title="Calling the translation and transferring the user's name"
...
echo Text::sprintf("COM_CONTACT_CHECKED_OUT_BY", $checkoutUser->name)
...
```

## Multiple Variables

Several variables can also be transferred to a language string; these are then placed one after the other at the
locations defined in the language string. The order of transfer is relevant here and cannot been changed.

```ini title="MOD_EXAMPLE Language File"
MOD_EXAMPLE_MULTIVAR_STRING = "This string contains three placeholders: %s, %s, %s << They are placed in order"
```

```php title="mod_example Template File"
$a = "First String";
$b = "Second String";
$c = "Third String";
echo Text::sprintf('MOD_EXAMPLE_MULTIVAR_STRING', $a, $b, $c);
```

```TXT title="Translated String"
This string contains three placeholders: First String, Second String, Third String << They are placed in order 
```

If the positions of `$a` , `$b`, `$c` in the php file are swapped in the call, the placement within the translated
language string also changes.

### Define Placement of Variables within Translation

The sentence structure often changes depending on the language, so the English text **There are 7 balls in the hat**
can have a completely different sentence structure in other languages, even if the sentence structure is adapted in
English the variables have to be swapped, this would have to be done in the code when the call is made.
Joomla! offers a more elegant solution for this.

:::note
To better demonstrate the swapping of variables in language strings, **%s** has been used here. It is recommended to
use **%d** for integers.
:::

```php title="mod_example template file"
$number = 7;
$location = "hat";
echo Text::sprintf('MOD_EXAMPLE_BALLS_IN_THE_BUCKET_MSG', $location, $number);
```

```ini title="Translation using variables"
MOD_EXAMPLE_BALLS_IN_THE_BUCKET_MSG = "There are %s balls in the %s."
```

```txt title="Translated String"
There are 7 balls in the hat.
```

But if the translation is adjusted and should look like this instead, the variables are not set correctly:

```ini title="New Translation string results in wrong placement of variables"
MOD_EXAMPLE_BALLS_IN_THE_BUCKET_MSG = "The %s contains %s balls."
```

```txt title="Translated String with wrong placed variables"
The 7 contains hat balls.
```

This clearly nonsense. Rather than change the code, you can indicate in the translation string which argument each of
the placeholders refer to. Change the translation to:

```ini title="New Translation String using placement Indicators"
MOD_EXAMPLE_BALLS_IN_THE_BUCKET_MSG = "The %2$s contains %1$s balls."
```

```txt title="Translated String with correct placed variables"
The hat contains 7 balls.
```

An additional added value of this method is that variables can also be used multiple times in a string without having
to specify them multiple times in the call:

```ini title="New Translation String using placement Indicators multiple times"
MOD_EXAMPLE_BALLS_IN_THE_BUCKET_MSG = "The %2$s contains %1$s balls, so there are %1$s balls in the %2$s."
```

```txt title="Translated String using variables multiple times"
The hat contains 7 balls, so there are 7 balls in the hat.
```