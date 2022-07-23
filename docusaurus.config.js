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
          editUrl: 'https://github.com/joomla/manual/tree/main/',
          /*lastVersion: '4.3',*/
          versions: {
            'current': {
              label: 'v4.3.x (upcoming)',
              banner: 'unreleased'
            },
            /*'4.3': {
              label: 'v4.3.x (latest)',
            }*/
          },
          /*onlyIncludeVersions: ['current', '4.3'], */
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
            href: 'https://docs.joomla.org',
            label: 'Using the CMS',
            position: 'left',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsBefore: [
              {
                type: 'html',
                className: 'dropdown-current-versions',
                value: '<b>Current releases</b>',
              },
            ],
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr class="dropdown-separator">',
              },
              {
                type: 'html',
                className: 'dropdown-archived-versions',
                value: '<b>Archived versions</b>',
              },
              {
                href: 'https://docs.joomla.org/Category:Joomla!_3.0',
                label: '2.5.x',
              },
              {
                type: 'html',
                value: '<hr class="dropdown-separator">',
              },
              {
                to: '/versions',
                label: 'All versions',
              },
            ],
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
