// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Joomla! Programmers Documentation',
  tagline: 'Documentation for Joomla! Programmers',
  organizationName: 'joomla',
  projectName: 'joomla-cms',
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
            docId: 'get-started/index',
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
            to: '/migrations',
            label: 'Migrations',
            position: 'right',
            activeBaseRegex: `/migrations/`,
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
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Coding Standards',
                to: 'docs/get-started/codestyle',
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
                href: 'https://community.joomla.org/blogs.html',
              },
              {
                label: 'Magazine',
                href: 'https://magazine.joomla.org/',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy',
                href: 'https://www.joomla.org/privacy-policy.html',
              },
              {
                label: 'Terms',
                href: 'https://tm.joomla.org',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php', 'ini'],
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
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'migrations',
        path: 'migrations',
        routeBasePath: 'migrations',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          /* if we need to support more languages this is an example
          if (locale !== 'en') {
            return `https://crowdin.com/project/docusaurus-v2/${locale}`;
          }
           */
          return `https://github.com/joomla/manual/edit/main/${versionDocsDirPath}/${docPath}`;
        },
        editCurrentVersion: true,
        sidebarPath: require.resolve('./sidebarsMigrations.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      }),
    ],
  ],
};

module.exports = config;
