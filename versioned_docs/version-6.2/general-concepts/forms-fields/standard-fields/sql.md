---
sidebar_position: 2
title: SQL Form Field
---

:::caution Limitation

Using this generic form field type forces you to write SQL in an XML file and is rather limited.
For more flexibility, consider creating your own, specific form field type by subclassing the
`Joomla\CMS\Form\FormField` class.

:::

The **sql** form field type provides a drop down list of entries
obtained by running a query on the Joomla database. If the field has a
value saved, this value is selected when the page is first loaded. If
not, the default value (if any) is selected.

-   **type** (mandatory) must be *sql*.
-   **name** (mandatory) is the unique name of the field. This must
    match the name of the query results column that contains the values
    that will be shown to the user in the drop-down list, unless a
    different name is specified in the **value_field** attribute.
-   **label** (mandatory) (translatable) is the field html label.
-   **query** (mandatory if not using the sql\_\* attributes) is the SQL
    query which will provide the data for the drop-down list. The query
    must return two columns; one called *'value'* (unless overridden by
    the **key_field** attribute) which will hold the values of the list
    items; the other called the same as the value of the name attribute
    (unless overridden by the **value_field** attribute) containing the
    text to be shown in the drop-down list.
-   **default** (optional) is the default value. This is the value of
    the *'value'* column, unless overridden by the **key_field**
    attribute.
