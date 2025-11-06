---
title: Date
---

Introduction
============

Joomla's Date class is a helper class, extended from PHP's DateTime class, which allows developers to handle date
formatting more efficiently. The class allows developers to format dates for readable strings, MySQL interaction, UNIX
timestamp calculation, and also provides helper methods for working in different time zones.

## Creating a Date Instance

All the date helper methods require an instance of the Date class. To begin, you must create one. A Date object may
be created in three ways.

### Native Method

The native method is the most straightforward and is shown below:

```php
use Joomla\CMS\Date\Date;

$date = new Date(); // Creates a new Date object equal to the current time.
```

### Factory::getDate() Method

You may also create an instance using the `Factory::getDate()` method:
There is no difference between these methods, as `Factory::getDate()` simply creates a new instance of Date exactly like
the first method shown.

```php
use Joomla\CMS\Factory;

$date = Factory::getDate();
```

### Static Method (Legacy)

You may also create an instance using the legacy static method defined in Date:

```php
// Legacy
use Joomla\CMS\Date\Date;

$date = Date::getInstance(); // Alias of 'new Date();'
```

:::info Legacy

The static method is only still available for backward compatibility and should no longer be used in new projects.

:::

## Modifying a Date Instance

Since the Joomla! Date class inherits directly from PHP's DateTime class, various native methods of the PHP class are
available for modification. The full list of methods is available in the PHP documentation, which can be
found [here](https://www.php.net/manual/en/class.datetime.php). The following is a list of the most commonly used
methods as well as some examples of their use in Joomla!.

### Adding and Subtracting from Dates

One of the easiest of these methods to modify a date is the modify() method, which accepts any relative modification
string that
the PHP [strtotime()](https://www.php.net/manual/en/function.strtotime.php) method would accept as shown below.

```php
use Joomla\CMS\Date\Date;

$date = new Date('2025-12-1 15:20:00');
$date->modify('+1 year');
echo $date->toSQL(); // 2026-12-01 15:20:00
```

There are also separate `add()` and `sub()` methods, for adding or subtracting time from a date object respectively.
These
accept PHP-standard DateInterval objects:

```php
use Joomla\CMS\Date\Date;

$interval = new \DateInterval('P1Y1D'); // Interval represents 1 year and 1 day

$date1 = new Date('2025-12-1 15:20:00');
$date1->add($interval);
echo $date1->toSQL(); // 2026-12-02 15:20:00

$date2 = new Date('2025-12-1 15:20:00');
$date2->sub($interval);
echo $date2->toSQL(); // 2024-11-30 15:20:00
```

### Set Time on Date Objects

```php
use Joomla\CMS\Factory;

$date = Factory::getDate();
echo $date->toSql() // 2025-12-01 15:20:00

$date->setTime( 12, 0, 0 );
echo $date->toSql(); // 2025-12-01 12:00:00
```

### Set Timestamp on Date Objects

```php
use Joomla\CMS\Factory;

$date = Factory::getDate();
$date->setTimestamp(1764599400); // Mon Dec 01 2025 14:30:00 UTC+0000

echo $date->format('Y-m-d H:i:s'); // 2025-12-01 14:30:00 
```

### Get Offset from UTC Time Zone

```php
use Joomla\CMS\Factory;

$date = Factory::getDate();
$date->setTimezone(new DateTimeZone('Europe/Berlin'));

echo $date->getOffset(); // 3600
```

### Get the difference between two Dates

```php
use Joomla\CMS\Factory;

$date1 = Factory::getDate('now');
$date2 = Factory::getDate('+1 year +35 days');
$interval = $date1->diff($date2);

echo $interval->format('%R%a days'); // +400 days
```

:::info Nice to know

The `diff()` method returns a DateInterval object, which can be used to get the difference between two dates in a
human-readable format. The format string used in the example above is a standard PHP format string, more examples can be
found
[here](https://www.php.net/manual/en/dateinterval.format.php).

:::

## Arguments

The Date constructor accepts two optional parameters: A date string to format and a
time zone. Not passing a date string will create a Date object with the current date and time, while not passing a
time zone will allow the Date object to use the default time zone set. The first argument, if used, should be a string
that can be parsed using PHP's native DateTime constructor.

### Using the native Method with the default Time Zone

```php
use Joomla\CMS\Date\Date;

$currentTime = new Date('now'); // Current date and time
$tomorrowTime = new Date('now +1 day'); // Current date and time, + 1 day.
$plus1MonthTime = new Date('now +1 month'); // Current date and time, + 1 month.
$plus1YearTime = new Date('now +1 year'); // Current date and time, + 1 year.
$plus1YearAnd1MonthTime = new Date('now +1 year +1 month'); // Current date and time, + 1 year and 1 month.
$plusTimeToTime = new Date('now +1 hour +30 minutes +3 seconds'); // Current date and time, + 1 hour, 30 minutes and 3 seconds
$plusTimeToTime = new Date('now -1 hour +30 minutes +3 seconds'); // Current date and time, + 1 hour, 30 minutes and 3 seconds
$combinedTimeToTime = new Date('now -1 hour -30 minutes 23 seconds'); // Current date and time, - 1 hour, +30 minutes and +23 seconds

$date = new Date('2025-12-1 15:20:00'); // 3:20 PM, December 1st, 2025
$dateFromTimestamp = new Date(1764599400); // 3:30 PM, December 1st, 2025
```

### Using the native Method with a custom Time Zone

```php
use Joomla\CMS\Date\Date;

$tz = new DateTimeZone('Australia/Melbourne');

$currentTime = new Date('now', $tz); // Current date and time
$tomorrowTime = new Date('now +1 day', $tz); // Current date and time, + 1 day.
$plus1MonthTime = new Date('now +1 month', $tz); // Current date and time, + 1 month.
$plus1YearTime = new Date('now +1 year', $tz); // Current date and time, + 1 year.
$plus1YearAnd1MonthTime = new Date('now +1 year +1 month', $tz); // Current date and time, + 1 year and 1 month.
$plusTimeToTime = new Date('now +1 hour +30 minutes +3 seconds', $tz); // Current date and time, + 1 hour, 30 minutes and 3 seconds
$plusTimeToTime = new Date('now -1 hour +30 minutes +3 seconds', $tz); // Current date and time, + 1 hour, 30 minutes and 3 seconds
$combinedTimeToTime = new Date('now -1 hour -30 minutes 23 seconds', $tz); // Current date and time, - 1 hour, +30 minutes and +23 seconds

$date = new Date('2025-12-1 15:20:00', $tz); // 3:20 PM, December 1st, 2025
$dateFromTimestamp = new Date(1764599400, $tz); // 3:30 PM, December 1st, 2025
```

:::note

See Outputting Dates for more information on time zones.

:::

### Using the Factory Method with the default Time Zone

```php
use Joomla\CMS\Factory;

$currentTime = Factory::getDate('now'); // Current date and time
$tomorrowTime = Factory::getDate('now +1 day'); // Current date and time, + 1 day.
$plus1MonthTime = Factory::getDate('now +1 month'); // Current date and time, + 1 month.
$plus1YearTime = Factory::getDate('now +1 year'); // Current date and time, + 1 year.
$plus1YearAnd1MonthTime = Factory::getDate('now +1 year +1 month'); // Current date and time, + 1 year and 1 month.
$plusTimeToTime = Factory::getDate('now +1 hour +30 minutes +3 seconds'); // Current date and time, + 1 hour, 30 minutes and 3 seconds
$plusTimeToTime = Factory::getDate('now -1 hour +30 minutes +3 seconds'); // Current date and time, + 1 hour, 30 minutes and 3 seconds
$combinedTimeToTime = Factory::getDate('now -1 hour -30 minutes 23 seconds'); // Current date and time, - 1 hour, +30 minutes and +23 seconds

$date = Factory::getDate('2025-12-1 15:20:00'); // 3:20 PM, December 1st, 2025
$dateFromTimestamp = Factory::getDate(1764599400); // 3:30 PM, December 1st, 2025
```

### Using the Factory Method with a custom Time Zone

```php
use Joomla\CMS\Factory;

$tz = new DateTimeZone('Australia/Melbourne');

$currentTime = Factory::getDate('now', $tz); // Current date and time in Melbourne.
$tomorrowTime = Factory::getDate('now +1 day', $tz); // Current date and time in Melbourne, + 1 day.
$plus1MonthTime = Factory::getDate('now +1 month', $tz); // Current date and time in Melbourne, + 1 month.
$plus1YearTime = Factory::getDate('now +1 year', $tz); // Current date and time in Melbourne, + 1 year.
$plus1YearAnd1MonthTime = Factory::getDate('now +1 year +1 month', $tz); // Current date and time in Melbourne, + 1 year and 1 month.
$plusTimeToTime = Factory::getDate('now +1 hour +30 minutes +3 seconds', $tz); // Current date and time in Melbourne, + 1 hour, 30 minutes and 3 seconds
$plusTimeToTime = Factory::getDate('now -1 hour +30 minutes +3 seconds', $tz); // Current date and time in Melbourne, + 1 hour, 30 minutes and 3 seconds
$combinedTimeToTime = Factory::getDate('now -1 hour -30 minutes 23 seconds', $tz); // Current date and time in Melbourne, - 1 hour, +30 minutes and +23 seconds

$date = Factory::getDate('2025-12-1 15:20:00', $tz); // 3:20 PM, December 1st, 2025
$dateFromTimestamp = Factory::getDate(1764599400, $tz); // 3:30 PM, December 1st, 2025
```

:::note

See Outputting dates for more information on time zones.

:::

## Dynamic Properties

The Date object has a number of dynamic properties that can be used to get information about the date.

### Get count of Days in a Month

```php
use Joomla\CMS\Factory;

$date = new Date();
// Factory example with different date for example purposes.
$dateFromFactory = Factory::getDate('now + 1 month');

echo $date->__get('daysinmonth'); // 30
echo $dateFromFactory->__get('daysinmonth'); // 31
```

### Get Day of Week

```php
use Joomla\CMS\Factory;

$date = new Date();
// Factory example with different date for example purposes.
$dateFromFactory = Factory::getDate('now + 1 month');

echo $date->__get('dayofweek'); // 4
echo $dateFromFactory->__get('dayofweek'); // 6
```

### Get Day of Year

```php
use Joomla\CMS\Factory;

$date = new Date();
// Factory example with different date for example purposes.
$dateFromFactory = Factory::getDate('now + 1 month');

echo $date->__get('dayofyear'); // 309
echo $dateFromFactory->__get('dayofyear'); // 339
```

### Checking for Leap Year

```php
use Joomla\CMS\Factory;

$date = new Date();
// Factory example with different date for example purposes.
$dateFromFactory = Factory::getDate('now + 3 years');

// Note: Returns a boolean.
echo var_export($date->__get('isleapyear'), 1); // false
echo var_export($dateFromFactory->__get('isleapyear'), 1); // true
```

### Getting Year / Month / Week / Day / Hour / Minute / Second

```php
use Joomla\CMS\Factory;

$date = new Date();
// Factory example with different date for example purposes.
$dateFromFactory = Factory::getDate('now + 2 months + 5 days + 1 hour + 12 minutes + 42 seconds');

echo $date->__get('year'); // 2025
echo $dateFromFactory->__get('year'); // 2026

echo $date->__get('month'); // 11
echo $dateFromFactory->__get('month'); // 02

echo $date->__get('week'); // 45
echo $dateFromFactory->__get('week'); // 02

echo $date->__get('day'); // 06
echo $dateFromFactory->__get('day'); // 11

echo $date->__get('hour'); // 13
echo $dateFromFactory->__get('hour'); // 16

echo $date->__get('minute'); // 18
echo $dateFromFactory->__get('minute'); // 31

echo $date->__get('second'); // 35
echo $dateFromFactory->__get('second'); // 17
```

### Get Ordinal Suffix

The ordinal property returns the English suffix for ordinal numbers based on the day of the month. For example, if the
date is the 4th, it returns “th”, if it’s the 21st, it returns “st”. You can use this to format dates in English like
“Today is the 4th of November”.

```php
use Joomla\CMS\Factory;

$date = Factory::getDate('01-01-2025');
echo $date->__get('ordinal'); // st

$date = Factory::getDate('02-01-2025');
echo $date->__get('ordinal'); // nd

```

## Outputting Dates

One note of caution when outputting Date objects in a user context: do not print them to the screen. The Date
object's toString() method simply calls its parent's `format() method, without consideration for time zones or
localised date formatting. This will not result in a good user experience and will lead to inconsistencies between the
formatting in your extension, and elsewhere in Joomla!. Instead, you should always output Dates using the methods shown
below.

### Common Date and Time Format Codes

```php
use Joomla\CMS\Factory;
$date = Factory::getDate('2025-01-06 15:05:05');

echo $date->format('D'); // Mo
echo $date->format('l'); // Monday
echo $date->format('M'); // Jan
echo $date->format('F'); // January
echo $date->format('d'); // 06 day of month
echo $date->format('H'); // 15 hour of day (24-hour clock)
echo $date->format('h'); // 03 hour of day (12-hour clock)
echo $date->format('a'); // pm or am based on the hour of day
echo $date->format('i'); // 05 minutes
echo $date->format('s'); // 05 seconds
echo $date->format('u'); // 000000 microseconds
echo $date->format('Y'); // 2025 year
echo $date->format('y'); // 25 year
echo $date->format('Y-m-d'); // 2025-01-06
echo $date->format('Y-m-d H:i'); // 2025-01-06 15:05
echo $date->format('Y-m-d H:i:s'); // 2025-01-06 15:05:05
```

:::info

Check the official [PHP DateTime documentation](https://www.php.net/manual/en/datetime.format.php)
for a full list of available formats.

:::

### Predefined Common Date Formats

A number of date formats are predefined in Joomla! as part of the base language packs. This is beneficial because it
means date formats can be easily internationalised. A sample of the available format strings from the
en-GB language pack is listed below. It is highly recommended to use these formatting strings when outputting dates so
that your dates will be automatically re-formatted according to a user's locale. They can be retrieved in the same way
as any language string.

```ini
DATE_FORMAT_LC = "l, d F Y"
DATE_FORMAT_LC1 = "l, d F Y"
DATE_FORMAT_LC2 = "l, d F Y H:i"
DATE_FORMAT_LC3 = "d F Y"
DATE_FORMAT_LC4 = "Y-m-d"
DATE_FORMAT_LC5 = "Y-m-d H:i"
DATE_FORMAT_LC6 = "Y-m-d H:i:s"
DATE_FORMAT_JS1 = "y-m-d"
DATE_FORMAT_CALENDAR_DATE = "%Y-%m-%d"
DATE_FORMAT_CALENDAR_DATETIME = "%Y-%m-%d %H:%M:%S"
DATE_FORMAT_FILTER_DATE = "Y-m-d"
DATE_FORMAT_FILTER_DATETIME = "Y-m-d H:i:s"
```

### Using HtmlHelper Method (Recommended)

HtmlHelper's `date()` method will take any date-time string that the Date constructor would accept, along with a
formatting string, and output the date appropriate for the current user's time zone settings. As such, this is the
recommended method for outputting dates for the user.

```php
use Joomla\CMS\Html\HtmlHelper;
use Joomla\CMS\Language\Text;

echo HtmlHelper::date('now', Text::_('DATE_FORMAT_LC6')); // date and time in Melbourne for the given timestamp.
```

```php
use Joomla\CMS\Html\HtmlHelper;
use Joomla\CMS\Language\Text;

$date = new Date(1764599400);
echo HtmlHelper::date($date, Text::_('DATE_FORMAT_LC6')); // 2025-12-1 15:30:00
echo HtmlHelper::date($date, Text::_('D')); // Mon
echo HtmlHelper::date($date, Text::_('l')); // Monday
```

### Using Date::format() Method

Another option is to format the Date manually. If this method is used, you will have to also manually retrieve and set
the user's time zone. This method is more useful for formatting dates outside the user interface, such as in system
logs or API calls.

The Date::format() method accepts up to three parameters:

1. Date Formatting string
2. Boolean that indicating whether to use the configured time zone from the date object (default false)
3. Boolean to translate localised strings (default true).

The formatting string is the same as the one used by the `HtmlHelper::date()` method.

```php
use Joomla\CMS\Language\Text;
use Joomla\CMS\Date\Date;
use Joomla\CMS\Factory;

$myDateString = '2025-12-1 15:20:00';
$timezone = Factory::getUser()->getTimezone();

$date = new Date($myDateString);
$date->setTimezone($timezone);
echo $date->format(Text::_('DATE_FORMAT_LC6'), true, true);
```

:::caution Using Custom Time Zones

If you are using a custom time zone, you will need to set the second parameter to true. Otherwise, the Date object will
use the GMT / UTC time zone by default, which may result in the wrong date being output.

:::

### Outputting Dates in ISO 8601 Format

```php
$date = new Date('2025-12-1 15:20:00');
$isoDate = $date->toISO8601(); // 20251201T152000Z
```

### Outputting Dates in RFC 822 Format

```php
$date = new Date('2025-12-1 15:20:00');
$rfcDate = $date->toRFC822(); // Sat, 01 Dec 2025 15:20:00 +0000
```

### Outputting Dates in SQL Date-Time Format

```php
$date = new Date('20251201T152000Z');
$sqlDate = $date->toSQL(); // 2025-12-01 15:20:00
```

### Outputting Dates as Unix Timestamps

```php
$date = new Date('20251201T153000Z');
$unixTime = $date->toUnix(); // 1764599400
```

## Other Useful Code Examples

### Quickly Outputting the Current Time

There are two easy ways of doing this.

1. The HtmlHelper's `date()` method, if no date value is provided, will default to the current time.
2. `Factory::getDate()` gets the current date as a Date object, which we can then format.

```php
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;

// These two are functionally equivalent
echo HtmlHelper::date('now', Text::_('DATE_FORMAT_LC6'));

echo Factory::getDate()->format(Text::_('DATE_FORMAT_LC6'));

// Or, if you want to output the current time in a different time zone
$timezone = new DateTimeZone('Australia/Melbourne');
$date = Factory::getDate('now', $timezone);

echo HtmlHelper::date($date, Text::_('DATE_FORMAT_LC6'));

echo Factory::getDate()->setTimezone($timezone)->format(Text::_('DATE_FORMAT_LC6'), true);
```

### Using the Time Zone from Global Configuration

To use the configured time zone of the global configuration, you can use the following (recommended) code:

```php
use Joomla\CMS\Html\HtmlHelper;
use Joomla\CMS\Language\Text;

// Get Timezone from Global Configuration
$config = Factory::getApplication()->getConfig();
$timezoneString = $config->get('offset'); // e.g. 'Australia/Melbourne'

echo HtmlHelper::date('now', Text::_('DATE_FORMAT_LC6'), $timezoneString);
```

Or using the `Factory::getDate()` method, setting the time zone manually and formatting the date:

```php
use Joomla\CMS\Factory;

// Get Timezone from Global Configuration
$config = Factory::getApplication()->getConfig();
$timezoneString = $config->get('offset'); // e.g. 'Australia/Melbourne'

// Catch a potential error and set to UTC as fallback.
try
{
    $siteTimezone = new DateTimeZone($timezoneString);
}
catch (DateInvalidTimeZoneException $e)
{
    $siteTimezone = new DateTimeZone('UTC');
}

echo Factory::getDate()->setTimezone($siteTimezone)->format(Text::_('DATE_FORMAT_LC6'), true);
```

### Using the current User's Time Zone

You can also use the time zone of the current user. By getting the user's time zone from the user object, you can then
use the time zone name as a string in the HtmlHelper::date method or the Date object's `setTimezone()` method to set the
time zone of the Date object.

```php
use Joomla\CMS\Factory;
use Joomla\CMS\Html\HtmlHelper;
use Joomla\CMS\Language\Text;

// Get Timezone from the current User or Global Configuration as a fallback.
$user = Factory::getApplication()->getIdentity();
$timezone = $user->getTimezone(); // Returns DateTimeZone object
$timezoneString = $timezone->getName(); // e.g. 'Australia/Melbourne'

echo HtmlHelper::date('now', Text::_('DATE_FORMAT_LC6'), $timezoneString);
```

Using the `Factory::getDate()` method, setting the time zone manually and formatting the date:

```php

use Joomla\CMS\Factory;

// Get Timezone from the current User or Global Configuration as a fallback.
$user = Factory::getApplication()->getIdentity();
$timezone = $user->getTimezone(); // Returns DateTimeZone object

echo Factory::getDate()->setTimezone($timezone)->format(Text::_('DATE_FORMAT_LC6'), true);
```

### Day to String

```php
use Joomla\CMS\Factory;

$date = Factory::getDate('now');
echo $date->dayToString(1, false); // Monday
echo $date->dayToString(2, true); // Tue
```

## Related external References

- [PHP DateTime](https://www.php.net/manual/en/class.datetime.php)
- [PHP DateTime Formats](https://www.php.net/manual/en/datetime.format.php)
- [PHP Time Zones](https://www.php.net/manual/en/timezones.php)
- [PHP DateInterval::format](https://www.php.net/manual/en/dateinterval.format.php)