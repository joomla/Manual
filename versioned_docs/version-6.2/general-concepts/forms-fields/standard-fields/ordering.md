---
sidebar_position: 2
title: Ordering Form Field
---

The **ordering** form field type provides a dropdown list of entries within a specified table along with `-First-` and `-Last-`.

- **type** (mandatory) must be *ordering*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **table** (mandatory) is content table for items needing to be in order.

As an example, see com_banners. In its table definition `##__com_banners` it has a `catid` field which contains the category number of the linked category and also a `ordering` field which keeps the number of each banner, 1,2,3 etc.

**Note** If you do not have a `catid` field then an error is thrown.

Implemented by: libraries/src/Form/Field/OrderingField.php

## Example XML parameter definition

```xml
<field
        name="ordering"
        type="ordering"
        label="JFIELD_ORDERING_LABEL"
        table="#__banners"
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