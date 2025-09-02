---
sidebar_position: 2
title: Lastvisitdaterange Form Field
---

The **lastvisitdaterange** form field type provides a list box of available date ranges to filter on last visit date. This field extends `PredefinedlistField`.

- **type** (mandatory) must be *lastvisitdaterange*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **multiple** (optional) if set to true allows multiple items to be selected at the same time. Set to false to allow single selection.
- **required** (optional) if set to true, the first field option should be empty, see last example.

Implemented by: libraries/src/Form/Field/LastvisitdaterangeField.php

## Example XML parameter definition

```xml
<field
        name="mydaterange" 
        type="lastvisitdaterange"
        label="Choose" 
        description=""
/>
```
Based on the source code this returns the following entries in a list:  
'today',  
'past_week',  
'past_1month',   
'past_3month',  
'past_6month',  
'past_year',  
'post_year',  
'never' 