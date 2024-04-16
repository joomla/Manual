---
sidebar_position: 2
title: Installing Extensions
---

:::note TODO

This section is missing, please use the **Edit this Page** link at the bottom of this page to add this section.

:::

There are various methods for installing an extension in Joomla!, but ultimately, the extension is always
installed with the same functionality.

# The Workflow explained

:::note TODO

This section is missing, please use the **Edit this Page** link at the bottom of this page to add this section.

:::

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
