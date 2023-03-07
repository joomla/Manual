---
sidebar_position: 4
---

# Compatibility Plugin

As part of Joomla! 5.0 a plugin was introduced which enhance backward compatibility.

:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

## Class Aliases

Basically everything which is in `libraries/classmap.php` and `libraries/extensions.classmap.php` 
will be moved to this plugin.

* ActionLogPlugin => \Joomla\Component\Actionlogs\Administrator\Plugin\ActionLogPlugin


* FieldsPlugin => \Joomla\Component\Fields\Administrator\Plugin\FieldsPlugin
* FieldsListPlugin => \Joomla\Component\Fields\Administrator\Plugin\FieldsListPlugin


* PrivacyExportDomain => \Joomla\Component\Privacy\Administrator\Export\Domain
* PrivacyExportField => \Joomla\Component\Privacy\Administrator\Export\Field
* PrivacyExportItem => \Joomla\Component\Privacy\Administrator\Export\Item
* PrivacyPlugin => \Joomla\Component\Privacy\Administrator\Plugin\PrivacyPlugin
* PrivacyRemovalStatus => \Joomla\Component\Privacy\Administrator\Removal\Status
* PrivacyTableRequest => \Joomla\Component\Privacy\Administrator\Table\RequestTable


* TagsTableTag => \Joomla\Component\Tags\Administrator\Table\TagTable


* ContentHelperRoute => \Joomla\Component\Content\Site\Helper\RouteHelper


* FinderIndexerAdapter => \Joomla\Component\Finder\Administrator\Indexer\Adapter
* FinderIndexerHelper => \Joomla\Component\Finder\Administrator\Indexer\Helper
* FinderIndexer => \Joomla\Component\Finder\Administrator\Indexer\Indexer
* FinderIndexerParser => \Joomla\Component\Finder\Administrator\Indexer\Parser
* FinderIndexerQuery => \Joomla\Component\Finder\Administrator\Indexer\Query
* FinderIndexerResult => \Joomla\Component\Finder\Administrator\Indexer\Result
* FinderIndexerTaxonomy => \Joomla\Component\Finder\Administrator\Indexer\Taxonomy
* FinderIndexerToken => \Joomla\Component\Finder\Administrator\Indexer\Token


* JRegistry => \Joomla\Registry\Registry
* JRegistryFormatIni => \Joomla\Registry\Format\Ini
* JRegistryFormatJson => \Joomla\Registry\Format\Json
* JRegistryFormatPhp => \Joomla\Registry\Format\Php
* JRegistryFormatXml => \Joomla\Registry\Format\Xml
* JStringInflector => \Joomla\String\Inflector
* JStringNormalise => \Joomla\String\Normalise
* JData => \Joomla\Data\DataObject
* JDataSet => \Joomla\Data\DataSet
* JDataDumpable => \Joomla\Data\DumpableInterface


* JApplicationAdministrator => \Joomla\CMS\Application\AdministratorApplication
* JApplicationHelper => \Joomla\CMS\Application\ApplicationHelper
* JApplicationBase => \Joomla\CMS\Application\BaseApplication
* JApplicationCli => \Joomla\CMS\Application\CliApplication
* JApplicationCms => \Joomla\CMS\Application\CMSApplication
* JApplicationDaemon => \Joomla\CMS\Application\DaemonApplication
* JApplicationSite => \Joomla\CMS\Application\SiteApplication
* JApplicationWeb => \Joomla\CMS\Application\WebApplication
* JApplicationWebClient => \Joomla\Application\Web\WebClient
* JDaemon => \Joomla\CMS\Application\DaemonApplication
* JCli => \Joomla\CMS\Application\CliApplication
* JWeb => \Joomla\CMS\Application\WebApplication
* JWebClient => \Joomla\Application\Web\WebClient


* JModelAdmin => \Joomla\CMS\MVC\Model\AdminModel
* JModelForm => \Joomla\CMS\MVC\Model\FormModel
* JModelItem => \Joomla\CMS\MVC\Model\ItemModel
* JModelList => \Joomla\CMS\MVC\Model\ListModel
* JModelLegacy => \Joomla\CMS\MVC\Model\BaseDatabaseModel
* JViewCategories => \Joomla\CMS\MVC\View\CategoriesView
* JViewCategory => \Joomla\CMS\MVC\View\CategoryView
* JViewCategoryfeed => \Joomla\CMS\MVC\View\CategoryFeedView
* JViewLegacy => \Joomla\CMS\MVC\View\HtmlView
* JControllerAdmin => \Joomla\CMS\MVC\Controller\AdminController
* JControllerLegacy => \Joomla\CMS\MVC\Controller\BaseController
* JControllerForm => \Joomla\CMS\MVC\Controller\FormController
* JTableInterface => \Joomla\CMS\Table\TableInterface
* JTable => \Joomla\CMS\Table\Table
* JTableNested => \Joomla\CMS\Table\Nested
* JTableAsset => \Joomla\CMS\Table\Asset
* JTableExtension => \Joomla\CMS\Table\Extension
* JTableLanguage => \Joomla\CMS\Table\Language
* JTableUpdate => \Joomla\CMS\Table\Update
* JTableUpdatesite => \Joomla\CMS\Table\UpdateSite
* JTableUser => \Joomla\CMS\Table\User
* JTableUsergroup => \Joomla\CMS\Table\Usergroup
* JTableViewlevel => \Joomla\CMS\Table\ViewLevel
* JTableContenthistory => \Joomla\CMS\Table\ContentHistory
* JTableContenttype => \Joomla\CMS\Table\ContentType
* JTableCorecontent => \Joomla\CMS\Table\CoreContent
* JTableUcm => \Joomla\CMS\Table\Ucm
* JTableCategory => \Joomla\CMS\Table\Category
* JTableContent => \Joomla\CMS\Table\Content
* JTableMenu => \Joomla\CMS\Table\Menu
* JTableMenuType => \Joomla\CMS\Table\MenuType
* JTableModule => \Joomla\CMS\Table\Module


