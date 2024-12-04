# Joomla! Programmers documentation

This repository should hold all Joomla! documentation needed to develop extensions.

The Documentation can be found at [https://manual.joomla.org](https://manual.joomla.org)

## Contributing to the Joomla Manual

This manual is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator. If you want to contribute to it then this page will help you get started.

Updates to the documentation is managed via this repository, so you should initially fork it into your own github account. 
Then you can make changes to the documentation files and submit a pull request to the Joomla manual. 
Ensure that you continue to sync your fork branches with the Joomla manual `main` branch. 

The documentation uses the [Markdown](https://www.markdownguide.org/) syntax, with additional features which Docusaurus provides.

To make documentation changes you'll probably find it easiest to use one of two options:
1. Install Docusaurus on your own machine, and make changes there
2. Use [github dev](https://github.com/github/dev) to make the changes on the github server. 

### Install Docusaurus Locally

To install Docusaurus on your own machine you should initialise a local git repository and clone the manual from the forked copy in your githut repository into this git instance. 

Then change directory to your local git repository and do:

```
$ npm install
```

Once Docusaurus is installed:

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Use github dev

To use github dev go to your repository and press the "." (dot) key, as described within the [github.dev guide](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor). You can then:
- create a new git branch for your changes
- create new files and folders, modify and delete existing files, upload files
- preview files (right-click on the file tab) - this will show interpreted markdown, but will not interpret Docusaurus additions
- commit and push changes
- return to github repository (by clicking on GitHub in bottom left, or by replacing github.dev by github.com in the URL)

### Preview for pull request

Once you raise a pull request on the [Joomla manual](https://github.com/joomla/Manual) a test build is run to identify any problems with your documentation. 
If you find a check has failed then click on the Details of the check which failed, and you can check the console logs to find the problem.

When the build succeeds you will be able to see the result of your documentation changes by navigating to a URL like `http://pr-240.manual.joomlacode.org/docs/`, where you replace 240 with the number of your pull request. 
This link will be added to the "checks" section in the pull request as "preview". 

### Versions

The Joomla Manual contains documentation for multiple versions of the Joomla software. 

The mapping between the versions of the manual in github and the live manual is:

| github manual (development)      | Live Docusaurus manual                               |
| -------------------------------- |------------------------------------------------------|
| /docs                            | "upcoming" release  (shown as /docs/next in the URL) |
| /versioned_docs/version-m.n      | version m.n (under "Current releases")               |

If your documentation changes relate to multiple versions of Joomla then you should duplicate these changes into multiple versions of Joomla manual. These versions which are updated are currently agreed to be: 
- the version m.n of the latest full Joomla release ("latest" release)
- the version m.n+1 of the next Joomla release ("upcoming" release)
- the last version (m-1.last) of the Joomla previous major version 

Other versions may be present within /versioned_docs but are not updated with the changes, even if the documentation is true for those Joomla versions. 

To minimise changes it's recommended that you initially just make changes within the /docs area, and then raise the pull request. 
This allows team members to review the documentation, and for you to fix any issues without having to replicate changes to multiple versions. 
Then when the review process is complete the changes can be replicated to the other versions prior to merging. 

Once the pull request is merged you can delete the branch on your own repository, and sync your `main` branch with the updated Joomla manual `main`.

### Common Build Problems

If you use angle brackets or curly brackets in text then always enclose these in backticks, like `<h1>` or `{['a':1, 'b':2]}`.

Don't use colons (:) in titles.

Don't use `<br>` to force a new line (eg in table text); use `<br/>` instead. 

Don't use subdirectory names which match somewhat the parent directory name. For example, avoid `./install-update/install/`, as this can cause docusaurus to report broken links.

### Docusaurus Additions

You won't see the effect of these when you preview the Markdown text, but you will see them by previewing the Pull Request. 

[Front Matter](https://docusaurus.io/docs/markdown-features#front-matter) should be used for titles and position in the left-hand sidebar:

```
---
title: Best Practices
sidebar-position: 2
---
```

[Code blocks](https://docusaurus.io/docs/markdown-features/code-blocks) are enclosed in 3 backticks, and can have a [title](https://docusaurus.io/docs/markdown-features/code-blocks#code-title)

    ```php title="hello.php"
    public static function hello() 
    {
        echo "Hello!"; 
    }
    ```

Line numbering and highlighting of individual lines are also supported.

To aid readability of the markdown please leave a blank line before and after code blocks.

[Admonitions](https://docusaurus.io/docs/markdown-features/admonitions) 
We don't use blank lines around content, and we add 2 spaces before the text messages.

```
:::note[Developer Note]
  Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::note[Joomla Issue]
  For issues that affect the documentation - please link to the issue on the Joomla Issue Tracker
:::

:::tip
  Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::info
  Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::warning
  Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::

:::danger
  Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
:::
```

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

### Diagrams

Where possible, use [Mermaid](https://mermaid.live) for creating diagrams for inclusion in the documentation. Where Mermaid doesn't provide what you need, then please include the saved diagram from your drawing tool in addition to the image file.

Images, code zip files, etc should be held in a folder `_assets` at the point in the documentation where they're used.

### Other Recommendations

#### Header Levels - just one H1

To align with a11y requirements for accessibility, please don't have more than one header level 1:

```
# Just One H1
```

#### API Docs Links

If you link to the Joomla API docs then the URL of the API depends on the version of the manual documentation. For example, for Joomla 4.4 documentation the User API is at [https://api.joomla.org/cms-4/classes/Joomla-CMS-User-User.html](https://api.joomla.org/cms-4/classes/Joomla-CMS-User-User.html), but for Joomla 5.x documentation it is [https://api.joomla.org/cms-5/classes/Joomla-CMS-User-User.html](https://api.joomla.org/cms-5/classes/Joomla-CMS-User-User.html).

This is similar for Framework classes, eg [https://api.joomla.org/framework-3/classes/Joomla-Registry-Registry.html](https://api.joomla.org/framework-3/classes/Joomla-Registry-Registry.html), which is also dependent upon the documentation version.

As this creates a maintainability issue a plugin has been developed which automatically selects the appropriate API docs version, and you should use this plugin by specifying API docs links like the following examples:

```
cms-api://classes/Joomla-CMS-User-User.html
framework-api://classes/Joomla-Registry-Registry.html
```

The plugin will replace `cms-api://` or `framework-api://` with the correct URL section.
