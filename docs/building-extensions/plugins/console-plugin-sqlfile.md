---
title: Console Plugin 2 SQLfile
sidebar_position: 5
---
# Console Plugin Example - Execute a file of SQL statements

# Introduction
This example expands the concepts described in the [Basic Helloworld Console Plugin](./basic-console-plugin-helloworld.md) to cover:
- plugin options 
- defining an argument in the command line
- defining an option in the command line
- using the standard Joomla command line options

It describes the use of several methods of the `Joomla\Console\Command\AbstractCommand` class.

# Functionality
This console plugin enables a CLI utility called `sql:execute-file` to run a series of SQL commands in a file, where the commands include the Joomla table prefix, as in:

```sql title="sqlfile.sql"
CREATE TABLE IF NOT EXISTS `#__temp_table` (
  `s` VARCHAR(255) NOT NULL DEFAULT '',
  `i` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`i`)
);
INSERT INTO `#__temp_table` (`s`, `i`) VALUES ('Hello', 22),('there', 23);
```

We need to pass the filename in the command line:

```
php cli/joomla.php sql:execute-file sqlfile.sql
```

We also define a command line option which will enable the actual SQL statements (with the prefix translated) to be logged to a file, and we use the Joomla-defined `verbose` option to determine what output to display on the terminal.

Finally, we incorporate a plugin option which controls whether transaction control is applied to the series of commands.

For simplicity we'll just use the English language within the plugin; to see how to make your plugin multilingual look at [Basic Content Plugin](./basic-content-plugin.md). 

# Overall Design
As in the Basic Console Plugin there are 2 main classes:
- a console plugin class which handles the aspects associated with the Joomla plugin mechanism
- a command class which contains the code for the command

# Console Plugin Class
Here's the core of our plugin class:

```php
class SqlfileConsolePlugin extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            \Joomla\Application\ApplicationEvents::BEFORE_EXECUTE => 'registerCommands',
        ];
    }

    public function registerCommands(): void
    {
        $myCommand = new RunSqlfileCommand();
        $myCommand->setParams($this->params);
        $this->getApplication()->addCommand($myCommand);
    }
}
```

When our plugin is initiated Joomla will call `getSubscribedEvents()` to find out what plugin events we want to handle. Our response tells Joomla to call our `registerCommands()` function when the `ApplicationEvents::BEFORE_EXECUTE` event is triggered.

Within `registerCommands()` we then do 3 things
- instantiate our command class
- inject into our command class the plugin params (we'll look at this in more detail shortly)
- add our command class instance to the core Joomla console application.

## Plugin Params
We define a configurable parameter for the plugin by including in the manifest file:

```xml
<config>
    <fields name="params">
        <fieldset name="basic">
            <field
                name="txn"
                type="list"
                label="Use Transaction Control?"
                default="1" >
                <option value="0">JNO</option>
                <option value="1">JYES</option>
            </field>
        </fieldset>
    </fields>
</config>
```

Then when the plugin is installed we can navigate in the back end to System / Plugins, click on our `Execute SQL file console command` plugin and we will be shown the option to set transaction control on or off.

Because our plugin extends `Joomla\CMS\Plugin\CMSPlugin` the values of params are made available via `$this->params`. We want to use the value within our command class, so we define a setter `setParams()` and getter `getParams()` there, and inject the parameters into the class via:

```php
$myCommand->setParams($this->params);
```

Then in our command class we can get the value using:

```php
$transactionControl = $this->getParams()->get('txn', 1);

