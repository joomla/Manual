// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Joomla! Programmers Documentation',
  tagline: 'Documentation for the Joomla! Programmers',
  url: 'https://manual.joomla.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/joomla/manual/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Joomla!',
        logo: {
          alt: 'Joomla Logo',
          src: 'img/joomla_logo_small.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'Joomla/index',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://api.joomla.org',
            label: 'API',
            position: 'left',
          },
          {
            href: 'https://framework.joomla.org',
            label: 'Framework',
            position: 'left',
          },
          {
            href: 'https://github.com/joomla/manual',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'The content is available under the <a href="https://docs.joomla.org/JEDL">Joomla! EDL</a> license, unless otherwise stated.',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Style Guide',
                to: 'docs/',
              },
              {
                label: 'Second Doc',
                to: 'docs/doc2/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Community Portal',
                href: 'https://community.joomla.org/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/joomla',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://community.joomla.org/blogs.html',
              },
              {
                label: 'Magazine',
                to: 'https://magazine.joomla.org/',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy',
                to: 'docs/Legal/privacy',
              },
              {
                label: 'Terms',
                to: 'docs/Legal/terms',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: false,
        language: "en",
      },
    ],
  ],
};

module.exports = config;
