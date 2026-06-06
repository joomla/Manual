---
title: The Autowire MVC Factory Class
sidebar_position: 4
---

Autowire MVC Factory Overview
=============================

:::note[TODO]
    This is only a notebook for now.
:::


changes to `services/provider.php`:

instead of using 
`\Joomla\CMS\Extension\Service\Provider\MVCFactory` 
we will use 
`\Joomla\CMS\MVC\Factory\AutowireFactory`

## replaces \Joomla\Extension\Service\Provider\AutowireFactory

Compared to the MVCFactory, the autowrite will no longer statically bind objects to the MVC Factory,
but instead it will use the container to resolve the dependencies.

## replaces \Joomla\MVC\Factory\AutowireFactory

removes deprecated code for static wireing



Following classes needs to be updated to use the new autowire factory:

* Joomla\Component\Users\Administrator\Table\MfaTable
Move `generateBackupCodes` out of the class or implment the `AutowireInterface` to resolve the dependencies.

CacheControllerFactoryAwareInterface
FormFactoryAwareInterface
MailerFactoryAwareInterface
SiteRouterAwareInterface
UserFactoryAwareInterface
DatabaseAwareInterface
DispatcherAwareInterface


## extend \Joomla\DI\Container

Extend to use AbstractAutowireInterface and ConstructorAutowireInterface to resolve dependencies.

