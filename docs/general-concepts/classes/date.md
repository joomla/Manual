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
be created in two ways. One is the typical native method of simply creating a new instance:

```php
use Joomla\CMS\Date\Date;

$date = new Date(); // Creates a new Date object equal to the current time.
```

You may also create an instance using the static method defined in Date:

```php
use Joomla\CMS\Date\Date;

$date = Date::getInstance(); // Alias of 'new Date();'
```

There is no difference between these methods, as Date::getInstance simply creates a new instance of Date exactly like
the first method shown. Alternatively, you may also retrieve the current date (as a Date object) from the Application
object by using:

```php
use Joomla\CMS\Factory;

$date = Factory::getDate();
```

## Arguments

The Date constructor (and getInstance static method) accepts two optional parameters: A date string to format and a
timezone. Not passing a date string will create a Date object with the current date and time, while not passing a
timezone will allow the Date object to use the default timezone set. The first argument, if used, should be a string
that can be parsed using PHP's native DateTime constructor. For example:

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
```

A Unix timestamp (in seconds) can also be passed as the first argument, in which case it will be internally uplifted
into a date. If a timezone has been specified as the second argument to the constructor, it will be converted to that
timezone.

## Outputting Dates

One note of caution when outputting Date objects in a user context: do not simply print them to the screen. The Date
object's toString() method simply calls its parent's format() method, without consideration for time zones or localized
date formatting. This will not result in a good user experience and will lead to inconsistencies between the formatting
in your extension, and elsewhere in Joomla. Instead, you should always output Dates using the methods shown below.

### Common Date Formats

A number of date formats are predefined in Joomla as part of the base language packs. This is beneficial because it
means date formats can be easily internationalised. A sample of the available format strings is below, from the en-GB
language pack. It is highly recommended to utilise these formatting strings when outputting dates so that your dates
will be automatically re-formatted according to a user's locale. They can be retrieved in the same way as any language
string.

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

As with many common output items, the HtmlHelper class is here to... help! HtmlHelper's date() method will take any
date-time string that the Date constructor would accept, along with a formatting string, and output the date appropriate
for the current user's timezone settings. As such, this is the recommended method for outputting dates for the user.

```php
use Joomla\CMS\Html\HtmlHelper;
use Joomla\CMS\Language\Text;

$myDateString = '2025-12-1 15:20:00';
echo HtmlHelper::date($myDateString, Text::_('DATE_FORMAT_FILTER_DATETIME'));
```

### Using Date::format() Method

Another option is to format the Date manually. If this method is used, you will have to also manually retrieve and set
the user's timezone. This method is more useful for formatting dates outside the user interface, such as in system
logs or API calls.

```php
use Joomla\CMS\Language\Text;
use Joomla\CMS\Date\Date;
use Joomla\CMS\Factory;

$myDateString = '2025-12-1 15:20:00';
$timezone = Factory::getUser()->getTimezone();

$date = new Date($myDateString);
$date->setTimezone($timezone);
echo $date->format(Text::_('DATE_FORMAT_FILTER_DATETIME'));
```

## Other Useful Code Examples

### Quickly Outputting the Current Time

There are two easy ways of doing this.

1. The HtmlHelper's date() method, if no date value is provided, will default to the current time.
2. Factory::getDate() gets the current date as a Date object, which we can then format.

```php
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;

// These two are functionally equivalent
echo HtmlHelper::date('now', Text::_('DATE_FORMAT_FILTER_DATETIME'));

$timezone = Factory::getUser()->getTimezone();
echo Factory::getDate()->setTimezone($timezone)->format(Text::_('DATE_FORMAT_FILTER_DATETIME'));
```

### Adding and Subtracting from Dates

Because the Joomla Date object extends the PHP DateTime object, it provides methods for adding and subtracting from
dates. The easiest of these methods to use is the modify() method, which accepts any relative modification string that
the PHP [strtotime()](https://www.php.net/manual/en/function.strtotime.php) method would accept. For example:

```php
use Joomla\CMS\Date\Date;

$date = new Date('2025-12-1 15:20:00');
$date->modify('+1 year');
echo $date->toSQL(); // 2026-12-01 15:20:00
```

There are also separate add() and sub() methods, for adding or subtracting time from a date object respectively. These
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

### Outputting Dates in ISO 8601 Format

```php
$date = new Date('2025-12-1 15:20:00');
$date->toISO8601(); // 20251201T152000Z
```

### Outputting Dates in RFC 822 Format

```php
$date = new Date('2025-12-1 15:20:00');
$date->toRFC822(); // Sat, 01 Dec 2025 15:20:00 +0000
```

### Outputting Dates in SQL Date-Time Format

```php
$date = new Date('20251201T152000Z');
$date->toSQL(); // 2025-12-01 15:20:00
```

### Outputting Dates as Unix Timestamps

```php
$date = new Date('20251201T153000Z');
$date->toUnix(); // 1764599400
```