```

The string 'txn' has to match the `name` attribute of our field in the `<config>` section in the manifest file. 

# Command Class
The command class extends `Joomla\Console\Command\AbstractCommand` and the APIs associated with this class are listed in the [API docs](
https://api.joomla.org/framework-3/classes/Joomla-Console-Command-AbstractCommand.html). We used a number of these APIs in the [Basic Helloworld Console Plugin](./basic-console-plugin-helloworld.md), and here we explore several more.

## Defining an argument
You define in your command class's `configure()` method what arguments you want your command to have . To define an argument you use eg:

```php
$this->addArgument('sqlfile', InputArgument::REQUIRED, 'file of joomla sql commands', null);
```

where the parameters are:
1. Argument name - you'll use this to retrieve the value of your argument
2. `InputArgument::REQUIRED` or `InputArgument::OPTIONAL`. These are defined in the class `Symfony\Component\Console\Input\InputArgument` in `libraries/vendor/symfony/console/Input/InputArgument.php`. 
3. Argument description - you'll see this displayed when you display the help text using
```
php cli/joomla.cli sql:execute-file -h
```
4. Default value of argument (if it's optional)

When the command is executed then you get the value of the argument using

```php
protected function doExecute(InputInterface $input, OutputInterface $output): int
{
    $sqlfile = $input->getArgument('sqlfile');
    ...
```

## Defining an option
You define the options also in the `configure()` method, eg

```php
$this->addOption('logfile', "l", InputOption::VALUE_REQUIRED, "log file");
```

where the parameters are:
1. Option name - you'll use this to retrieve the value of your option
2. Shortcut - we'll allow the user to specify "-l" as a shortcut
3. Mode - one of the possible values described in `Symfony\Component\Console\Input\InputOption` in `libraries/vendor/symfony/console/Input/InputOption.php`. 
4. Option description - you'll see this displayed when you display the help text using
```
php cli/joomla.cli sql:execute-file -h
```
5. Default value of option

You can then retrieve the value of your option within `doExecute()`:

```php
$logging = $input->getOption("logfile");
```

If you want to allow the form where the option is defined using `--logfile=log.txt` (ie with an equals sign rather than a space) then you'll need to remove the equals sign using eg `ltrim`:

```php
$logfile = $logpath . '/' . ltrim($logging, "=");
```

The code in the plugin sets `$logpath` to the Global Configuration Logging / "Path to Log Folder" parameter. 

## Using a Joomla-defined option
Joomla provides a 'help' option which enables you display help text

```
php cli/joomla.cli sql:execute-file -h
```

You just have to provide the help text within your `configure()` method:

```php
$this->setHelp(...);
```

The standard help text also displays a number of other options which Joomla predefines for you, so that you just have to obtain their value within `doExecute()`, eg:

```php
$verbose = $input->getOption('verbose');
```

## getSynopsis()
This function returns a string explaining the usage of the command, and you can obtain the short or the long version:

```php
$shortSynopsis = $this->getSynopsis(true);
$longSynopsis = $this->getSynopsis(false);
```

In this example plugin it's been included within the help text in `setHelp()`, so you can see it when you do 

```
php cli/joomla.cli sql:execute-file -h
```

Note how it matches the "Usage:" section at the top of the help output.

# Plugin Code
This section contains the full source code for the console plugin. You can write the plugin manually by copying the code below, or you can download the zip file from [Download Console Plugin Sqlfile](./_assets/plg_console_sqlfile.zip). If you're writing it manually then include the following files in a folder eg `plg_console_sqlfile`.

As described [here](basic-content-plugin.md), there are a number of things you need to ensure are consistent across your source code files when you're developing plugins. That example also includes how to use language files to make your plugin language-independent. For simplicity this console plugin example supports only English. 

## Manifest File

```xml title="plg_console_sqlfile/sqlfile_cli.xml"
<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="console" method="upgrade">
	<name>Execute SQL file console command</name>
	<version>1.0.0</version>
	<creationDate>today</creationDate>
	<author>Me</author>
	<description>Executes a file of SQL commands (eg for an upgrade)</description>
	<namespace path="src">My\Plugin\Console\Sqlfile</namespace>
	<files>
		<folder plugin="sqlfile_cli">services</folder>
		<folder>src</folder>
	</files>
    <config>
		<fields name="params">
			<fieldset name="basic">
                <field
					name="txn"
					type="list"
					label="Use Transaction Control?"
					default="1"
				>
                    <option value="0">JNO</option>
                    <option value="1">JYES</option>
                </field>
			</fieldset>
		</fields>
	</config>
</extension>
```

## Service provider file
The `services/provider.php` file is fairly standard boilerplate code for instantiating the plugin via the Dependency Injection Container; you just need to code correctly the 3 lines which relate to your plugin, plus the Application is injected as it's accessed within the console plugin code. 

```php title="plg_console_sqlfile/services/provider.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\CMS\Factory;
use Joomla\Event\DispatcherInterface;
use My\Plugin\Console\Sqlfile\Extension\SqlfileConsolePlugin;

return new class implements ServiceProviderInterface
{
    /**
     * Registers the service provider with a DI container.
     *
     * @param   Container  $container  The DI container.
     *
     * @return  void
     *
     * @since   4.2.0
     */
    public function register(Container $container)
    {
        $container->set(
            PluginInterface::class,
            function (Container $container) {
                $dispatcher = $container->get(DispatcherInterface::class);
                $plugin     = new SqlfileConsolePlugin(
                    $dispatcher,
                    (array) PluginHelper::getPlugin('console', 'sqlfile_cli')
                );
                $plugin->setApplication(Factory::getApplication());

                return $plugin;
            }
        );
    }
};
```

## Console Plugin file
The file below handles the interaction with the Joomla plugin framework:

```php title="plg_console_sqlfile/src/Extension/SqlfileConsolePlugin.php"
<?php
namespace My\Plugin\Console\Sqlfile\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use Joomla\Application\ApplicationEvents;
use Joomla\CMS\Factory;
use My\Plugin\Console\Sqlfile\CliCommand\RunSqlfileCommand;

class SqlfileConsolePlugin extends CMSPlugin implements SubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            \Joomla\Application\ApplicationEvents::BEFORE_EXECUTE => 'registerCommands',
        ];
    }

    public function registerCommands(): void
    {
        $myCommand = new RunSqlfileCommand();
        $myCommand->setParams($this->params);
        $this->getApplication()->addCommand($myCommand);
    }
}
```

## Command file
The file below handles the execution of the `sql:execute-file` command.

```php title="plg_console_sqlfile/src/CliCommand/RunSqlfileCommand.php"
<?php
namespace My\Plugin\Console\Sqlfile\CliCommand;

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\Database\DatabaseInterface;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Joomla\Console\Command\AbstractCommand;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Installer\Installer;
use Joomla\CMS\Filesystem\File;

