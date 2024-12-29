---
sidebar_position: 9
title: Language Files
---

This section describes the use of language files for extensions. Joomla! language definition files are written in the
very basic [INI file format](https://en.wikipedia.org/wiki/INI_file). They must be saved using the **UTF-8 encoding**.
Blank lines and lines beginning with a
semicolon (;) are ignored and the latter may be used to add comments to the file. Each line consists of a key-value pair
separated by an equals sign:

```ini
KEY="value"
```

where `KEY` is a string to be translated and `value` is the translated string. For example:

```ini
COM_EXAMPLE_ADDITIONAL_INFO_LABEL="Additional Information"
```

## Conventions & Specifications for Language Keys

The `KEY` should only use **ASCII characters**. It should only contain capital letters, digits, underscores and hyphens,
and it should start with a capital letter. Dots (.) are formally allowed, <ins>but do not appear to be completely
supported</ins>. It is a convention to replace any whitespace in the language string (`KEY`) with underscores.
Another specification is to avoid spaces around the equal operator (=) between the `KEY` and the `value`.

Language Keys should always be unique. To ensure this, something like the following structure should be used for
language keys:
1. Extension Type => COM (Components) / MOD (Modules) / PLG (Plugins)
2. Extension Name / Shortcode => EXAMPLE (Example Extension Name)
3. Element Identification (Field, Button, Header, ...)
4. Type of Element (Label / Description / ...)

So if we have a `Key` for our `Field Label` & `Field Description` which selects the `Font-Color` in our `Example Component` we should define
the Language Keys like this:
```ini
COM_EXAMPLE_FONT_COLOR_FIELD_LABEL="Font-Color"
COM_EXAMPLE_FONT_COLOR_FIELD_DESCRIPTION="Select the Font-Color for xy"
```
And for a Button Label in a `My News Module` the Language Key could be named like this:
```ini
MOD_MYNEWS_LEARN_MORE_BTN_LABEL="Learn more"
```
:::note
It is recommended and good practice to use your MOD_XY, COM_XY or PLG_XY as Prefix for language keys
:::

## Case Sensitivity when using with Text::

When you use the key in a Text:: call, the case does not matter as strings are folded to upper case before searching
takes place. So `additional_information`, `Additional_Information` or even `AdDiTiOnAl_InFoRmAtIoN` will be matched. 
Nevertheless, it is a convention and also considered good practice to write the key in capital letters within the PHP or JavaScript code.

## Conventions & Specifications for Language Values

The `Value` should always be surrounded by double-quote characters ("), as in the example. Every double-quote character
in the value string has to be escaped by using a Backslash (` \ `). For example, to attach the value
`<span class="red">Warning!</span>` to the key WARNING_TEXT, it can be written like this:
```ini title="Language Strings containing HTML Tags with escaped double Quotes"
WARNING_TEXT="<span class=\"red\">Warning!</span>"
```
or with single quotes:
```ini title="Language Strings containing HTML Tags with single Quotes"
WARNING_TEXT="<span class='red'>Warning!</span>"
```

:::note
These rules are stricter than required by the [PHP INI parser](https://www.php.net/manual/en/function.parse-ini-file.php).
For example, the PHP INI parser allows you to omit the
double quotes around the value as long as it does not contain certain characters. Using the rules above should make it
much easier to avoid mistakes such as forgetting double quotes when they are required.
:::

### HTML in Language Values

It is not recommended to use HTML in the translations. HTML Syntax should be placed outside the language strings in the
appropriate place:
```ini title="Language File"
WARNING_TEXT="Warning!"
```
```php title="PHP Template File (where the language string will be used)"
<span class="red"><?php echo Text::_("WARNING_TEXT"); ?></span>
```

## Errors in Language Files

If there is an error in a language file, the file is not parsed correctly and
individual translations are missing. It is then helpful to examine the corresponding language file with a code editor
with syntax highlighting that can process the INI file.
### Unescaped Double-Quotes in the Value String
The most common error in language files for Joomla! occurs when a value is not encapsulated by double quotes or when
there are unescaped double quotes within the value.
```ini title="Language File Error with unescaped double-quotes"
MOD_EXAMPLE_WORKING_HEADING="My Heading"
MOD_EXAMPLE_UNESCAPED_ERROR_MSG="<span class=\"error">Oh no an Error</span>"
MOD_EXAMPLE_NOT_WORKING_SUCCESS_MSG="Success!"
```

### Missing Double-Quotes at the end of a Value String

Another common mistake is "forgetting" a double quote at the end of a translation string, as here in line 2:
```ini title="Language File Error with missing double-quote on line 2"
MOD_EXAMPLE_WORKING_HEADING="My Heading"
MOD_EXAMPLE_UNESCAPED_ERROR_MSG="<span class=\"error\">Oh no an Error</span>
MOD_EXAMPLE_NOT_WORKING_SUCCESS_MSG="Success!"
```

### Multi-Line Values

As mentioned above Multiline values are not valid - a correct key="value" pair is only valid if it is single-line.
```ini title="Language File Error using Multi-Line"
MOD_EXAMPLE_WORKING_HEADING="My Heading"
MOD_EXAMPLE_UNESCAPED_ERROR_MSG="<div class=\"error\">
<span>This will not work</span>
</div>"
MOD_EXAMPLE_NOT_WORKING_SUCCESS_MSG="Success!"
```

### Invalid Language Keys

If the language key (constant) does not correspond to the specifications, the key cannot be used:
```ini title="Language File Error with invalid language key on line 2"
MOD_EXAMPLE_WORKING_HEADING="My Heading"
MOD_EXAMPLE WHITESPACE_ERROR_MSG="This will not be translated"
MOD_EXAMPLE_WORKING_SUCCESS_MSG="Success!"
```

## Updating Language Files while Developing an Extension

Joomla! places the language files in the corresponding folder for language files when installing an extension and
searches there for the translations for the respective language. If changes are made to language files, the extension
must be installed again or the language file must be placed manually in the corresponding folder.

### Language Tags

If language files are written for an extension, these must be stored in a corresponding subfolder (with a language tag) in the extension. 
Joomla! then moves the files to the correct directories while the extension gets installed / updated.

The folder structure is `languages` / `[languageTag]`/ `*.ini` where the the language tags such as **"en-GB"**, 
**"de-CH"**, and **"de-AT"** are based on the [**ISO 639-1**](https://en.wikipedia.org/wiki/ISO_639-1) and 
[**ISO 3166-1**](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes. These represent a combination 
of a language and a regional or national variant. In Joomla! these language tags are used as subfolders in the languages folders. 

These tags consist of two parts:
- The first part is the language code from the ISO 639-1 standard, which denotes the language. Examples:
 - `en` for English
 - `de` for German
 - `...`
- The second part is the country code from the ISO 3166-1 Alpha-2 standard, defining the country or region
  to distinguish specific dialects or regional settings. Examples:
  - `GB` for the United Kingdom
  - `US` for the United States
  - `CH` for Switzerland
  - `AT` for Austria
 

### Placement of Language Files

Language files for the Joomla! front and back end are stored in different locations:

| What     | Where                                     |
| -------- | ----------------------------------------- |
| Frontend | /languages/en-GB/mod_xy.ini               |
| Backend  | /administrator/languages/en-GB/mod_xy.ini |

