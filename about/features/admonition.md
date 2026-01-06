import BrowserWindow from '@site/src/components/BrowserWindow';

# Admonition

[Admonitions](https://docusaurus.io/docs/next/markdown-features/admonitions)
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

```mdx-code-block
<BrowserWindow url="https://manual.joomla.org">

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

</BrowserWindow>
```
