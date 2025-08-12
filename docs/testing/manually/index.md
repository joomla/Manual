---
sidebar_position: 2
---

Manual Testing
==============

Testers are individuals who know how to use Joomla! and have some time available. Anyone can become a tester and test one or more *pull requests* within their level of expertise. There really is something for everyone!

## Testing Environment

To test pull requests, you need a working Joomla! installation. You have two main options for setting up your environment: a fully automated cloud
environment with GitHub Codespaces, or a traditional local setup on your own computer.

### GitHub Codespaces

The easiest and fastest way to get started with testing is to use GitHub Codespaces. It provides a complete, pre-configured development environment
that runs directly in your browser.

**Why use Codespaces?**
- **No Local Setup:** You don't need to install a web server, PHP, a database, or any other tool on your computer.
- **Fast & Simple:** Your testing environment is ready in just a few minutes with a single click.
- **Consistent & Reliable:** Everyone uses the same setup, which reduces errors and "it works on my machine" problems.

For a step-by-step guide, please see the **[Testing PRs with GitHub Codespaces](/testing/manually/github-codespaces)** documentation.

### Local Environment

To get started you need an environment in which you can easily create multiple Joomla installations. This is because tests are often based on a specific branch, such as 5.2-dev, 5.3-dev or 6.0-dev. You could put different installations in subfolders with names such as jcms-test-52 or jcms-test-60 or whatever. This is a summary of what you need:

- A laptop or desktop computer with a web server, database and PHP installed.
- [Git](https://git-scm.com/) installed.
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.
- [Composer](https://getcomposer.org/) installed.
- A GitHub account to obtain an API Token.
- The latest [Patchtester zip file](https://github.com/joomla-extensions/patchtester). Select the *Latest* button from the Releases section on the right of the GitHub page. Save it for use multiple times.

You can do some testing using subfolders in a hosting account. It is just more convenient to do it locally.

## Creating a Database

A reminder on how to create a MySQL database and user from the command line:

```sh
mysql -u root -p
CREATE DATABASE jcms_53;
CREATE USER 'jtester'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON jcms_53.* TO 'jtester'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Test it:

```sh
mysql -u jtester -p -D jcms_53
strong_password
EXIT;
```

As you may be using this sequence often and you may want to script it, you could use an easy to remember password rather than a `strong_password`. The same user can be used for multiple test databases.

## Installing Joomla

The normal method of installing Joomla! from a distribution package does not include the source CSS and JavaScript files that need to be recompiled to test any pull request that includes a change to either of these types of resource. So it is best to clone the [joomla-cms](https://github.com/joomla/joomla-cms) repository and build a working installation by following the instructions in the README. In brief:

- Select a branch as the instructions change slightly for each branch. Scroll down to the section headed *Steps to setup the local environment:*.
- Change directory to the parent directory of your Joomla subfolders and use the following command.
    - `git clone https://github.com/joomla/joomla-cms.git`
- Rename the newly created joomla-cms folder to a name to be used for testing, such as jcms-53, and cd into it.
    - `mv joomla-cms jcms-53; cd jcms-53;`
- Checkout the branch you want to build. The `git branch` command will show only the default branch, which may not be the one you want to work on.
    - `git checkout 5.3-dev`
- Install the Joomla dependencies:
    - `composer install`
- Build the Joomla installation.
    - `npm ci`

The `composer install` and `npm ci` stages generate numerous lines of output including warnings. However, if they go to completion you can assume it is safe to point your browser at the subdirectory (localhost/jcms-53) and go ahead with the Joomla installation as for any normal installation.

**Except:** do not *Remove "installation" folder* at the last stage of installation. Do not *Install Additional Languages* at this stage as they may not be available for the selected Joomla version. Language installation is covered later.

## Open Administrator

Login to the backend using the administrator credentials you set during the installation process. The *Welcome to Joomla!* guided tour should auto-start. You can take the tour, Cancel it or Hide Forever. As this is a test site it is probably best to select *No* to the *Help us make Joomla! better!* message.

In the title bar you will see the installed version, for example 5.3.0-alpha4-dev.

You might like to change some Global Configuration values. For example, a default list limit of 10 is probably enough for testing; and you might like to change the Session Lifetime to 60 minutes to give you more time to think.

Select the icon to *Open the frontend of ... in a new window.* to check the front end displays the *Home* page with a *Main Menu* and *Login Form*.

## Problems

If anything goes wrong there are several options available:

- Empty the database, delete the configuration.php file from the root of the site and do the Joomla installation again.
- Empty the database and delete the folder used for this test site. Then go back to the clone stage described above.
- Create a new database and new clone with new names.

## Next

Ready for Testing with the Joomla! Patchtester.
