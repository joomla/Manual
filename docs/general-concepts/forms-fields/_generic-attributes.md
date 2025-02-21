

## Gernic Attributes
These attributes include, for example:
- **onchange** - in which you can pass a javascript function which should get control when the input element is changed
- **autofocus** - to specify the input element which should receive focus on page load
- **data-xxx** - data attributes to be set on the input element


## Attributes
As all form fields inherit from the base class `FormField`, the options listed below are **optional** and available to all form fields in addition to the field specific options:
- **autocomplete** (default: on) If 'off' element will not be automatically autocompleted by the Browser.
- **spellcheck** (default: true) The spellcheck state for the form field.
- **autofocus** (default: false) The autofocus request for the form field.  If true element will be automatically focused on document load.
- **hidden** (default: false) A field can be hidden temporary or as feature toggle by setting this option to true.
- **hiddenLabel** (default: false) If this value is defined as `true`, no label is rendered for the corresponding form field.