* JAccess => \Joomla\CMS\Access\Access
* JAccessRule => \Joomla\CMS\Access\Rule
* JAccessRules => \Joomla\CMS\Access\Rules
* JAccessExceptionNotallowed => \Joomla\CMS\Access\Exception\NotAllowed
* JRule => \Joomla\CMS\Access\Rule
* JRules => \Joomla\CMS\Access\Rules


* JHelp => \Joomla\CMS\Help\Help
* JCaptcha => \Joomla\CMS\Captcha\Captcha


* JLanguageAssociations => \Joomla\CMS\Language\Associations
* JLanguage => \Joomla\CMS\Language\Language
* JLanguageHelper => \Joomla\CMS\Language\LanguageHelper
* JLanguageMultilang => \Joomla\CMS\Language\Multilanguage
* JText => \Joomla\CMS\Language\Text
* JLanguageTransliterate => \Joomla\CMS\Language\Transliterate


* JComponentRecord => \Joomla\CMS\Component\ComponentRecord
* JComponentExceptionMissing => \Joomla\CMS\Component\Exception\MissingComponentException
* JComponentRouterBase => \Joomla\CMS\Component\Router\RouterBase
* JComponentRouterInterface => \Joomla\CMS\Component\Router\RouterInterface
* JComponentRouterLegacy => \Joomla\CMS\Component\Router\RouterLegacy
* JComponentRouterView => \Joomla\CMS\Component\Router\RouterView
* JComponentRouterViewconfiguration => \Joomla\CMS\Component\Router\RouterViewConfiguration
* JComponentRouterRulesMenu => \Joomla\CMS\Component\Router\Rules\MenuRules
* JComponentRouterRulesNomenu => \Joomla\CMS\Component\Router\Rules\NomenuRules
* JComponentRouterRulesInterface => \Joomla\CMS\Component\Router\Rules\RulesInterface
* JComponentRouterRulesStandard => \Joomla\CMS\Component\Router\Rules\StandardRules


* JEditor => \Joomla\CMS\Editor\Editor


* JErrorPage => \Joomla\CMS\Exception\ExceptionHandler


* JAuthenticationHelper => \Joomla\CMS\Helper\AuthenticationHelper
* JHelper => \Joomla\CMS\Helper\CMSHelper
* JHelperContent => \Joomla\CMS\Helper\ContentHelper
* JLibraryHelper => \Joomla\CMS\Helper\LibraryHelper
* JHelperMedia => \Joomla\CMS\Helper\MediaHelper
* JModuleHelper => \Joomla\CMS\Helper\ModuleHelper
* JHelperRoute => \Joomla\CMS\Helper\RouteHelper
* JHelperTags => \Joomla\CMS\Helper\TagsHelper
* JHelperUsergroups => \Joomla\CMS\Helper\UserGroupsHelper


* JLayoutBase => \Joomla\CMS\Layout\BaseLayout
* JLayoutFile => \Joomla\CMS\Layout\FileLayout
* JLayoutHelper => \Joomla\CMS\Layout\LayoutHelper
* JLayout => \Joomla\CMS\Layout\LayoutInterface


* JResponseJson => \Joomla\CMS\Response\JsonResponse


* JPlugin => \Joomla\CMS\Plugin\CMSPlugin
* JPluginHelper => \Joomla\CMS\Plugin\PluginHelper


* JMenu => \Joomla\CMS\Menu\AbstractMenu
* JMenuAdministrator => \Joomla\CMS\Menu\AdministratorMenu
* JMenuItem => \Joomla\CMS\Menu\MenuItem
* JMenuSite => \Joomla\CMS\Menu\SiteMenu


* JPagination => \Joomla\CMS\Pagination\Pagination
* JPaginationObject => \Joomla\CMS\Pagination\PaginationObject


* JPathway => \Joomla\CMS\Pathway\Pathway
* JPathwaySite => \Joomla\CMS\Pathway\SitePathway


