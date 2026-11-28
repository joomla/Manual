---
sidebar_position: 1
title: Custom Fields Events
toc_max_heading_level: 2
---

Custom Fields Events
====================

Custom Fields events are triggered by the Joomla Custom Fields functionality (com_fields).
They allow a plugin to provide new types of custom field, to define how a custom field appears in the edit form of an item,
and to define or change the HTML which is output when the value of a custom field is displayed.

Joomla imports the plugins in the `fields` group before dispatching these events,
so to capture them you should develop a plugin of type `fields`.

For background on obtaining arguments and returning results see [Plugin Methods and Arguments](../methods-and-arguments.md).

## Joomla Overview

### The FieldsPlugin Class

Each type of custom field (Text, List, Calendar, Subform, etc.) is provided by a plugin in the `fields` group,
and the core plugins all extend `Joomla\Component\Fields\Administrator\Plugin\FieldsPlugin`
(in administrator/components/com_fields/src/Plugin/FieldsPlugin.php).
This class subscribes to the `onCustomFieldsGetTypes`, `onCustomFieldsPrepareDom` and `onCustomFieldsPrepareField` events
(and also to [onContentPrepareForm](./content.md#oncontentprepareform)),
and it provides a default implementation of each of them:

- **onCustomFieldsGetTypes** - each PHP file in the plugin's tmpl folder defines a field type with that name,
eg plugins/fields/color/tmpl/color.php defines the type `color`.
- **onContentPrepareForm** - when an administrator edits a custom field of one of these types,
the plugin's `params/<type>.xml` file is added to the field edit form, to allow the field's options to be set.
- **onCustomFieldsPrepareDom** - a `<field>` element is added to the item's edit form,
with `type` set to the field type and with the options of the custom field as attributes.
So the field type must also be the name of a form field which Joomla can find:
either one of the standard form fields (the core plugins all use these, eg the Fields - Color plugin uses the `color` form field),
or a [custom form field](../../../general-concepts/forms-fields/custom-fields-overview.md) which your plugin provides.
- **onCustomFieldsPrepareField** - the plugin's `tmpl/<type>.php` layout file is run to obtain the HTML for the field value.
Within the layout `$field` is the custom field, `$fieldParams` is a `Registry` containing the merged plugin and field options,
and `$context` and `$item` are as described in [onCustomFieldsPrepareField](#oncustomfieldspreparefield).
Templates can override the layout by placing a file in `templates/<template>/html/plg_fields_<plugin name>/<type>.php`.

The `FieldsPlugin` event handlers call the methods `onCustomFieldsGetTypes()`, `onCustomFieldsPrepareDom($field, $parent, $form)`
and `onCustomFieldsPrepareField($context, $item, $field)` to do this work,
so in a plugin which extends `FieldsPlugin` you can override those methods to change the behaviour,
in the same way as the core plugins do.
For example, the Fields - Color plugin (plugins/fields/color) does this:

```php
public function onCustomFieldsPrepareDom($field, \DOMElement $parent, Form $form)
{
    $fieldNode = parent::onCustomFieldsPrepareDom($field, $parent, $form);

    if (!$fieldNode) {
        return $fieldNode;
    }

    $fieldNode->setAttribute('validate', 'color');

    return $fieldNode;
}
```

### When the Events are Triggered

**Getting the field types.** Whenever Joomla needs the list of available field types,
it calls `FieldsHelper::getFieldTypes()`, which triggers [onCustomFieldsGetTypes](#oncustomfieldsgettypes).
This happens for example when the Type dropdown of the custom field edit form is built,
and when an edit form containing custom fields is prepared.

**Editing an item.** When Joomla prepares the edit form of an item (eg an article, contact or user) which can have custom fields,
the System - Fields plugin (plugins/system/fields) handles the [onContentPrepareForm](./content.md#oncontentprepareform) event
and calls `FieldsHelper::prepareForm()`.
This gets the custom fields for the context (taking into account the item's category),
creates an XML form definition with a fieldset for each field group,
and triggers [onCustomFieldsPrepareDom](#oncustomfieldspreparedom) for each custom field,
so that the plugin for that field type can add the field's XML definition.
Custom fields whose type isn't in the list returned by [onCustomFieldsGetTypes](#oncustomfieldsgettypes)
(for example because the plugin which provides the type is disabled) are left out of the form.

**Displaying an item.** The System - Fields plugin handles these content events
(which components trigger when they display an item):

- [onContentPrepare](./content.md#oncontentprepare) - it gets all the custom fields of the item,
including their prepared (HTML) values, and stores them in `$item->jcfields`
- [onContentAfterTitle](./content.md#oncontentaftertitle), [onContentBeforeDisplay](./content.md#oncontentbeforedisplay)
and [onContentAfterDisplay](./content.md#oncontentafterdisplay) - it gets the custom fields whose "Automatic Display" option
is set to "After Title", "Before Display Content" or "After Display Content" respectively,
prepares their values and returns the HTML to display them

To obtain the custom fields these call `FieldsHelper::getFields()`, which, for each field, sets `$field->value` and `$field->rawvalue`
to the value stored for the item (or the field's default value) and then:

- triggers [onCustomFieldsBeforePrepareField](#oncustomfieldsbeforepreparefield)
- triggers [onCustomFieldsPrepareField](#oncustomfieldspreparefield) and joins the HTML returned by the plugins
- triggers [onCustomFieldsAfterPrepareField](#oncustomfieldsafterpreparefield)
- sets `$field->value` to the resulting HTML

`FieldsHelper::getFields()` only triggers these 3 events when the item has an `id` and the caller asks for the values to be prepared.
Besides the System - Fields plugin, this is done for example by the Content - Fields plugin (when it replaces `{field}` and `{fieldgroup}` codes in an article),
by the Smart Search indexer, and by the Web Services API when it returns the custom field values of articles, contacts and categories.

Note that this means that these events can be triggered more than once for the same field and item while Joomla is processing a request,
for example in `onContentPrepare` and again in `onContentBeforeDisplay`.

## onCustomFieldsGetTypes

### Description

This event is triggered when Joomla needs the list of the types of custom field which are available.
A plugin which provides one or more types of custom field should add these to the event result.

### Event Arguments

The event class `\Joomla\CMS\Event\CustomFields\GetTypesEvent` has no arguments.

### Return Value

Add an array of field type specifications, one for each type of custom field which the plugin provides, to the event result.
Each specification is an associative array with the following keys:

- **`type`** - the name of the field type, eg `color`. It must be unique across all the `fields` plugins.
- **`label`** - the label shown in the Type dropdown of the custom field edit form
- **`path`** - (optional) a folder which Joomla adds to the form field search paths (using `FormHelper::addFieldPath()`)
when it prepares a form containing a custom field of this type.
Note that this only finds form field classes which aren't namespaced;
for a namespaced form field class add an `addfieldprefix` attribute to the `<field>` element instead,
as shown in the [onCustomFieldsPrepareDom](#oncustomfieldspreparedom) example.
- **`rules`** - (optional) a folder which Joomla adds to the form rule search paths (using `FormHelper::addRulePath()`)

`FieldsHelper::getFieldTypes()` returns these specifications in an array indexed by the type.

### Examples

If your plugin extends `FieldsPlugin` then you don't need to handle this event,
as `FieldsPlugin` creates the specifications from the layout files in your plugin's tmpl folder.
It takes the label from the language string `PLG_FIELDS_<NAME>_LABEL` for the layout file with the same name as the plugin,
or `PLG_FIELDS_<NAME>_<LAYOUT>_LABEL` for any other layout file.

Otherwise you can add the specifications to the event result like this:

```php
use Joomla\CMS\Event\CustomFields\GetTypesEvent;
use Joomla\CMS\Language\Text;

public function onCustomFieldsGetTypes(GetTypesEvent $event): void
{
    $event->addResult([
        [
            'type'  => 'rating',
            'label' => Text::_('PLG_FIELDS_RATING_LABEL'),
        ],
    ]);
}
```

## onCustomFieldsPrepareDom

### Description

This event is triggered for each custom field when Joomla is adding the custom fields to a form, as described in [Editing an item](#when-the-events-are-triggered).
The plugin which provides the type of the custom field should add a `<field>` element to the fieldset,
in the same format as fields in a [form XML definition file](../../../general-concepts/forms/index.md).

It is also triggered when a custom field definition is saved,
so that Joomla can find the validation rule (if any) to check the field's default value.
This only happens when the default value is not blank (a value of `0` counts as not blank)
and the field type is one of those returned by [onCustomFieldsGetTypes](#oncustomfieldsgettypes).
In this case the `fieldset` argument is the `<form>` element of a new XML document,
and the `form` argument is a new empty `Form`.

The Fields - Subform plugin also triggers this event for each of the fields within a subform field.

### Event Arguments

The event class `\Joomla\CMS\Event\CustomFields\PrepareDomEvent` has the following arguments:

- **`field`** - The custom field, as a `stdClass` object with properties including
`id`, `name`, `type`, `label`, `description`, `required`, `default_value`, `group_id`,
`params` (a `Registry` of the field's general options) and `fieldparams` (a `Registry` of the options specific to its type).

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

- **`fieldset`** - The `DOMElement` of the `<fieldset>` to which the field should be added.

- **`form`** - The `Joomla\CMS\Form\Form` which the fields are being added to.

### Return Value

None. Add the `<field>` element to the `fieldset` instead.

### Examples

As each plugin receives this event for every custom field,
you should first check that the field is of a type which your plugin provides.
You should also respect the field's options which control whether it is shown on the form and whether the user can edit it,
in the same way as `FieldsPlugin` does.

```php
use Joomla\CMS\Event\CustomFields\PrepareDomEvent;
use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;

public function onCustomFieldsPrepareDom(PrepareDomEvent $event): void
{
    $field = $event->getField();

    if ($field->type !== 'rating' || !FieldsHelper::displayFieldOnForm($field)) {
        return;
    }

    $node = $event->getFieldset()->appendChild(new \DOMElement('field'));
    $node->setAttribute('name', $field->name);
    $node->setAttribute('type', 'rating');
    // Tell Joomla where to find the RatingField form field class
    $node->setAttribute('addfieldprefix', 'Mycompany\Plugin\Fields\Rating\Field');
    $node->setAttribute('label', $field->label);
    $node->setAttribute('description', $field->description);
    $node->setAttribute('required', $field->required ? 'true' : 'false');
    $node->setAttribute('max', (int) $field->fieldparams->get('max', 5));

    if (!FieldsHelper::canEditFieldValue($field)) {
        $node->setAttribute('disabled', 'true');
    }
}
```

If your plugin extends `FieldsPlugin` then you should instead override its `onCustomFieldsPrepareDom()` method,
as in the Color plugin example [above](#the-fieldsplugin-class).

## onCustomFieldsBeforePrepareField

### Description

This event is triggered for each custom field before the field value is prepared for display,
as described in [Displaying an item](#when-the-events-are-triggered).
At this point `$field->value` contains the value stored for the item.

### Event Arguments

The event class `\Joomla\CMS\Event\CustomFields\BeforePrepareFieldEvent` has the following arguments:

- **`context`** - The context of the item, eg `com_content.article`, `com_contact.contact` or `com_users.user`.

- **`item`** - The item (eg the article) whose custom fields are being prepared.

- **`field`** - The custom field. As well as the properties described in [onCustomFieldsPrepareDom](#oncustomfieldspreparedom),
it has `value` and `rawvalue`, which both contain the value stored for the item
(or the field's default value if no value is stored).
For fields which can store multiple values (eg checkboxes) this is an array.

(This is actually the 'subject' element in the array returned by `$event->getArguments()`.)

### Return Value

None. As the field is an object, you can change its properties (eg `$field->value`) before the value is prepared.

### Examples

The core Fields - Radio plugin uses this event, when the Web Services API is returning the custom fields,
to set an `apivalue` property on radio fields which contains the label of the selected option.

## onCustomFieldsPrepareField

### Description

This event is triggered for each custom field to obtain the HTML which displays the field value,
as described in [Displaying an item](#when-the-events-are-triggered).
The plugin which provides the type of the custom field should return the HTML.

The Fields - Subform plugin also triggers this event for each of the fields within a subform field.

### Event Arguments

The event class `\Joomla\CMS\Event\CustomFields\PrepareFieldEvent` has the same arguments as [onCustomFieldsBeforePrepareField](#oncustomfieldsbeforepreparefield):
**`context`**, **`item`** and **`field`**.

### Return Value

Add the HTML which displays the value to the event result:

```php
$event->addResult($html);
```

`FieldsHelper::getFields()` removes any empty strings and null values from the results of all the plugins,
and joins the remaining results, separated by a space, to form the prepared value.

### Examples

```php
use Joomla\CMS\Event\CustomFields\PrepareFieldEvent;

public function onCustomFieldsPrepareField(PrepareFieldEvent $event): void
{
    $field = $event->getField();

    if ($field->type !== 'rating' || $field->value === '') {
        return;
    }

    $rating = (int) $field->value;
    $max    = (int) $field->fieldparams->get('max', 5);

    $event->addResult(str_repeat('★', $rating) . str_repeat('☆', max(0, $max - $rating)));
}
```

If your plugin extends `FieldsPlugin` then you can simply provide a `tmpl/<type>.php` layout file which outputs the HTML,
as described in [The FieldsPlugin Class](#the-fieldsplugin-class).

## onCustomFieldsAfterPrepareField

### Description

This event is triggered for each custom field after the field value has been prepared,
as described in [Displaying an item](#when-the-events-are-triggered).
It allows a plugin to change the HTML which will be displayed for any type of custom field.

### Event Arguments

The event class `\Joomla\CMS\Event\CustomFields\AfterPrepareFieldEvent` has the arguments of [onCustomFieldsBeforePrepareField](#oncustomfieldsbeforepreparefield)
(**`context`**, **`item`** and **`field`**), and also:

- **`value`** - The prepared value, ie the HTML formed from the results of [onCustomFieldsPrepareField](#oncustomfieldspreparefield).
At this point `$field->value` still contains the value before it was prepared (normally the value stored for the item).

### Return Value

To change the prepared value call `$event->updateValue($newValue)`.
Joomla then sets `$field->value` to the value of the event's `value` argument.

### Examples

```php
use Joomla\CMS\Event\CustomFields\AfterPrepareFieldEvent;

public function onCustomFieldsAfterPrepareField(AfterPrepareFieldEvent $event): void
{
    if ($event->getContext() !== 'com_content.article' || $event->getField()->name !== 'price') {
        return;
    }

    $value = $event->getValue();

    if ($value !== '') {
        $event->updateValue($value . ' EUR');
    }
}
```
