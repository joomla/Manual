---
sidebar_position: 5
title: Format Specifiers
---

Format Specifiers
=================

## List of Format Specifiers

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

## Syntax of Directives

| Order | 1.       | 2.   | 3.        | 4.      | 5.    | 6.        |
|-------|----------|------|-----------|---------|-------|-----------|
| **%** | Position | Sign | Alignment | Padding | Width | Precision |

### Sign

- Possible Values: `+`

Forces a sign (+ or -) to be used on a number. By default, only the – sign is used on a number if it's negative.
This specifier forces positive numbers to have the + sign attached as well.

```ìni title="Using the '+' Sign"
MOD_EXAMPLE_POSITIVE_NEGATIVE_NUMBER="This number %+d has prefixed whether it is positive or negative."
```

```php
$positive_num = 42;
$negative_num = -12;

echo Text::sprintf("MOD_EXAMPLE_POSITIVE_NEGATIVE_NUMBER", $positive_num);
echo Text::sprintf("MOD_EXAMPLE_POSITIVE_NEGATIVE_NUMBER", $negative_num);
```

```plaintext title="Result including forced sign display for positive and negative numbers"
This number +42 has prefixed whether it is positive or negative.
This number -12 has prefixed whether it is positive or negative. 
```

### Alignment

- Possible Values: `<null>` or `-`

Determines if the result should be left-justified or right-justified. The default is right-justified; a - character
here will make it left-justified.

:::info
A plus sign ('+') means put a '+' before positive numbers (see above) while a minus sign ('-') means left justify. 
Both can be used together if required.
:::

```ìni title="Using the '-' Sign to left-justify"
MOD_EXAMPLE_RIGHT_JUSTIFY="|%+6d|%+6d|"
MOD_EXAMPLE_LEFT_JUSTIFY="|%-6d|%-6d|"
MOD_EXAMPLE_FORCE_POSITIVE_LEFT_JUSTIFY="|%+-6d|%+-6d|"
```
*Note: The Number **6** used in the example above refers to the Padding size of 6 characters. See [Padding](#padding) 
for more information.*

```php
<pre>
    <?php echo Text::sprintf("MOD_EXAMPLE_RIGHT_JUSTIFY", 42, -42); ?> <br>
    <?php echo Text::sprintf("MOD_EXAMPLE_LEFT_JUSTIFY", 42, -42); ?> <br>
    <?php echo Text::sprintf("MOD_EXAMPLE_FORCE_POSITIVE_LEFT_JUSTIFY", 42, -42); ?>
</pre>
```

```plaintext title="Result"
|   +42|   -42| 
|42    |-42   | 
|+42   |-42   |
```

:::note
The example is encapsulated by a `<pre>` tag so that the browser does not replace the multiple spaces by a single one. 
Alternatively, the CSS instruction `white-space: pre-wrap` can be used so that the whitespaces are not removed by 
the browser.
:::

### Padding

- Possible Values: `<space>` or `0` or `'<char>`

Character to be used for padding the results to the correct string size. May be a space character or a 0 (zero
character). The default is to pad with spaces. An alternative padding character can be specified by prefixing it with a
single quote character.

```ini title="Using Padding"
MOD_EXAMPLE_PADDING_MSG = "The number including Padding is: %'.9d"
```

```plaintext title="When the number 500 is given and a dot is used as char"
The number including Padding is: ......500 
```

Here we load the number twice by using the position directive too:

```ini title="Using Padding once"
MOD_EXAMPLE_PADDING_MSG = "The number %1$d including Padding is: %1$':9d"
```

```plaintext title="When the number 500 is given and a colon is used as char"
 The number 500 including Padding is: ::::::500  
```

#### Using Spaces

By default, `<space>` is used for padding. If no `0` or character is specified as shown above, spaces are inserted:

```ini title="Using space Padding"
MOD_EXAMPLE_PADDING_MSG = "The number including Padding is: %9d"
```

For example, when using the number 500, six spaces should be displayed before the number. Most browsers will not
display these *superfluous* spaces and will replace it by a single space. To solve that a bit CSS-Magic is required
here:

```css title="CSS to render multiple whitespaces"
.padding-support {
    white-space: pre-wrap;
}
```

```php title="Encapsulating the Translation to render multiple whitespaces"
$num = 500;
echo '<span class="padding-support">' . Text::sprintf("MOD_EXAMPLE_PADDING_MSG", $num) . '</span>';
```

```paintext title="Rendered with multiple whitespaces"
The number including Padding is:       500
```

:::warning
The c Type specifier ignores padding & width.
:::

### Width

- Possible Values: `<Number>`

Number of characters (minimum) that the conversion should result in. If the field width is specified in a placeholder 
of `sprintf`, the generated output is filled to the specified minimum width.

```ini title="Setting width to 10 characters"
MOD_EXAMPLE_WIDTH_MSG="[%10s]"
```

```php
<pre>
    <?php echo Text::sprintf("MOD_EXAMPLE_WIDTH_MSG", "Example"); ?>
</pre>
```

```plaintext title="Result"
[   Example]
```

Width can be combined with the [Alignment Flag](#alignment):

```ini title="Setting width to 10 characters and align left justified"
MOD_EXAMPLE_WIDTH_MSG="[%-10s]"
```

```plaintext title="Result left-justified"
[Example   ]
```


:::warning
The c Type specifier ignores padding & width.
:::

### Precision

- Possible Values: `.<Number>`

Number of decimal digits that should be displayed for floating-point numbers. When using this specifier on a string,
it acts as a cutoff point, setting a maximum character limit for the string.

```ìni text="Example Language File"
MOD_EXAMPLE_PI_MSG="The number PI is: %.4f"
```

```php text="Example Translation implementation using precisision"
$pi = 3.1415926536
echo Text::sprintf("MOD_EXAMPLE_PI_MSG", $pi)
```

```txt text="Result"
The number PI is: 3.1416
```

## External Sources

- [PHP Documentation sprintf](https://www.php.net/manual/en/function.sprintf.php)