* JSchemaChangeitem => \Joomla\CMS\Schema\ChangeItem
* JSchemaChangeset => \Joomla\CMS\Schema\ChangeSet
* JSchemaChangeitemMysql => \Joomla\CMS\Schema\ChangeItem\MysqlChangeItem
* JSchemaChangeitemPostgresql => \Joomla\CMS\Schema\ChangeItem\PostgresqlChangeItem
* JSchemaChangeitemSqlsrv => \Joomla\CMS\Schema\ChangeItem\SqlsrvChangeItem


* JUcm => \Joomla\CMS\UCM\UCM
* JUcmBase => \Joomla\CMS\UCM\UCMBase
* JUcmContent => \Joomla\CMS\UCM\UCMContent
* JUcmType => \Joomla\CMS\UCM\UCMType


* JToolbar => \Joomla\CMS\Toolbar\Toolbar
* JToolbarButton => \Joomla\CMS\Toolbar\ToolbarButton
* JToolbarButtonConfirm => \Joomla\CMS\Toolbar\Button\ConfirmButton
* JToolbarButtonCustom => \Joomla\CMS\Toolbar\Button\CustomButton
* JToolbarButtonHelp => \Joomla\CMS\Toolbar\Button\HelpButton
* JToolbarButtonLink => \Joomla\CMS\Toolbar\Button\LinkButton
* JToolbarButtonPopup => \Joomla\CMS\Toolbar\Button\PopupButton
* JToolbarButtonSeparator => \Joomla\CMS\Toolbar\Button\SeparatorButton
* JToolbarButtonStandard => \Joomla\CMS\Toolbar\Button\StandardButton
* JToolbarHelper => \Joomla\CMS\Toolbar\ToolbarHelper
* JButton => \Joomla\CMS\Toolbar\ToolbarButton


* JVersion => \Joomla\CMS\Version


* JAuthentication => \Joomla\CMS\Authentication\Authentication
* JAuthenticationResponse => \Joomla\CMS\Authentication\AuthenticationResponse


* JBrowser => \Joomla\CMS\Environment\Browser


* JAssociationExtensionInterface => \Joomla\CMS\Association\AssociationExtensionInterface
* JAssociationExtensionHelper => \Joomla\CMS\Association\AssociationExtensionHelper


* JDocument => \Joomla\CMS\Document\Document
* JDocumentError => \Joomla\CMS\Document\ErrorDocument
* JDocumentFeed => \Joomla\CMS\Document\FeedDocument
* JDocumentHtml => \Joomla\CMS\Document\HtmlDocument
* JDocumentImage => \Joomla\CMS\Document\ImageDocument
* JDocumentJson => \Joomla\CMS\Document\JsonDocument
* JDocumentOpensearch => \Joomla\CMS\Document\OpensearchDocument
* JDocumentRaw => \Joomla\CMS\Document\RawDocument
* JDocumentRenderer => \Joomla\CMS\Document\DocumentRenderer
* JDocumentXml => \Joomla\CMS\Document\XmlDocument
* JDocumentRendererFeedAtom => \Joomla\CMS\Document\Renderer\Feed\AtomRenderer
* JDocumentRendererFeedRss => \Joomla\CMS\Document\Renderer\Feed\RssRenderer
* JDocumentRendererHtmlComponent => \Joomla\CMS\Document\Renderer\Html\ComponentRenderer
* JDocumentRendererHtmlHead => \Joomla\CMS\Document\Renderer\Html\HeadRenderer
* JDocumentRendererHtmlMessage => \Joomla\CMS\Document\Renderer\Html\MessageRenderer
* JDocumentRendererHtmlModule => \Joomla\CMS\Document\Renderer\Html\ModuleRenderer
* JDocumentRendererHtmlModules => \Joomla\CMS\Document\Renderer\Html\ModulesRenderer
* JDocumentRendererAtom => \Joomla\CMS\Document\Renderer\Feed\AtomRenderer
* JDocumentRendererRSS => \Joomla\CMS\Document\Renderer\Feed\RssRenderer
* JDocumentRendererComponent => \Joomla\CMS\Document\Renderer\Html\ComponentRenderer
* JDocumentRendererHead => \Joomla\CMS\Document\Renderer\Html\HeadRenderer
* JDocumentRendererMessage => \Joomla\CMS\Document\Renderer\Html\MessageRenderer
* JDocumentRendererModule => \Joomla\CMS\Document\Renderer\Html\ModuleRenderer
* JDocumentRendererModules => \Joomla\CMS\Document\Renderer\Html\ModulesRenderer
* JFeedEnclosure => \Joomla\CMS\Document\Feed\FeedEnclosure
* JFeedImage => \Joomla\CMS\Document\Feed\FeedImage
* JFeedItem => \Joomla\CMS\Document\Feed\FeedItem
* JOpenSearchImage => \Joomla\CMS\Document\Opensearch\OpensearchImage
* JOpenSearchUrl => \Joomla\CMS\Document\Opensearch\OpensearchUrl


* JFilterInput => \Joomla\CMS\Filter\InputFilter
* JFilterOutput => \Joomla\CMS\Filter\OutputFilter


