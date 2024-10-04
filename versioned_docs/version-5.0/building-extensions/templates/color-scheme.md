# Color scheme support

...also known as "dark mode".

Joomla template provides an API to supports the dark/light color scheme, which may be changed through a custom switch or automatically through CSS media queries.

When color scheme changes (either automatically or through custom switch) the template should set appropriate value to `data-color-scheme` attribute 
to help to the extensions (such as the editor plugins) to load the appropriate dark/light theme. 
Additionally, the event `joomla:color-scheme-change` should be triggered.

#### Document attributes

The following data attributes in the `<html>` element should be used within template that provides color scheme switch feature:

- `data-color-scheme-os` Should be set when template is following **OS** setting, and change the color scheme automatically through CSS media queries.
- `data-color-scheme="light"` When template uses the **Light** color scheme, which were changed either automatically or through custom switch. 
- `data-color-scheme="dark"` When template uses the **Dark** color scheme, which were changed either automatically or through custom switch.

#### JavaScript event

When the scheme changes the template should trigger a Custom event `joomla:color-scheme-change`, 
to notify about color scheme changes (which were changed either automatically or through custom switch)

```javascript
document.documentElement.dataset.colorScheme = 'dark';
document.dispatchEvent(new CustomEvent('joomla:color-scheme-change', { bubbles: true }));
```


