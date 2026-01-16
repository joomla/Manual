---
title: Mail
---

Mail
====

:::danger
  Regression found in Joomla! **6.0.2** using `\Joomla\CMS\Mail\Mail`, please Check [the regression notice](/migrations/54-60/known-issues/6.0.2/#issue-46643--mailer-setsender-does-not-work).
:::

This section describes how you can send emails from your extension,
using either the Joomla `Mail` class or the `MailTemplate` class.

To get this to work you should ensure that your Joomla instance is configured correctly in Global Configuration / Server tab,
and that Send Test Mail works ok.

There is also a sample `com_sendmail` component which you can download and run to experiment with Joomla Mail.
Instructions for use are at the bottom of this page.

## Sending an Email

### Get the Joomla Mail instance

First of all you must get the Joomla `Mail` instance. The easiest way is

```php
use Joomla\CMS\Factory;
use Joomla\CMS\Mail\MailerFactoryInterface;

    $mailer = Factory::getContainer()->get(MailerFactoryInterface::class)->createMailer();
```

When Joomla initialises it sets into the Dependency Injection Container an entry with:
- key - MailerFactoryInterface::class (ie the fully qualified name of this class, as a string)
- value - code which will return a `MailerFactory` instance.

Here we're getting that `MailerFactory` instance from the DIC, and calling `createMailer()` on it to give us a Joomla `Mail` instance.

Alternatively, if you're writing code in a component Controller or Model class which has been created using the `MVCFactory`,
then you can get the `MVCFactory` to provide you with the `MailerFactory` instance.

Your Controller/Model needs to:
- provide a getter and setter for the `MailerFactory` - you use the `MailerFactoryAwareTrait` to do this
- tell other classes that you have this getter and setter - by specifying that your class implements `MailerFactoryAwareInterface`

Here's the section of code:

```php
use Joomla\CMS\Factory;
use Joomla\CMS\Mail\MailerFactoryAwareTrait;
use Joomla\CMS\Mail\MailerFactoryAwareInterface;

class MyController extends ... implements MailerFactoryAwareInterface
{
    use MailerFactoryAwareTrait;

    public function sendMail()
    {
        $mailer = $this->getMailerFactory()->createMailer();
        ...
```

When `MVCFactory` creates your Controller it checks if it implements MailerFactoryAwareInterface,
and if so it uses your setter to set the `MailerFactory` in your class.

You can then use your getter to get the `MailerFactory` and call `createMailer()` to create the `Mail` instance.

### Send the email

Once you have the `Mail` instance (`$mailer` above) you can use the [Mail API](cms-api://classes/Joomla-CMS-Mail-Mail.html) to configure aspects of the email.

The `Mail` instance takes as defaults the data defined in the Global Configuration / Server tab.
So, for example, if you don't set a sender then it will take the sender data from Global Configuration.

As a minimum you should set:
- the recipient's email address
- a subject for the message
- the text (body) of the message

```php
$mailer->addRecipient('someone@example.com');
$mailer->setSubject('test');
$mailer->setBody('Hello!');

try
{
    $mailer->send();
    $this->app->enqueueMessage("Mail successfully sent", 'info');
}
catch (\Exception $e)
{
    $this->app->enqueueMessage("Failed to send mail, " . $e->getMessage(), 'error');
}
```

If the email fails to send then `send()` will throw an Exception, so it's recommended to call it within a try/catch block.

The above is coded in the example `com_sendmail` program described at the end of this page.

### Troubleshooting

If you do encounter problems sending an email then the enqueued message displayed may not be very helpful.

Instead, you should check in Global Configuration / Logging that Log Almost Everything is on,
and this should mean that you will see in your log file the low level interactions with the mail server.

(You may see a lot of lines containing Error messages, but they're not really errors!)

Even so, the source of the problem may not be obvious.
For example, after setting `$mailer->isHtml()` to send an email in HTML, I found this returned from the server:

```
550-We're sorry, but we can't send your email.  Either the subject matter, a link, or an attachment potentially contains
550 spam, or phishing or malware.  Please check or edit your message and try sending it again.
```

The SMTP server didn't allow emails with Content-Type text/html.

## Mail Templates

You can instead use mail templates to send your emails.

You can see (and modify) the mail templates which Joomla uses by going to the administrator System Dashboard
and selecting Mail Templates within the Templates panel.

If you're unfamiliar with this, then you should have a play with these in a test Joomla instance,
as this will make clearer what's described below.

Look also at the effects of changing the Mail Templates Configuration Options.

### Defining Mail Templates

Joomla doesn't provide functionality for creating mail templates.

Instead, you should create them in your code, for example in your installation script file,
using the [Mail Template APIs](cms-api://classes/Joomla-CMS-Mail-MailTemplate.html).

The APIs provide static functions:
- createTemplate
- updateTemplate
- deleteTemplate

and the data maps to the `#__mail_templates` database table.

For each template you define:
- the template key - including your extension, for example 'com_sendmail.example'
- the text for the email subject - defined as a language constant
- the text for the email body - defined as a language constant
- an array of tags - fields in the email subject and body which will be replaced by values

You will need to define these email subject and body language constants in your .ini language file
(site or administrator, depending upon where you send the email from).

You can define the email body text in HTML as well as in plain text.

You also need to define certain language constants which Joomla forms from your template key.

For "com_sendmail.example" you will need in your administrator .sys.ini language files:
- COM_SENDMAIL_MAIL_EXAMPLE_TITLE
- COM_SENDMAIL_MAIL_EXAMPLE_DESC
- COM_SENDMAIL

which are all shown in the administrator Mail Templates form.

In your administrator .ini language files you will need (repeated):
- COM_SENDMAIL_MAIL_EXAMPLE_TITLE
- COM_SENDMAIL_MAIL_EXAMPLE_DESC

as these are also shown when you view/edit a single mail template.

### Configuring Mail Templates

Once you have created your mail template an administrator can edit it,
using the functionality within the administrator Mail Templates area.

An administrator can change the text of the email subject and body,
where the tag fields which you defined should appear,
and attachments which should be added (from a folder outside the Joomla-owned folders, if this option is set).

The HTML body (if set) is shown only if the Mail Templates configuration option Mail Format includes HTML.

If the Mail Templates configuration option Per Template Mail Settings is set
then you an administrator can set further options via the Options tab (when editing a mail template).

Although when you create a mail template you define the email subject and body as a language constant,
when the template is displayed those language constants are translated, and shown in a specific language.

If an administrator changes and saves a template, then it is stored in the `#__mail_templates` database table
with the `language` column set to the language code of the language in which it has been displayed.

This means that in the `#__mail_templates` database table you can have multiple records for each mail template
- one record for the mail template as you created it, with the language field set to a blank string, and,
- one record for each language where an administrator has modified the template for that language.

When you use a template in your extension's code to send an email you have to specify the language.
Joomla will first of all look for a record with your specified language (one which an administrator has edited),
and if it doesn't find one then it drops back to the default one which your component created.

### Emailing Using the Mail Template

The `MailTemplate` acts like a wrapper round the `Mail` class,
so you can add recipients, attachments, reply-to address and send the email via the [Mail Template APIs](cms-api://classes/Joomla-CMS-Mail-MailTemplate.html).

You initially get the `Mail` instance as described above, but thereafter use the `MailTemplate` instance:

```php
$mailer = Factory::getContainer()->get(MailerFactoryInterface::class)->createMailer();

// if you want to use the language of the currently logged-on user ...
$user = $this->app->getIdentity();

// pass your template id, language and the $mailer instance into the MailTemplate constructor
$mailTemplate = new MailTemplate('com_sendmail.example', $user->getParam('language', $this->app->get('language')), $mailer);

// add the recipient via the MailTemplate
$mailTemplate->addRecipient('someone@example.com');

// here you get the MailTemplate to replace the tags in the mail template with the data you provide
// In the com_sendmail example the tags are 'name', 'p1' and 'p2', so you want to have a $data array with those keys
$mailTemplate->addTemplateData(
            [
                'name' => $data['name'],
                'p1'   => $data['p1'],
                'p2'   => $data['p2']
            ]
        );

// Send the email using the MailTemplate as well. If it fails it will raise an exception
try {
    $mailTemplate->send();
} catch (\Exception $e) {
    $this->app->enqueueMessage("Failed to send mail, " . $e->getMessage(), 'error');
}
```

## Example com_sendmail Component

You can download and install [this example com_sendmail component](./_assets/com_sendmail.zip).
It demonstrates sending emails both using the `Mail` class and the `MailTemplate` class.

As part of its installation `com_sendmail` creates a MailTemplate with a key of 'com_sendmail.example',
which you can then view and edit via the administrator Mail Templates functionality.

To run the component you should navigate to `<your domain>/index.php?option=com_sendmail`.

The component will display a form which will:
- let you select whether you want to send the email using `Mail` or `MailTemplate`, and,
- capture the data appropriate to your choice.

You can also ensure that logging is set on via Global Configuration / Logging
and view the low level mail interactions in the log file.