* JHttp => \Joomla\CMS\Http\Http
* JHttpFactory => \Joomla\CMS\Http\HttpFactory
* JHttpResponse => \Joomla\CMS\Http\Response
* JHttpTransport => \Joomla\CMS\Http\TransportInterface
* JHttpTransportCurl => \Joomla\CMS\Http\Transport\CurlTransport
* JHttpTransportSocket => \Joomla\CMS\Http\Transport\SocketTransport
* JHttpTransportStream => \Joomla\CMS\Http\Transport\StreamTransport


* JInstaller => \Joomla\CMS\Installer\Installer
* JInstallerAdapter => \Joomla\CMS\Installer\InstallerAdapter
* JInstallerExtension => \Joomla\CMS\Installer\InstallerExtension
* JExtension => \Joomla\CMS\Installer\InstallerExtension
* JInstallerHelper => \Joomla\CMS\Installer\InstallerHelper
* JInstallerScript => \Joomla\CMS\Installer\InstallerScript
* JInstallerManifest => \Joomla\CMS\Installer\Manifest
* JInstallerAdapterComponent => \Joomla\CMS\Installer\Adapter\ComponentAdapter
* JInstallerComponent => \Joomla\CMS\Installer\Adapter\ComponentAdapter
* JInstallerAdapterFile => \Joomla\CMS\Installer\Adapter\FileAdapter
* JInstallerFile => \Joomla\CMS\Installer\Adapter\FileAdapter
* JInstallerAdapterLanguage => \Joomla\CMS\Installer\Adapter\LanguageAdapter
* JInstallerLanguage => \Joomla\CMS\Installer\Adapter\LanguageAdapter
* JInstallerAdapterLibrary => \Joomla\CMS\Installer\Adapter\LibraryAdapter
* JInstallerLibrary => \Joomla\CMS\Installer\Adapter\LibraryAdapter
* JInstallerAdapterModule => \Joomla\CMS\Installer\Adapter\ModuleAdapter
* JInstallerModule => \Joomla\CMS\Installer\Adapter\ModuleAdapter
* JInstallerAdapterPackage => \Joomla\CMS\Installer\Adapter\PackageAdapter
* JInstallerPackage => \Joomla\CMS\Installer\Adapter\PackageAdapter
* JInstallerAdapterPlugin => \Joomla\CMS\Installer\Adapter\PluginAdapter
* JInstallerPlugin => \Joomla\CMS\Installer\Adapter\PluginAdapter
* JInstallerAdapterTemplate => \Joomla\CMS\Installer\Adapter\TemplateAdapter
* JInstallerTemplate => \Joomla\CMS\Installer\Adapter\TemplateAdapter
* JInstallerManifestLibrary => \Joomla\CMS\Installer\Manifest\LibraryManifest
* JInstallerManifestPackage => \Joomla\CMS\Installer\Manifest\PackageManifest


* JRouterAdministrator => \Joomla\CMS\Router\AdministratorRouter
* JRoute => \Joomla\CMS\Router\Route
* JRouter => \Joomla\CMS\Router\Router
* JRouterSite => \Joomla\CMS\Router\SiteRouter


* JCategories => \Joomla\CMS\Categories\Categories
* JCategoryNode => \Joomla\CMS\Categories\CategoryNode


* JDate => \Joomla\CMS\Date\Date


* JLog => \Joomla\CMS\Log\Log
* JLogEntry => \Joomla\CMS\Log\LogEntry
* JLogLogger => \Joomla\CMS\Log\Logger
* JLogger => \Joomla\CMS\Log\Logger
* JLogLoggerCallback => \Joomla\CMS\Log\Logger\CallbackLogger
* JLogLoggerDatabase => \Joomla\CMS\Log\Logger\DatabaseLogger
* JLogLoggerEcho => \Joomla\CMS\Log\Logger\EchoLogger
* JLogLoggerFormattedtext => \Joomla\CMS\Log\Logger\FormattedtextLogger
* JLogLoggerMessagequeue => \Joomla\CMS\Log\Logger\MessagequeueLogger
* JLogLoggerSyslog => \Joomla\CMS\Log\Logger\SyslogLogger
* JLogLoggerW3c => \Joomla\CMS\Log\Logger\W3cLogger


* JProfiler => \Joomla\CMS\Profiler\Profiler


* JUri => \Joomla\CMS\Uri\Uri


