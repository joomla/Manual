---
sidebar_position: 2
title: Contenthistory Form Field
---

The **contenthistory** form field type provides a model popup showing the modification history of an article. 

- **type** (mandatory) must be *contenthistory*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.

Implemented by: libraries/src/Form/Field/ContentHistoryField.php

## Example XML parameter definition

```xml
<field
        name="mycontenthistory"
        type="contenthistory"
        label="JTOOLBAR_VERSIONS"
        data-typeAlias="com_contact.contact"
/>
```
