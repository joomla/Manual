import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a What's New tour

In the following documentation, we explain how a `What's New tour` can be created to enhance the user experience when updating a Joomla! instance.

What's New tours are available in major and minor Joomla releases, only for users who update.

Note:
Replace X and Y with the major and minor version numbers.
For instance, X_Y is 5_3 if you create a PR for the what's new tour for version 5.3.

## Step 1: Create the What's New tour

Enter the following parameters:

**Title:** What’s New in Joomla X.Y!  
**Identifier:** joomla-whatsnew-X-Y  
**Component Selector:** Home dashboard  
**Autostart:** yes  
**Relative Url:** administrator/index.php  
**Description:**

```html
<h1 class="fw-medium">Welcome to Joomla X.Y!</h1>
```

It is easier to create the description from a copy of a previous tour and re-use the formated text.

Include the sections:
- Guided tour updates
- Core updates

If you have images, add them into the folder ``media/com_guidedtours/images/X_Y``.

## Step 2: Create a step for the tour

**Title:** More Information and Help  
**Position:** right  
**Target:** `#sidebarmenu nav > ul:first-of-type > li:last-child`  
**Description:**

```html
<h3>Joomla X.Y Full Release Notes</h3>
<p><a title="Full release notes" href="https://www.joomla.org/announcements.html" target="_blank" rel="noopener noreferrer">View the full release notes on joomla.org</a></p>
<hr>
<h3>Help and Information</h3>
<p>Many resources to help you can be found here together with additional links to more resources, documentation, support and how to become involved in Joomla.</p>
```

## Step 3: Install the Guided Tours toolkit

The toolkit can be found at [the toolkit extension GitHub page](https://github.com/joomla-extensions/tours-toolkit).

## Step 4: Export the tour

Go to the newly created tour.
Select Export (in the top right end corner), and select 'SQL + INI Export'.
This generates the code necessary for importing tours through code. It actually generates the language keys even though the tour was created in plain English.
The file can be found in your browser's download folder.

## Step 5: Create the PR

Open the generated file.
Create a PR in a branch you have created from the forked Joomla repository.

### Enter the description:

```
### Summary of Changes

This PR adds a tour that highlights new features introduced in Joomla X.Y.

### Testing Instructions

Download the update package, not the full install as the tour is only available on updates!

It is possible to find the tour in the list of tours at the top of the Joomla dashboard and run it manually.
Make sure you see images when running the tour (on the first step only) and when editing the tour (System -> Manage -> Guided tours).

### Actual result BEFORE applying this Pull Request

No tour highlighting new features for Joomla X.Y.

### Expected result AFTER applying this Pull Request

The What’s New in Joomla X.Y! tour is available.
```

Add images of the tour so that testers can have an idea of what the tour looks like.

### Create files

```
administrator/language/en-GB/guidedtours.joomla_whatsnew_X_Y.ini
administrator/language/en-GB/guidedtours.joomla_whatsnew_X_Y_steps.ini
```

and fill with the generated language keys.

### Create media files

If there are images, add them to

```
build/media_source/com_guidedtours/images/X_Y
```

### Create files

```
administrator/components/com_admin/sql/updates/mysql/X.Y.0-YEAR-MONTH-DAY.sql
administrator/components/com_admin/sql/updates/postgresql/X.Y.0-YEAR-MONTH-DAY.sql
```

and fill with the generated SQL statements.

BEFORE those statements, include:

On a major release (for instance 5.0), add the statements to remove ALL prior what's new tours:

<Tabs>
<TabItem value="mysql" label="MySQL">
```sql
-- uninstall previous tours
DELETE FROM `#__guidedtour_steps`
 WHERE `tour_id` IN (SELECT `id` FROM `#__guidedtours` WHERE `uid` LIKE 'joomla-whatsnew-%');

DELETE FROM `#__guidedtours`
 WHERE `uid` LIKE 'joomla-whatsnew-%';
```
</TabItem>
<TabItem value="pgsql" label="PostgreSQL">
```sql
-- uninstall previous tours
DELETE FROM "#__guidedtour_steps"
 WHERE "tour_id" IN (SELECT "id" FROM "#__guidedtours" WHERE "uid" LIKE 'joomla-whatsnew-%');

DELETE FROM "#__guidedtours"
 WHERE "uid" LIKE 'joomla-whatsnew-%';
```
</TabItem>
</Tabs>

On a minor release (for instance 5.3), set the previous What's New tour to NOT autostart:

<Tabs>
<TabItem value="mysql" label="MySQL">
```sql
-- disable autostart for the previous tour
UPDATE `#__guidedtours` SET `autostart` = 0 WHERE `uid` = 'joomla-whatsnew-X-YY';
```
</TabItem>
<TabItem value="pgsql" label="PostgreSQL">

```sql
-- disable autostart for the previous tour
UPDATE "#__guidedtours" SET "autostart" = 0 WHERE "uid" = 'joomla-whatsnew-X-YY';
```
</TabItem>
</Tabs>

where YY is the previous minor release number.
For instance, if the PR is for the version 5.3, YY is 2.

## Step 6: Test the PR (turn it into a draft)

Make sure all goes according to plan before requesting users to test. Do this by setting the PR to draft, wait until the system validates it and creates downloadable files.
Use the generated files (don't run a full install or else you won't have the tour included).