class RunSqlfileCommand extends AbstractCommand
{
	/**
	 * The default command name
	 *
	 * @var    string
	 * @since  4.0.0
	 */
	protected static $defaultName = 'sql:execute-file';
    
    /**
     * The params associated with the plugin, plus getter and setter
     * These are injected into this class by the plugin instance
     */
    protected $params;
    
    protected function getParams() {
        return $this->params;
    }
    
    public function setParams($params) {
        $this->params = $params;
    }

	/**
	 * Internal function to execute the command.
	 *
	 * @param   InputInterface   $input   The input to inject into the command.
	 * @param   OutputInterface  $output  The output to inject into the command.
	 *
	 * @return  integer  The command exit code
	 *
	 * @since   4.0.0
	 */
	protected function doExecute(InputInterface $input, OutputInterface $output): int
	{
		$symfonyStyle = new SymfonyStyle($input, $output);

		$symfonyStyle->title('Run a SQL file');
        
        // get the file of joomla sql statements, as an argument to the command
        $sqlfile = $input->getArgument('sqlfile');
        if (!file_exists($sqlfile)) {
            $symfonyStyle->error("{$sqlfile} does not exist");
            return false;
        }
        
        // get the file to log the actual sql statements, as an option to the command
        if ($logging = $input->getOption("logfile")) {
            $config = Factory::getApplication()->getConfig();
            $logpath = Factory::getApplication()->get('log_path', JPATH_ADMINISTRATOR . '/logs');
            // some users might enter an = after the "-l" option; if so we need to remove it
            $logfile = $logpath . '/' . ltrim($logging, "=");
        }
        
        // this is a standard option configured by Joomla
        $verbose = $input->getOption('verbose');
		
        // read the sql file into a buffer
        $buffer = file_get_contents($sqlfile);
        if ($buffer === false) {
            $symfonyStyle->error("Could not read contents of {$sqlfile}");
            return false;
        }
        
        // We reuse code from the Joomla install process in libraries/src/Installer/Installer.php
        $queries = Installer::splitSql($buffer);
        if (\count($queries) === 0) {
            $symfonyStyle->error("No SQL queries found in {$sqlfile}");
            return false;
        }

        $db = Factory::getContainer()->get(DatabaseInterface::class);
        
        // Get the plugin param defining whether we should use transaction control or not
        // Of course, some sql statements such as CREATE TABLE have implicit commits;
        // the code below doesn't really handle that situation.
        $transactionControl = $this->getParams()->get('txn', 1);
        if ($transactionControl) {
            $db->transactionStart();
        }
        
        foreach ($queries as $query) {

            try {
                if ($verbose) {
                    $symfonyStyle->info("Executing: \n{$query}");
                }
                $db->setQuery($query)->execute();
                $statement = $db->replacePrefix((string) $query);
                if ($logging) {
                    if (!File::append($logfile, $statement . "\n")) {
                        throw new \RuntimeException('Cannot write to log file.');
                    }
                }
                if ($verbose) {
                    $symfonyStyle->success(Text::_('Success'));
                }
            } catch (ExecutionFailureException $e) {
                if ($transactionControl) {
                    $db->transactionRollback();
                    $symfonyStyle->info("Rolling back database\n");
                }
                $symfonyStyle->warning($e->getMessage());
                return 2;  // or whatever error code you want to set
            }
        }
        if ($transactionControl) {
            $db->transactionCommit();
        }
        $symfonyStyle->success(\count($queries) . " SQL queries executed from {$sqlfile}");

		return 0;
	}

