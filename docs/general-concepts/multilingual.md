Multilingual
=======================

Joomla provides robust support for multiple languages, allowing developers to create extensions that can be easily translated and used in different languages.

## How Joomla Supports Multiple Languages

Joomla differentiates between **installed languages** (languages that the Joomla core or extensions are translated into) and **content languages** (languages that site content can be written in).

This distinction helps in managing translations more effectively.

### Language Constants

To handle translations, Joomla uses **language constants**. These constants are defined in language files (`.ini` and `.sys.ini`) and are used throughout the codebase.

By using **constants**, you can ensure that your extensions are easily translatable.

### Language Files

**Language files** are simple text files that map language constants to their translations. There are two main types of language files:
- `.ini` files: Used for **regular translations.**
- `.sys.ini` files: Used for **installation and system messages as well as wherever the extension in the backend appears (e.g. the installed extension list).**

Here’s an example of a language file (`mod_example.ini`):
```ini
MOD_EXAMPLE_HELLO="Hello"
MOD_EXAMPLE_GOODBYE="Goodbye"
```

Place it in the `language/en-GB` directory of your extension.


## Implementing Multilingual Support in Your Extension

### Where Language Files Are Stored

Language files in Joomla are stored as `.ini` files and are placed in specific directories depending on the type of extension:

- **Components:** `language/en-GB/com_example.ini`
- **Modules:** `language/en-GB/mod_example.ini`
- **Plugins:** `language/en-GB/plg_example.ini`
- **Templates:** `language/en-GB/tpl_example.ini`

#### Language Root Directories

Language files can be stored in either of the following root directories:

- **Frontend:** `/language`
- **Administrator (Backend):** `/administrator/language`

#### When to Use Each Directory

- **Use `/language`:** For language files associated with the frontend of your site (e.g., components, modules, or templates that affect what visitors see).
- **Use `/administrator/language`:** For language files associated with the backend or administrator interface of your site (e.g., administrative components, modules, or plugins that are only used by administrators).

By placing language files in the correct directory, Joomla can properly load the language strings depending on whether the extension is used on the frontend or backend.

### Using the `Text` Class

To translate strings within your code, use the `Text` handling class from Joomla.

```php
use Joomla\CMS\Language\Text;

// Usage in PHP code
echo Text::_("MOD_EXAMPLE_HELLO");  // Outputs: Hello

echo Text::_("MOD_EXAMPLE_GOODBYE");  // Outputs: Goodbye
```

The key you pass to the ``Text::_`` method must match a key defined in the corresponding language file or language override.
### Language Files in Components

:::info
Since Joomla Version 4 and 5, you no longer need to include the language prefix (like `en-GB.`) in the language file names.
:::

Language files for components should be organized as follows:

```plaintext
components
    com_example
        language
            en-GB
                com_example.ini          // Site language strings (for the frontend)
                com_example.sys.ini      // System language strings (for the backend/administrator)
```

### Language Files in Modules

```plaintext
modules
    mod_example
        language
            en-GB
                mod_example.ini          // Site language strings (for the frontend)
                mod_example.sys.ini      // System language strings (for the backend/administrator)
```

### Including Language Files in the Manifest

To ensure your extension's language files are recognized, include them in the **extension's manifest file**.

```xml
<languages>
    <language tag="en-GB">language/en-GB/mod_example.ini</language>
    <language tag="en-GB">language/en-GB/mod_example.sys.ini</language>
</languages>
```

For more details on the manifest file, refer to the [Joomla documentation](https://manual.joomla.org/docs/building-extensions/modules/module-development-tutorial/step4-languages/).

### Database Schema

For components, ensure to include a 'language' column in your database tables to store the language code of the content.

Doing so allows you to filter content based on the language.

```sql
CREATE TABLE `#__example` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `language` CHAR(7) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

This column should be populated with the language code (e.g., `en-GB`, `fr-FR`, or `*` for all languages) when saving content.

## Debugging Multilingual Issues

Joomla offers robust debugging tools to help identify untranslated strings and resolve issues with language translations in your installed extensions.

Here's how to enable and use these tools:

1. **Access Global Configuration:**
    - From the Home Dashboard, click on the **Global Configuration** button in the System panel.

2. **Enable Debug Language:**
    - In the System panel, toggle **Debug Language** to **Yes**.

3. **Adjust Language Display:**
    - The default setting for Language Display is **Value**. Changing it to **Constant** may disrupt the layout due to long constants not wrapping properly.

When **Debug Language** is activated, Joomla highlights all translatable values with special characters that indicate their status:

- **Translated Strings:**
    - Text surrounded by asterisks (\**Joomla CMS\**) shows that the string has been successfully translated from a language file.

- **Untranslated Strings:**
    - Text surrounded by question marks (??Joomla CMS??) signifies that the string is intended for translation, but no corresponding entry was found in the language files.

- **Non-Translatable Strings:**
    - Text without any special characters (Joomla CMS) indicates that the string is not set up for translation.

You may also utilize the **Debug Bar** to view the highlighted strings and identify any untranslated or non-translatable values in your extension.

![img.png](_assets/untranslated_tab_debug_bar.png)

When the `Debug Bar` with `Debug Language` is enabled, it provides a convenient overview of all debug information, including untranslated language strings, directly on your site. This tool is especially useful for developers when ensuring that all language strings are correctly implemented.

## Additional Resources

### Language Overrides

Language overrides allow administrators to customize translations without modifying the core language files.

This feature can be accessed from the backend under `System > Language Overrides`. Select `Site` for front-end strings and `Administrator` for back-end strings.

### Language Associations

## Language Associations

Joomla’s Multilingual Associations component simplifies the management of multilingual content by allowing you to associate translations with each other.

### Enabling and Using Multilingual Associations

1. **Enable the Language Filter Plugin:**
    - Navigate to **Extensions > Plugins**.
    - Search for the **System - Language Filter** plugin, enable it.
    - Set **Item Associations** to **Yes** and save the changes.

2. **Create Translations for Content:**
    - Go to **Content > Articles**.
    - Edit an article, and in the **Associations** tab, click the **Create** button to generate a translation in the desired language.
    - Add the title and content for the translation, then save the article.

3. **Manage Multilingual Associations:**
    - Go to **Components > Multilingual Associations**.
    - Use this interface to view and manage all translations side-by-side, making it easier to keep track of and associate your multilingual content.

This process is essential for maintaining consistency across different language versions of your site.

How to enable language associations in a component is described in [Joomla documentation](https://docs.joomla.org/J3.x:Developing_an_MVC_Component/Adding_Associations).

### Form Fields

Joomla provides standard form fields for languages and content languages. These can be used in your extensions to manage multilingual content more effectively. Refer to the following links for more information:
- [Standard Fields - Language](https://manual.joomla.org/docs/general-concepts/forms-fields/standard-fields/language)
- [Standard Fields - Content Language](https://manual.joomla.org/docs/general-concepts/forms-fields/standard-fields/contentlanguage)

By following these guidelines, you can ensure that your Joomla extensions are fully multilingual, providing a seamless experience for users in different languages.