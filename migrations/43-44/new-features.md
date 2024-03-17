---
sidebar_position: 1
---

New features
===============
All the new features that have been added to this version.
Any changes in best practice.

### Mailer interface, factory and service
- PR: https://github.com/joomla/joomla-cms/pull/40560
- Description: There is a new mailer interface which allows extension developers to implement their own mailer. A respective factory is delivered through the DI container to create these mailer instances. There is an aware trait and interface where MVC classes (or others) can get easy access to the factory.

The following code snippet shows how to implement your own mailer class and factory:
```php
class MyMailer implements MailerInterface
{
  // Implement the respective functions
}

class MyMailerFactory implements MailerFactoryInterface
{
  public function createMailer(Registry $configuration = null): MailerInterface
  {
	return new MyMailer($configuration);
  }
}
```

The following code snippet shows how to get access to the mailer factory and create a mailer object from it:
```php
class MyModel extends BaseDatabaseModel implements MailerFactoryAwareInterface
{
  use MailerFactoryAwareTrait;

  public function sendMailToCustomer()
  {
	$mailer = $this->getMailerFactory()->createMailer();
	$mailer->setSubject('Thanks for the purchase!');
	$mailer->send();
  }
}
```
