---
sidebar_position: 2
title: ContentLanguage Form Field
---

The **contentlanguage** form field type provides a dropdown list of style options with the current option selected.

- **type** (mandatory) must be *contentlanguage*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).

Implemented by: libraries/src/Form/Field/ContentlanguageField.php

## Example XML definition from plugins/system/languagecode/languagecode.php

```php
foreach ($languages as $tag => $language) 
{
    $form->load('
        <form>
            <fields name="params">
                <fieldset
                    name="languagecode"
                    label="PLG_SYSTEM_LANGUAGECODE_FIELDSET_LABEL"
                    description="PLG_SYSTEM_LANGUAGECODE_FIELDSET_DESC"
                >
                    <field
                        name="' . strtolower($tag) . '"
                        type="text"
                        label="' . $tag . '"
                        description="' . htmlspecialchars(Text::sprintf('PLG_SYSTEM_LANGUAGECODE_FIELD_DESC', $language['name']), ENT_COMPAT, 'UTF-8') . '"
                        translate_description="false"
                        translate_label="false"
                        size="7"
                        filter="cmd"
                    />
                </fieldset>
            </fields>
        </form>');
  }

```
