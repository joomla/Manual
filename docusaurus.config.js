// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { visit } from 'unist-util-visit';

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/**
 * The plugin for parsing the API links. cms-api:// and  framework-api://
 * https://docusaurus.io/docs/markdown-features/plugins#creating-new-rehyperemark-plugins
 *
 * @param {Object} options Object with links for CMS API, and Framework API, for each "major" or "major.minor" version. Example:
 *  {
 *    cmsMap: {
 *      'default': 'https://api.joomla.org/cms-5/',
 *      '5': 'https://api.joomla.org/cms-5/',
 *    },
 *    frameworkMap: {
 *      'default': 'https://api.joomla.org/framework-3/',
 *      '5': 'https://api.joomla.org/framework-3/',
 *    },
 *  }
 * @returns {(function(*, *): Promise<void>)|*}
 */
const apiLinkPlugin = (options) => {
  return async (ast, vfile) => {
    // Extract version from the file path, eg: /versioned_docs/version-5.1/testing.md => version-5.1
    const versionPart = vfile.path.replace(vfile.cwd).split('/').find((part) => part.startsWith('version-')) || '';

    // Extract full version and major version, eg: version-5.1 => 5.1 => 5
    const versionFull = versionPart.replace('version-', '') || 'default';
    const versionMajor = versionFull.split('.').shift() || 'default';

    // Get the links from the options
    const cmsLink = options.cmsMap[versionFull] || options.cmsMap[versionMajor] || options.cmsMap['default'];
    const frameworkLink = options.frameworkMap[versionFull] || options.frameworkMap[versionMajor] || options.frameworkMap['default'];

    if (!cmsLink) {
      throw new Error('apiLinkPlugin were unable to find the link for CMS API');
    }

    if (!frameworkLink) {
      throw new Error('apiLinkPlugin were unable to find the link for Framework API');
    }

    // https://github.com/syntax-tree/mdast?tab=readme-ov-file#link
    visit(ast, 'link', (node) => {
      if (node.url.startsWith('cms-api://')) {
        node.url = node.url.replace('cms-api://', cmsLink);
      } else if (node.url.startsWith('framework-api://')) {
        node.url = node.url.replace('framework-api://', frameworkLink);
      }
    });
  };
};

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

  markdown: {
    mermaid: true,
  },

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
          lastVersion: '5.1',
          versions: {
            'current': {
              label: '5.2 (upcoming)',
              banner: 'unreleased'
            },
            '5.1': {
              label: '5.1',
            },
            '5.0': {
              label: '5.0',
            },
            '4.4': {
              label: '4.4',
            }
          },
          /*onlyIncludeVersions: ['current', '4.3'], */
          remarkPlugins: [
              // Configure the plugin for parsing the API links
              [apiLinkPlugin,{
                  cmsMap: {
                    'default': 'https://api.joomla.org/cms-5/',
                    '4': 'https://api.joomla.org/cms-4/',
                    '5': 'https://api.joomla.org/cms-5/',
                  },
                  frameworkMap: {
                    'default': 'https://api.joomla.org/framework-3/',
                    '4': 'https://api.joomla.org/framework-2/',
                    '5': 'https://api.joomla.org/framework-3/',
                  }
                }]
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
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
            docId: 'index',
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
                label: '3.x',
                href: 'https://docs.joomla.org/Category:Joomla!_3.0',
              },
              {
                label: '2.5',
                href: 'https://docs.joomla.org/Category:Joomla!_2.5',
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
        copyright: 'The content is available under the <a id="JEDL_Footer_Link" href="https://docs.joomla.org/JEDL">Joomla! EDL</a> license, unless otherwise stated.',
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
        additionalLanguages: ['php', 'ini', 'json'],
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