* JCache => \Joomla\CMS\Cache\Cache
* JCacheController => \Joomla\CMS\Cache\CacheController
* JCacheStorage => \Joomla\CMS\Cache\CacheStorage
* JCacheControllerCallback => \Joomla\CMS\Cache\Controller\CallbackController
* JCacheControllerOutput => \Joomla\CMS\Cache\Controller\OutputController
* JCacheControllerPage => \Joomla\CMS\Cache\Controller\PageController
* JCacheControllerView => \Joomla\CMS\Cache\Controller\ViewController
* JCacheStorageApcu => \Joomla\CMS\Cache\Storage\ApcuStorage
* JCacheStorageHelper => \Joomla\CMS\Cache\Storage\CacheStorageHelper
* JCacheStorageFile => \Joomla\CMS\Cache\Storage\FileStorage
* JCacheStorageMemcached => \Joomla\CMS\Cache\Storage\MemcachedStorage
* JCacheStorageRedis => \Joomla\CMS\Cache\Storage\RedisStorage
* JCacheStorageWincache => \Joomla\CMS\Cache\Storage\WincacheStorage
* JCacheException => \Joomla\CMS\Cache\Exception\CacheExceptionInterface
* JCacheExceptionConnecting => \Joomla\CMS\Cache\Exception\CacheConnectingException
* JCacheExceptionUnsupported => \Joomla\CMS\Cache\Exception\UnsupportedCacheException


* JSession => \Joomla\CMS\Session\Session


* JUser => \Joomla\CMS\User\User
* JUserHelper => \Joomla\CMS\User\UserHelper


* JForm => \Joomla\CMS\Form\Form
* JFormField => \Joomla\CMS\Form\FormField
* JFormHelper => \Joomla\CMS\Form\FormHelper
* JFormRule => \Joomla\CMS\Form\FormRule


* JFormFieldAccessLevel => \Joomla\CMS\Form\Field\AccesslevelField
* JFormFieldAliastag => \Joomla\CMS\Form\Field\AliastagField
* JFormFieldAuthor => \Joomla\CMS\Form\Field\AuthorField
* JFormFieldCacheHandler => \Joomla\CMS\Form\Field\CachehandlerField
* JFormFieldCalendar => \Joomla\CMS\Form\Field\CalendarField
* JFormFieldCaptcha => \Joomla\CMS\Form\Field\CaptchaField
* JFormFieldCategory => \Joomla\CMS\Form\Field\CategoryField
* JFormFieldCheckbox => \Joomla\CMS\Form\Field\CheckboxField
* JFormFieldCheckboxes => \Joomla\CMS\Form\Field\CheckboxesField
* JFormFieldChromeStyle => \Joomla\CMS\Form\Field\ChromestyleField
* JFormFieldColor => \Joomla\CMS\Form\Field\ColorField
* JFormFieldCombo => \Joomla\CMS\Form\Field\ComboField
* JFormFieldComponentlayout => \Joomla\CMS\Form\Field\ComponentlayoutField
* JFormFieldComponents => \Joomla\CMS\Form\Field\ComponentsField
* JFormFieldContenthistory => \Joomla\CMS\Form\Field\ContenthistoryField
* JFormFieldContentlanguage => \Joomla\CMS\Form\Field\ContentlanguageField
* JFormFieldContenttype => \Joomla\CMS\Form\Field\ContenttypeField
* JFormFieldDatabaseConnection => \Joomla\CMS\Form\Field\DatabaseconnectionField
* JFormFieldEditor => \Joomla\CMS\Form\Field\EditorField
* JFormFieldEMail => \Joomla\CMS\Form\Field\EmailField
* JFormFieldFile => \Joomla\CMS\Form\Field\FileField
* JFormFieldFileList => \Joomla\CMS\Form\Field\FilelistField
* JFormFieldFolderList => \Joomla\CMS\Form\Field\FolderlistField
* JFormFieldFrontend_Language => \Joomla\CMS\Form\Field\FrontendlanguageField
* JFormFieldGroupedList => \Joomla\CMS\Form\Field\GroupedlistField
* JFormFieldHeadertag => \Joomla\CMS\Form\Field\HeadertagField
* JFormFieldHidden => \Joomla\CMS\Form\Field\HiddenField
* JFormFieldImageList => \Joomla\CMS\Form\Field\ImagelistField
* JFormFieldInteger => \Joomla\CMS\Form\Field\IntegerField
* JFormFieldLanguage => \Joomla\CMS\Form\Field\LanguageField
* JFormFieldLastvisitDateRange => \Joomla\CMS\Form\Field\LastvisitdaterangeField
* JFormFieldLimitbox => \Joomla\CMS\Form\Field\LimitboxField
* JFormFieldList => \Joomla\CMS\Form\Field\ListField
* JFormFieldMedia => \Joomla\CMS\Form\Field\MediaField
* JFormFieldMenu => \Joomla\CMS\Form\Field\MenuField
* JFormFieldMenuitem => \Joomla\CMS\Form\Field\MenuitemField
* JFormFieldMeter => \Joomla\CMS\Form\Field\MeterField
* JFormFieldModulelayout => \Joomla\CMS\Form\Field\ModulelayoutField
* JFormFieldModuleOrder => \Joomla\CMS\Form\Field\ModuleorderField
* JFormFieldModulePosition => \Joomla\CMS\Form\Field\ModulepositionField
* JFormFieldModuletag => \Joomla\CMS\Form\Field\ModuletagField
* JFormFieldNote => \Joomla\CMS\Form\Field\NoteField
* JFormFieldNumber => \Joomla\CMS\Form\Field\NumberField
* JFormFieldOrdering => \Joomla\CMS\Form\Field\OrderingField
* JFormFieldPassword => \Joomla\CMS\Form\Field\PasswordField
* JFormFieldPlugins => \Joomla\CMS\Form\Field\PluginsField
* JFormFieldPlugin_Status => \Joomla\CMS\Form\Field\PluginstatusField
* JFormFieldPredefinedList => \Joomla\CMS\Form\Field\PredefinedListField
* JFormFieldRadio => \Joomla\CMS\Form\Field\RadioField
* JFormFieldRange => \Joomla\CMS\Form\Field\RangeField
* JFormFieldRedirect_Status => \Joomla\CMS\Form\Field\RedirectStatusField
* JFormFieldRegistrationDateRange => \Joomla\CMS\Form\Field\RegistrationdaterangeField
* JFormFieldRules => \Joomla\CMS\Form\Field\RulesField
* JFormFieldSessionHandler => \Joomla\CMS\Form\Field\SessionhandlerField
* JFormFieldSpacer => \Joomla\CMS\Form\Field\SpacerField
* JFormFieldSQL => \Joomla\CMS\Form\Field\SqlField
* JFormFieldStatus => \Joomla\CMS\Form\Field\StatusField
* JFormFieldSubform => \Joomla\CMS\Form\Field\SubformField
* JFormFieldTag => \Joomla\CMS\Form\Field\TagField
* JFormFieldTel => \Joomla\CMS\Form\Field\TelephoneField
* JFormFieldTemplatestyle => \Joomla\CMS\Form\Field\TemplatestyleField
* JFormFieldText => \Joomla\CMS\Form\Field\TextField
* JFormFieldTextarea => \Joomla\CMS\Form\Field\TextareaField
* JFormFieldTimezone => \Joomla\CMS\Form\Field\TimezoneField
* JFormFieldUrl => \Joomla\CMS\Form\Field\UrlField
* JFormFieldUserActive => \Joomla\CMS\Form\Field\UseractiveField
* JFormFieldUserGroupList => \Joomla\CMS\Form\Field\UsergrouplistField
* JFormFieldUserState => \Joomla\CMS\Form\Field\UserstateField
* JFormFieldUser => \Joomla\CMS\Form\Field\UserField
* JFormRuleBoolean => \Joomla\CMS\Form\Rule\BooleanRule
* JFormRuleCalendar => \Joomla\CMS\Form\Rule\CalendarRule
* JFormRuleCaptcha => \Joomla\CMS\Form\Rule\CaptchaRule
* JFormRuleColor => \Joomla\CMS\Form\Rule\ColorRule
* JFormRuleEmail => \Joomla\CMS\Form\Rule\EmailRule
* JFormRuleEquals => \Joomla\CMS\Form\Rule\EqualsRule
* JFormRuleNotequals => \Joomla\CMS\Form\Rule\NotequalsRule
* JFormRuleNumber => \Joomla\CMS\Form\Rule\NumberRule
* JFormRuleOptions => \Joomla\CMS\Form\Rule\OptionsRule
* JFormRulePassword => \Joomla\CMS\Form\Rule\PasswordRule
* JFormRuleRules => \Joomla\CMS\Form\Rule\RulesRule
* JFormRuleTel => \Joomla\CMS\Form\Rule\TelRule
* JFormRuleUrl => \Joomla\CMS\Form\Rule\UrlRule
* JFormRuleUsername => \Joomla\CMS\Form\Rule\UsernameRule


