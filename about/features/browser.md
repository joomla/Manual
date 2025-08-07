import BrowserWindow from '@site/src/components/BrowserWindow';
import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';

# Browser

## BrowserWindow

The `BrowserWindow` component is used to display a browser window with a URL.
Default url is https://www.joomla.org, a manual feature should be shown use the https://manual.joomla.org url.

```md
---
title: Example metadata
---

import BrowserWindow from '@site/src/components/BrowserWindow';

​```mdx-code-block
<BrowserWindow url="https://manual.joomla.org">
    Example Text, this could be markdown.
</BrowserWindow>
​```
```

Example:

```mdx-code-block
<BrowserWindow url="https://manual.joomla.org">
    Example Text, this could be markdown.
</BrowserWindow>
```


## IframeWindow

The `IframeWindow` component is used to display a browser window with an iframe.

```md
---
title: Example metadata
---

import BrowserWindow from '@site/src/components/BrowserWindow/IframeWindow';

​```mdx-code-block
<IframeWindow url="https://manual.joomla.org">
​```
```

Example:

```mdx-code-block
<IframeWindow url="https://manual.joomla.org">
</IframeWindow>
```
