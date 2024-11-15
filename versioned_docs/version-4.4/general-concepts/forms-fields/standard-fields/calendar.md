---
sidebar_position: 2
title: Calendar Form Field
---

Calendar Form Field
===================

The **calendar** form field type provides a text box for entry of a date. An icon next to the text box provides a link
to a pop-up calendar, which can also be used to enter the date value. If the field has a saved value this is shown in
the text box. Otherwise the default value, if any, is displayed.

- **type** (mandatory) must be *calendar*.
- **name** (mandatory) is the unique name of the field.
- **label** (mandatory) (translatable) is the field html label.
- **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
- **readonly** (optional) is whether the text box is read-only (true or false). If the text box is read-only, the date
  cannot be changed, but can be selected and copied. No calendar icon will be shown.
- **disabled** (optional) is whether the text box is disabled (true or false). If the text box is disabled, the date
  cannot be changed, selected or copied.
- **class** (optional) is a CSS class name for the HTML form field.
- **format** (optional) is the date format to be used. This is in the format used by PHP to specify date string formats (see below). 
If no format argument is given, '%Y-%m-%d' is assumed (giving dates like '2017-05-15'). 
If showtime is true then you will need to include some time fields, for example, '%Y-%m-%d %H:%i:%s'.
- **filter** (optional) is time zone to be used. There are two main values: "server_utc" and "user_utc". The first one is
  server time zone and the later is user time zone as configured in global configuration and user information
  respectively. There is also a value of none which must be used if the server time zone is set to something other than
  UTC and showtime is false.
- **translateformat** (optional) If set to true, the calendar will use the DATE_FORMAT_CALENDAR_DATE language key (if
  showtime is true) or DATE_FORMAT_CALENDAR_DATETIME (if showtime is false) to determine the format. The format
  attribute is ignored. If false, the format attribute is used but note that the
  format string must include time fields for the time to be recorded. Defaults to false.
- **showtime** (optional) If set to true and translateformat is true, the language key DATE_FORMAT_CALENDAR_DATETIME is
  used, otherwise DATE_FORMAT_CALENDAR_DATE. Defaults to false.
- **timeformat** (optional): can be set to 12 or 24. If set to 12, an additional selection is
  available to the user to choose between AM and PM. This attribute does not affect how the date/time is saved. Defaults
  to 24.
- **singleheader** (optional): if set to false, the year and the month selection will be set on two separate lines,
  with independent selection. Defaults to false.

- **todaybutton** (optional): if set to true, a button is added at the bottom of the date picker to select the date of
  the current day. Defaults to true.

- **weeknumbers** (optional): if set to true, a column is added at the left of the date picker to display the number of
  the week in the current year. Defaults to true.

- **filltable** (optional): if set to true, dates of the previous and next month are added at the top and bottom of the
  current month to fill the grid. Defaults to true.

- **minyear** (optional): set a signed integer for a number of years (-10, -2, 0, 7, 12, ...) to define the relative
  lower limit for the year selection. The user cannot select a year before this limit. If zero,
  which is the default, there is no limit.

- **maxyear** (optional): set a signed integer for a number of years (-10, -2, 0, 7, 12, ...) to define the relative
  upper limit for the year selection. The user cannot select a year after this limit. If zero,
  which is the default, there is no limit.

Implemented by: libraries/src/Form/Field/CalendarField.php

## Example XML parameter definition for a light DatePicker

```xml
<field
        name="mycalendar"
        type="calendar"
        default="2017-05-15"
        label="Select a date"
        description=""
        class="input-small"
        required="true"
        filter="user_utc"
        showtime="false"
        todaybutton="false"
        filltable="false"
        translateformat="true"
/>
```

![Datepicker without time selector](_assets/calendar/DatePicker1.calendar-en.png)

## Example XML parameter definition for an advanced DatePicker

```xml
<field
        name="mycalendar"
        type="calendar"
        default="2017-05-15"
        label="Select a date"
        description=""
        class="input-medium"
        required="true"
        filter="user_utc"
        format="%Y-%m-%d %H:%i:%s"
        singleheader="true"
        showtime="true"
        timeformat="12"
        todaybutton="true"
        weeknumbers="true"
        filltable="true"
        minyear="-3"
        maxyear="5"
/>
```

![Datepicker with time selector](_assets/calendar/DatePicker2.calendar-en.png)

The format attribute specifies the format that the date string will be saved in. It is also the format that manually
entered dates need to be enterered in; except that the punctuation character is ignored. The coding scheme used to
specify date formats is a custom one defined for the javascript library used in the datepicker, full details of which
can be found for example on Joomla's Github. The following are some of the most frequently used date string codes:

| **Character** | **Description**                                          | **Example**                             |
  |---------------|----------------------------------------------------------|-----------------------------------------|
| d             | Day of the month, 2 digits with leading zeros            | 01 to 31                                | 
| a             | A textual representation of a day, three letters         | Mon through Sun                         | 
| e             | Day of the month without leading zeros                   | 1 to 31                                 | 
| A             | A full textual representation of the day of the week     | Monday through Sunday                   | 
| w             | Numeric representation of the day of the week            | 0 (for Sunday) through 6 (for Saturday) | 
| j             | The day of the year (starting from 0)                    | 001 through 366                         | 
| B             | A full textual representation of a month                 | January through December                | 
| m             | Numeric representation of a month, with leading zeros    | 01 through 12                           | 
| b             | A short textual representation of a month, three letters | Jan through Dec                         | 
| Y             | A full numeric representation of a year, 4 digits        | 1999 or 2003                            | 
| y             | A two-digit representation of a year                     | 99 or 03                                | 
| P             | Lowercase Ante Meridiem or Post Meridiem                 | am or pm                                | 
| p             | Uppercase Ante Meridiem or Post Meridiem                 | AM or PM                                | 

Note: The format in which dates are stored in the params.ini file is that specified by the format argument. Since there
can be language-dependent elements to this format (for example, the '%A' specifier), you need to be careful not to use
such elements if there is a possibility that the front-end and back-end languages may be different.

Note: The calendar form field type does not support non-Gregorian calendars. If you need to support non-Gregorian
calendars then you will need to create a custom form field type to support your calendar. 
