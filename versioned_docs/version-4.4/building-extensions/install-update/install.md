---
sidebar_position: 2
title: Installing Extensions
---

There are various methods for installing an extension in Joomla!, but ultimately, the extension is always installed using the same overall process.

## Installation Process

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

## Boilerplate manifest xml

A system plugin example

```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="system" method="upgrade">
  <name>plg_system_EXTENSIONNAME</name>
  <author>THE AUTHOR</author>
  <creationDate>MONTH YEAR</creationDate>
  <copyright>(C) 20XX THE COPYRIGHT OWNER</copyright>
  <license>GNU General Public License version 3 or later; see LICENSE.txt</license>
  <authorEmail>AUTHOR@EXAMPLE.COM</authorEmail>
  <authorUrl>https://EXAMPLE.COM</authorUrl>
  <version>0.5.0</version>
  <description>PLG_SYSTEM_ - EXTENSIONNAME - _XML_DESCRIPTION</description>
  <namespace path="src">YOURCOMPANYNAME\Plugin\System\EXTENSIONNAME</namespace>
  <scriptfile>script.php</scriptfile>
  <files>
    <folder>language</folder>
    <folder plugin="EXTENSIONNAME">services</folder>
    <folder>src</folder>
  </files>
</extension>
```

## Boilerplate script.php

The Boilerplate starts with the file description and the copyright, since Joomla is GPL licensed all extensions
have to be GPL 2 or later too.

```php
<?php
/**
 * @package     The Package
 *
 * @copyright   The Copyright
 * @license     GNU General Public License version 3 or later; see LICENSE.txt
 */


use Joomla\CMS\Application\AdministratorApplication;
use Joomla\CMS\Installer\InstallerAdapter;
use Joomla\CMS\Installer\InstallerScriptInterface;
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
        private AdministratorApplication $app;
        private DatabaseInterface $db;

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

        public function preflight(string $type, InstallerAdapter $parent): bool
        {
          return true;
        }

        public function postflight(string $type, InstallerAdapter $parent): bool
        {
          $this->deleteUnexistingFiles();

          return true;
        }

        private function deleteUnexistingFiles()
        {
          $files = [];

          if (empty($files)) {
            return;
          }

          foreach ($files as $file) {
            try {
              File::delete(JPATH_ROOT . $file);
            } catch (\FilesystemException $e) {
              echo Text::sprintf('FILES_JOOMLA_ERROR_FILE_FOLDER', $file) . '<br>';
            }
          }
        }
      }
    );
  }
};
```
