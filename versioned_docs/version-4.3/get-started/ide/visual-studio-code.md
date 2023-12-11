Visual Studio Code
==================

## Indentation with Spaces
Joomla uses spaces for indentation. Many people struggle to see the code nesting when the indentation is with spaces instead of tabs. The tab width can be adjusted in the ide but for spaces it is not as simple and you will need to use an extension to provide this functionality. It's not about how it looks, it's about how the brain works and how much time it spends to see nesting.

For Visual Studio Code (VSC) you can use [Stretchy Spaces]([https://plugins.jetbrains.com/plugin/14849-elastic-indents](https://marketplace.visualstudio.com/items?itemName=kylepaulsen.stretchy-spaces&ssr=false#overview) to adjust the visual width of spaced indents and to come close to the benefits of tabbed indentations.

## Recommended extensions
VSC is not a "real" IDE in its standard configuration. In order to be able to programme efficiently and stably, it is recommended to extend the functionality with extensions. The following extensions are recommended for programming with PHP:

### PHP Intelephense
Intelephense is a high performance PHP language server packed full of essential features for productive PHP development. Some of the most useful features for Joomla development are:

- Workspace wide find all references
- PHPDoc type system
- PSR-12 compatible document/range formatting
- Code folding of definitions, blocks, use declarations, heredoc, comments, and custom regions

### PHP Debug
PHP Debug is a debug adapter between VS Code and Xdebug. It enables debugging code run on a custom local webserver.
If you really want to understand your code or code written by other PHP developers, stepping through the code with Xdebug and observing the content of the variables helps you so much improving your code.
