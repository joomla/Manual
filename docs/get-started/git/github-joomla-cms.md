---
sidebar_position: 4
title: "GitHub Example 2: Joomla! CMS"
---

:::caution TODO

This page is unfinished, but Cliff is working on it!

:::

## Getting Started

If you would like to contribute to Joomla! core code you will need a [GitHub](https://github.com/) account. It is free and takes moments to set up. You will also need a working [LMWX]AMP stack on your local laptop or workstation. You will almost certainly need an IDE too! 

## Fork joomla/joomla-cms on GitHub

Log in to your GitHub account and type joomla/joomla-cms in the `Search or Jump to...` box at the top left. You need to be in the original joomla-cms repo.

Click the `Fork` button at the top right of the screen. This will bring up a form asking you to confirm details of the fork you want to make. It is usually sufficient to select the green `Create fork` button.

That will make a complete copy of the joomla-cms repo as it exists at this time in your own account. If someone updates the original later you can use the `Sync fork` button to bring your repo up to date.

## Clone your Github fork locally

The local Apache web server uses a specific folder for individual web sites. For example, on a Mac it may be /Users/username/Sites. You may have many sites for testing and developing different projects, each in a separate subfolder. The clone process will create a folder within your current folder so first open a terminal window and switch to your sites folder:

```
cd ~/Sites
```

Then type in the clone command:

```
git clone https://github.com/yourusername/joomla-cms.git
```

This may take a long time! Switch to the joomla-cms folder and list what is in it:

```
cd joomla-cms
ls -al
total 2192
drwxr-xr-x   44 ceford  staff    1408 26 Aug 17:28 .
drwxr-xr-x  107 ceford  staff    3424 26 Aug 17:26 ..
-rw-r--r--    1 ceford  staff    2174 26 Aug 17:28 .appveyor.yml
-rw-r--r--    1 ceford  staff   13689 26 Aug 17:28 .drone.yml
-rw-r--r--    1 ceford  staff     388 26 Aug 17:28 .editorconfig
drwxr-xr-x   12 ceford  staff     384 26 Aug 17:28 .git
drwxr-xr-x   11 ceford  staff     352 26 Aug 17:28 .github
-rw-r--r--    1 ceford  staff    1765 26 Aug 17:28 .gitignore
-rw-r--r--    1 ceford  staff    4076 26 Aug 17:28 .php-cs-fixer.dist.php
-rw-r--r--    1 ceford  staff    6748 26 Aug 17:28 CODE_OF_CONDUCT.md
-rw-r--r--    1 ceford  staff   18092 26 Aug 17:28 LICENSE.txt
-rw-r--r--    1 ceford  staff    4469 26 Aug 17:28 README.md
-rw-r--r--    1 ceford  staff    4942 26 Aug 17:28 README.txt
drwxr-xr-x   12 ceford  staff     384 26 Aug 17:28 administrator
drwxr-xr-x    6 ceford  staff     192 26 Aug 17:28 api
drwxr-xr-x   20 ceford  staff     640 26 Aug 17:28 build
-rw-r--r--    1 ceford  staff    6422 26 Aug 17:28 build.xml
drwxr-xr-x    3 ceford  staff      96 26 Aug 17:28 cache
drwxr-xr-x    4 ceford  staff     128 26 Aug 17:28 cli
-rw-r--r--    1 ceford  staff     461 26 Aug 17:28 codeception.yml
drwxr-xr-x   19 ceford  staff     608 26 Aug 17:28 components
-rw-r--r--    1 ceford  staff    3867 26 Aug 17:28 composer.json
-rw-r--r--    1 ceford  staff  419222 26 Aug 17:28 composer.lock
-rw-r--r--    1 ceford  staff    6858 26 Aug 17:28 htaccess.txt
drwxr-xr-x    8 ceford  staff     256 26 Aug 17:28 images
drwxr-xr-x    6 ceford  staff     192 26 Aug 17:28 includes
-rw-r--r--    1 ceford  staff    1068 26 Aug 17:28 index.php
drwxr-xr-x   16 ceford  staff     512 26 Aug 17:28 installation
drwxr-xr-x    5 ceford  staff     160 26 Aug 17:28 language
drwxr-xr-x    7 ceford  staff     224 26 Aug 17:28 layouts
drwxr-xr-x   16 ceford  staff     512 26 Aug 17:28 libraries
drwxr-xr-x   27 ceford  staff     864 26 Aug 17:28 modules
-rw-r--r--    1 ceford  staff  538644 26 Aug 17:28 package-lock.json
-rw-r--r--    1 ceford  staff    3983 26 Aug 17:28 package.json
-rw-r--r--    1 ceford  staff     639 26 Aug 17:28 phpunit-pgsql.xml.dist
-rw-r--r--    1 ceford  staff     642 26 Aug 17:28 phpunit.xml.dist
drwxr-xr-x   26 ceford  staff     832 26 Aug 17:28 plugins
-rw-r--r--    1 ceford  staff     422 26 Aug 17:28 renovate.json
-rw-r--r--    1 ceford  staff     764 26 Aug 17:28 robots.txt.dist
-rw-r--r--    1 ceford  staff   26187 26 Aug 17:28 ruleset.xml
drwxr-xr-x    5 ceford  staff     160 26 Aug 17:28 templates
drwxr-xr-x    8 ceford  staff     256 26 Aug 17:28 tests
drwxr-xr-x    3 ceford  staff      96 26 Aug 17:28 tmp
-rw-r--r--    1 ceford  staff    2974 26 Aug 17:28 web.config.txt
```

## Build a working Joomla site

The downloaded development branch needs some extra steps to create a working Joomla site. This from the README.md file:

```
composer install
npm ci
```

Again, it will take a while and you will see flash past the commands to compile the javascript and css files. When done you can point your browser at localhost/joomla-cms and go through the normal install process.

The site should now work as any normal Joomla site.

## Making changes

If you would like to contribute to the Joomla CMS you need to progress through the following stages:

- **Create and Checkout a branch** in your local repo. This is very important! It will contain a record of the changes you propose to make to the original.
- **Make and Test Changes** and don't forget to check that your code conforms to the Joomla coding standards.
- **Commit and Push** your changes to your remote GitHub repo.
- **Make a Pull request** in your remote repo to ask for your branch to be merged into the main branch.

### Create and Checkout a branch

In the terminal window, make sure you are in the root of your site, then:

* git branch mypatch1
* git checkout mypatch1

where mypatch1 should be some short distinctive piece of text that allows you and others to distinguish between various branches. For example, it could start with your initials and finish with a succinct description of its main purpose, for example `cffixabc`.

### Make Coding Changes

This can be as trivial as correcting a language string or as complex as a major new feature. Or you might like to tackle a problem reported in the Issue Tracker. You can always ask for advice or comment there before plunging in to coding.

## Local Testing

It is essential that you test your proposed changes locally before making a pull request. You will have been checking your local joomla site to see that your code appears to work properly. However, if your code involves changes to javascript or css files you will need to recompile your sources. So go back to your terminal window and enter:

```
npm ci
```
If you site works without error you are ready to make a pull request.

### Commit and Push

Easy with an IDE. In VSCode:
- select the `+` button in the Changes list to commit the changes to the local repository. 
- Select the Source Control `...` button followed by Pull, Push / Push To... / and then select your own remote repo to push the changes from your local repo to your remote repo.

### Make a pull request

Login to your account on GitHub and select your own joomla-cms repo. In the `Code` section select the branch you wish to commit from the `Switch branches` drop-down list (marked with the branch icon). Click the `Contribute` button and then the `Open Pull Request` button.

After making a pull request some automatic checks are carried out. All being well after a few minutes you will see this result:

ToDo

### Remote Testing

Your pull request will go into a testing phase where the Joomla developers can examine your code and test it to see if it works and whether it stops anything else from working. Even if it works, others may regard the proposed change or method of implementation as inappropriate and decline to merge your pull request into the main code. Do not take umbrage! It happens all the time, even to the experts. Just move on to something else.

## Github workflow

In git you may have multiple remote repositories. You defined one remote repository when you cloned your own remote repo. You may also add the original repo to your list of remote repos. Example:

```
git remote -v show
Manual	https://github.com/ceford/Manual (fetch)
Manual	https://github.com/ceford/Manual (push)
origin	https://github.com/joomla/Manual.git (fetch)
origin	https://github.com/joomla/Manual.git (push)
```

This allows you keep your own fork and clone up to date from your local computer. You just need to pull and merge the original source into your local clone and then push your local clone to your remote fork. The following diagram illustrates the process:

<img alt="Github work flow joomla.png" src="https://docs.joomla.org/images/a/a4/Github_work_flow_joomla.png" decoding="async" data-file-width="1101" data-file-height="798" width="1101" height="798"/>