* JMicrodata => \Joomla\CMS\Microdata\Microdata


* JDatabaseDriver => \Joomla\Database\DatabaseDriver
* JDatabaseExporter => \Joomla\Database\DatabaseExporter
* JDatabaseFactory => \Joomla\Database\DatabaseFactory
* JDatabaseImporter => \Joomla\Database\DatabaseImporter
* JDatabaseInterface => \Joomla\Database\DatabaseInterface
* JDatabaseIterator => \Joomla\Database\DatabaseIterator
* JDatabaseQuery => \Joomla\Database\DatabaseQuery
* JDatabaseDriverMysqli => \Joomla\Database\Mysqli\MysqliDriver
* JDatabaseDriverPdo => \Joomla\Database\Pdo\PdoDriver
* JDatabaseDriverPdomysql => \Joomla\Database\Mysql\MysqlDriver
* JDatabaseDriverPgsql => \Joomla\Database\Pgsql\PgsqlDriver
* JDatabaseDriverSqlazure => \Joomla\Database\Sqlazure\SqlazureDriver
* JDatabaseDriverSqlite => \Joomla\Database\Sqlite\SqliteDriver
* JDatabaseDriverSqlsrv => \Joomla\Database\Sqlsrv\SqlsrvDriver
* JDatabaseExceptionConnecting => \Joomla\Database\Exception\ConnectionFailureException
* JDatabaseExceptionExecuting => \Joomla\Database\Exception\ExecutionFailureException
* JDatabaseExceptionUnsupported => \Joomla\Database\Exception\UnsupportedAdapterException
* JDatabaseExporterMysqli => \Joomla\Database\Mysqli\MysqliExporter
* JDatabaseExporterPdomysql => \Joomla\Database\Mysql\MysqlExporter
* JDatabaseExporterPgsql => \Joomla\Database\Pgsql\PgsqlExporter
* JDatabaseImporterMysqli => \Joomla\Database\Mysqli\MysqliImporter
* JDatabaseImporterPdomysql => \Joomla\Database\Mysql\MysqlImporter
* JDatabaseImporterPgsql => \Joomla\Database\Pgsql\PgsqlImporter
* JDatabaseQueryElement => \Joomla\Database\Query\QueryElement
* JDatabaseQueryLimitable => \Joomla\Database\Query\LimitableInterface
* JDatabaseQueryPreparable => \Joomla\Database\Query\PreparableInterface
* JDatabaseQueryMysqli => \Joomla\Database\Mysqli\MysqliQuery
* JDatabaseQueryPdo => \Joomla\Database\Pdo\PdoQuery
* JDatabaseQueryPdomysql => \Joomla\Database\Mysql\MysqlQuery
* JDatabaseQueryPgsql => \Joomla\Database\Pgsql\PgsqlQuery
* JDatabaseQuerySqlazure => \Joomla\Database\Sqlazure\SqlazureQuery
* JDatabaseQuerySqlite => \Joomla\Database\Sqlite\SqliteQuery
* JDatabaseQuerySqlsrv => \Joomla\Database\Sqlsrv\SqlsrvQuery


