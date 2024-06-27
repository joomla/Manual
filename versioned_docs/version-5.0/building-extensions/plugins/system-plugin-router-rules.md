---
title: System Plugin Router Rules
sidebar_position: 5
---
# Introduction
This example of a system plugin illustrates the flexibility of Joomla in allowing developers to change how the routing within `com_content` works, without having to hack the Joomla code.  

**WARNING: This is a system plugin, which is loaded every time Joomla runs, on both the site front-end and administrator back-end. If you have a PHP syntax error in it then you will get locked out of the Joomla administrator back-end, and will have to go into phpmyadmin (or equivalent) to set to 0 the `enabled` field within the plugin record in the `#__extensions` table. If you're not comfortable doing this then using this plugin is not recommended.**

For background information on how Joomla routing works you can read the documentation on [routing](../../general-concepts/routing/index.md). 

When building an SEF URL the Joomla SiteRouter class uses a MenuRules class to work out the menuitem to base the URL upon. This is an important selection, as the menuitem affects not only the format of the SEF URL produced, but also affects the presentation of the web page and the associated modules which are displayed.

The `com_content` component uses these rules, and you may find that you wish to change the format of some of the `com_content` SEF URLs generated on your site. This system plugin shows you how you can build your own rules and get them used by `com_content` to build SEF URLs which have the format you wish to have.

The key to doing this is to write our own component router class, and then get `com_content` use our component router class instead of its own. As `com_content` uses the RouterFactory to instantiate its router we need to get the RouterFactory to instantiate our router. As described in [Accessing the Component Router class](../../general-concepts/routing/access-component-router-class.md) the RouterFactory instantiates a component Router class with the classname `<namespace>\Site\Service\Router`, so if we inject our own namespace into this RouterFactory then it will instantiate our Router instead of the `com_content` Router.

You can copy and adapt the code below, or download and install the plugin from [system plugin router rules download](_assets/plg_custom_menurule.zip).

If you're copying the code below, then you will need to write the following 5 files into folder called `plg_custom_menurule`.

For simplicity the plugin uses English only; if you want to make it multilingual you can change it as described in [basic content plugin](basic-content-plugin.md).

## Manifest file

```xml title="plg_custom_menurule/custom_menurule.xml"
<?xml version="1.0" encoding="utf-8"?>

<extension type="plugin" group="system" method="upgrade">
  <name>Custom Menurule</name>
  <version>1.0.0</version>
  <creationDate>today</creationDate>
  <author>me</author>
  <description>This plugin overrides the com_content site router where it selects the menuitem for the SEF URL</description>
  <namespace path="src">My\Plugin\System\CustomMenurule</namespace>
  <files>
    <folder plugin="custom_menurule">services</folder>
    <folder>src</folder>
  </files>
</extension>
```

## Service Provider file
This is standard boilerplate code for plugins for instantiating the plugin via the Dependency Injection Container. You just have to adapt the standard code for your own plugin (basically 3 lines, plus we inject the Application as we'll use that within the plugin).

```php title="plg_custom_menurule/services/provider.php"
use My\Plugin\System\CustomMenurule\Extension\CustomMenurulePlugin;

return new class implements ServiceProviderInterface {

    public function register(Container $container) {
      $container->set(
        PluginInterface::class,
        function (Container $container) {
          $dispatcher = $container->get(DispatcherInterface::class);
          $plugin     = new CustomMenurulePlugin(
            $dispatcher,
            (array) PluginHelper::getPlugin('system', 'custom_menurule')
          );
          $plugin->setApplication(Factory::getApplication());
          return $plugin;
        }
      );
    }
};
```

## Extension class file
This is the entry point for the plugin. It registers to listen for the 'onAfterExtensionBoot' event, which is raised within `loadExtension` in libraries/src/Extension/ExtensionManagerTrait.php. Joomla runs this code every time it loads an extension, and this code:
- runs the component's services/provider.php file to load it and its dependencies into the [component's child DIC](../../general-concepts/dependency-injection/extension-child-containers.md) 
- triggers the 'onAfterExtensionBoot' event
- gets the extension and its dependencies out of the child DIC.

So we need to change the RouterFactory dependency to inject our own namespace instead of the `com_content` namespace. When we call `registerServiceProvider` passing the RouterFactory with our namespace then it will replace the RouterFactory entry in the child DIC. 

```php title="plg_custom_menurule/src/Extension/CustomMenurulePlugin.php"
<?php
namespace My\Plugin\System\CustomMenurule\Extension;

defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\Service\Provider\RouterFactory;

class CustomMenurulePlugin extends CMSPlugin implements SubscriberInterface {
     
    public static function getSubscribedEvents(): array {
        return [
            'onAfterExtensionBoot' => 'replaceRouterFactory',
        ];
    }

    public function replaceRouterFactory(Event $event): void {
        if (!$this->getApplication()->isClient("site")) {
            return;
        }
        [$subject, $type, $extensionName, $container] = array_values($event->getArguments());
        if (($type === ComponentInterface::class) && ($extensionName === "content")) {
            $container->registerServiceProvider(new RouterFactory('\\My\\Plugin\\System\\CustomMenurule'));
        }
    }
}
```

