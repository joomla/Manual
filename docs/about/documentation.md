This documentation
==================

This Joomla development manual is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator. If you want to contribute to it then this page will help you get started.

Updates to the documentation is managed via the [Joomla manual github repository](https://github.com/joomla/Manual), so you should initially fork this repository into your own github account. Then you can make changes to the documentation files and submit a pull request to the Joomla manual. Ensure that you continue to sync your fork branches with the Joomla manual `main` branch. 

The documentation uses the [Markdown](https://www.markdownguide.org/) syntax, with additional features which Docusaurus provides.

To make documentation changes you'll probably find it easiest to use one of two options:
1. Install Docusaurus on your own machine, and make changes there
2. Use [github dev](https://github.com/github/dev) to make the changes on the github server. 

## Install Docusaurus
To install Docusaurus on your own machine use

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

## Use github dev
To use github dev go to your repository and press the "." (dot) key, as described within the [github.dev guide](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor). You can then:
- create a new git branch for your changes
- create new files and folders, modify and delete existing files, upload files
- preview files (right-click on the file tab) - this will show interpreted markdown, but will not interpret Docusaurus additions
- commit and push changes
- return to github repository (by clicking on GitHub in bottom left, or by replacing github.dev by github.com in the URL)

## Pull Requests
Once you raise a pull request on the [Joomla manual](https://github.com/joomla/Manual) a test build is run to identify any problems with your documentation. If you find a check has failed then click on the Details of the check which failed, and you can check the console logs to find the problem.

When the build succeeds you will be able to see the result of your documentation changes by navigating to a URL like `http://pr-240.manual.joomlacode.org/docs/`, where you replace 240 with the number of your pull request.

If the documentation changes relate to multiple versions of Joomla then these changes are duplicated into multiple versions of Joomla manual. These versions which are updated are currently agreed to be: 
- the version m.n of the latest full Joomla release (current version, in /docs)
- the version m.n+1 of the next Joomla release (next version, in /versioned_docs/version-m.n+1)
- the last version of the Joomla previous major version (m-1.last) (in /versioned_docs/version-m-1.last)

Other versions may be present within /versioned_docs but are not updated with the changes, even if the documentation is true for those Joomla versions. 

To minimise changes it's recommended that you initially just make changes within the /docs area, and then raise the pull request. This allows team members to review the documentation, and for you to fix any issues without having to replicate changes to multiple versions. Then when the review process is complete the changes can be replicated to the other versions prior to merging. 

Once the pull request is merged you can delete the branch on your own repository, and sync your `main` branch with the updated Joomla manual `main`.

## Common Build Problems
If you use angle brackets or curly brackets in text then always enclose these in backticks, like `<h1>` or `{['a':1, 'b':2]}`.

Don't use colons (:) in titles.

## Docusaurus Additions

[Front Matter](https://docusaurus.io/docs/next/markdown-features#front-matter) should be used for titles and position in the left-hand sidebar:
```
---
title: Best Practices
sidebar-position: 2
---
```

[Code blocks](https://docusaurus.io/docs/next/markdown-features/code-blocks) are enclosed in 3 backticks, and can have a title:
```php title="hello.php"
public static function hello() 
{
    echo "Hello!"; 
}
```
Line numbering and highlighting of individual lines are also supported.

To aid readability of the markdown please leave a blank line before and after code blocks.

[Admonitions](https://docusaurus.io/docs/next/markdown-features/admonitions) 
We don't use blank lines around content, and we add 2 spaces before the text messages.

```
:::note[Developer Note]
  Some **content** with _Markdown_ `syntax`. Check [this `api`](#).
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

## Diagrams
Where possible, use [Mermaid](https://mermaid.live) for creating diagrams for inclusion in the documentation. Where Mermaid doesn't provide what you need, then please include the saved diagram from your drawing tool in addition to the image file.

Images, code zip files, etc should be held in a folder `_assets` at the point in the documentation where they're used.

## Other Recommendations
To align with a11y requirements for accessibility, please don't have more than one header level 1:

```
# Just One H1
```