* JFactory => \Joomla\CMS\Factory


* JMail => \Joomla\CMS\Mail\Mail
* JMailHelper => \Joomla\CMS\Mail\MailHelper


* JClientHelper => \Joomla\CMS\Client\ClientHelper
* JClientFtp => \Joomla\CMS\Client\FtpClient
* JFTP => \Joomla\CMS\Client\FtpClient
* JClientLdap => \Joomla\Ldap\LdapClient
* JLDAP => \Joomla\Ldap\LdapClient


* JUpdate => \Joomla\CMS\Updater\Update
* JUpdateAdapter => \Joomla\CMS\Updater\UpdateAdapter
* JUpdater => \Joomla\CMS\Updater\Updater
* JUpdaterCollection => \Joomla\CMS\Updater\Adapter\CollectionAdapter
* JUpdaterExtension => \Joomla\CMS\Updater\Adapter\ExtensionAdapter


* JCrypt => \Joomla\CMS\Crypt\Crypt
* JCryptCipher => \Joomla\Crypt\CipherInterface
* JCryptKey => \Joomla\Crypt\Key
* \Joomla\CMS\Crypt\CipherInterface => \Joomla\Crypt\CipherInterface
* \Joomla\CMS\Crypt\Key => \Joomla\Crypt\Key
* JCryptCipherCrypto => \Joomla\CMS\Crypt\Cipher\CryptoCipher


* JStringPunycode => \Joomla\CMS\String\PunycodeHelper


* JBuffer => \Joomla\CMS\Utility\BufferStreamHandler
* JUtility => \Joomla\CMS\Utility\Utility


* JInputCli => \Joomla\CMS\Input\Cli
* JInputCookie => \Joomla\CMS\Input\Cookie
* JInputFiles => \Joomla\CMS\Input\Files
* JInput => \Joomla\CMS\Input\Input
* JInputJSON => \Joomla\CMS\Input\Json


* JFeed => \Joomla\CMS\Feed\Feed
* JFeedEntry => \Joomla\CMS\Feed\FeedEntry
* JFeedFactory => \Joomla\CMS\Feed\FeedFactory
* JFeedLink => \Joomla\CMS\Feed\FeedLink
* JFeedParser => \Joomla\CMS\Feed\FeedParser
* JFeedPerson => \Joomla\CMS\Feed\FeedPerson
* JFeedParserAtom => \Joomla\CMS\Feed\Parser\AtomParser
* JFeedParserNamespace => \Joomla\CMS\Feed\Parser\NamespaceParserInterface
* JFeedParserRss => \Joomla\CMS\Feed\Parser\RssParser
* JFeedParserRssItunes => \Joomla\CMS\Feed\Parser\Rss\ItunesRssParser
* JFeedParserRssMedia => \Joomla\CMS\Feed\Parser\Rss\MediaRssParser


* JImage => \Joomla\CMS\Image\Image
* JImageFilter => \Joomla\CMS\Image\ImageFilter
* JImageFilterBackgroundfill => \Joomla\CMS\Image\Filter\Backgroundfill
* JImageFilterBrightness => \Joomla\CMS\Image\Filter\Brightness
* JImageFilterContrast => \Joomla\CMS\Image\Filter\Contrast
* JImageFilterEdgedetect => \Joomla\CMS\Image\Filter\Edgedetect
* JImageFilterEmboss => \Joomla\CMS\Image\Filter\Emboss
* JImageFilterNegate => \Joomla\CMS\Image\Filter\Negate
* JImageFilterSmooth => \Joomla\CMS\Image\Filter\Smooth


