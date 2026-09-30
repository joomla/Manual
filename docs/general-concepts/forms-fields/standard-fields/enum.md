---
sidebar_position: 2
title: Enum Form Field
---

The **enum** form field type provides a drop down list or a list box whose entries are generated from the cases of a PHP enum. Instead of repeating the same set of values in an enum and again as `<option>` elements in the XML, you declare them once in PHP and point the field at the enum class. If the field has a saved value this is selected when the page is first loaded. If not, the default value (if any) is selected.

This field extends `ListField`, so the attributes of the [list form field](./list.md) are available as well.

:::info

The enum form field is available from Joomla 6.2 onwards. It was introduced with the [Pull Request #48113](https://github.com/joomla/joomla-cms/pull/48113).

:::

- **type** (mandatory) must be *enum*.
- **name** (mandatory) is the unique name of the field.
- **enum** (mandatory) is the fully qualified class name of the PHP enum which provides the entries, for example `Joomla\Component\Content\Administrator\Enum\StateType`. The class has to be autoloadable and has to be a PHP enum, otherwise an `\InvalidArgumentException` is thrown when the field is rendered.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **prefix** (optional) is a language key prefix used to translate the entries. Without it, the case names are displayed as they are written in the PHP enum.
- **default** (optional) (not translatable) is the default list item value.
- **class** (optional) is a CSS class name for the HTML form field.
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see the example with an additional option below.
- **validate** (optional) set to *options* to reject values which are not part of the list, see [validate](../standard-form-field-attributes.md#validate).
- **useglobal** (optional) if set to true, it will show the value that is set in the global configuration if found in the database.

Implemented by: libraries/src/Form/Field/EnumField.php

## How the entries are built

The field calls `cases()` on the given enum and builds one entry per case.

The value which is saved for an entry is:

- the backing value of the case for a backed enum, so `1` for `case Published = 1;`
- the name of the case for a pure enum, so `Published` for `case Published;`

The text which is displayed for an entry is:

- the name of the case, if no **prefix** attribute is given
- the translation of the language key `PREFIX_CASENAME`, if a **prefix** attribute is given

The language key is built by joining the prefix and the case name with an underscore and converting the result to upper case. A case `Published` with `prefix="COM_EXAMPLE_STATE"` therefore uses the key `COM_EXAMPLE_STATE_PUBLISHED`. Note that the case name is not split up into words, so a case `InProgress` results in the key `COM_EXAMPLE_STATE_INPROGRESS` and not in `COM_EXAMPLE_STATE_IN_PROGRESS`.

If the language key is not defined, then the key itself is displayed in the drop down list, which makes a missing translation easy to spot.

## Example enum

The examples below use this enum, stored in `administrator/components/com_example/src/Enum/StateType.php`:

```php
<?php

namespace Joomla\Component\Example\Administrator\Enum;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

enum StateType: int
{
    case Published = 1;
    case Archived  = 2;
}
```

## Example XML parameter definition

```xml
<field
        name="mystate"
        type="enum"
        enum="Joomla\Component\Example\Administrator\Enum\StateType"
        label="Select a state"
        description=""
/>
```

This creates a drop down list with the entries *Published* (value 1) and *Archived* (value 2).

## Example XML parameter definition with translated entries

```xml
<field
        name="mystate"
        type="enum"
        enum="Joomla\Component\Example\Administrator\Enum\StateType"
        prefix="COM_EXAMPLE_STATE"
        label="COM_EXAMPLE_FIELD_MYSTATE_LABEL"
        description="COM_EXAMPLE_FIELD_MYSTATE_DESC"
/>
```

with these language strings in `administrator/language/en-GB/com_example.ini`:

```ini
COM_EXAMPLE_FIELD_MYSTATE_LABEL="State"
COM_EXAMPLE_FIELD_MYSTATE_DESC="The state of the item."
COM_EXAMPLE_STATE_PUBLISHED="Published"
COM_EXAMPLE_STATE_ARCHIVED="Archived"
```

## Example XML parameter definition with an additional option

`<option>` elements are still taken into account and are displayed before the entries of the enum. This is the usual way to add an empty entry or a "Please Select" entry:

```xml
<field
        name="mystate"
        type="enum"
        enum="Joomla\Component\Example\Administrator\Enum\StateType"
        prefix="COM_EXAMPLE_STATE"
        label="COM_EXAMPLE_FIELD_MYSTATE_LABEL"
        default="0">
        <option value="0">COM_EXAMPLE_STATE_NONE</option>
</field>
```

This creates a drop down list with three entries, *None*, *Published* and *Archived*, with *None* preselected.

The same applies to the **header** and **useglobal** attributes which are inherited from the list field: those entries are also displayed before the entries of the enum.

:::caution

The entries are not checked for duplicates. If an `<option>` element uses a value which one of the enum cases also produces, then that value is displayed twice in the drop down list.

:::

## Validation

The field only builds the list of entries, it does not restrict what the browser may submit. Add `validate="options"` if the submitted value should be checked against the entries of the enum:

```xml
<field
        name="mystate"
        type="enum"
        enum="Joomla\Component\Example\Administrator\Enum\StateType"
        validate="options"
        label="COM_EXAMPLE_FIELD_MYSTATE_LABEL"
/>
```

The options rule asks the field for its entries, so the cases of the enum are covered without having to repeat them in the XML.

## Using the value in your code

The value arrives as a string from the request, so it has to be converted back into a case of the enum, for example in the model or in the table class:

```php
use Joomla\Component\Example\Administrator\Enum\StateType;

// Backed enum: from() throws an exception for an unknown value, tryFrom() returns null.
$state = StateType::tryFrom((int) $data['mystate']);

// Pure enum: look the case up by its name.
$state = \constant(StateType::class . '::' . $data['mystate']);
```

When the value is saved, use `$state->value` for a backed enum and `$state->name` for a pure enum, so that the stored value matches the entry which the field displays the next time the form is loaded.

## See also

* [List form field type](./list.md)
* [Predefinedlist form field type](./predefinedlist.md)
* [Standard form field attributes](../standard-form-field-attributes.md)
* [PHP Enumerations](https://www.php.net/manual/en/language.enumerations.php)
