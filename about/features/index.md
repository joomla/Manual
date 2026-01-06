---
sidebar_position: 4
---

Features
========

The [Joomla development manual](https://manual.joomla.org/docs/) uses a couple of Docusaurus features to make it easier to read.

There are 2 types of syntax to be aware of:

1. **Markdown** - this is the standard syntax for writing documentation, and is used for most of the content.
2. **MDX** - this is a combination of Markdown and JSX, and is used for the more complex components.

## Markdown

This is common Markdown syntax, with some extra features added by Docusaurus.

## MDX Components

In docusaurus we have a number of components that are used to display content. In addition to the standard docusaurus
components we provide addional components in the Joomla! documentation.

Components needs to be imported at the top of the file after the metadata object, and then can be used within the markdown content.

Example:

```md
---
title: Example metadata
---

import BrowserWindow from '@site/src/components/BrowserWindow';

​```mdx-code-block
<BrowserWindow>
    A text with a browser window.
</BrowserWindow>
​```
```
