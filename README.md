# Joomla! Programmers documentation

This repository should hold all Joomla! documentation needed to develop extensions.

The Documentation can be found at [https://manual.joomla.org](https://manual.joomla.org)

## Development

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Preview for pull request

As part of the documentation validation we create a subdomain for previewing your pull request. The Link will be added to the "checks" section in the pull request as "preview". The url used is [http://pr-\[prnumber\].manual.joomlacode.org](http://pr-[prnumber].manual.joomlacode.org)

## How to use

### Unfinished sections

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

### Using admonitions

Full reference could be found at [Docusaurus documentation](https://docusaurus.io/docs/markdown-features/admonitions). We don't use blank lines around content, and we add 2 spaces before the text messages.

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
