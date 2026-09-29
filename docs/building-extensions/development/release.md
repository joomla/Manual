# Release handling with JoRobo

[JoRobo](https://github.com/joomla-projects/jorobo) is a task runner built on top of [Robo.li](https://robo.li/) that automates the most repetitive parts of Joomla extension development: building installable packages, maintaining copyright headers, bumping version numbers, generating changelogs, and publishing releases to GitHub or an FTP server.

## Installation

JoRobo is installed as a Composer dev dependency in the root of your extension repository:

```bash
composer require --dev joomla-projects/jorobo
```

After the installation, run the built-in init command to create the required configuration files:

```bash
vendor/bin/jorobo init
```

This creates a `jorobo.dist.ini` (and copies it to `jorobo.ini`) as well as a `RoboFile.php` in your repository root.

:::note
`jorobo.ini` may contain secrets such as GitHub tokens. Add it to your `.gitignore` and commit only `jorobo.dist.ini` (without secrets) as a template for other contributors.
:::

## Repository structure

JoRobo expects your extension source code to live inside a `src/` folder at the root of your repository. Inside `src/`, mirror the directory structure of a Joomla installation exactly:

```
my-extension/
├── src/
│   ├── administrator/
│   │   └── components/
│   │       └── com_example/
│   ├── components/
│   │   └── com_example/
│   ├── modules/
│   │   └── mod_example/
│   └── plugins/
│       └── system/
│           └── example/
├── tests/
├── docs/
├── changelog.xml
├── composer.json
├── jorobo.ini
├── jorobo.dist.ini
└── RoboFile.php
```

This layout allows JoRobo to copy or symlink the contents of `src/` directly into a Joomla installation without any additional path mapping. The `dist/` folder (generated automatically) holds the finished zip packages and is safe to add to `.gitignore`.

## Configuration: jorobo.ini

All project-specific settings live in `jorobo.ini`. The file uses standard INI syntax and is divided into four sections.

### Main section

```ini
; The name of the extension (e.g. com_example, mod_example, plg_system_example)
extension =

; The version that is used for building and releasing
version =

; The folder that contains the extension source code
source = src

; Which deployment targets to run with "vendor/bin/robo build"
; Possible values: package, release, ftp (space-separated)
target = package
```

The `target` setting controls what happens when you run `vendor/bin/robo build`:

| Value     | Effect                                    |
| --------- | ----------------------------------------- |
| `package` | Creates an installable zip in `/dist`     |
| `release` | Publishes the package as a GitHub release |
| `ftp`     | Uploads the package to an FTP server      |

You can combine multiple targets: `target = package release`.

### GitHub section

```ini
[github]
; The git remote to push tags and changelog commits to
remote = origin

; The branch from which releases are created
branch = main

; A GitHub personal access token with "repo" scope
token =

; The GitHub account or organisation that owns the repository
owner = your-github-username

; The name of the GitHub repository
repository = your-repo-name

; Where to get changelog entries from: "commits" or "pulls"
changelog_source = commits
```

Generate a personal access token at GitHub → Settings → Developer Settings → Personal access tokens. The token needs at least the `repo` scope.

### FTP section

```ini
[ftp]
host =
port = 21
user =
password =
ssl = false

; The target directory on the server
target = /
```

### Header section

```
[header]
; File extensions to add/update headers in
files = php,js,xml

; Comma-separated list of folders to exclude
exclude =

; The copyright header text; ##YEAR## is replaced automatically
text = "
/**
 * @package     Example
 *
 * @copyright   Copyright (C) 2020 - ##YEAR## Your Name. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
"
```

## RoboFile.php

Your repository needs a `RoboFile.php` that pulls in the JoRobo tasks. The minimal version looks like this:

```php
<?php

require 'vendor/autoload.php';

class RoboFile extends \Robo\Tasks
{
    use \Joomla\Jorobo\Tasks\Tasks;
}
```

Running `vendor/bin/jorobo init` creates this file for you. You can add your own custom Robo tasks as additional public methods to this class.

## Available commands

Run `vendor/bin/robo list` at any time to see all available commands.

### build — create an installable package

```bash
vendor/bin/robo build
```

This command reads your `src/` directory, processes all extension parts (components, modules, plugins, templates, libraries, packages), replaces the placeholders listed below in every file, and produces a ready-to-install zip archive in `dist/`.

**Placeholders replaced during build:**

| Placeholder          | Replaced with                               |
| -------------------- | ------------------------------------------- |
| `##DATE##`           | Current date (YYYY-MM-DD)                   |
| `##YEAR##`           | Current year                                |
| `##VERSION##`        | Version from `jorobo.ini`                   |
| `__DEPLOY_VERSION__` | Version from `jorobo.ini` (see also `bump`) |

The output file is named `<extension>-<version>.zip` (or `pkg-<extension>-<version>.zip` for package extensions) and is placed in the `dist/` folder.

### map — symlink into a Joomla installation

```bash
vendor/bin/robo map /path/to/joomla
```

Instead of copying files, `map` creates symlinks from your local Joomla installation back into the `src/` folder of your repository. This means you can edit files in your repo and immediately see the changes in your Joomla installation without any manual file copying.

:::note
On Windows, creating symlinks requires administrator privileges or Developer Mode to be enabled.
:::

### bump — update version placeholders

```bash
vendor/bin/robo bump
```

Replaces the string `__DEPLOY_VERSION__` in every file inside `src/` with the version set in `jorobo.ini`. Use this before tagging a release to make sure all files (manifests, PHP constants, JavaScript) carry the correct version number.

A typical workflow is:

1. Update `version =` in `jorobo.ini`.
2. Run `vendor/bin/robo bump` to propagate the version into all source files.
3. Commit the changes.
4. Run `vendor/bin/robo build` to create the package.

### headers — update copyright headers

```bash
vendor/bin/robo headers
```

Reads the `[header]` section of `jorobo.ini` and adds or replaces the copyright block at the top of every matching file in `src/`. `##YEAR##` in the header text is automatically replaced with the current year.

### changelog — generate changelog.xml

```bash
vendor/bin/robo changelog
```

Inspects your git history since the most recent tag and prepends a new `<changelog>` block to `changelog.xml` in the repository root. The file follows the [Joomla changelog XML format](https://docs.joomla.org/Changelog) and can be referenced directly from your extension manifest.

JoRobo detects change types automatically based on conventional commit prefixes:

| Commit prefix       | Type in changelog |
| ------------------- | ----------------- |
| `fix:`, `bug:`      | Bug Fix           |
| `feat:`, `feature:` | Feature           |
| `security:`         | Security Fix      |
| `lang:`             | Language fix      |
| Anything else       | Note              |

### assetJSON — generate joomla.asset.json

```bash
vendor/bin/robo assetJSON
```

Generates a `joomla.asset.json` file for your extension. This file is required by the Joomla Web Asset Manager (introduced in Joomla 4) to declare JavaScript and CSS assets.

### minify — minify CSS and JavaScript

```bash
vendor/bin/robo minify <path>
```

Minifies all CSS and JavaScript files in the given path relative to `src/`.

<!--### generate — create extension skeletons

```bash
vendor/bin/robo generate com_example
vendor/bin/robo generate mod_example
vendor/bin/robo generate plg_system_example
```

Scaffolds a new extension skeleton in `src/` based on the prefix of the name you pass:

| Prefix | Generated                                              |
| ------ | ------------------------------------------------------ |
| `com_` | Component (with optional site, API, and media folders) |
| `mod_` | Module                                                 |
| `plg_` | Plugin                                                 |
| `pkg_` | Package                                                |
| `tpl_` | Template                                               |
-->
## Publishing a release to GitHub

JoRobo can create a full GitHub release — including the changelog, a git tag, and the package upload — in a single command.

### 1. Configure jorobo.ini

Fill in the `[github]` section and add `release` to the `target` list:

```ini
extension     = com_example
version       = 1.2.0
source        = src
target        = package release

[github]
remote         = origin
branch         = main
token          = ghp_YOUR_PERSONAL_ACCESS_TOKEN
owner          = your-github-username
repository     = com_example
changelog_source = commits
```

### 2. Prepare the release

```bash
# Update version in all source files
vendor/bin/robo bump

# Optionally update copyright years
vendor/bin/robo headers

# Review and commit all changes
git add -A
git commit -m "Prepare release 1.2.0"
git push
```

### 3. Build and release

```bash
vendor/bin/robo build
```

When `target` contains `release`, JoRobo will:

1. Collect all commits (or merged pull requests, depending on `changelog_source`) since the last GitHub release.
2. Append a new entry to `changelog.xml`.
3. Commit the updated changelog to the configured branch and push it.
4. Create an annotated git tag with the version number and push it.
5. Create a GitHub release with the changelog as the release description.
6. Upload the zip package from `dist/` as a release asset.

After the command completes, the release is live at `https://github.com/<owner>/<repository>/releases`.

## Publishing a release to an FTP server

For distributing packages via FTP instead of (or in addition to) GitHub, configure the `[ftp]` section and add `ftp` to `target`:

```ini
target = package ftp

[ftp]
host     = ftp.example.com
port     = 21
user     = ftpuser
password = secret
ssl      = false
target   = /public_html/downloads
```

Running `vendor/bin/robo build` will first build the zip package and then upload it to the specified directory on the FTP server. SSL connections are supported by setting `ssl = true`.

## Integrating JoRobo into CI/CD

JoRobo runs from the command line, so it fits naturally into any CI pipeline (GitHub Actions, GitLab CI, Drone, etc.). A minimal GitHub Actions workflow for building and releasing looks like this:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install dependencies
        run: composer install --no-dev

      - name: Create jorobo.ini from template
        run: |
          cp jorobo.dist.ini jorobo.ini
          sed -i "s/^token =$/token = ${{ secrets.GITHUB_TOKEN }}/" jorobo.ini

      - name: Build and release
        run: vendor/bin/robo build
```

Store your GitHub token as an Actions secret and inject it into `jorobo.ini` at runtime so it is never committed to the repository.

## Typical local development workflow

```bash
# 1. Clone your repo and install dependencies
git clone https://github.com/you/com_example.git
cd com_example
composer install

# 2. Symlink into your local Joomla installation
vendor/bin/robo map /var/www/html/joomla

# 3. Work on your code in src/ ...

# 4. Before releasing: bump version, update headers, build package
vendor/bin/robo bump
vendor/bin/robo headers
vendor/bin/robo build

# 5. The installable zip is now in dist/
ls dist/
```
