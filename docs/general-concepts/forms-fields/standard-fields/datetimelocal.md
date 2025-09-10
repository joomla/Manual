---
sidebar_position: 2
title: Date-Time Local Form Field
---

Date-Time Local Form Field
==========================

`<input>` elements of type datetime-local create input controls that let the user easily enter both a date and a time, including the year, month, and day as well as the time in hours and minutes.


## Fields

- **type** must be *datetime*.
- **name** any name to distinguish field this from all others.
- **label** the translatable label displayed for data entry.
- **description** the translatable description displayed for data entry.

## Example XML parameter definition

```xml
<field 
    type="datetime"
    name="dod"
    label="COM_EXAMPLE_DATE_AND_TIME_OF_DEATH_LABEL"
    description="COM_EXAMPLE_DATE_AND_TIME_OF_DEATH_DESC"
    filter="SERVER_UTC"
/>
```

## Screenshot

[Example form containing a date-time field](./_assets/date-time-fields.png)
