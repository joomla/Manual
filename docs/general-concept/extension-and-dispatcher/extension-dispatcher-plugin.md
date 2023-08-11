---
title: Extension and Dispatcher Classes for Plugins
sidebar_position: 4
---
# Extension and Dispatcher Classes for Plugins
The equivalent classes for plugins are a little different.

For plugins the Extension class is your plugin code, where you specify the events which want to subscribe to, and the code to execute when that event is triggered. See the plugin documentation for more details.

The plugin Dispatcher class is a class internal to Joomla; you don't implement or override it in your plugin code. To trigger an event the code will call `dispatch(...)` on the Dispatcher instance, passing the details of the name of the plugin event and any associated data items. The `dispatch()` function then calls the associated functions of all the plugins which have subscribed to that type of plugin event. 
