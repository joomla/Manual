# JSON Response Format

Joomla by default will return a [JSON API](https://jsonapi.org/) Responses when requested with an Accept: application/json header as well as with the specific JSON API header. Although the Core of Joomla will not support additional content types, **support the ability that developers add additional content types that can be responded**.

## The Goals

-   Get a JSON response from the Joomla API
-   Create the necessary webservices plugin and the API part of the component
-   Use a module params for model the data we will send in the API response

## Not a Goal

-   How create a extension.
    This tutorial assumes that you know how to create an extension in Joomla 4. _Keep in mind that at least a plugin and a component are necessary. But do not worry, this component can be very basic, in fact, it will not even need have any Model, it only required that the dashboard view in the administration works correctly_. This will be enough for your API to work.

![Basic Component Dashboard View](/img/web-services-api/json-response/basic_dashboard_view.png 'Component Dashboard View')

The necessity for a basic backend part comes from the fact that the XML manifest, the configuration (config.xml) and the permissions (access.xml) files are present only in the backend directory of the component. The XML manifest is necessary for a component to be able to be installed, updated and uninstalled. Moreover, Joomla always creates a backend menu item for the component, meaning that the component must have a backend part with a default view even if it's just to display a message that there is nothing to do with this component in the backend.

-   Develop the tutorial with a generic approach. We building a custom API logic, with a specific approach. Although, after you follow the tutorial, you will be able to do changes for fit your needs.

## To know before start

One of the current authentication the Joomla API use is a token based one. (It also has one for credentials, username and password, but you should always avoid using this one).

As a result, **the core was though and was develop for administration functionality and the idea for the application to interact with itself**. So the Authentication has been designed around that.

Although, if your content is designed to just outright be public (e.g. blog posts in your app) you can just use the public flag in your webservice plugin (more on this below).

## Webservices plugin

Our first lines of code will start in the plugin. The plugin is responsible for registering the routes (endpoints) of our API in addition to indicating the controller of our component who will handle the request. Let's create it.

In your workspace, create a folder with the name: **plg_webservices_vapi**. Inside the folder, let create a php file of name, **vapi.php**, with the follow content:

```php
defined('_JEXEC') || die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Router\ApiRouter;
use Joomla\Router\Route;

class PlgWebservicesVapi extends CMSPlugin
{
    /**
     * Registers com_vapi API's routes in the application
     *
     * @param   ApiRouter  &$router  The API Routing object
     *
     * @return  void
     *
     */
    public function onBeforeApiRoute(&$router)
    {
        // Render a list of com_content articles using a specific module
        $this->createModuleSiteRoutes($router, 'v1/vapi/modules/:id', 'module.displayModule');
    }

    /**
     *
     * @param \Joomla\CMS\Application\ApiApplication $app
     *
     * TODO: Delete this method after merged https://github.com/joomla/joomla-cms/pull/39498
     */
    public function onAfterApiRoute($app): void
    {
        if ($app->input->getCmd('option') === 'com_vapi') {
            $app->input->set('format', 'json');
        }
    }

    /**
     * Creates routes map for CRUD
     *
     * @param   ApiRouter   &$router        The API Routing object
     * @param   string      $baseName       The route pattern to use for matching
     * @param   string      $controller     The name of the controller that will handle the api request.
     * @param   array       $defaults       An array of default values that are used when the URL is matched.
     * @param   bool        $publicGets     Allow the public to make GET requests.
     *
     * @return  void
     *
     */
    private function createModuleSiteRoutes(&$router, $baseName, $controller, $defaults = [], $publicGets = true): void
    {
        $defaults    = [
            'component'  => 'com_vapi',
            'public' => $publicGets,
            'format' => [
                'application/json'
            ]
        ];

        $routes = [
            new Route(['GET'], $baseName, $controller, ['id' => '(\d+)'], $defaults),
        ];

        $router->addRoutes($routes);
    }
}
```

Let hightlight some things you should kown about this plugin:

-   **onBeforeApiRoute method:** This method is required in each webservices plugin. Here is where you will define your routes (endpoints). You can define these routes inside this method, or in a custom separate method as was done here (this custom method will depend on you the way it will be built, it is not part of the Joomla core).

-   **createModuleSiteRoutes method:** Here you can check the constructor of the `Joomla\Router\Route` class and kown well all the params we using for instance the class. But, let extend the descriptions of them here.

    -   **\["GET"\]:** The HTTP methods this route supports, all verbs must be in uppercase. All valid methods are <code>["GET", "POST", "PUT", "DELETE", "HEAD", "TRACE", "PATCH"]</code>

    -   **$baseName:** The route pattern to use, or endpoint. In this example, we get here `v1/vapi/modules/:id`.

        -   The `v1` part is used for versioning your API. Start with v1 for the first version of your component API.
        -   The next part should be your component name without the `com_` prefix. This is just a convention for define the routes.
        -   Only left `modules/:id`. This the **feature** our component handle, plus a `:id` parameter who may exist or not in your endpoint. In our case, this pattern tells Joomla that this route will only match if the `v1/vapi/modules` route is followed by something which will be made available as the request parameter named `id`. If that something does not exist the route does not match and Joomla won't use it.

    -   **$controller:** This is the component API controller and the task to execute (a method inside this controller). Have in mind need be separated by a dot.

    -   **['id' => '(\d+)']:** If your route pattern has parameters you will provide a regular expression pattern that the value must match for the route to match. In this case, the id parameter (which was defined as `:id` in the pattern) must be an integer consisting of one or more digits (including the value 0).

    -   **$defaults:** Last but not least. In this variable we defined:

        -   `'component'  => 'com_vapi'` The associated component
        -   `'public' => $publicGets` Need be true if you have a route that you want it to be accessible by unauthenticated users, like how we did. False otherwise.
        -   `'format' => ['application/json']` Here is where is defined that our application will handle a json format response. Without this, Joomla will use the default JSON-API.

-   **onAfterApiRoute method:** Soon you will not need this method. All the information of why we using it, is in the link [Improve option handling and fix format handling in the API](https://github.com/joomla/joomla-cms/pull/39498)

Before jump to our component code, remember the plugin need have the **vapi.xml** manifest file. Will be a standar manifest, nothing new to add. You can follow any manifest inside the webservices plugins group.

## Component API part

**A reminder that before start with this part you need have your component with a basic functionality.**

In Joomla 4, your component has another optional part: the `api` part. Just like the component's frontend (site) and backend (administrator) it has its own Controllers, Views, and Models to render not HTML pages but JSON result sets.

Your component XML manifest needs to have an `<api>` section under the `<extension>` root node, defining the files and folders included in your component's api part. Typically, it looks like this:

### XML manifest - API section

```xml
<api>
    <files folder="api/">
        <folder>src</folder>
    </files>
</api>
```

In your component root installation folder, create now a new folder called `api`. This folder will have a sub-folder `src`, here is where we will add all our API folders and files. Let start now with our controller. Create now the folder `Controller` with the file **ModuleController.php** and the follow code inside:

### Controller - Class declaration

```php
<?php

namespace Carlitorweb\Component\Vapi\Api\Controller;

defined('_JEXEC') || die;

use Joomla\CMS\MVC\Factory\ApiMVCFactory;
use Joomla\CMS\Application\ApiApplication;
use Joomla\Input\Input;
use Joomla\CMS\Language\Text;
use Joomla\Component\Content\Administrator\Extension\ContentComponent;
use Joomla\CMS\Component\ComponentHelper;

class ModuleController extends \Joomla\CMS\MVC\Controller\BaseController
{
    /**
     * @var string $default_view Will be used as default for $viewName
     */
    protected $default_view = 'modules';

    /**
     * @var \Joomla\Registry\Registry $moduleParams The module params to set filters in the model
     */
    protected $moduleParams;

    /**
     * Constructor.
     *
     * @param   array           $config   An optional associative array of configuration settings
     *
     * @param   ApiMVCFactory   $factory  The factory.
     * @param   ApiApplication  $app      The Application for the dispatcher
     * @param   Input           $input    Input
     *
     * @throws  \Exception
     */
    public function __construct($config = array(), ApiMVCFactory $factory = null, ?ApiApplication $app = null, ?Input $input = null)
    {
        if (\array_key_exists('moduleParams', $config)) {
            $this->moduleParams = new \Joomla\Registry\Registry($config['moduleParams']);
        }

        parent::__construct($config, $factory, $app, $input);
    }

    # your methods code from here...
}
```

Notice the namespace of the controller. You can change it for your own custom namespace your component already have. You should change **Vapi** who is the name I using in this component, and the prefix **Carlitorweb**, the rest _by conventions_ is better let it as that (but you can change all to fit your needs).

Also, the JSON-API from the Joomla core extends the controllers from `Joomla\CMS\MVC\Controller\ApiController`. The need in our case is get a JSON response, and for that extends from `\Joomla\CMS\MVC\Controller\BaseController`.

We also declared 2 propeties, one will be used for tell Joomla the view file we expect to use and the other is for set the module params for model the data we will send in the API response.

Now let see the methods who will be involve in the class:

### Controller - Methods declaration

```php
/**
     * Set the models and execute the view
     *
     * @throws  \Exception
     */
    public function displayModule(): void
    {
        # your code here...
    }

    /**
     * Boot the model and set the states
     *
     * @param  \Joomla\Registry\Registry  $params  The module params
     *
     */
    protected function getMainModelForView($params): \Joomla\Component\Content\Site\Model\ArticlesModel
    {
        # your code here...
    }

    /**
     * Set the module params
     *
     * @param  \Carlitorweb\Component\Vapi\Api\Model\ModuleModel  $moduleModel
     *
     */
    protected function setModuleParams($moduleModel): \Joomla\Registry\Registry
    {
        # your code here...
    }
```

`displayModule()` Is the method we defined in our webservices plugin as the task to be execute. This is the first method the controller will use. If you want to test all go as expected, put the follow in the start of this method:

```php
var_dump(__METHOD__);die;
```

Then using your favorite API client like Postman, or Thunder Client from vscode or curl...make a request to the route `[yourLocalRootSiteURL]/api/index.php/v1/vapi/modules/{id of your module}`. You will see this response:

```log
string(73)"Carlitorweb\Component\Vapi\Api\Controller\ModuleController::displayModule"
```

`getMainModelForView()` The purpose of this method is for boot and prepare the _main_ model the view will use. And I wrote _main_ because Joomla allow the view interact with more than one model.

`setModuleParams()` Here is where we will get the module params to use in `getMainModelForView()`. If you notice, the method use a parameter `\Carlitorweb\Component\Vapi\Api\Model\ModuleModel`. This is a custom Model the API will have, and we need to create. Here is where we will get the module, based in the ID passed as parameter in the requested URL. **At this point, you need to know this ID need match with a already created frontend module in your Joomla administration.**

Since parameters are so necessary, let's immediately create our model.

### Model - Class definition

In the same root where we created our `Controller` folder, let now create the `Model` folder with the file **ModuleModel.php** and the follow code:

```php
<?php
defined('_JEXEC') || die;

use Joomla\CMS\Factory;
use Joomla\CMS\Cache\CacheControllerFactoryInterface;
use Joomla\Database\ParameterType;
use Joomla\CMS\Language\Text;

class ModuleModel extends \Joomla\CMS\MVC\Model\BaseDatabaseModel
{
    /**
     * Get the module
     *
     * @return  \stdClass|null The Module object
     *
     * @throws \InvalidArgumentException If was not set the module ID
     * @throws \RuntimeException If the module could not be found
     *
     */
    public function getModule(): ?object
    {
        /** @var \Joomla\CMS\Application\CMSApplicationInterface $app */
        $app = Factory::getApplication();

        $mid = $this->state->get('moduleID', 0);

        if ($mid === 0) {
            throw new \InvalidArgumentException(
				sprintf(
					'A module ID is neccessary in %s',
					__METHOD__
				)
			);
        }

        /** @var \Joomla\Database\DatabaseInterface $db */
        $db    = $this->getDatabase();
        $query = $this->getModuleQuery($db, $mid);

        // Set the query
        $db->setQuery($query);

        // Build a cache ID for the resulting data object
        $cacheId = 'com_vapi.moduleId' . $mid;

        try {
            /** @var \Joomla\CMS\Cache\Controller\CallbackController $cache */
            $cache = Factory::getContainer()->get(CacheControllerFactoryInterface::class)
                ->createCacheController('callback', ['defaultgroup' => 'com_modules']);

            $module = $cache->get(array($db, 'loadObject'), array(), md5($cacheId), false);
        } catch (\RuntimeException $e) {
            $app->getLogger()->warning(
                Text::sprintf('JLIB_APPLICATION_ERROR_MODULE_LOAD', $e->getMessage()),
                array('category' => 'jerror')
            );

            return new \stdClass();
        }

        return $module;
    }

    /**
     * Get the module query
     *
     * @param  int                                 $mid The ID of the module
     * @param  \Joomla\Database\DatabaseInterface  $db
     *
     */
    protected function getModuleQuery($db, $mid): \Joomla\Database\QueryInterface
    {
        $query  = $db->getQuery(true);

        $query->select('*')
            ->from($db->quoteName('#__modules'))
            ->where(
                $db->quoteName('id') . ' = :moduleId'
            )
            ->bind(':moduleId', $mid, ParameterType::INTEGER);

        return $query;
    }
}
```

Pretty simple model. We get the module ID to search in the line `$this->state->get('moduleID', 0)`. We need provide this ID in our controller (we will do soon). Using then the method ` $this->getModuleQuery()` is builded the database query we will execute after. Finally, we use a try/catch block to get the module object and cache it.

With the model ready, let get back to our controller, from there we can test if our model is running as should be.

### Controller - Methods definition

Now that we can get a specific module, let complete the method `setModuleParams()`

```php
    /**
     * Set the module params
     *
     * @param  \Carlitorweb\Component\Vapi\Api\Model\ModuleModel  $moduleModel
     *
     */
    protected function setModuleParams($moduleModel): \Joomla\Registry\Registry
    {
        // Get the module params
        $module = $moduleModel->getModule();

        if (is_null($module)) {
            throw new \UnexpectedValueException(
                sprintf(
                    '$module need be of type object, %s was returned in %s()',
                    gettype($module), __FUNCTION__
                )
            );
        }

        return $this->moduleParams = new \Joomla\Registry\Registry($module->params);
    }
```

Let see if the controller propertie $moduleParams is getting the expected result. For this let edit the main method `displayModule()`:

```php
    /**
     * Set the models and execute the view
     *
     * @throws  \Exception
     */
    public function displayModule(): void
    {
        $moduleID    = $this->input->get('id', 0, 'int');
        $moduleState = new \Joomla\Registry\Registry(['moduleID' => $moduleID]);

        /** @var \Carlitorweb\Component\Vapi\Api\Model\ModuleModel $moduleModel */
        $moduleModel = $this->factory->createModel('Module', 'Api', ['ignore_request' => true, 'state' => $moduleState]);

        // Set the params who will be used by the model
        if(empty($this->moduleParams)) {
            $this->setModuleParams($moduleModel);
        }

        var_dump($this->moduleParams);die;
    }
```

-   `$this->input->get('id', 0, 'int')`: The value of the `:id` parameter in the URL (the one we defined in the webservices plugin).

-   `'state' => $moduleState`: Notice we passed the ID when load the model. We already saw where we used this ID inside the model.

Again, using your favorite API client, make a request to the route [yourLocalRootSiteURL]/api/index.php/v1/vapi/modules/{id of your module}. You will see something like this:

```log
object(Joomla\Registry\Registry)#938 (3) {
["data":protected]=>
object(stdClass)#1090 (44) {
["mode"]=>
string(6) "normal"
["show_on_article_page"]=>
int(1)
["count"]=>
int(0)
["show_front"]=>
string(4) "only"
["category_filtering_type"]=>
int(1)
["catid"]=>
array(5) {
[0]=>
int(2)
[1]=>
int(8)
[2]=>
int(9)
[3]=>
int(10)
.....
```

With the params in our hands, let use it. Edit the method `getMainModelForView()`:

```php
    /**
     * Boot the model and set the states
     *
     * @param  \Joomla\Registry\Registry  $params The module Articles - Category params
     *
     */
    protected function getMainModelForView($params): \Joomla\Component\Content\Site\Model\ArticlesModel
    {
        $mvcContentFactory  = $this->app->bootComponent('com_content')->getMVCFactory();

        // Get an instance of the generic articles model
        /** @var \Joomla\Component\Content\Site\Model\ArticlesModel $articlesModel */
        $articlesModel = $mvcContentFactory->createModel('Articles', 'Site', ['ignore_request' => true]);

        if (!$articlesModel) {
            throw new \RuntimeException(Text::_('JLIB_APPLICATION_ERROR_MODEL_CREATE'));
        }

        $appParams = ComponentHelper::getComponent('com_content')->getParams();
        $articlesModel->setState('params', $appParams);

        $articlesModel->setState('filter.published', ContentComponent::CONDITION_PUBLISHED);

        /*
         * Set the filters based on the module params
        */
        $articlesModel->setState('list.start', 0);
        $articlesModel->setState('list.limit', (int) $params->get('count', 0));

        $catids = $params->get('catid');
        $articlesModel->setState('filter.category_id', $catids);

        // Ordering
        $ordering = $params->get('article_ordering', 'a.ordering');
        $articlesModel->setState('list.ordering', $ordering);
        $articlesModel->setState('list.direction', $params->get('article_ordering_direction', 'ASC'));

        $articlesModel->setState('filter.featured', $params->get('show_front', 'show'));

        $excluded_articles = $params->get('excluded_articles', '');

        if ($excluded_articles) {
            $excluded_articles = explode("\r\n", $excluded_articles);
            $articlesModel->setState('filter.article_id', $excluded_articles);

            // Exclude
            $articlesModel->setState('filter.article_id.include', false);
        }

        return $articlesModel;
    }
```

**The params we using to model our data come from the Articles - Category module. That is the ID we request with the `:id` parameter.** (Notice also was not used all the params)

Not much to explain in this method, you should be familiar with this code. The ArticlesModel is loaded and a set of model states is defined for get the data, based in the module params.

Let edit again the main method `displayModule()` for test we are getting the ArticlesModel object:

```php
    /**
     * Set the models and execute the view
     *
     * @throws  \Exception
     */
    public function displayModule(): void
    {
        $moduleID    = $this->input->get('id', 0, 'int');
        $moduleState = new \Joomla\Registry\Registry(['moduleID' => $moduleID]);

        /** @var \Carlitorweb\Component\Vapi\Api\Model\ModuleModel $moduleModel */
        $moduleModel = $this->factory->createModel('Module', 'Api', ['ignore_request' => true, 'state' => $moduleState]);

        // Set the params who will be used by the model
        if(empty($this->moduleParams)) {
            $this->setModuleParams($moduleModel);
        }

        $mainModel = $this->getMainModelForView($this->moduleParams);

        var_dump($mainModel::class);die;
    }
```

Again, using your favorite API client, make a request to the route [yourLocalRootSiteURL]/api/index.php/v1/vapi/modules/{id of your module}. You will get:

```log
string(49) "Joomla\Component\Content\Site\Model\ArticlesModel"
```

With all working, we ready to set our view and get the expected json response. Let edit one last time the main method `displayModule()`:

```php
    /**
     * Set the models and execute the view
     *
     * @throws  \Exception
     */
    public function displayModule(): void
    {
        $moduleID    = $this->input->get('id', 0, 'int');
        $moduleState = new \Joomla\Registry\Registry(['moduleID' => $moduleID]);

        /** @var \Carlitorweb\Component\Vapi\Api\Model\ModuleModel $moduleModel */
        $moduleModel = $this->factory->createModel('Module', 'Api', ['ignore_request' => true, 'state' => $moduleState]);

        // Set the params who will be used by the model
        if(empty($this->moduleParams)) {
            $this->setModuleParams($moduleModel);
        }

        $mainModel = $this->getMainModelForView($this->moduleParams);

        /** @var \Joomla\CMS\Document\JsonDocument $document */
        $document   = $this->app->getDocument();

        $viewType   = $document->getType();
        $viewName   = $this->input->get('view', $this->default_view);
        $viewLayout = $this->input->get('layout', 'default', 'string');

        try {
            /** @var \Carlitorweb\Component\Vapi\Api\View\Modules\JsonView $view */
            $view = $this->getView(
                $viewName,
                $viewType,
                '',
                ['moduleParams' => $this->moduleParams, 'base_path' => $this->basePath, 'layout' => $viewLayout]
            );
        } catch (\Exception $e) {
            throw new \RuntimeException($e->getMessage());
        }

        // Push the model into the view (as default)
        $view->setModel($mainModel, true);

        // Push as secondary model the Module model
        $view->setModel($moduleModel);

        $view->document = $this->app->getDocument();

        $view->display();
    }
```

-   `$this->getView()`: Joomla will look for a folder **Modules** (the name defined in the `$viewName` variable) inside the folder **View** who need be in the root of our component API part (where we already have the folders Controller and Model).

-   `'moduleParams' => $this->moduleParams`: Notice was send to the view the module params

-   `$view->setModel()`: Here we set in the view object the two models we using in the API. The default model have the data we want to output, and the `$moduleModel` is our custom model (this last one is optional)

-   `$view->display()`: Execute and display the output.

Let create our last file, the view.

### View - Class and methods definition

```php
<?php

namespace Carlitorweb\Component\Vapi\Api\View\Modules;

defined('_JEXEC') || die;

use \Joomla\CMS\MVC\View\JsonView as BaseJsonView;
use \Joomla\CMS\MVC\View\GenericDataException;
use Joomla\CMS\HTML\HTMLHelper;
use \Carlitorweb\Component\Vapi\Api\Model\ModuleModel;

class JsonView extends BaseJsonView
{
    /**
     * @var  array $fieldsToRenderList Array of allowed fields to render
     */
    protected $fieldsToRenderList = [
        'id',
        'title',
        'alias',
        'displayDate',
        'metadesc',
        'metakey',
        'params',
        'displayHits',
        'displayCategoryTitle',
        'displayAuthorName',
    ];

    /**
     * @var  array  $display  Extra params to prepare the articles
     */
    protected $display = array();

    /**
     * Constructor.
     *
     * @param   array  $config  A named configuration array for object construction.
     *
     */
    public function __construct($config = [])
    {
        if (\array_key_exists('moduleParams', $config)) {
            $params = $config['moduleParams'];

            // Display options
            $this->display['show_date']         = $params->get('show_date', 0);
            $this->display['show_date_field']   = $params->get('show_date_field', 'created');
            $this->display['show_date_format']  = $params->get('show_date_format', 'Y-m-d H:i:s');
            $this->display['show_category']     = $params->get('show_category', 0);
            $this->display['show_author']       = $params->get('show_author', 0);
            $this->display['show_hits']         = $params->get('show_hits', 0);
        }

        parent::__construct($config);
    }

    /**
     * Set the data who will be load
     */
    protected function setOutput(array $items = null): void
    {
        /** @var \Joomla\CMS\MVC\Model\ListModel $mainModel */
        $mainModel = $this->getModel();

        /** @var \Carlitorweb\Component\Vapi\Api\Model\ModuleModel $moduleModel */
        $moduleModel = $this->getModel('module');

        if ($items === null) {
            $items = [];

            foreach ($mainModel->getItems() as $item) {
                $_item = $this->prepareItem($item, $moduleModel);
                $items[] = $this->getAllowedPropertiesToRender($_item);
            }
        }

        // Check for errors.
        if (\count($errors = $this->get('Errors'))) {
            throw new GenericDataException(implode("\n", $errors), 500);
        }

        $this->_output = $items;
    }

    /**
     * @param  \stdClass $item  The article to prepare
     */
    protected function getAllowedPropertiesToRender($item): \stdClass
    {
        $allowedFields = new \stdClass;

        foreach($item as $key => $value) {
            if (in_array($key, $this->fieldsToRenderList, true)) {
                $allowedFields->$key = $value;
            }
        }

        return $allowedFields;
    }

    /**
     * Prepare item before render.
     *
     * @param   object       $item  The model item
     * @param   ModuleModel  $moduleModel
     *
     * @return  object
     *
     */
    protected function prepareItem($item, $moduleModel)
    {
        $item->slug = $item->alias . ':' . $item->id;
        if ($this->display['show_date']) {
            $show_date_field = $this->display['show_date_field'];
            $item->displayDate = HTMLHelper::_('date', $item->$show_date_field, $this->display['show_date_format']);
        }

        $item->displayCategoryTitle = $this->display['show_category'] ? $item->category_title : '';

        $item->displayHits          = $this->display['show_hits'] ? $item->hits : '';
        $item->displayAuthorName    = $this->display['show_author'] ? $item->author : '';

        return $item;
    }

    /**
     * Execute and display a template script.
     *
     * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
     *
     * @return  void
     *
     */
    public function display($tpl = null)
    {
        // remove any string that could create an invalid JSON
        // such as PHP Notice, Warning, logs...
        ob_clean();

        // this will clean up any previously added headers, to start clean
        header_remove();

        $this->setOutput();

        parent::display($tpl);

        echo $this->document->render();
    }
}
```

-   `JsonView`: This is important. The name need be as this, since Joomla will look for this class name. Also, the Joomla core JSON-API extends the view from `Joomla\CMS\MVC\View\JsonApiView`, as the goal of this tutorial is get a JSON response, need be from `\Joomla\CMS\MVC\View\JsonView`.

-   `setOutput()`: Using the `$this->getModel()` method we get access to the models we set in the controller, one by default and another where is needed the name as key reference in the \Joomla\CMS\MVC\View\AbstractView::\_models array.

-   `getAllowedPropertiesToRender()`: If you have a public route you MUST think about which fields you'll be including in your JsonView object. Not all fields are suitable for public display; that could lead to a security vulnerability known as information disclosure.

    For example, your forum component may be saving the IP address alongside the user ID and creation date and time of a forum post. DO NOT make the IP address and user ID available to the public. This combination is considered Personally Identifiable Information and can result in fines! Just the user ID may be privileged information depending on the context of the site (remember that usernames are not privileged information, but the internal user IDs are).

-   `$this->document->render()`: Outputs the document

One more time, using your favorite API client, make a request to the route [yourLocalRootSiteURL]/api/index.php/v1/vapi/modules/{id of your module}. You will get:

```json
[
  {
    "id": 11,
    "title": "Typography",
    "alias": "typography",
    "metakey": "",
    "metadesc": "",
    "params": {...},
    "displayDate": "2022-11-20 20:49:17",
    "displayCategoryTitle": "Typography",
    "displayHits": 0,
    "displayAuthorName": "Carlos Rodriguez"
  }
]
```

Nice! Our common JSON response is here for stay ;)
