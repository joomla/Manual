---
sidebar_position: 2
title: Install Process and Script Files
---

Install Process and Script Files
================================

This section provides an overview of the extension install process, and how you can write a Script File to interact with it.

An installation script file is a class with 5 functions: 
- preflight - called at the start of the install process
- install, update, uninstall - called part way through the process:
    - install is called when the operation is an initial install of an extension
    - update is called when the operation is an install of an existing extensions
    - uninstall is called when the operation is a removal of an extension
- postflight - called at the end of the install process

You can also interact with the process by writing installation plugins which listen for the events described below. 

## Installation Process

There are various methods for installing an extension in Joomla, and various types of extension, but ultimately, the installation process follows a similar pattern for all.

When you go to install extensions and select a zip file of an extension to install then this is an overview of what happens:
(If you want to step through this process in a debugger then set a break at administrator/components/com_installer/src/Model/InstallModel.php::install)
- imports the "installer" type plugins, and triggers the 'onInstallerBeforeInstallation' event
- the zip file is stored in the Joomla /tmp folder, and then unzipped into a subfolder of /tmp
- triggers the 'onInstallerBeforeInstaller' event
- triggers the 'onExtensionBeforeInstall' event
- loads the .sys.ini language file from the new install files (or failing that, from the existing extension directory)
- reads basic information about the extension from the manifest file, for example, the type of the extension
- performs a `require_once` of the installer script file
- calls the script file `preflight` function
- copies the extension files from the /tmp folder to their place within the Joomla instance - for example, when installing a site module mod_example, the code would be copied to /modules/mod_example
- writes / updates the extension record in the database (ie this extension's record in the `#__extensions` table)
- performs any functionality specific to that extension type. For example, for new installs of modules it creates a record in the `#__modules` table
- applies any database changes required by this install. 
- calls the script file `install` / `update` / `uninstall` function
- tidy-up:
    - If there's a record in the `#__updates` table saying that there's a new version available for this extension then it deletes it. 
    - It copies the manifest file into the target extension directory (for components this will be the component directory under /administrator)
- calls the script file `postflight` function
- triggers the 'onExtensionAfterInstall' event
- triggers the 'onInstallerAfterInstaller' event
- performs some further tidy-up, eg deleting the temporary installation files

## Example Script File

The easiest way to write a script file is to use the \Joomla\CMS\Installer\InstallerScriptInterface definition in libraries/src/Installer/InstallerScriptInterface.php.
You simply have to return an instance of a class which implements the 5 installer functions. You can use the \Joomla\CMS\Installer\InstallerScriptTrait trait from libraries/src/Installer/InstallerScriptTrait.php to benefit from pre-defined functionality like a PHP and Joomla minimum version check or creating a dashboard preset menu module.

You can either
1. Return an anonymous Script File class which implements InstallerScriptInterface, or
2. Return an anonymous service provider class which puts the Script File class into the Dependency Injection Container using a key InstallerScriptInterface::class. Joomla will then `get` that Script File class from the DIC.

The example below uses the second approach. 

For an example of the first approach see the [Module Tutorial Step 6](../../modules/module-development-tutorial/step6-script-file.md).

```php
<?php

use Joomla\CMS\Application\AdministratorApplication;
use Joomla\CMS\Installer\InstallerAdapter;
use Joomla\CMS\Installer\InstallerScriptInterface;
use Joomla\CMS\Installer\InstallerScriptTrait;
use Joomla\CMS\Language\Text;
use Joomla\Database\DatabaseInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Filesystem\File;
use Joomla\Filesystem\Exception\FilesystemException;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

return new class () implements ServiceProviderInterface {
  public function register(Container $container)
  {
    $container->set(
      InstallerScriptInterface::class,
      new class (
      $container->get(AdministratorApplication::class),
      $container->get(DatabaseInterface::class)
      ) implements InstallerScriptInterface {
        use InstallerScriptTrait;

        private AdministratorApplication $app;
        private DatabaseInterface $db;

        /**
         * Minimum PHP version required to install the extension
         *
         * @var    string
         */
        protected $minimumPhp = '8.4';

        /**
         * Minimum Joomla! version required to install the extension
         *
         * @var    string
         */
        protected $minimumJoomla = '6.0.0';

        /**
         * A list of files to be deleted
         *
         * @var    array
         */
        protected $deleteFiles = [];
    
        /**
         * A list of folders to be deleted
         *
         * @var    array
         */
        protected $deleteFolders = [];

        public function __construct(AdministratorApplication $app, DatabaseInterface $db)
        {
          $this->app = $app;
          $this->db  = $db;
        }

        public function install(InstallerAdapter $parent): bool
        {
          $this->app->enqueueMessage('Successful installed.');

          return true;
        }

        public function update(InstallerAdapter $parent): bool
        {
          $this->app->enqueueMessage('Successful updated.');

          return true;
        }

        public function uninstall(InstallerAdapter $parent): bool
        {
          $this->app->enqueueMessage('Successful uninstalled.');

          return true;
        }

        public function customPreflight(string $type, InstallerAdapter $parent): bool
        {
          // Your custom preflight code

          // Custom Dashboard Menu Module
          // $this->addDashboardMenuModule('example', 'example');

          return true;
        }

        public function customPostflight(string $type, InstallerAdapter $parent): bool
        {
          // Your custom postflight code

          return true;
        }
      }
    );
  }
};
```
