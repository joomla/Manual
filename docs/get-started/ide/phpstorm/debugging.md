Debugging
========

## Using MAMP and Xdebug

This section shows you on how to set up your environment in MAMP and PHPStorm to debug your Joomla! extensions.
It is assumed that PHPStorm is in the current version and that you have a local Joomla! installation in which your
extension is already installed.

### Enable Xdebugger in MAMP (Pro)

In MAMP open the Settings and switch to the Languages page. Select the PHP Tab and make sure that Xdebug is ticked in
the Extensions section.

![MAMP PHP Language Settings](./assets/mamp_language_settings.png)

### Add IDE Key to your php.ini

Edit php.ini Template inside MAMP, search for the xdebug section and add:

```
xdebug.idekey=PHPSTORM
```

![MAMP PHP INI Settings](./assets/php_ini_setup.png)

Hint: Use `Ctrl` + `F` and search for "xdebug"

:::note

After you have changed some settings make sure to save & restart your MAMP Server.

:::

### Check PHP Configuration in your Joomla! Installation

Check in the PHP Settings in your Joomla! Backend in `System` > `System Information` > `PHP
Information` and make sure that the Section for Xdebug is visible:

![Joomla! PHP Information](./assets/xdebug_top.jpg)

### Install Xdebug Browser Extension

Install a Xdebug Extension of your choice in your Browser. Search for Xdebug in your Browser's Extensions Dictionary
and enable the Plugin - Check your Browser's Guide on how to install Plugins. Please note: An installation may require
a Browser restart.

### Setting up Environments in PHPStorm

Mostly you will write your Code in its own Project Folder but when using Joomla! The project will be zipped / installed
or deployed from inside your IDE into to your Joomla Dev Environment. Which means you cannot use debugger directly
inside the Project where you write your extension code (because it is not the file which will be run by Joomla!
normally).

So beside your extension development project in PHPStorm open or create a new Project for Debugging inside your local
Joomla! Installation. This Project should point to the Joomla! Main directory of your local Joomla! Installation. So in
PHPStorm click on `File` > `New Project form Existing Files`and select your Joomla! Installation. PHPStorm may asks you
if you would like to Trust this Folder, confirm that request.

### Configure PHPStorm Debugger

In this new Project select `Run` from the Main Menu and Select `Edit Configurations`.

![Edit Configurations Menu](./assets/run_edit_configurations.png)

This will open a new window where you can add configruations.

![Empty remote debug](./assets/empty_run_debug_config.png)

Click on `Add new` here you can then add a new `PHP Remote Debug` Configuration.

![Select remote debug](./assets/select_php_remote_debug.png)

Name the Configuration as you like but for example "MAMP" (default is Unnamed).
Tick the option `Filter debug connection by IDE Key` and click on the Button with the three dots beside the Server
Selection.

![Select remote debug](./assets/start_configuration.png)

This will open a new PopUp window to set up the server settings. Enter here your MAMP's Server Information based on your
MAMP Settings.
The name can be "MAMP Server" or whatever you like. By Default MAMP Server's are running on Port 8890 use the Port of
your Server here. In this case here the Joomla! Installation is available on the URL `https://joomla5.local:8890` so the
Host Name is `joomla5.local`. Set now the Hostname and Port based on your configuration.
Click on Apply and OK to close the window. Your Server Configuration should now already be selected, set now your IDE
key based on entry in the php.ini file See: [Add IDE Key to your PHP INI](#add-ide-key-to-your-phpini).

![Enter IDE Key](./assets/edit_mamp_server_settings_phpstorm.png)

:::note

The IDE Key is not Case Sensitive but its recommended to write it here exactly the same way as defined in php.ini

:::

Make sure the "Activate tool window" option is ticked then click on Apply & OK

### Set Breakpoint in Code

In our example the latest version of the extension we want to develop is already installed in our local Joomla!
Environment so in our Project we search for the file we want to debug and add a breakpoint to the row we want to debug.

[Learn here how to set Breakpoints](https://www.jetbrains.com/help/phpstorm/using-breakpoints.html#set-breakpoints)

![Breakpoint set](./assets/add_breakpoint.png)

Now we can either Click on `Run` from the PHPStorm Main Menu and then on `Start listening for PHP Debug Connections` or
simply click the `Bug Icon` in the Main Window of the Project to let PHPStorm listen.

### Enable Debug in your Browser

Now we simply need to open our page in your Browser where your Extension gets loaded. Make sure the Debugger Plugin is
active and running in your Browser.

![Debugger in Browser](./assets/enable_debug_inBrowser.png)

When visiting the page you will notice that the site won't get loaded. But PHPStorm jumps in front showing you the Debug
console where you will find the available Variables and its content in the Debugging Console.

![Debugging Console in PHPStorm](./assets/debug_console.png)






