* JObject => \Joomla\CMS\Object\CMSObject


* JExtensionHelper => \Joomla\CMS\Extension\ExtensionHelper


* JHtml => \Joomla\CMS\HTML\HTMLHelper


* \Joomla\Application\Cli\CliInput => \Joomla\CMS\Application\CLI\CliInput
* \Joomla\Application\Cli\CliOutput => \Joomla\CMS\Application\CLI\CliOutput
* \Joomla\Application\Cli\ColorStyle => \Joomla\CMS\Application\CLI\ColorStyle
* \Joomla\Application\Cli\Output\Stdout => \Joomla\CMS\Application\CLI\Output\Stdout
* \Joomla\Application\Cli\Output\Xml => \Joomla\CMS\Application\CLI\Output\Xml
* \Joomla\Application\Cli\Output\Processor\ColorProcessor => \Joomla\CMS\Application\CLI\Output\Processor\ColorProcessor
* \Joomla\Application\Cli\Output\Processor\ProcessorInterface => \Joomla\CMS\Application\CLI\Output\Processor\ProcessorInterface


* JFile => \Joomla\CMS\Filesystem\File
* JFolder => \Joomla\CMS\Filesystem\Folder
* JFilesystemHelper => \Joomla\CMS\Filesystem\FilesystemHelper
* JFilesystemPatcher => \Joomla\CMS\Filesystem\Patcher
* JPath => \Joomla\CMS\Filesystem\Path
* JStream => \Joomla\CMS\Filesystem\Stream
* JStreamString => \Joomla\CMS\Filesystem\Streams\StreamString
* JStringController => \Joomla\CMS\Filesystem\Support\StringController


* JClassLoader => \Joomla\CMS\Autoload\ClassLoader


* JFormFilterInt_Array => \Joomla\CMS\Form\Filter\IntarrayFilter


* JAdapter => \Joomla\CMS\Adapter\Adapter
* JAdapterInstance => \Joomla\CMS\Adapter\AdapterInstance


* JHtmlAccess => \Joomla\CMS\HTML\Helpers\Access
* JHtmlActionsDropdown => \Joomla\CMS\HTML\Helpers\ActionsDropdown
* JHtmlAdminLanguage => \Joomla\CMS\HTML\Helpers\AdminLanguage
* JHtmlBehavior => \Joomla\CMS\HTML\Helpers\Behavior
* JHtmlBootstrap => \Joomla\CMS\HTML\Helpers\Bootstrap
* JHtmlCategory => \Joomla\CMS\HTML\Helpers\Category
* JHtmlContent => \Joomla\CMS\HTML\Helpers\Content
* JHtmlContentlanguage => \Joomla\CMS\HTML\Helpers\ContentLanguage
* JHtmlDate => \Joomla\CMS\HTML\Helpers\Date
* JHtmlDebug => \Joomla\CMS\HTML\Helpers\Debug
* JHtmlDraggablelist => \Joomla\CMS\HTML\Helpers\DraggableList
* JHtmlDropdown => \Joomla\CMS\HTML\Helpers\Dropdown
* JHtmlEmail => \Joomla\CMS\HTML\Helpers\Email
* JHtmlForm => \Joomla\CMS\HTML\Helpers\Form
* JHtmlFormbehavior => \Joomla\CMS\HTML\Helpers\FormBehavior
* JHtmlGrid => \Joomla\CMS\HTML\Helpers\Grid
* JHtmlIcons => \Joomla\CMS\HTML\Helpers\Icons
* JHtmlJGrid => \Joomla\CMS\HTML\Helpers\JGrid
* JHtmlJquery => \Joomla\CMS\HTML\Helpers\Jquery
* JHtmlLinks => \Joomla\CMS\HTML\Helpers\Links
* JHtmlList => \Joomla\CMS\HTML\Helpers\ListHelper
* JHtmlMenu => \Joomla\CMS\HTML\Helpers\Menu
* JHtmlNumber => \Joomla\CMS\HTML\Helpers\Number
* JHtmlSearchtools => \Joomla\CMS\HTML\Helpers\SearchTools
* JHtmlSelect => \Joomla\CMS\HTML\Helpers\Select
* JHtmlSidebar => \Joomla\CMS\HTML\Helpers\Sidebar
* JHtmlSortableList => \Joomla\CMS\HTML\Helpers\SortableList
* JHtmlString => \Joomla\CMS\HTML\Helpers\StringHelper
* JHtmlTag => \Joomla\CMS\HTML\Helpers\Tag
* JHtmlTel => \Joomla\CMS\HTML\Helpers\Telephone
* JHtmlUser => \Joomla\CMS\HTML\Helpers\User

## Class Aliases which will not be moved to the plugin

Some class aliases can't be removed at this version because they are use in core or saved in the database

TODO Evaluate this alias, it's used in all xml files for filterText

* JComponentHelper => \Joomla\CMS\Component\ComponentHelper

