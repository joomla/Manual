---
sidebar_position: 1
---

# Writing Documentation


## One lanuage

Joomla! and the Joomla! documentation is written in British English. If you want to contribute to the documentation,
please do so in British English. There might be exceptions for some terms.

A detailed description of how we write can be found in the [User Interface Text](/docs/user-interface-text/) documentation.


To make documentation changes you'll probably find it easiest to use one of two options:
1. Install Docusaurus on your own machine, and make changes there
2. Use [github dev](https://github.com/github/dev) to make the changes on the GitHub server.

## API Docs Links

If you link to the Joomla API docs then the URL of the API depends on the version of the manual documentation.
For example, for Joomla 4.4 documentation the User API is at
[https://api.joomla.org/cms-4/classes/Joomla-CMS-User-User.html](https://api.joomla.org/cms-4/classes/Joomla-CMS-User-User.html),
but for Joomla 5.x documentation it is
[https://api.joomla.org/cms-5/classes/Joomla-CMS-User-User.html](https://api.joomla.org/cms-5/classes/Joomla-CMS-User-User.html).

This is similar for Framework classes, eg
[https://api.joomla.org/framework-3/classes/Joomla-Registry-Registry.html](https://api.joomla.org/framework-3/classes/Joomla-Registry-Registry.html),
which is also dependent upon the documentation version.

As this creates a maintainability issue a plugin has been developed which automatically selects the appropriate API
docs version, and you should use this plugin by specifying API docs links like the following examples:

```
cms-api://classes/Joomla-CMS-User-User.html
framework-api://classes/Joomla-Registry-Registry.html
```

The plugin will replace `cms-api://` or `framework-api://` with the correct URL section.

## Headlines

To align with a11y requirements for accessibility, please don't have more than one header level 1:

```
Just One H1
===========
```

We use === for H1 and ## for H2, and ### for H3, etc.

## Placeholders

Please use the following placeholder for unfinished sections of a document.

```
:::note[TODO]
  This section is missing, please use the **Edit this Page** link at the bottom of this page to add this section.
:::
```

If the page is not completed yet and bigger parts are missing use

```
:::caution[TODO]
  This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.
:::
```

## Common Build Problems

If you use angle brackets or curly brackets in text then always enclose these in backticks, like `<h1>` or `{['a':1, 'b':2]}`.

Don't use colons (:) in titles.

Don't use `<br>` to force a new line (eg in table text); use `<br/>` instead. 