## Component Router
Because the RouterFactory will try to instantiate a component router with a fully qualified classname of `<namespace>\Site\Service\Router`, this defines the classname for our Router and the location of the PHP file. We make our Router class similar to that of `com_content` by extending the `com_content` Router class, but we change the `MenuRules` class which it attaches to be our own MenuRules class. 

We also have to define the `getName` function to return the string "content", as this will be used in getting the relevant menuitems, namely those which are associated with `com_content`.

```php title="plg_custom_menurule/src/Site/Service/Router.php"
<?php

namespace My\Plugin\System\CustomMenurule\Site\Service;

use Joomla\CMS\Application\SiteApplication;
use Joomla\CMS\Categories\CategoryFactoryInterface;
use Joomla\CMS\Component\Router\Rules\MenuRules;
use Joomla\CMS\Menu\AbstractMenu;
use Joomla\Database\DatabaseInterface;

\defined('_JEXEC') or die;

class Router extends \Joomla\Component\Content\Site\Service\Router
{
    public function __construct(SiteApplication $app, AbstractMenu $menu, CategoryFactoryInterface $categoryFactory, DatabaseInterface $db)
    {
        // run the com_content Router constructor
        parent::__construct($app, $menu, $categoryFactory, $db);

        // detach the MenuRules which was set up in the com_content constructor
        $rules = $this->getRules();
        foreach ($rules as $rule) {
            if ($rule instanceof \Joomla\CMS\Component\Router\Rules\MenuRules) {
                $this->detachRule($rule);
                break;
            }
        }
        
        // and attach our own MenuRules
        $this->attachRule(new \My\Plugin\System\CustomMenurule\Site\Service\MenuRules($this));
    }
    
    public function getName()
    {
        return "content";
    }
}

```

## MenuRules class
We're now in a position to write our own rules for determining how the menuitem is chosen on which to base the `com_content` SEF URLs. What's below is an example of how you can modify the Joomla code in libraries/src/Component/Router/Rules/MenuRules.php. Because our rules class inherits from the Joomla rules class, you can write your own rules in the `preprocess` function, and if you can't find a suitable menuitem you can just drop back to the Joomla version by calling `parent::preprocess(&$query)`.

This function differs from the standard Joomla router in a number of areas:

- If the `Itemid` has been set in the `Route::_()` call then we use it, provided that the menuitem is associated with `com_content`.

- If it's a multilingual site then we remove from the lookup array the entry associated with the home page of the `"*"` language. This is for the case where you assign language-specific home pages as described in [Setup a Multilingual Site/Creating menus](https://docs.joomla.org/J3.x:Setup_a_Multilingual_Site/Creating_menus), and unpublish the main menu module. If we don't remove this entry then it's possible to get incorrect routing, eg if the `"*"` home page points to one article and a language-specific home page points to a different article.

- It looks through the lookup table to try and find an exact match between the parameters specified in the `Route::_()` call and a menuitem on the site. If it finds one then it uses that menuitem's `Itemid`.

- If the current page (ie the `active` menuitem) belongs to `com_content` then it uses that menuitem's `Itemid`.

If the above fails to find a suitable menuitem then it drops back to the standard Joomla code.

