---
title: Filesystem Plugin - FTP
sidebar_position: 7
---
This plugin builds on the [basic filesystem plugin](filesystem-plugin-basic.md) to demonstrate how you can enable Joomla to use a media filesystem which is not within the local filestore. In this case we develop a plugin which enables the media filestore to be accessed via FTP.

# Writing an FTP Filesystem Plugin
To write an FTP Filesystem plugin you need to provide 2 classes:
1. The Provider class, which implements `Joomla\Component\Media\Administrator\Provider\ProviderInterface` in administrator/components/com_media/src/Provider/ProviderInterface.php. This is straightforward, and you just copy the approach of the Local Filesystem plugin in plugins/filesystem/local/src/Extension/Local.php. The main plugin (Extension) class doubles as the Provider class.
2. The Adapter class, which implements `Joomla\Component\Media\Administrator\Adapter\AdapterInterface` in administrator/components/com_media/src/Adapter/AdapterInterface.php. This is where the bulk of the work lies, as you have to map the various types of file operations to ftp calls. The set of PHP ftp functions available to you is listed in [FTP Functions](https://www.php.net/manual/en/ref.ftp.php).

## Testing
To test the FTP aspects you need to install an FTP server on your local machine. I used [Filezilla](https://filezilla-project.org/) to test the filesystem plugin code below, but note that there can be interface differences between different FTP server implementations. In particular, the PHP function `ftp_mlsd` may not be available and you will need to use `ftp_nlist` or `ftp_rawlist` instead.
On Filezilla I configured a test user, and a mount point which mapped `/shared` to a folder on my PC. As these details need to be known by the plugin, they're set as plugin config parameters defined in the XML manifest file:
- host: I used localhost
- username: username of the user on the FTP server
- password: password of the user on the FTP server
- ftproot: virtual path of the mount point; I used "shared"

I found it useful to write a small PHP program which enabled me to see the results of calling the various ftp functions.
## FTP Connection
You have to open and close the FTP connection on each HTTP request, as the connection may time out if you try and leave it open between HTTP requests. In this filesystem plugin code the opening and user login is done in the constructor, and the closing in the destructor.

```php
public function __construct(string $ftp_server, string $ftp_username, string $ftp_password, string $ftp_root, string $url_root)
{
    ...
    if (!$this->ftp_connection = @ftp_connect($this->ftp_server)) {
        ...
    }
    if (!@ftp_login($this->ftp_connection, $this->ftp_username, $this->ftp_password)) {
        ...
    }
}

public function __destruct()
{
    if ($this->ftp_connection) {
        @ftp_close($this->ftp_connection);
    }
}

```
## URLs
If you're wanting to include your media on your front-end web site, then you will need to provide URLs to enable visitors to access them, and you do this via the `getUrl()` function of your adapter. You have 2 possibilities:
- if you have a web server on the same server as your ftp server, and if the ftp directory is accessible from the web server, then you can just form the URL related to this web server.
- otherwise you will have to copy the file down from the ftp server and store it in a local directory, and form the URL related to the local file.

In the filesystem plugin code both options are coded, and you select which option to use by configuring the plugin parameter "urlroot":
- if you provide a value for "urlroot" then the code forms the URL from it and the passed-in `$path` parameter
- if you don't provide a value then the code downloads the file and stores it in the Joomla /tmp directory, using a hash of the filename to form the name of the temporary file, and generates the associated URL. (The xxh3 hash used requires at least PHP 8.1, but you can easily [change this](https://www.php.net/manual/en/function.hash-algos.php)). 

```php
public function getUrl(string $path): string
{
    ...
    if ($this->url_root) {
        return $this->url_root . $path;
    } else {
        $hash = hash("xxh3", $path);
        $local_filename = JPATH_ROOT . '/tmp/' . $hash . '.tmp';
        if (file_exists($local_filename)) {
            return Uri::root() . 'tmp/' . $hash . '.tmp';
        } else {
            if (!@ftp_get($this->ftp_connection, $local_filename, $this->ftp_root . $path)) {
                ...
            }
            return Uri::root() . 'tmp/' . $hash . '.tmp';
        }
    }
}

```

To avoid repeatedly downloading the file the code checks if the file is already present in the /tmp directory. Of course, this won't work in a production environment as the file contents may be changed on the ftp server, but you could improve this approach to build some cacheing capability. 
## File or Directory?
Much of the complexity in several functions (eg `getFile`, `getFiles`) arises because you have to determine whether it's a file or a directory which has been passed as a `$path`. The strategy in the code is to call `ftp_mlsd` on the parent directory and try to match the filename in the results returned. An alternative approach would be to try `ftp_chdir` on the `$path`and see if that works or not. 
## Error handling
The filesystem plugin code reports errors using the Joomla logging mechanism, so you need to have that enabled via the Joomla global configuration.

```php
Log::add("FTP can't connect: {$message}", Log::ERROR, 'ftp');
```

If there's an error performing a file operation on the FTP server then by default you get a PHP warning in the associated `ftp_xxx` function. This will appear in an HTTP response, and will mess up the JSON response to the Ajax request. 

So instead we suppress PHP warnings by 
- using `@ftp_xxx` instead (the PHP [Error Suppression Operator](https://www.php.net/manual/en/language.operators.errorcontrol.php))
- getting the error message via [`error_get_last()`](https://www.php.net/manual/en/function.error-get-last.php)
- throwing an exception, including the error message retrieved from `error_get_last()`. `com_media` will catch the exception and relay it in the message in the JSON response.

An exception for this is where you use `ftp_mlsd()` on an empty directory, and for which `FileNotFoundException` is thrown in `getFile` and an empty array in `getFiles`.

If you attempt to delete a directory which is not empty or rename a directory which contains a subdirectory then the Filezilla FTP server may return an error, but the error messages are rather misleading:
- ftp_rmdir(): This function is not supported on this system. 
- ftp_rename(): Permission denied 

Also, you may find a Joomla error reported "The account was not found". You can circumvent this by using your browser's dev tools to clear the session storage and local storage. (This was due to an early bug in the media manager, which was fixed, but still appears on rare occasions).
## Not implemented
### Thumbnails
The code does not implement [thumbnails](https://en.wikipedia.org/wiki/Thumbnail). To implement this functionality you should fit your thumbnails into 200 x 200 pixels, and you will need to provide URLs for them as described above, and return the URL in the `thumb_path` field of the object returned in `getFile` and `getFiles`. (Note that the comments before these functions in the AdapterInterface.php file are not complete, and you should compare what's written in the code of the Joomla local adapter plugin).
### Mime Types
The code includes a map from file extension to mime type, but only for a few extensions. You can find better lists online, eg [here](https://github.com/ralouphie/mimey). If the media type isn't an image then the media manager uses the mime type to determine the icon to display, so you need to set it to something which the media manager will recognise.
### Uploading Files
Obviously you need to be very careful when uploading files from the internet to avoid hackers uploading malware. You need to make the code below more robust, eg checking the filename more rigorously and using `MediaHelper::canUpload()`.
### Search
The `search()` function has not been implemented. Although you could form a GET request which would result in it being called, this doesn't seem to be initiated by media-manager.js (which implements its own search functionality). 
### Joomla API
The functionality hasn't been tested using HTTP requests to the Joomla API. 

# Plugin Source Code
You can copy the source code below into a directory `plg_filesystem_ftp`, or download the complete plugin from [download FTP filesystem plugin](./_assets/plg_filesystem_ftp.zip).

Once installed, remember to enable the plugin! You also need to run your local FTP server, and configure the plugin with details of your FTP server.

## Manifest File

```php title="plg_filesystem_ftp/ftp.xml"
<?xml version="1.0" encoding="UTF-8"?>
<extension type="plugin" group="filesystem" method="upgrade">
    <name>plg_filesystem_ftp</name>
    <author>me</author>
    <creationDate>today</creationDate>
    <version>1.0.0</version>
    <description>My ftp filesystem</description>
    <namespace path="src">My\Plugin\Filesystem\Ftp</namespace>
    <files>
        <folder plugin="ftp">services</folder>
        <folder>src</folder>
    </files>
    <config>
        <fields name="params">
            <fieldset name="basic">
                <field 
                    name="host"
                    type="text"
                    label="FTP server host"
                    default=""
                >
                </field>
                <field 
                    name="username"
                    type="text"
                    label="FTP username"
                    default=""
                >
                </field>
                <field 
                    name="password"
                    type="text"
                    label="FTP password"
                    default=""
                >
                </field>
                <field 
                    name="ftproot"
                    type="text"
                    label="FTP mount point root"
                    default=""
                >
                </field>
                <field 
                    name="urlroot"
                    type="text"
                    label="Base URL of FTP server directory"
                    default=""
                >
                </field>
            </fieldset>
        </fields>
    </config>
</extension>

```

## Service Provider File
This is boilerplate code for instantiating the plugin via the Joomla Dependency Injection Container.

```php title="plg_filesystem_ftp/services/provider.php"
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Event\DispatcherInterface;
use My\Plugin\Filesystem\Ftp\Extension\Ftp;

return new class () implements ServiceProviderInterface {

    public function register(Container $container)
    {
        $container->set(
            PluginInterface::class,
            function (Container $container) {
                $dispatcher = $container->get(DispatcherInterface::class);
                $plugin = new Ftp(
                    $dispatcher,
                    (array) PluginHelper::getPlugin('filesystem', 'ftp')
                );
                $plugin->setApplication(Factory::getApplication());

                return $plugin;
            }
        );
    }
};
```

## Plugin / Provider class
This has been adapted from the equivalent class in the Joomla Local filesystem plugin.

```php title="plg_filesystem_ftp/src/Extension/Ftp.php"
<?php
namespace My\Plugin\Filesystem\Ftp\Extension;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Component\Media\Administrator\Event\MediaProviderEvent;
use Joomla\Component\Media\Administrator\Provider\ProviderInterface;
use Joomla\Event\DispatcherInterface;
use My\Plugin\Filesystem\Ftp\Adapter\FtpAdapter;
use Joomla\CMS\Factory; 

\defined('_JEXEC') or die;

final class Ftp extends CMSPlugin implements ProviderInterface
{
    
    public static function getSubscribedEvents(): array {
        return [
            'onSetupProviders' => 'onSetupProviders',
        ];
    }
    
    /**
     * Setup Providers for FTP Adapter
     *
     * @param   MediaProviderEvent  $event  Event for ProviderManager
     *
     * @return   void
     *
     * @since    4.0.0
     */
    public function onSetupProviders(MediaProviderEvent $event)
    {
        $event->getProviderManager()->registerProvider($this);
    }

    /**
     * Returns the ID of the provider
     *
     * @return  string
     *
     * @since  4.0.0
     */
    public function getID()
    {
        return $this->_name; // from "element" field of plugin's record in extensions table
    }

    /**
     * Returns the display name of the provider
     *
     * @return string
     *
     * @since  4.0.0
     */
    public function getDisplayName()
    {
        return 'Remote FTP';
    }

    /**
     * Returns and array of adapters
     *
     * @return  \Joomla\Component\Media\Administrator\Adapter\AdapterInterface[]
     *
     * @since  4.0.0
     */
    public function getAdapters()
    {
        $adapters    = [];
        $ftp_server = $this->params->get('server', '');
        $ftp_username = $this->params->get('username', '');
        $ftp_password = $this->params->get('password', '');
        $ftp_root = $this->params->get('ftproot', '');
        $url_root = $this->params->get('urlroot', '');

        $adapter = new FtpAdapter($ftp_server, $ftp_username, $ftp_password, $ftp_root, $url_root);

        $adapters[$adapter->getAdapterName()] = $adapter;

        return $adapters;
    }
}
```

## Adapter Class
This is where all the work happens! There's clearly overlap between the code in `getFile` and `getFiles`, but the code has been left like this to make it easier to appreciate what each function has to do.

```php title="plg_filesystem_ftp/src/Adapter/FtpAdapter.php"
<?php

namespace My\Plugin\Filesystem\Ftp\Adapter;

use Joomla\CMS\Filesystem\File;
use Joomla\CMS\String\PunycodeHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;
use Joomla\Component\Media\Administrator\Adapter\AdapterInterface;
use Joomla\Component\Media\Administrator\Exception\FileNotFoundException;
use Joomla\CMS\Log\Log;

\defined('_JEXEC') or die;

class FtpAdapter implements AdapterInterface
{
    // Incomplete mapping of file extension to mime type
    static $mapper = array(
        '.avi' => 'video/avi',
        '.bmp' => 'image/bmp',
        '.gif' => 'image/gif',
        '.jpeg' => 'image/jpeg',
        '.jpg' => 'image/jpeg',
        '.mp3' => 'audio/mpeg',
        '.mp4' => 'video/mp4',
        '.mpeg' => 'video/mpeg',
        '.pdf' => 'application/pdf',
        '.png' => 'image/png',
    );
    
    // Configuration from the plugin parameters
    private $ftp_server = "";
    private $ftp_username = "";
    private $ftp_password = "";
    private $ftp_root = "";
    private $url_root = "";
    
    // ftp connection
    private $ftp_connection = null; 
    
    public function __construct(string $ftp_server, string $ftp_username, string $ftp_password, string $ftp_root, string $url_root)
    {
        $this->ftp_server = $ftp_server;
        $this->ftp_username = $ftp_username;
        $this->ftp_password = $ftp_password;
        $this->ftp_root = $ftp_root;
        $this->url_root = $url_root;
        
        if (!$this->ftp_connection = @ftp_connect($this->ftp_server)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP can't connect: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }
        if (!@ftp_login($this->ftp_connection, $this->ftp_username, $this->ftp_password)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP can't login: {$message}", Log::ERROR, 'ftp');
            @ftp_close($this->ftp_connection);
            $this->ftp_connection = null;
            throw new \Exception($message);
        }
    }
    
    public function __destruct()
    {
        if ($this->ftp_connection) {
            @ftp_close($this->ftp_connection);
        }
    }

    /**
     * This is the comment from the LocalAdapter interface - but it's not complete!
     *
     * Returns the requested file or folder. The returned object
     * has the following properties available:
     * - type:          The type can be file or dir
     * - name:          The name of the file
     * - path:          The relative path to the root
     * - extension:     The file extension
     * - size:          The size of the file
     * - create_date:   The date created
     * - modified_date: The date modified
     * - mime_type:     The mime type
     * - width:         The width, when available
     * - height:        The height, when available
     *
     * If the path doesn't exist a FileNotFoundException is thrown.
     *
     * @param   string  $path  The path to the file or folder
     *
     * @return  \stdClass
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function getFile(string $path = '/'): \stdClass
    {
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }

        // To get the file details we need to run mlsd on the directory
        $slash = strrpos($path, '/');
        if ($slash === false) {
            Log::add("FTP unexpectedly no slash in path {$path}", Log::ERROR, 'ftp');
            return [];
        }
        if ($slash) {
            $directory = substr($path, 0, $slash);
            $filename = substr($path, $slash + 1);
        } else {   // it's the top level directory
            $directory = "";
            $filename = substr($path, 1);
        }
        
        if (!$files = ftp_mlsd($this->ftp_connection, $this->ftp_root . $directory)) {
            throw new FileNotFoundException();
        }
        
        foreach ($files as $file) {
            if ($file['name'] == $filename) {
                $obj = new \stdClass();
                $obj->type = $file['type'];
                $obj->name = $file['name'];
                $obj->path = $path;    
                $obj->extension = $file['type'] == 'file' ? File::getExt($obj->name) : '';
                $obj->size = $file['type'] == 'file' ? intval($file['size']) : '';
                $obj->create_date = $this->convertDate($file['modify']);
                $obj->create_date_formatted = $obj->create_date;
                $obj->modified_date = $obj->create_date;
                $obj->modified_date_formatted = $obj->create_date_formatted;
                $obj->mime_type = $file['type'] == 'file' ? $this->extension_mime_mapper(strrchr($file['name'], ".")) : "directory";
                if ($obj->mime_type == 'image/png' || $obj->mime_type == 'image/jpeg') {
                    $obj->thumb_path = Uri::root() . "images/powered_by.png";
                }
                $obj->width     = 0;
                $obj->height    = 0;
                
                return $obj;
            }
        }

        throw new FileNotFoundException();
    }

    /**
     * Returns the folders and files for the given path. The returned objects
     * have the following properties available:
     * - type:          The type can be file or dir
     * - name:          The name of the file
     * - path:          The relative path to the root
     * - extension:     The file extension
     * - size:          The size of the file
     * - create_date:   The date created
     * - modified_date: The date modified
     * - mime_type:     The mime type
     * - width:         The width, when available
     * - height:        The height, when available
     *
     * If the path doesn't exist a FileNotFoundException is thrown.
     *
     * @param   string  $path  The folder
     *
     * @return  \stdClass[]
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function getFiles(string $path = '/'): array
    {
        // This can be called with a folder or a file, eg
        // $path = '/' is the top level folder
        // $path = '/sub' is the folder sub under the top level
        // $path = '/fname.png' is a file in the top level folder
        // $path = '/sub/fname.jpg' is a file in the sub folder
        
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }
        
        $result = [];
        $requestedDirectory = "";
        $pathPrefix = "";

        if ($path == '/') {
            $requestedDirectory = $this->ftp_root;
            $pathPrefix = "";
        } else {
            $slash = strrpos($path, '/');
            if ($slash === false) {
                Log::add("FTP unexpectedly no slash in path {$path}", Log::ERROR, 'ftp');
                return [];
            }
            $parentDirectory = $this->ftp_root . substr($path, 0, $slash);
            $filename = substr($path, $slash + 1);
            
            // run mlsd and try to match on the filename, to determine if it's a file or directory
            if (!$files = ftp_mlsd($this->ftp_connection, $parentDirectory)) {
                return [];
            }
            
            foreach ($files as $file) {
                if ($file['name'] == $filename) {
                    // it's a file, just get the file details and return them
                    if ($file['type'] == 'file') {
                        $obj = new \stdClass();
                        $obj->type = $file['type'];
                        $obj->name = $file['name'];
                        $obj->path = $path;
                        $obj->extension = $file['type'] == 'file' ? File::getExt($obj->name) : '';
                        $obj->size = $file['type'] == 'file' ? intval($file['size']) : '';
                        $obj->create_date = $this->convertDate($file['modify']);
                        $obj->create_date_formatted = $obj->create_date;
                        $obj->modified_date = $obj->create_date;
                        $obj->modified_date_formatted = $obj->create_date_formatted;
                        $obj->mime_type = $file['type'] == 'file' ? $this->extension_mime_mapper(strrchr($file['name'], ".")) : "directory";
                        if ($obj->mime_type == 'image/png' || $obj->mime_type == 'image/jpeg') {
                            $obj->thumb_path = Uri::root() . "images/powered_by.png";
                        }
                        $obj->width     = 0;
                        $obj->height    = 0;
                        
                        $results[] = $obj;
                        return $results;
                    } else {
                        $requestedDirectory = $this->ftp_root . $path;
                        $pathPrefix = $path;
                        break;   // it was a directory
                    }
                }
            }
        }
        
        // need to run mlsd again, this time on the requested directory
        if (!$files = ftp_mlsd($this->ftp_connection, $requestedDirectory)) {
            return [];
        }
        foreach ($files as $file) {
            $obj = new \stdClass();
            $obj->type = $file['type'];
            $obj->name = $file['name'];
            $obj->path = $pathPrefix . '/' . $file['name'];    
            $obj->extension = $file['type'] == 'file' ? File::getExt($obj->name) : '';
            $obj->size = $file['type'] == 'file' ? intval($file['size']) : '';
            $obj->create_date = $this->convertDate($file['modify']);
            $obj->create_date_formatted = $obj->create_date;
            $obj->modified_date = $obj->create_date;
            $obj->modified_date_formatted = $obj->create_date_formatted;
            $obj->mime_type = $file['type'] == 'file' ? $this->extension_mime_mapper(strrchr($file['name'], ".")) : "directory";
            if ($obj->mime_type == 'image/png' || $obj->mime_type == 'image/jpeg') {
                $obj->thumb_path = Uri::root() . "images/powered_by.png";
            }
            $obj->width     = 0;
            $obj->height    = 0;
            
            $results[] = $obj;
        }
        return $results;
    }
    
    function convertDate($date_string) {
        $d = date_parse_from_format("YmdHis\.v", $date_string);
        $date_formatted = sprintf("%04d-%02d-%02d %02d:%02d", $d['year'], $d['month'], $d['day'], $d['hour'], $d['minute']);
        return $date_formatted;
    }
    
    function extension_mime_mapper($extension) {
        if (array_key_exists($extension, self::$mapper)) {
            return self::$mapper[$extension];
        } else {
            return 'application/octet-stream';
        }
    }

    /**
     * Returns a resource to download the path.
     *
     * @param   string  $path  The path to download
     *
     * @return  resource
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function getResource(string $path)
    {
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }
        
        // write the data to PHP://temp stream
        $handle = fopen('php://temp', 'w+');
        
        if (!@ftp_fget($this->ftp_connection, $handle, $this->ftp_root . $path)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP can't get file {$path}: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }
        rewind($handle);

        return $handle;
    }

    /**
     * Creates a folder with the given name in the given path.
     *
     * It returns the new folder name. This allows the implementation
     * classes to normalise the file name.
     *
     * @param   string  $name  The name
     * @param   string  $path  The folder
     *
     * @return  string
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function createFolder(string $name, string $path): string
    {

        $name = $this->getSafeName($name);
        
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }

        $directory = $this->ftp_root . $path . '/' . $name;

        if (!@ftp_mkdir($this->ftp_connection, $directory)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP error on mkdir {$directory}: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }

        return $name;
    }

    /**
     * Creates a file with the given name in the given path with the data.
     *
     * It returns the new file name. This allows the implementation
     * classes to normalise the file name.
     *
     * @param   string  $name  The name
     * @param   string  $path  The folder
     * @param   string  $data  The data
     *
     * @return  string
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function createFile(string $name, string $path, $data): string
    {
        $name = $this->getSafeName($name);
        $remote_filename = $this->ftp_root . $path . '/' . $name;
        
        // write the data to PHP://temp stream
        $handle = fopen('php://temp', 'w+');
        fwrite($handle, $data);
        rewind($handle);

        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }

        if (!@ftp_fput($this->ftp_connection, $remote_filename, $handle, FTP_BINARY)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP can't create file {$remote_filename}: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }
        fclose($handle);

        return $name;
    }

    /**
     * Updates the file with the given name in the given path with the data.
     *
     * @param   string  $name  The name
     * @param   string  $path  The folder
     * @param   string  $data  The data
     *
     * @return  void
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function updateFile(string $name, string $path, $data)
    {
        $name = $this->getSafeName($name);
        $remote_filename = $this->ftp_root . $path . '/' . $name;
        
        // write the data to PHP://temp stream
        $handle = fopen('php://temp', 'w+');
        fwrite($handle, $data);
        rewind($handle);

        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }

        ftp_pasv($this->ftp_connection, true);   // may not be necessary
        
        if (!@ftp_fput($this->ftp_connection, $remote_filename, $handle, FTP_BINARY)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP can't create file {$remote_filename}: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }
        fclose($handle);

        return;
    }

    /**
     * Deletes the folder or file of the given path.
     *
     * @param   string  $path  The path to the file or folder
     *
     * @return  void
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function delete(string $path)
    {
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }

        // We have to find if this is a file or if it's a directory.
        // So we split the directory path from the filename and then call mlsd on the directory
        $slash = strrpos($path, '/');
        if ($slash === false) {
            Log::add("FTP delete: unexpectedly no slash in path {$path}", Log::ERROR, 'ftp');
            return [];
        }
        $directory = substr($path, 0, $slash);
        $filename = substr($path, $slash + 1);
        
        if (!$files = ftp_mlsd($this->ftp_connection, $this->ftp_root . $directory)) {
            Log::add("Can't delete non-existent file {$path}", Log::ERROR, 'ftp');
            return;
        }
        
        // Go through the files in the folder looking for a match with a file or directory
        foreach ($files as $file) {
            if ($file['name'] == $filename) {
                if ($file['type'] == 'file') {
                    if (!$result = @ftp_delete($this->ftp_connection, $this->ftp_root . $path)) {
                        $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
                        Log::add("Unable to delete file {$path}: {$message}", Log::ERROR, 'ftp');
                        throw new \Exception($message);
                    }
                } else {
                    if (!$result = @ftp_rmdir($this->ftp_connection, $this->ftp_root . $path)) {
                        $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
                        Log::add("Unable to delete directory {$path}: {$message}", Log::ERROR, 'ftp');
                        throw new \Exception($message);
                    }
                }
                return;
            }
        }
    }

    /**
     * Copies a file or folder from source to destination.
     *
     * It returns the new destination path. This allows the implementation
     * classes to normalise the file name.
     *
     * @param   string  $sourcePath       The source path
     * @param   string  $destinationPath  The destination path
     * @param   bool    $force            Force to overwrite
     *
     * @return  string
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function copy(string $sourcePath, string $destinationPath, bool $force = false): string
    {
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }

        // copy the data of the source file down into PHP://temp stream
        $handle = fopen('php://temp', 'w+');
        if (!@ftp_fget($this->ftp_connection, $handle, $this->ftp_root . $sourcePath)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP can't get file {$sourcePath} for copying: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }
        rewind($handle);
        
        // copy from the temp stream up to the destination
        if (!@ftp_fput($this->ftp_connection, $this->ftp_root . $destinationPath, $handle)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("FTP can't copy to file {$destinationPath}: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }
        fclose($handle);

        return $destinationPath;
    }

    /**
     * Moves a file or folder from source to destination.
     *
     * It returns the new destination path. This allows the implementation
     * classes to normalise the file name.
     *
     * @param   string  $sourcePath       The source path
     * @param   string  $destinationPath  The destination path
     * @param   bool    $force            Force to overwrite
     *
     * @return  string
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    public function move(string $sourcePath, string $destinationPath, bool $force = false): string
    {
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }
        
        if (!@ftp_rename($this->ftp_connection, $this->ftp_root . $sourcePath, $this->ftp_root . $destinationPath)) {
            $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
            Log::add("Unable to rename {$sourcePath} to {$destinationPath}: {$message}", Log::ERROR, 'ftp');
            throw new \Exception($message);
        }

        return $destinationPath;
    }

    /**
     * Returns a url which can be used to display an image from within the "images" directory.
     *
     * @param   string  $path  Path of the file relative to adapter
     *
     * @return  string
     *
     * @since   4.0.0
     */
    public function getUrl(string $path): string
    {
        if (!$this->ftp_connection) {
            throw new \Exception("No FTP connection available");
        }
        
        if ($this->url_root) {
            return $this->url_root . $path;
        } else {
            $hash = hash("xxh3", $path);
            $local_filename = JPATH_ROOT . '/tmp/' . $hash . '.tmp';
            if (file_exists($local_filename)) {
                return Uri::root() . 'tmp/' . $hash . '.tmp';
            } else {
                if (!@ftp_get($this->ftp_connection, $local_filename, $this->ftp_root . $path)) {
                    $message = error_get_last() !== null && error_get_last() !== [] ? error_get_last()['message'] : 'Error';
                    Log::add("FTP Unable to download {$path} to {$local_filename}: {$message}", Log::ERROR, 'ftp');
                    throw new \Exception($message);
                }
                return Uri::root() . 'tmp/' . $hash . '.tmp';
            }
        }
        return ''; 
    }

    /**
     * Returns the name of this adapter.
     *
     * @return  string
     *
     * @since   4.0.0
     */
    public function getAdapterName(): string
    {
        return $this->ftp_root; 
    }

    /**
     * Search for a pattern in a given path
     *
     * @param   string  $path       The base path for the search
     * @param   string  $needle     The path to file
     * @param   bool    $recursive  Do a recursive search
     *
     * @return  \stdClass[]
     *
     * @since   4.0.0
     */
    public function search(string $path, string $needle, bool $recursive = false): array
    {
        return array(); 
    }

    /**
     * Creates a safe file name for the given name.
     *
     * @param   string  $name  The filename
     *
     * @return  string
     *
     * @since   4.0.0
     * @throws  \Exception
     */
    private function getSafeName(string $name): string
    {
        // Copied from the Joomla local filesystem plugin code

        // Make the filename safe
        if (!$name = File::makeSafe($name)) {
            throw new \Exception(Text::_('COM_MEDIA_ERROR_MAKESAFE'));
        }

        // Transform filename to punycode
        $name = PunycodeHelper::toPunycode($name);

        // Get the extension
        $extension = File::getExt($name);

        // Normalise extension, always lower case
        if ($extension) {
            $extension = '.' . strtolower($extension);
        }

        $nameWithoutExtension = substr($name, 0, \strlen($name) - \strlen($extension));

        return $nameWithoutExtension . $extension;
    }
}
```