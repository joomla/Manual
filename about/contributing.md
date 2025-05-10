---
sidebar_position: 3
---

Contribuição
============

How to contribute to the Joomla! documentation. First it's important to understand how to write documentation,
which is handeled in the [Writing documentation](./writing.md) page.

## Instalar Docusaurus Localmente

To install Docusaurus on your own machine you should initialise a local git repository and clone the manual from the
forked copy in your GitHub repository into this git instance.

Then change directory to your local git repository and do:

```bash
npm install
```

Once Docusaurus is installed:

```bash
npm run start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server.

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Utilizar GitHub dev

To use GitHub dev go to your repository and press the "." (dot) key, as described within the
[github.dev guide](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor). You can then:

- create a new git branch for your changes
- create new files and folders, modify and delete existing files, upload files
- preview files (right-click on the file tab) - this will show interpreted markdown, but will not interpret Docusaurus additions
- commit and push changes
- return to GitHub repository (by clicking on GitHub in bottom left, or by replacing github.dev by github.com in the URL)

## Pedidos de Envio (Pull)

Once you raise a pull request on the [Joomla manual](https://github.com/joomla/Manual) a test build is run to identify
any problems with your documentation. If you find a check has failed then click on the Details of the check which failed,
and you can check the console logs to find the problem.

When the build succeeds you will be able to see the result of your documentation changes by navigating to a
URL like `https://branchname.manual-bku.pages.dev/`, where you replace branchname with the branch of your pull request.
This link will be added to the "checks" section in the pull request as "preview". 