```php title="plg_custom_menurule/src/Site/Service/MenuRules.php"
<?php

namespace My\Plugin\System\CustomMenurule\Site\Service;

use Joomla\CMS\Component\Router\Rules\RulesInterface;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Component\Router\RouterView;
use Joomla\CMS\Language\Multilanguage;

\defined('JPATH_PLATFORM') or die;

class MenuRules extends \Joomla\CMS\Component\Router\Rules\MenuRules
{
    private static $allLangHomeRemoved = false;

    public function preprocess(&$query)
    {
        $active = $this->router->menu->getActive();

        /**
         * If the active item id is not the same as the supplied item id or we have a supplied item id and no active
         * menu item then we just use the supplied menu item and continue
         */
        if (isset($query['Itemid']) && ($active === null || $query['Itemid'] != $active->id)) {
            return;
        }

        // Get query language
        $language = isset($query['lang']) ? $query['lang'] : '*';

        // Set the language to the current one when multilang is enabled and item is tagged to ALL
        if (Multilanguage::isEnabled() && $language === '*') {
            $language = $this->router->app->get('language');
        }

        // build the reverse lookup for the language (the buildLookup() for language "*" is already done in the constructor)
        // $this->lookup is a multidimensional array of the menuitems which match the component (com_content),
        // the language, and filtered by access.
        // It is keyed by:
        //   - firstly language - eg "*" or "en-GB"
        //   - secondly view or view:layout - the view, and possibly also layout, defined in the menuitem
        //   - thirdly id - whatever is the id defined in the menuitem, or 0 if no id is specified
        // The value of this element in the array is the Itemid of the menuitem.
        if (!isset($this->lookup[$language])) {
            $this->buildLookup($language);
        }
        
        // If the &Itemid=.. has been specified in the Route::_() call then use it if it's suitable 
        // (ie if it's in the lookup array)
        if (isset($query['Itemid'])) {
            if (array_search((int)$query['Itemid'], $this->lookup, true) !== false) {
                return; // just use that Itemid
            }
        }

        /* The following is superfluous given that we'll take the supplied menu item if it's found above
        // Check if the active menu item matches the requested query
        if ($active !== null && isset($query['Itemid'])) {
            // Check if active->query and supplied query are the same
            $match = true;

            foreach ($active->query as $k => $v) {
                if (isset($query[$k]) && $v !== $query[$k]) {
                    // Compare again without alias
                    if (\is_string($v) && $v == current(explode(':', $query[$k], 2))) {
                        continue;
                    }

                    $match = false;
                    break;
                }
            }

            if ($match) {
                // Just use the supplied menu item
                return;
            }
        }
        */

        // If it's a multilingual site then ensure we don't use the home page of the "*" language
        if (Multilanguage::isEnabled() && !self::$allLangHomeRemoved) {
            $homeItems = $this->router->menu->getItems(array('language', 'home'), array('*', 1));
            if ($homeItems) {
                $allLangHome = $homeItems[0]->id;
                foreach ($this->lookup as $lang => $viewArray) {
                    foreach ($viewArray as $view => $idArray) {
                        foreach ($idArray as $id => $itemid) {
                            if ($itemid == $allLangHome) {
                                if (count($this->lookup[$lang][$view]) == 1) {
                                    unset($this->lookup[$lang][$view]);
                                } else {
                                    unset($this->lookup[$lang][$view][$id]);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            self::$allLangHomeRemoved = true;
        }
        
        // Form the equivalent of view:layout based on the query parameters, and try to match in the lookup array
        if (isset($query['view'])) {
            $searchKey = $query['view'];
            if (isset($query['layout']) && $query['layout'] !== 'default') {
                $searchKey .= ":" . $query['layout'];
            }
            foreach ($this->lookup as $lang => $arr) {
                if (array_key_exists($searchKey, $arr)) {  // find if there's a matching view:layout
                    $matchingViews = $arr[$searchKey];
                    // now see if we can find an exact match with the id
                    if (isset($query['id'])) {
                        $idKey = (int) $query['id'];
                        if (array_key_exists($idKey, $matchingViews)) {
                            $query['Itemid'] = $matchingViews[$idKey];
                            return;
                        } 
                    } else { // if we haven't got an id in the query array
                        if (array_key_exists(0, $matchingViews)) {
                            $query['Itemid'] = $matchingViews[0];
                            return;
                        } 
                    }
                }
            }
        }
        
        // Use the active menuitem if it's a com_content one 
        if ($active && $active->component === "com_content") {
            $query["Itemid"] = $active->id;
            return;
        }
        
        // if we didn't find one above, then fall back to the standard Joomla code below

        $needles = $this->router->getPath($query);

        $layout = isset($query['layout']) && $query['layout'] !== 'default' ? ':' . $query['layout'] : '';

        if ($needles) {
            foreach ($needles as $view => $ids) {
                $viewLayout = $view . $layout;

                if ($layout && isset($this->lookup[$language][$viewLayout])) {
                    if (\is_bool($ids)) {
                        $query['Itemid'] = $this->lookup[$language][$viewLayout];

                        return;
                    }

                    foreach ($ids as $id => $segment) {
                        if (isset($this->lookup[$language][$viewLayout][(int) $id])) {
                            $query['Itemid'] = $this->lookup[$language][$viewLayout][(int) $id];

                            return;
                        }
                    }
                }

                if (isset($this->lookup[$language][$view])) {
                    if (\is_bool($ids)) {
                        $query['Itemid'] = $this->lookup[$language][$view];

                        return;
                    }

                    foreach ($ids as $id => $segment) {
                        if (isset($this->lookup[$language][$view][(int) $id])) {
                            $query['Itemid'] = $this->lookup[$language][$view][(int) $id];

                            return;
                        }
                    }
                }
            }
        }

        // Check if the active menuitem matches the requested language
        if (
            $active && $active->component === 'com_' . $this->router->getName()
            && ($language === '*' || \in_array($active->language, ['*', $language]) || !Multilanguage::isEnabled())
        ) {
            $query['Itemid'] = $active->id;

            return;
        }

        // If not found, return language specific home link
        $default = $this->router->menu->getDefault($language);

        if (!empty($default->id)) {
            $query['Itemid'] = $default->id;
        }
    }
}
```

## Installation
Once you have created the files above, then zip up the folder and install the extension. Then go into System / Plugins or System / Extensions and Enable the plugin. Experiment with `com_content` menuitems, categories and articles to see the difference in how the SEF URLs appear.