	/**
	 * Configure the command.
	 *
	 * @return  void
	 *
	 * @since   4.0.0
	 */
	protected function configure(): void
	{
		$this->addArgument('sqlfile', InputArgument::REQUIRED, 'file of joomla sql commands', null);
        $this->addOption('logfile', "l", InputOption::VALUE_REQUIRED, "log file");
        $this->setDescription('Run a list of SQL commands in a file.');
        $shortSynopsis = $this->getSynopsis(true);
		$this->setHelp(
			<<<EOF
The <info>%command.name%</info> command runs the SQL commands in the file passed as the --sqlfile argument
<info>php %command.full_name%</info>
Usage: {$shortSynopsis}
EOF
		);
	}
}
```

## Installation and Execution
Generate a zip file from the folder and install the plugin in the usual way. Remember to enable the plugin!

Then in a terminal session navigate to the top level of your Joomla instance and enter:

```
php cli/joomla.php 
```

You should see the `sql:execute-file` listed, together with the descriptive text you specified in the `$this->setDescription()` call in your command class `configure()` method. 

If you list the help text:

```
php cli/joomla.php sql:execute-file -h
```

then you should see your sqlfile argument and your logging option, plus the help text (including the synopsis) specified in the `$this->setHelp()` call in your `configure()` method. 

To test the functionality you can create a file in your cli directory of SQL statements, eg:

```sql title="cli/test.sql"
CREATE TABLE IF NOT EXISTS `#__temp_table` (
  `s` VARCHAR(255) NOT NULL DEFAULT '',
  `i` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`i`)
);
INSERT INTO `#__temp_table` (`s`, `i`) VALUES ('Hello', 22),('there', 23);
```

and then run the application, eg:

```
php cli/joomla.php sql:execute-file cli/test.sql --logfile=test.log -v
```

The SQL statements should be shown, together with success or fail for each. The log file will be created in your Joomla instance's log folder, by default administrator/logs.

If you run the command again then the SQL INSERT statement will fail, because of the unique index on the `i` column.

You can also experiment with setting the Transaction Control param eg to check the database rollback in the event of errors (although databases don't offer transaction control on SQL CREATE TABLE statements).