-   **description** (optional) (translatable) is the [field description](../standard-form-field-attributes.md#description).
-   **multiple** (optional) turns the field into a multi-selector. Use
    multiple="multiple".
-   **key_field** (optional) is the name of the column that will contain
    values for the parameter. If omitted then the column called
    *'value'* will be used, if it exists.
-   **value_field** (optional) is the name of the column that will
    contain values to be shown to the user in the drop-down list. If
    omitted then the column with the same name as the name attribute
    will be used, if it exists.
-   **translate** (optional) will translate the output of the
    **value_field** if set to true. It defaults to false.
-   **header** (optional) (translatable) will add an entry, with an
    empty value, at the top of the list of options. This is usually used
    to add a *"- Select something -"* entry to the list. See the
    examples for an alternative way of achieving this.
-   **sql_select** (mandatory if not using the **query** attribute) is
    the SELECT clause of the SQL statement. Only one such clause is
    permitted.
-   **sql_from** (mandatory if not using the **query** attribute) is the
    FROM clause of the SQL statement.
-   **sql_join** (optional) is the LEFT JOIN clause of the SQL
    statement. Only one such clause is permitted.
-   **sql_where** (optional) is the WHERE clause of the SQL statement.
    Only one such clause is permitted.
-   **sql_group** (optional) is the GROUP BY clause of the SQL
    statement.
-   **sql_order** (optional) is the ORDER BY clause of the SQL
    statement.
-   **sql_filter** (optional) filters the list by the value of another
    field. A field name or a comma-separated list of field names can be
    given. The field names must correspond to column names in the
    database table being queried. See the examples for further
    explanation.
-   **sql_default\_\{FIELD_NAME}** (optional) is the default value used
    by the **sql_filter** attribute when the value of the *\{FIELD_NAME}*
    filter has not been set. See the examples for further explanation.

Implemented by: libraries/src/Form/Field/SqlField.php

## Example XML parameter definition

```xml
<field
  name="title"
  type="sql"
  default="10"
  label="Select an article"
  query="SELECT id AS value, title AS text FROM #__content"
/>
```

Notice that an AS clause has been used in this example because the
*jos_content* table does not have a column called *'value'*. In fact
very few tables in the Joomla database have a column called *'value'*.

Alternatively, you can use a **key_field** attribute to define the
column to be used instead of *'value'*:

```xml
<field
  name="title"
  type="sql"
  default="10"
  label="Select an article"
  query="SELECT id, title FROM #__content"
  key_field="id"
/>
```

This will give identical results to the previous example.

Both column names may need to be aliased. For example, suppose you want
your field to be called *'myfield'* instead of *'title'* in the previous
example. Then you can do this:

```xml
<field
  name="myfield"
  type="sql"
  default="10"
  label="Select an article"
  query="SELECT id AS value, title AS myfield FROM #__content"
/>
```

Or alternatively:

```xml
<field
  name="myfield"
  type="sql"
  default="10"
  label="Select an article"
  query="SELECT id, title FROM #__content"
  key_field="id"
  value_field="title"
/>
```

You can also assemble or calculate fields in the SQL statement. For
example, suppose you wanted to append the created date/time of each
article to the article title in the list. Then you could use this SQL
statement:

```sql
SELECT
    id,
    concat( title, ' (', created, ')') AS title
FROM
    #__content
```

You can also specify a static option in the XML using <option></option>
tag. Please look at the following example.

```xml
<field
  name="myfield"
  type="sql"
  default="10"
  label="Select an article"
  query="SELECT id, title FROM #__content"
  key_field="id"
  value_field="title"
  required="true"
>
  <option value="">Please select your option</option>
</field>
```

Alternatively, you can achieve the same result using the **header**
attribute as follows:

```xml
<field
  name="myfield"
  type="sql"
  default="10"
  label="Select an article"
  query="SELECT id, title FROM #__content"
  key_field="id"
  value_field="title"
  required="true"
  header="Please select your option"
/>
```

## Alternative query syntax

Starting with Joomla 3.5, an alternative to the **query** attribute
allows some additional features. These features are not available if the
**query** attribute is present. For example, this field definition:

```xml
<field
  name="example_group"
  type="sql"
  label="COM_EXAMPLE_GROUP"
  query="SELECT e.* FROM #__example AS e GROUP BY name ORDER e.id ASC"
  key_field="id"
  value_field="name"
/>
```

can be expressed as:

```xml
<field
  name="example_group"
  type="sql"
  label="COM_EXAMPLE_GROUP"
  sql_select="e.*"
  sql_from="#__example AS e"
  sql_group="name"
  sql_order="e.id ASC"
  key_field="id"
  value_field="name"
/>
```

## Linked Fields as Filters

:::tip
  The description below is quite complex and you may find it helpful to install
  the [example sqlfield component](./sql.md#example-component) and use it to help you in your understanding.
:::

One advantage to using the alternative syntax above is that it allows the use of linked
fields as filters. For example, suppose you have a form containing two
select lists, one called *groups* and the other called *subgroups*. The
*groups* field is straightforward:

```xml
<field 
  name="groups"
  type="sql"
  label="COM_EXAMPLE_GROUPS"
  sql_select="e.*"
  sql_from="#__example_groups AS e"
  sql_group="name"
  sql_order="e.id ASC"
  key_field="id"
  value_field="name"
/>
```

but the *subgroups* field includes an **sql_filter** attribute which
refers to the *groups* field by name:

```xml
<field 
  name="subgroups"
  type="sql"
  label="COM_EXAMPLE_SUBGROUPS"
  sql_select="e.*"
  sql_from="#__example_subgroups AS e"
  sql_group="name"
  sql_order="e.id ASC"
  sql_filter="groups"
  key_field="id"
  value_field="name"
  context="sqlfield"
/>
```

Then if the *groups* field has the value *99*, the following SQL
statement will be executed for the *subgroups* field:

```sql
SELECT e.*
FROM
    jos_example_subgroups AS e
WHERE
    `groups` = 99
GROUP BY `name`
ORDER BY e.id ASC
```

To filter on multiple fields, you can use a comma-separated list of
filter names in the **sql_filter** clause. For example, if there is a
filter called *groups* with the value *99* and a filter called
*categories* with the value *12*, then

```xml
sql_filter="groups,categories"
```

will produce the SQL WHERE clause:

```sql
WHERE 
    `groups` = 99 
  AND
    `categories` = 12
```

The `context=...` attribute is necessary and is described below. 

You can also define a default value for any filter that might not have a
value when the field is evaluated by adding
**sql_default\_\{FIELD_NAME}** attributes. For example, suppose that the
default value for the *groups* filter is 0 and the default value for the
*categories* filter is 0, then this definition:

```xml
<field 
  name="subgroups"
  type="sql"
  label="COM_EXAMPLE_SUBGROUPS"
  sql_select="e.*"
  sql_from="#__example_subgroups AS e"
  sql_group="name"
  sql_order="e.id ASC"
  sql_filter="groups,categories"
  sql_default_groups="0"
  sql_default_categories="1"
  key_field="id"
  value_field="name"
/>
```

will produce this SQL statement when initially evaluated with no
filters:

```sql
SELECT
    e.*
FROM
    jos_example_subgroups AS e
WHERE
    `groups` = 0
  AND
    `categories` = 1
GROUP BY `name`
ORDER BY e.id ASC
```

Note: The SQL statements will need to be correct for the type and
version of the underlying database that Joomla is running on. This will
most likely be a version of MySQL, but it could be something else. There
is no capability to query databases other than the one Joomla itself is
running on.

Note: As shown in these examples, the database prefix (often `jos`)
should be entered in the form `#__` (hash-underscore-underscore). It
will automatically be replaced by the actual database prefix used by
Joomla.

### Linked Fields - additional implementation details

**It is important to understand what this feature does support and what it doesn't support.**

**Also, you need to implementation additional code to make the feature work as expected.**

Let's take the example where 
- the linked filter field is a category field, 
- the SQL field is an HTML Select field which shows the titles of articles whose category is selected in the category field.

You want to allow the user to select the category, and then be shown the titles of articles with that category, so that he/she can then select the article.

However, whenever the user selects or changes the category, the code ***doesn't automatically update*** the set of titles in the sql field. (There's no Ajax request operating behind the scenes). This update functionality is **not** part of the supported functionality.

That said, you can implement the functionality to update the titles by following the approach below.

To update the sql field you need to reload the form by
1. **sending the current form data** to the server (by submitting the form in your javascript code), 
2. **redisplaying the form** via your View class and tmpl file

When you redisplay the form you inject the current form field values into the `Form` structure. 
The SQL field will then pick up the key value(s) from the `Form` structure,
and perform the SQL query using these new values, in order to set the new options for the SQL HTML Select field.

To **send the form data**, implement an onchange javascript listener against the category field, for example, by setting in the XML the file attribute

```xml
  onchange="categoryReload(this)"
```

then implement the javascript categoryReload function:

```js title="reload.js"
function categoryReload(element) {
    document.body.appendChild(document.createElement('joomla-core-loader'));
    Joomla.submitform(`sqlfield.reload`, element.form, false);
}
```

This first loads the Joomla spinning logo (which will disappear when the form is re-presented).
To call this you need to specify "webcomponent.core-loader" as a dependency in your component's joomla.asset.json file.

Then the form is submitted with
- a *task* parameter set to 'sqlfield.reload' - change the string 'sqlfield' to your own component Controller name
- the third parameter set to `false` means that it won't perform field validation before sending the HTTP POST

This POST request will be routed to your SqlfieldController::reload() method.

So you need to include in your SqlfieldController::reload() method something like:

```php title="SqlfieldController.php"
public function reload($key = null, $urlVar = null)
{
    $this->checkToken();

    $app   = Factory::getApplication();

    $data  = $this->input->post->get('jform', array(), 'array');

    // This is the usual call to set the state for preserving the form data entered by the user
    $app->setUserState('com_sqlfield.example', $data);

    // Then redisplay the form
}
```

To **redisplay the form** you can either send the form as an HTTP response to the HTTP POST request:

```php title="SqlfieldController.php"
    $model = $this->getModel('sqlfield');
    $view = $this->getView('sqlfield', 'html');
    $view->setModel($model, true);
    
    $view->display();
```

or use the Post/Request/Get pattern to redirect to the DisplayController.

(The example component below uses the first approach).

### Example Component

You can download [this com_sqlfield component](./_assets/com_sqlfield.zip) as an example to follow.

Go onto your Joomla instance back-end, display the article categories and find the id of your `Uncategorised` category.

If it's not 2 then edit the com_sqlfield site/forms/example_form.xml and set the `sql_default_catid` to whatever id it is.

Install the com_sqlfield component and run the form by navigating to your Joomla instance's site page index.php?option=com_sqlfield

The component will display an HTML select field with the article categories available on your instance, and in the next field, 
the titles of the articles associated with the selected category.

If you select a different category then the component will send the form data to the server in an HTTP POST request, 
with the task parameter set to "sqlfield.reload" which will cause the `SqlfieldController::reload()` function to be called.
This function stores the existing form values in the user state, and arranges for the form to be redisplayed. 

When the component redisplays the form it injects the existing form values into the Joomla `Form` structure,
(so that when the form is redisplayed the user sees the values he/she previously entered).
The SQL Field can then obtain the category from this `Form` structure, 
and perform a SQL query to obtain the articles associated with the selected category. 
These article ids and titles will be set as options in the field, and will be shown when the form is re-presented. 

When you press `Select` then the selected category and article will be sent to the server in the HTTP POST request,
together with the task set to "sqlfield.submit", 
and the component code then displays the selected ids in the associated HTTP POST response. 

## See also

* [Secure DB Queries](../../../security/secure-db-queries.md)