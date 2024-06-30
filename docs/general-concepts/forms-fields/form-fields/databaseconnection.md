---
sidebar_position: 2
title: DatabaseConnection Form Field
---


The **databaseconnection** form field type provides a list of available database connections, optionally limiting to a given list.

- **type** (mandatory) must be *databaseconnection*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the descriptive title of the
  field.
- **description** (optional) (translatable) is text that will be shown
  as a tooltip when the user moves the mouse over the field.

Implemented by: libraries/src/Form/Field/DatabaseconnectionField.php

## Example XML parameter definition

```xml
<field
        name="dbtype" 
        type="databaseconnection"
        label="COM_CONFIG_FIELD_DATABASE_TYPE_LABEL"
        description="COM_CONFIG_FIELD_DATABASE_TYPE_DESC"
        supported="mysql,mysqli,postgresql,sqlsrv,sqlazure"
        filter="string"
/>
```